'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { AccordionBlockData } from '@/types/curriculum';
import { FormattedText, InlineFormatted } from './FormattedText';
import { PythonCodeLines } from './pythonHighlight';

export interface AccordionBlockProps {
  data: AccordionBlockData;
  onInteract?: () => void;
  className?: string;
}

export function AccordionBlock({ data, onInteract, className = '' }: AccordionBlockProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    onInteract?.();
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (data.openMode === 'single') {
        return isOpen ? [] : [id];
      }
      return isOpen ? prev.filter((item) => item !== id) : [...prev, id];
    });
  };

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-3 ${className}`}
    >
      {data.heading && (
        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">{data.heading}</h3>
      )}

      <div className="space-y-2.5">
        {data.items.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`overflow-hidden rounded-xl border transition-colors ${
                isOpen
                  ? 'border-[#006E5A] bg-[#F6FAF9]'
                  : 'border-[#E2ECE9] bg-[#FFFFFF]'
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleItem(item.id)}
                className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3.5 text-right font-bold text-[#163A3A] hover:bg-[#E5F1EE]/40"
              >
                <span className="text-[16px] sm:text-[17px] leading-snug">
                  <InlineFormatted text={item.title} />
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#006E5A] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="border-t border-[#E2ECE9] bg-white px-4 py-4 space-y-3">
                  <FormattedText text={item.body} />
                  {item.code && (
                    <div className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929]">
                      <PythonCodeLines code={item.code} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
