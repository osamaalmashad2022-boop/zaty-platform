import type { LessonPack } from '@/types/curriculum';

export const LESSON_10_1: LessonPack = {
  id: '10.1',
  stationId: 'station-10',
  unitId: 'unit-3',
  order: 1,
  title: 'مفهوم القاموس (Key-Value): وداعًا للفهارس الرقمية المربكة',
  subtitle: 'بدل ما تحفظ الفهرس 0 و 1، نادِ على بياناتك بأسمائها المعنوية!',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'تعرّف القاموس (Dictionary) كوعاء من أزواج المفاتيح والقيم داخل أقواس معقوفة { }.',
    'تفرّق بين فهرس القائمة الرقمي [0] والمفتاح الدلالي المعنوي [\'name\'].',
    'تصل للقيم المخزنة داخل القاموس باستخدام المفتاح بدقة وبدون أخطاء.',
  ],
  cards: [
    {
      id: '10.1-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '10.1-hero',
          type: 'heroHook',
          data: {
            title: 'القواميس Dictionaries في Python',
            durationMin: 8,
            stationLabel: 'المحطة ١٠ · الدرس ١ من ٣',
            goal: 'تنشئ أول قاموس في بايثون وتصل للبيانات بمفاتيحها الدلالية بدل الأرقام.',
            hook: 'تخيل عندك قائمة بيانات متعلم: [\'Ali\', 15, 98.5]. لو سألتك الرقم 15 ده عمره ولا ترتيبه ولا درجاته؟ هتضطر تخمن! هنا بييجي دور القاموس ليقولك: \'age\': 15 بوضوح تام!',
            starterChallenge: {
              prompt: 'في القاموس `student = {"name": "Sara", "score": 95}`، إزاي نطبع درجة سارة؟',
              options: [
                {
                  id: 'sc-idx',
                  text: 'student[1] — لأن الدرجة هي العنصر الثاني',
                  isCorrect: false,
                  feedback: 'فخ القوائم! القاموس لا يعتمد على الفهارس الرقمية 0 و 1، بل يعتمد على المفتاح المكتوب.',
                },
                {
                  id: 'sc-key',
                  text: 'student["score"] — نستخدم المفتاح المعنوي مباشرة',
                  isCorrect: true,
                  feedback: 'ممتاز! في القاموس ننادي على القيمة باسم مفتاحها student["score"] فيرجع لنا 95 على طول.',
                },
                {
                  id: 'sc-dot',
                  text: 'student.score — زي الدوال',
                  isCorrect: false,
                  feedback: 'استخراج القيم في القاموس بيكون بأقواس مربعة student["score"] مش بنقطة دالة.',
                },
              ],
              revealNote: 'القاعدة الذهبية: القاموس يربط كل قيمة بمفتاح اسمي واضح (Key: Value) داخل أقواس معقوفة { }.',
            },
          },
        },
      ],
    },
    {
      id: '10.1-c2',
      title: 'تشريح القاموس: المفتاح والقيمة',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '10.1-def',
          type: 'richText',
          data: {
            heading: 'ما هو القاموس (Dictionary)؟',
            body: '**القاموس** هو هيكل بيانات قابل للتعديل (`Mutable`) يجمع أزواجًا من **المفاتيح والقيم (`Key: Value`)** بين قوسين معقوفين `{ }`، ويفصل بين كل زوج والآخر بفاصلة `,` وبين المفتاح وقيمته بنقطتين رأسيين `:`.\n\n• **المفتاح (`Key`):** غالبًا نص يميز البيان ويكون فريدًا لا يتكرر.\n• **القيمة (`Value`):** أي نوع من البيانات (نص، رقم، قائمة، أو حتى قاموس آخر).',
          },
        },
        {
          id: '10.1-flips',
          type: 'flipCards',
          data: {
            heading: 'اقلب البطاقات لتعرف عناصر بناء القاموس',
            instruction: 'كل بطاقة توضح قاعدة أساسية في بناء وقراءة القواميس.',
            cards: [
              {
                id: 'fc-braces',
                frontLabel: 'الأقواس',
                frontTitle: 'الأقواس المعقوفة { }',
                frontHint: 'كيف نعلن عن قاموس؟',
                backTitle: 'أقواس القاموس الرسمية',
                backBody: 'تُستخدم الأقواس المعقوفة { } لتعريف القاموس، بينما تُستخدم الأقواس المربعة [ ] عند القراءة والاستخراج بالفهرس أو المفتاح.',
                backExample: 'user = {"id": 101, "role": "admin"}',
              },
              {
                id: 'fc-key',
                frontLabel: 'المفتاح',
                frontTitle: 'المفتاح (Key)',
                frontHint: 'عنوان البيان',
                backTitle: 'اسم الحقل الفريد',
                backBody: 'المفتاح هو الاسم التعريفي للقيمة، ويجب أن يكون فريدًا داخل القاموس وعادة ما يكون نصًا بين علامتي تنصيص.',
                backExample: '"name": "Ahmed"',
              },
              {
                id: 'fc-value',
                frontLabel: 'القيمة',
                frontTitle: 'القيمة (Value)',
                frontHint: 'البيان الفعلي المخزن',
                backTitle: 'المحتوى المتغير',
                backBody: 'القيمة هي البيانات الفعلية المقترنة بالمفتاح، ويمكن أن تكون أي نوع وتتكرر بحرية بين مفاتيح مختلفة.',
                backExample: '"score": 98',
              },
              {
                id: 'fc-access',
                frontLabel: 'الوصول',
                frontTitle: 'استخراج القيمة [Key]',
                frontHint: 'كيف نقرأ البيان؟',
                backTitle: 'القراءة بالمفتاح',
                backBody: 'نكتب اسم القاموس ومعه المفتاح داخل قوسين مربعين مثل dict[key] لنحصل على القيمة المقترنة به فورًا.',
                backExample: 'print(user["role"]) # يطبع admin',
              },
            ],
          },
        },
      ],
    },
    {
      id: '10.1-c3',
      title: 'المقارنة الجوهرية: القائمة مقابل القاموس',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '10.1-tabs',
          type: 'comparisonTabs',
          data: {
            heading: 'الفرق الحاسم بين القائمة (List) والقاموس (Dictionary)',
            instruction: 'استعرض التبويبين لتعرف متى تختار القائمة ومتى تختار القاموس.',
            tabs: [
              {
                id: 'tab-list',
                label: 'القائمة (List)',
                badge: 'فهرسة رقمية مرتبة',
                tone: 'coral',
                body: 'تخزن العناصر بترتيب تسلسلي صارم وتعتمد في الوصول على أرقام الفهارس (0, 1, 2...).',
                bullets: [
                  'تُعرّف بأقواس مربعة: `[item1, item2]`',
                  'الوصول برقم الخانة: `items[0]`',
                  'ممتازة لمجموعات العناصر المتشابهة (قائمة أسماء، درجات، ألوان).',
                  'عيبها: الأرقام لا تشرح معنى البيان.',
                ],
                code: 'person_list = ["Hassan", 16, "Cairo"]\n# شخص يسأل: هو 16 ده عمره ولا رقم جلوسه؟',
              },
              {
                id: 'tab-dict',
                label: 'القاموس (Dictionary)',
                badge: 'مفاتيح دلالية واضحة',
                tone: 'emerald',
                body: 'يخزن البيانات كأزواج دلالية (مفتاح: قيمة)، فلا تحتاج لحفظ أرقام الخانات بل تنادي على البيان باسمه.',
                bullets: [
                  'يُعرّف بأقواس معقوفة: `{"key": "value"}`',
                  'الوصول بالمفتاح الدلالي: `person["age"]`',
                  'ممتاز لبيانات الكيانات المركبة (ملف متعلم، بيانات حساب، منتج في متجر).',
                  'ميزته: الكود يفسر نفسه بنفسه وواضح للجميع.',
                ],
                code: 'person_dict = {"name": "Hassan", "age": 16, "city": "Cairo"}\nprint(person_dict["age"])  # 16 بكل وضوح!',
              },
            ],
          },
        },
      ],
    },
    {
      id: '10.1-c4',
      title: 'توقّع قبل التشغيل (PRIMM)',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '10.1-predict',
          type: 'predictOutput',
          data: {
            title: 'استخراج عناصر بطاقة سيارة',
            prompt: 'اقرأ كود القاموس التالي وتوقّع ماذا سيطبع البرنامج بالضبط على الشاشة:',
            code: 'car = {\n    "brand": "Toyota",\n    "year": 2024,\n    "electric": False\n}\n\nprint(car["brand"], car["year"])',
            expectedOutput: 'Toyota 2024',
            options: [
              {
                id: 'p1',
                text: 'Toyota 2024',
                isCorrect: true,
                feedback: 'صحيح! car["brand"] رجّع Toyota و car["year"] رجّع 2024 وانطبعوا بجانب بعض بفاصل مسافة.',
              },
              {
                id: 'p2',
                text: 'brand year',
                isCorrect: false,
                feedback: 'طلبنا القيم car["brand"] مش المفاتيح نفسها كنصوص؛ الأقواس المربعة تجلب المحتوى.',
              },
              {
                id: 'p3',
                text: '0 1',
                isCorrect: false,
                feedback: 'القاموس لا يطبع فهارس رقمية، بل يرجع القيم المخزنة المقترنة بالمفاتيح.',
              },
              {
                id: 'p4',
                text: 'خطأ SyntaxError',
                isCorrect: false,
                feedback: 'تعريف القاموس بالأقواس المعقوفة والفواصل والنقطتين صحيح 100% وخالٍ من الأخطاء.',
              },
            ],
            explanation: 'في بايثون، استدعاء dict[key] يستخرج القيمة المخزنة وراء هذا المفتاح مباشرة.',
          },
        },
      ],
    },
    {
      id: '10.1-c5',
      title: 'خلّي بالك! فخ المفتاح المفقود',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '10.1-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'فخ الامتحان: طلب مفتاح غير موجود يسبب KeyError!',
            body: '• لو طلبت مفتاح مش موجود جوه القاموس بالأقواس المربعة، البرنامج هينهار فورًا بخطأ وقت التشغيل `KeyError`!\n• مثال: `profile = {"name": "Mona"}` لو كتبت `profile["age"]` هيطلع `KeyError: \'age\'` لأن المفتاح مش موجود أصلاً.',
          },
        },
        {
          id: '10.1-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد خطأ KeyError',
            prompt: 'الكود ده بيحاول يطبع سعر الكتاب بس انهار بـ KeyError! اضغط على السطر الذي سبّب الخطأ:',
            codeLines: [
              'book = {"title": "Python 101", "pages": 150}',
              'print("Title:", book["title"])',
              'print("Price:", book["price"])',
            ],
            bugLine: 3,
            lineFeedback: {
              1: 'تعريف القاموس book سليم ويحتوي على مفتاحين: title و pages.',
              2: 'قراءة book["title"] سليمة لأن المفتاح title موجود.',
              3: 'المفتاح price غير معرف داخل القاموس book مما يسبب انهيار البرنامج فورًا بخطأ KeyError!',
            },
            fixedLine: 'print("Pages:", book["pages"])',
            fixExplanation: 'القاموس يحتوي على pages وليس price؛ عند استخدام الأقواس المربعة يجب التأكد من تطابق اسم المفتاح تمامًا.',
          },
        },
      ],
    },
    {
      id: '10.1-c6',
      title: 'جرّب بنفسك: أنشئ بطاقة لاعب',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '10.1-codelab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل بناء قاموس بطاقة اللاعب',
            prompt: 'أكمل مكان `___` لإنشاء قاموس يحمل المفتاح `"level"` بقيمة `5`، ثم اطبع مستواه على الشاشة.',
            starterCode: 'player = {"name": "Rami", ___: 5}\nprint("Player level:", player["level"])',
            solutionCode: 'player = {"name": "Rami", "level": 5}\nprint("Player level:", player["level"])',
            quickChips: ['"level"', 'level', '"score"', '5'],
            checks: [
              {
                id: 'chk-level',
                label: 'طباعة مستوى اللاعب 5',
                stdin: [],
                expectedOutputRegex: 'Player level: 5',
              },
            ],
            hint: 'المفتاح في القاموس يوضع كنص بين علامتي تنصيص: "level".',
            hints: [
              'الهدف: إضافة المفتاح "level" إلى القاموس player ليقترن بالقيمة 5.',
              'تذكر أن المفاتيح النصية تحتاج علامتي تنصيص مثل "name".',
              'استبدل ___ بالكلمة "level".',
            ],
          },
        },
      ],
    },
    {
      id: '10.1-c7',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '10.1-q1',
          type: 'quizQuestion',
          data: {
            question: 'أي الأكواد التالية ينشئ قاموسًا صحيحًا يحمل اسم المتعلم ودرجته في بايثون؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥–٨',
            options: [
              {
                id: 'a',
                text: 'student = {"name": "Omar", "grade": 90}',
                isCorrect: true,
                feedback: 'إجابة نموذجية! أقواس معقوفة { } ونقطتان رأسيتان بين المفتاح والقيمة وفاصلة بين الأزواج.',
              },
              {
                id: 'b',
                text: 'student = ["name": "Omar", "grade": 90]',
                isCorrect: false,
                feedback: 'الأقواس المربعة [ ] مخصصة للقوائم ولا تقبل النقطتين الرأسيتين للربط.',
              },
              {
                id: 'c',
                text: 'student = ("name" = "Omar", "grade" = 90)',
                isCorrect: false,
                feedback: 'علامة = تستخدم لتخصيص المتغيرات وليس للفصل بين المفتاح والقيمة داخل القاموس.',
              },
              {
                id: 'd',
                text: 'student = {"name", "Omar", "grade", 90}',
                isCorrect: false,
                feedback: 'غياب النقطتين الرأسيتين : يجعل هذا كائن مجموعة (Set) وليس قاموسًا من أزواج المفاتيح والقيم.',
              },
            ],
            explanation: 'القاموس في Python يتكون من أقواس معقوفة { } ومفاتيح مفصولة عن قيمها بنقطتين : وتفصل الأزواج فواصل ,.',
          },
        },
      ],
    },
    {
      id: '10.1-c8',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '10.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: '**القاموس (`Dictionary`)** هو هيكل بيانات متطور يجمع أزواجًا من `Key: Value` داخل `{}`، يتيح لك استدعاء أي بيان باسمه الدلالي `dict[key]` بدل الفهارس الرقمية المرهقة للقوائم. وفي الدرس القادم هنتعلم إزاي نقرأ البيانات بأمان تام ونضيف ونعدل عناصر جديدة!',
          },
        },
      ],
    },
  ],
  summary: 'مفهوم القاموس في Python والفرق بين الفهرسة الرقمية والمفاتيح المعنوية وقواعد استخراج القيم.',
  additionalSources: [
    {
      id: 'nb-10-1-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'القاموس يربط كل قيمة بمفتاح اسمي مميز لسهولة وسرعة الوصول الدلالي.',
      bullets: [
        'أقواس القاموس معقوفة { } وتفصل النقطتان : بين المفتاح وقيمته.',
        'الوصول يتم بالمفتاح: dict["key"].',
        'طلب مفتاح غير موجود يسبب خطأ وقت التشغيل KeyError.',
      ],
    },
    {
      id: 'nb-10-1-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-10-1-1',
          question: 'هل يمكن تكرار المفاتيح داخل القاموس الواحد؟',
          answer: 'لا! كل مفتاح يجب أن يكون فريدًا، وتكرار المفتاح يستبدل قيمته القديمة بالقيمة الجديدة.',
        },
        {
          id: 'faq-10-1-2',
          question: 'إيه الفرق بين القاموس والقائمة في الذاكرة؟',
          answer: 'القائمة ترتب العناصر حسب تسلسل الخانات 0, 1, 2... بينما القاموس يعتمد على جدول بحث سريع يربط المفتاح بالقيمة مباشرة.',
        },
      ],
    },
    {
      id: 'nb-10-1-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-10-1',
        label: 'القاموس Dictionary',
        children: [
          { id: 'mm-10-1-braces', label: 'الأقواس المعقوفة { }' },
          { id: 'mm-10-1-pair', label: 'زوج: المفتاح : القيمة' },
          { id: 'mm-10-1-access', label: 'الوصول: dict[key]' },
          { id: 'mm-10-1-error', label: 'التحذير: تجنب KeyError' },
        ],
      },
    },
    {
      id: 'nb-10-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'g101-1',
          termAr: 'القاموس',
          termEn: 'Dictionary',
          definition: 'هيكل بيانات مرن يربط المفاتيح بالقيم داخل أقواس معقوفة.',
        },
        {
          id: 'g101-2',
          termAr: 'المفتاح',
          termEn: 'Key',
          definition: 'المعرف الفريد الذي نستخدمه للوصول إلى القيمة المقابلة له.',
        },
        {
          id: 'g101-3',
          termAr: 'خطأ المفتاح',
          termEn: 'KeyError',
          definition: 'خطأ تشغيل يظهر عند محاولة طلب مفتاح غير موجود داخل القاموس.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 's101-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — تكنولوجيا المعلومات للصف الثالث الإعدادي',
      detail: 'الوحدة الثالثة: القواميس وهياكل البيانات',
      pages: 'ص 4–10',
    },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '10.2',
    label: 'الدرس الجاي: القراءة الآمنة بـ get() والتعديل والإضافة',
    description: 'تعلّم كيف تضيف وتعدل عناصر القاموس وتتجنب KeyError تمامًا.',
  },
};
