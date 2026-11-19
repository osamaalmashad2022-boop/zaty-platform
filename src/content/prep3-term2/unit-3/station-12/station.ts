import type { StationPack } from '@/types/curriculum';
import { LESSON_12_1 } from './lessons/lesson-12-1';
import { LESSON_12_2 } from './lessons/lesson-12-2';
import { LESSON_12_3 } from './lessons/lesson-12-3';
import { STATION_12_FLASHCARDS } from './flashcards';
import { STATION_12_QUIZ_BANK } from './quiz-bank';

export const STATION_12_PACK: StationPack = {
  id: 'station-12',
  unitId: 'unit-3',
  number: 12,
  title: 'أساسيات البرمجة كائنية التوجه (OOP Basics)',
  description:
    'الفئات (Classes) والكائنات (Objects) والدالة البنائية __init__ ومفهوم السمات والوظائف.',
  textbookPages: '33–48',
  access: 'free',
  status: 'ready',
  objectives: [
    'يفرّق بين الفئة (Class) كقالب عام والكائن (Object) كحالة فعلية في الذاكرة.',
    'يكتب فئة بسيطة تتضمن دالة البناء __init__ والمعامل self.',
    'يستدعي الوظائف (Methods) والخصائص (Attributes) عبر معامل النقطة (.).',
  ],
  lessons: [LESSON_12_1, LESSON_12_2, LESSON_12_3],
  quizBank: STATION_12_QUIZ_BANK,
  flashcards: STATION_12_FLASHCARDS,
  mediaAssets: [
    '/media/video-12-1.mp4',
    '/media/caption-12-1.vtt',
    '/media/podcast-12-2.mp3',
    '/media/caption-12-2.vtt',
    '/media/video-12-3.mp4',
    '/media/caption-12-3.vtt',
  ],
};
