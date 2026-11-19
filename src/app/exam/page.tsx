import { CATALOG_TERMS, getExamQuizPool } from '@/content';
import { ExamClient } from '@/app/_components/ExamClient';

export default function ExamPage() {
  const stations = CATALOG_TERMS.flatMap((term) =>
    term.units.flatMap((u) =>
      u.stations.map((s) => ({
        id: s.id,
        number: s.number,
        title: s.title,
        termId: term.id,
        packId: term.courseId || term.id,
        lessons: s.lessons.map((l) => ({ id: l.id, title: l.title })),
      })),
    ),
  );
  const quizPool = getExamQuizPool();

  return <ExamClient stations={stations} quizPool={quizPool} />;
}
