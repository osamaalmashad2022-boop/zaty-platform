import type { LessonPack } from '@/types/curriculum';

export const LESSON_8_2: LessonPack = {
  id: '8.2',
  stationId: 'station-8',
  unitId: 'unit-2',
  order: 2,
  title: 'ضوابط الحماية العالمية وأدوات الرقابة والتوازن الرقمي',
  subtitle: 'إزاي تدير وقتك الرقمي بأدوات ذكية وأنشطة بديلة ممتعة؟',
  durationMin: 8,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
  objectives: [
    'تذكر الإجراءات العالمية الخمسة للحد من التأثير السلبي للألعاب لمن هم دون ١٨ سنة.',
    'توضّح دور أدوات الرقابة الأبوية مثل Google Family Link و Apple Screen Time في إدارة الوقت.',
    'تقترح أنشطة بديلة واقعية ودور الأسرة في التوازن النفسي والاجتماعي.',
  ],
  cards: [
    {
      id: '8.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '8.2-hero',
          type: 'heroHook',
          data: {
            title: 'درع التوازن الرقمي والحماية السيبرانية',
            durationMin: 8,
            stationLabel: 'المحطة ٨ · الدرس ٢ من ٢',
            goal: 'تطبّق ضوابط وقت اللعب العالمية وتستخدم أدوات التنظيم الرقمي والبدائل الإيجابية.',
            hook: 'بما إننا ما نقدرش نمنع التكنولوجيا أو نتجاهلها تمامًا في حياتنا، فالحل الذكي مش الحرمان — الحل هو «الإدارة والسيطرة» على وقت اللعب!',
            image: '/media/robot-shield.png',
          },
        },
      ],
    },
    {
      id: '8.2-c2',
      title: 'الإجراءات العالمية للحد من التأثير السلبي (ص ٨٤)',
      role: 'concept',
      blocks: [
        {
          id: '8.2-global-list',
          type: 'listBlock',
          data: {
            heading: '٥ ضوابط عالمية لحماية من هم دون ١٨ سنة:',
            mode: 'numbered',
            items: [
              { id: 'g1', text: '**تحديد وقت اللعب:** ساعة واحدة فقط في عطلة نهاية الأسبوع، وبحد أقصى **٣ ساعات أسبوعيًا**.' },
              { id: 'g2', text: '**منع اللعب في المدرسة:** عدم ممارسة الألعاب الإلكترونية نهائيًا في المدرسة أو خارج الأوقات المحددة.' },
              { id: 'g3', text: '**حظر صناديق الغنائم (`Loot Boxes`):** منعها في الألعاب الموجهة للأطفال والمراهقين.' },
              { id: 'g4', text: '**منع الحيل النفسية الضارة:** حظر الألعاب التي تعتمد على `Dark Patterns` المضرّة بالصحة العامة.' },
              { id: 'g5', text: '**منع الدفع مقابل الفوز (`Pay-to-Win`):** حماية الصغار من الاستغلال المالي.' },
            ],
          },
        },
      ],
    },
    {
      id: '8.2-c3',
      title: 'دور الأسرة وأدوات الرقابة الأبوية والأنشطة البديلة',
      role: 'concept',
      blocks: [
        {
          id: '8.2-family-stepper',
          type: 'processStepper',
          data: {
            heading: 'الأسرة هي جدار الحماية الأول — إزاي بتحصل الإدارة الذكية؟ (ص ٨٤–٨٥)',
            steps: [
              {
                id: 'f1',
                title: '١. الاتفاق على وقت محدد للعب',
                detail: 'وضع جدول واضح ومتفق عليه للوقت اليومي والأسبوعي بعيدًا عن المذاكرة والنوم.',
              },
              {
                id: 'f2',
                title: '٢. أدوات الرقابة الأبوية (Google Family Link & Apple Screen Time)',
                detail: 'تطبيقات رسمية بتحدد وقت الاستخدام وتفصل اللعبة تلقائيًا عند انتهاء الوقت المحدد وتراقب المحتوى.',
              },
              {
                id: 'f3',
                title: '٣. مشاركة الأهل في اللعب',
                detail: 'لعب الوالدين مع الأبناء أحيانًا بيبني لغة حوار مشتركة وبيخلّيهم يفهموا المحتوى ويراقبوه بشكل غير مباشر.',
              },
              {
                id: 'f4',
                title: '٤. التوعية بالحيل وتشجيع الأنشطة البديلة',
                detail: 'توعية الأبناء بحيل `FOMO` و `Loot Boxes`، وتشجيع بدائل ممتعة زي الرياضة، الرسم، القراءة، والابتكار.',
              },
            ],
          },
        },
      ],
    },
    {
      id: '8.2-c4',
      title: 'جرّب بنفسك: وصّل أدوات الحماية وصنّف العادات الرقمية',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '8.2-match',
          type: 'matchingPairs',
          data: {
            prompt: 'وصّل كل أداة أو إجراء حماية بدوره الصحيح:',
            pairs: [
              { id: 'm1', left: 'Google Family Link و Apple Screen Time', right: 'فصل اللعبة تلقائيًا عند انتهاء الوقت المحدد ومراقبة المحتوى' },
              { id: 'm2', left: 'الضوابط الزمنية العالمية دون ١٨ سنة', right: 'ساعة في العطلة وبحد أقصى ٣ ساعات أسبوعيًا' },
              { id: 'm3', left: 'مشاركة الأسرة في اللعب', right: 'بناء لغة حوار مشتركة ومراقبة المحتوى بشكل غير مباشر' },
              { id: 'm4', left: 'الرياضة والرسم والقراءة والابتكار', right: 'أنشطة بديلة إيجابية تعزز الصحة النفسية والاجتماعية' },
            ],
            feedback: {
              correct: 'ممتاز! إنت كده جاهز تبني توازن رقمي صحي ليك ولغيرك.',
              incorrect: 'راجع أدوار كل أداة: Family Link و Screen Time بتفصل اللعبة عند انتهاء الوقت، والمشاركة بتبني حوارًا مشتركًا.',
            },
          },
        },
        {
          id: '8.2-sort',
          type: 'sortingBuckets',
          data: {
            prompt: 'صنّف كل عادة: توازن رقمي وحماية سيبرانية أم استخدام غير منضبط؟',
            buckets: [
              { id: 'balanced', label: 'توازن رقمي وحماية' },
              { id: 'unhealthy', label: 'استخدام غير منضبط' },
            ],
            items: [
              { id: 'u1', text: 'استخدام Google Family Link لضبط وقت اللعب اليومي', bucketId: 'balanced' },
              { id: 'u2', text: 'اللعب أثناء اليوم الدراسي أو طوال الليل بلا قيود', bucketId: 'unhealthy' },
              { id: 'u3', text: 'تخصيص وقت للرياضة والقراءة بجانب الترفيه الرقمي', bucketId: 'balanced' },
              { id: 'u4', text: 'تجاهل الأسرة لمحتوى الألعاب وترك الابن يلعب منعزلًا', bucketId: 'unhealthy' },
            ],
            feedback: {
              correct: 'عاش! الاختيارات المتوازنة بتحافظ على الصحة والتركيز.',
              incorrect: 'الحماية بتجمع بين إدارة الوقت، أدوات الرقابة، والأنشطة البديلة.',
            },
          },
        },
      ],
    },
    {
      id: '8.2-c5',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '8.2-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'المنع التام بلا وعي مش هو الحل الأمثل!',
            body: 'أفضل وسيلة حماية ليست المنع المطلق من التكنولوجيا ولا ترك اللعب بلا قيود؛ بل **الوعي الأسري والمجتمعي وإدارة وقت اللعب** والاتفاق الواضح واستخدام أدوات مثل `Family Link` و `Screen Time`.',
          },
        },
      ],
    },
    {
      id: '8.2-c6',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '8.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما دور أدوات الرقابة الأبوية مثل Google Family Link و Apple Screen Time؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٨٥ (س٤)',
            options: [
              { id: 'a', text: 'زيادة وقت اللعب بلا حدود', isCorrect: false, feedback: 'دورها التنظيم والتحديد.' },
              { id: 'b', text: 'فصل اللعبة أو التطبيق عند انتهاء الوقت المحدد ومراقبة المحتوى', isCorrect: true, feedback: 'صح! تفصل التطبيق تلقائيًا بعد انتهاء المدة المتفق عليها.' },
              { id: 'c', text: 'السماح باللعب دون قيود', isCorrect: false, feedback: 'تضع قيودًا زمنية ذكية.' },
              { id: 'd', text: 'مشاركة كلمات المرور مع الأصدقاء', isCorrect: false, feedback: 'غير صحيح.' },
            ],
            explanation: 'تتيح Family Link و Screen Time ضبط ساعات الاستخدام وفصل اللعبة فور انتهاء الوقت المحدد.',
          },
        },
        {
          id: '8.2-q2',
          type: 'quizQuestion',
          data: {
            question: 'من الإجراءات العالمية للحد من التأثير السلبي للألعاب لمن هم دون ١٨ سنة:',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٨٦ (س٨)',
            options: [
              { id: 'a', text: 'السماح باللعب طوال اليوم', isCorrect: false, feedback: 'يضر بالصحة الدراسية والنفسية.' },
              { id: 'b', text: 'تحديد وقت اللعب بحد أقصى ٣ ساعات أسبوعيًا', isCorrect: true, feedback: 'صح! ساعة واحدة في العطلة وبحد أقصى ٣ ساعات أسبوعيًا.' },
              { id: 'c', text: 'تشجيع الدفع مقابل الفوز', isCorrect: false, feedback: 'يُحظر Pay-to-Win.' },
              { id: 'd', text: 'تجاهل متابعة الأهل', isCorrect: false, feedback: 'دور الأسرة أساسي.' },
            ],
            explanation: 'الضوابط العالمية تحدد اللعب بساعة في نهاية الأسبوع وبحد أقصى 3 ساعات أسبوعيًا لمن دون 18 سنة.',
          },
        },
        {
          id: '8.2-q3',
          type: 'quizQuestion',
          data: {
            question: 'ما دور مشاركة الأهل في اللعب مع أبنائهم؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٨٦ (س٩)',
            options: [
              { id: 'a', text: 'زيادة وقت اللعب فقط', isCorrect: false, feedback: 'ليست لزيادة الوقت.' },
              { id: 'b', text: 'بناء لغة حوار مشتركة ومراقبة المحتوى بشكل غير مباشر', isCorrect: true, feedback: 'إجابة صحيحة!' },
              { id: 'c', text: 'السماح باللعب دون قيود', isCorrect: false, feedback: 'غير صحيح.' },
              { id: 'd', text: 'تقليل التواصل داخل الأسرة', isCorrect: false, feedback: 'العكس، تقوي التواصل.' },
            ],
            explanation: 'مشاركة الأسرة اللعب تخلق لغة حوار مشتركة وتسمح بمراقبة المحتوى بلطف دون صدام.',
          },
        },
      ],
    },
    {
      id: '8.2-c7',
      title: 'ختام المحطة الثامنة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '8.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'الوعي الأسري وتحديد وقت اللعب (حد أقصى ٣ ساعات أسبوعيًا لمن دون ١٨ سنة) ومنع اللعب بالمدرسة واستخدام **`Google Family Link`** و **`Apple Screen Time`** مع تشجيع الرياضة والقراءة والابتكار هي مفاتيح الصحة النفسية والأمان السيبراني. جاهز لاختبار المحطة الثامنة (١٠ أسئلة رسمية)؟',
          },
        },
      ],
    },
  ],
  summary: 'الإجراءات العالمية للحد من أضرار الألعاب وأدوات الرقابة الأبوية Family Link و Screen Time والأنشطة البديلة.',
  additionalSources: [
    {
      id: 'nb-8-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'الحماية من مخاطر الألعاب الإلكترونية تعتمد على تنظيم الوقت والرقابة الذكية ومشاركة الأسرة.',
      bullets: [
        'الحد العالمي دون ١٨ سنة: ساعة بالعطلة وبحد أقصى ٣ ساعات أسبوعيًا.',
        'منع اللعب بالمدرسة وحظر Loot Boxes و Pay-to-Win و Dark Patterns.',
        'أدوات الرقابة: Google Family Link و Apple Screen Time لفصل اللعبة عند انتهاء الوقت.',
        'تشجيع بدائل واقعية: الرياضة، القراءة، الرسم، الابتكار.',
      ],
    },
    {
      id: 'nb-8-2-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-8-2-1',
          question: 'إيه الفرق بين Google Family Link و Apple Screen Time؟',
          answer: 'الاتنين أدوات رقابة أبوية لإدارة الوقت ومراقبة المحتوى؛ Family Link من جوجل لأجهزة أندرويد، و Screen Time من آبل لأجهزة iPhone و iPad.',
        },
        {
          id: 'faq-8-2-2',
          question: 'ليه التوازن والأنشطة البديلة أحسن من المنع النهائي؟',
          answer: 'لأن التكنولوجيا جزء من حياتنا ومستحيل نتجاهلها تمامًا؛ لكن لما نحدد وقتها ونوازنها بالرياضة والقراءة بنحصل على الفايدة من غير الإدمان.',
        },
      ],
    },
    {
      id: 'nb-8-2-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-8-2',
        label: 'درع الحماية والتوازن الرقمي',
        children: [
          {
            id: 'mm-8-2-glob',
            label: 'ضوابط عالمية (< 18)',
            children: [
              { id: 'mm-8-2-g1', label: 'حد أقصى 3 ساعات أسبوعيًا' },
              { id: 'mm-8-2-g2', label: 'منع بالمدرسة وحظر الحيل الضارة' },
            ],
          },
          {
            id: 'mm-8-2-fam',
            label: 'دور الأسرة والأدوات',
            children: [
              { id: 'mm-8-2-f1', label: 'Family Link و Screen Time' },
              { id: 'mm-8-2-f2', label: 'المشاركة والحوار + أنشطة بديلة' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-8-2-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g82-1', termAr: 'أداة الرقابة من جوجل', termEn: 'Google Family Link', definition: 'تطبيق مجاني لإدارة وقت الشاشة ومراقبة التطبيقات والمحتوى وفصل الألعاب عند انتهاء الوقت.' },
        { id: 'g82-2', termAr: 'مدة الشاشة من آبل', termEn: 'Apple Screen Time', definition: 'ميزة مدمجة في أجهزة Apple لضبط حدود زمنية للتطبيقات والألعاب.' },
        { id: 'g82-3', termAr: 'الأنشطة البديلة', termEn: 'Alternative Activities', definition: 'أنشطة واقعية مثل الرياضة والقراءة والرسم والابتكار تعزز الصحة النفسية والاجتماعية.' },
      ],
    },
  ],
  sources: [
    { id: 's82-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'ضوابط اللعب العالمية وأدوات الرقابة الأبوية', pages: 'ص 84–86' },
    { id: 's82-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٨.٢', detail: 'إدارة وقت اللعب واستخدام Family Link و Screen Time' },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-8',
    label: 'ابدأ اختبار المحطة الثامنة',
    description: 'اختبر وعيك السيبراني وإدارة وقت الألعاب (١٠ أسئلة من الكتاب).',
  },
};
