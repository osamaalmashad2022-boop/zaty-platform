import type { LessonPack } from '@/types/curriculum';

export const LESSON_4_1: LessonPack = {
  id: '4.1',
  stationId: 'station-4',
  unitId: 'unit-1',
  order: 1,
  title: 'تعريف الدالة واستدعاؤها بالمعاملات (def & Parameters)',
  subtitle: 'اكتب الكود مرة واحدة وناديه في أي وقت بقيم مختلفة',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'draft',
  objectives: [
    'تشرح معنى الدالة (Function) وفائدتها في تنظيم الكود ومنع التكرار.',
    'تعرّف دالة جديدة باستخدام الكلمة المفتاحية def وتمرّر لها معاملات (Parameters).',
    'تفرّق بين المعاملات (Parameters) في التعريف والوسائط (Arguments) عند الاستدعاء.',
  ],
  cards: [
    {
      id: '4.1-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '4.1-hero',
          type: 'heroHook',
          data: {
            title: 'الدوال ذات المعاملات في Python',
            durationMin: 8,
            stationLabel: 'المحطة ٤ · الدرس ١ من ٣',
            goal: 'تعرّف دالة بـ def وتمرر لها قيم عند استدعائها بدون تكرار الكود.',
            hook: 'زي زرار في الآلة الحاسبة: بتدوس عليه فيقوم بمهمة جاهزة ويرجعلك النتيجة! في البرمجة اسمها الدالة (Function) — بتكتبها مرة وتناديها مية مرة.',
          },
        },
      ],
    },
    {
      id: '4.1-c2',
      title: 'تعريف الدالة والمعاملات والوسائط',
      role: 'concept',
      blocks: [
        {
          id: '4.1-def',
          type: 'richText',
          data: {
            heading: 'الدالة (Function) والفرق بين Parameters و Arguments',
            body: '• **الدالة (Function):** مجموعة تعليمات برمجية تُكتب مرة واحدة باستخدام `def` وتُستدعى عدة مرات لتنظيم البرنامج ومنع التكرار.\n• **المعاملات (Parameters):** أسماء المتغيرات داخل الأقواس عند تعريف الدالة (مثل `a, b`).\n• **الوسائط (Arguments):** القيم الفعلية التي نمررها للدالة عند استدعائها (مثل `3, 5`).',
          },
        },
        {
          id: '4.1-ex-code',
          type: 'codeView',
          data: {
            title: 'مثال الكتاب: دالة جمع رقمين (ص ٤٥)',
            code: 'def add_numbers(a, b):\n    result = a + b\n    print(result)\n\nadd_numbers(3, 5)\nadd_numbers(10, 20)',
            caption: 'a و b هما Parameters، بينما 3 و 5 هما Arguments.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '4.1-c3',
      title: 'جرّب بنفسك: دالة الترحيب والضرب',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل استدعاء الدالة greet',
            prompt: 'عرّفنا الدالة `greet(name)`. أكمل السطر الأخير لاستدعائها بالاسم `"Ahmed"` علشان تطبع `"Hello Ahmed"`.',
            starterCode: 'def greet(name):\n    print("Hello", name)\n\n# استدعِ الدالة بالقيمة "Ahmed" هنا\n',
            solutionCode: 'def greet(name):\n    print("Hello", name)\n\ngreet("Ahmed")',
            checks: [
              { id: 'greet-chk', label: 'طباعة Hello Ahmed', stdin: [], contains: 'Hello Ahmed' },
            ],
            hint: 'اكتب greet("Ahmed") من غير مسافة بادئة في بداية السطر.',
          },
        },
      ],
    },
    {
      id: '4.1-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '4.1-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'عدد القيم عند الاستدعاء لازم يساوي عدد المعاملات!',
            body: 'لو عرّفت الدالة بمعاملين `def add(a, b):` ثم استدعيتها بقيمة واحدة `add(5)`، بايثون هيطلع خطأ `TypeError` بسبب نقص قيمة للمعامل الثاني!',
          },
        },
      ],
    },
    {
      id: '4.1-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-q1',
          type: 'quizQuestion',
          data: {
            question: 'في الاستدعاء `add_numbers(3, 5)`، ما اسم القيم 3 و 5؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٠',
            options: [
              { id: 'a', text: 'Parameters', isCorrect: false, feedback: 'Parameters هي الأسماء داخل تعريف الدالة (a, b).' },
              { id: 'b', text: 'Arguments', isCorrect: true, feedback: 'إجابة صحيحة: القيم الفعلية عند الاستدعاء تُسمى Arguments.' },
              { id: 'c', text: 'Variables', isCorrect: false, feedback: 'ليست مجرد متغيرات عادية.' },
              { id: 'd', text: 'Constants', isCorrect: false, feedback: 'ليست ثوابت.' },
            ],
            explanation: 'المعاملات Parameters في التعريف، والوسائط Arguments عند الاستدعاء.',
          },
        },
      ],
    },
    {
      id: '4.1-c6',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '4.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'الدالة تُعرّف بـ `def` وتقبل معاملات `Parameters` في التعريف وتستلم قيمًا `Arguments` عند الاستدعاء، وده بيخلي الكود منظم وقابل لإعادة الاستخدام. في الدرس الجاي هنعرف الفرق الحاسم بين `print` و `return` ونطاق المتغير المحلي!',
          },
        },
      ],
    },
  ],
  summary: 'تعلمنا تعريف الدالة بـ def وتمرير المعاملات والفرق بين Parameters و Arguments.',
  additionalSources: [
    {
      id: 'nb-4-1-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content: 'def لتعريف الدالة، والـ Parameters هي المدخلات الرمزية في التعريف، والـ Arguments هي القيم الفعلية عند الاستدعاء.',
    },
    {
      id: 'nb-4-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g41-1', termAr: 'الدالة', termEn: 'Function (def)', definition: 'كتلة تعليمات برمجية تُكتب مرة واحدة وتُستدعى عند الحاجة.' },
        { id: 'g41-2', termAr: 'المعاملات والوسائط', termEn: 'Parameters vs Arguments', definition: 'Parameters في تعريف الدالة، و Arguments هي القيم الممررة عند استدعائها.' },
      ],
    },
  ],
  sources: [
    { id: 's41-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'تعريف الدوال والمعاملات', pages: 'ص 43–45' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '4.2',
    label: 'الدرس الجاي: return مقابل print والنطاق المحلي',
    description: 'اعرف ليه return بتخلينا نحفظ الناتج في متغير وليه المتغير المحلي بيختفي بره الدالة.',
  },
};
