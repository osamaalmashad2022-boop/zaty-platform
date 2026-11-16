import type { StationPack } from '@/types/curriculum';
import { LESSON_8_1 } from './lessons/lesson-8-1';
import { LESSON_8_2 } from './lessons/lesson-8-2';
import { STATION_8_FLASHCARDS } from './flashcards';
import { STATION_8_QUIZ_BANK } from './quiz-bank';

export const STATION_8_PACK: StationPack = {
  id: 'station-8',
  unitId: 'unit-2',
  number: 8,
  title: 'الوعي السيبراني والألعاب الإلكترونية الخطرة',
  description:
    'اعرف فوائد الألعاب الهادفة ومخاطر الحيل النفسية (Dark Patterns و Loot Boxes و FOMO)، وتعلّم ضوابط التوازن الرقمي.',
  textbookPages: '81–86',
  access: 'free',
  status: 'awaiting_pack',
  objectives: [
    'يميز بين أنواع الألعاب الإلكترونية وفوائدها ومخاطرها.',
    'يشرح إجراءات الحد من التأثير السلبي للألعاب عالميًا.',
    'يستخدم أدوات إدارة الوقت والأنشطة البديلة.',
  ],
  lessons: [LESSON_8_1, LESSON_8_2],
  quizBank: STATION_8_QUIZ_BANK,
  flashcards: STATION_8_FLASHCARDS,
};
