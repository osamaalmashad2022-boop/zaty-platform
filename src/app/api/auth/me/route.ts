import { NextResponse } from 'next/server';
import {
  clearSessionCookie,
  extractSessionTokenFromRequest,
  getAuthenticatedUserFromRequest,
} from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const auth = await getAuthenticatedUserFromRequest(request);
  if (!auth) {
    const response = NextResponse.json(
      { ok: true, authenticated: false, user: null },
      { status: 200 },
    );
    if (extractSessionTokenFromRequest(request)) {
      clearSessionCookie(response);
    }
    return response;
  }

  return NextResponse.json(
    { ok: true, authenticated: true, user: auth.user },
    { status: 200 },
  );
}
