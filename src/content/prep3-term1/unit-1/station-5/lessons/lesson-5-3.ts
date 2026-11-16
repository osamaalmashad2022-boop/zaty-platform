import type { LessonPack } from '@/types/curriculum';

export const LESSON_5_3: LessonPack = {
  id: '5.3',
  stationId: 'station-5',
  unitId: 'unit-1',
  order: 3,
  title: 'نمط التحقق وإعادة الإدخال اللانهائي (while True + break)',
  subtitle: 'اسمح للمستخدم يعيد المحاولة لحد ما يكتب قيمة سليمة، واحمِ الدوال بـ try/except',
  durationMin: 9,
  contentVersion: 1,
  access: 'free',
  status: 'draft',
  objectives: [
    'تبني حلقة التحقق وإعادة المحاولة باستخدام while True مع try / except و break.',
    'تدمج معالجة الأخطاء داخل الدوال لجعل البرامج احترافية ومقاومة للانهيار.',
    'تراجع نقاط الوحدة الأولى الخمس عبر قائمة تحقق تفاعلية قبل الامتحان.',
  ],
  cards: [
    {
      id: '5.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '5.3-hero',
          type: 'heroHook',
          data: {
            title: 'حلقة إعادة المحاولة المقاومة للأخطاء',
            durationMin: 9,
            stationLabel: 'المحطة ٥ · الدرس ٣ من ٣',
            goal: 'تجمع while True و try/except و break علشان البرنامج يطلب الإدخال لحد ما يبقى صحيح.',
            hook: 'أحسن برنامج مش اللي يطبع «غلط» ويقفل — أحسن برنامج هو اللي يقول للمستخدم «حاول تاني» ويستناه يكتب الرقم الصح وبعدين يكمل!',
          },
        },
      ],
    },
    {
      id: '5.3-c2',
      title: 'مثال ٤ من الكتاب: while True + try / except + break',
      role: 'example',
      blocks: [
        {
          id: '5.3-code',
          type: 'codeView',
          data: {
            title: 'نمط إعادة المحاولة من الكتاب (ص ٥٦–٥٧)',
            code: 'while True:\n    try:\n        num = int(input("Enter a number: "))\n        print("You entered:", num)\n        break\n    except:\n        print("Invalid input! Try again.")',
            caption: 'الحلقة تستمر في طلب الإدخال ولا تتوقف إلا عند نجاح التحويل ووصول التنفيذ إلى break.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '5.3-c3',
      title: 'جرّب بنفسك: برنامج العمر مع إعادة المحاولة',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '5.3-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'ابني حلقة إعادة المحاولة للعمر',
            prompt:
              'اكتب برنامجًا يطلب عمر المستخدم داخل حلقة `while True` مع `try / except`، وإذا كتب نصًا يطبع `"Try again!"`، وإذا كتب رقمًا صحيحًا يطبع `"Your age is:"` مع العمر ويخرج بـ `break`.',
            starterCode:
              'while True:\n    try:\n        age = int(input("Enter your age: "))\n        # اطبع العمر واخرج بـ break هنا\n    except:\n        print("Try again!")',
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
            hint: 'جوه try بعد قراءة age اكتب print("Your age is:", age) وبعدها break.',
          },
        },
      ],
    },
    {
      id: '5.3-c4',
      title: 'خلّي بالك! + قائمة مراجعة الوحدة الأولى',
      role: 'warning',
      blocks: [
        {
          id: '5.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'لا تنسَ break جوه try!',
            body: 'لو كتبت `while True:` ونسيت `break` بعد نجاح الإدخال، الحلقة هتفضل تلف للأبد! وكمان تقدر تحط `try / except` جوه الدوال (`Functions`) لتصبح أكثر احترافية.',
          },
        },
        {
          id: '5.3-checklist',
          type: 'listBlock',
          data: {
            heading: 'قائمة المراجعة قبل اختبار الوحدة الأولى (Export C ص ١٣)',
            mode: 'checkbox',
            items: [
              { id: 'chk1', text: 'أعد حل الأمثلة المستقلة بنفسك دون النظر إلى النموذج' },
              { id: 'chk2', text: 'راجع جدول خطوات حل المشكلة مقابل مهارات التفكير الحاسوبي' },
              { id: 'chk3', text: 'تتبّع قيمة i والمجموع في حلقة for على ورقة خارجية' },
              { id: 'chk4', text: 'راجع جدول أشكال خريطة التدفق والفرق بين التقليدية والذكاء الاصطناعي' },
            ],
          },
        },
      ],
    },
    {
      id: '5.3-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '5.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما النتيجة المتوقعة لكود `while True` مع `try / except` إذا أدخل المستخدم `"hello"` ثم `"5"`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٦١',
            options: [
              { id: 'a', text: 'You entered: hello ثم يتوقف', isCorrect: false, feedback: 'hello ترفع ValueError.' },
              { id: 'b', text: 'Invalid! Try again. ثم يتوقف فورًا', isCorrect: false, feedback: 'الحلقة تعيد الطلب بعد except.' },
              { id: 'c', text: 'يطبع Invalid! Try again. ثم عند إدخال 5 يطبع You entered: 5 ويتوقف', isCorrect: true, feedback: 'إجابة صحيحة!' },
              { id: 'd', text: 'يتوقف فورًا عند أول خطأ', isCorrect: false, feedback: 'try / except تمنع التوقف.' },
            ],
            explanation: 'تتكرر الحلقة بعد الخطأ الأول، وعند إدخال 5 الصحيح ينجح try وتخرج break من الحلقة.',
          },
        },
      ],
    },
    {
      id: '5.3-c6',
      title: 'ختام الوحدة الأولى!',
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
      ],
    },
  ],
  summary: 'بناء حلقة التحقق وإعادة المحاولة (while True + try/except + break) واستخدامها داخل الدوال.',
  additionalSources: [
    {
      id: 'nb-5-3-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content: 'دمج while True مع try/except و break لضمان إدخال سليم، وإمكانية وضعها داخل الدوال.',
    },
    {
      id: 'nb-5-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g53-1', termAr: 'حلقة التحقق وإعادة المحاولة', termEn: 'Validation Retry Loop', definition: 'استخدام while True مع try/except و break لإعادة طلب الإدخال حتى يصبح صحيحًا.' },
      ],
    },
  ],
  sources: [
    { id: 's53-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'حلقة while True ومعالجة الأخطاء داخل الدوال', pages: 'ص 56–57' },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-5',
    label: 'ابدأ اختبار المحطة الخامسة',
    description: 'اختبر إتقانك لمعالجة الأخطاء في ٤٠ سؤالًا رسميًا من الكتاب.',
  },
};
