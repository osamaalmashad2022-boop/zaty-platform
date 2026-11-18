import type { StationPack } from '@/types/curriculum';

export const STATION_10_PACK: StationPack = {
  id: 'station-10',
  unitId: 'unit-3',
  number: 10,
  title: 'القواميس (Dictionaries) ومجموعات البيانات المترابطة',
  description:
    'تعلّم بنية المفتاح والقيمة (Key-Value)، والوصول للعناصر وتحديثها والبحث بـ in داخل القواميس وتطبيقاتها.',
  textbookPages: '4–18',
  access: 'free',
  status: 'draft',
  objectives: [
    'يشرح مفهوم القاموس كأزواج مرتبطة من المفاتيح والقيم (Key: Value).',
    'يسترجع ويعدل القيم باستخدام المفتاح [key] ودالة get().',
    'يستخدم دوال keys() و values() و items() للمرور على عناصر القاموس في Python.',
  ],
  lessons: [],
  quizBank: [],
  flashcards: [],
};
