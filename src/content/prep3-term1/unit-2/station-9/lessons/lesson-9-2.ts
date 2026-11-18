import type { LessonPack } from '@/types/curriculum';

export const LESSON_9_2: LessonPack = {
  id: '9.2',
  stationId: 'station-9',
  unitId: 'unit-2',
  order: 2,
  title: 'مؤشرات الكشف البصري والصوتي وأدوات الفحص الآلي',
  subtitle: 'علامات تفضح الفيديو المزيف بالعين المجردة وأهم تطبيقات كشف Deepfake',
  durationMin: 8,
  contentVersion: 3,
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
      requireInteraction: true,
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
            starterChallenge: {
              prompt:
                'تحدّي البداية: شكّيت في فيديو لحد مشهور على السوشيال ميديا — أول حاجة تبص عليها بعينك وودنك إيه؟',
              options: [
                {
                  id: 'hd',
                  text: 'جودة الفيديو العالية HD وارتفاع الصوت',
                  isCorrect: false,
                  feedback:
                    'أدوات التزييف الحديثة تنتج فيديوهات بدقة HD وصوت مرتفع؛ جودة الدقة وحدها لا تثبت الصدق.',
                },
                {
                  id: 'forensics',
                  text: 'رمش العين، ظل وإضاءة الوجه، تزامن الشفاه، وحواف الشعر والوجه',
                  isCorrect: true,
                  feedback:
                    'عين محقق! هذه المؤشرات البصرية والصوتية هي أسرع علامات تكشف التزييف بالعين المجردة.',
                },
                {
                  id: 'office',
                  text: 'فتح المقطع في برنامج Word أو Paint لعد الإطارات',
                  isCorrect: false,
                  feedback:
                    'Word وPaint برامج مكتبية ورسم عادية، ولا تمتلك أدوات ذكاء اصطناعي لفحص الفيديوهات.',
                },
              ],
              revealNote:
                'يلا ندخل منشور الفيديو المشبوه ونصطاد علامات التزييف بالعدسة المكبرة!',
            },
          },
        },
      ],
    },
    {
      id: '9.2-c2',
      title: 'مختبر التحري: اصطد علامات التزييف في المنشور (ص ٨٩)',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '9.2-trap-sim',
          type: 'interactiveSim',
          data: {
            mode: 'trapDetector',
            scene: 'newsPost',
            title: 'فحص مقطع فيديو متداول بالعين والأذن',
            prompt:
              'افحص تفاصيل المنشور التالي بالعرض البطيء، واضغط على الـ ٤ أدلة التي تفضح التزييف العميق وميّزها عن العناصر السليمة:',
            cardTitle: 'خبر عاجل: تصريح متداول لشخصية معروفة',
            cardSubtitle: 'فيديو منشور · ٠:٢٤',
            cardBody:
              'أمامك ٦ ملاحظات ظهرَت أثناء تشغيل المقطع — اكشف علامات التزييف الأربع:',
            items: [
              {
                id: 'clue-blink',
                label: 'العين لا ترمش إطلاقًا طوال ٢٠ ثانية (أو ترمش ببطء شديد)',
                detail: 'ثبات غير طبيعي في الجفون عند النظر للكاميرا',
                isTrap: true,
                trapTag: 'خلل الرمش',
                clueAr:
                  'مؤشر كشف ١: الشخصيات في الفيديوهات المزيفة كثيرًا ما لا ترمش بشكل طبيعي أو ترمش ببطء شديد.',
              },
              {
                id: 'clue-light',
                label: 'إضاءة الوجه ساطعة بينما ظل الرقبة والغرفة داكن جدًا',
                detail: 'تناقض واضح بين إضاءة الوجه وإضاءة الخلفية',
                isTrap: true,
                trapTag: 'تناقض الإضاءة',
                clueAr:
                  'مؤشر كشف ٢: عدم اتساق الظلال وإضاءة الوجه مع إضاءة الغرفة أو الخلفية يكشف تركيب الوجه.',
              },
              {
                id: 'safe-hd',
                label: 'الفيديو منشور بدقة HD 1080p واضحة',
                detail: 'دقة العرض عالية وليست علامة تزييف في حد ذاتها',
                isTrap: false,
                clueAr:
                  'ملاحظة طبيعية: جودة HD لا تثبت التزييف ولا تنفيه، لأن التزييف العميق قد يُنشر بدقة عالية أيضًا.',
              },
              {
                id: 'clue-lip',
                label: 'تأخر أو عدم تطابق الصوت مع حركة الشفاه (`Lip-sync lag`)',
                detail: 'الكلمات المسموعة لا تنطبق بدقة مع إغلاق الفم',
                isTrap: true,
                trapTag: 'عدم تطابق الشفاه',
                clueAr:
                  'مؤشر كشف ٣: عدم تطابق الصوت مع حركة الشفاه (`Lip-syncing`) من أوضح دلائل التزييف.',
              },
              {
                id: 'clue-blur',
                label: 'ضبابية وتموّج حول حواف الشعر والوجه والخلفية عند الالتفات',
                detail: 'تشوّهات رقمية تظهر مع الحركة السريعة للرأس',
                isTrap: true,
                trapTag: 'ضبابية الحواف',
                clueAr:
                  'مؤشر كشف ٤ و ٥: تشوهات وضبابية حول حواف الوجه وتموّج الخلفية أثناء الحركة السريعة تفضح التلاعب.',
              },
              {
                id: 'safe-deepware',
                label: 'إرسال الرابط للفحص عبر أداة `Deepware Scanner`',
                detail: 'إجراء تحقق رقمي يعتمد على الذكاء الاصطناعي',
                isTrap: false,
                clueAr:
                  'خطوة فحص سليمة وآمنة! أدوات مثل `Deepware Scanner` تحلل الفيديو آليًا للتحقق من مصداقيته.',
              },
            ],
            completionNote:
              'محقق محترف! كشفت علامات الفحص البصري والصوتي الأربع بنجاح.',
          },
        },
      ],
    },
    {
      id: '9.2-c3',
      title: 'أدوات كشف AI مقابل البرامج العادية (ص ٨٩)',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '9.2-tools-tabs',
          type: 'comparisonTabs',
          data: {
            heading: 'أي البرامج يكشف التزييف العميق؟ استكشف التبويبين',
            instruction:
              'اضغط على التبويبين لتقارن بين أدوات الكشف بالذكاء الاصطناعي والبرامج العادية.',
            tabs: [
              {
                id: 'ai-tools',
                label: 'أدوات كشف بالذكاء الاصطناعي',
                badge: 'مخصصة لكشف Deepfake',
                tone: 'emerald',
                body: 'تعمل هذه الأدوات **بالذكاء الاصطناعي** نفسه لتحليل الفيديو والصورة ورصد التغييرات غير الطبيعية التي لا تراها العين:',
                bullets: [
                  '**`Deepware Scanner`**: يفحص الفيديوهات بالذكاء الاصطناعي لاكتشاف التلاعب.',
                  '**`Sensity AI`**: منصة متخصصة في رصد وكشف الصور والفيديوهات المزيفة.',
                  '**`Microsoft Video Authenticator`**: أداة من مايكروسوفت تحلل الفيديو والصورة وتكشف علامات التزييف الخفية.',
                  '**`Hive Moderation` & `InVID`**: أدوات مساعدة للتحقق من مصداقية الوسائط الرقمية.',
                ],
              },
              {
                id: 'regular-tools',
                label: 'برامج عادية (ليست للكشف)',
                badge: 'انتبه لفخ الامتحان',
                tone: 'coral',
                body: 'انتبه في أسئلة الاختيارات! البرامج المكتبية والتصميمية العادية لا تكتشف التزييف العميق:',
                bullets: [
                  '**`Microsoft Word` & `Notepad`**: لمعالجة وكتابة النصوص، لا لفحص الفيديو.',
                  '**`Microsoft Excel` & `PowerPoint`**: للجداول الحسابية والعروض التقديمية.',
                  '**`Paint` & `Photoshop` & `Google Maps` & `Calculator`**: للرسم أو الخرائط أو الحساب، وليست أدوات كشف Deepfake.',
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: '9.2-c4',
      title: 'نقطة تحقق: آلية عمل أدوات الكشف',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '9.2-q1',
          type: 'quizQuestion',
          data: {
            question:
              'كيف تعمل أدوات كشف التزييف العميق مثل Deepware Scanner و Sensity AI و Microsoft Video Authenticator؟',
            multiple: false,
            scored: false,
            sourceTag: 'نقطة تحقق · كتاب الوزارة ص ٩٤ (س١٣–س١٤)',
            options: [
              {
                id: 'a',
                text: 'بتحليل الفيديو أو الصورة بالذكاء الاصطناعي لاكتشاف التغييرات غير الطبيعية',
                isCorrect: true,
                feedback:
                  'صح! تعتمد أدوات الكشف نفسها على الذكاء الاصطناعي لفحص الإطارات ورصد التغييرات الدقيقة.',
              },
              {
                id: 'b',
                text: 'بحذف الفيديو من الجهاز مباشرة بمجرد تشغيله بدون أي تحليل',
                isCorrect: false,
                feedback:
                  'الأدوات تفحص الفيديو وتُظهر نتيجة التحليل للمستخدم ولا تحذف الملفات تلقائيًا بدون فحص.',
              },
              {
                id: 'c',
                text: 'بالعمل يدويًا بدون استخدام الذكاء الاصطناعي لأن الـ AI للتزييف فقط',
                isCorrect: false,
                feedback:
                  'فخ شائع! الذكاء الاصطناعي يُستخدم في الطرفين: في صناعة Deepfake وأيضًا في أدوات كشفه بدقة.',
              },
              {
                id: 'd',
                text: 'بتشفير الملف وتسريع الإنترنت لرفع وضوح الصورة',
                isCorrect: false,
                feedback:
                  'التشفير وتسريع الإنترنت لا يميزان الحقيقي من المزيف؛ المطلوب تحليل البكسلات والإضاءة بالـ AI.',
              },
            ],
            explanation:
              'تعتمد أدوات الكشف المتخصصة على الذكاء الاصطناعي لتحليل الفيديو والصورة واكتشاف التغييرات غير الطبيعية.',
          },
        },
      ],
    },
    {
      id: '9.2-c5',
      title: 'جرّب بنفسك: فرز أدلة الفحص وأدواته',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '9.2-sort',
          type: 'sortingBuckets',
          data: {
            prompt:
              'وزّع كل ملاحظة أو أداة على الفئة الصحيحة في مختبر الفحص:',
            buckets: [
              {
                id: 'fake-clue',
                label: 'مؤشر تزييف أو أداة كشف Deepfake',
                description: 'علامة شك أو أداة فحص AI',
              },
              {
                id: 'normal-other',
                label: 'مؤشر طبيعي أو برنامج غير مخصص للكشف',
                description: 'سلوك سليم أو تطبيق عادي',
              },
            ],
            items: [
              {
                id: 'd1',
                text: 'الشخص في الفيديو لا يرمش أو يرمش ببطء شديد',
                bucketId: 'fake-clue',
              },
              {
                id: 'd2',
                text: 'إضاءة وظلال الوجه لا تتطابق مع إضاءة الخلفية',
                bucketId: 'fake-clue',
              },
              {
                id: 'd3',
                text: 'أداة Deepware Scanner و Sensity AI',
                bucketId: 'fake-clue',
              },
              {
                id: 'd4',
                text: 'تطابق تام بين الصوت وحركة الشفاه وإضاءة متناسقة',
                bucketId: 'normal-other',
              },
              {
                id: 'd5',
                text: 'برنامج Microsoft Word أو Paint أو Excel',
                bucketId: 'normal-other',
              },
              {
                id: 'd6',
                text: 'ضبابية حول حواف الوجه أثناء الحركة السريعة',
                bucketId: 'fake-clue',
              },
            ],
            feedback: {
              correct:
                'عاش يا محقق! عرفت الأدلة البصرية وأدوات الفحص المتخصصة بدقة.',
              incorrect:
                'راجع المعيارين: بطء الرمش واختلاف الإضاءة وضبابية الحواف مع Deepware وSensity AI تخص كشف التزييف، بينما Word وPaint وExcel برامج عادية.',
            },
          },
        },
      ],
    },
    {
      id: '9.2-c6',
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
      id: '9.2-c7',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '9.2-q2',
          type: 'quizQuestion',
          data: {
            question:
              'فحص زميلك فيديو متداولًا ولاحظ أن المتحدث يرمش طبيعيًا لكن إضاءة وجهه لا تتناسق مع ظلال الغرفة وصوته يسبق حركة الشفاه — ما الإجراء الأدق الآن؟',
            multiple: false,
            scored: false,
            sourceTag: 'تحقق ختامي · تطبيق على ص ٩٣–٩٤',
            options: [
              {
                id: 'a',
                text: 'المقطع مشتبه به بقوة، ويفحصه بأداة متخصصة مثل Microsoft Video Authenticator أو Deepware Scanner',
                isCorrect: true,
                feedback:
                  'ممتاز! عدم اتساق الإضاءة وخلل الشفاه مؤشران قويان للتزييف حتى لو كان الرمش طبيعيًا، والأداة الذكية تؤكد الفحص.',
              },
              {
                id: 'b',
                text: 'المقطع سليم تمامًا لأن الرمش الطبيعي يكفي لنفي وجود Deepfake',
                isCorrect: false,
                feedback:
                  'تطور التقنية قد يُصلح الرمش أحيانًا؛ وجود تناقض في الإضاءة أو تزامن الشفاه يكفي للشك والفحص.',
              },
              {
                id: 'c',
                text: 'يفتح الفيديو في برنامج Excel أو Google Maps لاختبار تطابق الإضاءة',
                isCorrect: false,
                feedback:
                  'Excel للجداول وGoogle Maps للخرائط؛ كشف التزييف يتطلب أدوات AI مثل Sensity AI أو Deepware Scanner.',
              },
              {
                id: 'd',
                text: 'ينشر الفيديو فورًا لأن دقته العالية تمنع وجود أي تلاعب رقمي',
                isCorrect: false,
                feedback:
                  'الدقة العالية لا تمنع التزييف، ومشاركة مقطع يحمل علامات خلل في الشفاه والإضاءة ينشر التضليل.',
              },
            ],
            explanation:
              'يكفي ظهور مؤشرات مثل عدم تطابق الصوت والشفاه أو تناقض الإضاءة للشك في الفيديو وفحصه بأدوات AI مثل Deepware Scanner وSensity AI وMicrosoft Video Authenticator.',
          },
        },
      ],
    },
    {
      id: '9.2-c8',
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
  summary:
    'علامات كشف التزييف العميق بصريًا وصوتيًا وأبرز أدوات الكشف الآلي المعتمدة على الذكاء الاصطناعي.',
  additionalSources: [
    {
      id: 'nb-9-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content:
        'الجمع بين الملاحظة البشرية وأدوات الكشف الذكية يعطي أعلى حماية من خدع التزييف العميق.',
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
          answer:
            'ركّز على العينين (هل بيرمش طبيعي؟)، وحركة الشفاه مع الصوت، وحواف الوش وقت ما الشخص يلتفت بسرعة، وكمان الظلال والإضاءة.',
        },
        {
          id: 'faq-9-2-2',
          question: 'هل أدوات كشف التزييف العميق بتستخدم الذكاء الاصطناعي برضه؟',
          answer:
            'أيوه! زي ما التزييف بيتعمل بالـ AI، أدوات الكشف زي Deepware و Sensity AI بتستخدم الذكاء الاصطناعي لتحليل التغييرات الدقيقة اللي ممكن تفوت على العين.',
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
              {
                id: 'mm-9-2-t3',
                label: 'Microsoft Video Authenticator & InVID',
              },
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
        {
          id: 'g92-1',
          termAr: 'تزامن الشفاه',
          termEn: 'Lip-syncing',
          definition:
            'تطابق حركة الفم والشفاه مع الصوت المسموع؛ واختلاله علامة قوية على التزييف.',
        },
        {
          id: 'g92-2',
          termAr: 'ماسح ديب وير',
          termEn: 'Deepware Scanner',
          definition:
            'أداة ذكاء اصطناعي لفحص الفيديوهات واكتشاف التزييف العميق.',
        },
        {
          id: 'g92-3',
          termAr: 'مصدّق الفيديو من مايكروسوفت',
          termEn: 'Microsoft Video Authenticator',
          definition:
            'أداة ذكاء اصطناعي تحلل الصور والفيديوهات لرصد التغييرات غير الطبيعية.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 's92-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي',
      detail: 'مؤشرات وأدوات كشف التزييف العميق',
      pages: 'ص 89 و 91–94',
    },
    {
      id: 's92-nb',
      kind: 'notebooklm',
      label: 'مصادر NotebookLM للدرس ٩.٢',
      detail: 'قائمة الفحص البصري الخمس وأدوات الكشف الآلي',
    },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '9.3',
    label: 'الدرس الجاي: المخاطر ومسؤولية المواطن الرقمي',
    description:
      'اتعلّم إزاي تواجه التضليل وتحمي نفسك والمجتمع وتختم الترم الأول!',
  },
};
