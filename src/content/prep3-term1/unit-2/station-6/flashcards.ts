import type { FlashcardItem } from '@/types/curriculum';

export const STATION_6_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-6-1',
    stationId: 'station-6',
    microLessonId: '6.1',
    termAr: 'التنبؤ',
    termEn: 'Prediction',
    definition: 'توقع قيمة غير معروفة مستقبلًا اعتمادًا على بيانات سابقة واكتشاف نمط متكرر (Pattern).',
  },
  {
    id: 'fc-6-2',
    stationId: 'station-6',
    microLessonId: '6.2',
    termAr: 'النموذج الخطي',
    termEn: 'Linear Model (y = w*x + b)',
    definition: 'أبسط نموذج رياضي في الذكاء الاصطناعي: x المدخل، w مقدار التأثير لكل وحدة، b القيمة الثابتة عند x=0، و y الناتج المتوقع.',
  },
  {
    id: 'fc-6-3',
    stationId: 'station-6',
    microLessonId: '6.3',
    termAr: 'دالة التنبؤ في Python',
    termEn: 'predict_grade(x)',
    definition: 'دالة تطبق المعادلة y = w * x + b وتعيد الدرجة المتوقعة عبر return.',
    code: 'def predict_grade(x):\n    return 5 * x + 10',
  },
];
