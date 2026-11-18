'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Eye,
  Lock,
  Play,
  Sparkles,
  Square,
  XCircle,
} from 'lucide-react';
import type { PredictOutputData } from '@/types/curriculum';
import { runPython, type PythonErrorInfo } from '@/lib/python/skulptRunner';
import { FormattedText, InlineFormatted } from './FormattedText';
import { PythonCodeLines } from './pythonHighlight';
import { PythonTerminal, type PendingPythonInput } from './PythonTerminal';
import type { BlockInteractionProps } from './types';

export interface PredictOutputBlockProps extends BlockInteractionProps {
  data: PredictOutputData;
}

export function PredictOutputBlock({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: PredictOutputBlockProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRunLive, setHasRunLive] = useState(false);
  const [stdout, setStdout] = useState('');
  const [runError, setRunError] = useState<PythonErrorInfo | null>(null);
  const [pendingInput, setPendingInput] = useState<PendingPythonInput | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const abortRef = useRef<AbortController | null>(null);
  const pendingInputRef = useRef<PendingPythonInput | null>(null);

  const dataSignature = JSON.stringify({
    prompt: data.prompt,
    code: data.code ?? '',
    options: data.options.map((o) => o.id),
  });

  useEffect(() => {
    abortRef.current?.abort();
    pendingInputRef.current?.reject(new Error('Reset'));
    pendingInputRef.current = null;
    setSelectedId(null);
    setRevealed(false);
    setIsRunning(false);
    setHasRunLive(false);
    setStdout('');
    setRunError(null);
    setPendingInput(null);
    setAttemptCount(0);
  }, [dataSignature]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      pendingInputRef.current?.reject(new Error('Unmounted'));
    };
  }, []);

  const canRunLive = Boolean(data.code) && data.runnable !== false;
  const selectedOption = data.options.find((o) => o.id === selectedId);

  const handleSelectPrediction = (optionId: string) => {
    if (revealed || isRunning) return;
    setSelectedId(optionId);
    onInteract?.();
  };

  const handleStopRun = () => {
    pendingInputRef.current?.reject(new Error('Stopped'));
    pendingInputRef.current = null;
    setPendingInput(null);
    abortRef.current?.abort();
    setIsRunning(false);
  };

  const handleRevealOrRun = async () => {
    if (!selectedOption || isRunning) return;

    if (canRunLive && data.code) {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsRunning(true);
      setHasRunLive(true);
      setStdout('');
      setRunError(null);

      try {
        const res = await runPython(data.code, {
          stdinQueue: data.stdin,
          signal: controller.signal,
          onStdout: (_chunk, fullStdout) => setStdout(fullStdout),
          onInputRequest: (prompt) =>
            new Promise<string>((resolve, reject) => {
              const entry: PendingPythonInput = { prompt, resolve, reject };
              pendingInputRef.current = entry;
              setPendingInput(entry);
            }),
        });

        setStdout(res.stdout);
        if (!res.ok && res.error) {
          if (
            res.error.rawMessage.includes('Web Workers') &&
            data.expectedOutput !== undefined
          ) {
            setHasRunLive(false);
          } else {
            setRunError(res.error);
          }
        }
      } catch {
        setHasRunLive(false);
      } finally {
        pendingInputRef.current = null;
        setPendingInput(null);
        setIsRunning(false);
      }
    }

    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);
    setRevealed(true);

    onInteract?.();
    onAttempt?.({
      isCorrect: selectedOption.isCorrect,
      attemptNumber: nextAttempt,
    });
    onComplete?.(selectedOption.isCorrect);
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
    reject(new Error('Cancelled'));
  };

  const isPredictionCorrect = Boolean(revealed && selectedOption?.isCorrect);

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-4 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          <span>توقّع قبل التشغيل · PRIMM</span>
        </span>
        {!revealed && (
          <span className="text-xs font-semibold text-[#3B5A58]">
            {selectedId ? 'جاهز لاكتشاف النتيجة' : 'اختر توقعك أولًا'}
          </span>
        )}
      </div>

      {data.title && (
        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">{data.title}</h3>
      )}

      <p className="text-base sm:text-lg font-bold leading-relaxed text-[#163A3A]">
        <InlineFormatted text={data.prompt} />
      </p>

      {data.scenario && (
        <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3.5">
          <FormattedText text={data.scenario} />
        </div>
      )}

      {data.code && (
        <div className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929]">
          <div className="border-b border-[#1E4745] bg-[#163A3A] px-4 py-2 text-xs font-bold text-[#8CE9C8]">
            اقرأ الكود كأنك المفسّر وتوقّع المخرجات
          </div>
          <PythonCodeLines code={data.code} />
        </div>
      )}

      <div className="space-y-2.5" role="radiogroup" aria-label="اختيارات التوقع">
        {data.options.map((option) => {
          const isSelected = selectedId === option.id;
          let classes =
            'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#006E5A]';

          if (revealed) {
            if (option.isCorrect) {
              classes = 'border-[#006E5A] bg-[#E5F1EE] text-[#163A3A]';
            } else if (isSelected && !option.isCorrect) {
              classes = 'border-[#E14B63] bg-[#FBEAEC] text-[#163A3A]';
            }
          } else if (isSelected) {
            classes =
              'border-[#006E5A] bg-[#E5F1EE]/80 text-[#163A3A] ring-2 ring-[#006E5A]/25';
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={revealed || isRunning}
              aria-pressed={isSelected}
              onClick={() => handleSelectPrediction(option.id)}
              className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-lg border-2 px-4 py-3 text-right transition-colors ${classes}`}
            >
              <span
                dir="auto"
                className="flex-1 text-[15px] sm:text-base font-medium leading-relaxed"
              >
                <InlineFormatted text={option.text} />
              </span>

              {revealed && option.isCorrect && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#006E5A]" aria-hidden="true" />
              )}
              {revealed && isSelected && !option.isCorrect && (
                <XCircle className="h-5 w-5 shrink-0 text-[#E14B63]" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {/* Predict-before-run gate button */}
      {!revealed && (
        <button
          type="button"
          onClick={isRunning ? handleStopRun : handleRevealOrRun}
          disabled={!selectedId && !isRunning}
          className={`flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg px-5 text-base font-bold text-white transition-colors ${
            isRunning
              ? 'bg-[#E14B63] hover:bg-[#c93d54]'
              : 'bg-[#006E5A] hover:bg-[#007a66]'
          } disabled:cursor-not-allowed disabled:opacity-45`}
        >
          {isRunning ? (
            <>
              <Square className="h-4 w-4" aria-hidden="true" />
              <span>إيقاف التشغيل</span>
            </>
          ) : !selectedId ? (
            <>
              <Lock className="h-4 w-4" aria-hidden="true" />
              <span>
                {canRunLive ? 'شغّل الكود واكتشف الحقيقة' : 'اكشف الإجابة والتفسير'}
              </span>
            </>
          ) : (
            <>
              {canRunLive ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              )}
              <span>
                {canRunLive ? 'شغّل الكود واكتشف الحقيقة' : 'اكشف الإجابة والتفسير'}
              </span>
            </>
          )}
        </button>
      )}

      {/* Live Skulpt Terminal Output */}
      {hasRunLive && (
        <PythonTerminal
          title="النتيجة الفعلية من بايثون"
          stdout={stdout}
          isRunning={isRunning}
          runError={runError}
          pendingInput={pendingInput}
          onSubmitInput={handleSubmitInput}
          onCancelInput={handleCancelInput}
          emptyOutputLabel="انتهى التشغيل بدون مخرجات نصية."
        />
      )}

      {/* Fallback / non-runnable output display */}
      {revealed && !hasRunLive && data.expectedOutput !== undefined && (
        <div className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929] text-white">
          <div className="border-b border-[#1E4745] bg-[#163A3A] px-4 py-2 text-xs font-bold text-[#8CE9C8]">
            النتيجة الفعلية
          </div>
          <pre
            dir="ltr"
            className="whitespace-pre-wrap p-4 font-mono text-sm leading-relaxed text-[#F4F9FC]"
          >
            {data.expectedOutput}
          </pre>
        </div>
      )}

      {/* Explanation Consolidation Card */}
      {revealed && selectedOption && (
        <div
          role="status"
          className={`rounded-xl border p-4 space-y-2 ${
            isPredictionCorrect
              ? 'border-[#006E5A]/40 bg-[#E5F1EE]'
              : 'border-[#E14B63]/40 bg-[#FBEAEC]'
          }`}
        >
          <div className="flex items-center gap-2">
            {isPredictionCorrect ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#006E5A]" aria-hidden="true" />
            ) : (
              <XCircle className="h-5 w-5 shrink-0 text-[#E14B63]" aria-hidden="true" />
            )}
            <p className="text-sm sm:text-base font-bold text-[#163A3A]">
              {isPredictionCorrect
                ? 'توقّعك طابق الحقيقة تمامًا!'
                : 'مفاجأة حلوة! كده اكتشفت القاعدة عمليًا:'}
            </p>
          </div>

          {selectedOption.feedback && (
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#163A3A]">
              <InlineFormatted text={selectedOption.feedback} />
            </p>
          )}

          <p className="text-xs sm:text-sm leading-relaxed text-[#3B5A58]">
            <InlineFormatted text={data.explanation} />
          </p>
        </div>
      )}
    </section>
  );
}
