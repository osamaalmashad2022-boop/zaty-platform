'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, Code2, Copy, Play, Square } from 'lucide-react';
import type { CodeViewData } from '@/types/curriculum';
import { runPython, type PythonErrorInfo } from '@/lib/python/skulptRunner';
import { PythonCodeLines } from './pythonHighlight';
import { PythonTerminal, type PendingPythonInput } from './PythonTerminal';

export interface CodeViewBlockProps {
  data: CodeViewData;
  onInteract?: () => void;
  className?: string;
}

export function CodeViewBlock({ data, onInteract, className = '' }: CodeViewBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [stdout, setStdout] = useState('');
  const [runError, setRunError] = useState<PythonErrorInfo | null>(null);
  const [pendingInput, setPendingInput] = useState<PendingPythonInput | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const pendingInputRef = useRef<PendingPythonInput | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      pendingInputRef.current?.reject(new Error('Unmounted'));
    };
  }, []);

  const handleCopy = async () => {
    onInteract?.();
    try {
      await navigator.clipboard.writeText(data.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleStop = () => {
    pendingInputRef.current?.reject(new Error('Cancelled'));
    pendingInputRef.current = null;
    setPendingInput(null);
    abortRef.current?.abort();
    setIsRunning(false);
  };

  const handleRunExample = async () => {
    onInteract?.();
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsRunning(true);
    setHasRun(true);
    setStdout('');
    setRunError(null);

    const result = await runPython(data.code, {
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
    setStdout(result.stdout);
    if (!result.ok && result.error) {
      setRunError(result.error);
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
    reject(new Error('Cancelled'));
  };

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-3 ${className}`}
    >
      <div className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E4745] bg-[#163A3A] px-4 py-2.5">
          <div className="flex items-center gap-2 text-white">
            <Code2 className="h-4 w-4 text-[#2EC4B6]" aria-hidden="true" />
            <span className="text-sm font-bold">{data.title || 'مثال Python'}</span>
          </div>

          <div className="flex items-center gap-2">
            {data.runnable && (
              <button
                type="button"
                onClick={isRunning ? handleStop : handleRunExample}
                className={`inline-flex min-h-[48px] items-center gap-1.5 rounded-lg px-3.5 text-xs sm:text-sm font-bold transition-colors ${
                  isRunning
                    ? 'bg-[#E14B63] text-white'
                    : 'bg-[#006E5A] text-white hover:bg-[#007a66]'
                }`}
              >
                {isRunning ? (
                  <>
                    <Square className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>إيقاف</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>جرّب تشغيل الكود</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#8CE9C8]" aria-hidden="true" />
                  <span>تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>نسخ</span>
                </>
              )}
            </button>
          </div>
        </div>

        <PythonCodeLines code={data.code} highlightLines={data.highlightLines} />
      </div>

      {hasRun && (
        <PythonTerminal
          title="مخرجات التشغيل"
          stdout={stdout}
          isRunning={isRunning}
          runError={runError}
          pendingInput={pendingInput}
          onSubmitInput={handleSubmitInput}
          onCancelInput={handleCancelInput}
          emptyOutputLabel="انتهى التشغيل بدون مخرجات نصية."
        />
      )}

      {data.caption && (
        <p className="text-sm leading-relaxed text-[#3B5A58]">{data.caption}</p>
      )}
    </section>
  );
}
