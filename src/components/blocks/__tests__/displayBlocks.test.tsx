// @vitest-environment jsdom
import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AccordionBlock } from '../AccordionBlock';
import { CalloutWarningBlock } from '../CalloutWarningBlock';
import { CodeViewBlock } from '../CodeViewBlock';
import { HeroHookBlock } from '../HeroHookBlock';
import { ImageBlock } from '../ImageBlock';
import { ListBlock } from '../ListBlock';
import { MediaPlayerBlock } from '../MediaPlayerBlock';
import { ProcessStepperBlock } from '../ProcessStepperBlock';
import { RichTextBlock } from '../RichTextBlock';
import { TableBlock } from '../TableBlock';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function renderNode(node: React.ReactNode) {
  act(() => {
    root.render(node);
  });
}

describe('Display and media blocks', () => {
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

  it('toggles interactive checkbox items in ListBlock and fires onComplete when all checked', () => {
    const onComplete = vi.fn();
    renderNode(
      <ListBlock
        onComplete={onComplete}
        data={{
          heading: 'قائمة المراجعة',
          mode: 'checkbox',
          items: [
            { id: 'i1', text: 'راجع التفكيك' },
            { id: 'i2', text: 'جرّب الكود' },
          ],
        }}
      />
    );

    const checkboxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(2);
    expect(checkboxes[0].checked).toBe(false);

    act(() => {
      checkboxes[0].click();
    });
    expect(checkboxes[0].checked).toBe(true);
    expect(onComplete).not.toHaveBeenCalled();

    act(() => {
      checkboxes[1].click();
    });
    expect(checkboxes[1].checked).toBe(true);
    expect(onComplete).toHaveBeenCalledWith(true);
  });

  it('expands AccordionBlock items on click in single and multiple modes', () => {
    renderNode(
      <AccordionBlock
        data={{
          openMode: 'single',
          items: [
            { id: 'a1', title: 'التسلسلية', body: 'تنفذ بالترتيب' },
            { id: 'a2', title: 'الشرطية', body: 'تعتمد على الشرط' },
          ],
        }}
      />
    );

    expect(container.textContent).not.toContain('تنفذ بالترتيب');
    const buttons = Array.from(container.querySelectorAll('button'));
    act(() => {
      buttons[0].click();
    });
    expect(container.textContent).toContain('تنفذ بالترتيب');

    act(() => {
      buttons[1].click();
    });
    expect(container.textContent).not.toContain('تنفذ بالترتيب');
    expect(container.textContent).toContain('تعتمد على الشرط');
  });

  it('switches playback speed (1x/1.25x/1.5x) and opens full Arabic transcript on video error', () => {
    renderNode(
      <MediaPlayerBlock
        data={{
          kind: 'video',
          title: 'شرح المشكلة',
          src: 'video-1-1.mp4',
          vttSrc: 'caption-1-1.vtt',
          transcript: 'المشكلة ببساطة هي هدف وعائق واقف في السكة.',
          durationSec: 44,
        }}
      />
    );

    const video = container.querySelector('video')!;
    expect(video).toBeTruthy();
    const track = video.querySelector('track')!;
    expect(track.getAttribute('src')).toBe('/media/caption-1-1.vtt');

    const speedBtn15 = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('1.5x')
    )!;
    act(() => {
      speedBtn15.click();
    });
    expect(video.playbackRate).toBe(1.5);

    // Track error must NOT falsely trigger the offline video fallback
    act(() => {
      track.dispatchEvent(new Event('error', { bubbles: true }));
    });
    expect(container.querySelector('video')).toBeTruthy();

    act(() => {
      video.dispatchEvent(new Event('error'));
    });
    expect(container.textContent).toContain('المشكلة ببساطة هي هدف وعائق واقف في السكة.');
    expect(container.textContent).not.toContain('طالب');
  });

  it('renders audio player with 1x/1.25x/1.5x speeds and offline transcript fallback', () => {
    renderNode(
      <MediaPlayerBlock
        data={{
          kind: 'audio',
          title: 'ملخص NotebookLM',
          src: 'summary-1-1.mp3',
          transcript: 'ده ملخص صوتي سريع للدرس الأول.',
          durationSec: 120,
        }}
      />
    );

    const audio = container.querySelector('audio')!;
    const speedBtn125 = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('1.25x')
    )!;
    act(() => {
      speedBtn125.click();
    });
    expect(audio.playbackRate).toBe(1.25);

    act(() => {
      audio.dispatchEvent(new Event('error'));
    });
    expect(container.textContent).toContain('ده ملخص صوتي سريع للدرس الأول.');
  });

  it('renders HeroHook, RichText, Image fallback, CodeView LTR, ProcessStepper, Table, and CalloutWarning', () => {
    renderNode(
      <div>
        <HeroHookBlock
          data={{
            title: 'يعني إيه مشكلة؟',
            durationMin: 8,
            goal: 'تشرح معنى المشكلة',
            hook: 'بطاريتك 5% وعايز تكلم صاحبك',
            stationLabel: 'المحطة ١',
          }}
        />
        <RichTextBlock
          data={{
            heading: 'المعادلة',
            body: 'المشكلة = **هدف** + `عائق`',
            calloutStyle: 'highlight',
          }}
        />
        <ImageBlock data={{ src: 'robot-puzzle.png', alt: 'روبوت الأحجية', caption: 'رسم توضيحي' }} />
        <CodeViewBlock
          data={{
            title: 'جمع رقمين',
            code: 'a = int(input())\nprint(a)',
            highlightLines: [2],
          }}
        />
        <ProcessStepperBlock
          data={{
            steps: [
              { id: 's1', title: 'فهم المشكلة', detail: 'تحديد الهدف' },
              { id: 's2', title: 'تصميم الخوارزمية', detail: 'كتابة الخطوات' },
            ],
          }}
        />
        <TableBlock
          data={{
            headers: ['الحرف', 'الموجب', 'السالب'],
            rows: [['h', '0', '-5']],
            highlightColumn: 2,
          }}
        />
        <CalloutWarningBlock
          data={{
            variant: 'warning',
            title: 'خلّي بالك',
            body: 'إدخال نص في int() يسبب ValueError',
          }}
        />
      </div>
    );

    expect(container.textContent).toContain('بعد الدرس ده هتقدر:');
    expect(container.textContent).toContain('تشرح معنى المشكلة');
    expect(container.querySelector('img')?.getAttribute('alt')).toBe('روبوت الأحجية');
    expect(container.querySelector('[dir="ltr"]')).toBeTruthy();
    expect(container.textContent).toContain('-5');
    expect(container.textContent).toContain('خلّي بالك');

    const img = container.querySelector('img')!;
    act(() => {
      img.dispatchEvent(new Event('error'));
    });
    expect(container.textContent).toContain('روبوت الأحجية');
    expect(container.textContent).toContain('غير محمّلة حاليًا');
  });
});
