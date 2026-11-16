import type { LessonPack } from '@/types/curriculum';

export const LESSON_8_2: LessonPack = {
  id: '8.2',
  stationId: 'station-8',
  unitId: 'unit-2',
  order: 2,
  title: 'ضوابط الحماية العالمية وأدوات الرقابة والتوازن الرقمي',
  subtitle: 'إزاي تدير وقتك الرقمي بأدوات ذكية وأنشطة بديلة ممتعة؟',
  durationMin: 7,
  contentVersion: 1,
  access: 'free',
  status: 'awaiting_pack',
  objectives: [
    'تذكر الإجراءات العالمية لحماية من هم دون ١٨ سنة (الحد الزمني ومنع اللعب بالمدرسة وحظر Loot Boxes).',
    'تتعرّف دور أدوات الرقابة الأبوية مثل Google Family Link و Apple Screen Time في إدارة الوقت.',
  ],
  cards: [
    {
      id: '8.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '8.2-hero',
          type: 'heroHook',
          data: {
            title: 'درع التوازن الرقمي والحماية السيبرانية',
            durationMin: 7,
            stationLabel: 'المحطة ٨ · الدرس ٢ من ٢ (مسودة هيكلية)',
            goal: 'تطبّق ضوابط وقت اللعب العالمية وتستخدم أدوات التنظيم الرقمي والبدائل الإيجابية.',
            hook: 'الحل مش إننا نمنع التكنولوجيا تمامًا، الحل هو «الإدارة الذكية للوقت» — تعرف تلعب قد إيه وتعمل إيه غير الشاشة!',
          },
        },
      ],
    },
    {
      id: '8.2-c2',
      title: 'الإجراءات العالمية ودور الأسرة والبدائل',
      role: 'concept',
      blocks: [
        {
          id: '8.2-list',
          type: 'listBlock',
          data: {
            heading: 'إجراءات الحد من التأثير السلبي عالميًا وأسريًا (ص ٨٤)',
            mode: 'bullet',
            items: [
              { id: 'g1', text: '**التوصية الزمنية لمن دون ١٨ سنة:** حد أقصى ساعة واحدة في عطلة نهاية الأسبوع أو بحد أقصى ٣ ساعات أسبوعيًا.' },
              { id: 'g2', text: '**حظر الممارسات الضارة:** منع اللعب في المدرسة، وحظر صناديق الغنائم والألعاب المعتمدة على الدفع للفوز والحيل النفسية.' },
              { id: 'g3', text: '**أدوات الرقابة الأبوية:** استخدام **Google Family Link** و **Apple Screen Time** لفصل اللعبة عند انتهاء الوقت المحدد.' },
              { id: 'g4', text: '**مشاركة الأسرة والبدائل:** بناء حوار مشترك وتشجيع الرياضة والقراءة والرسم والابتكار.' },
            ],
          },
        },
      ],
    },
    {
      id: '8.2-c3',
      title: 'الخلاصة',
      role: 'summary',
      blocks: [
        {
          id: '8.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة',
            calloutStyle: 'summary',
            body: 'الوعي الأسري وتحديد الوقت (حد أقصى ٣ ساعات أسبوعيًا لمن دون ١٨ سنة) واستخدام `Google Family Link` و `Apple Screen Time` والأنشطة البديلة تحمي صحتنا النفسية والاجتماعية. جاهز لاختبار المحطة الثامنة!',
          },
        },
      ],
    },
  ],
  summary: 'الإجراءات العالمية للحد من أضرار الألعاب وأدوات الرقابة الأبوية والأنشطة البديلة.',
  additionalSources: [
    {
      id: 'nb-8-2-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content: 'ضوابط الوقت العالمية (٣ ساعات أسبوعيًا كحد أقصى)، أدوات Family Link و Screen Time، والبدائل الواقعية.',
    },
  ],
  sources: [
    { id: 's82-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'ضوابط اللعب والرقابة الأبوية', pages: 'ص 84–85' },
  ],
  nextStep: { kind: 'stationQuiz', targetId: 'station-8', label: 'ابدأ اختبار المحطة الثامنة' },
};
