import type { Client, InStatement } from '@libsql/client';
import { getDbClient } from './client';

export interface DemoActivationCodeSeed {
  code: string;
  plan: string;
  maxUses: number;
}

export const DEMO_ACTIVATION_CODES: DemoActivationCodeSeed[] = [
  { code: 'ICT-2027-PRO', plan: 'premium', maxUses: 1000 },
  { code: 'PREP3-VIP', plan: 'premium', maxUses: 1000 },
];

const SCHEMA_STATEMENTS: InStatement[] = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT,
    guardian_consent_at INTEGER NOT NULL,
    tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'premium')),
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS learning_events (
    event_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    station_id TEXT,
    payload_json TEXT NOT NULL,
    cairo_date TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS friction_events (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    station_id TEXT,
    block_id TEXT NOT NULL,
    block_type TEXT NOT NULL,
    attempts_before_pass INTEGER NOT NULL DEFAULT 1,
    wrong_count INTEGER NOT NULL DEFAULT 0,
    is_correct INTEGER NOT NULL DEFAULT 1,
    error_kind TEXT,
    cairo_date TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS flashcard_state (
    user_id TEXT NOT NULL,
    card_id TEXT NOT NULL,
    box INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'review_again',
    review_count INTEGER NOT NULL DEFAULT 0,
    station_id TEXT,
    updated_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, card_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS activation_codes (
    code TEXT PRIMARY KEY,
    plan TEXT NOT NULL DEFAULT 'premium',
    max_uses INTEGER NOT NULL DEFAULT 1,
    used_count INTEGER NOT NULL DEFAULT 0,
    expires_at INTEGER
  )`,
  `CREATE TABLE IF NOT EXISTS anonymous_friction_stats (
    lesson_id TEXT NOT NULL,
    block_id TEXT NOT NULL,
    block_type TEXT NOT NULL,
    total_attempts INTEGER NOT NULL DEFAULT 0,
    total_wrong INTEGER NOT NULL DEFAULT 0,
    updated_at INTEGER NOT NULL,
    PRIMARY KEY (lesson_id, block_id)
  )`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at)`,
  `CREATE INDEX IF NOT EXISTS idx_learning_events_user_id ON learning_events(user_id, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_friction_events_user_id ON friction_events(user_id, created_at)`,
];

const globalForSchema = globalThis as typeof globalThis & {
  __slSchemaInitPromises?: WeakMap<Client, Promise<void>>;
};

function getSchemaInitMap(): WeakMap<Client, Promise<void>> {
  if (!globalForSchema.__slSchemaInitPromises) {
    globalForSchema.__slSchemaInitPromises = new WeakMap<Client, Promise<void>>();
  }
  return globalForSchema.__slSchemaInitPromises;
}

async function runSchemaInitialization(client: Client): Promise<void> {
  const statements: InStatement[] = [
    ...SCHEMA_STATEMENTS,
    ...DEMO_ACTIVATION_CODES.map((seed) => ({
      sql: `INSERT OR IGNORE INTO activation_codes (code, plan, max_uses, used_count, expires_at)
            VALUES (?, ?, ?, 0, NULL)`,
      args: [seed.code, seed.plan, seed.maxUses],
    })),
  ];

  await client.batch(statements, 'write');
}

/**
 * Idempotently initializes all v2/v3 tables, indexes, and demo activation codes.
 * Safe to call on every server request; runs once per Client instance.
 */
export async function ensureSchema(clientOverride?: Client): Promise<Client> {
  const client = clientOverride ?? getDbClient();
  const initMap = getSchemaInitMap();

  let pending = initMap.get(client);
  if (!pending) {
    pending = runSchemaInitialization(client).catch((err) => {
      initMap.delete(client);
      throw err;
    });
    initMap.set(client, pending);
  }

  await pending;
  return client;
}
