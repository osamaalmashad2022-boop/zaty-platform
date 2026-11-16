import type { LessonPack } from '@/types/curriculum';

export const LESSON_2_4: LessonPack = {
  id: '2.4',
  stationId: 'station-2',
  unitId: 'unit-1',
  order: 4,
  title: 'المقارنة بين الخوارزميات التقليدية والذكاء الاصطناعي',
  subtitle: 'متى يكون البرنامج تقليديًا ومتى يكون ذكاءً اصطناعيًا؟ + تحدي الكتاب',
  durationMin: 8,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
  objectives: [
    'تقارن بدقة بين خصائص الخوارزميات التقليدية وخوارزميات الذكاء الاصطناعي.',
    'تحكم على كود مثل `if score >= 50` بأنه تقليدي شرطي وليس ذكاءً اصطناعيًا.',
    'تطوّر برنامج التقديرات متعددة المستويات (Excellent / Good / Weak) في Python.',
  ],
  cards: [
    {
      id: '2.4-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '2.4-hero',
          type: 'heroHook',
          data: {
            title: 'التقليدية ضد الذكاء الاصطناعي',
            durationMin: 8,
            stationLabel: 'المحطة ٢ · الدرس ٤ من ٤',
            goal: 'تفرّق بين البرمجة الثابتة والتعلم من البيانات، وتنفّذ تحدي التقديرات بالكتاب.',
            hook: 'سؤال مهم: لو كتبنا برنامج بيفحص درجة المتعلم بجملة `if score >= 50` ويطبع «ناجح».. هل ده كده بقى ذكاء اصطناعي؟ خلّي بالك — ده سؤال امتحان مشهور بيقع فيه ناس كتير!',
          },
        },
      ],
    },
    {
      id: '2.4-c2',
      title: 'جدول المقارنة الجوهري + جرّب تصنّف',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.4-table',
          type: 'tableBlock',
          data: {
            heading: 'الفرق بين الخوارزميات التقليدية وخوارزميات الذكاء الاصطناعي (ص ٢٥–٢٦)',
            headers: ['الخوارزميات التقليدية', 'خوارزميات الذكاء الاصطناعي'],
            rows: [
              ['خطوات ثابتة ومحددة مسبقًا', 'تتعلم من البيانات والأمثلة'],
              ['لا تتغير ولا تتحسن وحدها مع الوقت', 'تتحسن وتطور أداءها مع الوقت'],
              ['مبرمجة بالكامل من قِبل المبرمج', 'تعتمد على التدريب المستمر'],
            ],
          },
        },
        {
          id: '2.4-sort',
          type: 'sortingBuckets',
          data: {
            prompt: 'صنّف كل وصف أو مثال للنوع المناسب:',
            buckets: [
              { id: 'trad', label: 'خوارزمية تقليدية' },
              { id: 'ai', label: 'ذكاء اصطناعي' },
            ],
            items: [
              { id: 'it1', text: 'خطوات ثابتة مبرمجة بالكامل', bucketId: 'trad' },
              { id: 'it2', text: 'كود if score >= 50: للنجاح', bucketId: 'trad' },
              { id: 'it3', text: 'تتعلم من البيانات وتتحسن بالوقت', bucketId: 'ai' },
              { id: 'it4', text: 'التعرف على الوجوه بالشبكات العصبية', bucketId: 'ai' },
            ],
            feedback: {
              correct: 'ممتاز! فاهم الفرق الجوهري 100%.',
              incorrect: 'تذكّر: أي قاعدة ثابتة يكتبها المبرمج (حتى if score >= 50) هي خوارزمية تقليدية.',
            },
          },
        },
      ],
    },
    {
      id: '2.4-c3',
      title: 'تحدي الكتاب (ص ٢٦): برنامج التقديرات المتعددة',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.4-code-challenge',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'طوّر برنامج النجاح لتقديرات متعددة (if / elif / else)',
            prompt:
              'طوّر الكود علشان يقرأ الدرجة `score`: لو `>= 85` يطبع `"Excellent"`، ولو `>= 65` يطبع `"Good"`، ولو أقل يطبع `"Weak"`.',
            starterCode:
              'score = int(input("Enter score: "))\nif score >= 85:\n    print("Excellent")\n# أكمل elif و else هنا\n',
            solutionCode:
              'score = int(input("Enter score: "))\nif score >= 85:\n    print("Excellent")\nelif score >= 65:\n    print("Good")\nelse:\n    print("Weak")',
            checks: [
              { id: 'g-ex', label: 'الدرجة 90 -> Excellent', stdin: ['90'], expectedOutputRegex: 'Excellent' },
              { id: 'g-gd', label: 'الدرجة 70 -> Good', stdin: ['70'], expectedOutputRegex: 'Good' },
              { id: 'g-wk', label: 'الدرجة 40 -> Weak', stdin: ['40'], expectedOutputRegex: 'Weak' },
            ],
            hint: 'استخدم elif score >= 65: للطباعة "Good" ثم else: للطباعة "Weak".',
          },
        },
      ],
    },
    {
      id: '2.4-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '2.4-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'فخ الامتحان: برنامج `if score >= 50` مش ذكاء اصطناعي!',
            body: 'رغم إن الدرس مسمّيه «فحص وتوقع النجاح»، لكن بما إنه بيعتمد على شرط ثابت كتبه المبرمج (`if score >= 50`) ومش بيتعلم من بيانات، فهو **خوارزمية تقليدية شرطية** مش ذكاءً اصطناعيًا!',
          },
        },
      ],
    },
    {
      id: '2.4-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '2.4-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما الفرق الأساسي بين الخوارزميات التقليدية وخوارزميات الذكاء الاصطناعي؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٩',
            options: [
              { id: 'a', text: 'الخوارزميات التقليدية أسرع في التنفيذ', isCorrect: false, feedback: 'مش ده الفرق الجوهري.' },
              { id: 'b', text: 'خوارزميات الذكاء الاصطناعي تتعلم من البيانات', isCorrect: true, feedback: 'صح! الذكاء الاصطناعي يتعلم من البيانات ويتحسن مع الوقت.' },
              { id: 'c', text: 'خوارزميات الذكاء الاصطناعي لا تحتاج لبيانات', isCorrect: false, feedback: 'العكس، البيانات هي أساس تدريبها.' },
              { id: 'd', text: 'الخوارزميات التقليدية أكثر تعقيدًا', isCorrect: false, feedback: 'غير صحيح.' },
            ],
            explanation: 'خوارزميات الذكاء الاصطناعي تتعلم من البيانات وتتحسن بالتدريب، بينما التقليدية خطوات ثابتة.',
          },
        },
        {
          id: '2.4-q2',
          type: 'quizQuestion',
          data: {
            question: 'في برنامج فحص نجاح المتعلم باستخدام `if score >= 50`، ما النوع الذي يمثّله؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٣٠',
            options: [
              { id: 'a', text: 'خوارزمية ذكاء اصطناعي', isCorrect: false, feedback: 'لا يتعلم من بيانات، ده شرط ثابت.' },
              { id: 'b', text: 'خوارزمية تكرارية', isCorrect: false, feedback: 'ما فيش حلقة تكرار.' },
              { id: 'c', text: 'خوارزمية تقليدية شرطية', isCorrect: true, feedback: 'بالظبط! يعتمد على شرط ثابت مبرمج مسبقًا.' },
              { id: 'd', text: 'خوارزمية تعلم عميق', isCorrect: false, feedback: 'لا يعتمد على شبكات عصبية.' },
            ],
            explanation: 'بما أنه يعتمد على قاعدة شرطية ثابتة `if score >= 50`، فهو خوارزمية تقليدية شرطية.',
          },
        },
      ],
    },
    {
      id: '2.4-c6',
      title: 'ختام المحطة الثانية والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '2.4-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'الخوارزمية التقليدية بتنفذ أوامر ثابتة مبرمجة بالكامل وما بتتغيرش وحدها، أما خوارزمية الذكاء الاصطناعي فبتتعلم من البيانات وتتحسن بالتدريب. وبـ `if / elif / else` قدرنا نبني نظام تقديرات متعدد. جاهز لاختبار المحطة الثانية (٣٩ سؤالًا رسميًا)؟',
          },
        },
      ],
    },
  ],
  summary:
    'قارنّا بين الخوارزميات التقليدية الثابتة وخوارزميات الذكاء الاصطناعي التي تتعلم من البيانات، وطوّرنا برنامج التقديرات.',
  additionalSources: [
    {
      id: 'nb-2-4-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'الفرق الجوهري بين النوعين: القواعد الثابتة المكتوبة مسبقًا في التقليدية مقابل التعلم المستمر من البيانات في الذكاء الاصطناعي.',
      bullets: [
        'الخوارزمية التقليدية: خطوات ثابتة لا تتغير بمرور الوقت.',
        'خوارزمية الذكاء الاصطناعي: تتدرب على البيانات وتتحسن نتائجها.',
        'برنامج if score >= 50 يعتبر خوارزمية تقليدية شرطية.',
      ],
    },
    {
      id: 'nb-2-4-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-2-4-1',
          question: 'ليه كود if score >= 50 مش ذكاء اصطناعي؟',
          answer: 'لأن المبرمج هو اللي كتب قاعدة النجاح الثابتة (50) بإيده، والبرنامج مش بيتعلم من درجات سابقة.',
        },
        {
          id: 'faq-2-4-2',
          question: 'إزاي أعمل أكتر من شرط متتالي في Python؟',
          answer: 'باستخدام if لأول شرط، و elif لأي شروط تانية بالترتيب، و else في الآخر لو ولا شرط اتحقق.',
        },
      ],
    },
    {
      id: 'nb-2-4-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-2-4',
        label: 'التقليدية مقابل الذكاء الاصطناعي',
        children: [
          {
            id: 'mm-2-4-trad',
            label: 'خوارزميات تقليدية',
            children: [
              { id: 'mm-2-4-t1', label: 'أوامر ثابتة يكتبها المبرمج' },
              { id: 'mm-2-4-t2', label: 'لا تتعلم من البيانات (مثال: if score >= 50)' },
            ],
          },
          {
            id: 'mm-2-4-ai',
            label: 'خوارزميات الذكاء الاصطناعي',
            children: [
              { id: 'mm-2-4-a1', label: 'تتعلم من البيانات والأمثلة' },
              { id: 'mm-2-4-a2', label: 'تتحسن وتتطور بالتدريب' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-2-4-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g24-1', termAr: 'الخوارزميات التقليدية', termEn: 'Traditional Algorithms', definition: 'خوارزميات تعتمد على قواعد وخطوات ثابتة كتبها المبرمج ولا تتعلم ذاتيًا.' },
        { id: 'g24-2', termAr: 'خوارزميات الذكاء الاصطناعي', termEn: 'AI Algorithms', definition: 'أنظمة تتعلم الأنماط من البيانات وتتحسن بالتدريب دون برمجة كل قاعدة يدويًا.' },
        { id: 'g24-3', termAr: 'الشرط المتعدد', termEn: 'if / elif / else', definition: 'سلسلة شروط لاختيار مسار واحد من عدة احتمالات متدرجة.' },
      ],
    },
  ],
  sources: [
    { id: 's24-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'مقارنة الخوارزميات التقليدية بالذكاء الاصطناعي + تحدي التقديرات', pages: 'ص 25–26' },
    { id: 's24-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٢.٤', detail: 'جدول المقارنة الجوهري وتحليل فخ if score >= 50' },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-2',
    label: 'ابدأ اختبار المحطة الثانية',
    description: 'اختبر معلوماتك في الخوارزميات والذكاء الاصطناعي (٣٩ سؤالًا من الكتاب).',
  },
};
