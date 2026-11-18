import type { FlashcardItem } from '@/types/curriculum';

export const STATION_1_FLASHCARDS: FlashcardItem[] = [
  // الدرس 1.1 — التفكير الحاسوبي والأركان الأربعة
  {
    id: 'fc-1-1',
    stationId: 'station-1',
    microLessonId: '1.1',
    termAr: 'التفكير الحاسوبي',
    termEn: 'Computational Thinking',
    definition:
      'أسلوب تفكير منظم يحاكي طريقة عمل الكمبيوتر في معالجة المشكلات، ويتعلمه المتعلم قبل كتابة أي برنامج لأن الحاسوب سريع التنفيذ لكنه لا يفكر بمفرده.',
    example: 'تنظيم خطوات حساب متوسط 3 درجات منطقيًا على الورق أولًا قبل فتح محرر الكود.',
  },
  {
    id: 'fc-1-2',
    stationId: 'station-1',
    microLessonId: '1.1',
    termAr: 'تحليل المشكلة',
    termEn: 'Decomposition',
    definition: 'تقسيم المشكلة أو المهمة الكبيرة إلى أجزاء صغيرة يسهل فهمها والتعامل معها.',
    example: 'تقطيع مهمة حساب متوسط الدرجات أو ترتيب حقيبة السفر لأجزاء منفصلة.',
  },
  {
    id: 'fc-1-3',
    stationId: 'station-1',
    microLessonId: '1.1',
    termAr: 'التعرف على الأنماط',
    termEn: 'Pattern Recognition',
    definition: 'ملاحظة التشابه والتكرار بين المشكلات المختلفة أو داخل المشكلة الواحدة.',
    example: 'كل مسائل حساب المتوسط تتبع نفس النمط المتكرر: جمع القيم ثم القسمة على عددها.',
  },
  {
    id: 'fc-1-4',
    stationId: 'station-1',
    microLessonId: '1.1',
    termAr: 'التجريد',
    termEn: 'Abstraction',
    definition: 'التركيز على المعلومات المهمة والمؤثرة في الحل وترك التفاصيل غير الضرورية.',
    example: 'خريطة المترو (تركز على المحطات والمسارات فقط) أو الاكتفاء بأرقام الدرجات دون أسماء المواد.',
  },
  {
    id: 'fc-1-10',
    stationId: 'station-1',
    microLessonId: '1.1',
    termAr: 'شرطا وجود مشكلة حقيقية',
    termEn: 'Problem = Goal + Obstacle',
    definition: 'يشترط لوجود مشكلة حقيقية توفر ركنين معًا: هدف مطلوب الوصول إليه، وعائق يمنع الوصول المباشر إليه.',
    example: 'رغبة المتعلم في حساب متوسط 3 درجات بدقة (هدف) مع وجود صعوبة في إيجاد الناتج فورًا بلا خطوات منظمة (عائق).',
  },
  {
    id: 'fc-1-11',
    stationId: 'station-1',
    microLessonId: '1.1',
    termAr: 'تصميم الخوارزمية',
    termEn: 'Algorithm Design',
    definition: 'وضع خطوات محددة ومرتبة منطقيًا للوصول إلى حل المشكلة؛ ترتيب الخطوات شرط أساسي لصحة التنفيذ.',
    example: '١. أدخل 3 درجات ← ٢. اجمعها ← ٣. اقسم المجموع على 3 ← ٤. اعرض الناتج.',
  },
  // الدرس 1.2 — خطوات حل المشكلة الخمس وربطها بالتفكير الحاسوبي
  {
    id: 'fc-1-5',
    stationId: 'station-1',
    microLessonId: '1.2',
    termAr: 'خطوات حل المشكلة الخمس',
    termEn: '5 Problem Solving Steps',
    definition:
      '١. فهم المشكلة (تحليل)، ٢. تحديد المدخلات والمخرجات (تجريد)، ٣. وضع الخوارزمية (أنماط وخوارزمية)، ٤. تحويل الحل إلى كود، ٥. اختبار الحل.',
  },
  {
    id: 'fc-1-12',
    stationId: 'station-1',
    microLessonId: '1.2',
    termAr: 'تخطي الخطوة ٢ (المدخلات والمخرجات)',
    termEn: 'Step 2 Neglect Trap',
    definition:
      'ينهار البرنامج أثناء التشغيل نتيجة عدم تحديد نوع المدخلات المطلوبة وحدودها المقبولة بدقة قبل كتابة الكود.',
    example: 'السماح بنص مثل "عشرة" بدل رقم في خانة السعر أو الخصم يؤدي لتوقف البرنامج.',
  },
  {
    id: 'fc-1-13',
    stationId: 'station-1',
    microLessonId: '1.2',
    termAr: 'إهمال الخطوة ٥ (اختبار الحل)',
    termEn: 'Edge-Case Testing',
    definition:
      'تخطي اختبار الحل خطأ جسيم يترك ثغرات خفية عند الحالات الحدية، لذا يجب الاختبار بأرقام متنوعة (الصفر، السالب، ونسبة 100%).',
    example: 'تجربة خصم -50 أو خصم 100% على فاتورة 1000 جنيه للتأكد من سلامة المعادلة.',
  },
  // الدرس 1.3 — المدخلات وتحويل int وباقي القسمة %
  {
    id: 'fc-1-6',
    stationId: 'station-1',
    microLessonId: '1.3',
    termAr: 'معامل باقي القسمة (%)',
    termEn: 'Modulo Operator (%)',
    definition:
      'معامل حسابي يعيد المتبقي بعد القسمة الصحيحة؛ يُستخدم لفحص الزوجي والفردي ومسائل التوزيع (مثل 25 % 4 = 1).',
    code: 'if num % 2 == 0:\n    print("Even number")\nelse:\n    print("Odd number")',
  },
  {
    id: 'fc-1-7',
    stationId: 'station-1',
    microLessonId: '1.3',
    termAr: 'خطأ قيمة الإدخال (ValueError)',
    termEn: 'ValueError in int(input())',
    definition:
      'دالة input() ترجع نصًا (String) دائمًا، وتحاول int() تحويله لعدد صحيح؛ فإذا أدخل المستخدم حروفًا مثل "خمسة" يظهر خطأ ValueError.',
    code: 'num = int(input())  # "خمسة" -> ValueError',
  },
  {
    id: 'fc-1-14',
    stationId: 'station-1',
    microLessonId: '1.3',
    termAr: 'الفرق الحاسم بين = و ==',
    termEn: 'Assignment (=) vs Comparison (==)',
    definition:
      'علامة = الواحدة تُستخدم لتعيين وتخزين قيمة في متغير، بينما علامة == المزدوجة تُستخدم للمقارنة واختبار المساواة داخل شرط if.',
    code: 'x = 5\nif x == 5:\n    print("Equal")',
  },
  // الدرس 1.4 — الدقة العشرية float والأقواس والمقارنة
  {
    id: 'fc-1-8',
    stationId: 'station-1',
    microLessonId: '1.4',
    termAr: 'الأعداد العشرية (float) vs قص الكسر (int)',
    termEn: 'float() vs int() Truncation',
    definition:
      'تقص int() الجزء العشري بالكامل بلا تقريب (int(89.9) = 89 فتفقد الدقة)، بينما تحافظ float() على الكسر العشري وتستقبل الصحيح والعشري معًا.',
    code: 'int(89.9)    # 89\nfloat(89.9)  # 89.9',
  },
  {
    id: 'fc-1-15',
    stationId: 'station-1',
    microLessonId: '1.4',
    termAr: 'أولوية العمليات والأقواس',
    termEn: 'Operator Precedence',
    definition:
      'القسمة (/) تسبق الجمع (+) في أولوية العمليات؛ بدون أقواس يقسم Python الرقم الأخير c على 3 فقط ثم يجمع عليه a و b.',
    code: 'avg = (a + b + c) / 3  # صحيح\n# a + b + c / 3        # خطأ منطقي',
  },
  {
    id: 'fc-1-16',
    stationId: 'station-1',
    microLessonId: '1.4',
    termAr: 'حالة التساوي في شرط if a > b',
    termEn: 'Equality Fallthrough to else',
    definition:
      'العلامة > تختبر «أكبر تمامًا»؛ فإذا أدخل المتعلم رقمين متساويين (مثل a = 10 و b = 10)، يكون ناتج الشرط False وينفّذ البرنامج فرع else.',
    code: 'if a > b:\n    print("Larger =", a)\nelse:\n    print("Larger =", b)',
  },
  // الدرس 1.5 — حلقة for و range ونشاط الكتاب
  {
    id: 'fc-1-9',
    stationId: 'station-1',
    microLessonId: '1.5',
    termAr: 'النطاق نصف المفتوح range(a, b)',
    termEn: 'for / range(start, stop)',
    definition:
      'يشمل بداية النطاق a ويتوقف قبل النهاية b مباشرة؛ فمثلاً range(1, 6) يولّد الأعداد 1، 2، 3، 4، 5 فقط.',
    code: 'total = 0\nfor i in range(1, 6):\n    total += i\nprint("Sum =", total)',
  },
  {
    id: 'fc-1-17',
    stationId: 'station-1',
    microLessonId: '1.5',
    termAr: 'قانون عدد اللفات وفخ range(3, 3)',
    termEn: 'Loop Count = b - a',
    definition:
      'عدد اللفات في range(a, b) بالخطوة 1 يساوي b - a؛ وعند تساوي البداية والنهاية مثل range(3, 3) يكون عدد اللفات 0 ولا يدخل البرنامج الحلقة أبدًا.',
    code: 'for i in range(3, 3):\n    print(i)  # 0 لفات - لا يطبع شيئًا',
  },
  {
    id: 'fc-1-18',
    stationId: 'station-1',
    microLessonId: '1.5',
    termAr: 'تهيئة وعاء التجميع (total = 0)',
    termEn: 'Accumulator Initialization & NameError',
    definition:
      'تعريف total = 0 قبل الحلقة يهيّئ وعاء التجميع بقيمة ابتدائية ويمنع توقف البرنامج بخطأ NameError عند تنفيذ total += i.',
    code: 'total = 0\nfor i in range(1, 6):\n    total += i',
  },
  {
    id: 'fc-1-19',
    stationId: 'station-1',
    microLessonId: '1.5',
    termAr: 'أثر المسافة البادئة على print()',
    termEn: 'Indentation Scope Trap',
    definition:
      'كتابة print() بمسافة بادئة داخل الحلقة تطبع الناتج مع كل لفة، بينما كتابتها بدون مسافة بادئة خارج الحلقة تطبع النتيجة النهائية مرة واحدة فقط.',
    code: 'for i in range(1, 6):\n    total += i\nprint(total)  # يطبع 15 مرة واحدة في النهاية',
  },
  {
    id: 'fc-1-20',
    stationId: 'station-1',
    microLessonId: '1.5',
    termAr: 'نشاط نجاح المتعلم (٣ درجات)',
    termEn: 'Station 1 Capstone Condition',
    definition:
      'نجمع 3 درجات بحلقة for داخل total ثم نحسب المتوسط avg = total / 3 ونطبّق شرط النجاح الحدي avg >= 50 لقبول الدرجة 50 تمامًا.',
    code: 'avg = total / 3\nif avg >= 50:\n    print("ناجح")',
  },
];
