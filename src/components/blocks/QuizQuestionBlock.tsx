'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, HelpCircle, RotateCcw, XCircle } from 'lucide-react';
import type { QuizOption, QuizQuestionData } from '@/types/curriculum';
import { InlineFormatted } from './FormattedText';
import { PythonCodeLines } from './pythonHighlight';
import type { BlockInteractionProps } from './types';

export interface QuizQuestionBlockProps extends BlockInteractionProps {
  data: QuizQuestionData;
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function QuizQuestionBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: QuizQuestionBlockProps) {
  const [options, setOptions] = useState<QuizOption[]>(data.options);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const dataSignature = JSON.stringify({
    question: data.question,
    multiple: data.multiple,
    randomizeOptions: data.randomizeOptions,
    options: data.options.map((o) => o.id),
  });

  useEffect(() => {
    setSelectedIds([]);
    setSubmitted(false);
    setAttemptCount(0);
    setOptions(data.randomizeOptions ? shuffleArray(data.options) : data.options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSignature]);

  const correctOptionIds = options.filter((o) => o.isCorrect).map((o) => o.id);

  const checkAnswer = (nextSelectedIds: string[]) => {
    const nextAttempt = attemptCount + 1;
    const isCorrect =
      nextSelectedIds.length === correctOptionIds.length &&
      correctOptionIds.every((id) => nextSelectedIds.includes(id));

    setAttemptCount(nextAttempt);
    setSubmitted(true);

    onInteract?.();
    onAttempt?.({
      isCorrect,
      attemptNumber: nextAttempt,
    });
    onComplete?.(isCorrect);
  };

  const handleOptionClick = (optionId: string) => {
    if (!data.multiple) {
      const next = [optionId];
      setSelectedIds(next);
      checkAnswer(next);
      return;
    }

    setSubmitted(false);
    setSelectedIds((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };

  const handleReset = () => {
    setSelectedIds([]);
    setSubmitted(false);
  };

  const isAllCorrect =
    submitted &&
    selectedIds.length === correctOptionIds.length &&
    correctOptionIds.every((id) => selectedIds.includes(id));

  const primarySelectedOption =
    !data.multiple && selectedIds.length === 1
      ? options.find((o) => o.id === selectedIds[0])
      : undefined;

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-4 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
            data.scored
              ? 'bg-[#E5F1EE] text-[#006E5A]'
              : 'bg-[#F6FAF9] border border-[#E2ECE9] text-[#3B5A58]'
          }`}
        >
          <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{data.scored ? 'تحقق سريع محسوب' : 'تدريب فوري بدون درجات'}</span>
        </span>

        {data.sourceTag && (
          <span className="rounded-full border border-[#E2ECE9] bg-[#F6FAF9] px-3 py-1 text-xs font-medium text-[#3B5A58]">
            {data.sourceTag}
          </span>
        )}
      </div>

      <h3 className="text-lg sm:text-xl font-bold leading-relaxed text-[#163A3A]">
        <InlineFormatted text={data.question} />
      </h3>

      {data.multiple && (
        <p className="text-sm font-medium text-[#3B5A58]">
          يمكنك اختيار أكثر من إجابة صحيحة ثم الضغط على «تحقق من الإجابة».
        </p>
      )}

      {data.code && (
        <div className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929]">
          <PythonCodeLines code={data.code} />
        </div>
      )}

      <div className="space-y-2.5" role={data.multiple ? 'group' : 'radiogroup'}>
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          let containerClasses =
            'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#006E5A]/60';

          if (submitted && isSelected) {
            containerClasses = option.isCorrect
              ? 'border-[#006E5A] bg-[#E5F1EE] text-[#163A3A]'
              : 'border-[#E14B63] bg-[#FBEAEC] text-[#163A3A]';
          } else if (isSelected) {
            containerClasses = 'border-[#006E5A] bg-[#E5F1EE]/70 text-[#163A3A]';
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionClick(option.id)}
              aria-pressed={isSelected}
              className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-lg border-2 px-4 py-3 text-right transition-colors ${containerClasses}`}
            >
              <span className="flex-1 text-[16px] sm:text-[17px] font-medium leading-relaxed">
                <InlineFormatted text={option.text} />
              </span>

              {submitted && isSelected && (
                <span className="shrink-0">
                  {option.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-[#006E5A]" aria-hidden="true" />
                  ) : (
                    <XCircle className="h-5 w-5 text-[#E14B63]" aria-hidden="true" />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {data.multiple && (
        <button
          type="button"
          disabled={selectedIds.length === 0}
          onClick={() => checkAnswer(selectedIds)}
          className="min-h-[48px] w-full rounded-lg bg-[#006E5A] px-5 text-base font-bold text-white transition-colors hover:bg-[#007a66] disabled:opacity-40"
        >
          تحقق من الإجابة
        </button>
      )}

      {submitted && (
        <div
          role="status"
          className={`rounded-xl border p-4 space-y-2 ${
            isAllCorrect
              ? 'border-[#006E5A]/40 bg-[#E5F1EE]'
              : 'border-[#E14B63]/40 bg-[#FBEAEC]'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-sm font-bold ${
                isAllCorrect ? 'text-[#006E5A]' : 'text-[#E14B63]'
              }`}
            >
              {isAllCorrect ? (
                <>
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  <span>إجابة ممتازة!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5" aria-hidden="true" />
                  <span>قريبة! خلّينا نراجع الفكرة سوا</span>
                </>
              )}
            </span>

            {!isAllCorrect && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-bold text-[#163A3A] border border-[#E2ECE9]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>حاول تاني</span>
              </button>
            )}
          </div>

          {primarySelectedOption?.feedback && (
            <p className="text-[15px] sm:text-base leading-relaxed text-[#163A3A]">
              <InlineFormatted text={primarySelectedOption.feedback} />
            </p>
          )}

          {data.multiple && (
            <div className="space-y-1.5">
              {options
                .filter((o) => selectedIds.includes(o.id) && o.feedback)
                .map((o) => (
                  <p key={o.id} className="text-[15px] leading-relaxed text-[#163A3A]">
                    • <InlineFormatted text={o.feedback} />
                  </p>
                ))}
            </div>
          )}

          {data.explanation && (
            <p className="text-sm leading-relaxed text-[#3B5A58]">
              <InlineFormatted text={data.explanation} />
            </p>
          )}
        </div>
      )}
    </section>
  );
}
