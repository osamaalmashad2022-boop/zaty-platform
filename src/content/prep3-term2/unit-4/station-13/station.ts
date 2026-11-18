import type { StationPack } from '@/types/curriculum';

export const STATION_13_PACK: StationPack = {
  id: 'station-13',
  unitId: 'unit-4',
  number: 13,
  title: 'معالجة اللغات الطبيعية (NLP) وفهم النصوص',
  description:
    'كيف يحلل الذكاء الاصطناعي الكلمات، وتقسيم النصوص (Tokenization)، وتصنيف المشاعر والتطبيقات الذكية.',
  textbookPages: '50–65',
  access: 'free',
  status: 'draft',
  objectives: [
    'يشرح دور معالجة اللغات الطبيعية في الشات بوت ومحركات البحث والمترجمات.',
    'يفهم مراحل التقطيع النصي (Tokenization) وإزالة الكلمات الشائعة (Stop Words).',
    'يطبّق منطق تصنيف المشاعر البسيط (Sentiment Analysis) بلغة بايثون.',
  ],
  lessons: [],
  quizBank: [],
  flashcards: [],
};
