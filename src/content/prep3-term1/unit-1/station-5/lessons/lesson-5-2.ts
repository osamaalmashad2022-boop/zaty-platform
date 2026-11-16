import type { LessonPack } from '@/types/curriculum';

export const LESSON_5_2: LessonPack = {
  id: '5.2',
  stationId: 'station-5',
  unitId: 'unit-1',
  order: 2,
  title: 'التمييز بين الأخطاء (ValueError مقابل ZeroDivisionError)',
  subtitle: 'اعرض رسالة مخصصة لنوع الخطأ بالظبط باستخدام أكثر من except',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'draft',
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
      blocks: [
        {
          id: '5.2-hero',
          type: 'heroHook',
          data: {
            title: 'تخصيص رسائل الخطأ في Python',
            durationMin: 8,
            stationLabel: 'المحطة ٥ · الدرس ٢ من ٣',
            goal: 'تفرّق بين ValueError و ZeroDivisionError وتعالج كل خطأ برسالة واضحة ومخصصة.',
            hook: 'تخيل عندك برنامج بيقسم `10 / num`. المستخدم ممكن يغلط بطريقتين: إما يكتب كلمة `"abc"`، أو يكتب `0`! رسالة «غلط وخلاص» محيّرة، لكن الأفضل تقول له بالظبط غلط في إيه!',
          },
        },
      ],
    },
    {
      id: '5.2-c2',
      title: 'مثال ٣ من الكتاب: متعدد الاستثناءات',
      role: 'example',
      blocks: [
        {
          id: '5.2-table',
          type: 'tableBlock',
          data: {
            heading: 'الفرق بين أهم استثناءين في المنهج',
            headers: ['نوع الاستثناء', 'متى يحدث؟', 'مثال سبب الخطأ'],
            rows: [
              ['ValueError', 'عند فشل تحويل نص غير رقمي إلى عدد', 'int("abc") أو int("خمسة")'],
              ['ZeroDivisionError', 'عند محاولة القسمة على صفر', '10 / 0'],
            ],
          },
        },
        {
          id: '5.2-code',
          type: 'codeView',
          data: {
            title: 'مثال ٣ من الكتاب (ص ٥٦)',
            code: 'try:\n    num = int(input("Enter a number: "))\n    result = 10 / num\n    print(result)\nexcept ValueError:\n    print("Please enter numbers only!")\nexcept ZeroDivisionError:\n    print("You cannot divide by zero!")',
            caption: 'كتلة try واحدة، ومعاها أكثر من except مخصصة لكل خطأ.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '5.2-c3',
      title: 'جرّب بنفسك: حماية دالة القسمة',
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
              'اكتب برنامجًا يقرأ رقمًا صحيحًا `num` ويطبع ناتج `100 / num`؛ لو دخل نص يطبع `"Numbers only!"` (`ValueError`)، ولو دخل `0` يطبع `"No zero!"` (`ZeroDivisionError`).',
            starterCode:
              'try:\n    num = int(input("Enter: "))\n    print(100 / num)\n# اكتب except ValueError و except ZeroDivisionError هنا\n',
            solutionCode:
              'try:\n    num = int(input("Enter: "))\n    print(100 / num)\nexcept ValueError:\n    print("Numbers only!")\nexcept ZeroDivisionError:\n    print("No zero!")',
            checks: [
              { id: 'div-ok', label: 'الرقم 4 -> 25', stdin: ['4'], expectedOutputRegex: '25' },
              { id: 'div-val', label: 'كلمة abc -> Numbers only!', stdin: ['abc'], expectedOutputRegex: 'Numbers only' },
              { id: 'div-zero', label: 'الرقم 0 -> No zero!', stdin: ['0'], expectedOutputRegex: 'No zero' },
            ],
            hint: 'أضف except ValueError: print("Numbers only!") ثم except ZeroDivisionError: print("No zero!").',
          },
        },
      ],
    },
    {
      id: '5.2-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '5.2-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'تنبّه لترتيب except وللقيمة "123"',
            body: '• `int("123")` **لا يُنتج** `ValueError` لأنه نص رقمي سليم!\n• ودايمًا `except ValueError:` (المخصصة) لازم تيجي **قبل** `except:` العامة.',
          },
        },
      ],
    },
    {
      id: '5.2-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '5.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'أي من الأخطاء التالية يحدث عند القسمة على صفر؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٩',
            options: [
              { id: 'a', text: 'ValueError', isCorrect: false, feedback: 'ده لإدخال نص غير رقمي في int().' },
              { id: 'b', text: 'TypeError', isCorrect: false, feedback: 'ده لعدم توافق الأنواع.' },
              { id: 'c', text: 'ZeroDivisionError', isCorrect: true, feedback: 'إجابة صحيحة!' },
              { id: 'd', text: 'IndexError', isCorrect: false, feedback: 'ده لتجاوز فهرس القائمة.' },
            ],
            explanation: 'القسمة على صفر في Python ترفع استثناء ZeroDivisionError.',
          },
        },
      ],
    },
    {
      id: '5.2-c6',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '5.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'تحديد نوع الاستثناء (`ValueError` للنصوص غير الرقمية، و`ZeroDivisionError` للقسمة على صفر) بيخلينا نعرض رسالة دقيقة ومفيدة للمستخدم. في الدرس الأخير من الوحدة الأولى هنتعلم حلقة إعادة المحاولة `while True + break`!',
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
      title: 'ملخص سريع',
      content: 'استخدام except ValueError و except ZeroDivisionError معًا لتخصيص رسائل الخطأ.',
    },
    {
      id: 'nb-5-2-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g52-1', termAr: 'خطأ القسمة على صفر', termEn: 'ZeroDivisionError', definition: 'استثناء يقع عند محاولة قسمة أي رقم على 0.' },
      ],
    },
  ],
  sources: [
    { id: 's52-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'تخصيص رسائل ValueError و ZeroDivisionError', pages: 'ص 55–56' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '5.3',
    label: 'الدرس الجاي: حلقة التحقق وإعادة المحاولة (while True + break)',
    description: 'خلّي البرنامج يطلب الإدخال الصح تاني لحد ما المستخدم يدخّل رقم سليم!',
  },
};
