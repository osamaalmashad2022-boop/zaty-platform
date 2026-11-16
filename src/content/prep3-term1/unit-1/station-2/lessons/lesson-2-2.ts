import type { LessonPack } from '@/types/curriculum';

export const LESSON_2_2: LessonPack = {
  id: '2.2',
  stationId: 'station-2',
  unitId: 'unit-1',
  order: 2,
  title: 'خوارزميات التكرار والبحث والترتيب',
  subtitle: 'افتح الأنواع الخمسة كلها في بطاقات منظمة وطابق كل خوارزمية بمثالها',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'draft',
  objectives: [
    'تستعرض أنواع الخوارزميات التقليدية الخمسة وتفهم دور كل نوع.',
    'تقرأ وتكتب خوارزميات التكرار والبحث عن عنصر في قائمة بلغة Python.',
    'تميّز بين خوارزمية البحث (Search) وخوارزمية الترتيب (Sorting) ودالة sort().',
  ],
  cards: [
    {
      id: '2.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '2.2-hero',
          type: 'heroHook',
          data: {
            title: 'الخوارزميات الخمس في حياتنا والكود',
            durationMin: 8,
            stationLabel: 'المحطة ٢ · الدرس ٢ من ٤',
            goal: 'تميّز بين الأنواع الخمسة للخوارزميات التقليدية وتكتب كود تكرار وبحث في Python.',
            hook: 'لما بتدور على اسمك في كشف درجات المدرسة (دي خوارزمية بحث)، ولما بترتّب الكشف حسب الدرجات من الصغير للكبير (دي خوارزمية ترتيب)!',
          },
        },
      ],
    },
    {
      id: '2.2-c2',
      title: 'الأنواع الخمسة للخوارزميات التقليدية',
      role: 'concept',
      blocks: [
        {
          id: '2.2-acc',
          type: 'accordionBlock',
          data: {
            heading: 'اضغط على أي نوع لاستعراض شرحه وكوده من الكتاب',
            openMode: 'multiple',
            items: [
              {
                id: 'alg-1',
                title: '١. الخوارزميات التسلسلية (Sequential)',
                body: 'تُنفّذ خطوة بعد خطوة بترتيب ثابت من أعلى لأسفل، وكل خطوة تعتمد على التي قبلها (مثل قراءة كتاب من الصفحة الأولى للأخيرة).',
                code: 'name = input("Enter your name: ")\nprint("Hello", name)',
              },
              {
                id: 'alg-2',
                title: '٢. الخوارزميات الشرطية (Conditional)',
                body: 'تعتمد على جملة الشرط `if / else` لتحديد المسار بناءً على الشرط (مثل فحص هل الرقم موجب أم سالب).',
                code: 'num = int(input("Enter a number: "))\nif num > 0:\n    print("Positive number")\nelse:\n    print("Negative number")',
              },
              {
                id: 'alg-3',
                title: '٣. الخوارزميات التكرارية (Loop)',
                body: 'تكرر نفس العملية عددًا محددًا من المرات لتوفير الوقت والجهد بدل تكرار السطور (مثل طباعة Hello خمس مرات).',
                code: 'for i in range(5):\n    print("Hello")',
              },
              {
                id: 'alg-4',
                title: '٤. خوارزميات البحث (Search)',
                body: 'تُستخدم للعثور على عنصر معين داخل قائمة بيانات (مثل البحث عن الرقم 10 وطباعة Found عند وجوده).',
                code: 'numbers = [3, 7, 10, 5]\ntarget = 10\nfor num in numbers:\n    if num == target:\n        print("Found")',
              },
              {
                id: 'alg-5',
                title: '٥. خوارزميات الترتيب (Sorting)',
                body: 'ترتّب البيانات تصاعديًا من الأصغر للأكبر (أو أبجديًا) بمقارنة العناصر وتبديلها، وفي Python تساعدنا دالة `sort()`.',
                code: 'nums = [8, 3, 10, 1]\nnums.sort()\nprint(nums)  # [1, 3, 8, 10]',
              },
            ],
          },
        },
      ],
    },
    {
      id: '2.2-c3',
      title: 'جرّب بنفسك: طابق كل خوارزمية بمثالها',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.2-match',
          type: 'matchingPairs',
          data: {
            prompt: 'طابق كل مثال من أمثلة الكتاب بنوع الخوارزمية الذي يمثله:',
            pairs: [
              { id: 'm1', left: 'إدخال الاسم ثم طباعته مسبوقًا بكلمة Hello', right: 'الخوارزمية التسلسلية' },
              { id: 'm2', left: 'إدخال رقم وتحديد هل هو موجب أم سالب', right: 'الخوارزمية الشرطية' },
              { id: 'm3', left: 'طباعة كلمة Hello خمس مرات', right: 'الخوارزمية التكرارية' },
              { id: 'm4', left: 'العثور على الرقم 10 داخل قائمة عناصر', right: 'خوارزمية البحث' },
              { id: 'm5', left: 'ترتيب قائمة أرقام من الأصغر إلى الأكبر', right: 'خوارزمية الترتيب' },
            ],
            feedback: {
              correct: 'عاش! ربطت الأنواع الخمسة بأمثلتها الرسمية كلها صح.',
              incorrect: 'راجع التمييز بين التكرار (طباعة مرات متتالية) والبحث (إيجاد 10) والترتيب (أصغر لأكبر).',
            },
          },
        },
      ],
    },
    {
      id: '2.2-c4',
      title: 'تطبيق Python: البحث داخل قائمة',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.2-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'اختبر البحث والترتيب في Python',
            prompt: 'اكتب كود يبحث عن الرقم `10` في القائمة `numbers = [3, 7, 10, 5]` ولو لقاه يطبع `"Found"`، وبعدها يرتّب القائمة بـ `numbers.sort()` ويطبعها.',
            starterCode:
              'numbers = [3, 7, 10, 5]\nfor num in numbers:\n    # افحص هل num == 10 واطبع Found\n\nnumbers.sort()\nprint(numbers)',
            solutionCode:
              'numbers = [3, 7, 10, 5]\nfor num in numbers:\n    if num == 10:\n        print("Found")\n\nnumbers.sort()\nprint(numbers)',
            checks: [
              { id: 'found', label: 'طباعة Found عند وجود 10', stdin: [], contains: ['Found', '[3, 5, 7, 10]'] },
            ],
            hint: 'جوه الحلقة اكتب if num == 10: وتحتها بمسافة بادئة print("Found").',
          },
        },
      ],
    },
    {
      id: '2.2-c5',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '2.2-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'خطأ شائع: وظيفة sort() في Python',
            body: 'الدالة `sort()` في Python تُستخدم لترتيب القائمة (تصاعديًا من الأصغر للأكبر افتراضيًا)، مش لعكس القائمة بدون ترتيب — اللي بيعكس الترتيب هو `reverse()`.',
          },
        },
      ],
    },
    {
      id: '2.2-c6',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '2.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'أي دالة في Python تُستخدم لترتيب قائمة من الأرقام؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٩',
            options: [
              { id: 'a', text: 'reverse()', isCorrect: false, feedback: 'reverse() تعكس الترتيب الحالي فقط.' },
              { id: 'b', text: 'find()', isCorrect: false, feedback: 'ليست دالة ترتيب قائمة.' },
              { id: 'c', text: 'sort()', isCorrect: true, feedback: 'صح! sort() ترتب عناصر القائمة.' },
              { id: 'd', text: 'search()', isCorrect: false, feedback: 'لا توجد دالة بهذا الاسم لترتيب القائمة.' },
            ],
            explanation: 'دالة sort() ترتب عناصر القائمة تصاعديًا من الأصغر للأكبر.',
          },
        },
        {
          id: '2.2-q2',
          type: 'quizQuestion',
          data: {
            question: 'ما النتيجة المتوقعة للكود `for i in range(3): print("Hello")`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٨',
            options: [
              { id: 'a', text: 'طباعة Hello مرة واحدة', isCorrect: false, feedback: 'range(3) تدور 3 مرات.' },
              { id: 'b', text: 'طباعة Hello ثلاث مرات', isCorrect: true, feedback: 'ممتاز! 0، 1، 2 يعني 3 دورات.' },
              { id: 'c', text: 'طباعة Hello خمس مرات', isCorrect: false, feedback: 'دي لـ range(5).' },
              { id: 'd', text: 'حدوث خطأ في البرنامج', isCorrect: false, feedback: 'الكود صحيح نحويًا.' },
            ],
            explanation: 'range(3) تولد 0 و1 و2، فتُطبع Hello ثلاث مرات.',
          },
        },
      ],
    },
    {
      id: '2.2-c7',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '2.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'الخوارزميات التقليدية خمسة أنواع: **التسلسلية** (ترتيب ثابت)، **الشرطية** (`if`)، **التكرارية** (`for`)، **البحث** (لإيجاد عنصر)، و**الترتيب** (`sort()`). في الدرس الجاي هنتعرف على الجيل الجديد: خوارزميات الذكاء الاصطناعي اللي بتتعلم لوحدها من البيانات!',
          },
        },
      ],
    },
  ],
  summary:
    'استعرضنا أنواع الخوارزميات التقليدية الخمسة (التسلسلية، الشرطية، التكرارية، البحث، الترتيب) وطبقنا البحث والترتيب في Python.',
  additionalSources: [
    {
      id: 'nb-2-2-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content: 'الخوارزميات التقليدية تنقسم إلى ٥ أنواع أساسية تغطي التنفيذ المتتابع، القرار، التكرار، البحث، والترتيب.',
    },
    {
      id: 'nb-2-2-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g22-1', termAr: 'خوارزمية البحث', termEn: 'Search Algorithm', definition: 'خطوات للعثور على عنصر محدد داخل مجموعة بيانات.' },
        { id: 'g22-2', termAr: 'خوارزمية الترتيب', termEn: 'Sorting Algorithm', definition: 'خطوات لتنظيم البيانات تصاعديًا أو تنازليًا.' },
      ],
    },
  ],
  sources: [
    { id: 's22-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'أنواع الخوارزميات التقليدية الخمسة', pages: 'ص 20–24' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '2.3',
    label: 'الدرس الجاي: تعلم الآلة والتعلم العميق',
    description: 'اكتشف إزاي الكمبيوتر بيتعلم من البيانات بدل الأوامر الثابتة.',
  },
};
