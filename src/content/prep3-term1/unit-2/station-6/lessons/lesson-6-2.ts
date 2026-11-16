import type { LessonPack } from '@/types/curriculum';

export const LESSON_6_2: LessonPack = {
  id: '6.2',
  stationId: 'station-6',
  unitId: 'unit-2',
  order: 2,
  title: 'فك شفرة معادلة النموذج الخطي (y = w * x + b)',
  subtitle: 'تعرّف على المدخل x والوزن w والانحياز b والناتج المتوقع y',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'awaiting_pack',
  objectives: [
    'تشرح عناصر معادلة النموذج الخطي y = w * x + b.',
    'تفسّر معنى الوزن w (مقدار الزيادة لكل ساعة) والانحياز b (القيمة عند x = 0).',
  ],
  cards: [
    {
      id: '6.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '6.2-hero',
          type: 'heroHook',
          data: {
            title: 'النموذج الخطي (Linear Model)',
            durationMin: 8,
            stationLabel: 'المحطة ٦ · الدرس ٢ من ٣ (مسودة هيكلية)',
            goal: 'تقرأ معادلة النموذج الخطي y = w * x + b وتستخرج قيمة w و b من أي جدول بيانات.',
            hook: 'إذا كانت كل ساعة مذاكرة بتزود درجتك ١٠ درجات، وإنت أصلًا معاك ٤٠ درجة مبدئية — تقدر تحسب درجتك لو ذاكرت ساعتين في ثانية بمعادلة خطية بسيطة!',
          },
        },
      ],
    },
    {
      id: '6.2-c2',
      title: 'شرح المعادلة وجدول الساعات والدرجات',
      role: 'concept',
      blocks: [
        {
          id: '6.2-formula',
          type: 'richText',
          data: {
            heading: 'عناصر المعادلة y = w * x + b',
            body: '• `x`: المدخل (عدد ساعات المذاكرة).\n• `y`: الناتج أو الدرجة المتوقعة.\n• `w`: الوزن أو التأثير (Weight) — مقدار التغير في الدرجة لكل ساعة مذاكرة.\n• `b`: الانحياز أو القيمة الثابتة (Bias) — الدرجة المبدئية عند `x = 0`.',
          },
        },
        {
          id: '6.2-table',
          type: 'tableBlock',
          data: {
            heading: 'مثال من الكتاب (ص ٦٧–٦٩): y = 10x + 40',
            headers: ['عدد ساعات المذاكرة (x)', 'الدرجة المتوقعة (y)'],
            rows: [
              ['0 (بداية b)', '40'],
              ['1', '50'],
              ['2', '60'],
              ['3', '70'],
            ],
          },
        },
      ],
    },
    {
      id: '6.2-c3',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '6.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'في المعادلة y = 10x + 40، ما قيمة الانحياز b وما الدرجة المتوقعة عندما x = 2؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٧٣–٧٤',
            options: [
              { id: 'a', text: 'b = 10، والدرجة 50', isCorrect: false, feedback: '10 هي قيمة الوزن w.' },
              { id: 'b', text: 'b = 40، والدرجة 60', isCorrect: true, feedback: 'صح! 10 × 2 + 40 = 60.' },
              { id: 'c', text: 'b = 40، والدرجة 42', isCorrect: false, feedback: 'اضرب 10 × 2 الأول.' },
            ],
            explanation: 'b = 40 هي القيمة الثابتة، وعند x = 2 تكون y = 10*2 + 40 = 60.',
          },
        },
      ],
    },
    {
      id: '6.2-c4',
      title: 'الخلاصة',
      role: 'summary',
      blocks: [
        {
          id: '6.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة',
            calloutStyle: 'summary',
            body: 'النموذج الخطي `y = w * x + b` يربط المدخل `x` بالمخرج `y` عبر معامل التأثير `w` والثابت الابتدائي `b`. في الدرس الجاي هنكتب الدالة في Python!',
          },
        },
      ],
    },
  ],
  summary: 'شرح معادلة النموذج الخطي y = w * x + b ومعنى الوزن w والانحياز b.',
  additionalSources: [
    {
      id: 'nb-6-2-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content: 'w تحدد معدل الزيادة لكل وحدة، و b هي نقطة البداية عندما يكون المدخل x = 0.',
    },
  ],
  sources: [
    { id: 's62-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'معادلة النموذج الخطي', pages: 'ص 68–69' },
  ],
  nextStep: { kind: 'lesson', targetId: '6.3', label: 'الدرس الجاي: برمجة دالة predict_grade في Python' },
};
