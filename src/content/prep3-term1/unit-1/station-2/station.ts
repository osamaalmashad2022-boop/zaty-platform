import type { StationPack } from '@/types/curriculum';
import { LESSON_2_1 } from './lessons/lesson-2-1';
import { LESSON_2_2 } from './lessons/lesson-2-2';
import { LESSON_2_3 } from './lessons/lesson-2-3';
import { LESSON_2_4 } from './lessons/lesson-2-4';
import { STATION_2_FLASHCARDS } from './flashcards';
import { STATION_2_QUIZ_BANK } from './quiz-bank';

export const STATION_2_PACK: StationPack = {
  id: 'station-2',
  unitId: 'unit-1',
  number: 2,
  title: 'خوارزميات الذكاء الاصطناعي',
  description:
    'أتقن أشكال خرائط التدفق وأنواع الخوارزميات التقليدية الخمسة، ثم اكتشف كيف يتعلم الذكاء الاصطناعي من البيانات عبر تعلم الآلة والتعلم العميق.',
  textbookPages: '18–30',
  access: 'free',
  status: 'ready',
  objectives: [
    'يشرح أنواع الخوارزميات التقليدية الخمسة ورموز خرائط التدفق.',
    'يميز بين الخوارزميات التقليدية وخوارزميات الذكاء الاصطناعي.',
    'يكتب خوارزميات بسيطة بلغة Python.',
  ],
  lessons: [LESSON_2_1, LESSON_2_2, LESSON_2_3, LESSON_2_4],
  quizBank: STATION_2_QUIZ_BANK,
  flashcards: STATION_2_FLASHCARDS,
  mediaAssets: ['/media/robot-path.png'],
};
