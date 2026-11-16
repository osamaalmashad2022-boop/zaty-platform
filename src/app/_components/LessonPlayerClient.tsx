'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Flame,
  Headphones,
  HelpCircle,
  Network,
  Sparkles,
  Tag,
  Trophy,
} from 'lucide-react';
import { AdditionalSourcesSheet } from '@/components/lesson/AdditionalSourcesSheet';
import { BlockRenderer } from '@/components/lesson/BlockRenderer';
import { SourcesDrawer } from '@/components/lesson/SourcesDrawer';
import type { BlockAttemptPayload } from '@/components/blocks/types';
import {
  getLearnerStats,
  recordActivityAttempt,
  recordCardViewed,
  recordLessonCompleted,
  syncLessonCache,
} from '@/lib/storage/progress';
import type {
  AdditionalSource,
  LearnerStats,
  LessonBlock,
  LessonPack,
} from '@/types/curriculum';

export interface LessonPlayerClientProps {
  lesson: LessonPack;
  stationTitle: string;
}

const INTERACTIVE_BLOCK_TYPES = new Set<LessonBlock['type']>([
  'quizQuestion',
  'sortingBuckets',
  'matchingPairs',
  'orderFlowBuilder',
  'codeLab',
]);

function isInteractiveBlock(block: LessonBlock): boolean {
  if (INTERACTIVE_BLOCK_TYPES.has(block.type)) return true;
  if (block.type === 'listBlock' && block.data.mode === 'checkbox') return true;
  return false;
}

const EXTRA_ICONS: Record<
  AdditionalSource['type'],
  React.ComponentType<{ className?: string }>
> = {
  summary: FileText,
  faq: HelpCircle,
  mindmap: Network,
  glossary: Tag,
  audio: Headphones,
};

export function LessonPlayerClient({
  lesson,
  stationTitle,
}: LessonPlayerClientProps) {
  const totalCards = lesson.cards.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attemptedBlocks, setAttemptedBlocks] = useState<Record<string, boolean>>(
    {},
  );
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [activeExtraId, setActiveExtraId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [stats, setStats] = useState<LearnerStats | null>(null);

  const startedAtRef = useRef<number>(Date.now());
  const loggedCardsRef = useRef<Set<string>>(new Set());
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    syncLessonCache(lesson).catch(() => undefined);

    getLearnerStats()
      .then((loadedStats) => {
        if (cancelled) return;
        setStats(loadedStats);
        const savedIndex = loadedStats.lastCardIndexByLesson[lesson.id];
        const alreadyDone = loadedStats.completedLessonIds.includes(lesson.id);
        if (
          !hasNavigatedRef.current &&
          !alreadyDone &&
          typeof savedIndex === 'number' &&
          savedIndex > 0 &&
          savedIndex < totalCards
        ) {
          setCurrentIndex(savedIndex);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [lesson, totalCards]);

  const currentCard = lesson.cards[currentIndex] ?? lesson.cards[0];

  // Record card view whenever currentCard changes
  useEffect(() => {
    if (!currentCard || completed) return;
    const key = `${lesson.id}::${currentCard.id}::${currentIndex}`;
    if (loggedCardsRef.current.has(key)) return;
    loggedCardsRef.current.add(key);

    recordCardViewed(lesson.id, lesson.stationId, {
      cardId: currentCard.id,
      cardIndex: currentIndex,
      totalCards,
    }).catch(() => undefined);
  }, [currentCard, currentIndex, totalCards, lesson.id, lesson.stationId, completed]);

  const requiredBlockIds = useMemo(() => {
    if (!currentCard || !currentCard.requireInteraction) return [];
    return currentCard.blocks.filter(isInteractiveBlock).map((b) => b.id);
  }, [currentCard]);

  const isCardUnlocked = useMemo(() => {
    if (requiredBlockIds.length === 0) return true;
    return requiredBlockIds.every((id) => attemptedBlocks[id] === true);
  }, [requiredBlockIds, attemptedBlocks]);

  const markBlockAttempted = useCallback((blockId: string) => {
    setAttemptedBlocks((prev) =>
      prev[blockId] ? prev : { ...prev, [blockId]: true },
    );
  }, []);

  const handleBlockComplete = useCallback(
    (blockId: string) => {
      markBlockAttempted(blockId);
    },
    [markBlockAttempted],
  );

  const handleBlockAttempt = useCallback(
    (
      blockId: string,
      blockType: LessonBlock['type'],
      payload: BlockAttemptPayload,
    ) => {
      markBlockAttempted(blockId);
      recordActivityAttempt(lesson.id, lesson.stationId, {
        blockId,
        blockType,
        isCorrect: payload.isCorrect,
        attemptNumber: payload.attemptNumber,
        errorKind: payload.errorKind,
      }).catch(() => undefined);
    },
    [lesson.id, lesson.stationId, markBlockAttempted],
  );

  const handleBlockInteract = useCallback(
    (blockId: string) => {
      markBlockAttempted(blockId);
    },
    [markBlockAttempted],
  );

  const handlePrev = () => {
    hasNavigatedRef.current = true;
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleNext = () => {
    hasNavigatedRef.current = true;
    if (!isCardUnlocked) return;
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((i) => i + 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleFinishLesson = async () => {
    if (!isCardUnlocked || isCompleting) return;
    setIsCompleting(true);
    try {
      const durationSec = Math.max(
        1,
        Math.round((Date.now() - startedAtRef.current) / 1000),
      );
      await recordLessonCompleted(lesson.id, lesson.stationId, {
        durationSec,
        xpAwarded: 50,
      });
      const updated = await getLearnerStats();
      setStats(updated);
      setCompleted(true);
    } finally {
      setIsCompleting(false);
    }
  };

  const progressPct =
    totalCards > 0 ? Math.round(((currentIndex + 1) / totalCards) * 100) : 100;
  const isLastCard = currentIndex === totalCards - 1;

  const nextHref =
    lesson.nextStep.kind === 'lesson'
      ? `/lesson/${lesson.nextStep.targetId}`
      : `/station/${lesson.nextStep.targetId}/quiz`;

  return (
    <div className="min-h-dvh flex flex-col bg-[#F6FAF9]" dir="rtl">
      {/* Fixed RTL Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#E2ECE9]">
        <div className="max-w-3xl mx-auto px-4 py-2.5 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/station/${lesson.stationId}`}
              className="inline-flex items-center gap-1.5 min-h-[48px] px-2 -mr-2 text-sm font-bold text-[#009179] hover:text-[#163A3A]"
            >
              <ArrowRight className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{stationTitle}</span>
              <span className="sm:hidden">المحطة</span>
            </Link>

            <div className="text-center min-w-0">
              <div className="text-xs font-bold text-[#009179] tabular-nums">
                البطاقة {currentIndex + 1} من {totalCards}
              </div>
              <div className="text-sm font-bold text-[#163A3A] truncate max-w-[180px] sm:max-w-xs">
                {lesson.title}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSourcesOpen(true)}
              className="inline-flex items-center gap-1.5 min-h-[48px] px-3 rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] text-sm font-bold text-[#163A3A] hover:border-[#009179]"
            >
              <BookOpen className="w-4 h-4 text-[#009179] shrink-0" />
              <span>المصادر</span>
            </button>
          </div>

          {/* Continuous RTL progress bar */}
          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="تقدم الدرس"
            className="w-full h-2 rounded-full bg-[#E5F1EE] overflow-hidden"
          >
            <div
              className="h-full bg-[#009179] rounded-full transition-all duration-300"
              style={{ width: `${completed ? 100 : progressPct}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Card / Completion Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-5 pb-32">
        {completed ? (
          <section className="orchid-card p-6 sm:p-8 text-center space-y-6 animate-card-enter">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#E5F1EE] text-[#009179] flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-4 py-1.5 text-sm font-bold text-[#009179]">
                <Sparkles className="w-4 h-4" />
                <span>+50 XP</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#163A3A]">
                أحسنت يا مبرمج! أنهيت الدرس {lesson.id}
              </h1>
              <p className="text-sm sm:text-base text-[#3B5A58] max-w-xl mx-auto">
                {lesson.summary}
              </p>
            </div>

            {stats && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] px-4 py-2.5 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#E14B63]" />
                  <span className="text-sm font-bold text-[#163A3A] tabular-nums">
                    سلسلة {stats.streakDays} يوم
                  </span>
                </div>
                <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] px-4 py-2.5 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#009179]" />
                  <span className="text-sm font-bold text-[#163A3A] tabular-nums">
                    الإجمالي: {stats.xp} XP
                  </span>
                </div>
              </div>
            )}

            {/* NotebookLM Extras quick re-open */}
            {lesson.additionalSources.length > 0 && (
              <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-3 text-right">
                <h2 className="text-sm font-bold text-[#163A3A]">
                  مصادر إضافية من NotebookLM للمراجعة السريعة:
                </h2>
                <div className="flex flex-wrap gap-2">
                  {lesson.additionalSources.map((src) => {
                    const Icon = EXTRA_ICONS[src.type];
                    return (
                      <button
                        key={src.id}
                        type="button"
                        onClick={() => setActiveExtraId(src.id)}
                        className="inline-flex items-center gap-2 min-h-[48px] px-3.5 py-2 rounded-lg border border-[#E2ECE9] bg-white text-sm font-bold text-[#163A3A] hover:border-[#009179]"
                      >
                        <Icon className="w-4 h-4 text-[#009179]" />
                        <span>{src.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href={nextHref}
                className="orchid-btn-primary w-full sm:w-auto min-h-[54px] px-7 text-base"
              >
                <span>{lesson.nextStep.label}</span>
                <ArrowLeft className="w-5 h-5 shrink-0" />
              </Link>

              <Link
                href={`/station/${lesson.stationId}`}
                className="orchid-btn-secondary w-full sm:w-auto min-h-[54px] px-6"
              >
                <span>العودة للمحطة</span>
              </Link>
            </div>
          </section>
        ) : (
          currentCard && (
            <div key={currentCard.id} className="space-y-5 animate-card-enter">
              {/* Card Title Pill */}
              <div className="flex items-center justify-between gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-[#163A3A]">
                  {currentCard.title}
                </h1>
                {currentCard.requireInteraction && (
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isCardUnlocked
                        ? 'bg-[#E5F1EE] text-[#009179]'
                        : 'bg-[#FBEAEC] text-[#E14B63]'
                    }`}
                  >
                    {isCardUnlocked ? 'تمت المحاولة ✓' : 'نشاط مطلوب'}
                  </span>
                )}
              </div>

              {/* Card Blocks */}
              <div className="space-y-4">
                {currentCard.blocks.map((block) => (
                  <BlockRenderer
                    key={block.id}
                    block={block}
                    onComplete={handleBlockComplete}
                    onAttempt={handleBlockAttempt}
                    onInteract={handleBlockInteract}
                  />
                ))}
              </div>

              {/* NotebookLM Additional Sources on Last Card */}
              {isLastCard && lesson.additionalSources.length > 0 && (
                <section className="orchid-card p-5 space-y-3 border-[#009179]/30">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#009179]">
                      إضافات NotebookLM · بدون مغادرة الدرس
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-[#163A3A]">
                      مصادر إضافية لفهم أعمق
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {lesson.additionalSources.map((src) => {
                      const Icon = EXTRA_ICONS[src.type];
                      return (
                        <button
                          key={src.id}
                          type="button"
                          onClick={() => setActiveExtraId(src.id)}
                          className="flex items-center justify-between gap-2 min-h-[48px] px-4 py-2.5 rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] hover:border-[#009179] hover:bg-white text-right font-bold text-sm text-[#163A3A] transition-colors"
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-[#009179] shrink-0" />
                            <span>{src.title}</span>
                          </span>
                          <ArrowLeft className="w-4 h-4 text-[#009179] shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Gating Hint when interactive card not yet attempted */}
              {!isCardUnlocked && (
                <p
                  role="status"
                  className="text-xs sm:text-sm font-medium text-[#E14B63] bg-[#FBEAEC] border border-[#E14B63]/20 rounded-xl px-4 py-3"
                >
                  جرّب النشاط الموجود في هذه البطاقة أولًا لتفتح الخطوة التالية.
                </p>
              )}
            </div>
          )
        )}
      </main>

      {/* Bottom Thumb Navigation */}
      {!completed && (
        <footer className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-[#E2ECE9] pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="orchid-btn-secondary min-w-[110px] sm:min-w-[140px] disabled:opacity-45"
            >
              <ArrowRight className="w-4 h-4 shrink-0" />
              <span>السابق</span>
            </button>

            {isLastCard ? (
              <button
                type="button"
                onClick={handleFinishLesson}
                disabled={!isCardUnlocked || isCompleting}
                className="orchid-btn-primary flex-1 sm:flex-initial sm:min-w-[200px]"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{isCompleting ? 'جاري الحفظ...' : 'إنهاء الدرس'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isCardUnlocked}
                className="orchid-btn-primary flex-1 sm:flex-initial sm:min-w-[200px]"
              >
                <span>التالي</span>
                <ArrowLeft className="w-5 h-5 shrink-0" />
              </button>
            )}
          </div>
        </footer>
      )}

      {/* Drawers / Modals */}
      <SourcesDrawer
        open={sourcesOpen}
        onClose={() => setSourcesOpen(false)}
        sources={lesson.sources}
        additionalSources={lesson.additionalSources}
        lessonTitle={lesson.title}
      />

      <AdditionalSourcesSheet
        isOpen={activeExtraId !== null}
        activeSourceId={activeExtraId}
        onSelectSource={(id) => setActiveExtraId(id)}
        onClose={() => setActiveExtraId(null)}
        sources={lesson.additionalSources}
        lessonTitle={lesson.title}
      />
    </div>
  );
}
