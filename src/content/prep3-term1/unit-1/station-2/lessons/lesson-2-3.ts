import type { LessonPack } from '@/types/curriculum';

export const LESSON_2_3: LessonPack = {
  id: '2.3',
  stationId: 'station-2',
  unitId: 'unit-1',
  order: 3,
  title: 'مقدمة تعلم الآلة والتعلم العميق والشبكات العصبية',
  subtitle: 'إزاي البرامج الذكية بتتعلم من الأمثلة وتصنّف البريد المزعج والصور',
  durationMin: 8,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تشرح فكرة تعلم الآلة (Machine Learning) والتعلم من البيانات والأمثلة.',
    'تفهم نموذجًا تمثيليًا لتصنيف البريد المزعج (Spam) وحدود حساسية الحروف في Python.',
    'تعرّف التعلم العميق (Deep Learning) واعتماده على الشبكات العصبية (Neural Networks).',
  ],
  cards: [
    {
      id: '2.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '2.3-hero',
          type: 'heroHook',
          data: {
            title: 'كيف يتعلم الكمبيوتر من البيانات؟',
            durationMin: 8,
            stationLabel: 'المحطة ٢ · الدرس ٣ من ٤',
            goal: 'تفرّق بين تعلم الآلة والتعلم العميق وتفهم فكرة تصنيف البيانات في مثال البريد المزعج.',
            hook: 'تخيل إنك بتعلّم طفل صغير يفرّق بين التفاح والبرتقال: مش بتكتبله قانون هندسي، إنت بس بتوريله صور كتير وتقوله ده تفاح وده برتقال، وهو مع الوقت بيتعلم لوحده! ده بالظبط تعلم الآلة (Machine Learning).',
            starterChallenge: {
              prompt: 'ميزة فتح الموبايل بالوجه (Face Recognition) بتعتمد على إيه: قواعد `if` ثابتة لكل تفصيلة في الوجه ولا `Deep Learning`؟',
              options: [
                {
                  id: 'sc-a',
                  text: 'قواعد if ثابتة كتبها المبرمج لقياس المسافة بين العينين',
                  isCorrect: false,
                  feedback: 'تغيّر الإضاءة والزاوية والنظارة يجعل كتابة شروط يدوية لكل وجه مستحيلة؛ الموبايل يحتاج تعلمًا من آلاف الصور.',
                },
                {
                  id: 'sc-b',
                  text: 'التعلم العميق (Deep Learning) والشبكات العصبية',
                  isCorrect: true,
                  feedback: 'إجابة دقيقة! تمييز الوجوه والأصوات يعتمد على الشبكات العصبية داخل التعلم العميق لمحاكاة دماغ الإنسان.',
                },
                {
                  id: 'sc-c',
                  text: 'خوارزمية بحث عن اسم المستخدم فقط',
                  isCorrect: false,
                  feedback: 'البحث يطابق نصًا أو رقمًا جاهزًا، أما تحليل ملامح الوجه في الصورة فيتطلب شبكات عصبية.',
                },
              ],
              revealNote: 'تذكّر الهرم الذهبي: الذكاء الاصطناعي (AI) يشمل تعلم الآلة (ML)، وداخله الفرع الأعمق وهو التعلم العميق (DL).',
            },
          },
        },
      ],
    },
    {
      id: '2.3-c2',
      title: 'تعلم الآلة (ML) مقابل التعلم العميق (DL)',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '2.3-ml-dl-tabs',
          type: 'comparisonTabs',
          data: {
            heading: 'من البيانات إلى القرار الذكي',
            instruction: 'اضغط على التبويبين لمقارنة تعلم الآلة بالتعلم العميق.',
            tabs: [
              {
                id: 'ml',
                label: 'تعلم الآلة (ML)',
                badge: 'من البيانات',
                tone: 'emerald',
                body: 'فرع من الذكاء الاصطناعي يخلي الحاسوب يتعلم الأنماط من البيانات والأمثلة السابقة ويستنتج طريقة الحل بدل ما نكتبله كل خطوة بالتفصيل.',
                bullets: [
                  'يعتمد على بيانات تدريب مصنفة مسبقًا.',
                  'يتحسن أداؤه كلما زادت أمثلة التدريب.',
                  'مثال تمثيلي: تصنيف البريد المزعج (Spam) من العادي.',
                ],
              },
              {
                id: 'dl',
                label: 'التعلم العميق (DL)',
                badge: 'شبكات عصبية',
                tone: 'neutral',
                body: 'نوع متطور ومخصص داخل تعلم الآلة يستخدم **الشبكات العصبية (Neural Networks)** ذات الطبقات المتعددة لمحاكاة طريقة عمل عقل الإنسان.',
                bullets: [
                  'يعالج بيانات معقدة زي الصور والفيديو والصوت.',
                  'تطبيقات: التعرف على الوجه في الموبايل وتمييز الأصوات.',
                  'يفهم النصوص الطبيعية في أنظمة مثل ChatGPT.',
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: '2.3-c3',
      title: 'توقّع قبل التشغيل: فخ حالة الحروف',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '2.3-predict',
          type: 'predictOutput',
          data: {
            title: 'هل الكود البسيط يكفي لتصنيف كل الرسائل؟',
            prompt: 'رسالة جديدة وصلت بعنوان `"FREE prize"` بحروف كبيرة. توقّع نتيجة الشرط في الكود التالي:',
            code: 'test = "FREE prize"\nif "free" in test:\n    print("Spam")\nelse:\n    print("NotSpam")',
            expectedOutput: 'NotSpam',
            options: [
              {
                id: 'p1',
                text: 'Spam',
                isCorrect: false,
                feedback: 'بايثون يفرّق بين الحروف الكبيرة والصغيرة! `"free"` لا تطابق `"FREE"` في النص.',
              },
              {
                id: 'p2',
                text: 'NotSpam',
                isCorrect: true,
                feedback: 'توقّع ذكي! لأن `"free"` بحروف صغيرة غير موجودة في `"FREE prize"`, يطبع الكود NotSpam رغم إنها رسالة مزعجة!',
              },
              {
                id: 'p3',
                text: 'FREE prize',
                isCorrect: false,
                feedback: 'الكود لا يطبع المتغير test، بل يطبع إحدى الكلمتين Spam أو NotSpam.',
              },
              {
                id: 'p4',
                text: 'خطأ TypeError',
                isCorrect: false,
                feedback: 'المقارنة بـ in بين نصين صحيحة نحويًا وتنتج False فقط.',
              },
            ],
            explanation: 'الشرط الحرفي البسيط يتأثر بحالة الحروف، ولهذا السبب يتعلم الذكاء الاصطناعي الأنماط والمعاني من آلاف الأمثلة بدل الاعتماد على كلمة واحدة ثابتة.',
          },
        },
      ],
    },
    {
      id: '2.3-c4',
      title: 'مثال الكتاب: تصنيف البريد المزعج (Spam)',
      role: 'example',
      blocks: [
        {
          id: '2.3-spam-view',
          type: 'codeView',
          data: {
            title: 'مثال تمثيلي من الكتاب: تصنيف البريد المزعج (ص ٢٥)',
            code: 'emails = ["win money", "hello friend", "free prize"]\nlabels = ["spam", "not spam", "spam"]\n\ntest = "free money"\nif "free" in test or "money" in test:\n    print("Spam")\nelse:\n    print("NotSpam")',
            caption: 'بندي البرنامج أمثلة تدريب متصنفة، وبعدين بنختبر رسالة جديدة ونشوف هي صنّفها إيه.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '2.3-c5',
      title: 'نقطة فحص: تطبيقات التعلم العميق',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '2.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'أي من التطبيقات التالية يُستخدم فيها التعلم العميق (Deep Learning) والشبكات العصبية؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٩',
            options: [
              {
                id: 'a',
                text: 'طباعة نص بسيط على الشاشة',
                isCorrect: false,
                feedback: 'الطباعة أمر مباشر بـ print() ولا تحتاج إلى أي تدريب أو شبكة عصبية.',
              },
              {
                id: 'b',
                text: 'استقبال اسم المستخدم من لوحة المفاتيح',
                isCorrect: false,
                feedback: 'قراءة المدخلات تتم بدالة input() التقليدية ولا تشمل تعلمًا من البيانات.',
              },
              {
                id: 'c',
                text: 'التعرف على الوجه في الموبايل',
                isCorrect: true,
                feedback: 'صح! تحليل الصور وتمييز الوجوه والأصوات من أبرز تطبيقات الشبكات العصبية في التعلم العميق.',
              },
              {
                id: 'd',
                text: 'حساب مجموع رقمين',
                isCorrect: false,
                feedback: 'الجمع عملية حسابية تقليدية ثابتة لا تحتاج لتدريب أو شبكات عصبية.',
              },
            ],
            explanation: 'التعلم العميق يحاكي العقل البشري عبر الشبكات العصبية لتمييز الصور والأصوات والوجوه وفهم النصوص.',
          },
        },
      ],
    },
    {
      id: '2.3-c6',
      title: 'خلّي بالك! اكتشف الجملة المغلوطة عن AI',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '2.3-bug',
          type: 'spotBug',
          data: {
            mode: 'steps',
            title: 'فخ التفريق بين الكود التمثيلي والذكاء الحقيقي',
            prompt: 'أمامك ٤ عبارات عن تصنيف الرسائل والذكاء الاصطناعي — واحدة فيها خلط علمي! اضغط على العبارة الخاطئة:',
            items: [
              {
                id: 's1',
                text: 'الذكاء الاصطناعي (AI) هو المظلة الكبرى التي تضم تعلم الآلة (ML).',
                wrongFeedback: 'هذا الترتيب العلمي سليم تمامًا: AI يضم ML، و ML يضم DL.',
              },
              {
                id: 's2',
                text: 'التعلم العميق (DL) فرع متطور من تعلم الآلة يعتمد على الشبكات العصبية.',
                wrongFeedback: 'عبارة صحيحة ودقيقة؛ الشبكات العصبية هي قلب التعلم العميق.',
              },
              {
                id: 's3',
                text: 'الكود `if "free" in msg:` يتعلم وحده من البيانات ويُعد نموذج تعلم عميق.',
              },
              {
                id: 's4',
                text: 'نموذج تعلم الآلة الحقيقي يتدرب على آلاف الأمثلة المصنفة ليستنتج الأنماط.',
                wrongFeedback: 'فعلاً، التدريب على أمثلة مصنفة هو أساس تعلم الآلة.',
              },
            ],
            bugItemId: 's3',
            fixedLine: 'الكود `if "free" in msg:` مجرد محاكاة تمثيلية بشرط ثابت، وليس تعلم آلة حقيقي.',
            fixExplanation: 'جملة if الثابتة لا تتعلم من البيانات ولا تغيّر نفسها؛ هي فقط مثال تعليمي مبسّط يوضح فكرة الفلترة، بينما تعلم الآلة الحقيقي يتدرب على البيانات.',
          },
        },
      ],
    },
    {
      id: '2.3-c7',
      title: 'تطبيق Python: طوّر فلتر البريد',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.3-spam-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'جرّب مطوّر فلتر البريد',
            prompt: 'عدّل البرنامج علشان ياخد نص الرسالة في متغير `msg` من `input()`، ولو لقى كلمة `"free"` أو `"win"` يطبع `"Spam"`، وغير كده يطبع `"NotSpam"`.',
            starterCode: 'msg = input("Enter email text: ")\n',
            solutionCode:
              'msg = input("Enter email text: ")\nif "free" in msg or "win" in msg:\n    print("Spam")\nelse:\n    print("NotSpam")',
            quickChips: [
              'if "free" in msg or "win" in msg:',
              '    print("Spam")',
              'else:',
              '    print("NotSpam")',
            ],
            checks: [
              { id: 'sp-1', label: 'رسالة win a gift -> Spam', stdin: ['win a gift'], expectedOutputRegex: 'Spam' },
              { id: 'sp-2', label: 'رسالة hello friend -> NotSpam', stdin: ['hello friend'], expectedOutputRegex: 'NotSpam' },
            ],
            hint: 'استخدم المعامل `in` مرتين مع `or`: if "free" in msg or "win" in msg:.',
            hints: [
              'الهدف: فحص وجود أي من الكلمتين ("free" أو "win") داخل النص msg ثم طباعة التصنيف المناسب.',
              'معامل or يجمع بين شرطي العضوية: "free" in msg و "win" in msg، وبانتفاء الشرطين نذهب إلى else.',
              'اكتب: if "free" in msg or "win" in msg: وتحتها بمسافة بادئة print("Spam") ثم else: وتحتها print("NotSpam").',
            ],
          },
        },
      ],
    },
    {
      id: '2.3-c8',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '2.3-q2',
          type: 'quizQuestion',
          data: {
            question: 'ما المبدأ الذي يعتمد عليه تعلم الآلة في تصنيف البريد المزعج (Spam) في التطبيقات الحقيقية؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٩',
            options: [
              {
                id: 'a',
                text: 'كتابة قواعد ثابتة لكل كلمة محتملة يدويًا',
                isCorrect: false,
                feedback: 'كتابة كل قاعدة يدويًا هي البرمجة التقليدية وتعجز أمام الكلمات والحيل المتجددة.',
              },
              {
                id: 'b',
                text: 'تزويد البرنامج بأمثلة سابقة مصنّفة ليتعلم أنماطها',
                isCorrect: true,
                feedback: 'بالظبط! تعلم الآلة يستنتج الأنماط من بيانات التدريب السابقة المصنفة ثم يطبقها على رسائل جديدة.',
              },
              {
                id: 'c',
                text: 'استخدام خوارزمية ترتيب sort() للرسائل',
                isCorrect: false,
                feedback: 'دالة sort() تنظم البيانات تصاعديًا أو أبجديًا ولا تصنّف معنى الرسالة.',
              },
              {
                id: 'd',
                text: 'حساب طول الرسالة فقط بدالة len()',
                isCorrect: false,
                feedback: 'الطول وحده لا يكفي للتمييز بين الرسائل العادية والمزعجة.',
              },
            ],
            explanation: 'تعلم الآلة يعتمد على تدريب النموذج ببيانات وأمثلة سابقة مُصنّفة ليتعلم منها كيف يصنف الرسائل الجديدة.',
          },
        },
      ],
    },
    {
      id: '2.3-c9',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '2.3-sum-img',
          type: 'imageBlock',
          data: {
            src: '/media/infographic-2-3.png',
            alt: 'إنفوجرافيك القرارات والتفرع الشرطي if و else',
            caption: 'لوحة تعليمية توضح آلية التفرع واتخاذ القرار وقواعد بايثون الشرطية.',
            aspectRatio: '16/9',
          },
        },
        {
          id: '2.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: '**تعلم الآلة (ML)** يدرّب الكمبيوتر ببيانات وأمثلة ليكتشف الحل بنفسه، و**التعلم العميق (DL)** هو نوع متطور منه يعتمد على **الشبكات العصبية** في مهام معقدة زي التعرف على الوجه والصوت وفهم اللغة. في الدرس الأخير من المحطة هنقارن بشكل مباشر بين الخوارزميات التقليدية وخوارزميات الذكاء الاصطناعي!',
          },
        },
      ],
    },
  ],
  summary:
    'تعلم الآلة يجعل الحاسوب يتعلم من البيانات، والتعلم العميق نوع متطور يستخدم الشبكات العصبية لمحاكاة عقل الإنسان.',
  additionalSources: [
    {
      id: 'nb-2-3-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'بدل كتابة كل قاعدة يدويًا، الذكاء الاصطناعي يتدرب على أمثلة سابقة عشان يصنّف الرسائل والصور والأصوات.',
      bullets: [
        'Machine Learning: التعلم من البيانات والأمثلة السابقة (مثل تصنيف Spam).',
        'Deep Learning: يعتمد على الشبكات العصبية لمحاكاة دماغ الإنسان.',
        'أبرز تطبيقاته: فتح الموبايل بالوجه، تمييز الصور والأصوات، وفهم النصوص.',
      ],
    },
    {
      id: 'nb-2-3-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-2-3-1',
          question: 'إيه الفرق بين تعلم الآلة والتعلم العميق؟',
          answer: 'التعلم العميق فرع متقدم جوه تعلم الآلة، بيستخدم طبقات من الشبكات العصبية لتحليل بيانات ضخمة ومعقدة زي الصور والصوت.',
        },
        {
          id: 'faq-2-3-2',
          question: 'إزاي الكمبيوتر بيتعلم يكتشف البريد المزعج (Spam)؟',
          answer: 'بنعطيه آلاف الرسائل القديمة متعلّم عليها «مزعج» أو «عادي»، فبيكتشف الكلمات والأنماط المتكررة في الرسائل المزعجة.',
        },
      ],
    },
    {
      id: 'nb-2-3-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-2-3',
        label: 'خوارزميات الذكاء الاصطناعي',
        children: [
          {
            id: 'mm-2-3-ml',
            label: 'تعلم الآلة (ML)',
            children: [
              { id: 'mm-2-3-ml1', label: 'التعلم من البيانات والأمثلة' },
              { id: 'mm-2-3-ml2', label: 'مثال: تصنيف Spam / NotSpam' },
            ],
          },
          {
            id: 'mm-2-3-dl',
            label: 'التعلم العميق (DL)',
            children: [
              { id: 'mm-2-3-dl1', label: 'الشبكات العصبية (Neural Networks)' },
              { id: 'mm-2-3-dl2', label: 'تطبيقات: الوجه والصور والصوت و ChatGPT' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-2-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g23-1', termAr: 'تعلم الآلة', termEn: 'Machine Learning (ML)', definition: 'فرع من الذكاء الاصطناعي يتعلم فيه الحاسوب من البيانات والأمثلة دون برمجة كل خطوة صراحةً.' },
        { id: 'g23-2', termAr: 'التعلم العميق', termEn: 'Deep Learning (DL)', definition: 'نوع متقدم من تعلم الآلة يستخدم الشبكات العصبية لمحاكاة عمل الدماغ البشري.' },
        { id: 'g23-3', termAr: 'الشبكات العصبية', termEn: 'Neural Networks', definition: 'نماذج حسابية مستوحاة من خلايا المخ البشري تُستخدم في التعلم العميق.' },
      ],
    },
  ],
  sources: [
    { id: 's23-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'تعلم الآلة والتعلم العميق وتصنيف Spam', pages: 'ص 24–25' },
    { id: 's23-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٢.٣', detail: 'التسلسل الهرمي AI > ML > DL والشبكات العصبية' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '2.4',
    label: 'الدرس الجاي: التقليدية ضد الذكاء الاصطناعي',
    description: 'قارن بين الطريقتين وحل تحدي التقديرات المتعددة في الكتاب.',
  },
};
