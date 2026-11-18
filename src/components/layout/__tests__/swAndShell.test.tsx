import '@testing-library/jest-dom/vitest';
import fs from 'node:fs';
import path from 'node:path';
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
});
