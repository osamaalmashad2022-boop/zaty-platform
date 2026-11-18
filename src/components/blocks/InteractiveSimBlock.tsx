'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Gamepad2,
  Newspaper,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Swords,
  XCircle,
} from 'lucide-react';
import type {
  InteractiveGansArenaData,
  InteractiveLinearModelData,
  InteractiveSimData,
  InteractiveTrapDetectorData,
  TrapDetectorScene,
} from '@/types/curriculum';
import { InlineFormatted } from './FormattedText';
import type { BlockInteractionProps } from './types';

export interface InteractiveSimBlockProps extends BlockInteractionProps {
  data: InteractiveSimData;
}

// ---------------------------------------------------------------------------
// Mode 1: Linear Model Simulator (y = w * x + b)
// ---------------------------------------------------------------------------

function LinearModelSim({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: { data: InteractiveLinearModelData } & BlockInteractionProps) {
  const lockedX = data.targetChallenge?.lockX;
  const initX = lockedX ?? data.initialX ?? 4;
  const initW = data.initialW ?? 10;
  const initB = data.initialB ?? 10;

  const [x, setX] = useState(initX);
  const [w, setW] = useState(initW);
  const [b, setB] = useState(initB);
  const [attemptCount, setAttemptCount] = useState(0);
  const [checkedStatus, setCheckedStatus] = useState<{
    passed: boolean;
    message: string;
  } | null>(null);
  const [explored, setExplored] = useState(false);

  const sig = JSON.stringify({
    prompt: data.prompt,
    initX,
    initW,
    initB,
    targetY: data.targetChallenge?.targetY ?? null,
  });

  useEffect(() => {
    setX(initX);
    setW(initW);
    setB(initB);
    setAttemptCount(0);
    setCheckedStatus(null);
    setExplored(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);

  const minX = data.minX ?? 0;
  const maxX = data.maxX ?? 10;
  const stepX = data.stepX ?? 1;
  const minW = data.minW ?? 0;
  const maxW = data.maxW ?? 20;
  const stepW = data.stepW ?? 1;
  const minB = data.minB ?? -20;
  const maxB = data.maxB ?? 50;
  const stepB = data.stepB ?? 5;
  const maxY = data.maxY ?? 100;

  const effectiveX = lockedX ?? x;
  const predictedY = Math.round((w * effectiveX + b) * 100) / 100;
  const fillPct = Math.max(0, Math.min(100, (predictedY / maxY) * 100));
  const targetY = data.targetChallenge?.targetY;
  const targetPct =
    targetY !== undefined ? Math.max(0, Math.min(100, (targetY / maxY) * 100)) : null;

  const handleParamChange = (setter: (val: number) => void, val: number) => {
    setter(val);
    setCheckedStatus(null);
    onInteract?.();
    if (!data.targetChallenge && !explored) {
      setExplored(true);
      onAttempt?.({ isCorrect: true, attemptNumber: 1 });
      onComplete?.(true);
    }
  };

  const handleCheckTarget = () => {
    if (!data.targetChallenge) return;
    const tolerance = data.targetChallenge.tolerance ?? 0;
    const passed = Math.abs(predictedY - data.targetChallenge.targetY) <= tolerance;
    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);

    const diffMsg =
      predictedY < data.targetChallenge.targetY
        ? `الناتج الحالي (${predictedY}) لسه أقل من الهدف (${data.targetChallenge.targetY}) — زوّد الوزن w أو الانحياز b!`
        : `الناتج الحالي (${predictedY}) أعلى من الهدف (${data.targetChallenge.targetY}) — قلّل القيم شوية!`;

    setCheckedStatus({
      passed,
      message: passed ? data.targetChallenge.successFeedback : diffMsg,
    });

    onInteract?.();
    onAttempt?.({
      isCorrect: passed,
      attemptNumber: nextAttempt,
    });
    if (passed) {
      onComplete?.(true);
    }
  };

  // Mini SVG line coordinates across x in [minX, maxX]
  const yStart = w * minX + b;
  const yEnd = w * maxX + b;
  const toSvgY = (val: number) => {
    const clamped = Math.max(0, Math.min(maxY, val));
    return 72 - (clamped / maxY) * 60;
  };
  const currentSvgX =
    maxX > minX ? 16 + ((effectiveX - minX) / (maxX - minX)) * 208 : 120;
  const currentSvgY = toSvgY(predictedY);

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-4 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
          <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
          <span>محاكاة النموذج الخطي التفاعلية</span>
        </span>
        {explored && !data.targetChallenge && (
          <span className="text-xs font-bold text-[#006E5A]">تمت التجربة ✓</span>
        )}
      </div>

      {data.title && (
        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">{data.title}</h3>
      )}

      <p className="text-base font-bold leading-relaxed text-[#163A3A]">
        <InlineFormatted text={data.prompt} />
      </p>

      {/* Live Formula + Visual Grade Indicator */}
      <div className="rounded-xl border border-[#006E5A]/25 bg-[#F6FAF9] p-4 space-y-3">
        <div
          dir="ltr"
          className="rounded-lg bg-[#0F2929] px-4 py-2.5 text-center font-mono text-sm sm:text-base font-bold text-[#8CE9C8]"
        >
          y = {w} × {effectiveX} + ({b}) ={' '}
          <span className="text-[#FCD34D]">{predictedY}</span>
        </div>

        <div className="flex items-center justify-between text-sm font-bold text-[#163A3A]">
          <span>{data.yLabel || 'الدرجة المتوقعة (y)'}</span>
          <span className="tabular-nums text-[#006E5A]">
            {predictedY} {data.unitSuffix || 'درجة'}
          </span>
        </div>

        {/* Visual Progress Bar Gauge with optional Target marker */}
        <div className="relative h-5 w-full overflow-hidden rounded-full bg-[#E2ECE9]">
          <div
            className="h-full rounded-full bg-[#006E5A] transition-all duration-150"
            style={{ width: `${fillPct}%` }}
          />
          {targetPct !== null && (
            <div
              aria-label={`مؤشر الهدف ${targetY}`}
              className="absolute inset-y-0 w-1 bg-[#E14B63]"
              style={{ right: `${targetPct}%` }}
            />
          )}
        </div>

        {/* Mini SVG Linear Graph */}
        <div className="rounded-lg border border-[#E2ECE9] bg-white p-2">
          <svg
            viewBox="0 0 240 84"
            className="h-20 w-full"
            role="img"
            aria-label={`رسم بياني خطي للنموذج y = ${w}x + ${b}`}
          >
            <line x1="16" y1="72" x2="224" y2="72" stroke="#E2ECE9" strokeWidth="1.5" />
            <line x1="16" y1="12" x2="16" y2="72" stroke="#E2ECE9" strokeWidth="1.5" />
            <line
              x1="16"
              y1={toSvgY(yStart)}
              x2="224"
              y2={toSvgY(yEnd)}
              stroke="#006E5A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {targetY !== undefined && (
              <line
                x1="16"
                y1={toSvgY(targetY)}
                x2="224"
                y2={toSvgY(targetY)}
                stroke="#E14B63"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            )}
            <circle cx={currentSvgX} cy={currentSvgY} r="5" fill="#E14B63" />
          </svg>
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="space-y-3">
        {lockedX === undefined ? (
          <SliderControl
            id="sim-x"
            label={data.xLabel || 'ساعات المذاكرة (x)'}
            value={effectiveX}
            min={minX}
            max={maxX}
            step={stepX}
            onChange={(val) => handleParamChange(setX, val)}
          />
        ) : (
          <div className="rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] px-3.5 py-2.5 text-sm font-bold text-[#163A3A]">
            {data.xLabel || 'قيمة الإدخال المثبتة (x)'}:{' '}
            <span dir="ltr" className="font-mono text-[#006E5A]">
              {lockedX}
            </span>
          </div>
        )}

        <SliderControl
          id="sim-w"
          label={data.wLabel || 'الوزن / تأثير الساعة (w)'}
          value={w}
          min={minW}
          max={maxW}
          step={stepW}
          onChange={(val) => handleParamChange(setW, val)}
        />

        <SliderControl
          id="sim-b"
          label={data.bLabel || 'الانحياز / نقطة البداية (b)'}
          value={b}
          min={minB}
          max={maxB}
          step={stepB}
          onChange={(val) => handleParamChange(setB, val)}
        />
      </div>

      {data.targetChallenge && (
        <div className="space-y-3 rounded-xl border border-[#006E5A]/30 bg-[#E5F1EE]/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm sm:text-base font-bold text-[#163A3A]">
              <InlineFormatted text={data.targetChallenge.prompt} />
            </p>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#E14B63] border border-[#E14B63]/30 tabular-nums">
              الهدف: {data.targetChallenge.targetY}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckTarget}
            className="min-h-[48px] w-full rounded-lg bg-[#006E5A] px-4 text-base font-bold text-white hover:bg-[#007a66]"
          >
            تحقق من النموذج
          </button>

          {checkedStatus && (
            <div
              role="status"
              className={`flex items-start gap-2 rounded-lg border p-3 text-sm font-bold ${
                checkedStatus.passed
                  ? 'border-[#006E5A]/40 bg-white text-[#006E5A]'
                  : 'border-[#E14B63]/40 bg-[#FBEAEC] text-[#B91C3C]'
              }`}
            >
              {checkedStatus.passed ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              )}
              <span>{checkedStatus.message}</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function SliderControl({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-bold text-[#163A3A]">
          {label}
        </label>
        <span className="rounded-md bg-white border border-[#E2ECE9] px-2.5 py-0.5 font-mono text-sm font-bold text-[#006E5A] tabular-nums">
          {value}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`تقليل ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - step))}
          className="flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center rounded-lg border border-[#E2ECE9] bg-white text-lg font-bold text-[#163A3A] hover:border-[#006E5A] disabled:opacity-40"
        >
          -
        </button>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-3 flex-1 cursor-pointer accent-[#006E5A]"
        />
        <button
          type="button"
          aria-label={`زيادة ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + step))}
          className="flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center rounded-lg border border-[#E2ECE9] bg-white text-lg font-bold text-[#163A3A] hover:border-[#006E5A] disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mode 2: Trap Detector Simulator
// ---------------------------------------------------------------------------

const SCENE_META: Record<
  TrapDetectorScene,
  { badge: string; Icon: React.ComponentType<{ className?: string }>; frameClass: string }
> = {
  gamePopup: {
    badge: 'رسالة داخل لعبة',
    Icon: Gamepad2,
    frameClass: 'border-[#163A3A]/30 bg-[#F6FAF9]',
  },
  aiChat: {
    badge: 'محادثة مع ذكاء اصطناعي',
    Icon: Bot,
    frameClass: 'border-[#006E5A]/30 bg-[#F6FAF9]',
  },
  newsPost: {
    badge: 'منشور على السوشيال ميديا',
    Icon: Newspaper,
    frameClass: 'border-[#E2ECE9] bg-[#F6FAF9]',
  },
  privacyAlert: {
    badge: 'إشعار صلاحيات وتطبيق',
    Icon: ShieldAlert,
    frameClass: 'border-[#E14B63]/30 bg-[#FBEAEC]/30',
  },
};

function TrapDetectorSim({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: { data: InteractiveTrapDetectorData } & BlockInteractionProps) {
  const [inspectedIds, setInspectedIds] = useState<string[]>([]);
  const [lastClue, setLastClue] = useState<{
    isTrap: boolean;
    clueAr: string;
    tag?: string;
  } | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const traps = data.items.filter((i) => i.isTrap);
  const sig = JSON.stringify({
    prompt: data.prompt,
    cardTitle: data.cardTitle,
    items: data.items.map((i) => i.id),
  });

  useEffect(() => {
    setInspectedIds([]);
    setLastClue(null);
    setAttemptCount(0);
  }, [sig]);

  const foundTrapsCount = traps.filter((t) => inspectedIds.includes(t.id)).length;
  const allTrapsFound = traps.length > 0 && foundTrapsCount >= traps.length;

  const sceneInfo = SCENE_META[data.scene ?? 'privacyAlert'];
  const SceneIcon = sceneInfo.Icon;

  const handleTapItem = (itemId: string) => {
    const item = data.items.find((i) => i.id === itemId);
    if (!item) return;

    onInteract?.();
    setLastClue({
      isTrap: item.isTrap,
      clueAr: item.clueAr,
      tag: item.trapTag,
    });

    if (inspectedIds.includes(itemId)) return;

    const nextInspected = [...inspectedIds, itemId];
    const nextAttempt = attemptCount + 1;
    setInspectedIds(nextInspected);
    setAttemptCount(nextAttempt);

    onAttempt?.({
      isCorrect: item.isTrap,
      attemptNumber: nextAttempt,
      errorKind: item.isTrap ? undefined : 'false_positive_safe_item',
    });

    const nextFoundTraps = traps.filter((t) => nextInspected.includes(t.id)).length;
    if (traps.length > 0 && nextFoundTraps >= traps.length) {
      onComplete?.(true);
    }
  };

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-4 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBEAEC] px-3 py-1 text-xs font-bold text-[#B91C3C]">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>صائد الفخاخ · Trap Detector</span>
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold tabular-nums ${
            allTrapsFound
              ? 'bg-[#E5F1EE] text-[#006E5A]'
              : 'border border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A]'
          }`}
        >
          كشفت {foundTrapsCount} من {traps.length} فخ
        </span>
      </div>

      {data.title && (
        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">{data.title}</h3>
      )}

      <p className="text-base font-bold leading-relaxed text-[#163A3A]">
        <InlineFormatted text={data.prompt} />
      </p>

      {/* Mock Mobile UI Frame */}
      <div className={`rounded-2xl border-2 p-4 space-y-3.5 ${sceneInfo.frameClass}`}>
        <div className="flex items-center justify-between gap-2 border-b border-[#E2ECE9] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-[#E2ECE9] text-[#006E5A]">
              <SceneIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <span className="block text-[11px] font-bold text-[#006E5A]">
                {sceneInfo.badge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-[#163A3A]">
                {data.cardTitle}
              </h4>
            </div>
          </div>
          {data.cardSubtitle && (
            <span className="text-xs font-medium text-[#3B5A58]">
              {data.cardSubtitle}
            </span>
          )}
        </div>

        {data.cardBody && (
          <p className="rounded-xl bg-white p-3 text-sm leading-relaxed text-[#163A3A] border border-[#E2ECE9]">
            <InlineFormatted text={data.cardBody} />
          </p>
        )}

        <div className="space-y-2" role="group" aria-label="عناصر البطاقة القابلة للفحص">
          {data.items.map((item) => {
            const wasInspected = inspectedIds.includes(item.id);
            let classes =
              'border-[#E2ECE9] bg-white text-[#163A3A] hover:border-[#006E5A]';
            if (wasInspected) {
              classes = item.isTrap
                ? 'border-[#E14B63] bg-[#FBEAEC] text-[#163A3A]'
                : 'border-[#006E5A]/40 bg-[#E5F1EE]/60 text-[#163A3A]';
            }

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={wasInspected}
                onClick={() => handleTapItem(item.id)}
                className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-2.5 text-right transition-colors ${classes}`}
              >
                <div className="flex-1 space-y-0.5">
                  <span className="block text-[15px] font-bold">
                    <InlineFormatted text={item.label} />
                  </span>
                  {item.detail && (
                    <span className="block text-xs text-[#3B5A58]">
                      <InlineFormatted text={item.detail} />
                    </span>
                  )}
                </div>

                {wasInspected && (
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      item.isTrap
                        ? 'bg-[#E14B63] text-white'
                        : 'bg-[#006E5A] text-white'
                    }`}
                  >
                    {item.isTrap ? item.trapTag || 'فخ مكشوف ✓' : 'آمن ✓'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {lastClue && (
        <div
          role="status"
          className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-sm ${
            lastClue.isTrap
              ? 'border-[#006E5A]/40 bg-[#E5F1EE] text-[#163A3A]'
              : 'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A]'
          }`}
        >
          {lastClue.isTrap ? (
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#006E5A]" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3B5A58]" aria-hidden="true" />
          )}
          <div className="space-y-0.5">
            {lastClue.tag && (
              <p className="text-xs font-bold text-[#B91C3C]">{lastClue.tag}</p>
            )}
            <p className="font-medium leading-relaxed">
              <InlineFormatted text={lastClue.clueAr} />
            </p>
          </div>
        </div>
      )}

      {allTrapsFound && (
        <div className="flex items-center gap-2 rounded-xl border border-[#006E5A] bg-[#E5F1EE] p-4 text-sm sm:text-base font-bold text-[#163A3A]">
          <Sparkles className="h-5 w-5 shrink-0 text-[#006E5A]" aria-hidden="true" />
          <span>
            {data.completionNote ||
              'بطل! كشفت كل الفخاخ المخادعة وحميت نفسك بذكاء.'}
          </span>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Mode 3: GANs Arena Simulator (المولّد vs المحقّق)
// ---------------------------------------------------------------------------

function GansArenaSim({
  data,
  onAttempt,
  onComplete,
  onInteract,
  className = '',
}: { data: InteractiveGansArenaData } & BlockInteractionProps) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [pickedFooled, setPickedFooled] = useState<boolean | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const rounds = data.rounds;
  const sig = JSON.stringify({
    prompt: data.prompt,
    rounds: rounds.map((r) => r.id),
  });

  useEffect(() => {
    setRoundIdx(0);
    setPickedFooled(null);
    setAttemptCount(0);
    setFinished(false);
  }, [sig]);

  if (rounds.length === 0) return null;

  const currentRound = rounds[Math.min(roundIdx, rounds.length - 1)];
  const isChoiceCorrect =
    pickedFooled !== null && pickedFooled === currentRound.fooledDiscriminator;

  const handleVote = (fooled: boolean) => {
    if (pickedFooled !== null || finished) return;
    const isCorrect = fooled === currentRound.fooledDiscriminator;
    const nextAttempt = attemptCount + 1;

    setPickedFooled(fooled);
    setAttemptCount(nextAttempt);

    onInteract?.();
    onAttempt?.({
      isCorrect,
      attemptNumber: nextAttempt,
    });

    if (roundIdx === rounds.length - 1) {
      setFinished(true);
      onComplete?.(true);
    }
  };

  const handleNextRound = () => {
    if (roundIdx < rounds.length - 1) {
      setRoundIdx((i) => i + 1);
      setPickedFooled(null);
    }
  };

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-4 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
          <Swords className="h-3.5 w-3.5" aria-hidden="true" />
          <span>حلبة GANs · المولّد ضد المحقّق</span>
        </span>
        <span className="rounded-full border border-[#E2ECE9] bg-[#F6FAF9] px-3 py-1 text-xs font-bold text-[#163A3A] tabular-nums">
          الجولة {roundIdx + 1} من {rounds.length}
        </span>
      </div>

      {data.title && (
        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">{data.title}</h3>
      )}

      <p className="text-base font-bold leading-relaxed text-[#163A3A]">
        <InlineFormatted text={data.prompt} />
      </p>

      {/* Dual Agent Header + Realism Convergence Bar */}
      <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
          <span className="text-[#006E5A]">
            {data.generatorLabel || 'المولّد (Generator)'}
          </span>
          <span className="text-[#163A3A]">VS</span>
          <span className="text-[#E14B63]">
            {data.discriminatorLabel || 'المحقّق (Discriminator)'}
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#3B5A58]">
            <span>درجة واقعية المخرج الحالي</span>
            <span className="tabular-nums text-[#006E5A]">
              {currentRound.realismScore}٪
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#E2ECE9]">
            <div
              className="h-full rounded-full bg-[#006E5A] transition-all duration-300"
              style={{ width: `${Math.max(0, Math.min(100, currentRound.realismScore))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Generated Output Inspection Box */}
      <div className="rounded-xl border-2 border-[#163A3A]/20 bg-white p-4 space-y-2">
        <p className="text-xs font-bold text-[#006E5A]">
          مخرج المولّد في الجولة {currentRound.roundNumber}:
        </p>
        <p className="text-base font-bold leading-relaxed text-[#163A3A]">
          <InlineFormatted text={currentRound.generatorOutput} />
        </p>
        {currentRound.visualHint && (
          <p className="rounded-lg bg-[#F6FAF9] px-3 py-2 text-xs sm:text-sm text-[#3B5A58]">
            <InlineFormatted text={currentRound.visualHint} />
          </p>
        )}
      </div>

      {/* Decision buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          type="button"
          disabled={pickedFooled !== null}
          onClick={() => handleVote(false)}
          className={`min-h-[48px] rounded-xl border-2 px-4 py-2.5 text-sm sm:text-base font-bold transition-colors ${
            pickedFooled === false
              ? !currentRound.fooledDiscriminator
                ? 'border-[#006E5A] bg-[#E5F1EE] text-[#163A3A]'
                : 'border-[#E14B63] bg-[#FBEAEC] text-[#163A3A]'
              : 'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#006E5A]'
          }`}
        >
          مكشوف — فيه عيب واضح
        </button>

        <button
          type="button"
          disabled={pickedFooled !== null}
          onClick={() => handleVote(true)}
          className={`min-h-[48px] rounded-xl border-2 px-4 py-2.5 text-sm sm:text-base font-bold transition-colors ${
            pickedFooled === true
              ? currentRound.fooledDiscriminator
                ? 'border-[#006E5A] bg-[#E5F1EE] text-[#163A3A]'
                : 'border-[#E14B63] bg-[#FBEAEC] text-[#163A3A]'
              : 'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#006E5A]'
          }`}
        >
          مقنع — خدع المحقّق!
        </button>
      </div>

      {pickedFooled !== null && (
        <div
          role="status"
          className={`rounded-xl border p-4 space-y-2.5 ${
            isChoiceCorrect
              ? 'border-[#006E5A]/40 bg-[#E5F1EE]'
              : 'border-[#E14B63]/40 bg-[#FBEAEC]'
          }`}
        >
          <div className="flex items-start gap-2">
            {isChoiceCorrect ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#006E5A]" aria-hidden="true" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#E14B63]" aria-hidden="true" />
            )}
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-[#163A3A]">
                {isChoiceCorrect
                  ? currentRound.feedbackCorrect
                  : currentRound.feedbackWrong}
              </p>
              {currentRound.flawCue && (
                <p className="text-xs sm:text-sm text-[#3B5A58]">
                  <InlineFormatted text={currentRound.flawCue} />
                </p>
              )}
            </div>
          </div>

          {roundIdx < rounds.length - 1 ? (
            <button
              type="button"
              onClick={handleNextRound}
              className="min-h-[48px] w-full rounded-lg bg-[#006E5A] px-4 text-sm sm:text-base font-bold text-white hover:bg-[#007a66]"
            >
              الجولة التالية
            </button>
          ) : (
            <div className="rounded-lg bg-white/80 border border-[#006E5A]/30 px-3.5 py-2.5 text-sm font-bold text-[#006E5A]">
              {data.completionNote ||
                'اكتملت الجولات! شايف إزاي المنافسة بين المولّد والمحقّق وصلت النتيجة للواقعية؟'}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Public Discriminated Dispatcher
// ---------------------------------------------------------------------------

export function InteractiveSimBlock({
  data,
  ...interactionProps
}: InteractiveSimBlockProps) {
  switch (data.mode) {
    case 'linearModel':
      return <LinearModelSim data={data} {...interactionProps} />;
    case 'trapDetector':
      return <TrapDetectorSim data={data} {...interactionProps} />;
    case 'gansArena':
      return <GansArenaSim data={data} {...interactionProps} />;
  }
}
