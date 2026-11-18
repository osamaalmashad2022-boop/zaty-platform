import { NextResponse } from 'next/server';
import {
  clearOAuthStateCookie,
  exchangeOAuthCodeForProfile,
  extractOAuthStateFromRequest,
  isSupportedOAuthProvider,
  loginOrCreateOAuthUser,
  setSessionCookie,
  verifyOAuthState,
} from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

function errorResponse(
  error: string,
  status: number,
  extra?: Record<string, unknown>,
): NextResponse {
  const response = NextResponse.json(
    { ok: false, error, ...extra },
    { status },
  );
  clearOAuthStateCookie(response);
  return response;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider: rawProvider } = await context.params;
  const provider = rawProvider.trim().toLowerCase();

  if (!isSupportedOAuthProvider(provider)) {
    return errorResponse('مزوّد تسجيل الدخول المطلوب غير مدعوم.', 400);
  }

  const url = new URL(request.url);
  const providerError = url.searchParams.get('error')?.trim();
  if (providerError) {
    return errorResponse(
      'تم إلغاء تسجيل الدخول أو تعذّر التفويض من مزوّد الخدمة.',
      400,
      { providerError },
    );
  }

  const queryState = url.searchParams.get('state');
  const cookieState = extractOAuthStateFromRequest(request);
  if (!verifyOAuthState(cookieState, queryState)) {
    return errorResponse(
      'فشل التحقق الأمني لطلب تسجيل الدخول. يرجى المحاولة مرة أخرى.',
      400,
    );
  }

  const code = url.searchParams.get('code')?.trim();
  if (!code) {
    return errorResponse('رمز التفويض مفقود في رد مزوّد الخدمة.', 400);
  }

  const profileResult = await exchangeOAuthCodeForProfile(
    provider,
    code,
    url.origin,
  );
  if (!profileResult.ok) {
    return errorResponse(profileResult.error, profileResult.status);
  }

  const authResult = await loginOrCreateOAuthUser(profileResult.profile);
  if (!authResult.ok) {
    return errorResponse(authResult.error, authResult.status);
  }

  const response = NextResponse.redirect(new URL('/', url.origin), {
    status: 302,
  });
  clearOAuthStateCookie(response);
  setSessionCookie(response, authResult.token);
  return response;
}
