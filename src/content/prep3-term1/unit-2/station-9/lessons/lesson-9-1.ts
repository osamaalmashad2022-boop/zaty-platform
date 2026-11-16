import type { LessonPack } from '@/types/curriculum';

export const LESSON_9_1: LessonPack = {
  id: '9.1',
  stationId: 'station-9',
  unitId: 'unit-2',
  order: 1,
  title: 'التزييف العميق Deepfake وصراع شبكات GANs',
  subtitle: 'كيف يتنافس «المولّد المزوّر» و«المميّز المحقّق» لصنع فيديوهات تبدو حقيقية؟',
  durationMin: 8,
  contentVersion: 2,
  access: 'free',
  status: 'ready',
  objectives: [
    'تشرح مفهوم التزييف العميق (Deepfake) وتطبيقاته المضللة.',
    'تفهم مبدأ عمل الشبكات التوليدية التنافسية (GANs) ودور المولّد (Generator) والمميّز (Discriminator).',
    'تميّز دور كل طرف في حلقة التنافس عبر تشبيه «المزوّر والمحقّق».',
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
            stationLabel: 'المحطة ٩ · الدرس ١ من ٣',
            goal: 'تفهم معنى Deepfake وتفسّر صراع المولد والمميز جوه شبكات GANs.',
            hook: 'تخيل تفتح الموبايل وتلاقي فيديو لشخص مشهور بيقول كلام ما قالهوش في الحقيقة أبدًا، وبنفس صوته وملامح وشه! إزاي الذكاء الاصطناعي بيعمل خدعة بالحرفية دي؟ السر في منافسة ذكية اسمها GANs!',
          },
        },
      ],
    },
    {
      id: '9.1-c2',
      title: 'مفهوم التزييف العميق ومكونات شبكات GANs (ص ٨٨)',
      role: 'concept',
      blocks: [
        {
          id: '9.1-gans-text',
          type: 'richText',
          data: {
            heading: 'ما هو التزييف العميق؟ وما هي شبكات GANs؟',
            body: '**التزييف العميق (`Deepfake`):** استخدام الذكاء الاصطناعي لإنشاء صور أو فيديوهات أو أصوات مزيفة تبدو حقيقية جدًا.\n\nتُصنع هذه المقاطع بتقنية **الشبكات التوليدية التنافسية (`GANs` - Generative Adversarial Networks)**، واللي بتتكون من **جزئين** متنافسين:',
          },
        },
        {
          id: '9.1-gans-table',
          type: 'tableBlock',
          data: {
            heading: 'الطرفان المتنافسان داخل نظام GANs (ص ٨٨–٨٩)',
            headers: ['الجزء', 'المسمى الإنجليزي', 'وظيفته والتشبيه البسيط'],
            rows: [
              ['١. المولّد', 'Generator', 'ينشئ بيانات مزيفة ويحاول جعلها تبدو حقيقية قدر الإمكان (مثل: المزوّر).'],
              ['٢. المميّز', 'Discriminator', 'يفحص البيانات ليحكم هل هي حقيقية أم مزيفة (مثل: المحقّق).'],
            ],
          },
        },
      ],
    },
    {
      id: '9.1-c3',
      title: 'كيف تعمل حلقة التنافس بين المولّد والمميّز؟',
      role: 'example',
      blocks: [
        {
          id: '9.1-stepper',
          type: 'processStepper',
          data: {
            heading: 'مراحل المنافسة داخل GANs (ص ٨٩)',
            steps: [
              {
                id: 'g1',
                title: '١. المولّد يصنع محاولة مزيفة',
                detail: 'يبدأ المولّد (`Generator`) بإنتاج صورة أو لقطة مزيفة ويحاول تقليد الواقع.',
              },
              {
                id: 'g2',
                title: '٢. المميّز يفحص ويكشف العيوب',
                detail: 'يفحص المميّز (`Discriminator`) الصورة كالمحقق، ويميز هل هي حقيقية أم مزيفة.',
              },
              {
                id: 'g3',
                title: '٣. التعلّم والتحسين المتبادل',
                detail: 'المولّد بيحسّن تزييفه في كل مرة لتفادي الخطأ، والمميّز بيحسّن قدرته على كشف التزييف.',
              },
              {
                id: 'g4',
                title: '٤. آلاف المحاولات في ثوانٍ معدودة',
                detail: 'يستمر التنافس آلاف المرات في ثوانٍ حتى يصل المولّد لنتيجة واقعية جدًا يصعب على الإنسان العادي تمييزها!',
              },
            ],
          },
        },
      ],
    },
    {
      id: '9.1-c4',
      title: 'جرّب بنفسك: طابق أجزاء شبكات GANs',
      role: 'tryIt',
      requireInteraction: true,
      blocks: [
        {
          id: '9.1-match',
          type: 'matchingPairs',
          data: {
            prompt: 'وصّل كل مصطلح في تقنية `Deepfake` و `GANs` بالوصف والتشبيه المناسب له:',
            pairs: [
              { id: 'm1', left: 'التزييف العميق (Deepfake)', right: 'إنشاء صور وفيديوهات وأصوات مزيفة تبدو حقيقية جدًا بالـ AI' },
              { id: 'm2', left: 'المولّد (Generator)', right: 'ينشئ بيانات مزيفة ويحاول جعلها تبدو حقيقية («المزوّر»)' },
              { id: 'm3', left: 'المميّز (Discriminator)', right: 'يكتشف هل البيانات حقيقية أم مزيفة («المحقّق»)' },
              { id: 'm4', left: 'الهدف من تنافس GANs', right: 'كلما تطورت المنافسة آلاف المرات، أصبح التزييف أكثر دقة' },
            ],
            feedback: {
              correct: 'الله ينور! فهمت سر عمل شبكات GANs بدقة.',
              incorrect: 'تذكّر التشبيه البسيط: المولّد هو المزوّر اللي بيصنع الصورة، والمميّز هو المحقّق اللي بيكشفها.',
            },
          },
        },
      ],
    },
    {
      id: '9.1-c5',
      title: 'خلّي بالك!',
      role: 'warning',
      blocks: [
        {
          id: '9.1-warn',
          type: 'calloutWarning',
          data: {
            variant: 'warning',
            title: 'فخ الامتحان: لا تبدّل بين Generator و Discriminator!',
            body: '• **`Generator` (المولّد):** هو اللي **بيصنع/ينشئ** البيانات المزيفة (زي المزوّر).\n• **`Discriminator` (المميّز):** هو اللي **بيفحص/يكتشف** هل البيانات حقيقية أم مزيفة (زي المحقّق).\n• وكمان `GANs` بتتكون من **جزئين** (مش جزء واحد)!',
          },
        },
      ],
    },
    {
      id: '9.1-c6',
      title: 'التحقق السريع',
      role: 'quickCheck',
      requireInteraction: true,
      blocks: [
        {
          id: '9.1-q1',
          type: 'quizQuestion',
          data: {
            question: 'ما هي تقنية GANs؟ ومم تتكون؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٩٢ (س٢–س٣)',
            options: [
              { id: 'a', text: 'برنامج مكافحة فيروسات من جزء واحد', isCorrect: false, feedback: 'GANs تقنية ذكاء اصطناعي لتوليد وكشف الصور.' },
              { id: 'b', text: 'الشبكات التوليدية التنافسية (Generative Adversarial Networks) وتتكون من جزئين', isCorrect: true, feedback: 'صح! تتكون من المولّد (Generator) والمميّز (Discriminator).' },
              { id: 'c', text: 'لغة برمجة تتكون من أربعة أجزاء', isCorrect: false, feedback: 'ليست لغة برمجة.' },
              { id: 'd', text: 'أداة هاردوير لتسريع الإنترنت', isCorrect: false, feedback: 'غير صحيح.' },
            ],
            explanation: 'GANs هي الشبكات التوليدية التنافسية وتتكون من جزئين متنافسين: المولد والمميز.',
          },
        },
        {
          id: '9.1-q2',
          type: 'quizQuestion',
          data: {
            question: 'ما التشبيه المناسب لعمل المولّد (Generator) والمميّز (Discriminator) في GANs؟',
            multiple: false,
            scored: false,
            sourceTag: 'كتاب الوزارة ص ٩٥ (س١٨)',
            options: [
              { id: 'a', text: 'طبيب ومريض', isCorrect: false, feedback: 'العلاقة بينهما تنافسية.' },
              { id: 'b', text: 'مزوّر يحاول تقليد صورة، ومحقّق يحاول اكتشاف التزوير', isCorrect: true, feedback: 'ممتاز! ده التشبيه الدقيق المذكور في الكتاب.' },
              { id: 'c', text: 'سائق وراكب', isCorrect: false, feedback: 'غير صحيح.' },
              { id: 'd', text: 'بائع ومشتري', isCorrect: false, feedback: 'غير صحيح.' },
            ],
            explanation: 'المولّد يعمل كمزور يحاول خداع المحقق (المميز) الذي يحاول كشف التزوير.',
          },
        },
      ],
    },
    {
      id: '9.1-c7',
      title: 'الخلاصة والمصادر الإضافية',
      role: 'summary',
      blocks: [
        {
          id: '9.1-sum',
          type: 'richText',
          data: {
            heading: 'الخلاصة في فقرة',
            calloutStyle: 'summary',
            body: '**التزييف العميق (`Deepfake`)** بيصنع صور وفيديوهات وأصوات مزيفة تبدو حقيقية جدًا عبر تقنية **`GANs`**، اللي بتعتمد على تنافس مستمر بين **المولّد (`Generator` - المزوّر)** و**المميّز (`Discriminator` - المحقّق)** آلاف المرات في ثوانٍ. في الدرس الجاي هنتعلم إزاي نكشف التزييف ده بالعين المجردة والأدوات الذكية!',
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
      title: 'ملخص سريع (NotebookLM)',
      content: 'تقنية GANs هي المحرك وراء التزييف العميق من خلال منافسة متسارعة بين نموذجين ذكيين.',
      bullets: [
        'Deepfake: صور أو فيديوهات أو أصوات مزيفة بالذكاء الاصطناعي.',
        'GANs = Generative Adversarial Networks (الشبكات التوليدية التنافسية).',
        'Generator (المولّد / المزوّر) ينشئ التزييف ويحسنه.',
        'Discriminator (المميّز / المحقّق) يفحص ويميز الحقيقي من المزيف.',
      ],
    },
    {
      id: 'nb-9-1-faq',
      type: 'faq',
      title: 'أسئلة شائعة',
      items: [
        {
          id: 'faq-9-1-1',
          question: 'ليه التزييف العميق بقى واقعي جدًا وصعب كشفه؟',
          answer: 'لأن المولّد والمميّز بيتنافسوا آلاف المرات في ثوانٍ معدودة؛ كل ما المحقق يمسك غلطة، المزوّر بيصلحها لحد ما النتيجة تبقى شبه حقيقية تمامًا.',
        },
        {
          id: 'faq-9-1-2',
          question: 'هل التزييف العميق بييجي في الفيديوهات بس؟',
          answer: 'لا! ممكن يكون في الصور، أو الفيديوهات، أو حتى تقليد الأصوات.',
        },
      ],
    },
    {
      id: 'nb-9-1-mindmap',
      type: 'mindmap',
      title: 'خريطة ذهنية',
      root: {
        id: 'mm-9-1',
        label: 'التزييف العميق وشبكات GANs',
        children: [
          { id: 'mm-9-1-df', label: 'Deepfake: صور / فيديو / صوت مزيف' },
          {
            id: 'mm-9-1-gan',
            label: 'مكونات GANs',
            children: [
              { id: 'mm-9-1-gen', label: 'Generator (المولّد / المزوّر)' },
              { id: 'mm-9-1-dis', label: 'Discriminator (المميّز / المحقّق)' },
            ],
          },
          { id: 'mm-9-1-loop', label: 'تنافس آلاف المرات في ثوانٍ' },
        ],
      },
    },
    {
      id: 'nb-9-1-glossary',
      type: 'glossary',
      title: 'أهم المصطلحات',
      terms: [
        { id: 'g91-1', termAr: 'التزييف العميق', termEn: 'Deepfake', definition: 'استخدام الذكاء الاصطناعي لإنشاء صور أو فيديوهات أو أصوات مزيفة تبدو حقيقية جدًا.' },
        { id: 'g91-2', termAr: 'الشبكات التوليدية التنافسية', termEn: 'GANs (Generative Adversarial Networks)', definition: 'بنية ذكاء اصطناعي تتكون من مولّد ومميّز يتنافسان لتحسين واقعية المحتوى المولد.' },
        { id: 'g91-3', termAr: 'المولّد', termEn: 'Generator', definition: 'الجزء الذي ينشئ البيانات المزيفة ويحسنها لتبدو حقيقية.' },
        { id: 'g91-4', termAr: 'المميّز', termEn: 'Discriminator', definition: 'الجزء الذي يفحص البيانات ويحدد هل هي حقيقية أم مزيفة.' },
      ],
    },
  ],
  sources: [
    { id: 's91-tb', kind: 'textbook', label: 'كتاب الوزارة — ICT الصف الثالث الإعدادي', detail: 'التزييف العميق وشبكات GANs', pages: 'ص 87–89 و 91–93' },
    { id: 's91-nb', kind: 'notebooklm', label: 'مصادر NotebookLM للدرس ٩.١', detail: 'شرح حلقة التنافس بين Generator و Discriminator' },
  ],
  nextStep: {
    kind: 'lesson',
    targetId: '9.2',
    label: 'الدرس الجاي: كشف التزييف بالعين والأدوات',
    description: 'اكشف علامات التزييف البصرية والصوتية وتعرّف على Deepware و Sensity AI.',
  },
};
