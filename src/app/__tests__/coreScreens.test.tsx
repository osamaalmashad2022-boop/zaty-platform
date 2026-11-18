import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '@/lib/storage/db';
import { recordLessonCompleted } from '@/lib/storage/progress';
import * as skulptRunner from '@/lib/python/skulptRunner';
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

  it('reserves fixed layout slots before Dexie/auth hydration (CLS-safe) and displays subtle cloud tier status', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: true,
          authenticated: true,
          user: {
            id: 'u-1',
            email: 'salma@example.com',
            name: 'سلمى',
            tier: 'premium',
            guardianConsentAt: 1700000000000,
            createdAt: 1700000000000,
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );

    const { container } = render(<HomeClient units={SAMPLE_UNITS} />);

    // Before Dexie resolves, reserved fixed-height slots are already mounted
    expect(screen.getByTestId('home-stats-slot')).toBeInTheDocument();
    expect(screen.getByTestId('home-goal-slot')).toHaveClass('min-h-[82px]');
    expect(screen.getByTestId('home-cta-slot')).toHaveClass(
      'min-h-[92px]',
      'sm:min-h-[56px]',
    );
    expect(screen.getByTestId('home-account-slot')).toBeInTheDocument();
    expect(screen.getByTestId('home-backup-banner')).toHaveClass('min-h-[104px]');
    expect(screen.queryByText(/جاري تحميل التقدم/)).not.toBeInTheDocument();

    // After hydration resolves, same slots remain mounted with resolved CTA & premium status
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /ابدأ الدرس الأول/ })).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.getByTestId('home-account-slot')).toHaveTextContent(
        'النسخة الكاملة ★',
      ),
    );
    expect(screen.getByTestId('home-backup-banner')).toHaveTextContent(
      'حسابك مرتبط بالمزامنة السحابية',
    );
    expect(container.textContent).not.toMatch(/(?:ال)?طالب/);
  });

  it('omits stale awaiting-pack badges for ready stations while gracefully rendering non-ready stages', async () => {
    const { unmount } = render(<HomeClient units={SAMPLE_UNITS} />);
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /ابدأ الدرس الأول/ })).toBeInTheDocument(),
    );
    expect(
      screen.queryByText(/بانتظار الحزمة|مسودة هيكلية|محتوى مبدئي/),
    ).not.toBeInTheDocument();
    unmount();

    const { unmount: unmountStation } = render(
      <StationClient station={SAMPLE_STATION} unitTitle="الوحدة 1" />,
    );
    await waitFor(() =>
      expect(screen.getByText(/الدروس المصغّرة/)).toBeInTheDocument(),
    );
    expect(
      screen.queryByText(/بانتظار الحزمة|مسودة هيكلية|محتوى مبدئي/),
    ).not.toBeInTheDocument();
    unmountStation();

    const awaitingStation: StationPack = {
      ...SAMPLE_STATION,
      id: 'station-6',
      number: 6,
      status: 'awaiting_pack',
      lessons: [{ ...SAMPLE_LESSON, id: '6.1', status: 'draft' }],
    };
    render(<StationClient station={awaitingStation} unitTitle="الوحدة 2" />);
    await waitFor(() =>
      expect(screen.getByText('بانتظار الحزمة')).toBeInTheDocument(),
    );
    expect(screen.getByText('محتوى مبدئي')).toBeInTheDocument();
  });

  it('displays the Zaty (ذاتي) quick grade/term/subject switcher and filters courses cleanly', async () => {
    const { container } = render(<HomeClient units={SAMPLE_UNITS} />);
    await waitFor(() =>
      expect(screen.getByTestId('course-switcher-bar')).toBeInTheDocument(),
    );
    expect(screen.getByText(/منصة ذاتي \(Zaty\)/)).toBeInTheDocument();

    const toggleBtn = screen.getByTestId('toggle-course-catalog-btn');
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    const panel = screen.getByTestId('course-catalog-panel');
    expect(panel).toBeInTheDocument();
    expect(screen.getByTestId('catalog-course-prep3-term1')).toHaveTextContent(
      'متاح الآن ✓',
    );
    expect(
      screen.getByTestId('catalog-course-prep3-term1-science'),
    ).toHaveTextContent('قريبًا في ذاتي');

    fireEvent.click(screen.getByRole('button', { name: 'أولى إعدادي' }));
    expect(screen.getByTestId('catalog-course-prep1-term1-ict')).toBeInTheDocument();
    expect(
      screen.queryByTestId('catalog-course-prep3-term1-science'),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'أولى ثانوي' }));
    expect(screen.getByTestId('catalog-course-sec1-term1-ict')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/(?:ال)?طالب/);

    // Primary hero CTA must appear above course-switcher-bar so learner starts immediately
    const ctaSlot = screen.getByTestId('home-cta-slot');
    const switcherBar = screen.getByTestId('course-switcher-bar');
    expect(
      ctaSlot.compareDocumentPosition(switcherBar) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('waits for full completion on flipCards and hero starterChallenge rather than unlocking on passive tap', async () => {
    const gatedLesson: LessonPack = {
      ...SAMPLE_LESSON,
      id: '1.3',
      cards: [
        {
          id: 'hero-c',
          title: 'تحدي البداية',
          requireInteraction: true,
          blocks: [
            {
              id: 'h1',
              type: 'heroHook',
              data: {
                title: 'درس التحدي',
                durationMin: 6,
                goal: 'هدف',
                hook: 'موقف',
                starterChallenge: {
                  prompt: 'توقعك السريع؟',
                  options: [
                    { id: 'hc1', text: 'خيار صحيح', isCorrect: true, feedback: 'رائع!' },
                    { id: 'hc2', text: 'خيار خطأ', isCorrect: false, feedback: 'ركز تاني!' },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 'flip-c',
          title: 'اقلب كل البطاقات',
          requireInteraction: true,
          blocks: [
            {
              id: 'fc-gated',
              type: 'flipCards',
              data: {
                cards: [
                  { id: 'f1', frontTitle: 'البطاقة الأولى', backBody: 'شرح 1' },
                  { id: 'f2', frontTitle: 'البطاقة الثانية', backBody: 'شرح 2' },
                ],
              },
            },
          ],
        },
        {
          id: 'end-c',
          title: 'الختام',
          role: 'summary',
          blocks: [{ id: 'end-r', type: 'richText', data: { body: 'نهاية.' } }],
        },
      ],
    };

    render(
      <LessonPlayerClient
        lesson={gatedLesson}
        stationTitle="المحطة 1: التفكير الحاسوبي"
      />,
    );

    const nextBtn = await screen.findByRole('button', { name: /التالي/ });
    expect(nextBtn).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'خيار صحيح' }));
    expect(nextBtn).toBeEnabled();

    fireEvent.click(nextBtn);
    expect(screen.getByText(/البطاقة 2 من 3/)).toBeInTheDocument();

    const nextBtnCard2 = screen.getByRole('button', { name: /التالي/ });
    expect(nextBtnCard2).toBeDisabled();

    // Flipping only card 1 of 2 must NOT unlock Next prematurely
    fireEvent.click(screen.getByRole('button', { name: /البطاقة الأولى/ }));
    expect(nextBtnCard2).toBeDisabled();

    // Flipping card 2 of 2 completes FlipCardsBlock and unlocks Next
    fireEvent.click(screen.getByRole('button', { name: /البطاقة الثانية/ }));
    expect(nextBtnCard2).toBeEnabled();
  });

  it('does not unlock codeLab requireInteraction card on passive Run, only on Check Solution', async () => {
    vi.spyOn(skulptRunner, 'runPython').mockResolvedValueOnce({
      ok: true,
      stdout: '10\n',
      durationMs: 5,
    });
    vi.spyOn(skulptRunner, 'runCodeLabChecks').mockResolvedValueOnce({
      allPassed: true,
      passedCount: 1,
      totalCount: 1,
      results: [{ checkId: 'c1', passed: true, stdout: '10\n' }],
    });

    const codeLesson: LessonPack = {
      ...SAMPLE_LESSON,
      id: '1.4',
      cards: [
        {
          id: 'code-c',
          title: 'جرّب الكود',
          requireInteraction: true,
          blocks: [
            {
              id: 'cl-gated',
              type: 'codeLab',
              data: {
                mode: 'fillLine',
                prompt: 'اطبع 10',
                starterCode: 'print(___)',
                solutionCode: 'print(10)',
                checks: [{ id: 'c1', stdin: [], contains: '10' }],
                hint: 'اكتب 10',
              },
            },
          ],
        },
        {
          id: 'end-c2',
          title: 'الختام',
          role: 'summary',
          blocks: [{ id: 'end-r2', type: 'richText', data: { body: 'نهاية.' } }],
        },
      ],
    };

    render(
      <LessonPlayerClient
        lesson={codeLesson}
        stationTitle="المحطة 1: التفكير الحاسوبي"
      />,
    );

    const nextBtn = await screen.findByRole('button', { name: /التالي/ });
    expect(nextBtn).toBeDisabled();

    // Clicking "شغّل الكود" is passive exploration -> must remain locked
    fireEvent.click(screen.getByRole('button', { name: /شغّل الكود/ }));
    await waitFor(() => expect(screen.getByText('10')).toBeInTheDocument());
    expect(nextBtn).toBeDisabled();

    // Clicking "تحقق من الحل" triggers onComplete -> unlocks Next
    fireEvent.click(screen.getByRole('button', { name: /تحقق من الحل/ }));
    await waitFor(() => expect(nextBtn).toBeEnabled());
  });
});
