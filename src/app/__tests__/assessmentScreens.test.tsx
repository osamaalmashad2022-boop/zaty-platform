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

  it('enforces Law 151/2020 guardian consent on signup and shows local OAuth setup notices', async () => {
    let registerCalls = 0;
    let lastRegisterBody: Record<string, unknown> | null = null;

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith('/api/auth/me')) {
        return new Response(
          JSON.stringify({ ok: true, authenticated: false, user: null }),
          { status: 200 },
        );
      }
      if (url.endsWith('/api/auth/oauth/google')) {
        return new Response(
          JSON.stringify({
            ok: false,
            configured: false,
            provider: 'google',
            message: 'تسجيل الدخول عبر Google يتطلب إعداد مفاتيح OAuth محليًا.',
          }),
          { status: 501 },
        );
      }
      if (url.endsWith('/api/auth/oauth/facebook')) {
        return new Response(
          JSON.stringify({
            ok: false,
            configured: false,
            provider: 'facebook',
            message: 'تسجيل الدخول عبر Facebook يتطلب إعداد مفاتيح OAuth محليًا.',
          }),
          { status: 501 },
        );
      }
      if (url.endsWith('/api/auth/register')) {
        registerCalls += 1;
        lastRegisterBody = JSON.parse(String(init?.body ?? '{}'));
        return new Response(
          JSON.stringify({
            ok: true,
            user: {
              id: 'u-new',
              email: 'youssef@example.com',
              name: 'يوسف',
              tier: 'free',
              guardianConsentAt: 1700000000000,
              createdAt: 1700000000000,
            },
          }),
          { status: 201 },
        );
      }
      if (url.endsWith('/api/sync')) {
        return new Response(
          JSON.stringify({
            ok: true,
            user: {
              id: 'u-new',
              email: 'youssef@example.com',
              name: 'يوسف',
              tier: 'free',
              guardianConsentAt: 1700000000000,
              createdAt: 1700000000000,
            },
            syncedAt: 1700000001000,
            learningEvents: [],
            frictionEvents: [],
            flashcardStates: [],
          }),
          { status: 200 },
        );
      }
      return new Response(JSON.stringify({ ok: false }), { status: 404 });
    });

    const { container } = render(
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

    expect(
      await screen.findByText('حسابك والمزامنة السحابية (v2)'),
    ).toBeInTheDocument();
    expect(screen.getByText('تفعيل النسخة الكاملة (v3)')).toBeInTheDocument();

    // OAuth setup notice for Google & Facebook
    fireEvent.click(
      await screen.findByRole('button', { name: /تسجيل الدخول عبر Google/ }),
    );
    await waitFor(() =>
      expect(
        screen.getByText(/تسجيل الدخول عبر Google يتطلب إعداد مفاتيح OAuth محليًا/),
      ).toBeInTheDocument(),
    );

    fireEvent.click(
      screen.getByRole('button', { name: /تسجيل الدخول عبر Facebook/ }),
    );
    await waitFor(() =>
      expect(
        screen.getByText(/تسجيل الدخول عبر Facebook يتطلب إعداد مفاتيح OAuth محليًا/),
      ).toBeInTheDocument(),
    );

    // Switch to signup tab
    fireEvent.click(screen.getByRole('tab', { name: /إنشاء حساب جديد/ }));
    fireEvent.change(screen.getByLabelText(/اسم المتعلم/), {
      target: { value: 'يوسف' },
    });
    fireEvent.change(screen.getByLabelText(/البريد الإلكتروني/), {
      target: { value: 'youssef@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/كلمة المرور/), {
      target: { value: 'secret123' },
    });

    // Submitting without guardian consent must be blocked client-side
    fireEvent.click(screen.getByRole('button', { name: /^إنشاء حساب جديد$/ }));
    await waitFor(() =>
      expect(
        screen.getByText(/يجب الإقرار بموافقة ولي الأمر وفق قانون حماية البيانات الشخصية/),
      ).toBeInTheDocument(),
    );
    expect(registerCalls).toBe(0);

    // Check mandatory Law 151/2020 guardian consent and submit
    const consentCheckbox = screen.getByRole('checkbox', {
      name: /أقر بموافقة ولي الأمر على إنشاء الحساب وحفظ تقدمي التعليمي وفق قانون حماية البيانات الشخصية 151 لسنة 2020/,
    });
    fireEvent.click(consentCheckbox);
    fireEvent.click(screen.getByRole('button', { name: /^إنشاء حساب جديد$/ }));

    await waitFor(() =>
      expect(screen.getByText('youssef@example.com')).toBeInTheDocument(),
    );
    expect(registerCalls).toBe(1);
    expect(lastRegisterBody).toMatchObject({
      email: 'youssef@example.com',
      guardianConsent: true,
    });
    expect(screen.getByTestId('account-tier-badge')).toHaveTextContent(
      'الباقة المجانية',
    );
    expect(container.textContent).not.toMatch(/(?:ال)?طالب/);
  });

  it('syncs cloud progress, redeems ICT-2027-PRO to premium, and deletes account after confirmation', async () => {
    await recordLessonCompleted('1.1', 'station-1', { xpAwarded: 50 });
    let deleteCalled = false;

    const freeUser = {
      id: 'u-2',
      email: 'adam@example.com',
      name: 'آدم',
      tier: 'free',
      guardianConsentAt: 1700000000000,
      createdAt: 1700000000000,
    };

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith('/api/auth/me')) {
        return new Response(
          JSON.stringify({ ok: true, authenticated: true, user: freeUser }),
          { status: 200 },
        );
      }
      if (url.endsWith('/api/sync')) {
        return new Response(
          JSON.stringify({
            ok: true,
            user: freeUser,
            syncedAt: 1700000002000,
            learningEvents: [
              {
                eventId: 'srv-1-2',
                type: 'lesson_completed',
                lessonId: '1.2',
                stationId: 'station-1',
                payloadJson: JSON.stringify({ xpAwarded: 50 }),
                cairoDate: '2026-11-16',
                createdAt: 1700000002000,
              },
            ],
            frictionEvents: [],
            flashcardStates: [],
          }),
          { status: 200 },
        );
      }
      if (url.endsWith('/api/activate')) {
        const body = JSON.parse(String(init?.body ?? '{}')) as { code?: string };
        if (body.code === 'ICT-2027-PRO') {
          return new Response(
            JSON.stringify({
              ok: true,
              tier: 'premium',
              user: { ...freeUser, tier: 'premium' },
              message: 'تم تفعيل النسخة الكاملة بنجاح!',
            }),
            { status: 200 },
          );
        }
        return new Response(
          JSON.stringify({ ok: false, error: 'كود غير صالح' }),
          { status: 400 },
        );
      }
      if (url.endsWith('/api/auth/delete-account')) {
        deleteCalled = true;
        return new Response(
          JSON.stringify({
            ok: true,
            message: 'تم حذف حسابك وجميع بياناتك نهائيًا.',
          }),
          { status: 200 },
        );
      }
      return new Response(JSON.stringify({ ok: false }), { status: 404 });
    });

    render(
      <ProgressClient
        stations={[
          {
            id: 'station-1',
            unitId: 'unit-1',
            number: 1,
            title: 'التفكير الحاسوبي',
            lessons: [
              { id: '1.1', title: 'يعني إيه مشكلة؟' },
              { id: '1.2', title: 'خطوات حل المشكلة' },
            ],
          },
        ]}
      />,
    );

    expect(await screen.findByText('adam@example.com')).toBeInTheDocument();
    expect(screen.getByTestId('account-tier-badge')).toHaveTextContent(
      'الباقة المجانية',
    );

    // Sync progress -> imports server event 1.2 -> refreshes stats to 100 XP (2 / 2)
    fireEvent.click(screen.getByRole('button', { name: /مزامنة التقدم الآن/ }));
    await waitFor(() =>
      expect(screen.getByText(/تمت مزامنة التقدم مع السحابة بنجاح/)).toBeInTheDocument(),
    );
    expect(screen.getByText('100 XP')).toBeInTheDocument();

    // Activate ICT-2027-PRO -> upgrades badge to النسخة الكاملة ★
    fireEvent.change(screen.getByLabelText(/كود التفعيل/), {
      target: { value: 'ICT-2027-PRO' },
    });
    fireEvent.click(screen.getByRole('button', { name: /تفعيل الكود/ }));
    await waitFor(() =>
      expect(screen.getByText('تم تفعيل النسخة الكاملة بنجاح!')).toBeInTheDocument(),
    );
    expect(screen.getByTestId('account-tier-badge')).toHaveTextContent(
      'النسخة الكاملة ★',
    );

    // Delete account requires confirmation step before issuing DELETE
    fireEvent.click(
      screen.getByRole('button', { name: /حذف الحساب وجميع بياناتي نهائيًا/ }),
    );
    expect(deleteCalled).toBe(false);
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /تأكيد الحذف النهائي/ }));
    await waitFor(() => expect(deleteCalled).toBe(true));
    await waitFor(() =>
      expect(screen.getByRole('tab', { name: /تسجيل الدخول/ })).toBeInTheDocument(),
    );
    expect(screen.getByText('0 XP')).toBeInTheDocument();
  });

  it('scopes ExamClient, ReviewClient, and ProgressClient to active course and term', async () => {
    // 1. ExamClient scoping test
    const mixedStations = [
      {
        id: 'station-1',
        number: 1,
        title: 'محطة ترم 1',
        termId: 'prep3-term1',
        packId: 'prep3-term1',
        lessons: [{ id: '1.1', title: 'درس 1' }],
      },
      {
        id: 'station-10',
        number: 10,
        title: 'محطة ترم 2',
        termId: 'prep3-term2',
        packId: 'prep3-term2',
        lessons: [{ id: '10.1', title: 'درس 10' }],
      },
    ];

    const mixedQuizPool: QuizItem[] = [
      {
        id: 'q-term1',
        stationId: 'station-1',
        microLessonId: '1.1',
        kind: 'mcq',
        question: 'سؤال ترم 1',
        options: [{ id: 'a', text: 'صح', isCorrect: true, feedback: 'صحيح' }],
        explanation: 'تفسير ترم 1',
        sourceTag: 'كتاب 1',
      },
      {
        id: 'q-term2',
        stationId: 'station-10',
        microLessonId: '10.1',
        kind: 'mcq',
        question: 'سؤال ترم 2',
        options: [{ id: 'b', text: 'صح', isCorrect: true, feedback: 'صحيح' }],
        explanation: 'تفسير ترم 2',
        sourceTag: 'كتاب 2',
      },
    ];

    // Default course is prep3-term1
    const { unmount: unmountExam } = render(
      <ExamClient stations={mixedStations} quizPool={mixedQuizPool} />,
    );

    // Only Term 1 station should appear in setup
    expect(screen.getByText(/المحطة 1: محطة ترم 1/)).toBeInTheDocument();
    expect(screen.queryByText(/المحطة 10: محطة ترم 2/)).not.toBeInTheDocument();
    unmountExam();

    // 2. ReviewClient scoping test
    const mixedFlashcards: FlashcardItem[] = [
      {
        id: 'fc-term1',
        stationId: 'station-1',
        microLessonId: '1.1',
        termEn: 'Input',
        termAr: 'مدخلات',
        definition: 'تعريف ترم 1',
      },
      {
        id: 'fc-term2',
        stationId: 'station-10',
        microLessonId: '10.1',
        termEn: 'Class',
        termAr: 'فئة',
        definition: 'تعريف ترم 2',
      },
    ];

    const { unmount: unmountReview } = render(
      <ReviewClient
        flashcards={mixedFlashcards}
        stations={[
          { id: 'station-1', number: 1, title: 'محطة 1', termId: 'prep3-term1' },
          { id: 'station-10', number: 10, title: 'محطة 10', termId: 'prep3-term2' },
        ]}
      />,
    );

    // Only Term 1 flashcard in pool
    expect(screen.getByText('كل المحطات (1)')).toBeInTheDocument();
    expect(screen.getByText(/المحطة 1 \(1\)/)).toBeInTheDocument();
    expect(screen.queryByText(/المحطة 10/)).not.toBeInTheDocument();
    unmountReview();

    // 3. ProgressClient scoping test
    render(
      <ProgressClient
        stations={[
          {
            id: 'station-1',
            unitId: 'unit-1',
            number: 1,
            title: 'محطة 1',
            termId: 'prep3-term1',
            packId: 'prep3-term1',
            lessons: [{ id: '1.1', title: 'درس 1' }],
          },
          {
            id: 'station-10',
            unitId: 'unit-3',
            number: 10,
            title: 'محطة 10',
            termId: 'prep3-term2',
            packId: 'prep3-term2',
            lessons: [{ id: '10.1', title: 'درس 10' }],
          },
        ]}
      />,
    );

    // Only Term 1 station should appear in per-station list
    expect(screen.getByText(/المحطة 1: محطة 1/)).toBeInTheDocument();
    expect(screen.queryByText(/المحطة 10: محطة 10/)).not.toBeInTheDocument();
  });
});
