'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ListOrdered,
  RotateCcw,
  Workflow,
  XCircle,
} from 'lucide-react';
import type {
  FlowchartShape,
  OrderFlowBuilderData,
  OrderFlowItem,
} from '@/types/curriculum';
import { InlineFormatted } from './FormattedText';
import type { BlockInteractionProps } from './types';

export interface OrderFlowBuilderBlockProps extends BlockInteractionProps {
  data: OrderFlowBuilderData;
}

const SHAPE_LABELS: Record<FlowchartShape, string> = {
  oval: 'بيضاوي · بداية/نهاية',
  parallelogram: 'متوازي أضلاع · إدخال/إخراج',
  rectangle: 'مستطيل · عملية',
  diamond: 'معيّن · قرار/شرط',
};

function shuffleAvoidingAnswer(
  items: OrderFlowItem[],
  correctOrder: string[]
): OrderFlowItem[] {
  if (items.length <= 1) return [...items];
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  const matchesCorrect = copy.every((item, idx) => item.id === correctOrder[idx]);
  if (matchesCorrect) {
    const first = copy.shift();
    if (first) copy.push(first);
  }
  return copy;
}

function FlowchartNodeVisual({
  shape,
  label,
  status,
}: {
  shape: FlowchartShape;
  label: string;
  status: 'neutral' | 'selected' | 'correct' | 'wrong';
}) {
  const strokeColor =
    status === 'correct'
      ? '#006E5A'
      : status === 'wrong'
        ? '#E14B63'
        : status === 'selected'
          ? '#006E5A'
          : '#163A3A';
  const fillColor =
    status === 'correct'
      ? '#E5F1EE'
      : status === 'wrong'
        ? '#FBEAEC'
        : status === 'selected'
          ? '#E5F1EE'
          : '#FFFFFF';

  if (shape === 'oval') {
    return (
      <div
        className="flex min-h-[48px] w-full items-center justify-center rounded-full border-2 px-5 py-2.5 text-center font-semibold text-[#163A3A] transition-colors"
        style={{ borderColor: strokeColor, backgroundColor: fillColor }}
      >
        <InlineFormatted text={label} />
      </div>
    );
  }

  if (shape === 'parallelogram') {
    return (
      <div className="relative flex min-h-[54px] w-full items-center justify-center px-6 py-2.5">
        <svg
          aria-hidden="true"
          viewBox="0 0 320 64"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <polygon
            points="28,4 316,4 292,60 4,60"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="3"
          />
        </svg>
        <span className="relative z-10 text-center text-[15px] font-semibold text-[#163A3A]">
          <InlineFormatted text={label} />
        </span>
      </div>
    );
  }

  if (shape === 'diamond') {
    return (
      <div className="relative flex min-h-[76px] w-full items-center justify-center px-8 py-4">
        <svg
          aria-hidden="true"
          viewBox="0 0 320 96"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <polygon
            points="160,4 316,48 160,92 4,48"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="3"
          />
        </svg>
        <span className="relative z-10 max-w-[75%] text-center text-[15px] font-semibold leading-snug text-[#163A3A]">
          <InlineFormatted text={label} />
        </span>
      </div>
    );
  }

  // Default: rectangle
  return (
    <div
      className="flex min-h-[48px] w-full items-center justify-center rounded-lg border-2 px-4 py-2.5 text-center font-semibold text-[#163A3A] transition-colors"
      style={{ borderColor: strokeColor, backgroundColor: fillColor }}
    >
      <InlineFormatted text={label} />
    </div>
  );
}

export function OrderFlowBuilderBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: OrderFlowBuilderBlockProps) {
  const [orderedItems, setOrderedItems] = useState<OrderFlowItem[]>(data.items);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const dataSignature = JSON.stringify({
    mode: data.mode,
    prompt: data.prompt,
    items: data.items.map((i) => i.id),
    correctOrder: data.correctOrder,
  });

  useEffect(() => {
    setOrderedItems(shuffleAvoidingAnswer(data.items, data.correctOrder));
    setSelectedIndex(null);
    setChecked(false);
    setAttemptCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSignature]);

  const swapPositions = (indexA: number, indexB: number) => {
    if (
      indexA < 0 ||
      indexB < 0 ||
      indexA >= orderedItems.length ||
      indexB >= orderedItems.length ||
      indexA === indexB
    ) {
      return;
    }
    setOrderedItems((prev) => {
      const next = [...prev];
      [next[indexA], next[indexB]] = [next[indexB], next[indexA]];
      return next;
    });
    setSelectedIndex(null);
    setChecked(false);
  };

  const handleRowTap = (idx: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(idx);
      return;
    }
    if (selectedIndex === idx) {
      setSelectedIndex(null);
      return;
    }
    swapPositions(selectedIndex, idx);
  };

  const handleCheck = () => {
    const nextAttempt = attemptCount + 1;
    const isCorrect = orderedItems.every(
      (item, idx) => item.id === data.correctOrder[idx]
    );
    setAttemptCount(nextAttempt);
    setChecked(true);

    onInteract?.();
    onAttempt?.({
      isCorrect,
      attemptNumber: nextAttempt,
    });
    onComplete?.(isCorrect);
  };

  const handleReset = () => {
    setOrderedItems(shuffleAvoidingAnswer(data.items, data.correctOrder));
    setSelectedIndex(null);
    setChecked(false);
  };

  const isAllCorrect =
    checked && orderedItems.every((item, idx) => item.id === data.correctOrder[idx]);

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-5 ${className}`}
    >
      <div className="space-y-1.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
          {data.mode === 'flowchart' ? (
            <>
              <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
              <span>بناء خريطة التدفق Flowchart</span>
            </>
          ) : (
            <>
              <ListOrdered className="h-3.5 w-3.5" aria-hidden="true" />
              <span>رتّب الخطوات</span>
            </>
          )}
        </span>

        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A] leading-relaxed">
          <InlineFormatted text={data.prompt} />
        </h3>

        <p className="text-sm text-[#3B5A58]">
          {selectedIndex !== null
            ? 'اضغط على خطوة تانية علشان تبدّل مكانها مع الخطوة المحددة، أو استخدم أسهم ↑ ↓.'
            : 'رتّب العناصر بأسهم ↑ ↓ أو اضغط على خطوتين لتبديل مكانهما.'}
        </p>
      </div>

      <ol className="space-y-2">
        {orderedItems.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          const isPositionCorrect = checked && item.id === data.correctOrder[idx];
          const isPositionWrong = checked && item.id !== data.correctOrder[idx];
          const status: 'neutral' | 'selected' | 'correct' | 'wrong' = isPositionCorrect
            ? 'correct'
            : isPositionWrong
              ? 'wrong'
              : isSelected
                ? 'selected'
                : 'neutral';

          const shape = item.shape ?? 'rectangle';

          return (
            <li key={item.id} className="space-y-1.5">
              <div
                className={`flex items-center gap-2 rounded-xl border p-2.5 transition-colors ${
                  status === 'correct'
                    ? 'border-[#006E5A] bg-[#E5F1EE]/50'
                    : status === 'wrong'
                      ? 'border-[#E14B63] bg-[#FBEAEC]/50'
                      : status === 'selected'
                        ? 'border-[#006E5A] bg-[#E5F1EE]/60'
                        : 'border-[#E2ECE9] bg-[#F6FAF9]'
                }`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white border border-[#E2ECE9] text-sm font-bold text-[#163A3A]">
                  {idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRowTap(idx)}
                  aria-pressed={isSelected}
                  className="flex-1 text-right focus:outline-none"
                >
                  {data.mode === 'flowchart' ? (
                    <div className="space-y-1">
                      <FlowchartNodeVisual
                        shape={shape}
                        label={item.label}
                        status={status}
                      />
                      <span className="block text-center text-[11px] font-medium text-[#3B5A58]">
                        {SHAPE_LABELS[shape]}
                      </span>
                    </div>
                  ) : (
                    <div className="min-h-[48px] flex items-center px-2 py-1 text-[16px] font-medium text-[#163A3A]">
                      <InlineFormatted text={item.label} />
                    </div>
                  )}
                </button>

                <div className="flex shrink-0 flex-col gap-1">
                  <button
                    type="button"
                    aria-label={`تحريك العنصر ${idx + 1} لأعلى`}
                    disabled={idx === 0}
                    onClick={() => swapPositions(idx, idx - 1)}
                    className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-[#E2ECE9] bg-white text-[#163A3A] hover:border-[#006E5A] disabled:opacity-35"
                  >
                    <ArrowUp className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={`تحريك العنصر ${idx + 1} لأسفل`}
                    disabled={idx === orderedItems.length - 1}
                    onClick={() => swapPositions(idx, idx + 1)}
                    className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-[#E2ECE9] bg-white text-[#163A3A] hover:border-[#006E5A] disabled:opacity-35"
                  >
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {data.mode === 'flowchart' && idx < orderedItems.length - 1 && (
                <div className="flex justify-center" aria-hidden="true">
                  <ArrowDown className="h-4 w-4 text-[#006E5A]" />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCheck}
          className="min-h-[48px] flex-1 rounded-lg bg-[#006E5A] px-5 text-base font-bold text-white hover:bg-[#007a66]"
        >
          تحقق من الترتيب
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] px-4 text-sm font-bold text-[#163A3A]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span>خلط تاني</span>
        </button>
      </div>

      {checked && (
        <div
          role="status"
          className={`rounded-xl border p-4 ${
            isAllCorrect
              ? 'border-[#006E5A]/40 bg-[#E5F1EE]'
              : 'border-[#E14B63]/40 bg-[#FBEAEC]'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {isAllCorrect ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#006E5A]" aria-hidden="true" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#E14B63]" aria-hidden="true" />
            )}
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-[#163A3A]">
                {isAllCorrect ? data.feedback.correct : data.feedback.incorrect}
              </p>
              {!isAllCorrect && (
                <p className="text-xs sm:text-sm text-[#3B5A58]">
                  الخطوات الخضراء في مكانها الصح، والمرجانية محتاجة تتعدل. جرّب تعدّلها واضغط
                  «تحقق» تاني!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
