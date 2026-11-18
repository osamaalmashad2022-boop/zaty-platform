import type { LessonPack } from '@/types/curriculum';

export const LESSON_5_1: LessonPack = {
  id: '5.1',
  stationId: 'station-5',
  unitId: 'unit-1',
  order: 1,
  title: 'لماذا تنهار البرامج؟ مقدمة صيد الأخطاء (try / except)',
  subtitle: 'احمِ برنامجك من التوقف المفاجئ لما المستخدم يكتب بيانات غلط',
  durationMin: 8,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تشرح سبب توقف البرامج عند إدخال نصوص بدل الأرقام في int(input()).',
    'تستخدم كتلتي try و except العامة لمنع انهيار البرنامج.',
    'تطبع رسالة واضحة للمستخدم عند حدوث خطأ دون تعطل التنفيذ.',
  ],
  cards: [
    {
      id: '5.1-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '5.1-hero',
          type: 'heroHook',
          data: {
            title: 'درع الحماية: try و except',
            durationMin: 8,
            stationLabel: 'المحطة ٥ · الدرس ١ من ٣',
            goal: 'تحمي برنامجك من الانهيار المفاجئ عند إدخال بيانات خاطئة باستخدام try و except.',
            hook: 'سألت المستخدم: «أدخل عمرك»، فكتبلك `"ahmed"` بدل `15`! من غير حماية البرنامج هيقفل فجأة في وشه — لكن بـ `try / except` تقدر تمسك الخطأ وتطلعله رسالة لطيفة وتكمّل شغلك.',
            image: '/media/robot-shield.png',
            starterChallenge: {
              prompt:
                'لو الكود مكتوب فيه `age = int(input())` والمستخدم كتب كلمة `عشرة` بدل الرقم `10` — ده خطأ `SyntaxError` ولا `Runtime Error`؟',
              options: [
                {
                  id: 'sc-syn',
                  text: 'SyntaxError (خطأ في كتابة قواعد الكود)',
                  isCorrect: false,
                  feedback:
                    'كتابة `int(input())` سليمة 100% ومش ناقصها أقواس؛ الخطأ حصل بعد تشغيل البرنامج لما المستخدم كتب حروفًا.',
                },
                {
                  id: 'sc-run',
                  text: 'Runtime Error (خطأ وقت التشغيل)',
                  isCorrect: true,
                  feedback:
                    'توقع دقيق! الكود سليم نحويًا، لكن الانهيار وقع أثناء التشغيل لأن `int()` لم تستطع تحويل النص `"عشرة"` لرقم.',
                },
                {
                  id: 'sc-none',
                  text: 'مش هيحصل خطأ وهيتحول تلقائيًا لـ 10',
                  isCorrect: false,
                  feedback:
                    'دالة `int()` بتقرأ الأرقام المكتوبة كأرقام زي `"10"` بس، وما بتفهمش الكلمات المكتوبة بالحروف.',
                },
              ],
              revealNote:
                'أخطاء وقت التشغيل بتظهر فجأة حسب تصرف المستخدم؛ علشان كده بنحصّن السطور الحساسة بدرع `try / except`!',
            },
          },
        },
      ],
    },
    {
      id: '5.1-c2',
      title: 'كيف يقفز البرنامج عند حدوث خطأ؟',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '5.1-order',
          type: 'orderFlowBuilder',
          data: {
            mode: 'steps',
            prompt: 'رتّب مسار تنفيذ Python عندما يقع خطأ وقت التشغيل داخل كتلة `try`:',
            items: [
              { id: 's1', label: 'يبدأ Python تنفيذ الأوامر الموجودة داخل كتلة `try:`' },
              { id: 's2', label: 'يقع خطأ وقت التشغيل (مثل تحويل نص في `int()`) فيتوقف باقي `try`' },
              { id: 's3', label: 'يقفز البرنامج فورًا إلى كتلة `except:` دون انهيار' },
              { id: 's4', label: 'يطبع رسالة التنبيه في `except` ثم يكمل البرنامج بأمان' },
            ],
            correctOrder: ['s1', 's2', 's3', 's4'],
            feedback: {
              correct:
                'ممتاز! هذا بالضبط مسار القفز الآمن: تجربة في `try` -> التقاط الخطأ -> قفز لـ `except` -> استمرار بدون تعطل.',
              incorrect:
                'تذكّر أن Python يبدأ بتجربة `try`، وعند وقوع الخطأ يقطع باقي `try` ويقفز لـ `except` ليكمل بأمان.',
            },
          },
        },
      ],
    },
    {
      id: '5.1-c3',
      title: 'توقّع قبل التشغيل · ماذا لو نجح try بدون خطأ؟',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '5.1-predict',
          type: 'predictOutput',
          data: {
            title: 'تتبّع كتلة try السليمة (PRIMM)',
            prompt: 'اقرأ الكود وتوقّع ماذا سيطبع عند تنفيذ `int("5")` داخل `try`:',
            code: 'try:\n    x = int("5")\n    print("OK")\nexcept:\n    print("Err")',
            runnable: true,
            expectedOutput: 'OK',
            options: [
              {
                id: 'o1',
                text: 'OK\nErr',
                isCorrect: false,
                feedback:
                  'كتلة `except:` لا تعمل بعد `try` إلا إذا حدث خطأ فعلي؛ عند النجاح يتجاهلها البرنامج.',
              },
              {
                id: 'o2',
                text: 'Err',
                isCorrect: false,
                feedback:
                  'النص `"5"` يحتوي رقمًا صحيحًا، لذا ينجح `int("5")` دون خطأ ولا يدخل `except`.',
              },
              {
                id: 'o3',
                text: 'OK',
                isCorrect: true,
                feedback:
                  'مضبوط! تحولت `"5"` إلى الرقم `5` بسلام فطبع `"OK"` وتجاهل كتلة `except:` بالكامل.',
              },
              {
                id: 'o4',
                text: '5',
                isCorrect: false,
                feedback:
                  'المتغير `x` استلم القيمة `5` في الذاكرة، لكن أمر الطباعة طلب النص `"OK"` فقط.',
              },
            ],
            explanation:
              'عندما تنتهي كل أسطر `try:` بدون أي استثناء، يتخطى Python كتلة `except:` تمامًا.',
          },
        },
      ],
    },
    {
      id: '5.1-c4',
      title: 'مثال الكتاب + سؤال التحقق في منتصف الدرس',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '5.1-code',
          type: 'codeView',
          data: {
            title: 'مثال ١ من الكتاب: حماية إدخال العمر (ص ٥٥)',
            code: 'try:\n    age = int(input("Enter your age: "))\n    print("Next year you will be:", age + 1)\nexcept:\n    print("Please enter a valid number!")',
            caption: 'لو المستخدم كتب رقمًا يُطبع عمره السنة الجاية؛ ولو كتب نصًا تظهر الرسالة اللطيفة بدل الانهيار.',
            runnable: true,
          },
        },
        {
          id: '5.1-q2',
          type: 'quizQuestion',
          data: {
            question: 'ماذا يحدث لكتلة `except:` عندما يكتب المستخدم رقمًا صحيحًا داخل `try:` دون أي خطأ؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٥ · تحقق وسط الدرس',
            options: [
              {
                id: 'a',
                text: 'تُنفّذ بعد انتهاء try دائمًا لتأكيد السلامة',
                isCorrect: false,
                feedback:
                  '`except:` هي خطة طوارئ فقط وليست خطوة إجبارية بعد كل نجاح.',
              },
              {
                id: 'b',
                text: 'يتم تجاهلها ولا تُنفّذ إطلاقًا',
                isCorrect: true,
                feedback:
                  'صحيح! عندما يمر الكود داخل `try:` بسلام، يتخطى Python كتلة `except:` تمامًا.',
              },
              {
                id: 'c',
                text: 'تعيد تشغيل try مرة ثانية للتأكد',
                isCorrect: false,
                feedback:
                  '`except:` لا تكرر الكود من تلقاء نفسها؛ التكرار يحتاج إلى حلقة مثل `while True`.',
              },
              {
                id: 'd',
                text: 'تُظهر رسالة خطأ فارغة على الشاشة',
                isCorrect: false,
                feedback:
                  'عند النجاح لا تُنفّذ أي أوامر داخل `except:` ولا يظهر أي تنبيه.',
              },
            ],
            explanation:
              'تعمل `except:` فقط عند وقوع خطأ داخل `try:`، وتتوقف عن العمل تمامًا في حالة النجاح.',
          },
        },
      ],
    },
    {
      id: '5.1-c5',
      title: 'خلّي بالك! فخ try المنفردة بدون except',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '5.1-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'لا تكتب try بدون except!',
            body: 'في بايثون مينفعش تكتب `try:` لوحدها من غير `except:` (أو `finally:`). ولازم تتأكد من المسافات البادئة والنقطتين `:`.',
          },
        },
        {
          id: '5.1-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد الخطأ: SyntaxError بسبب try غير المكتملة',
            prompt: 'الكود ده بيرفض يشتغل من الأساس لأنه فتح كتلة حماية وسابها ناقصة من غير `except:`! اضغط على السطر اللي فتح الكتلة الناقصة:',
            codeLines: [
              'try:',
              '    age = int("15")',
              '    print(age + 1)',
            ],
            lineFeedback: {
              2: 'سطر التحويل `int("15")` سليم داخل الكتلة، لكن المشكلة في أن `try:` نفسها محتاجة `except:` بعدها.',
              3: 'سطر الطباعة سليم، ابحث عن السطر اللي فتح كتلة الحماية وبقى لوحده بدون `except:`.',
            },
            bugLine: 1,
            fixedLine: 'try:\n    age = int("15")\n    print(age + 1)\nexcept:\n    print("Please enter a valid number!")',
            fixExplanation:
              'لا يقبل Python كتابة `try:` بمفردها؛ يجب أن يتبعها مباشرة `except:` (أو `finally:`) لمعالجة أي خطأ محتمل، وإلا يظهر `SyntaxError`.',
          },
        },
      ],
    },
    {
      id: '5.1-c6',
      title: 'جرّب بنفسك: أكمل رسالة الخطأ في except',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '5.1-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل كتلة except في مثال العمر',
            prompt:
              'استبدل `___` داخل كتلة `except:` بطباعة `"Please enter a valid number!"` ثم اضغط «تحقق من الحل» لاختبار الإدخال الرقمي والنصي.',
            starterCode:
              'try:\n    age = int(input("Enter your age: "))\n    print("Next year:", age + 1)\nexcept:\n    ___',
            solutionCode:
              'try:\n    age = int(input("Enter your age: "))\n    print("Next year:", age + 1)\nexcept:\n    print("Please enter a valid number!")',
            checks: [
              { id: 'age-ok', label: 'إدخال 14 -> Next year: 15', stdin: ['14'], expectedOutputRegex: '15' },
              {
                id: 'age-err',
                label: 'إدخال ahmed -> رسالة الخطأ بدون توقف',
                stdin: ['ahmed'],
                expectedOutputRegex: 'Please enter a valid number',
              },
            ],
            quickChips: ['print("Please enter a valid number!")', 'print(age + 1)', 'return'],
            hint: 'استبدل ___ بالسطر print("Please enter a valid number!") مع الحفاظ على المسافة البادئة.',
            hints: [
              'الهدف: إظهار رسالة واضحة للمستخدم داخل except عند إدخاله نصًا غير رقمي.',
              'عند وقوع الخطأ قبل تعريف age بشكل سليم، لا نطبع age بل نطبع نص الرسالة بـ print().',
              'استبدل ___ بالعبارة print("Please enter a valid number!").',
            ],
          },
        },
      ],
    },
    {
      id: '5.1-c7',
      title: 'التحقق السريع · نقل الفهم',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '5.1-q1',
          type: 'quizQuestion',
          data: {
            question:
              'في تطبيق حجز تذاكر، كتبنا `tickets = int(input())` ثم `print("Confirmed")` داخل `try:`، و`print("Invalid number")` داخل `except:`. ماذا يحدث لو كتب المتعلم `"three"`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٨ · تطبيق فهم',
            options: [
              {
                id: 'a',
                text: 'يطبع Confirmed ثم يتوقف البرنامج فورًا',
                isCorrect: false,
                feedback:
                  'الخطأ وقع عند `int("three")` قبل الوصول إلى `print("Confirmed")`، و`try/except` تمنع التوقف.',
              },
              {
                id: 'b',
                text: 'يفشل التحويل عند int() ويقفز فورًا لطباعة Invalid number دون انهيار',
                isCorrect: true,
                feedback:
                  'إجابة دقيقة! بمجرد فشل `int("three")` يتخطى Python بقية `try` ويطبع رسالة `except` بأمان.',
              },
              {
                id: 'c',
                text: 'يحوّل Python كلمة "three" تلقائيًا للرقم 3 ويحجز التذاكر',
                isCorrect: false,
                feedback:
                  'دالة `int()` تقبل الأرقام المكتوبة كأرقام مثل `"3"` فقط ولا تترجم الكلمات الإنجليزية.',
              },
              {
                id: 'd',
                text: 'يطبع Invalid number ثم يعود لتنفيذ print("Confirmed")',
                isCorrect: false,
                feedback:
                  'بعد القفز من `try` إلى `except`، لا يرجع البرنامج إلى الأسطر المتبقية داخل `try`.',
              },
            ],
            explanation:
              'الهدف الأساسي من `try` و`except` هو التقاط أخطاء وقت التشغيل وتوجيه التنفيذ إلى رسالة آمنة دون توقف البرنامج.',
          },
        },
      ],
    },
    {
      id: '5.1-c8',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '5.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: '`try` بتجرّب الكود اللي ممكن يسبب خطأ وقت التشغيل، و`except` بتستلم أي خطأ وتنفّذ رسالة مناسبة بدل انهيار البرنامج. في الدرس الجاي هنفرّق بدقة بين خطأين مهمين: `ValueError` و `ZeroDivisionError`!',
          },
        },
      ],
    },
  ],
  summary: 'مقدمة معالجة الاستثناءات باستخدام try و except لمنع انهيار البرامج.',
  additionalSources: [
    {
      id: 'nb-5-1-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'أخطاء مدخلات المستخدم شائعة، وبنية try / except تحمي البرنامج من التوقف المفاجئ.',
      bullets: [
        'try تحتوي على الأوامر المعرضة لحدوث خطأ وقت التشغيل.',
        'except تُنفّذ فقط إذا وقع خطأ داخل try.',
        'تحسّن تجربة المستخدم بعرض رسالة مفهومة بدل الانهيار.',
      ],
    },
    {
      id: 'nb-5-1-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-5-1-1',
          question: 'ليه البرامج بتنهار عند إدخال نص داخل int(input())؟',
          answer: 'لأن Python بيحاول يحول الحروف لرقم صحيح فيفشل ويرفع خطأ وقت التشغيل (Runtime Error)، ولو ما عالجناهوش بيوقف البرنامج فورًا.',
        },
        {
          id: 'faq-5-1-2',
          question: 'هل ممكن أكتب كود عادي جوه try من غير مشكلة؟',
          answer: 'أيوه، بس الأفضل تحط جوه try الأسطر اللي فعلاً ممكن يحصل فيها خطأ (زي تحويل المدخلات أو القسمة).',
        },
      ],
    },
    {
      id: 'nb-5-1-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-5-1',
        label: 'صيد الأخطاء (try / except)',
        children: [
          { id: 'mm-5-1-try', label: 'try: جرّب الكود الحساس' },
          {
            id: 'mm-5-1-res',
            label: 'النتيجة',
            children: [
              { id: 'mm-5-1-ok', label: 'لا يوجد خطأ ← تجاهل except' },
              { id: 'mm-5-1-err', label: 'وقع خطأ ← نفّذ except بدون توقف' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-5-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g51-1', termAr: 'معالجة الاستثناءات', termEn: 'Exception Handling (try / except)', definition: 'بنية برمجية لالتقاط الأخطاء وقت التشغيل ومعالجتها بدون توقف البرنامج.' },
        { id: 'g51-2', termAr: 'خطأ وقت التشغيل', termEn: 'Runtime Error', definition: 'خطأ يحدث أثناء تنفيذ البرنامج مثل إدخال بيانات من نوع غير متوقع.' },
      ],
    },
  ],
  sources: [
    { id: 's51-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'مقدمة try و except', pages: 'ص 53–55' },
    { id: 's51-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٥.١', detail: 'شرح سبب توقف البرامج وحمايتها بـ try / except' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '5.2',
    label: 'الدرس الجاي: ValueError مقابل ZeroDivisionError',
    description: 'اعرف إزاي تكتب رسالة مخصصة لكل نوع خطأ.',
  },
};
