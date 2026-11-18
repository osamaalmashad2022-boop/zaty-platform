import type { StationPack } from '@/types/curriculum';

export const STATION_11_PACK: StationPack = {
  id: 'station-11',
  unitId: 'unit-3',
  number: 11,
  title: 'التعامل مع الملفات النصية (File Handling)',
  description:
    'قراءة وكتابة البيانات في ملفات خارجية باستخدام دالة open وأنماط r و w و a وإدارة الموارد بـ with.',
  textbookPages: '19–32',
  access: 'free',
  status: 'draft',
  objectives: [
    'يفتح الملفات النصية ويقرأ محتواها بسطر واحد أو كامل الملف (read / readline).',
    'يكتب بيانات جديدة ويستخدم وضع الإلحاق append (a) دون مسح البيانات السابقة.',
    'يستخدم سياق with open لضمان إغلاق الملفات تلقائيًا وتفادي تسريب الذاكرة.',
  ],
  lessons: [],
  quizBank: [],
  flashcards: [],
};
