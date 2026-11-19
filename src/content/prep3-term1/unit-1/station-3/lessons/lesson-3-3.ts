import type { LessonPack } from '@/types/curriculum';

export const LESSON_3_3: LessonPack = {
  id: '3.3',
  stationId: 'station-3',
  unitId: 'unit-1',
  order: 3,
  title: 'الفروق الجوهرية والتحويل (Mutable vs Immutable)',
  subtitle: 'ليه القائمة بتتعدل والنص لأ؟ وإزاي نحول النص لقائمة حروف بـ list()',
  durationMin: 8,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تقارن بين السلسلة النصية والقائمة من حيث القابلية للتعديل (Immutable vs Mutable) والأقواس.',
    'تحوّل السلسلة النصية إلى قائمة حروف باستخدام الدالة list(text).',
    'تكتشف خطأ تعديل النص مباشرة وتعدّل عنصرًا داخل القائمة عبر فهرسه مثل items[0] = ...',
  ],
  cards: [
    {
      id: '3.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '3.3-hero',
          type: 'heroHook',
          data: {
            title: 'String مقابل List: سر القابلية للتعديل',
            durationMin: 8,
            stationLabel: 'المحطة ٣ · الدرس ٣ من ٤',
            goal: 'تفرّق بين القابل للتعديل (Mutable) وغير القابل للتعديل (Immutable) وتحوّل النص لقائمة.',
            hook: 'لو جربت تغيّر أول حرف في كلمة `"hello"` بأمر `text[0] = "H"`، بايثون هيرفض ويطلع خطأ! لكن في القائمة `letters[0] = "H"` بينفذ فورًا. تعال نعرف ليه!',
            starterChallenge: {
              prompt: 'لو كتبنا `name = "ali"` وحاولنا نكبّر الحرف الأول بالأمر `name[0] = "A"`، بايثون هيتصرف إزاي؟',
              options: [
                {
                  id: 'sc-a',
                  text: 'هيطبع "Ali" عادي لأن [0] بيشاور على أول حرف',
                  isCorrect: false,
                  feedback: 'صحيح إن name[0] تقدر تقرأ أول حرف، لكن التعيين name[0] = "A" مرفوض لأن السلسلة النصية غير قابلة للتعديل.',
                },
                {
                  id: 'sc-b',
                  text: 'هيطلع خطأ TypeError لأن السلسلة النصية Immutable',
                  isCorrect: true,
                  feedback: 'بالظبط! السلاسل النصية ثابتة بعد إنشائها (Immutable)؛ لو عايز تعدل حرف حوّلها لقائمة بـ list() الأول.',
                },
                {
                  id: 'sc-c',
                  text: 'هيضيف "A" في آخر الكلمة وتبقى "aliA"',
                  isCorrect: false,
                  feedback: 'الكتابة بالفهرس [0] لا تضيف في النهاية، وفي حالة String تسبب خطأ TypeError فورًا.',
                },
              ],
              revealNote: 'ده الفرق الأهم في الدرس: String (" ") ثابت Immutable، والقائمة List ([ ]) مرنة Mutable.',
            },
          },
        },
      ],
    },
    {
      id: '3.3-c2',
      title: 'مقارنة String مقابل List',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '3.3-video',
          type: 'mediaPlayer',
          data: {
            kind: 'video',
            title: 'فيديو وايت بورد (١٠٠ ثانية): سر القابلية للتعديل — الصندوق الزجاجي مقابل الصندوق الخشبي',
            src: '/media/video-3-3.mp4',
            vttSrc: '/media/caption-3-3.vtt',
            durationSec: 100,
            aspect: 'landscape',
            transcript:
              'شايف الصندوقين دول يا صاحبي؟ الصندوق المقفول ده هو السلسلة النصية String، زي لوح زجاجي منحوت عليه كلمة \'cat\'..\n' +
              'لو حاولت تعدل أول حرف وتقول text[0] = \'b\'، بايثون هيصرخ في وشك بـ TypeError! لأن السلاسل في بايثون Immutable، يعني غير قابلة للتعديل.\n' +
              'أما الصندوق المفتوح ده فهو القائمة List، زي درج مكعبات.. تقدر تشيل مكعب \'c\' وتحط مكعب \'b\' بكل سلاسة وتقول letters[0] = \'b\'!\n' +
              'افتكر دايماً: السلاسل ثابتة ومحفوظة، والقوائم مرنة وقابلة للتعديل!',
          },
        },
        {
          id: '3.3-tabs',
          type: 'comparisonTabs',
          data: {
            heading: 'الفرق بين السلسلة النصية والقائمة (ص ٣٥)',
            instruction: 'اضغط على التبويبين لمقارنة القابلية للتعديل ونوع الأقواس.',
            tabs: [
              {
                id: 'str',
                label: 'السلسلة النصية String (" ")',
                badge: 'Immutable',
                tone: 'coral',
                body: 'سلسلة حروف ونصوص محاطة بعلامتي تنصيص `" "` أو `\' \'`، ثابتة ولا يمكن تغيير حرف واحد داخلها مباشرة.',
                bullets: [
                  'نوع البيانات: حروف ونصوص ورموز.',
                  'غير قابلة للتعديل (Immutable).',
                  'تغيير عنصر بالفهرس مثل `text[0] = "H"` غير مسموح (TypeError).',
                ],
              },
              {
                id: 'lst',
                label: 'القائمة List ([ ])',
                badge: 'Mutable',
                tone: 'emerald',
                body: 'مجموعة قيم محاطة بأقواس مربعة `[ ]`، مرنة وتقبل تعديل أي عنصر بالفهرس أو الإضافة والحذف.',
                bullets: [
                  'نوع البيانات: أي نوع (أرقام، نصوص، منطقية...).',
                  'قابلة للتعديل (Mutable).',
                  'تغيير عنصر بالفهرس مثل `letters[0] = "H"` مسموح وينجح فورًا.',
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: '3.3-c3',
      title: 'جرّب بنفسك: صنّف الخصائص',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.3-sort',
          type: 'sortingBuckets',
          data: {
            prompt: 'وزّع كل خاصية بين السلسلة النصية (String) والقائمة (List):',
            buckets: [
              { id: 'str', label: 'السلسلة النصية (String)' },
              { id: 'lst', label: 'القائمة (List)' },
            ],
            items: [
              { id: 'sl1', text: 'غير قابلة للتعديل (Immutable)', bucketId: 'str' },
              { id: 'sl2', text: 'تُحاط بعلامتي تنصيص " "', bucketId: 'str' },
              { id: 'sl3', text: 'قابلة للتعديل (Mutable)', bucketId: 'lst' },
              { id: 'sl4', text: 'تُحاط بأقواس مربعة [ ]', bucketId: 'lst' },
            ],
            feedback: {
              correct: 'ممتاز! ربطت الأقواس وقابلية التعديل بكل نوع بشكل صحيح ١٠٠٪.',
              incorrect: 'تذكّر: القائمة [ ] Mutable يعني بتتعدل، والسلسلة النصية " " Immutable مش بتتعدل مباشرة.',
            },
          },
        },
      ],
    },
    {
      id: '3.3-c4',
      title: 'توقّع قبل التشغيل: ماذا تفعل list("ICT")؟',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '3.3-predict',
          type: 'predictOutput',
          data: {
            title: 'تفكيك النص إلى قائمة حروف',
            prompt: 'توقّع مخرجات تشغيل الدالة `list("ICT")` قبل ما تشوف النتيجة من بايثون:',
            code: 'print(list("ICT"))',
            expectedOutput: "['I', 'C', 'T']",
            options: [
              {
                id: 'p1',
                text: '["ICT"]',
                isCorrect: false,
                feedback: 'list() لا تضع الكلمة كعنصر واحد؛ إنها تفكّك السلسلة النصية إلى حروفها المفردة.',
              },
              {
                id: 'p2',
                text: "['I', 'C', 'T']",
                isCorrect: true,
                feedback: 'صح! الدالة list() تقسّم النص حرفًا بحرف داخل قائمة قابلة للتعديل.',
              },
              {
                id: 'p3',
                text: '"I C T"',
                isCorrect: false,
                feedback: 'المخرجات تكون قائمة محاطة بأقواس مربعة [ ] وليست سلسلة نصية.',
              },
              {
                id: 'p4',
                text: 'خطأ TypeError',
                isCorrect: false,
                feedback: 'تحويل السلسلة النصية لقائمة عبر list() عملية سليمة ومقصودة في Python.',
              },
            ],
            explanation: 'تستقبل دالة list() السلسلة النصية وتفككها إلى قائمة من الحروف المفردة حتى نتمكن من تعديل أي حرف فيها.',
          },
        },
      ],
    },
    {
      id: '3.3-c5',
      title: 'مثال محلول: التحويل وتعديل الحرف',
      role: 'example',
      blocks: [
        {
          id: '3.3-conv-code',
          type: 'codeView',
          data: {
            title: 'التحويل بين النص والقائمة (ص ٣٥)',
            code: 'text = "hello"\nletters = list(text)\nprint(letters)  # [\'h\', \'e\', \'l\', \'l\', \'o\']\nletters[0] = "H"\nprint(letters)',
            caption: 'تحويل النص لقائمة حروف بـ list() بيخلينا نقدر نعدّل أي حرف بالفهرس بسهولة.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '3.3-c6',
      title: 'نقطة فحص: Mutable مقابل Immutable',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '3.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما الفرق الأساسي بين السلسلة النصية (String) والقائمة (List)؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤٠',
            options: [
              {
                id: 'a',
                text: 'السلسلة النصية تستخدم [ ] والقائمة تستخدم " "',
                isCorrect: false,
                feedback: 'الأقواس معكوسة هنا: النص يُحاط بـ " " أو \' \'، أما القائمة فتُحاط بأقواس مربعة [ ].',
              },
              {
                id: 'b',
                text: 'القائمة قابلة للتعديل (Mutable) والسلسلة النصية غير قابلة للتعديل (Immutable)',
                isCorrect: true,
                feedback: 'إجابة صحيحة ١٠٠٪: القائمة تتعدل بالفهرس وappend وremove، بينما النص ثابت بعد الإنشاء.',
              },
              {
                id: 'c',
                text: 'السلسلة النصية تحتوي على أرقام فقط',
                isCorrect: false,
                feedback: 'السلسلة النصية تخزّن حروفًا وكلمات ورموزًا وأرقامًا كنص داخل علامتي تنصيص.',
              },
              {
                id: 'd',
                text: 'القائمة لا يمكن أن تحتوي على نصوص',
                isCorrect: false,
                feedback: 'القائمة تقبل النصوص والأرقام والقيم المنطقية معًا.',
              },
            ],
            explanation: 'القائمة Mutable تقبل التعديل المباشر، بينما السلسلة النصية Immutable ثابتة لا تقبل التعديل بالفهرس.',
          },
        },
      ],
    },
    {
      id: '3.3-c7',
      title: 'خلّي بالك! اكتشف خطأ تعديل النص',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '3.3-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'لماذا ظهر خطأ TypeError هنا؟',
            prompt: 'حاول مبرمج تكبير أول حرف في `"hello"` فطلع له `TypeError`! اضغط على السطر اللي سبّب الخطأ:',
            codeLines: [
              'text = "hello"',
              'text[0] = "H"',
              'print(text)',
            ],
            bugLine: 2,
            lineFeedback: {
              1: 'تعريف السلسلة النصية text = "hello" سليم تمامًا.',
              3: 'أمر print(text) سليم، لكن التنفيذ توقف قبل الوصول إليه عند السطر ٢.',
            },
            fixedLine: 'letters = list(text)\nletters[0] = "H"\nprint(letters)',
            fixExplanation: 'السلسلة النصية Immutable ولا تقبل text[0] = "H"؛ يجب تحويلها لقائمة بـ list(text) أولًا ثم تعديل الحرف بالفهرس.',
          },
        },
      ],
    },
    {
      id: '3.3-c8',
      title: 'جرّب بنفسك: حوّل كلمة "code" لقائمة',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.3-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'حوّل كلمة "code" لقائمة حروف',
            prompt: 'استبدل `___` بالدالة الصحيحة لتحويل المتغير `word` لقائمة حروف باسم `chars` ثم اطبعها.',
            starterCode: 'word = "code"\nchars = ___(word)\nprint(chars)',
            solutionCode: 'word = "code"\nchars = list(word)\nprint(chars)',
            quickChips: ['list', 'len', 'str', 'upper'],
            checks: [
              {
                id: 'chars-chk',
                label: 'تتحول لقائمة حروف c, o, d, e',
                stdin: [],
                expectedOutputRegex: "\\['c', 'o', 'd', 'e'\\]",
                contains: ['c', 'o', 'd', 'e'],
              },
            ],
            hint: 'استخدم دالة التحويل list لتفكيك الكلمة إلى قائمة حروف.',
            hints: [
              'الهدف: تحويل السلسلة النصية word إلى قائمة من حروفها المفردة.',
              'دالة len تحسب الطول فقط، أما الدالة التي تحوّل النص لقائمة في Python فاسمها list().',
              'استبدل ___ بكلمة list ليصبح السطر: chars = list(word).',
            ],
          },
        },
      ],
    },
    {
      id: '3.3-c9',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '3.3-q2',
          type: 'quizQuestion',
          data: {
            question: 'عايزين نغيّر الحرف الثالث في `code = "abcde"` إلى `"X"`. أي تصرّف برمجي ينفذ التعديل من غير `TypeError`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٣٥',
            options: [
              {
                id: 'a',
                text: 'نكتب code[2] = "X" مباشرة',
                isCorrect: false,
                feedback: 'تعديل النص مباشرة بالفهرس يطلق TypeError لأن السلسلة النصية Immutable.',
              },
              {
                id: 'b',
                text: 'نحولها بـ chars = list(code) ثم نكتب chars[2] = "X"',
                isCorrect: true,
                feedback: 'ممتاز! حوّلت النص لقائمة Mutable بـ list() واخترت الفهرس الصحيح [2] للحرف الثالث.',
              },
              {
                id: 'c',
                text: 'نحولها بـ chars = list(code) ثم نكتب chars[3] = "X"',
                isCorrect: false,
                feedback: 'التحويل صحيح، لكن بما أن العد يبدأ من 0 فالحرف الثالث مكانه [2] وليس [3] (الرابع).',
              },
              {
                id: 'd',
                text: 'نستدعي code.append("X")',
                isCorrect: false,
                feedback: 'append() دالة خاصة بالقوائم فقط وليست متاحة في النصوص، كما أنها تضيف في النهاية ولا تستبدل الحرف الثالث.',
              },
            ],
            explanation: 'لتعديل حرف في نص، نحول النص أولًا لقائمة حروف بدالة list() ثم نعدل العنصر بالفهرس المطلوب (الحرف الثالث فهرسه 2).',
          },
        },
      ],
    },
    {
      id: '3.3-c10',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '3.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'السلسلة النصية **Immutable** (ثابتة بعد الإنشاء) وتُكتب بـ `" "`، بينما القائمة **Mutable** (تتعدل بحرية) وتُكتب بـ `[ ]`، ونقدر نحول النص لقائمة حروف بـ `list(text)`. في الدرس الأخير من المحطة هنبني مشروع الكتاب العملي: فحص قوة كلمة المرور!',
          },
        },
      ],
    },
  ],
  summary: 'المقارنة بين String (Immutable) و List (Mutable) والتحويل بينهما باستخدام list().',
  additionalSources: [
    {
      id: 'nb-3-3-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'الفرق الأساسي بين String و List هو القابلية للتعديل ونوع الأقواس المستخدمة.',
      bullets: [
        'String: غير قابلة للتعديل (Immutable) وتُحاط بـ " " أو \' \'.',
        'List: قابلة للتعديل (Mutable) وتُحاط بـ [ ].',
        'list(text) تحوّل أي نص لقائمة حروف تقدر تعدّل فيها بالفهرس.',
      ],
    },
    {
      id: 'nb-3-3-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-3-3-1',
          question: 'ليه text[0] = "A" بيطلع خطأ في String؟',
          answer: 'لأن السلاسل النصية في Python غير قابلة للتعديل (Immutable) بعد إنشائها؛ لازم تحولها لقائمة بـ list() الأول لو عايز تعدل حروفها.',
        },
        {
          id: 'faq-3-3-2',
          question: 'لو حوّلت النص بـ list("hi") الناتج إيه؟',
          answer: 'الناتج قائمة فيها حرفين: [\'h\', \'i\']، وتقدر ساعتها تعدل أي عنصر فيها.',
        },
      ],
    },
    {
      id: 'nb-3-3-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-3-3',
        label: 'String مقابل List',
        children: [
          {
            id: 'mm-3-3-str',
            label: 'String (" ")',
            children: [{ id: 'mm-3-3-s1', label: 'Immutable (غير قابل للتعديل)' }],
          },
          {
            id: 'mm-3-3-lst',
            label: 'List ([ ])',
            children: [{ id: 'mm-3-3-l1', label: 'Mutable (قابل للتعديل)' }],
          },
          { id: 'mm-3-3-conv', label: 'التحويل: list(text)' },
        ],
      },
    },
    {
      id: 'nb-3-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g33-1', termAr: 'قابل للتعديل', termEn: 'Mutable', definition: 'خاصية تعني إمكانية تعديل العناصر بعد الإنشاء مثل القوائم Lists.' },
        { id: 'g33-2', termAr: 'غير قابل للتعديل', termEn: 'Immutable', definition: 'خاصية تعني عدم إمكانية تغيير الحروف مباشرة بعد الإنشاء مثل Strings.' },
        { id: 'g33-3', termAr: 'دالة التحويل لقائمة', termEn: 'list()', definition: 'دالة تحوّل السلسلة النصية إلى قائمة من الحروف.' },
      ],
    },
  ],
  sources: [
    { id: 's33-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'مقارنة String و List والتحويل بـ list()', pages: 'ص 35' },
    { id: 's33-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٣.٣', detail: 'شرح Mutable مقابل Immutable والتحويل' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '3.4',
    label: 'الدرس الجاي: مشروع فحص كلمة المرور',
    description: 'ادمج Strings و Lists و break في مشروع عملي من الكتاب.',
  },
};
