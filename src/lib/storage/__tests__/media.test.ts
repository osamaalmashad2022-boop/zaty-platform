import fs from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { resolveMediaUrl } from '../media';

describe('storage/media resolveMediaUrl and offline assets', () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
  });

  it('resolves relative paths to /media/ locally and preserves absolute or /media/ paths', () => {
    expect(resolveMediaUrl('video-1-1.mp4')).toBe('/media/video-1-1.mp4');
    expect(resolveMediaUrl('/media/robot-puzzle.png')).toBe('/media/robot-puzzle.png');
    expect(resolveMediaUrl('https://cdn.example.com/a.mp4')).toBe('https://cdn.example.com/a.mp4');
  });

  it('uses NEXT_PUBLIC_MEDIA_BASE_URL when configured for R2', () => {
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL = 'https://media.ict-prep3.example/';
    expect(resolveMediaUrl('prep3/term1/video-1-1.mp4')).toBe(
      'https://media.ict-prep3.example/prep3/term1/video-1-1.mp4',
    );
    expect(resolveMediaUrl('/media/robot-path.png')).toBe(
      'https://media.ict-prep3.example/robot-path.png',
    );
  });

  it('has all required media files in public/media/ and Skulpt bundles in public/vendor/skulpt/', () => {
    const requiredMedia = [
      'video-1-1.mp4',
      'caption-1-1.vtt',
      'robot-puzzle.png',
      'robot-path.png',
      'robot-shield.png',
    ];
    for (const file of requiredMedia) {
      const fullPath = path.resolve(process.cwd(), 'public/media', file);
      expect(fs.existsSync(fullPath), `Missing public/media/${file}`).toBe(true);
      expect(fs.statSync(fullPath).size).toBeGreaterThan(0);
    }

    const skulptMin = path.resolve(process.cwd(), 'public/vendor/skulpt/skulpt.min.js');
    const skulptStdlib = path.resolve(process.cwd(), 'public/vendor/skulpt/skulpt-stdlib.js');
    expect(fs.existsSync(skulptMin)).toBe(true);
    expect(fs.existsSync(skulptStdlib)).toBe(true);
    expect(fs.statSync(skulptMin).size).toBeGreaterThan(100_000);
    expect(fs.statSync(skulptStdlib).size).toBeGreaterThan(100_000);
  });
});
