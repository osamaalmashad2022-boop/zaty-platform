import { getAllStations } from '@/content';
import { ProgressClient } from '@/app/_components/ProgressClient';

export default function ProgressPage() {
  const stations = getAllStations().map((s) => ({
    id: s.id,
    unitId: s.unitId,
    number: s.number,
    title: s.title,
    lessons: s.lessons.map((l) => ({ id: l.id, title: l.title })),
  }));

  return <ProgressClient stations={stations} />;
}
