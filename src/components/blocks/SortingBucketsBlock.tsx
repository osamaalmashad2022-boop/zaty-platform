'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, FolderInput, RotateCcw, XCircle } from 'lucide-react';
import type { SortingBucketsData, SortingItem } from '@/types/curriculum';
import { InlineFormatted } from './FormattedText';
import type { BlockInteractionProps } from './types';

export interface SortingBucketsBlockProps extends BlockInteractionProps {
  data: SortingBucketsData;
}

function shuffleItems(items: SortingItem[]): SortingItem[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function SortingBucketsBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: SortingBucketsBlockProps) {
  const [poolOrder, setPoolOrder] = useState<SortingItem[]>(data.items);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const dataSignature = JSON.stringify({
    prompt: data.prompt,
    buckets: data.buckets.map((b) => b.id),
    items: data.items.map((i) => i.id),
  });

  useEffect(() => {
    setPoolOrder(shuffleItems(data.items));
    setPlacements({});
    setSelectedItemId(null);
    setDraggedItemId(null);
    setChecked(false);
    setAttemptCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSignature]);

  const unassignedItems = poolOrder.filter((item) => !placements[item.id]);
  const allPlaced = data.items.length > 0 && unassignedItems.length === 0;

  const assignToBucket = (itemId: string, bucketId: string) => {
    setPlacements((prev) => ({ ...prev, [itemId]: bucketId }));
    setSelectedItemId(null);
    setDraggedItemId(null);
    setChecked(false);
  };

  const removeFromBucket = (itemId: string) => {
    setPlacements((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setChecked(false);
  };

  const handleCheck = () => {
    const nextAttempt = attemptCount + 1;
    const isCorrect = data.items.every((item) => placements[item.id] === item.bucketId);
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
    setPlacements({});
    setSelectedItemId(null);
    setChecked(false);
  };

  const isAllCorrect =
    checked && data.items.every((item) => placements[item.id] === item.bucketId);

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-5 ${className}`}
    >
      <div className="space-y-1.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
          <FolderInput className="h-3.5 w-3.5" aria-hidden="true" />
          <span>نشاط تصنيف تفاعلي</span>
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A] leading-relaxed">
          <InlineFormatted text={data.prompt} />
        </h3>
        <p className="text-sm text-[#3B5A58]">
          {selectedItemId
            ? 'دلوقتي اضغط على الفئة المناسبة تحت علشان تحط العنصر جواها.'
            : 'اضغط على العنصر وبعدين اضغط على الفئة المناسبة (أو اسحبه مباشرة).'}
        </p>
      </div>

      {/* Unassigned items pool */}
      <div className="rounded-xl border border-dashed border-[#006E5A]/40 bg-[#F6FAF9] p-3.5">
        <p className="mb-2.5 text-xs font-bold text-[#3B5A58]">
          العناصر المتاحة ({unassignedItems.length}):
        </p>
        {unassignedItems.length === 0 ? (
          <p className="py-2 text-center text-sm font-medium text-[#006E5A]">
            وزّعت كل العناصر! اضغط «تحقق من التصنيف» تحت.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {unassignedItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  draggable
                  onDragStart={() => setDraggedItemId(item.id)}
                  onClick={() =>
                    setSelectedItemId((prev) => (prev === item.id ? null : item.id))
                  }
                  aria-pressed={isSelected}
                  className={`min-h-[48px] rounded-lg border-2 px-3.5 py-2 text-right text-[15px] sm:text-base font-medium transition-all ${
                    isSelected
                      ? 'border-[#006E5A] bg-[#E5F1EE] text-[#163A3A] ring-2 ring-[#006E5A]/30'
                      : 'border-[#E2ECE9] bg-white text-[#163A3A] hover:border-[#006E5A]'
                  }`}
                >
                  <InlineFormatted text={item.text} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Buckets grid */}
      <div
        className={`grid gap-3 ${
          data.buckets.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {data.buckets.map((bucket) => {
          const bucketItems = poolOrder.filter((item) => placements[item.id] === bucket.id);
          const canDrop = Boolean(selectedItemId || draggedItemId);

          return (
            <div
              key={bucket.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedItemId) {
                  assignToBucket(draggedItemId, bucket.id);
                }
              }}
              className={`flex flex-col rounded-xl border-2 p-4 transition-colors ${
                canDrop
                  ? 'border-[#006E5A] bg-[#E5F1EE]/40'
                  : 'border-[#E2ECE9] bg-[#F6FAF9]'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  if (selectedItemId) {
                    assignToBucket(selectedItemId, bucket.id);
                  }
                }}
                className="mb-3 flex min-h-[48px] w-full flex-col items-start justify-center rounded-lg bg-white px-3 py-2 text-right border border-[#E2ECE9] hover:border-[#006E5A]"
              >
                <span className="text-base font-bold text-[#163A3A]">{bucket.label}</span>
                {bucket.description && (
                  <span className="text-xs text-[#3B5A58]">{bucket.description}</span>
                )}
              </button>

              <div className="flex-1 space-y-2">
                {bucketItems.length === 0 ? (
                  <p className="py-3 text-center text-xs text-[#3B5A58]/70">
                    {selectedItemId ? 'اضغط على عنوان الفئة للإضافة هنا' : 'لا توجد عناصر هنا بعد'}
                  </p>
                ) : (
                  bucketItems.map((item) => {
                    const isItemCorrect = checked && item.bucketId === bucket.id;
                    const isItemWrong = checked && item.bucketId !== bucket.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        draggable
                        onDragStart={() => setDraggedItemId(item.id)}
                        onClick={() => {
                          if (selectedItemId && selectedItemId !== item.id) {
                            assignToBucket(selectedItemId, bucket.id);
                          } else {
                            removeFromBucket(item.id);
                          }
                        }}
                        title="اضغط لإرجاع العنصر وتغيير فئته"
                        className={`flex min-h-[48px] w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-right text-sm sm:text-[15px] font-medium transition-colors ${
                          isItemCorrect
                            ? 'border-[#006E5A] bg-[#E5F1EE] text-[#163A3A]'
                            : isItemWrong
                              ? 'border-[#E14B63] bg-[#FBEAEC] text-[#163A3A]'
                              : 'border-[#E2ECE9] bg-white text-[#163A3A] hover:border-[#E14B63]/60'
                        }`}
                      >
                        <span className="flex-1">
                          <InlineFormatted text={item.text} />
                        </span>
                        {isItemCorrect && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#006E5A]" aria-hidden="true" />
                        )}
                        {isItemWrong && (
                          <XCircle className="h-4 w-4 shrink-0 text-[#E14B63]" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!allPlaced}
          onClick={handleCheck}
          className="min-h-[48px] flex-1 rounded-lg bg-[#006E5A] px-5 text-base font-bold text-white hover:bg-[#007a66] disabled:opacity-40"
        >
          تحقق من التصنيف
        </button>

        {Object.keys(placements).length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] px-4 text-sm font-bold text-[#163A3A]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>إعادة توزيع</span>
          </button>
        )}
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
                  اضغط على أي عنصر بلون مرجاني علشان ترجّعه فوق وتنقله للفئة الصح.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
