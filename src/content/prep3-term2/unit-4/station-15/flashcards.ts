import type { FlashcardItem } from '@/types/curriculum';

export const STATION_15_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-15-1',
    stationId: 'station-15',
    microLessonId: '15.1',
    termAr: 'إنترنت الأشياء',
    termEn: 'Internet of Things (IoT)',
    definition:
      'شبكة رقمية متصلة من الأجهزة والأدوات الفيزيائية المزودة بحساسات وبرمجيات تتيح لها جمع وتبادل البيانات والتحكم التلقائي عبر الإنترنت.',
    example: 'أنظمة الري الذكية، والمنازل المتصلة، وساعات متابعة الصحة.',
    code: 'device.connect_to_cloud()',
  },
  {
    id: 'fc-15-2',
    stationId: 'station-15',
    microLessonId: '15.1',
    termAr: 'الحساس الرقمي',
    termEn: 'Sensor',
    definition:
      'أداة إلكترونية تلتقط وتستشعر التغيرات الفيزيائية في البيئة المحيطة (مثل الحرارة، الرطوبة، الضوء، الحركة) وتحولها لإشارات رقمية.',
    example: 'حساس كشف الدخان أو حساس قياس نبضات القلب.',
    code: 'temperature = sensor.read()',
  },
  {
    id: 'fc-15-3',
    stationId: 'station-15',
    microLessonId: '15.1',
    termAr: 'المشغّل / المنفّذ',
    termEn: 'Actuator',
    definition:
      'عنصر ميكانيكي أو إلكتروني يتلقى الأوامر البرمجية من المعالج لتحويلها إلى حركة فيزيائية فعلية (مثل تشغيل محرك، فتح صمام، إضاءة مصباح).',
    example: 'صمام فتح مياه الري الآلي عند جفاف التربة.',
    code: 'actuator.open_valve()',
  },
  {
    id: 'fc-15-4',
    stationId: 'station-15',
    microLessonId: '15.1',
    termAr: 'المنازل الذكية',
    termEn: 'Smart Homes',
    definition:
      'مساكن مجهزة بأجهزة متصلة بالشبكة تمكن قاطنيها من التحكم الآلي في الإضاءة والأجهزة والتكييف والأقفال عن بُعد أو وفق جدول زمني.',
    example: 'إطفاء الأنوار تلقائيًا عند مغادرة المنزل لتوفير الكهرباء.',
    code: 'smart_home.set_scene("leaving")',
  },
  {
    id: 'fc-15-5',
    stationId: 'station-15',
    microLessonId: '15.1',
    termAr: 'المدن الذكية',
    termEn: 'Smart Cities',
    definition:
      'مناطق حضرية تستخدم حساسات وشبكات IoT المتقدمة لإدارة الموارد بكفاءة، مثل تنظيم إشارات المرور الذكية وترشيد استهلاك الطاقة والمياه.',
    example: 'أعمدة الإنارة التي تضيء فقط عند اقتراب المشاة أو السيارات.',
    code: 'city_grid.optimize_traffic()',
  },
  {
    id: 'fc-15-6',
    stationId: 'station-15',
    microLessonId: '15.2',
    termAr: 'الحوسبة السحابية',
    termEn: 'Cloud Computing',
    definition:
      'توفير موارد وخدمات تكنولوجيا المعلومات (الخوادم، التخزين، قواعد البيانات، والبرمجيات) عبر الإنترنت حسب الطلب ودون امتلاك عتاد محلي.',
    example: 'خدمات Google Cloud و Microsoft Azure و Amazon AWS.',
    code: 'cloud.allocate_resources()',
  },
  {
    id: 'fc-15-7',
    stationId: 'station-15',
    microLessonId: '15.2',
    termAr: 'التخزين السحابي',
    termEn: 'Cloud Storage',
    definition:
      'حفظ الملفات والبيانات في خوادم سحابية مؤمنة بدلاً من الأقراص المحلية، مع إمكانية الوصول الفوري والمزامنة من أي جهاز وفي أي وقت.',
    example: 'Google Drive و OneDrive و Dropbox.',
    code: 'upload_to_drive(file_path)',
  },
  {
    id: 'fc-15-8',
    stationId: 'station-15',
    microLessonId: '15.2',
    termAr: 'مراكز البيانات',
    termEn: 'Data Centers',
    definition:
      'منشآت مادية عملاقة ومجهزة بأنظمة تبريد وتأمين كهربائي وشبكي متطور، تضم آلاف الخوادم المسؤولة عن تشغيل السحابة وتخزين بيانات العالم.',
    example: 'مراكز بيانات كبرى شركات التكنولوجيا المنتشرة حول قارات العالم.',
    code: 'datacenter.status() == "online"',
  },
  {
    id: 'fc-15-9',
    stationId: 'station-15',
    microLessonId: '15.3',
    termAr: 'مهندس صياغة الأوامر',
    termEn: 'Prompt Engineer',
    definition:
      'مهنة تقنية حديثة تركز على توجيه وهندسة الأسئلة والتعليمات لنماذج الذكاء الاصطناعي التوليدية للحصول على أدق النتائج وأفضل مخرجات.',
    example: 'صياغة برومبت احترافي لتوليد كود برمجي أو تحليل بيانات معقدة.',
    code: 'engineered_prompt = "Act as senior architect..."',
  },
  {
    id: 'fc-15-10',
    stationId: 'station-15',
    microLessonId: '15.3',
    termAr: 'أخصائي الأمن السيبراني',
    termEn: 'Cybersecurity Specialist',
    definition:
      'محترف مسؤول عن حماية الأنظمة والشبكات والبيانات السحابية وأجهزة IoT من الاختراقات والهجمات الرقمية وسرقة الهوية.',
    example: 'تأمين الشبكات وإعداد جدران الحماية وفحص الثغرات الأمنية.',
    code: 'firewall.block_unauthorized_ip()',
  },
  {
    id: 'fc-15-11',
    stationId: 'station-15',
    microLessonId: '15.3',
    termAr: 'التعلّم المستمر مدى الحياة',
    termEn: 'Lifelong Learning',
    definition:
      'نهج وتفكير إيجابي مستمر لاكتساب مهارات وتحديث المعارف الذاتية بانتظام لمواكبة التغيرات التقنية المتسارعة في سوق العمل.',
    example: 'تعلم لغات برمجية وأدوات ذكاء اصطناعي جديدة سنويًا.',
    code: 'learner.upgrade_skills()',
  },
  {
    id: 'fc-15-12',
    stationId: 'station-15',
    microLessonId: '15.3',
    termAr: 'التفكير النقدي وحل المشكلات',
    termEn: 'Critical Thinking & Problem Solving',
    definition:
      'القدرة العقلية البشرية على تحليل المعطيات بموضوعية، وتقييم صحة المعلومات، وابتكار حلول للمشكلات المعقدة التي تعجز الخوارزميات عن حلها منفردة.',
    example: 'الموازنة الأخلاقية والمنطقية عند تصميم خوارزميات الذكاء الاصطناعي الحساسة.',
    code: 'human_review(ai_decision)',
  },
];
