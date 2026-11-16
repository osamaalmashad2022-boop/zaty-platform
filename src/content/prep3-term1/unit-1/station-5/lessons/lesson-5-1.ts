import type { LessonPack } from '@/types/curriculum';

export const LESSON_5_1: LessonPack = {
  id: '5.1',
  stationId: 'station-5',
  unitId: 'unit-1',
  order: 1,
  title: 'لماذا تنهار البرامج؟ مقدمة صيد الأخطاء (try / except)',
  subtitle: 'احمِ برنامجك من التوقف المفاجئ لما المستخدم يكتب بيانات غلط',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'draft',
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
      blocks: [
        {
          id: '5.1-hero',
          type: 'heroHook',
          data: {
            title: 'درع الحماية: try و except',
            durationMin: 8,
            stationLabel: 'المحطة ٥ · الدرس ١ من ٣',
            goal: 'تحمي برنامجك من الانهيار المفاجئ عند إدخال بيانات خاطئة باستخدام try و except.',
            hook: 'سألت المستخدم: «أدخل عمرك»، فكتبلك `"ahmed"` بدل `15`! من غير حماية البرنامج هيقفل فجأة في وشه — لكن بـ `try / except` تقدر تمسك الخطأ وتطلعله رسالة لطيفة.',
            image: '/media/robot-shield.png',
          },
        },
      ],
    },
    {
      id: '5.1-c2',
      title: 'مثال ١ من الكتاب: حماية إدخال العمر',
      role: 'example',
      blocks: [
        {
          id: '5.1-text',
          type: 'richText',
          data: {
            heading: 'كيف تعمل try و except؟',
            body: '• **`try:`** جرّب تنفيذ الكود اللي جواها (واللي ممكن يحصل فيه خطأ).\n• **`except:`** لو حصل خطأ جوه `try`، البرنامج مش هيقف! هينط مباشرة لـ `except` وينفذ الرسالة أو الحل البديل.\n• أما لو ما حصلش خطأ في `try`، بايثون هيتجاهل `except` تمامًا.',
          },
        },
        {
          id: '5.1-code',
          type: 'codeView',
          data: {
            title: 'مثال ١ من الكتاب (ص ٥٥)',
            code: 'try:\n    age = int(input("Enter your age: "))\n    print("Next year you will be:", age + 1)\nexcept:\n    print("Please enter a valid number!")',
            caption: 'الرسالة جوه except بتظهر للمستخدم بدل رسالة الخطأ الافتراضية.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '5.1-c3',
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
            prompt: 'السطر الأخير جوه `except:` ناقص! اكتب `print("Please enter a valid number!")` ثم اختبر الإدخال الصحيح والنصي.',
            starterCode:
              'try:\n    age = int(input("Enter your age: "))\n    print("Next year:", age + 1)\nexcept:\n    # اطبع رسالة الخطأ هنا\n',
            solutionCode:
              'try:\n    age = int(input("Enter your age: "))\n    print("Next year:", age + 1)\nexcept:\n    print("Please enter a valid number!")',
            checks: [
              { id: 'age-ok', label: 'إدخال 14 -> Next year: 15', stdin: ['14'], expectedOutputRegex: '15' },
              { id: 'age-err', label: 'إدخال ahmed -> رسالة الخطأ بدون توقف', stdin: ['ahmed'], expectedOutputRegex: 'Please enter a valid number' },
            ],
            hint: 'لا تنسَ المسافة البادئة (4 مسافات) تحت except:.',
          },
        },
      ],
    },
    {
      id: '5.1-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '5.1-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'لا تكتب try بدون except!',
            body: 'في بايثون مينفعش تكتب `try:` لوحدها من غير `except:` (أو `finally:`). ولازم كمان تتأكد من المسافات البادئة والنقطتين `:` بعد الاتنين.',
          },
        },
      ],
    },
    {
      id: '5.1-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '5.1-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما الهدف الرئيسي من استخدام try و except؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٨',
            options: [
              { id: 'a', text: 'تسريع تنفيذ البرنامج', isCorrect: false, feedback: 'مش عشان السرعة.' },
              { id: 'b', text: 'منع توقف البرنامج عند حدوث خطأ وإعطاء رسالة مناسبة', isCorrect: true, feedback: 'إجابة صحيحة!' },
              { id: 'c', text: 'إنشاء متغيرات جديدة', isCorrect: false, feedback: 'غير صحيح.' },
              { id: 'd', text: 'تكرار الكود عدة مرات', isCorrect: false, feedback: 'ده دور الحلقات.' },
            ],
            explanation: 'try و except تمنعان توقف البرنامج عند الخطأ وتعرضان رسالة واضحة.',
          },
        },
      ],
    },
    {
      id: '5.1-c6',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '5.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: '`try` بتجرّب الكود اللي ممكن يسبب خطأ، و`except` بتستلم أي خطأ وتنفّذ رسالة مناسبة بدل انهيار البرنامج. في الدرس الجاي هنفرّق بدقة بين خطأين مهمين: `ValueError` و `ZeroDivisionError`!',
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
      title: 'ملخص سريع',
      content: 'try تضع فيها الكود المعرض للخطأ، وexcept تنفذ فقط إذا وقع خطأ داخل try.',
    },
    {
      id: 'nb-5-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g51-1', termAr: 'معالجة الاستثناءات', termEn: 'try / except', definition: 'بنية برمجية لالتقاط الأخطاء وقت التشغيل ومعالجتها بدون توقف البرنامج.' },
      ],
    },
  ],
  sources: [
    { id: 's51-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'مقدمة try و except', pages: 'ص 53–55' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '5.2',
    label: 'الدرس الجاي: ValueError مقابل ZeroDivisionError',
    description: 'اعرف إزاي تكتب رسالة مخصصة لكل نوع خطأ.',
  },
};
