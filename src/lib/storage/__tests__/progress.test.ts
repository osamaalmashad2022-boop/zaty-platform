import 'fake-indexeddb/auto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { LessonPack } from '@/types/curriculum';
import { IctDatabase } from '../db';
import {
  PREP3_TERM1_TOPOLOGY,
  clearAllProgress,
  deriveLearnerStats,
  exportProgressBackup,
  getCachedLesson,
  getCairoDate,
  getCairoDateString,
  getLearnerStats,
  importProgressBackup,
  recordActivityAttempt,
  recordCardViewed,
  recordFlashcardReviewed,
  recordLearningEvent,
  recordLessonCompleted,
  recordQuizSubmitted,
  requestPersistentStorage,
  syncLessonCache,
} from '../progress';

function createSampleLesson(version: number): LessonPack {
  return {
    id: '1.1',
    stationId: 'station-1',
    unitId: 'unit-1',
    order: 1,
    title: version === 1 ? 'يعني إيه مشكلة؟' : 'يعني إيه مشكلة؟ (محدّث)',
    durationMin: 8,
    contentVersion: version,
    access: 'free',
    status: 'ready',
    objectives: ['يشرح معنى المشكلة'],
    cards: [
      {
        id: 'card-1',
        title: 'البداية',
        role: 'hero',
        blocks: [
          {
            id: 'b1',
            type: 'heroHook',
            data: {
              title: 'يعني إيه مشكلة؟',
              durationMin: 8,
              goal: 'تعرف معنى المشكلة',
              hook: 'بطارية الموبايل ٥٪!',
            },
          },
        ],
      },
    ],
    summary: 'المشكلة هدف + عائق.',
    additionalSources: [],
    sources: [],
    nextStep: {
      kind: 'lesson',
      targetId: '1.2',
      label: 'الدرس الجاي',
    },
  };
}

describe('storage/progress event-sourced layer', () => {
  let db: IctDatabase;

  beforeEach(() => {
    db = new IctDatabase(`test_db_${Math.random().toString(36).slice(2)}`);
  });

  afterEach(async () => {
    await db.delete();
    vi.restoreAllMocks();
  });

  it('derives XP, completed lessons, and avoids duplicate XP on repeated views/completions', async () => {
    const day1 = Date.UTC(2026, 10, 16, 10, 0, 0);

    await recordCardViewed(
      '1.1',
      'station-1',
      { cardId: 'c1', cardIndex: 0, totalCards: 3 },
      db,
      day1,
    );
    // Viewing the same card again updates position without duplicating +2 XP
    await recordCardViewed(
      '1.1',
      'station-1',
      { cardId: 'c1', cardIndex: 0, totalCards: 3 },
      db,
      day1 + 1000,
    );
    await recordActivityAttempt(
      '1.1',
      'station-1',
      { blockId: 'act1', blockType: 'sortingBuckets', isCorrect: true, attemptNumber: 1 },
      db,
      day1 + 2000,
    );
    await recordLessonCompleted('1.1', 'station-1', {}, db, day1 + 3000);
    // Completing same lesson twice does not double-count XP
    await recordLessonCompleted('1.1', 'station-1', {}, db, day1 + 4000);

    const stats = await getLearnerStats(db, {
      todayCairoDate: getCairoDate(day1),
    });

    // +2 (c1) + 5 (act1) + 30 (lesson 1.1) = 37
    expect(stats.xp).toBe(37);
    expect(stats.totalCompletedLessons).toBe(1);
    expect(stats.completedLessonIds).toEqual(['1.1']);
    expect(stats.todayLessonsCount).toBe(1);
    expect(stats.badges.find((b) => b.id === 'first_lesson')?.unlocked).toBe(true);
    expect(stats.badges.find((b) => b.id === 'first_station')?.unlocked).toBe(false);
  });

  it('computes Cairo-date streaks accurately across consecutive and broken days', async () => {
    const d1 = Date.UTC(2026, 10, 10, 12, 0, 0);
    const d2 = Date.UTC(2026, 10, 11, 12, 0, 0);
    const d3 = Date.UTC(2026, 10, 12, 12, 0, 0);

    await recordLessonCompleted('1.1', 'station-1', {}, db, d1);
    await recordLessonCompleted('1.2', 'station-1', {}, db, d2);
    await recordLessonCompleted('1.3', 'station-1', {}, db, d3);

    // Active on day 3 -> streak is 3
    const onDay3 = await getLearnerStats(db, { todayCairoDate: '2026-11-12' });
    expect(onDay3.streakDays).toBe(3);
    expect(onDay3.longestStreakDays).toBe(3);
    expect(onDay3.badges.find((b) => b.id === 'streak_3')?.unlocked).toBe(true);

    // Next day (before studying today) -> streak still preserved at 3
    const onDay4Morning = await getLearnerStats(db, { todayCairoDate: '2026-11-13' });
    expect(onDay4Morning.streakDays).toBe(3);

    // Two days missed -> current streak resets to 0, longest remains 3, badge stays unlocked
    const onDay5 = await getLearnerStats(db, { todayCairoDate: '2026-11-14' });
    expect(onDay5.streakDays).toBe(0);
    expect(onDay5.longestStreakDays).toBe(3);
    expect(onDay5.badges.find((b) => b.id === 'streak_3')?.unlocked).toBe(true);
  });

  it('unlocks all 6 badges when milestones are achieved', async () => {
    const baseTs = Date.UTC(2026, 10, 14, 9, 0, 0);
    // 3 consecutive days of activity
    await recordCardViewed(
      '1.1',
      'station-1',
      { cardId: 'c1', cardIndex: 0, totalCards: 2 },
      db,
      baseTs,
    );
    await recordCardViewed(
      '1.1',
      'station-1',
      { cardId: 'c2', cardIndex: 1, totalCards: 2 },
      db,
      baseTs + 86_400_000,
    );

    let offset = baseTs + 2 * 86_400_000;
    for (const stationId of PREP3_TERM1_TOPOLOGY.allStations) {
      for (const lessonId of PREP3_TERM1_TOPOLOGY.stationLessons[stationId]) {
        offset += 1000;
        await recordLessonCompleted(lessonId, stationId, {}, db, offset);
      }
    }

    await recordQuizSubmitted(
      'station-1',
      'station-1',
      {
        mode: 'station',
        stationId: 'station-1',
        score: 10,
        total: 10,
        percentage: 100,
        wrongQuestionIds: [],
        wrongMicroLessonIds: [],
      },
      db,
      offset + 5000,
    );

    const stats = await getLearnerStats(db, { todayCairoDate: '2026-11-16' });
    expect(stats.totalCompletedLessons).toBe(29);
    expect(stats.badges.every((b) => b.unlocked)).toBe(true);
  });

  it('tracks friction_events and sorts weakSpots by wrong attempts', async () => {
    const ts = Date.UTC(2026, 10, 16, 14, 0, 0);
    await recordActivityAttempt(
      '1.3',
      'station-1',
      {
        blockId: 'lab-1',
        blockType: 'codeLab',
        isCorrect: false,
        attemptNumber: 1,
        errorKind: 'ValueError',
      },
      db,
      ts,
    );
    await recordActivityAttempt(
      '1.3',
      'station-1',
      {
        blockId: 'lab-1',
        blockType: 'codeLab',
        isCorrect: false,
        attemptNumber: 2,
        errorKind: 'SyntaxError',
      },
      db,
      ts + 1000,
    );
    await recordActivityAttempt(
      '1.3',
      'station-1',
      {
        blockId: 'lab-1',
        blockType: 'codeLab',
        isCorrect: true,
        attemptNumber: 3,
      },
      db,
      ts + 2000,
    );
    await recordActivityAttempt(
      '1.1',
      'station-1',
      {
        blockId: 'q-1',
        blockType: 'quizQuestion',
        isCorrect: false,
        attemptNumber: 1,
        errorKind: 'wrong_option',
      },
      db,
      ts + 3000,
    );

    const stats = await getLearnerStats(db, { todayCairoDate: '2026-11-16' });
    expect(stats.weakSpots).toHaveLength(2);
    expect(stats.weakSpots[0]).toMatchObject({
      lessonId: '1.3',
      blockId: 'lab-1',
      wrongAttempts: 2,
      totalAttempts: 3,
      lastErrorKind: 'SyntaxError',
    });
    expect(stats.weakSpots[1]).toMatchObject({
      lessonId: '1.1',
      blockId: 'q-1',
      wrongAttempts: 1,
      totalAttempts: 1,
    });
  });

  it('updates lesson cache on contentVersion bump without erasing learner progress', async () => {
    const ts = Date.UTC(2026, 10, 16, 15, 0, 0);
    await recordLessonCompleted('1.1', 'station-1', {}, db, ts);

    const v1 = createSampleLesson(1);
    const firstSync = await syncLessonCache(v1, db);
    expect(firstSync.updated).toBe(true);
    expect(await getCachedLesson('1.1', 1, db)).toMatchObject({ title: 'يعني إيه مشكلة؟' });
    expect(await getCachedLesson('1.1', 2, db)).toBeNull();

    const sameSync = await syncLessonCache(v1, db);
    expect(sameSync.updated).toBe(false);

    const v2 = createSampleLesson(2);
    const bumpSync = await syncLessonCache(v2, db);
    expect(bumpSync.updated).toBe(true);
    expect(await getCachedLesson('1.1', 2, db)).toMatchObject({
      title: 'يعني إيه مشكلة؟ (محدّث)',
    });

    const stats = await getLearnerStats(db, { todayCairoDate: '2026-11-16' });
    expect(stats.completedLessonIds).toEqual(['1.1']);
  });

  it('exports and imports SL1 backup code with UTF-8 Arabic and union deduplication', async () => {
    const ts = Date.UTC(2026, 10, 16, 16, 0, 0);
    await recordLessonCompleted('1.1', 'station-1', {}, db, ts);
    await recordFlashcardReviewed(
      '1.1',
      'station-1',
      { cardId: 'fc-1', stationId: 'station-1', result: 'review_again' },
      db,
      ts + 1000,
    );
    await recordActivityAttempt(
      '1.1',
      'station-1',
      {
        blockId: 'sort-1',
        blockType: 'sortingBuckets',
        isCorrect: false,
        attemptNumber: 1,
        errorKind: 'mismatch',
      },
      db,
      ts + 2000,
    );

    const backupCode = await exportProgressBackup(db);
    expect(backupCode.startsWith('SL1:')).toBe(true);

    // Import into a second fresh DB that already has 1 local event
    const targetDb = new IctDatabase(`target_db_${Math.random().toString(36).slice(2)}`);
    try {
      await recordLessonCompleted('1.2', 'station-1', {}, targetDb, ts + 5000);

      // Add whitespace/newlines to test mobile copy-paste tolerance
      const formattedCode = `${backupCode.slice(0, 20)}\n  ${backupCode.slice(20)}`;
      const res = await importProgressBackup(formattedCode, targetDb);
      expect(res.importedEvents).toBe(3);
      expect(res.importedFriction).toBe(1);
      expect(res.stats.completedLessonIds).toEqual(['1.1', '1.2']);
      expect(res.stats.flashcardStates['fc-1']?.status).toBe('review_again');
      expect(res.stats.weakSpots).toHaveLength(1);

      // Re-importing same code skips duplicates cleanly
      const repeat = await importProgressBackup(backupCode, targetDb);
      expect(repeat.importedEvents).toBe(0);
      expect(repeat.importedFriction).toBe(0);
    } finally {
      await targetDb.delete();
    }

    await expect(importProgressBackup('INVALID_CODE', db)).rejects.toThrow();
    await clearAllProgress(db);
    const cleared = await getLearnerStats(db);
    expect(cleared.xp).toBe(0);
    expect(cleared.totalCompletedLessons).toBe(0);
  });

  it('requests navigator.storage.persist() safely across supported and unsupported browsers', async () => {
    const unsupported = await requestPersistentStorage();
    expect(unsupported).toEqual({ supported: false, persisted: false });

    vi.stubGlobal('navigator', {
      storage: {
        persisted: vi.fn().mockResolvedValue(false),
        persist: vi.fn().mockResolvedValue(true),
      },
    });
    const granted = await requestPersistentStorage();
    expect(granted).toEqual({ supported: true, persisted: true });
    vi.unstubAllGlobals();
  });

  it('derives deterministic state independently via pure deriveLearnerStats', () => {
    const stats = deriveLearnerStats([], [], { todayCairoDate: '2026-11-16' });
    expect(stats.xp).toBe(0);
    expect(stats.badges).toHaveLength(6);
    expect(Object.keys(stats.stationProgress)).toHaveLength(9);
  });

  it('handles Africa/Cairo UTC midnight crossover and idempotent eventId writes', async () => {
    // 2026-11-16T22:30:00Z is 2026-11-17T00:30:00+02:00 in Africa/Cairo
    expect(getCairoDateString(new Date('2026-11-16T22:30:00Z'))).toBe('2026-11-17');

    const evt1 = await recordLearningEvent(
      {
        eventId: 'dup_evt_1',
        type: 'lesson_completed',
        lessonId: '1.1',
        stationId: 'station-1',
        payload: { xpAwarded: 30 },
        cairoDate: '2026-11-17',
        createdAt: 1000,
      },
      db,
    );
    const evt2 = await recordLearningEvent(
      {
        eventId: evt1.eventId,
        type: 'lesson_completed',
        lessonId: '1.1',
        stationId: 'station-1',
        payload: { xpAwarded: 30 },
        cairoDate: '2026-11-17',
        createdAt: 1000,
      },
      db,
    );

    expect(evt2.eventId).toBe('dup_evt_1');
    expect(await db.learningEvents.count()).toBe(1);
  });
});
