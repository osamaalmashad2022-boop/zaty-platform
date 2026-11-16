import type { LessonPack } from '@/types/curriculum';

export const LESSON_3_4: LessonPack = {
  id: '3.4',
  stationId: 'station-3',
  unitId: 'unit-1',
  order: 4,
  title: 'مشروع عملي: أداة فحص قوة كلمة المرور وفلترة الأسماء',
  subtitle: 'ادمج القوائم والنصوص والحلقات و break في برنامجين حقيقيين من الكتاب',
  durationMin: 10,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
  objectives: [
    'تفهم خطوات مشروع فحص قوة كلمة المرور وتحويل النص لقائمة حروف chars = list(password).',
    'تفسّر دور break في إيقاف الحلقة فور تحقق الشرط لمنع الفحص الزائد.',
    'تكتب برنامج فلترة أسماء تبدأ بحرف "A" وبرنامج فحص شروط كلمة المرور.',
  ],
  cards: [
    {
      id: '3.4-c1',
      title: 'البداية والهدف',
      role: 'hero',
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
          },
        },
      ],
    },
    {
      id: '3.4-c2',
      title: 'مشروع الكتاب: فحص قوة كلمة المرور + دور break',
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
      id: '3.4-c3',
      title: 'تطبيق عملي ٢ + جرّب بنفسك',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '3.4-filter-view',
          type: 'codeView',
          data: {
            title: 'تطبيق عملي ٢ (ص ٣٦–٣٧): طباعة الأسماء التي تبدأ بحرف "A"',
            code: 'names = ["Ahmed", "Ali", "Sara", "Alaa"]\nfor name in names:\n    if name[0] == "A":\n        print(name)',
            caption: 'name[0] بتفحص أول حرف من كل اسم جوه القائمة.',
            runnable: true,
          },
        },
        {
          id: '3.4-lab',
          type: 'codeLab',
          data: {
            mode: 'freeRun',
            title: 'مختبر مشروع كلمة المرور المختصر',
            prompt:
              'اكتب برنامجًا يفحص كلمة سر `pwd = input()` ويحسب `score`: نقطة لو `len(pwd) >= 6`، ونقطة لو لقى رمز من `"@#$%&"` جوه حلقة مع `break`، وفي الآخر اطبع قيمة `score` لوحدها بـ `print(score)`.',
            starterCode:
              'pwd = input("Password: ")\nsymbols = "@#$%&"\nscore = 0\n# افحص الطول ووجود رمز مع break واطبع score\n',
            solutionCode:
              'pwd = input("Password: ")\nsymbols = "@#$%&"\nscore = 0\nif len(pwd) >= 6:\n    score += 1\nfor ch in pwd:\n    if ch in symbols:\n        score += 1\n        break\nprint(score)',
            checks: [
              { id: 'pwd-1', label: 'كلمة Hello1 -> النتيجة 1', stdin: ['Hello1'], expectedOutputRegex: '^1$' },
              { id: 'pwd-2', label: 'كلمة Hello@1 -> النتيجة 2', stdin: ['Hello@1'], expectedOutputRegex: '^2$' },
            ],
            hint: 'لا تنسَ break جوه حلقة البحث عن الرمز علشان مايزوّدش score أكتر من مرة لو في رمزين.',
          },
        },
      ],
    },
    {
      id: '3.4-c4',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '3.4-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'ليه break ضرورية في حلقة فحص الرمز أو الرقم؟',
            body: 'لو كلمة السر فيها رقمين مثلًا بدون `break`، الحلقة هتزوّد `score` مرتين على نفس الشرط! **`break`** بتوقف الحلقة عند أول تحقق للشرط وتتجنب الفحص الزائد.',
          },
        },
      ],
    },
    {
      id: '3.4-c5',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '3.4-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما الغرض من استخدام break داخل الحلقة التكرارية في برنامج فحص كلمة المرور؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٤١',
            options: [
              { id: 'a', text: 'تكرار الحلقة بلا نهاية', isCorrect: false, feedback: 'العكس، break بتوقف الحلقة.' },
              { id: 'b', text: 'التوقف عند أول تحقق للشرط وتجنب الفحص الزائد', isCorrect: true, feedback: 'إجابة صحيحة!' },
              { id: 'c', text: 'حذف العنصر من القائمة', isCorrect: false, feedback: 'الحذف بـ remove().' },
              { id: 'd', text: 'إضافة عنصر جديد للقائمة', isCorrect: false, feedback: 'الإضافة بـ append().' },
            ],
            explanation: 'break تنهي الحلقة فور تحقق الشرط لمنع الحساب المتكرر والفحص الزائد.',
          },
        },
        {
          id: '3.4-q2',
          type: 'quizQuestion',
          data: {
            question: 'في تطبيق فلترة الأسماء: `if name[0] == "A":`، ماذا يختبر هذا الشرط؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٣٦–٣٧',
            options: [
              { id: 'a', text: 'هل الاسم يتكون من حرف واحد فقط', isCorrect: false, feedback: 'len(name) == 1 هي اللي بتختبر الطول.' },
              { id: 'b', text: 'هل الحرف الأول من الاسم هو "A"', isCorrect: true, feedback: 'صح! name[0] تشير لأول حرف في كل اسم.' },
              { id: 'c', text: 'هل الحرف الأخير من الاسم هو "A"', isCorrect: false, feedback: 'الحرف الأخير هو name[-1].' },
              { id: 'd', text: 'هل القائمة كلها اسمها "A"', isCorrect: false, feedback: 'name متغير يمثل اسمًا واحدًا في كل دورة.' },
            ],
            explanation: 'الفهرس [0] يشير دائمًا للحرف الأول من الاسم.',
          },
        },
      ],
    },
    {
      id: '3.4-c6',
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
