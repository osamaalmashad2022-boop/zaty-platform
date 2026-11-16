'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ListChecks,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { recordQuizSubmitted } from '@/lib/storage/progress';
import type { QuizItem } from '@/types/curriculum';

export interface StationQuizClientProps {
  stationId: string;
  stationTitle: string;
  items: QuizItem[];
}

function selectBalancedQuickItems(items: QuizItem[], count = 10): QuizItem[] {
  if (items.length <= count) return items;

  const byLesson = new Map<string, QuizItem[]>();
  for (const item of items) {
    const list = byLesson.get(item.microLessonId) ?? [];
    list.push(item);
    byLesson.set(item.microLessonId, list);
  }

  const queues = Array.from(byLesson.values());
  const picked: QuizItem[] = [];
  let round = 0;

  while (picked.length < count) {
    let addedInRound = false;
    for (const q of queues) {
      if (round < q.length && picked.length < count) {
        picked.push(q[round]);
        addedInRound = true;
      }
    }
    if (!addedInRound) break;
    round += 1;
  }

  return picked;
}

export function isQuizItemCorrect(
  item: QuizItem,
  selectedOptionIds: string[],
): boolean {
  const correctIds = item.options.filter((o) => o.isCorrect).map((o) => o.id);
  if (correctIds.length === 0 || selectedOptionIds.length !== correctIds.length) {
    return false;
  }
  const selectedSet = new Set(selectedOptionIds);
  return correctIds.every((id) => selectedSet.has(id));
}

export function StationQuizClient({
  stationId,
  stationTitle,
  items,
}: StationQuizClientProps) {
  const hasQuickOption = items.length > 10;
  const [mode, setMode] = useState<'quick' | 'full'>(
    hasQuickOption ? 'quick' : 'full',
  );
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const activeItems = useMemo(() => {
    if (mode === 'quick' && hasQuickOption) {
      return selectBalancedQuickItems(items, 10);
    }
    return items;
  }, [items, mode, hasQuickOption]);

  const handleModeSwitch = (nextMode: 'quick' | 'full') => {
    if (nextMode === mode) return;
    setMode(nextMode);
    setAnswers({});
    setSubmitted(false);
  };

  const handleToggleOption = (item: QuizItem, optionId: string) => {
    if (submitted) return;
    setAnswers((prev) => {
      const current = prev[item.id] ?? [];
      if (item.multiple) {
        const next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
        return { ...prev, [item.id]: next };
      }
      return { ...prev, [item.id]: [optionId] };
    });
  };

  const gradedResults = useMemo(() => {
    if (!submitted) return null;
    const wrongItems: QuizItem[] = [];
    let score = 0;

    for (const item of activeItems) {
      const selected = answers[item.id] ?? [];
      if (isQuizItemCorrect(item, selected)) {
        score += 1;
      } else {
        wrongItems.push(item);
      }
    }

    const total = activeItems.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    return {
      score,
      total,
      percentage,
      wrongItems,
    };
  }, [submitted, activeItems, answers]);

  const handleSubmit = async () => {
    if (submitted || submitting || activeItems.length === 0) return;
    setSubmitting(true);

    const wrongQuestionIds: string[] = [];
    const wrongMicroLessonSet = new Set<string>();
    let score = 0;

    for (const item of activeItems) {
      const selected = answers[item.id] ?? [];
      if (isQuizItemCorrect(item, selected)) {
        score += 1;
      } else {
        wrongQuestionIds.push(item.id);
        wrongMicroLessonSet.add(item.microLessonId);
      }
    }

    const total = activeItems.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    try {
      await recordQuizSubmitted(stationId, stationId, {
        mode: 'station',
        stationId,
        score,
        total,
        percentage,
        wrongQuestionIds,
        wrongMicroLessonIds: Array.from(wrongMicroLessonSet),
      });
    } catch {
      // Allow UI to display results even if storage is unavailable
    } finally {
      setSubmitted(true);
      setSubmitting(false);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const answeredCount = activeItems.filter(
    (item) => (answers[item.id]?.length ?? 0) > 0,
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/station/${stationId}`}
          className="inline-flex items-center gap-2 min-h-[48px] text-sm font-bold text-[#009179] hover:text-[#163A3A]"
        >
          <ArrowRight className="w-4 h-4 shrink-0" />
          <span>العودة إلى {stationTitle}</span>
        </Link>
      </div>

      {/* Quiz Header & Mode Switcher */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#009179]">
              <ListChecks className="w-3.5 h-3.5" />
              <span>اختبار المحطة · أسئلة الكتاب الرسمية</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#163A3A]">
              اختبار {stationTitle}
            </h1>
          </div>

          <div className="text-xs sm:text-sm font-bold text-[#163A3A] bg-[#F6FAF9] border border-[#E2ECE9] rounded-xl px-3.5 py-2 tabular-nums">
            تمت الإجابة على {answeredCount} من {activeItems.length}
          </div>
        </div>

        {hasQuickOption && (
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handleModeSwitch('quick')}
              className={`min-h-[48px] px-4 rounded-xl border text-sm font-bold transition-colors ${
                mode === 'quick'
                  ? 'bg-[#009179] text-white border-[#009179]'
                  : 'bg-[#F6FAF9] text-[#163A3A] border-[#E2ECE9] hover:border-[#009179]'
              }`}
            >
              جولة سريعة (١٠ أسئلة منتقاة)
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('full')}
              className={`min-h-[48px] px-4 rounded-xl border text-sm font-bold transition-colors ${
                mode === 'full'
                  ? 'bg-[#009179] text-white border-[#009179]'
                  : 'bg-[#F6FAF9] text-[#163A3A] border-[#E2ECE9] hover:border-[#009179]'
              }`}
            >
              جولة كاملة لكل أسئلة الكتاب ({items.length} سؤالًا)
            </button>
          </div>
        )}
      </section>

      {/* Score Breakdown after Submit */}
      {submitted && gradedResults && (
        <section className="orchid-card p-5 sm:p-6 space-y-5 border-[#009179]/40 animate-card-enter">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#009179]">
                <Sparkles className="w-4 h-4" />
                <span>
                  نتيجتك: {gradedResults.score} من {gradedResults.total}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#163A3A]">
                {gradedResults.percentage === 100
                  ? 'علامة كاملة ١٠٠٪! أتقنت المحطة بامتياز'
                  : gradedResults.percentage >= 70
                    ? 'نتيجة ممتازة! راجع النقاط القليلة المتبقية لتصل للـ ١٠٠٪'
                    : 'بداية جيدة! راجع الدروس المرتبطة بالأسئلة الخاطئة وحاول تاني'}
              </h2>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-[#E5F1EE] text-[#009179] flex flex-col items-center justify-center shrink-0">
              <span className="text-2xl font-bold tabular-nums">
                {gradedResults.percentage}٪
              </span>
            </div>
          </div>

          {gradedResults.wrongItems.length === 0 ? (
            <div className="rounded-xl bg-[#E5F1EE] border border-[#009179]/30 p-4 flex items-center gap-3 text-[#163A3A]">
              <CheckCircle2 className="w-6 h-6 text-[#009179] shrink-0" />
              <p className="text-sm font-semibold">
                لا توجد أي أخطاء في هذه الجولة! مستعد للمحطة التالية أو للامتحان الشامل.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#163A3A]">
                مراجعة الأسئلة اللي محتاجة تركيز ({gradedResults.wrongItems.length})
              </h3>

              <ul className="space-y-3">
                {gradedResults.wrongItems.map((item) => {
                  const selectedIds = answers[item.id] ?? [];
                  const chosenTexts = item.options
                    .filter((o) => selectedIds.includes(o.id))
                    .map((o) => o.text);
                  const correctTexts = item.options
                    .filter((o) => o.isCorrect)
                    .map((o) => o.text);

                  return (
                    <li
                      key={item.id}
                      className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <XCircle className="w-5 h-5 text-[#E14B63] shrink-0 mt-0.5" />
                        <div className="space-y-2 min-w-0 flex-1">
                          <p className="font-bold text-[#163A3A]">
                            {item.question}
                          </p>
                          {item.code && (
                            <pre
                              dir="ltr"
                              className="rounded-lg bg-[#0F2929] text-[#F6FAF9] p-3 text-sm font-mono overflow-x-auto text-left"
                            >
                              <code>{item.code}</code>
                            </pre>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                        <div className="rounded-lg bg-[#FBEAEC] text-[#163A3A] px-3 py-2">
                          <span className="font-bold text-[#E14B63]">إجابتك: </span>
                          <span>
                            {chosenTexts.length > 0
                              ? chosenTexts.join('، ')
                              : 'لم تُجب على السؤال'}
                          </span>
                        </div>
                        <div className="rounded-lg bg-[#E5F1EE] text-[#163A3A] px-3 py-2">
                          <span className="font-bold text-[#009179]">
                            الإجابة الصحيحة:{' '}
                          </span>
                          <span>{correctTexts.join('، ')}</span>
                        </div>
                      </div>

                      <p className="text-sm text-[#3B5A58] leading-relaxed">
                        <span className="font-bold text-[#163A3A]">التفسير: </span>
                        {item.explanation}
                      </p>

                      <div className="pt-1">
                        <Link
                          href={`/lesson/${item.microLessonId}`}
                          className="inline-flex items-center gap-2 min-h-[48px] px-4 py-2 rounded-lg bg-white border border-[#009179] text-sm font-bold text-[#009179] hover:bg-[#E5F1EE] transition-colors"
                        >
                          <span>راجع الدرس اللي فيه النقطة دي</span>
                          <ArrowLeft className="w-4 h-4 shrink-0" />
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={handleRetry}
              className="orchid-btn-primary"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>إعادة الاختبار</span>
            </button>

            <Link href={`/station/${stationId}`} className="orchid-btn-secondary">
              <span>العودة للمحطة</span>
            </Link>
          </div>
        </section>
      )}

      {/* Question Cards */}
      {!submitted && (
        <div className="space-y-4">
          {activeItems.map((item, idx) => {
            const selected = answers[item.id] ?? [];
            return (
              <article key={item.id} className="orchid-card p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-[#009179]">
                    سؤال {idx + 1} من {activeItems.length}
                  </span>
                  <span className="text-[#3B5A58] bg-[#F6FAF9] px-2.5 py-0.5 rounded-full border border-[#E2ECE9]">
                    {item.kind === 'trueFalse'
                      ? 'صواب أم خطأ'
                      : item.kind === 'code'
                        ? 'تحليل كود'
                        : 'اختيار من متعدد'}
                    {item.sourceTag ? ` · ${item.sourceTag}` : ''}
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

          {activeItems.length > 0 && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="orchid-btn-primary w-full sm:w-auto min-w-[220px] min-h-[54px] text-base"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{submitting ? 'جاري التصحيح...' : 'تسليم الاختبار'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
