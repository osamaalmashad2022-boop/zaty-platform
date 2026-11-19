import type { LessonPack } from '@/types/curriculum';

export const LESSON_11_1: LessonPack = {
  id: '11.1',
  stationId: 'station-11',
  unitId: 'unit-3',
  order: 1,
  title: 'فتح وقراءة الملفات النصية: دالة open() وأنماط القراءة',
  subtitle: 'كيف تجعل برنامج بايثون يقرأ البيانات المحفوظة على جهازك بذكاء وأمان',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'تستخدم دالة open() مع وضع القراءة \'r\' للوصول لمحتوى الملفات النصية.',
    'تفرّق بين قراءة كامل الملف دفعة واحدة بـ read() وقراءة سطر بسطر بـ readline().',
    'تتعرف على خطأ FileNotFoundError وكيفية تجنبه بالتأكد من مسار الملف.',
  ],
  cards: [
    {
      id: '11.1-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '11.1-hero',
          type: 'heroHook',
          data: {
            title: 'قراءة الملفات في Python',
            durationMin: 8,
            stationLabel: 'المحطة ١١ · الدرس ١ من ٣',
            goal: 'تفتح أول ملف نصي في بايثون وتقرأ محتوياته بسلاسة وأمان.',
            hook: 'كل البرامج اللي كتبناها قبل كده كانت بتمسح بياناتها أول ما تقفل البرنامج! تخيل لو لعبة قفلت ومسحت سكورك ومستواك؟! هنا بييجي دور الملفات النصية (Files) عشان نخزن بياناتنا للأبد!',
            starterChallenge: {
              prompt: 'لو نفّذنا الكود: `f = open("scores.txt", "r")` وكان الملف `scores.txt` مش موجود على الكمبيوتر، إيه اللي هيحصل؟',
              options: [
                {
                  id: 'sc-err',
                  text: 'خطأ FileNotFoundError يوقف البرنامج',
                  isCorrect: true,
                  feedback: 'توقع في محله تمامًا! وضع القراءة "r" يشترط وجود الملف مسبقًا، وإلا فبايثون تعلن أن الملف غير موجود.',
                },
                {
                  id: 'sc-create',
                  text: 'بايثون هتنشئ الملف فاضي تلقائيًا بدون أخطاء',
                  isCorrect: false,
                  feedback: 'فخ شهير! وضع القراءة "r" لا ينشئ ملفات جديدة، بل يبحث عن ملف موجود فقط.',
                },
                {
                  id: 'sc-none',
                  text: 'هترجع قيمة None بهدوء',
                  isCorrect: false,
                  feedback: 'بايثون تطلق خطأ صريحًا FileNotFoundError لتنبهك أن المسار غير موجود.',
                },
              ],
              revealNote: 'القاعدة الذهبية: وضع القراءة "r" يتطلب وجود الملف مسبقًا، وإلا تطلق بايثون خطأ FileNotFoundError.',
            },
          },
        },
      ],
    },
    {
      id: '11.1-c2',
      title: 'طرق القراءة: read() مقابل readline()',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '11.1-compare-tabs',
          type: 'comparisonTabs',
          data: {
            heading: 'كيف تقرأ محتويات الملف النصي؟',
            instruction: 'استعرض التبويبين لتعرف متى تقرأ الملف دفعة واحدة ومتى تقرأه سطرًا بسطر.',
            tabs: [
              {
                id: 'tab-read',
                label: 'الدالة read()',
                badge: 'قراءة شاملة دفعة واحدة',
                tone: 'emerald',
                body: 'تقرأ محتوى الملف كاملاً من أوله لآخره وترجعه كنص واحد كبير (String).',
                bullets: [
                  'ممتازة للملفات الصغيرة وسريعة القراءة.',
                  'ترجع نصًا واحدًا يحتوي على فواصل الأسطر `\\n`.',
                  'مثال: `content = f.read()`',
                  'تحذير: لو الملف ضخم جدًا قد تستهلك ذاكرة الجهاز!',
                ],
                code: 'f = open("story.txt", "r")\nall_text = f.read()\nprint(all_text)\nf.close()',
              },
              {
                id: 'tab-readline',
                label: 'الدالة readline()',
                badge: 'قراءة سطر بسطر',
                tone: 'coral',
                body: 'تقرأ سطرًا واحدًا فقط في كل مرة يُنادى عليها، وتنتقل تلقائيًا لبداية السطر التالي.',
                bullets: [
                  'مثالية لمعالجة الملفات الكبيرة وسجلات البيانات.',
                  'كل استدعاء يجلب السطر التالي حتى نهاية الملف.',
                  'مثال: `first_line = f.readline()`',
                  'عند وصولها لنهاية الملف ترجع نصًا فارغًا `""`.',
                ],
                code: 'f = open("users.txt", "r")\nline1 = f.readline()\nline2 = f.readline()\nf.close()',
              },
            ],
          },
        },
      ],
    },
    {
      id: '11.1-c3',
      title: 'معمل بايثون: محاكاة قراءة ومعالجة أسطر البيانات',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '11.1-codelab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'معمل قراءة أسطر النصوص ومعالجة الفواصل',
            prompt: 'أكمل مكان `___` باستخدام الدالة المناسبة لإزالة فواصل الأسطر `\\n` والمسافات الزائدة.',
            starterCode: 'lines = ["Math: 95\\n", "Science: 90\\n"]\nfor line in lines:\n    cleaned = line.___\n    print("تمت قراءة:", cleaned)',
            solutionCode: 'lines = ["Math: 95\\n", "Science: 90\\n"]\nfor line in lines:\n    cleaned = line.strip()\n    print("تمت قراءة:", cleaned)',
            quickChips: ['strip()', 'split()', 'clean()', 'trim()'],
            checks: [
              {
                id: 'chk-clean',
                label: 'تنظيف أسطر النصوص بنجاح',
                stdin: [],
                expectedOutputRegex: 'تمت قراءة: Math: 95\\s+تمت قراءة: Science: 90',
              },
            ],
            hint: 'دالة strip() تزيل فواصل الأسطر الزائدة \\n والمسافات من البداية والنهاية.',
            hints: [
              'الهدف: تنظيف السطر من الفاصلة \\n.',
              'استخدم دالة السلاسل النصية الشهيرة strip().',
              'استبدل ___ بـ strip().',
            ],
          },
        },
      ],
    },
    {
      id: '11.1-c4',
      title: 'خلاصة الدرس وقاعدتك الذهبية',
      role: 'summary',
      blocks: [
        {
          id: '11.1-summary',
          type: 'richText',
          data: {
            heading: 'ثلاث حقائق جوهرية عن قراءة الملفات في بايثون',
            body: '١. **وضع القراءة الافتراضي (`"r"`):** هو الوضع المخصص للقراءة فقط، ويتطلب وجود الملف مسبقًا وإلا يحدث خطأ `FileNotFoundError`.\n\n٢. **الاختيار بين `read()` و `readline()`:** استخدم `read()` للملفات الخفيفة لتحصل على النص كاملاً، واستخدم `readline()` لقراءة سطر بسطر باحترافية.\n\n٣. **إغلاق الملف (`f.close()`):** تذكر دائمًا إغلاق الملف بعد فتحه لتحرير موارد الذاكرة، وهو ما سنتعلم طريقة سحرية لأتمتته في الدرس القادم!',
          },
        },
      ],
    },
  ],
  summary: 'فتح وقراءة الملفات النصية في بايثون بدالة open() والفرق بين read() و readline() وخطأ FileNotFoundError.',
  additionalSources: [
    {
      id: 'nb-11-1-summary',
      type: 'summary',
      title: 'ملخص سريع للملفات النصية',
      content: 'الملفات النصية تحفظ البيانات على وسائط التخزين الدائمة وتُفتح بوضع القراءة "r".',
      bullets: [
        'وضع القراءة الافتراضي هو "r".',
        'دالة read() تقرأ الملف كاملاً، و readline() تقرأ سطرًا بسطر.',
        'غياب الملف عند الفتح بوضع "r" يطلق خطأ FileNotFoundError.',
      ],
    },
    {
      id: 'nb-11-1-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-11-1-1',
          question: 'ليه دالة readline() بترجع سطر فاضي في الآخر؟',
          answer: 'لأنها وصلت لنهاية الملف (End of File) ولا يوجد المزيد من الأسطر لقراءتها.',
        },
        {
          id: 'faq-11-1-2',
          question: 'إيه اللي يحصل لو نسيت أقفل الملف بـ close()؟',
          answer: 'الملف يفضل ممسوك في ذاكرة النظام ويسبب تسريبًا للموارد (Resource Leak).',
        },
      ],
    },
    {
      id: 'nb-11-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'g111-1',
          termAr: 'وضع القراءة',
          termEn: 'Read Mode ("r")',
          definition: 'الوضع الافتراضي لفتح الملفات النصية للقراءة فقط دون إمكانية التعديل.',
        },
        {
          id: 'g111-2',
          termAr: 'الملف غير موجود',
          termEn: 'FileNotFoundError',
          definition: 'خطأ وقت تشغيل يظهر عند محاولة قراءة ملف غير موجود في المسار.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 's111-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — تكنولوجيا المعلومات للصف الثالث الإعدادي',
      detail: 'الوحدة الثالثة: التعامل مع الملفات النصية',
      pages: 'ص 19–23',
    },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '11.2',
    label: 'الدرس الجاي: كتابة البيانات في الملفات وأنماط w و a',
    description: 'تعلّم كيف تحفظ البيانات وتفرّق بين الكتابة الشاملة والإلحاق.',
  },
};
