import type { FlashcardItem } from '@/types/curriculum';

export const STATION_13_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-13-1',
    stationId: 'station-13',
    microLessonId: '13.1',
    termAr: 'معالجة اللغات الطبيعية',
    termEn: 'Natural Language Processing (NLP)',
    definition:
      'أحد فروع الذكاء الاصطناعي الذي يهتم بتمكين الحواسيب من قراءة وفهم وتفسير وتوليد لغة البشر المنطوقة والمكتوبة.',
    example: 'تطبيقات الشات بوت مثل ChatGPT والمساعدات الصوتية كـ Siri و Google Assistant.',
    code: 'import nltk # مكتبة معالجة اللغات في بايثون',
  },
  {
    id: 'fc-13-2',
    stationId: 'station-13',
    microLessonId: '13.1',
    termAr: 'تمييز القصد والهدف',
    termEn: 'Intent Recognition',
    definition:
      'قدرة النظام الذكي على استخلاص الهدف الحقيقي الذي يريده المستخدم من وراء جملته وتحديد الإجراء المطلوب تنفيذه.',
    example: 'فهم أن عبارة «الجو إيه بكرة؟» تعني طلب استعراض درجات الحرارة والطقس.',
    code: 'intent = "check_weather"',
  },
  {
    id: 'fc-13-3',
    stationId: 'station-13',
    microLessonId: '13.1',
    termAr: 'توليد اللغة الطبيعية',
    termEn: 'Natural Language Generation (NLG)',
    definition:
      'الشق التوليدي في الذكاء الاصطناعي المسؤول عن تحويل البيانات الرقمية والنتائج الحسابية إلى جمل لغوية بشرية بليغة وسلسة.',
    example: 'صياغة تقرير الطقس في صورة فقرة مفهومة للمستخدم.',
    code: 'reply = "درجة الحرارة المتوقعة غداً ٢٥ مئوية مع طقس مشمس."',
  },
  {
    id: 'fc-13-4',
    stationId: 'station-13',
    microLessonId: '13.1',
    termAr: 'تصفية الرسائل المزعجة',
    termEn: 'Spam Filtering',
    definition:
      'نظام تصنيف ذكي يعتمد على NLP لفحص محتوى رسائل البريد الإلكتروني وفرز الرسائل الدعائية الاحتيالية عن الرسائل الحقيقية.',
    example: 'نقل رسائل الفوز الوهمية والجوائز المالية تلقائيًا إلى مجلد Spam.',
    code: 'if "win prize" in email_text: mark_as_spam()',
  },
  {
    id: 'fc-13-5',
    stationId: 'station-13',
    microLessonId: '13.2',
    termAr: 'التقطيع اللغوي',
    termEn: 'Tokenization',
    definition:
      'عملية تفكيك النص الخام المتصل إلى وحدات أصغر تسمى Tokens، وتكون عادة كلمات مفردة أو عبارات قصيرة.',
    example: 'تحويل جملة "أنا أحب بايثون" إلى قائمة من ثلاث كلمات: ["أنا", "أحب", "بايثون"].',
    code: 'tokens = text.split()',
  },
  {
    id: 'fc-13-6',
    stationId: 'station-13',
    microLessonId: '13.2',
    termAr: 'التوكن',
    termEn: 'Token',
    definition:
      'الوحدة البنائية المفردة الناتجة عن عملية التقطيع، وتمثل كلمة أو رمزًا يتم التعامل معه رقميًا داخل خوارزميات الذكاء الاصطناعي.',
    example: 'كلمة "بايثون" كوحدة مستقلة داخل الجملة.',
    code: 'token = "Python"',
  },
  {
    id: 'fc-13-7',
    stationId: 'station-13',
    microLessonId: '13.2',
    termAr: 'الكلمات الشائعة / المستبعدة',
    termEn: 'Stop Words',
    definition:
      'كلمات متكررة بكثرة في اللغة (مثل حروف الجر والعطف: في، من، إلى، و، the, is) ولا تحمل قيمة دلالية مميزة، لذا يتم استبعادها.',
    example: 'حذف "في" و "من" عند تحليل موضوع مقال علمي.',
    code: 'filtered = [w for w in words if w not in stop_words]',
  },
  {
    id: 'fc-13-8',
    stationId: 'station-13',
    microLessonId: '13.2',
    termAr: 'التطهير والتوحيد',
    termEn: 'Normalization',
    definition:
      'مرحلة تحضيرية تتضمن توحيد حالة الحروف (مثل حروف lowercase) وإزالة علامات الترقيم والأرقام والتشكيل لتسهيل المطابقة.',
    example: 'تحويل "Egypt" و "egypt" إلى صيغة موحدة "egypt".',
    code: 'clean_text = raw_text.lower().strip()',
  },
  {
    id: 'fc-13-9',
    stationId: 'station-13',
    microLessonId: '13.3',
    termAr: 'تحليل المشاعر',
    termEn: 'Sentiment Analysis',
    definition:
      'استخدام تقنيات NLP لتحديد الحالة العاطفية والنبرة الرأيّة للنص (إيجابي أو سلبي أو محايد).',
    example: 'فحص مراجعات الفنادق والمنتجات لمعرفة نسبة رضا العملاء تلقائيًا.',
    code: 'sentiment = "Positive" if score > 0 else "Negative"',
  },
  {
    id: 'fc-13-10',
    stationId: 'station-13',
    microLessonId: '13.3',
    termAr: 'المعجم الدلالي',
    termEn: 'Sentiment Lexicon',
    definition:
      'قاموس مرجعي يحتوي على كلمات مصنفة بأوزان عاطفية محددة مسبقًا (+1 للكلمات الإيجابية و -1 للكلمات السلبية).',
    example: 'معجم يحتوي على: ممتاز (+1)، رائع (+1)، بطيء (-1)، سيئ (-1).',
    code: 'lexicon = {"ممتاز": 1, "سيئ": -1}',
  },
  {
    id: 'fc-13-11',
    stationId: 'station-13',
    microLessonId: '13.3',
    termAr: 'النبرة المحايدة',
    termEn: 'Neutral Sentiment',
    definition:
      'حالة النص الذي يعرض حقائق مجردة دون إبداء مشاعر رضا أو غضب، أو عندما تتساوى الكلمات الإيجابية والسلبية تمامًا.',
    example: '«يبدأ الدرس في تمام الساعة الثامنة صباحًا».',
    code: 'score = 0  # محايد',
  },
  {
    id: 'fc-13-12',
    stationId: 'station-13',
    microLessonId: '13.3',
    termAr: 'تصنيف النصوص',
    termEn: 'Text Classification',
    definition:
      'المهمة الأوسع في NLP التي تتضمن إسناد فئة أو تصنيف محدد للنص بناءً على محتواه (مثل: رياضة، سياسة، تقنية، تعليم).',
    example: 'تصنيف الأخبار تلقائيًا على البوابات الإخبارية الكبرى.',
    code: 'category = classify_article(text)',
  },
];
