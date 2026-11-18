import type { StationPack } from '@/types/curriculum';
import { LESSON_6_1 } from './lessons/lesson-6-1';
import { LESSON_6_2 } from './lessons/lesson-6-2';
import { LESSON_6_3 } from './lessons/lesson-6-3';
import { STATION_6_FLASHCARDS } from './flashcards';
import { STATION_6_QUIZ_BANK } from './quiz-bank';

export const STATION_6_PACK: StationPack = {
  id: 'station-6',
  unitId: 'unit-2',
  number: 6,
  title: 'التنبؤ باستخدام نموذج الذكاء الاصطناعي',
  description:
    'ميّز بين البرمجة التقليدية والتعلم الآلي، وافهم معادلة النموذج الخطي y = wx + b، وطبّق دالة predict_grade(x) بلغة Python.',
  textbookPages: '65–75',
  access: 'free',
  status: 'ready',
  objectives: [
    'يميز بين البرمجة التقليدية والتعلم الآلي.',
    'يناقش مفهوم التنبؤ باستخدام البيانات والنمط (Pattern).',
    'يفسر نموذجًا خطيًا بسيطًا بلغة Python.',
  ],
  lessons: [LESSON_6_1, LESSON_6_2, LESSON_6_3],
  quizBank: STATION_6_QUIZ_BANK,
  flashcards: STATION_6_FLASHCARDS,
  mediaAssets: [
    '/media/podcast-6-2.mp3',
    '/media/caption-6-2.vtt',
  ],
};
