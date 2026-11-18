import type { StationPack } from '@/types/curriculum';

export const STATION_12_PACK: StationPack = {
  id: 'station-12',
  unitId: 'unit-3',
  number: 12,
  title: 'أساسيات البرمجة كائنية التوجه (OOP Basics)',
  description:
    'الفئات (Classes) والكائنات (Objects) والدالة البنائية __init__ ومفهوم السمات والوظائف.',
  textbookPages: '33–48',
  access: 'free',
  status: 'draft',
  objectives: [
    'يفرّق بين الفئة (Class) كقالب عام والكائن (Object) كحالة فعلية في الذاكرة.',
    'يكتب فئة بسيطة تتضمن دالة البناء __init__ والمعامل self.',
    'يستدعي الوظائف (Methods) والخصائص (Attributes) عبر معامل النقطة (.).',
  ],
  lessons: [],
  quizBank: [],
  flashcards: [],
};
