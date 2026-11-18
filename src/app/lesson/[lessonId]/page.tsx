import { notFound } from 'next/navigation';
import { getAllLessons, getLessonById, getStationById } from '@/content';
import { LessonPlayerClient } from '@/app/_components/LessonPlayerClient';

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({
    lessonId: lesson.id,
  }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLessonById(decodeURIComponent(lessonId));
  if (!lesson) {
    notFound();
  }

  const station = getStationById(lesson.stationId);

  return (
    <LessonPlayerClient
      lesson={lesson}
      stationTitle={station ? `المحطة ${station.number}: ${station.title}` : 'العودة للمحطة'}
    />
  );
}
