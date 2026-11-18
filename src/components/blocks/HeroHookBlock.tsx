'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Sparkles, Target, Zap } from 'lucide-react';
import type { HeroHookData } from '@/types/curriculum';
import { FormattedText, InlineFormatted } from './FormattedText';
import {
  formatDurationMinutes,
  resolveMediaSrc,
  type BlockInteractionProps,
} from './types';

export interface HeroHookBlockProps extends BlockInteractionProps {
  data: HeroHookData;
}

export function HeroHookBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: HeroHookBlockProps) {
  const [imgError, setImgError] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const challengeSignature = JSON.stringify({
    title: data.title,
    prompt: data.starterChallenge?.prompt ?? '',
    options: data.starterChallenge?.options.map((o) => o.id) ?? [],
  });

  useEffect(() => {
    setSelectedOptionId(null);
    setAttemptCount(0);
    setImgError(false);
  }, [challengeSignature]);

  const starterChallenge = data.starterChallenge;
  const selectedOption = starterChallenge?.options.find(
    (o) => o.id === selectedOptionId,
  );

  const handleSelectStarterOption = (optionId: string) => {
    if (!starterChallenge) return;
    const option = starterChallenge.options.find((o) => o.id === optionId);
    if (!option) return;

    const nextAttempt = attemptCount + 1;
    setSelectedOptionId(optionId);
    setAttemptCount(nextAttempt);

    onInteract?.();
    onAttempt?.({
      isCorrect: option.isCorrect,
      attemptNumber: nextAttempt,
    });
    // Low-stakes curiosity & prediction exploration: completes gracefully and positively regardless of choice
    onComplete?.(true);
  };

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-5 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        {data.stationLabel ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1.5 text-sm font-semibold text-[#163A3A]">
            <Sparkles className="h-4 w-4 text-[#006E5A]" aria-hidden="true" />
            <span>{data.stationLabel}</span>
          </span>
        ) : (
          <span />
        )}

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2ECE9] bg-[#F6FAF9] px-3 py-1.5 text-sm font-medium text-[#3B5A58]">
          <Clock className="h-4 w-4 text-[#006E5A]" aria-hidden="true" />
          <span>{formatDurationMinutes(data.durationMin)}</span>
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-[#163A3A]">
        {data.title}
      </h2>

      {data.image && !imgError && (
        <div className="overflow-hidden rounded-xl border border-[#E2ECE9] bg-[#F6FAF9]">
          <img
            src={resolveMediaSrc(data.image)}
            alt={data.title}
            onError={() => setImgError(true)}
            className="mx-auto max-h-60 w-full object-contain p-2"
          />
        </div>
      )}

      {/* One-line goal */}
      <div className="rounded-xl border border-[#006E5A]/25 bg-[#E5F1EE] p-4">
        <div className="mb-1.5 flex items-center gap-2 text-sm font-bold text-[#006E5A]">
          <Target className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>بعد الدرس ده هتقدر:</span>
        </div>
        <p className="text-[17px] sm:text-[18px] font-semibold leading-relaxed text-[#163A3A]">
          {data.goal}
        </p>
      </div>

      {/* Daily-life hook */}
      <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4">
        <p className="mb-2 text-xs font-bold tracking-wide text-[#006E5A]">
          فكّر في الموقف ده الأول:
        </p>
        <FormattedText text={data.hook} />
      </div>

      {/* Optional 15-second Starter Curiosity / Prediction Check */}
      {starterChallenge && starterChallenge.options.length > 0 && (
        <div className="rounded-xl border-2 border-[#006E5A]/30 bg-[#F6FAF9] p-4 sm:p-5 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#006E5A] px-3 py-1 text-xs font-bold text-white">
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                <span>تحدي البداية السريع · ١٥ ثانية</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#006E5A]/30 bg-[#E5F1EE] px-2.5 py-1 text-xs font-semibold text-[#006E5A]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>تحدي استكشاف وفضول</span>
              </span>
            </div>
            {selectedOption && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006E5A]">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>تم الاختيار · شكرًا لتوقعك يا صديقي!</span>
              </span>
            )}
          </div>

          {/* Friendly Curiosity & Exploration Banner */}
          <div className="flex items-start gap-2.5 rounded-xl border border-[#006E5A]/25 bg-[#E5F1EE] p-3 sm:p-3.5 text-xs sm:text-sm text-[#163A3A]">
            <Sparkles className="h-4 w-4 shrink-0 text-[#006E5A] mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              <span className="font-bold text-[#006E5A]">تحدي استكشاف وفضول يا صديقي ·</span>{' '}
              مش مهم الإجابة صح ولا غلط لأنها حاجات لسه هنعرفها سوا! توقّعك هنا هدفه الفضول والاستكشاف الممتع قبل ما نبدأ الشرح سوا.
            </p>
          </div>

          <h3 className="text-base sm:text-lg font-bold leading-relaxed text-[#163A3A]">
            <InlineFormatted text={starterChallenge.prompt} />
          </h3>

          <div className="space-y-2" role="radiogroup" aria-label="اختيارات تحدي البداية">
            {starterChallenge.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let optionClasses =
                'border-[#E2ECE9] bg-white text-[#163A3A] hover:border-[#006E5A]';
              if (isSelected) {
                optionClasses = option.isCorrect
                  ? 'border-[#006E5A] bg-[#E5F1EE] text-[#163A3A]'
                  : 'border-[#F4A261] bg-[#FFF8F0] text-[#163A3A]';
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelectStarterOption(option.id)}
                  className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-lg border-2 px-4 py-3 text-right text-[15px] sm:text-base font-medium transition-colors ${optionClasses}`}
                >
                  <span className="flex-1 leading-relaxed">
                    <InlineFormatted text={option.text} />
                  </span>
                </button>
              );
            })}
          </div>

          {selectedOption && (
            <div
              role="status"
              className={`rounded-xl border p-3.5 space-y-1.5 ${
                selectedOption.isCorrect
                  ? 'border-[#006E5A]/40 bg-[#E5F1EE]'
                  : 'border-[#F4A261]/50 bg-[#FFF8F0]'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#006E5A]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {selectedOption.isCorrect
                    ? 'توقع في محله يا صديقي! ✨'
                    : 'محاولة استكشاف وتوقع ممتازة يا صديقي! 💡'}
                </span>
              </div>
              <p className="text-sm sm:text-[15px] font-bold text-[#163A3A]">
                <InlineFormatted text={selectedOption.feedback} />
              </p>
              {starterChallenge.revealNote && (
                <p className="text-xs sm:text-sm leading-relaxed text-[#3B5A58]">
                  <InlineFormatted text={starterChallenge.revealNote} />
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
