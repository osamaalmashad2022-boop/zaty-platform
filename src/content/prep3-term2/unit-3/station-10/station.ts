import type { StationPack } from '@/types/curriculum';
import { LESSON_10_1 } from './lessons/lesson-10-1';
import { LESSON_10_2 } from './lessons/lesson-10-2';
import { LESSON_10_3 } from './lessons/lesson-10-3';
import { STATION_10_FLASHCARDS } from './flashcards';
import { STATION_10_QUIZ_BANK } from './quiz-bank';

export const STATION_10_PACK: StationPack = {
  id: 'station-10',
  unitId: 'unit-3',
  number: 10,
  title: 'القواميس (Dictionaries) ومجموعات البيانات المترابطة',
  description:
    'تعلّم بنية المفتاح والقيمة (Key-Value)، والوصول للعناصر وتحديثها والبحث بـ in داخل القواميس وتطبيقاتها.',
  textbookPages: '4–18',
  access: 'free',
  status: 'ready',
  objectives: [
    'يشرح مفهوم القاموس كأزواج مرتبطة من المفاتيح والقيم (Key: Value).',
    'يسترجع ويعدل القيم باستخدام المفتاح [key] ودالة get().',
    'يستخدم دوال keys() و values() و items() للمرور على عناصر القاموس في Python.',
  ],
  lessons: [LESSON_10_1, LESSON_10_2, LESSON_10_3],
  quizBank: STATION_10_QUIZ_BANK,
  flashcards: STATION_10_FLASHCARDS,
};
