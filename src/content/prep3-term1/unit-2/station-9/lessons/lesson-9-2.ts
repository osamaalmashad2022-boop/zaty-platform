import type { LessonPack } from '@/types/curriculum';

export const LESSON_9_2: LessonPack = {
  id: '9.2',
  stationId: 'station-9',
  unitId: 'unit-2',
  order: 2,
  title: 'مؤشرات الكشف البصري وأدوات الفحص الآلي',
  subtitle: 'علامات تفضح الفيديو المزيف بالعين المجردة وأهم تطبيقات كشف Deepfake',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'awaiting_pack',
  objectives: [
    'تحدّد العلامات الخمس لكشف الفيديو المزيف بالعين المجردة.',
    'تتعرّف أدوات الكشف المعتمدة على الذكاء الاصطناعي مثل Deepware Scanner و Sensity AI و Microsoft Video Authenticator.',
  ],
  cards: [
    {
      id: '9.2-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '9.2-hero',
          type: 'heroHook',
          data: {
            title: 'كن محققًا رقميًا: كيف تكشف Deepfake؟',
            durationMin: 8,
            stationLabel: 'المحطة ٩ · الدرس ٢ من ٣ (مسودة هيكلية)',
            goal: 'تميّز علامات التزييف بالعين وتعرف الأدوات المتخصصة لكشفه.',
            hook: 'زي ما الذكاء الاصطناعي بيتطور في التزييف، بيتطور كمان في كشف التزييف! شوية ملاحظات ذكية في العين والإضاءة والصوت تقدر تكشف الخدعة.',
          },
        },
      ],
    },
    {
      id: '9.2-c2',
      title: 'علامات الكشف البصري + الأدوات التقنية',
      role: 'concept',
      blocks: [
        {
          id: '9.2-signs',
          type: 'listBlock',
          data: {
            heading: '٥ علامات تكشف التزييف العميق بالعين المجردة (ص ٨٩):',
            mode: 'numbered',
            items: [
              { id: 'sg1', text: '**حركة العين والرمش:** الشخصيات في الفيديو المزيف لا ترمش بشكل طبيعي أو ترمش ببطء شديد.' },
              { id: 'sg2', text: '**إضاءة الوجه غير متناسقة:** الظلال على الوجه لا تتناسب مع إضاءة الغرفة أو الخلفية.' },
              { id: 'sg3', text: '**عدم تطابق الصوت وحركة الشفاه:** الكلمات لا تتطابق بدقة مع حركة الفم.' },
              { id: 'sg4', text: '**تشوهات وضبابية حواف الوجه:** خاصة أثناء الالتفات والحركة السريعة.' },
              { id: 'sg5', text: '**خلفية غير واضحة أو مشوهة:** اختلال تفاصيل الخلفية حول الشخص.' },
            ],
          },
        },
        {
          id: '9.2-tools',
          type: 'richText',
          data: {
            heading: 'أدوات كشف التزييف العميق (تعمل بالذكاء الاصطناعي)',
            body: '• `Deepware Scanner`\n• `Sensity AI`\n• `Hive Moderation`\n• `InVID`\n• `Microsoft Video Authenticator`\nتقوم هذه الأدوات بتحليل الفيديو أو الصورة واكتشاف التغييرات غير الطبيعية باستخدام الذكاء الاصطناعي.',
          },
        },
      ],
    },
    {
      id: '9.2-c3',
      title: 'الخلاصة',
      role: 'summary',
      blocks: [
        {
          id: '9.2-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة',
            calloutStyle: 'summary',
            body: 'نكشف التزييف بمتابعة رمش العين، إضاءة الوجه، تزامن الشفاه، حواف الوجه، والخلفية، مع الاستعانة بأدوات ذكاء اصطناعي متخصصة مثل `Deepware Scanner` و `Sensity AI` و `Microsoft Video Authenticator`.',
          },
        },
      ],
    },
  ],
  summary: 'علامات كشف التزييف العميق بصريًا وأبرز أدوات الكشف الآلي المعتمدة على AI.',
  additionalSources: [
    {
      id: 'nb-9-2-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content: 'ابحث عن بطء الرمش، عدم اتساق الإضاءة، اختلال تزامن الشفاه، وضبابية الحواف، واستخدم Deepware و Sensity AI.',
    },
  ],
  sources: [
    { id: 's92-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'مؤشرات وأدوات كشف التزييف العميق', pages: 'ص 89' },
  ],
  nextStep: { kind: 'lesson', targetId: '9.3', label: 'الدرس الجاي: المخاطر ومسؤولية المواطن الرقمي' },
};
