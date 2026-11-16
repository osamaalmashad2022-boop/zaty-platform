'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Eye,
  EyeOff,
  RotateCcw,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { getLearnerStats, recordQuizSubmitted } from '@/lib/storage/progress';
import type { LearnerStats, LessonPack, QuizItem, StationPack } from '@/types/curriculum';
import { isQuizItemCorrect } from './StationQuizClient';

export interface ExamStationSummary {
  id: string;
  number: number;
  title: string;
  lessons: Array<Pick<LessonPack, 'id' | 'title'>>;
}

export interface ExamClientProps {
  stations: Array<
    Pick<StationPack, 'id' | 'number' | 'title'> & {
      lessons: Array<Pick<LessonPack, 'id' | 'title'>>;
    }
  >;
  quizPool: QuizItem[];
}

function buildBalancedExamItems(
  pool: QuizItem[],
  selectedStations: string[],
  limit: number,
): QuizItem[] {
  const filtered = pool.filter((q) => selectedStations.includes(q.stationId));
  if (filtered.length <= limit) return filtered;

  // Interleave across stations so the mixed exam covers all selected stations fairly
  const byStation = new Map<string, QuizItem[]>();
  for (const stId of selectedStations) {
    byStation.set(
      stId,
      filtered.filter((q) => q.stationId === stId),
    );
  }

  const queues = Array.from(byStation.values());
  const picked: QuizItem[] = [];
  let round = 0;

  while (picked.length < limit) {
    let added = false;
    for (const q of queues) {
      if (round < q.length && picked.length < limit) {
        picked.push(q[round]);
        added = true;
      }
    }
    if (!added) break;
    round += 1;
  }

  return picked;
}

function formatClock(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function ExamClient({ stations, quizPool }: ExamClientProps) {
  const availableStationIds = useMemo(
    () =>
      stations
        .filter((s) => quizPool.some((q) => q.stationId === s.id))
        .map((s) => s.id),
    [stations, quizPool],
  );

  const [selectedStations, setSelectedStations] = useState<string[]>(
    availableStationIds,
  );
  const [questionLimit, setQuestionLimit] = useState<number>(15);
  const [durationMinutes, setDurationMinutes] = useState<number>(15);
  const [phase, setPhase] = useState<'setup' | 'active' | 'report'>('setup');
  const [examItems, setExamItems] = useState<QuizItem[]>([]);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60);
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState<LearnerStats | null>(null);

  const lessonTitleMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const st of stations) {
      for (const l of st.lessons) {
        map.set(l.id, l.title);
      }
    }
    return map;
  }, [stations]);

  const stationTitleMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const st of stations) {
      map.set(st.id, `المحطة ${st.number}: ${st.title}`);
    }
    return map;
  }, [stations]);

  useEffect(() => {
    let cancelled = false;
    getLearnerStats()
      .then((loaded) => {
        if (cancelled) return;
        setStats(loaded);
        const completedStations = stations
          .filter((s) => {
            const sum = loaded.stationProgress[s.id];
            return (
              sum &&
              ((sum.totalLessons > 0 &&
                sum.completedLessons >= sum.totalLessons) ||
                sum.completedLessons > 0) &&
              availableStationIds.includes(s.id)
            );
          })
          .map((s) => s.id);
        if (completedStations.length > 0) {
          setSelectedStations(completedStations);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [stations, availableStationIds]);

  const submitExam = useCallback(async () => {
    if (phase !== 'active' || submitting) return;
    setSubmitting(true);

    const stationBreakdown: Record<string, { correct: number; total: number }> =
      {};
    const wrongQuestionIds: string[] = [];
    const wrongMicroLessonSet = new Set<string>();
    let score = 0;

    for (const item of examItems) {
      if (!stationBreakdown[item.stationId]) {
        stationBreakdown[item.stationId] = { correct: 0, total: 0 };
      }
      stationBreakdown[item.stationId].total += 1;

      const selected = answers[item.id] ?? [];
      if (isQuizItemCorrect(item, selected)) {
        score += 1;
        stationBreakdown[item.stationId].correct += 1;
      } else {
        wrongQuestionIds.push(item.id);
        wrongMicroLessonSet.add(item.microLessonId);
      }
    }

    const total = examItems.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    try {
      await recordQuizSubmitted('exam', undefined, {
        mode: 'exam',
        score,
        total,
        percentage,
        wrongQuestionIds,
        wrongMicroLessonIds: Array.from(wrongMicroLessonSet),
        stationBreakdown,
      });
    } catch {
      // Continue cleanly to report
    } finally {
      setPhase('report');
      setSubmitting(false);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [phase, submitting, examItems, answers]);

  useEffect(() => {
    if (phase !== 'active') return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === 'active' && secondsLeft === 0) {
      void submitExam();
    }
  }, [phase, secondsLeft, submitExam]);

  const toggleStation = (stationId: string) => {
    setSelectedStations((prev) =>
      prev.includes(stationId)
        ? prev.filter((id) => id !== stationId)
        : [...prev, stationId],
    );
  };

  const handleStartExam = () => {
    if (selectedStations.length === 0) return;
    const picked = buildBalancedExamItems(
      quizPool,
      selectedStations,
      questionLimit,
    );
    if (picked.length === 0) return;
    setExamItems(picked);
    setAnswers({});
    setSecondsLeft(durationMinutes * 60);
    setPhase('active');
  };

  const handleToggleOption = (item: QuizItem, optionId: string) => {
    setAnswers((prev) => {
      const current = prev[item.id] ?? [];
      if (item.multiple) {
        return {
          ...prev,
          [item.id]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      }
      return { ...prev, [item.id]: [optionId] };
    });
  };

  const report = useMemo(() => {
    if (phase !== 'report') return null;

    const breakdown: Array<{
      stationId: string;
      label: string;
      correct: number;
      total: number;
      pct: number;
    }> = [];
    const byStation = new Map<string, { correct: number; total: number }>();
    const wrongLessonSet = new Set<string>();
    let score = 0;

    for (const item of examItems) {
      const entry = byStation.get(item.stationId) ?? { correct: 0, total: 0 };
      entry.total += 1;
      const ok = isQuizItemCorrect(item, answers[item.id] ?? []);
      if (ok) {
        score += 1;
        entry.correct += 1;
      } else {
        wrongLessonSet.add(item.microLessonId);
      }
      byStation.set(item.stationId, entry);
    }

    for (const [stationId, data] of byStation.entries()) {
      breakdown.push({
        stationId,
        label: stationTitleMap.get(stationId) ?? stationId,
        correct: data.correct,
        total: data.total,
        pct: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      });
    }

    breakdown.sort((a, b) => b.pct - a.pct);
    const strongest = breakdown[0] ?? null;
    const weakest =
      breakdown.length > 1
        ? breakdown[breakdown.length - 1]
        : breakdown[0] && breakdown[0].pct < 100
          ? breakdown[0]
          : null;

    const total = examItems.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    return {
      score,
      total,
      percentage,
      breakdown,
      strongest,
      weakest,
      wrongLessonIds: Array.from(wrongLessonSet),
    };
  }, [phase, examItems, answers, stationTitleMap]);

  if (phase === 'setup') {
    return (
      <div className="space-y-6">
        <section className="orchid-card p-5 sm:p-6 space-y-5">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#009179]">
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>وضع الامتحان المختلط</span>
            </span>
            <h1 className="text-2xl font-bold text-[#163A3A]">
              جهّز امتحانك التجريبي
            </h1>
            <p className="text-sm text-[#3B5A58]">
              اختر المحطات اللي خلّصتها (أو أي محطات تحب تختبر نفسك فيها) مع مؤقت
              هادئ يمكن إخفاؤه في أي وقت.
            </p>
          </div>

          {/* Station Multi-Select */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-[#163A3A]">
                المحطات المشمولة ({selectedStations.length} من{' '}
                {availableStationIds.length})
              </h2>
              <button
                type="button"
                onClick={() => setSelectedStations(availableStationIds)}
                className="text-xs font-bold text-[#009179] hover:underline min-h-[36px] px-2"
              >
                تحديد الكل
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {stations.map((st) => {
                const qCount = quizPool.filter(
                  (q) => q.stationId === st.id,
                ).length;
                if (qCount === 0) return null;
                const checked = selectedStations.includes(st.id);
                const sum = stats?.stationProgress[st.id];
                const isDone =
                  sum &&
                  sum.totalLessons > 0 &&
                  sum.completedLessons >= sum.totalLessons;

                return (
                  <button
                    key={st.id}
                    type="button"
                    aria-pressed={checked}
                    onClick={() => toggleStation(st.id)}
                    className={`min-h-[54px] px-4 py-3 rounded-xl border text-right flex items-center justify-between gap-3 transition-colors ${
                      checked
                        ? 'bg-[#E5F1EE] border-[#009179] text-[#163A3A]'
                        : 'bg-[#F6FAF9] border-[#E2ECE9] text-[#3B5A58]'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold truncate">
                        المحطة {st.number}: {st.title}
                      </div>
                      <div className="text-xs text-[#3B5A58]">
                        {qCount} سؤال {isDone ? '· مكتملة ✓' : ''}
                      </div>
                    </div>
                    {checked && (
                      <CheckCircle2 className="w-5 h-5 text-[#009179] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Count & Timer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="block text-sm font-bold text-[#163A3A]">
                عدد الأسئلة
              </span>
              <div className="flex gap-2">
                {[10, 15, 25].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setQuestionLimit(n)}
                    className={`flex-1 min-h-[48px] rounded-xl border text-sm font-bold ${
                      questionLimit === n
                        ? 'bg-[#009179] text-white border-[#009179]'
                        : 'bg-[#F6FAF9] text-[#163A3A] border-[#E2ECE9]'
                    }`}
                  >
                    {n} أسئلة
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-sm font-bold text-[#163A3A]">
                مدة المؤقت الهادئ
              </span>
              <div className="flex gap-2">
                {[10, 15, 25].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDurationMinutes(m)}
                    className={`flex-1 min-h-[48px] rounded-xl border text-sm font-bold ${
                      durationMinutes === m
                        ? 'bg-[#009179] text-white border-[#009179]'
                        : 'bg-[#F6FAF9] text-[#163A3A] border-[#E2ECE9]'
                    }`}
                  >
                    {m} د
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartExam}
            disabled={selectedStations.length === 0}
            className="orchid-btn-primary w-full sm:w-auto min-w-[240px] min-h-[54px] text-base"
          >
            <span>ابدأ الامتحان</span>
            <ArrowLeft className="w-5 h-5 shrink-0" />
          </button>
        </section>
      </div>
    );
  }

  if (phase === 'active') {
    const answeredCount = examItems.filter(
      (item) => (answers[item.id]?.length ?? 0) > 0,
    ).length;

    return (
      <div className="space-y-5">
        {/* Sticky Calm Timer Bar */}
        <div className="orchid-card p-4 flex flex-wrap items-center justify-between gap-3 sticky top-[72px] z-20">
          <div className="text-sm font-bold text-[#163A3A] tabular-nums">
            أجبت على {answeredCount} من {examItems.length} سؤال
          </div>

          <div className="flex items-center gap-2">
            {showTimer && (
              <span
                dir="ltr"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#E5F1EE] text-[#163A3A] px-3.5 py-2 font-mono text-sm font-bold tabular-nums"
              >
                <Clock className="w-4 h-4 text-[#009179]" />
                <span>{formatClock(secondsLeft)}</span>
              </span>
            )}

            <button
              type="button"
              onClick={() => setShowTimer((s) => !s)}
              className="orchid-btn-secondary text-xs sm:text-sm px-3"
            >
              {showTimer ? (
                <>
                  <EyeOff className="w-4 h-4 shrink-0" />
                  <span>إخفاء المؤقت</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 shrink-0" />
                  <span>إظهار المؤقت</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {examItems.map((item, idx) => {
            const selected = answers[item.id] ?? [];
            return (
              <article key={item.id} className="orchid-card p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-[#009179]">
                    سؤال {idx + 1} من {examItems.length}
                  </span>
                  <span className="text-[#3B5A58] bg-[#F6FAF9] px-2.5 py-0.5 rounded-full border border-[#E2ECE9]">
                    {stationTitleMap.get(item.stationId) ?? item.stationId}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#163A3A]">
                  {item.question}
                </h2>

                {item.code && (
                  <pre
                    dir="ltr"
                    className="rounded-xl bg-[#0F2929] text-[#F6FAF9] p-4 text-sm font-mono overflow-x-auto text-left"
                  >
                    <code>{item.code}</code>
                  </pre>
                )}

                <div className="space-y-2.5">
                  {item.options.map((opt) => {
                    const isSelected = selected.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleToggleOption(item, opt.id)}
                        className={`w-full min-h-[48px] px-4 py-3 rounded-xl border text-right text-sm sm:text-base font-medium transition-colors flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#E5F1EE] border-[#009179] text-[#163A3A] font-bold'
                            : 'bg-[#F6FAF9] border-[#E2ECE9] text-[#3B5A58] hover:border-[#009179] hover:bg-white'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-[#009179] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={submitExam}
            disabled={submitting}
            className="orchid-btn-primary w-full sm:w-auto min-w-[220px] min-h-[54px] text-base"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{submitting ? 'جاري إعداد التقرير...' : 'تسليم الامتحان'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {report && (
        <section className="orchid-card p-5 sm:p-7 space-y-6 animate-card-enter">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2ECE9] pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#009179]">
                تقرير نتيجة الامتحان
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#163A3A]">
                درجتك: {report.score} من {report.total} ({report.percentage}٪)
              </h1>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-[#E5F1EE] text-[#009179] flex items-center justify-center text-2xl font-bold tabular-nums">
              {report.percentage}٪
            </div>
          </div>

          {/* Strongest & Weakest Stations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.strongest && (
              <div className="rounded-xl border border-[#009179]/30 bg-[#E5F1EE]/60 p-4 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#009179]">
                  <TrendingUp className="w-4 h-4" />
                  <span>أقوى محطة</span>
                </div>
                <p className="text-base font-bold text-[#163A3A]">
                  {report.strongest.label}
                </p>
                <p className="text-xs text-[#3B5A58] tabular-nums">
                  {report.strongest.correct} من {report.strongest.total} (
                  {report.strongest.pct}٪)
                </p>
              </div>
            )}

            {report.weakest && (
              <div className="rounded-xl border border-[#E14B63]/30 bg-[#FBEAEC]/70 p-4 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E14B63]">
                  <TrendingDown className="w-4 h-4" />
                  <span>أضعف محطة</span>
                </div>
                <p className="text-base font-bold text-[#163A3A]">
                  {report.weakest.label}
                </p>
                <p className="text-xs text-[#3B5A58] tabular-nums">
                  {report.weakest.correct} من {report.weakest.total} (
                  {report.weakest.pct}٪)
                </p>
              </div>
            )}
          </div>

          {/* Station Breakdown */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#163A3A]">
              الأداء حسب المحطة
            </h2>
            <ul className="space-y-2.5">
              {report.breakdown.map((row) => (
                <li
                  key={row.stationId}
                  className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3.5 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 text-sm font-bold text-[#163A3A]">
                    <span>{row.label}</span>
                    <span className="tabular-nums text-[#009179]">
                      {row.correct}/{row.total} ({row.pct}٪)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E2ECE9] overflow-hidden">
                    <div
                      className="h-full bg-[#009179] rounded-full"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons to Review */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#163A3A]">
              الدروس المقترح مراجعتها
            </h2>
            {report.wrongLessonIds.length === 0 ? (
              <p className="text-sm text-[#009179] font-semibold bg-[#E5F1EE] rounded-xl p-4">
                أداء رائع! لا توجد دروس تحتاج للمراجعة من هذا الامتحان.
              </p>
            ) : (
              <ul className="space-y-2">
                {report.wrongLessonIds.map((lessonId) => (
                  <li
                    key={lessonId}
                    className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3.5 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#009179]">
                        الدرس {lessonId}
                      </span>
                      <p className="text-sm font-bold text-[#163A3A]">
                        {lessonTitleMap.get(lessonId) ?? `مراجعة الدرس ${lessonId}`}
                      </p>
                    </div>
                    <Link
                      href={`/lesson/${lessonId}`}
                      className="inline-flex items-center gap-1.5 min-h-[48px] px-4 rounded-lg bg-white border border-[#009179] text-sm font-bold text-[#009179] hover:bg-[#E5F1EE]"
                    >
                      <span>راجع الدرس</span>
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPhase('setup')}
              className="orchid-btn-primary"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>امتحان جديد</span>
            </button>
            <Link href="/" className="orchid-btn-secondary">
              العودة للرئيسية
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
