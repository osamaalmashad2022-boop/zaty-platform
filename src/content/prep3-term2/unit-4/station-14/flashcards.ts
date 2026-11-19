import type { FlashcardItem } from '@/types/curriculum';

export const STATION_14_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-14-1',
    stationId: 'station-14',
    microLessonId: '14.1',
    termAr: 'رؤية الكمبيوتر',
    termEn: 'Computer Vision (CV)',
    definition:
      'مجال في الذكاء الاصطناعي يُعنى بتمكين الحواسيب من استخراج معلومات ذات مغزى وفهم بصري من الصور ومقاطع الفيديو الرقمية.',
    example: 'التعرف على لوحات السيارات آليًا وقراءة إشارات المرور.',
    code: 'import cv2 # مكتبة OpenCV لرؤية الكمبيوتر',
  },
  {
    id: 'fc-14-2',
    stationId: 'station-14',
    microLessonId: '14.1',
    termAr: 'البكسل',
    termEn: 'Pixel (Picture Element)',
    definition:
      'أصغر عنصر أو نقطة لونية مفردة في بناء الصورة الرقمية على الشاشات والمصفوفات.',
    example: 'شاشة الهاتف بدقة Full HD تحتوي على أكثر من مليوني بكسل.',
    code: 'pixel_value = 255',
  },
  {
    id: 'fc-14-3',
    stationId: 'station-14',
    microLessonId: '14.1',
    termAr: 'نموذج الألوان الثلاثي RGB',
    termEn: 'RGB Color Model',
    definition:
      'نظام ألوان ضوئي يعتمد على مزج ثلاث قنوات: الأحمر (Red) والأخضر (Green) والأزرق (Blue)، بقيم تتراوح من 0 إلى 255.',
    example: 'اللون الأحمر الصافي: (255, 0, 0) واللون الأبيض: (255, 255, 255).',
    code: 'color = (255, 0, 0)',
  },
  {
    id: 'fc-14-4',
    stationId: 'station-14',
    microLessonId: '14.1',
    termAr: 'صورة التدرج الرمادي',
    termEn: 'Grayscale Image',
    definition:
      'صورة رقمية أحادية القناة الضوئية، تتدرج فيها إضاءة كل بكسل من الأسود الكامل (0) إلى الأبيض الناصع (255).',
    example: 'صور الأشعة السينية الطبية أو صور الكاميرات القديمة.',
    code: 'gray_pixel = 128  # رمادي متوسط',
  },
  {
    id: 'fc-14-5',
    stationId: 'station-14',
    microLessonId: '14.1',
    termAr: 'دقة الصورة',
    termEn: 'Image Resolution',
    definition:
      'مقياس عدد البكسلات المكونة للصورة، ويُعبر عنه بضرب عدد الأعمدة الأفقية في عدد الصفوف الرأسية (مثل 1920 × 1080).',
    example: 'دقة شاشة العرض أو مستشعر الكاميرا الرقمية.',
    code: 'resolution = (1920, 1080)',
  },
  {
    id: 'fc-14-6',
    stationId: 'station-14',
    microLessonId: '14.2',
    termAr: 'مستطيل الإحاطة',
    termEn: 'Bounding Box',
    definition:
      'مستطيل تخيلي أو مرسوم ترسمه خوارزميات الرؤية لتحديد موقع الكائن أو الوجه في الصورة، ويُحدد بإحداثيات البداية والأبعاد (x, y, w, h).',
    example: 'المربع الأخضر الذي يظهر حول الوجوه في كاميرا الهاتف.',
    code: 'bbox = (x, y, width, height)',
  },
  {
    id: 'fc-14-7',
    stationId: 'station-14',
    microLessonId: '14.2',
    termAr: 'اكتشاف الأجسام',
    termEn: 'Object Detection',
    definition:
      'مهمة ذكية تجمع بين تصنيف الكائن وتحديد مكانه وموقعه الجغرافي داخل كادر الصورة برسم Bounding Box حوله.',
    example: 'رصد مواقع السيارات والمشاة وإشارات المرور في الشارع.',
    code: 'detected_objects = detect(frame)',
  },
  {
    id: 'fc-14-8',
    stationId: 'station-14',
    microLessonId: '14.2',
    termAr: 'المعالم الوجهية',
    termEn: 'Facial Landmarks',
    definition:
      'نقاط بارزة ومحددة هندسيًا على الوجه (مثل زوايا العينين، طرف الأنف، حدود الشفتين) تُستخدم في تتبع الحركة وتطبيق الفلاتر.',
    example: 'فلاتر سناب شات وإنستغرام التفاعلية التي تتطابق مع حركة الوجه.',
    code: 'landmarks = get_face_points(face_image)',
  },
  {
    id: 'fc-14-9',
    stationId: 'station-14',
    microLessonId: '14.2',
    termAr: 'التعرف على الوجوه',
    termEn: 'Face Recognition',
    definition:
      'عملية مطابقة البصمة الحيوية للوجه مع قاعدة بيانات رسمية لتحديد هوية الشخص والتأكد من شخصيته.',
    example: 'ميزة فتح القفل بالوجه (Face Unlock) وبوابات المطارات الذكية.',
    code: 'if match_face(current_face, user_profile): unlock_phone()',
  },
  {
    id: 'fc-14-10',
    stationId: 'station-14',
    microLessonId: '14.3',
    termAr: 'السيارات ذاتية القيادة',
    termEn: 'Autonomous Vehicles (Self-Driving Cars)',
    definition:
      'مركبات مزودة بكاميرات وحساسات وخوارزميات رؤية حاسوبية تمكنها من القيادة والملاحة واتخاذ القرارات دون تدخل بشري.',
    example: 'سيارات تسلا ووايمو المجهزة بأنظمة الطيار الآلي.',
    code: 'vehicle.set_mode("autopilot")',
  },
  {
    id: 'fc-14-11',
    stationId: 'station-14',
    microLessonId: '14.3',
    termAr: 'تكامل الحساسات',
    termEn: 'Sensor Fusion',
    definition:
      'دمج البيانات الواردة من مصادر متعددة (الكاميرات البصرية، الرادار، الليدار، الحساسات الصوتية) لتكوين مشهد ثلاثي الأبعاد فائق الدقة.',
    example: 'الاعتماد على الرادار في الضباب الشديد حيث تقل كفاءة الكاميرا البصرية.',
    code: 'environment = fuse_sensors(camera, lidar, radar)',
  },
  {
    id: 'fc-14-12',
    stationId: 'station-14',
    microLessonId: '14.3',
    termAr: 'التحيز الخوارزمي',
    termEn: 'Algorithmic Bias',
    definition:
      'خلل أو عدم عدالة في نتائج الذكاء الاصطناعي ينتج عن تدريب الخوارزمية على بيانات وصور غير متوازنة، مما يؤدي للتمييز أو الخطأ في حق فئة معينة.',
    example: 'فشل كاميرا التعرف على الوجوه في تمييز أصحاب البشرة الداكنة لعدم تدريبها عليهم كفاية.',
    code: 'audit_fairness(dataset)',
  },
];
