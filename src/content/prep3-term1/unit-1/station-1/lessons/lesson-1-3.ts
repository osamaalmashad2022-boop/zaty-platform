import type { LessonPack } from '@/types/curriculum';

const PODCAST_1_3_TRANSCRIPT =
  'بص يا صاحبي، تخيل معايا كده إن البرمجة عاملة زي مكنة السناكس والمشروبات بالظبط: الفلوس اللي بتدخلها هي الـ Input، والعصير والفكة اللي بتطلعلك هي الـ Output.\n' +
  'أولًا: دالة input() بتستلم البيانات كحتة ورقة أو نص جوه طرد مقفول، ودور دالة int() إنها تفك الطرد ده وتحوله لرقم صحيح — بس خد بالك من فخ ValueError لو كتبت حروف زي «خمسة» بدل أرقام لأن int() ما بتفهمش الحروف نهائيًا.\n' +
  'ثانيًا: علامة باقي القسمة % افتكرها بحسب الشوكولاتة: لو معانا ٢٥ قطعة على ٤ علب، كل علبة تاخد ٦ وتتبقى في إيدك قطعة واحدة (25 % 4 = 1).\n' +
  'أخيرًا: علامة = الواحدة عشان نخزن قيمة جوه صندوق، لكن == المزدوجة وظيفتها تسأل وتقارن جوه جملة الشرط if. خلاصة القول يا صديقي: دخل أرقامك صح، افهم فكة باقي القسمة، وميّز دايمًا بين صندوق التخزين وسؤال المقارنة!';

const VIDEO_1_3_TRANSCRIPT =
  'أهلًا بيك يا صاحبي، خلينا ندخل في الموضوع على طول: لغة بايثون شغالة بالظبط زي مكنة السناكس والمشروبات اللي بنشوفها في أي مول — بتدخلها فلوس وتضغط على الزرار فتطلعلك كيس شيبسي وباقي فكة (مدخلات تدينا مخرجات).\n' +
  'بص يا صديقي: أي مدخلات بناخدها بدالة input() بتوصلنا في طرد مقفول على هيئة نص، وعشان نعمل حسابات لازم نعديها على دالة int() اللي بتفك الطرد وتشيل علامات التنصيص وتطلع رقم صافي — بس خلي بالك لو دخلنا حروف زي كلمة «خمسة» السيستم بيطلع ValueError فورًا.\n' +
  'أما علامة % (الموديولو) فهي الفكة أو الباقي: لو وزعنا ٢٥ شوكولاتة على ٤ علب، كل علبة تاخد ٦ وتتبقى قطعة واحدة — ودي أسهل تريكة لمعرفة الزوجي والفردي!\n' +
  'وأهم قاعدة: علامة = الواحدة بتخزن قيمة جوه صندوق، لكن == المزدوجة بتسأل وبتقارن جوه شرط if.';

export const LESSON_1_3: LessonPack = {
  id: '1.3',
  stationId: 'station-1',
  unitId: 'unit-1',
  order: 3,
  title: 'أول برنامج Python: المدخلات وباقي القسمة',
  subtitle: 'افهم input() و int() و % والمسافة البادئة في if قبل كتابة أول كود حقيقي',
  durationMin: 10,
  contentVersion: 4,
  access: 'free',
  status: 'ready',
  objectives: [
    'تفهم ليه input() بترجع نص (String) وإزاي int() بتحوّله لعدد صحيح تقدر تحسب بيه.',
    'تحسب باقي القسمة % وتطبّقه في كشف الزوجي والفردي وفي مسائل التوزيع اليومية.',
    'تكتب جملة if ... else: بمسافة بادئة صحيحة وتفهم سبب خطأ ValueError.',
  ],
  cards: [
    {
      id: '1.3-c1',
      title: 'البداية وتحدي ١٥ ثانية',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-hero',
          type: 'heroHook',
          data: {
            title: 'أول كود Python حقيقي على موبايلك',
            durationMin: 10,
            stationLabel: 'المحطة ١ · الدرس ٣ من ٥',
            goal: 'تفهم الفرق بين النص والرقم في Python، وتستخدم int() و % و if/else لبناء أول برامجك.',
            hook: 'زي ماكينة السناكس اللي بتديها مدخلات وتطلعلك علبة العصير ومعاها الفكة! عملت آلة حاسبة بـ `a = input(); b = input(); print(a + b)` ودخلت `5` ثم `3`، بس الشاشة فاجأتك بنتيجة غريبة! توقعك إيه قبل ما نجرب سوا؟',
            starterChallenge: {
              prompt:
                'لو كتبنا `a = input(); b = input(); print(a + b)` وأدخلنا `5` ثم `3`، الشاشة هتطبع إيه؟',
              options: [
                {
                  id: 'sc-1',
                  text: '8 (مجموع الرقمين)',
                  isCorrect: false,
                  feedback: 'توقع طبيعي وبداية استكشاف ممتازة! بس المفاجأة إن بايثون من غير int() بيعتبر الـ 5 والـ 3 نصوص زي الكلمات مش أرقام جمع.',
                },
                {
                  id: 'sc-2',
                  text: '53 (يلزق النصين جنب بعض)',
                  isCorrect: true,
                  feedback: 'عبقري يا صاحبي! لأن input() بترجع نص دائمًا ("5" و "3")، وعلامة + بين النصوص بتلزقهم جنب بعض فيطبع 53!',
                },
                {
                  id: 'sc-3',
                  text: 'خطأ ValueError',
                  isCorrect: false,
                  feedback: 'ولا يهمك خالص، تخمين ذكي! خطأ ValueError بيحصل لما نحاول نحول حروف لرقم جوه int()، وهنا مفيش int() لسه.',
                },
              ],
              revealNote:
                'المهم هنا إننا بنستكشف ونتوقع سوا بدون أي قلق من الصح والغلط! شوف إزاي دالة int() بتحل اللغز وتحول طرد النص "5" لرقم 5 حقيقي بالصورة والفيديو الجايين.',
            },
          },
        },
      ],
    },
    {
      id: '1.3-c2',
      title: 'النموذج البصري: من طرد النص إلى العدد',
      role: 'concept',
      blocks: [
        {
          id: '1.3-img',
          type: 'imageBlock',
          data: {
            src: '/media/lesson-1-3-input-box.jpg',
            alt: 'روبوت يضع طردًا نصيًا داخل آلة تحويل int فتخرج رقمًا صحيحًا وطبق باقي القسمة',
            caption: 'input() بتسلمنا «طرد نصي» ("7")، و int() بتفك تغليفه لعدد صحيح (7).',
            aspectRatio: '16/9',
          },
        },
        {
          id: '1.3-video',
          type: 'mediaPlayer',
          data: {
            kind: 'video',
            title: 'فيديو بصري (٩٨ ثانية): تريكات بايثون السريعة — ماكينة السناكس وint() و%',
            src: '/media/video-1-3.mp4',
            vttSrc: '/media/caption-1-3.vtt',
            durationSec: 98,
            transcript: VIDEO_1_3_TRANSCRIPT,
          },
        },
      ],
    },
    {
      id: '1.3-c3',
      title: 'قارن input() vs int(input()) وشغّل أول كود',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-tabs-str-int',
          type: 'comparisonTabs',
          data: {
            heading: 'ليـه int(input()) حلّت لغز الـ 53؟',
            instruction: 'اضغط بين الحالتين وشوف فرق علامة +، ثم شغّل المثال:',
            tabs: [
              {
                id: 'tab-no-int',
                label: 'input() لوحدها (نص)',
                badge: 'دمج نصوص',
                tone: 'coral',
                body: '`input()` تخزّن الرقم كـ **نص** `"5"`، وعلامة `+` مع النصوص تلزقهم جنب بعض (`"53"`).',
                code: 'a = input()  # "5"\nb = input()  # "3"\nprint(a + b) # 53',
              },
              {
                id: 'tab-with-int',
                label: 'int(input()) (عدد صحيح)',
                badge: 'جمع حسابي ✓',
                tone: 'emerald',
                body: '`int(...)` تحول النص `"5"` للعدد `5`، فتجمع `+` حسابيًا وتطلع `8`.',
                code: 'a = int(input())  # 5\nb = int(input())  # 3\nprint(a + b)      # 8',
              },
            ],
          },
        },
        {
          id: '1.3-sum-code',
          type: 'codeView',
          data: {
            title: 'جرّب تشغيل مثال الكتاب: جمع رقمين',
            code: 'num1 = int(input("Enter first number: "))\nnum2 = int(input("Enter second number: "))\nsum_val = num1 + num2\nprint("Sum =", sum_val)',
            caption: 'اضغط «جرّب تشغيل الكود» واكتب رقمين بنفسك.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '1.3-c4',
      title: '٣ مفاتيح سريعة: % و == و if/else',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-bridge-flips',
          type: 'flipCards',
          data: {
            heading: 'اقلب البطاقات الثلاث قبل ما تقرأ كود الزوجي والفردي',
            instruction: 'اضغط على كل بطاقة لتثبيت الرمز ووظيفته في Python:',
            cards: [
              {
                id: 'br-mod',
                frontLabel: 'مفتاح ١',
                frontTitle: 'علامة % (باقي القسمة Modulo)',
                frontHint: 'مش نسبة مئوية! بترجع إيه؟',
                backTitle: 'المتبقي بعد التوزيع',
                backBody: 'تقسم الرقمين وترجع **الباقي بس**: `8 % 2 = 0` (زوجي)، أما `7 % 2 = 1` (فردي).',
              },
              {
                id: 'br-eq',
                frontLabel: 'مفتاح ٢',
                frontTitle: 'الفرق بين = و ==',
                frontHint: 'واحدة للتخزين والتانية للسؤال…',
                backTitle: 'تخزين مقابل سؤال',
                backBody: '`=` تخزّن قيمة (`x = 8`)؛ أما `==` فتسأل **«هل متساويين؟»** وترجع `True` أو `False`.',
                code: 'x = 8\nprint(x % 2 == 0)  # True',
              },
              {
                id: 'br-if',
                frontLabel: 'مفتاح ٣',
                frontTitle: 'المسافة البادئة في if ... else:',
                frontHint: 'ليه السطر اللي تحت if بيتزاح ٤ مسافات؟',
                backTitle: '٤ مسافات = تابع للشرط',
                backBody: 'بعد شرط `if` أو `else` نحط `:` ثم نترك **٤ مسافات** قبل الأوامر التابعة للشرط.',
                code: 'if num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")',
              },
            ],
          },
        },
      ],
    },
    {
      id: '1.3-c5',
      title: 'خلّي بالك من ValueError!',
      role: 'warning',
      blocks: [
        {
          id: '1.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'خطأ شائع: كتابة حروف جوه int() بتطلع ValueError',
            body: '• `int("10")` بتشتغل عادي وتحول النص الرقمي للعدد `10`.\n• لكن لو المستخدم كتب كلمة زي `"عشرة"` أو `"ten"` جوه `int(input())`، بايثون بيرفض ويوقف بـ **`ValueError`**!',
          },
        },
      ],
    },
    {
      id: '1.3-c6',
      title: 'نقطة تحقق سريعة: سلوك int()',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'ماذا يحدث إذا أدخل المستخدم كلمة «عشرة» بدل الرقم 10 عند استخدام دالة `int(input())`؟',
            multiple: false,
            scored: false,
            sourceTag: 'مرتبط بالكتاب · ص ١٤',
            options: [
              {
                id: 'a',
                text: 'تُحوّل للرقم 10 تلقائيًا',
                isCorrect: false,
                feedback: 'بايثون لا يترجم الكلمات العربية أو الإنجليزية لأرقام؛ التحويل ينجح مع أرقام مثل "10" فقط.',
              },
              {
                id: 'b',
                text: 'يظهر خطأ ValueError',
                isCorrect: true,
                feedback: 'مظبوط! int() ترفض أي حروف غير رقمية وتوقف التنفيذ بخطأ ValueError.',
              },
              {
                id: 'c',
                text: 'تُعطى القيمة 0 للمتغير',
                isCorrect: false,
                feedback: 'لا يعوّض بايثون القيمة بصفر؛ بل يرفع خطأ ValueError فورًا.',
              },
              {
                id: 'd',
                text: 'يتجاهل الإدخال ويكمل البرنامج',
                isCorrect: false,
                feedback: 'بدون حماية try/except، يتوقف البرنامج عند السطر اللي حصل فيه ValueError.',
              },
            ],
            explanation: 'دالة int() تحول سلاسل الأرقام فقط مثل "10"، وإذا استقبلت حروفًا يحدث ValueError.',
          },
        },
      ],
    },
    {
      id: '1.3-c7',
      title: 'توقّع المخرجات قبل مثال الزوجي والفردي',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-predict',
          type: 'predictOutput',
          data: {
            title: 'PRIMM: توقّع قبل التشغيل',
            prompt: 'اقرأ السطرين كأنك المفسّر — ماذا سيطبع Python على الشاشة بالترتيب؟',
            code: 'print(17 % 5)\nprint(7 % 2 == 0)',
            runnable: true,
            expectedOutput: '2\nFalse',
            options: [
              {
                id: 'po-1',
                text: '3 ثم True',
                isCorrect: false,
                feedback: '3 هي ناتج القسمة الصحيحة مش الباقي، والرقم 7 فردي فباقي قسمته على 2 يساوي 1 لا 0.',
              },
              {
                id: 'po-2',
                text: '2 ثم False',
                isCorrect: true,
                feedback: 'صح ١٠٠٪! 17 فيها 3 خمسات (= 15) ويتبقى 2، و 7 % 2 = 1 لا يساوي 0 فترجع False.',
              },
              {
                id: 'po-3',
                text: '2 ثم True',
                isCorrect: false,
                feedback: 'الباقي 2 صح، لكن 7 % 2 بيساوي 1 مش 0، إذًا تعبير المساواة يرجع False.',
              },
              {
                id: 'po-4',
                text: '3.4 ثم False',
                isCorrect: false,
                feedback: 'علامة % تعطي باقي القسمة الصحيحة (2) وليس القسمة العشرية (17 / 5).',
              },
            ],
            explanation: 'المعامل % يرجّع الباقي فقط، وتعبير == يقارن القيمتين ويرجّع True أو False.',
          },
        },
        {
          id: '1.3-even-code',
          type: 'codeView',
          data: {
            title: 'مثال ١ من الكتاب (ص ٨): هل الرقم زوجي أم فردي؟',
            code: 'num = int(input("Enter a number: "))\nif num % 2 == 0:\n    print("Even number")\nelse:\n    print("Odd number")',
            caption: 'دلوقتي بعد ما توقعت، شغّل الكود وجرّب بنفسك!',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '1.3-c8',
      title: 'اكتشف الخطأ الخفي في الشرط',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-spotbug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد خطأ = مقابل ==',
            prompt: 'مبرمج كتب كود الزوجي والفردي لكن بايثون طلّع SyntaxError! اضغط على السطر اللي فيه الغلطة:',
            codeLines: [
              'num = int(input("Enter a number: "))',
              'if num % 2 = 0:',
              '    print("Even number")',
              'else:',
              '    print("Odd number")',
            ],
            lineFeedback: {
              1: 'السطر 1 بيستقبل الرقم ويحوّله بـ int() بشكل سليم تمامًا.',
              3: 'سطر الطباعة والمسافة البادئة (٤ مسافات) في السطر 3 سليم.',
              4: 'كلمة else: بالنقطتين في السطر 4 سليمة.',
              5: 'سطر طباعة Odd number في السطر 5 سليم.',
            },
            bugLine: 2,
            fixedLine: 'if num % 2 == 0:',
            fixExplanation: 'علامة = الواحدة للتخزين (Assignment)، أما داخل شرط if لازم نستخدم == المزدوجة لسؤال المساواة!',
          },
        },
      ],
    },
    {
      id: '1.3-c9',
      title: 'أكمل السطر الناقص في Python',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-fill-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل جملة الطباعة جوه if',
            prompt:
              'استبدل علامة `___` في السطر ٣ بطباعة `"Even number"` مع الحفاظ على المسافة البادئة، ثم اضغط «تحقق من الحل».',
            starterCode:
              'num = int(input("Enter a number: "))\nif num % 2 == 0:\n    ___\nelse:\n    print("Odd number")',
            solutionCode:
              'num = int(input("Enter a number: "))\nif num % 2 == 0:\n    print("Even number")\nelse:\n    print("Odd number")',
            quickChips: [
              'print("Even number")',
              'print("Odd number")',
              'num % 2 == 0',
              'input("Even number")',
            ],
            checks: [
              { id: 'chk-even', label: 'تجربة الرقم 8 (زوجي)', stdin: ['8'], expectedOutputRegex: '(Even|زوجي)' },
              { id: 'chk-odd', label: 'تجربة الرقم 7 (فردي)', stdin: ['7'], expectedOutputRegex: '(Odd|فردي)' },
            ],
            hint: 'استبدل ___ بـ print("Even number") مع وجود ٤ مسافات قبلها.',
            hints: [
              'الهدف: لما الشرط يتحقق (الرقم زوجي)، السطر ٣ لازم يطبع رسالة Even number على الشاشة.',
              'المبدأ: نستخدم دالة print() لعرض نص بين علامتي تنصيص، ونحافظ على الـ ٤ مسافات في بداية السطر.',
              'الخطوة: استبدل ___ بالرقاقة print("Even number").',
            ],
          },
        },
      ],
    },
    {
      id: '1.3-c10',
      title: 'بودكاست التوزيع + تحدّي القسمة على ٥',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-podcast',
          type: 'mediaPlayer',
          data: {
            kind: 'audio',
            title: 'بودكاست ١٠٠ ثانية: ماكينة السناكس وباقي القسمة وفخ = مقابل ==',
            src: '/media/podcast-1-3.mp3',
            durationSec: 100,
            transcript: PODCAST_1_3_TRANSCRIPT,
          },
        },
        {
          id: '1.3-free-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'تحدي المبرمج: القسمة على ٥',
            prompt:
              'اكتب شرطًا يختبر هل `num` يقبل القسمة على 5 (`num % 5 == 0`): يطبع `"Divisible by 5"` عند التحقق، و `"Not divisible by 5"` في `else`.',
            starterCode:
              'num = int(input("Enter a number: "))\n# اكتب جملة if و else بالأسفل\n',
            solutionCode:
              'num = int(input("Enter a number: "))\nif num % 5 == 0:\n    print("Divisible by 5")\nelse:\n    print("Not divisible by 5")',
            quickChips: [
              'if num % 5 == 0:',
              '    print("Divisible by 5")',
              'else:',
              '    print("Not divisible by 5")',
              'if num % 5 = 0:',
            ],
            checks: [
              { id: 'chk-div5', label: 'تجربة الرقم 25 (يقبل القسمة)', stdin: ['25'], expectedOutputRegex: 'Divisible by 5' },
              { id: 'chk-not5', label: 'تجربة الرقم 12 (لا يقبل القسمة)', stdin: ['12'], expectedOutputRegex: 'Not divisible by 5' },
            ],
            hint: 'نفس هيكل الزوجي والفردي، بس بدّل 2 بـ 5: if num % 5 == 0:',
            hints: [
              'الهدف: افحص هل باقي قسمة num على 5 يساوي صفرًا، واطبع الرسالة المناسبة في كل مسار.',
              'المبدأ: استخدم علامة == (مش =) مع % 5، وحط : بعد الشرط و ٤ مسافات قبل كل print().',
              'الخطوة: ركّب السطور بالترتيب: if num % 5 == 0: ← سطر مزاح print("Divisible by 5") ← else: ← سطر مزاح print("Not divisible by 5").',
            ],
          },
        },
      ],
    },
    {
      id: '1.3-c11',
      title: 'تحدّي النقل (من خارج الكتاب)',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '1.3-q3',
          type: 'quizQuestion',
          data: {
            question: 'معك ١٧ قطعة حلوى وتريد توزيعها بالتساوي في أكياس، كل كيس به ٥ قطع. ما ناتج `17 % 5` في Python وماذا يمثّل؟',
            multiple: false,
            scored: false,
            sourceTag: 'فهم من خارج الكتاب',
            options: [
              {
                id: 'a',
                text: '3 (عدد الأكياس الممتلئة)',
                isCorrect: false,
                feedback: '3 هي ناتج القسمة الصحيحة (17 // 5)، أما % فترجع الباقي المتبقي بعد التوزيع.',
              },
              {
                id: 'b',
                text: '2 (عدد القطع المتبقية بعد التوزيع)',
                isCorrect: true,
                feedback: 'ممتاز! 17 فيها 3 خمسات (= 15) ويتبقى 2، وده بالظبط ناتج 17 % 5.',
              },
              {
                id: 'c',
                text: '3.4 (ناتج القسمة العشرية)',
                isCorrect: false,
                feedback: '3.4 هو ناتج القسمة العادية 17 / 5، بينما % تحسب الباقي الصحيح فقط.',
              },
              {
                id: 'd',
                text: '0 لأنها قسمة صحيحة',
                isCorrect: false,
                feedback: '17 لا تقبل القسمة على 5 بدون باقي؛ يتبقى 2 بعد ملء 3 أكياس.',
              },
            ],
            explanation: 'المعامل % يُرجع الباقي فقط بعد القسمة الصحيحة: 17 = (3 × 5) + 2، إذًا 17 % 5 = 2.',
          },
        },
      ],
    },
    {
      id: '1.3-c12',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '1.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'عرفت إن `input()` بترجع نصًا (فنستخدم `int()` للأعداد الصحيحة، مع الانتباه لخطأ `ValueError` لو دخلت حروف). واتعلمت إن `%` بتجيب باقي القسمة، وإن `if ... else:` بتحتاج `==` ونقطتين `:` و٤ مسافات بادئة. في الدرس الجاي هنشوف إمتى `int()` يقطع الكسور وإمتى نحتاج `float()`!',
          },
        },
        {
          id: '1.3-infographic',
          type: 'imageBlock',
          data: {
            src: '/media/infographic-1-3.png',
            alt: 'إنفوجرافيك تشريح أول برنامج Python: المدخلات وint وValueError ومعامل % والفرق بين = و ==',
            caption: 'إنفوجرافيك المراجعة (NotebookLM): ملخص بصري لتحويل int()، فخ ValueError، توزيع ٢٥ شوكولاتة بـ %، والفرق بين = و ==.',
          },
        },
      ],
    },
  ],
  summary:
    'استخدام input() و int() و print() ومعامل باقي القسمة % ومقدمة if/else و == وتنبيه ValueError.',
  additionalSources: [
    {
      id: 'nb-1-3-audio',
      type: 'audio',
      title: 'ملخص صوتي (بودكاست ١٠٠ ثانية)',
      src: '/media/podcast-1-3.mp3',
      durationSec: 100,
      transcript: PODCAST_1_3_TRANSCRIPT,
      notes: [
        '"5" + "3" = "53" لأن input() بترجع نصًا دائمًا.',
        'معامل % ينفع لأي مشكلة توزيع وبواقي مش الزوجي والفردي بس.',
      ],
    },
    {
      id: 'nb-1-3-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content:
        'أول برنامج Python حقيقي بيجمع بين الاستقبال والتحويل (`int(input())`)، ثم الفحص الشرطي (`if / else`)، ثم الطباعة (`print()`).',
      bullets: [
        'input() ترجع String دائمًا؛ نحولها بـ int() للأعداد الصحيحة.',
        '= لتخزين قيمة في متغير، و == لاختبار المساواة (True/False).',
        '% ترجع باقي القسمة (مثل 17 % 5 == 2 و 8 % 2 == 0).',
        'إدخال نص غير رقمي في int() يرفع خطأ ValueError.',
      ],
    },
    {
      id: 'nb-1-3-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-1-3-1',
          question: 'إيه الفرق بين = و == في بايثون؟',
          answer:
            '= الواحدة بتخزن قيمة جوه متغير (num = 5)، أما == المزدوجة فبتسأل هل الطرفين متساويين (num % 2 == 0) وترجع True أو False.',
        },
        {
          id: 'faq-1-3-2',
          question: 'لو كتبت int("5") هيحصل ValueError؟',
          answer: 'لا! "5" جواها رقم مكتوب كحرف عددي، فبتتحول عادي إلى 5. الخطأ بيحصل مع الحروف غير الرقمية زي "خمسة".',
        },
      ],
    },
    {
      id: 'nb-1-3-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-1-3',
        label: 'أول برنامج Python: المدخلات والشرط و %',
        children: [
          {
            id: 'mm-1-3-fns',
            label: 'الدوال الأساسية',
            children: [
              { id: 'mm-1-3-in', label: 'input(): تقرأ مدخلات المستخدم كـ نص (String) دائمًا' },
              {
                id: 'mm-1-3-int',
                label: 'int(): تحوّل النص الرقمي لعدد صحيح ("5" ← 5)',
                children: [
                  { id: 'mm-1-3-err', label: 'فخ شائع: إدخال حروف داخل int() يرفع خطأ ValueError' },
                ],
              },
            ],
          },
          {
            id: 'mm-1-3-ops',
            label: 'المعاملات والمقارنات',
            children: [
              {
                id: 'mm-1-3-mod',
                label: 'معامل باقي القسمة (%)',
                children: [
                  { id: 'mm-1-3-m1', label: 'مثال: 7 % 2 = 1 و 8 % 2 = 0' },
                  { id: 'mm-1-3-m2', label: 'تطبيق التوزيع: 25 شوكولاتة ÷ 4 علب (الباقي 1)' },
                ],
              },
              {
                id: 'mm-1-3-eq',
                label: 'الفرق الحاسم بين = و ==',
                children: [
                  { id: 'mm-1-3-eq1', label: '= لتعيين وتخزين قيمة لمتغير' },
                  { id: 'mm-1-3-eq2', label: '== للمقارنة واختبار المساواة داخل شرط if' },
                ],
              },
            ],
          },
          {
            id: 'mm-1-3-even',
            label: 'تطبيق: تحديد الرقم الزوجي والفردي',
            children: [
              { id: 'mm-1-3-if', label: 'if num % 2 == 0: → زوجي (Even) + مسافة بادئة 4 مسافات' },
              { id: 'mm-1-3-else', label: 'else: → فردي (Odd)' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-1-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'gl-1-3-1',
          termAr: 'عدد صحيح',
          termEn: 'Integer (int)',
          definition: 'رقم صحيح بدون كسور عشرية، نحصل عليه من التحويل بالدالة int().',
        },
        {
          id: 'gl-1-3-2',
          termAr: 'باقي القسمة',
          termEn: 'Modulo (%)',
          definition: 'عملية حسابية تعيد الباقي المتبقي بعد قسمة عددين صحيحين.',
        },
        {
          id: 'gl-1-3-3',
          termAr: 'المسافة البادئة',
          termEn: 'Indentation (4 spaces)',
          definition: 'مسافات في بداية السطر لتحديد الأوامر التابعة لـ if أو else أو الحلقات.',
        },
        {
          id: 'gl-1-3-4',
          termAr: 'خطأ قيمة الإدخال',
          termEn: 'ValueError',
          definition: 'خطأ يظهر في Python عند محاولة تحويل نص غير رقمي إلى عدد.',
        },
        {
          id: 'gl-1-3-5',
          termAr: 'التعيين مقابل المقارنة',
          termEn: 'Assignment (=) vs Comparison (==)',
          definition: 'علامة = لتخزين قيمة في متغير، بينما == للمقارنة الشرطية وإرجاع True أو False.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'src-1-3-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي',
      detail: 'المثال التمهيدي (جمع رقمين) + المثال الأول (زوجي أم فردي)',
      pages: 'ص 7–8',
    },
    {
      id: 'src-1-3-nb',
      kind: 'notebooklm',
      label: 'ملخصات ووسائط الدرس ١.٣',
      detail: 'رسمة طرد النص + فيديو + بودكاست + إنفوجرافيك وخريطة ذهنية ودليل المراجعة',
    },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '1.4',
    label: 'الدرس الجاي: القرارات الحسابية والدقة العشرية',
    description: 'هتعرف إزاي float بيحفظ الكسور، وخطر نسيان الأقواس، والمقارنة بـ > في if/else.',
  },
};
