import type { LessonPack } from '@/types/curriculum';

export const LESSON_10_2: LessonPack = {
  id: '10.2',
  stationId: 'station-10',
  unitId: 'unit-3',
  order: 2,
  title: 'التعامل الآمن مع القاموس: الإضافة والتعديل وسر دالة get()',
  subtitle: 'احمِ برنامجك من الانهيار وتعلّم كيف تضيف وتعدل بيانات القاموس بمرونة',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'تستخدم دالة get() الآمنة مع قيمة افتراضية لتفادي خطأ KeyError تمامًا.',
    'تضيف مفاتيح جديدة وتعدل القيم الحالية في القاموس بمرونة.',
    'تتحقق من وجود المفتاح عبر معامل in وتحذف العناصر بـ del أو pop().',
  ],
  cards: [
    {
      id: '10.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '10.2-hero',
          type: 'heroHook',
          data: {
            title: 'القراءة الآمنة والتعديل في القواميس',
            durationMin: 8,
            stationLabel: 'المحطة ١٠ · الدرس ٢ من ٣',
            goal: 'تستخدم دالة get() لتجنب أخطاء التشغيل وتتعلم تعديل وإضافة بيانات القاموس.',
            hook: 'تخيل موقع بيسألك عن رقم تليفونك، بس إنت ما كتبتهوش. لو الكود استخدم أقواس مربعة student["phone"]، الموقع هينهار في وشك! إزاي المبرمج المحترف بيتصرف؟ بـ دالة سحرية اسمها get()!',
            starterChallenge: {
              prompt: 'لو نفّذنا الكود: `user = {"name": "Zaid"}` ثم طلبنا `val = user.get("age", 0)`، قيمة `val` هتكون إيه؟',
              options: [
                {
                  id: 'sc-err',
                  text: 'خطأ KeyError لأن age مش موجود',
                  isCorrect: false,
                  feedback: 'ده اللي كان هيحصل لو استخدمنا user["age"]! لكن دالة get() صممت خصيصًا لتمنع الخطأ ده.',
                },
                {
                  id: 'sc-zero',
                  text: '0 — القيمة البديلة الآمنة التي حددناها',
                  isCorrect: true,
                  feedback: 'عين مبرمج محترف! دالة get() بحثت عن "age" فلما ما لقتهوش رجّعت القيمة البديلة 0 بدون أي انهيار.',
                },
                {
                  id: 'sc-none',
                  text: 'None فقط ولا يمكن تغييرها',
                  isCorrect: false,
                  feedback: 'لو لم نكتب 0 كانت هترجع None، لكن لأننا مررنا القيمة البديلة 0 كمعامل ثانٍ فسترجع 0.',
                },
              ],
              revealNote: 'دالة get(key, default) هي الدرع الآمن لقراءة أي مفتاح قد لا يكون موجودًا.',
            },
          },
        },
      ],
    },
    {
      id: '10.2-c2',
      title: 'مقارنة القراءة: [key] مقابل get()',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '10.2-podcast',
          type: 'mediaPlayer',
          data: {
            kind: 'audio',
            title: 'بودكاست سريع (٩٠ ثانية): التعامل الآمن مع القاموس ودالة get() وتفادي KeyError',
            src: '/media/podcast-10-2.mp3',
            vttSrc: '/media/caption-10-2.vtt',
            durationSec: 90,
            transcript:
              'عارف يا صاحبي إيه اللي يفرّق المبرمج المبتدئ عن المحترف في التعامل مع القواميس؟ رد فعله لما المفتاح ميكونش موجود!\n' +
              'المبتدئ بيستخدم الأقواس المربعة user[\'phone\']، ولو المفتاح مش متسجل، البرنامج بيفرقع فوراً في وش المستخدم بخطأ KeyError!\n' +
              'لكن المحترف بيستخدم الدرع السحري: دالة get() مع قيمة بديلة: user.get(\'phone\', \'غير مسجل\')!\n' +
              'ولو عايز تفحص المفتاح بنفسك الأول، معامل in البسيط هيقولك True لو موجود، بدون أي مفاجآت أو انهيار!',
          },
        },
        {
          id: '10.2-compare-tabs',
          type: 'comparisonTabs',
          data: {
            heading: 'طريقتان لاستخراج البيانات من القاموس',
            instruction: 'تصفح التبويبين لتعرف الفرق بين القراءة المباشرة والقراءة الآمنة.',
            tabs: [
              {
                id: 'tab-direct',
                label: 'الأقواس المربعة dict[key]',
                badge: 'قراءة مباشرة (خطرة)',
                tone: 'coral',
                body: 'تُستخدم عندما تكون متأكدًا 100% أن المفتاح موجود داخل القاموس.',
                bullets: [
                  'سريعة ومباشرة: `score = student["math"]`',
                  'لو المفتاح مفقود: ينهار البرنامج فورًا بـ `KeyError`!',
                  'تصلح فقط للمفاتيح الإلزامية الثابتة.',
                ],
                code: 'data = {"name": "Nour"}\nprint(data["age"])  # انهيار بـ KeyError!',
              },
              {
                id: 'tab-get',
                label: 'دالة dict.get(key, default)',
                badge: 'قراءة آمنة (موصى بها)',
                tone: 'emerald',
                body: 'تُستخدم لفحص وقراءة البيانات المرنة دون الخوف من توقف البرنامج.',
                bullets: [
                  'تبحث عن المفتاح: لو وُجد تُرجع قيمته.',
                  'لو المفتاح مفقود: تُرجع `None` أو القيمة البديلة `default` دون أي أخطاء.',
                  'مثالية للبيانات الاختيارية وحقول الاستمارات.',
                ],
                code: 'data = {"name": "Nour"}\nage = data.get("age", 15)  # يرجع 15 بهدوء!',
              },
            ],
          },
        },
      ],
    },
    {
      id: '10.2-c3',
      title: 'تعديل وإضافة وحذف العناصر',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '10.2-crud-flips',
          type: 'flipCards',
          data: {
            heading: 'عمليات التحكم في محتويات القاموس',
            instruction: 'اقلب البطاقات لتتعلم كيف تعدل وتضيف وتحذف من القاموس.',
            cards: [
              {
                id: 'fc-add',
                frontLabel: 'الإضافة',
                frontTitle: 'إضافة مفتاح جديد',
                frontHint: 'كيف نضع بيانًا جديدًا؟',
                backTitle: 'dict[new_key] = value',
                backBody: 'بمجرد كتابة مفتاح غير موجود وإسناد قيمة له، يُنشئ بايثون المفتاح الجديد في القاموس فورًا.',
                backExample: 'user["city"] = "Alexandria"',
              },
              {
                id: 'fc-mod',
                frontLabel: 'التعديل',
                frontTitle: 'تعديل قيمة مفتاح حالي',
                frontHint: 'تحديث درجة أو عنوان',
                backTitle: 'dict[existing_key] = new_value',
                backBody: 'إذا كان المفتاح موجودًا بالفعل، فإن كتابة قيمة جديدة له تستبدل القيمة السابقة بالقيمة الحديثة.',
                backExample: 'user["score"] = 99 # استبدال 90 بـ 99',
              },
              {
                id: 'fc-check',
                frontLabel: 'الفحص',
                frontTitle: 'معامل التحقق in',
                frontHint: 'هل المفتاح موجود؟',
                backTitle: 'if "key" in dict:',
                backBody: 'يفحص معامل in وجود المفتاح في القاموس ويرجع True أو False، وهو ممتاز للاختبار قبل القراءة.',
                backExample: 'if "email" in user: print("Found!")',
              },
              {
                id: 'fc-del',
                frontLabel: 'الحذف',
                frontTitle: 'حذف عنصر بـ del أو pop()',
                frontHint: 'إزالة بيان من القاموس',
                backTitle: 'del dict[key] أو dict.pop(key)',
                backBody: 'الأمر del يحذف المفتاح وقيمته، بينما دالة pop(key) تحذفه وتُرجع قيمته المحذوفة لاستخدامها.',
                backExample: 'del user["temp_data"]',
              },
            ],
          },
        },
      ],
    },
    {
      id: '10.2-c4',
      title: 'توقّع قبل التشغيل (PRIMM)',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '10.2-predict',
          type: 'predictOutput',
          data: {
            title: 'تتبع تعديل وإضافة درجات متعلم',
            prompt: 'تتبع أسطر الكود التالية وتوقّع القيمة النهائية التي سيطبعها البرنامج لدرجة الرياضيات:',
            code: 'grades = {"math": 80, "science": 90}\n\n# تحديث درجة الرياضيات\ngrades["math"] = 85\n\n# محاولة قراءة مادة اللغة الإنجليزية بقيمة افتراضية\neng = grades.get("english", 75)\n\nprint(grades["math"], eng)',
            expectedOutput: '85 75',
            options: [
              {
                id: 'o1',
                text: '85 75',
                isCorrect: true,
                feedback: 'توقّع دقيق 100%! درجة math تم تحديثها من 80 إلى 85، و english رجعت القيمة الافتراضية 75 لأنها غير موجودة.',
              },
              {
                id: 'o2',
                text: '80 75',
                isCorrect: false,
                feedback: 'السطر grades["math"] = 85 قام بتحديث القيمة بنجاح، لذلك لن تظل 80.',
              },
              {
                id: 'o3',
                text: '85 None',
                isCorrect: false,
                feedback: 'دالة get تخصصت بقيمة افتراضية 75: get("english", 75)، لذلك سترجع 75 وليس None.',
              },
              {
                id: 'o4',
                text: 'KeyError',
                isCorrect: false,
                feedback: 'لا يوجد أي خطأ! التعديل تم بسلاسة، ودالة get تحمي تمامًا من KeyError.',
              },
            ],
            explanation: 'القاموس هيكل بيانات قابل للتعديل (Mutable) تتغير قيمه مباشرة، ودالة get تحمي من غياب المفاتيح.',
          },
        },
      ],
    },
    {
      id: '10.2-c5',
      title: 'اكتشف الفخ: تجنب الانهيار',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '10.2-spotbug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد خطأ قراءة الحقول الاختيارية',
            prompt: 'هذا الكود يقرأ ملف إعدادات مستخدم قد لا يحتوي على رقم الهاتف "phone" — اضغط على السطر المعرض للانهيار:',
            codeLines: [
              'user_settings = {"username": "ayman", "dark_mode": True}',
              'name = user_settings.get("username", "Guest")',
              'phone = user_settings["phone"]',
              'print(name, phone)',
            ],
            bugLine: 3,
            lineFeedback: {
              1: 'تعريف القاموس سليم بدون مشاكل.',
              2: 'استخدام user_settings.get("username") ممتاز وآمن.',
              3: 'استخدام الأقواس المربعة ["phone"] مع مفتاح غير مضمون الوجود يسبب انهيار البرنامج بـ KeyError!',
              4: 'أمر الطباعة يعتمد على السطر السابق.',
            },
            fixedLine: 'phone = user_settings.get("phone", "No phone")',
            fixExplanation: 'استبدال ["phone"] بـ .get("phone", "No phone") يجعل البرنامج آمنًا حتى لو لم يسجل المستخدم هاتفه.',
          },
        },
      ],
    },
    {
      id: '10.2-c6',
      title: 'جرّب بنفسك: تحديث متجر إلكتروني',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '10.2-codelab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'تعديل أسعار وإضافة منتج جديد',
            prompt: 'أمامك قاموس متجر أسعار الفاكهة: عدّل سعر "apple" ليصبح 30، وأضف منتج "orange" بسعر 25، ثم اطبع السعرين.',
            starterCode: 'prices = {"apple": 20, "banana": 15}\n\n# ١. عدل سعر التفاح إلى 30\n\n# ٢. أضف البرتقال بسعر 25\n\nprint("Apple:", prices["apple"], "- Orange:", prices["orange"])',
            solutionCode: 'prices = {"apple": 20, "banana": 15}\nprices["apple"] = 30\nprices["orange"] = 25\nprint("Apple:", prices["apple"], "- Orange:", prices["orange"])',
            checks: [
              {
                id: 'chk-prices',
                label: 'Apple: 30 - Orange: 25',
                stdin: [],
                expectedOutputRegex: 'Apple: 30 - Orange: 25',
              },
            ],
            quickChips: ['prices["apple"] = 30', 'prices["orange"] = 25'],
            hint: 'استخدم prices["apple"] = 30 للتعديل، و prices["orange"] = 25 للإضافة.',
            hints: [
              'الهدف: تحديث مفتاح موجود وإضافة مفتاح جديد بنفس الصيغة dict[key] = value.',
              'اكتب prices["apple"] = 30 في السطر الثاني.',
              'اكتب prices["orange"] = 25 في السطر الثالث.',
            ],
          },
        },
      ],
    },
    {
      id: '10.2-c7',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '10.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما فائدة تمرير قيمة ثانية لدالة `get()` مثل `user.get("city", "Cairo")`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ١٠–١٤',
            options: [
              {
                id: 'a',
                text: 'تغيير اسم المفتاح إلى "Cairo"',
                isCorrect: false,
                feedback: 'دالة get تقرأ البيانات فقط ولا تغير أسماء المفاتيح.',
              },
              {
                id: 'b',
                text: 'إرجاع "Cairo" كقيمة افتراضية بديلة في حالة عدم وجود المفتاح "city"',
                isCorrect: true,
                feedback: 'دقيق 100%! هذه القيمة الافتراضية تحمي البرنامج من إرجاع None أو الانهيار.',
              },
              {
                id: 'c',
                text: 'حذف المفتاح "city" من القاموس',
                isCorrect: false,
                feedback: 'الحذف يتم بـ del أو pop()، بينما get مخصصة للقراءة الآمنة.',
              },
              {
                id: 'd',
                text: 'تكرار البحث مرتين في الذاكرة',
                isCorrect: false,
                feedback: 'المعامل الثاني يمثل القيمة الاحتياطية (fallback) ولا يكرر البحث.',
              },
            ],
            explanation: 'المعامل الثاني في get(key, default) يحدد القيمة البديلة التي ترجع إذا كان المفتاح غير موجود في القاموس.',
          },
        },
      ],
    },
    {
      id: '10.2-c8',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '10.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'تعلمنا أن القاموس مرن وقابل للتعديل (`Mutable`)؛ يمكن تعديله وإضافة عناصر له بصيغة `dict[key] = value`، كما أن استخدام **`dict.get(key, default)`** هو السلوك البرمجي الاحترافي لحماية البرامج من أخطاء `KeyError`. وفي الدرس القادم سنتعلم كيف نكرر على القاموس بدوال `keys()` و `values()` و `items()` ونبني مشروعًا متكاملاً!',
          },
        },
      ],
    },
  ],
  summary: 'القراءة الآمنة للبيانات باستخدام دالة get() وتعديل وإضافة وحذف عناصر القاموس في Python.',
  additionalSources: [
    {
      id: 'nb-10-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'القراءة الآمنة والتعديل الديناميكي في القواميس.',
      bullets: [
        'dict.get(key, default): تقرأ بأمان وتمنع توقف البرنامج.',
        'dict[key] = value: تعدل القيمة إذا كان المفتاح موجودًا، وتضيفه إن كان جديدًا.',
        'del dict[key]: تحذف المفتاح وقيمته نهائيًا.',
      ],
    },
    {
      id: 'nb-10-2-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-10-2-1',
          question: 'إيه اللي يحصل لو ما حددتش قيمة افتراضية في دالة get() والمفتاح مش موجود؟',
          answer: 'هترجع القيمة الخاصة None بدون ما تطلق أي خطأ.',
        },
        {
          id: 'faq-10-2-2',
          question: 'إيه الفرق بين del dict[key] و dict.pop(key)؟',
          answer: 'كلاهما يحذف العنصر، لكن pop ترجع القيمة المحذوفة وتقدر تخزنها في متغير، أما del فتحذف مباشرة.',
        },
      ],
    },
    {
      id: 'nb-10-2-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-10-2',
        label: 'التحكم بالقاموس',
        children: [
          { id: 'mm-10-2-get', label: 'القراءة الآمنة: get(k, def)' },
          { id: 'mm-10-2-mod', label: 'الإضافة والتعديل: dict[k] = v' },
          { id: 'mm-10-2-check', label: 'الفحص: key in dict' },
          { id: 'mm-10-2-del', label: 'الحذف: del / pop()' },
        ],
      },
    },
    {
      id: 'nb-10-2-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'g102-1',
          termAr: 'دالة get()',
          termEn: 'dict.get()',
          definition: 'دالة لقراءة القيم بأمان من القاموس دون إطلاق خطأ عند غياب المفتاح.',
        },
        {
          id: 'g102-2',
          termAr: 'القيمة الافتراضية',
          termEn: 'Default Value',
          definition: 'القيمة الاحتياطية التي ترجعها get() إذا لم يتم العثور على المفتاح المطلوب.',
        },
        {
          id: 'g102-3',
          termAr: 'قابلية التعديل',
          termEn: 'Mutable',
          definition: 'خاصية تسمح بإضافة وتعديل وحذف البيانات داخل الهيكل بعد إنشائه.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 's102-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — تكنولوجيا المعلومات للصف الثالث الإعدادي',
      detail: 'الوحدة الثالثة: دوال القواميس والتعديل الآمن',
      pages: 'ص 11–18',
    },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '10.3',
    label: 'الدرس الجاي: دوال keys() و values() و items() ومشروع السجل',
    description: 'تعلّم كيف تكرر على القاموس بحلقة for وابنِ مشروع سجل الدرجات.',
  },
};
