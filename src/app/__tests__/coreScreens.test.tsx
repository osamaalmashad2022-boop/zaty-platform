import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '@/lib/storage/db';
import { recordLessonCompleted } from '@/lib/storage/progress';
import type { LessonPack, StationPack, UnitPack } from '@/types/curriculum';
import { HomeClient } from '../_components/HomeClient';
import { LessonPlayerClient } from '../_components/LessonPlayerClient';
import { StationClient } from '../_components/StationClient';

const SAMPLE_LESSON: LessonPack = {
  id: '1.1',
  stationId: 'station-1',
  unitId: 'unit-1',
  order: 1,
  title: 'يعني إيه مشكلة؟',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: ['تعريف المشكلة'],
  summary: 'المشكلة = هدف + عائق.',
  additionalSources: [
    { id: 'sum-1', type: 'summary', title: 'ملخص سريع', content: 'خلاصة الدرس من NotebookLM' },
  ],
  sources: [
    { id: 'src-1', kind: 'textbook', label: 'كتاب الوزارة', detail: 'الدرس الأول', pages: '5–7' },
  ],
  nextStep: { kind: 'lesson', targetId: '1.2', label: 'الدرس الجاي: خطوات حل المشكلة' },
  cards: [
    {
      id: 'c1',
      title: 'تحقق سريع',
      requireInteraction: true,
      blocks: [
        {
          id: 'q1',
          type: 'quizQuestion',
          data: {
            question: 'المشكلة هي:',
            multiple: false,
            scored: false,
            options: [
              { id: 'o1', text: 'هدف وعائق', isCorrect: true, feedback: 'صح يا مبرمج!' },
              { id: 'o2', text: 'لا شيء', isCorrect: false, feedback: 'حاول تاني' },
            ],
          },
        },
      ],
    },
    {
      id: 'c2',
      title: 'الختام',
      role: 'summary',
      blocks: [
        { id: 'r1', type: 'richText', data: { body: 'المشكلة = هدف + عائق.' } },
      ],
    },
  ],
};

const SAMPLE_LESSON_2: LessonPack = {
  ...SAMPLE_LESSON,
  id: '1.2',
  order: 2,
  title: 'خطوات حل المشكلة',
  nextStep: { kind: 'stationQuiz', targetId: 'station-1', label: 'اختبار المحطة' },
};

const SAMPLE_STATION: StationPack = {
  id: 'station-1',
  unitId: 'unit-1',
  number: 1,
  title: 'التفكير الحاسوبي وحل المشكلات',
  description: 'الأساس البرمجي',
  textbookPages: '5–17',
  access: 'free',
  status: 'ready',
  objectives: ['التفكير الحاسوبي'],
  lessons: [SAMPLE_LESSON, SAMPLE_LESSON_2],
  quizBank: [],
  flashcards: [],
  mediaAssets: ['/media/video-1-1.mp4'],
};

const SAMPLE_UNITS: UnitPack[] = [
  {
    id: 'unit-1',
    number: 1,
    title: 'الذكاء الاصطناعي ولغات البرمجة',
    description: 'أساسيات التفكير والبرمجة',
    textbookPages: '4–63',
    stations: [SAMPLE_STATION],
  },
];

describe('Core learner journey screens', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('greets new learner with first-lesson CTA and switches to resume CTA after progress', async () => {
    const { container, unmount } = render(<HomeClient units={SAMPLE_UNITS} />);
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /ابدأ الدرس الأول/ })).toHaveAttribute(
        'href',
        '/lesson/1.1',
      ),
    );
    expect(screen.getByText(/أنجز درسًا واحدًا اليوم/)).toBeInTheDocument();
    expect(screen.getByText(/التفكير الحاسوبي وحل المشكلات/)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/(?:ال)?طالب/);
    unmount();

    await recordLessonCompleted('1.1', 'station-1', { xpAwarded: 50 });
    render(<HomeClient units={SAMPLE_UNITS} />);
    await waitFor(() =>
      expect(
        screen.getByRole('link', { name: /كمّل من مكان ما وقفت/ }),
      ).toHaveAttribute('href', '/lesson/1.2'),
    );
  });

  it('locks lesson 2 sequentially and unlocks both lesson 2 and quiz via early challenge', async () => {
    render(<StationClient station={SAMPLE_STATION} unitTitle="الوحدة 1" />);
    await waitFor(() =>
      expect(screen.getByText(/يُفتح بعد الدرس السابق/)).toBeInTheDocument(),
    );
    expect(
      screen.getByRole('button', { name: /تنزيل وسائط المحطة للمذاكرة بدون نت/ }),
    ).toBeInTheDocument();

    const earlyBtn = screen.getByRole('button', {
      name: /تحدَّ المحطة للفتح المبكر/,
    });
    fireEvent.click(earlyBtn);

    await waitFor(() =>
      expect(
        screen.getByRole('link', { name: /ابدأ اختبار نهاية المحطة/ }),
      ).toHaveAttribute('href', '/station/station-1/quiz'),
    );
    expect(screen.queryByText(/يُفتح بعد الدرس السابق/)).not.toBeInTheDocument();
  });

  it('gates interactive cards until attempted, opens Sources/NotebookLM, and awards +50 XP', async () => {
    render(
      <LessonPlayerClient
        lesson={SAMPLE_LESSON}
        stationTitle="المحطة 1: التفكير الحاسوبي"
      />,
    );

    const nextBtn = await screen.findByRole('button', { name: /التالي/ });
    expect(nextBtn).toBeDisabled();

    // Open SourcesDrawer
    fireEvent.click(screen.getByRole('button', { name: /المصادر/ }));
    expect(screen.getByText(/كتاب الوزارة/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /إغلاق لوحة المصادر/ }));

    // Attempt quiz question -> Next unlocks
    fireEvent.click(screen.getByRole('button', { name: 'هدف وعائق' }));
    expect(nextBtn).toBeEnabled();

    fireEvent.click(nextBtn);
    expect(screen.getByText(/البطاقة 2 من 2/)).toBeInTheDocument();

    // Open NotebookLM AdditionalSourcesSheet on last card
    fireEvent.click(screen.getByRole('button', { name: /ملخص سريع/ }));
    expect(screen.getByText(/خلاصة الدرس من NotebookLM/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /إغلاق المصادر الإضافية/ }));

    // Finish lesson -> +50 XP & nextStep CTA
    fireEvent.click(screen.getByRole('button', { name: /إنهاء الدرس/ }));
    await waitFor(() => expect(screen.getByText(/\+50 XP/)).toBeInTheDocument());
    expect(
      screen.getByRole('link', { name: /الدرس الجاي/ }),
    ).toHaveAttribute('href', '/lesson/1.2');
  });
});
