import { SeverityNumber } from '@opentelemetry/api-logs';
import { after, NextResponse } from 'next/server';
import { getAuthenticatedUserFromRequest } from '@/lib/auth/server';
import {
  emitPostHogLog,
  flushPostHogLogs,
} from '@/lib/posthog-logs';
import { redeemUserActivationCode } from '@/lib/sync/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const auth = await getAuthenticatedUserFromRequest(request);
  if (!auth) {
    return NextResponse.json(
      { ok: false, user: null, error: 'يجب تسجيل الدخول أولًا لتفعيل الكود.' },
      { status: 401 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, user: null, error: 'صيغة البيانات المرسلة غير صالحة.' },
      { status: 400 },
    );
  }

  const result = await redeemUserActivationCode(auth.user.id, body?.code);
  emitPostHogLog('activation code processed', SeverityNumber.INFO, {
    endpoint: '/api/activate',
    outcome: result.ok ? 'succeeded' : 'rejected',
    status_code: result.status,
    already_active: result.alreadyActive ?? false,
  });
  after(() => flushPostHogLogs().catch(() => {}));

  return NextResponse.json(
    {
      ok: result.ok,
      user: result.user,
      tier: result.tier,
      plan: result.plan,
      alreadyActive: result.alreadyActive,
      message: result.message,
      error: result.error,
    },
    { status: result.status },
  );
}
