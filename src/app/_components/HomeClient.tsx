'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  Layers,
  Play,
  ShieldAlert,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import { deriveLearnerStats, getLearnerStats } from '@/lib/storage/progress';
import type { LearnerStats, LessonPack, StationPack, UnitPack } from '@/types/curriculum';

export interface HomeClientProps {
  units: UnitPack[];
}

function findResumeTarget(
  units: UnitPack[],
  stats: LearnerStats,
): { lesson: LessonPack; isNewLearner: boolean } | null {
  const allLessons = units.flatMap((u) => u.stations.flatMap((s) => s.lessons));
  if (allLessons.length === 0) return null;

  const isNewLearner =
    stats.totalCompletedLessons === 0 && !stats.lastLessonId;

  if (isNewLearner) {
    return { lesson: allLessons[0], isNewLearner: true };
  }

  // If the learner started a lesson and hasn't completed it yet, resume it directly
  if (
    stats.lastLessonId &&
    !stats.completedLessonIds.includes(stats.lastLessonId)
  ) {
    const inProgress = allLessons.find((l) => l.id === stats.lastLessonId);
    if (inProgress) {
      return { lesson: inProgress, isNewLearner: false };
    }
  }

  // Otherwise pick the first uncompleted lesson along the learning path
  const nextUncompleted = allLessons.find(
    (l) => !stats.completedLessonIds.includes(l.id),
  );
  if (nextUncompleted) {
    return { lesson: nextUncompleted, isNewLearner: false };
  }

  // All 29 lessons completed -> point back to last or first for review
  const fallback =
    allLessons.find((l) => l.id === stats.lastLessonId) ?? allLessons[0];
  return { lesson: fallback, isNewLearner: false };
}

function getStationStatusMeta(
  station: StationPack,
  completedCount: number,
  totalCount: number,
) {
  if (totalCount > 0 && completedCount >= totalCount) {
    return {
      label: 'مكتمل ✓',
      badgeClass: 'bg-[#E5F1EE] text-[#006E5A] border-[#006E5A]/30',
    };
  }
  if (completedCount > 0) {
    return {
      label: 'جاري',
      badgeClass: 'bg-[#006E5A] text-white border-[#006E5A]',
    };
  }
  if (station.access === 'premium') {
    return {
      label: 'متاح بالنسخة الكاملة لاحقًا',
      badgeClass: 'bg-[#FBEAEC] text-[#E14B63] border-[#E14B63]/30',
    };
  }
  return {
    label: 'لم يبدأ',
    badgeClass: 'bg-[#F6FAF9] text-[#3B5A58] border-[#E2ECE9]',
  };
}

function getContentStageLabel(status: StationPack['status']): string | null {
  if (status === 'ready') return null;
  if (status === 'draft') return 'محتوى مبدئي';
  return 'مسودة هيكلية';
}

export function HomeClient({ units }: HomeClientProps) {
  const [stats, setStats] = useState<LearnerStats>(() =>
    deriveLearnerStats([], []),
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getLearnerStats()
      .then((nextStats) => {
        if (!cancelled) {
          setStats(nextStats);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const resume = useMemo(() => findResumeTarget(units, stats), [units, stats]);

  const totalFlashcardsCount = useMemo(
    () =>
      units.reduce(
        (sum, u) =>
          sum + u.stations.reduce((sSum, st) => sSum + st.flashcards.length, 0),
        0,
      ),
    [units],
  );

  const reviewAgainCount = useMemo(
    () =>
      Object.values(stats.flashcardStates).filter(
        (f) => f.status === 'review_again',
      ).length,
    [stats.flashcardStates],
  );

  const totalTermLessons = useMemo(
    () =>
      units.reduce(
        (sum, u) =>
          sum + u.stations.reduce((sSum, st) => sSum + st.lessons.length, 0),
        0,
      ),
    [units],
  );

  const dailyGoalMet = stats.todayLessonsCount >= 1;

  return (
    <div className="space-y-6">
      {/* Warm Hero Greeting & Primary CTA */}
      <section className="orchid-card p-5 sm:p-7 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مسار المبرمج الصغير · تالتة إعدادي</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#163A3A]">
              أهلًا يا مبرمج! جاهز لخطوة جديدة؟
            </h1>
            <p className="text-sm sm:text-base text-[#3B5A58] max-w-2xl">
              منهج الكمبيوتر وتكنولوجيا المعلومات (الترم الأول) في جلسات قصيرة
              ٧–١٠ دقائق، مع تشغيل حقيقي لكود Python على جهازك بدون إنترنت.
            </p>
          </div>

          {/* Streak & XP compact pills */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] px-3.5 py-2">
              <Flame className="w-5 h-5 text-[#E14B63]" />
              <div className="leading-tight">
                <div className="text-xs text-[#3B5A58]">سلسلة الأيام</div>
                <div className="text-base font-bold text-[#163A3A] tabular-nums">
                  {stats.streakDays} يوم
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] px-3.5 py-2">
              <Trophy className="w-5 h-5 text-[#006E5A]" />
              <div className="leading-tight">
                <div className="text-xs text-[#3B5A58]">نقاط الخبرة</div>
                <div className="text-base font-bold text-[#163A3A] tabular-nums">
                  {stats.xp} XP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Goal Bar */}
        <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {dailyGoalMet ? (
              <CheckCircle2 className="w-5 h-5 text-[#006E5A] shrink-0" />
            ) : (
              <Target className="w-5 h-5 text-[#006E5A] shrink-0" />
            )}
            <div>
              <p className="text-sm font-bold text-[#163A3A]">
                هدف اليوم: أنجز درسًا واحدًا اليوم
              </p>
              <p className="text-xs text-[#3B5A58]">
                {dailyGoalMet
                  ? `عاش! أنجزت ${stats.todayLessonsCount} درس اليوم واستمريت في تقدمك.`
                  : 'درس واحد قصير يكفي لتحافظ على سلسلتك اليومية.'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-[#E2ECE9] text-[#163A3A] tabular-nums">
            {stats.totalCompletedLessons} / {totalTermLessons} درس مكتمل
          </span>
        </div>

        {/* Giant Primary CTA */}
        {resume && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link
              href={`/lesson/${resume.lesson.id}`}
              className="orchid-btn-primary w-full sm:w-auto sm:min-w-[280px] min-h-[56px] text-base sm:text-lg px-6 shadow-sm"
            >
              <Play className="w-5 h-5 fill-current shrink-0" />
              <span>
                {resume.isNewLearner
                  ? 'ابدأ الدرس الأول'
                  : 'كمّل من مكان ما وقفت'}
              </span>
              <ArrowLeft className="w-5 h-5 shrink-0" />
            </Link>

            <div className="text-sm text-[#3B5A58] px-1">
              <span className="font-semibold text-[#163A3A]">
                الدرس {resume.lesson.id}:
              </span>{' '}
              {resume.lesson.title} ({resume.lesson.durationMin} د)
            </div>
          </div>
        )}
      </section>

      {/* Quick Study Modes */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/review"
          className="orchid-card p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-[#006E5A] transition-colors min-h-[84px]"
        >
          <div className="flex items-center gap-3.5">
            <span className="w-12 h-12 rounded-xl bg-[#E5F1EE] text-[#006E5A] flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[#163A3A]">
                البطاقات للمراجعة
              </h2>
              <p className="text-xs sm:text-sm text-[#3B5A58]">
                {reviewAgainCount > 0
                  ? `${reviewAgainCount} بطاقة بانتظار المراجعة أولًا`
                  : `${totalFlashcardsCount} بطاقة مصطلحات وتعريفات سريعة`}
              </p>
            </div>
          </div>
          <ArrowLeft className="w-5 h-5 text-[#006E5A] shrink-0" />
        </Link>

        <Link
          href="/exam"
          className="orchid-card p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-[#006E5A] transition-colors min-h-[84px]"
        >
          <div className="flex items-center gap-3.5">
            <span className="w-12 h-12 rounded-xl bg-[#E5F1EE] text-[#006E5A] flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[#163A3A]">
                وضع الامتحان الشامل
              </h2>
              <p className="text-xs sm:text-sm text-[#3B5A58]">
                اختبار مختلط بمؤقت هادئ وتقرير نقاط القوة والضعف
              </p>
            </div>
          </div>
          <ArrowLeft className="w-5 h-5 text-[#006E5A] shrink-0" />
        </Link>
      </section>

      {/* Visual Learning Path: 2 Units / 9 Stations */}
      <section aria-label="خريطة المسار التعليمي" className="space-y-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-[#163A3A]">
            المسار المرئي للترم الأول (وحدتان · ٩ محطات)
          </h2>
          {!loaded && (
            <span className="text-xs text-[#3B5A58]">جاري تحميل التقدم...</span>
          )}
        </div>

        <div className="space-y-6">
          {units.map((unit) => {
            const unitLessons = unit.stations.flatMap((s) => s.lessons);
            const unitCompleted = unitLessons.filter((l) =>
              stats.completedLessonIds.includes(l.id),
            ).length;
            const unitPct =
              unitLessons.length > 0
                ? Math.round((unitCompleted / unitLessons.length) * 100)
                : 0;

            return (
              <div key={unit.id} className="orchid-card p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2ECE9] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-[#163A3A] text-white px-2.5 py-0.5 text-xs font-bold">
                        الوحدة {unit.number}
                      </span>
                      <span className="text-xs text-[#3B5A58]">
                        كتاب الوزارة ص {unit.textbookPages}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">
                      {unit.title}
                    </h3>
                    <p className="text-sm text-[#3B5A58]">{unit.description}</p>
                  </div>

                  <div className="text-left sm:text-end space-y-1 min-w-[140px]">
                    <div className="text-xs font-bold text-[#006E5A] tabular-nums">
                      {unitCompleted} / {unitLessons.length} دروس ({unitPct}٪)
                    </div>
                    <div className="w-36 h-2 rounded-full bg-[#E5F1EE] overflow-hidden">
                      <div
                        className="h-full bg-[#006E5A] rounded-full transition-all duration-300"
                        style={{ width: `${unitPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Stations vertical visual path */}
                <ol className="space-y-3 relative">
                  {unit.stations.map((station) => {
                    const summary = stats.stationProgress[station.id];
                    const completedCount = summary?.completedLessons ?? 0;
                    const totalCount = station.lessons.length;
                    const pct =
                      totalCount > 0
                        ? Math.round((completedCount / totalCount) * 100)
                        : 0;
                    const statusMeta = getStationStatusMeta(
                      station,
                      completedCount,
                      totalCount,
                    );
                    const stageLabel = getContentStageLabel(station.status);
                    const isDone =
                      totalCount > 0 && completedCount >= totalCount;

                    return (
                      <li key={station.id}>
                        <Link
                          href={`/station/${station.id}`}
                          className="group block rounded-xl border border-[#E2ECE9] bg-[#F6FAF9]/70 hover:bg-white hover:border-[#006E5A] p-4 transition-all min-h-[80px]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3.5 min-w-0">
                              <span
                                className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shrink-0 border ${
                                  isDone
                                    ? 'bg-[#006E5A] text-white border-[#006E5A]'
                                    : completedCount > 0
                                      ? 'bg-[#E5F1EE] text-[#006E5A] border-[#006E5A]'
                                      : 'bg-white text-[#163A3A] border-[#E2ECE9]'
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                  station.number
                                )}
                              </span>

                              <div className="space-y-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="text-base font-bold text-[#163A3A] group-hover:text-[#006E5A] transition-colors">
                                    المحطة {station.number}: {station.title}
                                  </h4>
                                  <span
                                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusMeta.badgeClass}`}
                                  >
                                    {statusMeta.label}
                                  </span>
                                  {stageLabel && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-[#E2ECE9] text-[#3B5A58]">
                                      {stageLabel}
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs sm:text-sm text-[#3B5A58] line-clamp-2">
                                  {station.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#3B5A58]">
                                  <span>{totalCount} دروس مصغّرة</span>
                                  <span>·</span>
                                  <span>
                                    {station.quizBank.length} سؤال في البنك
                                  </span>
                                  {summary?.bestQuizScore !== null &&
                                    summary?.bestQuizScore !== undefined && (
                                      <>
                                        <span>·</span>
                                        <span className="font-bold text-[#006E5A]">
                                          أعلى درجة اختبار:{' '}
                                          {summary.bestQuizScore}٪
                                        </span>
                                      </>
                                    )}
                                </div>
                              </div>
                            </div>

                            <ArrowLeft className="w-5 h-5 text-[#3B5A58] group-hover:text-[#006E5A] shrink-0 mt-1" />
                          </div>

                          {/* Station progress bar */}
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex-1 h-2 rounded-full bg-[#E2ECE9] overflow-hidden">
                              <div
                                className="h-full bg-[#006E5A] rounded-full transition-all duration-300"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-[#163A3A] tabular-nums shrink-0">
                              {completedCount}/{totalCount}
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gentle Safari iOS / Offline Backup Banner */}
      <section className="rounded-xl border border-[#E2ECE9] bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#FBEAEC] text-[#E14B63] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </span>
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-[#163A3A]">
              احفظ تقدمك لو بتذاكر من الموبايل أو Safari iOS
            </h3>
            <p className="text-xs sm:text-sm text-[#3B5A58]">
              تقدمك محفوظ تلقائيًا على جهازك بدون حساب. ثبّت المنصة على الشاشة
              الرئيسية أو انسخ «كود التقدم الاحتياطي» عشان يفضل معاك دايمًا.
            </p>
          </div>
        </div>

        <Link
          href="/progress"
          className="orchid-btn-secondary shrink-0 text-sm whitespace-nowrap"
        >
          حفظ نسخة التقدم / التثبيت
        </Link>
      </section>
    </div>
  );
}
