import '@testing-library/jest-dom/vitest';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppShell } from '../AppShell';
import { parseByteRange } from '../rangeSlice';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Safari iOS Range media slicing and RTL AppShell', () => {
  it('computes valid inclusive byte slices for Range headers', () => {
    expect(parseByteRange('bytes=0-99', 1000)).toEqual({ start: 0, end: 99 });
    expect(parseByteRange('bytes=500-', 1000)).toEqual({ start: 500, end: 999 });
    expect(parseByteRange('bytes=-100', 1000)).toEqual({ start: 900, end: 999 });
    expect(parseByteRange('bytes=1200-1500', 1000)).toBeNull();
  });

  it('renders RTL navigation links and never uses forbidden wording', () => {
    const { container } = render(
      <AppShell title="تعلّم ICT">
        <div>محتوى الدرس</div>
      </AppShell>,
    );

    expect(screen.getAllByRole('link', { name: /الرئيسية/ })[0]).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: /المراجعة/ })[0]).toHaveAttribute('href', '/review');
    expect(screen.getAllByRole('link', { name: /الامتحان/ })[0]).toHaveAttribute('href', '/exam');
    expect(screen.getAllByRole('link', { name: /تقدمي/ })[0]).toHaveAttribute('href', '/progress');
    expect(container.textContent).not.toMatch(/(?:ال)?طالب/);
  });

  it('includes 206 Partial Content Range handling and offline media fallback in public/sw.js', () => {
    const swPath = path.resolve(process.cwd(), 'public/sw.js');
    const swText = fs.readFileSync(swPath, 'utf8');
    expect(swText).toContain('status: 206');
    expect(swText).toContain('Content-Range');
    expect(swText).toContain('Accept-Ranges');
    expect(swText).toContain('/vendor/skulpt/skulpt.min.js');
  });

  it('excludes /api/ routes from Service Worker caching in public/sw.js', () => {
    const swPath = path.resolve(process.cwd(), 'public/sw.js');
    const swText = fs.readFileSync(swPath, 'utf8');
    expect(swText).toContain("startsWith('/api/')");

    const listeners = new Map<string, (event: unknown) => void>();
    const cachesOpen = vi.fn();
    const fetchMock = vi.fn(() => Promise.resolve(new Response('ok', { status: 200 })));

    const ctx: Record<string, unknown> = {
      URL,
      Request,
      Response,
      Headers,
      Set,
      Promise,
      Number,
      String,
      Array,
      Math,
      parseInt,
      location: { origin: 'https://zaty.example' },
      navigator: { onLine: true },
      caches: { open: cachesOpen, keys: vi.fn(), delete: vi.fn() },
      fetch: fetchMock,
      addEventListener: (type: string, cb: (event: unknown) => void) => {
        listeners.set(type, cb);
      },
      skipWaiting: vi.fn(),
      clients: { claim: vi.fn() },
    };
    ctx.self = ctx;

    vm.createContext(ctx);
    vm.runInContext(swText, ctx);

    const onFetch = listeners.get('fetch');
    expect(onFetch).toBeTypeOf('function');

    for (const apiUrl of [
      'https://zaty.example/api/auth/me',
      'https://zaty.example/api/sync',
      'https://zaty.example/api',
    ]) {
      const respondWith = vi.fn();
      onFetch!({
        request: { method: 'GET', url: apiUrl, mode: 'cors', headers: new Headers() },
        respondWith,
        waitUntil: vi.fn(),
      });
      expect(respondWith).not.toHaveBeenCalled();
    }
    expect(cachesOpen).not.toHaveBeenCalled();
  });
});
