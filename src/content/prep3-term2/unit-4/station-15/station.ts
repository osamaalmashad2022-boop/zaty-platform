import type { StationPack } from '@/types/curriculum';
import { LESSON_15_1 } from './lessons/lesson-15-1';
import { LESSON_15_2 } from './lessons/lesson-15-2';
import { LESSON_15_3 } from './lessons/lesson-15-3';
import { STATION_15_FLASHCARDS } from './flashcards';
import { STATION_15_QUIZ_BANK } from './quiz-bank';

export const STATION_15_PACK: StationPack = {
  id: 'station-15',
  unitId: 'unit-4',
  number: 15,
  title: 'إنترنت الأشياء والحوسبة السحابية ومستقبل الوظائف',
  description:
    'الحساسات والأجهزة المتصلة (IoT)، ومفاهيم السحابة (Cloud)، والمهارات الرقمية والمسؤولية الأخلاقية.',
  textbookPages: '79–92',
  access: 'free',
  status: 'ready',
  objectives: [
    'يعرف إنترنت الأشياء (IoT) ودور الحساسات في المدن الذكية والتحكم الآلي.',
    'يفهم الحوسبة السحابية وفوائدها التخزينية والحسابية والأمان الرقمي.',
    'يحدد المهارات التقنية والأخلاقية المطلوبة لمستقبل العمل والذكاء الاصطناعي.',
  ],
  lessons: [LESSON_15_1, LESSON_15_2, LESSON_15_3],
  quizBank: STATION_15_QUIZ_BANK,
  flashcards: STATION_15_FLASHCARDS,
  mediaAssets: [
    '/media/video-15-1.mp4',
    '/media/caption-15-1.vtt',
    '/media/podcast-15-2.mp3',
    '/media/caption-15-2.vtt',
    '/media/video-15-3.mp4',
    '/media/caption-15-3.vtt',
  ],
};
