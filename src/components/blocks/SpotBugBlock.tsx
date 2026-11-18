'use client';

import React, { useEffect, useState } from 'react';
import { Bug, CheckCircle2, Sparkles, XCircle } from 'lucide-react';
import type { SpotBugData } from '@/types/curriculum';
import { InlineFormatted } from './FormattedText';
import { PythonCodeLines, tokenizePythonLine } from './pythonHighlight';
import type { BlockInteractionProps } from './types';

export interface SpotBugBlockProps extends BlockInteractionProps {
  data: SpotBugData;
}

const TOKEN_CLASSES: Record<string, string> = {
  comment: 'text-[#89A8A4] italic',
  string: 'text-[#8CE9C8]',
  keyword: 'text-[#FF9EB1] font-semibold',
  builtin: 'text-[#67E8F9]',
  number: 'text-[#FCD34D]',
  operator: 'text-[#A7F3D0]',
  plain: 'text-[#F4F9FC]',
};

export function SpotBugBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: SpotBugBlockProps) {
  const [tappedCleanIds, setTappedCleanIds] = useState<string[]>([]);
  const [foundBug, setFoundBug] = useState(false);
  const [diagnosticMsg, setDiagnosticMsg] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const lines =
    data.codeLines ??
    (data.code ? data.code.replace(/\r\n/g, '\n').split('\n') : []);
  const items = data.items ?? [];

  const dataSignature = JSON.stringify({
    mode: data.mode,
    prompt: data.prompt,
    bugLine: data.bugLine ?? null,
    bugItemId: data.bugItemId ?? null,
    linesCount: lines.length,
    itemsCount: items.length,
  });

  useEffect(() => {
    setTappedCleanIds([]);
    setFoundBug(false);
    setDiagnosticMsg(null);
    setAttemptCount(0);
  }, [dataSignature]);

  const handleTapCodeLine = (lineNumber: number) => {
    if (foundBug) return;
    const isBug = data.bugLine === lineNumber;
    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);
    onInteract?.();

    if (isBug) {
      setFoundBug(true);
      setDiagnosticMsg(null);
      onAttempt?.({
        isCorrect: true,
        attemptNumber: nextAttempt,
      });
      onComplete?.(true);
      return;
    }

    const key = String(lineNumber);
    if (!tappedCleanIds.includes(key)) {
      setTappedCleanIds((prev) => [...prev, key]);
    }
    setDiagnosticMsg(
      data.lineFeedback?.[lineNumber] ??
        data.cleanLineFeedback ??
        `السطر ${lineNumber} سليم ومفهوش مشكلة — راجع سطر تاني!`,
    );
    onAttempt?.({
      isCorrect: false,
      attemptNumber: nextAttempt,
      errorKind: 'wrong_bug_line',
    });
  };

  const handleTapStepItem = (itemId: string, customFeedback?: string) => {
    if (foundBug) return;
    const isBug = data.bugItemId === itemId;
    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);
    onInteract?.();

    if (isBug) {
      setFoundBug(true);
      setDiagnosticMsg(null);
      onAttempt?.({
        isCorrect: true,
        attemptNumber: nextAttempt,
      });
      onComplete?.(true);
      return;
    }

    if (!tappedCleanIds.includes(itemId)) {
      setTappedCleanIds((prev) => [...prev, itemId]);
    }
    setDiagnosticMsg(
      customFeedback ??
        data.cleanLineFeedback ??
        'الخطوة دي منطقية وسليمة — دوّر على الخطوة اللي فيها الفخ!',
    );
    onAttempt?.({
      isCorrect: false,
      attemptNumber: nextAttempt,
      errorKind: 'wrong_bug_step',
    });
  };

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-4 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBEAEC] px-3 py-1 text-xs font-bold text-[#B91C3C]">
          <Bug className="h-3.5 w-3.5" aria-hidden="true" />
          <span>اكتشف الفخ · Spot the Bug</span>
        </span>
        <span className="text-xs font-semibold text-[#3B5A58]">
          {foundBug ? 'تم صيد الخطأ ✓' : 'اضغط مباشرة على السطر الخاطئ'}
        </span>
      </div>

      {data.title && (
        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">{data.title}</h3>
      )}

      <p className="text-base sm:text-lg font-bold leading-relaxed text-[#163A3A]">
        <InlineFormatted text={data.prompt} />
      </p>

      {data.mode === 'code' ? (
        <div
          dir="ltr"
          className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929]"
          role="group"
          aria-label="أسطر الكود القابلة للفحص"
        >
          <div className="flex items-center justify-between border-b border-[#1E4745] bg-[#163A3A] px-4 py-2 text-xs font-bold text-[#8CE9C8]">
            <span>buggy_code.py</span>
            <span dir="rtl">اضغط على السطر اللي فيه الخطأ</span>
          </div>

          <div className="divide-y divide-[#1E4745]/60 py-1">
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isBugLine = data.bugLine === lineNumber;
              const isCheckedClean = tappedCleanIds.includes(String(lineNumber));
              const isFoundHere = foundBug && isBugLine;
              const tokens = tokenizePythonLine(line);

              return (
                <button
                  key={lineNumber}
                  type="button"
                  disabled={foundBug}
                  aria-label={`فحص السطر ${lineNumber}: ${line.trim() || 'سطر فارغ'}`}
                  onClick={() => handleTapCodeLine(lineNumber)}
                  className={`flex min-h-[48px] w-full items-center gap-3 px-4 py-2 text-left font-mono text-sm transition-colors ${
                    isFoundHere
                      ? 'bg-[#E14B63]/25 ring-1 ring-inset ring-[#E14B63]'
                      : isCheckedClean
                        ? 'bg-white/5 opacity-70'
                        : 'hover:bg-[#1E4745]/60'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                      isFoundHere
                        ? 'bg-[#E14B63] text-white'
                        : isCheckedClean
                          ? 'bg-[#006E5A]/40 text-[#8CE9C8]'
                          : 'bg-[#0B2020] text-[#89A8A4]'
                    }`}
                  >
                    {lineNumber}
                  </span>

                  <code className="flex-1 whitespace-pre-wrap break-words font-mono">
                    {tokens.length === 0 ? (
                      '\u00A0'
                    ) : (
                      tokens.map((token, idx) => (
                        <span key={idx} className={TOKEN_CLASSES[token.type]}>
                          {token.value}
                        </span>
                      ))
                    )}
                  </code>

                  {isFoundHere && (
                    <span dir="rtl" className="shrink-0 rounded-full bg-[#E14B63] px-2.5 py-0.5 text-[11px] font-sans font-bold text-white">
                      الخطأ هنا!
                    </span>
                  )}
                  {isCheckedClean && !isFoundHere && (
                    <span dir="rtl" className="shrink-0 text-[11px] font-sans font-semibold text-[#8CE9C8]">
                      سليم ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <ol className="space-y-2.5" aria-label="خطوات قابلة للفحص">
          {items.map((item, idx) => {
            const isBugItem = data.bugItemId === item.id;
            const isCheckedClean = tappedCleanIds.includes(item.id);
            const isFoundHere = foundBug && isBugItem;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  disabled={foundBug}
                  onClick={() => handleTapStepItem(item.id, item.wrongFeedback)}
                  className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-right transition-colors ${
                    isFoundHere
                      ? 'border-[#E14B63] bg-[#FBEAEC] text-[#163A3A]'
                      : isCheckedClean
                        ? 'border-[#006E5A]/30 bg-[#E5F1EE]/40 text-[#3B5A58]'
                        : 'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#006E5A]'
                  }`}
                >
                  <span className="flex items-center gap-3 flex-1">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isFoundHere
                          ? 'bg-[#E14B63] text-white'
                          : isCheckedClean
                            ? 'bg-[#006E5A] text-white'
                            : 'bg-white border border-[#E2ECE9] text-[#163A3A]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-[15px] sm:text-base font-medium leading-relaxed">
                      <InlineFormatted text={item.text} />
                    </span>
                  </span>

                  {isFoundHere && (
                    <span className="shrink-0 rounded-full bg-[#E14B63] px-2.5 py-0.5 text-xs font-bold text-white">
                      الخطأ هنا!
                    </span>
                  )}
                  {isCheckedClean && !isFoundHere && (
                    <span className="shrink-0 text-xs font-bold text-[#006E5A]">
                      سليم ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      )}

      {/* Diagnostic feedback when tapping a clean line/step */}
      {diagnosticMsg && !foundBug && (
        <div
          role="status"
          className="flex items-start gap-2.5 rounded-xl border border-[#E14B63]/35 bg-[#FBEAEC] p-3.5 text-sm font-medium text-[#163A3A]"
        >
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#E14B63]" aria-hidden="true" />
          <p className="leading-relaxed">
            <InlineFormatted text={diagnosticMsg} />
          </p>
        </div>
      )}

      {/* Fix & Explanation card once bug is spotted */}
      {foundBug && (
        <div
          role="status"
          className="rounded-xl border border-[#006E5A]/40 bg-[#E5F1EE] p-4 sm:p-5 space-y-3"
        >
          <div className="flex items-center gap-2 text-[#006E5A]">
            <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="text-base font-bold text-[#163A3A]">
              عين مبرمج! مسكت الخطأ من أول نظرة.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006E5A]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>التصحيح الصحيح:</span>
            </p>
            {data.mode === 'code' ? (
              <div className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929]">
                <PythonCodeLines code={data.fixedLine} showLineNumbers={false} />
              </div>
            ) : (
              <div className="rounded-lg border border-[#006E5A]/30 bg-white px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#163A3A]">
                <InlineFormatted text={data.fixedLine} />
              </div>
            )}
          </div>

          <p className="text-sm leading-relaxed text-[#163A3A]">
            <InlineFormatted text={data.fixExplanation} />
          </p>
        </div>
      )}
    </section>
  );
}
