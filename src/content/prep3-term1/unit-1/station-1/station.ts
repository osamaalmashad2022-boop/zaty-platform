import type { StationPack } from '@/types/curriculum';
import { LESSON_1_1 } from './lessons/lesson-1-1';
import { LESSON_1_2 } from './lessons/lesson-1-2';
import { LESSON_1_3 } from './lessons/lesson-1-3';
import { LESSON_1_4 } from './lessons/lesson-1-4';
import { LESSON_1_5 } from './lessons/lesson-1-5';
import { STATION_1_FLASHCARDS } from './flashcards';
import { STATION_1_QUIZ_BANK } from './quiz-bank';

export const STATION_1_PACK: StationPack = {
  id: 'station-1',
  unitId: 'unit-1',
  number: 1,
  title: 'التفكير الحاسوبي وحل المشكلات',
  description:
    'تعرف على معنى المشكلة وأركان التفكير الحاسوبي الأربعة وخطوات الحل الخمس، ثم اكتب أول برامج Python بالإدخال والشروط والحلقات.',
  textbookPages: '5–17',
  access: 'free',
  status: 'ready',
  objectives: [
    'يشرح معنى المشكلة ومعنى التفكير الحاسوبي وأركانه الأربعة.',
    'يحدد خطوات حل المشكلة الخمس ويربطها بالتفكير الحاسوبي.',
    'يكتب ويشغّل برامج Python بسيطة بالإدخال والشروط والحلقات.',
  ],
  lessons: [LESSON_1_1, LESSON_1_2, LESSON_1_3, LESSON_1_4, LESSON_1_5],
  quizBank: STATION_1_QUIZ_BANK,
  flashcards: STATION_1_FLASHCARDS,
  mediaAssets: [
    '/media/video-1-1.mp4',
    '/media/caption-1-1.vtt',
    '/media/video-1-1-thumb.png',
    '/media/robot-puzzle.png',
    '/media/lesson-1-1-goal-obstacle.jpg',
    '/media/lesson-1-1-ct-pillars.jpg',
    '/media/infographic-1-1.png',
    '/media/podcast-1-1.mp3',
    '/media/video-1-2.mp4',
    '/media/caption-1-2.vtt',
    '/media/lesson-1-2-five-steps.jpg',
    '/media/infographic-1-2.png',
    '/media/podcast-1-2.mp3',
    '/media/video-1-3.mp4',
    '/media/caption-1-3.vtt',
    '/media/lesson-1-3-input-box.jpg',
    '/media/infographic-1-3.png',
    '/media/podcast-1-3.mp3',
    '/media/video-1-4.mp4',
    '/media/caption-1-4.vtt',
    '/media/lesson-1-4-float-vs-int.jpg',
    '/media/infographic-1-4.png',
    '/media/podcast-1-4.mp3',
    '/media/video-1-5.mp4',
    '/media/caption-1-5.vtt',
    '/media/lesson-1-5-loop-track.jpg',
    '/media/infographic-1-5.png',
    '/media/podcast-1-5.mp3',
  ],
};
