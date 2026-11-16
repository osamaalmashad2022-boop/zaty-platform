import type { LessonPack } from '@/types/curriculum';

export const LESSON_4_1: LessonPack = {
  id: '4.1',
  stationId: 'station-4',
  unitId: 'unit-1',
  order: 1,
  title: 'تعريف الدالة واستدعاؤها بالمعاملات (def & Parameters)',
  subtitle: 'اكتب الكود مرة واحدة وناديه في أي وقت بقيم مختلفة',
  durationMin: 8,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
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
            hook: 'زي زرار في الآلة الحاسبة: بتدوس عليه فيقوم بمهمة جاهزة ويرجعلك النتيجة! في البرمجة اسمها الدالة (`Function`) — بتكتبها مرة واحدة وتناديها مية مرة بأرقام مختلفة.',
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
            body: '• **الدالة (Function):** مجموعة تعليمات برمجية بتتكتب مرة واحدة باستخدام `def` ونستدعيها وقت ما نحتاج لتنظيم البرنامج ومنع التكرار وتسهيل الصيانة.\n• **المعاملات (Parameters):** أسماء المتغيرات جوه الأقواس عند تعريف الدالة (مثل `a, b`).\n• **الوسائط / المعطيات (Arguments):** القيم الفعلية اللي بنبعتها للدالة وقت استدعائها (مثل `3, 5`).',
          },
        },
        {
          id: '4.1-ex-code',
          type: 'codeView',
          data: {
            title: 'مثال الكتاب: دالة جمع رقمين (ص ٤٥)',
            code: 'def add_numbers(a, b):\n    result = a + b\n    print(result)\n\nadd_numbers(3, 5)\nadd_numbers(10, 20)',
            caption: 'a و b هما Parameters في التعريف، بينما 3 و 5 هما Arguments عند الاستدعاء.',
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
        {
          id: '4.1-mul-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'تحدي مستقل: دالة ضرب رقمين',
            prompt: 'اكتب دالة اسمها `multiply(a, b)` تطبع حاصل ضرب `a * b`، ثم استدعِها بالقيم `4, 6` لتطبع `24`.',
            starterCode: '# عرّف الدالة multiply(a, b) ثم استدعِها بـ 4 و 6\n',
            solutionCode: 'def multiply(a, b):\n    print(a * b)\n\nmultiply(4, 6)',
            checks: [
              { id: 'mul-24', label: 'multiply(4, 6) تطبع 24', stdin: [], expectedOutputRegex: '(^|\\D)24(\\D|$)' },
            ],
            hint: 'اكتب def multiply(a, b): وتحتها بمسافة بادئة print(a * b) وبعدين بره الدالة multiply(4, 6).',
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
            body: 'لو عرّفت الدالة بمعاملين `def add(a, b):` وبعدين استدعيتها بقيمة واحدة `add(5)`، بايثون هيطلع خطأ `TypeError` عشان ناقص قيمة للمعامل التاني! وكمان ما تنساش تستدعي الدالة، لأن تعريف الدالة لوحده مش بيشغلها.',
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
        {
          id: '4.1-q2',
          type: 'quizQuestion',
          data: {
            question: 'أي كلمة مفتاحية نستخدمها في Python لتعريف دالة جديدة؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤٨',
            options: [
              { id: 'a', text: 'function', isCorrect: false, feedback: 'دي مش الكلمة المستخدمة في Python.' },
              { id: 'b', text: 'def', isCorrect: true, feedback: 'صح! def هي اختصار define وتُستخدم لتعريف أي دالة في Python.' },
              { id: 'c', text: 'func', isCorrect: false, feedback: 'غير صحيح في Python.' },
              { id: 'd', text: 'call', isCorrect: false, feedback: 'غير صحيح.' },
            ],
            explanation: 'تُعرَّف الدالة في Python باستخدام الكلمة المفتاحية def متبوعة باسم الدالة والأقواس والنقطتين.',
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
            body: 'الدالة بتتعرّف بـ `def` وبتقبل معاملات `Parameters` في التعريف وبتستلم قيمًا `Arguments` عند الاستدعاء، وده بيخلي الكود منظم وقابل لإعادة الاستخدام من غير تكرار. في الدرس الجاي هنعرف الفرق الحاسم بين `print` و `return` ونطاق المتغير المحلي!',
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
      title: 'ملخص سريع (NotebookLM)',
      content: 'الدوال هي أساس كتابة كود نظيف وقابل لإعادة الاستخدام بدون نسخ نفس السطور.',
      bullets: [
        'def function_name(parameters): لتعريف الدالة.',
        'Parameters هي المتغيرات الرمزية جوه تعريف الدالة.',
        'Arguments هي القيم الفعلية اللي بنمررها وقت الاستدعاء.',
        'الدالة ما بتتنفذش إلا لما نستدعيها باسمها وأقواسها.',
      ],
    },
    {
      id: 'nb-4-1-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-4-1-1',
          question: 'إيه الفرق بين Parameters و Arguments؟',
          answer: 'Parameters هي الأسماء المكتوبة جنب def (زي a و b)، أما Arguments فهي الأرقام أو النصوص الفعلية اللي بتبعتها وقت النداء زي add_numbers(3, 5).',
        },
        {
          id: 'faq-4-1-2',
          question: 'ينفع أعرف دالة من غير استدعاء وأتوقعها تطبع لوحدها؟',
          answer: 'لا! def بتجهز الدالة بس في الذاكرة، ولازم تستدعيها باسمها عشان تشتغل.',
        },
      ],
    },
    {
      id: 'nb-4-1-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-4-1',
        label: 'الدوال (Functions)',
        children: [
          { id: 'mm-4-1-def', label: 'التعريف: def name(params):' },
          { id: 'mm-4-1-call', label: 'الاستدعاء: name(args)' },
          { id: 'mm-4-1-why', label: 'الفائدة: منع التكرار وسهولة الصيانة' },
        ],
      },
    },
    {
      id: 'nb-4-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g41-1', termAr: 'الدالة', termEn: 'Function (def)', definition: 'كتلة تعليمات برمجية تُكتب مرة واحدة وتُستدعى عند الحاجة.' },
        { id: 'g41-2', termAr: 'المعاملات', termEn: 'Parameters', definition: 'المتغيرات المحددة داخل قوسي الدالة عند تعريفها لتمثيل المدخلات.' },
        { id: 'g41-3', termAr: 'الوسائط / المعطيات', termEn: 'Arguments', definition: 'القيم الفعلية الممررة للدالة عند استدعائها.' },
      ],
    },
  ],
  sources: [
    { id: 's41-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'تعريف الدوال والمعاملات', pages: 'ص 43–45' },
    { id: 's41-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٤.١', detail: 'الفرق بين Parameters و Arguments وبناء الدوال' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '4.2',
    label: 'الدرس الجاي: return مقابل print والنطاق المحلي',
    description: 'اعرف ليه return بتخلينا نحفظ الناتج في متغير وليه المتغير المحلي بيختفي بره الدالة.',
  },
};
