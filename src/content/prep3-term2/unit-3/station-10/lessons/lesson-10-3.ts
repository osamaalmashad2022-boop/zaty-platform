import type { LessonPack } from '@/types/curriculum';

export const LESSON_10_3: LessonPack = {
  id: '10.3',
  stationId: 'station-10',
  unitId: 'unit-3',
  order: 3,
  title: 'دوال فحص القاموس وحلقات التكرار ومشروع سجل الدرجات',
  subtitle: 'استخرج المفاتيح والقيم معًا في حلقة واحدة ونفّذ مشروع سجل المتعلمين الذكي',
  durationMin: 9,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'تستخدم الدوال المنهجية الثلاث: keys() و values() و items() لفحص محتويات القاموس.',
    'تكرر على القاموس بحلقة for لاستخراج كل زوج (مفتاح وقيمة) معًا.',
    'تبني مشروعًا برمجيًا متكاملاً لحساب مجموع ومتوسط درجات المواد وفلترة التقديرات.',
  ],
  cards: [
    {
      id: '10.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '10.3-hero',
          type: 'heroHook',
          data: {
            title: 'دوال القاموس ومشروع السجل الرقمي',
            durationMin: 9,
            stationLabel: 'المحطة ١٠ · الدرس ٣ من ٣',
            goal: 'تتقن استخدام keys() و values() و items() وتبني مشروع حساب معدل المتعلم.',
            hook: 'تخيل عندك قاموس فيه درجات 10 مواد دراسية! هل هتكتب كود يجمع كل مادة باسمها يدويًا؟ أكيد لأ! حلقة for مع دالة سحرية واحدة هتحسب لك المجموع والمتوسط وتطبع النتيجة في غمضة عين!',
            starterChallenge: {
              prompt: 'في القاموس `scores = {"math": 90, "eng": 80}`، ما الذي تُرجعه الدالة `scores.keys()`؟',
              options: [
                {
                  id: 'sc-k',
                  text: 'قائمة بالمفاتيح فقط: ["math", "eng"]',
                  isCorrect: true,
                  feedback: 'صح تمامًا! دالة keys() تستخلص المفاتيح كلها وتجمعها في قائمة للمرور عليها.',
                },
                {
                  id: 'sc-v',
                  text: 'قائمة بالأرقام والدرجات: [90, 80]',
                  isCorrect: false,
                  feedback: 'الدرجات هي القيم (Values)، وتُستخرج بدالة values() وليس keys().',
                },
                {
                  id: 'sc-all',
                  text: 'تطبع القاموس كاملًا على الشاشة',
                  isCorrect: false,
                  feedback: 'الدالة تُرجع كائنًا بالمفاتيح فقط ولا تطبع القاموس بأكمله.',
                },
              ],
              revealNote: 'القاعدة الذهبية: keys() للمفاتيح، values() للقيم، و items() للاثنين معًا!',
            },
          },
        },
      ],
    },
    {
      id: '10.3-c2',
      title: 'الثلاثي المرح: keys() و values() و items()',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '10.3-video',
          type: 'mediaPlayer',
          data: {
            kind: 'video',
            title: 'فيديو وايت بورد (٧٨ ثانية): الثلاثي المرح keys() و values() و items() ومشروع السجل الرقمي',
            src: '/media/video-10-3.mp4',
            vttSrc: '/media/caption-10-3.vtt',
            durationSec: 78,
            transcript:
              'لو عندك قاموس فيه درجات 10 مواد دراسية، هتقعد تكتب كود يجمع كل مادة باسمها يدويًا؟! أكيد لأ يا صاحبي!\n' +
              'بايثون بتديك 3 دوال سحرية: keys() بتجيب لك أسماء المواد بس، و values() بتجيب لك الدرجات والأرقام بس عشان تجمعها بـ sum().\n' +
              'أما البطلة الحقيقية فهي دالة items()! بتطلعلك المفتاح وقيمته مع بعض في حلقة for واحدة!\n' +
              'تقدر تطبع تقرير كامل، تحسب المجموع، وتجيب المتوسط بقسمة المجموع على عدد المواد len()!\n' +
              'وبعدها بشروط if/else بسيطة بتحدد تقدير المتعلم؛ كود ذكي ومنظم يشتغل على أي عدد من المواد!',
          },
        },
        {
          id: '10.3-methods-flips',
          type: 'flipCards',
          data: {
            heading: 'دوال استخراج المحتويات في بايثون',
            instruction: 'اقلب البطاقات لتتعرف على وظيفة كل دالة وكيفية استخدامها في الحلقات.',
            cards: [
              {
                id: 'fc-keys',
                frontLabel: 'الدالة ١',
                frontTitle: 'dict.keys()',
                frontHint: 'ماذا تستخرج؟',
                backTitle: 'استخراج كافة المفاتيح',
                backBody: 'تُرجع كائنًا يحتوي على جميع مفاتيح القاموس فقط دون قيمها، وممتازة لمعرفة أسماء الحقول أو البحث فيها.',
                backExample: 'for subject in scores.keys(): print(subject)',
              },
              {
                id: 'fc-values',
                frontLabel: 'الدالة ٢',
                frontTitle: 'dict.values()',
                frontHint: 'ماذا تستخرج؟',
                backTitle: 'استخراج كافة القيم',
                backBody: 'تُرجع كائنًا يحتوي على جميع القيم فقط دون مفاتيحها، وهي الأنسب لحساب المجموع والمتوسط أو أعلى درجة.',
                backExample: 'total = sum(scores.values())',
              },
              {
                id: 'fc-items',
                frontLabel: 'الدالة ٣',
                frontTitle: 'dict.items()',
                frontHint: 'الأقوى والأشمل!',
                backTitle: 'استخراج الأزواج (Key, Value)',
                backBody: 'تُرجع كائنًا يحتوي على أزواج (المفتاح، القيمة) معًا، وتسمح بفك الحزمة في حلقة for بمتغيرين اثنين!',
                backExample: 'for sub, deg in scores.items(): print(sub, "=", deg)',
              },
              {
                id: 'fc-len',
                frontLabel: 'الدالة ٤',
                frontTitle: 'len(dict)',
                frontHint: 'كم عدد العناصر؟',
                backTitle: 'حساب عدد الأزواج',
                backBody: 'دالة len(dict) تُرجع عدد أزواج المفاتيح والقيم الموجودة داخل القاموس، وتفيد في حساب المتوسط.',
                backExample: 'count = len(scores) # عدد المواد',
              },
            ],
          },
        },
      ],
    },
    {
      id: '10.3-c3',
      title: 'مثال محلول: المرور على القاموس بحلقة for',
      role: 'example',
      blocks: [
        {
          id: '10.3-loop-code',
          type: 'codeView',
          data: {
            title: 'فك الحزمة الثنائي باستخدام items()',
            code: 'grades = {\n    "Arabic": 95,\n    "English": 90,\n    "Math": 100,\n    "Science": 85\n}\n\n# طباعة شهادة درجات منسقة\nprint("--- شهادة الدرجات ---")\nfor subject, score in grades.items():\n    print(f"{subject}: {score} درجة")\n\n# حساب المجموع والمتوسط\ntotal = sum(grades.values())\naverage = total / len(grades)\nprint(f"المجموع: {total} | المتوسط: {average:.1f}")',
            caption: 'دالة items() تعطينا في كل لفة اسم المادة subject ودرجتها score معًا بكل أناقة!',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '10.3-c4',
      title: 'توقّع قبل التشغيل (PRIMM)',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '10.3-predict',
          type: 'predictOutput',
          data: {
            title: 'فلترة المواد المتميزة',
            prompt: 'تتبع الكود التالي: كم مادة سيطبعها البرنامج عندما نفحص الشرط `score >= 90`؟',
            code: 'scores = {"Math": 95, "Art": 70, "Science": 92, "History": 88}\n\nfor sub, val in scores.items():\n    if val >= 90:\n        print(sub)',
            expectedOutput: 'Math\nScience',
            options: [
              {
                id: 'p1',
                text: 'Math\nScience',
                isCorrect: true,
                feedback: 'توقّع ممتاز! Math درجتها 95 و Science درجتها 92 وكلاهما >= 90، بينما تم استبعاد Art و History.',
              },
              {
                id: 'p2',
                text: 'Math 95\nScience 92',
                isCorrect: false,
                feedback: 'أمر الطباعة هو print(sub) فقط، لذلك يطبع اسم المادة دون رقم درجتها.',
              },
              {
                id: 'p3',
                text: 'يطبع جميع المواد الأربعة',
                isCorrect: false,
                feedback: 'جملة الشرط if val >= 90 فلترت المواد ولم تسمح إلا لمن حقق الشرط.',
              },
              {
                id: 'p4',
                text: 'Math فقط',
                isCorrect: false,
                feedback: 'لا تنسَ مادة Science التي حصلت على 92 وهي أكبر من أو تساوي 90 أيضًا.',
              },
            ],
            explanation: 'حلقة for مع items() تتيح فحص كل قيمة واستخدام المفتاح المقابل لها في اتخاذ القرارات والطباعة.',
          },
        },
      ],
    },
    {
      id: '10.3-c5',
      title: 'خلّي بالك! فخ التكرار على القاموس مباشرة',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '10.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'فخ شائع: التكرار بـ for x in dict يرجع المفاتيح فقط!',
            body: '• لو كتبت `for x in my_dict:` بدون تحديد، المتغير `x` هياخد **المفاتيح** بس مش القيم!\n• لو محتاج القيم: استخدم `my_dict.values()`، ولو محتاج الاثنين معًا: استخدم `my_dict.items()`.',
          },
        },
        {
          id: '10.3-spotbug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد خطأ حساب مجموع التبرعات',
            prompt: 'الكود ده كان المفروض يجمع مبالغ التبرعات لكنه جمع نصوص أو انهار! اضغط على السطر الذي سبّب الخطأ:',
            codeLines: [
              'donations = {"Ahmed": 50, "Mona": 100, "Ali": 75}',
              'total = 0',
              'for item in donations:',
              '    total = total + item',
              'print("Total:", total)',
            ],
            bugLine: 4,
            lineFeedback: {
              1: 'تعريف القاموس donations سليم.',
              2: 'تهيئة المتغير التراكمي total = 0 سليم.',
              3: 'حلقة for item in donations تأخذ أسماء الأشخاص ("Ahmed", "Mona") كنصوص!',
              4: 'محاولة جمع رقم مع نص total + "Ahmed" تسبب TypeError لأن item يحمل المفتاح وليس القيمة!',
              5: 'أمر الطباعة يعتمد على ناتج الجمع.',
            },
            fixedLine: 'for item in donations.values():\n    total = total + item',
            fixExplanation: 'لحساب المجموع يجب التكرار على donations.values() أو كتابة donations[item] لقراءة المبلغ الرقمي.',
          },
        },
      ],
    },
    {
      id: '10.3-c6',
      title: 'جرّب بنفسك: مشروع حساب متوسط درجات المتعلم',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '10.3-codelab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'مشروع حاسبة المعدل الذكية',
            prompt: 'اكتب كود يحسب مجموع الدرجات من القاموس `scores` باستخدام دالة `values()`، ثم احسب المتوسط واطبعه.',
            starterCode: 'scores = {"Arabic": 40, "Math": 60, "English": 50}\n\n# ١. احسب المجموع بـ sum(scores.values())\ntotal = ___\n\n# ٢. احسب المتوسط بالقسمة على عدد المواد len(scores)\navg = total / len(scores)\n\nprint("Total:", total, "- Average:", avg)',
            solutionCode: 'scores = {"Arabic": 40, "Math": 60, "English": 50}\ntotal = sum(scores.values())\navg = total / len(scores)\nprint("Total:", total, "- Average:", avg)',
            checks: [
              {
                id: 'chk-avg',
                label: 'Total: 150 - Average: 50.0',
                stdin: [],
                expectedOutputRegex: 'Total: 150 - Average: 50',
              },
            ],
            quickChips: ['sum(scores.values())', 'scores.values()', 'len(scores)'],
            hint: 'استبدل ___ بالعبارة sum(scores.values()) لحساب مجموع كافة الدرجات الرقمية.',
            hints: [
              'الهدف: حساب مجموع القيم الرقمية المخزنة داخل القاموس.',
              'دالة scores.values() تُرجع أرقام الدرجات: [40, 60, 50].',
              'دالة sum(...) تقوم بجمع هذه الأرقام معًا ليصبح المجموع 150.',
            ],
          },
        },
      ],
    },
    {
      id: '10.3-c7',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '10.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'إذا أردت طباعة كل مفتاح وبجواره قيمته في سطر واحد داخل حلقة `for`، ما الطريقة المثلى لكتابة الحلقة؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ١٥–١٨',
            options: [
              {
                id: 'a',
                text: 'for key, value in my_dict.items():',
                isCorrect: true,
                feedback: 'إجابة نموذجية! items() هي الطريقة القياسية المعتمدة لاستخراج المفتاح والقيمة معًا في متغيرين منفصلين.',
              },
              {
                id: 'b',
                text: 'for key, value in my_dict.keys():',
                isCorrect: false,
                feedback: 'دالة keys() ترجع المفاتيح فقط ولا يمكن فك حزمتها لمتغيرين اثنين وتسبب ValueError.',
              },
              {
                id: 'c',
                text: 'for key, value in my_dict.values():',
                isCorrect: false,
                feedback: 'دالة values() ترجع القيم فقط ولا يمكن فك حزمتها لمتغيرين اثنين.',
              },
              {
                id: 'd',
                text: 'for key, value in len(my_dict):',
                isCorrect: false,
                feedback: 'دالة len ترجع رقمًا صحيحًا واحدًا (عدد العناصر) ولا يمكن التكرار عليه مباشرة بمتغيرين.',
              },
            ],
            explanation: 'دالة dict.items() تُرجع كلاً من المفتاح والقيمة معًا كزوج يمكن استقباله بـ for k, v in dict.items().',
          },
        },
      ],
    },
    {
      id: '10.3-c8',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '10.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'أتقنا استخدام دوال القاموس الثلاث: `keys()` لاستخراج المفاتيح، و `values()` للقيم الرقمية والنصية، و `items()` لفك الحزمة الزوجية `(key, value)` داخل حلقة `for`، وطبقنا مشروع سجل درجات وحساب المتوسط. مبروك! أتقنت المحطة العاشرة وأولى محطات الترم الثاني بنجاح!',
          },
        },
      ],
    },
  ],
  summary: 'دوال فحص القاموس keys() و values() و items() والتكرار بحلقة for وبناء مشروع سجل درجات المتعلمين.',
  additionalSources: [
    {
      id: 'nb-10-3-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'دوال القاموس الأساسية وحلقات التكرار.',
      bullets: [
        'dict.keys(): تستخلص كافة المفاتيح.',
        'dict.values(): تستخلص كافة القيم.',
        'dict.items(): تفك الحزمة إلى (مفتاح، قيمة) معًا.',
        'len(dict): تحسب عدد الأزواج المسجلة.',
      ],
    },
    {
      id: 'nb-10-3-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-10-3-1',
          question: 'ليه بيفضل استخدام sum(dict.values()) بدل جمع المفاتيح؟',
          answer: 'لأن المفاتيح نصوص ولا تقبل الجمع الرياضي، بينما القيم هي الأرقام التي يمكن حساب مجموعها ومتوسطها.',
        },
        {
          id: 'faq-10-3-2',
          question: 'هل ترتيب العناصر في القاموس يضمن بقاء نفس الترتيب أثناء الدوران؟',
          answer: 'نعم، في إصدارات بايثون الحديثة (3.7+) يحتفظ القاموس بترتيب إدخال العناصر.',
        },
      ],
    },
    {
      id: 'nb-10-3-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-10-3',
        label: 'دوال القاموس التكرارية',
        children: [
          { id: 'mm-10-3-k', label: 'keys(): المفاتيح فقط' },
          { id: 'mm-10-3-v', label: 'values(): القيم والمجموع' },
          { id: 'mm-10-3-i', label: 'items(): الأزواج (k, v)' },
          { id: 'mm-10-3-proj', label: 'مشروع: سجل الدرجات' },
        ],
      },
    },
    {
      id: 'nb-10-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'g103-1',
          termAr: 'دالة items()',
          termEn: 'dict.items()',
          definition: 'دالة تُرجع أزواج المفاتيح والقيم معًا لتمكين فك الحزمة الثنائي في الحلقات.',
        },
        {
          id: 'g103-2',
          termAr: 'دالة values()',
          termEn: 'dict.values()',
          definition: 'دالة تُرجع جميع القيم المخزنة في القاموس لاستخدامها في الحسابات أو المعالجة.',
        },
        {
          id: 'g103-3',
          termAr: 'دالة keys()',
          termEn: 'dict.keys()',
          definition: 'دالة تُرجع جميع المفاتيح التعريفية للقاموس دون قيمها المقابلة.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 's103-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — تكنولوجيا المعلومات للصف الثالث الإعدادي',
      detail: 'الوحدة الثالثة: دوال التكرار ومشروع السجل الرقمي',
      pages: 'ص 15–18',
    },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-10',
    label: 'ابدأ اختبار المحطة العاشرة',
    description: 'اختبر فهمك للقواميس والمفاتيح والقيم ودوالها (٢٥ سؤالاً منهجياً).',
  },
};
