// @vitest-environment jsdom
import fs from 'node:fs';
import path from 'node:path';
import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { LessonBlock } from '@/types/curriculum';
import { AdditionalSourcesSheet } from '../AdditionalSourcesSheet';
import { BlockRenderer } from '../BlockRenderer';
import { SourcesDrawer } from '../SourcesDrawer';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function renderNode(node: React.ReactNode) {
  act(() => {
    root.render(node);
  });
}

const ALL_15_BLOCKS: LessonBlock[] = [
  {
    id: 'b1',
    type: 'heroHook',
    data: { title: 'درس 1', durationMin: 8, goal: 'هدف', hook: 'تمهيد' },
  },
  { id: 'b2', type: 'richText', data: { body: 'شرح بسيط' } },
  {
    id: 'b3',
    type: 'listBlock',
    data: { mode: 'bullet', items: [{ id: 'l1', text: 'نقطة' }] },
  },
  { id: 'b4', type: 'imageBlock', data: { src: 'robot-puzzle.png', alt: 'صورة' } },
  {
    id: 'b5',
    type: 'mediaPlayer',
    data: { kind: 'audio', src: 's.mp3', transcript: 'تفريغ', durationSec: 30 },
  },
  { id: 'b6', type: 'codeView', data: { code: 'print("Hi")' } },
  {
    id: 'b7',
    type: 'processStepper',
    data: { steps: [{ id: 'st1', title: 'خطوة ١', detail: 'تفصيل' }] },
  },
  {
    id: 'b8',
    type: 'tableBlock',
    data: { headers: ['عمود'], rows: [['قيمة']] },
  },
  {
    id: 'b9',
    type: 'accordionBlock',
    data: { openMode: 'single', items: [{ id: 'ac1', title: 'عنوان', body: 'محتوى' }] },
  },
  {
    id: 'b10',
    type: 'calloutWarning',
    data: { variant: 'warning', title: 'خلّي بالك', body: 'انتبه للخطأ' },
  },
  {
    id: 'b11',
    type: 'quizQuestion',
    data: {
      question: 'سؤال؟',
      multiple: false,
      scored: false,
      options: [{ id: 'o1', text: 'جواب', isCorrect: true, feedback: 'صح' }],
    },
  },
  {
    id: 'b12',
    type: 'sortingBuckets',
    data: {
      prompt: 'صنّف',
      buckets: [{ id: 'bk1', label: 'فئة' }],
      items: [{ id: 'si1', text: 'عنصر', bucketId: 'bk1' }],
      feedback: { correct: 'صح', incorrect: 'خطأ' },
    },
  },
  {
    id: 'b13',
    type: 'matchingPairs',
    data: {
      prompt: 'وصّل',
      pairs: [{ id: 'mp1', left: 'أ', right: 'ب' }],
      feedback: { correct: 'صح', incorrect: 'خطأ' },
    },
  },
  {
    id: 'b14',
    type: 'orderFlowBuilder',
    data: {
      mode: 'steps',
      prompt: 'رتّب',
      items: [{ id: 'of1', label: 'خطوة' }],
      correctOrder: ['of1'],
      feedback: { correct: 'صح', incorrect: 'خطأ' },
    },
  },
  {
    id: 'b15',
    type: 'codeLab',
    data: {
      mode: 'freeRun',
      prompt: 'اكتب كود',
      starterCode: 'print(1)',
      solutionCode: 'print(1)',
      checks: [],
      hint: 'اطبع 1',
    },
  },
];

describe('Lesson orchestration components', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('dispatches all 15 block types cleanly through BlockRenderer', () => {
    renderNode(
      <div>
        {ALL_15_BLOCKS.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    );

    expect(container.textContent).toContain('درس 1');
    expect(container.textContent).toContain('خلّي بالك');
    expect(container.textContent).toContain('سؤال؟');
    expect(container.textContent).toContain('تحقق من الحل');
  });

  it('renders NotebookLM AdditionalSourcesSheet dynamically across summary, faq, mindmap, glossary, and audio', () => {
    const onSelect = vi.fn();
    renderNode(
      <AdditionalSourcesSheet
        activeSourceId="s-faq"
        onSelectSource={onSelect}
        onClose={() => {}}
        sources={[
          { id: 's-sum', type: 'summary', title: 'ملخص سريع', content: 'الخلاصة هنا' },
          {
            id: 's-faq',
            type: 'faq',
            title: 'أسئلة شائعة',
            items: [{ id: 'f1', question: 'يعني إيه عائق؟', answer: 'شيء يمنع الهدف' }],
          },
          {
            id: 's-map',
            type: 'mindmap',
            title: 'خريطة ذهنية',
            root: { id: 'r', label: 'المشكلة', children: [{ id: 'c1', label: 'هدف' }] },
          },
          {
            id: 's-glo',
            type: 'glossary',
            title: 'أهم المصطلحات',
            terms: [{ id: 't1', termAr: 'خوارزمية', termEn: 'Algorithm', definition: 'خطوات' }],
          },
          {
            id: 's-aud',
            type: 'audio',
            title: 'ملخص صوتي',
            src: 'summary.mp3',
            durationSec: 60,
            transcript: 'نص الصوت',
          },
        ]}
      />
    );

    expect(container.textContent).toContain('يعني إيه عائق؟');
    const summaryTab = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('ملخص سريع')
    )!;
    act(() => {
      summaryTab.click();
    });
    expect(onSelect).toHaveBeenCalledWith('s-sum');
  });

  it('renders read-only textbook and NotebookLM attributions in SourcesDrawer', () => {
    renderNode(
      <SourcesDrawer
        open={true}
        onClose={() => {}}
        sources={[
          { id: 'r1', kind: 'textbook', label: 'كتاب الوزارة', detail: 'الدرس 1', pages: '5–17' },
          { id: 'r2', kind: 'notebooklm', label: 'NotebookLM', detail: 'ملخص إضافي' },
        ]}
      />
    );

    expect(container.textContent).toContain('كتاب الوزارة');
    expect(container.textContent).toContain('5–17');
    expect(container.textContent).toContain('NotebookLM');
  });

  it('never contains the forbidden word "طالب" or "الطالب" across blocks and lesson components', () => {
    const dirs = [
      path.resolve(process.cwd(), 'src/components/blocks'),
      path.resolve(process.cwd(), 'src/components/lesson'),
    ];
    for (const dir of dirs) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
          const content = fs.readFileSync(path.join(dir, entry.name), 'utf8');
          expect(content, `Forbidden word found in ${entry.name}`).not.toMatch(/(?:ال)?طالب/);
        }
      }
    }
  });
});
