import type { FlashcardItem } from '@/types/curriculum';

export const STATION_4_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-4-1',
    stationId: 'station-4',
    microLessonId: '4.1',
    termAr: 'تعريف الدالة',
    termEn: 'def function_name(params):',
    definition: 'مجموعة تعليمات برمجية تُكتب مرة واحدة وتُستدعى عدة مرات لمنع التكرار.',
  },
  {
    id: 'fc-4-2',
    stationId: 'station-4',
    microLessonId: '4.1',
    termAr: 'المعاملات والوسائط',
    termEn: 'Parameters vs Arguments',
    definition: 'Parameters هي الأسماء بين الأقواس عند التعريف، بينما Arguments هي القيم المرسلة عند الاستدعاء.',
  },
  {
    id: 'fc-4-3',
    stationId: 'station-4',
    microLessonId: '4.2',
    termAr: 'القيمة المعادة مقابل الطباعة',
    termEn: 'return vs print()',
    definition: 'print() تعرض على الشاشة فقط، بينما return ترجع القيمة لحفظها في متغير.',
    code: 'def double(x):\n    return x * 2',
  },
  {
    id: 'fc-4-4',
    stationId: 'station-4',
    microLessonId: '4.2',
    termAr: 'النطاق المحلي',
    termEn: 'Local Scope',
    definition: 'المتغيرات المعرفة داخل الدالة لا يمكن الوصول إليها من خارجها وتسبب NameError إذا استُخدمت بالخارج.',
  },
  {
    id: 'fc-4-5',
    stationId: 'station-4',
    microLessonId: '4.3',
    termAr: 'دالة مساحة الدائرة',
    termEn: 'circle_area(radius)',
    definition: 'دالة تستقبل نصف القطر وتعيد المساحة بالقانون pi * radius * radius.',
  },
];
