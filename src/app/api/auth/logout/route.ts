import { NextResponse } from 'next/server';
import { clearSessionCookie, revokeSessionFromRequest } from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  await revokeSessionFromRequest(request);
  const response = NextResponse.json({ ok: true }, { status: 200 });
  clearSessionCookie(response);
  return response;
}
