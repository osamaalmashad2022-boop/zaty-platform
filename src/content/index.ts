import type {
  FlashcardItem,
  LessonPack,
  QuizItem,
  StationPack,
  TermPack,
  UnitPack,
} from '@/types/curriculum';
import { PREP3_TERM1_PACK } from './prep3-term1/term';

export const TERM_1_PACK: TermPack = PREP3_TERM1_PACK;
export const CATALOG_TERMS: TermPack[] = [PREP3_TERM1_PACK];

function normalizeLessonId(lessonId: string): string {
  const trimmed = lessonId.trim();
  if (/^\d+-\d+$/.test(trimmed)) {
    return trimmed.replace('-', '.');
  }
  return trimmed;
}

export function getTermPack(termId = 'prep3-term1'): TermPack {
  return CATALOG_TERMS.find((t) => t.id === termId) ?? TERM_1_PACK;
}

export function getAllUnits(): UnitPack[] {
  return TERM_1_PACK.units;
}

export function getUnitById(unitId: string): UnitPack | undefined {
  return getAllUnits().find((u) => u.id === unitId);
}

export function getAllStations(): StationPack[] {
  return getAllUnits().flatMap((u) => u.stations);
}

export function getStationById(stationId: string): StationPack | undefined {
  return getAllStations().find((s) => s.id === stationId);
}

export function getAllLessons(): LessonPack[] {
  return getAllStations().flatMap((s) => s.lessons);
}

export function getLessonById(lessonId: string): LessonPack | undefined {
  const normalized = normalizeLessonId(lessonId);
  return getAllLessons().find(
    (lesson) => lesson.id === lessonId || lesson.id === normalized,
  );
}

export function getStationLessons(stationId: string): LessonPack[] {
  return getStationById(stationId)?.lessons ?? [];
}

export function getNextLesson(lessonId: string): LessonPack | undefined {
  const current = getLessonById(lessonId);
  if (!current) return undefined;
  const lessons = getAllLessons();
  const idx = lessons.findIndex((l) => l.id === current.id);
  if (idx < 0 || idx >= lessons.length - 1) return undefined;
  return lessons[idx + 1];
}

export function getPreviousLesson(lessonId: string): LessonPack | undefined {
  const current = getLessonById(lessonId);
  if (!current) return undefined;
  const lessons = getAllLessons();
  const idx = lessons.findIndex((l) => l.id === current.id);
  if (idx <= 0) return undefined;
  return lessons[idx - 1];
}

export function getStationQuizItems(stationId: string): QuizItem[] {
  return getStationById(stationId)?.quizBank ?? [];
}

export function getLessonQuizItems(lessonId: string): QuizItem[] {
  const normalized = normalizeLessonId(lessonId);
  return getAllStations()
    .flatMap((s) => s.quizBank)
    .filter((q) => q.microLessonId === lessonId || q.microLessonId === normalized);
}

export function getExamQuizPool(stationIds?: string[], limit?: number): QuizItem[] {
  const stations = stationIds && stationIds.length > 0
    ? getAllStations().filter((s) => stationIds.includes(s.id))
    : getAllStations();
  const items = stations.flatMap((s) => s.quizBank);
  if (typeof limit === 'number' && limit > 0) {
    return items.slice(0, limit);
  }
  return items;
}

export function getFlashcardsByStation(stationId?: string): FlashcardItem[] {
  if (stationId) {
    return getStationById(stationId)?.flashcards ?? [];
  }
  return getAllStations().flatMap((s) => s.flashcards);
}

export function getStationMediaAssets(stationId: string): string[] {
  return getStationById(stationId)?.mediaAssets ?? [];
}
