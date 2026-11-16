'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProcessStepperData } from '@/types/curriculum';
import { FormattedText } from './FormattedText';
import { PythonCodeLines } from './pythonHighlight';
import { resolveMediaSrc } from './types';

export interface ProcessStepperBlockProps {
  data: ProcessStepperData;
  className?: string;
}

export function ProcessStepperBlock({ data, className = '' }: ProcessStepperBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const steps = data.steps;

  if (steps.length === 0) return null;

  const safeIndex = Math.min(activeIndex, steps.length - 1);
  const activeStep = steps[safeIndex];
  const isVisualUrl =
    activeStep.visual &&
    (activeStep.visual.startsWith('/') ||
      activeStep.visual.startsWith('http') ||
      /\.(png|jpe?g|webp|svg)$/i.test(activeStep.visual));

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-5 ${className}`}
    >
      {data.heading && (
        <h3 className="text-xl font-bold text-[#163A3A]">{data.heading}</h3>
      )}

      {/* Step selector strip (RTL order) */}
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="خطوات العملية">
        {steps.map((step, idx) => {
          const isActive = idx === safeIndex;
          const isVisited = idx < safeIndex;
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              className={`inline-flex min-h-[48px] items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-bold transition-colors ${
                isActive
                  ? 'border-[#006E5A] bg-[#006E5A] text-white shadow-sm'
                  : isVisited
                    ? 'border-[#006E5A]/40 bg-[#E5F1EE] text-[#163A3A]'
                    : 'border-[#E2ECE9] bg-[#F6FAF9] text-[#3B5A58] hover:border-[#006E5A]/50'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isActive ? 'bg-white text-[#006E5A]' : 'bg-white/90 text-[#163A3A]'
                }`}
              >
                {idx + 1}
              </span>
              <span className="truncate max-w-[160px]">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active step detail */}
      <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
            الخطوة {safeIndex + 1} من {steps.length}
          </span>
        </div>

        <h4 className="text-lg sm:text-xl font-bold text-[#163A3A]">{activeStep.title}</h4>

        <FormattedText text={activeStep.detail} />

        {activeStep.visual && (
          <div className="pt-1">
            {isVisualUrl ? (
              <img
                src={resolveMediaSrc(activeStep.visual)}
                alt={activeStep.title}
                className="max-h-56 w-full rounded-lg border border-[#E2ECE9] bg-white object-contain p-2"
              />
            ) : (
              <div className="rounded-lg border border-[#006E5A]/25 bg-[#E5F1EE] px-4 py-2.5 text-sm font-semibold text-[#163A3A]">
                {activeStep.visual}
              </div>
            )}
          </div>
        )}

        {activeStep.code && (
          <div className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929]">
            <PythonCodeLines code={activeStep.code} />
          </div>
        )}
      </div>

      {/* Prev / Next step buttons in RTL */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
          disabled={safeIndex === 0}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] px-4 text-sm font-bold text-[#163A3A] disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
          <span>الخطوة السابقة</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveIndex((prev) => Math.min(steps.length - 1, prev + 1))}
          disabled={safeIndex === steps.length - 1}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#006E5A] px-4 text-sm font-bold text-white hover:bg-[#007a66] disabled:opacity-40"
        >
          <span>الخطوة التالية</span>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
