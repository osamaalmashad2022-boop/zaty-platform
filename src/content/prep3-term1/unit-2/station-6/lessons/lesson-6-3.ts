import type { LessonPack } from '@/types/curriculum';

export const LESSON_6_3: LessonPack = {
  id: '6.3',
  stationId: 'station-6',
  unitId: 'unit-2',
  order: 3,
  title: 'بناء دالة التنبؤ predict_grade في Python',
  subtitle: 'حوّل النموذج الخطي إلى كود Python يتوقع الدرجة حسب عدد ساعات المذاكرة',
  durationMin: 10,
  contentVersion: 3,
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
      requireInteraction: true,
      blocks: [
        {
          id: '6.3-hero',
          type: 'heroHook',
          data: {
            title: 'تشغيل نموذج التنبؤ في Python',
            durationMin: 10,
            stationLabel: 'المحطة ٦ · الدرس ٣ من ٣',
            image: '/media/robot-puzzle.png',
            goal: 'تكتب دالة predict_grade(hours) بلغة Python وتحسب الدرجة المتوقعة عمليًا.',
            hook: 'دلوقتي هنربط الدوال من الوحدة الأولى بمعادلة النموذج الخطي `y = w * x + b` علشان نبني أول متنبئ درجات شغال في Python!',
            starterChallenge: {
              prompt:
                'لو دالة `predict_grade` فيها `print(y)` بدل `return y`، إيه يحصل عند تنفيذ `grade = predict_grade(3); print(grade + 5)`؟',
              options: [
                {
                  id: 'sc-ok',
                  text: 'هيطبع 30 عادي لأن print و return بيعملوا نفس الوظيفة',
                  isCorrect: false,
                  feedback:
                    'print بتعرض الرقم على الشاشة بس وبترجع None، فمش هتقدر تجمع 5 على النتيجة بعد الاستدعاء.',
                },
                {
                  id: 'sc-err',
                  text: 'هيحصل TypeError لأن الدالة بدون return بترجع None',
                  isCorrect: true,
                  feedback:
                    'عين مبرمج! بدون return y بترجع الدالة None، وجمع None + 5 بيوقف البرنامج بخطأ TypeError.',
                },
                {
                  id: 'sc-skip',
                  text: 'هيطبع 25 ويتجاهل سطر + 5 تلقائيًا',
                  isCorrect: false,
                  feedback:
                    'بايثون هينفذ grade + 5 وهيتوقف لأن grade شايلة None مش 25.',
                },
              ],
              revealNote:
                'علشان تستخدم نتيجة التنبؤ جوه متغير أو عملية حسابية تانية، لازم الدالة تنتهي بـ `return y`!',
            },
          },
        },
      ],
    },
    {
      id: '6.3-c2',
      title: 'المرحلة ١ · توقّع مخرجات predict_grade قبل التشغيل',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '6.3-predict',
          type: 'predictOutput',
          data: {
            title: 'توقّع مخرجات مثال ٢ (w = 5, b = 10, hours = 3)',
            prompt:
              'تتبّع الكود كأنك المفسّر واختر القيمة التي سيطبعها قبل ما تشغّله:',
            code: 'def predict_grade(x):\n    w = 5\n    b = 10\n    y = w * x + b\n    return y\n\nhours = 3\ngrade = predict_grade(hours)\nprint("Predicted grade:", grade)',
            runnable: true,
            expectedOutput: 'Predicted grade: 25',
            options: [
              {
                id: 'po-15',
                text: 'Predicted grade: 15',
                isCorrect: false,
                feedback:
                  'ضربت w * x = 5 * 3 = 15 بس نسيت تجمع الانحياز b = 10.',
              },
              {
                id: 'po-25',
                text: 'Predicted grade: 25',
                isCorrect: true,
                feedback:
                  'حساب دقيق! الدالة حسبت 5 * 3 + 10 = 25 وأرجعتها عبر return y للمتغير grade.',
              },
              {
                id: 'po-35',
                text: 'Predicted grade: 35',
                isCorrect: false,
                feedback:
                  'الوزن هنا w = 5 والانحياز b = 10 (وليس العكس)، فالناتج 5 * 3 + 10 = 25.',
              },
              {
                id: 'po-none',
                text: 'Predicted grade: None',
                isCorrect: false,
                feedback:
                  'الدالة تحتوي return y في نهايتها، لذا ترجع القيمة 25 ولا ترجع None.',
              },
            ],
            explanation:
              'عند استدعاء predict_grade(3) يتم تعويض x = 3، فتُحسب y = 5 * 3 + 10 = 25 وتُخزن في grade.',
          },
        },
      ],
    },
    {
      id: '6.3-c3',
      title: 'تتبع مثال الكتاب خطوة بخطوة (ص ٦٩–٧٠)',
      role: 'concept',
      blocks: [
        {
          id: '6.3-code',
          type: 'codeView',
          data: {
            title: 'مثال ٢ من الكتاب (ص ٦٩–٧٠)',
            code: 'def predict_grade(x):\n    w = 5\n    b = 10\n    y = w * x + b\n    return y\n\nhours = 3\ngrade = predict_grade(hours)\nprint("Study hours:", hours)\nprint("Predicted grade:", grade)',
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
              {
                id: 't1',
                title: '١. تعريف الدالة',
                detail: 'أنشأنا دالة `predict_grade(x)` تستقبل عدد ساعات المذاكرة `x`.',
              },
              {
                id: 't2',
                title: '٢. تحديد المعاملات',
                detail: 'حددنا `w = 5` (٥ درجات لكل ساعة) و `b = 10` (١٠ درجات بدون مذاكرة).',
              },
              {
                id: 't3',
                title: '٣. المعادلة والإرجاع',
                detail: 'حسبنا `y = w * x + b` وأرجعنا النتيجة باستخدام `return y`.',
              },
              {
                id: 't4',
                title: '٤. الاختبار والعرض',
                detail: 'مرّرنا `hours = 3` فحسبت الدالة `25` وحفظتها في `grade` ثم طبعتها.',
              },
            ],
          },
        },
      ],
    },
    {
      id: '6.3-c4',
      title: 'صيد الخطأ: ليه الدالة ما رجعتش الدرجة؟',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '6.3-spotbug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'اكتشف السطر المسبّب لخطأ None داخل الدالة',
            prompt:
              'الكود ده بيحاول يجمع 5 درجات بونص على ناتج predict_grade، لكنه بيضرب خطأ! اضغط على السطر الغلط:',
            codeLines: [
              'def predict_grade(hours):',
              '    w = 5',
              '    b = 10',
              '    y = w * hours + b',
              '    print(y)',
              'final = predict_grade(3) + 5',
            ],
            lineFeedback: {
              1: 'تعريف الدالة والمعامل hours سليم 100%.',
              2: 'تحديد الوزن w = 5 سليم.',
              3: 'تحديد الانحياز b = 10 سليم.',
              4: 'معادلة النموذج الخطي w * hours + b محسوبة بشكل صحيح.',
              6: 'سطر الاستدعاء سليم؛ المشكلة في الدالة نفسها اللي ما رجعتش قيمة y!',
            },
            bugLine: 5,
            fixedLine: '    return y',
            fixExplanation:
              'أمر print(y) بيعرض النتيجة فقط وبيرجّع None؛ استبدله بـ return y علشان ترجّع الدالة 25 وتنجمع مع 5 فتبقى 30.',
          },
        },
      ],
    },
    {
      id: '6.3-c5',
      title: 'محاكاة التحقق: كم ساعة لتحقيق 90 درجة؟',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '6.3-sim',
          type: 'interactiveSim',
          data: {
            mode: 'linearModel',
            title: 'تحدي جدول الكتاب: w = 10, b = 40',
            prompt:
              'قبل ما تكتب المتنبئ التفاعلي في Python، جرّب شريط الساعات بمعاملات جدول الكتاب (`w = 10, b = 40`) واكتشف كم ساعة نحتاج للوصول لـ **90 درجة**!',
            xLabel: 'ساعات المذاكرة (hours)',
            yLabel: 'الدرجة المتوقعة (y)',
            wLabel: 'الوزن (w)',
            bLabel: 'الانحياز (b)',
            initialX: 2,
            initialW: 10,
            initialB: 40,
            minX: 0,
            maxX: 8,
            stepX: 1,
            minW: 5,
            maxW: 15,
            stepW: 5,
            minB: 20,
            maxB: 50,
            stepB: 10,
            maxY: 120,
            unitSuffix: 'درجة',
            targetChallenge: {
              prompt: 'مع w = 10 و b = 40: حرّك الساعات (hours) للوصول لـ 90 درجة بالظبط!',
              targetY: 90,
              tolerance: 0,
              successFeedback:
                'بالظبط! عند 5 ساعات: 10 * 5 + 40 = 90. افتكر النتيجة دي عشان تتأكد من كودك في المعمل الجاي!',
            },
          },
        },
      ],
    },
    {
      id: '6.3-c6',
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
              'هنا الدرجة المبدئية `b = 40` وكل ساعة مذاكرة بتزود `w = 5` درجات. استبدل `___` بصيغة النموذج الخطي باستخدام المعامل `hours` ثم اختبر الحل.',
            starterCode:
              'def predict_grade(hours):\n    w = 5\n    b = 40\n    y = ___\n    return y\n\nprint(predict_grade(0))\nprint(predict_grade(4))',
            solutionCode:
              'def predict_grade(hours):\n    w = 5\n    b = 40\n    y = w * hours + b\n    return y\n\nprint(predict_grade(0))\nprint(predict_grade(4))',
            checks: [
              { id: 'pred-0', label: 'predict_grade(0) تطبع 40', stdin: [], expectedOutputRegex: '(^|\\D)40(\\D|$)' },
              { id: 'pred-4', label: 'predict_grade(4) تطبع 60', stdin: [], expectedOutputRegex: '(^|\\D)60(\\D|$)' },
            ],
            quickChips: ['w * hours + b', 'w + hours * b', 'b * hours + w'],
            hint: 'عوض مكان ___ بالصيغة w * hours + b.',
            hints: [
              'الهدف في السطر ٤ إننا نحسب الدرجة المتوقعة y قبل ما الدالة ترجعها بـ return y.',
              'في النموذج الخطي، الوزن w بيتضرب في المدخل (اسم المعامل هنا hours)، وبعدين بنجمع الانحياز b.',
              'استبدل ___ بالصيغة w * hours + b علشان يبقى السطر y = w * hours + b.',
            ],
          },
        },
      ],
    },
    {
      id: '6.3-c7',
      title: 'المرحلة ٣ · جرّب لوحدك: متنبئ درجات تفاعلي بـ input()',
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
              'أكمل جسم دالة `predict_grade(hours)` بمعاملات جدول الكتاب (`w = 10` و `b = 40`) لتحسب وترجع الناتج `y = w * hours + b`، وتختبر أنها تعطي `40` لـ `0` ساعات و `90` لـ `5` ساعات.',
            starterCode:
              'def predict_grade(hours):\n    w = 10\n    b = 40\n    ___\n\nhours = int(input("Enter study hours: "))\nprint(predict_grade(hours))',
            solutionCode:
              'def predict_grade(hours):\n    w = 10\n    b = 40\n    y = w * hours + b\n    return y\n\nhours = int(input("Enter study hours: "))\nprint(predict_grade(hours))',
            checks: [
              { id: 'h-0', label: '0 ساعات -> 40', stdin: ['0'], expectedOutputRegex: '(^|\\D)40(\\D|$)' },
              { id: 'h-3', label: '3 ساعات -> 70', stdin: ['3'], expectedOutputRegex: '(^|\\D)70(\\D|$)' },
              { id: 'h-5', label: '5 ساعات -> 90', stdin: ['5'], expectedOutputRegex: '(^|\\D)90(\\D|$)' },
            ],
            quickChips: ['return w * hours + b', 'print(w * hours + b)', 'y = w * hours + b', 'return y'],
            hint: 'مكان ___ أرجِع w * hours + b بـ return (وليس print).',
            hints: [
              'الهدف إن الدالة predict_grade(hours) تحسب الدرجة المتوقعة بمعاملات w = 10 و b = 40 وترجعها لسطر print في الأسفل.',
              'افتكر فخ print: لو طبعت جوه الدالة من غير return هترجع None؛ لازم تستخدم return لإرجاع قيمة المعادلة.',
              'مكان ___ اكتب return w * hours + b (أو اكتب y = w * hours + b وفي السطر التالي return y بمسافة بادئة ٤ مسافات).',
            ],
          },
        },
      ],
    },
    {
      id: '6.3-c8',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '6.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'أخطاء شائعة عند كتابة predict_grade',
            body: '• لا تنسَ **`return y`** عشان الدالة ترجّع الدرجة المتوقعة؛ لو طبعت بس جواها مش هتقدر تخزّن الناتج في متغير `grade`.\n• استخدم نفس اسم المعامل المكتوب بين القوسين (`x` أو `hours`) جوه المعادلة.\n• عند قراءة الساعات من `input()` حوّلها بـ `int()` أو `float()` قبل الضرب.',
          },
        },
      ],
    },
    {
      id: '6.3-c9',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '6.3-q2',
          type: 'quizQuestion',
          data: {
            question:
              'في دالة `predict_grade(hours)` بمعاملات `w = 5` و `b = 40`، ما القيمة التي ترجعها الدالة عند تنفيذ `predict_grade(0)`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٦٩',
            options: [
              {
                id: 'a',
                text: '0',
                isCorrect: false,
                feedback:
                  'الضرب 5 * 0 = 0 فعلًا، لكن المعادلة بتجمع الانحياز b = 40 فالدالة بترجع 40.',
              },
              {
                id: 'b',
                text: '5',
                isCorrect: false,
                feedback:
                  '5 ده قيمة الوزن w اللي بتضرب في الساعات، مش ناتج الدالة عند 0 ساعة.',
              },
              {
                id: 'c',
                text: '40',
                isCorrect: true,
                feedback:
                  'إجابة صحيحة! 5 * 0 + 40 = 40، و return y ترجع قيمة الانحياز b.',
              },
              {
                id: 'd',
                text: '45',
                isCorrect: false,
                feedback:
                  '45 دي النتيجة لما hours = 1 (5 * 1 + 40)، لكن هنا مررنا 0 ساعة.',
              },
            ],
            explanation:
              'عند x = 0 يلغى حد (w * x) وتبقى قيمة الانحياز الثابتة b = 40 التي ترجعها الدالة.',
          },
        },
      ],
    },
    {
      id: '6.3-c10',
      title: 'ختام المحطة السادسة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '6.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'ترجمنا النموذج الخطي `y = w * x + b` لدالة Python حقيقية `predict_grade` بـ `def` و `return y`، واكتشفنا فخ `print` بدل `return`، وجرّبنا الدالة على أكتر من قيم لـ `w` و `b` وربطناها بـ `input()`. دلوقتي إنت جاهز لاختبار المحطة السادسة (٤٠ سؤالًا رسميًا من الكتاب)!',
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
          answer:
            'لا يفرق عند التنفيذ طالما استخدمت نفس الاسم في السطر بتاع المعادلة (w * x + b أو w * hours + b)، لكن اختيار اسم معبر زي hours بيوضح معنى الكود.',
        },
        {
          id: 'faq-6-3-2',
          question: 'ليه الكتاب كتب مرة w = 10, b = 40 ومرة w = 5, b = 10؟',
          answer:
            'كل جدول بيانات وله معاملاته الخاصة! في المثال النظري الأول كانت الساعات 1,2,3 مقابل 50,60,70 (w=10, b=40)، وفي مثال الكود اختار نموذجًا بسيطًا آخر (w=5, b=10).',
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
        {
          id: 'g63-1',
          termAr: 'دالة التنبؤ',
          termEn: 'predict_grade(hours)',
          definition: 'دالة Python تستقبل عدد ساعات المذاكرة وتعيد الدرجة المتوقعة باستخدام النموذج الخطي.',
        },
        {
          id: 'g63-2',
          termAr: 'قيمة الاختبار',
          termEn: 'Test Input',
          definition: 'قيمة نمررها للدالة مثل hours = 3 للتحقق من مخرجات النموذج.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 's63-tb',
      kind: 'textbook',
      label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي',
      detail: 'مثال ٢: برمجة النموذج الخطي في Python',
      pages: 'ص 69–70 و 74',
    },
    {
      id: 's63-nb',
      kind: 'notebooklm',
      label: 'مصادر NotebookLM للدرس ٦.٣',
      detail: 'PRIMM predict_grade وتدريبات Skulpt العملية المتدرجة',
    },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-6',
    label: 'ابدأ اختبار المحطة السادسة',
    description: 'اختبر نفسك في ٤٠ سؤالًا رسميًا عن التنبؤ والنموذج الخطي.',
  },
};
