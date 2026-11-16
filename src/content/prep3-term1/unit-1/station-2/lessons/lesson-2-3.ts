import type { LessonPack } from '@/types/curriculum';

export const LESSON_2_3: LessonPack = {
  id: '2.3',
  stationId: 'station-2',
  unitId: 'unit-1',
  order: 3,
  title: 'مقدمة تعلم الآلة والتعلم العميق والشبكات العصبية',
  subtitle: 'إزاي البرامج الذكية بتتعلم من الأمثلة وتصنّف البريد المزعج والصور',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'draft',
  objectives: [
    'تشرح فكرة تعلم الآلة (Machine Learning) والتعلم من البيانات والأمثلة.',
    'تفهم نموذجًا مبسطًا لتصنيف البريد المزعج (Spam) بلغة Python.',
    'تعرّف التعلم العميق (Deep Learning) واعتماده على الشبكات العصبية.',
  ],
  cards: [
    {
      id: '2.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '2.3-hero',
          type: 'heroHook',
          data: {
            title: 'كيف يتعلم الكمبيوتر من البيانات؟',
            durationMin: 8,
            stationLabel: 'المحطة ٢ · الدرس ٣ من ٤',
            goal: 'تفرّق بين تعلم الآلة والتعلم العميق وتفهم فكرة تصنيف البيانات في مثال البريد المزعج.',
            hook: 'تخيل إنك بتعلّم طفل صغير يفرّق بين التفاح والبرتقال: مش بتكتبله قانون هندسي، إنت بس بتوريله صور كتير وتقوله ده تفاح وده برتقال، وهو مع الوقت بيتعلم لوحده! ده بالظبط تعلم الآلة.',
          },
        },
      ],
    },
    {
      id: '2.3-c2',
      title: 'تعلم الآلة (ML) والتعلم العميق (DL)',
      role: 'concept',
      blocks: [
        {
          id: '2.3-ml-dl',
          type: 'richText',
          data: {
            heading: 'من البيانات إلى القرار الذكي',
            body: '• **تعلم الآلة (Machine Learning):** نوع من الذكاء الاصطناعي يجعل الكمبيوتر يتعلم من البيانات والأمثلة السابقة ويستنتج طريقة الحل بدل كتابة كل خطوة بالتفصيل.\n• **التعلم العميق (Deep Learning):** نوع متطور من تعلم الآلة يستخدم **الشبكات العصبية (Neural Networks)** لمحاكاة طريقة عمل عقل الإنسان، ومن تطبيقاته التعرف على الوجه في الموبايل وتمييز الصور والأصوات وفهم النصوص مثل ChatGPT.',
          },
        },
      ],
    },
    {
      id: '2.3-c3',
      title: 'مثال الكتاب + جرّب تصنّف البريد المزعج (Spam)',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.3-spam-view',
          type: 'codeView',
          data: {
            title: 'مثال تمثيلي من الكتاب: تصنيف البريد المزعج (ص ٢٥)',
            code: 'emails = ["win money", "hello friend", "free prize"]\nlabels = ["spam", "not spam", "spam"]\n\ntest = "free money"\nif "free" in test or "money" in test:\n    print("Spam")\nelse:\n    print("NotSpam")',
            caption: 'نعطي البرنامج بيانات تدريب مع تصنيفاتها، ثم نختبر رسالة جديدة.',
            runnable: true,
          },
        },
        {
          id: '2.3-spam-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'جرّب مطوّر فلتر البريد',
            prompt: 'عدّل البرنامج علشان ياخد نص الرسالة في متغير `msg` من `input()`، ولو لقى كلمة `"free"` أو `"win"` يطبع `"Spam"`، وغير كده يطبع `"NotSpam"`.',
            starterCode:
              'msg = input("Enter email text: ")\n# افحص وجود free أو win في msg\n',
            solutionCode:
              'msg = input("Enter email text: ")\nif "free" in msg or "win" in msg:\n    print("Spam")\nelse:\n    print("NotSpam")',
            checks: [
              { id: 'sp-1', label: 'رسالة win a gift -> Spam', stdin: ['win a gift'], expectedOutputRegex: 'Spam' },
              { id: 'sp-2', label: 'رسالة hello friend -> NotSpam', stdin: ['hello friend'], expectedOutputRegex: 'NotSpam' },
            ],
            hint: 'استخدم المعامل `in`: if "free" in msg or "win" in msg:',
          },
        },
      ],
    },
    {
      id: '2.3-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '2.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'خلّي بالك: التعلم العميق جزء متقدم من تعلم الآلة',
            body: 'الترتيب العلمي الصح: **الذكاء الاصطناعي** هو المظلة الكبيرة ← جواها **تعلم الآلة (ML)** ← وجواه نوع متقدم بيعتمد على الشبكات العصبية اسمه **التعلم العميق (Deep Learning)**.',
          },
        },
      ],
    },
    {
      id: '2.3-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '2.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'أي من التطبيقات التالية يُستخدم فيها التعلم العميق (Deep Learning)؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٩',
            options: [
              { id: 'a', text: 'طباعة نص بسيط على الشاشة', isCorrect: false, feedback: 'دي عملية طباعة عادية بـ print().' },
              { id: 'b', text: 'جمع بيانات من المستخدم', isCorrect: false, feedback: 'دي بـ input().' },
              { id: 'c', text: 'التعرف على الوجه في الموبايل', isCorrect: true, feedback: 'صح! التعرف على الصور والوجوه من تطبيقات الشبكات العصبية والتعلم العميق.' },
              { id: 'd', text: 'حساب مجموع رقمين', isCorrect: false, feedback: 'دي عملية حسابية تقليدية.' },
            ],
            explanation: 'التعلم العميق يحاكي العقل البشري عبر الشبكات العصبية لتمييز الصور والأصوات والوجوه.',
          },
        },
        {
          id: '2.3-q2',
          type: 'quizQuestion',
          data: {
            question: 'في مثال تصنيف البريد المزعج (Spam)، ما المبدأ الذي يعتمد عليه التعلم الآلي؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٩',
            options: [
              { id: 'a', text: 'كتابة قواعد ثابتة لكل نوع من البريد', isCorrect: false, feedback: 'دي البرمجة التقليدية.' },
              { id: 'b', text: 'تزويد البرنامج بأمثلة سابقة للتعلم منها', isCorrect: true, feedback: 'بالظبط! التعلم الآلي يتعلم الأنماط من بيانات التدريب السابقة.' },
              { id: 'c', text: 'استخدام خوارزمية ترتيب فقط', isCorrect: false, feedback: 'الترتيب لتنظيم الأرقام مش لتعلم التصنيف.' },
              { id: 'd', text: 'الاعتماد على العمليات الحسابية البسيطة', isCorrect: false, feedback: 'غير كافٍ لتعلم التصنيف من البيانات.' },
            ],
            explanation: 'التعلم الآلي يعتمد على تزويد النموذج ببيانات وأمثلة سابقة مُصنّفة ليتعلم منها.',
          },
        },
      ],
    },
    {
      id: '2.3-c6',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '2.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: '**تعلم الآلة (ML)** يدرّب الكمبيوتر ببيانات وأمثلة ليكتشف الحل بنفسه، و**التعلم العميق (DL)** هو نوع متطور منه يعتمد على **الشبكات العصبية** في مهام معقدة زي التعرف على الوجه والصوت. في الدرس الأخير من المحطة هنقارن بشكل مباشر بين الخوارزميات التقليدية وخوارزميات الذكاء الاصطناعي!',
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
      title: 'ملخص سريع',
      content: 'التحول من الأوامر الثابتة إلى التعلم من البيانات عبر Machine Learning و Deep Learning.',
    },
    {
      id: 'nb-2-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g23-1', termAr: 'تعلم الآلة', termEn: 'Machine Learning (ML)', definition: 'فرع من الذكاء الاصطناعي يتعلم فيه الحاسوب من البيانات والأمثلة دون برمجة كل خطوة صراحةً.' },
        { id: 'g23-2', termAr: 'التعلم العميق', termEn: 'Deep Learning (DL)', definition: 'نوع متقدم من تعلم الآلة يستخدم الشبكات العصبية لمحاكاة عمل الدماغ البشري.' },
      ],
    },
  ],
  sources: [
    { id: 's23-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'تعلم الآلة والتعلم العميق وتصنيف Spam', pages: 'ص 24–25' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '2.4',
    label: 'الدرس الجاي: التقليدية ضد الذكاء الاصطناعي',
    description: 'قارن بين الطريقتين وحل تحدي التقديرات في الكتاب.',
  },
};
