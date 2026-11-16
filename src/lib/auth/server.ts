import {
  createHash,
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto';
import type { Client } from '@libsql/client';
import type { NextResponse } from 'next/server';
import { ensureSchema } from '@/db/schema';

export const SESSION_COOKIE_NAME = 'sl_session';
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
export const SESSION_TTL_SEC = 30 * 24 * 60 * 60;

export type UserTier = 'free' | 'premium';

export interface CloudUser {
  id: string;
  email: string;
  name: string;
  tier: UserTier;
  guardianConsentAt: number;
  createdAt: number;
}

export interface AuthSessionContext {
  user: CloudUser;
  sessionId: string;
  tokenHash: string;
}

export type AuthServerResult =
  | { ok: true; user: CloudUser; token: string }
  | { ok: false; status: number; error: string };

export type OAuthProvider = 'google' | 'facebook';

export interface OAuthProviderConfigResult {
  supported: boolean;
  configured: boolean;
  provider: string;
  authUrl?: string;
  requiredEnvVars?: string[];
  message: string;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Hashes a password with a cryptographically random 16-byte salt using Node's scryptSync.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

/**
 * Verifies a plaintext password against a stored scrypt hash in constant time.
 */
export function verifyPassword(
  password: string,
  storedHash: string | null | undefined,
): boolean {
  if (!storedHash || typeof storedHash !== 'string') {
    return false;
  }
  const parts = storedHash.split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') {
    return false;
  }
  const [, salt, hashHex] = parts;
  if (!salt || !hashHex) {
    return false;
  }

  try {
    const expected = Buffer.from(hashHex, 'hex');
    const actual = scryptSync(password, salt, 64);
    if (expected.length !== actual.length) {
      return false;
    }
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export function hashSessionToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function extractSessionTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const match = /^Bearer\s+(.+)$/i.exec(authHeader.trim());
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return null;
  }

  const pairs = cookieHeader.split(';');
  for (const pair of pairs) {
    const eqIndex = pair.indexOf('=');
    if (eqIndex <= 0) continue;
    const key = pair.slice(0, eqIndex).trim();
    if (key !== SESSION_COOKIE_NAME) continue;
    const rawVal = pair.slice(eqIndex + 1).trim();
    if (!rawVal) return null;
    try {
      return decodeURIComponent(rawVal);
    } catch {
      return rawVal;
    }
  }

  return null;
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SEC,
    secure: process.env.NODE_ENV === 'production',
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
  });
}

export function mapUserRow(row: Record<string, unknown>): CloudUser {
  return {
    id: String(row.id),
    email: String(row.email),
    name: String(row.name),
    tier: row.tier === 'premium' ? 'premium' : 'free',
    guardianConsentAt: Number(row.guardian_consent_at ?? 0),
    createdAt: Number(row.created_at ?? 0),
  };
}

export async function createSession(
  userId: string,
  clientOverride?: Client,
): Promise<{ token: string; sessionId: string; expiresAt: number }> {
  const client = await ensureSchema(clientOverride);
  const sessionId = `sess_${randomUUID()}`;
  const token = randomBytes(32).toString('base64url');
  const tokenHash = hashSessionToken(token);
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;

  await client.execute({
    sql: `INSERT INTO sessions (id, user_id, token_hash, expires_at, created_at)
          VALUES (?, ?, ?, ?, ?)`,
    args: [sessionId, userId, tokenHash, expiresAt, now],
  });

  return { token, sessionId, expiresAt };
}

export async function getAuthenticatedUserFromRequest(
  request: Request,
  clientOverride?: Client,
): Promise<AuthSessionContext | null> {
  const token = extractSessionTokenFromRequest(request);
  if (!token) {
    return null;
  }

  const client = await ensureSchema(clientOverride);
  const tokenHash = hashSessionToken(token);
  const now = Date.now();

  const res = await client.execute({
    sql: `SELECT
            s.id AS session_id,
            s.expires_at AS expires_at,
            u.id AS id,
            u.email AS email,
            u.name AS name,
            u.tier AS tier,
            u.guardian_consent_at AS guardian_consent_at,
            u.created_at AS created_at
          FROM sessions s
          INNER JOIN users u ON u.id = s.user_id
          WHERE s.token_hash = ?
          LIMIT 1`,
    args: [tokenHash],
  });

  const row = res.rows[0] as Record<string, unknown> | undefined;
  if (!row) {
    return null;
  }

  const expiresAt = Number(row.expires_at ?? 0);
  if (expiresAt <= now) {
    await client.execute({
      sql: `DELETE FROM sessions WHERE token_hash = ?`,
      args: [tokenHash],
    });
    return null;
  }

  return {
    user: mapUserRow(row),
    sessionId: String(row.session_id),
    tokenHash,
  };
}

export async function registerUser(
  input: {
    email?: unknown;
    password?: unknown;
    name?: unknown;
    guardianConsent?: unknown;
  },
  clientOverride?: Client,
): Promise<AuthServerResult> {
  if (input.guardianConsent !== true) {
    return {
      ok: false,
      status: 400,
      error:
        'يجب الإقرار بموافقة ولي الأمر وفق قانون حماية البيانات الشخصية رقم 151 لسنة 2020 قبل إنشاء الحساب.',
    };
  }

  const rawEmail = typeof input.email === 'string' ? input.email : '';
  const email = normalizeEmail(rawEmail);
  if (!email || !isValidEmail(email)) {
    return {
      ok: false,
      status: 400,
      error: 'من فضلك أدخل بريدًا إلكترونيًا صحيحًا.',
    };
  }

  const password = typeof input.password === 'string' ? input.password : '';
  if (password.length < 6) {
    return {
      ok: false,
      status: 400,
      error: 'كلمة المرور يجب أن تتكون من ٦ أحرف على الأقل.',
    };
  }

  const rawName = typeof input.name === 'string' ? input.name.trim() : '';
  const name = (rawName || email.split('@')[0] || 'متعلم').slice(0, 80);

  const client = await ensureSchema(clientOverride);
  const existingRes = await client.execute({
    sql: `SELECT id FROM users WHERE email = ? LIMIT 1`,
    args: [email],
  });
  if (existingRes.rows.length > 0) {
    return {
      ok: false,
      status: 409,
      error: 'هذا البريد الإلكتروني مسجّل بالفعل. جرّب تسجيل الدخول.',
    };
  }

  const now = Date.now();
  const userId = `usr_${randomUUID()}`;
  const passwordHash = hashPassword(password);

  try {
    await client.execute({
      sql: `INSERT INTO users (id, email, name, password_hash, guardian_consent_at, tier, created_at)
            VALUES (?, ?, ?, ?, ?, 'free', ?)`,
      args: [userId, email, name, passwordHash, now, now],
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    if (msg.includes('UNIQUE') || msg.includes('constraint')) {
      return {
        ok: false,
        status: 409,
        error: 'هذا البريد الإلكتروني مسجّل بالفعل. جرّب تسجيل الدخول.',
      };
    }
    throw err;
  }

  const { token } = await createSession(userId, client);
  const user: CloudUser = {
    id: userId,
    email,
    name,
    tier: 'free',
    guardianConsentAt: now,
    createdAt: now,
  };

  return { ok: true, user, token };
}

export async function loginUser(
  input: {
    email?: unknown;
    password?: unknown;
  },
  clientOverride?: Client,
): Promise<AuthServerResult> {
  const rawEmail = typeof input.email === 'string' ? input.email : '';
  const email = normalizeEmail(rawEmail);
  const password = typeof input.password === 'string' ? input.password : '';

  if (!email || !password) {
    return {
      ok: false,
      status: 400,
      error: 'من فضلك أدخل البريد الإلكتروني وكلمة المرور.',
    };
  }

  const client = await ensureSchema(clientOverride);
  const res = await client.execute({
    sql: `SELECT id, email, name, password_hash, tier, guardian_consent_at, created_at
          FROM users
          WHERE email = ?
          LIMIT 1`,
    args: [email],
  });

  const row = res.rows[0] as Record<string, unknown> | undefined;
  if (!row || !verifyPassword(password, row.password_hash as string | null)) {
    return {
      ok: false,
      status: 401,
      error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    };
  }

  const user = mapUserRow(row);
  const { token } = await createSession(user.id, client);

  return { ok: true, user, token };
}

export async function revokeSessionFromRequest(
  request: Request,
  clientOverride?: Client,
): Promise<void> {
  const token = extractSessionTokenFromRequest(request);
  if (!token) return;
  const client = await ensureSchema(clientOverride);
  const tokenHash = hashSessionToken(token);
  await client.execute({
    sql: `DELETE FROM sessions WHERE token_hash = ?`,
    args: [tokenHash],
  });
}

export async function deleteAccountAndUserData(
  userId: string,
  clientOverride?: Client,
): Promise<void> {
  const client = await ensureSchema(clientOverride);
  await client.batch(
    [
      { sql: `DELETE FROM sessions WHERE user_id = ?`, args: [userId] },
      { sql: `DELETE FROM learning_events WHERE user_id = ?`, args: [userId] },
      { sql: `DELETE FROM friction_events WHERE user_id = ?`, args: [userId] },
      { sql: `DELETE FROM flashcard_state WHERE user_id = ?`, args: [userId] },
      { sql: `DELETE FROM users WHERE id = ?`, args: [userId] },
    ],
    'write',
  );
}

export async function getUserById(
  userId: string,
  clientOverride?: Client,
): Promise<CloudUser | null> {
  const client = await ensureSchema(clientOverride);
  const res = await client.execute({
    sql: `SELECT id, email, name, tier, guardian_consent_at, created_at
          FROM users
          WHERE id = ?
          LIMIT 1`,
    args: [userId],
  });
  const row = res.rows[0] as Record<string, unknown> | undefined;
  return row ? mapUserRow(row) : null;
}

export function getOAuthProviderConfig(
  providerRaw: string,
  origin = 'http://localhost:3000',
): OAuthProviderConfigResult {
  const provider = providerRaw.trim().toLowerCase();
  if (provider !== 'google' && provider !== 'facebook') {
    return {
      supported: false,
      configured: false,
      provider,
      message: 'مزوّد تسجيل الدخول المطلوب غير مدعوم.',
    };
  }

  if (provider === 'google') {
    const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
    if (!clientId || !clientSecret) {
      return {
        supported: true,
        configured: false,
        provider: 'google',
        requiredEnvVars: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
        message:
          'تسجيل الدخول السريع عبر Google غير مُعد بعد في البيئة المحلية. أضف GOOGLE_CLIENT_ID و GOOGLE_CLIENT_SECRET في ملف البيئة، أو أنشئ حسابك بالبريد الإلكتروني وكلمة المرور الآن.',
      };
    }

    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI?.trim() ||
      `${origin}/api/auth/oauth/google/callback`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });

    return {
      supported: true,
      configured: true,
      provider: 'google',
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
      message: 'تسجيل الدخول عبر Google جاهز ومُعد.',
    };
  }

  const fbId = process.env.FACEBOOK_CLIENT_ID?.trim();
  const fbSecret = process.env.FACEBOOK_CLIENT_SECRET?.trim();
  if (!fbId || !fbSecret) {
    return {
      supported: true,
      configured: false,
      provider: 'facebook',
      requiredEnvVars: ['FACEBOOK_CLIENT_ID', 'FACEBOOK_CLIENT_SECRET'],
      message:
        'تسجيل الدخول السريع عبر Facebook غير مُعد بعد في البيئة المحلية. أضف FACEBOOK_CLIENT_ID و FACEBOOK_CLIENT_SECRET في ملف البيئة، أو أنشئ حسابك بالبريد الإلكتروني وكلمة المرور الآن.',
    };
  }

  const redirectUri =
    process.env.FACEBOOK_REDIRECT_URI?.trim() ||
    `${origin}/api/auth/oauth/facebook/callback`;
  const params = new URLSearchParams({
    client_id: fbId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'email,public_profile',
  });

  return {
    supported: true,
    configured: true,
    provider: 'facebook',
    authUrl: `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`,
    message: 'تسجيل الدخول عبر Facebook جاهز ومُعد.',
  };
}
