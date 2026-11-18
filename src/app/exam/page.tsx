import { getAllStations, getExamQuizPool } from '@/content';
import { ExamClient } from '@/app/_components/ExamClient';

export default function ExamPage() {
  const stations = getAllStations().map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
    lessons: s.lessons.map((l) => ({ id: l.id, title: l.title })),
  }));
  const quizPool = getExamQuizPool();

  return <ExamClient stations={stations} quizPool={quizPool} />;
}
