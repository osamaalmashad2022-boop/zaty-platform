import type { LessonPack } from '@/types/curriculum';

export const LESSON_3_4: LessonPack = {
  id: '3.4',
  stationId: 'station-3',
  unitId: 'unit-1',
  order: 4,
  title: 'مشروع عملي: أداة فحص قوة كلمة المرور وفلترة الأسماء',
  subtitle: 'ادمج القوائم والنصوص والحلقات و break في برنامجين حقيقيين من الكتاب',
  durationMin: 10,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تفهم خطوات مشروع فحص قوة كلمة المرور وتحويل النص لقائمة حروف chars = list(password).',
    'تفسّر دور break في إيقاف الحلقة فور تحقق الشرط لمنع تضخم score.',
    'تكتب برنامج فلترة أسماء تبدأ بحرف "A" وبرنامج فحص شروط كلمة المرور.',
  ],
  cards: [
    {
      id: '3.4-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '3.4-hero',
          type: 'heroHook',
          data: {
            title: 'مشروعك الأمني: فاحص كلمة المرور',
            durationMin: 10,
            stationLabel: 'المحطة ٣ · الدرس ٤ من ٤',
            goal: 'تفهم وتجرّب مشروع الكتاب لفحص قوة كلمة المرور، مع استخدام break وفلترة الأسماء.',
            hook: 'شفت قبل كده وإنت بتعمل حساب جديد شريط بيقولك «كلمة المرور ضعيفة» أو «قوية جدًا» لما تحط رمز وحرف كبير ورقم؟ النهاردة هتشوف الكود الحقيقي اللي ورا الميزة دي!',
            image: '/media/robot-shield.png',
            starterChallenge: {
              prompt: 'لو كلمة سر فيها رمزين `@#` وشغّلنا حلقة فحص الرموز بدون `break`، عداد القوة `score` هيزيد نقطة واحدة ولا نقطتين؟',
              options: [
                {
                  id: 'sc-a',
                  text: 'نقطة واحدة فقط — لأن نوع الشرط هو وجود رموز وخلاص',
                  isCorrect: false,
                  feedback: 'الكمبيوتر بينفذ حرفًا حرفًا؛ من غير break الحلقة هتكمل وتشوف @ ثم # وتزيد score مرتين!',
                },
                {
                  id: 'sc-b',
                  text: 'نقطتين — نقطة على @ ونقطة إضافية على #',
                  isCorrect: true,
                  feedback: 'نظرة مبرمج! بدون break يتكرر الجمع لكل رمز مطابق، وده السبب إننا بنحط break للخروج فور أول رمز.',
                },
                {
                  id: 'sc-c',
                  text: 'صفر — لأن الحلقة تتوقف لو لم تجد break',
                  isCorrect: false,
                  feedback: 'الحلقة تعمل طبيعيًا بدون break، لكن وظيفة break هي كسرها عند أول تطابق لمنع احتساب الشرط أكثر من مرة.',
                },
              ],
              revealNote: 'أمر break هنا بيضمن العدل والدقة: لكل شرط نقطة واحدة مهما تكررت الرموز أو الأرقام.',
            },
          },
        },
      ],
    },
    {
      id: '3.4-c2',
      title: 'خريطة شروط كلمة المرور القوية',
      role: 'concept',
      blocks: [
        {
          id: '3.4-steps',
          type: 'processStepper',
          data: {
            heading: 'الأدوات الأربع قبل قراءة الكود الكامل',
            steps: [
              {
                id: 'st-1',
                title: '١. فحص الطول >= 8',
                detail: 'نحوّل كلمة السر لقائمة حروف `list(password)` ثم نفحص طولها بـ `len(chars) >= 8`.',
                code: 'if len(chars) >= 8:\n    score += 1',
              },
              {
                id: 'st-2',
                title: '٢. وجود رقم: isdigit()',
                detail: 'نمر على الحروف؛ دالة `ch.isdigit()` ترجع `True` لو الحرف رقم، وبعدها `break` فورًا.',
                code: 'if ch.isdigit():\n    score += 1\n    break',
              },
              {
                id: 'st-3',
                title: '٣. وجود حرف كبير: isupper()',
                detail: 'دالة `ch.isupper()` تفحص هل الحرف Capital من A إلى Z، ومع أول حرف نوقف بـ `break`.',
                code: 'if ch.isupper():\n    score += 1\n    break',
              },
              {
                id: 'st-4',
                title: '٤. وجود رمز خاص: in symbols',
                detail: 'نبحث عن وجود الحرف داخل `"@#$%&"` ونخرج بـ `break` عند أول رمز نلاقيه.',
                code: 'if ch in "@#$%&":\n    score += 1\n    break',
              },
            ],
          },
        },
      ],
    },
    {
      id: '3.4-c3',
      title: 'توقّع قبل التشغيل: ماذا يحدث عند نسيان break؟',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '3.4-predict',
          type: 'predictOutput',
          data: {
            title: 'تجربة حلقة فحص الرموز بدون break',
            prompt: 'في الكود التالي نسينا كتابة `break` داخل الحلقة. توقّع قيمة `score` المطبوعة لكلمة `"Hi@#"`:',
            code: 'symbols = "@#$%&"\nscore = 0\nfor ch in "Hi@#":\n    if ch in symbols:\n        score += 1\nprint(score)',
            expectedOutput: '2',
            options: [
              {
                id: 'p1',
                text: '1',
                isCorrect: false,
                feedback: '1 هي النتيجة لو كان في break بعد score += 1؛ هنا الحلقة كملت وفحصت الرمز التاني # كمان.',
              },
              {
                id: 'p2',
                text: '2',
                isCorrect: true,
                feedback: 'صح! الحلقة لقت @ فزادت score إلى 1، ثم كملت ولقت # فزادت score إلى 2!',
              },
              {
                id: 'p3',
                text: '4',
                isCorrect: false,
                feedback: 'الكلمة فيها ٤ حروف لكن H و i ليست في symbols، لذلك يزيد العداد عند @ و # فقط.',
              },
              {
                id: 'p4',
                text: '0',
                isCorrect: false,
                feedback: 'العلامتان @ و # موجودتان داخل "@#$%&"، فيتحقق الشرط مرتين.',
              },
            ],
            explanation: 'نسيان break يسمح للحلقة بالاستمرار وإضافة نقطة لكل رمز متكرر؛ ولهذا نضع break للخروج فور أول تطابق.',
          },
        },
      ],
    },
    {
      id: '3.4-c4',
      title: 'مشروع الكتاب: فاحص قوة كلمة المرور الكامل',
      role: 'example',
      blocks: [
        {
          id: '3.4-pwd-code',
          type: 'codeView',
          data: {
            title: 'تطبيق عملي ١ (ص ٣٥–٣٦): فحص قوة كلمة المرور',
            code: 'password = input("Enter password: ")\nchars = list(password)\nscore = 0\nif len(chars) >= 8:\n    score += 1\nfor ch in chars:\n    if ch.isdigit():\n        score += 1\n        break\nfor ch in chars:\n    if ch.isupper():\n        score += 1\n        break\nsymbols = "@#$%&"\nfor ch in chars:\n    if ch in symbols:\n        score += 1\n        break\nif score == 4:\n    print("Very Strong")\nelif score == 3:\n    print("Strong")\nelif score == 2:\n    print("Medium")\nelse:\n    print("Weak")',
            caption: 'لاحظ استخدام break فور تحقق الشرط عشان ما يتحسبش الشرط مرتين ونوقف الفحص الزائد.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '3.4-c5',
      title: 'خلّي بالك! فخ الفهرسة في فلترة الأسماء',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '3.4-bug',
          type: 'spotBug',
          data: {
            mode: 'code',
            title: 'لماذا لم يُطبع أي اسم يبدأ بـ "A"؟',
            prompt: 'أردنا طباعة الأسماء التي تبدأ بحرف `"A"` لكن الكود لم يطبع شيئًا! اضغط على السطر اللي فيه الغلطة:',
            codeLines: [
              'names = ["Ahmed", "Ali", "Sara", "Alaa"]',
              'for name in names:',
              '    if name[1] == "A":',
              '        print(name)',
            ],
            bugLine: 3,
            lineFeedback: {
              1: 'تعريف قائمة الأسماء بأقواس مربعة [ ] سليم تمامًا.',
              2: 'حلقة التكرار for name in names: تمر على كل اسم بالترتيب بشكل سليم.',
              4: 'أمر print(name) سليم في مسافته البادئة.',
            },
            fixedLine: '    if name[0] == "A":',
            fixExplanation: 'name[1] يفحص الحرف الثاني من كل اسم (h في Ahmed و l في Ali)؛ لفحص الحرف الأول يجب استخدام الفهرس [0] دائمًا.',
          },
        },
      ],
    },
    {
      id: '3.4-c6',
      title: 'تطبيق عملي ٢: فلترة الأسماء السليم',
      role: 'example',
      blocks: [
        {
          id: '3.4-filter-view',
          type: 'codeView',
          data: {
            title: 'تطبيق عملي ٢ (ص ٣٦–٣٧): طباعة الأسماء التي تبدأ بحرف "A"',
            code: 'names = ["Ahmed", "Ali", "Sara", "Alaa"]\nfor name in names:\n    if name[0] == "A":\n        print(name)',
            caption: 'name[0] بتفحص أول حرف من كل اسم جوه القائمة وتطبع Ahmed و Ali و Alaa.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '3.4-c7',
      title: 'نقطة فحص: وظيفة break في المشروع',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '3.4-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما الغرض من استخدام `break` داخل الحلقة التكرارية في برنامج فحص كلمة المرور؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤١',
            options: [
              {
                id: 'a',
                text: 'تكرار الحلقة بلا نهاية',
                isCorrect: false,
                feedback: 'العكس تمامًا؛ break توقف الحلقة ولا تجعلها لا نهائية.',
              },
              {
                id: 'b',
                text: 'التوقف عند أول تحقق للشرط وتجنب الفحص والاحتساب الزائد',
                isCorrect: true,
                feedback: 'إجابة صحيحة! بمجرد وجود أول رقم أو رمز، نخرج فورًا حتى لا يزداد score أكثر من مرة.',
              },
              {
                id: 'c',
                text: 'حذف العنصر من القائمة',
                isCorrect: false,
                feedback: 'الحذف من القائمة يتم بدالة remove() وليس بأمر break.',
              },
              {
                id: 'd',
                text: 'إضافة عنصر جديد للقائمة',
                isCorrect: false,
                feedback: 'الإضافة للقائمة تتم بدالة append()، أما break فوظيفته إنهاء الحلقة.',
              },
            ],
            explanation: 'break تنهي الحلقة فور تحقق الشرط لمنع الحساب المتكرر والفحص الزائد لبقية الحروف.',
          },
        },
      ],
    },
    {
      id: '3.4-c8',
      title: 'مختبر المشروع: اكتب فاحص كلمة مرور مختصر',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.4-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'مختبر مشروع كلمة المرور المختصر',
            prompt:
              'اكتب برنامجًا يفحص كلمة سر `pwd = input()` ويحسب `score`: نقطة لو `len(pwd) >= 6`، ونقطة واحدة فقط لو لقى رمزًا من `"@#$%&"` جوه حلقة مع `break`، وفي الآخر اطبع قيمة `score` لوحدها بـ `print(score)`.',
            starterCode: 'pwd = input("Password: ")\nsymbols = "@#$%&"\nscore = 0\n',
            solutionCode:
              'pwd = input("Password: ")\nsymbols = "@#$%&"\nscore = 0\nif len(pwd) >= 6:\n    score += 1\nfor ch in pwd:\n    if ch in symbols:\n        score += 1\n        break\nprint(score)',
            quickChips: [
              'if len(pwd) >= 6:',
              '    score += 1',
              'for ch in pwd:',
              '    if ch in symbols:',
              '        score += 1',
              '        break',
              'print(score)',
            ],
            checks: [
              { id: 'pwd-1', label: 'كلمة Hello1 -> النتيجة 1', stdin: ['Hello1'], expectedOutputRegex: '^1$' },
              { id: 'pwd-2', label: 'كلمة Hello@1 -> النتيجة 2', stdin: ['Hello@1'], expectedOutputRegex: '^2$' },
              { id: 'pwd-3', label: 'كلمة Hi@#$ -> النتيجة 1 (تتطلب break)', stdin: ['Hi@#$'], expectedOutputRegex: '^1$' },
            ],
            hint: 'افحص الطول أولًا بـ if len(pwd) >= 6:، ثم في حلقة for ch in pwd: ضع break بعد score += 1.',
            hints: [
              'الهدف: منح نقطة لشرط الطول (>= 6) ونقطة واحدة فقط عند العثور على أي رمز خاص داخل symbols ثم طباعة score.',
              'نستخدم len(pwd) >= 6 لشرط الطول، وحلقة for ch in pwd: مع ch in symbols وبداخلها break حتى لا تُحسب الرموز المتعددة مرتين.',
              'اكتب: if len(pwd) >= 6: ثم score += 1، ثم for ch in pwd: وبداخلها if ch in symbols: ثم score += 1 و break، وأخيرًا print(score).',
            ],
          },
        },
      ],
    },
    {
      id: '3.4-c9',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '3.4-q2',
          type: 'quizQuestion',
          data: {
            question: 'في تطبيق فلترة الأسماء: `if name[0] == "A":`، ماذا يختبر هذا الشرط؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٣٦–٣٧',
            options: [
              {
                id: 'a',
                text: 'هل الاسم يتكون من حرف واحد فقط',
                isCorrect: false,
                feedback: 'اختبار طول الاسم يكون بدالة len(name) == 1 وليس بالفهرس [0].',
              },
              {
                id: 'b',
                text: 'هل الحرف الأول من الاسم هو "A"',
                isCorrect: true,
                feedback: 'صح! name[0] تقرأ أول حرف في كل اسم داخل الحلقة وتقارنه بالحرف "A".',
              },
              {
                id: 'c',
                text: 'هل الحرف الأخير من الاسم هو "A"',
                isCorrect: false,
                feedback: 'الحرف الأخير نفحصه بالفهرس السالب name[-1] وليس name[0].',
              },
              {
                id: 'd',
                text: 'هل القائمة كلها اسمها "A"',
                isCorrect: false,
                feedback: 'name متغير حلقة يمثل عنصرًا نصيًا واحدًا في كل دورة، و[0] تأخذ أول حرف منه فقط.',
              },
            ],
            explanation: 'الفهرس [0] يشير دائمًا للحرف الأول من السلسلة النصية، لذلك name[0] == "A" تفحص بداية كل اسم.',
          },
        },
      ],
    },
    {
      id: '3.4-c10',
      title: 'ختام المحطة الثالثة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '3.4-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'طبّقنا السلاسل النصية والقوائم والحلقات و `break` مع بعض في مشروع فحص قوة كلمة المرور وفلترة الأسماء. دلوقتي تقدر تبدأ اختبار المحطة الثالثة (٣٩ سؤالًا رسميًا)!',
          },
        },
      ],
    },
  ],
  summary: 'مشروع فحص قوة كلمة المرور وفلترة الأسماء باستخدام list() و for و break.',
  additionalSources: [
    {
      id: 'nb-3-4-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'الربط العملي بين Strings و Lists في مشروع أمني وتطبيق فلترة أسماء من الكتاب.',
      bullets: [
        'chars = list(password) تفك كلمة السر لقائمة حروف.',
        'isdigit() تفحص وجود رقم و isupper() تفحص وجود حرف كبير.',
        'break تخرج من الحلقة فور تحقق الشرط لمنع التكرار.',
        'name[0] == "A" تفحص أول حرف في كل اسم داخل القائمة.',
      ],
    },
    {
      id: 'nb-3-4-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-3-4-1',
          question: 'إيه اللي يحصل لو نسينا break في حلقة فحص الرموز؟',
          answer: 'لو كلمة السر فيها 3 رموز (زي @#$)، العداد score هيزيد 3 نقاط بدل نقطة واحدة، وده غلط في التقييم!',
        },
        {
          id: 'faq-3-4-2',
          question: 'إزاي نفلتر الأسماء اللي تبدأ بحرف تاني غير "A"؟',
          answer: 'بكل بساطة تغيّر الحرف في الشرط، مثل if name[0] == "S": لطباعة الأسماء اللي بتبدأ بـ S.',
        },
      ],
    },
    {
      id: 'nb-3-4-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-3-4',
        label: 'مشاريع النصوص والقوائم',
        children: [
          {
            id: 'mm-3-4-pwd',
            label: 'فاحص كلمة المرور',
            children: [
              { id: 'mm-3-4-p1', label: 'الطول >= 8 + رقم + حرف كبير + رمز' },
              { id: 'mm-3-4-p2', label: 'استخدام break عند أول تطابق' },
            ],
          },
          {
            id: 'mm-3-4-flt',
            label: 'فلترة الأسماء',
            children: [{ id: 'mm-3-4-f1', label: 'for name in names: if name[0] == "A":' }],
          },
        ],
      },
    },
    {
      id: 'nb-3-4-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g34-1', termAr: 'كسر الحلقة', termEn: 'break', definition: 'أمر برمجي يخرج من الحلقة التكرارية فورًا عند تحقق شرط معين.' },
        { id: 'g34-2', termAr: 'فحص الرقم', termEn: 'isdigit()', definition: 'دالة نصية ترجع True إذا كان الحرف رقمًا من 0 إلى 9.' },
        { id: 'g34-3', termAr: 'فحص الحرف الكبير', termEn: 'isupper()', definition: 'دالة نصية ترجع True إذا كان الحرف كبيرًا (Capital).' },
      ],
    },
  ],
  sources: [
    { id: 's34-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'مشروع فحص كلمة المرور وفلترة الأسماء', pages: 'ص 35–37' },
    { id: 's34-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٣.٤', detail: 'تحليل كود كلمة المرور ودور break' },
  ],
  nextStep: {
    kind: 'stationQuiz',
    targetId: 'station-3',
    label: 'ابدأ اختبار المحطة الثالثة',
    description: 'اختبر إتقانك للـ Strings و Lists في أسئلة الكتاب الرسمية (٣٩ سؤالًا).',
  },
};
