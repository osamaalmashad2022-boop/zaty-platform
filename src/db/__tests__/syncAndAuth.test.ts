// @vitest-environment node
import 'fake-indexeddb/auto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { Client } from '@libsql/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { IctDatabase } from '@/lib/storage/db';
import {
  getLearnerStats,
  recordActivityAttempt,
  recordFlashcardReviewed,
  recordLessonCompleted,
} from '@/lib/storage/progress';
import {
  deleteUserAccount,
  fetchCurrentUser,
  loginWithEmail,
  redeemActivationCode,
  registerWithEmail,
  requestOAuthLogin,
  sendAnonymousFriction,
  syncProgressWithCloud,
} from '@/lib/sync/cloudSync';
import { createDbClient, resetDbClient, setDbClientOverride } from '../client';
import { ensureSchema } from '../schema';
import { DELETE as deleteAccountRoute } from '@/app/api/auth/delete-account/route';
import { POST as loginRoute } from '@/app/api/auth/login/route';
import { POST as logoutRoute } from '@/app/api/auth/logout/route';
import { GET as meRoute } from '@/app/api/auth/me/route';
import { GET as oauthRoute } from '@/app/api/auth/oauth/[provider]/route';
import { GET as oauthCallbackRoute } from '@/app/api/auth/oauth/[provider]/callback/route';
import { POST as registerRoute } from '@/app/api/auth/register/route';
import { POST as activateRoute } from '@/app/api/activate/route';
import { POST as syncRoute } from '@/app/api/sync/route';
import { POST as frictionRoute } from '@/app/api/telemetry/friction/route';

function extractCookieValue(setCookieHeader: string | null, name: string): string | null {
  if (!setCookieHeader) return null;
  const regex = new RegExp(`${name}=([^;]+)`);
  const match = regex.exec(setCookieHeader);
  return match ? match[1] : null;
}

function getSetCookieHeaders(res: Response): string[] {
  const headersWithList = res.headers as Headers & {
    getSetCookie?: () => string[];
  };
  if (typeof headersWithList.getSetCookie === 'function') {
    return headersWithList.getSetCookie();
  }
  const single = res.headers.get('set-cookie');
  return single ? [single] : [];
}

describe('v2/v3 libSQL schema, auth, sync, activation, telemetry & deletion', () => {
  let dbFilePath: string;
  let client: Client;

  beforeEach(async () => {
    resetDbClient();
    dbFilePath = path.join(
      os.tmpdir(),
      `sl-test-${Date.now()}-${Math.random().toString(36).slice(2)}.db`,
    );
    const dbUrl = `file:${dbFilePath.replace(/\\/g, '/')}`;
    client = createDbClient({ url: dbUrl });
    setDbClientOverride(client);
    await ensureSchema(client);
  });

  afterEach(() => {
    resetDbClient();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    for (const suffix of ['', '-wal', '-shm', '-journal']) {
      try {
        fs.rmSync(`${dbFilePath}${suffix}`, { force: true });
      } catch {
        // Ignore Windows handle release timing on temp sqlite cleanup
      }
    }
  });

  it('auto-initializes all 7 tables and seeds demo activation codes idempotently', async () => {
    await ensureSchema(client);
    const tablesRes = await client.execute(
      `SELECT name FROM sqlite_master WHERE type = 'table'`,
    );
    const tableNames = new Set(tablesRes.rows.map((r) => String(r.name)));
    expect(tableNames).toContain('users');
    expect(tableNames).toContain('sessions');
    expect(tableNames).toContain('learning_events');
    expect(tableNames).toContain('friction_events');
    expect(tableNames).toContain('flashcard_state');
    expect(tableNames).toContain('activation_codes');
    expect(tableNames).toContain('anonymous_friction_stats');

    const codesRes = await client.execute(
      `SELECT code, plan, max_uses, used_count FROM activation_codes ORDER BY code ASC`,
    );
    expect(codesRes.rows).toEqual([
      expect.objectContaining({
        code: 'ICT-2027-PRO',
        plan: 'premium',
        max_uses: 1000,
        used_count: 0,
      }),
      expect.objectContaining({
        code: 'PREP3-VIP',
        plan: 'premium',
        max_uses: 1000,
        used_count: 0,
      }),
    ]);
  });

  it('requires guardianConsent per Law 151/2020 on register, hashes password with scrypt, and supports login/me/logout', async () => {
    // Reject missing guardianConsent
    const rejectedRes = await registerRoute(
      new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'learner@example.com',
          password: 'password123',
          name: 'عمر أحمد',
          guardianConsent: false,
        }),
      }),
    );
    expect(rejectedRes.status).toBe(400);
    const rejectedBody = await rejectedRes.json();
    expect(rejectedBody.ok).toBe(false);
    expect(rejectedBody.error).toContain('151');
    expect(rejectedBody.error).not.toMatch(/طالب/);

    // Valid registration
    const regRes = await registerRoute(
      new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'Learner@Example.com',
          password: 'password123',
          name: 'عمر أحمد',
          guardianConsent: true,
        }),
      }),
    );
    expect(regRes.status).toBe(201);
    const regBody = await regRes.json();
    expect(regBody.ok).toBe(true);
    expect(regBody.user.email).toBe('learner@example.com');
    expect(regBody.user.tier).toBe('free');
    expect(regBody.user.guardianConsentAt).toBeGreaterThan(0);

    const regCookie = extractCookieValue(
      regRes.headers.get('set-cookie'),
      'sl_session',
    );
    expect(regCookie).toBeTruthy();

    // Password stored as salted scrypt hash, never plaintext
    const dbUser = await client.execute({
      sql: `SELECT password_hash FROM users WHERE email = ?`,
      args: ['learner@example.com'],
    });
    const storedHash = String(dbUser.rows[0]?.password_hash ?? '');
    expect(storedHash.startsWith('scrypt$')).toBe(true);
    expect(storedHash).not.toContain('password123');

    // Duplicate email rejected
    const dupRes = await registerRoute(
      new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'learner@example.com',
          password: 'password123',
          guardianConsent: true,
        }),
      }),
    );
    expect(dupRes.status).toBe(409);

    // Wrong password rejected
    const badLoginRes = await loginRoute(
      new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'learner@example.com',
          password: 'wrong-password',
        }),
      }),
    );
    expect(badLoginRes.status).toBe(401);

    // Valid login sets cookie and returns Bearer token
    const loginRes = await loginRoute(
      new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'learner@example.com',
          password: 'password123',
        }),
      }),
    );
    expect(loginRes.status).toBe(200);
    const loginBody = await loginRes.json();
    expect(loginBody.ok).toBe(true);
    expect(loginBody.token).toBeTruthy();

    // GET /api/auth/me works via Cookie and via Bearer token
    const meCookieRes = await meRoute(
      new Request('http://localhost/api/auth/me', {
        headers: { Cookie: `sl_session=${regCookie}` },
      }),
    );
    const meCookieBody = await meCookieRes.json();
    expect(meCookieBody.authenticated).toBe(true);
    expect(meCookieBody.user.id).toBe(regBody.user.id);

    const meBearerRes = await meRoute(
      new Request('http://localhost/api/auth/me', {
        headers: { Authorization: `Bearer ${loginBody.token}` },
      }),
    );
    const meBearerBody = await meBearerRes.json();
    expect(meBearerBody.authenticated).toBe(true);

    // Logout revokes token
    const logoutRes = await logoutRoute(
      new Request('http://localhost/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${loginBody.token}` },
      }),
    );
    expect(logoutRes.status).toBe(200);

    const afterLogoutMe = await meRoute(
      new Request('http://localhost/api/auth/me', {
        headers: { Authorization: `Bearer ${loginBody.token}` },
      }),
    );
    const afterLogoutBody = await afterLogoutMe.json();
    expect(afterLogoutBody.authenticated).toBe(false);
    expect(afterLogoutBody.user).toBeNull();
  });

  it('merges learning_events, friction_events, and flashcard_state idempotently across /api/sync calls', async () => {
    const regRes = await registerRoute(
      new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'sync-learner@example.com',
          password: 'password123',
          guardianConsent: true,
        }),
      }),
    );
    const { token } = await regRes.json();

    // Unauthenticated sync rejected
    const unauthSync = await syncRoute(
      new Request('http://localhost/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }),
    );
    expect(unauthSync.status).toBe(401);

    const t1 = Date.UTC(2026, 10, 16, 10, 0, 0);
    const payloadA = {
      learningEvents: [
        {
          eventId: 'evt_lesson_1_1',
          type: 'lesson_completed',
          lessonId: '1.1',
          stationId: 'station-1',
          payloadJson: JSON.stringify({ xpAwarded: 50 }),
          cairoDate: '2026-11-16',
          createdAt: t1,
        },
      ],
      frictionEvents: [
        {
          eventId: 'fric_q1',
          lessonId: '1.1',
          stationId: 'station-1',
          blockId: 'q1',
          blockType: 'quizQuestion',
          attemptsBeforePass: 2,
          wrongCount: 1,
          isCorrect: false,
          cairoDate: '2026-11-16',
          createdAt: t1 + 1000,
        },
      ],
      flashcardStates: [
        {
          cardId: 'fc-1',
          box: 1,
          status: 'review_again',
          reviewCount: 1,
          stationId: 'station-1',
          updatedAt: t1 + 2000,
        },
      ],
    };

    const sync1 = await syncRoute(
      new Request('http://localhost/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payloadA),
      }),
    );
    expect(sync1.status).toBe(200);
    const body1 = await sync1.json();
    expect(body1.learningEvents).toHaveLength(1);
    expect(body1.frictionEvents).toHaveLength(1);
    expect(body1.flashcardStates).toHaveLength(1);
    expect(body1.flashcardStates[0].status).toBe('review_again');

    // Sync again with duplicate event + one new event + newer flashcard state + stale flashcard state
    const sync2 = await syncRoute(
      new Request('http://localhost/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          learningEvents: [
            payloadA.learningEvents[0], // duplicate eventId must not duplicate
            {
              eventId: 'evt_lesson_1_2',
              type: 'lesson_completed',
              lessonId: '1.2',
              stationId: 'station-1',
              payloadJson: JSON.stringify({ xpAwarded: 50 }),
              cairoDate: '2026-11-16',
              createdAt: t1 + 5000,
            },
          ],
          frictionEvents: payloadA.frictionEvents, // duplicate id must not duplicate
          flashcardStates: [
            {
              cardId: 'fc-1',
              box: 2,
              status: 'known',
              reviewCount: 2,
              stationId: 'station-1',
              updatedAt: t1 + 9000, // newer wins
            },
          ],
        }),
      }),
    );
    expect(sync2.status).toBe(200);
    const body2 = await sync2.json();
    expect(body2.learningEvents).toHaveLength(2);
    expect(body2.frictionEvents).toHaveLength(1);
    expect(body2.flashcardStates).toHaveLength(1);
    expect(body2.flashcardStates[0].box).toBe(2);
    expect(body2.flashcardStates[0].status).toBe('known');
  });

  it('redeems ICT-2027-PRO to upgrade user tier to premium and enforces max_uses / expiry', async () => {
    const regRes = await registerRoute(
      new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'pro@example.com',
          password: 'password123',
          guardianConsent: true,
        }),
      }),
    );
    const { token, user } = await regRes.json();
    expect(user.tier).toBe('free');

    // Invalid code rejected
    const badCode = await activateRoute(
      new Request('http://localhost/api/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: 'INVALID-CODE' }),
      }),
    );
    expect(badCode.status).toBe(404);

    // Valid code (case/whitespace insensitive) upgrades tier
    const okActivate = await activateRoute(
      new Request('http://localhost/api/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: ' ict-2027-pro ' }),
      }),
    );
    expect(okActivate.status).toBe(200);
    const actBody = await okActivate.json();
    expect(actBody.ok).toBe(true);
    expect(actBody.tier).toBe('premium');
    expect(actBody.user.tier).toBe('premium');

    const codeRow = await client.execute({
      sql: `SELECT used_count FROM activation_codes WHERE code = 'ICT-2027-PRO'`,
    });
    expect(Number(codeRow.rows[0]?.used_count)).toBe(1);

    // Exhausted code rejected for a second user
    await client.execute({
      sql: `INSERT INTO activation_codes (code, plan, max_uses, used_count, expires_at)
            VALUES ('EXHAUSTED-1', 'premium', 1, 1, NULL)`,
    });
    const reg2 = await registerRoute(
      new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'free2@example.com',
          password: 'password123',
          guardianConsent: true,
        }),
      }),
    );
    const { token: token2 } = await reg2.json();
    const exhaustedRes = await activateRoute(
      new Request('http://localhost/api/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token2}`,
        },
        body: JSON.stringify({ code: 'EXHAUSTED-1' }),
      }),
    );
    expect(exhaustedRes.status).toBe(400);

    // Re-redeeming a valid code when already premium succeeds without consuming another use
    const alreadyPremiumRes = await activateRoute(
      new Request('http://localhost/api/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: 'ICT-2027-PRO' }),
      }),
    );
    expect(alreadyPremiumRes.status).toBe(200);
    const alreadyBody = await alreadyPremiumRes.json();
    expect(alreadyBody.alreadyActive).toBe(true);
    const codeRowAfter = await client.execute({
      sql: `SELECT used_count FROM activation_codes WHERE code = 'ICT-2027-PRO'`,
    });
    expect(Number(codeRowAfter.rows[0]?.used_count)).toBe(1);

    // Expired code rejected
    await client.execute({
      sql: `INSERT INTO activation_codes (code, plan, max_uses, used_count, expires_at)
            VALUES ('EXPIRED-1', 'premium', 10, 0, ?)`,
      args: [Date.now() - 60_000],
    });
    const expiredRes = await activateRoute(
      new Request('http://localhost/api/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token2}`,
        },
        body: JSON.stringify({ code: 'EXPIRED-1' }),
      }),
    );
    expect(expiredRes.status).toBe(400);
  });

  it('deletes account and all user-scoped data permanently while keeping anonymous friction telemetry', async () => {
    const regRes = await registerRoute(
      new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'erase@example.com',
          password: 'password123',
          guardianConsent: true,
        }),
      }),
    );
    const { token, user } = await regRes.json();

    // Populate learning events, friction events, flashcard state, and anonymous telemetry
    await syncRoute(
      new Request('http://localhost/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          learningEvents: [
            {
              eventId: 'evt_erase_1',
              type: 'lesson_completed',
              lessonId: '1.1',
              payloadJson: '{}',
              cairoDate: '2026-11-16',
              createdAt: Date.now(),
            },
          ],
          frictionEvents: [
            {
              eventId: 'fric_erase_1',
              lessonId: '1.1',
              blockId: 'b1',
              blockType: 'quizQuestion',
              isCorrect: false,
              createdAt: Date.now(),
            },
          ],
          flashcardStates: [
            { cardId: 'fc-erase', box: 1, status: 'review_again', updatedAt: Date.now() },
          ],
        }),
      }),
    );

    const telRes = await frictionRoute(
      new Request('http://localhost/api/telemetry/friction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: '1.3',
          blockId: 'codelab-1',
          blockType: 'codeLab',
          isCorrect: false,
          attempts: 2,
          wrongCount: 1,
        }),
      }),
    );
    expect(telRes.status).toBe(200);

    // Delete account
    const delRes = await deleteAccountRoute(
      new Request('http://localhost/api/auth/delete-account', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    expect(delRes.status).toBe(200);
    const delBody = await delRes.json();
    expect(delBody.ok).toBe(true);

    // Verify zero rows remain for this user in every user table
    for (const [table, col] of [
      ['users', 'id'],
      ['sessions', 'user_id'],
      ['learning_events', 'user_id'],
      ['friction_events', 'user_id'],
      ['flashcard_state', 'user_id'],
    ]) {
      const check = await client.execute({
        sql: `SELECT COUNT(*) AS cnt FROM ${table} WHERE ${col} = ?`,
        args: [user.id],
      });
      expect(Number(check.rows[0]?.cnt)).toBe(0);
    }

    // Anonymous friction stats remain intact (zero PII)
    const anonCheck = await client.execute({
      sql: `SELECT total_attempts, total_wrong FROM anonymous_friction_stats
            WHERE lesson_id = '1.3' AND block_id = 'codelab-1'`,
    });
    expect(Number(anonCheck.rows[0]?.total_attempts)).toBe(2);
    expect(Number(anonCheck.rows[0]?.total_wrong)).toBe(1);
  });

  it('provides clear Arabic setup notice when OAuth env vars are absent and authUrl when configured', async () => {
    vi.stubEnv('GOOGLE_CLIENT_ID', '');
    vi.stubEnv('GOOGLE_CLIENT_SECRET', '');

    const unconfiguredRes = await oauthRoute(
      new Request('http://localhost:3000/api/auth/oauth/google'),
      { params: Promise.resolve({ provider: 'google' }) },
    );
    expect(unconfiguredRes.status).toBe(501);
    const unconfBody = await unconfiguredRes.json();
    expect(unconfBody.configured).toBe(false);
    expect(unconfBody.message).toContain('Google');
    expect(unconfBody.message).not.toMatch(/طالب/);

    vi.stubEnv('GOOGLE_CLIENT_ID', 'demo-google-id');
    vi.stubEnv('GOOGLE_CLIENT_SECRET', 'demo-google-secret');
    const configuredRes = await oauthRoute(
      new Request('http://localhost:3000/api/auth/oauth/google'),
      { params: Promise.resolve({ provider: 'google' }) },
    );
    expect(configuredRes.status).toBe(200);
    const confBody = await configuredRes.json();
    expect(confBody.configured).toBe(true);
    expect(confBody.authUrl).toContain('accounts.google.com');

    const authUrlObj = new URL(confBody.authUrl);
    const urlState = authUrlObj.searchParams.get('state');
    expect(urlState).toBeTruthy();

    const setCookies = getSetCookieHeaders(configuredRes);
    const stateCookieHeader = setCookies.find((c) =>
      c.startsWith('zaty_oauth_state='),
    );
    expect(stateCookieHeader).toBeTruthy();
    expect(extractCookieValue(stateCookieHeader ?? null, 'zaty_oauth_state')).toBe(
      urlState,
    );
    expect(stateCookieHeader).toMatch(/HttpOnly/i);
    expect(stateCookieHeader).toMatch(/SameSite=Lax/i);
    expect(stateCookieHeader).toMatch(/Max-Age=600/i);
  });

  it('skips seeding demo activation codes in production unless SEED_DEMO_CODES is true', async () => {
    const prodFileA = path.join(
      os.tmpdir(),
      `sl-prod-nosed-${Date.now()}-${Math.random().toString(36).slice(2)}.db`,
    );
    const prodFileB = path.join(
      os.tmpdir(),
      `sl-prod-seed-${Date.now()}-${Math.random().toString(36).slice(2)}.db`,
    );

    const prodClientNoSeed = createDbClient({
      url: `file:${prodFileA.replace(/\\/g, '/')}`,
    });
    const prodClientWithSeed = createDbClient({
      url: `file:${prodFileB.replace(/\\/g, '/')}`,
    });

    try {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('SEED_DEMO_CODES', '');
      await ensureSchema(prodClientNoSeed);

      const noSeedRes = await prodClientNoSeed.execute(
        `SELECT code FROM activation_codes`,
      );
      expect(noSeedRes.rows).toHaveLength(0);

      vi.stubEnv('SEED_DEMO_CODES', 'true');
      await ensureSchema(prodClientWithSeed);

      const seededRes = await prodClientWithSeed.execute(
        `SELECT code FROM activation_codes ORDER BY code ASC`,
      );
      expect(seededRes.rows.map((r) => String(r.code))).toEqual([
        'ICT-2027-PRO',
        'PREP3-VIP',
      ]);
    } finally {
      prodClientNoSeed.close();
      prodClientWithSeed.close();
      for (const filePath of [prodFileA, prodFileB]) {
        for (const suffix of ['', '-wal', '-shm', '-journal']) {
          try {
            fs.rmSync(`${filePath}${suffix}`, { force: true });
          } catch {
            // Ignore temp sqlite cleanup timing on Windows
          }
        }
      }
    }
  });

  it('rejects missing or mismatched OAuth state and provider errors while clearing zaty_oauth_state cookie', async () => {
    vi.stubEnv('GOOGLE_CLIENT_ID', 'demo-google-id');
    vi.stubEnv('GOOGLE_CLIENT_SECRET', 'demo-google-secret');

    // Mismatched state
    const mismatchRes = await oauthCallbackRoute(
      new Request(
        'http://localhost:3000/api/auth/oauth/google/callback?code=abc&state=attacker-state',
        {
          headers: { Cookie: 'zaty_oauth_state=legit-state' },
        },
      ),
      { params: Promise.resolve({ provider: 'google' }) },
    );
    expect(mismatchRes.status).toBe(400);
    const mismatchBody = await mismatchRes.json();
    expect(mismatchBody.ok).toBe(false);
    expect(mismatchBody.error).not.toMatch(/طالب/);
    const mismatchStateCookie = getSetCookieHeaders(mismatchRes).find((c) =>
      c.startsWith('zaty_oauth_state='),
    );
    expect(mismatchStateCookie).toMatch(/Max-Age=0/i);

    // Missing cookie state
    const missingCookieRes = await oauthCallbackRoute(
      new Request(
        'http://localhost:3000/api/auth/oauth/google/callback?code=abc&state=some-state',
      ),
      { params: Promise.resolve({ provider: 'google' }) },
    );
    expect(missingCookieRes.status).toBe(400);
    const missingCookieHeader = getSetCookieHeaders(missingCookieRes).find((c) =>
      c.startsWith('zaty_oauth_state='),
    );
    expect(missingCookieHeader).toMatch(/Max-Age=0/i);

    // Provider error query param handled cleanly
    const providerErrRes = await oauthCallbackRoute(
      new Request(
        'http://localhost:3000/api/auth/oauth/google/callback?error=access_denied',
        {
          headers: { Cookie: 'zaty_oauth_state=legit-state' },
        },
      ),
      { params: Promise.resolve({ provider: 'google' }) },
    );
    expect(providerErrRes.status).toBe(400);
    const providerErrBody = await providerErrRes.json();
    expect(providerErrBody.ok).toBe(false);
    expect(providerErrBody.providerError).toBe('access_denied');
    expect(
      getSetCookieHeaders(providerErrRes).find((c) =>
        c.startsWith('zaty_oauth_state='),
      ),
    ).toMatch(/Max-Age=0/i);
  });

  it('completes mocked Google OAuth callback, creates user + session cookie, clears state, and redirects to /', async () => {
    vi.stubEnv('GOOGLE_CLIENT_ID', 'demo-google-id');
    vi.stubEnv('GOOGLE_CLIENT_SECRET', 'demo-google-secret');

    // Step 1: start OAuth flow to get state + cookie
    const initRes = await oauthRoute(
      new Request('http://localhost:3000/api/auth/oauth/google?redirect=1'),
      { params: Promise.resolve({ provider: 'google' }) },
    );
    expect(initRes.status).toBe(307);
    const redirectLocation = initRes.headers.get('location');
    expect(redirectLocation).toBeTruthy();
    const oauthState = new URL(redirectLocation!).searchParams.get('state');
    expect(oauthState).toBeTruthy();
    const stateCookieVal = extractCookieValue(
      getSetCookieHeaders(initRes).find((c) => c.startsWith('zaty_oauth_state=')) ??
        null,
      'zaty_oauth_state',
    );
    expect(stateCookieVal).toBe(oauthState);

    // Step 2: mock Google token exchange and userinfo fetch
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const targetUrl = typeof input === 'string' ? input : input.toString();
      if (targetUrl === 'https://oauth2.googleapis.com/token') {
        return new Response(
          JSON.stringify({ access_token: 'google-access-token-123' }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }
      if (targetUrl === 'https://www.googleapis.com/oauth2/v2/userinfo') {
        return new Response(
          JSON.stringify({
            id: 'google-user-42',
            email: 'Nour.OAuth@Example.com',
            verified_email: true,
            name: 'نور محمد',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }
      return new Response('Not found', { status: 404 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const callbackRes = await oauthCallbackRoute(
      new Request(
        `http://localhost:3000/api/auth/oauth/google/callback?code=valid-code-123&state=${encodeURIComponent(oauthState!)}`,
        {
          headers: { Cookie: `zaty_oauth_state=${oauthState}` },
        },
      ),
      { params: Promise.resolve({ provider: 'google' }) },
    );

    expect(callbackRes.status).toBe(302);
    expect(callbackRes.headers.get('location')).toBe('http://localhost:3000/');

    const callbackCookies = getSetCookieHeaders(callbackRes);
    const clearedStateCookie = callbackCookies.find((c) =>
      c.startsWith('zaty_oauth_state='),
    );
    expect(clearedStateCookie).toMatch(/Max-Age=0/i);

    const sessionCookieHeader = callbackCookies.find((c) =>
      c.startsWith('sl_session='),
    );
    const sessionToken = extractCookieValue(
      sessionCookieHeader ?? null,
      'sl_session',
    );
    expect(sessionToken).toBeTruthy();

    // Verify user was persisted cleanly with unguessable scrypt hash and guardian_consent_at
    const dbUserRes = await client.execute({
      sql: `SELECT id, email, name, password_hash, guardian_consent_at FROM users WHERE email = ?`,
      args: ['nour.oauth@example.com'],
    });
    expect(dbUserRes.rows).toHaveLength(1);
    const createdUserId = String(dbUserRes.rows[0]?.id);
    expect(String(dbUserRes.rows[0]?.name)).toBe('نور محمد');
    expect(String(dbUserRes.rows[0]?.password_hash).startsWith('scrypt$')).toBe(
      true,
    );
    expect(Number(dbUserRes.rows[0]?.guardian_consent_at)).toBeGreaterThan(0);

    // Verify session cookie authenticates /api/auth/me
    const meRes = await meRoute(
      new Request('http://localhost:3000/api/auth/me', {
        headers: { Cookie: `sl_session=${sessionToken}` },
      }),
    );
    const meBody = await meRes.json();
    expect(meBody.authenticated).toBe(true);
    expect(meBody.user.id).toBe(createdUserId);
    expect(meBody.user.email).toBe('nour.oauth@example.com');

    // Second callback for same email reuses existing user without duplicating rows
    const secondCallbackRes = await oauthCallbackRoute(
      new Request(
        `http://localhost:3000/api/auth/oauth/google/callback?code=valid-code-456&state=${encodeURIComponent(oauthState!)}`,
        {
          headers: { Cookie: `zaty_oauth_state=${oauthState}` },
        },
      ),
      { params: Promise.resolve({ provider: 'google' }) },
    );
    expect(secondCallbackRes.status).toBe(302);
    const usersAfterSecond = await client.execute({
      sql: `SELECT COUNT(*) AS cnt FROM users WHERE email = ?`,
      args: ['nour.oauth@example.com'],
    });
    expect(Number(usersAfterSecond.rows[0]?.cnt)).toBe(1);
  });

  it('integrates client cloudSync helper end-to-end with Dexie IndexedDB and Route Handlers', async () => {
    const dexieDb = new IctDatabase(`cloud_sync_test_${Math.random().toString(36).slice(2)}`);
    let sessionCookieHeader = '';

    // Route fetch calls to the actual Next.js API handlers
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const urlStr = typeof input === 'string' ? input : input.toString();
      const pathname = new URL(urlStr, 'http://localhost').pathname;
      const headers = new Headers(init?.headers);
      if (sessionCookieHeader) {
        headers.set('Cookie', sessionCookieHeader);
      }
      const req = new Request(`http://localhost${pathname}`, {
        method: init?.method ?? 'GET',
        headers,
        body: init?.body,
      });

      let res: Response;
      if (pathname === '/api/auth/register') res = await registerRoute(req);
      else if (pathname === '/api/auth/login') res = await loginRoute(req);
      else if (pathname === '/api/auth/me') res = await meRoute(req);
      else if (pathname === '/api/auth/logout') res = await logoutRoute(req);
      else if (pathname === '/api/auth/delete-account') res = await deleteAccountRoute(req);
      else if (pathname === '/api/sync') res = await syncRoute(req);
      else if (pathname === '/api/activate') res = await activateRoute(req);
      else if (pathname === '/api/telemetry/friction') res = await frictionRoute(req);
      else if (pathname === '/api/auth/oauth/google') {
        res = await oauthRoute(req, { params: Promise.resolve({ provider: 'google' }) });
      }
      else res = new Response('Not found', { status: 404 });

      const setCookie = res.headers.get('set-cookie');
      if (setCookie) {
        const val = extractCookieValue(setCookie, 'sl_session');
        sessionCookieHeader = val ? `sl_session=${val}` : '';
      }
      return res;
    });
    vi.stubGlobal('fetch', fetchMock);

    try {
      // Seed local Dexie progress before registering
      await recordLessonCompleted('1.1', 'station-1', { xpAwarded: 50 }, dexieDb);
      await recordActivityAttempt(
        '1.1',
        'station-1',
        { blockId: 'q1', blockType: 'quizQuestion', isCorrect: false, attemptNumber: 1 },
        dexieDb,
      );
      await recordFlashcardReviewed(
        '1.1',
        'station-1',
        { cardId: 'fc-1', stationId: 'station-1', result: 'known' },
        dexieDb,
      );

      // Unauthenticated sync returns ok: false gracefully without throwing
      const unauthSync = await syncProgressWithCloud(dexieDb);
      expect(unauthSync.ok).toBe(false);
      expect(unauthSync.error).toBeTruthy();

      // OAuth helper surfaces Arabic notice when unconfigured
      const oauthRes = await requestOAuthLogin('google');
      expect(oauthRes.configured).toBe(false);
      expect(oauthRes.message).toContain('Google');

      const regResult = await registerWithEmail({
        email: 'client-sync@example.com',
        password: 'secret123',
        name: 'سلمى',
        guardianConsent: true,
      });
      expect(regResult.ok).toBe(true);
      expect(regResult.user?.name).toBe('سلمى');

      const currentUser = await fetchCurrentUser();
      expect(currentUser?.email).toBe('client-sync@example.com');

      // Sync local Dexie -> cloud -> Dexie
      const syncResult = await syncProgressWithCloud(dexieDb);
      expect(syncResult.ok).toBe(true);
      expect(syncResult.serverEventCount).toBe(3);
      expect(syncResult.stats?.completedLessonIds).toEqual(['1.1']);

      // Simulate a fresh second device (empty Dexie) syncing down from cloud
      const secondDeviceDb = new IctDatabase(`cloud_sync_dev2_${Math.random().toString(36).slice(2)}`);
      const loginRes = await loginWithEmail({
        email: 'client-sync@example.com',
        password: 'secret123',
      });
      expect(loginRes.ok).toBe(true);

      const syncDev2 = await syncProgressWithCloud(secondDeviceDb);
      expect(syncDev2.ok).toBe(true);
      expect(syncDev2.importedEvents).toBe(3);
      const dev2Stats = await getLearnerStats(secondDeviceDb);
      expect(dev2Stats.completedLessonIds).toEqual(['1.1']);
      expect(dev2Stats.flashcardStates['fc-1']?.status).toBe('known');
      await secondDeviceDb.delete();

      // Activate premium
      const activateRes = await redeemActivationCode('PREP3-VIP');
      expect(activateRes.ok).toBe(true);
      expect(activateRes.tier).toBe('premium');

      // Anonymous friction telemetry
      const telemetryOk = await sendAnonymousFriction({
        lessonId: '1.3',
        blockId: 'codelab-2',
        blockType: 'codeLab',
        isCorrect: true,
      });
      expect(telemetryOk).toBe(true);

      // Delete account & wipe local progress
      const deleteRes = await deleteUserAccount({ dbOverride: dexieDb });
      expect(deleteRes.ok).toBe(true);
      const afterDeleteStats = await getLearnerStats(dexieDb);
      expect(afterDeleteStats.totalCompletedLessons).toBe(0);
      expect(await fetchCurrentUser()).toBeNull();
    } finally {
      await dexieDb.delete();
    }
  });
});
