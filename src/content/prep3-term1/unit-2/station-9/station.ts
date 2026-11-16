import type { StationPack } from '@/types/curriculum';
import { LESSON_9_1 } from './lessons/lesson-9-1';
import { LESSON_9_2 } from './lessons/lesson-9-2';
import { LESSON_9_3 } from './lessons/lesson-9-3';
import { STATION_9_FLASHCARDS } from './flashcards';
import { STATION_9_QUIZ_BANK } from './quiz-bank';

export const STATION_9_PACK: StationPack = {
  id: 'station-9',
  unitId: 'unit-2',
  number: 9,
  title: 'الذكاء الاصطناعي والتزييف العميق Deepfake',
  description:
    'افهم تقنية GANs وصراع المولد والمميز، واكتشف علامات التزييف العميق بالعين وأدوات الكشف، وتحمّل مسؤولية المواطن الرقمي الواعي.',
  textbookPages: '87–95',
  access: 'free',
  status: 'awaiting_pack',
  objectives: [
    'يشرح مفهوم التزييف العميق Deepfake وتقنية GANs.',
    'يحدد العلامات البصرية وأدوات الكشف الآلي للمحتوى المزيف.',
    'يلتزم بالتفكير الناقد وعدم مشاركة المحتوى المشبوه.',
  ],
  lessons: [LESSON_9_1, LESSON_9_2, LESSON_9_3],
  quizBank: STATION_9_QUIZ_BANK,
  flashcards: STATION_9_FLASHCARDS,
};
