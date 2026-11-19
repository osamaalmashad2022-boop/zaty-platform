import { CATALOG_TERMS, getFlashcardsByStation } from '@/content';
import { ReviewClient } from '@/app/_components/ReviewClient';

export default function ReviewPage() {
  const flashcards = getFlashcardsByStation();
  const stations = CATALOG_TERMS.flatMap((term) =>
    term.units.flatMap((u) =>
      u.stations.map((s) => ({
        id: s.id,
        number: s.number,
        title: s.title,
        termId: term.id,
        packId: term.courseId || term.id,
      })),
    ),
  );

  return <ReviewClient flashcards={flashcards} stations={stations} />;
}
