import type { FlashcardItem } from '@/types/curriculum';

export const STATION_12_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-12-1',
    stationId: 'station-12',
    microLessonId: '12.1',
    termAr: 'البرمجة كائنية التوجه',
    termEn: 'Object-Oriented Programming (OOP)',
    definition:
      'منهجية برمجية حديثة تقوم على تنظيم الأكواد في صورة كائنات تجمع بين البيانات والوظائف المرتبطة بها في وحدة واحدة.',
    example: 'تنظيم كود اللعبة في فئات مثل Player و Enemy و Weapon.',
    code: 'class GameCharacter:\n    pass',
  },
  {
    id: 'fc-12-2',
    stationId: 'station-12',
    microLessonId: '12.1',
    termAr: 'الفئة',
    termEn: 'Class',
    definition:
      'المخطط الهندسي العام أو القالب (Blueprint) الذي يحدد السمات والوظائف المشتركة التي ستتوارثها الكائنات الناتجة عنه.',
    example: 'رسمة المهندس المعماري للعمارة قبل بنائها الفعلي.',
    code: 'class Robot:\n    pass',
  },
  {
    id: 'fc-12-3',
    stationId: 'station-12',
    microLessonId: '12.1',
    termAr: 'الكائن / النسخة الحية',
    termEn: 'Object / Instance',
    definition:
      'الكيان الفعلي المستقل الذي يتم إنشاؤه في ذاكرة الحاسب بناءً على مواصفات الفئة المحددة.',
    example: 'العمارة السكنية الفعلية المبنية على الأرض أو سيارة محددة تسير في الشارع.',
    code: 'r1 = Robot()\nr2 = Robot()',
  },
  {
    id: 'fc-12-4',
    stationId: 'station-12',
    microLessonId: '12.1',
    termAr: 'معامل النقطة',
    termEn: 'Dot Notation',
    definition:
      'أداة الربط البرمجية (.) المستخدمة للوصول إلى خصائص الكائن أو استدعاء وظائفه الداخلية.',
    example: 'الوصول لاسم الآلي عبر النقطة.',
    code: 'robot.name = "Flash"\nprint(robot.name)',
  },
  {
    id: 'fc-12-5',
    stationId: 'station-12',
    microLessonId: '12.1',
    termAr: 'الكلمة المحجوزة pass',
    termEn: 'pass Statement',
    definition:
      'أمر في بايثون يعمل كحافظ للمكان (Placeholder) لتفادي أخطاء الصياغة في الفئات أو الدوال الفارغة مؤقتًا.',
    example: 'تعريف فئة سريعة لم نكتب تفاصيلها بعد دون أن ينهار المفسر.',
    code: 'class Temporary:\n    pass',
  },
  {
    id: 'fc-12-6',
    stationId: 'station-12',
    microLessonId: '12.2',
    termAr: 'دالة البناء',
    termEn: '__init__ (Constructor)',
    definition:
      'دالة خاصة في بايثون تُستدعى تلقائيًا وفوريًا في لحظة ولادة الكائن لتهيئة وتعيين خصائصه الأولية.',
    example: 'تجهيز بطارية الكائن واسمه تلقائيًا عند الشراء.',
    code: 'def __init__(self, name, battery):\n    self.name = name\n    self.battery = battery',
  },
  {
    id: 'fc-12-7',
    stationId: 'station-12',
    microLessonId: '12.2',
    termAr: 'المعامل self',
    termEn: 'self Parameter',
    definition:
      'معامل إلزامي في بداية كل دالة داخل الفئة يشير إلى الكائن الفعلي الحالي الذي يتم إنشاؤه أو التعامل معه.',
    example: 'تمكين الكائن من تمييز بياناته الخاصة عن بيانات الكائنات الأخرى.',
    code: 'self.score = 100',
  },
  {
    id: 'fc-12-8',
    stationId: 'station-12',
    microLessonId: '12.2',
    termAr: 'السمات / الخصائص',
    termEn: 'Attributes / Properties',
    definition:
      'المتغيرات المحفوظة داخل الكائن والتي تصف حالته وبياناته (مثل الاسم، العمر، الطاقة، اللون).',
    example: 'خصائص كائن المستخدم: الاسم وكلمة المرور.',
    code: 'user.name = "Ahmad"\nuser.is_active = True',
  },
  {
    id: 'fc-12-9',
    stationId: 'station-12',
    microLessonId: '12.2',
    termAr: 'إنشاء النسخ',
    termEn: 'Instantiation',
    definition:
      'عملية استدعاء الفئة بأقواس لتخليق كائن حي جديد في الذاكرة وتمرير بيانات دالة البناء له.',
    example: 'توليد بطل جديد في اللعبة.',
    code: 'hero = Hero("Zaty", 100)',
  },
  {
    id: 'fc-12-10',
    stationId: 'station-12',
    microLessonId: '12.3',
    termAr: 'وظيفة الكائن',
    termEn: 'Method',
    definition:
      'دالة تُعرّف داخل الفئة وتتحكم في سلوكيات الكائن وتعديل بياناته، ويكون أول معامل فيها هو self.',
    example: 'أمر الحركة أو إطلاق الصوت في كائن السيارة.',
    code: 'def speak(self):\n    print("Hello from", self.name)',
  },
  {
    id: 'fc-12-11',
    stationId: 'station-12',
    microLessonId: '12.3',
    termAr: 'تعديل الخصائص',
    termEn: 'Attribute Mutation',
    definition:
      'تغيير حالة الكائن الداخلية إما مباشرة بمعامل النقطة أو بصورة أكثر أمانًا وتنظيمًا عبر وظيفة مخصصة.',
    example: 'شحن طاقة الآلي بإضافة رصيد جديد لخصيصته الحالية.',
    code: 'def charge(self, amount):\n    self.battery += amount',
  },
  {
    id: 'fc-12-12',
    stationId: 'station-12',
    microLessonId: '12.3',
    termAr: 'التغليف',
    termEn: 'Encapsulation',
    definition:
      'أحد أهم مبادئ البرمجة الكائنية، ويعني تجميع البيانات والوظائف التي تعمل عليها داخل وحدة واحدة هي الفئة، لمنع التدخل الخارجي العشوائي.',
    example: 'حماية طاقة الكائن وجعل تعديلها يمر حصريًا عبر دالة charge() المنظمة.',
    code: 'bot.charge(25)  # تعديل آمن ومنظم',
  },
];
