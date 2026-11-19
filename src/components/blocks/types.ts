import type { BlockType } from '@/types/curriculum';
import { resolveMediaUrl } from '@/lib/storage/media';

export interface BlockAttemptPayload {
  isCorrect: boolean;
  attemptNumber: number;
  errorKind?: string;
  isUngraded?: boolean;
}

export interface BlockInteractionProps {
  blockId?: string;
  onAttempt?: (payload: BlockAttemptPayload) => void;
  onComplete?: (isCorrect: boolean) => void;
  onInteract?: () => void;
  className?: string;
}

export function resolveMediaSrc(src: string): string {
  return resolveMediaUrl(src);
}

export function formatDurationMinutes(minutes: number): string {
  if (minutes <= 1) return 'دقيقة واحدة';
  if (minutes === 2) return 'دقيقتان';
  if (minutes <= 10) return `${minutes} دقائق`;
  return `${minutes} دقيقة`;
}

export function formatSecondsClock(seconds: number): string {
  const safe = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export type SupportedBlockType = BlockType;
