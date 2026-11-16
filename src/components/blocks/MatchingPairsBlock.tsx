'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Link2, RotateCcw, XCircle } from 'lucide-react';
import type { MatchingPair, MatchingPairsData } from '@/types/curriculum';
import { InlineFormatted } from './FormattedText';
import type { BlockInteractionProps } from './types';

export interface MatchingPairsBlockProps extends BlockInteractionProps {
  data: MatchingPairsData;
}

const PAIR_BADGE_COLORS = [
  'bg-[#009179] text-white',
  'bg-[#163A3A] text-white',
  'bg-[#0D9488] text-white',
  'bg-[#0369A1] text-white',
  'bg-[#B45309] text-white',
  'bg-[#7C3AED] text-white',
];

function shufflePairs(pairs: MatchingPair[]): MatchingPair[] {
  if (pairs.length <= 1) return [...pairs];
  const copy = [...pairs];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  const sameOrder = copy.every((p, idx) => p.id === pairs[idx]?.id);
  if (sameOrder) {
    const first = copy.shift();
    if (first) copy.push(first);
  }
  return copy;
}

export function MatchingPairsBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: MatchingPairsBlockProps) {
  const [rightColumn, setRightColumn] = useState<MatchingPair[]>(data.pairs);
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  // Maps left pairId -> matched right pairId
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const dataSignature = JSON.stringify({
    prompt: data.prompt,
    pairs: data.pairs.map((p) => p.id),
  });

  useEffect(() => {
    setRightColumn(shufflePairs(data.pairs));
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setMatches({});
    setChecked(false);
    setAttemptCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSignature]);

  const unpairLeft = (leftId: string) => {
    setMatches((prev) => {
      const next = { ...prev };
      delete next[leftId];
      return next;
    });
    setChecked(false);
  };

  const unpairRight = (rightId: string) => {
    setMatches((prev) => {
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(prev)) {
        if (v !== rightId) next[k] = v;
      }
      return next;
    });
    setChecked(false);
  };

  const pairItems = (leftId: string, rightId: string) => {
    setMatches((prev) => {
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(prev)) {
        if (k !== leftId && v !== rightId) {
          next[k] = v;
        }
      }
      next[leftId] = rightId;
      return next;
    });
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setChecked(false);
  };

  const handleLeftTap = (leftId: string) => {
    if (matches[leftId]) {
      unpairLeft(leftId);
      return;
    }
    if (selectedRightId) {
      pairItems(leftId, selectedRightId);
      return;
    }
    setSelectedLeftId((prev) => (prev === leftId ? null : leftId));
  };

  const handleRightTap = (rightId: string) => {
    const existingLeft = Object.keys(matches).find((k) => matches[k] === rightId);
    if (existingLeft) {
      unpairRight(rightId);
      return;
    }
    if (selectedLeftId) {
      pairItems(selectedLeftId, rightId);
      return;
    }
    setSelectedRightId((prev) => (prev === rightId ? null : rightId));
  };

  const allPaired =
    data.pairs.length > 0 && data.pairs.every((pair) => Boolean(matches[pair.id]));

  const handleCheck = () => {
    const nextAttempt = attemptCount + 1;
    const isCorrect = data.pairs.every((pair) => matches[pair.id] === pair.id);
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
    setMatches({});
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setChecked(false);
  };

  const pairedEntries = Object.entries(matches);
  const isAllCorrect =
    checked && data.pairs.every((pair) => matches[pair.id] === pair.id);

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-5 ${className}`}
    >
      <div className="space-y-1.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#009179]">
          <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>نشاط توصيل باللمس</span>
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A] leading-relaxed">
          <InlineFormatted text={data.prompt} />
        </h3>
        <p className="text-sm text-[#3B5A58]">
          اضغط على عنصر من العمود الأول وبعدين اضغط على المقابل ليه في العمود التاني. (اضغط على أي
          عنصر متوصل لو حابب تفك التوصيل).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Column A (left property) */}
        <div className="space-y-2.5">
          {data.pairs.map((pair) => {
            const matchedRightId = matches[pair.id];
            const pairNumber = matchedRightId
              ? pairedEntries.findIndex(([k]) => k === pair.id) + 1
              : 0;
            const isSelected = selectedLeftId === pair.id;
            const isRightMatch = checked && matchedRightId === pair.id;
            const isWrongMatch = checked && matchedRightId && matchedRightId !== pair.id;

            let classes = 'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#009179]';
            if (isRightMatch) {
              classes = 'border-[#009179] bg-[#E5F1EE] text-[#163A3A]';
            } else if (isWrongMatch) {
              classes = 'border-[#E14B63] bg-[#FBEAEC] text-[#163A3A]';
            } else if (isSelected) {
              classes = 'border-[#009179] bg-[#E5F1EE] text-[#163A3A] ring-2 ring-[#009179]/30';
            } else if (matchedRightId) {
              classes = 'border-[#009179]/60 bg-white text-[#163A3A]';
            }

            return (
              <button
                key={pair.id}
                type="button"
                onClick={() => handleLeftTap(pair.id)}
                className={`flex min-h-[48px] w-full items-center justify-between gap-2 rounded-lg border-2 px-3.5 py-2.5 text-right text-[15px] sm:text-base font-medium transition-all ${classes}`}
              >
                <span className="flex-1">
                  <InlineFormatted text={pair.left} />
                </span>
                {pairNumber > 0 && (
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      PAIR_BADGE_COLORS[(pairNumber - 1) % PAIR_BADGE_COLORS.length]
                    }`}
                  >
                    {pairNumber}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Column B (right property, shuffled) */}
        <div className="space-y-2.5">
          {rightColumn.map((pair) => {
            const matchedLeftEntry = pairedEntries.find(([, rightId]) => rightId === pair.id);
            const matchedLeftId = matchedLeftEntry?.[0];
            const pairNumber = matchedLeftId
              ? pairedEntries.findIndex(([k]) => k === matchedLeftId) + 1
              : 0;
            const isSelected = selectedRightId === pair.id;
            const isRightMatch = checked && matchedLeftId === pair.id;
            const isWrongMatch = checked && matchedLeftId && matchedLeftId !== pair.id;

            let classes = 'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#009179]';
            if (isRightMatch) {
              classes = 'border-[#009179] bg-[#E5F1EE] text-[#163A3A]';
            } else if (isWrongMatch) {
              classes = 'border-[#E14B63] bg-[#FBEAEC] text-[#163A3A]';
            } else if (isSelected) {
              classes = 'border-[#009179] bg-[#E5F1EE] text-[#163A3A] ring-2 ring-[#009179]/30';
            } else if (matchedLeftId) {
              classes = 'border-[#009179]/60 bg-white text-[#163A3A]';
            }

            return (
              <button
                key={pair.id}
                type="button"
                onClick={() => handleRightTap(pair.id)}
                className={`flex min-h-[48px] w-full items-center justify-between gap-2 rounded-lg border-2 px-3.5 py-2.5 text-right text-[15px] sm:text-base font-medium transition-all ${classes}`}
              >
                <span className="flex-1">
                  <InlineFormatted text={pair.right} />
                </span>
                {pairNumber > 0 && (
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      PAIR_BADGE_COLORS[(pairNumber - 1) % PAIR_BADGE_COLORS.length]
                    }`}
                  >
                    {pairNumber}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!allPaired}
          onClick={handleCheck}
          className="min-h-[48px] flex-1 rounded-lg bg-[#009179] px-5 text-base font-bold text-white hover:bg-[#007a66] disabled:opacity-40"
        >
          تحقق من التوصيل
        </button>

        {pairedEntries.length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] px-4 text-sm font-bold text-[#163A3A]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>إعادة توصيل</span>
          </button>
        )}
      </div>

      {checked && (
        <div
          role="status"
          className={`rounded-xl border p-4 ${
            isAllCorrect
              ? 'border-[#009179]/40 bg-[#E5F1EE]'
              : 'border-[#E14B63]/40 bg-[#FBEAEC]'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {isAllCorrect ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#009179]" aria-hidden="true" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#E14B63]" aria-hidden="true" />
            )}
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-[#163A3A]">
                {isAllCorrect ? data.feedback.correct : data.feedback.incorrect}
              </p>
              {!isAllCorrect && (
                <p className="text-xs sm:text-sm text-[#3B5A58]">
                  اضغط على الأزواج الملوّنة بالمرجاني علشان تفكها وتوصلها صح.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
