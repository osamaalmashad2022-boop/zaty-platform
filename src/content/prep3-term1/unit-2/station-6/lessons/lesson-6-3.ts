import type { LessonPack } from '@/types/curriculum';

export const LESSON_6_3: LessonPack = {
  id: '6.3',
  stationId: 'station-6',
  unitId: 'unit-2',
  order: 3,
  title: 'بناء دالة التنبؤ predict_grade في Python',
  subtitle: 'حوّل النموذج الخطي إلى كود Python يتوقع الدرجة حسب عدد ساعات المذاكرة',
  durationMin: 9,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
  objectives: [
    'تفسّر دالة predict_grade(x) في Python وتتبع قيم w و b و y خطوة بخطوة.',
    'تكتب وتختبر دالة predict_grade(hours) بمعاملات مختلفة مثل y = 5 * hours + 40 و y = 10 * hours + 40.',
    'تدمج input() مع دالة التنبؤ لبناء متنبئ درجات تفاعلي بلغة Python.',
  ],
  cards: [
    {
      id: '6.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '6.3-hero',
          type: 'heroHook',
          data: {
            title: 'تشغيل نموذج التنبؤ في Python',
            durationMin: 9,
            stationLabel: 'المحطة ٦ · الدرس ٣ من ٣',
            goal: 'تكتب دالة predict_grade(hours) بلغة Python وتحسب الدرجة المتوقعة عمليًا.',
            hook: 'فاكر الدوال ذات المعاملات من الوحدة الأولى؟ دلوقتي هنربطها بالمعادلة الرياضية `y = w * x + b` علشان نبني أول نموذج تنبؤ شغال على Python بنفسك!',
          },
        },
      ],
    },
    {
      id: '6.3-c2',
      title: 'المرحلة ١ · مثال ٢ من الكتاب محلول خطوة بخطوة',
      role: 'example',
      blocks: [
        {
          id: '6.3-code',
          type: 'codeView',
          data: {
            title: 'مثال ٢ من الكتاب (ص ٦٩–٧٠)',
            code: 'def predict_grade(x):\n    w = 5\n    b = 10\n    y = w * x + b\n    return y\n\nhours = 3\ngrade = predict_grade(hours)\nprint("Study hours:", hours)\nprint("Predicted grade:", grade)  # 25',
            caption: 'لما hours = 3 الدالة تحسب 5 * 3 + 10 وترجع 25 عبر return y.',
            runnable: true,
          },
        },
        {
          id: '6.3-trace',
          type: 'processStepper',
          data: {
            heading: 'تتبع تنفيذ البرنامج (ص ٧٠)',
            steps: [
              { id: 't1', title: '١. تعريف الدالة', detail: 'أنشأنا دالة اسمها `predict_grade(x)` تستقبل عدد ساعات المذاكرة `x`.' },
              { id: 't2', title: '٢. تحديد المعاملات', detail: 'حددنا `w = 5` (٥ درجات لكل ساعة) و `b = 10` (١٠ درجات بدون مذاكرة).' },
              { id: 't3', title: '٣. تطبيق المعادلة وإرجاع الناتج', detail: 'حسبنا `y = w * x + b` وأرجعنا النتيجة باستخدام `return y`.' },
              { id: 't4', title: '٤. اختبار النموذج وعرض النتيجة', detail: 'مرّرنا `hours = 3` فحسبت الدالة `5 * 3 + 10 = 25` وحفظتها في `grade` ثم طبعتها.' },
            ],
          },
        },
      ],
    },
    {
      id: '6.3-c3',
      title: 'المرحلة ٢ · أكمل دالة predict_grade(hours)',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '6.3-fill-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل معادلة y = 5 * hours + 40 داخل predict_grade',
            prompt:
              'هنا الدرجة المبدئية `b = 40` وكل ساعة مذاكرة بتزود `w = 5` درجات. أكمل سطر حساب `y = w * hours + b` داخل الدالة، وشغّل الاختبار للتأكد من الناتج عند 0 و 4 ساعات.',
            starterCode:
              'def predict_grade(hours):\n    w = 5\n    b = 40\n    # اكتب معادلة حساب y هنا\n    return y\n\nprint(predict_grade(0))\nprint(predict_grade(4))',
            solutionCode:
              'def predict_grade(hours):\n    w = 5\n    b = 40\n    y = w * hours + b\n    return y\n\nprint(predict_grade(0))\nprint(predict_grade(4))',
            checks: [
              { id: 'pred-0', label: 'predict_grade(0) تطبع 40', stdin: [], expectedOutputRegex: '(^|\\D)40(\\D|$)' },
              { id: 'pred-4', label: 'predict_grade(4) تطبع 60', stdin: [], expectedOutputRegex: '(^|\\D)60(\\D|$)' },
            ],
            hint: 'اكتب y = w * hours + b بمسافة بادئة (4 مسافات) جوه الدالة.',
          },
        },
      ],
    },
    {
      id: '6.3-c4',
      title: 'المرحلة ٣ · جرّب لوحدك: متنبئ درجات تفاعلي من جدول الكتاب',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '6.3-free-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'تحدي المبرمج: متنبئ جدول الكتاب (y = 10 * hours + 40)',
            prompt:
              'اكتب برنامج Python يعرّف دالة `predict_grade(hours)` بمعاملات جدول الكتاب (`w = 10` و `b = 40`) وتُرجع `y = w * hours + b`، ثم يقرأ عدد الساعات من المستخدم باستخدام `int(input(...))` ويطبع الدرجة المتوقعة.',
            starterCode:
              'def predict_grade(hours):\n    # حدد w = 10 و b = 40 وأرجع y = w * hours + b\n\nhours = int(input("Enter study hours: "))\nprint(predict_grade(hours))',
            solutionCode:
              'def predict_grade(hours):\n    w = 10\n    b = 40\n    y = w * hours + b\n    return y\n\nhours = int(input("Enter study hours: "))\nprint(predict_grade(hours))',
            checks: [
              { id: 'h-0', label: '0 ساعات -> 40', stdin: ['0'], expectedOutputRegex: '(^|\\D)40(\\D|$)' },
              { id: 'h-3', label: '3 ساعات -> 70', stdin: ['3'], expectedOutputRegex: '(^|\\D)70(\\D|$)' },
              { id: 'h-5', label: '5 ساعات -> 90', stdin: ['5'], expectedOutputRegex: '(^|\\D)90(\\D|$)' },
            ],
            hint: 'جوه def predict_grade(hours): اكتب w = 10 ثم b = 40 ثم y = w * hours + b ثم return y.',
          },
        },
      ],
    },
    {
      id: '6.3-c5',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '6.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'أخطاء شائعة عند كتابة predict_grade',
            body: '• لا تنسَ **`return y`** عشان الدالة ترجّع الدرجة المتوقعة؛ لو طبعت بس جواها مش هتقدر تخزّن الناتج في متغير `grade`.\n• تأكد إنك استخدمت نفس اسم المعامل المكتوب بين القوسين (`x` أو `hours`) جوه المعادلة.\n• عند قراءة الساعات من `input()` لازم تحوّلها بـ `int()` أو `float()` قبل الضرب.',
          },
        },
      ],
    },
    {
      id: '6.3-c6',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '6.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'في كود الكتاب (`w = 5, b = 10`)، ما النتيجة المطبوعة عند تنفيذ `print(predict_grade(3))`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٧٤ (س١٥)',
            options: [
              { id: 'a', text: '15', isCorrect: false, feedback: 'نسيت تجمع الانحياز b = 10.' },
              { id: 'b', text: '25', isCorrect: true, feedback: 'صح! 5 × 3 + 10 = 25.' },
              { id: 'c', text: '35', isCorrect: false, feedback: 'راجع الحساب: 5*3 = 15، + 10 = 25.' },
              { id: 'd', text: '40', isCorrect: false, feedback: 'غير صحيح.' },
            ],
            explanation: 'بالتعويض في المعادلة: y = 5 * 3 + 10 = 25.',
          },
        },
        {
          id: '6.3-q2',
          type: 'quizQuestion',
          data: {
            question: 'في دالة `predict_grade(hours)` بمعاملات `w = 5` و `b = 40`، ما القيمة التي ترجعها الدالة عند `hours = 0`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٦٩',
            options: [
              { id: 'a', text: '0', isCorrect: false, feedback: 'الضرب في 0 يساوي 0 لكن ما تنساش تجمع b = 40.' },
              { id: 'b', text: '5', isCorrect: false, feedback: '5 هو الوزن w.' },
              { id: 'c', text: '40', isCorrect: true, feedback: 'إجابة صحيحة! 5 × 0 + 40 = 40 (قيمة الانحياز b).' },
              { id: 'd', text: '45', isCorrect: false, feedback: '45 لما تكون hours = 1.' },
            ],
            explanation: 'عند x = 0 يلغى حد (w * x) وتبقى قيمة الانحياز الثابتة b = 40.',
          },
        },
      ],
    },
    {
      id: '6.3-c7',
      title: 'ختام المحطة السادسة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '6.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'ترجمنا النموذج الخطي `y = w * x + b` لدالة Python حقيقية `predict_grade` بـ `def` و `return y`، وجرّبناها على أكتر من قيم لـ `w` و `b` وربطناها بـ `input()`. دلوقتي إنت جاهز لاختبار المحطة السادسة (٤٠ سؤالًا رسميًا من الكتاب)!',
          },
        },
      ],
    },
  ],
  summary: 'كتابة وتشغيل دالة التنبؤ الخطي predict_grade(hours) بلغة Python واختبارها بقيم مختلفة.',
  additionalSources: [
    {
      id: 'nb-6-3-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'دالة predict_grade تترجم معادلة الذكاء الاصطناعي الخطية إلى كود Python نظيف وقابل لإعادة الاستخدام.',
      bullets: [
        'تبدأ بتعريف def predict_grade(hours):.',
        'تُعرّف بداخلها قيم w و b وتحسب y = w * hours + b.',
        'تستخدم return y لإرجاع الدرجة المتوقعة وحفظها في متغير.',
        'يمكن اختبارها بأرقام مباشرة أو بقراءة الساعات عبر int(input()).',
      ],
    },
    {
      id: 'nb-6-3-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-6-3-1',
          question: 'هل يفرق اسم المعامل لو سميته x أو hours في الدالة؟',
          answer: 'لا يفرق عند التنفيذ طالما استخدمت نفس الاسم في السطر بتاع المعادلة (w * x + b أو w * hours + b)، لكن اختيار اسم معبر زي hours بيوضح معنى الكود.',
        },
        {
          id: 'faq-6-3-2',
          question: 'ليه الكتاب كتب مرة w = 10, b = 40 ومرة w = 5, b = 10؟',
          answer: 'كل جدول بيانات وله معاملاته الخاصة! في المثال النظري الأول كانت الساعات 1,2,3 مقابل 50,60,70 (w=10, b=40)، وفي مثال الكود اختار نموذجًا بسيطًا آخر (w=5, b=10).',
        },
      ],
    },
    {
      id: 'nb-6-3-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-6-3',
        label: 'برمجة predict_grade في Python',
        children: [
          { id: 'mm-6-3-def', label: 'def predict_grade(hours):' },
          { id: 'mm-6-3-wb', label: 'تحديد المعاملات: w و b' },
          { id: 'mm-6-3-eq', label: 'حساب المعادلة: y = w * hours + b' },
          { id: 'mm-6-3-ret', label: 'الإرجاع والاختبار: return y + print()' },
        ],
      },
    },
    {
      id: 'nb-6-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g63-1', termAr: 'دالة التنبؤ', termEn: 'predict_grade(hours)', definition: 'دالة Python تستقبل عدد ساعات المذاكرة وتعيد الدرجة المتوقعة باستخدام النموذج الخطي.' },
        { id: 'g63-2', termAr: 'قيمة الاختبار', termEn: 'Test Input', definition: 'قيمة نمررها للدالة مثل hours = 3 للتحقق من مخرجات النموذج.' },
      ],
    },
  ],
  sources: [
    { id: 's63-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'مثال ٢: برمجة النموذج الخطي في Python', pages: 'ص 69–70 و 74' },
    { id: 's63-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٦.٣', detail: 'تتبع predict_grade وتدريبات Skulpt العملية' },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-6',
    label: 'ابدأ اختبار المحطة السادسة',
    description: 'اختبر نفسك في ٤٠ سؤالًا رسميًا عن التنبؤ والنموذج الخطي.',
  },
};
