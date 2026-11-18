import type { LessonPack } from '@/types/curriculum';

export const LESSON_5_3: LessonPack = {
  id: '5.3',
  stationId: 'station-5',
  unitId: 'unit-1',
  order: 3,
  title: 'نمط التحقق وإعادة الإدخال اللانهائي (while True + break)',
  subtitle: 'اسمح للمستخدم يعيد المحاولة لحد ما يكتب قيمة سليمة، واحمِ الدوال بـ try/except',
  durationMin: 9,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تبني حلقة التحقق وإعادة المحاولة باستخدام while True مع try / except و break.',
    'تدمج معالجة الأخطاء داخل الدوال لجعل البرامج احترافية ومقاومة للانهيار.',
    'تراجع نقاط الوحدة الأولى الخمس عبر بطاقات تفاعلية وقائمة تحقق قبل الامتحان.',
  ],
  cards: [
    {
      id: '5.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '5.3-hero',
          type: 'heroHook',
          data: {
            title: 'حلقة إعادة المحاولة المقاومة للأخطاء',
            durationMin: 9,
            stationLabel: 'المحطة ٥ · الدرس ٣ من ٣',
            image: '/media/robot-path.png',
            goal: 'تجمع while True و try/except و break علشان البرنامج يطلب الإدخال لحد ما يبقى صحيح.',
            hook: 'أحسن برنامج مش اللي يطبع «غلط» ويقفل — أحسن برنامج هو اللي يقول للمستخدم «حاول تاني» ويستناه يكتب الرقم الصح وبعدين يكمل!',
            starterChallenge: {
              prompt:
                'في نمط `while True` مع `try / except` — نكتب أمر الخروج `break` جوه `try` بعد النجاح ولا جوه `except`؟',
              options: [
                {
                  id: 'sc-exc',
                  text: 'جوه except عشان يخرج لما يغلط',
                  isCorrect: false,
                  feedback:
                    'لو حطينا `break` جوه `except`، البرنامج هيقفل من أول غلطة ومش هيدي المستخدم فرصة يعيد المحاولة!',
                },
                {
                  id: 'sc-try',
                  text: 'جوه try بعد ما الإدخال ينجح',
                  isCorrect: true,
                  feedback:
                    'بالظبط! لو غلط هينط على `except` ويلف تاني، ومش هيوصل لـ `break` ويخرج غير لما يكتب رقم سليم.',
                },
                {
                  id: 'sc-out',
                  text: 'خارج while True تمامًا',
                  isCorrect: false,
                  feedback:
                    'لازم `break` يتنفذ من جوه الحلقة نفسها عشان يكسر شرط `while True`، وإلا الحلقة هتفضل شغالة للأبد.',
                },
              ],
              revealNote:
                'اعتبر `break` بوابة الخروج اللي ما بتتفتحش غير بعد ما كل سطور `try` تنجح بسلام!',
            },
          },
        },
      ],
    },
    {
      id: '5.3-c2',
      title: 'توقّع قبل التشغيل · تتبّع حلقة while True',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '5.3-predict',
          type: 'predictOutput',
          data: {
            title: 'تتبّع محاولتين متتاليتين (PRIMM)',
            prompt: 'لو المستخدم أدخل `"hi"` في المرة الأولى ثم `"5"` في المرة الثانية، ماذا سيطبع الكود؟',
            code: 'while True:\n    try:\n        num = int(input("Enter a number: "))\n        print("You entered:", num)\n        break\n    except:\n        print("Invalid! Try again.")',
            stdin: ['hi', '5'],
            runnable: true,
            expectedOutput: 'Invalid! Try again.\nYou entered: 5',
            options: [
              {
                id: 'o1',
                text: 'You entered: hi ثم يتوقف',
                isCorrect: false,
                feedback:
                  'النص `"hi"` لا يتحول عبر `int()` فيرفع خطأ ويقفز إلى `except` بدل طباعة `You entered`.',
              },
              {
                id: 'o2',
                text: 'Invalid! Try again. ثم يتوقف فورًا',
                isCorrect: false,
                feedback:
                  'كتلة `except` لا تحتوي `break`، لذا تعود الحلقة للدوران وتطلب الإدخال الثاني `"5"`.',
              },
              {
                id: 'o3',
                text: 'Invalid! Try again.\nYou entered: 5',
                isCorrect: true,
                feedback:
                  'تتبع ممتاز! `"hi"` شغّل `except` وأعاد الحلقة، ثم `"5"` نجح في `try` وخرج بـ `break`.',
              },
              {
                id: 'o4',
                text: 'يتوقف البرنامج بخطأ ValueError من غير طباعة',
                isCorrect: false,
                feedback:
                  'وجود `try / except` يمنع الانهيار ويلتقط الـ `ValueError` ليطبع رسالة إعادة المحاولة.',
              },
            ],
            explanation:
              'تستمر حلقة `while True` في تكرار الطلب عند كل استثناء، ولا تتوقف عبر `break` إلا عند نجاح الإدخال داخل `try`.',
          },
        },
      ],
    },
    {
      id: '5.3-c3',
      title: 'مثال الكتاب + دمج try/except داخل الدوال',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '5.3-code',
          type: 'codeView',
          data: {
            title: 'نمط إعادة المحاولة من الكتاب (ص ٥٦–٥٧)',
            code: 'while True:\n    try:\n        num = int(input("Enter a number: "))\n        print("You entered:", num)\n        break\n    except:\n        print("Invalid input! Try again.")',
            caption: 'الحلقة بتفضل تطلب الإدخال ومش بتقف إلا لما التحويل ينجح ونوصل لأمر break.',
            runnable: true,
          },
        },
        {
          id: '5.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'دمجنا المحطة ٤ مع المحطة ٥ في الدالة التالية — ما الناتج عند الطباعة؟',
            code: 'def safe_int(text):\n    try:\n        return int(text)\n    except ValueError:\n        return 0\n\nprint(safe_int("abc") + 5)',
            multiple: false,
            scored: false,
            sourceTag: 'ربط المحطتين ٤ و ٥ · تحقق وسط الدرس',
            options: [
              {
                id: 'a',
                text: 'خطأ ValueError يوقف البرنامج',
                isCorrect: false,
                feedback:
                  'كتلة `except ValueError:` داخل الدالة اصطادت الخطأ ومنعت توقف البرنامج.',
              },
              {
                id: 'b',
                text: '5',
                isCorrect: true,
                feedback:
                  'عبقري! `safe_int("abc")` مسكت الخطأ وأرجعت `0` عبر `return`، فطلع الجمع `0 + 5 = 5`.',
              },
              {
                id: 'c',
                text: 'خطأ TypeError لأن الدالة ترجع None',
                isCorrect: false,
                feedback:
                  'الدالة تحتوي `return 0` داخل `except ValueError:`، لذا رجّعت رقمًا يمكن جمعه مع `5`.',
              },
              {
                id: 'd',
                text: 'abc5',
                isCorrect: false,
                feedback:
                  'عند فشل `int("abc")` تقفز الدالة لـ `except` وترجع `0` وليس النص `"abc"`.',
              },
            ],
            explanation:
              'وضع `try / except` داخل الدوال مع `return` يجعلها ترجع قيمة افتراضية آمنة بدل انهيار البرنامج.',
          },
        },
      ],
    },
    {
      id: '5.3-c4',
      title: 'خلّي بالك! فخ الحلقة اللانهائية بدون break',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '5.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'لا تنسَ break في نهاية try!',
            body: 'لو كتبت `while True:` ونسيت `break` بعد نجاح الإدخال، الحلقة هتفضل تلف للأبد حتى مع البيانات السليمة!',
          },
        },
        {
          id: '5.3-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد الخطأ: الحلقة لا تتوقف بعد الإدخال الصحيح',
            prompt:
              'الحلقة دي بتفضل تطلب العمر للأبد حتى بعد كتابة رقم صحيح! اضغط على آخر سطر داخل `try` حيث ينقص بعده أمر الخروج:',
            codeLines: [
              'while True:',
              '    try:',
              '        age = int(input("Age: "))',
              '        print("Valid age:", age)',
              '    except ValueError:',
              '        print("Numbers only!")',
            ],
            lineFeedback: {
              1: 'شرط `while True:` مقصود عشان يكرر عند الخطأ؛ المشكلة إننا محتاجين نخرج بعد ما الإدخال ينجح في نهاية `try` (راجع سطر ٤).',
              2: 'بداية كتلة `try:` سليمة.',
              3: 'تحويل الإدخال إلى `int` داخل `try` سليم.',
              5: 'كتلة `except ValueError:` سليمة وما ينفعش نحط `break` جواها وإلا قفلنا عند أول غلطة!',
              6: 'رسالة إعادة المحاولة داخل `except` سليمة.',
            },
            bugLine: 4,
            fixedLine: '        print("Valid age:", age)\n        break',
            fixExplanation:
              'حلقة `while True` شرطها صحيح دائمًا؛ بدون `break` بعد السطر الناجح داخل `try` تبقى الحلقة تدور إلى ما لا نهاية.',
          },
        },
      ],
    },
    {
      id: '5.3-c5',
      title: 'جرّب بنفسك: برنامج العمر مع إعادة المحاولة',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '5.3-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل حلقة إعادة المحاولة للعمر',
            prompt:
              'استبدل العلامتين `___` داخل `try:` بطباعة `"Your age is:"` مع `age` ثم أمر الخروج المناسب ليقبل إعادة المحاولة عند `"hello"` ويخرج عند `"15"`.',
            starterCode:
              'while True:\n    try:\n        age = int(input("Enter your age: "))\n        ___\n        ___\n    except:\n        print("Try again!")',
            solutionCode:
              'while True:\n    try:\n        age = int(input("Enter your age: "))\n        print("Your age is:", age)\n        break\n    except:\n        print("Try again!")',
            checks: [
              {
                id: 'retry-flow',
                label: 'إدخال "hello" ثم "15" -> يطلب الإعادة ثم يطبع 15',
                stdin: ['hello', '15'],
                contains: ['Try again!', '15'],
              },
            ],
            quickChips: ['print("Your age is:", age)', 'break', 'continue'],
            hint: 'في السطر الأول الفارغ داخل try اكتب print("Your age is:", age) وفي السطر التالي اكتب break.',
            hints: [
              'الهدف: طباعة العمر الصحيح ثم كسر الحلقة حتى لا يطلب العمر مجددًا بعد النجاح.',
              'كلمة break تخرج من حلقة while True، بينما continue تعيد الحلقة من بدايتها.',
              'ضع print("Your age is:", age) مكان ___ الأولى، وضع break مكان ___ الثانية.',
            ],
          },
        },
      ],
    },
    {
      id: '5.3-c6',
      title: 'مراجعة سريعة لأهم محطات الوحدة الأولى',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '5.3-recap-flips',
          type: 'flipCards',
          data: {
            heading: 'خريطة الوحدة الأولى في ٣ بطاقات سريعة',
            instruction: 'اقلب البطاقات الثلاث لتثبيت أهم قواعد الوحدة الأولى قبل اختبار المحطة.',
            cards: [
              {
                id: 'u1-fc1',
                frontLabel: 'المحطتان ١ و ٢',
                frontTitle: 'التفكير الحاسوبي وخرائط التدفق',
                frontHint: 'كيف تخطط للبرنامج قبل كتابة أول سطر كود؟',
                backTitle: 'تفكيك -> خريطة -> كود',
                backBody:
                  'تبدأ بتحديد المدخلات والمخرجات وتمثيلها بالرموز (بيضاوي، متوازي أضلاع، مستطيل، معيّن للشرط) وتنتبه للفرق بين `if` الثابتة والذكاء الاصطناعي المتعلم.',
                backExample: 'اختبار `range(1, 6)` ينتهي عند `5`، و`17 % 5` يساوي `2`.',
              },
              {
                id: 'u1-fc2',
                frontLabel: 'المحطتان ٣ و ٤',
                frontTitle: 'النصوص والقوائم والدوال',
                frontHint: 'ما الفرق بين String و List؟ وبين print و return؟',
                backTitle: 'الفهرسة من 0 و return للحفظ',
                backBody:
                  'النصوص غير قابلة للتعديل المباشر عكس القوائم (`append`)، والفهرسة تبدأ من `0`. والدوال تُعرّف بـ `def` وتُعيد القيم للاستخدام عبر `return` لا `print`.',
                backExample: 'متغيرات الدالة محلية (`Local Scope`) ترفع `NameError` بالخارج.',
              },
              {
                id: 'u1-fc3',
                frontLabel: 'المحطة ٥',
                frontTitle: 'صيد الأخطاء وإعادة المحاولة',
                frontHint: 'كيف تجعل برنامجك مقاومًا لمدخلات المستخدم الخاطئة؟',
                backTitle: 'while True + try / except + break',
                backBody:
                  'نخصّص `except ValueError:` للنصوص غير الرقمية و`except ZeroDivisionError:` للقسمة على صفر قبل `except:` العامة، ونضع `break` في نهاية `try` داخل `while True`.',
                backExample: 'انتبه: `int("123")` سليمة، أما `int("12.5")` فترفع `ValueError`.',
              },
            ],
          },
        },
      ],
    },
    {
      id: '5.3-c7',
      title: 'التحقق السريع · نقل الفهم',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '5.3-q2',
          type: 'quizQuestion',
          data: {
            question: 'نفّذت الكود التالي وأدخلت الرقم السليم `50` — ماذا سيحدث؟',
            code: 'while True:\n    try:\n        price = int(input("Price: "))\n        print("Saved:", price)\n    except ValueError:\n        print("Enter numbers!")',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٦–٥٧ · نقل الفهم',
            options: [
              {
                id: 'a',
                text: 'يطبع Saved: 50 ويتوقف البرنامج تلقائيًا',
                isCorrect: false,
                feedback:
                  'حلقة `while True` شرطها صحيح دائمًا ولا تتوقف من تلقاء نفسها لأن أمر `break` غير موجود داخل `try`.',
              },
              {
                id: 'b',
                text: 'يطبع Saved: 50 ثم يعود لطلب السعر من جديد إلى ما لا نهاية',
                isCorrect: true,
                feedback:
                  'عين مبرمج! بنسيان `break` في نهاية `try` تستمر الحلقة في التكرار حتى بعد إدخال قيمة سليمة.',
              },
              {
                id: 'c',
                text: 'يطبع Enter numbers! لأن 50 تحتاج float',
                isCorrect: false,
                feedback:
                  'الرقم `50` عدد صحيح تقبله `int()` تمامًا دون `ValueError`؛ المشكلة فقط في غياب `break`.',
              },
              {
                id: 'd',
                text: 'يظهر خطأ SyntaxError بسبب غياب break',
                isCorrect: false,
                feedback:
                  'غياب `break` ليس خطأً نحويًا يمنع التشغيل، بل خطأ منطقي يُبقي الحلقة مفتوحة للأبد.',
              },
            ],
            explanation:
              'أمر `break` ضروري في نهاية مسار النجاح داخل `try` لكسر حلقة `while True` بمجرد الحصول على قيمة سليمة.',
          },
        },
      ],
    },
    {
      id: '5.3-c8',
      title: 'ختام الوحدة الأولى وقائمة المراجعة',
      role: 'summary',
      blocks: [
        {
          id: '5.3-sum',
          type: 'richText',
          data: {
            heading: 'أنجزت دروس الوحدة الأولى بالكامل!',
            calloutStyle: 'summary',
            body: 'بـ `while True + try / except + break` بقيت تكتب برامج متينة ما تقعش قدام أي إدخال غلط. وبانتهاء المحطة الخامسة تبقى أنهيت كل مفاهيم Python في الوحدة الأولى — جاهز لاختبار المحطة الخامسة (٤٠ سؤالًا) والانتقال للوحدة الثانية!',
          },
        },
        {
          id: '5.3-checklist',
          type: 'listBlock',
          data: {
            heading: 'قائمة المراجعة قبل اختبار الوحدة الأولى (Export C ص ١٣)',
            mode: 'checkbox',
            items: [
              { id: 'chk1', text: 'أعد حل تحديات CodeLab المستقلة بنفسك دون الاعتماد على التلميح الأخير' },
              { id: 'chk2', text: 'راجع الفرق بين Parameters و Arguments، وبين return و print()' },
              { id: 'chk3', text: 'تتبّع متى يقع ValueError مقابل ZeroDivisionError في القسمة' },
              { id: 'chk4', text: 'تأكد من موضع break الصحيح داخل try وليس داخل except' },
            ],
          },
        },
      ],
    },
  ],
  summary: 'بناء حلقة التحقق وإعادة المحاولة (while True + try/except + break) واستخدامها داخل الدوال.',
  additionalSources: [
    {
      id: 'nb-5-3-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'الجمع بين الحلقة اللانهائية while True ومعالجة الاستثناءات try/except ينشئ برامج قوية تتحمل أخطاء المستخدمين.',
      bullets: [
        'while True: تكرر الطلب تلقائيًا عند حدوث خطأ.',
        'break توضع في نهاية try للخروج فور إدخال قيمة سليمة.',
        'وضع try/except داخل الدوال يجعل الكود أكثر احترافية.',
      ],
    },
    {
      id: 'nb-5-3-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-5-3-1',
          question: 'ليه حطينا break جوه try مش جوه except؟',
          answer: 'لأننا عايزين نخرج من الحلقة بس لما المستخدم يكتب قيمة صح في try؛ أما لو غلط ونطّ لـ except فالمفروض الحلقة تلف تاني وتديله فرصة جديدة!',
        },
        {
          id: 'faq-5-3-2',
          question: 'إزاي أدمج try / except مع الدوال من المحطة الرابعة؟',
          answer: 'بتحط كتلة try / except جوه تعريف الدالة def عشان الدالة نفسها تحمي العملية الحسابية وترجع نتيجة أو رسالة واضحة.',
        },
      ],
    },
    {
      id: 'nb-5-3-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-5-3',
        label: 'حلقة إعادة المحاولة',
        children: [
          { id: 'mm-5-3-w', label: 'while True: استمرار الطلب' },
          { id: 'mm-5-3-t', label: 'try: محاولة التحويل + break عند النجاح' },
          { id: 'mm-5-3-e', label: 'except: رسالة خطأ وإعادة المحاولة' },
        ],
      },
    },
    {
      id: 'nb-5-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g53-1', termAr: 'حلقة التحقق وإعادة المحاولة', termEn: 'Validation Retry Loop', definition: 'استخدام while True مع try/except و break لإعادة طلب الإدخال حتى يصبح صحيحًا.' },
        { id: 'g53-2', termAr: 'الحلقة اللانهائية المحكومة', termEn: 'while True + break', definition: 'حلقة تستمر في العمل حتى يتحقق شرط نجاح ينفذ break للخروج.' },
      ],
    },
  ],
  sources: [
    { id: 's53-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'حلقة while True ومعالجة الأخطاء داخل الدوال', pages: 'ص 56–57' },
    { id: 's53-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٥.٣', detail: 'نمط التحقق اللانهائي وقائمة مراجعة الوحدة الأولى' },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-5',
    label: 'ابدأ اختبار المحطة الخامسة',
    description: 'اختبر إتقانك لمعالجة الأخطاء في ٤٠ سؤالًا رسميًا من الكتاب.',
  },
};
