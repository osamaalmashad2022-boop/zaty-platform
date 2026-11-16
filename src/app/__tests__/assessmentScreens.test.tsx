import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '@/lib/storage/db';
import { recordLessonCompleted } from '@/lib/storage/progress';
import type { FlashcardItem, QuizItem } from '@/types/curriculum';
import { ExamClient } from '../_components/ExamClient';
import { ProgressClient } from '../_components/ProgressClient';
import { ReviewClient } from '../_components/ReviewClient';
import { StationQuizClient } from '../_components/StationQuizClient';

const QUIZ_ITEMS: QuizItem[] = [
  {
    id: 'q-1-3',
    stationId: 'station-1',
    microLessonId: '1.3',
    kind: 'mcq',
    question: 'ما ناتج 7 % 2؟',
    options: [
      { id: 'a', text: '1', isCorrect: true, feedback: 'صحيح' },
      { id: 'b', text: '0', isCorrect: false, feedback: 'باقي القسمة 1' },
    ],
    explanation: 'العدد 7 فردي وباقي قسمته على 2 هو 1.',
    sourceTag: 'كتاب الوزارة ص 8',
  },
];

const FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-1',
    stationId: 'station-1',
    microLessonId: '1.1',
    termEn: 'Algorithm',
    termAr: 'الخوارزمية',
    definition: 'خطوات مرتبة للحل',
  },
  {
    id: 'fc-2',
    stationId: 'station-1',
    microLessonId: '1.1',
    termEn: 'Abstraction',
    termAr: 'التجريد',
    definition: 'التركيز على المهم',
  },
];

describe('Assessment, Flashcards, Exam, and Progress views', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders wrong-answer explanation and "راجع الدرس اللي فيه النقطة دي" link to /lesson/[microLessonId]', async () => {
    render(
      <StationQuizClient
        stationId="station-1"
        stationTitle="المحطة 1"
        items={QUIZ_ITEMS}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: /تسليم الاختبار/ }));

    await waitFor(() =>
      expect(screen.getByText(/العدد 7 فردي/)).toBeInTheDocument(),
    );
    expect(
      screen.getByRole('link', { name: /راجع الدرس اللي فيه النقطة دي/ }),
    ).toHaveAttribute('href', '/lesson/1.3');
  });

  it('prioritizes "راجعها تاني ↻" flashcards first in the next round', async () => {
    render(
      <ReviewClient
        flashcards={FLASHCARDS}
        stations={[{ id: 'station-1', number: 1, title: 'المحطة 1' }]}
      />,
    );

    // Card 1: Algorithm -> mark review_again
    fireEvent.click(screen.getByRole('button', { name: /اقلب البطاقة.*Algorithm/ }));
    expect(screen.getByText('خطوات مرتبة للحل')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /راجعها تاني/ }));

    // Card 2: Abstraction -> mark known
    fireEvent.click(screen.getByRole('button', { name: /اقلب البطاقة.*Abstraction/ }));
    fireEvent.click(screen.getByRole('button', { name: /عارفها/ }));

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /بدء جولة مراجعة جديدة/ }),
      ).toBeInTheDocument(),
    );
    fireEvent.click(
      screen.getByRole('button', { name: /بدء جولة مراجعة جديدة/ }),
    );
    expect(screen.getByText('Algorithm')).toBeInTheDocument();
  });

  it('runs timed mixed Exam Mode and generates strongest/weakest station report', async () => {
    const pool: QuizItem[] = [
      QUIZ_ITEMS[0],
      {
        id: 'q-2-1',
        stationId: 'station-2',
        microLessonId: '2.1',
        kind: 'mcq',
        question: 'ما رمز البداية والنهاية؟',
        options: [
          { id: 'x', text: 'الشكل البيضاوي', isCorrect: true, feedback: 'صحيح' },
          { id: 'y', text: 'المربع', isCorrect: false, feedback: 'خطأ' },
        ],
        explanation: 'الشكل البيضاوي للبداية والنهاية.',
        sourceTag: 'كتاب الوزارة ص 19',
      },
    ];

    render(
      <ExamClient
        stations={[
          {
            id: 'station-1',
            number: 1,
            title: 'التفكير الحاسوبي',
            lessons: [{ id: '1.3', title: 'العمليات الحسابية' }],
          },
          {
            id: 'station-2',
            number: 2,
            title: 'خوارزميات الذكاء الاصطناعي',
            lessons: [{ id: '2.1', title: 'خرائط التدفق' }],
          },
        ]}
        quizPool={pool}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /ابدأ الامتحان/ }));
    const toggleTimer = screen.getByRole('button', { name: /إخفاء المؤقت/ });
    expect(toggleTimer).toBeInTheDocument();
    fireEvent.click(toggleTimer);
    expect(
      screen.getByRole('button', { name: /إظهار المؤقت/ }),
    ).toBeInTheDocument();

    // Answer q-1-3 wrong ('0') and q-2-1 right ('الشكل البيضاوي')
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: 'الشكل البيضاوي' }));
    fireEvent.click(screen.getByRole('button', { name: /تسليم الامتحان/ }));

    await waitFor(() =>
      expect(screen.getByText(/تقرير نتيجة الامتحان/)).toBeInTheDocument(),
    );
    expect(screen.getByText('أقوى محطة')).toBeInTheDocument();
    expect(screen.getByText('أضعف محطة')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /راجع الدرس/ })).toHaveAttribute(
      'href',
      '/lesson/1.3',
    );
  });

  it('displays 6 badges and exports/imports SL1 progress backup codes', async () => {
    await recordLessonCompleted('1.1', 'station-1', { xpAwarded: 50 });

    render(
      <ProgressClient
        stations={[
          {
            id: 'station-1',
            unitId: 'unit-1',
            number: 1,
            title: 'التفكير الحاسوبي',
            lessons: [{ id: '1.1', title: 'يعني إيه مشكلة؟' }],
          },
        ]}
      />,
    );

    await waitFor(() =>
      expect(screen.getByText('بداية المبرمج')).toBeInTheDocument(),
    );
    expect(screen.getByText('ختام الترم الأول')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /نسخ كود التقدم/ }));
    const exportBox = (await screen.findByLabelText(
      /كود التقدم الاحتياطي/,
    )) as HTMLTextAreaElement;
    expect(exportBox.value.startsWith('SL1:')).toBe(true);

    const importBox = screen.getByLabelText(/استعادة التقدم من كود محفوظ/);
    fireEvent.change(importBox, { target: { value: exportBox.value } });
    fireEvent.click(screen.getByRole('button', { name: /استعادة التقدم/ }));

    await waitFor(() =>
      expect(screen.getByText(/تمت استعادة/)).toBeInTheDocument(),
    );
  });
});
