import { NextResponse } from 'next/server';
import {
  recordAnonymousFrictionBatch,
  type AnonymousFrictionPayloadItem,
} from '@/lib/sync/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'صيغة بيانات القياس غير صالحة.' },
      { status: 400 },
    );
  }

  const items: AnonymousFrictionPayloadItem[] = Array.isArray(body?.items)
    ? (body.items as AnonymousFrictionPayloadItem[])
    : [
        {
          lessonId: String(body?.lessonId ?? ''),
          blockId: String(body?.blockId ?? ''),
          blockType: String(body?.blockType ?? ''),
          isCorrect:
            typeof body?.isCorrect === 'boolean' ? body.isCorrect : undefined,
          attempts:
            typeof body?.attempts === 'number' ? body.attempts : undefined,
          wrongCount:
            typeof body?.wrongCount === 'number' ? body.wrongCount : undefined,
        },
      ];

  const result = await recordAnonymousFrictionBatch(items);
  return NextResponse.json(
    { ok: result.ok, recorded: result.recorded, error: result.error },
    { status: result.status },
  );
}
