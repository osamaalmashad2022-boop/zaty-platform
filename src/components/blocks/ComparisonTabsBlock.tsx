'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { ComparisonTabsData } from '@/types/curriculum';
import { FormattedText, InlineFormatted } from './FormattedText';
import { PythonCodeLines } from './pythonHighlight';
import type { BlockInteractionProps } from './types';

export interface ComparisonTabsBlockProps extends BlockInteractionProps {
  data: ComparisonTabsData;
}

export function ComparisonTabsBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: ComparisonTabsBlockProps) {
  const tabs = data.tabs;
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? '');
  const [visitedIds, setVisitedIds] = useState<string[]>(
    tabs[0]?.id ? [tabs[0].id] : [],
  );

  if (tabs.length === 0) return null;

  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const allVisited = visitedIds.length >= tabs.length;

  const handleSelect = (tabId: string) => {
    setActiveId(tabId);
    onInteract?.();

    const nextVisited = visitedIds.includes(tabId)
      ? visitedIds
      : [...visitedIds, tabId];

    if (!visitedIds.includes(tabId)) {
      setVisitedIds(nextVisited);
      onAttempt?.({
        isCorrect: true,
        attemptNumber: nextVisited.length,
      });
      if (nextVisited.length >= tabs.length) {
        onComplete?.(true);
      }
    }
  };

  const panelToneClasses =
    activeTab.tone === 'coral'
      ? 'border-[#E14B63]/35 bg-[#FBEAEC]/60'
      : activeTab.tone === 'emerald'
        ? 'border-[#006E5A]/35 bg-[#E5F1EE]/60'
        : 'border-[#E2ECE9] bg-[#F6FAF9]';

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
          {data.instruction && (
            <p className="text-sm text-[#3B5A58]">{data.instruction}</p>
          )}
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tabular-nums ${
            allVisited
              ? 'bg-[#E5F1EE] text-[#006E5A]'
              : 'border border-[#E2ECE9] bg-[#F6FAF9] text-[#3B5A58]'
          }`}
        >
          {allVisited && <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}
          <span>
            استكشفت {visitedIds.length} من {tabs.length}
          </span>
        </span>
      </div>

      {/* Horizontal Tab Strip */}
      <div
        role="tablist"
        aria-label={data.heading || 'تبويبات المقارنة'}
        className="flex flex-wrap gap-2"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab.id;
          const activeClass =
            tab.tone === 'coral'
              ? 'border-[#E14B63] bg-[#E14B63] text-white'
              : 'border-[#006E5A] bg-[#006E5A] text-white';

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(tab.id)}
              className={`inline-flex min-h-[48px] items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition-colors ${
                isActive
                  ? activeClass
                  : 'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#006E5A]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white text-[#3B5A58] border border-[#E2ECE9]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div
        role="tabpanel"
        aria-label={activeTab.label}
        className={`rounded-xl border p-4 sm:p-5 space-y-3 transition-colors ${panelToneClasses}`}
      >
        <FormattedText text={activeTab.body} />

        {activeTab.bullets && activeTab.bullets.length > 0 && (
          <ul className="space-y-2 pt-1">
            {activeTab.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-[15px] sm:text-base leading-relaxed text-[#163A3A]"
              >
                <span
                  aria-hidden="true"
                  className={`mt-2.5 h-2 w-2 shrink-0 rounded-full ${
                    activeTab.tone === 'coral' ? 'bg-[#E14B63]' : 'bg-[#006E5A]'
                  }`}
                />
                <span>
                  <InlineFormatted text={bullet} />
                </span>
              </li>
            ))}
          </ul>
        )}

        {activeTab.code && (
          <div
            dir="ltr"
            className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929] text-left"
          >
            <PythonCodeLines code={activeTab.code} />
          </div>
        )}
      </div>
    </section>
  );
}
