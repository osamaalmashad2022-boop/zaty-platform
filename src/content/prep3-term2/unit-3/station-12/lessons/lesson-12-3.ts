import type { LessonPack } from '@/types/curriculum';

export const LESSON_12_3: LessonPack = {
  id: '12.3',
  stationId: 'station-12',
  unitId: 'unit-3',
  order: 3,
  title: 'وظائف الكائنات (Methods): إعطاء الحياة والأفعال لكائنات بايثون',
  subtitle: 'اجمع البيانات والوظائف في مكان واحد وابنِ كائنًا ذكيًا يتفاعل وينفذ المهام!',
  durationMin: 9,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'تعرّف وظيفة الكائن (Method) كدالة تعيش داخل الفئة وتتحكم في بيانات الكائن وسلوكياته.',
    'تستدعي الوظائف باستخدام صيغة النقطة object.method() مع تمرير المعاملات المطلوبة.',
    'تطبق مفهوم التغليف (Encapsulation) وتعديل حالة الكائن الداخلية في مشروع محاكي الآلي.',
  ],
  cards: [
    {
      id: '12.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '12.3-hero',
          type: 'heroHook',
          data: {
            title: 'وظائف الكائنات Methods ومشروع البطل الآلي',
            durationMin: 9,
            stationLabel: 'المحطة ١٢ · الدرس ٣ من ٣',
            goal: 'تمنح كائناتك القدرة على الحركة وتنفيذ الأفعال وتعديل طاقتها البرمجية ذاتيًا.',
            hook: 'حتى الآن كائناتنا كانت مجرد صناديق بيانات صامتة عندها اسم وطاقة.. لكن إيه رأيك نخلي الكائن يتحرك، يتكلم، ويشحن طاقته بنفسه؟! ده سحر الوظائف (Methods) اللي بيحول الكود لبرنامج حي تفاعلي!',
            starterChallenge: {
              prompt: 'لو عندنا كائن اسمه `car` وجواه وظيفة اسمها `honk()`، إزاي نخليه يطلق الصوت؟',
              options: [
                {
                  id: 'sc-dot',
                  text: 'car.honk() — ننادي على الوظيفة عبر اسم الكائن والنقطة',
                  isCorrect: true,
                  feedback: 'إجابة عبقرية! الوظيفة Method مملوكة للكائن، لذلك ننادي عليها بنقطة من الكائن: car.honk().',
                },
                {
                  id: 'sc-func',
                  text: 'honk(car) — كدالة عادية خارجية',
                  isCorrect: false,
                  feedback: 'لو كتبناها كدالة عادية خارجية نكون رجعنا للبرمجة الإجرائية القديمة وضيعنا ميزة ارتباط الوظيفة بالكائن.',
                },
                {
                  id: 'sc-arrow',
                  text: 'car -> honk() — بأسهم التوجيه',
                  isCorrect: false,
                  feedback: 'لغة بايثون تستخدم معامل النقطة (.) البسيط والأنيق للوصول لجميع الخصائص والوظائف.',
                },
              ],
              revealNote: 'القاعدة الذهبية: الوظائف داخل الكائنات تُستدعى بكتابة اسم الكائن ثم نقطة ثم اسم الوظيفة مع الأقواس: `object.method()`.',
            },
          },
        },
      ],
    },
    {
      id: '12.3-c2',
      title: 'كيف نكتب Method داخل الفئة؟',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '12.3-stepper',
          type: 'processStepper',
          data: {
            heading: 'خطوات بناء الوظائف واستدعائها في الكائنات (ص ٤٠–٤٤)',
            steps: [
              {
                id: 'st-def',
                title: '١. كتابة الدالة مع self',
                detail:
                  'نكتب def داخل الفئة ولا بد أن يكون أول معامل هو self حتى تتمكن الوظيفة من معرفة الكائن الذي يناديها والوصول لبياناته.',
                code: 'def speak(self):\n    print("مرحبًا، أنا الآلي:", self.name)',
              },
              {
                id: 'st-state',
                title: '٢. تعديل خصائص الكائن من الداخل',
                detail:
                  'تستطيع الوظيفة تعديل متغيرات الكائن، مثل زيادة الطاقة أو إنقاصها، مباشرة عبر self.energy.',
                code: 'def charge(self, amount):\n    self.energy += amount',
              },
              {
                id: 'st-call',
                title: '٣. استدعاء الوظيفة في البرنامج',
                detail:
                  'نستخدم معامل النقطة مع اسم الكائن المنشأ، وبايثون تمرر الكائن آليًا إلى self دون الحاجة لكتابته بالأقواس.',
                code: 'b = Bot("Atlas", 50)\nb.charge(30)  # أصبحت طاقته 80!',
              },
            ],
          },
        },
      ],
    },
    {
      id: '12.3-c3',
      title: 'معمل بايثون: مشروع محاكي شاحن الآلي البطل',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '12.3-codelab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'مشروع محاكي شاحن طاقة الآلي',
            prompt: 'أكمل مكان `___` داخل دالة `charge()` لزيادة طاقة الآلي الحالية بمقدار `amount` المضاف.',
            starterCode: 'class Bot:\n    def __init__(self, name, energy):\n        self.name = name\n        self.energy = energy\n    def charge(self, amount):\n        self.energy = ___\n\nb = Bot("Atlas", 50)\nb.charge(30)\nprint("Final Energy:", b.energy)',
            solutionCode: 'class Bot:\n    def __init__(self, name, energy):\n        self.name = name\n        self.energy = energy\n    def charge(self, amount):\n        self.energy = self.energy + amount\n\nb = Bot("Atlas", 50)\nb.charge(30)\nprint("Final Energy:", b.energy)',
            quickChips: ['self.energy + amount', 'amount', 'self.energy', 'energy + 30'],
            checks: [
              {
                id: 'chk-charge',
                label: 'شحن طاقة الآلي وطباعة المجموع بنجاح',
                stdin: [],
                expectedOutputRegex: 'Final Energy: 80',
              },
            ],
            hint: 'لزيادة قيمة الخاصية، نجمع قيمتها الحالية self.energy مع المقدار الممرر amount.',
            hints: [
              'الهدف: إضافة amount إلى الطاقة الحالية self.energy.',
              'استخدم التعبير self.energy + amount.',
              'استبدل ___ بـ self.energy + amount.',
            ],
          },
        },
      ],
    },
    {
      id: '12.3-c4',
      title: 'خلاصة المحطة وقاعدتك الذهبية',
      role: 'summary',
      blocks: [
        {
          id: '12.3-summary',
          type: 'richText',
          data: {
            heading: 'حصاد المحطة الثانية عشرة: كائنات بايثون في قبضتك!',
            body: 'مبروك يا صديقي البطل! لقد أتممت بنجاح أهم ركائز البرمجة الحديثة (OOP):\n\n• **الفئة (Class):** القالب العام ومصنع الكائنات.\n• **الكائن (Object):** الكيان الحي الحقيقي المستقل في الذاكرة.\n• **دالة البناء (`__init__`):** تتولى إعداد بيانات الكائن في لحظة ولادته.\n• **المعامل `self`:** بوصلة الكائن لمعرفة بياناته الخاصة.\n• **الوظائف (Methods):** الأفعال والسلوكيات الذكية التي تحرك الكائن.\n\nأنت الآن جاهز للاختبار الختامي للمحطة وتثبيت كل هذه المفاهيم في جيبك البرمجي!',
          },
        },
      ],
    },
  ],
  summary: 'شرح وظائف الكائنات Methods ودمج البيانات والسلوكيات وبناء مشروع محاكي الآلي.',
  sources: [
    {
      id: 's123-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — تكنولوجيا المعلومات للصف الثالث الإعدادي',
      detail: 'الوحدة الثالثة: أساسيات البرمجة كائنية التوجه (OOP)',
      pages: 'ص 41–48',
    },
  ],
  additionalSources: [
    {
      id: 'nb-12-3-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'وظائف الكائنات Methods والتغليف ومحاكي الآلي.',
      bullets: [
        'الوظيفة Method دالة داخل الفئة تتحكم في سلوكيات الكائن وتعديل بياناته.',
        'أول معامل في أي Method يجب أن يكون self لتحديد الكائن المستهدف.',
        'الاستدعاء يتم عبر النقطة: bot.charge(30).',
        'مبدأ التغليف Encapsulation يحزم البيانات مع وظائفها في وحدة واحدة آمنة.',
      ],
    },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-12',
    label: 'الاختبار الختامي: قياس إتقان أساسيات OOP',
  },
};
