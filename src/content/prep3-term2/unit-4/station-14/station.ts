import type { StationPack } from '@/types/curriculum';
import { LESSON_14_1 } from './lessons/lesson-14-1';
import { LESSON_14_2 } from './lessons/lesson-14-2';
import { LESSON_14_3 } from './lessons/lesson-14-3';
import { STATION_14_FLASHCARDS } from './flashcards';
import { STATION_14_QUIZ_BANK } from './quiz-bank';

export const STATION_14_PACK: StationPack = {
  id: 'station-14',
  unitId: 'unit-4',
  number: 14,
  title: 'رؤية الكمبيوتر والتعرف على الصور (Computer Vision)',
  description:
    'بكسلات الصور ومصفوفات الألوان RGB واكتشاف الوجوه والأشياء وتطبيقات السيارات ذاتية القيادة.',
  textbookPages: '66–78',
  access: 'free',
  status: 'ready',
  objectives: [
    'يفهم كيف يرى الحاسوب الصورة كمصفوفة أرقام وبكسلات لونية (RGB).',
    'يميز مراحل اكتشاف الوجه (Face Detection) وتمييز المعالم الوجهية وتتبع الأجسام.',
    'يناقش تطبيقات رؤية الحاسوب الأخلاقية والأمنية والطبية مثل السيارات ذاتية القيادة.',
  ],
  lessons: [LESSON_14_1, LESSON_14_2, LESSON_14_3],
  quizBank: STATION_14_QUIZ_BANK,
  flashcards: STATION_14_FLASHCARDS,
  mediaAssets: [
    '/media/video-14-1.mp4',
    '/media/caption-14-1.vtt',
    '/media/podcast-14-2.mp3',
    '/media/caption-14-2.vtt',
    '/media/video-14-3.mp4',
    '/media/caption-14-3.vtt',
  ],
};
