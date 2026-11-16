import type { LessonPack } from '@/types/curriculum';

export const LESSON_3_3: LessonPack = {
  id: '3.3',
  stationId: 'station-3',
  unitId: 'unit-1',
  order: 3,
  title: 'الفروق الجوهرية والتحويل (Mutable vs Immutable)',
  subtitle: 'ليه القائمة بتتعدل والنص لأ؟ وإزاي نحول النص لقائمة حروف بـ list()',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'draft',
  objectives: [
    'تقارن بين السلسلة النصية والقائمة من حيث القابلية للتعديل (Immutable vs Mutable) والأقواس.',
    'تحوّل السلسلة النصية إلى قائمة حروف باستخدام الدالة list(text).',
    'تعدّل عنصرًا داخل قائمة مباشرة عبر فهرسه مثل items[0] = ...',
  ],
  cards: [
    {
      id: '3.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '3.3-hero',
          type: 'heroHook',
          data: {
            title: 'String مقابل List: سر القابلية للتعديل',
            durationMin: 8,
            stationLabel: 'المحطة ٣ · الدرس ٣ من ٤',
            goal: 'تفرّق بين القابل للتعديل (Mutable) وغير القابل للتعديل (Immutable) وتحوّل النص لقائمة.',
            hook: 'لو جربت تغير أول حرف في كلمة `"hello"` بأمر `text[0] = "H"`، بايثون هيرفض! لكن في القائمة `letters[0] = "H"` بينفذ فورًا. تعال نعرف ليه!',
          },
        },
      ],
    },
    {
      id: '3.3-c2',
      title: 'جدول المقارنة الرسمي (من Export C وكتاب الوزارة)',
      role: 'concept',
      blocks: [
        {
          id: '3.3-table',
          type: 'tableBlock',
          data: {
            heading: 'الفرق بين السلسلة النصية (String) والقائمة (List)',
            headers: ['الخاصية', 'السلسلة النصية (String)', 'القائمة (List)'],
            rows: [
              ['نوع البيانات', 'حروف ونصوص داخل تنصيص', 'أي نوع (أرقام، نصوص، منطقية...)'],
              ['القابلية للتعديل', 'غير قابلة للتعديل (Immutable)', 'قابلة للتعديل (Mutable)'],
              ['الأقواس / الإحاطة', '" " أو \' \'', '[ ]'],
              ['تغيير عنصر بالفهرس', 'غير مسموح', 'مسموح'],
            ],
          },
        },
        {
          id: '3.3-conv-code',
          type: 'codeView',
          data: {
            title: 'التحويل بين النص والقائمة (ص ٣٥)',
            code: 'text = "hello"\nletters = list(text)\nprint(letters)  # [\'h\', \'e\', \'l\', \'l\', \'o\']\nletters[0] = "H"\nprint(letters)',
            caption: 'تحويل النص إلى قائمة حروف بـ list() يسمح لنا بتعديل أي حرف بسهولة.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '3.3-c3',
      title: 'جرّب بنفسك: صنّف وحوّل النص لقائمة',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.3-sort',
          type: 'sortingBuckets',
          data: {
            prompt: 'وزّع كل خاصية بين السلسلة النصية (String) والقائمة (List):',
            buckets: [
              { id: 'str', label: 'السلسلة النصية (String)' },
              { id: 'lst', label: 'القائمة (List)' },
            ],
            items: [
              { id: 'sl1', text: 'غير قابلة للتعديل (Immutable)', bucketId: 'str' },
              { id: 'sl2', text: 'تُحاط بعلامتي تنصيص " "', bucketId: 'str' },
              { id: 'sl3', text: 'قابلة للتعديل (Mutable)', bucketId: 'lst' },
              { id: 'sl4', text: 'تُحاط بأقواس مربعة [ ]', bucketId: 'lst' },
            ],
            feedback: {
              correct: 'ممتاز! كده مستحيل تتلخبط بينهم في الامتحان.',
              incorrect: 'تذكّر: القائمة [ ] Mutable يعني بتتعدل، والنص " " Immutable مش بيتعدل.',
            },
          },
        },
        {
          id: '3.3-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'حوّل كلمة "code" لقائمة حروف',
            prompt: 'أكمل السطر الناقص باستخدام دالة `list()` لتحويل `word` إلى قائمة ثم طباعتها.',
            starterCode: 'word = "code"\n# حوّل word إلى قائمة باسم chars هنا\nprint(chars)',
            solutionCode: 'word = "code"\nchars = list(word)\nprint(chars)',
            checks: [
              { id: 'chars-chk', label: 'تتحول لقائمة حروف c, o, d, e', stdin: [], contains: ['c', 'o', 'd', 'e'] },
            ],
            hint: 'اكتب chars = list(word).',
          },
        },
      ],
    },
    {
      id: '3.3-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '3.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'مصطلح مهم جدًا: Immutable vs Mutable',
            body: '• **Immutable (غير قابل للتعديل):** السلسلة النصية String.\n• **Mutable (قابل للتعديل):** القائمة List — نقدر نضيف بـ `append()` ونحذف بـ `remove()` ونغيّر قيمة عنصر بفهرسه.',
          },
        },
      ],
    },
    {
      id: '3.3-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '3.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما الفرق الأساسي بين السلسلة النصية (String) والقائمة (List)؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤٠',
            options: [
              { id: 'a', text: 'السلسلة النصية تستخدم [ ] والقائمة تستخدم " "', isCorrect: false, feedback: 'العكس هو الصحيح.' },
              { id: 'b', text: 'القائمة قابلة للتعديل (Mutable) والسلسلة النصية غير قابلة للتعديل (Immutable)', isCorrect: true, feedback: 'إجابة صحيحة 100%.' },
              { id: 'c', text: 'السلسلة النصية تحتوي على أرقام فقط', isCorrect: false, feedback: 'النص يتكون من حروف ورموز أيضًا.' },
              { id: 'd', text: 'القائمة لا يمكن أن تحتوي على نصوص', isCorrect: false, feedback: 'القائمة تقبل النصوص وأي أنواع أخرى.' },
            ],
            explanation: 'القائمة Mutable تقبل التعديل، بينما السلسلة النصية Immutable.',
          },
        },
      ],
    },
    {
      id: '3.3-c6',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '3.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'السلسلة النصية **Immutable** (ثابتة بعد الإنشاء) وتُكتب بـ `" "`، بينما القائمة **Mutable** (تتعدل بحرية) وتُكتب بـ `[ ]`، ونقدر نحول النص لقائمة بـ `list(text)`. في الدرس الأخير من المحطة هنبني مشروع الكتاب العملي: فحص قوة كلمة المرور!',
          },
        },
      ],
    },
  ],
  summary: 'المقارنة بين String (Immutable) و List (Mutable) والتحويل بينهما باستخدام list().',
  additionalSources: [
    {
      id: 'nb-3-3-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content: 'String ثابتة (Immutable) و List قابلة للتعديل (Mutable)، ويمكن التحويل عبر list(text).',
    },
    {
      id: 'nb-3-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g33-1', termAr: 'قابل للتعديل', termEn: 'Mutable', definition: 'خاصية تعني إمكانية تعديل العناصر بعد الإنشاء مثل القوائم Lists.' },
        { id: 'g33-2', termAr: 'غير قابل للتعديل', termEn: 'Immutable', definition: 'خاصية تعني عدم إمكانية تغيير الحروف مباشرة بعد الإنشاء مثل Strings.' },
      ],
    },
  ],
  sources: [
    { id: 's33-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'جدول مقارنة String و List والتحويل بـ list()', pages: 'ص 35' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '3.4',
    label: 'الدرس الجاي: مشروع فحص كلمة المرور',
    description: 'ادمج Strings و Lists و break في مشروع عملي من الكتاب.',
  },
};
