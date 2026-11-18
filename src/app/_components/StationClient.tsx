'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Download,
  Lock,
  Play,
  Unlock,
  WifiOff,
} from 'lucide-react';
import { resolveMediaUrl } from '@/lib/storage/media';
import {
  deriveLearnerStats,
  getLearnerStats,
  recordStationUnlocked,
} from '@/lib/storage/progress';
import type { LearnerStats, LessonPack, StationPack } from '@/types/curriculum';

const MEDIA_CACHE_NAME = 'ict-prep3-media-v1';

export interface StationClientProps {
  station: StationPack;
  unitTitle?: string;
}

function collectStationMediaUrls(station: StationPack): string[] {
  const urls = new Set<string>();
  for (const asset of station.mediaAssets ?? []) {
    const resolved = resolveMediaUrl(asset);
    if (resolved) urls.add(resolved);
  }
  for (const lesson of station.lessons) {
    for (const card of lesson.cards) {
      for (const block of card.blocks) {
        if (block.type === 'mediaPlayer') {
          if (block.data.src) urls.add(resolveMediaUrl(block.data.src));
          if (block.data.vttSrc) urls.add(resolveMediaUrl(block.data.vttSrc));
          if (block.data.poster) urls.add(resolveMediaUrl(block.data.poster));
        } else if (block.type === 'imageBlock' && block.data.src) {
          urls.add(resolveMediaUrl(block.data.src));
        } else if (block.type === 'heroHook' && block.data.image) {
          urls.add(resolveMediaUrl(block.data.image));
        } else if (block.type === 'processStepper') {
          for (const step of block.data.steps) {
            if (
              step.visual &&
              (step.visual.startsWith('/') ||
                step.visual.startsWith('http') ||
                /\.(png|jpe?g|webp|svg)$/i.test(step.visual))
            ) {
              urls.add(resolveMediaUrl(step.visual));
            }
          }
        }
      }
    }
    for (const extra of lesson.additionalSources) {
      if (extra.type === 'audio' && extra.src) {
        urls.add(resolveMediaUrl(extra.src));
      }
    }
  }
  return Array.from(urls).filter(Boolean);
}

function getContentStageLabel(status: StationPack['status']): string | null {
  if (status === 'ready') return null;
  if (status === 'draft') return 'محتوى مبدئي';
  return 'بانتظار الحزمة';
}

export function StationClient({ station, unitTitle }: StationClientProps) {
  const stationStageLabel = getContentStageLabel(station.status);
  const [stats, setStats] = useState<LearnerStats>(() =>
    deriveLearnerStats([], []),
  );
  const [downloadState, setDownloadState] = useState<
    'idle' | 'downloading' | 'done' | 'error'
  >('idle');
  const [downloadMessage, setDownloadMessage] = useState<string>('');
  const [unlocking, setUnlocking] = useState(false);

  const mediaUrls = useMemo(() => collectStationMediaUrls(station), [station]);

  useEffect(() => {
    let cancelled = false;
    getLearnerStats().then((nextStats) => {
      if (!cancelled) setStats(nextStats);
    });

    if (
      typeof window !== 'undefined' &&
      'caches' in window &&
      mediaUrls.length > 0
    ) {
      window.caches
        .open(MEDIA_CACHE_NAME)
        .then(async (cache) => {
          const checks = await Promise.all(
            mediaUrls.map((url) => cache.match(url)),
          );
          if (!cancelled && checks.every(Boolean)) {
            setDownloadState('done');
            setDownloadMessage('وسائط المحطة محفوظة وجاهزة بدون إنترنت ✓');
          }
        })
        .catch(() => undefined);
    }

    return () => {
      cancelled = true;
    };
  }, [mediaUrls]);

  const stationSummary = stats.stationProgress[station.id];
  const completedIds = useMemo(
    () => new Set(stats.completedLessonIds),
    [stats.completedLessonIds],
  );
  const earlyUnlocked = Boolean(stationSummary?.earlyChallengeUnlocked);

  const completedInStation = station.lessons.filter((l) =>
    completedIds.has(l.id),
  ).length;
  const totalInStation = station.lessons.length;
  const pct =
    totalInStation > 0
      ? Math.round((completedInStation / totalInStation) * 100)
      : 0;
  const allLessonsCompleted =
    totalInStation > 0 && completedInStation >= totalInStation;
  const quizUnlocked = allLessonsCompleted || earlyUnlocked;

  const handleDownloadMedia = async () => {
    if (downloadState === 'downloading') return;

    if (typeof window === 'undefined' || !('caches' in window)) {
      setDownloadState('error');
      setDownloadMessage('متصفحك الحالي لا يدعم Cache Storage للتخزين اليدوي.');
      return;
    }

    if (mediaUrls.length === 0) {
      setDownloadState('done');
      setDownloadMessage('الدروس النصية والأكواد محفوظة وجاهزة بدون إنترنت ✓');
      return;
    }

    setDownloadState('downloading');
    setDownloadMessage(`جاري حفظ ${mediaUrls.length} ملف للمذاكرة بدون نت...`);

    try {
      const cache = await window.caches.open(MEDIA_CACHE_NAME);
      let savedCount = 0;
      for (const url of mediaUrls) {
        const res = await fetch(new Request(url));
        if (res.ok && res.status === 200) {
          await cache.put(url, res);
          savedCount += 1;
          setDownloadMessage(
            `تم حفظ ${savedCount} من ${mediaUrls.length} ملفات...`,
          );
        }
      }
      setDownloadState('done');
      setDownloadMessage(
        `تم تنزيل وسائط المحطة (${savedCount} ملفات) للمذاكرة بدون نت ✓`,
      );
    } catch {
      setDownloadState('error');
      setDownloadMessage(
        'تعذّر تنزيل الوسائط حاليًا — تأكد من الاتصال بالإنترنت أو Wi-Fi وحاول تاني.',
      );
    }
  };

  const handleEarlyChallenge = async () => {
    if (unlocking) return;
    setUnlocking(true);
    try {
      await recordStationUnlocked(station.id);
      const updated = await getLearnerStats();
      setStats(updated);
    } finally {
      setUnlocking(false);
    }
  };

  const isLessonUnlocked = (lesson: LessonPack, index: number): boolean => {
    if (index === 0) return true;
    if (earlyUnlocked) return true;
    if (completedIds.has(lesson.id)) return true;
    const prevLesson = station.lessons[index - 1];
    return prevLesson ? completedIds.has(prevLesson.id) : true;
  };

  return (
    <div className="space-y-6">
      {/* Back to Path */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-[48px] text-sm font-bold text-[#006E5A] hover:text-[#163A3A]"
        >
          <ArrowRight className="w-4 h-4 shrink-0" />
          <span>العودة للمسار الرئيسي</span>
        </Link>
      </div>

      {/* Station Overview Card */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#006E5A] text-white px-2.5 py-0.5 text-xs font-bold">
                المحطة {station.number}
              </span>
              {stationStageLabel && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#F6FAF9] border border-[#E2ECE9] text-[#3B5A58]">
                  {stationStageLabel}
                </span>
              )}
              {unitTitle && (
                <span className="text-xs font-medium text-[#3B5A58]">
                  {unitTitle}
                </span>
              )}
              <span className="text-xs text-[#3B5A58]">
                · كتاب الوزارة ص {station.textbookPages}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#163A3A]">
              {station.title}
            </h1>
            <p className="text-sm sm:text-base text-[#3B5A58]">
              {station.description}
            </p>
          </div>

          {stationSummary?.bestQuizScore !== null &&
            stationSummary?.bestQuizScore !== undefined && (
              <div className="rounded-xl bg-[#E5F1EE] px-4 py-2.5 text-center shrink-0">
                <div className="text-xs text-[#006E5A] font-semibold">
                  أعلى درجة في الاختبار
                </div>
                <div className="text-xl font-bold text-[#163A3A] tabular-nums">
                  {stationSummary.bestQuizScore}٪
                </div>
              </div>
            )}
        </div>

        {/* Station Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#163A3A]">
            <span>تقدمك في المحطة</span>
            <span className="tabular-nums">
              {completedInStation} من {totalInStation} دروس ({pct}٪)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#E5F1EE] overflow-hidden">
            <div
              className="h-full bg-[#006E5A] rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Station Objectives */}
        {station.objectives.length > 0 && (
          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-2">
            <h2 className="text-sm font-bold text-[#163A3A]">
              ماذا ستتقن في هذه المحطة؟
            </h2>
            <ul className="space-y-1.5 text-sm text-[#3B5A58]">
              {station.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#006E5A] shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Offline Cache-on-Demand Action */}
        <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#E2ECE9]">
          <button
            type="button"
            onClick={handleDownloadMedia}
            disabled={downloadState === 'downloading'}
            className="orchid-btn-secondary w-full sm:w-auto text-sm"
          >
            <Download className="w-4 h-4 text-[#006E5A] shrink-0" />
            <span>تنزيل وسائط المحطة للمذاكرة بدون نت</span>
          </button>

          {downloadMessage ? (
            <p
              role="status"
              className={`text-xs sm:text-sm font-medium ${
                downloadState === 'error'
                  ? 'text-[#B91C3C]'
                  : 'text-[#006E5A]'
              }`}
            >
              {downloadMessage}
            </p>
          ) : (
            <p className="text-xs text-[#3B5A58] flex items-center gap-1.5">
              <WifiOff className="w-3.5 h-3.5 shrink-0" />
              <span>تُحفظ الفيديوهات والصور محليًا عند التشغيل أو بالضغط هنا على Wi-Fi</span>
            </p>
          )}
        </div>
      </section>

      {/* Ordered Micro-Lessons */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
          الدروس المصغّرة ({totalInStation} دروس)
        </h2>

        <ol className="space-y-3">
          {station.lessons.map((lesson, idx) => {
            const isCompleted = completedIds.has(lesson.id);
            const unlocked = isLessonUnlocked(lesson, idx);
            const lessonStageLabel = getContentStageLabel(lesson.status);

            return (
              <li key={lesson.id}>
                {unlocked ? (
                  <Link
                    href={`/lesson/${lesson.id}`}
                    className={`orchid-card p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-[#006E5A] transition-colors min-h-[84px] ${
                      isCompleted ? 'border-[#006E5A]/40' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                          isCompleted
                            ? 'bg-[#006E5A] text-white'
                            : 'bg-[#E5F1EE] text-[#006E5A]'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 fill-current" />
                        )}
                      </span>

                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-[#006E5A]">
                            الدرس {lesson.id}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-[#3B5A58] bg-[#F6FAF9] px-2 py-0.5 rounded-full border border-[#E2ECE9]">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.durationMin} د</span>
                          </span>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              isCompleted
                                ? 'bg-[#E5F1EE] text-[#006E5A]'
                                : 'bg-[#F6FAF9] text-[#163A3A]'
                            }`}
                          >
                            {isCompleted ? 'مكتمل ✓' : 'متاح'}
                          </span>
                          {lessonStageLabel && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-[#E2ECE9] text-[#3B5A58]">
                              {lessonStageLabel}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#163A3A]">
                          {lesson.title}
                        </h3>
                        {lesson.subtitle && (
                          <p className="text-xs sm:text-sm text-[#3B5A58]">
                            {lesson.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <ArrowLeft className="w-5 h-5 text-[#006E5A] shrink-0" />
                  </Link>
                ) : (
                  <div
                    aria-disabled="true"
                    className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 sm:p-5 flex items-center justify-between gap-4 opacity-80 min-h-[84px]"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span className="w-11 h-11 rounded-xl bg-white border border-[#E2ECE9] text-[#3B5A58] flex items-center justify-center shrink-0">
                        <Lock className="w-5 h-5" />
                      </span>

                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-[#3B5A58]">
                            الدرس {lesson.id}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-[#3B5A58] bg-white px-2 py-0.5 rounded-full border border-[#E2ECE9]">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.durationMin} د</span>
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white border border-[#E2ECE9] text-[#3B5A58]">
                            يُفتح بعد الدرس السابق
                          </span>
                          {lessonStageLabel && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-[#E2ECE9] text-[#3B5A58]">
                              {lessonStageLabel}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#163A3A]/80">
                          {lesson.title}
                        </h3>
                        {lesson.subtitle && (
                          <p className="text-xs sm:text-sm text-[#3B5A58]">
                            {lesson.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Station Quiz & Early Challenge */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-3.5">
          <span className="w-12 h-12 rounded-xl bg-[#E5F1EE] text-[#006E5A] flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </span>
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
              اختبار نهاية المحطة ({station.quizBank.length} سؤالًا رسميًا)
            </h2>
            <p className="text-sm text-[#3B5A58]">
              {quizUnlocked
                ? 'الاختبار مفتوح الآن! تقدر تختار جولة سريعة (١٠ أسئلة) أو تحل بنك أسئلة الكتاب كاملًا.'
                : 'يُفتح الاختبار تلقائيًا بعد إكمال دروس المحطة، أو يمكنك فتحه مبكرًا إذا كنت جاهزًا للمراجعة السريعة.'}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {quizUnlocked ? (
            <Link
              href={`/station/${station.id}/quiz`}
              className="orchid-btn-primary w-full sm:w-auto min-h-[52px] px-6"
            >
              <span>ابدأ اختبار نهاية المحطة</span>
              <ArrowLeft className="w-5 h-5 shrink-0" />
            </Link>
          ) : (
            <>
              <button
                type="button"
                disabled
                className="orchid-btn-secondary opacity-60 cursor-not-allowed"
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>اختبار نهاية المحطة (أكمل الدروس أولًا)</span>
              </button>

              <button
                type="button"
                onClick={handleEarlyChallenge}
                disabled={unlocking}
                className="orchid-btn-primary w-full sm:w-auto px-5"
              >
                <Unlock className="w-4 h-4 shrink-0" />
                <span>
                  {unlocking
                    ? 'جاري فتح المحطة...'
                    : 'تحدَّ المحطة للفتح المبكر'}
                </span>
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
