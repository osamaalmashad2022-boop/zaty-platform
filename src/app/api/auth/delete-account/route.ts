import { NextResponse } from 'next/server';
import {
  clearSessionCookie,
  deleteAccountAndUserData,
  getAuthenticatedUserFromRequest,
} from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export async function DELETE(request: Request) {
  const auth = await getAuthenticatedUserFromRequest(request);
  if (!auth) {
    return NextResponse.json(
      { ok: false, error: 'يجب تسجيل الدخول أولًا لحذف الحساب.' },
      { status: 401 },
    );
  }

  await deleteAccountAndUserData(auth.user.id);

  const response = NextResponse.json(
    {
      ok: true,
      message: 'تم حذف حسابك وجميع بياناتك الشخصية وسجل التعلم نهائيًا.',
    },
    { status: 200 },
  );
  clearSessionCookie(response);
  return response;
}
