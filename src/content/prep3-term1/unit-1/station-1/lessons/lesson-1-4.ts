import type { LessonPack } from '@/types/curriculum';

export const LESSON_1_4: LessonPack = {
  id: '1.4',
  stationId: 'station-1',
  unitId: 'unit-1',
  order: 4,
  title: 'القرارات الحسابية والدقة العشرية',
  subtitle: 'احسب المتوسط بدقة float والمساحات والمقارنة بـ if / else',
  durationMin: 9,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'تبرّر استخدام نوع البيانات float بدل int عند حساب المتوسط لتجنب ضياع الكسور.',
    'تطبق قوانين المساحات وحساب المتوسط مع ترتيب العمليات بالأقواس (a + b + c) / 3.',
    'تستخدم جملتي if و else والمقارنة > لتحديد الأكبر بين رقمين.',
  ],
  cards: [
    {
      id: '1.4-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '1.4-hero',
          type: 'heroHook',
          data: {
            title: 'الأرقام العشرية والمقارنات الذكية',
            durationMin: 9,
            stationLabel: 'المحطة ١ · الدرس ٤ من ٥',
            goal: 'تحافظ على دقة الكسور العشرية بـ float، وتحسب المساحات، وتخلي البرنامج ياخد قرار بـ if / else.',
            hook: 'تخيل إن مجموع درجاتك طلع متوسطه 85.5، لكن البرنامج مسح النص درجة وطلّعلك 85 بس علشان حسبها كـ int! نص درجة ممكن يفرّق في الترتيب، عشان كده الدقة العشرية مهمة جدًا.',
          },
        },
      ],
    },
    {
      id: '1.4-c2',
      title: 'مثال ٢: متوسط ٣ أرقام ودقة float',
      role: 'example',
      blocks: [
        {
          id: '1.4-avg-text',
          type: 'richText',
          data: {
            heading: 'القاعدة الحسابية وترتيب الأقواس',
            body: 'لما نحسب متوسط 3 أرقام `a` و `b` و `c`، لازم نجمعهم جوه أقواس الأول وبعدين نقسم على 3: `(a + b + c) / 3`.\n\n**ليه `float` مش `int`؟** لأن القسمة `/` في بايثون بتطلّع عدد عشري (`float`) زي `85.5` — ولو حولنا الناتج بـ `int()` هنفقد الكسر وتضيع الدقة!',
          },
        },
        {
          id: '1.4-avg-code',
          type: 'codeView',
          data: {
            title: 'مثال ٢ من الكتاب: متوسط ٣ أرقام (ص ٩)',
            code: 'a = float(input("Enter first number: "))\nb = float(input("Enter second number: "))\nc = float(input("Enter third number: "))\navg = (a + b + c) / 3\nprint("Average =", avg)',
            caption: 'استخدام float() مع / يحافظ على كل الكسور العشرية بدقة.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '1.4-c3',
      title: 'جرّب بنفسك: مساحة المستطيل والمربع',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-rect-view',
          type: 'codeView',
          data: {
            title: 'مثال ٣ من الكتاب: مساحة المستطيل (ص ١٠)',
            code: 'length = int(input("Enter length: "))\nwidth = int(input("Enter width: "))\narea = length * width\nprint("Area =", area)',
            caption: 'الربط بين الرياضيات والبرمجة: المساحة = الطول × العرض.',
            runnable: true,
          },
        },
        {
          id: '1.4-square-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل كود مساحة المربع (المسألة القريبة)',
            prompt:
              'زي مساحة المستطيل، دلوقتي احسب مساحة مربع طول ضلعه `side` (المساحة = الضلع × الضلع). أكمل السطر الناقص وشغّل الاختبار!',
            starterCode:
              'side = int(input("Enter side: "))\n# اكتب سطر حساب area هنا\nprint("Area =", area)',
            solutionCode:
              'side = int(input("Enter side: "))\narea = side * side\nprint("Area =", area)',
            checks: [
              { id: 'sq-1', label: 'ضلع طوله 6 (المساحة 36)', stdin: ['6'], expectedOutputRegex: '36' },
              { id: 'sq-2', label: 'ضلع طوله 9 (المساحة 81)', stdin: ['9'], expectedOutputRegex: '81' },
            ],
            hint: 'اكتب area = side * side (أو side ** 2).',
          },
        },
      ],
    },
    {
      id: '1.4-c4',
      title: 'مثال ٤ + جرّب لوحدك: الأكبر بين رقمين ومتوسط ٤ درجات',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-max-view',
          type: 'codeView',
          data: {
            title: 'مثال ٤ من الكتاب: أكبر رقم من رقمين (ص ١٠–١١)',
            code: 'a = int(input("Enter first number: "))\nb = int(input("Enter second number: "))\nif a > b:\n    print("الرقم الأكبر هو:", a)\nelse:\n    print("الرقم الأكبر هو:", b)',
            caption: 'إذا كان الشرط a > b صحيحًا (True) ينفّذ if، وإذا كان False ينفّذ else.',
            runnable: true,
          },
        },
        {
          id: '1.4-avg4-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'تحدي مستقل: متوسط ٤ مواد',
            prompt:
              'اكتب برنامج Python يقرأ ٤ درجات باستخدام `float(input(...))` أو `int(input(...))`، ويحسب المتوسط بالأقواس الصح ويطبعه.',
            starterCode:
              'a = float(input("Grade 1: "))\nb = float(input("Grade 2: "))\nc = float(input("Grade 3: "))\nd = float(input("Grade 4: "))\n# احسب المتوسط واطبعه هنا\n',
            solutionCode:
              'a = float(input("Grade 1: "))\nb = float(input("Grade 2: "))\nc = float(input("Grade 3: "))\nd = float(input("Grade 4: "))\navg = (a + b + c + d) / 4\nprint("Average =", avg)',
            checks: [
              {
                id: 'avg4-1',
                label: 'درجات 80, 90, 85, 87 (المتوسط 85.5)',
                stdin: ['80', '90', '85', '87'],
                expectedOutputRegex: '85\\.5',
              },
              {
                id: 'avg4-2',
                label: 'درجات 10, 20, 30, 40 (المتوسط 25)',
                stdin: ['10', '20', '30', '40'],
                expectedOutputRegex: '25',
              },
            ],
            hint: 'تأكد من كتابة الأقواس: avg = (a + b + c + d) / 4 وبعدين print(avg).',
          },
        },
      ],
    },
    {
      id: '1.4-c5',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '1.4-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'خطأ شائع: نسيان الأقواس في المتوسط + تنفيذ else',
            body: '• لو كتبت `a + b + c / 3` من غير أقواس، بايثون هيقسم `c` لوحدها على 3 الأول! الصيغة الصح دايمًا `(a + b + c) / 3`.\n• وجملة `else` مش بتتنفذ دايمًا — بتتنفذ **بس** لما شرط `if` يرجّع `False`.',
          },
        },
      ],
    },
    {
      id: '1.4-c6',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-q1',
          type: 'quizQuestion',
          data: {
            question: 'لماذا يُنصح باستخدام نوع البيانات `float` بدلًا من `int` عند حساب المتوسط الحسابي؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ١٥',
            options: [
              { id: 'a', text: 'لأنه يجعل البرنامج أسرع في التنفيذ', isCorrect: false, feedback: 'السبب يتعلق بدقة الأرقام مش السرعة.' },
              { id: 'b', text: 'لأن int يستهلك مساحة تخزينية أكبر', isCorrect: false, feedback: 'غير صحيح.' },
              {
                id: 'c',
                text: 'للاحتفاظ بالدقة وتجنب ضياع الكسور في الناتج',
                isCorrect: true,
                feedback: 'ممتاز! المتوسط ممكن يطلع رقم عشري زي 85.5 وfloat بيحافظ عليه.',
              },
              { id: 'd', text: 'لأن int لا يدعم الطباعة بـ print', isCorrect: false, feedback: 'print() تطبع الأرقام الصحيحة والعشرية عادي.' },
            ],
            explanation: 'المتوسط كثيرًا ما يحتوي على كسور عشرية، والـ float يمنع فقدان الدقة.',
          },
        },
        {
          id: '1.4-q2',
          type: 'quizQuestion',
          data: {
            question: 'إذا كان الشرط المكتوب في التعليمة `if` يعطي النتيجة `False`، فأي مسار سيسلكه البرنامج؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ١٧',
            options: [
              { id: 'a', text: 'يتوقف البرنامج عن العمل تمامًا', isCorrect: false, feedback: 'البرنامج بيدوّر على البديل مش بيقف.' },
              {
                id: 'b',
                text: 'يتم تنفيذ الجملة التابعة لـ else (إذا وُجدت)',
                isCorrect: true,
                feedback: 'صح! لما الشرط يكون False، بايثون يسيب جسم if وينفّذ else.',
              },
              { id: 'c', text: 'يُعيد تنفيذ الشرط مرة أخرى', isCorrect: false, feedback: 'if بتفحص الشرط مرة واحدة مش حلقة تكرار.' },
              { id: 'd', text: 'ينفذ الأوامر التابعة لـ if رغم ذلك', isCorrect: false, feedback: 'أوامر if بتتنفذ بس لما الشرط يكون True.' },
            ],
            explanation: 'عندما يكون شرط if غير محقق (False)، ينتقل التنفيذ لكتلة else إن وُجدت.',
          },
        },
      ],
    },
    {
      id: '1.4-c7',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '1.4-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'استخدم `float` علشان ما تخسرش الكسور العشرية في المتوسط، وحط الجمع جوه أقواس `(a + b + c) / 3`. وعن طريق الضرب بنحسب المساحات، وبجملة `if / else` والمقارنة `>` البرنامج بياخد قرارات ذكية حسب القيم المدخلة.',
          },
        },
      ],
    },
  ],
  summary:
    'تعلمنا الحفاظ على الدقة العشرية بـ float، وتنفيذ القوانين الحسابية مثل المتوسط ومساحة المستطيل، واتخاذ القرارات الشرطية بـ if / else.',
  additionalSources: [
    {
      id: 'nb-1-4-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content:
        'الدرس يجمع ٣ أمثلة أساسية من الكتاب: المتوسط (دقة float)، المساحة (ربط الرياضيات)، والمقارنة (if / else).',
      bullets: [
        'float يحفظ الأرقام العشرية مثل 85.5 بعكس int.',
        'الأقواس تحمي أولوية الجمع قبل القسمة في المتوسط.',
        'else لا تعمل إلا عندما يكون شرط if قيمته False.',
      ],
    },
    {
      id: 'nb-1-4-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-1-4-1',
          question: 'إيه التجريد في مثال تحديد أكبر رقم؟',
          answer:
            'التركيز فقط على مقارنة الرقمين المدخلين وتجاهل أي تفاصيل أخرى غير مطلوبة في القرار.',
        },
        {
          id: 'faq-1-4-2',
          question: 'ليه (a + b + c) / 3 غير a + b + c / 3؟',
          answer:
            'لأن القسمة لها أولوية أعلى من الجمع! من غير أقواس هيتقسم c بس على 3 بدل المجموع كله.',
        },
      ],
    },
    {
      id: 'nb-1-4-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-1-4',
        label: 'الدقة والقرارات الحسابية',
        children: [
          { id: 'mm-1-4-f', label: 'float: دقة الأرقام العشرية في المتوسط' },
          { id: 'mm-1-4-a', label: 'المساحات: length * width' },
          { id: 'mm-1-4-c', label: 'الشروط: if True / else False' },
        ],
      },
    },
    {
      id: 'nb-1-4-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'gl-1-4-1',
          termAr: 'عدد عشري',
          termEn: 'Floating-point (float)',
          definition: 'نوع بيانات رقمي يحتفظ بالكسور والأرقام بعد العلامة العشرية.',
        },
        {
          id: 'gl-1-4-2',
          termAr: 'الجملة الشرطية',
          termEn: 'if / else Statement',
          definition: 'تعبير برمجي يختبر شرطًا؛ ينفذ كتلة if عند تحقق الشرط، وكتلة else عند عدم تحققه.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'src-1-4-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي',
      detail: 'الأمثلة ٢ و٣ و٤ (المتوسط، مساحة المستطيل، أكبر رقم)',
      pages: 'ص 9–11',
    },
    {
      id: 'src-1-4-nb',
      kind: 'notebooklm',
      label: 'مصادر NotebookLM للدرس ١.٤',
      detail: 'ملخص الأولويات الحسابية ودقة float',
    },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '1.5',
    label: 'الدرس الجاي: الحلقات التكرارية for ونشاط الكتاب',
    description: 'هتتعلّم تكرر العمليات أوتوماتيك بـ for و range() وتحسم نشاط الـ ٣ درجات!',
  },
};
