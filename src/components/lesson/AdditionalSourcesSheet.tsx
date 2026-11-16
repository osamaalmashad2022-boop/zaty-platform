'use client';

import React, { useEffect, useState } from 'react';
import {
  ChevronDown,
  FileText,
  Headphones,
  HelpCircle,
  Network,
  Tag,
  X,
} from 'lucide-react';
import type { AdditionalSource, MindmapNode } from '@/types/curriculum';
import { FormattedText } from '../blocks/FormattedText';
import { MediaPlayerBlock } from '../blocks/MediaPlayerBlock';

export interface AdditionalSourcesSheetProps {
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  sources: AdditionalSource[];
  activeSourceId?: string | null;
  initialSourceId?: string;
  onSelectSource?: (sourceId: string) => void;
  lessonTitle?: string;
}

const SOURCE_TYPE_META: Record<
  AdditionalSource['type'],
  { label: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  summary: { label: 'ملخص سريع', Icon: FileText },
  faq: { label: 'أسئلة شائعة', Icon: HelpCircle },
  mindmap: { label: 'خريطة ذهنية', Icon: Network },
  glossary: { label: 'أهم المصطلحات', Icon: Tag },
  audio: { label: 'ملخص صوتي', Icon: Headphones },
};

function MindmapBranch({ node, depth = 0 }: { node: MindmapNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = Boolean(node.children && node.children.length > 0);

  return (
    <div className={depth > 0 ? 'border-s-2 border-[#009179]/30 ps-3.5 mt-2' : ''}>
      {hasChildren ? (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
          className={`flex min-h-[48px] w-full items-center justify-between gap-2 rounded-lg border px-3.5 py-2 text-right transition-colors ${
            depth === 0
              ? 'border-[#009179] bg-[#E5F1EE] font-bold text-[#163A3A]'
              : 'border-[#E2ECE9] bg-[#F6FAF9] font-semibold text-[#163A3A]'
          }`}
        >
          <span className="text-[15px] sm:text-base">{node.label}</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[#009179] transition-transform ${
              expanded ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      ) : (
        <div className="rounded-lg border border-[#E2ECE9] bg-white px-3.5 py-2.5 text-[15px] text-[#3B5A58]">
          {node.label}
        </div>
      )}

      {hasChildren && expanded && (
        <div className="space-y-1.5">
          {node.children!.map((child) => (
            <MindmapBranch key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function FaqSourcePanel({
  items,
}: {
  items: Array<{ id: string; question: string; answer: string }>;
}) {
  const [openIds, setOpenIds] = useState<string[]>(items[0] ? [items[0].id] : []);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-[#E2ECE9] bg-[#F6FAF9]"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-right font-bold text-[#163A3A]"
            >
              <span className="text-[16px] leading-snug">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[#009179] transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="border-t border-[#E2ECE9] bg-white px-4 py-3.5">
                <FormattedText text={item.answer} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function AdditionalSourcesSheet({
  isOpen,
  open,
  onClose,
  sources,
  activeSourceId,
  initialSourceId,
  onSelectSource,
  lessonTitle,
}: AdditionalSourcesSheetProps) {
  const visible =
    isOpen ?? open ?? (activeSourceId !== undefined ? activeSourceId !== null : true);

  const [internalId, setInternalId] = useState<string>(
    activeSourceId || initialSourceId || sources[0]?.id || ''
  );

  useEffect(() => {
    if (activeSourceId) {
      setInternalId(activeSourceId);
    } else if (initialSourceId) {
      setInternalId(initialSourceId);
    } else if (sources.length > 0 && !sources.some((s) => s.id === internalId)) {
      setInternalId(sources[0].id);
    }
  }, [activeSourceId, initialSourceId, sources, internalId]);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, onClose]);

  if (!visible || sources.length === 0) return null;

  const selectedId =
    onSelectSource && activeSourceId !== undefined ? activeSourceId : internalId;
  const activeSource = sources.find((s) => s.id === selectedId) ?? sources[0];

  const handleSelectTab = (sourceId: string) => {
    setInternalId(sourceId);
    onSelectSource?.(sourceId);
  };

  return (
    <div
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-label="مصادر إضافية من NotebookLM"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#163A3A]/55 p-0 sm:p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-[#E2ECE9] bg-[#FFFFFF] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#E2ECE9] bg-[#F6FAF9] px-5 py-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#009179]">مصادر إضافية · NotebookLM</span>
            <h2 className="text-lg font-bold text-[#163A3A]">
              {lessonTitle ? `إضافات: ${lessonTitle}` : 'مصادر مساعدة للفهم'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق المصادر الإضافية"
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-[#E2ECE9] bg-white text-[#163A3A] hover:border-[#009179]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Source tabs */}
        <div className="flex gap-2 overflow-x-auto border-b border-[#E2ECE9] bg-white px-5 py-3">
          {sources.map((src) => {
            const meta = SOURCE_TYPE_META[src.type];
            const Icon = meta.Icon;
            const isActive = src.id === activeSource.id;
            return (
              <button
                key={src.id}
                type="button"
                onClick={() => handleSelectTab(src.id)}
                className={`inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-lg border px-3.5 text-sm font-bold transition-colors ${
                  isActive
                    ? 'border-[#009179] bg-[#009179] text-white'
                    : 'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#009179]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{src.title || meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeSource.type === 'summary' && (
            <div className="space-y-4">
              <FormattedText text={activeSource.content} />
              {activeSource.bullets && activeSource.bullets.length > 0 && (
                <ul className="space-y-2 rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4">
                  {activeSource.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[16px] text-[#163A3A]">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#009179]"
                      />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeSource.type === 'faq' && <FaqSourcePanel items={activeSource.items} />}

          {activeSource.type === 'mindmap' && (
            <div className="space-y-2">
              <p className="text-sm text-[#3B5A58]">
                اضغط على أي فرع علشان تفتحه أو تقفله وتراجع ترابط الأفكار.
              </p>
              <MindmapBranch node={activeSource.root} />
            </div>
          )}

          {activeSource.type === 'glossary' && (
            <div className="space-y-3">
              {activeSource.terms.map((term) => (
                <div
                  key={term.id}
                  className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-[#163A3A]">{term.termAr}</h3>
                    <span
                      dir="ltr"
                      className="rounded-md bg-[#E5F1EE] px-2.5 py-1 font-mono text-xs font-bold text-[#009179]"
                    >
                      {term.termEn}
                    </span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#3B5A58]">{term.definition}</p>
                </div>
              ))}
            </div>
          )}

          {activeSource.type === 'audio' && (
            <div className="space-y-4">
              <MediaPlayerBlock
                data={{
                  kind: 'audio',
                  title: activeSource.title,
                  src: activeSource.src,
                  durationSec: activeSource.durationSec,
                  transcript: activeSource.transcript,
                }}
              />
              {activeSource.notes && activeSource.notes.length > 0 && (
                <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-2">
                  <p className="text-sm font-bold text-[#163A3A]">نقاط سريعة من الملخص الصوتي:</p>
                  <ul className="space-y-1.5">
                    {activeSource.notes.map((note, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[15px] text-[#3B5A58]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#009179]"
                        />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
