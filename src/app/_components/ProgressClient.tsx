'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  CheckCircle2,
  Copy,
  Crown,
  Download,
  Flag,
  Flame,
  Rocket,
  Share2,
  ShieldCheck,
  Smartphone,
  Trophy,
  Upload,
} from 'lucide-react';
import {
  deriveLearnerStats,
  exportProgressBackup,
  getLearnerStats,
  importProgressBackup,
  requestPersistentStorage,
} from '@/lib/storage/progress';
import type { BadgeId, LearnerStats } from '@/types/curriculum';

export interface ProgressStationInfo {
  id: string;
  unitId: string;
  number: number;
  title: string;
  lessons: Array<{ id: string; title: string }>;
}

export interface ProgressClientProps {
  stations: ProgressStationInfo[];
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const BADGE_ICONS: Record<
  BadgeId,
  React.ComponentType<{ className?: string }>
> = {
  first_lesson: Rocket,
  first_station: Flag,
  perfect_quiz: Award,
  streak_3: Flame,
  unit_1_hero: Trophy,
  term_1_complete: Crown,
};

const BLOCK_TYPE_LABELS: Record<string, string> = {
  quizQuestion: 'سؤال تحقق',
  quiz: 'اختبار',
  codeLab: 'مختبر بايثون',
  sortingBuckets: 'نشاط تصنيف',
  matchingPairs: 'نشاط توصيل',
  orderFlowBuilder: 'ترتيب / خريطة تدفق',
  listBlock: 'قائمة مراجعة',
};

export function ProgressClient({ stations }: ProgressClientProps) {
  const [stats, setStats] = useState<LearnerStats>(() =>
    deriveLearnerStats([], []),
  );
  const [persisted, setPersisted] = useState<boolean | null>(null);
  const [backupCode, setBackupCode] = useState('');
  const [exportStatus, setExportStatus] = useState('');
  const [importInput, setImportInput] = useState('');
  const [importStatus, setImportStatus] = useState<{
    kind: 'success' | 'error';
    text: string;
  } | null>(null);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    let cancelled = false;
    getLearnerStats()
      .then((s) => {
        if (!cancelled) setStats(s);
      })
      .catch(() => undefined);

    requestPersistentStorage()
      .then((res) => {
        if (!cancelled) setPersisted(res.persisted);
      })
      .catch(() => undefined);

    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => {
      cancelled = true;
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const totalTermLessons = useMemo(
    () => stations.reduce((sum, s) => sum + s.lessons.length, 0) || 29,
    [stations],
  );

  const lessonTitleMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of stations) {
      for (const l of s.lessons) {
        map.set(l.id, l.title);
      }
    }
    return map;
  }, [stations]);

  const handleExportBackup = async () => {
    try {
      const code = await exportProgressBackup();
      setBackupCode(code);
      let copied = false;
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function'
      ) {
        await navigator.clipboard.writeText(code).catch(() => undefined);
        copied = true;
      }
      setExportStatus(
        copied
          ? 'تم إنشاء ونسخ كود التقدم الاحتياطي ✓ احتفظ به في الملاحظات'
          : 'تم إنشاء كود التقدم الاحتياطي ✓ انسخه من الصندوق بالأسفل',
      );
    } catch {
      setExportStatus('تعذّر إنشاء النسخة الاحتياطية حاليًا.');
    }
  };

  const handleImportBackup = async () => {
    if (!importInput.trim()) {
      setImportStatus({
        kind: 'error',
        text: 'من فضلك الصق كود التقدم (SL1:...) أولًا.',
      });
      return;
    }

    try {
      const res = await importProgressBackup(importInput);
      setStats(res.stats);
      setImportStatus({
        kind: 'success',
        text: `تمت استعادة ${res.importedEvents} حدث تعليمي بنجاح ✓`,
      });
      setImportInput('');
    } catch (err) {
      setImportStatus({
        kind: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'كود النسخة الاحتياطية غير صالح.',
      });
    }
  };

  const handleInstallPwa = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
            <Trophy className="w-3.5 h-3.5" />
            <span>سجل إنجاز المتعلم</span>
          </span>
          <h1 className="text-2xl font-bold text-[#163A3A]">تقدمك والشارات</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1">
            <span className="text-xs text-[#3B5A58]">الدروس المكتملة</span>
            <p className="text-xl sm:text-2xl font-bold text-[#163A3A] tabular-nums">
              {stats.totalCompletedLessons} / {totalTermLessons}
            </p>
          </div>

          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1">
            <span className="text-xs text-[#3B5A58]">السلسلة اليومية</span>
            <p className="text-xl sm:text-2xl font-bold text-[#E14B63] tabular-nums flex items-center gap-1.5">
              <Flame className="w-5 h-5 shrink-0" />
              <span>{stats.streakDays} يوم</span>
            </p>
          </div>

          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1">
            <span className="text-xs text-[#3B5A58]">إجمالي النقاط</span>
            <p className="text-xl sm:text-2xl font-bold text-[#006E5A] tabular-nums">
              {stats.xp} XP
            </p>
          </div>

          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1">
            <span className="text-xs text-[#3B5A58]">أطول سلسلة</span>
            <p className="text-xl sm:text-2xl font-bold text-[#163A3A] tabular-nums">
              {stats.longestStreakDays} يوم
            </p>
          </div>
        </div>
      </section>

      {/* 6 Badges */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
          الشارات الست ({stats.badges.filter((b) => b.unlocked).length} / 6)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stats.badges.map((badge) => {
            const Icon = BADGE_ICONS[badge.id];
            return (
              <div
                key={badge.id}
                className={`rounded-xl border p-4 flex items-start gap-3 transition-colors ${
                  badge.unlocked
                    ? 'border-[#006E5A]/40 bg-[#E5F1EE]/60'
                    : 'border-[#E2ECE9] bg-[#F6FAF9] opacity-75'
                }`}
              >
                <span
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    badge.unlocked
                      ? 'bg-[#006E5A] text-white'
                      : 'bg-white border border-[#E2ECE9] text-[#3B5A58]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-[#163A3A]">
                      {badge.title}
                    </h3>
                    {badge.unlocked && (
                      <CheckCircle2 className="w-4 h-4 text-[#006E5A] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#3B5A58] leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Per-Station Bars */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
          التقدم في كل محطة
        </h2>

        <div className="space-y-3">
          {stations.map((st) => {
            const sum = stats.stationProgress[st.id];
            const total = st.lessons.length || sum?.totalLessons || 0;
            const done = sum?.completedLessons ?? 0;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;

            return (
              <Link
                key={st.id}
                href={`/station/${st.id}`}
                className="block rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] hover:border-[#006E5A] p-4 space-y-2 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-bold text-[#163A3A]">
                    المحطة {st.number}: {st.title}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-bold tabular-nums">
                    {sum?.bestQuizScore !== null &&
                      sum?.bestQuizScore !== undefined && (
                        <span className="text-[#006E5A]">
                          أعلى اختبار: {sum.bestQuizScore}٪
                        </span>
                      )}
                    <span className="text-[#163A3A]">
                      {done} / {total} ({pct}٪)
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E2ECE9] overflow-hidden">
                  <div
                    className="h-full bg-[#006E5A] rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Friction Weak Spots */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#E14B63]" />
          <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
            نقاط تحتاج لمراجعة سريعة
          </h2>
        </div>

        {stats.weakSpots.length === 0 ? (
          <p className="rounded-xl bg-[#E5F1EE]/60 border border-[#006E5A]/20 p-4 text-sm text-[#163A3A]">
            ممتاز! لم تُسجَّل نقاط تعثر متكررة حتى الآن. استمر بنفس التركيز.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {stats.weakSpots.slice(0, 6).map((spot) => (
              <li
                key={`${spot.lessonId}-${spot.blockId}`}
                className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3.5 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#E14B63]">
                    {BLOCK_TYPE_LABELS[spot.blockType] ?? 'نشاط تفاعلي'} ·{' '}
                    {spot.wrongAttempts} محاولات إضافية
                  </div>
                  <p className="text-sm font-bold text-[#163A3A]">
                    الدرس {spot.lessonId}:{' '}
                    {lessonTitleMap.get(spot.lessonId) ?? ''}
                  </p>
                </div>

                <Link
                  href={`/lesson/${spot.lessonId}`}
                  className="inline-flex items-center gap-1.5 min-h-[48px] px-4 rounded-lg bg-white border border-[#006E5A] text-sm font-bold text-[#006E5A] hover:bg-[#E5F1EE]"
                >
                  <span>راجع الدرس</span>
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Export / Import Backup Code */}
      <section className="orchid-card p-5 sm:p-6 space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
            نسخ واستعادة كود التقدم (Backup Code)
          </h2>
          <p className="text-sm text-[#3B5A58]">
            انسخ كود تقدمك واحفظه لنقله إلى جهاز آخر أو لحمايته في حالة مسح
            بيانات المتصفح.
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleExportBackup}
            className="orchid-btn-primary"
          >
            <Copy className="w-4 h-4 shrink-0" />
            <span>نسخ كود التقدم</span>
          </button>

          {exportStatus && (
            <p role="status" className="text-sm font-bold text-[#006E5A]">
              {exportStatus}
            </p>
          )}

          {backupCode && (
            <textarea
              dir="ltr"
              readOnly
              value={backupCode}
              rows={3}
              aria-label="كود التقدم الاحتياطي"
              className="w-full rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3 font-mono text-xs text-[#163A3A] text-left"
            />
          )}
        </div>

        <div className="border-t border-[#E2ECE9] pt-4 space-y-3">
          <label
            htmlFor="import-backup-input"
            className="block text-sm font-bold text-[#163A3A]"
          >
            استعادة التقدم من كود محفوظ
          </label>
          <textarea
            id="import-backup-input"
            dir="ltr"
            value={importInput}
            onChange={(e) => setImportInput(e.target.value)}
            placeholder="SL1:..."
            rows={2}
            className="w-full rounded-xl border border-[#E2ECE9] bg-white p-3 font-mono text-xs text-[#163A3A] text-left"
          />
          <button
            type="button"
            onClick={handleImportBackup}
            className="orchid-btn-secondary"
          >
            <Upload className="w-4 h-4 text-[#006E5A] shrink-0" />
            <span>استعادة التقدم</span>
          </button>

          {importStatus && (
            <p
              role="status"
              className={`text-sm font-bold ${
                importStatus.kind === 'success'
                  ? 'text-[#006E5A]'
                  : 'text-[#E14B63]'
              }`}
            >
              {importStatus.text}
            </p>
          )}
        </div>
      </section>

      {/* PWA Home-Screen Install Guide & Persistent Storage */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-[#006E5A]" />
            <h2 className="text-lg font-bold text-[#163A3A]">
              تثبيت التطبيق على الشاشة الرئيسية (بدون إنترنت)
            </h2>
          </div>

          {persisted !== null && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {persisted
                  ? 'التخزين الدائم مفعّل ✓'
                  : 'يُنصح بالتثبيت لحماية البيانات'}
              </span>
            </span>
          )}
        </div>

        {installPrompt && (
          <button
            type="button"
            onClick={handleInstallPwa}
            className="orchid-btn-primary"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>تثبيت التطبيق الآن</span>
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1.5">
            <h3 className="font-bold text-[#163A3A] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#006E5A]" />
              <span>أجهزة iPhone / iPad (Safari)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#3B5A58]">
              اضغط زر <strong>المشاركة</strong> في أسفل المتصفح، ثم اختر{' '}
              <strong>«إضافة إلى الشاشة الرئيسية» (Add to Home Screen)</strong>
              لحماية تقدمك في IndexedDB ومنع مسحه بعد ٧ أيام.
            </p>
          </div>

          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1.5">
            <h3 className="font-bold text-[#163A3A] flex items-center gap-2">
              <Download className="w-4 h-4 text-[#006E5A]" />
              <span>أجهزة Android (Chrome)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#3B5A58]">
              اضغط قائمة النقاط الثلاث <strong>⋮</strong> في أعلى Chrome، ثم اختر{' '}
              <strong>«تثبيت التطبيق» (Install App)</strong> ليفتح مثل أي
              تطبيق ويعمل أوفلاين.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
