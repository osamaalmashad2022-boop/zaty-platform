import type { StationPack } from '@/types/curriculum';
import { LESSON_11_1 } from './lessons/lesson-11-1';
import { LESSON_11_2 } from './lessons/lesson-11-2';
import { LESSON_11_3 } from './lessons/lesson-11-3';
import { STATION_11_FLASHCARDS } from './flashcards';
import { STATION_11_QUIZ_BANK } from './quiz-bank';

export const STATION_11_PACK: StationPack = {
  id: 'station-11',
  unitId: 'unit-3',
  number: 11,
  title: 'التعامل مع الملفات النصية (File Handling)',
  description:
    'قراءة وكتابة البيانات في ملفات خارجية باستخدام دالة open وأنماط r و w و a وإدارة الموارد بـ with.',
  textbookPages: '19–32',
  access: 'free',
  status: 'ready',
  objectives: [
    'يفتح الملفات النصية ويقرأ محتواها بسطر واحد أو كامل الملف (read / readline).',
    'يكتب بيانات جديدة ويستخدم وضع الإلحاق append (a) دون مسح البيانات السابقة.',
    'يستخدم سياق with open لضمان إغلاق الملفات تلقائيًا وتفادي تسريب الذاكرة.',
  ],
  lessons: [LESSON_11_1, LESSON_11_2, LESSON_11_3],
  quizBank: STATION_11_QUIZ_BANK,
  flashcards: STATION_11_FLASHCARDS,
  mediaAssets: [
    '/media/video-11-1.mp4',
    '/media/caption-11-1.vtt',
    '/media/podcast-11-2.mp3',
    '/media/caption-11-2.vtt',
    '/media/video-11-3.mp4',
    '/media/caption-11-3.vtt',
  ],
};
