import { createClient, type Client } from '@libsql/client';

export interface DbClientConfig {
  url?: string;
  authToken?: string;
}

interface GlobalDbState {
  overrideClient: Client | null;
  clientsByKey: Map<string, Client>;
}

const globalForDb = globalThis as typeof globalThis & {
  __slDbState?: GlobalDbState;
};

function getGlobalDbState(): GlobalDbState {
  if (!globalForDb.__slDbState) {
    globalForDb.__slDbState = {
      overrideClient: null,
      clientsByKey: new Map<string, Client>(),
    };
  }
  return globalForDb.__slDbState;
}

export function resolveDbConfig(config?: DbClientConfig): {
  url: string;
  authToken?: string;
} {
  const url =
    config?.url?.trim() ||
    process.env.TURSO_DATABASE_URL?.trim() ||
    'file:./local.db';
  const authToken =
    config?.authToken?.trim() || process.env.TURSO_AUTH_TOKEN?.trim() || undefined;

  return { url, authToken };
}

/**
 * Creates a new @libsql/client instance without registering it as the singleton.
 * Useful for isolated test databases (`:memory:` or temporary SQLite files).
 */
export function createDbClient(config?: DbClientConfig): Client {
  const { url, authToken } = resolveDbConfig(config);
  return createClient(authToken ? { url, authToken } : { url });
}

/**
 * Returns the shared @libsql/client instance for the configured Turso or local SQLite URL.
 * Supports test overrides via `setDbClientOverride`.
 */
export function getDbClient(config?: DbClientConfig): Client {
  const state = getGlobalDbState();
  if (!config?.url && state.overrideClient) {
    return state.overrideClient;
  }

  const { url, authToken } = resolveDbConfig(config);
  const key = `${url}::${authToken ?? ''}`;
  const existing = state.clientsByKey.get(key);
  if (existing) {
    return existing;
  }

  const client = createClient(authToken ? { url, authToken } : { url });
  state.clientsByKey.set(key, client);
  return client;
}

/**
 * Overrides the default client returned by `getDbClient()` (intended for tests).
 */
export function setDbClientOverride(client: Client | null): void {
  const state = getGlobalDbState();
  state.overrideClient = client;
}

/**
 * Closes and clears all cached database clients and any test override.
 */
export function resetDbClient(): void {
  const state = getGlobalDbState();
  if (state.overrideClient) {
    try {
      state.overrideClient.close();
    } catch {
      // Ignore close errors during teardown
    }
    state.overrideClient = null;
  }
  for (const client of state.clientsByKey.values()) {
    try {
      client.close();
    } catch {
      // Ignore close errors during teardown
    }
  }
  state.clientsByKey.clear();
}
