'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, RotateCw } from 'lucide-react';
import type { FlipCardsData } from '@/types/curriculum';
import { FormattedText, InlineFormatted } from './FormattedText';
import { PythonCodeLines } from './pythonHighlight';
import type { BlockInteractionProps } from './types';

export interface FlipCardsBlockProps extends BlockInteractionProps {
  data: FlipCardsData;
}

export function FlipCardsBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: FlipCardsBlockProps) {
  const [flippedMap, setFlippedMap] = useState<Record<string, boolean>>({});
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const cards = data.cards;
  const dataSignature = JSON.stringify({
    heading: data.heading ?? '',
    cards: cards.map((c) => c.id),
  });

  useEffect(() => {
    setFlippedMap({});
    setRevealedIds([]);
  }, [dataSignature]);

  if (cards.length === 0) return null;

  const handleFlip = (cardId: string) => {
    const nextFlipped = !flippedMap[cardId];
    setFlippedMap((prev) => ({ ...prev, [cardId]: nextFlipped }));
    onInteract?.();

    const nextRevealed = revealedIds.includes(cardId)
      ? revealedIds
      : [...revealedIds, cardId];

    if (!revealedIds.includes(cardId)) {
      setRevealedIds(nextRevealed);
      const allDone = nextRevealed.length >= cards.length;
      onAttempt?.({
        isCorrect: true,
        attemptNumber: nextRevealed.length,
      });
      if (allDone) {
        onComplete?.(true);
      }
    }
  };

  const allRevealed = revealedIds.length >= cards.length;

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-4 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          {data.heading && (
            <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">
              {data.heading}
            </h3>
          )}
          <p className="text-sm text-[#3B5A58]">
            {data.instruction || 'اضغط على كل بطاقة لتقلبها وتكتشف الفكرة والمثال.'}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tabular-nums ${
            allRevealed
              ? 'bg-[#E5F1EE] text-[#006E5A]'
              : 'border border-[#E2ECE9] bg-[#F6FAF9] text-[#3B5A58]'
          }`}
        >
          {allRevealed && <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}
          <span>
            قلّبت {revealedIds.length} من {cards.length}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {cards.map((card) => {
          const isFlipped = Boolean(flippedMap[card.id]);
          const wasSeen = revealedIds.includes(card.id);

          return (
            <button
              key={card.id}
              type="button"
              aria-pressed={isFlipped}
              aria-label={`اقلب بطاقة: ${card.frontTitle}`}
              onClick={() => handleFlip(card.id)}
              className={`group w-full min-h-[180px] rounded-xl border-2 p-4 sm:p-5 text-right transition-all duration-200 flex flex-col justify-between gap-3 ${
                isFlipped
                  ? 'border-[#006E5A] bg-[#E5F1EE]/60 shadow-sm'
                  : wasSeen
                    ? 'border-[#006E5A]/40 bg-[#F6FAF9] hover:border-[#006E5A]'
                    : 'border-[#E2ECE9] bg-[#F6FAF9] hover:border-[#006E5A] hover:bg-white'
              }`}
            >
              {!isFlipped ? (
                <>
                  <div className="flex items-center justify-between gap-2 w-full">
                    {card.frontLabel ? (
                      <span className="rounded-full bg-[#E5F1EE] px-2.5 py-1 text-xs font-bold text-[#006E5A]">
                        {card.frontLabel}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#006E5A]">الوجه</span>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B5A58] group-hover:text-[#006E5A]">
                      <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>اقلب</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 my-auto py-1">
                    <h4 className="text-base sm:text-lg font-bold leading-snug text-[#163A3A]">
                      <InlineFormatted text={card.frontTitle} />
                    </h4>
                    {card.frontHint && (
                      <p className="text-sm leading-relaxed text-[#3B5A58]">
                        <InlineFormatted text={card.frontHint} />
                      </p>
                    )}
                  </div>

                  <div className="text-xs font-medium text-[#006E5A]">
                    {wasSeen ? 'تمت المراجعة ✓ · اضغط للتبديل' : 'اضغط لاكتشاف التفسير'}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span className="rounded-full bg-[#006E5A] px-2.5 py-1 text-xs font-bold text-white">
                      {card.backTitle || 'الفهم والمثال'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#006E5A]">
                      <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>ارجع للوجه</span>
                    </span>
                  </div>

                  <div className="space-y-2.5 text-right w-full">
                    <FormattedText text={card.backBody} />

                    {card.backExample && (
                      <div className="rounded-lg border border-[#006E5A]/25 bg-white px-3 py-2 text-sm text-[#163A3A]">
                        <span className="font-bold text-[#006E5A]">مثال: </span>
                        <InlineFormatted text={card.backExample} />
                      </div>
                    )}

                    {card.code && (
                      <div
                        dir="ltr"
                        className="overflow-hidden rounded-lg border border-[#1E4745] bg-[#0F2929] text-left"
                      >
                        <PythonCodeLines code={card.code} />
                      </div>
                    )}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {!allRevealed && (
        <p className="text-xs font-medium text-[#3B5A58]">
          اقلب جميع البطاقات ({cards.length - revealedIds.length} متبقية) لإتمام النشاط.
        </p>
      )}
    </section>
  );
}
