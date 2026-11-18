// @vitest-environment jsdom
import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as skulptRunner from '@/lib/python/skulptRunner';
import { CodeLabBlock } from '../CodeLabBlock';
import { ComparisonTabsBlock } from '../ComparisonTabsBlock';
import { FlipCardsBlock } from '../FlipCardsBlock';
import { MatchingPairsBlock } from '../MatchingPairsBlock';
import { OrderFlowBuilderBlock } from '../OrderFlowBuilderBlock';
import { QuizQuestionBlock } from '../QuizQuestionBlock';
import { SortingBucketsBlock } from '../SortingBucketsBlock';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function renderNode(node: React.ReactNode) {
  act(() => {
    root.render(node);
  });
}

function findButton(pattern: RegExp | string): HTMLButtonElement {
  const buttons = Array.from(container.querySelectorAll('button'));
  const found = buttons.find((btn) => {
    const text = btn.textContent?.trim() ?? '';
    return typeof pattern === 'string' ? text === pattern : pattern.test(text);
  });
  if (!found) {
    throw new Error(`Button matching ${String(pattern)} not found`);
  }
  return found;
}

describe('Interactive blocks and Skulpt CodeLab', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('shows immediate explanatory feedback and allows non-punitive retry in QuizQuestionBlock', () => {
    const onAttempt = vi.fn();
    const onComplete = vi.fn();

    renderNode(
      <QuizQuestionBlock
        blockId="q1"
        onAttempt={onAttempt}
        onComplete={onComplete}
        data={{
          question: 'المشكلة هي:',
          multiple: false,
          scored: false,
          options: [
            { id: 'o1', text: 'شاشة فاضية', isCorrect: false, feedback: 'افتكر: لازم هدف وعائق.' },
            { id: 'o2', text: 'هدف وعائق', isCorrect: true, feedback: 'بالظبط يا مبرمج!' },
          ],
        }}
      />
    );

    act(() => {
      findButton('شاشة فاضية').click();
    });
    expect(container.textContent).toContain('افتكر: لازم هدف وعائق.');
    expect(onAttempt).toHaveBeenCalledWith({ isCorrect: false, attemptNumber: 1 });

    act(() => {
      findButton('هدف وعائق').click();
    });
    expect(container.textContent).toContain('بالظبط يا مبرمج!');
    expect(onAttempt).toHaveBeenCalledWith({ isCorrect: true, attemptNumber: 2 });
    expect(onComplete).toHaveBeenCalledWith(true);
  });

  it('categorizes items via tap-to-bucket in SortingBucketsBlock', () => {
    const onComplete = vi.fn();
    renderNode(
      <SortingBucketsBlock
        onComplete={onComplete}
        data={{
          prompt: 'وزّع كل موقف',
          buckets: [
            { id: 'prob', label: 'فيها مشكلة' },
            { id: 'ok', label: 'من غير مشكلة' },
          ],
          items: [
            { id: 'i1', text: 'النت فاصل', bucketId: 'prob' },
            { id: 'i2', text: 'المية قدامك', bucketId: 'ok' },
          ],
          feedback: { correct: 'أحسنت التصنيف!', incorrect: 'راجع الفئات تاني' },
        }}
      />
    );

    act(() => {
      findButton('النت فاصل').click();
    });
    act(() => {
      findButton(/فيها مشكلة/).click();
    });
    act(() => {
      findButton('المية قدامك').click();
    });
    act(() => {
      findButton(/من غير مشكلة/).click();
    });
    act(() => {
      findButton('تحقق من التصنيف').click();
    });

    expect(container.textContent).toContain('أحسنت التصنيف!');
    expect(onComplete).toHaveBeenCalledWith(true);
  });

  it('pairs concepts via tap-to-match in MatchingPairsBlock', () => {
    const onComplete = vi.fn();
    renderNode(
      <MatchingPairsBlock
        onComplete={onComplete}
        data={{
          prompt: 'وصّل كل مفهوم',
          pairs: [
            { id: 'p1', left: 'التفكيك', right: 'تقسيم المشكلة' },
            { id: 'p2', left: 'التجريد', right: 'التركيز على المهم' },
          ],
          feedback: { correct: 'توصيل ممتاز!', incorrect: 'جرب تاني' },
        }}
      />
    );

    act(() => {
      findButton('التفكيك').click();
    });
    act(() => {
      findButton('تقسيم المشكلة').click();
    });
    act(() => {
      findButton('التجريد').click();
    });
    act(() => {
      findButton('التركيز على المهم').click();
    });
    act(() => {
      findButton('تحقق من التوصيل').click();
    });

    expect(container.textContent).toContain('توصيل ممتاز!');
    expect(onComplete).toHaveBeenCalledWith(true);
  });

  it('renders all 4 flowchart shapes in OrderFlowBuilderBlock and validates order', () => {
    renderNode(
      <OrderFlowBuilderBlock
        data={{
          mode: 'flowchart',
          prompt: 'رتّب خريطة التدفق',
          items: [
            { id: 'n1', label: 'البداية', shape: 'oval' },
            { id: 'n2', label: 'أدخل الدرجة', shape: 'parallelogram' },
            { id: 'n3', label: 'هل الدرجة >= 50؟', shape: 'diamond' },
            { id: 'n4', label: 'احسب المجموع', shape: 'rectangle' },
          ],
          correctOrder: ['n1', 'n2', 'n3', 'n4'],
          feedback: { correct: 'خريطة سليمة!', incorrect: 'راجع الترتيب' },
        }}
      />
    );

    expect(container.textContent).toContain('بيضاوي · بداية/نهاية');
    expect(container.textContent).toContain('متوازي أضلاع · إدخال/إخراج');
    expect(container.textContent).toContain('معيّن · قرار/شرط');
    expect(container.textContent).toContain('مستطيل · عملية');
  });

  it('runs CodeLabBlock inline input() prompt and check suite with Arabic error hints', async () => {
    vi.spyOn(skulptRunner, 'runPython').mockImplementation(async (_code, options) => {
      const name = options?.onInputRequest ? await options.onInputRequest('اسمك؟') : '';
      return {
        ok: true,
        stdout: `أهلاً ${name}\n`,
        durationMs: 12,
      };
    });

    vi.spyOn(skulptRunner, 'runCodeLabChecks').mockResolvedValueOnce({
      allPassed: true,
      passedCount: 1,
      totalCount: 1,
      results: [{ checkId: 'c1', label: 'اختبار الترحيب', passed: true, stdout: 'أهلاً عمر\n' }],
    });

    const onComplete = vi.fn();
    renderNode(
      <CodeLabBlock
        blockId="cl1"
        onComplete={onComplete}
        data={{
          mode: 'freeRun',
          prompt: 'اقرأ الاسم واطبعه',
          starterCode: 'name = input("اسمك؟")\nprint("أهلاً", name)',
          solutionCode: 'name = input("اسمك؟")\nprint("أهلاً", name)',
          checks: [{ id: 'c1', label: 'اختبار الترحيب', stdin: ['عمر'], contains: 'أهلاً' }],
          hint: 'استخدم input()',
        }}
      />
    );

    await act(async () => {
      findButton('شغّل الكود').click();
      await Promise.resolve();
    });

    expect(container.textContent).toContain('اسمك؟');
    const inlineInput = container.querySelector<HTMLInputElement>('input[type="text"]')!;
    expect(inlineInput).toBeTruthy();

    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      setter?.call(inlineInput, 'عمر');
      inlineInput.dispatchEvent(new Event('input', { bubbles: true }));
      findButton('إرسال').click();
      await Promise.resolve();
    });

    expect(container.textContent).toContain('أهلاً عمر');

    await act(async () => {
      findButton('تحقق من الحل').click();
      await Promise.resolve();
    });

    expect(onComplete).toHaveBeenCalledWith(true);
    expect(container.textContent).toContain('ممتاز يا مبرمج! كل الاختبارات نجحت.');
  });

  it('displays friendly Arabic error hints when CodeLabBlock check fails with Python error', async () => {
    vi.spyOn(skulptRunner, 'runCodeLabChecks').mockResolvedValueOnce({
      allPassed: false,
      passedCount: 0,
      totalCount: 1,
      results: [
        {
          checkId: 'c1',
          label: 'اختبار القسمة',
          passed: false,
          stdout: '',
          error: skulptRunner.formatPythonErrorAr('ZeroDivisionError: division by zero on line 1'),
          reasonAr: 'مينفعش نقسم على صفر! (ZeroDivisionError)',
        },
      ],
    });

    const onAttempt = vi.fn();
    renderNode(
      <CodeLabBlock
        blockId="cl2"
        onAttempt={onAttempt}
        data={{
          mode: 'fillLine',
          prompt: 'احسب ناتج القسمة',
          starterCode: 'print(10 / ___)',
          solutionCode: 'print(10 / 2)',
          checks: [{ id: 'c1', label: 'اختبار القسمة', stdin: [], expectedOutputRegex: '5' }],
          hint: 'لا تقسم على صفر',
        }}
      />
    );

    await act(async () => {
      findButton('تحقق من الحل').click();
      await Promise.resolve();
    });

    expect(container.textContent).toContain('مينفعش نقسم على صفر!');
    expect(container.textContent).toContain('ZeroDivisionError');
    expect(onAttempt).toHaveBeenCalledWith({
      isCorrect: false,
      attemptNumber: 1,
      errorKind: 'ZeroDivisionError',
    });
  });

  it('flips Mindsmith-style FlipCardsBlock items and marks complete when all cards are flipped', () => {
    const onComplete = vi.fn();
    renderNode(
      <FlipCardsBlock
        blockId="fc1"
        onComplete={onComplete}
        data={{
          heading: 'افهم الفرق بالقلب',
          cards: [
            {
              id: 'c1',
              frontLabel: 'الركن ١',
              frontTitle: 'التحليل',
              backBody: 'تقسيم المشكلة الكبيرة لأجزاء صغيرة.',
              backExample: 'تقسيم تحضير الفطار.',
            },
            {
              id: 'c2',
              frontLabel: 'الركن ٢',
              frontTitle: 'التجريد',
              backBody: 'التركيز على المهم فقط مثل خريطة المترو.',
            },
          ],
        }}
      />
    );

    expect(container.textContent).toContain('قلّبت 0 من 2');
    act(() => {
      findButton(/التحليل/).click();
    });
    expect(container.textContent).toContain('تقسيم المشكلة الكبيرة لأجزاء صغيرة.');
    expect(container.textContent).toContain('قلّبت 1 من 2');
    expect(onComplete).not.toHaveBeenCalled();

    act(() => {
      findButton(/التجريد/).click();
    });
    expect(container.textContent).toContain('قلّبت 2 من 2');
    expect(onComplete).toHaveBeenCalledWith(true);
  });

  it('switches ComparisonTabsBlock tabs and completes once all tabs are visited', () => {
    const onComplete = vi.fn();
    renderNode(
      <ComparisonTabsBlock
        blockId="ct1"
        onComplete={onComplete}
        data={{
          heading: 'اعمل ده vs تجنّبه',
          tabs: [
            {
              id: 'do',
              label: 'اعمل ده ✓',
              tone: 'emerald',
              body: 'حوّل input بـ int().',
            },
            {
              id: 'avoid',
              label: 'تجنّبه ✕',
              tone: 'coral',
              body: 'لا تجمع نص مع رقم.',
            },
          ],
        }}
      />
    );

    expect(container.textContent).toContain('استكشفت 1 من 2');
    expect(container.textContent).toContain('حوّل input بـ int().');
    act(() => {
      findButton(/تجنّبه/).click();
    });
    expect(container.textContent).toContain('استكشفت 2 من 2');
    expect(container.textContent).toContain('لا تجمع نص مع رقم.');
    expect(onComplete).toHaveBeenCalledWith(true);
  });
});
