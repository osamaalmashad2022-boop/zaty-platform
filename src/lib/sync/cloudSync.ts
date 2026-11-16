import { getDb, isIndexedDbAvailable, type IctDatabase } from '@/lib/storage/db';
import {
  clearAllProgress,
  deriveLearnerStats,
  getAllFrictionEvents,
  getAllLearningEvents,
  getCairoDate,
  getLearnerStats,
} from '@/lib/storage/progress';
import type {
  BlockType,
  FrictionEvent,
  LearnerStats,
  LearningEvent,
} from '@/types/curriculum';

export type UserTier = 'free' | 'premium';

export interface CloudUser {
  id: string;
  email: string;
  name: string;
  tier: UserTier;
  guardianConsentAt: number;
  createdAt: number;
}

export interface AuthResult {
  ok: boolean;
  user: CloudUser | null;
  error?: string;
}

export interface SyncResult {
  ok: boolean;
  user: CloudUser | null;
  syncedAt?: number;
  stats?: LearnerStats;
  importedEvents?: number;
  importedFriction?: number;
  serverEventCount?: number;
  error?: string;
}

export interface ActivateResult {
  ok: boolean;
  user: CloudUser | null;
  tier?: UserTier;
  alreadyActive?: boolean;
  message?: string;
  error?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
  guardianConsent: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AnonymousFrictionInput {
  lessonId: string;
  blockId: string;
  blockType: BlockType | 'quiz';
  isCorrect?: boolean;
  attempts?: number;
  wrongCount?: number;
}

export interface OAuthResult {
  ok: boolean;
  configured: boolean;
  provider: 'google' | 'facebook';
  authUrl?: string;
  message: string;
}

interface SyncApiResponse {
  ok?: boolean;
  user?: CloudUser | null;
  syncedAt?: number;
  learningEvents?: LearningEvent[];
  frictionEvents?: Array<
    FrictionEvent & {
      attemptsBeforePass?: number;
      wrongCount?: number;
    }
  >;
  flashcardStates?: Array<{
    cardId: string;
    box: number;
    status: 'known' | 'review_again';
    reviewCount: number;
    stationId?: string;
    updatedAt: number;
  }>;
  error?: string;
}

const NETWORK_ERROR_AR =
  'تعذّر الاتصال بالخادم حاليًا. تحقق من اتصال الإنترنت وحاول مرة أخرى.';

async function safeParseJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchCurrentUser(): Promise<CloudUser | null> {
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    });
    if (!response.ok) {
      return null;
    }
    const data = await safeParseJson<{ ok?: boolean; user?: CloudUser | null }>(
      response,
    );
    return data?.user ?? null;
  } catch {
    return null;
  }
}

export async function registerWithEmail(
  input: RegisterInput,
): Promise<AuthResult> {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = await safeParseJson<{
      ok?: boolean;
      user?: CloudUser | null;
      error?: string;
    }>(response);

    if (!response.ok || !data?.ok || !data.user) {
      return {
        ok: false,
        user: null,
        error: data?.error ?? 'تعذّر إنشاء الحساب حاليًا.',
      };
    }

    return { ok: true, user: data.user };
  } catch {
    return { ok: false, user: null, error: NETWORK_ERROR_AR };
  }
}

export async function loginWithEmail(input: LoginInput): Promise<AuthResult> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = await safeParseJson<{
      ok?: boolean;
      user?: CloudUser | null;
      error?: string;
    }>(response);

    if (!response.ok || !data?.ok || !data.user) {
      return {
        ok: false,
        user: null,
        error: data?.error ?? 'تعذّر تسجيل الدخول حاليًا.',
      };
    }

    return { ok: true, user: data.user };
  } catch {
    return { ok: false, user: null, error: NETWORK_ERROR_AR };
  }
}

export async function logoutUser(): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      return { ok: false, error: 'تعذّر تسجيل الخروج حاليًا.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: NETWORK_ERROR_AR };
  }
}

export async function deleteUserAccount(options?: {
  clearLocal?: boolean;
  dbOverride?: IctDatabase;
}): Promise<{ ok: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch('/api/auth/delete-account', {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await safeParseJson<{
      ok?: boolean;
      message?: string;
      error?: string;
    }>(response);

    if (!response.ok || !data?.ok) {
      return {
        ok: false,
        error: data?.error ?? 'تعذّر حذف الحساب حاليًا.',
      };
    }

    const shouldClearLocal = options?.clearLocal !== false;
    if (shouldClearLocal && (options?.dbOverride || isIndexedDbAvailable())) {
      await clearAllProgress(options?.dbOverride);
    }

    return {
      ok: true,
      message:
        data.message ?? 'تم حذف حسابك وجميع بياناتك الشخصية وسجل التعلم نهائيًا.',
    };
  } catch {
    return { ok: false, error: NETWORK_ERROR_AR };
  }
}

export async function syncProgressWithCloud(
  dbOverride?: IctDatabase,
): Promise<SyncResult> {
  const hasLocalDb = Boolean(dbOverride) || isIndexedDbAvailable();
  const rawEvents = hasLocalDb ? await getAllLearningEvents(dbOverride) : [];
  const rawFriction = hasLocalDb ? await getAllFrictionEvents(dbOverride) : [];

  const learningEventsPayload: LearningEvent[] = rawEvents.map(
    ({ id: _id, ...rest }) => rest,
  );
  const frictionEventsPayload = rawFriction.map(({ id: _id, ...rest }) => ({
    ...rest,
    attemptsBeforePass: rest.attemptCount,
    wrongCount: rest.isCorrect ? 0 : 1,
  }));

  const localStats = deriveLearnerStats(learningEventsPayload, rawFriction);
  const flashcardStatesPayload = Object.values(localStats.flashcardStates).map(
    (fc) => ({
      cardId: fc.cardId,
      box: fc.status === 'known' ? 2 : 1,
      status: fc.status,
      reviewCount: fc.reviewCount,
      updatedAt: fc.lastReviewedAt,
    }),
  );

  try {
    const response = await fetch('/api/sync', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        learningEvents: learningEventsPayload,
        frictionEvents: frictionEventsPayload,
        flashcardStates: flashcardStatesPayload,
      }),
    });

    const data = await safeParseJson<SyncApiResponse>(response);
    if (!response.ok || !data?.ok || !data.user) {
      return {
        ok: false,
        user: null,
        error:
          data?.error ??
          'تعذّر مزامنة التقدم. تأكد من تسجيل الدخول والاتصال بالإنترنت.',
      };
    }

    const serverEvents = Array.isArray(data.learningEvents)
      ? data.learningEvents
      : [];
    const serverFriction = Array.isArray(data.frictionEvents)
      ? data.frictionEvents
      : [];
    const serverFlashcards = Array.isArray(data.flashcardStates)
      ? data.flashcardStates
      : [];

    let importedEvents = 0;
    let importedFriction = 0;

    if (hasLocalDb) {
      const db = dbOverride ?? getDb();

      await db.transaction(
        'rw',
        db.learningEvents,
        db.frictionEvents,
        async () => {
          const existingEventIds = new Set(
            (await db.learningEvents.toArray()).map((e) => e.eventId),
          );
          const existingFrictionIds = new Set(
            (await db.frictionEvents.toArray()).map((f) => f.eventId),
          );

          const toInsertEvents: LearningEvent[] = [];
          for (const evt of serverEvents) {
            if (evt?.eventId && !existingEventIds.has(evt.eventId)) {
              existingEventIds.add(evt.eventId);
              toInsertEvents.push({
                eventId: evt.eventId,
                type: evt.type,
                lessonId: evt.lessonId,
                stationId: evt.stationId,
                payloadJson: evt.payloadJson,
                cairoDate: evt.cairoDate,
                createdAt: evt.createdAt,
              });
            }
          }

          // Reconcile any server-only flashcard states that lack a local flashcard_reviewed event
          const mergedEventSnapshot = [...rawEvents, ...toInsertEvents];
          const derivedAfterEvents = deriveLearnerStats(mergedEventSnapshot, []);
          for (const fc of serverFlashcards) {
            const localState = derivedAfterEvents.flashcardStates[fc.cardId];
            if (!localState || fc.updatedAt > localState.lastReviewedAt) {
              const syntheticEventId = `sync_fc_${fc.cardId}_${fc.updatedAt}`;
              if (!existingEventIds.has(syntheticEventId)) {
                existingEventIds.add(syntheticEventId);
                toInsertEvents.push({
                  eventId: syntheticEventId,
                  type: 'flashcard_reviewed',
                  lessonId: fc.stationId ?? 'review',
                  stationId: fc.stationId,
                  payloadJson: JSON.stringify({
                    cardId: fc.cardId,
                    stationId: fc.stationId ?? '',
                    result: fc.status,
                  }),
                  cairoDate: getCairoDate(fc.updatedAt),
                  createdAt: fc.updatedAt,
                });
              }
            }
          }

          const toInsertFriction: FrictionEvent[] = [];
          for (const fe of serverFriction) {
            const eventId = fe?.eventId;
            if (eventId && !existingFrictionIds.has(eventId)) {
              existingFrictionIds.add(eventId);
              toInsertFriction.push({
                eventId,
                lessonId: fe.lessonId,
                stationId: fe.stationId,
                blockId: fe.blockId,
                blockType: fe.blockType,
                attemptCount:
                  typeof fe.attemptCount === 'number'
                    ? fe.attemptCount
                    : typeof fe.attemptsBeforePass === 'number'
                      ? fe.attemptsBeforePass
                      : 1,
                isCorrect:
                  typeof fe.isCorrect === 'boolean'
                    ? fe.isCorrect
                    : (fe.wrongCount ?? 0) === 0,
                errorKind: fe.errorKind,
                cairoDate: fe.cairoDate ?? getCairoDate(fe.createdAt),
                createdAt: fe.createdAt,
              });
            }
          }

          if (toInsertEvents.length > 0) {
            await db.learningEvents.bulkAdd(toInsertEvents);
            importedEvents = toInsertEvents.length;
          }
          if (toInsertFriction.length > 0) {
            await db.frictionEvents.bulkAdd(toInsertFriction);
            importedFriction = toInsertFriction.length;
          }
        },
      );

      const stats = await getLearnerStats(dbOverride);
      return {
        ok: true,
        user: data.user,
        syncedAt: data.syncedAt ?? Date.now(),
        stats,
        importedEvents,
        importedFriction,
        serverEventCount: serverEvents.length,
      };
    }

    const stats = deriveLearnerStats(serverEvents, serverFriction);
    return {
      ok: true,
      user: data.user,
      syncedAt: data.syncedAt ?? Date.now(),
      stats,
      importedEvents: serverEvents.length,
      importedFriction: serverFriction.length,
      serverEventCount: serverEvents.length,
    };
  } catch {
    return { ok: false, user: null, error: NETWORK_ERROR_AR };
  }
}

export async function redeemActivationCode(
  code: string,
): Promise<ActivateResult> {
  try {
    const response = await fetch('/api/activate', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await safeParseJson<{
      ok?: boolean;
      user?: CloudUser | null;
      tier?: UserTier;
      alreadyActive?: boolean;
      message?: string;
      error?: string;
    }>(response);

    if (!response.ok || !data?.ok) {
      return {
        ok: false,
        user: data?.user ?? null,
        error: data?.error ?? 'تعذّر تفعيل الكود حاليًا.',
      };
    }

    return {
      ok: true,
      user: data.user ?? null,
      tier: data.tier ?? 'premium',
      alreadyActive: data.alreadyActive,
      message: data.message ?? 'تم تفعيل النسخة الكاملة بنجاح!',
    };
  } catch {
    return { ok: false, user: null, error: NETWORK_ERROR_AR };
  }
}

export async function sendAnonymousFriction(
  input: AnonymousFrictionInput,
): Promise<boolean> {
  try {
    const response = await fetch('/api/telemetry/friction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId: input.lessonId,
        blockId: input.blockId,
        blockType: input.blockType,
        isCorrect: input.isCorrect,
        attempts: input.attempts,
        wrongCount: input.wrongCount,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function requestOAuthLogin(
  provider: 'google' | 'facebook',
): Promise<OAuthResult> {
  try {
    const response = await fetch(`/api/auth/oauth/${provider}`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    });
    const data = await safeParseJson<{
      ok?: boolean;
      configured?: boolean;
      authUrl?: string;
      message?: string;
    }>(response);

    return {
      ok: Boolean(response.ok && data?.ok),
      configured: Boolean(data?.configured),
      provider,
      authUrl: data?.authUrl,
      message:
        data?.message ??
        `تسجيل الدخول عبر ${provider === 'google' ? 'Google' : 'Facebook'} غير متاح حاليًا.`,
    };
  } catch {
    return {
      ok: false,
      configured: false,
      provider,
      message: NETWORK_ERROR_AR,
    };
  }
}
