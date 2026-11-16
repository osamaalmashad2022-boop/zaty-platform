import type { LessonPack } from '@/types/curriculum';

export const LESSON_1_5: LessonPack = {
  id: '1.5',
  stationId: 'station-1',
  unitId: 'unit-1',
  order: 5,
  title: 'التكرار المنظم (for / range) ونشاط الكتاب الشامل',
  subtitle: 'وفّر سطور الكود بالحلقة التكرارية واكتب برنامج نجاح المتعلم',
  durationMin: 10,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'تستخدم الحلقة التكرارية for مع range() لجمع الأعداد بكفاءة بدل التكرار اليدوي.',
    'تفسّر عمل المعامل التراكمي += وتتبع قيم المتغير i في كل دورة.',
    'تكتب وتختبر برنامج نشاط الكتاب: ٣ درجات للمتعلم وتحديد النجاح بـ >= 50.',
  ],
  cards: [
    {
      id: '1.5-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '1.5-hero',
          type: 'heroHook',
          data: {
            title: 'التكرار الذكي بـ for و range',
            durationMin: 10,
            stationLabel: 'المحطة ١ · الدرس ٥ من ٥',
            goal: 'تستخدم حلقة for و range() للتكرار المنظم، وتكمل نشاط الكتاب الشامل لمتابعة نجاح المتعلم.',
            hook: 'لو طلبت منك تجمع الأرقام من 1 لـ 5 ممكن تكتب `1+2+3+4+5`.. طيب لو طلبت منك من 1 لـ 100؟ أكيد مش هتكتب ١٠٠ رقم بإيدك! هنا بتيجي قوة الحلقات التكرارية.',
          },
        },
      ],
    },
    {
      id: '1.5-c2',
      title: 'المرحلة ١ · مثال ٥ محلول: مجموع ١ إلى ٥',
      role: 'example',
      blocks: [
        {
          id: '1.5-loop-text',
          type: 'richText',
          data: {
            heading: 'إزاي بنجمع أرقام جوه حلقة؟',
            body: '• `total = 0`: متغير بنخزن فيه المجموع من البداية.\n• `for i in range(1, 6)`: بتعدّي على الأرقام **1، 2، 3، 4، 5** بالترتيب (خد بالك: الرقم الأخير 6 مش داخل!).\n• `total += i`: اختصار لـ `total = total + i` — يعني زوّد `i` الحالي على المجموع.',
          },
        },
        {
          id: '1.5-loop-code',
          type: 'codeView',
          data: {
            title: 'مثال ٥ من الكتاب (ص ١١–١٢)',
            code: 'total = 0\nfor i in range(1, 6):\n    total += i\nprint("Sum =", total)',
            caption: 'الناتج النهائي هيكون Sum = 15 (لأن 1+2+3+4+5 = 15).',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '1.5-c3',
      title: 'المرحلة ٢ · أكمل حلقة التكرار لحد ١٠',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-fill-loop',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'عدّل الكود ليجمع من ١ إلى ١٠',
            prompt:
              'أكمل سطر التجميع جوه الحلقة علشان نجمع الأعداد من 1 لحد 10 (الناتج الصح هو 55).',
            starterCode:
              'total = 0\nfor i in range(1, 11):\n    # اكتب سطر التجميع باستخدام += هنا\nprint("Sum =", total)',
            solutionCode:
              'total = 0\nfor i in range(1, 11):\n    total += i\nprint("Sum =", total)',
            checks: [
              {
                id: 'sum10',
                label: 'مجموع الأعداد من ١ إلى ١٠ = 55',
                stdin: [],
                expectedOutputRegex: '55',
              },
            ],
            hint: 'اكتب جوه الحلقة بمسافة بادئة: total += i (أو total = total + i).',
          },
        },
      ],
    },
    {
      id: '1.5-c4',
      title: 'المرحلة ٣ · نشاط الكتاب الشامل (٣ درجات والنجاح)',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-cap-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'نشاط الكتاب (ص ١٢): متعلم حصل على ٣ درجات',
            prompt:
              'متعلم حصل على 3 درجات. اكتب برنامج Python يقرأ الدرجات الثلاث، يحسب المتوسط، ولو المتوسط أكبر من أو يساوي 50 يطبع `"Pass"` (أو `"ناجح"`), ولو أقل يطبع `"Fail"` (أو `"غير ناجح"`).',
            starterCode:
              'a = float(input("Grade 1: "))\nb = float(input("Grade 2: "))\nc = float(input("Grade 3: "))\n# احسب المتوسط avg واختبر الشرط avg >= 50 هنا\n',
            solutionCode:
              'a = float(input("Grade 1: "))\nb = float(input("Grade 2: "))\nc = float(input("Grade 3: "))\navg = (a + b + c) / 3\nif avg >= 50:\n    print("Pass")\nelse:\n    print("Fail")',
            checks: [
              {
                id: 'cap-pass',
                label: 'درجات 60, 70, 50 -> ناجح / Pass',
                stdin: ['60', '70', '50'],
                expectedOutputRegex: '(Pass|ناجح)',
              },
              {
                id: 'cap-fail',
                label: 'درجات 30, 40, 20 -> راسب / غير ناجح / Fail',
                stdin: ['30', '40', '20'],
                expectedOutputRegex: '(Fail|غير ناجح|راسب)',
              },
            ],
            hint: 'avg = (a + b + c) / 3 وبعدها if avg >= 50: print("Pass") else: print("Fail").',
          },
        },
      ],
    },
    {
      id: '1.5-c5',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '1.5-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'فخ الامتحان: رقم النهاية في range() مش بيدخل!',
            body: 'سؤال مضمون في الامتحانات:\n• `range(1, 6)` بتولّد `1, 2, 3, 4, 5` بس (بتقف قبل 6).\n• `range(1, 4)` بتولّد `1, 2, 3` بس.\nفلو عايز تعدّ لحد 10 لازم تكتب `range(1, 11)`!',
          },
        },
      ],
    },
    {
      id: '1.5-c6',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما هي القيم التي سيأخذها المتغير `i` بالتسلسل في الحلقة `for i in range(1, 4):`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ١٥',
            options: [
              { id: 'a', text: '1, 2, 3', isCorrect: true, feedback: 'مظبوط! range(1, 4) تقف قبل 4 وتولّد 1 و2 و3.' },
              { id: 'b', text: '0, 1, 2, 3', isCorrect: false, feedback: 'بدأنا من 1 مش من 0.' },
              { id: 'c', text: '1, 2, 3, 4', isCorrect: false, feedback: 'الحد الأعلى 4 غير مشمول.' },
              { id: 'd', text: '2, 3, 4', isCorrect: false, feedback: 'نبدأ بالرقم الأول 1 ونقف قبل 4.' },
            ],
            explanation: 'في range(start, stop)، البداية شاملة والنهاية غير شاملة.',
          },
        },
        {
          id: '1.5-q2',
          type: 'quizQuestion',
          data: {
            question: 'في الكود `sum += i` ماذا تعني هذه العملية برمجيًا؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ١٦',
            options: [
              { id: 'a', text: 'sum = sum - i', isCorrect: false, feedback: 'علامة + معناها إضافة مش طرح.' },
              { id: 'b', text: 'sum = sum + i', isCorrect: true, feedback: 'صح! إضافة قيمة i إلى المجموع الحالي وحفظ الناتج في sum.' },
              { id: 'c', text: 'sum = i + 1', isCorrect: false, feedback: 'بنضيف على المجموع القديم مش على 1.' },
              { id: 'd', text: 'sum = i', isCorrect: false, feedback: 'كده كنا هنمسح القيمة القديمة ونبدلها.' },
            ],
            explanation: 'المعامل += يضيف القيمة الموجودة على اليمين إلى المتغير الموجود على اليسار.',
          },
        },
      ],
    },
    {
      id: '1.5-c7',
      title: 'ختام المحطة الأولى والخطوة الجاية',
      role: 'summary',
      blocks: [
        {
          id: '1.5-sum',
          type: 'richText',
          data: {
            heading: 'مبروك! خلّصت دروس المحطة الأولى',
            calloutStyle: 'summary',
            body: 'دلوقتي بقيت بتجمع بين **التفكير الحاسوبي** و**خطوات الحل** وبين **أدوات Python الأساسية** (`input` و `int` و `float` و `if/else` و `for/range`). خطوتك الجاية هي اختبار المحطة الأولى علشان تثبّت كل الـ ٤٠ سؤال الرسميين للكتاب!',
          },
        },
      ],
    },
  ],
  summary:
    'أتقنّا الحلقات التكرارية for و range() ومعامل التجميع += وطبّقنا كل مهارات المحطة الأولى في نشاط نجاح المتعلم.',
  additionalSources: [
    {
      id: 'nb-1-5-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content:
        'الحلقة التكرارية for توفر كتابة أسطر متكررة، بينما نشاط الكتاب يربط الإدخال والمتوسط والشرط معًا في برنامج واحد.',
      bullets: [
        'range(a, b) يولد من a إلى b - 1.',
        'total += i هو نفسه total = total + i.',
        'لا تبدأ أسطر الحلقة بدون مسافة بادئة (4 مسافات).',
      ],
    },
    {
      id: 'nb-1-5-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-1-5-1',
          question: 'ليه sum = 0 في البداية مهم؟',
          answer:
            'عشان نجهّز مكان في الذاكرة بقيمة صفر نبدأ نجمع عليه؛ لو ما عرفناش sum الأول هيحصل NameError.',
        },
        {
          id: 'faq-1-5-2',
          question: 'إزاي أحسب مجموع الأعداد من ١ إلى ١٠٠؟',
          answer:
            'بنفس الحلقة مع تغيير الحد الأعلى إلى 101: for i in range(1, 101):.',
        },
      ],
    },
    {
      id: 'nb-1-5-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-1-5',
        label: 'التكرار والختام',
        children: [
          { id: 'mm-1-5-for', label: 'for i in range(start, stop):' },
          { id: 'mm-1-5-acc', label: 'التجميع: total += i' },
          { id: 'mm-1-5-cap', label: 'نشاط الكتاب: ٣ درجات + avg >= 50' },
        ],
      },
    },
    {
      id: 'nb-1-5-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'gl-1-5-1',
          termAr: 'حلقة التكرار المحددة',
          termEn: 'for Loop',
          definition: 'حلقة برمجية تكرّر تنفيذ مجموعة أوامر لعدد محدد من المرات.',
        },
        {
          id: 'gl-1-5-2',
          termAr: 'نطاق الأعداد',
          termEn: 'range(start, stop)',
          definition: 'دالة تولّد تسلسل أعداد يبدأ من start وينتهي قبل stop مباشرة.',
        },
        {
          id: 'gl-1-5-3',
          termAr: 'المعامل التراكمي',
          termEn: '+= Operator',
          definition: 'مختصر برمجي يجمع قيمة جديدة على قيمة المتغير الحالية ويحفظ الناتج فيه.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'src-1-5-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي',
      detail: 'المثال الخامس (مجموع ١–٥) ونشاط المتعلم التطبيقي (٣ درجات)',
      pages: 'ص 11–12',
    },
    {
      id: 'src-1-5-nb',
      kind: 'notebooklm',
      label: 'مصادر NotebookLM للدرس ١.٥',
      detail: 'تتبع قيمة i ومعامل التجميع += ونطاق range()',
    },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-1',
    label: 'ابدأ اختبار المحطة الأولى',
    description: 'اختبر نفسك في أسئلة الكتاب الرسمية للمحطة ١ (اختبار سريع أو كل الـ ٤٠ سؤال).',
  },
};
