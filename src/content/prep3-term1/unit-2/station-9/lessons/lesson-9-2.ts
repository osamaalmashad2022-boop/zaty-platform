import type { LessonPack } from '@/types/curriculum';

export const LESSON_9_2: LessonPack = {
  id: '9.2',
  stationId: 'station-9',
  unitId: 'unit-2',
  order: 2,
  title: 'مؤشرات الكشف البصري والصوتي وأدوات الفحص الآلي',
  subtitle: 'علامات تفضح الفيديو المزيف بالعين المجردة وأهم تطبيقات كشف Deepfake',
  durationMin: 8,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
  objectives: [
    'تحدّد العلامات الخمس لكشف الفيديو المزيف بالعين المجردة والأذن.',
    'تتعرّف أدوات الكشف المعتمدة على الذكاء الاصطناعي مثل Deepware Scanner و Sensity AI و Microsoft Video Authenticator.',
    'تميّز بين أدوات الكشف المتخصصة والتطبيقات المكتبية العادية.',
  ],
  cards: [
    {
      id: '9.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '9.2-hero',
          type: 'heroHook',
          data: {
            title: 'كن محققًا رقميًا: كيف تكشف Deepfake؟',
            durationMin: 8,
            stationLabel: 'المحطة ٩ · الدرس ٢ من ٣',
            goal: 'تميّز علامات التزييف بالعين وتعرف الأدوات المتخصصة لكشفه.',
            hook: 'زي ما الذكاء الاصطناعي بيتطور في التزييف، بيتطور كمان في كشف التزييف! وشوية ملاحظات دقيقة في العين والإضاءة وحركة الشفاه تقدر تفضح الخدعة قدامك في ثوانٍ.',
          },
        },
      ],
    },
    {
      id: '9.2-c2',
      title: 'علامات تكشف التزييف العميق بالعين والأذن (ص ٨٩)',
      role: 'concept',
      blocks: [
        {
          id: '9.2-signs',
          type: 'listBlock',
          data: {
            heading: '٥ علامات فحص بصري وصوتي تفضح الفيديو المزيف:',
            mode: 'numbered',
            items: [
              { id: 'sg1', text: '**حركة العين والرمش:** الشخصيات في الفيديوهات المزيفة كثيرًا ما لا ترمش بشكل طبيعي أو ترمش ببطء شديد.' },
              { id: 'sg2', text: '**إضاءة الوجه غير متناسقة:** قد تلاحظ أن الظلال والإضاءة على الوجه لا تتناسب مع إضاءة الغرفة أو الخلفية.' },
              { id: 'sg3', text: '**عدم تطابق الصوت مع حركة الشفاه (`Lip-syncing`):** الكلمات المسموعة لا تتطابق بدقة مع حركة الفم.' },
              { id: 'sg4', text: '**تشوهات وضبابية حول حواف الوجه:** تظهر خاصة أثناء الالتفات أو الحركة السريعة.' },
              { id: 'sg5', text: '**خلفية غير واضحة أو مشوهة:** تشوّش أو تموّج غريب في الخلفية حول الرأس.' },
            ],
          },
        },
      ],
    },
    {
      id: '9.2-c3',
      title: 'أدوات وتطبيقات كشف التزييف العميق (ص ٨٩)',
      role: 'concept',
      blocks: [
        {
          id: '9.2-tools-table',
          type: 'tableBlock',
          data: {
            heading: 'أشهر أدوات الفحص الآلي (تعمل بالذكاء الاصطناعي)',
            headers: ['الأداة / التطبيق', 'آلية العمل'],
            rows: [
              ['Deepware Scanner', 'أداة تفحص الفيديوهات بالذكاء الاصطناعي لاكتشاف التلاعب والتغييرات غير الطبيعية.'],
              ['Sensity AI', 'منصة متخصصة في رصد وكشف الصور والفيديوهات المزيفة بالذكاء الاصطناعي.'],
              ['Microsoft Video Authenticator', 'أداة من مايكروسوفت تحلل الفيديو والصورة وتكتشف علامات التزييف غير المرئية للعين.'],
              ['Hive Moderation & InVID', 'أدوات إضافية للتحقق من مصداقية الفيديوهات والوسائط الرقمية.'],
            ],
          },
        },
      ],
    },
    {
      id: '9.2-c4',
      title: 'جرّب بنفسك: مختبر التحري عن التزييف العميق',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '9.2-sort',
          type: 'sortingBuckets',
          data: {
            prompt: 'وزّع كل ملاحظة أو أداة على الفئة الصحيحة في مختبر الفحص:',
            buckets: [
              { id: 'fake-clue', label: 'مؤشر تزييف أو أداة كشف Deepfake', description: 'علامة شك أو أداة فحص AI' },
              { id: 'normal-other', label: 'مؤشر طبيعي أو برنامج غير مخصص للكشف', description: 'سلوك سليم أو تطبيق عادي' },
            ],
            items: [
              { id: 'd1', text: 'الشخص في الفيديو لا يرمش أو يرمش ببطء شديد', bucketId: 'fake-clue' },
              { id: 'd2', text: 'إضاءة وظلال الوجه لا تتطابق مع إضاءة الخلفية', bucketId: 'fake-clue' },
              { id: 'd3', text: 'أداة Deepware Scanner و Sensity AI', bucketId: 'fake-clue' },
              { id: 'd4', text: 'تطابق تام بين الصوت وحركة الشفاه وإضاءة متناسقة', bucketId: 'normal-other' },
              { id: 'd5', text: 'برنامج Microsoft Word أو Paint أو Excel', bucketId: 'normal-other' },
              { id: 'd6', text: 'ضبابية حول حواف الوجه أثناء الحركة السريعة', bucketId: 'fake-clue' },
            ],
            feedback: {
              correct: 'عاش يا محقق! عرفت الأدلة البصرية وأدوات الفحص المتخصصة بدقة.',
              incorrect: 'تذكّر علامات التزييف: بطء الرمش، عدم تطابق الشفاه، اختلاف الإضاءة، وضبابية الحواف، وأدوات Deepware / Sensity / Microsoft Video Authenticator.',
            },
          },
        },
        {
          id: '9.2-match',
          type: 'matchingPairs',
          data: {
            prompt: 'وصّل كل أداة أو علامة كشف بما يناسبها:',
            pairs: [
              { id: 'm1', left: 'خلل تزامن الشفاه', right: 'الصوت لا يتطابق بدقة مع حركة الفم' },
              { id: 'm2', left: 'عدم اتساق الإضاءة', right: 'ظلال الوجه تختلف عن إضاءة الغرفة والخلفية' },
              { id: 'm3', left: 'Deepware / Sensity / Video Authenticator', right: 'أدوات تحلل الفيديو بالذكاء الاصطناعي لكشف التغييرات غير الطبيعية' },
              { id: 'm4', left: 'تشوهات الحركة', right: 'ضبابية حول حواف الوجه عند الالتفات' },
            ],
            feedback: {
              correct: 'ممتاز! عينك بقت درع كشف ضد الفيديوهات المفبركة.',
              incorrect: 'راجع القائمة الخمسة لعلامات الكشف وأدوات الذكاء الاصطناعي المتخصصة.',
            },
          },
        },
      ],
    },
    {
      id: '9.2-c5',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '9.2-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'أدوات كشف التزييف بتستخدم الذكاء الاصطناعي هي كمان!',
            body: '• أدوات مثل **`Deepware Scanner`** و **`Sensity AI`** و **`Microsoft Video Authenticator`** بتعتمد على **الذكاء الاصطناعي** لتحليل الفيديو واكتشاف التغييرات غير الطبيعية.\n• أما برامج زي `Word` و `Excel` و `Photoshop` و `Paint` فهي مش أدوات كشف تزييف عميق.',
          },
        },
      ],
    },
    {
      id: '9.2-c6',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '9.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'أي من العلامات التالية قد تشير إلى أن الفيديو مزيف (Deepfake)؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٩٣ (س٧–س٩)',
            options: [
              { id: 'a', text: 'حركة عين ورمش طبيعية جدًا', isCorrect: false, feedback: 'دي علامة طبيعية.' },
              { id: 'b', text: 'إضاءة الوجه متناسقة تمامًا مع الغرفة', isCorrect: false, feedback: 'دي علامة طبيعية.' },
              { id: 'c', text: 'الصوت لا يتطابق مع حركة الشفاه أو الشخص لا يرمش بشكل طبيعي', isCorrect: true, feedback: 'صح! اختلال حركة الشفاه والرمش من أوضح علامات التزييف.' },
              { id: 'd', text: 'وضوح الخلفية وتطابق الصوت', isCorrect: false, feedback: 'دي خصائص الفيديو السليم.' },
            ],
            explanation: 'من مؤشرات التزييف العميق: عدم تطابق الصوت والشفاه، بطء أو غياب الرمش، واختلاف الإضاءة وضبابية الحواف.',
          },
        },
        {
          id: '9.2-q2',
          type: 'quizQuestion',
          data: {
            question: 'أي من الأدوات التالية تُستخدم لكشف التزييف العميق؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٩٤ (س١١–س١٣)',
            options: [
              { id: 'a', text: 'Microsoft Excel', isCorrect: false, feedback: 'Excel للجداول الحسابية.' },
              { id: 'b', text: 'Deepware Scanner و Sensity AI و Microsoft Video Authenticator', isCorrect: true, feedback: 'ممتاز! كلها أدوات كشف تزييف عميق مذكورة بالكتاب.' },
              { id: 'c', text: 'Google Maps', isCorrect: false, feedback: 'للملاحة والخرائط.' },
              { id: 'd', text: 'Notepad', isCorrect: false, feedback: 'محرر نصوص بسيط.' },
            ],
            explanation: 'من أدوات الكشف في المنهج: Deepware Scanner، Sensity AI، Hive Moderation، InVID، و Microsoft Video Authenticator.',
          },
        },
        {
          id: '9.2-q3',
          type: 'quizQuestion',
          data: {
            question: 'كيف تعمل أدوات كشف التزييف العميق؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٩٤ (س١٤)',
            options: [
              { id: 'a', text: 'بحذف الفيديو مباشرة دون فحص', isCorrect: false, feedback: 'لا تحذفه تلقائيًا، بل تفحصه.' },
              { id: 'b', text: 'بتحليل الفيديو أو الصورة واكتشاف التغييرات غير الطبيعية باستخدام الذكاء الاصطناعي', isCorrect: true, feedback: 'صح! تحلل الأدوات الفيديوهات عبر AI لرصد التلاعبات الدقيقة.' },
              { id: 'c', text: 'بتشفير الملف فقط', isCorrect: false, feedback: 'غير صحيح.' },
              { id: 'd', text: 'بتسريع سرعة الإنترنت', isCorrect: false, feedback: 'غير صحيح.' },
            ],
            explanation: 'تستخدم أدوات الكشف الذكاء الاصطناعي لتحليل الإطارات والصوت وكشف التغييرات غير الطبيعية.',
          },
        },
      ],
    },
    {
      id: '9.2-c7',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '9.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'نقدر نكشف التزييف العميق بمتابعة ٥ علامات بالعين والأذن (الرمش، إضاءة الوجه، تطابق الصوت والشفاه، تشوهات الحواف، والخلفية)، وبالاستعانة بأدوات ذكاء اصطناعي متخصصة زي **`Deepware Scanner`** و **`Sensity AI`** و **`Microsoft Video Authenticator`**. في الدرس الأخير هنعرف مخاطر التزييف ومسؤوليتنا الأخلاقية كمواطنين رقميين واعيين!',
          },
        },
      ],
    },
  ],
  summary: 'علامات كشف التزييف العميق بصريًا وصوتيًا وأبرز أدوات الكشف الآلي المعتمدة على الذكاء الاصطناعي.',
  additionalSources: [
    {
      id: 'nb-9-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'الجمع بين الملاحظة البشرية وأدوات الكشف الذكية يعطي أعلى حماية من خدع التزييف العميق.',
      bullets: [
        'علامات بصرية: بطء/غياب الرمش، إضاءة غير متناسقة، ضبابية حواف الوجه، خلفية مشوهة.',
        'علامة صوتية بصرية: عدم تطابق الصوت مع حركة الشفاه.',
        'أدوات كشف: Deepware Scanner، Sensity AI، Hive Moderation، InVID، Microsoft Video Authenticator.',
      ],
    },
    {
      id: 'nb-9-2-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-9-2-1',
          question: 'إيه أكتر مكان أركز عليه لو شكّيت في فيديو؟',
          answer: 'ركّز على العينين (هل بيرمش طبيعي؟)، وحركة الشفاه مع الصوت، وحواف الوش وقت ما الشخص يلتفت بسرعة، وكمان الظلال والإضاءة.',
        },
        {
          id: 'faq-9-2-2',
          question: 'هل أدوات كشف التزييف العميق بتستخدم الذكاء الاصطناعي برضه؟',
          answer: 'أيوه! زي ما التزييف بيتعمل بالـ AI، أدوات الكشف زي Deepware و Sensity AI بتستخدم الذكاء الاصطناعي لتحليل التغييرات الدقيقة اللي ممكن تفوت على العين.',
        },
      ],
    },
    {
      id: 'nb-9-2-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-9-2',
        label: 'كشف التزييف العميق',
        children: [
          {
            id: 'mm-9-2-eye',
            label: 'الفحص بالعين والأذن',
            children: [
              { id: 'mm-9-2-e1', label: 'رمش العين وإضاءة الوجه' },
              { id: 'mm-9-2-e2', label: 'تزامن الصوت والشفاه' },
              { id: 'mm-9-2-e3', label: 'حواف الوجه والخلفية' },
            ],
          },
          {
            id: 'mm-9-2-tools',
            label: 'أدوات الكشف بالـ AI',
            children: [
              { id: 'mm-9-2-t1', label: 'Deepware Scanner' },
              { id: 'mm-9-2-t2', label: 'Sensity AI & Hive Moderation' },
              { id: 'mm-9-2-t3', label: 'Microsoft Video Authenticator & InVID' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-9-2-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g92-1', termAr: 'تزامن الشفاه', termEn: 'Lip-syncing', definition: 'تطابق حركة الفم والشفاه مع الصوت المسموع؛ واختلاله علامة قوية على التزييف.' },
        { id: 'g92-2', termAr: 'ماسح ديب وير', termEn: 'Deepware Scanner', definition: 'أداة ذكاء اصطناعي لفحص الفيديوهات واكتشاف التزييف العميق.' },
        { id: 'g92-3', termAr: 'مصدّق الفيديو من مايكروسوفت', termEn: 'Microsoft Video Authenticator', definition: 'أداة ذكاء اصطناعي تحلل الصور والفيديوهات لرصد التغييرات غير الطبيعية.' },
      ],
    },
  ],
  sources: [
    { id: 's92-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'مؤشرات وأدوات كشف التزييف العميق', pages: 'ص 89 و 91–94' },
    { id: 's92-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٩.٢', detail: 'قائمة الفحص البصري الخمس وأدوات الكشف الآلي' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '9.3',
    label: 'الدرس الجاي: المخاطر ومسؤولية المواطن الرقمي',
    description: 'اتعلّم إزاي تواجه التضليل وتحمي نفسك والمجتمع وتختم الترم الأول!',
  },
};
