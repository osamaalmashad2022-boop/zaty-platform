import type { LessonPack } from '@/types/curriculum';

export const LESSON_3_2: LessonPack = {
  id: '3.2',
  stationId: 'station-3',
  unitId: 'unit-1',
  order: 2,
  title: 'القوائم Lists: الإنشاء والإضافة والحذف والتكرار',
  subtitle: 'احفظ قائمة أسماء أو درجات في متغير واحد وعدّلها بسهولة',
  durationMin: 8,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
  objectives: [
    'تعرّف القائمة (List) داخل أقواس مربعة [ ] مع إمكانية تنوّع أنواع بياناتها.',
    'تصل لعناصر القائمة بالفهرس وتضيف عناصر بـ append() وتحذف بـ remove().',
    'تستخدم الحلقة for للمرور على عناصر القائمة واحدًا تلو الآخر.',
  ],
  cards: [
    {
      id: '3.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '3.2-hero',
          type: 'heroHook',
          data: {
            title: 'القوائم المنظمة Lists في Python',
            durationMin: 8,
            stationLabel: 'المحطة ٣ · الدرس ٢ من ٤',
            goal: 'تنشئ قائمة [ ] وتوصل لعناصرها وتضيف بـ append() وتحذف بـ remove().',
            hook: 'بدل ما تعمل ١٠ متغيرات لـ ١٠ درجات (`g1, g2, g3...`)، القائمة (`List`) بتجمعهم كلهم في متغير واحد مرتب وتقدر تزوّد أو تشيل منه في أي وقت!',
          },
        },
      ],
    },
    {
      id: '3.2-c2',
      title: 'مثال محلول: عمليات القوائم',
      role: 'example',
      blocks: [
        {
          id: '3.2-desc',
          type: 'richText',
          data: {
            heading: 'إزاي بنشتغل على القوائم (Lists)؟',
            body: '**القائمة (List)** هي مجموعة مرتبة من القيم جوه قوسين مربعين `[ ]` وقابلة للتعديل، وممكن تجمع أرقام ونصوص وقيم منطقية مع بعض زي `[1, "two", 3.0, True]`.\n• `append()` بتضيف عنصر لنهاية القائمة.\n• `remove()` بتحذف العنصر اللي بتحدده باسمه أو قيمته.\n• وكمان نقدر نلف على عناصرها بحلقة `for item in list:`.',
          },
        },
        {
          id: '3.2-code',
          type: 'codeView',
          data: {
            title: 'عمليات القوائم من الكتاب (ص ٣٤)',
            code: 'names = ["Ahmed", "Ali", "Sara"]\nprint(names[0])       # Ahmed\nnames.append("Omar")  # إضافة في النهاية\nprint(names)\nnames.remove("Ali")   # حذف عنصر محدد\nprint(names)',
            caption: 'القائمة تبدأ فهرستها أيضًا من 0 مثل السلاسل النصية.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '3.2-c3',
      title: 'جرّب بنفسك: أكمل ثم برمج قائمة درجات',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.2-fill',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أضف الاسم "Sara" لنهاية القائمة',
            prompt: 'أكمل السطر الناقص لإضافة `"Sara"` لنهاية قائمة `names` وبعدين اطبعها.',
            starterCode: 'names = ["Ahmed", "Ali"]\n# أضف "Sara" باستخدام append هنا\nprint(names)',
            solutionCode: 'names = ["Ahmed", "Ali"]\nnames.append("Sara")\nprint(names)',
            checks: [
              { id: 'sara-list', label: 'القائمة تحتوي Sara في النهاية', stdin: [], contains: ['Ahmed', 'Ali', 'Sara'] },
            ],
            hint: 'اكتب names.append("Sara").',
          },
        },
        {
          id: '3.2-free',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'المسألة القريبة: قائمة الدرجات',
            prompt: 'لديك قائمة `grades = [70, 80, 90]`. اطبع العنصر الأول، ثم أضف الدرجة `100` باستخدام `append`، ثم اطبع القائمة كاملة.',
            starterCode: 'grades = [70, 80, 90]\n# اكتب الأوامر الثلاثة هنا\n',
            solutionCode: 'grades = [70, 80, 90]\nprint(grades[0])\ngrades.append(100)\nprint(grades)',
            checks: [
              { id: 'gr-chk', label: 'طباعة 70 ثم [70, 80, 90, 100]', stdin: [], contains: ['70', '100'] },
            ],
            hint: 'print(grades[0]) ثم grades.append(100) ثم print(grades).',
          },
        },
      ],
    },
    {
      id: '3.2-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '3.2-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'انتبه لنوع الأقواس!',
            body: 'القائمة (`List`) لازم تتحط جوه **أقواس مربعة `[ ]`**، مش `( )` ولا `{ }` ولا `" "`!',
          },
        },
      ],
    },
    {
      id: '3.2-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '3.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'في القائمة `numbers = [10, 20, 30, 40]`، ما القيمة التي ترجعها `numbers[2]`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤٠',
            options: [
              { id: 'a', text: '10', isCorrect: false, feedback: '10 هي numbers[0].' },
              { id: 'b', text: '20', isCorrect: false, feedback: '20 هي numbers[1].' },
              { id: 'c', text: '30', isCorrect: true, feedback: 'صح! الفهرس 2 هو العنصر الثالث وهو 30.' },
              { id: 'd', text: '40', isCorrect: false, feedback: '40 هي numbers[3].' },
            ],
            explanation: 'الفهرسة تبدأ من 0: 0->10, 1->20, 2->30.',
          },
        },
        {
          id: '3.2-q2',
          type: 'quizQuestion',
          data: {
            question: 'في القائمة `items = [1, "two", 3.0, True]`، أي خاصية تُظهرها هذه القائمة؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤١',
            options: [
              { id: 'a', text: 'القائمة يمكن أن تحتوي على أرقام فقط', isCorrect: false, feedback: 'موجود فيها نص وقيمة منطقية كمان.' },
              { id: 'b', text: 'القائمة يمكن أن تحتوي على نصوص فقط', isCorrect: false, feedback: 'لا، فيها أرقام.' },
              { id: 'c', text: 'القائمة يمكن أن تحتوي على أنواع مختلفة من البيانات', isCorrect: true, feedback: 'بالظبط! تجمع أرقامًا ونصوصًا وعشرية ومنطقية معًا.' },
              { id: 'd', text: 'القائمة لا يمكن أن تحتوي على قيم منطقية', isCorrect: false, feedback: 'تحتوي على True عادي.' },
            ],
            explanation: 'القائمة في Python مرنة ويمكن أن تجمع أنواع بيانات مختلفة في وقت واحد.',
          },
        },
      ],
    },
    {
      id: '3.2-c6',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '3.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'القوائم (`Lists`) تُحاط بأقواس مربعة `[ ]` وتقبل أنواع بيانات متنوعة، ونعدل عليها بـ `append()` للإضافة و`remove()` للحذف. في الدرس الجاي هنقارن بين السلاسل النصية والقوائم ونشوف إزاي نحوّل النص لقائمة حروف!',
          },
        },
      ],
    },
  ],
  summary: 'تعلمنا القوائم [ ]، الفهرسة، الإضافة بـ append()، الحذف بـ remove()، وتنوع بيانات القائمة.',
  additionalSources: [
    {
      id: 'nb-3-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'القائمة [ ] بنية بيانات مرنة تجمع عناصر متعددة وتبدأ فهرستها من 0 وتقبل الإضافة والحذف.',
      bullets: [
        'تنشأ بأقواس مربعة مثل nums = [10, 20, 30].',
        'append(x) تضيف عنصرًا في نهاية القائمة.',
        'remove(x) تحذف أول ظهور للعنصر x من القائمة.',
        'يمكن أن تضم أرقامًا ونصوصًا وقيمًا منطقية في نفس القائمة.',
      ],
    },
    {
      id: 'nb-3-2-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-3-2-1',
          question: 'إيه الفرق بين append() و remove()؟',
          answer: 'append() بتزود عنصر جديد في آخر القائمة، بينما remove() بتدور على قيمة محددة وتمسحها من القائمة.',
        },
        {
          id: 'faq-3-2-2',
          question: 'هل القائمة لازم تكون كلها أرقام أو كلها نصوص؟',
          answer: 'لا! في Python القائمة مرنة وتقدر تحط جواها أرقام صحيحة وعشرية ونصوص وقيم True/False مع بعض.',
        },
      ],
    },
    {
      id: 'nb-3-2-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-3-2',
        label: 'القوائم (Lists [ ])',
        children: [
          { id: 'mm-3-2-1', label: 'الإنشاء: داخل [ ] وبأنواع متنوعة' },
          { id: 'mm-3-2-2', label: 'الوصول: بالفهرس [0] و [-1]' },
          { id: 'mm-3-2-3', label: 'التعديل: append() للإضافة و remove() للحذف' },
          { id: 'mm-3-2-4', label: 'التكرار: for item in list:' },
        ],
      },
    },
    {
      id: 'nb-3-2-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g32-1', termAr: 'القائمة', termEn: 'List [ ]', definition: 'مجموعة مرتبة وقابلة للتعديل من القيم داخل أقواس مربعة.' },
        { id: 'g32-2', termAr: 'دالة الإضافة', termEn: 'append()', definition: 'دالة تضيف عنصرًا جديدًا في نهاية القائمة.' },
        { id: 'g32-3', termAr: 'دالة الحذف', termEn: 'remove()', definition: 'دالة تحذف عنصرًا محددًا بقيمته من القائمة.' },
      ],
    },
  ],
  sources: [
    { id: 's32-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'القوائم Lists وعملياتها', pages: 'ص 34' },
    { id: 's32-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٣.٢', detail: 'عمليات القوائم والوصول والتكرار' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '3.3',
    label: 'الدرس الجاي: String مقابل List',
    description: 'اعرف الفرق بين Mutable و Immutable والتحويل بـ list(text).',
  },
};
