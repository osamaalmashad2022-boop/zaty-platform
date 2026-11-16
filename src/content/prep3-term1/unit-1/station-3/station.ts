import type { StationPack } from '@/types/curriculum';
import { LESSON_3_1 } from './lessons/lesson-3-1';
import { LESSON_3_2 } from './lessons/lesson-3-2';
import { LESSON_3_3 } from './lessons/lesson-3-3';
import { LESSON_3_4 } from './lessons/lesson-3-4';
import { STATION_3_FLASHCARDS } from './flashcards';
import { STATION_3_QUIZ_BANK } from './quiz-bank';

export const STATION_3_PACK: StationPack = {
  id: 'station-3',
  unitId: 'unit-1',
  number: 3,
  title: 'السلاسل النصية والقوائم في Python',
  description:
    'اتعامل مع النصوص والفهرسة الموجبة والسالبة والقوائم القابلة للتعديل، وابنِ أداة فحص قوة كلمة المرور.',
  textbookPages: '31–42',
  access: 'free',
  status: 'ready',
  objectives: [
    'يفهم معنى السلاسل النصية والقوائم والفرق بين Mutable و Immutable.',
    'يستخدم الفهرسة والدوال len / upper / in و append / remove.',
    'يكتب برامج باستخدام الحلقات التكرارية مع النصوص والقوائم.',
  ],
  lessons: [LESSON_3_1, LESSON_3_2, LESSON_3_3, LESSON_3_4],
  quizBank: STATION_3_QUIZ_BANK,
  flashcards: STATION_3_FLASHCARDS,
};
