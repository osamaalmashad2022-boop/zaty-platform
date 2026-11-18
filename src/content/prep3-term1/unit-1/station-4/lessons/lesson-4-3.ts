import type { LessonPack } from '@/types/curriculum';

export const LESSON_4_3: LessonPack = {
  id: '4.3',
  stationId: 'station-4',
  unitId: 'unit-1',
  order: 3,
  title: 'تطبيق هندسي عملي: دالة حساب مساحة الدائرة',
  subtitle: 'حوّل القانون الرياضي لدالة ذكية ترجّع المساحة لأي نصف قطر',
  durationMin: 8,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تكتب دالة circle_area(radius) باستخدام قيمة π = 3.14.',
    'تطوّر الدالة لتستخدم return area بدل print() وتخزن الناتج في متغير خارجي.',
    'تختبر الدالة بقيم مختلفة لنصف القطر (5 و 10).',
  ],
  cards: [
    {
      id: '4.3-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-hero',
          type: 'heroHook',
          data: {
            title: 'مشروع الدوال: حاسبة مساحة الدائرة',
            durationMin: 8,
            stationLabel: 'المحطة ٤ · الدرس ٣ من ٣',
            image: '/media/robot-path.png',
            goal: 'تبني دالة مساحة الدائرة circle_area(radius) وتعدلها لترجع القيمة بـ return.',
            hook: 'تخيل معاك مسألة هندسة فيها ٥ دوائر بأنصاف أقطار مختلفة. بدل ما تعيد القانون ٥ مرات، تكتب دالة `circle_area(radius)` مرة واحدة وتمرر لها نصف القطر بس!',
            starterChallenge: {
              prompt:
                'لو نصف قطر الدائرة تضاعف من `5` إلى `10` — مساحتها تتضاعف `×2` ولا `×4`؟',
              options: [
                {
                  id: 'sc-x2',
                  text: 'تتضاعف مرتين (×2)',
                  isCorrect: false,
                  feedback:
                    'الضرب في `2` ده قانون المحيط (`2 * pi * r`)؛ في المساحة بنضرب نصف القطر في نفسه (`r * r`) مش في `2`.',
                },
                {
                  id: 'sc-x4',
                  text: 'تتضاعف ٤ مرات (×4)',
                  isCorrect: true,
                  feedback:
                    'حدس رياضي ممتاز! لأن قانون المساحة يربع نصف القطر (`radius * radius`)، فمضاعفة `r` تضرب المساحة في `2 × 2 = 4` (من `78.5` إلى `314.0`).',
                },
                {
                  id: 'sc-add',
                  text: 'تزيد بمقدار 5 فقط',
                  isCorrect: false,
                  feedback:
                    'المساحة تعتمد على الضرب في `pi` ومربع نصف القطر، وليست جمعًا ثابتًا.',
                },
              ],
              revealNote:
                'افتكر دائمًا: مساحة الدائرة = `pi * radius * radius` (نضرب نصف القطر في نفسه، مش في `2`)!',
            },
          },
        },
      ],
    },
    {
      id: '4.3-c2',
      title: 'رتّب خطوات عمل دالة المساحة',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-order',
          type: 'orderFlowBuilder',
          data: {
            mode: 'steps',
            prompt: 'رتّب تدفق البيانات عبر دالة `circle_area` من الاستقبال حتى تخزين الناتج بالخارج:',
            items: [
              { id: 's1', label: 'استقبال نصف القطر كمعامل: `def circle_area(radius):`' },
              { id: 's2', label: 'حساب المساحة بالقانون: `area = pi * radius * radius`' },
              { id: 's3', label: 'إرجاع النتيجة لمكان الاستدعاء: `return area`' },
              { id: 's4', label: 'تخزين القيمة المعادة بالخارج: `result = circle_area(10)`' },
            ],
            correctOrder: ['s1', 's2', 's3', 's4'],
            feedback: {
              correct:
                'ترتيب سليم 100%: تعريف الدالة واستقبال `radius` ثم الحساب ثم `return` وأخيرًا الاستلام في `result`.',
              incorrect:
                'ابدأ بتعريف الدالة واستقبال المعامل `radius`، ثم الحساب، ثم إرجاع القيمة بـ `return`، وفي النهاية استقبالها بالخارج.',
            },
          },
        },
      ],
    },
    {
      id: '4.3-c3',
      title: 'توقّع قبل التشغيل · اختبار circle_area(10)',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-predict',
          type: 'predictOutput',
          data: {
            title: 'توقّع الناتج قبل Skulpt (PRIMM)',
            prompt: 'احسب قيمة المساحة عند `radius = 10` واختر المخرج قبل التشغيل:',
            code: 'def circle_area(radius):\n    pi = 3.14\n    area = pi * radius * radius\n    return area\n\nprint(circle_area(10))',
            runnable: true,
            expectedOutput: '314.0',
            options: [
              {
                id: 'o1',
                text: '62.8',
                isCorrect: false,
                feedback:
                  '`62.8` هي ناتج `2 * 3.14 * 10` (محيط الدائرة)، بينما الكود يحسب `3.14 * 10 * 10`.',
              },
              {
                id: 'o2',
                text: '31.4',
                isCorrect: false,
                feedback:
                  '`31.4` هي `3.14 * 10` فقط؛ هنا ضربنا `radius` مرتين (`10 * 10 = 100`).',
              },
              {
                id: 'o3',
                text: '314.0',
                isCorrect: true,
                feedback:
                  'حساب سليم! `3.14 * 10 * 10 = 314.0` وتعيدها `return area` إلى دالة الطباعة.',
              },
              {
                id: 'o4',
                text: 'None',
                isCorrect: false,
                feedback:
                  'الدالة تنتهي بأمر `return area` وليس `print`، لذلك ترجع القيمة العددية `314.0`.',
              },
            ],
            explanation:
              'بالتعويض المباشر: `3.14 * 10 * 10 = 314.0`، وترجع `return area` هذه القيمة لنقطة الاستدعاء.',
          },
        },
      ],
    },
    {
      id: '4.3-c4',
      title: 'مثال الكتاب + سؤال التحقق في منتصف الدرس',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-view',
          type: 'codeView',
          data: {
            title: 'النسخة الأولى بالطباعة (ص ٤٥–٤٦)',
            code: 'def circle_area(radius):\n    pi = 3.14\n    area = pi * radius * radius\n    print("Area =", area)\n\ncircle_area(5)\ncircle_area(10)',
            caption: 'لما radius = 5 الناتج 78.5، ولما radius = 10 الناتج 314.0.',
            runnable: true,
          },
        },
        {
          id: '4.3-q1',
          type: 'quizQuestion',
          data: {
            question: 'في برنامج حساب مساحة الدائرة، لماذا نمرّر `radius` كمعامل (Parameter) بدل تثبيته كرقم داخل الدالة؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥٢ · تحقق وسط الدرس',
            options: [
              {
                id: 'a',
                text: 'لجعل الكود أطول وأكثر تعقيدًا',
                isCorrect: false,
                feedback:
                  'الدوال هدفها تقليل التكرار وتبسيط الكود لا إطالته.',
              },
              {
                id: 'b',
                text: 'لإنشاء متغير عام دائم يعمل خارج الدالة مباشرة',
                isCorrect: false,
                feedback:
                  'المعامل `radius` متغير محلي داخل الدالة فقط ولا يظل ظاهرًا بالخارج.',
              },
              {
                id: 'c',
                text: 'لجعل نفس الدالة مرنة وتحسب المساحة لأي قيمة نصف قطر نمررها عند الاستدعاء',
                isCorrect: true,
                feedback:
                  'ممتاز! بفضل المعامل `radius` نستخدم نفس الدالة مع `5` و `10` وأي دائرة أخرى.',
              },
              {
                id: 'd',
                text: 'لأن Python يمنع استخدام الأرقام داخل الدوال إلا كمعاملات',
                isCorrect: false,
                feedback:
                  'الثابت `pi = 3.14` رقم مكتوب داخل الدالة عادي، لكن `radius` معامل لأنه يتغير من دائرة لأخرى.',
              },
            ],
            explanation:
              'تمرير `radius` كمعامل يجعل الدالة قابلة لإعادة الاستخدام مع أي نصف قطر دون تعديل جسم الدالة.',
          },
        },
      ],
    },
    {
      id: '4.3-c5',
      title: 'خلّي بالك! فخ قانون المحيط بدل المساحة',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'قانون مساحة الدائرة ≠ محيط الدائرة!',
            body: 'مساحة الدائرة = `pi * radius * radius` (نصف القطر مضروب في نفسه، مش في `2`!).',
          },
        },
        {
          id: '4.3-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد الخطأ: فخ المحيط داخل دالة المساحة',
            prompt: 'الدالة دي بتطلع ناتج المحيط (62.8 عند r=10) بدل المساحة! اضغط على السطر الغلط:',
            codeLines: [
              'def circle_area(radius):',
              '    pi = 3.14',
              '    area = 2 * pi * radius',
              '    return area',
            ],
            lineFeedback: {
              1: 'تعريف الدالة واستقبال المعامل `radius` سليم.',
              2: 'تحديد القيمة التقريبية `pi = 3.14` سليم.',
              4: 'إرجاع قيمة `area` بـ `return` سليم، لكن معادلة حساب `area` نفسها فيها الفخ!',
            },
            bugLine: 3,
            fixedLine: '    area = pi * radius * radius',
            fixExplanation:
              'العبارة `2 * pi * radius` تحسب المحيط (`62.8` عند `r=10`)؛ لحساب المساحة يجب تربيع نصف القطر: `pi * radius * radius`.',
          },
        },
      ],
    },
    {
      id: '4.3-c6',
      title: 'المرحلة ١ · أكمل قانون مساحة الدائرة',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-fill',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل معادلة area داخل circle_area',
            prompt: 'استبدل `___` في السطر الثالث بالصيغة الرياضية الصحيحة لمساحة الدائرة لتطبع `Area = 78.5`.',
            starterCode:
              'def circle_area(radius):\n    pi = 3.14\n    area = ___\n    print("Area =", area)\n\ncircle_area(5)',
            solutionCode:
              'def circle_area(radius):\n    pi = 3.14\n    area = pi * radius * radius\n    print("Area =", area)\n\ncircle_area(5)',
            checks: [
              { id: 'ca-5', label: 'نصف القطر 5 -> 78.5', stdin: [], contains: '78.5' },
            ],
            quickChips: ['pi * radius * radius', '2 * pi * radius', 'pi * radius'],
            hint: 'استبدل ___ بالمعادلة pi * radius * radius (أو pi * radius ** 2).',
            hints: [
              'الهدف: حساب مساحة الدائرة بضرب الثابت pi في مربع نصف القطر.',
              'تجنب الضرب في 2 لأنه للمحيط، واضرب المتغير radius في نفسه.',
              'استبدل ___ بالعبارة pi * radius * radius.',
            ],
          },
        },
      ],
    },
    {
      id: '4.3-c7',
      title: 'المرحلة ٢ · طوّر الدالة لتستخدم return',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-free',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'تطوير الدالة بـ return area (ص ٤٧)',
            prompt:
              'استبدل `___` داخل `circle_area(radius)` بأمر الإرجاع المناسب حتى تخزّن المساحة في `result` وتطبع `Stored: 78.5` و `314.0`.',
            starterCode:
              'def circle_area(radius):\n    pi = 3.14\n    area = pi * radius * radius\n    ___\n\nresult = circle_area(5)\nprint("Stored:", result)\nprint(circle_area(10))',
            solutionCode:
              'def circle_area(radius):\n    pi = 3.14\n    area = pi * radius * radius\n    return area\n\nresult = circle_area(5)\nprint("Stored:", result)\nprint(circle_area(10))',
            checks: [
              { id: 'ret-5-10', label: 'النواتج Stored: 78.5 و 314.0', stdin: [], contains: ['Stored: 78.5', '314'] },
            ],
            quickChips: ['return area', 'print(area)', 'return radius'],
            hint: 'استبدل ___ بالأمر return area داخل الدالة مع الحفاظ على المسافة البادئة.',
            hints: [
              'الهدف: إعادة قيمة المساحة المحسوبة ليخزنها السطر result = circle_area(5).',
              'لو كتبت print(area) فسيأخذ المتغير result القيمة None؛ نحتاج كلمة return.',
              'استبدل ___ بالكلمتين return area.',
            ],
          },
        },
      ],
    },
    {
      id: '4.3-c8',
      title: 'التحقق السريع · نقل الفهم',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '4.3-q2',
          type: 'quizQuestion',
          data: {
            question: 'بعد تطوير `circle_area(radius)` لتستخدم `return area`، ما قيمة `total` في الكود التالي؟',
            code: 'def circle_area(radius):\n    pi = 3.14\n    area = pi * radius * radius\n    return area\n\ntotal = circle_area(10) + circle_area(5)\nprint(total)',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤٦–٤٧ · تطبيق فهم',
            options: [
              {
                id: 'a',
                text: '62.8',
                isCorrect: false,
                feedback:
                  '`62.8` هي محيط الدائرة ذات `r=10` فقط، وليس مجموع مساحتي الدائرتين.',
              },
              {
                id: 'b',
                text: '392.5',
                isCorrect: true,
                feedback:
                  'ممتاز! بفضل `return area` جمعنا `314.0 + 78.5 = 392.5` بسهولة في سطر واحد.',
              },
              {
                id: 'c',
                text: '314.0',
                isCorrect: false,
                feedback:
                  'دي مساحة الدائرة الأولى `circle_area(10)` بس، ونسيت تجمع عليها `circle_area(5) = 78.5`.',
              },
              {
                id: 'd',
                text: 'خطأ TypeError بسبب جمع دالتين',
                isCorrect: false,
                feedback:
                  'لأن الدالة ترجع أرقامًا عبر `return area` لا `None`، فيمكن جمع ناتجي استدعائين طبيعيًا.',
              },
            ],
            explanation:
              'قيمة `circle_area(10)` هي `314.0` وقيمة `circle_area(5)` هي `78.5`، وبفضل `return` أمكن جمعهما ليصبح المجموع `392.5`.',
          },
        },
      ],
    },
    {
      id: '4.3-c9',
      title: 'ختام المحطة الرابعة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '4.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'بنِينا دالة `circle_area(radius)` وطوّرناها بـ `return` علشان ترجّع القيمة ونستخدمها بأي نصف قطر في حسابات مجمّعة. دلوقتي تقدر تختبر نفسك في ٤٠ سؤالًا للمحطة الرابعة!',
          },
        },
      ],
    },
  ],
  summary: 'بناء وتطوير دالة مساحة الدائرة circle_area(radius) باستخدام return.',
  additionalSources: [
    {
      id: 'nb-4-3-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'دالة circle_area(radius) تجمع بين المعاملات والقانون الرياضي وكلمة return في تطبيق هندسي عملي.',
      bullets: [
        'pi = 3.14 و area = pi * radius * radius.',
        'تطوير الدالة بـ return area يتيح حفظ الناتج في متغير خارجي.',
        'نفس الدالة تشتغل على radius = 5 أو radius = 10 أو أي قيمة.',
      ],
    },
    {
      id: 'nb-4-3-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-4-3-1',
          question: 'هل ممكن أكتب radius ** 2 بدل radius * radius؟',
          answer: 'أيوه طبعًا! في Python علامة ** معناها الأس، فـ radius ** 2 بتدي نفس نتيجة radius * radius.',
        },
        {
          id: 'faq-4-3-2',
          question: 'ليه عدّلنا الدالة من print() إلى return area في تدريب الكتاب؟',
          answer: 'عشان تبقى دالة احترافية نقدر نخزن نتيجتها في متغير result أو نجمع مساحتين مع بعض.',
        },
      ],
    },
    {
      id: 'nb-4-3-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-4-3',
        label: 'دالة مساحة الدائرة',
        children: [
          { id: 'mm-4-3-in', label: 'المدخل (Parameter): radius' },
          { id: 'mm-4-3-calc', label: 'الحساب: pi * radius * radius' },
          { id: 'mm-4-3-out', label: 'الإرجاع: return area' },
          { id: 'mm-4-3-test', label: 'الاختبار: r=5 (78.5) و r=10 (314.0)' },
        ],
      },
    },
    {
      id: 'nb-4-3-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g43-1', termAr: 'معامل نصف القطر', termEn: 'radius Parameter', definition: 'مدخل يمكّن نفس الدالة من حساب المساحة لأي دائرة بأي نصف قطر.' },
        { id: 'g43-2', termAr: 'قانون مساحة الدائرة', termEn: 'pi * r * r', definition: 'الصيغة الرياضية لحساب مساحة الدائرة حيث pi ≈ 3.14.' },
      ],
    },
  ],
  sources: [
    { id: 's43-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'تطبيق دالة مساحة الدائرة وتعديل return', pages: 'ص 45–47' },
    { id: 's43-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٤.٣', detail: 'تتبع تنفيذ circle_area قبل وبعد return' },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-4',
    label: 'ابدأ اختبار المحطة الرابعة',
    description: 'اختبر فهمك للدوال والمعاملات والنطاق المحلي في ٤٠ سؤالًا من الكتاب.',
  },
};
