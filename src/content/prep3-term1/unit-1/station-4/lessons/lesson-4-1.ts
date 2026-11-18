import type { LessonPack } from '@/types/curriculum';

export const LESSON_4_1: LessonPack = {
  id: '4.1',
  stationId: 'station-4',
  unitId: 'unit-1',
  order: 1,
  title: 'تعريف الدالة واستدعاؤها بالمعاملات (def & Parameters)',
  subtitle: 'اكتب الكود مرة واحدة وناديه في أي وقت بقيم مختلفة',
  durationMin: 8,
  contentVersion: 3,
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
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-hero',
          type: 'heroHook',
          data: {
            title: 'الدوال ذات المعاملات في Python',
            durationMin: 8,
            stationLabel: 'المحطة ٤ · الدرس ١ من ٣',
            image: '/media/robot-puzzle.png',
            goal: 'تعرّف دالة بـ def وتمرر لها قيم عند استدعائها بدون تكرار الكود.',
            hook: 'زي زرار في الآلة الحاسبة: بتدوس عليه فيقوم بمهمة جاهزة! في البرمجة اسمها الدالة (`Function`) — بتكتبها مرة واحدة وتناديها مية مرة بأرقام مختلفة.',
            starterChallenge: {
              prompt:
                'لو كتبنا `def hi():` وتحتها `print("Hi")`، بس نسينا نكتب `hi()` في آخر البرنامج — هيطبع إيه؟',
              options: [
                {
                  id: 'sc-hi',
                  text: 'Hi',
                  isCorrect: false,
                  feedback:
                    'كلمة `def` بتجهّز الدالة في الذاكرة بس، ومش بتنفذ السطور اللي جواها من غير استدعاء صريح.',
                },
                {
                  id: 'sc-empty',
                  text: 'ولا حاجة (شاشة فاضية)',
                  isCorrect: true,
                  feedback:
                    'توقع سليم! الدالة بتتخزن في الذاكرة عند `def` ومش بتشتغل فعليًا غير لما تناديها باسمها `hi()`.',
                },
                {
                  id: 'sc-err',
                  text: 'خطأ NameError',
                  isCorrect: false,
                  feedback:
                    'الكود صحيح نحويًا ومش هيطلع خطأ، لكنه هيفضل ساكت لحد ما تكتب `hi()`.',
                },
              ],
              revealNote:
                'القاعدة الذهبية في الدوال: التعريف (`def`) يجهّز الوصفة، والاستدعاء (`name()`) هو اللي بيشغّلها!',
            },
          },
        },
      ],
    },
    {
      id: '4.1-c2',
      title: 'الفرق الحاسم: Parameters مقابل Arguments',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-tabs',
          type: 'comparisonTabs',
          data: {
            heading: 'الدالة (Function): التعريف مقابل الاستدعاء',
            instruction: 'اضغط على التبويبين لتقارن بين دور الأسماء في التعريف والقيم عند الاستدعاء.',
            tabs: [
              {
                id: 'parameters',
                label: 'المعاملات (Parameters)',
                badge: 'وقت التعريف',
                tone: 'emerald',
                body: 'أسماء المتغيرات الرمزية المكتوبة بين القوسين بجانب `def`؛ وظيفتها استقبال المدخلات المتغيرة عند استدعاء الدالة لاحقًا.',
                bullets: [
                  'تُكتب مرة واحدة في سطر تعريف الدالة',
                  'تعمل كمتغيرات محلية داخل جسم الدالة فقط',
                  'في المثال: `a` و `b` هما المعاملان',
                ],
                code: 'def add_numbers(a, b):\n    print(a + b)',
              },
              {
                id: 'arguments',
                label: 'الوسائط (Arguments)',
                badge: 'وقت الاستدعاء',
                tone: 'neutral',
                body: 'القيم الفعلية (أرقام أو نصوص) التي نمررها للدالة داخل الأقواس لحظة تشغيلها، وتدخل بالترتيب في المعاملات.',
                bullets: [
                  'تتغير مع كل استدعاء جديد لنفس الدالة',
                  'يجب أن يطابق عددها عدد المعاملات المطلوبة',
                  'في المثال: `3, 5` ثم `10, 20` هي الوسائط',
                ],
                code: 'add_numbers(3, 5)    # يطبع 8\nadd_numbers(10, 20)  # يطبع 30',
              },
            ],
          },
        },
      ],
    },
    {
      id: '4.1-c3',
      title: 'تشريح الدالة: وصّل كل جزء بدوره',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-match',
          type: 'matchingPairs',
          data: {
            prompt: 'وصّل كل جزء من كود الدالة بدوره البرمجي الصحيح:',
            pairs: [
              {
                id: 'p-def',
                left: '`def`',
                right: 'كلمة مفتاحية لتعريف دالة جديدة في Python',
              },
              {
                id: 'p-name',
                left: '`add_numbers`',
                right: 'اسم الدالة الذي نستخدمه لاحقًا لاستدعائها',
              },
              {
                id: 'p-params',
                left: '`(a, b)` عند `def`',
                right: 'المعاملات (Parameters) المستقبِلة للمدخلات',
              },
              {
                id: 'p-args',
                left: '`add_numbers(3, 5)`',
                right: 'استدعاء الدالة وتمرير الوسائط الفعلية (Arguments)',
              },
            ],
            feedback: {
              correct:
                'ممتاز! كده فرّقت بوضوح بين كلمة التعريف واسم الدالة، وبين Parameters في التعريف و Arguments عند الاستدعاء.',
              incorrect:
                'تذكّر أن `(a, b)` بجانب `def` هي المعاملات (Parameters)، بينما `add_numbers(3, 5)` بدون `def` هو الاستدعاء بالوسائط (Arguments).',
            },
          },
        },
      ],
    },
    {
      id: '4.1-c4',
      title: 'توقّع قبل التشغيل · متى ينفذ الكود داخل الدالة؟',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-predict',
          type: 'predictOutput',
          data: {
            title: 'رتّب التنفيذ في ذهنك أولًا (PRIMM)',
            prompt: 'اقرأ الكود من أعلى لأسفل وتوقّع ماذا سيطبع عند التشغيل:',
            code: 'def show(x):\n    print(x * 2)\n\nprint("First")\nshow(5)',
            runnable: true,
            expectedOutput: 'First\n10',
            options: [
              {
                id: 'o1',
                text: '10\nFirst',
                isCorrect: false,
                feedback:
                  'الدالة `show` بتتعرّف بس في السطر الأول ومش بتشتغل عند `def`؛ أول أمر طباعة بيتنفذ هو `print("First")`.',
              },
              {
                id: 'o2',
                text: 'First\n10',
                isCorrect: true,
                feedback:
                  'تتبع دقيق! ينفذ Python `print("First")` أولًا، ثم عند `show(5)` يدخل الدالة ويطبع `5 * 2 = 10`.',
              },
              {
                id: 'o3',
                text: 'First\nx * 2',
                isCorrect: false,
                feedback:
                  'السطر `print(x * 2)` مفيهوش علامتي تنصيص، فبيحسب قيمة `5 * 2` ويطبع الرقم `10`.',
              },
              {
                id: 'o4',
                text: 'First',
                isCorrect: false,
                feedback:
                  'السطر الأخير `show(5)` يستدعي الدالة فعليًا، والدالة جواها `print(x * 2)` فتطبع `10` بعدها.',
              },
            ],
            explanation:
              'لا تُنفّذ الأسطر داخل `def` وقت التعريف؛ يبدأ تنفيذها فقط عند سطر الاستدعاء `show(5)`.',
          },
        },
      ],
    },
    {
      id: '4.1-c5',
      title: 'مثال الكتاب + سؤال التحقق في منتصف الدرس',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-ex-code',
          type: 'codeView',
          data: {
            title: 'مثال الكتاب: دالة جمع رقمين (ص ٤٥)',
            code: 'def add_numbers(a, b):\n    result = a + b\n    print(result)\n\nadd_numbers(3, 5)\nadd_numbers(10, 20)',
            caption: 'نفس الدالة اشتغلت مرتين بقيمتين مختلفتين دون إعادة كتابة الجمع والطباعة.',
            runnable: true,
          },
        },
        {
          id: '4.1-q1',
          type: 'quizQuestion',
          data: {
            question: 'في الاستدعاء `add_numbers(3, 5)` من المثال السابق، ما اسم القيمتين `3` و `5`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٠ · تحقق وسط الدرس',
            options: [
              {
                id: 'a',
                text: 'Parameters',
                isCorrect: false,
                feedback:
                  '`Parameters` هي الأسماء الرمزية `(a, b)` في سطر `def`، أما القيم الفعلية عند الاستدعاء فلها اسم آخر.',
              },
              {
                id: 'b',
                text: 'Arguments',
                isCorrect: true,
                feedback:
                  'صحيح! القيم الفعلية `3` و `5` التي نمررها لحظة استدعاء الدالة تُسمى الوسائط (`Arguments`).',
              },
              {
                id: 'c',
                text: 'Keywords',
                isCorrect: false,
                feedback:
                  '`Keywords` هي الكلمات المحجوزة في اللغة مثل `def` و `if`، وليست القيم الممررة للدالة.',
              },
              {
                id: 'd',
                text: 'Outputs',
                isCorrect: false,
                feedback:
                  'القيمتان `3` و `5` مدخلات مرسلة إلى الدالة وقت الاستدعاء، بينما المخرج هو `8`.',
              },
            ],
            explanation:
              'الأسماء داخل قوسي `def` هي Parameters، والقيم الفعلية الممررة عند النداء هي Arguments.',
          },
        },
      ],
    },
    {
      id: '4.1-c6',
      title: 'خلّي بالك! اكتشف الفخ في استدعاء الدالة',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'عدد الوسائط عند الاستدعاء لازم يساوي عدد المعاملات!',
            body: 'لو عرّفت الدالة بمعاملين `def add(a, b):` ونقصت قيمة عند استدعائها، بايثون يوقف البرنامج بخطأ `TypeError`.',
          },
        },
        {
          id: '4.1-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد الخطأ: سبب ظهور TypeError',
            prompt: 'الكود ده بيقف بخطأ `TypeError`! اضغط على السطر اللي فيه الغلطة:',
            codeLines: [
              'def add_numbers(a, b):',
              '    print(a + b)',
              'add_numbers(5)',
            ],
            lineFeedback: {
              1: 'سطر تعريف الدالة بمعاملين `a` و `b` مكتوب صح ومش فيه خطأ؛ شوف استدعيناها بكام قيمة!',
              2: 'سطر الجمع والطباعة بمسافة بادئة سليمة؛ المشكلة في عدد القيم اللي وصلت للدالة.',
            },
            bugLine: 3,
            fixedLine: 'add_numbers(5, 3)',
            fixExplanation:
              'الدالة تطلب معاملين `(a, b)`، لذلك استدعاؤها بقيمة واحدة `add_numbers(5)` يرفع `TypeError` لنقص قيمة `b`؛ يجب تمرير قيمتين.',
          },
        },
      ],
    },
    {
      id: '4.1-c7',
      title: 'المرحلة ١ · أكمل استدعاء دالة الترحيب',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل استدعاء الدالة greet',
            prompt:
              'عرّفنا الدالة `greet(name)`. استبدل `___` باسم الدالة المناسب لاستدعائها بالقيمة `"Ahmed"` حتى تطبع `Hello Ahmed`.',
            starterCode: 'def greet(name):\n    print("Hello", name)\n\n___("Ahmed")',
            solutionCode: 'def greet(name):\n    print("Hello", name)\n\ngreet("Ahmed")',
            checks: [
              { id: 'greet-chk', label: 'طباعة Hello Ahmed', stdin: [], contains: 'Hello Ahmed' },
            ],
            quickChips: ['greet', 'name', 'def greet'],
            hint: 'استبدل ___ باسم الدالة greet من غير def ليصبح السطر greet("Ahmed").',
            hints: [
              'الهدف: استدعاء الدالة المعرفة بالأعلى وتمرير الاسم "Ahmed" إليها.',
              'لاستدعاء دالة جاهزة نكتب اسمها مباشرة قبل الأقواس دون تكرار كلمة def.',
              'استبدل ___ بالكلمة greet فقط ليصبح السطر الأخير greet("Ahmed").',
            ],
          },
        },
      ],
    },
    {
      id: '4.1-c8',
      title: 'المرحلة ٢ · اكتب دالة ضرب رقمين بنفسك',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-mul-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'تحدي مستقل: دالة multiply(a, b)',
            prompt:
              'اكتب دالة اسمها `multiply(a, b)` تطبع حاصل ضرب `a * b`، ثم استدعِها بالقيم `4, 6` لتطبع `24`.',
            starterCode: '# عرّف الدالة multiply(a, b) ثم استدعِها بـ 4 و 6\n',
            solutionCode: 'def multiply(a, b):\n    print(a * b)\n\nmultiply(4, 6)',
            checks: [
              {
                id: 'mul-24',
                label: 'multiply(4, 6) تطبع 24',
                stdin: [],
                expectedOutputRegex: '(^|\\D)24(\\D|$)',
              },
            ],
            quickChips: ['def multiply(a, b):', '    print(a * b)', 'multiply(4, 6)', 'multiply(a, b)'],
            hint: 'اكتب def multiply(a, b): وتحتها بمسافة بادئة print(a * b) ثم خارج الدالة multiply(4, 6).',
            hints: [
              'المهمة من خطوتين: تعريف الدالة بـ def مع الطباعة بداخلها، ثم استدعاؤها خارجيًا.',
              'تذكّر المسافة البادئة (4 مسافات) لسطر print(a * b)، والعودة لأول السطر عند الاستدعاء.',
              'اكتب def multiply(a, b): ثم     print(a * b) وفي السطر الأخير multiply(4, 6).',
            ],
          },
        },
      ],
    },
    {
      id: '4.1-c9',
      title: 'التحقق السريع · نقل الفهم',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '4.1-q2',
          type: 'quizQuestion',
          data: {
            question: 'ما الناتج الفعلي عند تنفيذ الكود التالي؟',
            code: 'def greet_user(name, city):\n    print(name, "from", city)\n\ngreet_user("Cairo", "Nour")',
            multiple: false,
            scored: false,
            sourceTag: 'تطبيق فهم · خارج الكتاب',
            options: [
              {
                id: 'a',
                text: 'Nour from Cairo',
                isCorrect: false,
                feedback:
                  'تذكّر أن الوسائط تدخل المعاملات حسب الترتيب؛ `"Cairo"` كانت الأولى فدخلت في `name` لا `city`.',
              },
              {
                id: 'b',
                text: 'Cairo from Nour',
                isCorrect: true,
                feedback:
                  'دقيق! الوسيط الأول `"Cairo"` ارتبط بالمعامل `name`، والوسيط الثاني `"Nour"` ارتبط بالمعامل `city`.',
              },
              {
                id: 'c',
                text: 'name from city',
                isCorrect: false,
                feedback:
                  'بما أن `name` و `city` بدون علامتي تنصيص داخل `print`، فبايثون يطبع قيمتيهما لا اسميهما.',
              },
              {
                id: 'd',
                text: 'خطأ TypeError',
                isCorrect: false,
                feedback:
                  'عدد الوسائط (٢) يطابق عدد المعاملات (٢)، فالكود يعمل دون خطأ لكنه يعتمد على ترتيب الإدخال.',
              },
            ],
            explanation:
              'عند استدعاء الدالة ترتبط الوسائط بالمعاملات بالترتيب من اليسار لليمين، لذا استقبل `name` القيمة `"Cairo"` و`city` القيمة `"Nour"`.',
          },
        },
      ],
    },
    {
      id: '4.1-c10',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '4.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'الدالة بتتعرّف بـ `def` وتقبل معاملات `Parameters` في التعريف وتستلم قيمًا `Arguments` بالترتيب عند الاستدعاء، وده بيخلي الكود منظم وقابل لإعادة الاستخدام من غير تكرار. في الدرس الجاي هنعرف الفرق الحاسم بين `print` و `return` ونطاق المتغير المحلي!',
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
