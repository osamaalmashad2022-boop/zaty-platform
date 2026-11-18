import type { LessonPack } from '@/types/curriculum';

const PODCAST_1_4_TRANSCRIPT =
  'تخيل معايا كده يا صاحبي إن فاتورة السوبرماركت بتاعتك طالعة 89.9 جنيه — لو الكود بتاعك مش دقيق الحساب كله هيضرب! أنا جاية أكشفلك ٣ فخاخ برمجية سريعة:\n' +
  'أولًا فخ الكسر والمقص: دالة int() في بايثون عاملة زي المقص، بتبتر الجزء العشري تمامًا من غير أي تقريب، يعني 89.9 هتبقى 89 بس! الصح دايمًا نستخدم float() عشان نحفظ الكسور بأمان يا صديقي.\n' +
  'ثانيًا فخ الأقواس: لو حسبت المتوسط وكتبت a + b + c / 3 من غير أقواس، بايثون هيقسم آخر رقم بس على 3 لأن القسمة أقوى من الجمع؛ الحل نحمي الجمع بين قوسين: (a + b + c) / 3.\n' +
  'أخيرًا فخ المقارنة: في if a > b لو الرقمين متساويين (10 و 10)، النتيجة بتطلع False فبايثون بيروح فورًا لفرع else. دقة الكسر وحماية القوس وفهمك للشرط هما اللي هيخلوا كودك دايمًا سليم يا صاحبي!';

const VIDEO_1_4_TRANSCRIPT =
  'يا صديقي، تخيل كده إننا في السوبرماركت بنشتري طلبات سريعة ولقينا الفاتورة طالعة 89.9 جنيه! بص يا صاحبي: دالة int() هنا عاملة بالظبط زي المقص، بتقص وتبتر الجزء العشري تمامًا من غير أي تقريب فتطلع 89 بس وده يخسّر المحل فلوس كتير — عشان كده دايمًا بنستخدم وعاء float() الدقيق اللي بيحفظ الأرقام الصحيحة والعشرية بأمان تام.\n' +
  'الفخ التاني: أولوية الأقواس؛ لو حسبت متوسط ٣ أرقام من غير أقواس، بايثون هيقسم آخر رقم بس على ٣ لأن القسمة أقوى من الجمع؛ الأقواس هي الحماية اللي بتضمن إننا نجمع الأول.\n' +
  'وأخيرًا فخ التساوي: في if a > b لو الرقمين متساويين (10 و 10)، الشرط بيكون False فالكود بيسيب if ويقع مباشرة في فرع else!';

export const LESSON_1_4: LessonPack = {
  id: '1.4',
  stationId: 'station-1',
  unitId: 'unit-1',
  order: 4,
  title: 'القرارات الحسابية والدقة العشرية',
  subtitle: 'احفظ الكسور بـ float، تحكم في أولوية الأقواس، وقارن الأرقام بـ if / else',
  durationMin: 9,
  contentVersion: 4,
  access: 'free',
  status: 'ready',
  objectives: [
    'تبرّر استخدام نوع البيانات float بدل int عند القسمة أو وجود كسور لتجنب قطع الناتج.',
    'تطبق أولوية العمليات بالأقواس (a + b + c) / 3 وتنفذ قوانين المساحات.',
    'تتتبع مسار التنفيذ في if / else عند المقارنات (بما فيها حالة التساوي!) دون خلط.',
  ],
  cards: [
    {
      id: '1.4-c1',
      title: 'البداية وتحدي ١٥ ثانية',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-hero',
          type: 'heroHook',
          data: {
            title: 'الأرقام العشرية والمقارنات الذكية',
            durationMin: 9,
            stationLabel: 'المحطة ١ · الدرس ٤ من ٥',
            goal: 'تحفظ الكسور بـ float، وتضبط أولوية الأقواس ()، وتقارن الأرقام بدقة بـ if / else.',
            hook: 'تخيل بتشتري حاجة بـ 85.9 جنيه أو ده متوسط درجاتك، وقرر حد يمرر الرقم جوه `int(85.9)` عشان يشيل الكسر. هل بايثون هيقرّبها لـ 86 زي ما متعودين في الرياضة؟',
            starterChallenge: {
              prompt:
                'تحدي استكشاف وفضول (جاوب بإحساسك، مش مهم صح ولا غلط لأننا لسه بنتعرف عليها سوا!): في بايثون، ماذا سيطبع الأمر `print(int(85.9))` على الشاشة؟',
              options: [
                {
                  id: 'sc-1',
                  text: '86 (تقريب لأقرب عدد صحيح)',
                  isCorrect: false,
                  feedback: 'توقع منطقي جدًا من حسابات المدرسة وبداية هايلة! بس بايثون في int() مبيقرّبش خالص، هو عنده مقص بيقص الكسر كله.',
                },
                {
                  id: 'sc-2',
                  text: '85 (قص الكسر العشري بالكامل)',
                  isCorrect: true,
                  feedback: 'صح ١٠٠٪ يا صاحبي! int() بتقطع الجزء العشري كله (Truncate) مهما كان قريب من الـ 86 فتطلع 85.',
                },
                {
                  id: 'sc-3',
                  text: 'خطأ ValueError',
                  isCorrect: false,
                  feedback: 'ولا تشيل هم خالص، تخمين جميل! ValueError يحصل لو دخلنا نصًا عشريًا زي "85.9"، أما الرقم 85.9 فبتقصه عادي.',
                },
              ],
              revealNote:
                'المهم هنا إننا بنستكشف ونتوقع سوا بدون أي قلق من الصح والغلط! عشان ما نخسرش كسور الأسعار والمتوسطات، بنستخدم نوع البيانات float() بدل int(). شوفها بالصورة والفيديو الجايين.',
            },
          },
        },
      ],
    },
    {
      id: '1.4-c2',
      title: 'النموذج البصري: كوب الكسر وتفرع القرار',
      role: 'concept',
      blocks: [
        {
          id: '1.4-img',
          type: 'imageBlock',
          data: {
            src: '/media/lesson-1-4-float-vs-int.jpg',
            alt: 'كوب int يسكب القطرة العشرية مقابل كوب float الذي يحفظها، وبجانبهما لافتة تفرع if و else',
            caption: 'الـ int بيرمي الجزء العشري كله، بينما الـ float بيحتفظ بيه؛ و if/else بتمشّي البرنامج في سكة واحدة بس.',
            aspectRatio: '16/9',
          },
        },
        {
          id: '1.4-video',
          type: 'mediaPlayer',
          data: {
            kind: 'video',
            title: 'فيديو بصري (٩١ ثانية): أسرار فخاخ الأكواد — مقص int() ووعاء float() والأقواس',
            src: '/media/video-1-4.mp4',
            vttSrc: '/media/caption-1-4.vtt',
            durationSec: 91,
            transcript: VIDEO_1_4_TRANSCRIPT,
          },
        },
      ],
    },
    {
      id: '1.4-c3',
      title: 'خطر أولوية العمليات: بالأقواس vs بدون أقواس',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-tabs-prec',
          type: 'comparisonTabs',
          data: {
            heading: 'إيه الفرق بين (a + b + c) / 3 و a + b + c / 3؟',
            instruction: 'اضغط على التبويبين وشوف الكارثة الحسابية اللي بتحصل لو نسيت الأقواس:',
            tabs: [
              {
                id: 'tab-parens-ok',
                label: 'بالأقواس و float ✓',
                badge: 'نتيجة دقيقة',
                tone: 'emerald',
                body: 'الأقواس بتجبر Python يجمع الثلاث درجات الأول وبعدين يقسم على ٣، و `float()` يحفظ الكسور.',
                code: 'a, b, c = 80.0, 90.0, 86.0\navg = (a + b + c) / 3\nprint(avg)  # 85.333...',
              },
              {
                id: 'tab-parens-bug',
                label: 'بدون أقواس ✕',
                badge: 'كارثة حسابية!',
                tone: 'coral',
                body: 'من غير أقواس، القسمة `/` ليها أولوية أعلى من `+`؛ فيقسم `c` لوحدها على ٣ وبعدين يجمع `a` و `b`!',
                code: 'a, b, c = 80, 90, 90\nwrong = a + b + c / 3\nprint(wrong)  # 200.0 مش 86.6!',
              },
            ],
          },
        },
      ],
    },
    {
      id: '1.4-c4',
      title: 'توقّع قبل التشغيل: أولوية القسمة + مثال المتوسط',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-predict',
          type: 'predictOutput',
          data: {
            title: 'PRIMM: توقّع المخرجات بدون أقواس',
            prompt: 'نسي مبرمج كتابة الأقواس وكتب `print(2 + 4 / 2)`. هيرجع كام لما تشغّل الكود؟',
            code: 'print(2 + 4 / 2)',
            runnable: true,
            expectedOutput: '4.0',
            options: [
              {
                id: 'po-1',
                text: '3.0',
                isCorrect: false,
                feedback: 'كان هيطبع 3.0 فقط لو حطينا أقواس: (2 + 4) / 2؛ من غيرها القسمة بتسبق الجمع.',
              },
              {
                id: 'po-2',
                text: '4.0',
                isCorrect: true,
                feedback: 'صح! بايثون ينفذ القسمة أولًا: 4 / 2 = 2.0، وبعدها يجمع 2 + 2.0 = 4.0.',
              },
              {
                id: 'po-3',
                text: '6',
                isCorrect: false,
                feedback: 'القسمة على 2 بتتنفذ على الـ 4 الأول، والجمع مش بيلغي القسمة.',
              },
              {
                id: 'po-4',
                text: 'خطأ SyntaxError',
                isCorrect: false,
                feedback: 'الصيغة سليمة نحويًا لكن ترتيبها الحسابي غير اللي ممكن تتوقعه بدون أقواس!',
              },
            ],
            explanation: 'في Python القسمة `/` تسبق الجمع `+`؛ والأقواس وحدها هي اللي بتجمع الأرقام قبل القسمة.',
          },
        },
        {
          id: '1.4-avg-code',
          type: 'codeView',
          data: {
            title: 'مثال ٢ من الكتاب: متوسط ٣ أرقام (ص ٩)',
            code: 'a = float(input("Enter first number: "))\nb = float(input("Enter second number: "))\nc = float(input("Enter third number: "))\navg = (a + b + c) / 3\nprint("Average =", avg)',
            caption: 'جرّب تشغيل الكود وشوف إزاي الأقواس و float حفظوا الدقة.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '1.4-c5',
      title: 'جرّب بنفسك: مساحة المستطيل والمربع',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-rect-view',
          type: 'codeView',
          data: {
            title: 'مثال ٣ من الكتاب: مساحة المستطيل (ص ١٠)',
            code: 'length = float(input("Enter length: "))\nwidth = float(input("Enter width: "))\narea = length * width\nprint("Area =", area)',
            caption: 'استخدام float() هنا بيخلي البرنامج يقبل أرقام صحيحة وعشرية زي 2.5 كمان.',
            runnable: true,
          },
        },
        {
          id: '1.4-square-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل كود مساحة المربع (المسألة القريبة)',
            prompt:
              'زي مساحة المستطيل، استبدل `___` في السطر ٢ بمعادلة مساحة المربع (الضلع × الضلع)، ثم اضغط «تحقق من الحل».',
            starterCode:
              'side = int(input("Enter side: "))\narea = ___\nprint("Area =", area)',
            solutionCode:
              'side = int(input("Enter side: "))\narea = side * side\nprint("Area =", area)',
            quickChips: ['side * side', 'side ** 2', 'side * 4', 'side + side'],
            checks: [
              { id: 'sq-1', label: 'ضلع طوله 6 (المساحة 36)', stdin: ['6'], expectedOutputRegex: '36' },
              { id: 'sq-2', label: 'ضلع طوله 9 (المساحة 81)', stdin: ['9'], expectedOutputRegex: '81' },
            ],
            hint: 'اكتب side * side (أو side ** 2) مكان ___.',
            hints: [
              'الهدف: احسب مساحة المربع وخزّنها في المتغير area قبل سطر الطباعة.',
              'المبدأ: مساحة المربع = طول الضلع × نفسه (مش × 4 اللي بتحسب المحيط!).',
              'الخطوة: استبدل ___ بـ side * side أو side ** 2.',
            ],
          },
        },
      ],
    },
    {
      id: '1.4-c6',
      title: 'فخّان مهمان في التحويل والقرار',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-traps-flips',
          type: 'flipCards',
          data: {
            heading: 'اقلب البطاقتين واكشف فخّي float و if/else',
            instruction: 'توقّع الإجابة في دماغك قبل ما تقلب كل بطاقة:',
            cards: [
              {
                id: 'trap-float-int',
                frontLabel: 'فخ ١',
                frontTitle: 'لو استخدمت `float(input())` والمستخدم كتب رقم صحيح زي `10`، هيحصل خطأ؟',
                frontHint: 'اضغط واعرف الفرق بين مرونة float وصرامة int…',
                backTitle: 'لا، تشتغل بمرونة!',
                backBody: '`float("10")` بتتحول إلى `10.0` بدون أي مشاكل، بينما `int("10.5")` بترفع `ValueError`!',
                code: 'print(float("10"))  # 10.0',
              },
              {
                id: 'trap-else',
                frontLabel: 'فخ ٢',
                frontTitle: 'هل ممكن أوامر `if` وأوامر `else` يتنفذوا الاتنين في لفة واحدة؟',
                frontHint: 'اضغط اعرف القاعدة الحاسمة…',
                backTitle: 'طريق واحد فقط!',
                backBody: '`else` بتتنفذ **بس** لما شرط `if` يرجّع `False`؛ يعني لو `if` اتنفذت، بايثون بيتخطى `else` تمامًا.',
                backExample: 'لو الدرجة 70 في `if score >= 50:` يطبع Pass فقط ومستحيل يدخل على else.',
              },
            ],
          },
        },
      ],
    },
    {
      id: '1.4-c7',
      title: 'نقطة تحقق سريعة: مسار التنفيذ في if/else',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-q1',
          type: 'quizQuestion',
          data: {
            question: 'إذا كان الشرط المكتوب في التعليمة `if` يعطي النتيجة `False`، فأي مسار سيسلكه البرنامج؟',
            multiple: false,
            scored: false,
            sourceTag: 'مرتبط بالكتاب · ص ١٧',
            options: [
              {
                id: 'a',
                text: 'يتوقف البرنامج عن العمل تمامًا',
                isCorrect: false,
                feedback: 'False ليست خطأ برمجيًا؛ البرنامج ينتقل للمسار البديل ولا يتوقف.',
              },
              {
                id: 'b',
                text: 'يتم تنفيذ الجملة التابعة لـ else (إذا وُجدت)',
                isCorrect: true,
                feedback: 'صح! لما الشرط يكون False، بايثون يتجاوز كتلة if وينفّذ كتلة else فورًا.',
              },
              {
                id: 'c',
                text: 'يُعيد اختبار الشرط مرة أخرى تلقائيًا',
                isCorrect: false,
                feedback: 'جملة if تفحص الشرط مرة واحدة بس، بعكس الحلقات التكرارية مثل for.',
              },
              {
                id: 'd',
                text: 'ينفذ الأوامر التابعة لـ if رغم ذلك',
                isCorrect: false,
                feedback: 'الأوامر المزاحة تحت if لا تعمل إلا إذا كانت قيمة الشرط True.',
              },
            ],
            explanation: 'عندما يكون شرط if غير محقق (False)، ينتقل التنفيذ لكتلة else إن وُجدت.',
          },
        },
      ],
    },
    {
      id: '1.4-c8',
      title: 'بودكاست + صيد خطأ الأقواس',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-podcast',
          type: 'mediaPlayer',
          data: {
            kind: 'audio',
            title: 'بودكاست ٩٠ ثانية: ٣ فخاخ في بايثون هتبوظلك الكود',
            src: '/media/podcast-1-4.mp3',
            durationSec: 90,
            transcript: PODCAST_1_4_TRANSCRIPT,
          },
        },
        {
          id: '1.4-spotbug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'اكشف غلطة حساب المتوسط',
            prompt: 'صاحبك كتب برنامج لحساب متوسط ٣ درجات، لكنه استغرب لما النتيجة طلعت أكبر من 100! اضغط على السطر اللي فيه الغلطة:',
            codeLines: [
              'a = float(input("Grade 1: "))',
              'b = float(input("Grade 2: "))',
              'c = float(input("Grade 3: "))',
              'avg = a + b + c / 3',
              'print("Average =", avg)',
            ],
            lineFeedback: {
              1: 'استقبال الدرجة الأولى بـ float(input(...)) سليم.',
              2: 'استقبال الدرجة الثانية بـ float(input(...)) سليم.',
              3: 'استقبال الدرجة الثالثة بـ float(input(...)) سليم.',
              5: 'سطر الطباعة في السطر 5 سليم — الخلل في طريقة حساب avg قبلها.',
            },
            bugLine: 4,
            fixedLine: 'avg = (a + b + c) / 3',
            fixExplanation: 'بدون الأقواس في السطر 4، بايثون يقسم c لوحدها على 3 ثم يجمع a و b! الأقواس تجبره يجمع الكل أولًا.',
          },
        },
      ],
    },
    {
      id: '1.4-c9',
      title: 'مثال ٤ من الكتاب: أكبر رقم من رقمين',
      role: 'example',
      blocks: [
        {
          id: '1.4-max-view',
          type: 'codeView',
          data: {
            title: 'مثال ٤ من الكتاب (ص ١٠–١١): الأكبر بين رقمين',
            code: 'a = int(input("Enter first number: "))\nb = int(input("Enter second number: "))\nif a > b:\n    print("Larger =", a)\nelse:\n    print("Larger =", b)',
            caption: 'شغّل الكود ولاحظ: علامة > تختبر «أكبر تمامًا»، يعني لو a == b الشرط يطلع False وينفذ else.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '1.4-c10',
      title: 'تحدي مستقل: متوسط ٤ مواد بدقة float',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-avg4-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'احسب متوسط ٤ درجات بالأقواس الصحيحة',
            prompt:
              'اكتب سطر حساب المتوسط `avg` بالأقواس الصحيحة لـ ٤ درجات (`a, b, c, d`)، ثم اطبعه باستخدام `print("Average =", avg)`.',
            starterCode:
              'a = float(input("Grade 1: "))\nb = float(input("Grade 2: "))\nc = float(input("Grade 3: "))\nd = float(input("Grade 4: "))\n# احسب المتوسط واطبعه بالأسفل\n',
            solutionCode:
              'a = float(input("Grade 1: "))\nb = float(input("Grade 2: "))\nc = float(input("Grade 3: "))\nd = float(input("Grade 4: "))\navg = (a + b + c + d) / 4\nprint("Average =", avg)',
            quickChips: [
              'avg = (a + b + c + d) / 4',
              'print("Average =", avg)',
              'avg = a + b + c + d / 4',
              'avg = int(a + b + c + d) / 4',
            ],
            checks: [
              { id: 'avg4-1', label: 'درجات 80, 90, 85, 87 (المتوسط 85.5)', stdin: ['80', '90', '85', '87'], expectedOutputRegex: '85\\.5' },
              { id: 'avg4-2', label: 'درجات 10, 20, 30, 40 (المتوسط 25)', stdin: ['10', '20', '30', '40'], expectedOutputRegex: '25' },
            ],
            hint: 'تأكد من كتابة الأقواس: avg = (a + b + c + d) / 4 وبعدين print("Average =", avg).',
            hints: [
              'الهدف: اجمع الأربع درجات أولًا، ثم اقسم المجموع على 4، ثم اطبع قيمة avg.',
              'المبدأ: بدون أقواس حول الجمع، القسمة على 4 تتنفذ على d فقط؛ وكمان استخدم avg بدون int() للحفاظ على الكسر.',
              'الخطوة: أضف السطرين: avg = (a + b + c + d) / 4 ثم print("Average =", avg).',
            ],
          },
        },
      ],
    },
    {
      id: '1.4-c11',
      title: 'تحدّي النقل (من خارج الكتاب)',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '1.4-q3',
          type: 'quizQuestion',
          data: {
            question: 'ماذا يطبع البرنامج التالي إذا أدخل المستخدم `10` لـ `a` و `10` لـ `b`؟',
            code: 'a = int(input())\nb = int(input())\nif a > b:\n    print("A wins")\nelse:\n    print("B or Tie")',
            multiple: false,
            scored: false,
            sourceTag: 'فهم من خارج الكتاب',
            options: [
              {
                id: 'a',
                text: 'A wins',
                isCorrect: false,
                feedback: 'علامة > تختبر «أكبر تمامًا»؛ وبما أن 10 ليست أكبر من 10 فنتيجة الشرط False.',
              },
              {
                id: 'b',
                text: 'B or Tie',
                isCorrect: true,
                feedback: 'ممتاز! لأن 10 > 10 قيمتها False، يتجه التنفيذ فورًا إلى مسار else.',
              },
              {
                id: 'c',
                text: 'يطبع الجملتين معًا',
                isCorrect: false,
                feedback: 'if و else مساران متبادلان؛ في كل تشغيل يتنفذ مسار واحد فقط.',
              },
              {
                id: 'd',
                text: 'لا يطبع شيئًا',
                isCorrect: false,
                feedback: 'وجود كتلة else يضمن طباعة الرسالة البديلة كلما كان الشرط False.',
              },
            ],
            explanation: 'علامة > تختبر «أكبر تمامًا»؛ وعند التساوي (10 > 10) تكون النتيجة False فينفذ else.',
          },
        },
      ],
    },
    {
      id: '1.4-c12',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '1.4-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'استخدم `float` مع القسمة والكسور عشان `int()` ما تقصّش الجزء العشري (`int(85.9) == 85`)، واجمع دايمًا جوه أقواس `(a + b + c) / 3` عشان القسمة ما تسبقش الجمع. وبـ `if / else` والمقارنة `>` برنامجك بيسلك مسارًا واحدًا بس. في الدرس الأخير هنتعلم التكرار المنظم بـ `for` و `range()`!',
          },
        },
        {
          id: '1.4-infographic',
          type: 'imageBlock',
          data: {
            src: '/media/infographic-1-4.png',
            alt: 'إنفوجرافيك الدقة العشرية والأقواس وفخ المقارنة في بايثون',
            caption: 'إنفوجرافيك المراجعة (NotebookLM): مقص int() مقابل كوب float()، وأولوية الأقواس، وسلوك if a > b عند التساوي.',
          },
        },
      ],
    },
  ],
  summary:
    'الحفاظ على الكسور بـ float، أولوية الأقواس، حساب المساحات، واتخاذ القرارات بـ if / else والمقارنة >.',
  additionalSources: [
    {
      id: 'nb-1-4-audio',
      type: 'audio',
      title: 'ملخص صوتي (بودكاست ٩٠ ثانية)',
      src: '/media/podcast-1-4.mp3',
      durationSec: 90,
      transcript: PODCAST_1_4_TRANSCRIPT,
      notes: [
        'float تحفظ الكسور بينما int تقطعها بدون تقريب.',
        'الأقواس ضرورية في (a + b + c) / 3 لأن القسمة تسبق الجمع.',
      ],
    },
    {
      id: 'nb-1-4-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content:
        'الدرس يجمع ٣ أمثلة أساسية: المتوسط (دقة float والأقواس)، المساحة (الضرب)، والمقارنة (if / else مع >).',
      bullets: [
        'float يحفظ الأرقام العشرية مثل 85.5 بعكس int التي تقطع الكسر.',
        'الأقواس تحمي أولوية الجمع قبل القسمة في المتوسط.',
        'else لا تعمل إلا عندما يكون شرط if قيمته False.',
      ],
    },
    {
      id: 'nb-1-4-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-1-4-1',
          question: 'لو استخدمت float() هل ينفع أدخل عدد صحيح زي 10 عادي؟',
          answer: 'أيوه! float("10") بتتحول إلى 10.0 وتشتغل بدون أي مشكلة مع الأعداد الصحيحة والعشرية.',
        },
        {
          id: 'faq-1-4-2',
          question: 'ليه (a + b + c) / 3 غير a + b + c / 3؟',
          answer: 'لأن القسمة لها أولوية أعلى من الجمع! من غير أقواس هيتقسم c بس على 3 بدل المجموع كله.',
        },
      ],
    },
    {
      id: 'nb-1-4-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-1-4',
        label: 'الدقة العشرية float والأقواس والمقارنة',
        children: [
          {
            id: 'mm-1-4-f',
            label: 'الدالة float() مقابل int()',
            children: [
              { id: 'mm-1-4-f1', label: 'float() تحفظ الدقة العشرية وتقبل الصحيح والعشري' },
              { id: 'mm-1-4-f2', label: 'int() تقص الجزء العشري دون تقريب: int(85.9) = 85' },
              { id: 'mm-1-4-f3', label: 'تطبيقان: متوسط ٣ أرقام ومساحة المستطيل' },
            ],
          },
          {
            id: 'mm-1-4-p',
            label: 'أولوية العمليات والأقواس',
            children: [
              { id: 'mm-1-4-p1', label: 'القسمة (/) تسبق الجمع (+) افتراضيًا' },
              { id: 'mm-1-4-p2', label: 'الأقواس في (a + b + c) / 3 تجبر الجمع أولًا' },
            ],
          },
          {
            id: 'mm-1-4-c',
            label: 'المقارنة الشرطية (if / else)',
            children: [
              { id: 'mm-1-4-c1', label: 'if a > b: ينفّذ if فقط إذا كان الأول أكبر تمامًا' },
              { id: 'mm-1-4-c2', label: 'حالة التساوي (a == b): الشرط False وينتقل لفرع else' },
            ],
          },
          {
            id: 'mm-1-4-traps',
            label: 'فخاخ الامتحانات الشائعة',
            children: [
              { id: 'mm-1-4-t1', label: 'قص الكسر في int(89.9) = 89' },
              { id: 'mm-1-4-t2', label: 'نسيان الأقواس في المتوسط + حالة التساوي في >' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-1-4-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'gl-1-4-1',
          termAr: 'عدد عشري',
          termEn: 'Floating-point (float)',
          definition: 'نوع بيانات رقمي يحتفظ بالكسور والأرقام بعد العلامة العشرية.',
        },
        {
          id: 'gl-1-4-2',
          termAr: 'الجملة الشرطية',
          termEn: 'if / else Statement',
          definition: 'تعبير برمجي يختبر شرطًا؛ ينفذ كتلة if عند تحقق الشرط، وكتلة else عند عدم تحققه.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'src-1-4-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي',
      detail: 'الأمثلة ٢ و٣ و٤ (المتوسط، مساحة المستطيل، أكبر رقم)',
      pages: 'ص 9–11',
    },
    {
      id: 'src-1-4-nb',
      kind: 'notebooklm',
      label: 'ملخصات وبودكاست الدرس ١.٤',
      detail: 'رسمة الدقة العشرية + فيديو + بودكاست أولوية العمليات',
    },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '1.5',
    label: 'الدرس الجاي: الحلقات التكرارية for ونشاط الكتاب',
    description: 'هتفهم سر range(start, stop) والمسافة البادئة وتنجز نشاط الكتاب الشامل!',
  },
};
