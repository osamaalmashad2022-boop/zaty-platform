import { SeverityNumber } from '@opentelemetry/api-logs';
import { after, NextResponse } from 'next/server';
import { getAuthenticatedUserFromRequest } from '@/lib/auth/server';
import {
  emitPostHogLog,
  flushPostHogLogs,
} from '@/lib/posthog-logs';
import { syncUserProgress, type SyncRequestPayload } from '@/lib/sync/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const auth = await getAuthenticatedUserFromRequest(request);
  if (!auth) {
    return NextResponse.json(
      { ok: false, user: null, error: 'يجب تسجيل الدخول أولًا للمزامنة السحابية.' },
      { status: 401 },
    );
  }

  let body: SyncRequestPayload = {};
  try {
    const raw = await request.text();
    if (raw.trim().length > 0) {
      body = JSON.parse(raw) as SyncRequestPayload;
    }
  } catch {
    return NextResponse.json(
      { ok: false, user: null, error: 'بيانات المزامنة المرسلة غير صالحة.' },
      { status: 400 },
    );
  }

  const result = await syncUserProgress(auth.user.id, body);
  emitPostHogLog('cloud progress synchronized', SeverityNumber.INFO, {
    endpoint: '/api/sync',
    outcome: result.ok ? 'succeeded' : 'rejected',
    status_code: 200,
  });
  after(() => flushPostHogLogs().catch(() => {}));

  return NextResponse.json(result, { status: 200 });
}
