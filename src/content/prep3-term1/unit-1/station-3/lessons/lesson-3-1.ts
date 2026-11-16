import type { LessonPack } from '@/types/curriculum';

export const LESSON_3_1: LessonPack = {
  id: '3.1',
  stationId: 'station-3',
  unitId: 'unit-1',
  order: 1,
  title: 'السلاسل النصية Strings: الفهرسة ودوال النصوص',
  subtitle: 'العد في Python بيبدأ من صفر! تعامل مع الحروف والطول والبحث والتكبير',
  durationMin: 9,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
  objectives: [
    'تعرّف السلسلة النصية (String) داخل علامتي تنصيص " " أو \' \'.',
    'تستخرج أي حرف من النص باستخدام الفهرسة الموجبة (0, 1...) والسالبة (-1...).',
    'تستخدم الدوال والمعاملات: len() و in و upper() والتكرار for على الحروف.',
  ],
  cards: [
    {
      id: '3.1-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '3.1-hero',
          type: 'heroHook',
          data: {
            title: 'السلاسل النصية Strings في Python',
            durationMin: 9,
            stationLabel: 'المحطة ٣ · الدرس ١ من ٤',
            goal: 'تقرأ طول النص وتوصل لأي حرف بالفهرسة الموجبة والسالبة وتبحث جوه النصوص.',
            hook: 'لما بتسجل اسمك أو كلمة سر على أي موقع، إزاي البرنامج بيعرف عدد الحروف، أو أول حرف إيه، أو هل فيها رمز معين؟ كل ده بيتم عن طريق السلاسل النصية (Strings)!',
          },
        },
      ],
    },
    {
      id: '3.1-c2',
      title: 'جدول فهرسة "hello" والعمليات الخمس',
      role: 'concept',
      blocks: [
        {
          id: '3.1-str-def',
          type: 'richText',
          data: {
            heading: 'السلسلة النصية والفهرسة (Indexing)',
            body: '**السلسلة النصية (String)** هي مجموعة حروف أو أرقام أو رموز محاطة بعلامتي تنصيص `" "` أو `\' \'`، مثل `text = "hello"`.\nبص على جدول ترقيم الحروف من اليسار لليمين (موجب بيبدأ من `0`) ومن اليمين لليسار (سالب بيبدأ من `-1`):',
          },
        },
        {
          id: '3.1-index-table',
          type: 'tableBlock',
          data: {
            heading: 'جدول فهرسة كلمة "hello" (ص ٣٢)',
            headers: ['الحرف / الاتجاه', 'h', 'e', 'l', 'l', 'o'],
            rows: [
              ['الترقيم الموجب (من البداية)', '0', '1', '2', '3', '4'],
              ['الترقيم السالب (من النهاية)', '-5', '-4', '-3', '-2', '-1'],
            ],
          },
        },
        {
          id: '3.1-code-ex',
          type: 'codeView',
          data: {
            title: 'العمليات الخمس على السلاسل النصية (ص ٣٢–٣٣)',
            code: 'text = "hello"\nprint(len(text))      # 5\nprint(text[0])        # h\nprint(text[-1])       # o\nprint("h" in text)    # True\nprint(text.upper())   # HELLO',
            caption: 'الدالة len() تحسب الطول، وin ترجع True أو False، وupper() تكبّر كل الحروف.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '3.1-c3',
      title: 'المرحلة ٢ و ٣ · أكمل وحل لوحدك',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.1-fill',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل طباعة الحرف الأول',
            prompt: 'أكمل السطر الناقص علشان يطبع الحرف الأول من `"hello"` باستخدام الفهرس الصحيح.',
            starterCode: 'text = "hello"\n# اطبع الحرف الأول هنا\nprint(text[-1])',
            solutionCode: 'text = "hello"\nprint(text[0])\nprint(text[-1])',
            checks: [
              { id: 'c-h-o', label: 'يطبع h ثم o', stdin: [], contains: ['h', 'o'] },
            ],
            hint: 'العد في Python بيبدأ من صفر، يبقى الحرف الأول هو text[0].',
          },
        },
        {
          id: '3.1-free',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'مسألة قريبة: بطاقة الاسم "Sara"',
            prompt: 'لنفترض `name = "Sara"`. اكتب برنامجًا يطبع طول الاسم (`len`)، ثم الحرف الأول، ثم الحرف الأخير، كل واحد في سطر `print()`.',
            starterCode: 'name = "Sara"\n# اطبع الطول والحرف الأول والأخير هنا\n',
            solutionCode: 'name = "Sara"\nprint(len(name))\nprint(name[0])\nprint(name[-1])',
            checks: [
              { id: 'sara', label: 'النتيجة 4 و S و a', stdin: [], contains: ['4', 'S', 'a'] },
            ],
            hint: 'استخدم print(len(name)) و print(name[0]) و print(name[-1]).',
          },
        },
      ],
    },
    {
      id: '3.1-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '3.1-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'أشهر فخ في الامتحان: العد بيبدأ من 0 مش 1!',
            body: 'في `"hello"`، العنصر `text[1]` هو الحرف **`"e"`** مش `"h"`!\nالحرف الأول دايمًا مكانه **`text[0]`**، والحرف الأخير مكانه **`text[-1]`**.',
          },
        },
      ],
    },
    {
      id: '3.1-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '3.1-q1',
          type: 'quizQuestion',
          data: {
            question: 'في السلسلة النصية `text = "hello"`، ما الحرف الذي ترجعه `text[0]`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٣٨',
            options: [
              { id: 'a', text: '"e"', isCorrect: false, feedback: 'ده text[1] مش text[0].' },
              { id: 'b', text: '"l"', isCorrect: false, feedback: 'ده text[2].' },
              { id: 'c', text: '"h"', isCorrect: true, feedback: 'صح! الفهرس 0 هو أول حرف.' },
              { id: 'd', text: '"o"', isCorrect: false, feedback: 'ده آخر حرف text[-1].' },
            ],
            explanation: 'الفهرسة تبدأ من 0، لذلك text[0] هي الحرف الأول "h".',
          },
        },
        {
          id: '3.1-q2',
          type: 'quizQuestion',
          data: {
            question: 'ما النتيجة المتوقعة للكود `text = "Python"; print(len(text))`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٣٨',
            options: [
              { id: 'a', text: '5', isCorrect: false, feedback: 'عدّ الحروف بدقة: P-y-t-h-o-n.' },
              { id: 'b', text: '6', isCorrect: true, feedback: 'إجابة صحيحة: كلمة Python مكونة من 6 حروف.' },
              { id: 'c', text: '7', isCorrect: false, feedback: 'عدد الحروف 6 فقط.' },
              { id: 'd', text: 'خطأ في البرنامج', isCorrect: false, feedback: 'الكود صحيح.' },
            ],
            explanation: 'len("Python") تحسب عدد الحروف وهو 6.',
          },
        },
      ],
    },
    {
      id: '3.1-c6',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '3.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'السلسلة النصية (`String`) بتتكتب بين علامتي تنصيص، والفهرسة فيها بتبدأ من `0` من البداية ومن `-1` من النهاية. ومعانا أدوات قوية زي `len()` للطول و `upper()` للتكبير و `in` للبحث عن حرف أو كلمة جوه النص.',
          },
        },
      ],
    },
  ],
  summary: 'السلاسل النصية والفهرسة الموجبة والسالبة ودوال len و upper ومعامل in.',
  additionalSources: [
    {
      id: 'nb-3-1-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'النصوص في Python بتتعامل كسلسلة حروف مرقمة، وده بيسهّل الوصول لأي حرف أو حساب الطول أو البحث جوه الكلمة.',
      bullets: [
        'الفهرس الموجب يبدأ من 0، والسالب يبدأ من -1 (آخر حرف).',
        'len(text) تحسب عدد الحروف (بما فيها المسافات).',
        '"a" in text ترجع True أو False حسب وجود الحرف.',
        'text.upper() تحوّل الحروف إلى حروف كبيرة (Capital).',
      ],
    },
    {
      id: 'nb-3-1-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-3-1-1',
          question: 'لو كتبت text = "hi " فيها مسافة في الآخر، len(text) هتطلع كام؟',
          answer: 'هتطلع 3! لأن المسافة بتتحسب حرفًا جوه السلسلة النصية.',
        },
        {
          id: 'faq-3-1-2',
          question: 'إيه فائدة الفهرسة السالبة زي text[-1]؟',
          answer: 'بتوصلك لآخر حرف في أي كلمة فورًا من غير ما تضطر تعرف طول الكلمة الأول!',
        },
      ],
    },
    {
      id: 'nb-3-1-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-3-1',
        label: 'السلاسل النصية (Strings)',
        children: [
          {
            id: 'mm-3-1-idx',
            label: 'الفهرسة (Indexing)',
            children: [
              { id: 'mm-3-1-i1', label: 'موجب من 0 (أول حرف)' },
              { id: 'mm-3-1-i2', label: 'سالب من -1 (آخر حرف)' },
            ],
          },
          {
            id: 'mm-3-1-ops',
            label: 'العمليات والدوال',
            children: [
              { id: 'mm-3-1-o1', label: 'len(): حساب الطول' },
              { id: 'mm-3-1-o2', label: 'in: البحث داخل النص' },
              { id: 'mm-3-1-o3', label: 'upper(): تحويل لحروف كبيرة' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-3-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g31-1', termAr: 'السلسلة النصية', termEn: 'String', definition: 'مجموعة من الحروف أو الأرقام أو الرموز داخل علامتي تنصيص.' },
        { id: 'g31-2', termAr: 'الفهرسة', termEn: 'Indexing', definition: 'تحديد موقع العنصر أو الحرف بدءًا من 0 (موجب) أو -1 من النهاية (سالب).' },
        { id: 'g31-3', termAr: 'دالة الطول', termEn: 'len()', definition: 'دالة مدمجة في Python تعيد عدد العناصر أو الحروف.' },
      ],
    },
  ],
  sources: [
    { id: 's31-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'السلاسل النصية Strings والفهرسة', pages: 'ص 31–33' },
    { id: 's31-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٣.١', detail: 'جدول فهرسة "hello" ودوال النصوص' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '3.2',
    label: 'الدرس الجاي: القوائم Lists',
    description: 'خزّن أكثر من قيمة في متغير واحد وأضف واحذف بـ append و remove.',
  },
};
