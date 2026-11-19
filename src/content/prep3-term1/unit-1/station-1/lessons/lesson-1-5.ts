import type { LessonPack } from '@/types/curriculum';

const PODCAST_1_5_TRANSCRIPT =
  'تخيل يا صاحبي إنك بتنزل تجري ٥ لفات في التراك، أو قاعد بتعد فكة الحصالة جنيه ورا التاني — بدل التكرار الممل ده كله، بايثون بتنجزك وتعمل كل ده في سطرين اتنين بس!\n' +
  'أولًا: دالة range(1, 6) دايمًا بتقف قبل الرقم الأخير، يعني بتعد ٥ لفات بس، لأن قانون اللفات السحري هو النهاية ناقص البداية (6 - 1 = 5). ولو كتبنا range(3, 3)؟ ده فخ يا معلم! نتيجته صفر لفات والحلقة مش هتشتغل من الأساس.\n' +
  'ثانيًا: بنعمل حصالة فاضية اسمها total = 0 قبل الحلقة، وجوه الحلقة بنرمي فيها الفكة بـ total += i.\n' +
  'أخيرًا حاسب من فخ المسافة البادئة (Indentation): لو print جوه الحلقة هتطبع مع كل لفة، لكن لو بره على أول السطر هتطبع المجموع النهائي مرة واحدة بس. في النهاية يا صديقي: for هي التراك بتاعك، وrange بتحدد لفاتك، والمسافة البادئة بتظبطلك إمتى تطبع النتيجة بالظبط!';

const VIDEO_1_5_TRANSCRIPT =
  'يلا بينا يا صديقي! لو مضطرين نكتب سطر كود ١٠٠ مرة، ده وجع دماغ وملل مش طبيعي، صح؟ عشان كده بايثون جابتلنا الحل السحري: حلقة for اللي بتنجز الشغل في سطرين اتنين بس، زي الجري ٥ لفات في التراك أو رمي الفكة في الحصالة جنيه ورا التاني.\n' +
  'السر كله في دالة range(1, 6): الكود بيعد ٥ لفات بس لأنها دايمًا بتقف قبل الرقم الأخير (6 - 1 = 5).\n' +
  'وجوه الحصالة بنبدأ بـ total = 0 ومع كل لفة نزود عليه i (0 ← 1 ← 3 ← 6 ← 10 ← 15).\n' +
  'وهنا يا صاحبي خد بالك من فخ المسافة البادئة (Indentation): لو print دخل جوه الحلقة بمسافة هيطبع المجموع مع كل لفة (٥ مرات)، لكن لو بره على أول السطر هيطبع الناتج النهائي مرة واحدة بس.\n' +
  'وسؤال سريع للتفكير: إيه اللي يحصل في فخ range(3, 3)؟ طالما البداية قد النهاية فالحسبة صفر لفات ومش هتشتغل ولا مرة!';

export const LESSON_1_5: LessonPack = {
  id: '1.5',
  stationId: 'station-1',
  unitId: 'unit-1',
  order: 5,
  title: 'التكرار المنظم (for / range) ونشاط الكتاب الشامل',
  subtitle: 'افهم منطق range والتجميع التراكمي وأتقن نشاط الكتاب بطريقتين',
  durationMin: 10,
  contentVersion: 4,
  access: 'free',
  status: 'ready',
  objectives: [
    'تفسّر منطق range(start, stop) (لماذا تتوقف قبل stop: عدد اللفات = stop - start).',
    'تتتبع قيم المتغير i والمجموع التراكمي total += i في كل دورة، وتفرق بين print داخل الحلقة وخارجها.',
    'تكتب وتختبر برنامج نشاط الكتاب: حساب مجموع ٣ درجات وتحديد النجاح بـ >= 50 (بالأسلوب المباشر أو بالحلقة).',
  ],
  cards: [
    {
      id: '1.5-c1',
      title: 'البداية وتحدي ١٥ ثانية',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-hero',
          type: 'heroHook',
          data: {
            title: 'التكرار الذكي بـ for و range',
            durationMin: 10,
            stationLabel: 'المحطة ١ · الدرس ٥ من ٥',
            goal: 'تتتبع حلقة for و range() بفهم حقيقي، وتكمل برنامج نشاط الكتاب الشامل لحساب النجاح ومجموع الدرجات.',
            hook: 'زي ما بتلف التراك ٥ مرات أو تعد قطع الفكة واحدة ورا التانية، حلقة `for` بتلف وتكرر عنك في سطرين بس! بس فيها بوابة توقف بتلخبط ناس كتير في أول مرة.',
            starterChallenge: {
              prompt:
                'في الحلقة `for i in range(1, 6):`، تفتكر آخر رقم بياخده المتغير `i` هيكون `5` ولا `6`؟',
              options: [
                {
                  id: 'sc-1',
                  text: '6 (لأن النهاية مكتوبة 6)',
                  isCorrect: false,
                  feedback: 'توقع طبيعي وبداية هايلة للاستكشاف! بس المفاجأة إن Python بيقف دايمًا قبل رقم النهاية بواحد، يعني 6 مش داخلة في اللفات.',
                },
                {
                  id: 'sc-2',
                  text: '5 (يتوقف قبل رقم النهاية بواحد)',
                  isCorrect: true,
                  feedback: 'صح ١٠٠٪ يا صاحبي! range(1, 6) بتلف من 1 لحد 5 بس (عدد اللفات = 6 - 1 = 5).',
                },
                {
                  id: 'sc-3',
                  text: '0 (لأن العدّ يبدأ من صفر دائمًا)',
                  isCorrect: false,
                  feedback: 'ولا يهمك، تخمين ذكي! العد يبدأ من 0 فقط لو كتبنا range(6) برقم واحد، لكن لما نكتب (1, 6) بيسمع كلامنا ويبدأ من 1.',
                },
              ],
              revealNote:
                'المهم هنا إننا بنستكشف ونتوقع سوا بدون أي قلق من الصح والغلط! شوف مسار الحلقة وبوابة التوقف والحصالة بالصورة والفيديو في البطاقة الجاية.',
            },
          },
        },
      ],
    },
    {
      id: '1.5-c2',
      title: 'النموذج البصري: مسار التكرار وبوابة التوقف',
      role: 'concept',
      blocks: [
        {
          id: '1.5-img',
          type: 'imageBlock',
          data: {
            src: '/media/lesson-1-5-loop-track.jpg',
            alt: 'روبوت يسير على مسار حلقة مضيئة ويضع العملات الذهبية في وعاء التجميع حتى بوابة التوقف',
            caption: 'في كل لفة، الروبوت يضيف القيمة لوعاء التجميع (total += i) ويقف عند بوابة النهاية.',
            aspectRatio: '16/9',
          },
        },
        {
          id: '1.5-video',
          type: 'mediaPlayer',
          data: {
            kind: 'video',
            title: 'فيديو بصري (١٠٨ ثوانٍ): حلقات for والحصالة وفخ المسافة البادئة',
            src: '/media/video-1-5.mp4',
            vttSrc: '/media/caption-1-5.vtt',
            durationSec: 108,
            transcript: VIDEO_1_5_TRANSCRIPT,
          },
        },
      ],
    },
    {
      id: '1.5-c3',
      title: 'توقّع المخرجات: أثر المسافة البادئة لـ print',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-predict',
          type: 'predictOutput',
          data: {
            title: 'PRIMM: توقّع قبل التشغيل',
            prompt: 'بص على المسافة البادئة قبل `print(total)` في السطر ٤ — الكود ده هيطبع إيه بالظبط؟',
            code: 'total = 0\nfor i in range(1, 4):\n    total += i\n    print(total)',
            runnable: true,
            expectedOutput: '1\n3\n6',
            options: [
              {
                id: 'po-1',
                text: '6 مرة واحدة فقط في الآخر',
                isCorrect: false,
                feedback: 'ده كان هيحصل لو print(total) في أول السطر بره الحلقة؛ هنا هي مزاحة ٤ مسافات وجوه الحلقة!',
              },
              {
                id: 'po-2',
                text: '1 ثم 3 ثم 6 (في ٣ أسطر)',
                isCorrect: true,
                feedback: 'عاش! لأن print جوه الحلقة بتشتغل في نهاية كل لفة: 0+1=1، ثم 1+2=3، ثم 3+3=6.',
              },
              {
                id: 'po-3',
                text: '1 ثم 2 ثم 3',
                isCorrect: false,
                feedback: 'الأمر يطبع المجموع المتراكم total مش العداد i.',
              },
              {
                id: 'po-4',
                text: '0 ثم 1 ثم 3',
                isCorrect: false,
                feedback: 'الطباعة بتيجي بعد total += i مش قبلها.',
              },
            ],
            explanation: 'أي أمر مزاح ٤ مسافات تحت for يتكرر مع كل لفة؛ وعشان تطبع المجموع النهائي فقط بتطلّع print بره لأول السطر.',
          },
        },
      ],
    },
    {
      id: '1.5-c4',
      title: 'مثال ٥ من الكتاب + تتبع الذاكرة المختصر',
      role: 'example',
      blocks: [
        {
          id: '1.5-loop-code',
          type: 'codeView',
          data: {
            title: 'مثال ٥ من الكتاب (ص ١١–١٢): مجموع ١ إلى ٥',
            code: 'total = 0\nfor i in range(1, 6):\n    total += i\nprint("Sum =", total)',
            caption: 'شغّل الكود ولاحظ إن print("Sum =", total) في أول السطر بره الحلقة، فتطبع 15 مرة واحدة في الآخر.',
            runnable: true,
          },
        },
        {
          id: '1.5-trace-stepper',
          type: 'processStepper',
          data: {
            heading: 'تتبع الذاكرة في ٣ مراحل مركّزة',
            steps: [
              { id: 'lp-0', title: '١. التهيئة قبل الحلقة', detail: 'تصفير المخزن `total = 0` لتجهيزه قبل أي إضافة.' },
              { id: 'lp-mid', title: '٢. اللفات ١ ← ٥', detail: 'يتراكم `total` في الذاكرة تدريجيًا: `1 ← 3 ← 6 ← 10 ← 15`.' },
              { id: 'lp-end', title: '٣. التوقف والطباعة', detail: 'تقف الحلقة قبل `6`، ويطبع السطر الخارجي `Sum = 15` مرة واحدة.' },
            ],
          },
        },
      ],
    },
    {
      id: '1.5-c5',
      title: 'قانونا range و +=',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-why-flips',
          type: 'flipCards',
          data: {
            heading: 'اقلب البطاقتين لتتنبأ بأي حلقة جديدة فورًا',
            instruction: 'اضغط على البطاقتين واكتشف الصيغة العامة لعدد اللفات:',
            cards: [
              {
                id: 'why-range',
                frontLabel: 'قانون ١',
                frontTitle: 'إزاي تحسب عدد لفات `range(start, stop)` في ثانية؟',
                frontHint: 'جرّبها على `range(10, 14)`…',
                backTitle: 'النهاية - البداية = عدد اللفات',
                backBody: 'عدد التكرارات دائمًا = **`stop - start`**؛ وآخر قيمة يأخذها العداد هي `stop - 1`.',
                backExample: 'range(10, 14) تلف 14 - 10 = 4 مرات بالقيم (10, 11, 12, 13) بدون 14.',
              },
              {
                id: 'why-short',
                frontLabel: 'قانون ٢',
                frontTitle: 'يعني إيه `range(3)` برقم واحد و `total += x`؟',
                frontHint: 'هنستخدمهم حالًا في نشاط الدرجات…',
                backTitle: 'العدّ من 0 · والتراكم المختصر',
                backBody: '`range(3)` تبدأ تلقائيًا من `0` فتلف 3 مرات (`0, 1, 2`)؛ و `total += x` اختصار لـ `total = total + x`.',
                code: 'for i in range(3):  # 3 لفات: 0, 1, 2\n    total += grade',
              },
            ],
          },
        },
      ],
    },
    {
      id: '1.5-c6',
      title: 'نقطة تحقق سريعة: تتبع range جديدة',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-q2',
          type: 'quizQuestion',
          data: {
            question: 'كم مرة ستتكرر الحلقة `for i in range(3, 8):`؟ وما آخر قيمة يأخذها `i`؟',
            multiple: false,
            scored: false,
            sourceTag: 'مرتبط بالكتاب · ص ١٥',
            options: [
              {
                id: 'a',
                text: '6 مرات، وآخر قيمة هي 8',
                isCorrect: false,
                feedback: 'الحد الأعلى 8 لا يدخل في الحلقة أبدًا، و 8 - 3 = 5 وليس 6.',
              },
              {
                id: 'b',
                text: '5 مرات، وآخر قيمة هي 7',
                isCorrect: true,
                feedback: 'ممتاز! عدد اللفات = 8 - 3 = 5 مرات بالقيم (3, 4, 5, 6, 7).',
              },
              {
                id: 'c',
                text: '4 مرات، وآخر قيمة هي 7',
                isCorrect: false,
                feedback: 'آخر قيمة 7 صح، لكن احسبها بالعدد: 3، 4، 5، 6، 7 = 5 أرقام مش 4.',
              },
              {
                id: 'd',
                text: '5 مرات، وآخر قيمة هي 8',
                isCorrect: false,
                feedback: 'عدد اللفات 5 صح، لكن الحلقة تقف قبل 8 مباشرة فتكون آخر قيمة 7.',
              },
            ],
            explanation: 'عدد التكرارات دائمًا = النهاية - البداية (8 - 3 = 5)، وآخر قيمة هي النهاية - 1 (أي 7).',
          },
        },
      ],
    },
    {
      id: '1.5-c7',
      title: 'اكشف سبب خطأ NameError في الحلقة',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-spotbug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد خطأ NameError',
            prompt: 'مبرمج كتب حلقة جمع الأرقام ونسي خطوة مهمة، فبايثون توقف بـ `NameError`! اضغط على السطر اللي حصل عنده الخلل:',
            codeLines: [
              'for i in range(1, 6):',
              '    total += i',
              'print("Sum =", total)',
            ],
            lineFeedback: {
              1: 'رأس الحلقة range(1, 6) سليم، لكن لاحظ إيه اللي ناقص قبل السطر اللي بيجمع جواها!',
              3: 'سطر الطباعة في النهاية سليم، بس الخلل بدأ أول ما بايثون حاول يجمع على متغير مش متعرف.',
            },
            bugLine: 2,
            fixedLine: 'total = 0\nfor i in range(1, 6):\n    total += i',
            fixExplanation: 'في السطر 2 بنفّذ total += i بدون ما نعرف total = 0 قبل الحلقة، وده يرفع NameError فورًا.',
          },
        },
      ],
    },
    {
      id: '1.5-c8',
      title: 'أكمل حلقة الجمع من ١ إلى ١٠',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-fill-loop',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل سطر التجميع جوه for',
            prompt:
              'استبدل `___` في السطر ٣ بالمتغير اللي بيتغير من 1 لـ 10 في كل لفة علشان نطبع المجموع 55، ثم اضغط «تحقق من الحل».',
            starterCode:
              'total = 0\nfor i in range(1, 11):\n    total += ___\nprint("Sum =", total)',
            solutionCode:
              'total = 0\nfor i in range(1, 11):\n    total += i\nprint("Sum =", total)',
            quickChips: ['i', '1', '10', 'total'],
            checks: [
              { id: 'sum10', label: 'مجموع الأعداد من ١ إلى ١٠ = 55', stdin: [], expectedOutputRegex: '55' },
            ],
            hint: 'اكتب المتغير i مكان ___ عشان السطر يبقى total += i.',
            hints: [
              'الهدف: أضف القيمة الحالية في كل لفة للمخزن total علشان توصل في الآخر لـ 55.',
              'المبدأ: المتغير الموجود بعد كلمة for هو اللي بياخد القيم 1، 2، 3... لحد 10 أوتوماتيك.',
              'الخطوة: استبدل ___ بالمتغير i.',
            ],
          },
        },
      ],
    },
    {
      id: '1.5-c9',
      title: 'بودكاست + ٣ أخطاء تكسر الحلقة',
      role: 'warning',
      blocks: [
        {
          id: '1.5-podcast',
          type: 'mediaPlayer',
          data: {
            kind: 'audio',
            title: 'بودكاست ٨٣ ثانية: أسرار for و range وفخ المسافة البادئة',
            src: '/media/podcast-1-5.mp3',
            durationSec: 83,
            transcript: PODCAST_1_5_TRANSCRIPT,
          },
        },
        {
          id: '1.5-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'راجع الـ ٣ نقاط دول قبل أي كود تكرار',
            body: '١. صفّر المخزن (`total = 0`) قبل `for` لتفادي `NameError`.\n٢. النهاية في `range(a, b)` غير داخلة — تقف عند `b - 1`.\n٣. طلّع `print(total)` لأول السطر إذا أردت الطباعة مرة واحدة في النهاية.',
          },
        },
      ],
    },
    {
      id: '1.5-c10',
      title: 'قارن طريقتي حل نشاط الكتاب (ص ١٢)',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-tabs-cap',
          type: 'comparisonTabs',
          data: {
            heading: 'نشاط الكتاب: حساب متوسط ٣ درجات وتحديد النجاح',
            instruction: 'قارن بين الطريقة المباشرة والطريقة التراكمية بحلقة for:',
            tabs: [
              {
                id: 'cap-direct',
                label: '١. الطريقة المباشرة (٣ متغيرات)',
                badge: 'لـ ٣ درجات فقط',
                tone: 'neutral',
                body: 'بتستخدم مهارات `1.3` و `1.4`: قراءة ٣ درجات بـ `float(input())` ثم حساب المتوسط بالأقواس.',
                code: 'a = float(input())\nb = float(input())\nc = float(input())\navg = (a + b + c) / 3',
              },
              {
                id: 'cap-loop',
                label: '٢. الطريقة التراكمية (بحلقة for)',
                badge: 'تصلح لأي عدد!',
                tone: 'emerald',
                body: 'حلقة `for i in range(3):` تقرأ ٣ درجات وتجمعهم في `total += g`، ولو عايز ٣٠ مادة تغير `3` بس!',
                code: 'total = 0\nfor i in range(3):\n    g = float(input("Grade: "))\n    total += g\navg = total / 3',
              },
            ],
          },
        },
      ],
    },
    {
      id: '1.5-c11',
      title: 'تحدي ختام المحطة ١: برنامج حساب الدرجات والنجاح',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-cap-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'أكمل برنامج نشاط الكتاب (٣ درجات والنجاح >= 50)',
            prompt:
              'الحلقة بتقرأ ٣ درجات وتجمعها في `total`. أضف حساب `avg = total / 3` ثم اختبر `avg >= 50` لطباعة `"Pass"` أو `"Fail"`.',
            starterCode:
              'total = 0\nfor i in range(3):\n    grade = float(input("Grade: "))\n    total += grade\n# احسب avg واختبر الشرط بالأسفل\n',
            solutionCode:
              'total = 0\nfor i in range(3):\n    grade = float(input("Grade: "))\n    total += grade\navg = total / 3\nif avg >= 50:\n    print("Pass")\nelse:\n    print("Fail")',
            quickChips: [
              'avg = total / 3',
              'if avg >= 50:',
              '    print("Pass")',
              'else:',
              '    print("Fail")',
              'if avg > 50:',
            ],
            checks: [
              { id: 'cap-pass', label: 'درجات 60, 70, 50 -> Pass', stdin: ['60', '70', '50'], expectedOutputRegex: '(Pass|ناجح)' },
              { id: 'cap-border', label: 'درجات 50, 50, 50 (الحد الفاصل) -> Pass', stdin: ['50', '50', '50'], expectedOutputRegex: '(Pass|ناجح)' },
              { id: 'cap-fail', label: 'درجات 30, 40, 20 -> Fail', stdin: ['30', '40', '20'], expectedOutputRegex: '(Fail|غير ناجح|راسب)' },
            ],
            hint: 'بعد الحلقة (بدون مسافة بادئة) اكتب avg = total / 3 ثم if avg >= 50: print("Pass") else: print("Fail").',
            hints: [
              'الهدف: احسب المتوسط خارج الحلقة، وقرّر هل النتيجة ناجح (50 فأكثر) أم راسب.',
              'المبدأ: سطر avg لازم يرجع لأول السطر (بدون مسافة بادئة)، والنجاح يشمل 50 بالضبط فنستخدم >= مش >.',
              'الخطوة: أضف avg = total / 3 ثم if avg >= 50: print("Pass") else: print("Fail").',
            ],
          },
        },
      ],
    },
    {
      id: '1.5-c12',
      title: 'تحدّي النقل (من خارج الكتاب)',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '1.5-q3',
          type: 'quizQuestion',
          data: {
            question: 'ماذا سيطبع الكود التالي بالضبط عند تشغيله في Python؟',
            code: 'total = 0\nfor i in range(2, 5):\n    total += i\n    print(total)',
            multiple: false,
            scored: false,
            sourceTag: 'فهم من خارج الكتاب',
            options: [
              {
                id: 'a',
                text: 'يطبع 9 مرة واحدة فقط',
                isCorrect: false,
                feedback: 'ده كان هيحصل لو كانت print(total) في أول السطر بره الحلقة.',
              },
              {
                id: 'b',
                text: 'يطبع 2 ثم 5 ثم 9 (في ٣ أسطر)',
                isCorrect: true,
                feedback: 'عاش! range(2, 5) تاخد 2 و 3 و 4، ولأن print جوه الحلقة تطبع التراكم بعد كل لفة: 2، 5، 9.',
              },
              {
                id: 'c',
                text: 'يطبع 2 ثم 3 ثم 4',
                isCorrect: false,
                feedback: 'الأمر يطبع المجموع التراكمي total (بعد كل جمع)، مش قيمة العداد i.',
              },
              {
                id: 'd',
                text: 'يطبع 2 ثم 5 ثم 9 ثم 14',
                isCorrect: false,
                feedback: 'الرقم 5 هو حد التوقف غير المشمول في range(2, 5)، فتقف الحلقة عند 4.',
              },
            ],
            explanation: 'تأخذ i القيم 2 ثم 3 ثم 4، وبما أن print(total) مزاحة ٤ مسافات فتطبع 2 ثم 5 ثم 9.',
          },
        },
      ],
    },
    {
      id: '1.5-c13',
      title: 'ختام المحطة الأولى والخطوة الجاية',
      role: 'summary',
      blocks: [
        {
          id: '1.5-sum',
          type: 'richText',
          data: {
            heading: 'مبروك! خلّصت دروس المحطة الأولى كلها',
            calloutStyle: 'summary',
            body: 'دلوقتي بقيت بتجمع بين **التفكير الحاسوبي** و**خطوات الحل الخمس** وبين **أدوات Python العملية** (`input` و `int` و `float` و `if/else` و `for/range` و `+=`)، وبتعرف تصطاد الأخطاء وتحلل أي كود من خارج الكتاب! خطوتك الجاية هي اختبار المحطة الأولى في أسئلة الكتاب الـ ٤٠.',
          },
        },
        {
          id: '1.5-infographic',
          type: 'imageBlock',
          data: {
            src: '/media/infographic-1-5.png',
            alt: 'إنفوجرافيك إتقان حلقة for و range والتجميع التراكمي ونشاط ٣ درجات',
            caption: 'إنفوجرافيك المراجعة (NotebookLM): تتبع range(1, 6)، وقانون اللفات b - a، وفخ range(3, 3) والمسافة البادئة.',
          },
        },
      ],
    },
  ],
  summary:
    'أتقنّا منطق range(start, stop) وتجميع total += i وتأثير المسافة البادئة، وربطنا مهارات المحطة كلها في نشاط تقييم النجاح الشامل.',
  additionalSources: [
    {
      id: 'nb-1-5-audio',
      type: 'audio',
      title: 'ملخص صوتي (بودكاست ٨٣ ثانية)',
      src: '/media/podcast-1-5.mp3',
      durationSec: 83,
      transcript: PODCAST_1_5_TRANSCRIPT,
      notes: [
        'عدد دورات range(start, stop) يساوي stop - start.',
        'المسافة البادئة تحدد هل print تتكرر في كل لفة أم تعمل مرة واحدة في النهاية.',
      ],
    },
    {
      id: 'nb-1-5-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content:
        'الحلقة التكرارية for توفر كتابة أسطر متكررة، ويمكن توظيفها لحساب مجموع أعداد أو لقراءة درجات متعددة وحساب متوسطها.',
      bullets: [
        'range(a, b) تولّد من a إلى b - 1 (بعدد b - a لفة).',
        'total += i هو نفسه total = total + i.',
        'ضع print() خارج المسافة البادئة إذا أردت طباعة النتيجة النهائية فقط.',
      ],
    },
    {
      id: 'nb-1-5-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-1-5-1',
          question: 'ليه total = 0 في البداية مهم؟',
          answer: 'عشان نجهّز مكان في الذاكرة بقيمة صفر نبدأ نجمع عليه؛ لو ما عرفناش total الأول هيحصل NameError.',
        },
        {
          id: 'faq-1-5-2',
          question: 'إزاي أحسب مجموع الأعداد من ١ إلى ١٠٠؟',
          answer: 'بنفس الحلقة مع تغيير الحد الأعلى إلى 101: for i in range(1, 101):.',
        },
      ],
    },
    {
      id: 'nb-1-5-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-1-5',
        label: 'التكرار المنظم for / range ونشاط الكتاب',
        children: [
          {
            id: 'mm-1-5-ex5',
            label: 'مثال مجموع الأعداد (١ إلى ٥)',
            children: [
              { id: 'mm-1-5-t1', label: 'تهيئة الوعاء: total = 0 (تمنع خطأ NameError)' },
              { id: 'mm-1-5-for', label: 'الحلقة: for i in range(1, 6):' },
              { id: 'mm-1-5-acc', label: 'التجميع التراكمي: total += i (الناتج ١٥)' },
            ],
          },
          {
            id: 'mm-1-5-rules',
            label: 'قواعد وفخاخ range والمسافة البادئة',
            children: [
              { id: 'mm-1-5-r1', label: 'نطاق range(a, b) نصف مفتوح: يشمل a ويقف قبل b' },
              { id: 'mm-1-5-r2', label: 'قانون عدد اللفات: b - a (مثلاً range(3, 3) = ٠ لفات)' },
              { id: 'mm-1-5-ind', label: 'print داخل الحلقة (تتكرر) vs خارج الحلقة (مرة واحدة في الآخر)' },
            ],
          },
          {
            id: 'mm-1-5-cap',
            label: 'نشاط الكتاب الشامل (ص ١٢)',
            children: [
              { id: 'mm-1-5-c1', label: 'قراءة ٣ درجات وجمعها بالحلقة' },
              { id: 'mm-1-5-c2', label: 'حساب avg = total / 3 ثم اختبار النجاح avg >= 50' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-1-5-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        {
          id: 'gl-1-5-1',
          termAr: 'حلقة التكرار المحددة',
          termEn: 'for Loop',
          definition: 'حلقة برمجية تكرّر تنفيذ مجموعة أوامر لعدد محدد من المرات.',
        },
        {
          id: 'gl-1-5-2',
          termAr: 'نطاق الأعداد',
          termEn: 'range(start, stop)',
          definition: 'دالة تولّد تسلسل أعداد يبدأ من start وينتهي قبل stop مباشرة.',
        },
        {
          id: 'gl-1-5-3',
          termAr: 'المعامل التراكمي',
          termEn: '+= Operator',
          definition: 'مختصر برمجي يجمع قيمة جديدة على قيمة المتغير الحالية ويحفظ الناتج فيه.',
        },
        {
          id: 'gl-1-5-4',
          termAr: 'خطأ عدم تعريف المتغير',
          termEn: 'NameError',
          definition: 'خطأ برمجي يظهر عند محاولة الإضافة على متغير مثل total قبل تهيئته بقيمة أولية (total = 0).',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'src-1-5-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي',
      detail: 'المثال الخامس (مجموع ١–٥) ونشاط التطبيق العملي الشامل (٣ درجات)',
      pages: 'ص 11–12',
    },
    {
      id: 'src-1-5-nb',
      kind: 'notebooklm',
      label: 'ملخصات ووسائط الدرس ١.٥',
      detail: 'رسمة مسار التكرار + فيديو + بودكاست + إنفوجرافيك وخريطة ذهنية ودليل المراجعة',
    },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-1',
    label: 'ابدأ اختبار المحطة الأولى',
    description: 'اختبر نفسك في أسئلة الكتاب الرسمية للمحطة ١ (اختبار سريع أو كل الـ ٤٠ سؤال).',
  },
};
