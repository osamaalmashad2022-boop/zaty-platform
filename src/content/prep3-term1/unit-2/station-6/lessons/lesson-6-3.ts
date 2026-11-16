import type { LessonPack } from '@/types/curriculum';

export const LESSON_6_3: LessonPack = {
  id: '6.3',
  stationId: 'station-6',
  unitId: 'unit-2',
  order: 3,
  title: 'بناء دالة التنبؤ predict_grade في Python',
  subtitle: 'حوّل النموذج الخطي إلى كود Python يتوقع الدرجة حسب الساعات',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'awaiting_pack',
  objectives: [
    'تفسّر دالة predict_grade(x) في Python مع معاملات w و b.',
    'تعدّل وتشغّل نموذج التنبؤ في محرر Python لقيم ساعات مختلفة.',
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
            durationMin: 8,
            stationLabel: 'المحطة ٦ · الدرس ٣ من ٣ (مسودة هيكلية)',
            goal: 'تكتب دالة predict_grade(x) بلغة Python وتحسب الدرجة المتوقعة عمليًا.',
            hook: 'جمعنا الدوال + المعادلات الرياضية — دلوقتي معادلة الذكاء الاصطناعي هتشتغل كبرنامج Python فعلي!',
          },
        },
      ],
    },
    {
      id: '6.3-c2',
      title: 'مثال ٢ من الكتاب + تطبيق CodeLab',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '6.3-code',
          type: 'codeView',
          data: {
            title: 'مثال ٢ من الكتاب (ص ٦٩–٧٠)',
            code: 'def predict_grade(x):\n    w = 5\n    b = 10\n    y = w * x + b\n    return y\n\nhours = 3\ngrade = predict_grade(hours)\nprint("Predicted:", grade)  # 25',
            caption: 'الدالة تستقبل hours = 3 وترجع 5 * 3 + 10 = 25.',
            runnable: true,
          },
        },
        {
          id: '6.3-lab',
          type: 'codeLab',
          data: {
            mode: 'fillLine',
            title: 'أكمل معادلة التنبؤ داخل predict_grade',
            prompt: 'أكمل حساب `y = w * x + b` داخل الدالة واختبر النتيجة عند `hours = 3` (النتيجة 25).',
            starterCode:
              'def predict_grade(x):\n    w = 5\n    b = 10\n    # اكتب معادلة حساب y هنا\n    return y\n\nprint(predict_grade(3))',
            solutionCode:
              'def predict_grade(x):\n    w = 5\n    b = 10\n    y = w * x + b\n    return y\n\nprint(predict_grade(3))',
            checks: [
              { id: 'pred-25', label: 'predict_grade(3) تطبع 25', stdin: [], expectedOutputRegex: '25' },
            ],
            hint: 'اكتب y = w * x + b بمسافة بادئة داخل الدالة.',
          },
        },
      ],
    },
    {
      id: '6.3-c3',
      title: 'الخلاصة',
      role: 'summary',
      blocks: [
        {
          id: '6.3-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة',
            calloutStyle: 'summary',
            body: 'بنينا دالة `predict_grade(x)` بـ `w = 5` و `b = 10` وشغلناها في Python. جاهز لاختبار المحطة السادسة (٤٠ سؤالًا رسميًا)!',
          },
        },
      ],
    },
  ],
  summary: 'كتابة وتشغيل دالة التنبؤ الخطي predict_grade(x) بلغة Python.',
  additionalSources: [
    {
      id: 'nb-6-3-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content: 'دالة predict_grade(x) تترجم المعادلة y = w * x + b إلى كود Python يعيد الناتج بـ return y.',
    },
  ],
  sources: [
    { id: 's63-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'مثال ٢: برمجة النموذج الخطي', pages: 'ص 69–70' },
  ],
  nextStep: { kind: 'stationQuiz', targetId: 'station-6', label: 'ابدأ اختبار المحطة السادسة' },
};
