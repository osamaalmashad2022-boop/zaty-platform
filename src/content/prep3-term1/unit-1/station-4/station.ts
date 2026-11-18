import type { StationPack } from '@/types/curriculum';
import { LESSON_4_1 } from './lessons/lesson-4-1';
import { LESSON_4_2 } from './lessons/lesson-4-2';
import { LESSON_4_3 } from './lessons/lesson-4-3';
import { STATION_4_FLASHCARDS } from './flashcards';
import { STATION_4_QUIZ_BANK } from './quiz-bank';

export const STATION_4_PACK: StationPack = {
  id: 'station-4',
  unitId: 'unit-1',
  number: 4,
  title: 'الدوال ذات المعاملات في Python',
  description:
    'نظّم كودك في دوال قابلة لإعادة الاستخدام، وفرّق بين Parameters و Arguments و return و print والنطاق المحلي.',
  textbookPages: '43–52',
  access: 'free',
  status: 'ready',
  objectives: [
    'يشرح معنى الدالة (Function) ويعرّفها بكلمة def.',
    'يميز بين Parameters و Arguments، وبين print() و return، والنطاق المحلي.',
    'يستخدم الدوال في حل مشكلات رياضية مثل مساحة الدائرة.',
  ],
  lessons: [LESSON_4_1, LESSON_4_2, LESSON_4_3],
  quizBank: STATION_4_QUIZ_BANK,
  flashcards: STATION_4_FLASHCARDS,
  mediaAssets: [
    '/media/robot-puzzle.png',
    '/media/robot-path.png',
    '/media/video-4-2.mp4',
    '/media/video-4-2-thumb.png',
    '/media/caption-4-2.vtt',
  ],
};
