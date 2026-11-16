import type { LessonPack } from '@/types/curriculum';

export const LESSON_1_3: LessonPack = {
  id: '1.3',
  stationId: 'station-1',
  unitId: 'unit-1',
  order: 3,
  title: 'أول برنامج Python: المدخلات وباقي القسمة',
  subtitle: 'استقبل أرقام من المستخدم بـ input() و int() واكشف الزوجي والفردي بـ %',
  durationMin: 9,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'تستخدم دالة input() لاستقبال البيانات وint() لتحويلها لعدد صحيح وprint() لعرض النتيجة.',
    'تحسب باقي القسمة بالمعامل % وتستخدمه في اختبار هل الرقم زوجي أم فردي.',
    'تفهم سبب ظهور خطأ ValueError لو المستخدم كتب نص بدل رقم جوه int().',
  ],
  cards: [
    {
      id: '1.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '1.3-hero',
          type: 'heroHook',
          data: {
            title: 'أول كود Python حقيقي على موبايلك',
            durationMin: 9,
            stationLabel: 'المحطة ١ · الدرس ٣ من ٥',
            goal: 'تكتب وتشغّل أول برنامج Python ياخد رقم من المستخدم ويفحص باقي قسمته بـ %.',
            hook: 'تخيل إنك عملت برنامج آلة حاسبة، بس كل ما المستخدم يكتب رقمين، البرنامج يدمجهم جنب بعض زي "5" + "3" = "53" بدل 8! ده بيحصل لو نسينا نحوّل كلام المستخدم لرقم صحيح بـ int().',
          },
        },
      ],
    },
    {
      id: '1.3-c2',
      title: 'الأدوات الأساسية: input و int و print',
      role: 'concept',
      blocks: [
        {
          id: '1.3-tools-text',
          type: 'richText',
          data: {
            heading: 'إزاي بايثون بياخد رقم ويعرض نتيجة؟',
            body: '• `input()` بتستقبل الإدخال من المستخدم على شكل **نص (String)**.\n• `int()` بتحوّل النص لعدد صحيح (**Integer**) علشان نقدر نجمع ونضرب ونقسم.\n• `print()` بتطبع النتائج والمخرجات على الشاشة.\n• `%` علامة **باقي القسمة (Modulo)** — يعني لو قسمنا 7 على 2، الباقي 1؛ ولو قسمنا 8 على 2، الباقي 0.',
          },
        },
        {
          id: '1.3-sum-code',
          type: 'codeView',
          data: {
            title: 'مثال الكتاب: جمع رقمين',
            code: 'num1 = int(input("Enter first number: "))\nnum2 = int(input("Enter second number: "))\nsum_val = num1 + num2\nprint("Sum =", sum_val)',
            caption: 'شغّلنا int() حوالين input() علشان يتحول الإدخال لرقم صحيح قبل الجمع.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '1.3-c3',
      title: 'المرحلة ١ · مثال محلول: زوجي أم فردي',
      role: 'example',
      blocks: [
        {
          id: '1.3-even-text',
          type: 'richText',
          data: {
            heading: 'مثال ١ من الكتاب: هل الرقم زوجي أم فردي؟',
            body: '• **الأنماط:** أي رقم زوجي باقي قسمته على 2 يساوي `0`، وأي رقم فردي باقي قسمته لا يساوي `0`.\n• **في الكود:** `num % 2 == 0` بتفحص المساواة (لاحظ علامتي `==` للمقارنة، مش `=` الواحدة).',
          },
        },
        {
          id: '1.3-even-code',
          type: 'codeView',
          data: {
            title: 'الكود الكامل من الكتاب (ص ٨)',
            code: 'num = int(input("Enter a number: "))\nif num % 2 == 0:\n    print("Even number")\nelse:\n    print("Odd number")',
            caption: 'لو أدخلت 8 هيطبع Even number، ولو أدخلت 7 هيطبع Odd number.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '1.3-c4',
      title: 'المرحلة ٢ · أكمل السطر الناقص',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-fill-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل طباعة الرقم الزوجي والفردي',
            prompt:
              'السطر اللي جوه `if` ناقص! اكتب أمر `print("Even number")` مكان التعليق، وشغّل الاختبار علشان تتأكد من الحل.',
            starterCode:
              'num = int(input("Enter a number: "))\nif num % 2 == 0:\n    # اكتب أمر طباعة Even number هنا\nelse:\n    print("Odd number")',
            solutionCode:
              'num = int(input("Enter a number: "))\nif num % 2 == 0:\n    print("Even number")\nelse:\n    print("Odd number")',
            checks: [
              {
                id: 'chk-even',
                label: 'تجربة الرقم 8 (زوجي)',
                stdin: ['8'],
                expectedOutputRegex: '(Even|زوجي)',
              },
              {
                id: 'chk-odd',
                label: 'تجربة الرقم 7 (فردي)',
                stdin: ['7'],
                expectedOutputRegex: '(Odd|فردي)',
              },
            ],
            hint: 'جوه if لازم تسيب مسافة بادئة (4 مسافات) وتكتب print("Even number").',
          },
        },
      ],
    },
    {
      id: '1.3-c5',
      title: 'المرحلة ٣ · جرّب لوحدك: يقبل القسمة على ٥',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-free-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'تحدي المبرمج: القسمة على ٥',
            prompt:
              'اكتب برنامج Python كامل يقرأ رقمًا صحيحًا من المستخدم باستخدام `int(input(...))`، ولو بيقبل القسمة على 5 يطبع `"Divisible by 5"`، ولو لأ يطبع `"Not divisible by 5"`.',
            starterCode:
              'num = int(input("Enter a number: "))\n# اكتب الشرط باستخدام num % 5 == 0 هنا\n',
            solutionCode:
              'num = int(input("Enter a number: "))\nif num % 5 == 0:\n    print("Divisible by 5")\nelse:\n    print("Not divisible by 5")',
            checks: [
              {
                id: 'chk-div5',
                label: 'تجربة الرقم 25 (يقبل القسمة)',
                stdin: ['25'],
                expectedOutputRegex: 'Divisible by 5',
              },
              {
                id: 'chk-not5',
                label: 'تجربة الرقم 12 (لا يقبل القسمة)',
                stdin: ['12'],
                expectedOutputRegex: 'Not divisible by 5',
              },
            ],
            hint: 'نفس فكرة الزوجي والفردي، بس بدّل 2 بـ 5 في `num % 5 == 0`!',
          },
        },
      ],
    },
    {
      id: '1.3-c6',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '1.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'خطأ شائع: كتابة كلمة جوه int()',
            body: 'لو البرنامج سأل المستخدم عن رقم وراح كتب كلمة زي `"خمسة"` أو `"ten"` بدل `5`، الدالة `int()` مش هتقدر تحوّل الحروف لرقم وهيظهر خطأ اسمه `ValueError`! (هنتعلم في المحطة الخامسة إزاي نحمي البرنامج من الخطأ ده بـ `try / except`).',
          },
        },
      ],
    },
    {
      id: '1.3-c7',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'ماذا يحدث إذا أدخل المستخدم كلمة «عشرة» بدل الرقم 10 عند استخدام دالة `int()`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ١٤',
            options: [
              {
                id: 'a',
                text: 'تُحوّل للرقم 10 تلقائيًا',
                isCorrect: false,
                feedback: 'بايثون لا يترجم الكلمات العربية أو الإنجليزية لأرقام تلقائيًا.',
              },
              {
                id: 'b',
                text: 'يظهر خطأ ValueError',
                isCorrect: true,
                feedback: 'مظبوط! int() ترفض النصوص غير الرقمية وترفع ValueError.',
              },
              {
                id: 'c',
                text: 'تُعطى القيمة 0 للمتغير',
                isCorrect: false,
                feedback: 'لا، يتوقف التنفيذ بخطأ ValueError.',
              },
              {
                id: 'd',
                text: 'يُتجاهل الإدخال ويكمل البرنامج',
                isCorrect: false,
                feedback: 'لا يتجاهل الخطأ بدون معالجة مخصصة.',
              },
            ],
            explanation: 'دالة int() تحول سلاسل الأرقام فقط مثل "10"، وإذا استقبلت حروفًا يحدث ValueError.',
          },
        },
        {
          id: '1.3-q2',
          type: 'quizQuestion',
          data: {
            question: 'في الجملة `if num % 2 == 0:`، ماذا تمثّل العلامة `%` رياضيًا؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ١٤',
            options: [
              { id: 'a', text: 'النسبة المئوية', isCorrect: false, feedback: 'في بايثون % مش معناها نسبة مئوية.' },
              { id: 'b', text: 'القسمة المطولة', isCorrect: false, feedback: 'القسمة بتتكتب / أو //.' },
              { id: 'c', text: 'باقي القسمة', isCorrect: true, feedback: 'صح! % تحسب الباقي بعد قسمة الرقم الأول على التاني.' },
              { id: 'd', text: 'الضرب المتكرر', isCorrect: false, feedback: 'الضرب المتكرر أو الأس بيتكتب **.' },
            ],
            explanation: 'المعامل % يُرجع باقي القسمة الصحيحة (Modulo).',
          },
        },
      ],
    },
    {
      id: '1.3-c8',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '1.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'كتبت وشغّلت أول برامج Python حقيقية! عرفت إن `input()` بتستقبل المدخلات كنص، و`int()` بتحوّله لعدد صحيح (ولو دخلت حروف يظهر `ValueError`)، و`print()` بتعرض المخرجات، و`%` بتجيب باقي القسمة اللي بنكشف بيه الرقم الزوجي والفردي أو القسمة على 5.',
          },
        },
      ],
    },
  ],
  summary:
    'تعاملنا مع دوال الإدخال والإخراج input() و int() و print() ومعامل باقي القسمة % مع تطبيق عملي للزوجي والفردي والقسمة على ٥ وتنبيه ValueError.',
  additionalSources: [
    {
      id: 'nb-1-3-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content:
        'الانتقال من التفكير النظري لكتابة كود Python عملي يعتمد على ٣ عمليات: إدخال وتحويل، معالجة حسابية أو شرطية، ثم طباعة النتيجة.',
      bullets: [
        'input() ترجع نصًا دائمًا، ونستخدم int() لتحويله إلى عدد صحيح.',
        '% ترجع باقي القسمة (مثل 9 % 2 == 1 و 8 % 2 == 0).',
        'print() للعرض على الشاشة وليس للإدخال.',
      ],
    },
    {
      id: 'nb-1-3-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-1-3-1',
          question: 'إيه الفرق بين = و == في بايثون؟',
          answer:
            'علامة = الواحدة بتخزن قيمة جوه متغير (مثل num = 5)، أما == المزدوجة فبتسأل هل الطرفين متساويين (مثل num % 2 == 0) وترجع True أو False.',
        },
        {
          id: 'faq-1-3-2',
          question: 'لو كتبت int("5") هيحصل ValueError؟',
          answer: 'لا! "5" جواها رقم مكتوب كحرف عددي، فبتتحول عادي إلى 5. الخطأ بيحصل مع الحروف غير الرقمية زي "خمسة".',
        },
      ],
    },
    {
      id: 'nb-1-3-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-1-3',
        label: 'أول برنامج Python',
        children: [
          { id: 'mm-1-3-in', label: 'الإدخال: input() + التحويل int()' },
          { id: 'mm-1-3-mod', label: 'باقي القسمة: % (زوجي == 0 / فردي != 0)' },
          { id: 'mm-1-3-out', label: 'الإخراج: print()' },
          { id: 'mm-1-3-err', label: 'تنبيه: ValueError عند إدخال نص' },
        ],
      },
    },
    {
      id: 'nb-1-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'gl-1-3-1',
          termAr: 'عدد صحيح',
          termEn: 'Integer (int)',
          definition: 'رقم صحيح بدون كسور عشرية، نحصل عليه من التحويل بالدالة int().',
        },
        {
          id: 'gl-1-3-2',
          termAr: 'باقي القسمة',
          termEn: 'Modulo (%)',
          definition: 'عملية حسابية تعيد الباقي المتبقي بعد قسمة عددين صحيحين.',
        },
        {
          id: 'gl-1-3-3',
          termAr: 'خطأ قيمة الإدخال',
          termEn: 'ValueError',
          definition: 'خطأ يظهر في Python عند محاولة تحويل نص غير رقمي إلى عدد.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'src-1-3-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي',
      detail: 'المثال التمهيدي (جمع رقمين) + المثال الأول (زوجي أم فردي)',
      pages: 'ص 7–8',
    },
    {
      id: 'src-1-3-nb',
      kind: 'notebooklm',
      label: 'مصادر NotebookLM للدرس ١.٣',
      detail: 'دليل الدوال المدمجة ومعامل باقي القسمة وتنبيه ValueError',
    },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '1.4',
    label: 'الدرس الجاي: القرارات الحسابية والدقة العشرية',
    description: 'هتحسب المتوسط بدقة float، ومساحة المستطيل والمربع، وتقارن بين رقمين بـ if / else.',
  },
};
