'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Layers,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import {
  deriveLearnerStats,
  getLearnerStats,
  recordFlashcardReviewed,
} from '@/lib/storage/progress';
import {
  DEFAULT_COURSE_ID,
  getCourseManifest,
  getStoredActiveCourseId,
} from '@/content/catalog';
import type {
  FlashcardItem,
  FlashcardReviewState,
  StationPack,
} from '@/types/curriculum';

export interface ReviewClientProps {
  flashcards: FlashcardItem[];
  stations: Array<
    Pick<StationPack, 'id' | 'number' | 'title'> & {
      termId?: string;
      packId?: string;
    }
  >;
}

function buildPriorityQueue(
  cards: FlashcardItem[],
  states: Record<string, FlashcardReviewState>,
): FlashcardItem[] {
  const reviewAgain: FlashcardItem[] = [];
  const unseen: FlashcardItem[] = [];
  const known: FlashcardItem[] = [];

  for (const card of cards) {
    const state = states[card.id];
    if (state?.status === 'review_again') {
      reviewAgain.push(card);
    } else if (state?.status === 'known') {
      known.push(card);
    } else {
      unseen.push(card);
    }
  }

  return [...reviewAgain, ...unseen, ...known];
}

export function ReviewClient({ flashcards, stations }: ReviewClientProps) {
  const [activeCourseId, setActiveCourseId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return getStoredActiveCourseId();
    }
    return DEFAULT_COURSE_ID;
  });

  const activeCourse = useMemo(
    () => getCourseManifest(activeCourseId),
    [activeCourseId],
  );
  const targetPack = activeCourse.packId || activeCourseId;

  const scopedStations = useMemo(() => {
    const hasTermMeta = stations.some(
      (s) =>
        (s as { termId?: string; packId?: string }).termId ||
        (s as { termId?: string; packId?: string }).packId,
    );
    if (!hasTermMeta) return stations;
    const filtered = stations.filter(
      (s) =>
        (s as { termId?: string }).termId === targetPack ||
        (s as { packId?: string }).packId === targetPack ||
        (targetPack === 'prep3-term1' && s.number <= 9) ||
        (targetPack.includes('term2') && s.number >= 10),
    );
    return filtered.length > 0 ? filtered : stations;
  }, [stations, targetPack]);

  const scopedStationIds = useMemo(
    () => new Set(scopedStations.map((s) => s.id)),
    [scopedStations],
  );

  const scopedFlashcards = useMemo(() => {
    const hasTermMeta = stations.some(
      (s) =>
        (s as { termId?: string; packId?: string }).termId ||
        (s as { termId?: string; packId?: string }).packId,
    );
    if (!hasTermMeta) return flashcards;
    return flashcards.filter((f) => scopedStationIds.has(f.stationId));
  }, [flashcards, scopedStationIds, stations]);

  const [selectedStation, setSelectedStation] = useState<string>('all');
  const [flashcardStates, setFlashcardStates] = useState<
    Record<string, FlashcardReviewState>
  >(() => deriveLearnerStats([], []).flashcardStates);
  const [queue, setQueue] = useState<FlashcardItem[]>(() => scopedFlashcards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [roundResults, setRoundResults] = useState<
    Record<string, 'known' | 'review_again'>
  >({});
  const hasInteractedRef = useRef(false);

  const filteredPool = useMemo(() => {
    if (selectedStation === 'all') return scopedFlashcards;
    return scopedFlashcards.filter((f) => f.stationId === selectedStation);
  }, [scopedFlashcards, selectedStation]);

  // Initial load from IndexedDB (does not clobber user progress if they already started tapping)
  useEffect(() => {
    let cancelled = false;
    const stored = getStoredActiveCourseId();
    const effectiveCourse = stored || DEFAULT_COURSE_ID;
    if (stored && stored !== activeCourseId) {
      setActiveCourseId(stored);
    }

    getLearnerStats(undefined, { courseId: effectiveCourse })
      .then((stats) => {
        if (cancelled) return;
        setFlashcardStates((prev) => ({ ...stats.flashcardStates, ...prev }));
        if (!hasInteractedRef.current) {
          setQueue(buildPriorityQueue(filteredPool, stats.flashcardStates));
          setIndex(0);
          setFlipped(false);
        }
      })
      .catch(() => undefined);

    const handleCourseChanged = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const newCourseId = customEvent.detail || getStoredActiveCourseId();
      setActiveCourseId(newCourseId);
      getLearnerStats(undefined, { courseId: newCourseId })
        .then((stats) => {
          if (cancelled) return;
          setFlashcardStates((prev) => ({ ...stats.flashcardStates, ...prev }));
        })
        .catch(() => undefined);
    };
    window.addEventListener('sl-course-changed', handleCourseChanged);

    return () => {
      cancelled = true;
      window.removeEventListener('sl-course-changed', handleCourseChanged);
    };
  }, [filteredPool, activeCourseId]);

  const handleStationSelect = (stationId: string) => {
    hasInteractedRef.current = true;
    setSelectedStation(stationId);
    const pool =
      stationId === 'all'
        ? scopedFlashcards
        : scopedFlashcards.filter((f) => f.stationId === stationId);
    setQueue(buildPriorityQueue(pool, flashcardStates));
    setIndex(0);
    setFlipped(false);
    setRoundResults({});
  };

  const isRoundComplete = queue.length > 0 && index >= queue.length;
  const currentCard = !isRoundComplete ? queue[index] : undefined;

  const handleReviewAction = async (result: 'known' | 'review_again') => {
    if (!currentCard) return;
    hasInteractedRef.current = true;

    const updatedStates: Record<string, FlashcardReviewState> = {
      ...flashcardStates,
      [currentCard.id]: {
        cardId: currentCard.id,
        status: result,
        reviewCount: (flashcardStates[currentCard.id]?.reviewCount ?? 0) + 1,
        lastReviewedAt: Date.now(),
      },
    };
    setFlashcardStates(updatedStates);
    setRoundResults((prev) => ({ ...prev, [currentCard.id]: result }));
    setFlipped(false);
    setIndex((i) => i + 1);

    try {
      await recordFlashcardReviewed(
        currentCard.microLessonId,
        currentCard.stationId,
        {
          cardId: currentCard.id,
          stationId: currentCard.stationId,
          result,
        },
        undefined,
        undefined,
        activeCourseId,
      );
    } catch {
      // Non-fatal if IndexedDB unavailable
    }
  };

  const handleStartNewRound = () => {
    const nextQueue = buildPriorityQueue(filteredPool, flashcardStates);
    setQueue(nextQueue);
    setIndex(0);
    setFlipped(false);
    setRoundResults({});
  };

  const knownInRound = Object.values(roundResults).filter(
    (v) => v === 'known',
  ).length;
  const reviewAgainInRound = Object.values(roundResults).filter(
    (v) => v === 'review_again',
  ).length;
  const pendingReviewAgainTotal = filteredPool.filter(
    (c) => flashcardStates[c.id]?.status === 'review_again',
  ).length;

  return (
    <div className="space-y-6">
      {/* Header & Station Filter */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
              <Layers className="w-3.5 h-3.5" />
              <span>
                بطاقات المراجعة الذكية · {activeCourse.gradeLabel} ({activeCourse.termLabel})
              </span>
            </span>
            <h1 className="text-2xl font-bold text-[#163A3A]">
              المراجعة بالبطاقات (Flashcards)
            </h1>
            <p className="text-sm text-[#3B5A58]">
              اقلب البطاقة واختبر ذاكرتك. البطاقات اللي تختار فيها «راجعها تاني»
              بتظهر أولًا في الجولة الجاية.
            </p>
          </div>

          {pendingReviewAgainTotal > 0 && (
            <div className="rounded-xl bg-[#FBEAEC] border border-[#E14B63]/20 px-4 py-2 text-xs sm:text-sm font-bold text-[#E14B63]">
              {pendingReviewAgainTotal} بطاقة في أولوية المراجعة
            </div>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => handleStationSelect('all')}
            className={`min-h-[48px] shrink-0 px-4 rounded-xl border text-sm font-bold transition-colors ${
              selectedStation === 'all'
                ? 'bg-[#006E5A] text-white border-[#006E5A]'
                : 'bg-[#F6FAF9] text-[#163A3A] border-[#E2ECE9] hover:border-[#006E5A]'
            }`}
          >
            كل المحطات ({scopedFlashcards.length})
          </button>

          {scopedStations.map((st) => {
            const count = scopedFlashcards.filter((f) => f.stationId === st.id).length;
            if (count === 0) return null;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => handleStationSelect(st.id)}
                className={`min-h-[48px] shrink-0 px-4 rounded-xl border text-sm font-bold transition-colors ${
                  selectedStation === st.id
                    ? 'bg-[#006E5A] text-white border-[#006E5A]'
                    : 'bg-[#F6FAF9] text-[#163A3A] border-[#E2ECE9] hover:border-[#006E5A]'
                }`}
              >
                المحطة {st.number} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Card Player or Round Completion */}
      {queue.length === 0 ? (
        <section className="orchid-card p-8 text-center space-y-3">
          <p className="text-base font-bold text-[#163A3A]">
            لا توجد بطاقات متاحة لهذه المحطة حاليًا.
          </p>
          <button
            type="button"
            onClick={() => handleStationSelect('all')}
            className="orchid-btn-primary"
          >
            عرض كل البطاقات
          </button>
        </section>
      ) : isRoundComplete ? (
        <section className="orchid-card p-6 sm:p-8 text-center space-y-5 animate-card-enter">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E5F1EE] text-[#006E5A] flex items-center justify-center">
            <Sparkles className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-[#163A3A]">
              انتهت جولة المراجعة!
            </h2>
            <p className="text-sm text-[#3B5A58]">
              راجعت {queue.length} بطاقة في هذه الجولة.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-xl bg-[#E5F1EE] text-[#006E5A] px-4 py-2 text-sm font-bold">
              عارفها: {knownInRound} ✓
            </span>
            <span className="rounded-xl bg-[#FBEAEC] text-[#E14B63] px-4 py-2 text-sm font-bold">
              للمراجعة تاني: {reviewAgainInRound} ↻
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleStartNewRound}
              className="orchid-btn-primary w-full sm:w-auto px-6"
            >
              <RotateCw className="w-4 h-4 shrink-0" />
              <span>بدء جولة مراجعة جديدة</span>
            </button>
            <Link href="/" className="orchid-btn-secondary w-full sm:w-auto">
              العودة للرئيسية
            </Link>
          </div>
        </section>
      ) : (
        currentCard && (
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="flex items-center justify-between text-xs font-bold text-[#3B5A58]">
              <span className="tabular-nums">
                البطاقة {index + 1} من {queue.length}
              </span>
              {flashcardStates[currentCard.id]?.status === 'review_again' && (
                <span className="rounded-full bg-[#FBEAEC] text-[#E14B63] px-3 py-0.5">
                  في أولوية المراجعة
                </span>
              )}
            </div>

            {/* Flip Card Button */}
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              aria-label={`اقلب البطاقة: ${currentCard.termEn} — ${currentCard.termAr}`}
              className="orchid-card w-full min-h-[260px] p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-[#006E5A] transition-colors cursor-pointer"
            >
              {!flipped ? (
                <>
                  <span
                    dir="ltr"
                    className="inline-block rounded-xl bg-[#E5F1EE] text-[#006E5A] px-4 py-1.5 font-mono text-base sm:text-lg font-bold"
                  >
                    {currentCard.termEn}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#163A3A]">
                    {currentCard.termAr}
                  </h2>
                  <span className="text-xs font-semibold text-[#3B5A58]/80 pt-2">
                    اضغط لقلب البطاقة ومعرفة الشرح والمثال
                  </span>
                </>
              ) : (
                <div className="space-y-3 w-full text-right">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2ECE9] pb-2">
                    <span className="text-base font-bold text-[#163A3A]">
                      {currentCard.termAr}
                    </span>
                    <span
                      dir="ltr"
                      className="font-mono text-xs font-bold text-[#006E5A] bg-[#E5F1EE] px-2.5 py-0.5 rounded-md"
                    >
                      {currentCard.termEn}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg text-[#163A3A] leading-relaxed">
                    {currentCard.definition}
                  </p>

                  {currentCard.example && (
                    <p className="text-sm text-[#3B5A58] bg-[#F6FAF9] rounded-lg p-3 border border-[#E2ECE9]">
                      <span className="font-bold text-[#006E5A]">مثال: </span>
                      {currentCard.example}
                    </p>
                  )}

                  {currentCard.code && (
                    <pre
                      dir="ltr"
                      className="rounded-lg bg-[#0F2929] text-[#F6FAF9] p-3 text-sm font-mono overflow-x-auto text-left"
                    >
                      <code>{currentCard.code}</code>
                    </pre>
                  )}
                </div>
              )}
            </button>

            {/* Two Clear Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleReviewAction('review_again')}
                className="min-h-[54px] rounded-xl border border-[#E14B63]/40 bg-[#FBEAEC] text-[#163A3A] hover:border-[#E14B63] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCw className="w-4 h-4 text-[#E14B63] shrink-0" />
                <span>راجعها تاني ↻</span>
              </button>

              <button
                type="button"
                onClick={() => handleReviewAction('known')}
                className="min-h-[54px] rounded-xl border border-[#006E5A] bg-[#006E5A] text-white hover:bg-[#007A66] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors"
              >
                <Check className="w-5 h-5 shrink-0" />
                <span>عارفها ✓</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
