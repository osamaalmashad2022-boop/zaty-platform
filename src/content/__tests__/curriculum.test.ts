import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { describe, expect, it } from 'vitest';
import { evaluateStdoutCheck } from '@/lib/python/skulptRunner';
import {
  CATALOG_GRADES,
  CATALOG_TERMS_META,
  COURSE_CATALOG,
  PLATFORM_BRAND,
  getAllLessons,
  getAllStations,
  getAllUnits,
  getCourseManifest,
  getCoursesByFilter,
  getExamQuizPool,
  getFlashcardsByStation,
  getLessonById,
  getNextLesson,
  getStationById,
  getStationQuizItems,
  TERM_1_PACK,
} from '../index';
import {
  convertExportToDraft,
  decodeLessonDataFile,
} from '../../../scripts/import-mindsmith.mjs';

async function runCodeInLocalSkulpt(code: string, stdinQueue: string[] = []): Promise<string> {
  const g = globalThis as unknown as {
    Sk?: {
      configure: (opts: Record<string, unknown>) => void;
      builtinFiles?: { files: Record<string, string> };
      python3: unknown;
      execStart?: Date;
      misceval: { asyncToPromise: (fn: () => unknown) => Promise<unknown> };
      importMainWithBody: (name: string, dump: boolean, body: string, canSuspend: boolean) => unknown;
    };
  };
  if (!g.Sk) {
    const skulptCode = fs.readFileSync(path.resolve(process.cwd(), 'public/vendor/skulpt/skulpt.min.js'), 'utf8');
    const stdlibCode = fs.readFileSync(path.resolve(process.cwd(), 'public/vendor/skulpt/skulpt-stdlib.js'), 'utf8');
    vm.runInThisContext(skulptCode);
    vm.runInThisContext(stdlibCode);
  }
  const Sk = g.Sk!;
  let stdout = '';
  let idx = 0;
  Sk.configure({
    output: (text: string) => {
      stdout += text;
    },
    read: (filename: string) => {
      if (!Sk.builtinFiles || !Sk.builtinFiles.files[filename]) {
        throw new Error(`File not found: ${filename}`);
      }
      return Sk.builtinFiles.files[filename];
    },
    __future__: Sk.python3,
    execLimit: 3000,
    inputfunTakesPrompt: true,
    inputfun: () => Promise.resolve(idx < stdinQueue.length ? String(stdinQueue[idx++]) : ''),
  });
  Sk.execStart = new Date();
  await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true));
  return stdout;
}

describe('ICT Prep 3 Term 1 curriculum integrity & importer', () => {
  it('decodes Export A, B, and C via scripts/import-mindsmith.mjs cleanly', () => {
    const exportADir = path.resolve(process.cwd(), '_______________');
    const exportBDir = path.resolve(process.cwd(), '_____________________________');
    const exportCDir = path.resolve(
      process.cwd(),
      '_____________________________________________________________________',
    );

    const rawA = decodeLessonDataFile(path.join(exportADir, 'lesson-data.js'));
    expect(rawA).toHaveProperty('blocks');
    expect(rawA).toHaveProperty('blockOrder');

    const draftA = convertExportToDraft(exportADir);
    expect(draftA.pages).toHaveLength(11);

    const draftB = convertExportToDraft(exportBDir);
    expect(draftB.pages).toHaveLength(21);
    expect((draftB.blocksCount as Record<string, number>).questionTile).toBe(40);

    const draftC = convertExportToDraft(exportCDir);
    expect(draftC.pages).toHaveLength(13);
    expect((draftC.blocksCount as Record<string, number>).codeTile).toBe(15);
    expect((draftC.blocksCount as Record<string, number>).tableTile).toBe(5);
    expect((draftC.blocksCount as Record<string, number>).accordionTile).toBe(1);
  });

  it('contains exactly 2 units, 9 stations, 29 micro-lessons, and 295 official quiz items', () => {
    expect(TERM_1_PACK.id).toBe('prep3-term1');
    const units = getAllUnits();
    const stations = getAllStations();
    const lessons = getAllLessons();
    const allQuiz = getExamQuizPool();

    expect(units).toHaveLength(2);
    expect(stations).toHaveLength(9);
    expect(lessons).toHaveLength(29);
    expect(allQuiz).toHaveLength(295);

    const expectedCounts: Record<string, number> = {
      'station-1': 40,
      'station-2': 39,
      'station-3': 39,
      'station-4': 40,
      'station-5': 40,
      'station-6': 40,
      'station-7': 10,
      'station-8': 10,
      'station-9': 37,
    };
    for (const [stationId, count] of Object.entries(expectedCounts)) {
      expect(getStationQuizItems(stationId)).toHaveLength(count);
    }
  });

  it('has Station 1 fully ready with 5 lessons, 40 quiz questions, media, and NotebookLM additionalSources', () => {
    const s1 = getStationById('station-1')!;
    expect(s1.status).toBe('ready');
    expect(s1.access).toBe('free');
    expect(s1.lessons).toHaveLength(5);
    expect(s1.quizBank).toHaveLength(40);
    expect(s1.mediaAssets).toContain('/media/video-1-1.mp4');
    expect(s1.mediaAssets).toContain('/media/caption-1-1.vtt');
    expect(s1.mediaAssets).toContain('/media/robot-puzzle.png');

    for (const lesson of s1.lessons) {
      expect(lesson.status).toBe('ready');
      expect(lesson.access).toBe('free');
      expect(lesson.cards[0]?.blocks[0]?.type).toBe('heroHook');
      expect(lesson.additionalSources.length).toBeGreaterThanOrEqual(5);
      expect(lesson.additionalSources.some((s) => s.type === 'audio')).toBe(true);
      expect(lesson.sources.length).toBeGreaterThanOrEqual(2);
      expect(lesson.objectives.length).toBeGreaterThanOrEqual(2);

      const blocks = lesson.cards.flatMap((c) => c.blocks);
      expect(blocks.some((b) => b.type === 'mediaPlayer' && b.data.kind === 'video')).toBe(true);
      expect(blocks.some((b) => b.type === 'mediaPlayer' && b.data.kind === 'audio')).toBe(true);
      expect(
        blocks.some((b) => b.type === 'imageBlock') ||
          Boolean(lesson.cards[0]?.blocks[0]?.type === 'heroHook' && lesson.cards[0].blocks[0].data.image),
      ).toBe(true);
      expect(
        blocks.some((b) => b.type === 'flipCards' || b.type === 'comparisonTabs'),
      ).toBe(true);
      expect(
        blocks.some(
          (b) => b.type === 'quizQuestion' && b.data.sourceTag?.includes('خارج الكتاب'),
        ),
      ).toBe(true);
    }

    // Verify all declared Station 1 media files actually exist on disk under public/
    for (const asset of s1.mediaAssets ?? []) {
      const diskPath = path.resolve(process.cwd(), 'public', asset.replace(/^\//, ''));
      expect(fs.existsSync(diskPath), `Missing Station 1 media asset on disk: ${diskPath}`).toBe(true);
    }
  });

  it('marks all 9 stations and all 29 micro-lessons (1.1..9.3) as ready with 4 rich NotebookLM additionalSources and 10-part template cards', () => {
    const stations = getAllStations();
    const lessons = getAllLessons();
    expect(stations).toHaveLength(9);
    expect(lessons).toHaveLength(29);

    for (const station of stations) {
      expect(station.status, `Station ${station.id} must be ready`).toBe('ready');
      expect(station.lessons.length).toBeGreaterThanOrEqual(2);
      expect(station.flashcards.length).toBeGreaterThanOrEqual(3);
    }

    for (const lesson of lessons) {
      expect(lesson.status, `Lesson ${lesson.id} must be ready`).toBe('ready');
      expect(lesson.cards[0]?.blocks[0]?.type, `Lesson ${lesson.id} must start with heroHook`).toBe('heroHook');
      expect(lesson.cards.some((c) => c.role === 'summary')).toBe(true);
      expect(lesson.cards.some((c) => c.role === 'warning')).toBe(true);
      expect(lesson.cards.some((c) => c.role === 'quickCheck')).toBe(true);
      expect(lesson.objectives.length).toBeGreaterThanOrEqual(2);
      expect(lesson.sources.length).toBeGreaterThanOrEqual(2);
      expect(lesson.summary.trim().length).toBeGreaterThan(10);

      expect(
        lesson.additionalSources.length,
        `Lesson ${lesson.id} must have at least 4 additionalSources`,
      ).toBeGreaterThanOrEqual(4);
      const sourceTypes = new Set(lesson.additionalSources.map((s) => s.type));
      for (const expectedType of ['summary', 'faq', 'mindmap', 'glossary'] as const) {
        expect(sourceTypes.has(expectedType), `Lesson ${lesson.id} missing additionalSource type ${expectedType}`).toBe(true);
      }

      const serialized = JSON.stringify(lesson);
      expect(serialized, `Placeholder text in lesson ${lesson.id}`).not.toMatch(/مسودة هيكلية|Awaiting Pack/);
    }

    // Verify Unit 2 Stations 6-9 include rich interactive blocks and Station 6 includes predict_grade codeLabs
    for (const stationId of ['station-6', 'station-7', 'station-8', 'station-9']) {
      const station = getStationById(stationId)!;
      const blockTypes = new Set(
        station.lessons.flatMap((l) => l.cards.flatMap((c) => c.blocks.map((b) => b.type))),
      );
      const hasInteractive =
        blockTypes.has('sortingBuckets') ||
        blockTypes.has('matchingPairs') ||
        blockTypes.has('orderFlowBuilder') ||
        blockTypes.has('codeLab');
      expect(hasInteractive, `${stationId} must contain interactive blocks`).toBe(true);
    }

    const s6CodeLabs = getStationById('station-6')!
      .lessons.flatMap((l) => l.cards.flatMap((c) => c.blocks))
      .filter((b) => b.type === 'codeLab');
    expect(s6CodeLabs.length).toBeGreaterThanOrEqual(2);
    expect(s6CodeLabs.some((b) => b.type === 'codeLab' && b.data.solutionCode.includes('predict_grade'))).toBe(true);
  });

  it('maps every QuizItem and FlashcardItem microLessonId and lookup helper accurately', () => {
    const lessonIds = new Set(getAllLessons().map((l) => l.id));
    for (const q of getExamQuizPool()) {
      expect(lessonIds.has(q.microLessonId), `Invalid microLessonId ${q.microLessonId} on ${q.id}`).toBe(true);
      expect(q.options.some((o) => o.isCorrect)).toBe(true);
      expect(q.explanation.trim().length).toBeGreaterThan(3);
    }
    for (const f of getFlashcardsByStation()) {
      expect(lessonIds.has(f.microLessonId), `Invalid flashcard microLessonId ${f.microLessonId}`).toBe(true);
    }
    expect(getLessonById('1.1')?.id).toBe('1.1');
    expect(getLessonById('1-1')?.id).toBe('1.1');
    expect(getNextLesson('1.1')?.id).toBe('1.2');
    expect(getNextLesson('9.3')).toBeUndefined();
  });

  it('never uses the forbidden word "طالب" or "الطالب" anywhere in src/content/', () => {
    const contentDir = path.resolve(process.cwd(), 'src/content');
    const walk = (dir: string): string[] =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
        d.isDirectory()
          ? walk(path.join(dir, d.name))
          : d.name.endsWith('.ts')
            ? [path.join(dir, d.name)]
            : [],
      );
    for (const file of walk(contentDir)) {
      if (file.includes('__tests__')) continue;
      const text = fs.readFileSync(file, 'utf8');
      expect(text, `Forbidden word found in ${file}`).not.toMatch(/طالب/);
    }
  });

  it('executes every codeLab solutionCode and codeView cleanly in local Skulpt and passes all checks', async () => {
    let codeLabCount = 0;
    let codeViewCount = 0;

    for (const lesson of getAllLessons()) {
      for (const card of lesson.cards) {
        for (const block of card.blocks) {
          if (block.type === 'codeLab') {
            codeLabCount += 1;
            expect(block.data.checks.length).toBeGreaterThanOrEqual(1);
            for (const check of block.data.checks) {
              const stdout = await runCodeInLocalSkulpt(block.data.solutionCode, check.stdin);
              const res = evaluateStdoutCheck(stdout, check, true);
              expect(
                res.passed,
                `CodeLab ${lesson.id}/${block.id}/${check.id} failed. stdout=${JSON.stringify(stdout)} reason=${res.reasonAr}`,
              ).toBe(true);
            }
          } else if (block.type === 'codeView' && block.data.runnable) {
            codeViewCount += 1;
            const stdout = await runCodeInLocalSkulpt(block.data.code, ['5', '3', '8', 'Pass@123']);
            expect(typeof stdout).toBe('string');
          }
        }
      }
    }

    expect(codeLabCount).toBeGreaterThanOrEqual(12);
    expect(codeViewCount).toBeGreaterThanOrEqual(10);
  });

  it('exposes the multi-grade/multi-subject Zaty (ذاتي) catalog and filtering helpers', () => {
    expect(PLATFORM_BRAND.nameAr).toBe('ذاتي');
    expect(PLATFORM_BRAND.nameEn).toBe('Zaty');
    expect(PLATFORM_BRAND.repoSlug).toBe('zaty-platform');
    expect(CATALOG_GRADES.map((g) => g.id)).toEqual([
      'prep-1',
      'prep-2',
      'prep-3',
      'sec-1',
    ]);
    expect(CATALOG_TERMS_META.map((t) => t.id)).toEqual(['term-1', 'term-2']);
    expect(COURSE_CATALOG).toHaveLength(8);

    const active = getCourseManifest('prep3-term1');
    expect(active.status).toBe('available');
    expect(active.hasCodeLab).toBe(true);
    expect(getCourseManifest('unknown-course-id').id).toBe('prep3-term1');

    const prep3Courses = getCoursesByFilter('prep-3');
    expect(prep3Courses.length).toBeGreaterThanOrEqual(5);
    expect(getCoursesByFilter('prep-3', 'term-1').length).toBe(4);
    expect(getCoursesByFilter('prep-3', 'term-2').some((c) => c.id === 'prep3-term2-ict')).toBe(
      true,
    );
    expect(getCoursesByFilter('sec-1', 'term-1')[0]?.id).toBe('sec1-term1-ict');
  });
});
