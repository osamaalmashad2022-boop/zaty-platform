import type { LessonPack } from '@/types/curriculum';

export const LESSON_4_3: LessonPack = {
  id: '4.3',
  stationId: 'station-4',
  unitId: 'unit-1',
  order: 3,
  title: 'تطبيق هندسي عملي: دالة حساب مساحة الدائرة',
  subtitle: 'حوّل القانون الرياضي لدالة ذكية ترجّع المساحة لأي نصف قطر',
  durationMin: 8,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
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
        {
          id: '4.3-q2',
          type: 'quizQuestion',
          data: {
            question: 'بعد تعديل `circle_area(radius)` لتستخدم `return area`، ما قيمة `result` عند تنفيذ `result = circle_area(10)`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤٦–٤٧',
            options: [
              { id: 'a', text: '31.4', isCorrect: false, feedback: 'دي 3.14 * 10 (من غير التربيع).' },
              { id: 'b', text: '62.8', isCorrect: false, feedback: 'ده محيط الدائرة 2 * pi * r.' },
              { id: 'c', text: '314.0', isCorrect: true, feedback: 'صح! 3.14 × 10 × 10 = 314.0.' },
              { id: 'd', text: 'None', isCorrect: false, feedback: 'ترجع 314.0 لأنها بتستخدم return area.' },
            ],
            explanation: 'area = 3.14 * 10 * 10 = 314.0 وترجعها الدالة عبر return.',
          },
        },
      ],
    },
    {
      id: '4.3-c6',
      title: 'ختام المحطة الرابعة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '4.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'بنِينا دالة `circle_area(radius)` وطوّرناها بـ `return` علشان ترجّع القيمة ونستخدمها بأي نصف قطر في حسابات تانية. دلوقتي تقدر تختبر نفسك في ٤٠ سؤالًا رسميًا للمحطة الرابعة!',
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
      title: 'ملخص سريع (NotebookLM)',
      content: 'دالة circle_area(radius) تجمع بين المعاملات والقانون الرياضي وكلمة return في تطبيق هندسي عملي.',
      bullets: [
        'pi = 3.14 و area = pi * radius * radius.',
        'تطوير الدالة بـ return area يتيح حفظ الناتج في متغير خارجي.',
        'نفس الدالة تشتغل على radius = 5 أو radius = 10 أو أي قيمة.',
      ],
    },
    {
      id: 'nb-4-3-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-4-3-1',
          question: 'هل ممكن أكتب radius ** 2 بدل radius * radius؟',
          answer: 'أيوه طبعًا! في Python علامة ** معناها الأس، فـ radius ** 2 بتدي نفس نتيجة radius * radius.',
        },
        {
          id: 'faq-4-3-2',
          question: 'ليه عدّلنا الدالة من print() إلى return area في تدريب الكتاب؟',
          answer: 'عشان تبقى دالة احترافية نقدر نخزن نتيجتها في متغير result أو نجمع مساحتين مع بعض.',
        },
      ],
    },
    {
      id: 'nb-4-3-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-4-3',
        label: 'دالة مساحة الدائرة',
        children: [
          { id: 'mm-4-3-in', label: 'المدخل (Parameter): radius' },
          { id: 'mm-4-3-calc', label: 'الحساب: pi * radius * radius' },
          { id: 'mm-4-3-out', label: 'الإرجاع: return area' },
          { id: 'mm-4-3-test', label: 'الاختبار: r=5 (78.5) و r=10 (314.0)' },
        ],
      },
    },
    {
      id: 'nb-4-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g43-1', termAr: 'معامل نصف القطر', termEn: 'radius Parameter', definition: 'مدخل يمكّن نفس الدالة من حساب المساحة لأي دائرة بأي نصف قطر.' },
        { id: 'g43-2', termAr: 'قانون مساحة الدائرة', termEn: 'pi * r * r', definition: 'الصيغة الرياضية لحساب مساحة الدائرة حيث pi ≈ 3.14.' },
      ],
    },
  ],
  sources: [
    { id: 's43-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'تطبيق دالة مساحة الدائرة وتعديل return', pages: 'ص 45–47' },
    { id: 's43-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٤.٣', detail: 'تتبع تنفيذ circle_area قبل وبعد return' },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-4',
    label: 'ابدأ اختبار المحطة الرابعة',
    description: 'اختبر فهمك للدوال والمعاملات والنطاق المحلي في ٤٠ سؤالًا من الكتاب.',
  },
};
