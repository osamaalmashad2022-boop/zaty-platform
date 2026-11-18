import React from 'react';
import { AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';
import type { CalloutWarningData } from '@/types/curriculum';
import { FormattedText, InlineFormatted } from './FormattedText';

export interface CalloutWarningBlockProps {
  data: CalloutWarningData;
  className?: string;
}

export function CalloutWarningBlock({ data, className = '' }: CalloutWarningBlockProps) {
  if (data.variant === 'transition') {
    return (
      <section
        dir="rtl"
        className={`rounded-xl border border-[#006E5A]/30 bg-[#E5F1EE] px-5 py-4 text-center shadow-sm ${className}`}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-sm font-bold text-[#006E5A] shadow-xs">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span>{data.title}</span>
        </div>
        {data.body && (
          <p className="mt-2.5 text-[16px] leading-relaxed text-[#163A3A]">
            <InlineFormatted text={data.body} />
          </p>
        )}
      </section>
    );
  }

  if (data.variant === 'tip') {
    return (
      <section
        dir="rtl"
        className={`rounded-xl border border-[#006E5A]/30 border-s-4 border-s-[#006E5A] bg-[#E5F1EE] p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.06)] ${className}`}
      >
        <div className="mb-2 flex items-center gap-2 text-[#163A3A]">
          <Lightbulb className="h-5 w-5 shrink-0 text-[#006E5A]" aria-hidden="true" />
          <h3 className="text-lg font-bold">{data.title}</h3>
        </div>
        <FormattedText text={data.body} />
      </section>
    );
  }

  return (
    <section
      dir="rtl"
      role="note"
      className={`rounded-xl border border-[#E14B63]/35 border-s-4 border-s-[#E14B63] bg-[#FBEAEC] p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.06)] ${className}`}
    >
      <div className="mb-2 flex items-center gap-2 text-[#163A3A]">
        <AlertTriangle className="h-5 w-5 shrink-0 text-[#E14B63]" aria-hidden="true" />
        <h3 className="text-lg font-bold">{data.title}</h3>
      </div>
      <FormattedText text={data.body} />
    </section>
  );
}
