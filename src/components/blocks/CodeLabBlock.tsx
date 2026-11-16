'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Code2,
  Eye,
  Lightbulb,
  Play,
  RotateCcw,
  Square,
  XCircle,
} from 'lucide-react';
import type { CodeLabData } from '@/types/curriculum';
import {
  runCodeLabChecks,
  runPython,
  type CodeLabEvaluationResult,
  type PythonErrorInfo,
} from '@/lib/python/skulptRunner';
import { FormattedText } from './FormattedText';
import { PythonCodeLines } from './pythonHighlight';
import { PythonTerminal, type PendingPythonInput } from './PythonTerminal';
import type { BlockInteractionProps } from './types';

export interface CodeLabBlockProps extends BlockInteractionProps {
  data: CodeLabData;
}

const MOBILE_PYTHON_SNIPPETS = [
  { label: 'Tab', insert: '    ' },
  { label: ':', insert: ':' },
  { label: '()', insert: '()' },
  { label: '""', insert: '""' },
  { label: '[]', insert: '[]' },
  { label: '=', insert: ' = ' },
  { label: '==', insert: ' == ' },
  { label: '+', insert: ' + ' },
  { label: '%', insert: ' % ' },
  { label: '#', insert: '# ' },
];

export function CodeLabBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: CodeLabBlockProps) {
  const [code, setCode] = useState(data.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [stdout, setStdout] = useState('');
  const [hasConsoleActivity, setHasConsoleActivity] = useState(false);
  const [runError, setRunError] = useState<PythonErrorInfo | null>(null);
  const [evalResult, setEvalResult] = useState<CodeLabEvaluationResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [pendingInput, setPendingInput] = useState<PendingPythonInput | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const pendingInputRef = useRef<PendingPythonInput | null>(null);

  const dataSignature = JSON.stringify({
    mode: data.mode,
    prompt: data.prompt,
    starterCode: data.starterCode,
    checks: data.checks.map((c) => c.id),
  });

  useEffect(() => {
    setCode(data.starterCode);
    setStdout('');
    setHasConsoleActivity(false);
    setRunError(null);
    setEvalResult(null);
    setShowHint(false);
    setShowSolution(false);
    setAttemptCount(0);
    setPendingInput(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSignature]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      pendingInputRef.current?.reject(new Error('Unmounted'));
    };
  }, []);

  const lineCount = Math.max(4, code.replace(/\r\n/g, '\n').split('\n').length);

  const insertSnippet = (snippet: string) => {
    const el = textareaRef.current;
    if (!el) {
      setCode((prev) => prev + snippet);
      return;
    }
    const start = el.selectionStart ?? code.length;
    const end = el.selectionEnd ?? code.length;
    const nextCode = code.slice(0, start) + snippet + code.slice(end);
    const nextCursor =
      snippet === '()' || snippet === '""' || snippet === '[]'
        ? start + 1
        : start + snippet.length;
    setCode(nextCode);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(nextCursor, nextCursor);
    });
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      insertSnippet('    ');
    }
  };

  const handleStopRun = () => {
    pendingInputRef.current?.reject(new Error('Stopped'));
    pendingInputRef.current = null;
    setPendingInput(null);
    abortRef.current?.abort();
    setIsRunning(false);
  };

  const handleRun = async () => {
    if (isChecking) return;
    onInteract?.();
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsRunning(true);
    setHasConsoleActivity(true);
    setStdout('');
    setRunError(null);
    setEvalResult(null);

    const res = await runPython(code, {
      hiddenPrefix: data.hiddenPrefix,
      signal: controller.signal,
      onStdout: (_chunk, fullStdout) => setStdout(fullStdout),
      onInputRequest: (prompt) =>
        new Promise<string>((resolve, reject) => {
          const entry: PendingPythonInput = { prompt, resolve, reject };
          pendingInputRef.current = entry;
          setPendingInput(entry);
        }),
    });

    pendingInputRef.current = null;
    setPendingInput(null);
    setIsRunning(false);
    setStdout(res.stdout);
    if (!res.ok && res.error) {
      setRunError(res.error);
    }
  };

  const handleSubmitInput = (value: string) => {
    if (!pendingInputRef.current) return;
    const { resolve } = pendingInputRef.current;
    pendingInputRef.current = null;
    setPendingInput(null);
    resolve(value);
  };

  const handleCancelInput = () => {
    if (!pendingInputRef.current) return;
    const { reject } = pendingInputRef.current;
    pendingInputRef.current = null;
    setPendingInput(null);
    reject(new Error('Cancelled by learner'));
  };

  const handleCheckSolution = async () => {
    if (isRunning || isChecking) return;
    onInteract?.();
    setIsChecking(true);
    setHasConsoleActivity(true);
    setRunError(null);

    const evaluation = await runCodeLabChecks(
      code,
      data.checks,
      data.hiddenPrefix,
    );

    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);
    setEvalResult(evaluation);
    setIsChecking(false);

    const firstFailedWithError = evaluation.results.find((r) => !r.passed && r.error);
    if (firstFailedWithError?.error) {
      setRunError(firstFailedWithError.error);
    }
    const latestOutput = evaluation.results[0]?.stdout;
    if (latestOutput !== undefined) {
      setStdout(latestOutput);
    }

    onAttempt?.({
      isCorrect: evaluation.allPassed,
      attemptNumber: nextAttempt,
      errorKind: firstFailedWithError?.error?.errorType,
    });
    onComplete?.(evaluation.allPassed);
  };

  const handleReset = () => {
    handleStopRun();
    setCode(data.starterCode);
    setStdout('');
    setHasConsoleActivity(false);
    setRunError(null);
    setEvalResult(null);
  };

  const hasFillMarker = /___|TODO|أكمل/.test(data.starterCode);

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-4 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#009179]">
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>
            {data.mode === 'fillLine'
              ? 'أكمل السطر الناقص في Python'
              : 'اكتب وشغّل Python مباشرة'}
          </span>
        </span>

        <button
          type="button"
          onClick={() => setShowHint((prev) => !prev)}
          className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] px-3.5 text-xs sm:text-sm font-bold text-[#163A3A] hover:border-[#009179]"
        >
          <Lightbulb className="h-4 w-4 text-[#009179]" aria-hidden="true" />
          <span>{showHint ? 'إخفاء التلميح' : 'تلميح'}</span>
        </button>
      </div>

      {data.title && (
        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">{data.title}</h3>
      )}

      <FormattedText text={data.prompt} />

      {data.mode === 'fillLine' && hasFillMarker && (
        <p className="rounded-lg border border-[#009179]/25 bg-[#E5F1EE]/70 px-3.5 py-2.5 text-sm font-medium text-[#163A3A]">
          ابحث عن علامة <code dir="ltr" className="font-mono font-bold">___</code> داخل الكود
          واستبدلها بالإجابة الصحيحة.
        </p>
      )}

      {showHint && (
        <div className="rounded-xl border border-[#009179]/35 bg-[#E5F1EE] p-4 text-sm sm:text-base text-[#163A3A]">
          <p className="font-bold text-[#009179] mb-1">تلميح سريع:</p>
          <FormattedText text={data.hint} />
        </div>
      )}

      {/* Editor Card */}
      <div className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E4745] bg-[#163A3A] px-3.5 py-2">
          <span className="font-mono text-xs font-semibold text-[#8CE9C8]" dir="ltr">
            main.py · Python 3 (Offline)
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg bg-white/10 px-3 text-xs font-bold text-white hover:bg-white/20"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>إعادة الكود الأصلي</span>
          </button>
        </div>

        {/* Mobile Python quick-insert symbol bar (>= 48px touch targets) */}
        <div
          dir="ltr"
          className="flex items-center gap-1.5 overflow-x-auto border-b border-[#1E4745] bg-[#123333] px-3 py-2"
          aria-label="أزرار رموز بايثون السريعة"
        >
          {MOBILE_PYTHON_SNIPPETS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => insertSnippet(item.insert)}
              className="min-h-[48px] min-w-[48px] shrink-0 rounded-md border border-[#2EC4B6]/30 bg-[#0F2929] px-2.5 font-mono text-xs font-bold text-[#8CE9C8] hover:bg-[#1E4745]"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div dir="ltr" className="flex items-stretch">
          <div
            aria-hidden="true"
            className="select-none border-r border-[#1E4745] bg-[#0B2020] px-3 py-3 text-right font-mono text-xs leading-6 text-[#6E928E]"
          >
            {Array.from({ length: lineCount }, (_, idx) => (
              <div key={idx}>{idx + 1}</div>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            dir="ltr"
            aria-label="محرر كود Python"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleEditorKeyDown}
            rows={Math.min(16, Math.max(5, lineCount + 1))}
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            className="w-full resize-y bg-[#0F2929] p-3 font-mono text-sm leading-6 text-[#F4F9FC] placeholder:text-white/40 focus:outline-none"
          />
        </div>
      </div>

      {/* Primary action buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={isRunning ? handleStopRun : handleRun}
          disabled={isChecking}
          className={`inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg px-4 text-base font-bold text-white transition-colors ${
            isRunning
              ? 'bg-[#E14B63] hover:bg-[#c93d54]'
              : 'bg-[#163A3A] hover:bg-[#1f4d4d]'
          } disabled:opacity-40`}
        >
          {isRunning ? (
            <>
              <Square className="h-4 w-4" aria-hidden="true" />
              <span>إيقاف التشغيل</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" aria-hidden="true" />
              <span>شغّل الكود</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleCheckSolution}
          disabled={isRunning || isChecking}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#009179] px-4 text-base font-bold text-white hover:bg-[#007a66] disabled:opacity-40"
        >
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          <span>{isChecking ? 'جاري الفحص...' : 'تحقق من الحل'}</span>
        </button>
      </div>

      {hasConsoleActivity && (
        <PythonTerminal
          stdout={stdout}
          isRunning={isRunning}
          runError={runError}
          pendingInput={pendingInput}
          onSubmitInput={handleSubmitInput}
          onCancelInput={handleCancelInput}
        />
      )}

      {/* Automated Check Results */}
      {evalResult && (
        <div
          role="status"
          className={`rounded-xl border p-4 space-y-3 ${
            evalResult.allPassed
              ? 'border-[#009179]/40 bg-[#E5F1EE]'
              : 'border-[#E14B63]/40 bg-[#FBEAEC]'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {evalResult.allPassed ? (
                <CheckCircle2 className="h-5 w-5 text-[#009179]" aria-hidden="true" />
              ) : (
                <XCircle className="h-5 w-5 text-[#E14B63]" aria-hidden="true" />
              )}
              <p className="text-base font-bold text-[#163A3A]">
                {evalResult.allPassed
                  ? 'ممتاز يا مبرمج! كل الاختبارات نجحت.'
                  : `نجح ${evalResult.passedCount} من ${evalResult.totalCount} اختبار — عدّل الكود وجرّب تاني!`}
              </p>
            </div>
          </div>

          <ul className="space-y-2">
            {evalResult.results.map((res, idx) => (
              <li
                key={res.checkId}
                className={`rounded-lg border px-3.5 py-2.5 text-sm ${
                  res.passed
                    ? 'border-[#009179]/30 bg-white text-[#163A3A]'
                    : 'border-[#E14B63]/30 bg-white text-[#163A3A]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 font-bold">
                  <span>{res.label || `اختبار ${idx + 1}`}</span>
                  <span className={res.passed ? 'text-[#009179]' : 'text-[#E14B63]'}>
                    {res.passed ? 'نجح ✓' : 'لم يطابق ✗'}
                  </span>
                </div>
                {res.reasonAr && (
                  <p className="mt-1 text-xs sm:text-sm text-[#3B5A58]">{res.reasonAr}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Optional Solution reveal after attempting */}
      {attemptCount > 0 && !evalResult?.allPassed && data.solutionCode && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowSolution((prev) => !prev)}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] px-4 text-sm font-bold text-[#163A3A] hover:border-[#009179]"
          >
            <Eye className="h-4 w-4 text-[#009179]" aria-hidden="true" />
            <span>{showSolution ? 'إخفاء الحل النموذجي' : 'عرض الحل النموذجي للمساعدة'}</span>
          </button>

          {showSolution && (
            <div className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929]">
              <div className="border-b border-[#1E4745] bg-[#163A3A] px-4 py-2 text-xs font-bold text-[#8CE9C8]">
                الحل النموذجي — اقرأه وافهمه وبعدين جربه بنفسك
              </div>
              <PythonCodeLines code={data.solutionCode} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
