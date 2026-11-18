import type { LessonPack } from '@/types/curriculum';

export const LESSON_2_2: LessonPack = {
  id: '2.2',
  stationId: 'station-2',
  unitId: 'unit-1',
  order: 2,
  title: 'خوارزميات التكرار والبحث والترتيب',
  subtitle: 'افتح الأنواع الخمسة كلها في بطاقات منظمة وتجنب فخ reverse مقابل sort',
  durationMin: 8,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تستعرض أنواع الخوارزميات التقليدية الخمسة وتفهم دور كل نوع.',
    'تفرّق بدقة بين دالة الترتيب sort() ودالة عكس القائمة reverse().',
    'تكتب خوارزميات التكرار والبحث عن عنصر داخل قائمة بلغة Python.',
  ],
  cards: [
    {
      id: '2.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '2.2-hero',
          type: 'heroHook',
          data: {
            title: 'الخوارزميات الخمس في حياتنا والكود',
            durationMin: 8,
            stationLabel: 'المحطة ٢ · الدرس ٢ من ٤',
            goal: 'تميّز بين الأنواع الخمسة للخوارزميات التقليدية وتكتب كود تكرار وبحث وترتيب في Python.',
            hook: 'لما بتدوّر على اسمك في كشف درجات المدرسة (دي خوارزمية بحث Search)، ولما بترتّب الكشف حسب الدرجات من الصغير للكبير (دي خوارزمية ترتيب Sorting)!',
            image: '/media/robot-puzzle.png',
            starterChallenge: {
              prompt: 'لو عندنا القائمة `nums = [8, 3, 10, 1]` وشغّلنا عليها `nums.reverse()`، هل هتطلع مرتبة تصاعديًا `[1, 3, 8, 10]`؟',
              options: [
                {
                  id: 'sc-a',
                  text: 'أيوه، لأن reverse() بترتب الأرقام من الصغير للكبير',
                  isCorrect: false,
                  feedback: 'دالة reverse() مش بتقارن قيم الأرقام أبدًا؛ الترتيب التصاعدي شغل الدالة sort() مش reverse().',
                },
                {
                  id: 'sc-b',
                  text: 'لأ، هتقلب الترتيب الحالي بس وتبقى [1, 10, 3, 8]',
                  isCorrect: true,
                  feedback: 'عين مبرمج! reverse() بتعكس أماكن العناصر زي المراية من غير ما تقارن قيمها.',
                },
                {
                  id: 'sc-c',
                  text: 'لأ، هتطلع خطأ لأن القائمة مش مرتبة الأول',
                  isCorrect: false,
                  feedback: 'reverse() بتشتغل على أي قائمة عادي بدون شروط، لكنها تعكس الترتيب الموجود فقط.',
                },
              ],
              revealNote: 'التمييز بين عكس المواضع (reverse) والترتيب الفعلي (sort) بينقذك من أشهر أخطاء الاختبارات!',
            },
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
                body: 'بتتنفذ خطوة بعد خطوة بترتيب ثابت من فوق لتحت، وكل خطوة معتمدة على اللي قبلها (زي قراءة كتاب من الصفحة الأولى للأخيرة).',
                code: 'name = input("Enter your name: ")\nprint("Hello", name)',
              },
              {
                id: 'alg-2',
                title: '٢. الخوارزميات الشرطية (Conditional)',
                body: 'بتعتمد على جملة الشرط `if / else` لتحديد المسار حسب الشرط (زي فحص هل الرقم موجب أم سالب).',
                code: 'num = int(input("Enter a number: "))\nif num > 0:\n    print("Positive number")\nelse:\n    print("Negative number")',
              },
              {
                id: 'alg-3',
                title: '٣. الخوارزميات التكرارية (Loop)',
                body: 'بتكرر نفس العملية عدد محدد من المرات عشان توفر الوقت والمجهود بدل تكرار السطور (زي طباعة Hello خمس مرات).',
                code: 'for i in range(5):\n    print("Hello")',
              },
              {
                id: 'alg-4',
                title: '٤. خوارزميات البحث (Search)',
                body: 'بتُستخدم عشان نلاقي عنصر معين جوه قائمة بيانات (زي البحث عن الرقم 10 وطباعة Found لو لقيناه).',
                code: 'numbers = [3, 7, 10, 5]\ntarget = 10\nfor num in numbers:\n    if num == target:\n        print("Found")',
              },
              {
                id: 'alg-5',
                title: '٥. خوارزميات الترتيب (Sorting)',
                body: 'بترتّب البيانات تصاعديًا من الأصغر للأكبر (أو أبجديًا) بمقارنة العناصر وتبديلها، وفي Python بتساعدنا دالة `sort()`.',
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
            prompt: 'طابق كل مثال من أمثلة الكتاب بنوع الخوارزمية اللي بيمثله:',
            pairs: [
              { id: 'm1', left: 'إدخال الاسم ثم طباعته مسبوقًا بكلمة Hello', right: 'الخوارزمية التسلسلية' },
              { id: 'm2', left: 'إدخال رقم وتحديد هل هو موجب أم سالب', right: 'الخوارزمية الشرطية' },
              { id: 'm3', left: 'طباعة كلمة Hello خمس مرات', right: 'الخوارزمية التكرارية' },
              { id: 'm4', left: 'العثور على الرقم 10 داخل قائمة عناصر', right: 'خوارزمية البحث' },
              { id: 'm5', left: 'ترتيب قائمة أرقام من الأصغر إلى الأكبر', right: 'خوارزمية الترتيب' },
            ],
            feedback: {
              correct: 'عاش! ربطت الخوارزميات الخمس بأمثلتها الرسمية كلها بشكل دقيق.',
              incorrect: 'راجع التمييز بين التكرار (إعادة Hello بحلقة)، والبحث (فحص وجود 10)، والترتيب (تنظيم القيم من الأصغر للأكبر).',
            },
          },
        },
      ],
    },
    {
      id: '2.2-c4',
      title: 'توقّع قبل التشغيل: خدعة reverse()',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '2.2-predict',
          type: 'predictOutput',
          data: {
            title: 'ماذا تطبع nums.reverse() بالفعل؟',
            prompt: 'توقّع مخرجات الكود التالي قبل أن تشغّله وتكتشف النتيجة في بايثون:',
            code: 'nums = [8, 3, 10, 1]\nnums.reverse()\nprint(nums)',
            expectedOutput: '[1, 10, 3, 8]',
            options: [
              {
                id: 'p1',
                text: '[1, 3, 8, 10]',
                isCorrect: false,
                feedback: 'دي نتيجة sort() اللي بتقارن القيم؛ reverse() بتقلب الترتيب الحالي فقط.',
              },
              {
                id: 'p2',
                text: '[1, 10, 3, 8]',
                isCorrect: true,
                feedback: 'ممتاز! قلبت العناصر من الآخر للأول بالضبط دون مقارنة قيمها.',
              },
              {
                id: 'p3',
                text: '[10, 8, 3, 1]',
                isCorrect: false,
                feedback: 'الترتيب التنازلي يحتاج sort(reverse=True)، أما reverse() لوحدها فتعكس الموجود كما هو.',
              },
              {
                id: 'p4',
                text: '[8, 3, 10, 1]',
                isCorrect: false,
                feedback: 'reverse() تعدّل القائمة نفسها في مكانها، فلا تبقى بنفس الترتيب الأصلي.',
              },
            ],
            explanation: 'الدالة reverse() تعكس مواقع عناصر القائمة من النهاية للبداية، ولا تقوم بأي ترتيب تصاعدي أو تنازلي.',
          },
        },
      ],
    },
    {
      id: '2.2-c5',
      title: 'اكتشف الفخ: ترتيب أم عكس؟',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '2.2-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'خطأ شائع في ترتيب القوائم',
            prompt: 'مبرمج عايز يرتّب قائمة الدرجات تصاعديًا من الأصغر للأكبر، لكن النتيجة طلعت ملخبطة! اضغط على السطر اللي فيه الخطأ:',
            codeLines: [
              'nums = [8, 3, 10, 1]',
              '# ترتيب القائمة تصاعديًا',
              'nums.reverse()',
              'print(nums)',
            ],
            bugLine: 3,
            lineFeedback: {
              1: 'تعريف القائمة داخل الأقواس المربعة [ ] سليم تمامًا.',
              2: 'ده مجرد تعليق توضيحي (#) ولا يؤثر في تنفيذ الكود.',
              4: 'أمر print(nums) سليم؛ المشكلة في الدالة التي استدعيناها في السطر ٣.',
            },
            fixedLine: 'nums.sort()',
            fixExplanation: 'الدالة reverse() تعكس الترتيب الحالي فقط فتخرج [1, 10, 3, 8]، بينما sort() ترتب العناصر تصاعديًا لتصبح [1, 3, 8, 10].',
          },
        },
      ],
    },
    {
      id: '2.2-c6',
      title: 'نقطة فحص: دوال القوائم',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '2.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'أي دالة في Python تُستخدم لترتيب قائمة من الأرقام تصاعديًا من الأصغر للأكبر؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٩',
            options: [
              {
                id: 'a',
                text: 'reverse()',
                isCorrect: false,
                feedback: 'reverse() تقلب ترتيب القائمة من النهاية للبداية دون مقارنة الأرقام.',
              },
              {
                id: 'b',
                text: 'find()',
                isCorrect: false,
                feedback: 'find() ليست دالة لترتيب القوائم، بل دالة نصية للبحث عن نص فرعي.',
              },
              {
                id: 'c',
                text: 'sort()',
                isCorrect: true,
                feedback: 'صح! الدالة sort() تقارن عناصر القائمة وترتبها تصاعديًا من الأصغر للأكبر.',
              },
              {
                id: 'd',
                text: 'search()',
                isCorrect: false,
                feedback: 'لا توجد دالة مدمجة في قوائم Python بهذا الاسم؛ البحث يُنفذ بحلقة for أو معامل in.',
              },
            ],
            explanation: 'دالة sort() ترتب عناصر القائمة تصاعديًا من الأصغر للأكبر افتراضيًا.',
          },
        },
      ],
    },
    {
      id: '2.2-c7',
      title: 'تطبيق Python: البحث داخل قائمة وترتيبها',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.2-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل شرط البحث ثم رتّب القائمة',
            prompt: 'استبدل علامة `___` بشرط البحث الصحيح لاكتشاف الرقم `10` مرة واحدة، ثم اختبر الكود مع الترتيب.',
            starterCode:
              'numbers = [3, 7, 10, 5]\nfor num in numbers:\n    if ___:\n        print("Found")\n\nnumbers.sort()\nprint(numbers)',
            solutionCode:
              'numbers = [3, 7, 10, 5]\nfor num in numbers:\n    if num == 10:\n        print("Found")\n\nnumbers.sort()\nprint(numbers)',
            quickChips: ['num == 10', 'num = 10', 'num > 10', '10 in numbers'],
            checks: [
              {
                id: 'found',
                label: 'طباعة Found مرة واحدة ثم القائمة مرتبة',
                stdin: [],
                expectedOutputRegex: '^Found\\n\\[3, 5, 7, 10\\]',
                contains: ['Found', '[3, 5, 7, 10]'],
              },
            ],
            hint: 'قارن كل عنصر num بالرقم 10 باستخدام معامل المساواة == داخل الشرط.',
            hints: [
              'الهدف: نطبع "Found" فقط في الدورة التي يساوي فيها العنصر الحالي num القيمة 10.',
              'للمقارنة في بايثون نستخدم == (يساوي المزدوجة) وليس = التي تُستخدم لتخزين القيم.',
              'استبدل ___ بالعبارة num == 10 ليصبح السطر: if num == 10:.',
            ],
          },
        },
      ],
    },
    {
      id: '2.2-c8',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '2.2-q2',
          type: 'quizQuestion',
          data: {
            question: 'ما النتيجة المتوقعة عند تشغيل الكود `for i in range(3): print("Hello")`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٨',
            options: [
              {
                id: 'a',
                text: 'طباعة Hello مرة واحدة',
                isCorrect: false,
                feedback: 'range(3) تولّد ٣ قيم هي 0 و 1 و 2، لذلك تنفّذ الحلقة ٣ مرات.',
              },
              {
                id: 'b',
                text: 'طباعة Hello ثلاث مرات',
                isCorrect: true,
                feedback: 'ممتاز! الأرقام 0، 1، 2 تعطي ٣ دورات فتُطبع Hello ثلاث مرات متتالية.',
              },
              {
                id: 'c',
                text: 'طباعة Hello أربع مرات',
                isCorrect: false,
                feedback: 'range(3) تتوقف قبل الرقم 3، أي تعد من 0 إلى 2 فقط (٣ دورات).',
              },
              {
                id: 'd',
                text: 'حدوث خطأ في البرنامج',
                isCorrect: false,
                feedback: 'صياغة الحلقة سليمة تمامًا سواء كتبنا الأمر على نفس السطر أو في سطر تالٍ بمسافة بادئة.',
              },
            ],
            explanation: 'range(3) تولد الأعداد 0 و1 و2 (٣ عناصر)، فتُطبع Hello ثلاث مرات.',
          },
        },
      ],
    },
    {
      id: '2.2-c9',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '2.2-sum-img',
          type: 'imageBlock',
          data: {
            src: '/media/infographic-2-2.png',
            alt: 'إنفوجرافيك أنواع الخوارزميات التقليدية الأربعة',
            caption: 'لوحة تعليمية تلخص الخوارزميات التسلسلية والتكرارية والبحث والترتيب.',
            aspectRatio: '16/9',
          },
        },
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
    'استعرضنا أنواع الخوارزميات التقليدية الخمسة (التسلسلية، الشرطية، التكرارية، البحث، الترتيب) وميّزنا بين sort() و reverse().',
  additionalSources: [
    {
      id: 'nb-2-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'كل خوارزميات البرمجة الكلاسيكية بترجع لواحد من ٥ أنواع أساسية بتحل بيهم معظم المسائل.',
      bullets: [
        'التسلسلية: خطوة ورا خطوة بالترتيب.',
        'الشرطية: اختيار مسار بـ if / else.',
        'التكرارية: إعادة الأوامر بـ for / while.',
        'البحث: إيجاد عنصر محدد في قائمة؛ والترتيب: تنظيمها بـ sort().',
      ],
    },
    {
      id: 'nb-2-2-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-2-2-1',
          question: 'ليه الترتيب (Sorting) مهم قبل البحث أحيانًا؟',
          answer: 'لأن البيانات المرتبة (تصاعديًا أو أبجديًا) بتخلي الوصول لأي معلومة أسرع وأسهل بكثير زي دليل التليفون.',
        },
        {
          id: 'faq-2-2-2',
          question: 'إيه الفرق بين sort() و reverse() في Python؟',
          answer: 'sort() بترتب الأرقام من الصغير للكبير (أو الحروف أبجديًا)، أما reverse() فبتعكس الترتيب الحالي بس من غير مقارنة قيم.',
        },
      ],
    },
    {
      id: 'nb-2-2-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-2-2',
        label: 'الخوارزميات التقليدية الخمسة',
        children: [
          { id: 'mm-2-2-1', label: '١. التسلسلية (Sequential)' },
          { id: 'mm-2-2-2', label: '٢. الشرطية (if / else)' },
          { id: 'mm-2-2-3', label: '٣. التكرارية (for / range)' },
          { id: 'mm-2-2-4', label: '٤. البحث (Search)' },
          { id: 'mm-2-2-5', label: '٥. الترتيب (Sorting / sort())' },
        ],
      },
    },
    {
      id: 'nb-2-2-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g22-1', termAr: 'خوارزمية البحث', termEn: 'Search Algorithm', definition: 'خطوات للعثور على عنصر محدد داخل مجموعة بيانات.' },
        { id: 'g22-2', termAr: 'خوارزمية الترتيب', termEn: 'Sorting Algorithm', definition: 'خطوات لتنظيم البيانات تصاعديًا أو تنازليًا.' },
        { id: 'g22-3', termAr: 'الخوارزمية التكرارية', termEn: 'Loop Algorithm', definition: 'خوارزمية تعيد تنفيذ مجموعة أوامر لعدد محدد من المرات أو حتى تحقق شرط.' },
      ],
    },
  ],
  sources: [
    { id: 's22-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'أنواع الخوارزميات التقليدية الخمسة', pages: 'ص 20–24' },
    { id: 's22-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٢.٢', detail: 'ملخص الأنواع الخمسة وأكواد البحث والترتيب' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '2.3',
    label: 'الدرس الجاي: تعلم الآلة والتعلم العميق',
    description: 'اكتشف إزاي الكمبيوتر بيتعلم من البيانات بدل الأوامر الثابتة.',
  },
};
