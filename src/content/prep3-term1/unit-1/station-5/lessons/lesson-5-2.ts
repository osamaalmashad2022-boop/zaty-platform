import type { LessonPack } from '@/types/curriculum';

export const LESSON_5_2: LessonPack = {
  id: '5.2',
  stationId: 'station-5',
  unitId: 'unit-1',
  order: 2,
  title: 'التمييز بين الأخطاء (ValueError مقابل ZeroDivisionError)',
  subtitle: 'اعرض رسالة مخصصة لنوع الخطأ بالظبط باستخدام أكثر من except',
  durationMin: 8,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تميّز بين سبب حدوث ValueError وسبب حدوث ZeroDivisionError.',
    'تستخدم أكثر من كتلة except داخل نفس كتلة try للتعامل الدقيق مع الأخطاء.',
    'تنتبه لترتيب except المحددة قبل except العامة.',
  ],
  cards: [
    {
      id: '5.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '5.2-hero',
          type: 'heroHook',
          data: {
            title: 'تخصيص رسائل الخطأ في Python',
            durationMin: 8,
            stationLabel: 'المحطة ٥ · الدرس ٢ من ٣',
            goal: 'تفرّق بين ValueError و ZeroDivisionError وتعالج كل خطأ برسالة واضحة ومخصصة.',
            hook: 'تخيل عندك برنامج بيقسم `10 / num`. المستخدم ممكن يغلط بطريقتين: إما يكتب كلمة `"abc"`، أو يكتب `0`! رسالة «غلط وخلاص» محيّرة، لكن الأحسن تقول له بالظبط غلط في إيه!',
            starterChallenge: {
              prompt:
                'في الكود `10 / int(input())` لو المستخدم كتب `' + "0" + '` — هيضرب `ValueError` ولا `ZeroDivisionError`؟',
              options: [
                {
                  id: 'sc-val',
                  text: 'ValueError',
                  isCorrect: false,
                  feedback:
                    'النص `"0"` يتحول بنجاح داخل `int("0")` إلى الرقم `0` بدون أي `ValueError`؛ المشكلة تقع في خطوة القسمة بعدها.',
                },
                {
                  id: 'sc-zero',
                  text: 'ZeroDivisionError',
                  isCorrect: true,
                  feedback:
                    'تشخيص ممتاز! `int("0")` بتنجح وتطلع `0`، وبعدين لحظة حساب `10 / 0` يظهر `ZeroDivisionError`.',
                },
                {
                  id: 'sc-ok',
                  text: 'مش هيحصل خطأ وهيطبع 0',
                  isCorrect: false,
                  feedback:
                    'القسمة على صفر غير مسموحة رياضيًا وبرمجيًا، وبتوقف البرنامج باستثناء `ZeroDivisionError`.',
                },
              ],
              revealNote:
                'لازم تميّز اللحظة اللي فشل فيها تحويل النص (`ValueError`) عن اللحظة اللي فشلت فيها القسمة على صفر (`ZeroDivisionError`).',
            },
          },
        },
      ],
    },
    {
      id: '5.2-c2',
      title: 'صنّف المدخلات: أي خطأ يظهر في 10 / int(x)؟',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '5.2-video',
          type: 'mediaPlayer',
          data: {
            kind: 'video',
            title: 'فيديو وايت بورد (١٥٢ ثانية): درع الحماية try / except والتقاط أخطاء التشغيل',
            src: '/media/video-5-2.mp4',
            vttSrc: '/media/caption-5-2.vtt',
            durationSec: 152,
            aspect: 'landscape',
            transcript:
              'شايف الدرع ده يا صاحبي؟ ده حصن try و except!\n' +
              'في البرمجة، لو سألت المستخدم عن عمره وكتبلك كلمة بدل رقم، الكود بينهار فوراً بـ ValueError! ولو قسم على صفر، ينهار بـ ZeroDivisionError!\n' +
              'مع درع try، الكود بيقول لبايثون: \'أنا هجرّب أنفّذ\'، ولو حصلت فرقعة أو خطأ في السكة، باب except بيتفتح بهدوء ويصطاد الخطأ، ويقول للمستخدم بلطافة: \'يا صديقي اكتب رقم صحيح\' من غير ما البرنامج يقفل في وشه!\n' +
              'درع الأمان اللي بيحوّل كودك من كود هش لكود محترف بيصمد ضد أي مفاجأة!',
          },
        },
        {
          id: '5.2-sort',
          type: 'sortingBuckets',
          data: {
            prompt: 'وزّع كل مدخل نصي على النتيجة التي يُنتجها عند تنفيذ `10 / int(x)`:',
            buckets: [
              {
                id: 'val',
                label: 'يرفع ValueError',
                description: 'تفشل دالة int() في تحويل المدخل لعدد صحيح',
              },
              {
                id: 'zero',
                label: 'يرفع ZeroDivisionError',
                description: 'ينجح int()، لكن القسمة على 0 مستحيلة',
              },
              {
                id: 'ok',
                label: 'ينجح بدون خطأ',
                description: 'يتحول لعدد صحيح وتتم القسمة بسلام',
              },
            ],
            items: [
              { id: 'i1', text: '`"abc"`', bucketId: 'val' },
              { id: 'i2', text: '`"0"`', bucketId: 'zero' },
              { id: 'i3', text: '`"12.5"`', bucketId: 'val' },
              { id: 'i4', text: '`"5"`', bucketId: 'ok' },
            ],
            feedback: {
              correct:
                'تصنيف خبير! `int()` ترفض الحروف مثل `"abc"` والنقطة العشرية مثل `"12.5"` (`ValueError`)، بينما `"0"` يرفع `ZeroDivisionError` و`"5"` يمر بنجاح.',
              incorrect:
                'انتبه لفخ `"12.5"`: دالة `int()` تقبل الأعداد الصحيحة فقط وترفض النقطة العشرية فتسبب `ValueError` مثل `"abc"`، أما `"0"` فيسبب `ZeroDivisionError`.',
            },
          },
        },
      ],
    },
    {
      id: '5.2-c3',
      title: 'توقّع قبل التشغيل · تتبّع السطر الذي ينهار',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '5.2-predict',
          type: 'predictOutput',
          data: {
            title: 'أين يحدث الخطأ بالضبط؟ (PRIMM)',
            prompt: 'اقرأ السطرين وتوقّع نتيجة التشغيل قبل الضغط:',
            code: 'num = int("0")\nprint(10 / num)',
            runnable: true,
            expectedOutput: 'ZeroDivisionError',
            options: [
              {
                id: 'o1',
                text: 'يطبع 0',
                isCorrect: false,
                feedback:
                  '`0 / 10` تساوي `0`، لكن القسمة على صفر في المقام (`10 / 0`) غير معرفة وترفع خطأ.',
              },
              {
                id: 'o2',
                text: 'يرفع ValueError عند int("0")',
                isCorrect: false,
                feedback:
                  'السطر الأول `int("0")` ينجح تمامًا لأن `"0"` نص يمثل عددًا صحيحًا سليمًا.',
              },
              {
                id: 'o3',
                text: 'يرفع ZeroDivisionError عند 10 / num',
                isCorrect: true,
                feedback:
                  'تحليل دقيق! مر السطر الأول بسلام (`num = 0`)، ثم انهار السطر الثاني عند القسمة على صفر.',
              },
              {
                id: 'o4',
                text: 'يطبع 10',
                isCorrect: false,
                feedback:
                  'القسمة على صفر لا تُبقي البسط كما هو، بل توقف البرنامج برسالة `ZeroDivisionError`.',
              },
            ],
            explanation:
              'تنفصل الخطوتان زمنيًا: `int("0")` سليمة وتنتج `0`، والخطأ يقع فقط لحظة تنفيذ `10 / 0`.',
          },
        },
      ],
    },
    {
      id: '5.2-c4',
      title: 'مثال الكتاب + سؤال التحقق في منتصف الدرس',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '5.2-code',
          type: 'codeView',
          data: {
            title: 'مثال ٣ من الكتاب: متعدد الاستثناءات (ص ٥٦)',
            code: 'try:\n    num = int(input("Enter a number: "))\n    result = 10 / num\n    print(result)\nexcept ValueError:\n    print("Please enter numbers only!")\nexcept ZeroDivisionError:\n    print("You cannot divide by zero!")',
            caption: 'كتلة try واحدة، ومعاها أكثر من except مخصصة لكل نوع خطأ.',
            runnable: true,
          },
        },
        {
          id: '5.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'في المثال السابق، أي كتلة `except` تحمينا تحديدًا لو كتب المستخدم `0`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٩ · تحقق وسط الدرس',
            options: [
              {
                id: 'a',
                text: 'except ValueError:',
                isCorrect: false,
                feedback:
                  '`ValueError` تعالج النصوص غير الرقمية مثل `"abc"`، أما `0` فعدد صحيح تنجح معه `int()`.',
              },
              {
                id: 'b',
                text: 'except TypeError:',
                isCorrect: false,
                feedback:
                  '`TypeError` يظهر عند خلط أنواع غير متوافقة مثل جمع نص مع رقم، وليس عند القسمة على صفر.',
              },
              {
                id: 'c',
                text: 'except ZeroDivisionError:',
                isCorrect: true,
                feedback:
                  'مضبوط! القسمة على صفر في Python ترفع `ZeroDivisionError` فتلتقطها الكتلة الثانية وتطبع الرسالة المخصصة.',
              },
              {
                id: 'd',
                text: 'except IndexError:',
                isCorrect: false,
                feedback:
                  '`IndexError` يخص تجاوز فهرس القوائم والنصوص، ولا علاقة له بالقسمة الرياضية.',
              },
            ],
            explanation:
              'عند إدخال `0` ينجح التحويل بـ `int("0")`, ثم تلتقط `except ZeroDivisionError:` خطأ القسمة `10 / 0`.',
          },
        },
      ],
    },
    {
      id: '5.2-c5',
      title: 'خلّي بالك! فخ except العامة قبل المخصصة',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '5.2-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'تنبّه لترتيب except وللقيمة "123"',
            body: '• `int("123")` **مش بتعمل** `ValueError` لأن `"123"` نص رقمي سليم يتحول إلى `123`!\n• ودايمًا `except` المخصصة لازم تيجي **قبل** `except:` العامة.',
          },
        },
        {
          id: '5.2-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد الخطأ: ترتيب except المقلوب',
            prompt:
              'المبرمج حط `except:` العامة فوق فبلعت كل الأخطاء ومنعت `except ZeroDivisionError:` تشتغل (وكمان بتعمل `SyntaxError`)! اضغط على السطر اللي في المكان الغلط:',
            codeLines: [
              'try:',
              '    print(10 / int(input("Num: ")))',
              'except:',
              '    print("General error!")',
              'except ZeroDivisionError:',
              '    print("Cannot divide by zero!")',
            ],
            lineFeedback: {
              1: 'بداية كتلة `try:` سليمة.',
              2: 'سطر التحويل والقسمة داخل `try` مكتوب صح.',
              4: 'دي رسالة التنبيه التابعة لـ `except:` العامة؛ اضغط على سطر `except:` نفسه اللي اتكتب بدري.',
              5: 'تحديد `except ZeroDivisionError:` ممتاز، لكن وجود `except:` العامة فوقه هو اللي كسر الترتيب!',
              6: 'رسالة القسمة على صفر واضحة وسليمة.',
            },
            bugLine: 3,
            fixedLine:
              'except ValueError:\n    print("Numbers only!")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept:\n    print("General error!")',
            fixExplanation:
              'وضع `except:` العامة أولًا يبتلع جميع الاستثناءات (ويسبب `SyntaxError` في Python 3)؛ القاعدة هي كتابة `except` المخصصة أولًا ثم `except:` العامة في النهاية.',
          },
        },
      ],
    },
    {
      id: '5.2-c6',
      title: 'جرّب بنفسك: حماية قاسم الـ 100',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '5.2-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'برمج قاسم الـ 100 المقاوم للأخطاء',
            prompt:
              'أكمل البرنامج ليقرأ `num` ويطبع `100 / num`؛ لو دخل نص غير رقمي يطبع `"Numbers only!"` (`ValueError`)، ولو دخل `0` يطبع `"No zero!"` (`ZeroDivisionError`).',
            starterCode:
              'try:\n    num = int(input("Enter: "))\n    print(100 / num)\n# اكتب except ValueError و except ZeroDivisionError هنا\n',
            solutionCode:
              'try:\n    num = int(input("Enter: "))\n    print(100 / num)\nexcept ValueError:\n    print("Numbers only!")\nexcept ZeroDivisionError:\n    print("No zero!")',
            checks: [
              { id: 'div-ok', label: 'الرقم 4 -> 25', stdin: ['4'], expectedOutputRegex: '25' },
              { id: 'div-val', label: 'كلمة abc -> Numbers only!', stdin: ['abc'], expectedOutputRegex: 'Numbers only' },
              { id: 'div-zero', label: 'الرقم 0 -> No zero!', stdin: ['0'], expectedOutputRegex: 'No zero' },
            ],
            quickChips: [
              'except ValueError:',
              '    print("Numbers only!")',
              'except ZeroDivisionError:',
              '    print("No zero!")',
            ],
            hint: 'أضف except ValueError: print("Numbers only!") ثم except ZeroDivisionError: print("No zero!").',
            hints: [
              'الهدف: معالجة خطأين مختلفين برسالتين مخصصتين تحت نفس كتلة try.',
              'استخدم except ValueError: للنص غير الرقمي، و except ZeroDivisionError: للصفر.',
              'اكتب except ValueError: وتحتها     print("Numbers only!") ثم except ZeroDivisionError: وتحتها     print("No zero!").',
            ],
          },
        },
      ],
    },
    {
      id: '5.2-c7',
      title: 'التحقق السريع · نقل الفهم',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '5.2-q2',
          type: 'quizQuestion',
          data: {
            question: 'أي مدخل نصي من التالي **لا** يرفع `ValueError` عند تمريره إلى `int()`، رغم أن الناس قد تظن العكس؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٩ · فخ شائع',
            options: [
              {
                id: 'a',
                text: '"hello"',
                isCorrect: false,
                feedback:
                  'الحروف مثل `"hello"` لا يمكن تحويلها لرقم صحيح فترفع `ValueError` فورًا.',
              },
              {
                id: 'b',
                text: '"12.5"',
                isCorrect: false,
                feedback:
                  'النقطة العشرية في `"12.5"` لا تقبلها `int()` مباشرة (تحتاج `float()`) فترفع `ValueError`.',
              },
              {
                id: 'c',
                text: '"123"',
                isCorrect: true,
                feedback:
                  'صح! `"123"` نص مكوّن من أرقام صحيحة فقط، فتنجح `int("123")` وتُعيد العدد `123` دون أي خطأ.',
              },
              {
                id: 'd',
                text: '"" (نص فارغ)',
                isCorrect: false,
                feedback:
                  'النص الفارغ لا يحتوي أي رقم ليتحول، لذا يرفع `ValueError` عند تمريره إلى `int()`.',
              },
            ],
            explanation:
              '`ValueError` يقع عند تمرير نص لا يمثل عددًا صحيحًا صالحًا، أما `"123"` أو `"0"` فهما نصوص رقمية صحيحة تقبلها `int()`.',
          },
        },
      ],
    },
    {
      id: '5.2-c8',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '5.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'تحديد نوع الاستثناء (`ValueError` للنصوص غير الرقمية، و`ZeroDivisionError` للقسمة على صفر) مع ترتيب المخصصة قبل `except:` العامة بيخلينا نعرض رسالة دقيقة ومفيدة للمستخدم. في الدرس الأخير من الوحدة الأولى هنتعلم حلقة إعادة المحاولة `while True + break`!',
          },
        },
      ],
    },
  ],
  summary: 'التفريق بين ValueError و ZeroDivisionError ومعالجة استثناءات متعددة في try واحدة.',
  additionalSources: [
    {
      id: 'nb-5-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'ممكن نكتب أكثر من except تحت نفس try عشان نتعامل مع كل نوع خطأ بطريقة مخصصة.',
      bullets: [
        'except ValueError: تعالج إدخال نص بدل رقم.',
        'except ZeroDivisionError: تعالج القسمة على صفر.',
        'تكتب الكتل المخصصة أولًا قبل except العامة.',
      ],
    },
    {
      id: 'nb-5-2-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-5-2-1',
          question: 'ينفع أحط أكثر من except لنفس جملة try؟',
          answer: 'أيوه، وPython بيشوف نوع الخطأ اللي حصل ويشغّل كتلة except المطابقة ليه بالظبط.',
        },
        {
          id: 'faq-5-2-2',
          question: 'لو المستخدم كتب "0" في int(input())، أنهي except هيشتغل في 10 / num؟',
          answer: 'int("0") هتنجح وتطلع 0 من غير ValueError، وبعدها في 10 / 0 هيشتغل except ZeroDivisionError!',
        },
      ],
    },
    {
      id: 'nb-5-2-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-5-2',
        label: 'تخصيص الاستثناءات',
        children: [
          { id: 'mm-5-2-val', label: 'ValueError ← int("abc")' },
          { id: 'mm-5-2-zero', label: 'ZeroDivisionError ← 10 / 0' },
          { id: 'mm-5-2-ord', label: 'الترتيب: المخصصة قبل العامة' },
        ],
      },
    },
    {
      id: 'nb-5-2-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g52-1', termAr: 'خطأ القيمة', termEn: 'ValueError', definition: 'استثناء يقع عند تمرير قيمة غير صالحة لدالة تحويل مثل int("abc").' },
        { id: 'g52-2', termAr: 'خطأ القسمة على صفر', termEn: 'ZeroDivisionError', definition: 'استثناء يقع عند محاولة قسمة أي رقم على 0.' },
      ],
    },
  ],
  sources: [
    { id: 's52-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'تخصيص رسائل ValueError و ZeroDivisionError', pages: 'ص 55–56' },
    { id: 's52-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٥.٢', detail: 'جدول الاستثناءات المتعددة وترتيب except' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '5.3',
    label: 'الدرس الجاي: حلقة التحقق وإعادة المحاولة (while True + break)',
    description: 'خلّي البرنامج يطلب الإدخال الصح تاني لحد ما المستخدم يدخّل رقم سليم!',
  },
};
