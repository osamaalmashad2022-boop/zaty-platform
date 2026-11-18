/**
 * Resolves relative curriculum media paths to local `/media/...` in v1 offline mode
 * or a configured Cloudflare R2 base URL (`NEXT_PUBLIC_MEDIA_BASE_URL`).
 */
export function resolveMediaUrl(assetPath: string): string {
  const trimmed = assetPath.trim();
  if (!trimmed) return '';

  if (/^(https?:\/\/|data:|blob:)/i.test(trimmed)) {
    return trimmed;
  }

  const baseUrl =
    typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim() : '';

  if (baseUrl) {
    const cleanBase = baseUrl.replace(/\/+$/, '');
    const cleanRel = trimmed.replace(/^\/?media\//, '').replace(/^\/+/, '');
    return `${cleanBase}/${cleanRel}`;
  }

  if (trimmed.startsWith('/media/')) {
    return trimmed;
  }
  if (trimmed.startsWith('/')) {
    return trimmed;
  }
  return `/media/${trimmed.replace(/^\.?\//, '')}`;
}
