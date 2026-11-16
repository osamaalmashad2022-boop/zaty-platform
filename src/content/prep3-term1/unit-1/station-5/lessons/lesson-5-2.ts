import type { LessonPack } from '@/types/curriculum';

export const LESSON_5_2: LessonPack = {
  id: '5.2',
  stationId: 'station-5',
  unitId: 'unit-1',
  order: 2,
  title: 'التمييز بين الأخطاء (ValueError مقابل ZeroDivisionError)',
  subtitle: 'اعرض رسالة مخصصة لنوع الخطأ بالظبط باستخدام أكثر من except',
  durationMin: 8,
  contentVersion: 2,
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
            heading: 'الفرق بين أهم استثناءين في المنهج (ص ٥٥–٥٦)',
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
            caption: 'كتلة try واحدة، ومعاها أكثر من except مخصصة لكل نوع خطأ.',
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
            body: '• `int("123")` **مش بتعمل** `ValueError` لأن `"123"` نص رقمي سليم يتحول إلى `123`!\n• ودايمًا `except ValueError:` (المخصصة) لازم تيجي **قبل** `except:` العامة.',
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
        {
          id: '5.2-q2',
          type: 'quizQuestion',
          data: {
            question: 'متى يحدث خطأ `ValueError` في برنامج يقرأ مدخلات المستخدم؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٩',
            options: [
              { id: 'a', text: 'عند إدخال الرقم 0 في عملية قسمة', isCorrect: false, feedback: 'ده بيسبب ZeroDivisionError.' },
              { id: 'b', text: 'عند محاولة تحويل نص غير رقمي مثل "hello" باستخدام int()', isCorrect: true, feedback: 'صح! int() لا تقبل الحروف غير الرقمية وترفع ValueError.' },
              { id: 'c', text: 'عند استخدام دالة print() للطباعة', isCorrect: false, feedback: 'print() لا ترفع ValueError.' },
              { id: 'd', text: 'عند تحويل "123" إلى int("123")', isCorrect: false, feedback: '"123" نص رقمي سليم ويتحول بنجاح.' },
            ],
            explanation: 'ValueError يحدث عندما يكون نوع البيانات نصًا لكنه لا يمثل رقمًا صالحًا للتحويل.',
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
