import type { StationPack } from '@/types/curriculum';
import { LESSON_13_1 } from './lessons/lesson-13-1';
import { LESSON_13_2 } from './lessons/lesson-13-2';
import { LESSON_13_3 } from './lessons/lesson-13-3';
import { STATION_13_FLASHCARDS } from './flashcards';
import { STATION_13_QUIZ_BANK } from './quiz-bank';

export const STATION_13_PACK: StationPack = {
  id: 'station-13',
  unitId: 'unit-4',
  number: 13,
  title: 'معالجة اللغات الطبيعية (NLP) وفهم النصوص',
  description:
    'كيف يحلل الذكاء الاصطناعي الكلمات، وتقسيم النصوص (Tokenization)، وتصنيف المشاعر والتطبيقات الذكية.',
  textbookPages: '50–65',
  access: 'free',
  status: 'ready',
  objectives: [
    'يشرح دور معالجة اللغات الطبيعية في الشات بوت ومحركات البحث والمترجمات.',
    'يفهم مراحل التقطيع النصي (Tokenization) وإزالة الكلمات الشائعة (Stop Words).',
    'يطبّق منطق تصنيف المشاعر البسيط (Sentiment Analysis) بلغة بايثون.',
  ],
  lessons: [LESSON_13_1, LESSON_13_2, LESSON_13_3],
  quizBank: STATION_13_QUIZ_BANK,
  flashcards: STATION_13_FLASHCARDS,
};
