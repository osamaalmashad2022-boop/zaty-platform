import type { TermPack } from '@/types/curriculum';
import { UNIT_1_META } from './unit-1/meta';
import { STATION_1_PACK } from './unit-1/station-1/station';
import { STATION_2_PACK } from './unit-1/station-2/station';
import { STATION_3_PACK } from './unit-1/station-3/station';
import { STATION_4_PACK } from './unit-1/station-4/station';
import { STATION_5_PACK } from './unit-1/station-5/station';
import { UNIT_2_META } from './unit-2/meta';
import { STATION_6_PACK } from './unit-2/station-6/station';
import { STATION_7_PACK } from './unit-2/station-7/station';
import { STATION_8_PACK } from './unit-2/station-8/station';
import { STATION_9_PACK } from './unit-2/station-9/station';

export const PREP3_TERM1_PACK: TermPack = {
  id: 'prep3-term1',
  title: 'الكمبيوتر وتكنولوجيا المعلومات والاتصالات — الصف الثالث الإعدادي',
  grade: 'الصف الثالث الإعدادي',
  term: 'الفصل الدراسي الأول (2026 / 2027)',
  units: [
    {
      ...UNIT_1_META,
      stations: [
        STATION_1_PACK,
        STATION_2_PACK,
        STATION_3_PACK,
        STATION_4_PACK,
        STATION_5_PACK,
      ],
    },
    {
      ...UNIT_2_META,
      stations: [
        STATION_6_PACK,
        STATION_7_PACK,
        STATION_8_PACK,
        STATION_9_PACK,
      ],
    },
  ],
};
