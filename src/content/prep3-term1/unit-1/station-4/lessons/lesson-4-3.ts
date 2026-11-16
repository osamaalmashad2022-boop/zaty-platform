import type { LessonPack } from '@/types/curriculum';

export const LESSON_4_3: LessonPack = {
  id: '4.3',
  stationId: 'station-4',
  unitId: 'unit-1',
  order: 3,
  title: 'تطبيق هندسي عملي: دالة حساب مساحة الدائرة',
  subtitle: 'حوّل القانون الرياضي لدالة ذكية ترجّع المساحة لأي نصف قطر',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'draft',
  objectives: [
    'تكتب دالة circle_area(radius) باستخدام قيمة π = 3.14.',
    'تطوّر الدالة لتستخدم return area بدل print() وتخزن الناتج في متغير خارجي.',
    'تختبر الدالة بقيم مختلفة لنصف القطر (5 و 10).',
  ],
  cards: [
    {
      id: '4.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '4.3-hero',
          type: 'heroHook',
          data: {
            title: 'مشروع الدوال: حاسبة مساحة الدائرة',
            durationMin: 8,
            stationLabel: 'المحطة ٤ · الدرس ٣ من ٣',
            goal: 'تبني دالة مساحة الدائرة circle_area(radius) وتعدلها لترجع القيمة بـ return.',
            hook: 'تخيل معاك مسألة هندسة فيها ٥ دوائر بأنصاف أقطار مختلفة. بدل ما تعيد القانون ٥ مرات، تكتب دالة `circle_area(radius)` مرة واحدة وتمرر لها نصف القطر بس!',
          },
        },
      ],
    },
    {
      id: '4.3-c2',
      title: 'المرحلة ١ و ٢ · مثال الكتاب وإكمال القانون',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-view',
          type: 'codeView',
          data: {
            title: 'النسخة الأولى بالطباعة (ص ٤٥–٤٦)',
            code: 'def circle_area(radius):\n    pi = 3.14\n    area = pi * radius * radius\n    print("Area =", area)\n\ncircle_area(5)\ncircle_area(10)',
            caption: 'لما radius = 5 الناتج 78.5، ولما radius = 10 الناتج 314.0.',
            runnable: true,
          },
        },
        {
          id: '4.3-fill',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل سطر حساب مساحة الدائرة',
            prompt: 'أكمل السطر الناقص في دالة `circle_area(radius)` لحساب المساحة وحفظها في `area`.',
            starterCode:
              'def circle_area(radius):\n    pi = 3.14\n    # احسب area هنا باستخدام pi * radius * radius\n    print("Area =", area)\n\ncircle_area(5)',
            solutionCode:
              'def circle_area(radius):\n    pi = 3.14\n    area = pi * radius * radius\n    print("Area =", area)\n\ncircle_area(5)',
            checks: [
              { id: 'ca-5', label: 'نصف القطر 5 -> 78.5', stdin: [], contains: '78.5' },
            ],
            hint: 'اكتب area = pi * radius * radius (أو pi * radius ** 2).',
          },
        },
      ],
    },
    {
      id: '4.3-c3',
      title: 'المرحلة ٣ · تدريب الكتاب: عدّل الدالة لتستخدم return',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-free',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'تطوير الدالة بـ return area (ص ٤٧)',
            prompt:
              'عدّل الدالة `circle_area(radius)` لتُرجع `area` باستخدام `return` بدل الطباعة، ثم احسب `result = circle_area(5)` واطبع `result` وكذلك `circle_area(10)`.',
            starterCode:
              'def circle_area(radius):\n    pi = 3.14\n    area = pi * radius * radius\n    # استخدم return هنا\n\nresult = circle_area(5)\nprint(result)\nprint(circle_area(10))',
            solutionCode:
              'def circle_area(radius):\n    pi = 3.14\n    area = pi * radius * radius\n    return area\n\nresult = circle_area(5)\nprint(result)\nprint(circle_area(10))',
            checks: [
              { id: 'ret-5-10', label: 'النواتج 78.5 و 314.0', stdin: [], contains: ['78.5', '314'] },
            ],
            hint: 'اكتب return area داخل الدالة بدل print.',
          },
        },
      ],
    },
    {
      id: '4.3-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '4.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'قانون مساحة الدائرة ≠ محيط الدائرة!',
            body: 'مساحة الدائرة = `pi * radius * radius` (نصف القطر مضروب في نفسه، مش في `2`!). لو ضربت في 2 هيديك المحيط مش المساحة.',
          },
        },
      ],
    },
    {
      id: '4.3-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'في برنامج حساب مساحة الدائرة، لماذا نستخدم `radius` كمعامل (Parameter)؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٢',
            options: [
              { id: 'a', text: 'لجعل البرنامج أطول', isCorrect: false, feedback: 'الهدف هو المرونة وإعادة الاستخدام.' },
              { id: 'b', text: 'لإنشاء متغير عام دائم في البرنامج', isCorrect: false, feedback: 'المعامل متغير محلي.' },
              { id: 'c', text: 'لجعل الدالة تعمل مع أي قيمة لنصف القطر', isCorrect: true, feedback: 'إجابة صحيحة! نقدر نمرر 5 أو 10 أو أي قيمة.' },
              { id: 'd', text: 'لطباعة القيمة على الشاشة فقط', isCorrect: false, feedback: 'مش ده سبب وجود المعامل.' },
            ],
            explanation: 'تمرير radius كمعامل يجعل الدالة مرنة وتعمل مع أي قيمة لنصف القطر.',
          },
        },
      ],
    },
    {
      id: '4.3-c6',
      title: 'ختام المحطة الرابعة',
      role: 'summary',
      blocks: [
        {
          id: '4.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'بنِينا دالة `circle_area(radius)` وطوّرناها بـ `return` علشان ترجّع القيمة ونستخدمها بأي نصف قطر. دلوقتي تقدر تختبر نفسك في ٤٠ سؤالًا رسميًا للمحطة الرابعة!',
          },
        },
      ],
    },
  ],
  summary: 'بناء وتطوير دالة مساحة الدائرة circle_area(radius) باستخدام return.',
  additionalSources: [
    {
      id: 'nb-4-3-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content: 'دالة circle_area(radius) تجمع بين المعاملات والقانون الرياضي وكلمة return.',
    },
    {
      id: 'nb-4-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g43-1', termAr: 'معامل الدالة المرن', termEn: 'radius Parameter', definition: 'مدخل يمكّن نفس الدالة من حساب المساحة لأي دائرة بأي نصف قطر.' },
      ],
    },
  ],
  sources: [
    { id: 's43-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'تطبيق دالة مساحة الدائرة وتعديل return', pages: 'ص 45–47' },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-4',
    label: 'ابدأ اختبار المحطة الرابعة',
    description: 'اختبر فهمك للدوال والمعاملات والنطاق المحلي في ٤٠ سؤالًا من الكتاب.',
  },
};
