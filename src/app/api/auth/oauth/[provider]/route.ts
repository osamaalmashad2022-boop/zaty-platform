import { NextResponse } from 'next/server';
import {
  getOAuthProviderConfig,
  setOAuthStateCookie,
} from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider } = await context.params;
  const url = new URL(request.url);
  const result = getOAuthProviderConfig(provider, url.origin);

  if (!result.supported) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        provider: result.provider,
        message: result.message,
      },
      { status: 400 },
    );
  }

  if (!result.configured || !result.authUrl || !result.state) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        provider: result.provider,
        requiredEnvVars: result.requiredEnvVars ?? [],
        message: result.message,
      },
      { status: 501 },
    );
  }

  const shouldRedirect =
    url.searchParams.get('redirect') === '1' ||
    url.searchParams.get('mode') === 'redirect';

  const response = shouldRedirect
    ? NextResponse.redirect(result.authUrl)
    : NextResponse.json(
        {
          ok: true,
          configured: true,
          provider: result.provider,
          authUrl: result.authUrl,
          message: result.message,
        },
        { status: 200 },
      );

  setOAuthStateCookie(response, result.state);
  return response;
}
