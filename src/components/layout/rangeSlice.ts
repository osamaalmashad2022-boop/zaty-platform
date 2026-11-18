export interface ByteRange {
  start: number;
  end: number;
}

/**
 * Parses an HTTP Range header (`bytes=start-end`) against a known total byte length.
 * Mirrors the Range slicing logic inside `public/sw.js` for Safari iOS & Chrome media caching.
 */
export function parseByteRange(rangeHeader: string, totalLength: number): ByteRange | null {
  if (!rangeHeader || totalLength <= 0) return null;
  const match = /bytes=(\d*)-(\d*)/i.exec(rangeHeader.trim());
  if (!match) return null;

  const [, rawStart, rawEnd] = match;
  if (!rawStart && !rawEnd) return null;

  let start = rawStart ? Number.parseInt(rawStart, 10) : 0;
  let end = rawEnd ? Number.parseInt(rawEnd, 10) : totalLength - 1;

  if (!rawStart && rawEnd) {
    const suffixLength = Number.parseInt(rawEnd, 10);
    if (Number.isNaN(suffixLength) || suffixLength <= 0) return null;
    start = Math.max(0, totalLength - suffixLength);
    end = totalLength - 1;
  }

  if (Number.isNaN(start) || Number.isNaN(end) || start < 0 || start >= totalLength || start > end) {
    return null;
  }

  return {
    start,
    end: Math.min(end, totalLength - 1),
  };
}
