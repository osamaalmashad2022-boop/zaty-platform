import type { LessonPack } from '@/types/curriculum';

export const LESSON_2_1: LessonPack = {
  id: '2.1',
  stationId: 'station-2',
  unitId: 'unit-1',
  order: 1,
  title: 'رموز خرائط التدفق والمسار التسلسلي والشرطي',
  subtitle: 'ارسم خطوات الحل بالأشكال الهندسية القياسية واكتب أول خوارزمية شرطية',
  durationMin: 9,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
  objectives: [
    'تعرف معنى الخوارزمية (Algorithm) وتذكر مثالًا عمليًا لها.',
    'تميّز وظائف أشكال خريطة التدفق الأربعة: البيضاوي، المستطيل، متوازي الأضلاع، والمعيّن.',
    'تبني خريطة تدفق بسيطة وتطبّق الخوارزمية التسلسلية والشرطية بلغة Python.',
  ],
  cards: [
    {
      id: '2.1-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '2.1-hero',
          type: 'heroHook',
          data: {
            title: 'الخوارزميات وخرائط التدفق Flowchart',
            durationMin: 9,
            stationLabel: 'المحطة ٢ · الدرس ١ من ٤',
            goal: 'تتعلّم معنى الخوارزمية وأشكال خرائط التدفق الأربعة وتبني خوارزمية تسلسلية وشرطية.',
            hook: 'تخيل عايز تعمل كوباية شاي: بتغلي المية الأول، وبعدين تحط الشاي والسكر بالترتيب. في البرمجة الترتيب المنطقي ده اسمه «خوارزمية» (Algorithm)، ولما نرسمه بأشكال هندسية يبقى اسمه «خريطة تدفق» (Flowchart)!',
            image: '/media/robot-path.png',
          },
        },
      ],
    },
    {
      id: '2.1-c2',
      title: 'ما هي الخوارزمية؟ وأشكال خريطة التدفق',
      role: 'concept',
      blocks: [
        {
          id: '2.1-def',
          type: 'richText',
          data: {
            heading: 'الخوارزمية (Algorithm) وخرائط التدفق (Flowcharts)',
            body: '**الخوارزمية** هي مجموعة من الخطوات المرتبة ترتيبًا منطقيًا لحل مشكلة معينة، بحيث لو مشينا عليها نوصل للنتيجة الصح في كل مرة.\n\nلما نرسم الخوارزمية ك**خريطة تدفق (Flowchart)**، كل شكل هندسي ليه وظيفة ثابتة، والأسهم بتوضح اتجاه التنفيذ من البداية للنهاية:',
          },
        },
        {
          id: '2.1-table',
          type: 'tableBlock',
          data: {
            heading: 'أشكال خريطة التدفق القياسية (ص ١٨–٢٠)',
            headers: ['الشكل الهندسي', 'وظيفته في خريطة التدفق'],
            rows: [
              ['الشكل البيضاوي (Oval)', 'البداية والنهاية (Start / End)'],
              ['المستطيل (Rectangle)', 'العمليات الحسابية أو الخطوات الثابتة (Process)'],
              ['متوازي الأضلاع (Parallelogram)', 'الإدخال والإخراج (Input / Output)'],
              ['المعيّن (Diamond)', 'اتخاذ القرار / الشرط (Decision)'],
            ],
          },
        },
      ],
    },
    {
      id: '2.1-c3',
      title: 'جرّب بنفسك: ابني خريطة التدفق',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-flow',
          type: 'orderFlowBuilder',
          data: {
            mode: 'flowchart',
            prompt: 'رتّب رموز خريطة التدفق لبرنامج يقرأ درجة المتعلم ويطبع «ناجح» إذا كانت >= 50:',
            items: [
              { id: 'f1', label: 'البداية (Start)', shape: 'oval' },
              { id: 'f2', label: 'أدخل الدرجة score', shape: 'parallelogram' },
              { id: 'f3', label: 'هل score >= 50 ؟', shape: 'diamond' },
              { id: 'f4', label: 'اطبع النتيجة', shape: 'parallelogram' },
              { id: 'f5', label: 'النهاية (End)', shape: 'oval' },
            ],
            correctOrder: ['f1', 'f2', 'f3', 'f4', 'f5'],
            feedback: {
              correct: 'ممتاز! البداية بالبيضاوي، الإدخال بالمتوازي، الشرط بالمعيّن، ثم الإخراج والنهاية.',
              incorrect: 'ابدأ بالبيضاوي، ثم متوازي الأضلاع للإدخال، ثم المعيّن للشرط، ثم الإخراج والنهاية.',
            },
          },
        },
      ],
    },
    {
      id: '2.1-c4',
      title: 'مثال محلول وتطبيق Python: التسلسلية والشرطية',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-code-ex',
          type: 'codeView',
          data: {
            title: 'التسلسلية والشرطية في Python (ص ٢٠–٢١)',
            code: '# ١. خوارزمية تسلسلية: ترحيب بالاسم\nname = input("Enter your name: ")\nprint("Hello", name)\n\n# ٢. خوارزمية شرطية: موجب أم سالب\nnum = int(input("Enter a number: "))\nif num > 0:\n    print("Positive number")\nelse:\n    print("Negative or zero")',
            caption: 'التسلسلية بتنفذ الأوامر سطر ورا سطر من فوق لتحت، أما الشرطية بتتفرع حسب جملة if.',
            runnable: true,
          },
        },
        {
          id: '2.1-codelab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل الخوارزمية الشرطية (موجب أم سالب)',
            prompt: 'أكمل سطر الشرط `if num > 0:` لاختبار هل الرقم المدخل موجب أم لأ، وبعدين شغّل الاختبار.',
            starterCode:
              'num = int(input("Enter a number: "))\n# اكتب شرط الاختبار هنا\n    print("Positive")\nelse:\n    print("Not positive")',
            solutionCode:
              'num = int(input("Enter a number: "))\nif num > 0:\n    print("Positive")\nelse:\n    print("Not positive")',
            checks: [
              { id: 'pos', label: 'الرقم 9 -> Positive', stdin: ['9'], expectedOutputRegex: 'Positive' },
              { id: 'neg', label: 'الرقم -3 -> Not positive', stdin: ['-3'], expectedOutputRegex: 'Not positive' },
            ],
            hint: 'اكتب if num > 0: ولا تنسَ النقطتين (:) في نهاية السطر.',
          },
        },
      ],
    },
    {
      id: '2.1-c5',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '2.1-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'خلّي بالك: رموز خريطة التدفق ما بتتبدلش!',
            body: '• **المستطيل** للعمليات الحسابية والخطوات الثابتة (مش للقرارات ولا للإدخال).\n• **متوازي الأضلاع** للإدخال والإخراج معًا.\n• **المعيّن** لاتخاذ القرار فقط (الشرط).',
          },
        },
      ],
    },
    {
      id: '2.1-c6',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-q1',
          type: 'quizQuestion',
          data: {
            question: 'أي شكل في خريطة التدفق يُستخدم لاتخاذ القرار (الشرط)؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٨',
            options: [
              { id: 'a', text: 'الشكل البيضاوي', isCorrect: false, feedback: 'البيضاوي للبداية والنهاية فقط.' },
              { id: 'b', text: 'المستطيل', isCorrect: false, feedback: 'المستطيل للعمليات الحسابية.' },
              { id: 'c', text: 'المعيّن', isCorrect: true, feedback: 'إجابة صحيحة: المعيّن مخصص للقرار والشروط.' },
              { id: 'd', text: 'متوازي الأضلاع', isCorrect: false, feedback: 'متوازي الأضلاع للإدخال والإخراج.' },
            ],
            explanation: 'المعيّن (Diamond) يُستخدم لاتخاذ القرار (الشرط) في خريطة التدفق.',
          },
        },
        {
          id: '2.1-q2',
          type: 'quizQuestion',
          data: {
            question: 'أي نوع من الخوارزميات يُنفّذ خطوة بعد خطوة بترتيب ثابت مثل قراءة كتاب من الصفحة الأولى للأخيرة؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٨–٢٩',
            options: [
              { id: 'a', text: 'الخوارزمية الشرطية', isCorrect: false, feedback: 'الشرطية بتتفرع حسب الشرط.' },
              { id: 'b', text: 'الخوارزمية التكرارية', isCorrect: false, feedback: 'التكرارية بتعيد نفس العملية.' },
              { id: 'c', text: 'الخوارزمية التسلسلية', isCorrect: true, feedback: 'صح! التسلسلية بتنفذ خطوة بعد خطوة بترتيب ثابت.' },
              { id: 'd', text: 'خوارزمية البحث', isCorrect: false, feedback: 'البحث للعثور على عنصر.' },
            ],
            explanation: 'الخوارزمية التسلسلية تنفذ الأوامر بالترتيب من أعلى إلى أسفل دون تفرع.',
          },
        },
      ],
    },
    {
      id: '2.1-c7',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '2.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'الخوارزمية هي خطوات مرتبة منطقيًا للحل، وخريطة التدفق بترسمها بـ ٤ أشكال قياسية: **البيضاوي** (بداية/نهاية)، **متوازي الأضلاع** (إدخال/إخراج)، **المستطيل** (عمليات)، و**المعيّن** (قرار). وعرفنا أول نوعين: **التسلسلية** و**الشرطية**. في الدرس الجاي هنكمّل باقي الأنواع: التكرار والبحث والترتيب!',
          },
        },
      ],
    },
  ],
  summary:
    'تعلمنا تعريف الخوارزمية ورموز خرائط التدفق الأربعة، وطبقنا الخوارزمية التسلسلية والشرطية.',
  additionalSources: [
    {
      id: 'nb-2-1-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'الخوارزمية هي خطة الحل المرتبة، وخريطة التدفق بترسم الخطة دي بأشكال قياسية عالمية قبل كتابة الكود.',
      bullets: [
        'الشكل البيضاوي (Oval) = البداية والنهاية.',
        'متوازي الأضلاع (Parallelogram) = الإدخال والإخراج.',
        'المستطيل (Rectangle) = العمليات الحسابية والمعالجة.',
        'المعيّن (Diamond) = اتخاذ القرار / الشرط.',
      ],
    },
    {
      id: 'nb-2-1-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-2-1-1',
          question: 'إيه الفرق بين الخوارزمية وخريطة التدفق؟',
          answer: 'الخوارزمية هي الخطوات المكتوبة بالكلام أو الرموز المرتبة، وخريطة التدفق هي الرسم الهندسي لنفس الخطوات بالأشكال والأسهم.',
        },
        {
          id: 'faq-2-1-2',
          question: 'ينفع نستخدم المستطيل للإدخال أو الطباعة؟',
          answer: 'لا! الإدخال والطباعة (الإخراج) لهم شكل متوازي الأضلاع بس، والمستطيل للعمليات الحسابية مثل sum = a + b.',
        },
        {
          id: 'faq-2-1-3',
          question: 'إمتى الخوارزمية تبقى شرطية مش تسلسلية؟',
          answer: 'لما يبقى فيها قرار (مثل if num > 0:) يخلي البرنامج يمشي في مسار من اتنين حسب النتيجة.',
        },
      ],
    },
    {
      id: 'nb-2-1-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-2-1',
        label: 'خرائط التدفق وأول خوارزميتين',
        children: [
          {
            id: 'mm-2-1-shapes',
            label: 'رموز خريطة التدفق',
            children: [
              { id: 'mm-2-1-s1', label: 'بيضاوي: Start / End' },
              { id: 'mm-2-1-s2', label: 'متوازي أضلاع: Input / Output' },
              { id: 'mm-2-1-s3', label: 'مستطيل: Process' },
              { id: 'mm-2-1-s4', label: 'معيّن: Decision' },
            ],
          },
          {
            id: 'mm-2-1-types',
            label: 'أول نوعين من الخوارزميات',
            children: [
              { id: 'mm-2-1-t1', label: 'تسلسلية (خطوة تلو الأخرى)' },
              { id: 'mm-2-1-t2', label: 'شرطية (if / else)' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-2-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g21-1', termAr: 'الخوارزمية', termEn: 'Algorithm', definition: 'مجموعة من الخطوات المرتبة والمنطقية لحل مشكلة معينة.' },
        { id: 'g21-2', termAr: 'خريطة التدفق', termEn: 'Flowchart', definition: 'تمثيل رسومي لخطوات الخوارزمية باستخدام أشكال هندسية قياسية وأسهم.' },
        { id: 'g21-3', termAr: 'الخوارزمية التسلسلية', termEn: 'Sequential Algorithm', definition: 'تنفيذ الأوامر بالترتيب من أعلى إلى أسفل دون تفرع.' },
        { id: 'g21-4', termAr: 'الخوارزمية الشرطية', termEn: 'Conditional Algorithm', definition: 'تحديد مسار التنفيذ بناءً على تحقق شرط باستخدام if / else.' },
      ],
    },
  ],
  sources: [
    { id: 's21-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'الدرس ٢: خرائط التدفق والخوارزميات التسلسلية والشرطية', pages: 'ص 18–21' },
    { id: 's21-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٢.١', detail: 'دليل الأشكال الهندسية الأربعة والفارق بين التسلسلية والشرطية' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '2.2',
    label: 'الدرس الجاي: خوارزميات التكرار والبحث والترتيب',
    description: 'استكشف الأنواع الخمسة كلها في بطاقات منظمة وجرّب البحث والترتيب في Python.',
  },
};
