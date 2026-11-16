#!/usr/bin/env node
/**
 * Mindsmith Web Export Importer for ICT Prep 3 Term 1 Platform.
 *
 * Decodes the Base64 `const lessonData = "..."` payload from Mindsmith export
 * directories (`lesson-data.js`), converts TipTap/ProseMirror documents to
 * Markdown/plain text, and maps Mindsmith tiles onto our 15-block LessonCard
 * draft schema (`src/types/curriculum.ts`).
 *
 * Usage:
 *   node scripts/import-mindsmith.mjs
 *   node scripts/import-mindsmith.mjs --export A --out ./tmp/mindsmith
 *   node scripts/import-mindsmith.mjs --export ./some-export-dir --out ./tmp/out
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export const DEFAULT_EXPORTS = [
  { key: 'A', dir: '_______________', label: 'Export A — Lesson 1.1 (يعني إيه مشكلة؟)' },
  { key: 'B', dir: '_____________________________', label: 'Export B — Textbook Lesson 1 (40 questions)' },
  {
    key: 'C',
    dir: '_____________________________________________________________________',
    label: 'Export C — Unit 1 Complete (Stations 1–5)',
  },
];

/**
 * Replaces the forbidden word "طالب" / "الطالب" with "متعلم" / "المتعلم"
 * per platform constraint D1.
 */
export function normalizeLearnerTerminology(text) {
  if (!text) return '';
  return text
    .replace(/عزيزي الطالب/g, 'عزيزي المتعلم')
    .replace(/الطلاب/g, 'المتعلمين')
    .replace(/للطلاب/g, 'للمتعلمين')
    .replace(/الطالب/g, 'المتعلم')
    .replace(/طالبًا/g, 'متعلمًا')
    .replace(/طالب/g, 'متعلم');
}

/**
 * Extracts and decodes the Base64 JSON payload inside `lesson-data.js`.
 */
export function decodeLessonDataFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/const\s+lessonData\s*=\s*"([^"]+)"/);
  if (!match) {
    throw new Error(`Could not find Base64 lessonData string in ${filePath}`);
  }
  const jsonText = Buffer.from(match[1], 'base64').toString('utf8');
  return JSON.parse(jsonText);
}

/**
 * Converts a TipTap / ProseMirror JSON node tree into readable Markdown/text.
 */
export function tiptapToMarkdown(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(tiptapToMarkdown).join('');

  const children = (node.content || []).map(tiptapToMarkdown);
  switch (node.type) {
    case 'doc':
      return children.filter(Boolean).join('\n\n').trim();
    case 'paragraph':
      return children.join('');
    case 'heading': {
      const level = Math.min(Math.max(node.attrs?.level || 2, 1), 4);
      return `${'#'.repeat(level)} ${children.join('')}`;
    }
    case 'bulletList':
      return (node.content || []).map((li) => `- ${tiptapToMarkdown(li)}`).join('\n');
    case 'orderedList':
      return (node.content || [])
        .map((li, idx) => `${idx + 1}. ${tiptapToMarkdown(li)}`)
        .join('\n');
    case 'listItem':
      return children.join(' ').trim();
    case 'codeBlock':
      return `\`\`\`python\n${children.join('')}\n\`\`\``;
    case 'blockquote':
      return children
        .join('\n')
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n');
    case 'hardBreak':
      return '\n';
    case 'text': {
      let txt = node.text || '';
      const marks = node.marks || [];
      if (marks.some((m) => m.type === 'code')) {
        txt = `\`${txt}\``;
      } else if (marks.some((m) => m.type === 'bold')) {
        txt = `**${txt}**`;
      } else if (marks.some((m) => m.type === 'italic')) {
        txt = `*${txt}*`;
      }
      return txt;
    }
    default:
      return children.join('');
  }
}

function stripHeadingPrefix(md) {
  return md.replace(/^#{1,6}\s+/, '').trim();
}

/**
 * Converts a single Mindsmith tile into one of the platform's LessonBlock drafts.
 */
export function mapMindsmithTileToBlock(tileId, tile, normalize) {
  const clean = (txt) => (normalize ? normalizeLearnerTerminology(txt) : txt);
  const d = tile.data || {};

  switch (tile.type) {
    case 'textTile': {
      const md = clean(tiptapToMarkdown(d.text));
      const lines = md.split('\n\n');
      let heading;
      let body = md;
      if (lines.length > 1 && /^#{1,4}\s+/.test(lines[0])) {
        heading = stripHeadingPrefix(lines[0]);
        body = lines.slice(1).join('\n\n');
      }
      return {
        id: tileId,
        type: 'richText',
        data: {
          ...(heading ? { heading } : {}),
          body,
          calloutStyle: d.textAdornment && d.textAdornment !== 'none' ? 'highlight' : 'default',
        },
      };
    }

    case 'listTile': {
      const modeRaw = String(d.mode || 'bullet').toLowerCase();
      const mode = modeRaw === 'numbered' ? 'numbered' : modeRaw === 'checkbox' ? 'checkbox' : 'bullet';
      const items = (d.items || []).map((item, idx) => ({
        id: item.id || `${tileId}-item-${idx + 1}`,
        text: clean(tiptapToMarkdown(item.text || item)),
      }));
      return {
        id: tileId,
        type: 'listBlock',
        data: { mode, items },
      };
    }

    case 'imageTile':
      return {
        id: tileId,
        type: 'imageBlock',
        data: {
          src: d.image?.source || '',
          alt: clean(d.image?.altText || ''),
          aspectRatio: d.image?.aspectRatio ? String(d.image.aspectRatio) : '16/9',
        },
      };

    case 'editableVideoTile': {
      const video = d.video || {};
      const durationMs = typeof video.duration === 'number' ? video.duration : 44000;
      const captions = video.captions || {};
      return {
        id: tileId,
        type: 'mediaPlayer',
        data: {
          kind: 'video',
          src: video.source || '',
          ...(captions.AR ? { vttSrc: captions.AR } : {}),
          ...(video.transcript ? { transcript: clean(video.transcript) } : {}),
          durationSec: Math.round(durationMs / 1000),
        },
      };
    }

    case 'codeTile':
      return {
        id: tileId,
        type: 'codeView',
        data: {
          code: d.code || '',
          runnable: true,
        },
      };

    case 'processTile':
      return {
        id: tileId,
        type: 'processStepper',
        data: {
          steps: (d.elements || []).map((el, idx) => {
            const md = clean(tiptapToMarkdown(el.content));
            const parts = md.split('\n\n');
            return {
              id: el.id || `${tileId}-step-${idx + 1}`,
              title: stripHeadingPrefix(parts[0] || `خطوة ${idx + 1}`),
              detail: parts.slice(1).join('\n\n') || stripHeadingPrefix(md),
            };
          }),
        },
      };

    case 'tableTile': {
      const cells = d.table?.cells || [];
      const rowsText = cells.map((row) =>
        (Array.isArray(row) ? row : []).map((cell) =>
          clean(tiptapToMarkdown(cell?.content)).replace(/\n+/g, ' ').trim(),
        ),
      );
      const [headers = [], ...rows] = rowsText;
      return {
        id: tileId,
        type: 'tableBlock',
        data: { headers, rows },
      };
    }

    case 'accordionTile':
      return {
        id: tileId,
        type: 'accordionBlock',
        data: {
          openMode: d.openMode === 'single' ? 'single' : 'multiple',
          items: (d.items || []).map((item, idx) => ({
            id: item.id || `${tileId}-acc-${idx + 1}`,
            title: clean(tiptapToMarkdown(item.header)),
            body: clean(tiptapToMarkdown(item.content)),
          })),
        },
      };

    case 'sectionCalloutTile':
      return {
        id: tileId,
        type: 'calloutWarning',
        data: {
          variant: d.style === 'pillLine' ? 'transition' : 'tip',
          title: clean(tiptapToMarkdown(d.text)),
          body: '',
        },
      };

    case 'questionTile': {
      const rawQuestion = clean(tiptapToMarkdown(d.question));
      const feedbackCorrect = clean(tiptapToMarkdown(d.feedbackWhenCorrect)) || 'أحسنت! إجابة صحيحة.';
      const feedbackWrong = clean(tiptapToMarkdown(d.feedback)) || 'راجع الفكرة وحاول مرة تانية.';
      return {
        id: tileId,
        type: 'quizQuestion',
        data: {
          question: stripHeadingPrefix(rawQuestion),
          options: (d.options || []).map((opt, idx) => ({
            id: opt.id || `${tileId}-opt-${idx + 1}`,
            text: clean(tiptapToMarkdown(opt.text)).trim(),
            isCorrect: Boolean(opt.correct),
            feedback:
              clean(tiptapToMarkdown(opt.feedback)).trim() ||
              (opt.correct ? feedbackCorrect : feedbackWrong),
          })),
          multiple: Boolean(d.selectMultiple),
          scored: Boolean(d.contributingToScore),
          explanation: feedbackWrong,
          randomizeOptions: Boolean(d.randomizeOptions),
        },
      };
    }

    case 'sortingTile': {
      const buckets = (d.categories || []).map((cat) => ({
        id: cat.id,
        label: clean(tiptapToMarkdown(cat.content)).trim(),
      }));
      const items = (d.categories || []).flatMap((cat) =>
        (cat.items || []).map((it, idx) => ({
          id: it.id || `${cat.id}-it-${idx + 1}`,
          text: clean(tiptapToMarkdown(it.content || it.text || it)).trim(),
          bucketId: cat.id,
        })),
      );
      return {
        id: tileId,
        type: 'sortingBuckets',
        data: {
          prompt: clean(tiptapToMarkdown(d.question)).trim(),
          buckets,
          items,
          feedback: {
            correct: clean(tiptapToMarkdown(d.feedback?.correct)) || 'ممتاز! صنّفت كل المواقف صح.',
            incorrect: clean(tiptapToMarkdown(d.feedback?.incorrect)) || 'جرّب مراجعة كل موقف تاني.',
          },
        },
      };
    }

    case 'matchingTile':
      return {
        id: tileId,
        type: 'matchingPairs',
        data: {
          prompt: clean(stripHeadingPrefix(tiptapToMarkdown(d.title))) || 'وصّل كل عنصر بما يناسبه:',
          pairs: (d.items || []).map((it, idx) => ({
            id: it.id || `${tileId}-pair-${idx + 1}`,
            left: clean(tiptapToMarkdown(it.choice)).trim(),
            right: clean(tiptapToMarkdown(it.match)).trim(),
          })),
          feedback: {
            correct: clean(tiptapToMarkdown(d.feedback?.correct)) || 'أحسنت! كل التوصيلات صحيحة.',
            incorrect: clean(tiptapToMarkdown(d.feedback?.incorrect)) || 'فيه توصيلة محتاجة مراجعة.',
          },
        },
      };

    case 'shortAnswerTile':
      return {
        id: tileId,
        type: 'codeLab',
        data: {
          mode: 'freeRun',
          prompt: clean(tiptapToMarkdown(d.question)).trim(),
          starterCode: '',
          solutionCode: d.answer || '',
          checks: [],
          hint: clean(tiptapToMarkdown(d.feedback)) || clean(d.gradingInstructions || ''),
        },
      };

    case 'transitionTile':
      return null;

    default:
      return {
        id: tileId,
        type: 'richText',
        data: {
          body: `[Unsupported Mindsmith tile: ${tile.type}]`,
        },
      };
  }
}

/**
 * Extracts normalized pages, blocks, and summary statistics from a Mindsmith export dir.
 */
export function extractMindsmithExport(exportDir, options = {}) {
  const normalize = options.normalize !== false;
  const lessonDataPath = path.join(exportDir, 'lesson-data.js');
  const decoded = decodeLessonDataFile(lessonDataPath);
  const clean = (txt) => (normalize ? normalizeLearnerTerminology(txt) : txt);

  const objectives = Object.entries(decoded.blocks || {})
    .filter(([, block]) => block?.type === 'objective')
    .map(([id, block]) => ({
      id,
      alias: block.data?.alias || '',
      text: clean(block.data?.text || ''),
    }));

  const pages = (decoded.blockOrder || [])
    .map((pageId, index) => {
      const page = decoded.blocks?.[pageId];
      if (!page) return null;
      const tileIds = [];
      for (const row of page.layout?.rows || []) {
        for (const tileRef of row.tiles || []) {
          if (tileRef?.tileId) tileIds.push(tileRef.tileId);
        }
      }
      const blocks = tileIds
        .map((tid) => {
          const tile = decoded.blocks?.[tid];
          if (!tile) return null;
          return mapMindsmithTileToBlock(tid, tile, normalize);
        })
        .filter(Boolean);

      return {
        id: pageId,
        order: index + 1,
        title: clean(page.title || `بطاقة ${index + 1}`),
        blocks,
      };
    })
    .filter(Boolean);

  const tileCounts = {};
  for (const block of Object.values(decoded.blocks || {})) {
    if (!block?.type) continue;
    tileCounts[block.type] = (tileCounts[block.type] || 0) + 1;
  }

  return {
    title: clean(decoded.title || ''),
    language: decoded.language || 'AR',
    version: decoded.version || '',
    objectives,
    pages,
    tileCounts,
    raw: decoded,
  };
}

/**
 * Extracts plain text from a TipTap / ProseMirror document tree.
 */
export function extractPlainTextFromTipTap(node) {
  return tiptapToMarkdown(node);
}

/**
 * Converts a Mindsmith export directory into a normalized platform draft
 * with page cards and Mindsmith tile counts.
 */
export function convertExportToDraft(exportDir, options = {}) {
  const extracted = extractMindsmithExport(exportDir, options);
  return {
    title: extracted.title,
    language: extracted.language,
    objectives: extracted.objectives,
    pages: extracted.pages,
    blocksCount: extracted.tileCounts,
  };
}

function parseCliArgs(argv) {
  const args = { exportKey: 'all', outDir: null, raw: false, json: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--export' && argv[i + 1]) {
      args.exportKey = argv[++i];
    } else if (arg === '--out' && argv[i + 1]) {
      args.outDir = argv[++i];
    } else if (arg === '--raw') {
      args.raw = true;
    } else if (arg === '--json') {
      args.json = true;
    }
  }
  return args;
}

function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const cwd = process.cwd();

  let targets = [];
  if (args.exportKey === 'all') {
    targets = DEFAULT_EXPORTS.map((entry) => ({
      ...entry,
      fullDir: path.resolve(cwd, entry.dir),
    }));
  } else {
    const known = DEFAULT_EXPORTS.find((e) => e.key.toLowerCase() === args.exportKey.toLowerCase());
    targets = known
      ? [{ ...known, fullDir: path.resolve(cwd, known.dir) }]
      : [{ key: 'custom', dir: args.exportKey, label: args.exportKey, fullDir: path.resolve(cwd, args.exportKey) }];
  }

  const summaries = [];
  for (const target of targets) {
    if (!fs.existsSync(path.join(target.fullDir, 'lesson-data.js'))) {
      console.error(`Missing lesson-data.js in ${target.fullDir}`);
      process.exitCode = 1;
      continue;
    }
    const extracted = extractMindsmithExport(target.fullDir, { normalize: !args.raw });
    const summary = {
      key: target.key,
      label: target.label,
      title: extracted.title,
      pagesCount: extracted.pages.length,
      objectivesCount: extracted.objectives.length,
      tileCounts: extracted.tileCounts,
    };
    summaries.push(summary);

    if (args.outDir) {
      const outRoot = path.resolve(cwd, args.outDir);
      fs.mkdirSync(outRoot, { recursive: true });
      const baseName = `export-${target.key}`;
      fs.writeFileSync(
        path.join(outRoot, `${baseName}.normalized.json`),
        JSON.stringify(
          {
            title: extracted.title,
            language: extracted.language,
            objectives: extracted.objectives,
            pages: extracted.pages,
          },
          null,
          2,
        ),
        'utf8',
      );
      fs.writeFileSync(
        path.join(outRoot, `${baseName}.raw.json`),
        JSON.stringify(extracted.raw, null, 2),
        'utf8',
      );
    }
  }

  if (args.json) {
    console.log(JSON.stringify(summaries, null, 2));
  } else {
    for (const s of summaries) {
      console.log(`[${s.key}] ${s.title} — ${s.pagesCount} pages, ${s.objectivesCount} objectives`);
      console.log(`    tiles:`, s.tileCounts);
    }
  }
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));

if (isDirectRun) {
  main();
}
