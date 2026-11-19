import { CATALOG_TERMS } from '@/content';
import { ProgressClient } from '@/app/_components/ProgressClient';

export default function ProgressPage() {
  const stations = CATALOG_TERMS.flatMap((term) =>
    term.units.flatMap((u) =>
      u.stations.map((s) => ({
        id: s.id,
        unitId: s.unitId,
        number: s.number,
        title: s.title,
        termId: term.id,
        packId: term.courseId || term.id,
        lessons: s.lessons.map((l) => ({ id: l.id, title: l.title })),
      })),
    ),
  );

  return <ProgressClient stations={stations} />;
}
