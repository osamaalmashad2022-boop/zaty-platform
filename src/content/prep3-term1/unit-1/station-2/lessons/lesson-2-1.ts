import type { LessonPack } from '@/types/curriculum';

export const LESSON_2_1: LessonPack = {
  id: '2.1',
  stationId: 'station-2',
  unitId: 'unit-1',
  order: 1,
  title: 'رموز خرائط التدفق والمسار التسلسلي والشرطي',
  subtitle: 'ارسم خطوات الحل بالأشكال الهندسية القياسية واكتب أول خوارزمية شرطية',
  durationMin: 9,
  contentVersion: 1,
  access: 'free',
  status: 'draft',
  objectives: [
    'تعرف معنى الخوارزمية (Algorithm) وتذكر مثالًا عمليًا لها.',
    'تميّز وظائف أشكال خريطة التدفق الأربعة: البيضاوي، المستطيل، متوازي الأضلاع، والمعيّن.',
    'تبني خريطة تدفق بسيطة وتطبق الخوارزمية التسلسلية والشرطية بلغة Python.',
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
            hook: 'تخيل عايز تعمل كوباية شاي: بتغلي المية الأول، بعدين تحط الشاي والسكر بالترتيب. في البرمجة الترتيب المنطقي ده اسمه «خوارزمية»، ولما نرسمه بأشكال هندسية يبقى اسمه «خريطة تدفق»!',
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
            body: '**الخوارزمية** هي مجموعة من الخطوات المرتبة ترتيبًا منطقيًا لحل مشكلة معينة.\n\nعند رسم خريطة التدفق، كل شكل هندسي له وظيفة محددة، والأسهم توضّح اتجاه التنفيذ من البداية إلى النهاية:',
          },
        },
        {
          id: '2.1-table',
          type: 'tableBlock',
          data: {
            heading: 'أشكال خريطة التدفق القياسية',
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
            title: 'التسلسلية والشرطية في Python',
            code: '# ١. خوارزمية تسلسلية: ترحيب بالاسم\nname = input("Enter your name: ")\nprint("Hello", name)\n\n# ٢. خوارزمية شرطية: موجب أم سالب\nnum = int(input("Enter a number: "))\nif num > 0:\n    print("Positive number")\nelse:\n    print("Negative or zero")',
            caption: 'التسلسلية تنفذ سطرًا تلو الآخر من أعلى لأسفل، والشرطية تعتمد على جملة if.',
            runnable: true,
          },
        },
        {
          id: '2.1-codelab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل الخوارزمية الشرطية (موجب أم سالب)',
            prompt: 'أكمل سطر الشرط `if num > 0:` لاختبار هل الرقم المدخل موجب أم لا.',
            starterCode:
              'num = int(input("Enter a number: "))\n# اكتب شرط الاختبار هنا\n    print("Positive")\nelse:\n    print("Not positive")',
            solutionCode:
              'num = int(input("Enter a number: "))\nif num > 0:\n    print("Positive")\nelse:\n    print("Not positive")',
            checks: [
              { id: 'pos', label: 'الرقم 9 -> Positive', stdin: ['9'], expectedOutputRegex: 'Positive' },
              { id: 'neg', label: 'الرقم -3 -> Not positive', stdin: ['-3'], expectedOutputRegex: 'Not positive' },
            ],
            hint: 'اكتب if num > 0: ولا تنسَ النقطتين في الآخر.',
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
            title: 'خلّي بالك: رموز خريطة التدفق لا تتبدّل!',
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
              { id: 'a', text: 'الخوارزمية الشرطية', isCorrect: false, feedback: 'الشرطية تتفرع حسب الشرط.' },
              { id: 'b', text: 'الخوارزمية التكرارية', isCorrect: false, feedback: 'التكرارية تعيد نفس العملية.' },
              { id: 'c', text: 'الخوارزمية التسلسلية', isCorrect: true, feedback: 'صح! التسلسلية تنفذ خطوة بعد خطوة بترتيب ثابت.' },
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
            body: 'الخوارزمية هي خطوات مرتبة منطقيًا للحل، وخريطة التدفق بترسمها بـ ٤ أشكال قياسية (البيضاوي، متوازي الأضلاع، المستطيل، المعيّن). عرفنا أول نوعين من الخوارزميات: **التسلسلية** (بترتيب ثابت) و**الشرطية** (بشرط `if / else`). في الدرس الجاي هنكمّل باقي الأنواع: التكرار والبحث والترتيب!',
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
      title: 'ملخص سريع',
      content: 'تعرّفنا على رموز خرائط التدفق القياسية وأول نوعين من الخوارزميات التقليدية.',
      bullets: [
        'البيضاوي = البداية والنهاية.',
        'متوازي الأضلاع = الإدخال والإخراج.',
        'المستطيل = العمليات الحسابية.',
        'المعيّن = الشرط والقرار.',
      ],
    },
    {
      id: 'nb-2-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g21-1', termAr: 'الخوارزمية', termEn: 'Algorithm', definition: 'مجموعة من الخطوات المرتبة والمنطقية لحل مشكلة معينة.' },
        { id: 'g21-2', termAr: 'خريطة التدفق', termEn: 'Flowchart', definition: 'تمثيل رسومي لخطوات الخوارزمية باستخدام أشكال هندسية قياسية وأسهم.' },
      ],
    },
  ],
  sources: [
    { id: 's21-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'الدرس ٢: خرائط التدفق والخوارزميات التسلسلية والشرطية', pages: 'ص 18–21' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '2.2',
    label: 'الدرس الجاي: خوارزميات التكرار والبحث والترتيب',
    description: 'استكشف الأنواع الثلاثة المتبقية في Accordion تفاعلي ومطابقة الأمثلة.',
  },
};
