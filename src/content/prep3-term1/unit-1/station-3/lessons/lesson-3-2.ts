import type { LessonPack } from '@/types/curriculum';

export const LESSON_3_2: LessonPack = {
  id: '3.2',
  stationId: 'station-3',
  unitId: 'unit-1',
  order: 2,
  title: 'القوائم Lists: الإنشاء والإضافة والحذف والتكرار',
  subtitle: 'احفظ قائمة أسماء أو درجات في متغير واحد وعدّلها بسهولة',
  durationMin: 8,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تعرّف القائمة (List) داخل أقواس مربعة [ ] مع إمكانية تنوّع أنواع بياناتها.',
    'تصل لعناصر القائمة بالفهرس وتضيف عناصر بـ append() وتحذف بـ remove().',
    'تكتشف أخطاء نوع الأقواس وتستخدم الحلقة for للمرور على عناصر القائمة.',
  ],
  cards: [
    {
      id: '3.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '3.2-hero',
          type: 'heroHook',
          data: {
            title: 'القوائم المنظمة Lists في Python',
            durationMin: 8,
            stationLabel: 'المحطة ٣ · الدرس ٢ من ٤',
            goal: 'تنشئ قائمة [ ] وتوصل لعناصرها وتضيف بـ append() وتحذف بـ remove().',
            hook: 'بدل ما تعمل ١٠ متغيرات لـ ١٠ درجات (`g1, g2, g3...`)، القائمة (`List`) بتجمعهم كلهم في متغير واحد مرتب وتقدر تزوّد أو تشيل منه في أي وقت!',
            image: '/media/robot-puzzle.png',
            starterChallenge: {
              prompt: 'عندنا القائمة `nums = [10, 20, 30]`. لما ننفّذ `nums.append(40)`، الرقم `40` هيتحط فين؟',
              options: [
                {
                  id: 'sc-a',
                  text: 'في أول القائمة عند الفهرس [0]',
                  isCorrect: false,
                  feedback: 'append() معناها إلحاق بالنهاية، فبتضيف العنصر الجديد بعد آخر عنصر موجود وليس في البداية.',
                },
                {
                  id: 'sc-b',
                  text: 'في آخر القائمة عند الفهرس [3]',
                  isCorrect: true,
                  feedback: 'مظبوط! append() تضيف دائمًا في نهاية القائمة فتصبح [10, 20, 30, 40].',
                },
                {
                  id: 'sc-c',
                  text: 'يستبدل الرقم 30 ويحل مكانه',
                  isCorrect: false,
                  feedback: 'append() توسّع القائمة بعنصر رابع جديد من غير ما تحذف أو تغيّر العناصر السابقة.',
                },
              ],
              revealNote: 'القائمة تقبل الإضافة والحذف والتعديل في أي وقت طالما اتكتبت بين أقواس مربعة [ ].',
            },
          },
        },
      ],
    },
    {
      id: '3.2-c2',
      title: 'العمليات الأساسية على القوائم',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '3.2-ops-flips',
          type: 'flipCards',
          data: {
            heading: 'إزاي بنبني ونعدّل القوائم (Lists)؟',
            instruction: 'اقلب البطاقات الثلاث لاكتشاف قواعد الإنشاء والتعديل والتكرار على القوائم.',
            cards: [
              {
                id: 'lst-create',
                frontLabel: '١ · الإنشاء',
                frontTitle: 'الأقواس المربعة [ ] وتنوع البيانات',
                frontHint: 'هل ينفع نخلط أرقام مع نصوص؟',
                backTitle: 'قائمة مرنة متعددة الأنواع',
                backBody: 'تُنشأ القائمة داخل [ ] وتقبل أرقامًا ونصوصًا وعشرية ومنطقية في نفس المتغير، وتبدأ فهرستها من 0.',
                code: 'items = [1, "two", 3.0, True]\nprint(items[1])  # two',
              },
              {
                id: 'lst-mod',
                frontLabel: '٢ · التعديل',
                frontTitle: 'append() مقابل remove()',
                frontHint: 'إضافة عنصر أم حذف عنصر؟',
                backTitle: 'إضافة في النهاية وحذف بالقيمة',
                backBody: 'append(x) تضيف عنصرًا في نهاية القائمة، بينما remove(x) تبحث عن القيمة x وتحذفها.',
                code: 'names = ["Ali", "Sara"]\nnames.append("Omar")\nnames.remove("Ali")',
              },
              {
                id: 'lst-loop',
                frontLabel: '٣ · المرور',
                frontTitle: 'التكرار على العناصر بـ for',
                frontHint: 'إزاي نطبع كل عنصر لوحده؟',
                backTitle: 'حلقة for تقرأ عنصرًا تلو الآخر',
                backBody: 'نمر على جميع عناصر القائمة تلقائيًا بدون حاجة لمعرفة طولها مسبقًا.',
                code: 'for n in ["Ali", "Sara"]:\n    print(n)',
              },
            ],
          },
        },
      ],
    },
    {
      id: '3.2-c3',
      title: 'توقّع قبل التشغيل: ماذا يطبع آخر فهرس؟',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '3.2-predict',
          type: 'predictOutput',
          data: {
            title: 'تأثير append() على الفهرس السالب [-1]',
            prompt: 'توقّع ماذا سيطبع الكود التالي بعد إضافة `"Omar"` إلى القائمة:',
            code: 'names = ["Ahmed", "Ali", "Sara"]\nnames.append("Omar")\nprint(names[-1])',
            expectedOutput: 'Omar',
            options: [
              {
                id: 'p1',
                text: 'Sara',
                isCorrect: false,
                feedback: 'Sara كانت آخر عنصر قبل الإضافة، لكن append("Omar") وضعت Omar بعدها فأصبح هو الأخير.',
              },
              {
                id: 'p2',
                text: 'Omar',
                isCorrect: true,
                feedback: 'توقّع ممتاز! append() أضافت "Omar" في النهاية، و [-1] تجلب آخر عنصر دائمًا.',
              },
              {
                id: 'p3',
                text: 'Ahmed',
                isCorrect: false,
                feedback: 'Ahmed في أول القائمة عند الفهرس [0]، بينما [-1] يقرأ من نهاية القائمة.',
              },
              {
                id: 'p4',
                text: '4',
                isCorrect: false,
                feedback: '4 هو عدد العناصر بعد الإضافة (len)، لكن print(names[-1]) تطبع قيمة العنصر الأخير نفسه.',
              },
            ],
            explanation: 'تضيف append() العنصر الجديد في آخر القائمة، ويشير الفهرس السالب [-1] دائمًا إلى آخر عنصر حالي.',
          },
        },
      ],
    },
    {
      id: '3.2-c4',
      title: 'مثال محلول: عمليات القوائم من الكتاب',
      role: 'example',
      blocks: [
        {
          id: '3.2-code',
          type: 'codeView',
          data: {
            title: 'عمليات القوائم من الكتاب (ص ٣٤)',
            code: 'names = ["Ahmed", "Ali", "Sara"]\nprint(names[0])       # Ahmed\nnames.append("Omar")  # إضافة في النهاية\nprint(names)\nnames.remove("Ali")   # حذف عنصر محدد\nprint(names)',
            caption: 'القائمة تبدأ فهرستها أيضًا من 0 مثل السلاسل النصية، وتقبل الإضافة والحذف.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '3.2-c5',
      title: 'خلّي بالك! فخ الأقواس الدائرية مقابل المربعة',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '3.2-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'لماذا رفض البرنامج إضافة "Sara"؟',
            prompt: 'المبرمج حاول ينشئ قائمة أسماء ويضيف ليها `"Sara"` بـ `append()`، لكن البرنامج أظهر خطأ! اضغط على السطر الذي فيه المشكلة:',
            codeLines: [
              'names = ("Ahmed", "Ali")',
              'names.append("Sara")',
              'print(names)',
            ],
            bugLine: 1,
            lineFeedback: {
              2: 'استدعاء append("Sara") صحيح لو كان names قائمة؛ السبب في طريقة إنشاء المتغير بالسطر ١!',
              3: 'أمر الطباعة print(names) سليم تمامًا.',
            },
            fixedLine: 'names = ["Ahmed", "Ali"]',
            fixExplanation: 'الأقواس الدائرية ( ) تنشئ Tuple ثابتة لا تقبل الإضافة؛ لإنشاء قائمة (List) تقبل append() و remove() لازم نستخدم أقواس مربعة [ ].',
          },
        },
      ],
    },
    {
      id: '3.2-c6',
      title: 'نقطة فحص: الفهرسة في القائمة',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '3.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'في القائمة `numbers = [10, 20, 30, 40]`، ما القيمة التي ترجعها `numbers[2]`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤٠',
            options: [
              {
                id: 'a',
                text: '10',
                isCorrect: false,
                feedback: '10 هو العنصر الأول وفهرسه numbers[0] لأن العد يبدأ من صفر.',
              },
              {
                id: 'b',
                text: '20',
                isCorrect: false,
                feedback: '20 هو العنصر الثاني وفهرسه numbers[1].',
              },
              {
                id: 'c',
                text: '30',
                isCorrect: true,
                feedback: 'صح! الفهرس 2 يشير إلى العنصر الثالث وهو 30 (0->10, 1->20, 2->30).',
              },
              {
                id: 'd',
                text: '40',
                isCorrect: false,
                feedback: '40 هو العنصر الرابع وفهرسه numbers[3] أو numbers[-1].',
              },
            ],
            explanation: 'الفهرسة تبدأ من 0: العنصر الأول [0]=10، الثاني [1]=20، الثالث [2]=30.',
          },
        },
      ],
    },
    {
      id: '3.2-c7',
      title: 'المرحلة ٢ · أكمل أمر الإضافة',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.2-fill',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أضف الاسم "Sara" لنهاية القائمة',
            prompt: 'استبدل `___` باسم الدالة الصحيحة لإضافة `"Sara"` لنهاية قائمة `names` وبعدين اطبعها.',
            starterCode: 'names = ["Ahmed", "Ali"]\nnames.___("Sara")\nprint(names)',
            solutionCode: 'names = ["Ahmed", "Ali"]\nnames.append("Sara")\nprint(names)',
            quickChips: ['append', 'remove', 'sort', 'upper'],
            checks: [
              {
                id: 'sara-list',
                label: 'القائمة تحتوي Sara في النهاية',
                stdin: [],
                expectedOutputRegex: "\\['Ahmed', 'Ali', 'Sara'\\]",
                contains: ['Ahmed', 'Ali', 'Sara'],
              },
            ],
            hint: 'نستخدم دالة الإضافة append لإلحاق "Sara" بآخر القائمة.',
            hints: [
              'الهدف: إلحاق الاسم "Sara" بنهاية القائمة دون حذف أي عنصر.',
              'الدالة التي تضيف عنصرًا لنهاية القائمة في Python اسمها append، بينما remove للحذف.',
              'استبدل ___ بكلمة append ليصبح السطر: names.append("Sara").',
            ],
          },
        },
      ],
    },
    {
      id: '3.2-c8',
      title: 'المرحلة ٣ · تحدي قائمة الدرجات',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.2-free',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'المسألة القريبة: قائمة الدرجات',
            prompt: 'لديك قائمة `grades = [70, 80, 90]`. اطبع العنصر الأول، ثم أضف الدرجة `100` باستخدام `append`، ثم اطبع القائمة كاملة.',
            starterCode: 'grades = [70, 80, 90]\n',
            solutionCode: 'grades = [70, 80, 90]\nprint(grades[0])\ngrades.append(100)\nprint(grades)',
            quickChips: [
              'print(grades[0])',
              'grades.append(100)',
              'print(grades)',
            ],
            checks: [
              {
                id: 'gr-chk',
                label: 'طباعة 70 ثم [70, 80, 90, 100]',
                stdin: [],
                expectedOutputRegex: '^70\\n\\[70, 80, 90, 100\\]',
                contains: ['70', '100'],
              },
            ],
            hint: 'اطبع grades[0] أولًا، ثم استدعِ grades.append(100)، ثم print(grades).',
            hints: [
              'الهدف: طباعة الدرجة الأولى (70) ثم تحديث القائمة بإضافة 100 وعرضها كاملة.',
              'أول عنصر يُطبع بالفهرس [0]، والإضافة تكون عبر اسم_القائمة.append(القيمة).',
              'اكتب بالترتيب: print(grades[0]) ثم grades.append(100) ثم print(grades).',
            ],
          },
        },
      ],
    },
    {
      id: '3.2-c9',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '3.2-q2',
          type: 'quizQuestion',
          data: {
            question: 'في القائمة `items = [1, "two", 3.0, True]`، أي خاصية تُظهرها هذه القائمة؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤١',
            options: [
              {
                id: 'a',
                text: 'القائمة يمكن أن تحتوي على أرقام فقط',
                isCorrect: false,
                feedback: 'تلاحظ وجود النص "two" والقيمة المنطقية True بجانب الأرقام.',
              },
              {
                id: 'b',
                text: 'القائمة يمكن أن تحتوي على نصوص فقط',
                isCorrect: false,
                feedback: 'القائمة تضم الرقم الصحيح 1 والعشري 3.0 وليست مقتصرة على النصوص.',
              },
              {
                id: 'c',
                text: 'القائمة يمكن أن تحتوي على أنواع مختلفة من البيانات',
                isCorrect: true,
                feedback: 'بالظبط! تجمع القائمة في Python أرقامًا ونصوصًا وعشرية وقيمًا منطقية معًا.',
              },
              {
                id: 'd',
                text: 'القائمة لا يمكن أن تحتوي على قيم منطقية',
                isCorrect: false,
                feedback: 'القائمة تقبل القيم المنطقية مثل True و False بشكل طبيعي تمامًا.',
              },
            ],
            explanation: 'القائمة في Python مرنة ويمكن أن تجمع أنواع بيانات مختلفة (int, str, float, bool) في وقت واحد.',
          },
        },
      ],
    },
    {
      id: '3.2-c10',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '3.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'القوائم (`Lists`) تُحاط بأقواس مربعة `[ ]` وتقبل أنواع بيانات متنوعة، ونعدل عليها بـ `append()` للإضافة في النهاية و`remove()` للحذف بالقيمة. في الدرس الجاي هنقارن بين السلاسل النصية والقوائم ونشوف إزاي نحوّل النص لقائمة حروف!',
          },
        },
      ],
    },
  ],
  summary: 'تعلمنا القوائم [ ]، الفهرسة، الإضافة بـ append()، الحذف بـ remove()، وتنوع بيانات القائمة.',
  additionalSources: [
    {
      id: 'nb-3-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'القائمة [ ] بنية بيانات مرنة تجمع عناصر متعددة وتبدأ فهرستها من 0 وتقبل الإضافة والحذف.',
      bullets: [
        'تنشأ بأقواس مربعة مثل nums = [10, 20, 30].',
        'append(x) تضيف عنصرًا في نهاية القائمة.',
        'remove(x) تحذف أول ظهور للعنصر x من القائمة.',
        'يمكن أن تضم أرقامًا ونصوصًا وقيمًا منطقية في نفس القائمة.',
      ],
    },
    {
      id: 'nb-3-2-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-3-2-1',
          question: 'إيه الفرق بين append() و remove()؟',
          answer: 'append() بتزود عنصر جديد في آخر القائمة، بينما remove() بتدور على قيمة محددة وتمسحها من القائمة.',
        },
        {
          id: 'faq-3-2-2',
          question: 'هل القائمة لازم تكون كلها أرقام أو كلها نصوص؟',
          answer: 'لا! في Python القائمة مرنة وتقدر تحط جواها أرقام صحيحة وعشرية ونصوص وقيم True/False مع بعض.',
        },
      ],
    },
    {
      id: 'nb-3-2-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-3-2',
        label: 'القوائم (Lists [ ])',
        children: [
          { id: 'mm-3-2-1', label: 'الإنشاء: داخل [ ] وبأنواع متنوعة' },
          { id: 'mm-3-2-2', label: 'الوصول: بالفهرس [0] و [-1]' },
          { id: 'mm-3-2-3', label: 'التعديل: append() للإضافة و remove() للحذف' },
          { id: 'mm-3-2-4', label: 'التكرار: for item in list:' },
        ],
      },
    },
    {
      id: 'nb-3-2-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g32-1', termAr: 'القائمة', termEn: 'List [ ]', definition: 'مجموعة مرتبة وقابلة للتعديل من القيم داخل أقواس مربعة.' },
        { id: 'g32-2', termAr: 'دالة الإضافة', termEn: 'append()', definition: 'دالة تضيف عنصرًا جديدًا في نهاية القائمة.' },
        { id: 'g32-3', termAr: 'دالة الحذف', termEn: 'remove()', definition: 'دالة تحذف عنصرًا محددًا بقيمته من القائمة.' },
      ],
    },
  ],
  sources: [
    { id: 's32-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'القوائم Lists وعملياتها', pages: 'ص 34' },
    { id: 's32-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٣.٢', detail: 'عمليات القوائم والوصول والتكرار' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '3.3',
    label: 'الدرس الجاي: String مقابل List',
    description: 'اعرف الفرق بين Mutable و Immutable والتحويل بـ list(text).',
  },
};
