'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Terminal } from 'lucide-react';
import type { PythonErrorInfo } from '@/lib/python/skulptRunner';

export interface PendingPythonInput {
  prompt: string;
  resolve: (value: string) => void;
  reject: (reason?: unknown) => void;
}

export interface PythonTerminalProps {
  title?: string;
  stdout: string;
  isRunning: boolean;
  runError: PythonErrorInfo | null;
  pendingInput: PendingPythonInput | null;
  onSubmitInput: (value: string) => void;
  onCancelInput?: () => void;
  emptyOutputLabel?: string;
}

export function PythonTerminal({
  title = 'الطرفية (Console)',
  stdout,
  isRunning,
  runError,
  pendingInput,
  onSubmitInput,
  onCancelInput,
  emptyOutputLabel = 'تم التشغيل بدون مخرجات طباعة.',
}: PythonTerminalProps) {
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDraft('');
    if (pendingInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [pendingInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = draft;
    setDraft('');
    onSubmitInput(val);
  };

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-[#1E4745] bg-[#0F2929] text-white">
        <div className="flex items-center justify-between border-b border-[#1E4745] bg-[#163A3A] px-4 py-2.5 text-xs font-bold text-[#8CE9C8]">
          <span className="inline-flex items-center gap-1.5">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>{title}</span>
          </span>
          {isRunning && <span className="text-[#FCD34D]">البرنامج شغّال...</span>}
        </div>

        <div className="p-4 space-y-3">
          <pre
            dir="ltr"
            className="min-h-[2.25rem] whitespace-pre-wrap font-mono text-sm leading-relaxed text-[#F4F9FC]"
          >
            {stdout || (isRunning ? 'جاري التنفيذ...' : runError ? '' : emptyOutputLabel)}
          </pre>

          {pendingInput && (
            <form
              onSubmit={handleSubmit}
              className="space-y-2.5 rounded-xl border border-[#2EC4B6]/45 bg-[#163A3A] p-3.5"
            >
              <label className="block text-sm font-bold text-[#8CE9C8]">
                البرنامج يطلب إدخال قيمة:{' '}
                <span className="text-white">{pendingInput.prompt || 'input()'}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  dir="auto"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="اكتب القيمة واضغط إرسال..."
                  className="min-h-[48px] flex-1 rounded-lg border border-[#2EC4B6]/40 bg-[#0F2929] px-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#006E5A]"
                />
                <button
                  type="submit"
                  className="min-h-[48px] rounded-lg bg-[#006E5A] px-4 text-sm font-bold text-white hover:bg-[#007a66]"
                >
                  إرسال
                </button>
                {onCancelInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setDraft('');
                      onCancelInput();
                    }}
                    className="min-h-[48px] rounded-lg border border-white/20 bg-white/10 px-3 text-sm font-bold text-white"
                  >
                    إلغاء
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>

      {runError && (
        <div
          role="alert"
          className="rounded-xl border border-[#E14B63]/40 bg-[#FBEAEC] p-4 space-y-1.5"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#E14B63]" aria-hidden="true" />
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-[#163A3A]">
                {runError.friendlyMessageAr}
                {runError.line ? ` (السطر ${runError.line})` : ''}
              </p>
              <p className="text-sm leading-relaxed text-[#3B5A58]">{runError.hintAr}</p>
              <p dir="ltr" className="pt-1 font-mono text-xs text-[#E14B63]">
                {runError.rawMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
