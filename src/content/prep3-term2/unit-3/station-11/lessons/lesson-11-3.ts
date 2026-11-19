import type { LessonPack } from '@/types/curriculum';

export const LESSON_11_3: LessonPack = {
  id: '11.3',
  stationId: 'station-11',
  unitId: 'unit-3',
  order: 3,
  title: 'إدارة الملفات الاحترافية: سياق with open ومشروع سجل الملاحظات',
  subtitle: 'كيف تدير موارد برنامجك كالمحترفين وتغلق الملفات تلقائيًا وتبني مشروعًا حقيقيًا',
  durationMin: 9,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'تستخدم سياق with open(...) as f لضمان إغلاق الملفات تلقائيًا.',
    'تفهم خطورة نسيان f.close() على تسريب موارد الذاكرة وقفل الملفات في النظام.',
    'تبني مشروعًا برمجيًا متكاملاً لتسجيل وعرض ملاحظات ودرجات المتعلمين بدقة.',
  ],
  cards: [
    {
      id: '11.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '11.3-hero',
          type: 'heroHook',
          data: {
            title: 'سياق with open ومشروع السجل الرقمي',
            durationMin: 9,
            stationLabel: 'المحطة ١١ · الدرس ٣ من ٣',
            goal: 'تستخدم سياق with open لإدارة الملفات بأمان وتبني مشروع سجل ملاحظات متكامل.',
            hook: 'تخيل دخلت مكتبة، فتحت كتاب وقعدت تقرأ، ولما مشيت سبت باب المكتبة مفتوح وكتابك على الأرض! في البرمجة، نسيان إغلاق الملف بيستهلك ذاكرة الجهاز ويفضل حابس الملف! إزاي المبرمج المحترف بيخلي بايثون تقفل الباب وراه أوتوماتيك؟ بكلمة واحدة: with!',
            starterChallenge: {
              prompt: 'ما الميزة الأهم لاستخدام التركيب البرمجي `with open("notes.txt") as f:` في بايثون؟',
              options: [
                {
                  id: 'sc-auto-close',
                  text: 'إغلاق الملف تلقائيًا بمجرد الخروج من الكتلة حتى لو حصل خطأ',
                  isCorrect: true,
                  feedback: 'إجابة عبقرية! سياق with open بيضمن إغلاق الملف وتنظيف الذاكرة ذاتيًا بدون أي مخاطرة بنسيان f.close().',
                },
                {
                  id: 'sc-speed',
                  text: 'تسريع قراءة الملفات بعشرة أضعاف السرعة العادية',
                  isCorrect: false,
                  feedback: 'سياق with مصمم للأمان وإدارة الموارد (Resource Management) وضمان الإغلاق، وليس لتسريع المعالجة.',
                },
                {
                  id: 'sc-encrypt',
                  text: 'تشفير محتويات الملف بكلمة سر تمنع أي شخص من فتحه',
                  isCorrect: false,
                  feedback: 'سياق with لا يشفّر الملفات، بل يدير دورة حياتها ويغلقها بأمان عند الانتهاء.',
                },
              ],
              revealNote: 'القاعدة الذهبية: سياق with open هو أفضل ممارسة برمجية (Best Practice) لإدارة الملفات وتفادي تسريب الذاكرة.',
            },
          },
        },
      ],
    },
    {
      id: '11.3-c2',
      title: 'دورة حياة الملف النصي الآمنة',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '11.3-stepper',
          type: 'processStepper',
          data: {
            heading: 'الخطوات الثلاث للتعامل مع أي ملف نصي',
            steps: [
              {
                id: 'step-1',
                title: 'الفتح وتحديد النمط (Open & Mode)',
                detail: 'نحدد مسار الملف والغرض منه: قراءة \'r\'، أو كتابة \'w\'، أو إلحاق \'a\'. سياق with open يدمج هذه الخطوة مع الإغلاق التلقائي.',
              },
              {
                id: 'step-2',
                title: 'المعالجة والقراءة أو الكتابة (Process Data)',
                detail: 'استخدام read() أو readline() لاستخراج البيانات، أو write() لحفظ البيانات داخل كتلة المسافة البادئة.',
              },
              {
                id: 'step-3',
                title: 'الإغلاق وتحرير الموارد (Close & Cleanup)',
                detail: 'إغلاق الملف يحرر الذاكرة ويضمن حفظ البيانات على القرص؛ مع سياق with open يتم ذلك تلقائيًا فور الخروج من الكتلة!',
              },
            ],
          },
        },
      ],
    },
    {
      id: '11.3-c3',
      title: 'معمل بايثون: مشروع سجل ملاحظات ودرجات المتعلم',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '11.3-codelab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'معمل مشروع سجل درجات وملاحظات المتعلم',
            prompt: 'أكمل مكان `___` لحساب متوسط الدرجات بقسمة المجموع `total` على عدد المواد باستخدام الدالة المدمجة `len()`.',
            starterCode: 'scores = {"math": 95, "science": 90, "arabic": 85}\ntotal = sum(scores.values())\naverage = total / ___\nprint(f"Total: {total} | Average: {average:.1f}")',
            solutionCode: 'scores = {"math": 95, "science": 90, "arabic": 85}\ntotal = sum(scores.values())\naverage = total / len(scores)\nprint(f"Total: {total} | Average: {average:.1f}")',
            quickChips: ['len(scores)', 'count(scores)', '3', 'scores.length'],
            checks: [
              {
                id: 'chk-avg',
                label: 'حساب المجموع والمتوسط بنجاح',
                stdin: [],
                expectedOutputRegex: 'Total: 270 \\| Average: 90\\.0',
              },
            ],
            hint: 'دالة len(scores) تُرجع عدد المواد داخل القاموس لحساب المتوسط بدقة.',
            hints: [
              'الهدف: قسمة المجموع total على عدد المواد.',
              'استخدم دالة بايثون len() مع القاموس scores.',
              'استبدل ___ بـ len(scores).',
            ],
          },
        },
      ],
    },
    {
      id: '11.3-c4',
      title: 'خلاصة المحطة وقاعدتك الذهبية',
      role: 'summary',
      blocks: [
        {
          id: '11.3-summary',
          type: 'richText',
          data: {
            heading: 'حصاد المحطة الحادية عشرة: الملفات النصية في جيبك!',
            body: 'تهانينا يا صديقي! أصبحت الآن تتقن حفظ واسترجاع البيانات خارج ذاكرة البرنامج المؤقتة:\n\n• **القراءة الآمنة:** `with open("file.txt", "r") as f:` لقراءة النصوص دون قلق.\n• **الكتابة والإلحاق:** اختر `"w"` للمسح والبدء من جديد، أو `"a"` لإضافة السجلات في نهاية الملف.\n• **الإغلاق التلقائي:** سياق `with` هو أفضل صديق للمبرمج المحترف؛ يضمن عدم تسريب أي موارد في الذاكرة.',
          },
        },
      ],
    },
  ],
  summary: 'إدارة الملفات الاحترافية بسياق with open وتفادي تسريب موارد الذاكرة ومشروع سجل الملاحظات.',
  additionalSources: [
    {
      id: 'nb-11-3-summary',
      type: 'summary',
      title: 'ملخص سريع لسياق with open',
      content: 'سياق with open هو المعيار القياسي لإدارة دورة حياة الملفات وإغلاقها تلقائيًا.',
      bullets: [
        'يغلق الملف ذاتيًا بمجرد انتهاء الكتلة البرمجية.',
        'يحمي النظام من أخطاء تسريب الموارد (Resource Leaks).',
        'يضمن حفظ البيانات وتفريغها إلى القرص الصلب بأمان.',
      ],
    },
    {
      id: 'nb-11-3-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-11-3-1',
          question: 'هل أحتاج لكتابة f.close() داخل كتلة with open؟',
          answer: 'أبدًا! سياق with open صُمم خصيصًا ليقوم بهذه المهمة تلقائيًا نيابة عنك.',
        },
        {
          id: 'faq-11-3-2',
          question: 'لو حصل خطأ داخل كتلة with، هل الملف بيتقفل برضه؟',
          answer: 'نعم تمامًا! حتى لو حدث استثناء يوقف الكود، بايثون تضمن إغلاق الملف وتنظيف الذاكرة.',
        },
      ],
    },
    {
      id: 'nb-11-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'g113-1',
          termAr: 'مدير السياق',
          termEn: 'Context Manager (with)',
          definition: 'بنية برمجية تدير تخصيص الموارد وتحريرها تلقائيًا عند الانتهاء.',
        },
        {
          id: 'g113-2',
          termAr: 'تسريب الموارد',
          termEn: 'Resource Leak',
          definition: 'استهلاك غير مبرر للذاكرة ناتج عن إبقاء الملفات مفتوحة دون إغلاق.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 's113-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — تكنولوجيا المعلومات للصف الثالث الإعدادي',
      detail: 'الوحدة الثالثة: إدارة الموارد وسياق with open',
      pages: 'ص 28–32',
    },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-11',
    label: 'اختبار المحطة الحادية عشرة',
    description: 'تحدَّ معلوماتك في بنك أسئلة التعامل مع الملفات النصية في بايثون.',
  },
};
