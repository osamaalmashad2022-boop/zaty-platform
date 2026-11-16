'use client';

import React, { useState } from 'react';
import { Clock, Sparkles, Target } from 'lucide-react';
import type { HeroHookData } from '@/types/curriculum';
import { FormattedText } from './FormattedText';
import { formatDurationMinutes, resolveMediaSrc } from './types';

export interface HeroHookBlockProps {
  data: HeroHookData;
  className?: string;
}

export function HeroHookBlock({ data, className = '' }: HeroHookBlockProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-5 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        {data.stationLabel ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1.5 text-sm font-semibold text-[#163A3A]">
            <Sparkles className="h-4 w-4 text-[#009179]" aria-hidden="true" />
            <span>{data.stationLabel}</span>
          </span>
        ) : (
          <span />
        )}

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2ECE9] bg-[#F6FAF9] px-3 py-1.5 text-sm font-medium text-[#3B5A58]">
          <Clock className="h-4 w-4 text-[#009179]" aria-hidden="true" />
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
      <div className="rounded-xl border border-[#009179]/25 bg-[#E5F1EE] p-4">
        <div className="mb-1.5 flex items-center gap-2 text-sm font-bold text-[#009179]">
          <Target className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>بعد الدرس ده هتقدر:</span>
        </div>
        <p className="text-[17px] sm:text-[18px] font-semibold leading-relaxed text-[#163A3A]">
          {data.goal}
        </p>
      </div>

      {/* Daily-life hook */}
      <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4">
        <p className="mb-2 text-xs font-bold tracking-wide text-[#009179]">
          فكّر في الموقف ده الأول:
        </p>
        <FormattedText text={data.hook} />
      </div>
    </section>
  );
}
