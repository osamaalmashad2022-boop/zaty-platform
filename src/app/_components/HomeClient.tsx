'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  CloudOff,
  Crown,
  Flame,
  Layers,
  Play,
  ShieldAlert,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import { deriveLearnerStats, getLearnerStats } from '@/lib/storage/progress';
import {
  fetchCurrentUser,
  type CloudUser,
  type UserTier,
} from '@/lib/sync/cloudSync';
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
  userTier?: UserTier,
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
  if (station.access === 'premium' && userTier !== 'premium') {
    return {
      label: 'متاح بالنسخة الكاملة',
      badgeClass: 'bg-[#FBEAEC] text-[#B91C3C] border-[#E14B63]/30',
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
  return 'بانتظار الحزمة';
}

export function HomeClient({ units }: HomeClientProps) {
  const [stats, setStats] = useState<LearnerStats>(() =>
    deriveLearnerStats([], []),
  );
  const [loaded, setLoaded] = useState(false);
  const [cloudUser, setCloudUser] = useState<CloudUser | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

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

    const refreshAuth = () => {
      fetchCurrentUser()
        .then((user) => {
          if (!cancelled) {
            setCloudUser(user);
            setAuthLoaded(true);
          }
        })
        .catch(() => {
          if (!cancelled) setAuthLoaded(true);
        });
    };
    refreshAuth();
    window.addEventListener('sl-auth-changed', refreshAuth);

    return () => {
      cancelled = true;
      window.removeEventListener('sl-auth-changed', refreshAuth);
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
            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A] h-[26px] whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>مسار المبرمج الصغير · تالتة إعدادي</span>
              </span>
              <Link
                href="/progress"
                data-testid="home-account-slot"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E2ECE9] bg-[#F6FAF9] px-3 py-1 text-xs font-bold text-[#163A3A] hover:border-[#006E5A] h-[26px] min-w-[148px] whitespace-nowrap"
              >
                {!authLoaded ? (
                  <span
                    aria-hidden="true"
                    className="inline-block h-2.5 w-24 rounded bg-[#E2ECE9] animate-pulse"
                  />
                ) : cloudUser ? (
                  cloudUser.tier === 'premium' ? (
                    <>
                      <Crown className="w-3.5 h-3.5 text-[#006E5A] shrink-0" />
                      <span className="text-[#006E5A]">النسخة الكاملة ★</span>
                    </>
                  ) : (
                    <>
                      <Cloud className="w-3.5 h-3.5 text-[#006E5A] shrink-0" />
                      <span>مزامنة سحابية · مجاني</span>
                    </>
                  )
                ) : (
                  <>
                    <CloudOff className="w-3.5 h-3.5 text-[#3B5A58] shrink-0" />
                    <span>حفظ محلي · اربط حسابك</span>
                  </>
                )}
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#163A3A]">
              أهلًا يا مبرمج! جاهز لخطوة جديدة؟
            </h1>
            <p className="text-sm sm:text-base text-[#3B5A58] max-w-2xl">
              منهج الكمبيوتر وتكنولوجيا المعلومات (الترم الأول) في جلسات قصيرة
              ٧–١٠ دقائق، مع تشغيل حقيقي لكود Python على جهازك بدون إنترنت.
            </p>
          </div>

          {/* Streak & XP compact pills (fixed-height slots prevent hydration CLS) */}
          <div
            data-testid="home-stats-slot"
            aria-busy={!loaded}
            className="flex items-center gap-2.5 flex-wrap"
          >
            <div className="flex items-center gap-2 rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] px-3.5 py-2 min-w-[122px] min-h-[60px]">
              <Flame className="w-5 h-5 text-[#E14B63] shrink-0" />
              <div className="leading-tight">
                <div className="text-xs text-[#3B5A58]">سلسلة الأيام</div>
                <div className="h-6 flex items-center text-base font-bold text-[#163A3A] tabular-nums">
                  {loaded ? (
                    <span>{stats.streakDays} يوم</span>
                  ) : (
                    <>
                      <span
                        aria-hidden="true"
                        className="inline-block h-4 w-12 rounded bg-[#E2ECE9] animate-pulse"
                      />
                      <span className="sr-only">جاري تحميل سلسلة الأيام</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] px-3.5 py-2 min-w-[122px] min-h-[60px]">
              <Trophy className="w-5 h-5 text-[#006E5A] shrink-0" />
              <div className="leading-tight">
                <div className="text-xs text-[#3B5A58]">نقاط الخبرة</div>
                <div className="h-6 flex items-center text-base font-bold text-[#163A3A] tabular-nums">
                  {loaded ? (
                    <span>{stats.xp} XP</span>
                  ) : (
                    <>
                      <span
                        aria-hidden="true"
                        className="inline-block h-4 w-14 rounded bg-[#E2ECE9] animate-pulse"
                      />
                      <span className="sr-only">جاري تحميل نقاط الخبرة</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Goal Bar (reserved height prevents hydration CLS) */}
        <div
          data-testid="home-goal-slot"
          className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3.5 min-h-[82px] sm:min-h-[72px] flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {dailyGoalMet ? (
              <CheckCircle2 className="w-5 h-5 text-[#006E5A] shrink-0" />
            ) : (
              <Target className="w-5 h-5 text-[#006E5A] shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#163A3A]">
                هدف اليوم: أنجز درسًا واحدًا اليوم
              </p>
              <div className="min-h-[20px] flex items-center">
                {loaded ? (
                  <p className="text-xs text-[#3B5A58] line-clamp-1">
                    {dailyGoalMet
                      ? `عاش! أنجزت ${stats.todayLessonsCount} درس اليوم واستمريت في تقدمك.`
                      : 'درس واحد قصير يكفي لتحافظ على سلسلتك اليومية.'}
                  </p>
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-block h-3.5 w-52 max-w-full rounded bg-[#E2ECE9] animate-pulse"
                  />
                )}
              </div>
            </div>
          </div>
          <span className="min-w-[128px] h-[28px] inline-flex items-center justify-center text-xs font-bold px-3 rounded-full bg-white border border-[#E2ECE9] text-[#163A3A] tabular-nums whitespace-nowrap shrink-0">
            {loaded ? (
              <span>
                {stats.totalCompletedLessons} / {totalTermLessons} درس مكتمل
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="inline-block h-3 w-16 rounded bg-[#E2ECE9] animate-pulse"
              />
            )}
          </span>
        </div>

        {/* Giant Primary CTA (fixed-height reserved slot eliminates above-fold CLS) */}
        <div
          data-testid="home-cta-slot"
          className="min-h-[92px] sm:min-h-[56px] flex flex-col sm:flex-row sm:items-center gap-3"
        >
          {!loaded ? (
            <>
              <div
                aria-hidden="true"
                className="w-full sm:w-[280px] h-[56px] rounded-lg bg-[#E5F1EE] animate-pulse shrink-0"
              />
              <div
                aria-hidden="true"
                className="h-6 w-56 max-w-full rounded bg-[#E5F1EE]/80 animate-pulse"
              />
            </>
          ) : (
            resume && (
              <>
                <Link
                  href={`/lesson/${resume.lesson.id}`}
                  className="orchid-btn-primary w-full sm:w-[280px] h-[56px] text-base sm:text-lg px-6 shadow-sm shrink-0"
                >
                  <Play className="w-5 h-5 fill-current shrink-0" />
                  <span>
                    {resume.isNewLearner
                      ? 'ابدأ الدرس الأول'
                      : 'كمّل من مكان ما وقفت'}
                  </span>
                  <ArrowLeft className="w-5 h-5 shrink-0" />
                </Link>

                <div className="text-sm text-[#3B5A58] px-1 leading-6 min-h-[24px] line-clamp-1">
                  <span className="font-semibold text-[#163A3A]">
                    الدرس {resume.lesson.id}:
                  </span>{' '}
                  {resume.lesson.title} ({resume.lesson.durationMin} د)
                </div>
              </>
            )
          )}
        </div>
      </section>

      {/* Quick Study Modes */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/review"
          className="orchid-card p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-[#006E5A] transition-colors min-h-[88px]"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="w-12 h-12 rounded-xl bg-[#E5F1EE] text-[#006E5A] flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#163A3A]">
                البطاقات للمراجعة
              </h2>
              <div className="min-h-[20px] flex items-center">
                {loaded ? (
                  <p className="text-xs sm:text-sm text-[#3B5A58] line-clamp-1">
                    {reviewAgainCount > 0
                      ? `${reviewAgainCount} بطاقة بانتظار المراجعة أولًا`
                      : `${totalFlashcardsCount} بطاقة مصطلحات وتعريفات سريعة`}
                  </p>
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-block h-3.5 w-44 max-w-full rounded bg-[#E2ECE9] animate-pulse"
                  />
                )}
              </div>
            </div>
          </div>
          <ArrowLeft className="w-5 h-5 text-[#006E5A] shrink-0" />
        </Link>

        <Link
          href="/exam"
          className="orchid-card p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-[#006E5A] transition-colors min-h-[88px]"
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
        <div
          data-testid="home-path-header"
          className="flex items-center justify-between gap-2 min-h-[32px]"
        >
          <h2 className="text-xl font-bold text-[#163A3A]">
            المسار المرئي للترم الأول (وحدتان · ٩ محطات)
          </h2>
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
                      cloudUser?.tier,
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
                                </div>
                              </div>
                            </div>

                            <ArrowLeft className="w-5 h-5 text-[#3B5A58] group-hover:text-[#006E5A] shrink-0 mt-1" />
                          </div>

                          {/* Station progress bar */}
                          <div className="mt-3 flex items-center gap-3 min-h-[20px]">
                            <div className="flex-1 h-2 rounded-full bg-[#E2ECE9] overflow-hidden">
                              <div
                                className="h-full bg-[#006E5A] rounded-full transition-all duration-300"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            {summary?.bestQuizScore !== null &&
                              summary?.bestQuizScore !== undefined && (
                                <span className="text-xs font-bold text-[#006E5A] tabular-nums shrink-0">
                                  أعلى درجة: {summary.bestQuizScore}٪
                                </span>
                              )}
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

      {/* Gentle Safari iOS / Offline Backup & Cloud Sync Banner */}
      <section
        data-testid="home-backup-banner"
        className="rounded-xl border border-[#E2ECE9] bg-white p-4 sm:p-5 min-h-[104px] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3">
          <span
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              cloudUser
                ? 'bg-[#E5F1EE] text-[#006E5A]'
                : 'bg-[#FBEAEC] text-[#B91C3C]'
            }`}
          >
            {cloudUser ? (
              <Cloud className="w-5 h-5" />
            ) : (
              <ShieldAlert className="w-5 h-5" />
            )}
          </span>
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-[#163A3A]">
              {cloudUser
                ? 'حسابك مرتبط بالمزامنة السحابية'
                : 'احفظ تقدمك لو بتذاكر من الموبايل أو Safari iOS'}
            </h3>
            <p className="text-xs sm:text-sm text-[#3B5A58]">
              {cloudUser
                ? `تقدمك محفوظ سحابيًا (${cloudUser.tier === 'premium' ? 'النسخة الكاملة ★' : 'الباقة المجانية'}) ومزامن على جهازك للعمل بدون نت.`
                : 'تقدمك محفوظ تلقائيًا على جهازك بدون حساب. اربط حسابك للمزامنة السحابية أو انسخ كود التقدم الاحتياطي.'}
            </p>
          </div>
        </div>

        <Link
          href="/progress"
          className="orchid-btn-secondary shrink-0 text-sm whitespace-nowrap"
        >
          {cloudUser
            ? 'إدارة الحساب والمزامنة'
            : 'ربط الحساب / نسخة التقدم'}
        </Link>
      </section>
    </div>
  );
}
