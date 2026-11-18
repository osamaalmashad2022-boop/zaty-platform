import type { LessonPack } from '@/types/curriculum';

export const LESSON_3_1: LessonPack = {
  id: '3.1',
  stationId: 'station-3',
  unitId: 'unit-1',
  order: 1,
  title: 'السلاسل النصية Strings: الفهرسة ودوال النصوص',
  subtitle: 'العد في Python بيبدأ من صفر! تعامل مع الحروف والطول والبحث والتكبير',
  durationMin: 9,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تعرّف السلسلة النصية (String) داخل علامتي تنصيص " " أو \' \'.',
    'تستخرج أي حرف من النص باستخدام الفهرسة الموجبة (0, 1...) والسالبة (-1...) وتتجنب IndexError.',
    'تستخدم الدوال والمعاملات: len() و in و upper() والتكرار for على الحروف.',
  ],
  cards: [
    {
      id: '3.1-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '3.1-hero',
          type: 'heroHook',
          data: {
            title: 'السلاسل النصية Strings في Python',
            durationMin: 9,
            stationLabel: 'المحطة ٣ · الدرس ١ من ٤',
            goal: 'تقرأ طول النص وتوصل لأي حرف بالفهرسة الموجبة والسالبة وتبحث جوه النصوص.',
            hook: 'لما بتسجل اسمك أو كلمة سر على أي موقع، إزاي البرنامج بيعرف عدد الحروف، أو أول حرف إيه، أو هل فيها رمز معين؟ كل ده بيتم عن طريق السلاسل النصية (Strings)!',
            starterChallenge: {
              prompt: 'في السلسلة النصية `text = "Egypt"`، الأمر `print(text[1])` هيطبع حرف `"E"` ولا `"g"`؟',
              options: [
                {
                  id: 'sc-a',
                  text: '"E" — لأنه أول حرف في الكلمة',
                  isCorrect: false,
                  feedback: 'ده فخ العدّ من 1! في Python الفهرسة بتبدأ من 0، يعني الحرف الأول هو text[0] مش text[1].',
                },
                {
                  id: 'sc-b',
                  text: '"g" — لأن الترقيم يبدأ من 0 فـ [1] هو الحرف الثاني',
                  isCorrect: true,
                  feedback: 'توقّع دقيق! الحرف E فهرسه 0، والحرف g فهرسه 1 لأن العد في Python يبدأ من الصفر.',
                },
                {
                  id: 'sc-c',
                  text: '"t" — لأنه آخر حرف في الكلمة',
                  isCorrect: false,
                  feedback: 'آخر حرف فهرسه السالب -1 (أو 4)، بينما الفهرس الموجب [1] يعد من البداية بعد 0 مباشرة.',
                },
              ],
              revealNote: 'القاعدة الذهبية في Python: أول حرف مكانه [0]، وآخر حرف مكانه [-1].',
            },
          },
        },
      ],
    },
    {
      id: '3.1-c2',
      title: 'بطاقات فهرسة النصوص والطول',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '3.1-str-def',
          type: 'richText',
          data: {
            heading: 'السلسلة النصية والفهرسة (Indexing)',
            body: '**السلسلة النصية (String)** هي حروف أو أرقام أو رموز داخل علامتي تنصيص `" "` أو `\' \'`، وكل خانة فيها مرقمة من اليسار لليمين بدءًا من `0` ومن النهاية بدءًا من `-1`.',
          },
        },
        {
          id: '3.1-index-flips',
          type: 'flipCards',
          data: {
            heading: 'اكتشف مواقع الحروف ودالة len()',
            instruction: 'اقلب كل بطاقة لتشاهد موضع الحرف وكوده من اليسار لليمين بدون خلط.',
            cards: [
              {
                id: 'idx-0',
                frontLabel: 'الفهرس 0',
                frontTitle: 'text[0] في "hello"',
                frontHint: 'أين يقع الصفر في الكلمة؟',
                backTitle: 'أول حرف من اليسار',
                backBody: 'الفهرسة الموجبة تبدأ من 0 دائمًا من أول حرف في السلسلة.',
                code: 'text = "hello"\nprint(text[0])  # h',
              },
              {
                id: 'idx-1',
                frontLabel: 'الفهرس 1',
                frontTitle: 'text[1] في "hello"',
                frontHint: 'انتبه: ليس الحرف الأول!',
                backTitle: 'الحرف الثاني',
                backBody: 'بما أن h فهرسها 0، فإن الفهرس 1 يشير للحرف الثاني e.',
                code: 'text = "hello"\nprint(text[1])  # e',
              },
              {
                id: 'idx-neg',
                frontLabel: 'الفهرس السالب -1',
                frontTitle: 'text[-1] في "hello"',
                frontHint: 'طريقة سريعة للوصول للنهاية',
                backTitle: 'آخر حرف من النهاية',
                backBody: 'الفهرسة السالبة تبدأ من -1 عند آخر حرف وتتجه للخلف (-2 لـ l وهكذا).',
                code: 'text = "hello"\nprint(text[-1])  # o',
              },
              {
                id: 'idx-len',
                frontLabel: 'الطول len()',
                frontTitle: 'len("Hi Ali") يساوي كام؟',
                frontHint: 'هل المسافة تتحسب؟',
                backTitle: 'الطول = 6 (المسافة محسوبة!)',
                backBody: 'دالة len() تعد كل رمز داخل علامتي التنصيص بما في ذلك المسافات الفارغة.',
                code: 'print(len("Hi Ali"))  # 6',
              },
            ],
          },
        },
      ],
    },
    {
      id: '3.1-c3',
      title: 'توقّع قبل التشغيل: الفهرسة مع len()',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '3.1-predict',
          type: 'predictOutput',
          data: {
            title: 'اقرأ السطرين وتوقّع المخرج الدقيق',
            prompt: 'ماذا سيطبع الكود التالي عند تشغيله؟ ركّز على `text[1]` و `len(text)`:',
            code: 'text = "hello"\nprint(text[1], len(text))',
            expectedOutput: 'e 5',
            options: [
              {
                id: 'p1',
                text: 'h 5',
                isCorrect: false,
                feedback: 'تذكّر أن text[0] هي "h"، أما text[1] فتشير للحرف الثاني "e".',
              },
              {
                id: 'p2',
                text: 'e 5',
                isCorrect: true,
                feedback: 'ممتاز! text[1] تطبع الحرف الثاني "e"، ودالة len("hello") تعد ٥ حروف فتطبع 5.',
              },
              {
                id: 'p3',
                text: 'e 4',
                isCorrect: false,
                feedback: 'آخر فهرس هو 4 لكن عدد الحروف الإجمالي len() يساوي 5 لأن العد للطول يبدأ من 1.',
              },
              {
                id: 'p4',
                text: 'h 4',
                isCorrect: false,
                feedback: 'الفهرسة تبدأ من 0 (فـ text[1] هي "e")، بينما الطول len() يحسب عدد الحروف الكلي وهو 5.',
              },
            ],
            explanation: 'الفهرسة تبدأ من 0 (text[1] -> "e")، بينما دالة len() ترجع العدد الكلي للحروف (5).',
          },
        },
      ],
    },
    {
      id: '3.1-c4',
      title: 'مثال محلول: العمليات الخمس على النصوص',
      role: 'example',
      blocks: [
        {
          id: '3.1-code-ex',
          type: 'codeView',
          data: {
            title: 'العمليات الخمس على السلاسل النصية (ص ٣٢–٣٣)',
            code: 'text = "hello"\nprint(len(text))      # 5\nprint(text[0])        # h\nprint(text[-1])       # o\nprint("h" in text)    # True\nprint(text.upper())   # HELLO',
            caption: 'الدالة len() تحسب الطول، وin ترجع True أو False، وupper() تكبّر كل الحروف.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '3.1-c5',
      title: 'نقطة فحص: استخراج أول حرف',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '3.1-q1',
          type: 'quizQuestion',
          data: {
            question: 'في السلسلة النصية `text = "hello"`، ما الحرف الذي ترجعه `text[0]`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٣٨',
            options: [
              {
                id: 'a',
                text: '"e"',
                isCorrect: false,
                feedback: '"e" هو الحرف الثاني ويقع عند الفهرس text[1] لأن الترقيم يبدأ من 0.',
              },
              {
                id: 'b',
                text: '"l"',
                isCorrect: false,
                feedback: '"l" تقع عند الفهرس text[2] و text[3] وليس عند البداية 0.',
              },
              {
                id: 'c',
                text: '"h"',
                isCorrect: true,
                feedback: 'صح! الفهرس 0 يشير دائمًا إلى أول حرف من اليسار وهو "h".',
              },
              {
                id: 'd',
                text: '"o"',
                isCorrect: false,
                feedback: '"o" هو آخر حرف في الكلمة ومكانه text[4] أو text[-1].',
              },
            ],
            explanation: 'الفهرسة الموجبة تبدأ من 0، لذلك text[0] هي الحرف الأول "h".',
          },
        },
      ],
    },
    {
      id: '3.1-c6',
      title: 'خلّي بالك! فخ IndexError',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '3.1-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'لماذا توقف الكود برسالة IndexError؟',
            prompt: 'كلمة `"Egypt"` مكونة من ٥ حروف، فحاول مبرمج طباعة الحرف الأخير بـ `text[5]` فتوقف البرنامج! اضغط على السطر الخاطئ:',
            codeLines: [
              'text = "Egypt"',
              'print(len(text))',
              'print(text[5])',
            ],
            bugLine: 3,
            lineFeedback: {
              1: 'تعريف السلسلة النصية داخل علامتي تنصيص سليم تمامًا.',
              2: 'طباعة len(text) ستخرج الرقم 5 بشكل سليم.',
            },
            fixedLine: 'print(text[4])  # أو print(text[-1])',
            fixExplanation: 'بما أن العد يبدأ من 0، فالحروف الخمسة في "Egypt" تقع في الفهارس 0 و1 و2 و3 و4 فقط؛ طلب text[5] يتجاوز طول النص ويسبب IndexError.',
          },
        },
      ],
    },
    {
      id: '3.1-c7',
      title: 'المرحلة ٢ · أكمل الفهرس الناقص',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.1-fill',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل طباعة الحرف الأول',
            prompt: 'استبدل `___` بالفهرس الصحيح لطباعة الحرف الأول من `"hello"`، ثم تحقق من النتيجة.',
            starterCode: 'text = "hello"\nprint(text[___])\nprint(text[-1])',
            solutionCode: 'text = "hello"\nprint(text[0])\nprint(text[-1])',
            quickChips: ['0', '1', '-1', '5'],
            checks: [
              { id: 'c-h-o', label: 'يطبع h ثم o', stdin: [], expectedOutputRegex: '^h\\no', contains: ['h', 'o'] },
            ],
            hint: 'العد في Python بيبدأ من صفر، يبقى الفهرس المطلوب للحرف الأول هو 0.',
            hints: [
              'الهدف: طباعة أول حرف من كلمة "hello" وهو "h" في السطر الثاني.',
              'الفهرسة الموجبة تبدأ دائمًا من الصفر (0) عند أول حرف من اليسار.',
              'استبدل ___ بالرقم 0 ليصبح السطر: print(text[0]).',
            ],
          },
        },
      ],
    },
    {
      id: '3.1-c8',
      title: 'المرحلة ٣ · تحدي بطاقة الاسم "Sara"',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.1-free',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'مسألة قريبة: بطاقة الاسم "Sara"',
            prompt: 'لنفترض `name = "Sara"`. اكتب برنامجًا يطبع طول الاسم (`len`)، ثم الحرف الأول، ثم الحرف الأخير، كل واحد في سطر `print()`.',
            starterCode: 'name = "Sara"\n',
            solutionCode: 'name = "Sara"\nprint(len(name))\nprint(name[0])\nprint(name[-1])',
            quickChips: [
              'print(len(name))',
              'print(name[0])',
              'print(name[-1])',
            ],
            checks: [
              { id: 'sara', label: 'النتيجة 4 و S و a', stdin: [], expectedOutputRegex: '^4\\nS\\na', contains: ['4', 'S', 'a'] },
            ],
            hint: 'استخدم ثلاث جمل طباعة: len(name) ثم name[0] ثم name[-1].',
            hints: [
              'الهدف: إخراج ٣ سطور بالترتيب — عدد الحروف، ثم الحرف الأول، ثم الحرف الأخير.',
              'نحسب الطول بدالة len()، ونصل لأول حرف بالفهرس [0] ولآخر حرف بالفهرس السالب [-1].',
              'أضف ٣ سطور: print(len(name)) ثم print(name[0]) ثم print(name[-1]).',
            ],
          },
        },
      ],
    },
    {
      id: '3.1-c9',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '3.1-q2',
          type: 'quizQuestion',
          data: {
            question: 'ما النتيجة المتوقعة عند تشغيل الكود `text = "Python"; print(len(text))`؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٣٨',
            options: [
              {
                id: 'a',
                text: '5',
                isCorrect: false,
                feedback: '5 هو الفهرس الأخير للحرف "n"، أما len() فترجع عدد الحروف الكلي وهو 6.',
              },
              {
                id: 'b',
                text: '6',
                isCorrect: true,
                feedback: 'إجابة صحيحة: كلمة Python مكونة من 6 حروف (P-y-t-h-o-n).',
              },
              {
                id: 'c',
                text: '7',
                isCorrect: false,
                feedback: 'عدّ الحروف من P إلى n بدقة؛ لا توجد مسافات إضافية داخل علامتي التنصيص.',
              },
              {
                id: 'd',
                text: 'خطأ في البرنامج',
                isCorrect: false,
                feedback: 'النص سليم واستدعاء len(text) صحيح نحويًا في Python.',
              },
            ],
            explanation: 'len("Python") تحسب عدد الحروف الفعلي وهو 6، بينما الفهارس تبدأ من 0 إلى 5.',
          },
        },
      ],
    },
    {
      id: '3.1-c10',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '3.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'السلسلة النصية (`String`) بتتكتب بين علامتي تنصيص، والفهرسة فيها بتبدأ من `0` من البداية ومن `-1` من النهاية (وأقصى فهرس موجب هو `len(text) - 1`). ومعانا أدوات قوية زي `len()` للطول و `upper()` للتكبير و `in` للبحث عن حرف أو كلمة جوه النص.',
          },
        },
      ],
    },
  ],
  summary: 'السلاسل النصية والفهرسة الموجبة والسالبة ودوال len و upper ومعامل in.',
  additionalSources: [
    {
      id: 'nb-3-1-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'النصوص في Python بتتعامل كسلسلة حروف مرقمة، وده بيسهّل الوصول لأي حرف أو حساب الطول أو البحث جوه الكلمة.',
      bullets: [
        'الفهرس الموجب يبدأ من 0، والسالب يبدأ من -1 (آخر حرف).',
        'len(text) تحسب عدد الحروف (بما فيها المسافات).',
        '"a" in text ترجع True أو False حسب وجود الحرف.',
        'text.upper() تحوّل الحروف إلى حروف كبيرة (Capital).',
      ],
    },
    {
      id: 'nb-3-1-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-3-1-1',
          question: 'لو كتبت text = "hi " فيها مسافة في الآخر، len(text) هتطلع كام؟',
          answer: 'هتطلع 3! لأن المسافة بتتحسب حرفًا جوه السلسلة النصية.',
        },
        {
          id: 'faq-3-1-2',
          question: 'إيه فائدة الفهرسة السالبة زي text[-1]؟',
          answer: 'بتوصلك لآخر حرف في أي كلمة فورًا من غير ما تضطر تعرف طول الكلمة الأول!',
        },
      ],
    },
    {
      id: 'nb-3-1-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-3-1',
        label: 'السلاسل النصية (Strings)',
        children: [
          {
            id: 'mm-3-1-idx',
            label: 'الفهرسة (Indexing)',
            children: [
              { id: 'mm-3-1-i1', label: 'موجب من 0 (أول حرف)' },
              { id: 'mm-3-1-i2', label: 'سالب من -1 (آخر حرف)' },
            ],
          },
          {
            id: 'mm-3-1-ops',
            label: 'العمليات والدوال',
            children: [
              { id: 'mm-3-1-o1', label: 'len(): حساب الطول' },
              { id: 'mm-3-1-o2', label: 'in: البحث داخل النص' },
              { id: 'mm-3-1-o3', label: 'upper(): تحويل لحروف كبيرة' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-3-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g31-1', termAr: 'السلسلة النصية', termEn: 'String', definition: 'مجموعة من الحروف أو الأرقام أو الرموز داخل علامتي تنصيص.' },
        { id: 'g31-2', termAr: 'الفهرسة', termEn: 'Indexing', definition: 'تحديد موقع العنصر أو الحرف بدءًا من 0 (موجب) أو -1 من النهاية (سالب).' },
        { id: 'g31-3', termAr: 'دالة الطول', termEn: 'len()', definition: 'دالة مدمجة في Python تعيد عدد العناصر أو الحروف.' },
      ],
    },
  ],
  sources: [
    { id: 's31-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'السلاسل النصية Strings والفهرسة', pages: 'ص 31–33' },
    { id: 's31-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٣.١', detail: 'فهرسة "hello" ودوال النصوص' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '3.2',
    label: 'الدرس الجاي: القوائم Lists',
    description: 'خزّن أكثر من قيمة في متغير واحد وأضف واحذف بـ append و remove.',
  },
};
