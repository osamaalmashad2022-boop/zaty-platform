'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import type { ListBlockData } from '@/types/curriculum';
import { InlineFormatted } from './FormattedText';
import type { BlockInteractionProps } from './types';

export interface ListBlockProps extends BlockInteractionProps {
  data: ListBlockData;
}

export function ListBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: ListBlockProps) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    const next = checkedIds.includes(itemId)
      ? checkedIds.filter((id) => id !== itemId)
      : [...checkedIds, itemId];
    setCheckedIds(next);
    onInteract?.();

    if (next.length > 0) {
      const allChecked = next.length === data.items.length;
      onAttempt?.({
        isCorrect: allChecked,
        attemptNumber: next.length,
      });
      if (allChecked) {
        onComplete?.(true);
      }
    }
  };

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] ${className}`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        {data.heading && (
          <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">{data.heading}</h3>
        )}
        {data.mode === 'checkbox' && (
          <span className="rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
            تم {checkedIds.length} من {data.items.length}
          </span>
        )}
      </div>

      {data.mode === 'checkbox' ? (
        <ul className="space-y-2.5">
          {data.items.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <li key={item.id}>
                <label
                  className={`flex min-h-[48px] w-full cursor-pointer items-start gap-3 rounded-lg border p-3.5 text-right transition-colors ${
                    isChecked
                      ? 'border-[#006E5A] bg-[#E5F1EE]'
                      : 'border-[#E2ECE9] bg-[#F6FAF9] hover:border-[#006E5A]/50'
                  }`}
                >
                  <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(item.id)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                        isChecked
                          ? 'border-[#006E5A] bg-[#006E5A] text-white'
                          : 'border-[#3B5A58] bg-white'
                      }`}
                    >
                      {isChecked && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </span>
                  <span className="flex-1 space-y-1">
                    <span
                      className={`block text-[17px] leading-relaxed ${
                        isChecked ? 'font-semibold text-[#163A3A]' : 'text-[#3B5A58]'
                      }`}
                    >
                      <InlineFormatted text={item.text} />
                    </span>
                    {item.detail && (
                      <span className="block text-sm leading-relaxed text-[#3B5A58]/90">
                        <InlineFormatted text={item.detail} />
                      </span>
                    )}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      ) : data.mode === 'numbered' ? (
        <ol className="space-y-3">
          {data.items.map((item, idx) => (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] p-3.5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006E5A] text-sm font-bold text-white">
                {idx + 1}
              </span>
              <div className="flex-1 space-y-1">
                <p className="text-[17px] leading-relaxed text-[#163A3A] font-medium">
                  <InlineFormatted text={item.text} />
                </p>
                {item.detail && (
                  <p className="text-sm leading-relaxed text-[#3B5A58]">
                    <InlineFormatted text={item.detail} />
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-3">
          {data.items.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] p-3.5"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#006E5A]"
              />
              <div className="flex-1 space-y-1">
                <p className="text-[17px] leading-relaxed text-[#163A3A]">
                  <InlineFormatted text={item.text} />
                </p>
                {item.detail && (
                  <p className="text-sm leading-relaxed text-[#3B5A58]">
                    <InlineFormatted text={item.detail} />
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
