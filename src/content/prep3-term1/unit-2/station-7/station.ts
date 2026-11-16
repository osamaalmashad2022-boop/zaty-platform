import type { StationPack } from '@/types/curriculum';
import { LESSON_7_1 } from './lessons/lesson-7-1';
import { LESSON_7_2 } from './lessons/lesson-7-2';
import { STATION_7_FLASHCARDS } from './flashcards';
import { STATION_7_QUIZ_BANK } from './quiz-bank';

export const STATION_7_PACK: StationPack = {
  id: 'station-7',
  unitId: 'unit-2',
  number: 7,
  title: 'الذكاء الاصطناعي وحقوق الملكية الفكرية',
  description:
    'تعلّم كيف تحمي بياناتك الشخصية (PII) وتفهم شروط الاستخدام (TOS) وتطبق قاعدة المصادر الثلاثة لتجنب السرقة الأدبية.',
  textbookPages: '76–80',
  access: 'free',
  status: 'ready',
  objectives: [
    'يشرح حماية البيانات الشخصية (PII) وحقوق الملكية الفكرية مع تطبيقات الذكاء الاصطناعي.',
    'يفهم شروط الاستخدام (TOS) وحق الحذف والشرط العمري.',
    'يطبق قاعدة المصادر الثلاثة والشفافية الأكاديمية.',
  ],
  lessons: [LESSON_7_1, LESSON_7_2],
  quizBank: STATION_7_QUIZ_BANK,
  flashcards: STATION_7_FLASHCARDS,
};
