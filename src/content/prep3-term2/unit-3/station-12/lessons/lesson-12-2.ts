import type { LessonPack } from '@/types/curriculum';

export const LESSON_12_2: LessonPack = {
  id: '12.2',
  stationId: 'station-12',
  unitId: 'unit-3',
  order: 2,
  title: 'الدالة البنائية والمُعامل السحري: سر دالة __init__ ومعامل self',
  subtitle: 'تخلص من إسناد الخصائص اليدوي واجعل كائناتك تولد جاهزة بالبيانات فور إنشائها!',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'تدرك وظيفة دالة البناء __init__ التي تُستدعى آليًا وفوريًا عند ولادة أي كائن جديد.',
    'تفهم دور المعامل السحري self كإشارة مباشرة للكائن الحالي المُنشأ في الذاكرة.',
    'تمرر السمات الأولية (مثل الاسم، الطاقة) داخل أقواس الفئة عند الإنشاء.',
  ],
  cards: [
    {
      id: '12.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '12.2-hero',
          type: 'heroHook',
          data: {
            title: 'دالة البناء __init__ والمعامل self',
            durationMin: 8,
            stationLabel: 'المحطة ١٢ · الدرس ٢ من ٣',
            goal: 'تتقن بناء كائنات مهيأة ذاتيًا بالبيانات من اللحظة الأولى لتأسيسها.',
            hook: 'تخيل كل ما تشتري موبايل جديد تضطر تفتحه بمفك وتركب البطارية والشاشة يدويًا سطر سطر! ده اللي كنا بنعمله لما نكتب robot.name و robot.battery يدويًا.. لكن مع دالة البناء __init__، الموبايل بيخرج من المصنع جاهز وشغال بأول ضغطة زر!',
            starterChallenge: {
              prompt: 'متى يتم تنفيذ الكود المكتوب داخل دالة `__init__` في بايثون؟',
              options: [
                {
                  id: 'sc-auto',
                  text: 'تلقائيًا وفوريًا أول ما ننشئ الكائن مثل: r = Robot("Zaki")',
                  isCorrect: true,
                  feedback: 'عين مبرمج ثاقبة! دالة __init__ تسمى الدالة البنائية Constructor لأنها تبني وتجهز الكائن آليًا في لحظة ولادته.',
                },
                {
                  id: 'sc-call',
                  text: 'فقط لو نادينا عليها بالاسم صراحة: r.__init__()',
                  isCorrect: false,
                  feedback: 'لا نحتاج لمناداتها يدويًا أبدًا؛ بايثون تستدعيها بنفسها في الخفاء أول ما نطلب إنشاء كائن جديد.',
                },
                {
                  id: 'sc-end',
                  text: 'في نهاية البرنامج قبل ما يغلق الجهاز',
                  isCorrect: false,
                  feedback: 'دالة البناء تعمل في البداية عند الإنشاء، وليس عند إغلاق البرنامج.',
                },
              ],
              revealNote: 'القاعدة الذهبية: دالة `__init__` هي المشرف التلقائي الذي يستقبل الكائن في لحظة ولادته ويملأ بياناته عبر معامل `self`.',
            },
          },
        },
      ],
    },
    {
      id: '12.2-c2',
      title: 'تشريح دالة البناء: سر self والشرطتان السفليتان',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '12.2-podcast',
          type: 'mediaPlayer',
          data: {
            kind: 'audio',
            title: 'بودكاست حواري (١٠٨ ثوانٍ): دالة البناء __init__ ولغز معامل self',
            src: '/media/podcast-12-2.mp3',
            vttSrc: '/media/caption-12-2.vtt',
            durationSec: 108,
            transcript:
              'سألت نفسك قبل كده إيه حكاية دالة __init__ ومعامل self الغريب في كلاسات بايثون يا صاحبي؟!\n' +
              'دالة __init__ هي دالة البناء؛ أول ما بتنشئ كائن جديد بتشتغل تلقائياً عشان تديه خصائصه وهويته الأولية.\n' +
              'أما self فهو الضمير اللي الكائن بيشاور بيه على نفسه عشان بياناته متختلطش بالكائنات التانية.\n' +
              'لما تكتب self.name كأنك بتقول لبايثون: احفظي الاسم في درج الكائن ده تحديداً!',
          },
        },
        {
          id: '12.2-accordion',
          type: 'accordionBlock',
          data: {
            heading: 'أسرار كتابة دالة البناء في بايثون (ص ٣٦–٣٩)',
            openMode: 'multiple',
            items: [
              {
                id: 'acc-dunder',
                title: '١. ما سر الشرطتين السفليتين في __init__؟',
                body: 'تسمى هذه الدوال في بايثون دوال Dunder (اختصارًا لـ Double Underscore). وجود شرطتين قبلهما وشرطتين بعدهما يخبر مفسر بايثون أن هذه دالة خاصة وسحرية لها معاملة استثنائية وتُستدعى تلقائيًا.',
                code: 'def __init__(self, name, battery):',
              },
              {
                id: 'acc-self',
                title: '٢. ما هو المعامل self ولماذا نضعه دائمًا أولاً؟',
                body: 'المعامل self يمثل «الكائن نفسه» أو «أنا شخصيًا»! عندما ننشئ الكائن r1، كلمة self تشير لـ r1. وعندما ننشئ r2، كلمة self تشير لـ r2. لذلك نكتب self.name لكي نحفظ الاسم في خزنة هذا الكائن تحديدًا دون الخلط بين الكائنات.',
                code: 'self.name = name\nself.battery = battery',
              },
              {
                id: 'acc-calling',
                title: '٣. كيف نمرر القيم دون أن نكتب self؟',
                body: 'عند إنشاء الكائن نكتب: r1 = Robot("Zaki", 100). بايثون تأخذ "Zaki" لمعامل name، وتأخذ 100 لمعامل battery، وتمرر الكائن r1 تلقائيًا للمعامل الأول self في الخفاء دون أي مجهود منك!',
                code: 'r1 = Robot("Zaki", 100)\nprint(r1.name)     # Zaki\nprint(r1.battery)  # 100',
              },
            ],
          },
        },
      ],
    },
    {
      id: '12.2-c3',
      title: 'معمل بايثون: بناء الفئة المجهزة ذاتيًا',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '12.2-codelab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'معمل دالة البناء وربط الخصائص بـ self',
            prompt: 'أكمل مكان `___` داخل دالة البناء لربط خاصية الطاقة `self.battery` بقيمة المعامل `battery`.',
            starterCode: 'class Hero:\n    def __init__(self, name, battery):\n        self.name = name\n        ___ = battery\n\nh = Hero("Zaty", 100)\nprint("Hero:", h.name, "- Battery:", h.battery)',
            solutionCode: 'class Hero:\n    def __init__(self, name, battery):\n        self.name = name\n        self.battery = battery\n\nh = Hero("Zaty", 100)\nprint("Hero:", h.name, "- Battery:", h.battery)',
            quickChips: ['self.battery', 'battery', 'Hero.battery', 'self.energy'],
            checks: [
              {
                id: 'chk-init',
                label: 'تهيئة الكائن وطباعة خصائصه بنجاح',
                stdin: [],
                expectedOutputRegex: 'Hero: Zaty - Battery: 100',
              },
            ],
            hint: 'داخل دالة البناء، نحفظ قيمة المعامل داخل الكائن نفسه بكتابة self.battery = battery.',
            hints: [
              'الهدف: تخزين قيمة battery في الكائن الحالي self.',
              'استخدم التعبير self.battery.',
              'استبدل ___ بـ self.battery.',
            ],
          },
        },
      ],
    },
    {
      id: '12.2-c4',
      title: 'خلاصة الدرس وقاعدتك الذهبية',
      role: 'summary',
      blocks: [
        {
          id: '12.2-summary',
          type: 'richText',
          data: {
            heading: 'حصاد الدرس الثاني: الولادة الذكية للكائنات',
            body: 'رائع جدًا يا صديقي! أصبحت الآن تفهم روح البرمجة كائنية التوجه:\n\n• **دالة البناء `__init__`:** تتولى تجهيز كل كائن فور إنشائه دون أي كود مكرر.\n• **المعامل السحري `self`:** يضمن أن كل كائن يحتفظ ببياناته في جيبه الخاص دون التأثير على بقية الكائنات.\n• **الإنشاء الأنيق:** كتابة `Robot("Titan", 95)` تجعل كودك نظيفًا ومحترفًا ككبار المطورين.\n\nفي الدرس القادم، سنتعلم كيف نعطي كائناتنا أفعالًا وحركات حقيقية عبر الوظائف (Methods) ونبني معًا مشروع محاكي الآلي البطل!',
          },
        },
      ],
    },
  ],
  summary: 'شرح دالة البناء __init__ والمعامل self ودورهما في التجهيز التلقائي لخصائص الكائنات.',
  sources: [
    {
      id: 's122-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — تكنولوجيا المعلومات للصف الثالث الإعدادي',
      detail: 'الوحدة الثالثة: أساسيات البرمجة كائنية التوجه (OOP)',
      pages: 'ص 37–40',
    },
  ],
  additionalSources: [
    {
      id: 'nb-12-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'الدالة البنائية __init__ والمعامل self.',
      bullets: [
        'دالة __init__ تُنفّذ تلقائيًا وفوريًا عند ولادة الكائن في الذاكرة.',
        'المعامل self يمثل الكائن الحالي ويوجه حفظ الخصائص لحسابه الخاص.',
        'تمرير وسائط الإنشاء يتم مباشرة بين أقواس الفئة: Robot("Zaki", 100).',
      ],
    },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '12.3',
    label: 'الدرس التالي: وظائف الكائنات (Methods) ومشروع محاكي البطل الآلي',
  },
};
