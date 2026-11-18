import type { LessonPack } from '@/types/curriculum';

export const LESSON_2_1: LessonPack = {
  id: '2.1',
  stationId: 'station-2',
  unitId: 'unit-1',
  order: 1,
  title: 'رموز خرائط التدفق والمسار التسلسلي والشرطي',
  subtitle: 'ارسم خطوات الحل بالأشكال الهندسية القياسية واكتب أول خوارزمية شرطية',
  durationMin: 9,
  contentVersion: 3,
  access: 'free',
  status: 'ready',
  objectives: [
    'تعرف معنى الخوارزمية (Algorithm) وتذكر مثالًا عمليًا لها.',
    'تميّز وظائف أشكال خريطة التدفق الأربعة: البيضاوي، المستطيل، متوازي الأضلاع، والمعيّن.',
    'تتوقّع مخرجات خوارزمية شرطية وتكتشف أخطاء رموز خرائط التدفق وتطبقها بلغة Python.',
  ],
  cards: [
    {
      id: '2.1-c1',
      title: 'البداية والهدف',
      role: 'hero',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-hero',
          type: 'heroHook',
          data: {
            title: 'الخوارزميات وخرائط التدفق Flowchart',
            durationMin: 9,
            stationLabel: 'المحطة ٢ · الدرس ١ من ٤',
            goal: 'تتعلّم معنى الخوارزمية وأشكال خرائط التدفق الأربعة وتبني خوارزمية تسلسلية وشرطية.',
            hook: 'تخيل عايز تعمل كوباية شاي: بتغلي المية الأول، وبعدين تحط الشاي والسكر بالترتيب. في البرمجة الترتيب المنطقي ده اسمه «خوارزمية» (Algorithm)، ولما نرسمه بأشكال هندسية يبقى اسمه «خريطة تدفق» (Flowchart)!',
            image: '/media/robot-path.png',
            starterChallenge: {
              prompt: 'لو بترسم خريطة تدفق لبرنامج نجاح، سؤال «هل `score >= 50`؟» يتحط جوه مستطيل ولا معيّن؟',
              options: [
                {
                  id: 'sc-a',
                  text: 'المستطيل — لأنه خطوة من خطوات البرنامج',
                  isCorrect: false,
                  feedback: 'المستطيل للعمليات الحسابية والخطوات الثابتة بدون تفرع، أما الأسئلة اللي ليها مسارين (نعم/لا) فتحتاج شكل القرار.',
                },
                {
                  id: 'sc-b',
                  text: 'المعيّن — لأنه قرار بيتفرع لمسار نعم أو لا',
                  isCorrect: true,
                  feedback: 'تفكير سليم! المعيّن (Diamond) مخصص دائمًا للشروط والقرارات التي يتفرع عندها المسار.',
                },
                {
                  id: 'sc-c',
                  text: 'متوازي الأضلاع — لأننا بنفحص درجة داخلة',
                  isCorrect: false,
                  feedback: 'متوازي الأضلاع لقراءة المدخلات أو طباعة المخرجات فقط، بينما فحص الشرط نفسه يوضع داخل المعيّن.',
                },
              ],
              revealNote: 'في خرائط التدفق القياسية، كل شكل هندسي ليه وظيفة واحدة ثابتة عشان أي مبرمج يفهم الرسمة من نظرة واحدة.',
            },
          },
        },
      ],
    },
    {
      id: '2.1-c2',
      title: 'استكشف أشكال خريطة التدفق الأربعة',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-video',
          type: 'mediaPlayer',
          data: {
            kind: 'video',
            title: 'فيديو وايت بورد (٧٦ ثانية): التتبع الحي لرموز خريطة التدفق',
            src: '/media/video-2-1.mp4',
            vttSrc: '/media/caption-2-1.vtt',
            durationSec: 76,
            transcript:
              'خريطة التدفق بترسم خطوات الحل بأشكال هندسية قياسية من البداية للنهاية.\n' +
              'أول شكل هو الشكل البيضاوي ومخصص دائمًا للبداية والنهاية Start و End.\n' +
              'ننزل بسهم لمتوازي الأضلاع عشان نقرأ المدخلات زي قراءة الدرجة Input score.\n' +
              'متوازي الأضلاع بيستخدم للإدخال ولطباعة المخرجات فقط.\n' +
              'بعدها بنوصل للمعيّن وهو شكل اتخاذ القرار وفحص الشرط score >= 50.\n' +
              'المعيّن بيخرج منه سهمين: مسار نعم True ومسار لا False.\n' +
              'لو الشرط تحقق بنطبع ناجح Pass ولو لم يتحقق بنطبع راسب Fail.\n' +
              'المسارين بيتقابلوا في النهاية داخل شكل بيضاوي End لإنهاء الخريطة.\n' +
              'قاعدة ذهبية: المستطيل مخصص للعمليات الحسابية والمعالجة فقط ولا يتحول لشرط أو إدخال.\n' +
              'كل شكل قياسي له وظيفة واحدة ثابتة عشان أي مبرمج يفهم خريطة التدفق من أول نظرة.',
          },
        },
        {
          id: '2.1-def',
          type: 'richText',
          data: {
            heading: 'الخوارزمية (Algorithm) وخرائط التدفق (Flowcharts)',
            body: '**الخوارزمية** هي مجموعة خطوات مرتبة منطقيًا لحل مشكلة معينة، ولما نرسمها بأشكال قياسية وأسهم توضح اتجاه التنفيذ تتحول إلى **خريطة تدفق (Flowchart)**.',
          },
        },
        {
          id: '2.1-shapes-flips',
          type: 'flipCards',
          data: {
            heading: 'أشكال خريطة التدفق القياسية (ص ١٨–٢٠)',
            instruction: 'اقلب البطاقات الأربع لتكتشف وظيفة كل شكل هندسي ومثاله في Python.',
            cards: [
              {
                id: 'sh-oval',
                frontLabel: 'الشكل ١',
                frontTitle: 'الشكل البيضاوي (Oval)',
                frontHint: 'أول وآخر شكل في أي خريطة تدفق',
                backTitle: 'البداية والنهاية (Start / End)',
                backBody: 'يُستخدم مرة في أعلى الخريطة لبدء البرنامج، ومرة في نهايتها لإنهائه.',
                backExample: 'Start ← بداية الخريطة | End ← نهاية الخريطة',
              },
              {
                id: 'sh-para',
                frontLabel: 'الشكل ٢',
                frontTitle: 'متوازي الأضلاع (Parallelogram)',
                frontHint: 'للتعامل مع المستخدم (أخذ قيمة أو عرض نتيجة)',
                backTitle: 'الإدخال والإخراج (Input / Output)',
                backBody: 'نضعه عندما يقرأ البرنامج بيانات من المستخدم أو يطبع نتيجة على الشاشة.',
                backExample: 'إدخال score أو طباعة النتيجة',
                code: 'score = int(input("Score: "))\nprint(score)',
              },
              {
                id: 'sh-rect',
                frontLabel: 'الشكل ٣',
                frontTitle: 'المستطيل (Rectangle)',
                frontHint: 'للحسابات وتعيين القيم',
                backTitle: 'العمليات الحسابية والمعالجة (Process)',
                backBody: 'يُستخدم للعمليات الحسابية أو تخزين قيمة في متغير بدون تفرع.',
                backExample: 'حساب المجموع أو المتوسط',
                code: 'total = a + b',
              },
              {
                id: 'sh-diam',
                frontLabel: 'الشكل ٤',
                frontTitle: 'المعيّن (Diamond)',
                frontHint: 'يخرج منه سهمان: نعم (Yes) أو لا (No)',
                backTitle: 'اتخاذ القرار / الشرط (Decision)',
                backBody: 'يختبر شرطًا منطقيًا ويتفرع منه مساران حسب تحقق الشرط.',
                backExample: 'هل score >= 50 ؟',
                code: 'if score >= 50:\n    print("Pass")',
              },
            ],
          },
        },
      ],
    },
    {
      id: '2.1-c3',
      title: 'جرّب بنفسك: ابني خريطة التدفق',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-flow',
          type: 'orderFlowBuilder',
          data: {
            mode: 'flowchart',
            prompt: 'رتّب رموز خريطة التدفق لبرنامج يقرأ درجة المتعلم ويطبع «ناجح» إذا كانت >= 50:',
            items: [
              { id: 'f1', label: 'البداية (Start)', shape: 'oval' },
              { id: 'f2', label: 'أدخل الدرجة score', shape: 'parallelogram' },
              { id: 'f3', label: 'هل score >= 50 ؟', shape: 'diamond' },
              { id: 'f4', label: 'اطبع النتيجة', shape: 'parallelogram' },
              { id: 'f5', label: 'النهاية (End)', shape: 'oval' },
            ],
            correctOrder: ['f1', 'f2', 'f3', 'f4', 'f5'],
            feedback: {
              correct: 'ممتاز! البداية بالبيضاوي، الإدخال بالمتوازي، الشرط بالمعيّن، ثم الإخراج والنهاية.',
              incorrect: 'ابدأ بالبيضاوي (Start)، ثم متوازي الأضلاع للإدخال، ثم المعيّن لفحص الشرط، ثم الإخراج والنهاية.',
            },
          },
        },
      ],
    },
    {
      id: '2.1-c4',
      title: 'نقطة فحص: تمييز رموز الخريطة',
      role: 'concept',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-q1',
          type: 'quizQuestion',
          data: {
            question: 'في خريطة تدفق لحساب مجموع رقمين `total = a + b`، أي شكل هندسي نضع بداخله هذه العملية الحسابية؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٨',
            options: [
              {
                id: 'a',
                text: 'الشكل البيضاوي (Oval)',
                isCorrect: false,
                feedback: 'الشكل البيضاوي يقتصر على Start و End فقط ولا يوضع فيه حسابات.',
              },
              {
                id: 'b',
                text: 'المستطيل (Rectangle)',
                isCorrect: true,
                feedback: 'إجابة دقيقة! المستطيل هو الشكل القياسي لكل العمليات الحسابية والمعالجة مثل total = a + b.',
              },
              {
                id: 'c',
                text: 'المعيّن (Diamond)',
                isCorrect: false,
                feedback: 'المعيّن يُستخدم فقط عند وجود سؤال أو شرط يتفرع لمسارين مثل >= 50.',
              },
              {
                id: 'd',
                text: 'متوازي الأضلاع (Parallelogram)',
                isCorrect: false,
                feedback: 'متوازي الأضلاع لقراءة المدخلات أو طباعة النتيجة، بينما عملية الجمع نفسها معالجة داخل مستطيل.',
              },
            ],
            explanation: 'المستطيل (Rectangle) مخصص للعمليات الحسابية والمعالجة، بينما متوازي الأضلاع للإدخال والإخراج والمعيّن للقرار.',
          },
        },
      ],
    },
    {
      id: '2.1-c5',
      title: 'توقّع المخرجات قبل التشغيل (PRIMM)',
      role: 'example',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-predict',
          type: 'predictOutput',
          data: {
            title: 'ماذا يفعل الشرط مع الرقم 0؟',
            prompt: 'اقرأ الكود التالي وتوقّع ماذا سيطبع على الشاشة عندما تكون قيمة `num = 0`:',
            code: 'num = 0\nif num > 0:\n    print("Positive number")\nelse:\n    print("Negative or zero")',
            expectedOutput: 'Negative or zero',
            options: [
              {
                id: 'p1',
                text: 'Positive number',
                isCorrect: false,
                feedback: 'الشرط num > 0 يشترط أن يكون الرقم أكبر تمامًا من الصفر؛ 0 > 0 نتيجتها False.',
              },
              {
                id: 'p2',
                text: 'Negative or zero',
                isCorrect: true,
                feedback: 'توقّع سليم! لأن 0 ليس أكبر من 0، يتجه التنفيذ لمسار else ويطبع Negative or zero.',
              },
              {
                id: 'p3',
                text: '0',
                isCorrect: false,
                feedback: 'لا يوجد أمر print(num) في الكود؛ المخرجات تعتمد على نصوص print الموجودة داخل if و else.',
              },
              {
                id: 'p4',
                text: 'لن يطبع شيئًا',
                isCorrect: false,
                feedback: 'وجود فرع else يضمن تنفيذ أحد المسارين دائمًا عندما يكون الشرط False.',
              },
            ],
            explanation: 'في الخوارزمية الشرطية if/else، عندما تكون نتيجة الشرط num > 0 تساوي False عند num = 0 ينفّذ البرنامج فرع else.',
          },
        },
      ],
    },
    {
      id: '2.1-c6',
      title: 'مثال محلول: التسلسلية والشرطية في Python',
      role: 'example',
      blocks: [
        {
          id: '2.1-code-ex',
          type: 'codeView',
          data: {
            title: 'التسلسلية والشرطية في Python (ص ٢٠–٢١)',
            code: '# ١. خوارزمية تسلسلية: ترحيب بالاسم\nname = input("Enter your name: ")\nprint("Hello", name)\n\n# ٢. خوارزمية شرطية: موجب أم سالب\nnum = int(input("Enter a number: "))\nif num > 0:\n    print("Positive number")\nelse:\n    print("Negative or zero")',
            caption: 'التسلسلية بتنفذ الأوامر سطر ورا سطر من فوق لتحت، أما الشرطية بتتفرع حسب جملة if.',
            runnable: true,
          },
        },
      ],
    },
    {
      id: '2.1-c7',
      title: 'خلّي بالك! اكتشف الفخ في خريطة التدفق',
      role: 'warning',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-bug',
          type: 'spotBug',
          data: {
            mode: 'steps',
            title: 'فخ رموز خرائط التدفق',
            prompt: 'أحد المتعلمين رسم خريطة تدفق لطباعة مجموع رقمين، لكنه وضع رمزًا هندسيًا خاطئًا في إحدى الخطوات! اضغط على الخطوة الخاطئة:',
            items: [
              {
                id: 'sb1',
                text: 'الخطوة ١: وضع «البداية Start» داخل الشكل البيضاوي',
                wrongFeedback: 'البداية والنهاية مكانها الصحيح هو الشكل البيضاوي فعلًا — ابحث عن خطوة أخرى.',
              },
              {
                id: 'sb2',
                text: 'الخطوة ٢: وضع «أدخل الرقمين a و b» داخل المستطيل',
              },
              {
                id: 'sb3',
                text: 'الخطوة ٣: وضع «total = a + b» داخل المستطيل',
                wrongFeedback: 'الجمع عملية حسابية (Process)، ومكانها الطبيعي هو المستطيل فعلًا.',
              },
              {
                id: 'sb4',
                text: 'الخطوة ٤: وضع «اطبع total» داخل متوازي الأضلاع ثم النهاية في البيضاوي',
                wrongFeedback: 'الإخراج داخل متوازي الأضلاع والنهاية داخل البيضاوي خطوة صحيحة تمامًا.',
              },
            ],
            bugItemId: 'sb2',
            fixedLine: 'الخطوة ٢: وضع «أدخل الرقمين a و b» داخل متوازي الأضلاع (Parallelogram)',
            fixExplanation: 'المستطيل مخصص للعمليات الحسابية فقط؛ أما أي إدخال (Input) أو إخراج (Output) فلازم يتوضع داخل متوازي الأضلاع.',
          },
        },
      ],
    },
    {
      id: '2.1-c8',
      title: 'جرّب بنفسك: أكمل الخوارزمية الشرطية',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-codelab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل الخوارزمية الشرطية (موجب أم سالب)',
            prompt: 'أكمل الكلمة المفتاحية الناقصة مكان `___` لاختبار هل الرقم المدخل موجب أم لأ، وبعدين شغّل الاختبار.',
            starterCode:
              'num = int(input("Enter a number: "))\n___ num > 0:\n    print("Positive")\nelse:\n    print("Not positive")',
            solutionCode:
              'num = int(input("Enter a number: "))\nif num > 0:\n    print("Positive")\nelse:\n    print("Not positive")',
            quickChips: ['if', 'elif', 'else', 'while'],
            checks: [
              { id: 'pos', label: 'الرقم 9 -> Positive', stdin: ['9'], expectedOutputRegex: 'Positive' },
              { id: 'neg', label: 'الرقم -3 -> Not positive', stdin: ['-3'], expectedOutputRegex: 'Not positive' },
            ],
            hint: 'ابدأ الشرط بكلمة if قبل num > 0: لتكتمل الجملة الشرطية.',
            hints: [
              'الهدف: نختبر هل قيمة المتغير num أكبر من الصفر قبل تنفيذ السطر الذي يطبع "Positive".',
              'الجملة الشرطية الأولى في Python تبدأ بكلمة الشرط قبل المقارنة num > 0: وتقابلها else في الحالة العكسية.',
              'استبدل ___ بالكلمة if (بحروف صغيرة) ليصبح السطر: if num > 0:.',
            ],
          },
        },
      ],
    },
    {
      id: '2.1-c9',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '2.1-q2',
          type: 'quizQuestion',
          data: {
            question: 'برنامج لآلة تذاكر يقرأ المبلغ أولًا، ثم يفحص هل المبلغ كافٍ أم لا ليطبع التذكرة أو يطلب إكمال المبلغ. ما نوع الخوارزمية المستخدمة؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٢٨–٢٩',
            options: [
              {
                id: 'a',
                text: 'خوارزمية تسلسلية فقط',
                isCorrect: false,
                feedback: 'التسلسلية تنفذ الخطوات بترتيب واحد ثابت دون فحص شرط؛ هنا توجد حالة نعم وحالة لا.',
              },
              {
                id: 'b',
                text: 'خوارزمية تكرارية',
                isCorrect: false,
                feedback: 'التكرارية تعيد تنفيذ أمر عدة مرات بحلقة for أو while، وهنا القرار يتم لمرة واحدة عند الدفع.',
              },
              {
                id: 'c',
                text: 'خوارزمية شرطية',
                isCorrect: true,
                feedback: 'ممتاز! وجود فحص شرطي يفرّع التنفيذ إلى مسارين (طباعة التذكرة أو طلب الإكمال) يعني خوارزمية شرطية.',
              },
              {
                id: 'd',
                text: 'خوارزمية ترتيب',
                isCorrect: false,
                feedback: 'الترتيب ينظم قائمة عناصر تصاعديًا أو أبجديًا ولا يتعلق بفحص شرط التذكرة.',
              },
            ],
            explanation: 'أي برنامج يتفرع مساره بناءً على تحقق شرط (مثل كفاية المبلغ أو score >= 50) هو خوارزمية شرطية.',
          },
        },
      ],
    },
    {
      id: '2.1-c10',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '2.1-sum-img',
          type: 'imageBlock',
          data: {
            src: '/media/infographic-2-1.png',
            alt: 'إنفوجرافيك أشكال خرائط التدفق القياسية (Flowchart Symbols)',
            caption: 'لوحة مرئية ملخصة للرموز الهندسية القياسية الأربعة ووظيفة كل شكل.',
            aspectRatio: '16/9',
          },
        },
        {
          id: '2.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: 'الخوارزمية هي خطوات مرتبة منطقيًا للحل، وخريطة التدفق بترسمها بـ ٤ أشكال قياسية: **البيضاوي** (بداية/نهاية)، **متوازي الأضلاع** (إدخال/إخراج)، **المستطيل** (عمليات)، و**المعيّن** (قرار). وعرفنا أول نوعين: **التسلسلية** و**الشرطية**. في الدرس الجاي هنكمّل باقي الأنواع: التكرار والبحث والترتيب!',
          },
        },
      ],
    },
  ],
  summary:
    'تعلمنا تعريف الخوارزمية ورموز خرائط التدفق الأربعة، وطبقنا الخوارزمية التسلسلية والشرطية.',
  additionalSources: [
    {
      id: 'nb-2-1-summary',
      type: 'summary',
      title: 'ملخص سريع (NotebookLM)',
      content: 'الخوارزمية هي خطة الحل المرتبة، وخريطة التدفق بترسم الخطة دي بأشكال قياسية عالمية قبل كتابة الكود.',
      bullets: [
        'الشكل البيضاوي (Oval) = البداية والنهاية.',
        'متوازي الأضلاع (Parallelogram) = الإدخال والإخراج.',
        'المستطيل (Rectangle) = العمليات الحسابية والمعالجة.',
        'المعيّن (Diamond) = اتخاذ القرار / الشرط.',
      ],
    },
    {
      id: 'nb-2-1-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-2-1-1',
          question: 'إيه الفرق بين الخوارزمية وخريطة التدفق؟',
          answer: 'الخوارزمية هي الخطوات المكتوبة بالكلام أو الرموز المرتبة، وخريطة التدفق هي الرسم الهندسي لنفس الخطوات بالأشكال والأسهم.',
        },
        {
          id: 'faq-2-1-2',
          question: 'ينفع نستخدم المستطيل للإدخال أو الطباعة؟',
          answer: 'لا! الإدخال والطباعة (الإخراج) لهم شكل متوازي الأضلاع بس، والمستطيل للعمليات الحسابية مثل sum = a + b.',
        },
        {
          id: 'faq-2-1-3',
          question: 'إمتى الخوارزمية تبقى شرطية مش تسلسلية؟',
          answer: 'لما يبقى فيها قرار (مثل if num > 0:) يخلي البرنامج يمشي في مسار من اتنين حسب النتيجة.',
        },
      ],
    },
    {
      id: 'nb-2-1-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-2-1',
        label: 'خرائط التدفق وأول خوارزميتين',
        children: [
          {
            id: 'mm-2-1-shapes',
            label: 'رموز خريطة التدفق',
            children: [
              { id: 'mm-2-1-s1', label: 'بيضاوي: Start / End' },
              { id: 'mm-2-1-s2', label: 'متوازي أضلاع: Input / Output' },
              { id: 'mm-2-1-s3', label: 'مستطيل: Process' },
              { id: 'mm-2-1-s4', label: 'معيّن: Decision' },
            ],
          },
          {
            id: 'mm-2-1-types',
            label: 'أول نوعين من الخوارزميات',
            children: [
              { id: 'mm-2-1-t1', label: 'تسلسلية (خطوة تلو الأخرى)' },
              { id: 'mm-2-1-t2', label: 'شرطية (if / else)' },
            ],
          },
        ],
      },
    },
    {
      id: 'nb-2-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g21-1', termAr: 'الخوارزمية', termEn: 'Algorithm', definition: 'مجموعة من الخطوات المرتبة والمنطقية لحل مشكلة معينة.' },
        { id: 'g21-2', termAr: 'خريطة التدفق', termEn: 'Flowchart', definition: 'تمثيل رسومي لخطوات الخوارزمية باستخدام أشكال هندسية قياسية وأسهم.' },
        { id: 'g21-3', termAr: 'الخوارزمية التسلسلية', termEn: 'Sequential Algorithm', definition: 'تنفيذ الأوامر بالترتيب من أعلى إلى أسفل دون تفرع.' },
        { id: 'g21-4', termAr: 'الخوارزمية الشرطية', termEn: 'Conditional Algorithm', definition: 'تحديد مسار التنفيذ بناءً على تحقق شرط باستخدام if / else.' },
      ],
    },
  ],
  sources: [
    { id: 's21-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'الدرس ٢: خرائط التدفق والخوارزميات التسلسلية والشرطية', pages: 'ص 18–21' },
    { id: 's21-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٢.١', detail: 'دليل الأشكال الهندسية الأربعة والفارق بين التسلسلية والشرطية' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '2.2',
    label: 'الدرس الجاي: خوارزميات التكرار والبحث والترتيب',
    description: 'استكشف الأنواع الخمسة كلها في بطاقات منظمة وجرّب البحث والترتيب في Python.',
  },
};
