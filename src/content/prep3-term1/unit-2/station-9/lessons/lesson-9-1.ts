import type { LessonPack } from '@/types/curriculum';

export const LESSON_9_1: LessonPack = {
  id: '9.1',
  stationId: 'station-9',
  unitId: 'unit-2',
  order: 1,
  title: 'التزييف العميق Deepfake وصراع شبكات GANs',
  subtitle: 'كيف يتنافس «المولّد المزوّر» و«المميّز المحقّق» لصنع فيديوهات تبدو حقيقية؟',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'awaiting_pack',
  objectives: [
    'تشرح مفهوم التزييف العميق (Deepfake) وتطبيقاته المضللة.',
    'تفهم مبدأ عمل الشبكات التوليدية التنافسية (GANs) ودور Generator و Discriminator.',
  ],
  cards: [
    {
      id: '9.1-c1',
      title: 'البداية والهدف',
      role: 'hero',
      blocks: [
        {
          id: '9.1-hero',
          type: 'heroHook',
          data: {
            title: 'ما هو التزييف العميق Deepfake؟',
            durationMin: 8,
            stationLabel: 'المحطة ٩ · الدرس ١ من ٣ (مسودة هيكلية)',
            goal: 'تفهم معنى Deepfake وتفسّر صراع المولد والمميز جوه شبكات GANs.',
            hook: 'تخيل تشوف فيديو لشخص مشهور بيقول كلام ما قالهوش في الحقيقة أبدًا، وبنفس صوته ووشه! إزاي الذكاء الاصطناعي بيعمل كده؟ السر في منافسة ذكية اسمها GANs!',
          },
        },
      ],
    },
    {
      id: '9.1-c2',
      title: 'تشريح التزييف العميق وشبكات GANs',
      role: 'concept',
      blocks: [
        {
          id: '9.1-await-note',
          type: 'calloutWarning',
          data: {
            variant: 'tip',
            title: 'مسودة هيكلية (Awaiting Pack)',
            body: 'شرح ملخص من الكتاب المدرسي الرسمي مع بنك الأسئلة الكامل (٣٧ سؤالًا)، وستُضاف حزمة الأنشطة التفصيلية لاحقًا.',
          },
        },
        {
          id: '9.1-gans-text',
          type: 'richText',
          data: {
            heading: 'الشبكات التوليدية التنافسية (GANs)',
            body: '**التزييف العميق (Deepfake):** استخدام الذكاء الاصطناعي لإنشاء صور أو فيديوهات أو أصوات مزيفة تبدو حقيقية جدًا.\n\nتقنية **GANs (Generative Adversarial Networks)** تتكون من جزئين يتنافسان آلاف المرات في ثوانٍ:\n• **١. المولّد (Generator):** كأنه «مزوّر» ينشئ بيانات مزيفة ويحسنها باستمرار لتبدو حقيقية.\n• **٢. المميّز (Discriminator):** كأنه «محقّق» يفحص البيانات ليكتشف هل هي حقيقية أم مزيفة.',
          },
        },
      ],
    },
    {
      id: '9.1-c3',
      title: 'الخلاصة',
      role: 'summary',
      blocks: [
        {
          id: '9.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة',
            calloutStyle: 'summary',
            body: 'التنافس المستمر بين **المولّد (Generator)** و**المميّز (Discriminator)** في شبكات **GANs** يجعل التزييف أكثر دقة وواقعية. في الدرس الجاي هنتعلم إزاي نكشف التزييف بالعين المجردة والأدوات!',
          },
        },
      ],
    },
  ],
  summary: 'مفهوم التزييف العميق (Deepfake) وعمل الشبكات التوليدية التنافسية GANs بين Generator و Discriminator.',
  additionalSources: [
    {
      id: 'nb-9-1-summary',
      type: 'summary',
      title: 'ملخص سريع',
      content: 'GANs = مولّد ينشئ التزييف (مزوّر) + مميّز يفحص ويكشف التزييف (محقّق).',
    },
  ],
  sources: [
    { id: 's91-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'التزييف العميق وشبكات GANs', pages: 'ص 87–89' },
  ],
  nextStep: { kind: 'lesson', targetId: '9.2', label: 'الدرس الجاي: كشف التزييف بالعين والأدوات' },
};
