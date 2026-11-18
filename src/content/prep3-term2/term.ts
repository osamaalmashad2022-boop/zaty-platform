import type { TermPack } from '@/types/curriculum';
import { UNIT_3_META } from './unit-3/meta';
import { STATION_10_PACK } from './unit-3/station-10/station';
import { STATION_11_PACK } from './unit-3/station-11/station';
import { STATION_12_PACK } from './unit-3/station-12/station';
import { UNIT_4_META } from './unit-4/meta';
import { STATION_13_PACK } from './unit-4/station-13/station';
import { STATION_14_PACK } from './unit-4/station-14/station';
import { STATION_15_PACK } from './unit-4/station-15/station';

export const PREP3_TERM2_PACK: TermPack = {
  id: 'prep3-term2',
  courseId: 'prep3-term2-ict',
  title: 'الكمبيوتر وتكنولوجيا المعلومات والاتصالات — الصف الثالث الإعدادي',
  grade: 'الصف الثالث الإعدادي',
  term: 'الفصل الدراسي الثاني (2026 / 2027)',
  units: [
    {
      ...UNIT_3_META,
      stations: [STATION_10_PACK, STATION_11_PACK, STATION_12_PACK],
    },
    {
      ...UNIT_4_META,
      stations: [STATION_13_PACK, STATION_14_PACK, STATION_15_PACK],
    },
  ],
};
