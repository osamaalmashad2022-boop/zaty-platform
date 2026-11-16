import { NextResponse } from 'next/server';
import { registerUser, setSessionCookie } from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, user: null, error: 'صيغة البيانات المرسلة غير صالحة.' },
      { status: 400 },
    );
  }

  const result = await registerUser({
    email: body?.email,
    password: body?.password,
    name: body?.name,
    guardianConsent: body?.guardianConsent,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, user: null, error: result.error },
      { status: result.status },
    );
  }

  const response = NextResponse.json(
    { ok: true, user: result.user, token: result.token },
    { status: 201 },
  );
  setSessionCookie(response, result.token);
  return response;
}
