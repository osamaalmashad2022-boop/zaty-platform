import { getAllStations, getFlashcardsByStation } from '@/content';
import { ReviewClient } from '@/app/_components/ReviewClient';

export default function ReviewPage() {
  const flashcards = getFlashcardsByStation();
  const stations = getAllStations().map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
  }));

  return <ReviewClient flashcards={flashcards} stations={stations} />;
}
