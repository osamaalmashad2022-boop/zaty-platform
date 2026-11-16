import type { StationPack } from '@/types/curriculum';
import { LESSON_5_1 } from './lessons/lesson-5-1';
import { LESSON_5_2 } from './lessons/lesson-5-2';
import { LESSON_5_3 } from './lessons/lesson-5-3';
import { STATION_5_FLASHCARDS } from './flashcards';
import { STATION_5_QUIZ_BANK } from './quiz-bank';

export const STATION_5_PACK: StationPack = {
  id: 'station-5',
  unitId: 'unit-1',
  number: 5,
  title: 'معالجة أخطاء مدخلات المستخدم في Python',
  description:
    'احمِ برامجك من التوقف المفاجئ باستخدام try و except، وميّز بين ValueError و ZeroDivisionError، وابنِ حلقات إعادة المحاولة.',
  textbookPages: '53–63',
  access: 'free',
  status: 'draft',
  objectives: [
    'يشرح سبب حدوث الأخطاء عند إدخال البيانات.',
    'يستخدم try و except لمعالجة ValueError و ZeroDivisionError.',
    'يكتب برامج لا تتوقف عند حدوث خطأ باستخدام while True و break.',
  ],
  lessons: [LESSON_5_1, LESSON_5_2, LESSON_5_3],
  quizBank: STATION_5_QUIZ_BANK,
  flashcards: STATION_5_FLASHCARDS,
  mediaAssets: ['/media/robot-shield.png'],
};
