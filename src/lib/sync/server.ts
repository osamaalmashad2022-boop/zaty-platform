import type { Client, InStatement } from '@libsql/client';
import { DEFAULT_COURSE_ID } from '@/content/catalog';
import { ensureSchema } from '@/db/schema';
import { getUserById, type CloudUser, type UserTier } from '@/lib/auth/server';
import { getCairoDate } from '@/lib/storage/progress';
import type {
  BlockType,
  FlashcardReviewedPayload,
  FrictionEvent,
  LearningEvent,
  LearningEventType,
} from '@/types/curriculum';

const VALID_LEARNING_EVENT_TYPES = new Set<LearningEventType>([
  'card_viewed',
  'lesson_completed',
  'quiz_submitted',
  'flashcard_reviewed',
  'activity_attempt',
  'station_unlocked',
]);

export interface IncomingFrictionRecord {
  id?: string;
  eventId?: string;
  courseId?: string;
  lessonId: string;
  stationId?: string;
  blockId: string;
  blockType: BlockType | 'quiz';
  attemptCount?: number;
  attemptsBeforePass?: number;
  wrongCount?: number;
  isCorrect?: boolean;
  errorKind?: string;
  cairoDate?: string;
  createdAt: number;
}

export interface IncomingFlashcardState {
  cardId: string;
  courseId?: string;
  box?: number;
  status?: 'known' | 'review_again';
  reviewCount?: number;
  stationId?: string;
  updatedAt: number;
}

export interface SyncRequestPayload {
  learningEvents?: LearningEvent[];
  frictionEvents?: IncomingFrictionRecord[];
  flashcardStates?: IncomingFlashcardState[];
}

export interface ServerFrictionDTO extends FrictionEvent {
  idString: string;
  attemptsBeforePass: number;
  wrongCount: number;
}

export interface ServerFlashcardStateDTO {
  cardId: string;
  courseId?: string;
  box: number;
  status: 'known' | 'review_again';
  reviewCount: number;
  stationId?: string;
  updatedAt: number;
}

export interface SyncServerResult {
  ok: true;
  user: CloudUser;
  syncedAt: number;
  learningEvents: LearningEvent[];
  frictionEvents: ServerFrictionDTO[];
  flashcardStates: ServerFlashcardStateDTO[];
}

export interface ActivateServerResult {
  ok: boolean;
  status: number;
  user: CloudUser | null;
  tier?: UserTier;
  plan?: string;
  alreadyActive?: boolean;
  message?: string;
  error?: string;
}

export interface AnonymousFrictionPayloadItem {
  courseId?: string;
  lessonId: string;
  blockId: string;
  blockType: string;
  isCorrect?: boolean;
  attempts?: number;
  wrongCount?: number;
}

function isNonEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.trim().length > 0;
}

function normalizeLearningEvent(raw: unknown): LearningEvent | null {
  if (!raw || typeof raw !== 'object') return null;
  const evt = raw as Record<string, unknown>;
  if (
    !isNonEmptyString(evt.eventId) ||
    !isNonEmptyString(evt.type) ||
    !VALID_LEARNING_EVENT_TYPES.has(evt.type as LearningEventType) ||
    !isNonEmptyString(evt.lessonId) ||
    typeof evt.payloadJson !== 'string' ||
    typeof evt.createdAt !== 'number' ||
    !Number.isFinite(evt.createdAt)
  ) {
    return null;
  }

  const createdAt = Math.trunc(evt.createdAt);
  const cairoDate = isNonEmptyString(evt.cairoDate)
    ? evt.cairoDate.trim()
    : getCairoDate(createdAt);

  return {
    eventId: evt.eventId.trim(),
    courseId: isNonEmptyString(evt.courseId)
      ? evt.courseId.trim()
      : DEFAULT_COURSE_ID,
    type: evt.type as LearningEventType,
    lessonId: evt.lessonId.trim(),
    stationId: isNonEmptyString(evt.stationId) ? evt.stationId.trim() : undefined,
    payloadJson: evt.payloadJson,
    cairoDate,
    createdAt,
  };
}

function normalizeFrictionRecord(raw: unknown): {
  id: string;
  courseId: string;
  lessonId: string;
  stationId: string | null;
  blockId: string;
  blockType: string;
  attemptsBeforePass: number;
  wrongCount: number;
  isCorrect: number;
  errorKind: string | null;
  cairoDate: string;
  createdAt: number;
} | null {
  if (!raw || typeof raw !== 'object') return null;
  const fe = raw as Record<string, unknown>;
  const id = isNonEmptyString(fe.eventId)
    ? fe.eventId.trim()
    : isNonEmptyString(fe.id)
      ? fe.id.trim()
      : '';
  if (
    !id ||
    !isNonEmptyString(fe.lessonId) ||
    !isNonEmptyString(fe.blockId) ||
    !isNonEmptyString(fe.blockType) ||
    typeof fe.createdAt !== 'number' ||
    !Number.isFinite(fe.createdAt)
  ) {
    return null;
  }

  const createdAt = Math.trunc(fe.createdAt);
  const attemptsBeforePass =
    typeof fe.attemptsBeforePass === 'number' && Number.isFinite(fe.attemptsBeforePass)
      ? Math.max(1, Math.trunc(fe.attemptsBeforePass))
      : typeof fe.attemptCount === 'number' && Number.isFinite(fe.attemptCount)
        ? Math.max(1, Math.trunc(fe.attemptCount))
        : 1;

  const isCorrectBool =
    typeof fe.isCorrect === 'boolean'
      ? fe.isCorrect
      : typeof fe.wrongCount === 'number'
        ? fe.wrongCount === 0
        : true;

  const wrongCount =
    typeof fe.wrongCount === 'number' && Number.isFinite(fe.wrongCount)
      ? Math.max(0, Math.trunc(fe.wrongCount))
      : isCorrectBool
        ? 0
        : 1;

  const cairoDate = isNonEmptyString(fe.cairoDate)
    ? fe.cairoDate.trim()
    : getCairoDate(createdAt);

  return {
    id,
    courseId: isNonEmptyString(fe.courseId) ? fe.courseId.trim() : DEFAULT_COURSE_ID,
    lessonId: fe.lessonId.trim(),
    stationId: isNonEmptyString(fe.stationId) ? fe.stationId.trim() : null,
    blockId: fe.blockId.trim(),
    blockType: fe.blockType.trim(),
    attemptsBeforePass,
    wrongCount,
    isCorrect: isCorrectBool ? 1 : 0,
    errorKind: isNonEmptyString(fe.errorKind) ? fe.errorKind.trim() : null,
    cairoDate,
    createdAt,
  };
}

function normalizeFlashcardState(raw: unknown): ServerFlashcardStateDTO | null {
  if (!raw || typeof raw !== 'object') return null;
  const fc = raw as Record<string, unknown>;
  if (
    !isNonEmptyString(fc.cardId) ||
    typeof fc.updatedAt !== 'number' ||
    !Number.isFinite(fc.updatedAt)
  ) {
    return null;
  }

  const status: 'known' | 'review_again' =
    fc.status === 'known' || fc.status === 'review_again'
      ? fc.status
      : typeof fc.box === 'number' && fc.box >= 2
        ? 'known'
        : 'review_again';

  const box =
    typeof fc.box === 'number' && Number.isFinite(fc.box)
      ? Math.max(1, Math.trunc(fc.box))
      : status === 'known'
        ? 2
        : 1;

  const reviewCount =
    typeof fc.reviewCount === 'number' && Number.isFinite(fc.reviewCount)
      ? Math.max(0, Math.trunc(fc.reviewCount))
      : 1;

  return {
    cardId: fc.cardId.trim(),
    courseId: isNonEmptyString(fc.courseId) ? fc.courseId.trim() : DEFAULT_COURSE_ID,
    box,
    status,
    reviewCount,
    stationId: isNonEmptyString(fc.stationId) ? fc.stationId.trim() : undefined,
    updatedAt: Math.trunc(fc.updatedAt),
  };
}

/**
 * Idempotently merges incoming learning events, friction events, and flashcard states
 * for the authenticated user, then returns the full merged server snapshot.
 */
export async function syncUserProgress(
  userId: string,
  payload: SyncRequestPayload,
  clientOverride?: Client,
): Promise<SyncServerResult> {
  const client = await ensureSchema(clientOverride);
  const statements: InStatement[] = [];

  const incomingEvents = Array.isArray(payload.learningEvents)
    ? payload.learningEvents
        .map(normalizeLearningEvent)
        .filter((e): e is LearningEvent => e !== null)
    : [];

  for (const evt of incomingEvents) {
    statements.push({
      sql: `INSERT INTO learning_events (
              event_id, user_id, course_id, type, lesson_id, station_id, payload_json, cairo_date, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(event_id) DO NOTHING`,
      args: [
        evt.eventId,
        userId,
        evt.courseId ?? DEFAULT_COURSE_ID,
        evt.type,
        evt.lessonId,
        evt.stationId ?? null,
        evt.payloadJson,
        evt.cairoDate,
        evt.createdAt,
      ],
    });
  }

  const incomingFriction = Array.isArray(payload.frictionEvents)
    ? payload.frictionEvents
        .map(normalizeFrictionRecord)
        .filter((f): f is NonNullable<typeof f> => f !== null)
    : [];

  for (const fe of incomingFriction) {
    statements.push({
      sql: `INSERT INTO friction_events (
              id, user_id, course_id, lesson_id, station_id, block_id, block_type,
              attempts_before_pass, wrong_count, is_correct, error_kind, cairo_date, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO NOTHING`,
      args: [
        fe.id,
        userId,
        fe.courseId,
        fe.lessonId,
        fe.stationId,
        fe.blockId,
        fe.blockType,
        fe.attemptsBeforePass,
        fe.wrongCount,
        fe.isCorrect,
        fe.errorKind,
        fe.cairoDate,
        fe.createdAt,
      ],
    });
  }

  // Combine explicit flashcardStates with any derived from flashcard_reviewed events
  const flashcardMap = new Map<string, ServerFlashcardStateDTO>();
  for (const evt of incomingEvents) {
    if (evt.type !== 'flashcard_reviewed') continue;
    try {
      const parsed = JSON.parse(evt.payloadJson) as Partial<FlashcardReviewedPayload>;
      if (!isNonEmptyString(parsed.cardId)) continue;
      const status: 'known' | 'review_again' =
        parsed.result === 'known' ? 'known' : 'review_again';
      const existing = flashcardMap.get(parsed.cardId);
      const nextCount = (existing?.reviewCount ?? 0) + 1;
      if (!existing || evt.createdAt >= existing.updatedAt) {
        flashcardMap.set(parsed.cardId, {
          cardId: parsed.cardId,
          courseId: evt.courseId ?? DEFAULT_COURSE_ID,
          box: status === 'known' ? 2 : 1,
          status,
          reviewCount: nextCount,
          stationId: parsed.stationId ?? evt.stationId,
          updatedAt: evt.createdAt,
        });
      }
    } catch {
      // Ignore malformed flashcard payloadJson
    }
  }

  if (Array.isArray(payload.flashcardStates)) {
    for (const rawFc of payload.flashcardStates) {
      const normalized = normalizeFlashcardState(rawFc);
      if (!normalized) continue;
      const existing = flashcardMap.get(normalized.cardId);
      if (!existing || normalized.updatedAt >= existing.updatedAt) {
        flashcardMap.set(normalized.cardId, normalized);
      }
    }
  }

  for (const fc of flashcardMap.values()) {
    statements.push({
      sql: `INSERT INTO flashcard_state (
              user_id, card_id, course_id, box, status, review_count, station_id, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id, card_id) DO UPDATE SET
              course_id = excluded.course_id,
              box = excluded.box,
              status = excluded.status,
              review_count = MAX(flashcard_state.review_count, excluded.review_count),
              station_id = COALESCE(excluded.station_id, flashcard_state.station_id),
              updated_at = excluded.updated_at
            WHERE excluded.updated_at >= flashcard_state.updated_at`,
      args: [
        userId,
        fc.cardId,
        fc.courseId ?? DEFAULT_COURSE_ID,
        fc.box,
        fc.status,
        fc.reviewCount,
        fc.stationId ?? null,
        fc.updatedAt,
      ],
    });
  }

  if (statements.length > 0) {
    await client.batch(statements, 'write');
  }

  const [eventsRes, frictionRes, flashcardsRes, user] = await Promise.all([
    client.execute({
      sql: `SELECT event_id, course_id, type, lesson_id, station_id, payload_json, cairo_date, created_at
            FROM learning_events
            WHERE user_id = ?
            ORDER BY created_at ASC, event_id ASC`,
      args: [userId],
    }),
    client.execute({
      sql: `SELECT id, course_id, lesson_id, station_id, block_id, block_type,
                   attempts_before_pass, wrong_count, is_correct, error_kind, cairo_date, created_at
            FROM friction_events
            WHERE user_id = ?
            ORDER BY created_at ASC, id ASC`,
      args: [userId],
    }),
    client.execute({
      sql: `SELECT card_id, course_id, box, status, review_count, station_id, updated_at
            FROM flashcard_state
            WHERE user_id = ?
            ORDER BY updated_at DESC, card_id ASC`,
      args: [userId],
    }),
    getUserById(userId, client),
  ]);

  if (!user) {
    throw new Error('Authenticated user was not found during sync.');
  }

  const learningEvents: LearningEvent[] = eventsRes.rows.map((row) => ({
    eventId: String(row.event_id),
    courseId: row.course_id ? String(row.course_id) : DEFAULT_COURSE_ID,
    type: String(row.type) as LearningEventType,
    lessonId: String(row.lesson_id),
    stationId: row.station_id ? String(row.station_id) : undefined,
    payloadJson: String(row.payload_json),
    cairoDate: String(row.cairo_date),
    createdAt: Number(row.created_at),
  }));

  const frictionEvents: ServerFrictionDTO[] = frictionRes.rows.map((row) => {
    const idStr = String(row.id);
    const attemptCount = Number(row.attempts_before_pass ?? 1);
    const wrongCount = Number(row.wrong_count ?? 0);
    return {
      idString: idStr,
      eventId: idStr,
      courseId: row.course_id ? String(row.course_id) : DEFAULT_COURSE_ID,
      lessonId: String(row.lesson_id),
      stationId: row.station_id ? String(row.station_id) : undefined,
      blockId: String(row.block_id),
      blockType: String(row.block_type) as BlockType | 'quiz',
      attemptCount,
      attemptsBeforePass: attemptCount,
      wrongCount,
      isCorrect: Number(row.is_correct ?? (wrongCount === 0 ? 1 : 0)) === 1,
      errorKind: row.error_kind ? String(row.error_kind) : undefined,
      cairoDate: String(row.cairo_date ?? getCairoDate(Number(row.created_at))),
      createdAt: Number(row.created_at),
    };
  });

  const flashcardStates: ServerFlashcardStateDTO[] = flashcardsRes.rows.map((row) => ({
    cardId: String(row.card_id),
    courseId: row.course_id ? String(row.course_id) : DEFAULT_COURSE_ID,
    box: Number(row.box ?? 1),
    status: row.status === 'known' ? 'known' : 'review_again',
    reviewCount: Number(row.review_count ?? 0),
    stationId: row.station_id ? String(row.station_id) : undefined,
    updatedAt: Number(row.updated_at),
  }));

  return {
    ok: true,
    user,
    syncedAt: Date.now(),
    learningEvents,
    frictionEvents,
    flashcardStates,
  };
}

/**
 * Redeems an activation code for an authenticated user and upgrades their tier to 'premium'.
 */
export async function redeemUserActivationCode(
  userId: string,
  rawCode: unknown,
  clientOverride?: Client,
): Promise<ActivateServerResult> {
  const code = typeof rawCode === 'string' ? rawCode.trim().toUpperCase() : '';
  if (!code) {
    return {
      ok: false,
      status: 400,
      user: null,
      error: 'من فضلك أدخل كود التفعيل أولًا.',
    };
  }

  const client = await ensureSchema(clientOverride);
  const existingUser = await getUserById(userId, client);
  if (!existingUser) {
    return {
      ok: false,
      status: 404,
      user: null,
      error: 'الحساب غير موجود.',
    };
  }

  const codeRes = await client.execute({
    sql: `SELECT code, plan, max_uses, used_count, expires_at
          FROM activation_codes
          WHERE code = ?
          LIMIT 1`,
    args: [code],
  });

  const codeRow = codeRes.rows[0] as Record<string, unknown> | undefined;
  if (!codeRow) {
    return {
      ok: false,
      status: 404,
      user: existingUser,
      error: 'كود التفعيل غير صحيح أو غير موجود.',
    };
  }

  const now = Date.now();
  if (codeRow.expires_at !== null && codeRow.expires_at !== undefined) {
    const expiresAt = Number(codeRow.expires_at);
    if (Number.isFinite(expiresAt) && expiresAt <= now) {
      return {
        ok: false,
        status: 400,
        user: existingUser,
        error: 'انتهت صلاحية كود التفعيل.',
      };
    }
  }

  if (existingUser.tier === 'premium') {
    return {
      ok: true,
      status: 200,
      user: existingUser,
      tier: 'premium',
      plan: String(codeRow.plan ?? 'premium'),
      alreadyActive: true,
      message: 'النسخة الكاملة مفعّلة بالفعل على حسابك!',
    };
  }

  const tx = await client.transaction('write');
  try {
    const updateCode = await tx.execute({
      sql: `UPDATE activation_codes
            SET used_count = used_count + 1
            WHERE code = ?
              AND used_count < max_uses
              AND (expires_at IS NULL OR expires_at > ?)`,
      args: [code, now],
    });

    if (updateCode.rowsAffected !== 1) {
      await tx.rollback();
      return {
        ok: false,
        status: 400,
        user: existingUser,
        error: 'تم استنفاد الحد الأقصى لاستخدام هذا الكود.',
      };
    }

    await tx.execute({
      sql: `UPDATE users SET tier = 'premium' WHERE id = ?`,
      args: [userId],
    });

    await tx.commit();
  } catch (err) {
    try {
      await tx.rollback();
    } catch {
      // Ignore rollback errors
    }
    throw err;
  }

  const updatedUser = await getUserById(userId, client);
  return {
    ok: true,
    status: 200,
    user: updatedUser,
    tier: 'premium',
    plan: String(codeRow.plan ?? 'premium'),
    message: 'تم تفعيل النسخة الكاملة بنجاح! كل المحتوى متاح لك الآن.',
  };
}

/**
 * Increments anonymous per-block friction counters without storing any PII.
 */
export async function recordAnonymousFrictionBatch(
  items: AnonymousFrictionPayloadItem[],
  clientOverride?: Client,
): Promise<{ ok: boolean; status: number; recorded: number; error?: string }> {
  const now = Date.now();
  const statements: InStatement[] = [];

  for (const item of items) {
    if (
      !item ||
      !isNonEmptyString(item.lessonId) ||
      !isNonEmptyString(item.blockId) ||
      !isNonEmptyString(item.blockType)
    ) {
      continue;
    }

    const attempts =
      typeof item.attempts === 'number' && Number.isFinite(item.attempts)
        ? Math.max(1, Math.trunc(item.attempts))
        : 1;

    const wrong =
      typeof item.wrongCount === 'number' && Number.isFinite(item.wrongCount)
        ? Math.max(0, Math.trunc(item.wrongCount))
        : item.isCorrect === false
          ? 1
          : 0;

    const courseId = isNonEmptyString(item.courseId)
      ? item.courseId.trim()
      : DEFAULT_COURSE_ID;

    statements.push({
      sql: `INSERT INTO anonymous_friction_stats (
              course_id, lesson_id, block_id, block_type, total_attempts, total_wrong, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(lesson_id, block_id) DO UPDATE SET
              course_id = excluded.course_id,
              block_type = excluded.block_type,
              total_attempts = anonymous_friction_stats.total_attempts + excluded.total_attempts,
              total_wrong = anonymous_friction_stats.total_wrong + excluded.total_wrong,
              updated_at = excluded.updated_at`,
      args: [
        courseId,
        item.lessonId.trim(),
        item.blockId.trim(),
        item.blockType.trim(),
        attempts,
        wrong,
        now,
      ],
    });
  }

  if (statements.length === 0) {
    return {
      ok: false,
      status: 400,
      recorded: 0,
      error: 'بيانات التعثر المجهولة غير صالحة.',
    };
  }

  const client = await ensureSchema(clientOverride);
  await client.batch(statements, 'write');

  return { ok: true, status: 200, recorded: statements.length };
}
