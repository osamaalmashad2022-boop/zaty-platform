'use client';

import React, { useEffect } from 'react';
import { BookOpen, FileText, Sparkles, X } from 'lucide-react';
import type { AdditionalSource, SourceReference } from '@/types/curriculum';

export interface SourcesDrawerProps {
  open?: boolean;
  isOpen?: boolean;
  onClose: () => void;
  sources: SourceReference[];
  additionalSources?: AdditionalSource[];
  lessonTitle?: string;
}

const KIND_LABELS: Record<
  SourceReference['kind'],
  { label: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  textbook: { label: 'الكتاب المدرسي', Icon: BookOpen },
  notebooklm: { label: 'مصدر NotebookLM', Icon: Sparkles },
  reference: { label: 'مرجع إضافي', Icon: FileText },
};

export function SourcesDrawer({
  open,
  isOpen,
  onClose,
  sources,
  additionalSources = [],
  lessonTitle,
}: SourcesDrawerProps) {
  const visible = open ?? isOpen ?? false;

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-label="المصادر والمراجع"
      className="fixed inset-0 z-50 flex justify-end bg-[#163A3A]/55 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <aside
        className="flex h-full w-full max-w-md flex-col border-s border-[#E2ECE9] bg-[#FFFFFF] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#E2ECE9] bg-[#F6FAF9] px-5 py-4">
          <div>
            <span className="text-xs font-bold text-[#006E5A]">مرجع للقراءة فقط</span>
            <h2 className="text-lg font-bold text-[#163A3A]">
              {lessonTitle ? `مصادر: ${lessonTitle}` : 'مصادر الدرس'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق لوحة المصادر"
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-[#E2ECE9] bg-white text-[#163A3A] hover:border-[#006E5A]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#163A3A]">المصادر المعتمدة</h3>
            {sources.length === 0 ? (
              <p className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 text-sm text-[#3B5A58]">
                لا توجد مراجع مسجلة لهذا الدرس بعد.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {sources.map((src) => {
                  const meta = KIND_LABELS[src.kind];
                  const Icon = meta.Icon;
                  return (
                    <li
                      key={src.id}
                      className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-2.5 py-1 text-xs font-bold text-[#006E5A]">
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{meta.label}</span>
                        </span>
                        {src.pages && (
                          <span className="rounded-md bg-white px-2.5 py-0.5 text-xs font-bold text-[#163A3A] border border-[#E2ECE9]">
                            ص {src.pages}
                          </span>
                        )}
                      </div>
                      <p className="text-base font-bold text-[#163A3A]">{src.label}</p>
                      <p className="text-sm leading-relaxed text-[#3B5A58]">{src.detail}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {additionalSources.length > 0 && (
            <div className="space-y-2.5 border-t border-[#E2ECE9] pt-4">
              <h3 className="text-sm font-bold text-[#163A3A]">
                عناصر NotebookLM المتاحة في الدرس
              </h3>
              <ul className="space-y-2">
                {additionalSources.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] px-3.5 py-2.5 text-sm text-[#163A3A]"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-[#006E5A] border border-[#E2ECE9]">
                      {item.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
