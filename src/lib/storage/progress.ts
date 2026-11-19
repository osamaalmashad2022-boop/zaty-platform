import type {
  ActivityAttemptPayload,
  BadgeId,
  BadgeStatus,
  CachedLessonRecord,
  CardViewedPayload,
  FlashcardReviewState,
  FlashcardReviewedPayload,
  FrictionEvent,
  FrictionSummary,
  LearnerStats,
  LearningEvent,
  LearningEventType,
  LessonCompletedPayload,
  LessonPack,
  QuizAttemptSummary,
  QuizSubmittedPayload,
  StationProgressSummary,
  StationUnlockedPayload,
} from '@/types/curriculum';
import { DEFAULT_COURSE_ID } from '@/content/catalog';
import { getDb, isIndexedDbAvailable, type IctDatabase } from './db';

export interface CurriculumTopology {
  stationLessons: Record<string, string[]>;
  unit1Stations: string[];
  allStations: string[];
}

export const PREP3_TERM1_TOPOLOGY: CurriculumTopology = {
  stationLessons: {
    'station-1': ['1.1', '1.2', '1.3', '1.4', '1.5'],
    'station-2': ['2.1', '2.2', '2.3', '2.4'],
    'station-3': ['3.1', '3.2', '3.3', '3.4'],
    'station-4': ['4.1', '4.2', '4.3'],
    'station-5': ['5.1', '5.2', '5.3'],
    'station-6': ['6.1', '6.2', '6.3'],
    'station-7': ['7.1', '7.2'],
    'station-8': ['8.1', '8.2'],
    'station-9': ['9.1', '9.2', '9.3'],
  },
  unit1Stations: ['station-1', 'station-2', 'station-3', 'station-4', 'station-5'],
  allStations: [
    'station-1',
    'station-2',
    'station-3',
    'station-4',
    'station-5',
    'station-6',
    'station-7',
    'station-8',
    'station-9',
  ],
};

export const PREP3_TERM2_TOPOLOGY: CurriculumTopology = {
  stationLessons: {
    'station-10': ['10.1', '10.2', '10.3'],
    'station-11': ['11.1', '11.2', '11.3'],
    'station-12': ['12.1', '12.2', '12.3'],
    'station-13': ['13.1', '13.2', '13.3'],
    'station-14': ['14.1', '14.2', '14.3'],
    'station-15': ['15.1', '15.2', '15.3'],
  },
  unit1Stations: ['station-10', 'station-11', 'station-12'],
  allStations: [
    'station-10',
    'station-11',
    'station-12',
    'station-13',
    'station-14',
    'station-15',
  ],
};

export function getTopologyForCourse(courseId?: string): CurriculumTopology {
  if (
    courseId === 'prep3-term2' ||
    courseId === 'prep3-term2-ict' ||
    courseId === 'term-2'
  ) {
    return PREP3_TERM2_TOPOLOGY;
  }
  return PREP3_TERM1_TOPOLOGY;
}

export interface BadgeDefinition {
  id: BadgeId;
  title: string;
  description: string;
  icon: string;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'first_lesson',
    title: 'بداية المبرمج',
    description: 'أكمل أول درس مصغّر لك في المنصة',
    icon: 'Rocket',
  },
  {
    id: 'first_station',
    title: 'أول محطة',
    description: 'أنهِ جميع الدروس المصغّرة لأول محطة كاملة',
    icon: 'Flag',
  },
  {
    id: 'perfect_quiz',
    title: 'علامة كاملة',
    description: 'احصل على ١٠٠٪ في اختبار محطة أو امتحان',
    icon: 'Award',
  },
  {
    id: 'streak_3',
    title: '3 أيام متتالية',
    description: 'حافظ على المذاكرة ٣ أيام متتالية بتوقيت القاهرة',
    icon: 'Flame',
  },
  {
    id: 'unit_1_hero',
    title: 'بطل الوحدة الأولى',
    description: 'أكمل جميع دروس الوحدة الأولى (١٩ درسًا)',
    icon: 'Trophy',
  },
  {
    id: 'term_1_complete',
    title: 'ختام الترم الأول',
    description: 'أكمل جميع دروس الترم الأول (٢٩ درسًا)',
    icon: 'Crown',
  },
];

const BACKUP_PREFIX = 'SL1:';

export function getCairoDate(timestamp: number | Date = Date.now()): string {
  const dateObj = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Cairo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(dateObj);
  const year = parts.find((p) => p.type === 'year')?.value ?? '1970';
  const month = parts.find((p) => p.type === 'month')?.value ?? '01';
  const day = parts.find((p) => p.type === 'day')?.value ?? '01';
  return `${year}-${month}-${day}`;
}

export const getCairoDateString = getCairoDate;

export function addDaysToCairoDate(cairoDate: string, deltaDays: number): string {
  const [y, m, d] = cairoDate.split('-').map((n) => Number.parseInt(n, 10));
  const next = new Date(Date.UTC(y, m - 1, d + deltaDays));
  const year = String(next.getUTCFullYear()).padStart(4, '0');
  const month = String(next.getUTCMonth() + 1).padStart(2, '0');
  const day = String(next.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createEventId(prefix = 'evt'): string {
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.randomUUID === 'function') {
    return `${prefix}_${globalThis.crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function safeParseJson<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function resolveDb(dbOverride?: IctDatabase): IctDatabase {
  return dbOverride ?? getDb();
}

export function deriveWeakSpots(frictionEvents: FrictionEvent[]): FrictionSummary[] {
  const uniqueMap = new Map<string, FrictionEvent>();
  for (const event of frictionEvents) {
    if (!uniqueMap.has(event.eventId)) {
      uniqueMap.set(event.eventId, event);
    }
  }

  const ordered = Array.from(uniqueMap.values()).sort((a, b) => a.createdAt - b.createdAt);
  const grouped = new Map<string, FrictionSummary>();

  for (const event of ordered) {
    const key = `${event.lessonId}::${event.blockId}`;
    const current = grouped.get(key) ?? {
      lessonId: event.lessonId,
      stationId: event.stationId,
      blockId: event.blockId,
      blockType: event.blockType,
      wrongAttempts: 0,
      totalAttempts: 0,
      lastErrorKind: undefined,
    };

    current.totalAttempts += 1;
    if (!event.isCorrect) {
      current.wrongAttempts += 1;
      if (event.errorKind) {
        current.lastErrorKind = event.errorKind;
      }
    }
    if (event.stationId) {
      current.stationId = event.stationId;
    }
    grouped.set(key, current);
  }

  return Array.from(grouped.values())
    .filter((item) => item.wrongAttempts > 0)
    .sort((a, b) => {
      if (b.wrongAttempts !== a.wrongAttempts) {
        return b.wrongAttempts - a.wrongAttempts;
      }
      return b.totalAttempts - a.totalAttempts;
    });
}

export function deriveLearnerStats(
  events: LearningEvent[],
  frictionEvents: FrictionEvent[] = [],
  options?: {
    todayCairoDate?: string;
    topology?: CurriculumTopology;
    courseId?: string;
  },
): LearnerStats {
  const targetCourseId = options?.courseId;
  const topology =
    options?.topology ?? getTopologyForCourse(targetCourseId);
  const todayCairoDate = options?.todayCairoDate ?? getCairoDate();

  const filteredEvents = targetCourseId
    ? events.filter((e) => (e.courseId ?? DEFAULT_COURSE_ID) === targetCourseId)
    : events;
  const filteredFriction = targetCourseId
    ? frictionEvents.filter(
        (f) => (f.courseId ?? DEFAULT_COURSE_ID) === targetCourseId,
      )
    : frictionEvents;

  const dedupedMap = new Map<string, LearningEvent>();
  for (const evt of filteredEvents) {
    if (!dedupedMap.has(evt.eventId)) {
      dedupedMap.set(evt.eventId, evt);
    }
  }

  const orderedEvents = Array.from(dedupedMap.values()).sort((a, b) => {
    if (a.createdAt !== b.createdAt) {
      return a.createdAt - b.createdAt;
    }
    return a.eventId.localeCompare(b.eventId);
  });

  let xp = 0;
  const seenCardKeys = new Set<string>();
  const seenCorrectActivities = new Set<string>();
  const completedLessonSet = new Set<string>();
  const completedLessonTimes = new Map<string, number>();
  const todayCompletedLessons = new Set<string>();
  const flashcardDailyKeys = new Set<string>();

  const viewedCardsByLesson: Record<string, string[]> = {};
  const lastCardIndexByLesson: Record<string, number> = {};
  let lastLessonId: string | null = null;

  const quizHistory: QuizAttemptSummary[] = [];
  const flashcardStates: Record<string, FlashcardReviewState> = {};
  const earlyUnlockedStations = new Set<string>();
  const activeDates = new Map<string, number>();

  let firstLessonCompletedAt: number | null = null;
  let firstPerfectQuizAt: number | null = null;

  for (const evt of orderedEvents) {
    if (evt.cairoDate) {
      const existingDateAt = activeDates.get(evt.cairoDate);
      if (existingDateAt === undefined || evt.createdAt < existingDateAt) {
        activeDates.set(evt.cairoDate, evt.createdAt);
      }
    }

    switch (evt.type) {
      case 'card_viewed': {
        const payload = safeParseJson<CardViewedPayload>(evt.payloadJson);
        if (!payload) break;
        const cardKey = `${evt.lessonId}::${payload.cardId}`;
        if (!seenCardKeys.has(cardKey)) {
          seenCardKeys.add(cardKey);
          xp += 2;
        }
        if (!viewedCardsByLesson[evt.lessonId]) {
          viewedCardsByLesson[evt.lessonId] = [];
        }
        if (!viewedCardsByLesson[evt.lessonId].includes(payload.cardId)) {
          viewedCardsByLesson[evt.lessonId].push(payload.cardId);
        }
        lastLessonId = evt.lessonId;
        lastCardIndexByLesson[evt.lessonId] = payload.cardIndex;
        break;
      }

      case 'activity_attempt': {
        const payload = safeParseJson<ActivityAttemptPayload>(evt.payloadJson);
        if (!payload) break;
        if (payload.isCorrect) {
          const actKey = `${evt.lessonId}::${payload.blockId}`;
          if (!seenCorrectActivities.has(actKey)) {
            seenCorrectActivities.add(actKey);
            xp += 5;
          }
        }
        break;
      }

      case 'lesson_completed': {
        const payload = safeParseJson<LessonCompletedPayload>(evt.payloadJson) ?? {};
        if (!completedLessonSet.has(evt.lessonId)) {
          completedLessonSet.add(evt.lessonId);
          completedLessonTimes.set(evt.lessonId, evt.createdAt);
          xp += typeof payload.xpAwarded === 'number' ? payload.xpAwarded : 30;
          if (firstLessonCompletedAt === null) {
            firstLessonCompletedAt = evt.createdAt;
          }
        }
        if (evt.cairoDate === todayCairoDate) {
          todayCompletedLessons.add(evt.lessonId);
        }
        lastLessonId = evt.lessonId;
        break;
      }

      case 'quiz_submitted': {
        const payload = safeParseJson<QuizSubmittedPayload>(evt.payloadJson);
        if (!payload) break;
        const percentage =
          typeof payload.percentage === 'number'
            ? payload.percentage
            : payload.total > 0
              ? Math.round((payload.score / payload.total) * 100)
              : 0;

        const isPerfect = payload.total > 0 && payload.score === payload.total;
        xp += 10 + payload.score * 2 + (isPerfect ? 15 : 0);

        if (isPerfect && firstPerfectQuizAt === null) {
          firstPerfectQuizAt = evt.createdAt;
        }

        quizHistory.push({
          eventId: evt.eventId,
          mode: payload.mode,
          stationId: payload.stationId ?? evt.stationId,
          score: payload.score,
          total: payload.total,
          percentage,
          wrongMicroLessonIds: payload.wrongMicroLessonIds ?? [],
          stationBreakdown: payload.stationBreakdown,
          createdAt: evt.createdAt,
        });
        break;
      }

      case 'flashcard_reviewed': {
        const payload = safeParseJson<FlashcardReviewedPayload>(evt.payloadJson);
        if (!payload) break;
        const dailyKey = `${evt.cairoDate}::${payload.cardId}`;
        if (!flashcardDailyKeys.has(dailyKey)) {
          flashcardDailyKeys.add(dailyKey);
          xp += 2;
        }
        const prev = flashcardStates[payload.cardId];
        flashcardStates[payload.cardId] = {
          cardId: payload.cardId,
          status: payload.result,
          reviewCount: (prev?.reviewCount ?? 0) + 1,
          lastReviewedAt: evt.createdAt,
        };
        break;
      }

      case 'station_unlocked': {
        const payload = safeParseJson<StationUnlockedPayload>(evt.payloadJson);
        const targetStation = payload?.stationId ?? evt.stationId;
        if (targetStation) {
          earlyUnlockedStations.add(targetStation);
        }
        break;
      }
    }
  }

  // Station progress derivation
  const stationProgress: Record<string, StationProgressSummary> = {};
  let firstStationCompletedAt: number | null = null;

  for (const stationId of topology.allStations) {
    const lessonIds = topology.stationLessons[stationId] ?? [];
    const completedInStation = lessonIds.filter((id) => completedLessonSet.has(id));
    const stationQuizzes = quizHistory.filter(
      (q) => q.mode === 'station' && q.stationId === stationId,
    );
    const bestQuizScore =
      stationQuizzes.length > 0
        ? Math.max(...stationQuizzes.map((q) => q.percentage))
        : null;
    const lastQuizScore =
      stationQuizzes.length > 0
        ? stationQuizzes[stationQuizzes.length - 1].percentage
        : null;

    stationProgress[stationId] = {
      stationId,
      completedLessons: completedInStation.length,
      totalLessons: lessonIds.length,
      completedLessonIds: completedInStation,
      bestQuizScore,
      lastQuizScore,
      earlyChallengeUnlocked: earlyUnlockedStations.has(stationId),
    };

    if (lessonIds.length > 0 && completedInStation.length === lessonIds.length) {
      const stationDoneAt = Math.max(
        ...lessonIds.map((id) => completedLessonTimes.get(id) ?? 0),
      );
      if (firstStationCompletedAt === null || stationDoneAt < firstStationCompletedAt) {
        firstStationCompletedAt = stationDoneAt;
      }
    }
  }

  // Streak derivation using Cairo calendar dates
  const sortedDates = Array.from(activeDates.keys()).sort();
  let longestStreakDays = 0;
  let threeDayStreakAt: number | null = null;
  let currentRun = 0;
  let prevDate: string | null = null;

  for (const date of sortedDates) {
    if (prevDate !== null && addDaysToCairoDate(prevDate, 1) === date) {
      currentRun += 1;
    } else {
      currentRun = 1;
    }
    if (currentRun > longestStreakDays) {
      longestStreakDays = currentRun;
    }
    if (currentRun >= 3 && threeDayStreakAt === null) {
      threeDayStreakAt = activeDates.get(date) ?? null;
    }
    prevDate = date;
  }

  const yesterdayCairoDate = addDaysToCairoDate(todayCairoDate, -1);
  let streakDays = 0;
  let cursorDate: string | null = activeDates.has(todayCairoDate)
    ? todayCairoDate
    : activeDates.has(yesterdayCairoDate)
      ? yesterdayCairoDate
      : null;

  while (cursorDate !== null && activeDates.has(cursorDate)) {
    streakDays += 1;
    cursorDate = addDaysToCairoDate(cursorDate, -1);
  }

  const lastActiveCairoDate =
    sortedDates.length > 0 ? sortedDates[sortedDates.length - 1] : null;

  // Unit 1 & Term 1 completion timestamps
  const unit1Lessons = topology.unit1Stations.flatMap(
    (s) => topology.stationLessons[s] ?? [],
  );
  const unit1Done =
    unit1Lessons.length > 0 &&
    unit1Lessons.every((id) => completedLessonSet.has(id));
  const unit1DoneAt = unit1Done
    ? Math.max(...unit1Lessons.map((id) => completedLessonTimes.get(id) ?? 0))
    : null;

  const allTermLessons = topology.allStations.flatMap(
    (s) => topology.stationLessons[s] ?? [],
  );
  const term1Done =
    allTermLessons.length > 0 &&
    allTermLessons.every((id) => completedLessonSet.has(id));
  const term1DoneAt = term1Done
    ? Math.max(...allTermLessons.map((id) => completedLessonTimes.get(id) ?? 0))
    : null;

  const badgeTimestamps: Record<BadgeId, number | null> = {
    first_lesson: firstLessonCompletedAt,
    first_station: firstStationCompletedAt,
    perfect_quiz: firstPerfectQuizAt,
    streak_3: threeDayStreakAt,
    unit_1_hero: unit1DoneAt,
    term_1_complete: term1DoneAt,
  };

  const badges: BadgeStatus[] = BADGE_DEFINITIONS.map((def) => {
    const unlockedAt = badgeTimestamps[def.id];
    return {
      ...def,
      unlocked: unlockedAt !== null,
      unlockedAt,
    };
  });

  const completedLessonIds = Array.from(completedLessonSet);
  const weakSpots = deriveWeakSpots(filteredFriction);

  return {
    xp,
    streakDays,
    longestStreakDays,
    lastActiveCairoDate,
    todayLessonsCount: todayCompletedLessons.size,
    completedLessonIds,
    totalCompletedLessons: completedLessonIds.length,
    viewedCardsByLesson,
    lastLessonId,
    lastCardIndexByLesson,
    badges,
    stationProgress,
    quizHistory,
    flashcardStates,
    weakSpots,
  };
}

// ---------------------------------------------------------------------------
// Event Logging API (Dexie IndexedDB)
// ---------------------------------------------------------------------------

export interface RecordLearningEventInput {
  eventId?: string;
  courseId?: string;
  type: LearningEventType;
  lessonId: string;
  stationId?: string;
  payload: unknown;
  cairoDate?: string;
  createdAt?: number;
}

export async function recordLearningEvent(
  input: RecordLearningEventInput,
  dbOverride?: IctDatabase,
): Promise<LearningEvent> {
  const db = resolveDb(dbOverride);
  const createdAt = input.createdAt ?? Date.now();
  const cairoDate = input.cairoDate ?? getCairoDate(createdAt);
  const eventId = input.eventId ?? createEventId(input.type);
  const courseId =
    input.courseId?.trim() ||
    (typeof window !== 'undefined'
      ? window.localStorage?.getItem('zaty_active_course_id') || undefined
      : undefined) ||
    DEFAULT_COURSE_ID;

  const existing = await db.learningEvents.where('eventId').equals(eventId).first();
  if (existing) {
    return existing;
  }

  const event: LearningEvent = {
    eventId,
    courseId,
    type: input.type,
    lessonId: input.lessonId,
    stationId: input.stationId,
    payloadJson: JSON.stringify(input.payload),
    cairoDate,
    createdAt,
  };

  if (input.type === 'activity_attempt') {
    const attempt = input.payload as Partial<ActivityAttemptPayload>;
    const friction: FrictionEvent = {
      eventId: `friction_${eventId}`,
      courseId,
      lessonId: input.lessonId,
      stationId: input.stationId,
      blockId: attempt.blockId ?? 'unknown',
      blockType: attempt.blockType ?? 'quiz',
      attemptCount: typeof attempt.attemptNumber === 'number' ? attempt.attemptNumber : 1,
      isCorrect: Boolean(attempt.isCorrect),
      errorKind: attempt.errorKind,
      cairoDate,
      createdAt,
    };
    await db.transaction('rw', db.learningEvents, db.frictionEvents, async () => {
      await db.learningEvents.add(event);
      await db.frictionEvents.add(friction);
    });
    return event;
  }

  await db.learningEvents.add(event);
  return event;
}

export async function recordCardViewed(
  lessonId: string,
  stationId: string,
  payload: CardViewedPayload,
  dbOverride?: IctDatabase,
  createdAt?: number,
): Promise<LearningEvent> {
  return recordLearningEvent(
    {
      type: 'card_viewed',
      lessonId,
      stationId,
      payload,
      createdAt,
    },
    dbOverride,
  );
}

export async function recordLessonCompleted(
  lessonId: string,
  stationId: string,
  payload: LessonCompletedPayload = {},
  dbOverride?: IctDatabase,
  createdAt?: number,
): Promise<LearningEvent> {
  return recordLearningEvent(
    {
      type: 'lesson_completed',
      lessonId,
      stationId,
      payload,
      createdAt,
    },
    dbOverride,
  );
}

export async function recordQuizSubmitted(
  lessonId: string,
  stationId: string | undefined,
  payload: QuizSubmittedPayload,
  dbOverride?: IctDatabase,
  createdAt?: number,
  courseId?: string,
): Promise<LearningEvent> {
  return recordLearningEvent(
    {
      type: 'quiz_submitted',
      lessonId,
      stationId,
      payload,
      createdAt,
      courseId,
    },
    dbOverride,
  );
}

export async function recordFlashcardReviewed(
  lessonId: string,
  stationId: string,
  payload: FlashcardReviewedPayload,
  dbOverride?: IctDatabase,
  createdAt?: number,
  courseId?: string,
): Promise<LearningEvent> {
  return recordLearningEvent(
    {
      type: 'flashcard_reviewed',
      lessonId,
      stationId,
      payload,
      createdAt,
      courseId,
    },
    dbOverride,
  );
}

export async function recordActivityAttempt(
  lessonId: string,
  stationId: string,
  payload: ActivityAttemptPayload,
  dbOverride?: IctDatabase,
  createdAt?: number,
): Promise<LearningEvent> {
  return recordLearningEvent(
    {
      type: 'activity_attempt',
      lessonId,
      stationId,
      payload,
      createdAt,
    },
    dbOverride,
  );
}

export async function recordStationUnlocked(
  stationId: string,
  dbOverride?: IctDatabase,
  createdAt?: number,
): Promise<LearningEvent> {
  return recordLearningEvent(
    {
      type: 'station_unlocked',
      lessonId: stationId,
      stationId,
      payload: { stationId, reason: 'early_challenge' } satisfies StationUnlockedPayload,
      createdAt,
    },
    dbOverride,
  );
}

export async function getAllLearningEvents(
  dbOverride?: IctDatabase,
): Promise<LearningEvent[]> {
  if (!dbOverride && !isIndexedDbAvailable()) {
    return [];
  }
  const db = resolveDb(dbOverride);
  return db.learningEvents.orderBy('createdAt').toArray();
}

export async function getAllFrictionEvents(
  dbOverride?: IctDatabase,
): Promise<FrictionEvent[]> {
  if (!dbOverride && !isIndexedDbAvailable()) {
    return [];
  }
  const db = resolveDb(dbOverride);
  return db.frictionEvents.orderBy('createdAt').toArray();
}

export async function getLearnerStats(
  dbOverride?: IctDatabase,
  options?: {
    todayCairoDate?: string;
    topology?: CurriculumTopology;
    courseId?: string;
  },
): Promise<LearnerStats> {
  const effectiveCourseId =
    options?.courseId ??
    (typeof window !== 'undefined'
      ? window.localStorage?.getItem('zaty_active_course_id') || undefined
      : undefined);
  const effectiveOptions = {
    ...options,
    courseId: effectiveCourseId,
    topology:
      options?.topology ??
      (effectiveCourseId ? getTopologyForCourse(effectiveCourseId) : undefined),
  };

  if (!dbOverride && !isIndexedDbAvailable()) {
    return deriveLearnerStats([], [], effectiveOptions);
  }
  const db = resolveDb(dbOverride);
  const [events, friction] = await Promise.all([
    db.learningEvents.toArray(),
    db.frictionEvents.toArray(),
  ]);
  return deriveLearnerStats(events, friction, effectiveOptions);
}

export async function clearAllProgress(dbOverride?: IctDatabase): Promise<void> {
  const db = resolveDb(dbOverride);
  await db.transaction('rw', db.learningEvents, db.frictionEvents, async () => {
    await db.learningEvents.clear();
    await db.frictionEvents.clear();
  });
}

// ---------------------------------------------------------------------------
// ContentVersion-Aware Lesson Caching
// ---------------------------------------------------------------------------

export async function getCachedLesson(
  lessonId: string,
  expectedVersion?: number,
  dbOverride?: IctDatabase,
): Promise<LessonPack | null> {
  if (!dbOverride && !isIndexedDbAvailable()) {
    return null;
  }
  const db = resolveDb(dbOverride);
  const record = await db.cachedLessons.get(lessonId);
  if (!record) return null;
  if (expectedVersion !== undefined && record.contentVersion !== expectedVersion) {
    return null;
  }
  return record.pack;
}

export async function syncLessonCache(
  pack: LessonPack,
  dbOverride?: IctDatabase,
  courseId = DEFAULT_COURSE_ID,
): Promise<{ updated: boolean; record: CachedLessonRecord }> {
  const db = resolveDb(dbOverride);
  const existing = await db.cachedLessons.get(pack.id);
  if (existing && existing.contentVersion === pack.contentVersion) {
    return { updated: false, record: existing };
  }

  const nextRecord: CachedLessonRecord = {
    lessonId: pack.id,
    courseId,
    contentVersion: pack.contentVersion,
    pack,
    cachedAt: Date.now(),
  };

  await db.cachedLessons.put(nextRecord);
  return { updated: true, record: nextRecord };
}

export const syncCachedLesson = syncLessonCache;

// ---------------------------------------------------------------------------
// Persistent Storage (Safari iOS / PWA Protection)
// ---------------------------------------------------------------------------

export async function requestPersistentStorage(): Promise<{
  supported: boolean;
  persisted: boolean;
}> {
  if (
    typeof globalThis.navigator === 'undefined' ||
    !globalThis.navigator.storage ||
    typeof globalThis.navigator.storage.persist !== 'function'
  ) {
    return { supported: false, persisted: false };
  }

  try {
    if (typeof globalThis.navigator.storage.persisted === 'function') {
      const already = await globalThis.navigator.storage.persisted();
      if (already) {
        return { supported: true, persisted: true };
      }
    }
    const granted = await globalThis.navigator.storage.persist();
    return { supported: true, persisted: granted };
  } catch {
    return { supported: true, persisted: false };
  }
}

// ---------------------------------------------------------------------------
// Backup Export / Import (SL1:<base64>)
// ---------------------------------------------------------------------------

interface ProgressBackupPayload {
  v: 1;
  exportedAt: number;
  events: LearningEvent[];
  frictionEvents: FrictionEvent[];
}

function encodeUtf8Base64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decodeUtf8Base64(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export async function exportProgressBackup(dbOverride?: IctDatabase): Promise<string> {
  const db = resolveDb(dbOverride);
  const [rawEvents, rawFriction] = await Promise.all([
    db.learningEvents.orderBy('createdAt').toArray(),
    db.frictionEvents.orderBy('createdAt').toArray(),
  ]);

  const events = rawEvents.map(({ id: _id, ...rest }) => rest);
  const frictionEvents = rawFriction.map(({ id: _id, ...rest }) => rest);

  const payload: ProgressBackupPayload = {
    v: 1,
    exportedAt: Date.now(),
    events,
    frictionEvents,
  };

  return `${BACKUP_PREFIX}${encodeUtf8Base64(JSON.stringify(payload))}`;
}

export async function importProgressBackup(
  backupCode: string,
  dbOverride?: IctDatabase,
): Promise<{
  importedEvents: number;
  importedFriction: number;
  stats: LearnerStats;
}> {
  const cleaned = backupCode.trim().replace(/\s+/g, '');
  if (!cleaned.startsWith(BACKUP_PREFIX)) {
    throw new Error('كود النسخة الاحتياطية غير صالح: يجب أن يبدأ بـ SL1:');
  }

  let parsed: ProgressBackupPayload;
  try {
    const jsonText = decodeUtf8Base64(cleaned.slice(BACKUP_PREFIX.length));
    parsed = JSON.parse(jsonText) as ProgressBackupPayload;
  } catch {
    throw new Error('تعذّر قراءة كود النسخة الاحتياطية. تأكد من نسخه بالكامل.');
  }

  if (
    !parsed ||
    parsed.v !== 1 ||
    !Array.isArray(parsed.events) ||
    !Array.isArray(parsed.frictionEvents)
  ) {
    throw new Error('بنية النسخة الاحتياطية غير مدعومة.');
  }

  const db = resolveDb(dbOverride);
  let importedEvents = 0;
  let importedFriction = 0;

  await db.transaction('rw', db.learningEvents, db.frictionEvents, async () => {
    const existingEventIds = new Set(
      (await db.learningEvents.toArray()).map((e) => e.eventId),
    );
    const existingFrictionIds = new Set(
      (await db.frictionEvents.toArray()).map((f) => f.eventId),
    );

    const newEvents: LearningEvent[] = [];
    for (const evt of parsed.events) {
      if (
        evt &&
        typeof evt.eventId === 'string' &&
        typeof evt.type === 'string' &&
        typeof evt.lessonId === 'string' &&
        typeof evt.payloadJson === 'string' &&
        typeof evt.cairoDate === 'string' &&
        typeof evt.createdAt === 'number' &&
        !existingEventIds.has(evt.eventId)
      ) {
        existingEventIds.add(evt.eventId);
        newEvents.push({
          eventId: evt.eventId,
          courseId:
            typeof evt.courseId === 'string' && evt.courseId.trim()
              ? evt.courseId.trim()
              : DEFAULT_COURSE_ID,
          type: evt.type,
          lessonId: evt.lessonId,
          stationId: evt.stationId,
          payloadJson: evt.payloadJson,
          cairoDate: evt.cairoDate,
          createdAt: evt.createdAt,
        });
      }
    }

    const newFriction: FrictionEvent[] = [];
    for (const fe of parsed.frictionEvents) {
      if (
        fe &&
        typeof fe.eventId === 'string' &&
        typeof fe.lessonId === 'string' &&
        typeof fe.blockId === 'string' &&
        typeof fe.blockType === 'string' &&
        typeof fe.isCorrect === 'boolean' &&
        typeof fe.cairoDate === 'string' &&
        typeof fe.createdAt === 'number' &&
        !existingFrictionIds.has(fe.eventId)
      ) {
        existingFrictionIds.add(fe.eventId);
        newFriction.push({
          eventId: fe.eventId,
          courseId:
            typeof fe.courseId === 'string' && fe.courseId.trim()
              ? fe.courseId.trim()
              : DEFAULT_COURSE_ID,
          lessonId: fe.lessonId,
          stationId: fe.stationId,
          blockId: fe.blockId,
          blockType: fe.blockType,
          attemptCount: typeof fe.attemptCount === 'number' ? fe.attemptCount : 1,
          isCorrect: fe.isCorrect,
          errorKind: fe.errorKind,
          cairoDate: fe.cairoDate,
          createdAt: fe.createdAt,
        });
      }
    }

    if (newEvents.length > 0) {
      await db.learningEvents.bulkAdd(newEvents);
      importedEvents = newEvents.length;
    }
    if (newFriction.length > 0) {
      await db.frictionEvents.bulkAdd(newFriction);
      importedFriction = newFriction.length;
    }
  });

  const stats = await getLearnerStats(db);
  return { importedEvents, importedFriction, stats };
}
