import React from 'react';
import { BookmarkCheck, Info, Sparkles } from 'lucide-react';
import type { RichTextData } from '@/types/curriculum';
import { FormattedText } from './FormattedText';

export interface RichTextBlockProps {
  data: RichTextData;
  className?: string;
}

export function RichTextBlock({ data, className = '' }: RichTextBlockProps) {
  const style = data.calloutStyle ?? 'default';

  if (style === 'highlight') {
    return (
      <section
        dir="rtl"
        className={`rounded-xl border border-[#006E5A]/30 border-s-4 border-s-[#006E5A] bg-[#E5F1EE] p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.06)] ${className}`}
      >
        {data.heading && (
          <div className="mb-2.5 flex items-center gap-2">
            <Sparkles className="h-5 w-5 shrink-0 text-[#006E5A]" aria-hidden="true" />
            <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">{data.heading}</h3>
          </div>
        )}
        <FormattedText text={data.body} />
      </section>
    );
  }

  if (style === 'summary') {
    return (
      <section
        dir="rtl"
        className={`rounded-xl border border-[#006E5A]/25 bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08)] ${className}`}
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E5F1EE] px-3 py-1 text-sm font-bold text-[#006E5A]">
          <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
          <span>{data.heading || 'ملخص الفكرة'}</span>
        </div>
        <FormattedText text={data.body} />
      </section>
    );
  }

  if (style === 'note') {
    return (
      <section
        dir="rtl"
        className={`rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-5 ${className}`}
      >
        <div className="mb-2 flex items-center gap-2 text-[#163A3A]">
          <Info className="h-5 w-5 shrink-0 text-[#006E5A]" aria-hidden="true" />
          <h3 className="text-base sm:text-lg font-bold">{data.heading || 'ملاحظة مهمة'}</h3>
        </div>
        <FormattedText text={data.body} />
      </section>
    );
  }

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] ${className}`}
    >
      {data.heading && (
        <h3 className="mb-3 text-xl font-bold leading-snug text-[#163A3A]">
          {data.heading}
        </h3>
      )}
      <FormattedText text={data.body} />
    </section>
  );
}
