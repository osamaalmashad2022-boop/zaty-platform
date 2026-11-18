import type { LessonPack } from '@/types/curriculum';

export const LESSON_4_2: LessonPack = {
  id: '4.2',
  stationId: 'station-4',
  unitId: 'unit-1',
  order: 2,
  title: 'القيمة المعادة ونطاق المتغيرات (return vs print & Scope)',
  subtitle: 'إمتى تطبع بس وإمتى ترجّع قيمة تحفظها وتبني عليها عمليات تانية؟',
  durationMin: 8,
  contentVersion: 3,
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
      requireInteraction: true,
      blocks: [
        {
          id: '4.2-hero',
          type: 'heroHook',
          data: {
            title: 'سر return والنطاق المحلي للمتغيرات',
            durationMin: 8,
            stationLabel: 'المحطة ٤ · الدرس ٢ من ٣',
            goal: 'تستخدم return لإرجاع ناتج تخزنه في متغير، وتتجنب خطأ NameError في النطاق المحلي.',
            hook: 'لو جبت مبرمجين: واحد دالته بتطبع الناتج على الشاشة بس، والتاني دالته بترجّع الناتج بـ `return`. لو عايز تحفظ النتيجة وتبني عليها — الأول هيفشل والتاني هيكسب!',
            starterChallenge: {
              prompt:
                'لو كتبنا `def f(x): print(x * 2)` وبعدها `ans = f(5)` — إيه قيمة المتغير `ans`؟',
              options: [
                {
                  id: 'sc-10',
                  text: '10',
                  isCorrect: false,
                  feedback:
                    'دالة `print()` بتعرض `10` على الشاشة للعين فقط، لكنها ما بترجعش رقم يتخزن جوه المتغير `ans`.',
                },
                {
                  id: 'sc-none',
                  text: 'None (قيمة فارغة)',
                  isCorrect: true,
                  feedback:
                    'توقع دقيق! أي دالة بدون `return` بترجع `None` تلقائيًا حتى لو طبعت `10` على الشاشة.',
                },
                {
                  id: 'sc-err',
                  text: 'خطأ SyntaxError',
                  isCorrect: false,
                  feedback:
                    'السطر صحيح نحويًا ومش هيوقف هنا، لكن `ans` هتبقى فاضية (`None`) وتفشل لو جمعت عليها بعدين.',
                },
              ],
              revealNote:
                'الفرق بين ميكروفون ومغلف بريد: `print()` بتزعق بالنتيجة في الهواء، و`return` بتبعتها في ظرف للي استدعاها!',
            },
          },
        },
      ],
    },
    {
      id: '4.2-c2',
      title: 'مقارنة تفاعلية: print() مقابل return',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '4.2-video',
          type: 'mediaPlayer',
          data: {
            kind: 'video',
            title: 'فيديو مرئي: سر return ومكبر صوت print والنطاق المحلي Local Scope',
            src: '/media/video-4-2.mp4',
            vttSrc: '/media/caption-4-2.vtt',
            durationSec: 304,
            transcript:
              'مقارنة بصرية بين print() ومكبر الصوت الذي يعرض الناتج للعين فقط ويرجع None للبرنامج، و return كظرف مغلق يسلم القيمة للمتغير في موضع الاستدعاء وينهي الدالة فورًا.\n' +
              'توضيح النطاق المحلي Local Scope: كيف تعيش المتغيرات داخل صندوق الدالة ولماذا تظهر NameError عند استدعائها من الخارج.',
          },
        },
        {
          id: '4.2-tabs',
          type: 'comparisonTabs',
          data: {
            heading: 'الفرق الجوهري بين print() و return (ص ٤٦–٤٧)',
            instruction: 'استعرض التبويبين لتكتشف متى تنفع `print()` ومتى لازم `return`.',
            tabs: [
              {
                id: 'tab-print',
                label: 'print() داخل الدالة',
                badge: 'للعرض فقط',
                tone: 'coral',
                body: 'تعرض النتيجة على الشاشة أمام المستخدم ثم تنتهي الدالة وتعيد القيمة الفارغة `None`، لذلك لا يصلح ناتجها لحسابات لاحقة.',
                bullets: [
                  'لا يمكن تخزين المخرج في متغير خارجي',
                  'عند `ans = f(5)` تصبح `ans` تساوي `None`',
                  'محاولة جمع `ans + 5` ترفع `TypeError`',
                ],
                code: 'def f(x):\n    print(x * 2)\n\nans = f(5)   # يطبع 10، لكن ans قيمتها None',
              },
              {
                id: 'tab-return',
                label: 'return داخل الدالة',
                badge: 'للحفظ والبناء',
                tone: 'emerald',
                body: 'ترجع القيمة المحسوبة إلى موضع استدعاء الدالة، فتسمح بحفظ الناتج في متغير أو إدخاله في معادلة جديدة.',
                bullets: [
                  'تُخزّن القيمة في متغير مثل `x = multiply(4, 5)`',
                  'تُنهي تنفيذ الدالة فور الوصول إليها',
                  'تسمح بجمع نواتج دوال متعددة معًا بمرونة',
                ],
                code: 'def f(x):\n    return x * 2\n\nans = f(5)        # ans = 10\nprint(ans + 5)    # يطبع 15',
              },
            ],
          },
        },
      ],
    },
    {
      id: '4.2-c3',
      title: 'أسرار الدالة من الداخل: التوقف والخصوصية',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '4.2-flips',
          type: 'flipCards',
          data: {
            heading: 'قاعدتان ذهبيتان داخل الدالة',
            instruction: 'اقلب البطاقتين لتكتشف ماذا يحدث بعد `return` وأين تعيش متغيرات الدالة.',
            cards: [
              {
                id: 'fc-dead',
                frontLabel: 'سلوك return',
                frontTitle: 'ماذا يحدث لأي سطر مكتوب بعد `return`؟',
                frontHint: 'هل يكمل Python تنفيذ باقي أسطر الدالة؟',
                backTitle: 'تتوقف الدالة فورًا!',
                backBody:
                  'بمجرد تنفيذ `return` تخرج الدالة في نفس اللحظة؛ وأي سطر يأتي بعدها داخل نفس المسار لا يُنفّذ أبدًا (Dead Code).',
                backExample: 'في `return 10` ثم `print(99)`، لن يطبع Python الرقم `99` مطلقًا.',
              },
              {
                id: 'fc-scope',
                frontLabel: 'Local Scope',
                frontTitle: 'النطاق المحلي: أين يُرى المتغير الداخلي؟',
                frontHint: 'لو أنشأت `total = 50` داخل الدالة، هل تراه بالخارج؟',
                backTitle: 'محلي داخل الدالة فقط!',
                backBody:
                  'المتغيرات والمعاملات داخل الدالة تكون في النطاق المحلي (`Local Scope`) وتختفي بانتهاء الدالة؛ استدعاؤها بالخارج يرفع `NameError`.',
                backExample: 'لإخراج القيمة للخارج: رجّعها بـ `return total` وخزّنها في متغير خارجي.',
              },
            ],
          },
        },
      ],
    },
    {
      id: '4.2-c4',
      title: 'توقّع قبل التشغيل · فخ السطر بعد return',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '4.2-predict',
          type: 'predictOutput',
          data: {
            title: 'تتبّع نقطة الخروج (PRIMM)',
            prompt: 'ركّز في السطر الثاني والثالث داخل `test()` — ماذا سيطبع عند التشغيل؟',
            code: 'def test():\n    return 10\n    print(99)\n\nprint(test())',
            runnable: true,
            expectedOutput: '10',
            options: [
              {
                id: 'o1',
                text: '99\n10',
                isCorrect: false,
                feedback:
                  'التنفيذ وصل إلى `return 10` أولًا فخرج من الدالة فورًا قبل أن يصل للسطر `print(99)`.',
              },
              {
                id: 'o2',
                text: '10',
                isCorrect: true,
                feedback:
                  'رائع! `return 10` أنهت الدالة وأرجعت `10` إلى `print(test())`، وتجاهل المفسّر `print(99)` تمامًا.',
              },
              {
                id: 'o3',
                text: '10\n99',
                isCorrect: false,
                feedback:
                  'لا يعود Python لإكمال الدالة بعد تنفيذ `return`؛ هي تخرج من الدالة نهائيًا في نفس اللحظة.',
              },
              {
                id: 'o4',
                text: 'خطأ SyntaxError',
                isCorrect: false,
                feedback:
                  'كتابة سطر بعد `return` مش خطأ في قواعد اللغة، لكنه كود غير قابل للوصول ولا يُنفذ.',
              },
            ],
            explanation:
              'أمر `return` يُعيد القيمة ويُغلق تنفيذ الدالة فورًا، لذلك لا يصل التنفيذ أبدًا إلى `print(99)`.',
          },
        },
      ],
    },
    {
      id: '4.2-c5',
      title: 'مثال الكتاب + سؤال التحقق في منتصف الدرس',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '4.2-scope-code',
          type: 'codeView',
          data: {
            title: 'استقبال نواتج return وبناء حسابات جديدة',
            code: 'def multiply(a, b):\n    return a * b\n\nx = multiply(4, 5)   # 20\ny = multiply(2, 3)   # 6\nprint(x + y)         # 26',
            caption: 'بفضل return استقبلنا الناتجين في x و y وجمعناهما خارج الدالة.',
            runnable: true,
          },
        },
        {
          id: '4.2-q2',
          type: 'quizQuestion',
          data: {
            question:
              'في المثال السابق، ماذا يحدث للسطر `x = multiply(4, 5)` ثم `print(x + 6)` لو بدّلنا `return a * b` إلى `print(a * b)`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤٦–٤٧ · تحقق وسط الدرس',
            options: [
              {
                id: 'a',
                text: 'تُحفظ القيمة 20 في x ويطبع البرنامج 26 بشكل طبيعي',
                isCorrect: false,
                feedback:
                  '`print()` تعرض `20` على الشاشة فقط ولا تعيد رقمًا للمتغير `x`، فتأخذ `x` القيمة `None`.',
              },
              {
                id: 'b',
                text: 'تستقبل x القيمة None ويفشل جمع x + 6 بخطأ TypeError',
                isCorrect: true,
                feedback:
                  'دقيق! لأن الدالة بدون `return` ترجع `None`، وجمع `None + 6` يسبب `TypeError`.',
              },
              {
                id: 'c',
                text: 'يتوقف البرنامج عند سطر print(a * b) فورًا بدون طباعة',
                isCorrect: false,
                feedback:
                  '`print(a * b)` تنجح في طباعة `20`، لكن المشكلة تقع بعدها عند محاولة جمع `None + 6`.',
              },
              {
                id: 'd',
                text: 'تتحول x تلقائيًا إلى قيمة نصية "20"',
                isCorrect: false,
                feedback:
                  '`print()` لا تحفظ ناتجها كنص أو رقم في المتغير المستقبِل؛ دائمًا ترجع `None`.',
              },
            ],
            explanation:
              'استخدام `print()` داخل الدالة يجعلها ترجع `None`، بينما `return` ضرورية لتمرير النتيجة لمتغير خارجي.',
          },
        },
      ],
    },
    {
      id: '4.2-c6',
      title: 'خلّي بالك! اكتشف خطأ النطاق المحلي',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '4.2-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'خطأ شائع: استدعاء متغير محلي من خارج الدالة (NameError)',
            body: 'أي متغير بتعرّفه جوه الدالة بيكون محلي (`Local Scope`) ومخفي عن الكود الخارجي.',
          },
        },
        {
          id: '4.2-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'صيد الخطأ: NameError في النطاق المحلي',
            prompt: 'الكود ده بيرفع `NameError`! اضغط على السطر اللي حاول يخرق حدود النطاق المحلي:',
            codeLines: [
              'def calc():',
              '    total = 50',
              '    return total',
              'print(total)',
            ],
            lineFeedback: {
              1: 'تعريف الدالة `calc()` سليم.',
              2: 'تعريف المتغير المحلي `total = 50` داخل الدالة سليم؛ المشكلة في السطر اللي حاول يقراه من بره!',
              3: 'إرجاع قيمة `total` بـ `return` خطوة ممتازة، لكن السطر الأخير ما استقبلش ناتج `calc()`.',
            },
            bugLine: 4,
            fixedLine: 'print(calc())',
            fixExplanation:
              'المتغير `total` محلي داخل `calc()` ولا يراه الكود بالخارج فيظهر `NameError`؛ لاستقبال القيمة المعادة اطبع ناتج استدعاء الدالة `calc()` مباشرة أو خزّنه في متغير.',
          },
        },
      ],
    },
    {
      id: '4.2-c7',
      title: 'جرّب بنفسك: دالة double(x) مع return',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '4.2-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل دالة double(x) باستخدام return',
            prompt:
              'أكمل جسم الدالة `double(x)` مكان `___` لترجع ضعف `x` (`x * 2`) باستخدام `return`، فيستقبل المتغير `result` القيمة `10` ويطبعها.',
            starterCode:
              'def double(x):\n    ___\n\nresult = double(5)\nprint("Result:", result)',
            solutionCode:
              'def double(x):\n    return x * 2\n\nresult = double(5)\nprint("Result:", result)',
            checks: [
              { id: 'dbl-5', label: 'double(5) ترجع 10 إلى result', stdin: [], contains: 'Result: 10' },
            ],
            quickChips: ['return x * 2', 'print(x * 2)', 'return x + 2'],
            hint: 'استبدل ___ بالأمر return x * 2 مع الحفاظ على المسافة البادئة.',
            hints: [
              'الهدف: إرجاع ضعف x من الدالة حتى يتخزن في المتغير result ولا يصبح None.',
              'استخدم كلمة return وليس print لأننا نخزّن النتيجة في result = double(5).',
              'استبدل ___ بالعبارة return x * 2.',
            ],
          },
        },
      ],
    },
    {
      id: '4.2-c8',
      title: 'التحقق السريع · نقل الفهم',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '4.2-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما النتيجة المتوقعة عند تنفيذ الكود التالي؟',
            code: 'def add_bonus(score):\n    bonus = score + 5\n    return bonus\n\nfinal = add_bonus(20)\nprint(bonus)',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٥١ · تطبيق فهم',
            options: [
              {
                id: 'a',
                text: '25',
                isCorrect: false,
                feedback:
                  'القيمة `25` رجعت فعلًا واتخزنت في `final`، لكن سطر الطباعة طلب المتغير المحلي `bonus` مش `final`.',
              },
              {
                id: 'b',
                text: 'خطأ NameError لأن bonus متغير محلي غير معرف خارج الدالة',
                isCorrect: true,
                feedback:
                  'إجابة دقيقة! المتغير `bonus` محلي داخل `add_bonus` فقط؛ لطباعة النتيجة كان يجب استخدام `print(final)`.',
              },
              {
                id: 'c',
                text: 'None',
                isCorrect: false,
                feedback:
                  'الدالة أرجعت `25` عبر `return` ولم ترجع `None`، لكن البرنامج يتوقف بـ `NameError` عند محاولة قراءة `bonus` بالخارج.',
              },
              {
                id: 'd',
                text: '20',
                isCorrect: false,
                feedback:
                  '`20` هو الوسيط الممرر إلى `score`، وكلا من `score` و `bonus` محليان لا يُريان خارج الدالة.',
              },
            ],
            explanation:
              'أي متغير ينشأ داخل الدالة (`bonus`) يظل محصورًا في نطاقها المحلي؛ القيمة المعادة عبر `return` توجد في المتغير الخارجي `final`.',
          },
        },
      ],
    },
    {
      id: '4.2-c9',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '4.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: '`return` بتنهي الدالة وترجّع النتيجة علشان نخزنها في متغير ونكمّل شغل عليها (عكس `print()` اللي بتعرض على الشاشة وبس وترجّع `None`). وكمان المتغيرات المعرّفة جوه الدالة ليها نطاق محلي ما بيتشافش برّاها. في الدرس التالت هنطبّق ده على دالة مساحة الدائرة!',
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
