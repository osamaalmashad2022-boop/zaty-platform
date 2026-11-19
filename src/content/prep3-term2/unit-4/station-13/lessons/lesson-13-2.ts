import type { LessonPack } from '@/types/curriculum';

export const LESSON_13_2: LessonPack = {
  id: '13.2',
  stationId: 'station-13',
  unitId: 'unit-4',
  order: 2,
  title: 'خطوات تجهيز النصوص: التقطيع (Tokenization) وإزالة الكلمات الشائعة (Stop Words)',
  subtitle: 'تعلم كيف ينظف الذكاء الاصطناعي النصوص ليتخلص من الزوائد ويركز على الكلمات ذات المعنى الحقيقي!',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: [
    'يشرح مفهوم التقطيع النصي (Tokenization) كتحويل للنص الخام إلى وحدات بنائية تسمى Tokens.',
    'يعرّف الكلمات الشائعة (Stop Words) وأهمية استبعادها لتسريع المعالجة والتركيز على جوهر المعنى.',
    'يطبق تصفية قائمة الكلمات في بايثون باستخدام معامل الاستبعاد not in.',
  ],
  cards: [
    {
      id: '13.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '13.2-hero',
          type: 'heroHook',
          data: {
            title: 'تنقية النصوص: التقطيع والكلمات الشائعة',
            durationMin: 8,
            stationLabel: 'المحطة ١٣ · الدرس ٢ من ٣',
            goal: 'تتقن تنظيف وتجهيز النصوص لتصبح جاهزة لموديل الذكاء الاصطناعي.',
            hook: 'لو عندك مقال طويل فيه ١٠٠٠ كلمة، هتلاقي أكتر من نصف الكلمات عبارة عن: «في، من، على، و، إلى»! هل الكلمات دي بتساعد الحاسوب يعرف هل المقال بيتكلم عن الطب ولا التكنولوجيا؟! بالتأكيد لأ! التخلص من هذه الزوائد هو سر كفاءة نماذج الذكاء الاصطناعي!',
            starterChallenge: {
              prompt: 'ما المصطلح الذي يُطلق على حروف الجر والروابط الشائعة التي لا تضيف معنى دلالي مميز في خوارزميات NLP؟',
              options: [
                {
                  id: 'sc-stopwords',
                  text: 'الكلمات الشائعة أو المستبعدة (Stop Words)',
                  isCorrect: true,
                  feedback: 'إجابة عبقرية! تُسمى Stop Words لأن خوارزميات الفهرسة والبحث تتوقف عندها وتتجاهلها لتركز على الكلمات المفتاحية الحقيقية.',
                },
                {
                  id: 'sc-tokens',
                  text: 'التوكنات المفردة (Tokens)',
                  isCorrect: false,
                  feedback: 'التوكن (Token) هو اسم كل كلمة أو وحدة بعد التقطيع، سواء كانت كلمة مهمة أو كلمة شائعة.',
                },
                {
                  id: 'sc-syntax',
                  text: 'أخطاء الصياغة (Syntax Errors)',
                  isCorrect: false,
                  feedback: 'هذه ليست أخطاء، بل كلمات طبيعية وصحيحة لغويًا لكنها وظيفية زائدة عن حاجة محركات التحليل.',
                },
              ],
              revealNote: 'القاعدة الذهبية: تجهيز النصوص في الذكاء الاصطناعي يتطلب تقطيع الجملة إلى Tokens، ثم إزالة الـ Stop Words غير المؤثرة.',
            },
          },
        },
      ],
    },
    {
      id: '13.2-c2',
      title: 'مراحل خط إنتاج تجهيز النصوص (NLP Pipeline)',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '13.2-stepper',
          type: 'processStepper',
          data: {
            heading: 'رحلة النص من كلام خام إلى بيانات ذكية (ص ٥٥–٥٨)',
            steps: [
              {
                id: 'p-clean',
                title: '١. التطهير والتوحيد (Normalization)',
                detail:
                  'تحويل كل الحروف إلى حالة صغيرة (Lowercase)، وإزالة علامات الترقيم والأرقام غير المفيدة، وحذف التشكيل والهمزات المشتتة.',
                code: 'text = text.lower()',
              },
              {
                id: 'p-token',
                title: '٢. التقطيع اللغوي (Tokenization)',
                detail:
                  'تقسيم الجملة إلى أجزاء دقيقة تسمى Tokens؛ كل كلمة أو مصطلح يصبح عنصرًا مستقلاً داخل قائمة.',
                code: 'tokens = ["الذكاء", "الاصطناعي", "مستقبل", "مبهر"]',
              },
              {
                id: 'p-stop',
                title: '٣. إزالة الكلمات الشائعة (Stop Words Removal)',
                detail:
                  'تصفية القائمة بحذف الكلمات المتكررة بلا فائدة (مثل: في، من، إلى، the, is, at)، مما يوفر مساحة الذاكرة ويسرع التحليل.',
                code: 'clean = [w for w in tokens if w not in stop_words]',
              },
            ],
          },
        },
      ],
    },
    {
      id: '13.2-c3',
      title: 'معمل بايثون: تصفية الكلمات الشائعة برمجياً',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '13.2-codelab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'معمل فلترة الكلمات الشائعة بـ not in',
            prompt: 'أكمل مكان `___` بالمعامل الشرطي المناسب لاستبعاد الكلمات الموجودة في قائمة `stop_words`.',
            starterCode: 'stop_words = ["in", "the", "and"]\nwords = ["ai", "is", "fun", "and", "smart"]\nclean_words = [w for w in words if w ___ stop_words]\nprint("Clean Words:", clean_words)',
            solutionCode: 'stop_words = ["in", "the", "and"]\nwords = ["ai", "is", "fun", "and", "smart"]\nclean_words = [w for w in words if w not in stop_words]\nprint("Clean Words:", clean_words)',
            quickChips: ['not in', 'in', '!=', 'is not'],
            checks: [
              {
                id: 'chk-filter',
                label: 'تنقية الكلمات وحذف and بنجاح',
                stdin: [],
                expectedOutputRegex: "Clean Words: \\['ai', 'is', 'fun', 'smart'\\]",
              },
            ],
            hint: 'للتحقق من أن العنصر غير موجود في القائمة، نستخدم معامل بايثون الشهير not in.',
            hints: [
              'الهدف: الاحتفاظ بالكلمات التي ليست داخل stop_words.',
              'استخدم المعامل not in.',
              'استبدل ___ بـ not in.',
            ],
          },
        },
      ],
    },
    {
      id: '13.2-c4',
      title: 'خلاصة الدرس وقاعدتك الذهبية',
      role: 'summary',
      blocks: [
        {
          id: '13.2-summary',
          type: 'richText',
          data: {
            heading: 'حصاد الدرس الثاني: تنقية الكلمات',
            body: 'عمل ممتاز يا صديقي! أصبحت خطوتك التالية في معالجة اللغات واضحة:\n\n• **التقطيع (Tokenization):** تقسيم النص إلى وحدات منفصلة (Tokens).\n• **الكلمات الشائعة (Stop Words):** كلمات وظيفية متكررة (مثل حروف الجر) نفضل استبعادها.\n• **الفلترة البرمجية:** استخدام `if word not in stop_words` يبقي فقط الكلمات الدلالية المفيدة.\n\nفي الدرس القادم، سنتعلم كيف نستخدم هذه الكلمات المنقاة في قياس آراء ومشاعر المتعلمين عبر تحليل المشاعر (Sentiment Analysis)!',
          },
        },
      ],
    },
  ],
  summary: 'مراحل معالجة النصوص في الذكاء الاصطناعي: التقطيع Tokenization وفلترة الكلمات الشائعة Stop Words.',
  sources: [
    {
      id: 's132-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — تكنولوجيا المعلومات للصف الثالث الإعدادي',
      detail: 'الوحدة الرابعة: الذكاء الاصطناعي التطبيقي والمستقبل الرقمي',
      pages: 'ص 55–59',
    },
  ],
  additionalSources: [
    {
      id: 'nb-13-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'خطوات تنقية وتجهيز النصوص للذكاء الاصطناعي.',
      bullets: [
        'التوحيد Normalization يزيل التشكيل وعلامات الترقيم ويوحد حالة الحروف.',
        'التقطيع Tokenization يحول السلسلة إلى مصفوفة كلمات Tokens.',
        'إزالة Stop Words تخفض حجم البيانات بنسبة تصل إلى 40% دون فقدان المعنى الأساسي.',
      ],
    },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '13.3',
    label: 'الدرس التالي: تحليل المشاعر (Sentiment Analysis) وتطبيقات الكشف الذكي',
  },
};
