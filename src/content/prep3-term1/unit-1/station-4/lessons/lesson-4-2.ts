import type { LessonPack } from '@/types/curriculum';

export const LESSON_4_2: LessonPack = {
  id: '4.2',
  stationId: 'station-4',
  unitId: 'unit-1',
  order: 2,
  title: 'القيمة المعادة ونطاق المتغيرات (return vs print & Scope)',
  subtitle: 'إمتى تطبع بس وإمتى ترجّع قيمة تحفظها وتبني عليها عمليات تانية؟',
  durationMin: 8,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
  objectives: [
    'تفرّق بين الطباعة داخل الدالة بـ print() وإرجاع القيمة بـ return.',
    'تستقبل ناتج الدالة في متغير خارجي وتستخدمه في حسابات جديدة.',
    'تفهم النطاق المحلي (Local Scope) وسبب ظهور NameError عند استدعاء متغير داخلي من خارج الدالة.',
  ],
  cards: [
    {
      id: '4.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '4.2-hero',
          type: 'heroHook',
          data: {
            title: 'سر return والنطاق المحلي للمتغيرات',
            durationMin: 8,
            stationLabel: 'المحطة ٤ · الدرس ٢ من ٣',
            goal: 'تستخدم return لإرجاع ناتج تخزنه في متغير، وتتجنب خطأ NameError في النطاق المحلي.',
            hook: 'لو جبت مبرمجين: واحد دالته بتطبع الناتج على الشاشة بس، والتاني دالته بترجّع الناتج بـ `return`. لو عايز تضرب الناتج في 2 بعدين — الأول هيفشل والتاني هيكسب!',
          },
        },
      ],
    },
    {
      id: '4.2-c2',
      title: 'جدول المقارنة: print() مقابل return + النطاق المحلي',
      role: 'concept',
      blocks: [
        {
          id: '4.2-table',
          type: 'tableBlock',
          data: {
            heading: 'الفرق الجوهري بين print() و return',
            headers: ['الأداة', 'ماذا تفعل؟', 'هل يمكن تخزين الناتج في متغير؟'],
            rows: [
              ['print()', 'تعرض النتيجة على الشاشة فقط', 'لا (ترجع None)'],
              ['return', 'ترجع القيمة إلى مكان استدعاء الدالة', 'نعم (مثل result = double(5))'],
            ],
          },
        },
        {
          id: '4.2-scope-code',
          type: 'codeView',
          data: {
            title: 'إعادة القيم ونطاق المتغيرات المحلي (Local Scope)',
            code: 'def multiply(a, b):\n    return a * b\n\nx = multiply(4, 5)   # 20\ny = multiply(2, 3)   # 6\nprint(x + y)         # 26',
            caption: 'بفضل return قدرنا نحفظ النواتج في x و y ونجمعهم؛ أما المتغير المعرّف جوه الدالة فقط فلا يراه الكود بالخارج.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '4.2-c3',
      title: 'جرّب بنفسك: اكتب دالة double(x)',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '4.2-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'تحدي Export C: دالة double(x) مع return',
            prompt:
              'اكتب دالة اسمها `double` تستقبل معاملًا واحدًا `x` وترجع ضعف قيمته (`x * 2`) باستخدام `return`، ثم استدعِها بالقيمة `5` وخزّن الناتج في `result` واطبع `result`.',
            starterCode:
              '# عرّف الدالة double(x) باستخدام return\n\nresult = double(5)\nprint(result)',
            solutionCode:
              'def double(x):\n    return x * 2\n\nresult = double(5)\nprint(result)',
            checks: [
              { id: 'dbl-5', label: 'double(5) ترجع وتطبع 10', stdin: [], expectedOutputRegex: '^10$' },
            ],
            hint: 'اكتب def double(x): وفي السطر اللي تحتها بمسافة بادئة return x * 2.',
          },
        },
      ],
    },
    {
      id: '4.2-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '4.2-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'خطأ شائع: طباعة متغير محلي من خارج الدالة (NameError)',
            body: 'لو عرّفت متغير `x = 10` جوه الدالة وكتبت `print(x)` بره الدالة، بايثون هيطلع خطأ **`NameError`** لأن `x` متغير محلي (Local Scope) موجود جوه الدالة بس!',
          },
        },
      ],
    },
    {
      id: '4.2-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '4.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما النتيجة المتوقعة للكود `def test(): x = 10; return x` ثم `print(x)` من خارج الدالة؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥١',
            options: [
              { id: 'a', text: '10', isCorrect: false, feedback: 'x متغير محلي داخل الدالة فقط.' },
              { id: 'b', text: 'خطأ NameError لأن x غير معرف خارج الدالة', isCorrect: true, feedback: 'إجابة صحيحة!' },
              { id: 'c', text: 'None', isCorrect: false, feedback: 'يرفع NameError قبل الطباعة.' },
              { id: 'd', text: '0', isCorrect: false, feedback: 'غير صحيح.' },
            ],
            explanation: 'المتغير x محلي داخل الدالة test()، ولا يمكن الوصول إليه مباشرة من خارجها.',
          },
        },
        {
          id: '4.2-q2',
          type: 'quizQuestion',
          data: {
            question: 'ماذا يحدث إذا استخدمنا `print(result)` داخل الدالة بدلًا من `return result` وحاولنا حفظ ناتج استدعائها في متغير؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤٦–٤٧',
            options: [
              { id: 'a', text: 'تُحفظ القيمة تلقائيًا في المتغير', isCorrect: false, feedback: 'print() لا تُرجع قيمة للمتغير.' },
              { id: 'b', text: 'يستقبل المتغير القيمة الفارغة None ولا يمكن استخدامه في حسابات أخرى', isCorrect: true, feedback: 'صح! لازم return عشان المتغير ياخد القيمة المعادة.' },
              { id: 'c', text: 'يتوقف Python فورًا عند print', isCorrect: false, feedback: 'لا يتوقف عند الطباعة، لكنه يرجع None.' },
              { id: 'd', text: 'تضاعف القيمة تلقائيًا', isCorrect: false, feedback: 'غير صحيح.' },
            ],
            explanation: 'print() تعرض على الشاشة فقط وترجع None، أما return فتعيد القيمة لتُخزّن وتُستخدم.',
          },
        },
      ],
    },
    {
      id: '4.2-c6',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '4.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: '`return` بترجع النتيجة من الدالة علشان نخزنها في متغير ونكمّل شغل عليها (عكس `print()` اللي بتعرض على الشاشة وبس). وكمان المتغيرات المعرّفة جوه الدالة ليها نطاق محلي ما بيتشافش برّاها. في الدرس التالت هنطبّق ده على دالة مساحة الدائرة!',
          },
        },
      ],
    },
  ],
  summary: 'الفرق بين return و print() ومفهوم النطاق المحلي (Local Scope) وخطأ NameError.',
  additionalSources: [
    {
      id: 'nb-4-2-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'فهم return والنطاق المحلي يخليك تبني دوال مترابطة تتبادل النتائج بوضوح.',
      bullets: [
        'return تنهي الدالة وترجع النتيجة لمكان الاستدعاء.',
        'print() تعرض النص على الشاشة فقط وترجع None.',
        'أي متغير يُنشأ داخل الدالة محلي (Local) ولا يُرى خارجها.',
      ],
    },
    {
      id: 'nb-4-2-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-4-2-1',
          question: 'إزاي آخد قيمة متغير من جوه الدالة وأستخدمه برّاها؟',
          answer: 'لازم الدالة ترجّعه بـ return، وإنت بره الدالة تحفظه في متغير زي val = my_func().',
        },
        {
          id: 'faq-4-2-2',
          question: 'إيه اللي بيحصل لأي سطر مكتوب بعد return جوه الدالة؟',
          answer: 'الدالة بتقف وتخرج فورًا عند return، فأي سطر بعده في نفس المسار مش بيتنفذ!',
        },
      ],
    },
    {
      id: 'nb-4-2-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-4-2',
        label: 'مخرجات الدالة ونطاقها',
        children: [
          {
            id: 'mm-4-2-ret',
            label: 'return مقابل print()',
            children: [
              { id: 'mm-4-2-r1', label: 'return: ترجع قيمة للحفظ والاستخدام' },
              { id: 'mm-4-2-r2', label: 'print(): عرض على الشاشة فقط' },
            ],
          },
          {
            id: 'mm-4-2-scp',
            label: 'Local Scope',
            children: [{ id: 'mm-4-2-s1', label: 'المتغير الداخلي غير مرئي بالخارج (NameError)' }],
          },
        ],
      },
    },
    {
      id: 'nb-4-2-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g42-1', termAr: 'القيمة المعادة', termEn: 'return', definition: 'كلمة مفتاحية تُعيد ناتج الدالة إلى موضع استدعائها لاستخدامه لاحقًا.' },
        { id: 'g42-2', termAr: 'النطاق المحلي', termEn: 'Local Scope', definition: 'حيز الدالة الذي تنتمي إليه المتغيرات المعرفة داخلها فقط.' },
        { id: 'g42-3', termAr: 'خطأ اسم غير معرف', termEn: 'NameError', definition: 'خطأ يظهر عند محاولة استخدام متغير غير معرف في النطاق الحالي.' },
      ],
    },
  ],
  sources: [
    { id: 's42-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'return مقابل print ونطاق المتغيرات', pages: 'ص 46–47' },
    { id: 's42-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٤.٢', detail: 'تتبع return والنطاق المحلي Local Scope' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '4.3',
    label: 'الدرس الجاي: تطبيق هندسي — دالة مساحة الدائرة',
    description: 'اكمل وطوّر دالة circle_area(radius) من الكتاب.',
  },
};
