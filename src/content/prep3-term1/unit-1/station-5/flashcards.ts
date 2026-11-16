import type { FlashcardItem } from '@/types/curriculum';

export const STATION_5_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-5-1',
    stationId: 'station-5',
    microLessonId: '5.1',
    termAr: 'كتلة المحاولة والاعتراض',
    termEn: 'try / except',
    definition: 'بنية برمجية تجرب تنفيذ الكود في try وتلتقط الأخطاء في except لمنع توقف البرنامج.',
  },
  {
    id: 'fc-5-2',
    stationId: 'station-5',
    microLessonId: '5.2',
    termAr: 'خطأ القيمة',
    termEn: 'ValueError',
    definition: 'خطأ يحدث عند محاولة تحويل نص غير رقمي مثل "abc" باستخدام int().',
  },
  {
    id: 'fc-5-3',
    stationId: 'station-5',
    microLessonId: '5.2',
    termAr: 'خطأ القسمة على صفر',
    termEn: 'ZeroDivisionError',
    definition: 'خطأ يحدث عند محاولة القسمة على العدد 0.',
  },
  {
    id: 'fc-5-4',
    stationId: 'station-5',
    microLessonId: '5.3',
    termAr: 'حلقة التحقق وإعادة المحاولة',
    termEn: 'while True + try/except + break',
    definition: 'نمط يكرر طلب الإدخال من المستخدم ولا يخرج من الحلقة إلا بعد نجاح التحويل بدون خطأ.',
  },
];
