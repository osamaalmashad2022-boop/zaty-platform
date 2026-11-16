# ICT 3rd Prep Term 1 Self-Learning Platform (v1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete offline-first v1 Arabic (`RTL`) mobile-first self-learning platform for Egypt's 2026/2027 3rd-Prep ICT Term 1 curriculum (2 units, 9 stations, 29 micro-lessons, 295 official quiz items, 15 reusable block types, 8 learner screens, and browser-side Python execution via Skulpt in a Web Worker).

**Architecture:** Next.js App Router PWA styled natively in Arabic RTL with the Orchid theme (`IBM Plex Sans Arabic` + `JetBrains Mono`). Curriculum packs live solely under `src/content/` on the server and are hydrated into client components (`'use client'`) without ever bundling raw content files into the client; learner progress is stored immediately in IndexedDB via Dexie as an append-only `learning_events` log from which XP, Cairo-date streaks, 6 badges, and friction weak spots are deterministically derived; Python exercises run offline inside a Web Worker running Skulpt (`<= 450 KB`) with a 3s `execLimit` and interactive `stdout`/`input()` terminal messaging.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, Dexie (`dexie`), Lucide Icons (`lucide-react`), Skulpt (`skulpt`), Vitest (`vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `jsdom`, `fake-indexeddb`), Service Worker + Cache Storage API (`public/sw.js`). *(If `.git` is not yet initialized in the workspace, run `git init` before executing commit steps.)*

**Spec:** `docs/superpowers/specs/2026-11-16-ict-prep3-platform-design.md` (with primary curriculum map `docs/sources/textbook-map.md` and Mindsmith UX references `docs/reference/export-A.md`, `export-B.md`, `export-C.md`).

---

## Global Constraints

- **Native Arabic RTL & Audience:** Egyptian 3rd-Prep learners (age 14–15) on mobile first; root element `<html lang="ar" dir="rtl">`; Egyptian-friendly Arabic prose (max 3–4 lines per paragraph) keeping English technical terms inline (`dir="ltr"` for code/terms like `Problem Solving`, `Algorithm`, `Flowchart`, `String`, `List`, `Function`, `try/except`, `Machine Learning`, `Deepfake`, `PII`, `ValueError`, `ZeroDivisionError`, `SyntaxError`).
- **Terminology Lock (`D1`):** ALWAYS address or refer to the learner as **`المتعلم`** / **`متعلم`**; NEVER use **`طالب`** or **`الطالب`** anywhere in learner-facing UI, content, or error strings.
- **Curriculum Lock (`D15`):** Egypt 2026/2027 Term 1 (`Python` + `AI` + `Cybersecurity`) only — zero `Visual Basic .NET` content.
- **v1 Scope Boundary (`D4`, `D10`, `D25`):** Build the complete offline v1 platform (no auth/Turso sync — `v2`; no paywall/activation codes — `v3`; no teacher/parent dashboards; no Mindsmith iframes; no external paid AI grading APIs).
- **Zero-Key Offline-First & Python Bundle Budget:** Zero external API keys or accounts required to develop, build, or run v1. Serve `skulpt.min.js` + `skulpt-stdlib.js` locally from `public/vendor/skulpt/` (combined size `<= 500 KB`, target `~450 KB`, never CDN or Pyodide), executing inside a dedicated Web Worker with `Sk.execLimit = 3000` (3 seconds).
- **Orchid Design Tokens & Touch Targets:** Page `#F6FAF9`, card `#FFFFFF` (border `#E2ECE9`, shadow `0 4px 6px -1px rgb(0 0 0 / 0.08)`, radius `12px` / `0.75rem`), headings `#163A3A`, body `#3B5A58` (`17px–18px`, line-height `1.75`), primary `#009179` (`#E5F1EE` tint), secondary/warning `#E14B63` (`#FBEAEC` tint), code card `#0F2929`, button radius `8px` (`0.5rem`), touch targets `>= 48px`, fonts `IBM Plex Sans Arabic` + `JetBrains Mono`.
- **10-Part Micro-Lesson Template:** Every 7–10 minute micro-lesson maps all 10 elements sequentially across horizontal cards: (1) 1-line goal + (2) daily hook (`heroHook`), (3) 1-idea-per-card explanation blocks, (4) unscored try-it activity, (5) 2–4 instant-feedback `quizQuestion` checks, (6) common-mistake `calloutWarning`, (7) 1-paragraph summary, (8) NotebookLM `additionalSources` bottom sheet, (9) read-only `SourcesDrawer`, and (10) large `nextStep` CTA.
- **Server-Side Content Boundary & Safe Cache Versioning:** Keep `src/content/**` imported only in server components/utilities (never directly inside `'use client'` modules); incrementable `contentVersion` updates Dexie `cached_lessons` without ever deleting `learning_events`.
- **Privacy & Attribution (Law 151/2020):** Collect zero PII in v1; use original rephrased explanations/examples while attributing `ICT_ARABIC_Prp3_TR1.pdf` pages and NotebookLM sources.
- **Media Offline Strategy (`D24`):** Resolve relative asset paths via `resolveMediaUrl()`; cache `.mp4`/`.mp3`/`.vtt` on demand (never bulk-precache video/audio on SW install), support HTTP `Range` (`206 Partial Content`) for Safari iOS, show full Arabic `transcript` fallback offline, and offer an optional per-station Cache Storage download button.

---

## Review Focus

1. **Infinite loop or runaway Python code in `codeLab` (`while True: print("x")`):** Skulpt inside `public/workers/skulpt-worker.js` MUST abort at `Sk.execLimit = 3000`, surface a friendly Arabic timeout hint without freezing the UI thread, and reset cleanly so the next execution succeeds *(pinned in Task 3)*.
2. **Arabic UTF-8 `print()` output and interactive `input()` cancellation in Skulpt:** Printing Arabic text (`print("أهلاً")`) and cancelling or sequentially answering multiple `input()` prompts MUST preserve UTF-8 Arabic characters and settle cleanly with zero dangling Worker Promises *(pinned in Task 3)*.
3. **Duplicate `learning_events`, Cairo midnight streak crossover, and corrupted backup import:** Re-posting an existing `eventId`, recording events across `Africa/Cairo` midnight boundaries, or importing malformed/corrupt backup codes MUST stay idempotent on XP/Streak, compute Cairo dates accurately, and reject bad backups without wiping existing Dexie data *(pinned in Task 2)*.
4. **Forbidden word `طالب` / `الطالب` or broken `microLessonId` / `contentVersion` invariants:** Any occurrence of `طالب` in learner-facing text, any `QuizItem` pointing to an invalid `microLessonId`, or any station missing required lessons/10-part fields MUST fail automated content tests, while updating `contentVersion` preserves `learning_events` *(pinned in Task 2 & Task 7)*.
5. **Safari iOS `Range` media requests and offline uncached media playback:** Requesting cached `.mp4`/`.mp3` with `Range: bytes=...` offline MUST return `206 Partial Content` slices from Cache Storage, and opening an uncached media card offline MUST gracefully fall back to displaying the full Arabic `transcript` inside `MediaPlayerBlock` without blocking lesson completion *(pinned in Task 8 & Task 11)*.

---

## File Structure & Swarm Module Ownership

| Swarm Module | Owned Paths (Strict Boundaries) | Tasks |
|---|---|---|
| `@foundation` | `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `vitest.config.ts`, `public/media/**`, `public/vendor/**`, `public/workers/**`, `src/types/curriculum.ts`, `src/lib/storage/**`, `src/lib/python/**` | Tasks 1–3 |
| `@content` | `scripts/**`, `src/content/**` | Tasks 4–7 |
| `@blocks` | `src/components/blocks/**`, `src/components/lesson/**` | Tasks 8–10 |
| `@screens` | `src/app/**`, `src/components/layout/**`, `public/sw.js` | Tasks 11–13 |
| `@verifier` | Read-only QA across the repo (runs tests, typecheck, build, copy/asset/curriculum audits) | Task 14 |

---

## Module 1: Foundation (`@foundation`)

### Task 1: Type Contracts, Project Toolchain & Local Media/Skulpt Assets

**Owner:** `@foundation`

**Files:**
- Create: `src/types/curriculum.ts`
- Create: `src/lib/storage/media.ts`
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `vitest.config.ts`
- Copy to `public/media/`: `video-1-1.mp4`, `caption-1-1.vtt`, `robot-puzzle.png`, `robot-path.png`, `robot-shield.png`
- Copy to `public/vendor/skulpt/`: `skulpt.min.js`, `skulpt-stdlib.js`
- Test: `src/lib/storage/__tests__/media.test.ts`

**Interfaces:**
- Consumes: Design schema in `docs/superpowers/specs/2026-11-16-ict-prep3-platform-design.md` (`§5.1–§5.5`) and existing export media files.
- Produces:
  - `src/types/curriculum.ts` exporting:
    - `BlockType` & 15 `{ id, type, data }` interfaces (`HeroHookBlock`, `RichTextBlock`, `ListBlock`, `ImageBlock`, `MediaPlayerBlock`, `CodeViewBlock`, `ProcessStepperBlock`, `TableBlock`, `AccordionBlock`, `CalloutWarningBlock`, `QuizQuestionBlock`, `SortingBucketsBlock`, `MatchingPairsBlock`, `OrderFlowBuilderBlock`, `CodeLabBlock`) -> `LessonBlock`
    - Matching `*Data` interfaces (`HeroHookData`, `RichTextData`, `ListBlockData`, `ImageBlockData`, `MediaPlayerData`, `CodeViewData`, `ProcessStepperData`, `TableBlockData`, `AccordionBlockData`, `CalloutWarningData`, `QuizQuestionData`, `SortingBucketsData`, `MatchingPairsData`, `OrderFlowBuilderData`, `CodeLabData`, `CodeLabCheck`, `FlowchartShape`)
    - Curriculum packs: `LessonCard`, `LessonCardRole`, `MindmapNode`, `AdditionalSource` (`'summary' | 'faq' | 'mindmap' | 'glossary' | 'audio'`), `SourceReference`, `LessonNextStep`, `ContentAccess`, `ContentStatus`, `LessonPack`, `QuizItem`, `FlashcardItem`, `StationPack`, `UnitPack`, `TermPack`
    - Telemetry & progress: `LearningEventType`, `LearningEvent`, `FrictionEvent`, `BadgeId` (`'first_lesson' | 'first_station' | 'perfect_quiz' | 'streak_3' | 'unit_1_hero' | 'term_1_complete'`), `BadgeStatus`, `StationProgressSummary`, `QuizAttemptSummary`, `FlashcardReviewState`, `FrictionSummary`, `LearnerStats`, `CachedLessonRecord`
  - `src/lib/storage/media.ts`: `resolveMediaUrl(path: string): string`

- [ ] **Step 1: Create `src/types/curriculum.ts` and post readiness signal**
  Define all 15 block `{ id, type, data }` discriminated union members, `LessonPack` (including `contentVersion`, `access`, `status`, `objectives`, `cards`, `summary`, `additionalSources`, `sources`, `nextStep`), `StationPack`, `UnitPack`, `TermPack`, `QuizItem` (with `microLessonId`), `FlashcardItem`, `LearningEvent`, `FrictionEvent`, `BadgeStatus`, and `LearnerStats` matching the exact exported names above.

- [ ] **Step 2: Initialize `package.json`, TypeScript, Next.js, Tailwind v4, and Vitest configs**
  Install runtime deps (`next`, `react`, `react-dom`, `dexie`, `lucide-react`, `skulpt`) and dev deps (`typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `@tailwindcss/postcss`, `tailwindcss`, `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `fake-indexeddb`, `tsx`). Configure `@/*` path alias to `./src/*` in `tsconfig.json` and `vitest.config.ts` (`environment: 'jsdom'`), and configure `postcss.config.mjs` with `@tailwindcss/postcss`.

- [ ] **Step 3: Copy media & local Skulpt assets and verify bundle budget**
  Copy:
  - `_______________/assets/videos/editable-video-eswtxqruo-AR.mp4` -> `public/media/video-1-1.mp4`
  - `_______________/assets/captions/caption-0.vtt` -> `public/media/caption-1-1.vtt`
  - `_____________________________________________________________________/assets/images/image-mqyalpmsg-AR.png` -> `public/media/robot-puzzle.png`
  - `_____________________________________________________________________/assets/images/image-xyjlxbpyo-AR.png` -> `public/media/robot-path.png`
  - `_____________________________________________________________________/assets/images/image-akqjdffij-AR.png` -> `public/media/robot-shield.png`
  - `node_modules/skulpt/dist/skulpt.min.js` + `skulpt-stdlib.js` -> `public/vendor/skulpt/`
  Verify combined size of `public/vendor/skulpt/` is `<= 512000` bytes (`~450 KB` budget).

- [ ] **Step 4: Write failing test for `resolveMediaUrl` & asset budget**

```ts
// src/lib/storage/__tests__/media.test.ts
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolveMediaUrl } from '../media';

describe('resolveMediaUrl and local assets', () => {
  it('resolves relative paths to /media/ locally and preserves absolute or /media paths', () => {
    expect(resolveMediaUrl('video-1-1.mp4')).toBe('/media/video-1-1.mp4');
    expect(resolveMediaUrl('/media/robot-puzzle.png')).toBe('/media/robot-puzzle.png');
    expect(resolveMediaUrl('https://cdn.example.com/a.mp4')).toBe('https://cdn.example.com/a.mp4');
  });

  it('uses NEXT_PUBLIC_MEDIA_BASE_URL when configured for R2', () => {
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL = 'https://media.ict-prep3.example/';
    expect(resolveMediaUrl('prep3/term1/video-1-1.mp4')).toBe(
      'https://media.ict-prep3.example/prep3/term1/video-1-1.mp4'
    );
    delete process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
  });

  it('keeps local Skulpt vendor bundle under 500 KB and copies required media files', () => {
    const skulptDir = path.resolve(process.cwd(), 'public/vendor/skulpt');
    const totalBytes =
      fs.statSync(path.join(skulptDir, 'skulpt.min.js')).size +
      fs.statSync(path.join(skulptDir, 'skulpt-stdlib.js')).size;
    expect(totalBytes).toBeLessThanOrEqual(500 * 1024);

    for (const file of ['video-1-1.mp4', 'caption-1-1.vtt', 'robot-puzzle.png', 'robot-path.png', 'robot-shield.png']) {
      expect(fs.existsSync(path.resolve(process.cwd(), 'public/media', file))).toBe(true);
    }
  });
});
```

- [ ] **Step 5: Run test to verify failure, implement `resolveMediaUrl(assetPath: string): string` in `src/lib/storage/media.ts`, and re-run**
  Run: `npx vitest run src/lib/storage/__tests__/media.test.ts` -> Expected: PASS (3 tests).

- [ ] **Step 6: Commit**
  ```bash
  git add package.json tsconfig.json next.config.ts postcss.config.mjs vitest.config.ts src/types/curriculum.ts src/lib/storage/media.ts src/lib/storage/__tests__/media.test.ts public/media public/vendor/skulpt
  git commit -m "chore(foundation): init Next.js toolchain, curriculum types, and offline media/skulpt assets"
  ```

---

### Task 2: Event-Sourced IndexedDB Storage, Derived Stats, Friction Tracking & Backup

**Owner:** `@foundation`

**Files:**
- Create: `src/lib/storage/db.ts`
- Create: `src/lib/storage/progress.ts`
- Test: `src/lib/storage/__tests__/progress.test.ts`

**Interfaces:**
- Consumes: `LearningEvent`, `LearningEventType`, `FrictionEvent`, `BadgeId`, `BadgeStatus`, `LearnerStats`, `LessonPack`, `CachedLessonRecord`, `StationPack` from `@/types/curriculum`.
- Produces:
  - `src/lib/storage/db.ts`: `IctLearningDb`, `db` (Dexie singleton with tables `learning_events`, `cached_lessons`, `friction_events`, `meta`).
  - `src/lib/storage/progress.ts`:
    - `getCairoDateString(date?: Date | number): string` (`Africa/Cairo` `YYYY-MM-DD`)
    - `recordLearningEvent(input: { eventId?: string; type: LearningEventType; lessonId: string; stationId?: string; payload: unknown; createdAt?: number; cairoDate?: string }): Promise<LearningEvent>`
    - `deriveLearnerStats(events: LearningEvent[], frictionEvents: FrictionEvent[], stations: Pick<StationPack, 'id' | 'unitId' | 'lessons'>[], now?: Date): LearnerStats`
    - `getLearnerStats(stations: Pick<StationPack, 'id' | 'unitId' | 'lessons'>[]): Promise<LearnerStats>`
    - `syncCachedLesson(pack: LessonPack): Promise<{ updated: boolean; record: CachedLessonRecord }>`
    - `getCachedLesson(lessonId: string): Promise<CachedLessonRecord | undefined>`
    - `requestPersistentStorage(): Promise<boolean>`
    - `exportProgressBackup(): Promise<string>`
    - `importProgressBackup(backupCode: string): Promise<{ importedEvents: number }>`

- [ ] **Step 1: Write failing tests covering XP/badges, `contentVersion`, and Review Focus #3 (idempotency, Cairo midnight boundary, corrupt backup rejection)**

```ts
// src/lib/storage/__tests__/progress.test.ts
import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../db';
import {
  deriveLearnerStats,
  exportProgressBackup,
  getCairoDateString,
  importProgressBackup,
  recordLearningEvent,
  syncCachedLesson,
} from '../progress';
import type { LessonPack } from '@/types/curriculum';

const MOCK_STATIONS = [
  { id: 'station-1', unitId: 'unit-1', lessons: [{ id: '1-1' }, { id: '1-2' }] as LessonPack[] },
  { id: 'station-2', unitId: 'unit-1', lessons: [{ id: '2-1' }] as LessonPack[] },
  { id: 'station-6', unitId: 'unit-2', lessons: [{ id: '6-1' }] as LessonPack[] },
];

describe('event-sourced storage and progress derivation', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  it('derives Cairo date accurately across UTC midnight', () => {
    // 2026-11-16T22:30:00Z is 2026-11-17T00:30:00+02:00 in Africa/Cairo
    expect(getCairoDateString(new Date('2026-11-16T22:30:00Z'))).toBe('2026-11-17');
  });

  it('ignores duplicate eventId writes and keeps XP/streak deterministic (Review Focus #3)', async () => {
    const e1 = await recordLearningEvent({
      eventId: 'evt-dup-1',
      type: 'lesson_completed',
      lessonId: '1-1',
      stationId: 'station-1',
      payload: { xpAwarded: 50 },
      cairoDate: '2026-11-15',
      createdAt: 1000,
    });
    await recordLearningEvent({
      eventId: e1.eventId,
      type: 'lesson_completed',
      lessonId: '1-1',
      stationId: 'station-1',
      payload: { xpAwarded: 50 },
      cairoDate: '2026-11-15',
      createdAt: 1000,
    });
    const all = await db.learning_events.toArray();
    expect(all).toHaveLength(1);
    const stats = deriveLearnerStats(all, [], MOCK_STATIONS, new Date('2026-11-15T12:00:00Z'));
    expect(stats.xp).toBe(50);
    expect(stats.badges.find((b) => b.id === 'first_lesson')?.unlocked).toBe(true);
  });

  it('computes 3-day consecutive Cairo streak and unlocks all 6 badges appropriately', async () => {
    const dates = ['2026-11-14', '2026-11-15', '2026-11-16'];
    const lessons = [
      { id: '1-1', stationId: 'station-1' },
      { id: '1-2', stationId: 'station-1' },
      { id: '2-1', stationId: 'station-2' },
      { id: '6-1', stationId: 'station-6' },
    ];
    for (let i = 0; i < lessons.length; i++) {
      await recordLearningEvent({
        eventId: `l-${i}`,
        type: 'lesson_completed',
        lessonId: lessons[i].id,
        stationId: lessons[i].stationId,
        payload: { xpAwarded: 50 },
        cairoDate: dates[Math.min(i, 2)],
        createdAt: 1000 + i,
      });
    }
    await recordLearningEvent({
      eventId: 'q-100',
      type: 'quiz_submitted',
      lessonId: 'station-1',
      stationId: 'station-1',
      payload: { mode: 'station', stationId: 'station-1', score: 10, total: 10, percentage: 100, wrongQuestionIds: [], wrongMicroLessonIds: [] },
      cairoDate: '2026-11-16',
      createdAt: 2000,
    });

    const stats = deriveLearnerStats(
      await db.learning_events.toArray(),
      [],
      MOCK_STATIONS,
      new Date('2026-11-16T15:00:00Z')
    );
    expect(stats.streakDays).toBe(3);
    expect(stats.badges.every((b) => b.unlocked)).toBe(true);
  });

  it('updates cached lesson when contentVersion increments without deleting learning_events (Review Focus #4)', async () => {
    await recordLearningEvent({
      eventId: 'keep-me',
      type: 'lesson_completed',
      lessonId: '1-1',
      stationId: 'station-1',
      payload: { xpAwarded: 50 },
      cairoDate: '2026-11-16',
    });
    const basePack = { id: '1-1', stationId: 'station-1', unitId: 'unit-1', order: 1, title: 'v1', durationMin: 8, contentVersion: 1, access: 'free', status: 'ready', objectives: [], cards: [], summary: '', additionalSources: [], sources: [], nextStep: { kind: 'lesson', targetId: '1-2', label: '' } } as LessonPack;
    expect((await syncCachedLesson(basePack)).updated).toBe(true);
    expect((await syncCachedLesson(basePack)).updated).toBe(false);
    expect((await syncCachedLesson({ ...basePack, title: 'v2', contentVersion: 2 })).updated).toBe(true);
    expect(await db.learning_events.count()).toBe(1);
  });

  it('exports/imports backup idempotently and rejects corrupted backup without wiping Dexie (Review Focus #3)', async () => {
    await recordLearningEvent({
      eventId: 'orig-1',
      type: 'card_viewed',
      lessonId: '1-1',
      stationId: 'station-1',
      payload: { cardId: 'c1', cardIndex: 0, totalCards: 5 },
      cairoDate: '2026-11-16',
    });
    const code = await exportProgressBackup();
    await expect(importProgressBackup('CORRUPTED_NOT_BASE64!!!')).rejects.toThrow();
    expect(await db.learning_events.count()).toBe(1);

    await db.learning_events.clear();
    const res = await importProgressBackup(code);
    expect(res.importedEvents).toBe(1);
    expect(await db.learning_events.count()).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/lib/storage/__tests__/progress.test.ts` -> Expected: FAIL with module not found.

- [ ] **Step 3: Implement `src/lib/storage/db.ts` and `src/lib/storage/progress.ts`**
  - `db.ts`: Dexie class defining `learning_events` (`++id, &eventId, type, lessonId, stationId, cairoDate, createdAt`), `cached_lessons` (`&lessonId, contentVersion, cachedAt`), `friction_events` (`++id, &eventId, lessonId, stationId, blockId, createdAt`), and `meta` (`&key`).
  - `progress.ts`:
    - `getCairoDateString` using `Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit' })`.
    - `recordLearningEvent`: generates `eventId` via `crypto.randomUUID()` when omitted; performs idempotent insert (skips if `eventId` already exists); when `type === 'activity_attempt'`, also appends to `friction_events`.
    - `deriveLearnerStats`: pure deterministic reducer over `LearningEvent[]` and `FrictionEvent[]`:
      - Awards `+50 XP` once per unique `lesson_completed` (`lessonId`), `+5 XP` once per unique `(lessonId, cardId)` viewed, `+20 XP` per `quiz_submitted` (`+30 XP` bonus once per station for `100%`), `+5 XP` per `flashcard_reviewed`.
      - Computes `streakDays` and `longestStreakDays` from sorted unique `cairoDate` strings (streak active if latest date is today or yesterday in `Africa/Cairo`).
      - Computes all 6 badges (`first_lesson`, `first_station`, `perfect_quiz`, `streak_3`, `unit_1_hero`, `term_1_complete`) with Arabic titles matching the spec (`بداية المبرمج`, `أول محطة`, `علامة كاملة`, `3 أيام متتالية`, `بطل الوحدة الأولى`, `ختام الترم الأول`) and zero occurrences of `طالب`.
      - Computes `flashcardStates` (`review_again` vs `known`) and `weakSpots` sorted by `wrongAttempts` descending.
    - `exportProgressBackup` / `importProgressBackup`: UTF-8 safe JSON -> Base64 envelope `{ version: 1, exportedAt, events }`; validates schema strictly inside a Dexie transaction using `bulkPut` / deduplication by `eventId` so corrupt input throws before mutating anything.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/lib/storage/__tests__/progress.test.ts` -> Expected: PASS (5 tests).

- [ ] **Step 5: Commit**
  ```bash
  git add src/lib/storage/db.ts src/lib/storage/progress.ts src/lib/storage/__tests__/progress.test.ts
  git commit -m "feat(foundation): add Dexie event-sourced progress store, Cairo streak/badges, and backup"
  ```

---

### Task 3: Skulpt Web Worker Python Runtime & Automated `stdout` Test Checker

**Owner:** `@foundation`

**Files:**
- Create: `public/workers/skulpt-worker.js`
- Create: `src/lib/python/skulptRunner.ts`
- Test: `src/lib/python/__tests__/skulptRunner.test.ts`

**Interfaces:**
- Consumes: `CodeLabCheck` from `@/types/curriculum`, `/vendor/skulpt/skulpt.min.js`, `/vendor/skulpt/skulpt-stdlib.js`.
- Produces (`src/lib/python/skulptRunner.ts`):
  - `PythonErrorKind = 'SyntaxError' | 'ValueError' | 'ZeroDivisionError' | 'NameError' | 'TimeLimitError' | 'CancelledError' | 'RuntimeError'`
  - `PythonCheckResult = { id: string; label?: string; passed: boolean; stdout: string; error?: string }`
  - `PythonRunResult = { ok: boolean; stdout: string; error: string | null; errorKind?: PythonErrorKind; arabicHint?: string; timedOut?: boolean; durationMs: number }`
  - `mapPythonErrorToArabicHint(rawError: string): { kind: PythonErrorKind; arabicHint: string }`
  - `evaluateCodeChecks(stdout: string, error: string | null, checks: CodeLabCheck[]): { passed: boolean; results: PythonCheckResult[] }`
  - `runPythonInWorker(code: string, options?: { hiddenPrefix?: string; stdinQueue?: string[]; onInputPrompt?: (prompt: string) => Promise<string | null>; onStdout?: (chunk: string) => void; timeoutMs?: number }): Promise<PythonRunResult>`
  - `verifyCodeLabChecks(code: string, checks: CodeLabCheck[], options?: { hiddenPrefix?: string; timeoutMs?: number }): Promise<{ allPassed: boolean; results: PythonCheckResult[] }>`

- [ ] **Step 1: Write failing tests for Arabic error hints, `stdout` check evaluator, worker timeout (`while True`), Arabic UTF-8 `print()`, and `input()` cancellation**

```ts
// src/lib/python/__tests__/skulptRunner.test.ts
import { describe, expect, it, vi } from 'vitest';
import {
  evaluateCodeChecks,
  mapPythonErrorToArabicHint,
  runPythonInWorker,
} from '../skulptRunner';

describe('skulptRunner error hints and stdout checks', () => {
  it('maps SyntaxError, ValueError, ZeroDivisionError, and TimeLimitError to friendly Arabic hints without "طالب"', () => {
    for (const [raw, expectedKind] of [
      ['SyntaxError: bad input on line 2', 'SyntaxError'],
      ['ValueError: invalid literal for int() with base 10: "abc"', 'ValueError'],
      ['ZeroDivisionError: integer division or modulo by zero', 'ZeroDivisionError'],
      ['TimeLimitError: Program exceeded run time limit.', 'TimeLimitError'],
    ] as const) {
      const mapped = mapPythonErrorToArabicHint(raw);
      expect(mapped.kind).toBe(expectedKind);
      expect(mapped.arabicHint.length).toBeGreaterThan(10);
      expect(mapped.arabicHint).not.toContain('طالب');
    }
  });

  it('evaluates stdout checks using regex and contains rules cleanly', () => {
    const evalOk = evaluateCodeChecks('المجموع: 15\n', null, [
      { id: 'c1', stdin: ['5', '10'], expectedOutputRegex: '15', contains: 'المجموع' },
    ]);
    expect(evalOk.passed).toBe(true);

    const evalErr = evaluateCodeChecks('15', 'ValueError: invalid literal', [
      { id: 'c1', stdin: ['x'], expectedOutputRegex: '15' },
    ]);
    expect(evalErr.passed).toBe(false);
  });

  it('terminates runaway worker on timeout and settles cleanly on input() cancel (Review Focus #1 & #2)', async () => {
    class MockTimeoutWorker {
      onmessage: ((e: MessageEvent) => void) | null = null;
      onerror: ((e: ErrorEvent) => void) | null = null;
      terminated = false;
      postMessage(msg: { type: string; code?: string }) {
        if (msg.type === 'run' && msg.code?.includes('input(')) {
          this.onmessage?.({ data: { type: 'stdout', text: 'أهلاً يا مبرمج\n' } } as MessageEvent);
          this.onmessage?.({ data: { type: 'input_request', requestId: 'req-1', prompt: 'اسمك؟' } } as MessageEvent);
        }
        // 'while True' intentionally never emits 'done' to verify hard timeout termination
      }
      terminate() {
        this.terminated = true;
      }
    }
    vi.stubGlobal('Worker', MockTimeoutWorker);

    const timed = await runPythonInWorker('while True:\n    pass', { timeoutMs: 30 });
    expect(timed.ok).toBe(false);
    expect(timed.timedOut).toBe(true);
    expect(timed.errorKind).toBe('TimeLimitError');

    const cancelled = await runPythonInWorker('name = input("اسمك؟")', {
      onInputPrompt: async () => null,
      timeoutMs: 200,
    });
    expect(cancelled.ok).toBe(false);
    expect(cancelled.stdout).toContain('أهلاً يا مبرمج');
    vi.unstubAllGlobals();
  });
});
```
*(Implementer note: ensure `runPythonInWorker` cancels cleanly when `onInputPrompt` returns `null`, without requiring any test-only parameters; the test sets `MockWorker` behavior based on the `code` payload sent in `postMessage`.)*

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/lib/python/__tests__/skulptRunner.test.ts` -> Expected: FAIL with module not found.

- [ ] **Step 3: Implement `public/workers/skulpt-worker.js` and `src/lib/python/skulptRunner.ts`**
  - `public/workers/skulpt-worker.js`:
    ```js
    importScripts('/vendor/skulpt/skulpt.min.js', '/vendor/skulpt/skulpt-stdlib.js');
    // Configure Sk.configure({ output, read, inputfun, inputfunTakesPrompt: true, execLimit: 3000, __future__: Sk.python3 })
    ```
    On `{ type: 'run', runId, code }`: resets output buffer, awaits async `input()` via `pendingInputResolvers[requestId]`, rejects with `'CancelledError: تم إلغاء الإدخال'` if host posts `{ type: 'input_cancel', requestId }`, and posts `{ type: 'done', runId, ok, stdout, error }`.
  - `src/lib/python/skulptRunner.ts`:
    - `mapPythonErrorToArabicHint`: handles `SyntaxError`, `ValueError`, `ZeroDivisionError`, `NameError`, `TimeLimitError`, `CancelledError`, and fallback `RuntimeError` with encouraging Arabic instructions.
    - `runPythonInWorker`: spawns `new Worker('/workers/skulpt-worker.js')`, attaches hard `setTimeout` (`timeoutMs ?? 3500`) that calls `worker.terminate()` and resolves `{ ok: false, timedOut: true, errorKind: 'TimeLimitError', ... }` cleanly so runaway infinite loops never block UI or hang subsequent runs. If `stdinQueue` is provided (for `verifyCodeLabChecks`), shifts queued strings automatically on `input_request`.
    - `verifyCodeLabChecks`: runs each `CodeLabCheck` sequentially against `runPythonInWorker` with `check.stdin`, then evaluates via `evaluateCodeChecks`.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/lib/python/__tests__/skulptRunner.test.ts` -> Expected: PASS (3 tests).

- [ ] **Step 5: Commit**
  ```bash
  git add public/workers/skulpt-worker.js src/lib/python/skulptRunner.ts src/lib/python/__tests__/skulptRunner.test.ts
  git commit -m "feat(foundation): add Skulpt Web Worker Python runner, Arabic error hints, and check verifier"
  ```

---

## Module 2: Content (`@content`)

### Task 4: Mindsmith Base64 Importer Script

**Owner:** `@content`

**Files:**
- Create: `scripts/import-mindsmith.mjs`
- Test: `scripts/__tests__/import-mindsmith.test.ts`

**Interfaces:**
- Consumes: `LessonPack`, `LessonBlock` shapes from `@/types/curriculum`; Mindsmith `lesson-data.js` inside `_______________/`, `_____________________________/`, `____________________________________________________________________/`.
- Produces: CLI & exported parser helpers in `scripts/import-mindsmith.mjs`:
  - `decodeLessonDataFile(filePath: string): Record<string, unknown>`
  - `extractPlainTextFromTipTap(node: unknown): string`
  - `convertExportToDraft(exportDir: string): { title: string; pages: unknown[]; blocksCount: Record<string, number> }`

- [ ] **Step 1: Write failing test verifying Base64 `lesson-data.js` decoding across Export A and Export C**

```ts
// scripts/__tests__/import-mindsmith.test.ts
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { convertExportToDraft, decodeLessonDataFile } from '../import-mindsmith.mjs';

describe('Mindsmith Base64 importer', () => {
  it('decodes Export A (11 pages) and Export C (13 pages, 15 codeTiles) without throwing', () => {
    const exportADir = path.resolve(process.cwd(), '_______________');
    const exportCDir = path.resolve(process.cwd(), '_____________________________________________________________________');

    const rawA = decodeLessonDataFile(path.join(exportADir, 'lesson-data.js'));
    expect(rawA).toHaveProperty('blocks');
    expect(rawA).toHaveProperty('blockOrder');

    const draftA = convertExportToDraft(exportADir);
    expect(draftA.pages.length).toBe(11);

    const draftC = convertExportToDraft(exportCDir);
    expect(draftC.pages.length).toBe(13);
    expect(draftC.blocksCount.codeTile).toBe(15);
    expect(draftC.blocksCount.tableTile).toBe(5);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run scripts/__tests__/import-mindsmith.test.ts` -> Expected: FAIL with module not found.

- [ ] **Step 3: Implement `scripts/import-mindsmith.mjs`**
  Read `lesson-data.js`, extract Base64 string between quotes after `lessonData`, `Buffer.from(b64, 'base64').toString('utf8')`, `JSON.parse`, recursively convert TipTap/ProseMirror nodes to clean Markdown/Arabic text, tally & map tiles (`textTile`, `listTile`, `tableTile`, `accordionTile`, `codeTile`, `questionTile`, `sortingTile`, `matchingTile`, `shortAnswerTile`, `processTile`, `editableVideoTile`, `sectionCalloutTile`, `imageTile`), and support CLI execution (`node scripts/import-mindsmith.mjs <export-dir> <out-file>`).

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run scripts/__tests__/import-mindsmith.test.ts` -> Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add scripts/import-mindsmith.mjs scripts/__tests__/import-mindsmith.test.ts
  git commit -m "feat(content): add Mindsmith Base64 lesson-data importer script"
  ```

---

### Task 5: Unit 1 Station 1 Complete Polished Content (`1.1`–`1.5`, 40 Quiz Items, Flashcards, NotebookLM Extras)

**Owner:** `@content`

**Files:**
- Create: `src/content/prep3-term1/unit-1/meta.ts`
- Create: `src/content/prep3-term1/unit-1/station-1/station.ts`
- Create: `src/content/prep3-term1/unit-1/station-1/lessons/lesson-1-1.ts` .. `lesson-1-5.ts`
- Create: `src/content/prep3-term1/unit-1/station-1/quiz-bank.ts`
- Create: `src/content/prep3-term1/unit-1/station-1/flashcards.ts`

**Interfaces:**
- Consumes: `UnitPack`, `StationPack`, `LessonPack`, `QuizItem`, `FlashcardItem` from `@/types/curriculum`.
- Produces:
  - `UNIT_1_META` (`id: 'unit-1'`, `number: 1`, `title`, `description`, `textbookPages: '4–63'`)
  - `STATION_1_PACK: StationPack` (`id: 'station-1'`, `status: 'ready'`, `access: 'free'`, 5 lessons `'1-1'..'1-5'`, 40 `QuizItem`s, `FlashcardItem[]`, `mediaAssets: ['/media/video-1-1.mp4', '/media/caption-1-1.vtt', '/media/robot-puzzle.png']`).

- [ ] **Step 1: Author `unit-1/meta.ts` and `station-1/lessons/lesson-1-1.ts` .. `lesson-1-5.ts`**
  Each lesson strictly conforms to `LessonPack` (`contentVersion: 1`, `access: 'free'`, `status: 'ready'`) and the 10-part horizontal card structure in warm Egyptian-friendly Arabic (`المتعلم`, NEVER `طالب`):
  - `lesson-1-1.ts`: Concept of a Problem (هدف + عائق) & 4 Computational Thinking pillars (Export A voice) + `mediaPlayer` (`/media/video-1-1.mp4`, `/media/caption-1-1.vtt`, full transcript) + `sortingBuckets` + `matchingPairs` + 2 `quizQuestion`s + `calloutWarning` + summary + rich NotebookLM `additionalSources` (`summary`, `faq`, `mindmap`, `glossary`, `audio` notes/transcript).
  - `lesson-1-2.ts`: 5 Problem-Solving steps & CT mapping `tableBlock`, `processStepper`, `orderFlowBuilder` (`mode: 'steps'`), `quizQuestion`s, NotebookLM `additionalSources`.
  - `lesson-1-3.ts`: First Python (`input`, `int`, `%`, even/odd & sum of 2 numbers), `calloutWarning` for `ValueError`, 3-stage scaffolded `codeLab` (`fillLine` + `freeRun` modulo 5), `quizQuestion`s, NotebookLM `additionalSources`.
  - `lesson-1-4.ts`: Precision & Decisions (`float`, `if / else`, 3-grade average, rectangle area, max of 2), 3-stage `codeLab` (`fillLine` + `freeRun` square area & 4-grade average), `quizQuestion`s, NotebookLM `additionalSources`.
  - `lesson-1-5.ts`: Loops (`for`, `range(1, 6)`, `+=`) + textbook capstone (3 grades pass/fail) in `codeLab` with automated `checks[]`, `quizQuestion`s, NotebookLM `additionalSources`.

- [ ] **Step 2: Author `station-1/quiz-bank.ts` (40 official items) & `flashcards.ts` & `station.ts`**
  Rephrase/adapt all 40 Station 1 textbook items (20 `trueFalse` + 20 `mcq` from `docs/sources/textbook-map.md` pp. 13–17), assigning every item a valid `microLessonId` (`'1-1'..'1-5'`), a 1-sentence Arabic `explanation`, and `sourceTag: 'كتاب الوزارة ص ١٣–١٧'`. Export `STATION_1_PACK` in `station.ts`.

- [ ] **Step 3: Verify Station 1 compiles cleanly**
  Run: `npx tsc --noEmit src/content/prep3-term1/unit-1/station-1/station.ts` -> Expected: 0 errors (once `src/types/curriculum.ts` is present).

- [ ] **Step 4: Commit**
  ```bash
  git add src/content/prep3-term1/unit-1/meta.ts src/content/prep3-term1/unit-1/station-1
  git commit -m "feat(content): author complete Unit 1 Station 1 (5 lessons, 40 quiz items, flashcards, NotebookLM extras)"
  ```

---

### Task 6: Unit 1 Stations 2–5 Content from Export C

**Owner:** `@content`

**Files:**
- Create: `src/content/prep3-term1/unit-1/station-2/` (`station.ts`, `lessons/lesson-2-1.ts`..`2-4.ts`, `quiz-bank.ts`, `flashcards.ts`)
- Create: `src/content/prep3-term1/unit-1/station-3/` (`station.ts`, `lessons/lesson-3-1.ts`..`3-4.ts`, `quiz-bank.ts`, `flashcards.ts`)
- Create: `src/content/prep3-term1/unit-1/station-4/` (`station.ts`, `lessons/lesson-4-1.ts`..`4-3.ts`, `quiz-bank.ts`, `flashcards.ts`)
- Create: `src/content/prep3-term1/unit-1/station-5/` (`station.ts`, `lessons/lesson-5-1.ts`..`5-3.ts`, `quiz-bank.ts`, `flashcards.ts`)

**Interfaces:**
- Consumes: `StationPack`, `LessonPack`, `QuizItem`, `FlashcardItem` from `@/types/curriculum`; decoded data from `scripts/import-mindsmith.mjs`.
- Produces: `STATION_2_PACK`, `STATION_3_PACK`, `STATION_4_PACK`, `STATION_5_PACK` (`status: 'draft'`, `access: 'free'`).

- [ ] **Step 1: Populate Station 2 (`2.1`–`2.4`, 39 quiz items, flashcards)**
  Include `/media/robot-path.png`, flowchart symbols `tableBlock`, 5 algorithm types `accordionBlock`, `orderFlowBuilder` (`mode: 'flowchart'` with `oval`/`parallelogram`/`rectangle`/`diamond`), traditional vs AI `tableBlock`, `matchingPairs`, and `codeLab` exercises; include all 39 official questions mapped to `'2-1'..'2-4'`.

- [ ] **Step 2: Populate Station 3 (`3.1`–`3.4`, 39 quiz items, flashcards)**
  Include `"hello"` positive/negative indexing `tableBlock`, `String` vs `List` `tableBlock`, `listBlock` (`checkbox` review), and 3-stage `codeLab` exercises (incl. `"Sara"` indexing, `grades` list, password strength checker); include all 39 official questions mapped to `'3-1'..'3-4'`.

- [ ] **Step 3: Populate Station 4 (`4.1`–`4.3`, 40 quiz items, flashcards)**
  Cover `def`, parameters vs arguments, `return` vs `print`, local scope, and 3-stage `codeLab` (`circle_area`, `double(x)`); include all 40 official questions mapped to `'4-1'..'4-3'`.

- [ ] **Step 4: Populate Station 5 (`5.1`–`5.3`, 40 quiz items, flashcards)**
  Include `/media/robot-shield.png`, `try`/`except`, `ValueError` vs `ZeroDivisionError`, `while True` + `break` 3-stage `codeLab`; include all 40 official questions mapped to `'5-1'..'5-3'`.

- [ ] **Step 5: Commit**
  ```bash
  git add src/content/prep3-term1/unit-1/station-2 src/content/prep3-term1/unit-1/station-3 src/content/prep3-term1/unit-1/station-4 src/content/prep3-term1/unit-1/station-5
  git commit -m "feat(content): populate Unit 1 Stations 2-5 from Export C with 158 textbook quiz items"
  ```

---

### Task 7: Unit 2 Stations 6–9 (`awaiting_pack`), Catalog Index & Content Integrity Tests

**Owner:** `@content`

**Files:**
- Create: `src/content/prep3-term1/unit-2/meta.ts`
- Create: `src/content/prep3-term1/unit-2/station-6/` .. `station-9/` (`station.ts`, `lessons/lesson-*.ts`, `quiz-bank.ts`, `flashcards.ts`)
- Create: `src/content/index.ts`
- Test: `src/content/__tests__/curriculum.test.ts`

**Interfaces:**
- Consumes: `TermPack`, `UnitPack`, `StationPack`, `LessonPack`, `QuizItem`, `FlashcardItem` from `@/types/curriculum`.
- Produces (`src/content/index.ts`):
  - `TERM_1_PACK: TermPack`
  - `getAllUnits(): UnitPack[]`
  - `getUnitById(unitId: string): UnitPack | undefined`
  - `getAllStations(): StationPack[]`
  - `getStationById(stationId: string): StationPack | undefined`
  - `getAllLessons(): LessonPack[]`
  - `getLessonById(lessonId: string): LessonPack | undefined`
  - `getNextLesson(lessonId: string): LessonPack | undefined`
  - `getStationQuizItems(stationId: string): QuizItem[]`
  - `getExamQuizPool(stationIds?: string[]): QuizItem[]`
  - `getFlashcardsByStation(stationId?: string): FlashcardItem[]`

- [ ] **Step 1: Write failing content integrity & forbidden-copy test (Review Focus #4)**

```ts
// src/content/__tests__/curriculum.test.ts
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  getAllLessons,
  getAllStations,
  getAllUnits,
  getExamQuizPool,
  getFlashcardsByStation,
  getStationById,
} from '../index';

describe('ICT Prep 3 Term 1 curriculum integrity', () => {
  it('contains exactly 2 units, 9 stations, 29 micro-lessons, and 295 official quiz items', () => {
    const units = getAllUnits();
    const stations = getAllStations();
    const lessons = getAllLessons();
    const allQuiz = getExamQuizPool();

    expect(units).toHaveLength(2);
    expect(stations).toHaveLength(9);
    expect(lessons).toHaveLength(29);
    expect(allQuiz).toHaveLength(295);
  });

  it('has Station 1 fully ready with 5 lessons, 40 quiz questions, and NotebookLM additionalSources', () => {
    const s1 = getStationById('station-1')!;
    expect(s1.status).toBe('ready');
    expect(s1.lessons).toHaveLength(5);
    expect(s1.quizBank).toHaveLength(40);
    for (const lesson of s1.lessons) {
      expect(lesson.status).toBe('ready');
      expect(lesson.cards[0]?.blocks[0]?.type).toBe('heroHook');
      expect(lesson.additionalSources.length).toBeGreaterThanOrEqual(4);
      expect(lesson.sources.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('maps every QuizItem microLessonId and FlashcardItem microLessonId to an existing lesson', () => {
    const lessonIds = new Set(getAllLessons().map((l) => l.id));
    for (const q of getExamQuizPool()) {
      expect(lessonIds.has(q.microLessonId)).toBe(true);
      expect(q.options.some((o) => o.isCorrect)).toBe(true);
    }
    for (const f of getFlashcardsByStation()) {
      expect(lessonIds.has(f.microLessonId)).toBe(true);
    }
  });

  it('never uses the forbidden word "طالب" or "الطالب" anywhere in src/content/ (Review Focus #4)', () => {
    const contentDir = path.resolve(process.cwd(), 'src/content');
    const walk = (dir: string): string[] =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
        d.isDirectory() ? walk(path.join(dir, d.name)) : d.name.endsWith('.ts') ? [path.join(dir, d.name)] : []
      );
    for (const file of walk(contentDir)) {
      if (file.includes('__tests__')) continue;
      const text = fs.readFileSync(file, 'utf8');
      expect(text, `Forbidden word found in ${file}`).not.toMatch(/(?:ال)?طالب/);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/content/__tests__/curriculum.test.ts` -> Expected: FAIL (`../index` not found).

- [ ] **Step 3: Author Unit 2 (`station-6..station-9`, `status: 'awaiting_pack'`) and `src/content/index.ts`**
  - Station 6 (`6.1`–`6.3`, linear model $y = wx + b$ + `predict_grade(x)` `codeLab`, 40 quiz items, flashcards)
  - Station 7 (`7.1`–`7.2`, PII/TOS/Three Sources Rule, 10 quiz items, flashcards)
  - Station 8 (`8.1`–`8.2`, Dark Patterns/Loot Boxes/FOMO/Parental Controls, 10 quiz items, flashcards)
  - Station 9 (`9.1`–`9.3`, Deepfake/GANs/forensics, 37 quiz items, flashcards)
  - Export `TERM_1_PACK` and all lookup helpers in `src/content/index.ts`.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/content/__tests__/curriculum.test.ts` -> Expected: PASS (all 4 tests, 295 quiz items verified, 0 `طالب` matches).

- [ ] **Step 5: Commit**
  ```bash
  git add src/content/prep3-term1/unit-2 src/content/index.ts src/content/__tests__/curriculum.test.ts
  git commit -m "feat(content): add Unit 2 Stations 6-9, catalog lookup helpers, and curriculum integrity suite"
  ```

---

## Module 3: Blocks & Lesson Orchestration (`@blocks`)

### Task 8: Core Display & Media Blocks (10 Display Blocks + Offline Transcript Fallback)

**Owner:** `@blocks`

**Files:**
- Create under `src/components/blocks/`:
  - `HeroHookBlock.tsx`, `RichTextBlock.tsx`, `ListBlock.tsx`, `ImageBlock.tsx`, `MediaPlayerBlock.tsx`, `CodeViewBlock.tsx`, `ProcessStepperBlock.tsx`, `TableBlock.tsx`, `AccordionBlock.tsx`, `CalloutWarningBlock.tsx`
- Test: `src/components/blocks/__tests__/displayBlocks.test.tsx`

**Interfaces:**
- Consumes: `HeroHookData`, `RichTextData`, `ListBlockData`, `ImageBlockData`, `MediaPlayerData`, `CodeViewData`, `ProcessStepperData`, `TableBlockData`, `AccordionBlockData`, `CalloutWarningData` from `@/types/curriculum`, `resolveMediaUrl` from `@/lib/storage/media`.
- Produces: Named & default exported React components accepting `{ blockId?: string; data: <X>Data; onInteract?: () => void }`.

- [ ] **Step 1: Write failing tests for RTL rendering, checkbox `ListBlock`, `AccordionBlock`, and `MediaPlayerBlock` offline transcript fallback (Review Focus #5)**

```tsx
// src/components/blocks/__tests__/displayBlocks.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AccordionBlock } from '../AccordionBlock';
import { ListBlock } from '../ListBlock';
import { MediaPlayerBlock } from '../MediaPlayerBlock';

describe('Display blocks and offline media transcript fallback', () => {
  it('toggles checkbox items in ListBlock and expands items in AccordionBlock', () => {
    render(
      <ListBlock
        data={{ mode: 'checkbox', items: [{ id: 'i1', text: 'راجع التفكيك' }] }}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    render(
      <AccordionBlock
        data={{
          openMode: 'single',
          items: [{ id: 'a1', title: 'التسلسلية', body: 'تنفذ بالترتيب' }],
        }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /التسلسلية/ }));
    expect(screen.getByText('تنفذ بالترتيب')).toBeInTheDocument();
  });

  it('switches audio playback speed (1x/1.25x/1.5x) and falls back to Arabic transcript on media error (Review Focus #5)', () => {
    const { container } = render(
      <MediaPlayerBlock
        data={{
          kind: 'video',
          src: 'video-1-1.mp4',
          vttSrc: 'caption-1-1.vtt',
          transcript: 'المشكلة ببساطة هي هدف وعائق واقف في السكة.',
          durationSec: 44,
        }}
      />
    );
    const video = container.querySelector('video')!;
    expect(video).toBeTruthy();
    fireEvent.error(video);
    expect(screen.getByText(/المشكلة ببساطة هي هدف وعائق واقف في السكة/)).toBeInTheDocument();
    expect(screen.body?.textContent ?? container.textContent).not.toContain('طالب');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/components/blocks/__tests__/displayBlocks.test.tsx` -> Expected: FAIL with module not found.

- [ ] **Step 3: Implement all 10 display block components under `src/components/blocks/`**
  Apply Orchid RTL styling (`#FFFFFF` cards, `#163A3A` headings, `#3B5A58` body, `#009179` primary, `#E14B63` coral warnings, `#0F2929` dark code cards with `dir="ltr"`, `>= 48px` interactive targets). In `MediaPlayerBlock`, support `.mp4` + `<track kind="captions">` `.vtt`, `.mp3` with `1x` / `1.25x` / `1.5x` speed buttons, and an expandable + auto-opened offline `transcript` banner whenever `navigator.onLine === false` or `onError` triggers.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/components/blocks/__tests__/displayBlocks.test.tsx` -> Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/blocks
  git commit -m "feat(blocks): implement 10 Orchid RTL display and offline media fallback blocks"
  ```

---

### Task 9: Interactive Activity, Flowchart & Skulpt CodeLab Blocks (5 Interactive Blocks)

**Owner:** `@blocks`

**Files:**
- Create under `src/components/blocks/`:
  - `QuizQuestionBlock.tsx`, `SortingBucketsBlock.tsx`, `MatchingPairsBlock.tsx`, `OrderFlowBuilderBlock.tsx`, `CodeLabBlock.tsx`
- Test: `src/components/blocks/__tests__/interactiveBlocks.test.tsx`

**Interfaces:**
- Consumes: `QuizQuestionData`, `SortingBucketsData`, `MatchingPairsData`, `OrderFlowBuilderData`, `CodeLabData` from `@/types/curriculum`; `runPythonInWorker`, `verifyCodeLabChecks`, `mapPythonErrorToArabicHint` from `@/lib/python/skulptRunner`.
- Produces: Named & default exported React components accepting:
  `{ blockId: string; data: <X>Data; onComplete?: (isCorrect: boolean) => void; onAttempt?: (payload: { isCorrect: boolean; attemptNumber: number; errorKind?: string }) => void }`

- [ ] **Step 1: Write failing tests for quiz retry without punishment, sorting/matching/flowchart completion, and `CodeLabBlock` inline `input()` + `checks[]` feedback**

```tsx
// src/components/blocks/__tests__/interactiveBlocks.test.tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as runner from '@/lib/python/skulptRunner';
import { CodeLabBlock } from '../CodeLabBlock';
import { QuizQuestionBlock } from '../QuizQuestionBlock';

describe('Interactive blocks and CodeLabBlock', () => {
  it('shows immediate explanation and allows retry without locking in QuizQuestionBlock', () => {
    const onAttempt = vi.fn();
    render(
      <QuizQuestionBlock
        blockId="q1"
        onAttempt={onAttempt}
        data={{
          question: 'المشكلة هي:',
          multiple: false,
          scored: false,
          options: [
            { id: 'o1', text: 'شاشة فاضية', isCorrect: false, feedback: 'افتكر: لازم هدف وعائق.' },
            { id: 'o2', text: 'هدف وعائق', isCorrect: true, feedback: 'بالظبط يا مبرمج!' },
          ],
        }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'شاشة فاضية' }));
    expect(screen.getByText('افتكر: لازم هدف وعائق.')).toBeInTheDocument();
    expect(onAttempt).toHaveBeenCalledWith(expect.objectContaining({ isCorrect: false, attemptNumber: 1 }));

    fireEvent.click(screen.getByRole('button', { name: 'هدف وعائق' }));
    expect(screen.getByText('بالظبط يا مبرمج!')).toBeInTheDocument();
    expect(onAttempt).toHaveBeenCalledWith(expect.objectContaining({ isCorrect: true, attemptNumber: 2 }));
  });

  it('runs CodeLabBlock check suite and renders Arabic error hint on failure', async () => {
    vi.spyOn(runner, 'verifyCodeLabChecks').mockResolvedValueOnce({
      allPassed: true,
      results: [{ id: 'c1', label: 'اختبار 1', passed: true, stdout: '15' }],
    });
    const onComplete = vi.fn();
    render(
      <CodeLabBlock
        blockId="cl1"
        onComplete={onComplete}
        data={{
          mode: 'fillLine',
          prompt: 'اطبع مجموع 5 + 10',
          starterCode: 'print(5 + 10)',
          solutionCode: 'print(5 + 10)',
          checks: [{ id: 'c1', label: 'اختبار 1', stdin: [], expectedOutputRegex: '15' }],
          hint: 'استخدم علامة +',
        }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /تحقق من الحل/ }));
    await waitFor(() => expect(onComplete).toHaveBeenCalledWith(true));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/components/blocks/__tests__/interactiveBlocks.test.tsx` -> Expected: FAIL with module not found.

- [ ] **Step 3: Implement all 5 interactive blocks under `src/components/blocks/`**
  - `QuizQuestionBlock`: single-select/true-false & `multiple: true` checkbox mode, non-punitive unlimited retry, per-option feedback.
  - `SortingBucketsBlock`: tap-item-then-tap-bucket (mobile-first `>= 48px` targets) + optional drag-and-drop, instant hint on mismatch.
  - `MatchingPairsBlock`: two-column RTL tap-to-match pairs with color-coded pairing chips and undo.
  - `OrderFlowBuilderBlock`: `steps` mode & `flowchart` mode rendering SVG/CSS standard shapes (`oval` Terminal, `parallelogram` I/O, `rectangle` Process, `diamond` Decision) with accessible up/down reorder buttons (`>= 48px`).
  - `CodeLabBlock`: LTR monospace editor (`#0F2929`), `fillLine` vs `freeRun`, "شغّل الكود" button wired to `runPythonInWorker` with an inline Console Terminal input bar inside the output pane when `onInputPrompt` fires (never `window.prompt()`), "تحقق من الحل" button wired to `verifyCodeLabChecks`, and friendly Arabic hints via `mapPythonErrorToArabicHint`.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/components/blocks/__tests__/interactiveBlocks.test.tsx` -> Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/blocks
  git commit -m "feat(blocks): implement interactive quiz, sorting, matching, flowchart, and Skulpt CodeLab blocks"
  ```

---

### Task 10: Lesson Block Renderer, NotebookLM Sheet & Sources Drawer

**Owner:** `@blocks`

**Files:**
- Create: `src/components/lesson/BlockRenderer.tsx`
- Create: `src/components/lesson/AdditionalSourcesSheet.tsx`
- Create: `src/components/lesson/SourcesDrawer.tsx`
- Test: `src/components/lesson/__tests__/lessonComponents.test.tsx`

**Interfaces:**
- Consumes: All 15 block components from `@/components/blocks/*`, `LessonBlock`, `AdditionalSource`, `SourceReference` from `@/types/curriculum`.
- Produces:
  - `BlockRenderer({ block, onComplete, onAttempt }: { block: LessonBlock; onComplete?: (blockId: string, isCorrect: boolean) => void; onAttempt?: (blockId: string, blockType: LessonBlock['type'], payload: { isCorrect: boolean; attemptNumber: number; errorKind?: string }) => void })`
  - `AdditionalSourcesSheet({ sources, activeSourceId, onSelectSource, onClose }: ...)` (renders `summary`, `faq` accordion, collapsible `mindmap` tree, `glossary` cards, and `audio` player with `1x/1.25x/1.5x` + written transcript/notes in an in-lesson modal/bottom-sheet)
  - `SourcesDrawer({ open, onClose, sources }: { open: boolean; onClose: () => void; sources: SourceReference[] })`

- [ ] **Step 1: Write failing tests for exhaustive 15-block dispatch and dynamic NotebookLM source rendering**

```tsx
// src/components/lesson/__tests__/lessonComponents.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdditionalSourcesSheet } from '../AdditionalSourcesSheet';
import { BlockRenderer } from '../BlockRenderer';
import { SourcesDrawer } from '../SourcesDrawer';

describe('Lesson orchestration components', () => {
  it('renders calloutWarning and richText blocks through BlockRenderer', () => {
    render(
      <BlockRenderer
        block={{
          id: 'b1',
          type: 'calloutWarning',
          data: { variant: 'warning', title: 'خلّي بالك', body: 'تأكد من تحويل النص لرقم.' },
        }}
      />
    );
    expect(screen.getByText('خلّي بالك')).toBeInTheDocument();
  });

  it('opens NotebookLM additionalSources dynamically inside bottom sheet without navigating away', () => {
    const onSelect = vi.fn();
    render(
      <AdditionalSourcesSheet
        activeSourceId="s-faq"
        onSelectSource={onSelect}
        onClose={() => {}}
        sources={[
          { id: 's-sum', type: 'summary', title: 'ملخص سريع', content: 'الخلاصة هنا' },
          { id: 's-faq', type: 'faq', title: 'أسئلة شائعة', items: [{ id: 'f1', question: 'يعني إيه عائق؟', answer: 'شيء يمنع الهدف' }] },
        ]}
      />
    );
    expect(screen.getByText('يعني إيه عائق؟')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /ملخص سريع/ }));
    expect(onSelect).toHaveBeenCalledWith('s-sum');
  });

  it('renders read-only textbook and NotebookLM attributions in SourcesDrawer', () => {
    render(
      <SourcesDrawer
        open={true}
        onClose={() => {}}
        sources={[{ id: 'r1', kind: 'textbook', label: 'كتاب الوزارة', detail: 'الدرس 1', pages: '5–17' }]}
      />
    );
    expect(screen.getByText(/كتاب الوزارة/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/components/lesson/__tests__/lessonComponents.test.tsx` -> Expected: FAIL.

- [ ] **Step 3: Implement `BlockRenderer.tsx`, `AdditionalSourcesSheet.tsx`, and `SourcesDrawer.tsx`**
  Ensure exhaustive `switch (block.type)` handling all 15 block types in `BlockRenderer.tsx`, dynamic button rendering for whatever `AdditionalSource[]` items exist per lesson (none mandatory), and accessible RTL close buttons (`>= 48px`) in both drawers/sheets.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/components/lesson/__tests__/lessonComponents.test.tsx` -> Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/lesson
  git commit -m "feat(blocks): add BlockRenderer, NotebookLM AdditionalSourcesSheet, and SourcesDrawer"
  ```

---

## Module 4: Screens, Layout & Offline PWA (`@screens`)

### Task 11: Orchid RTL Theme, Fonts, AppShell, PWA Manifest & Range-Capable Service Worker

**Owner:** `@screens`

**Files:**
- Create: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/manifest.ts`
- Create: `public/sw.js`
- Create: `src/components/layout/AppShell.tsx`
- Create: `src/components/layout/rangeSlice.ts` *(helper or pure test for Range parsing parity with `public/sw.js`)*
- Test: `src/components/layout/__tests__/swAndShell.test.tsx`

**Interfaces:**
- Consumes: Orchid tokens (`#F6FAF9`, `#FFFFFF`, `#163A3A`, `#3B5A58`, `#009179`, `#E14B63`, `#0F2929`), `/vendor/skulpt/*` from `@foundation`.
- Produces:
  - `<html lang="ar" dir="rtl">` root layout loading `IBM_Plex_Sans_Arabic` + `JetBrains_Mono`, registering `/sw.js` in client bootstrap.
  - `public/sw.js`: precaches `/`, `/review`, `/exam`, `/progress`, `/vendor/skulpt/skulpt.min.js`, `/vendor/skulpt/skulpt-stdlib.js`; caches media (`.mp4`, `.mp3`, `.vtt`, `.png`) on demand; implements HTTP `Range` (`bytes=start-end`) slicing returning `206 Partial Content` (`Content-Range`, `Accept-Ranges: bytes`, `Content-Length`) for Safari iOS offline media playback, falling back safely to network/error without crashing.
  - `AppShell({ title, backHref, backLabel, children })`: mobile-first bottom nav (`الرئيسية`, `المراجعة`, `الامتحان`, `تقدمي`) + desktop header, all `>= 48px` touch targets.

- [ ] **Step 1: Write failing test for HTTP `Range` 206 byte slicing (Review Focus #5) and RTL `AppShell` navigation**

```tsx
// src/components/layout/__tests__/swAndShell.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppShell } from '../AppShell';
import { parseByteRange } from '../rangeSlice';

describe('Safari iOS Range media slicing and RTL AppShell', () => {
  it('computes valid inclusive byte slices for Range headers (Review Focus #5)', () => {
    expect(parseByteRange('bytes=0-99', 1000)).toEqual({ start: 0, end: 99 });
    expect(parseByteRange('bytes=500-', 1000)).toEqual({ start: 500, end: 999 });
    expect(parseByteRange('bytes=1200-1500', 1000)).toBeNull();
  });

  it('renders RTL navigation links and never uses "طالب"', () => {
    const { container } = render(
      <AppShell title="منصتي">
        <div>محتوى</div>
      </AppShell>
    );
    expect(screen.getByRole('link', { name: /الرئيسية/ })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /المراجعة/ })).toHaveAttribute('href', '/review');
    expect(screen.getByRole('link', { name: /الامتحان/ })).toHaveAttribute('href', '/exam');
    expect(screen.getByRole('link', { name: /تقدمي/ })).toHaveAttribute('href', '/progress');
    expect(container.textContent).not.toContain('طالب');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/components/layout/__tests__/swAndShell.test.tsx` -> Expected: FAIL.

- [ ] **Step 3: Implement `globals.css`, `layout.tsx`, `manifest.ts`, `public/sw.js`, `rangeSlice.ts`, and `AppShell.tsx`**
  Ensure `public/sw.js` uses matching `bytes=` range calculation to return `new Response(blob.slice(start, end + 1), { status: 206, headers: { 'Content-Range': 'bytes ...', 'Accept-Ranges': 'bytes', 'Content-Length': ... } })` for cached media, and network-first with graceful cache fallback for app routes.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/components/layout/__tests__/swAndShell.test.tsx` -> Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/app/globals.css src/app/layout.tsx src/app/manifest.ts public/sw.js src/components/layout
  git commit -m "feat(screens): add Orchid RTL layout, local fonts, PWA manifest, and Range-capable Service Worker"
  ```

---

### Task 12: Core Learner Journey Screens (Home `/`, Station `/station/[stationId]`, Lesson Player `/lesson/[lessonId]`)

**Owner:** `@screens`

**Files:**
- Create: `src/app/page.tsx`, `src/app/_components/HomeClient.tsx`
- Create: `src/app/station/[stationId]/page.tsx`, `src/app/_components/StationClient.tsx`
- Create: `src/app/lesson/[lessonId]/page.tsx`, `src/app/_components/LessonPlayerClient.tsx`
- Test: `src/app/__tests__/coreScreens.test.tsx`

**Interfaces:**
- Consumes: `getAllUnits`, `getStationById`, `getLessonById`, `getNextLesson` (server-side only in `page.tsx`), `getLearnerStats`, `recordLearningEvent`, `syncCachedLesson` from `@/lib/storage/progress`, `BlockRenderer`, `AdditionalSourcesSheet`, `SourcesDrawer` from `@/components/lesson/*`.
- Produces:
  - `HomeClient({ units }: { units: UnitPack[] })`
  - `StationClient({ station }: { station: StationPack })`
  - `LessonPlayerClient({ lesson, stationTitle }: { lesson: LessonPack; stationTitle: string })`
  - Server `page.tsx` routes passing serialized `UnitPack[]`/`StationPack`/`LessonPack` props into `'use client'` views (never importing `src/content/**` inside `'use client'`).

- [ ] **Step 1: Write failing tests for Home greeting/resume CTA, Station sequential lock + early challenge, and Lesson Player horizontal gating + completion XP**

```tsx
// src/app/__tests__/coreScreens.test.tsx
import 'fake-indexeddb/auto';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '@/lib/storage/db';
import type { LessonPack, StationPack, UnitPack } from '@/types/curriculum';
import { HomeClient } from '../_components/HomeClient';
import { LessonPlayerClient } from '../_components/LessonPlayerClient';
import { StationClient } from '../_components/StationClient';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
}));

const SAMPLE_LESSON: LessonPack = {
  id: '1-1',
  stationId: 'station-1',
  unitId: 'unit-1',
  order: 1,
  title: 'يعني إيه مشكلة؟',
  durationMin: 8,
  contentVersion: 1,
  access: 'free',
  status: 'ready',
  objectives: ['تعريف المشكلة'],
  summary: 'المشكلة = هدف + عائق.',
  additionalSources: [{ id: 'sum-1', type: 'summary', title: 'ملخص سريع', content: 'خلاصة الدرس' }],
  sources: [{ id: 'src-1', kind: 'textbook', label: 'كتاب الوزارة', detail: 'ص 5–7' }],
  nextStep: { kind: 'lesson', targetId: '1-2', label: 'الدرس الجاي: خطوات حل المشكلة' },
  cards: [
    {
      id: 'c1',
      title: 'تحقق سريع',
      requireInteraction: true,
      blocks: [
        {
          id: 'q1',
          type: 'quizQuestion',
          data: {
            question: 'المشكلة هي:',
            multiple: false,
            scored: false,
            options: [
              { id: 'o1', text: 'هدف وعائق', isCorrect: true, feedback: 'صح!' },
              { id: 'o2', text: 'لا شيء', isCorrect: false, feedback: 'حاول تاني' },
            ],
          },
        },
      ],
    },
    {
      id: 'c2',
      title: 'الختام',
      blocks: [{ id: 'r1', type: 'richText', data: { body: 'المشكلة = هدف + عائق.' } }],
    },
  ],
};

const SAMPLE_STATION: StationPack = {
  id: 'station-1',
  unitId: 'unit-1',
  number: 1,
  title: 'التفكير الحاسوبي وحل المشكلات',
  description: 'الأساس البرمجي',
  textbookPages: '5–17',
  access: 'free',
  status: 'ready',
  objectives: ['التفكير الحاسوبي'],
  lessons: [
    SAMPLE_LESSON,
    { ...SAMPLE_LESSON, id: '1-2', order: 2, title: 'خطوات حل المشكلة' },
  ],
  quizBank: [],
  flashcards: [],
  mediaAssets: ['/media/video-1-1.mp4'],
};

const SAMPLE_UNITS: UnitPack[] = [
  { id: 'unit-1', number: 1, title: 'الذكاء الاصطناعي ولغات البرمجة', description: '', textbookPages: '4–63', stations: [SAMPLE_STATION] },
];

describe('Core learner journey client views', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  it('greets the learner, displays first-lesson CTA and learning path without "طالب"', async () => {
    const { container } = render(<HomeClient units={SAMPLE_UNITS} />);
    await waitFor(() => expect(screen.getByRole('link', { name: /ابدأ الدرس الأول/ })).toHaveAttribute('href', '/lesson/1-1'));
    expect(screen.getByText(/أنجز درسًا واحدًا اليوم/)).toBeInTheDocument();
    expect(screen.getByText(/التفكير الحاسوبي وحل المشكلات/)).toBeInTheDocument();
    expect(container.textContent).not.toContain('طالب');
  });

  it('locks lesson 2 until lesson 1 is completed and reveals early challenge option on StationClient', async () => {
    render(<StationClient station={SAMPLE_STATION} />);
    await waitFor(() => expect(screen.getByText(/يُفتح بعد الدرس السابق/)).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /تنزيل وسائط المحطة للمذاكرة بدون نت/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /تحدَّ المحطة للفتح المبكر/ })).toBeInTheDocument();
  });

  it('gates required interactive cards in LessonPlayerClient until attempted and awards +50 XP at completion', async () => {
    render(<LessonPlayerClient lesson={SAMPLE_LESSON} stationTitle={SAMPLE_STATION.title} />);
    const nextBtn = await screen.findByRole('button', { name: /التالي/ });
    expect(nextBtn).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'هدف وعائق' }));
    expect(nextBtn).toBeEnabled();

    fireEvent.click(nextBtn);
    fireEvent.click(await screen.findByRole('button', { name: /إنهاء الدرس/ }));
    await waitFor(() => expect(screen.getByText(/\+50 XP/)).toBeInTheDocument());
    expect(screen.getByRole('link', { name: /الدرس الجاي/ })).toHaveAttribute('href', '/lesson/1-2');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/app/__tests__/coreScreens.test.tsx` -> Expected: FAIL.

- [ ] **Step 3: Implement `/`, `/station/[stationId]`, and `/lesson/[lessonId]`**
  - Home (`/`): warm greeting, Streak/XP bar, daily goal (`أنجز درسًا واحدًا اليوم`), big `ابدأ الدرس الأول` / `كمّل من مكان ما وقفت`, 2 Units / 9 Stations path with progress & status pills (`لم يبدأ`, `جاري`, `مكتمل`, `مسودة هيكلية`), quick links to `/review` & `/exam`, iOS/offline backup encouragement banner.
  - Station (`/station/[stationId]`): station header & progress, ordered micro-lessons (`7–10 د` with sequential lock & unlock hint `يُفتح بعد الدرس السابق`), **"تنزيل وسائط المحطة للمذاكرة بدون نت"** Cache Storage pre-fetch button, and **"اختبار نهاية المحطة"** + explicit **"تحدَّ المحطة للفتح المبكر"** option (`station_unlocked` event).
  - Lesson Player (`/lesson/[lessonId]`): fixed RTL top bar (back to station, horizontal indicator `البطاقة X من Y`, progress bar, `المصادر` button opening `SourcesDrawer`), card-by-card rendering via `BlockRenderer`, `>= 48px` bottom `السابق` / `التالي` buttons gating required activities until attempted, final card `إنهاء الدرس` + `AdditionalSourcesSheet` trigger, `syncCachedLesson(lesson)` + `recordLearningEvent` persistence, and calm `+50 XP` completion celebration with `nextStep` CTA.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/app/__tests__/coreScreens.test.tsx` -> Expected: PASS (3 tests).

- [ ] **Step 5: Commit**
  ```bash
  git add src/app/page.tsx src/app/station src/app/lesson src/app/_components src/app/__tests__/coreScreens.test.tsx
  git commit -m "feat(screens): implement Home, Station, and horizontal Lesson Player screens"
  ```

---

### Task 13: Assessment, Flashcards, Exam Mode & Progress/Backup Screens

**Owner:** `@screens`

**Files:**
- Create: `src/app/station/[stationId]/quiz/page.tsx`, `src/app/_components/StationQuizClient.tsx`
- Create: `src/app/review/page.tsx`, `src/app/_components/ReviewClient.tsx`
- Create: `src/app/exam/page.tsx`, `src/app/_components/ExamClient.tsx`
- Create: `src/app/progress/page.tsx`, `src/app/_components/ProgressClient.tsx`
- Test: `src/app/__tests__/assessmentScreens.test.tsx`

**Interfaces:**
- Consumes: `getStationById`, `getAllStations`, `getStationQuizItems`, `getExamQuizPool`, `getFlashcardsByStation` (server-side only in `page.tsx`); `getLearnerStats`, `recordLearningEvent`, `exportProgressBackup`, `importProgressBackup`, `requestPersistentStorage` from `@/lib/storage/progress`.
- Produces:
  - `StationQuizClient({ stationId, stationTitle, items }: { stationId: string; stationTitle: string; items: QuizItem[] })`
  - `ReviewClient({ flashcards, stations }: { flashcards: FlashcardItem[]; stations: Pick<StationPack, 'id' | 'number' | 'title'>[] })`
  - `ExamClient({ stations, quizPool }: { stations: Pick<StationPack, 'id' | 'number' | 'title' | 'lessons'>[]; quizPool: QuizItem[] })`
  - `ProgressClient({ stations }: { stations: Pick<StationPack, 'id' | 'unitId' | 'number' | 'title' | 'lessons'>[] })`

- [ ] **Step 1: Write failing tests for Station Quiz wrong-lesson deep links, Flashcard review queue, Exam weakest-station report, and Progress backup UI**

```tsx
// src/app/__tests__/assessmentScreens.test.tsx
import 'fake-indexeddb/auto';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '@/lib/storage/db';
import type { FlashcardItem, QuizItem } from '@/types/curriculum';
import { ExamClient } from '../_components/ExamClient';
import { ProgressClient } from '../_components/ProgressClient';
import { ReviewClient } from '../_components/ReviewClient';
import { StationQuizClient } from '../_components/StationQuizClient';

const QUIZ_ITEMS: QuizItem[] = [
  {
    id: 'q-1-3',
    stationId: 'station-1',
    microLessonId: '1-3',
    kind: 'mcq',
    question: 'ما ناتج 7 % 2؟',
    options: [
      { id: 'a', text: '1', isCorrect: true, feedback: 'صحيح' },
      { id: 'b', text: '0', isCorrect: false, feedback: 'باقي القسمة 1' },
    ],
    explanation: 'العدد 7 فردي وباقي قسمته على 2 هو 1.',
    sourceTag: 'كتاب الوزارة ص 8',
  },
];

const FLASHCARDS: FlashcardItem[] = [
  { id: 'fc-1', stationId: 'station-1', microLessonId: '1-1', termEn: 'Algorithm', termAr: 'الخوارزمية', definition: 'خطوات مرتبة للحل' },
  { id: 'fc-2', stationId: 'station-1', microLessonId: '1-1', termEn: 'Abstraction', termAr: 'التجريد', definition: 'التركيز على المهم' },
];

describe('Assessment, Flashcards, Exam, and Progress views', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  it('renders wrong-answer explanation and "راجع الدرس اللي فيه النقطة دي" link to /lesson/[microLessonId]', async () => {
    render(<StationQuizClient stationId="station-1" stationTitle="المحطة 1" items={QUIZ_ITEMS} />);
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: /تسليم الاختبار/ }));

    await waitFor(() => expect(screen.getByText(/العدد 7 فردي/)).toBeInTheDocument());
    expect(screen.getByRole('link', { name: /راجع الدرس اللي فيه النقطة دي/ })).toHaveAttribute('href', '/lesson/1-3');
  });

  it('orders "راجعها تاني ↻" flashcards ahead in priority queue and renders Exam/Progress controls', async () => {
    render(<ReviewClient flashcards={FLASHCARDS} stations={[{ id: 'station-1', number: 1, title: 'المحطة 1' }]} />);
    fireEvent.click(screen.getByRole('button', { name: /اقلب البطاقة|Algorithm/ }));
    fireEvent.click(screen.getByRole('button', { name: /راجعها تاني/ }));
    fireEvent.click(screen.getByRole('button', { name: /اقلب البطاقة|Abstraction/ }));
    fireEvent.click(screen.getByRole('button', { name: /عارفها/ }));

    await waitFor(() => expect(screen.getByRole('button', { name: /بدء جولة مراجعة جديدة/ })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /بدء جولة مراجعة جديدة/ }));
    expect(screen.getByText('Algorithm')).toBeInTheDocument();

    render(<ProgressClient stations={[{ id: 'station-1', unitId: 'unit-1', number: 1, title: 'المحطة 1', lessons: [] }]} />);
    await waitFor(() => expect(screen.getByRole('button', { name: /نسخ كود التقدم/ })).toBeInTheDocument());

    render(
      <ExamClient
        stations={[
          { id: 'station-1', number: 1, title: 'التفكير الحاسوبي', lessons: [] },
          { id: 'station-2', number: 2, title: 'خوارزميات الذكاء الاصطناعي', lessons: [] },
        ]}
        quizPool={[
          QUIZ_ITEMS[0],
          { ...QUIZ_ITEMS[0], id: 'q-2-1', stationId: 'station-2', microLessonId: '2-1', question: 'ما رمز البداية؟' },
        ]}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /ابدأ الامتحان/ }));
    expect(screen.getByRole('button', { name: /إخفاء المؤقت|إظهار المؤقت/ })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/app/__tests__/assessmentScreens.test.tsx` -> Expected: FAIL.

- [ ] **Step 3: Implement `/station/[stationId]/quiz`, `/review`, `/exam`, and `/progress`**
  - Station Quiz: toggle between quick 10–15 question round and full station bank (e.g., 40 questions in Station 1), submit grading, 1-line explanation per missed question + direct **"راجع الدرس اللي فيه النقطة دي"** link to `/lesson/${q.microLessonId}`, emits `quiz_submitted`.
  - Flashcards (`/review`): station filter, tap-to-flip card (`termAr`/`termEn` -> `definition`/`example`/`code`), **"عارفها ✓"** and **"راجعها تاني ↻"** buttons prioritizing `review_again` cards first on next round, emits `flashcard_reviewed`.
  - Exam Mode (`/exam`): choose completed stations (or any available stations), mixed questions from the 295-question bank, calm toggleable countdown timer, end report showing overall score, **أقوى محطة**, **أضعف محطة**, and clickable **الدروس المقترح مراجعتها**.
  - Progress & Backup (`/progress`): completed lessons (`X / 29`), Streak, XP, all 6 Badges, per-station progress bars, friction weak spots (`weakSpots`), PWA home-screen install guide (Safari iOS + Android), `requestPersistentStorage()` trigger, and **تصدير / استعادة كود التقدم** (`نسخ كود التقدم` via `exportProgressBackup` & paste-and-restore via `importProgressBackup` with validation feedback).

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/app/__tests__/assessmentScreens.test.tsx` -> Expected: PASS (2 tests).

- [ ] **Step 5: Commit**
  ```bash
  git add src/app/station/[stationId]/quiz src/app/review src/app/exam src/app/progress src/app/_components src/app/__tests__/assessmentScreens.test.tsx
  git commit -m "feat(screens): implement Station Quiz, Flashcards, Exam Mode, and Progress/Backup screens"
  ```

---

## Module 5: Verification (`@verifier`)

### Task 14: End-to-End Automated Test Suite, Typecheck, Production Build, Copy & Curriculum Audit

**Owner:** `@verifier` *(Read-only verification; reports any failure directly to the owning module `@foundation`, `@content`, `@blocks`, or `@screens` until zero errors remain.)*

**Files:**
- Verify (read-only): Entire `src/`, `public/`, `scripts/`, `package.json`

- [ ] **Step 1: Run complete Vitest unit & integration test suite**
  Run: `npx vitest run`
  Expected: All test files (`media.test.ts`, `progress.test.ts`, `skulptRunner.test.ts`, `import-mindsmith.test.ts`, `curriculum.test.ts`, `displayBlocks.test.tsx`, `interactiveBlocks.test.tsx`, `lessonComponents.test.tsx`, `swAndShell.test.tsx`, `coreScreens.test.tsx`, `assessmentScreens.test.tsx`) PASS with 0 failures and 0 skipped assertions.

- [ ] **Step 2: Run TypeScript strict compiler check**
  Run: `npx tsc --noEmit`
  Expected: Exit code 0 with 0 errors.

- [ ] **Step 3: Run Next.js production build & client-bundle isolation check**
  Run: `npm run build`
  Expected: Clean production build exit code 0 across all routes (`/`, `/station/[stationId]`, `/lesson/[lessonId]`, `/station/[stationId]/quiz`, `/review`, `/exam`, `/progress`, `/manifest.webmanifest`), and confirm `'use client'` modules never import `src/content/**` directly.

- [ ] **Step 4: Run forbidden terminology (`طالب` / `الطالب`) & VB.NET scan across `src/` and `public/`**
  Run (PowerShell):
  ```powershell
  rg -n "(?:ال)?طالب|Visual Basic|VB\.NET" src/ public/
  ```
  Expected: 0 matches in learner-facing copy (0 matches for `طالب`/`الطالب` anywhere in `src/` and `public/sw.js`/`public/workers/`).

- [ ] **Step 5: Verify Skulpt bundle size, media assets & curriculum counts (2 units / 9 stations / 29 lessons / 295 quiz items / 15 blocks / 8 screens)**
  Run:
  ```powershell
  (Get-Item public/vendor/skulpt/skulpt.min.js, public/vendor/skulpt/skulpt-stdlib.js | Measure-Object -Property Length -Sum).Sum
  ```
  Expected: Combined Skulpt size `<= 512000` bytes (`~450 KB`); all 5 media files exist in `public/media/`; all 15 block components render in `BlockRenderer.tsx`; all 8 screens/drawers are wired.

- [ ] **Step 6: Production server smoke check**
  Start `npm run start` briefly in background, request `/`, `/station/station-1`, `/lesson/1-1`, `/station/station-1/quiz`, `/review`, `/exam`, `/progress`, `/manifest.webmanifest`, `/sw.js`, `/vendor/skulpt/skulpt.min.js`, and `/media/video-1-1.mp4` expecting HTTP `200`, plus `curl -H "Range: bytes=0-99" http://127.0.0.1:3000/media/video-1-1.mp4` expecting HTTP `206`, then stop server cleanly.
