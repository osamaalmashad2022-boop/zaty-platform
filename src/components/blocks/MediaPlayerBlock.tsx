'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  FileText,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Video,
  Volume2,
  WifiOff,
} from 'lucide-react';
import type { MediaPlayerData } from '@/types/curriculum';
import { formatSecondsClock, resolveMediaSrc } from './types';

export interface MediaPlayerBlockProps {
  data: MediaPlayerData;
  className?: string;
}

const SPEED_OPTIONS = [1, 1.25, 1.5] as const;

function parseVttToPlainText(vtt: string): string {
  return vtt
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      if (trimmed === 'WEBVTT') return false;
      if (/^\d{2}:\d{2}/.test(trimmed) || trimmed.includes('-->')) return false;
      if (/^\d+$/.test(trimmed)) return false;
      return true;
    })
    .join('\n');
}

export function MediaPlayerBlock({ data, className = '' }: MediaPlayerBlockProps) {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(data.durationSec || 0);
  const [playbackRate, setPlaybackRate] = useState<(typeof SPEED_OPTIONS)[number]>(1);
  const [mediaError, setMediaError] = useState(false);
  const [offlineUncached, setOfflineUncached] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [vttFallbackText, setVttFallbackText] = useState<string | null>(null);

  const resolvedSrc = resolveMediaSrc(data.src);
  const resolvedVtt = data.vttSrc ? resolveMediaSrc(data.vttSrc) : undefined;
  const resolvedPoster = data.poster ? resolveMediaSrc(data.poster) : undefined;

  useEffect(() => {
    let active = true;

    async function checkOfflineAvailability() {
      if (typeof window === 'undefined') return;
      const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
      if (!isOnline && 'caches' in window && resolvedSrc) {
        try {
          const match = await caches.match(resolvedSrc);
          if (active && !match) {
            setOfflineUncached(true);
            setShowTranscript(true);
          }
        } catch {
          if (active) {
            setOfflineUncached(true);
            setShowTranscript(true);
          }
        }
      }
    }

    checkOfflineAvailability();
    return () => {
      active = false;
    };
  }, [resolvedSrc]);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (!showTranscript || data.transcript || !resolvedVtt || vttFallbackText !== null) {
      return;
    }
    let active = true;
    fetch(resolvedVtt)
      .then((res) => (res.ok ? res.text() : ''))
      .then((raw) => {
        if (active && raw) {
          setVttFallbackText(parseVttToPlainText(raw));
        }
      })
      .catch(() => {
        // Ignore offline VTT fetch failure
      });
    return () => {
      active = false;
    };
  }, [showTranscript, data.transcript, resolvedVtt, vttFallbackText]);

  const handleSpeedChange = (rate: (typeof SPEED_OPTIONS)[number]) => {
    setPlaybackRate(rate);
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate;
    }
  };

  const handleTogglePlay = async () => {
    const el = mediaRef.current;
    if (!el) return;
    if (el.paused) {
      try {
        await el.play();
        setIsPlaying(true);
      } catch {
        setMediaError(true);
        setShowTranscript(true);
      }
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (nextTime: number) => {
    const el = mediaRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(duration || data.durationSec || 0, nextTime));
    el.currentTime = clamped;
    setCurrentTime(clamped);
  };

  const handleMediaFailure = () => {
    setMediaError(true);
    setIsPlaying(false);
    setShowTranscript(true);
  };

  const effectiveTranscript = data.transcript || vttFallbackText || '';
  const fallbackActive = mediaError || offlineUncached;

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-4 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[#163A3A]">
          {data.kind === 'video' ? (
            <Video className="h-5 w-5 text-[#009179]" aria-hidden="true" />
          ) : (
            <Volume2 className="h-5 w-5 text-[#009179]" aria-hidden="true" />
          )}
          <h3 className="text-base sm:text-lg font-bold">
            {data.title || (data.kind === 'video' ? 'فيديو الشرح' : 'ملخص صوتي')}
          </h3>
        </div>

        <span className="rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#009179]">
          <bdi dir="ltr">{formatSecondsClock(duration || data.durationSec)}</bdi>
        </span>
      </div>

      {fallbackActive && (
        <div
          role="status"
          className="flex items-start gap-2.5 rounded-xl border border-[#E14B63]/30 bg-[#FBEAEC] p-3.5 text-sm text-[#163A3A]"
        >
          <WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-[#E14B63]" aria-hidden="true" />
          <p className="leading-relaxed">
            الملف الصوتي أو المرئي غير متاح حاليًا بدون إنترنت أو تعذّر تشغيله — فتحنا لك{' '}
            <strong>التفريغ النصي الكامل</strong> تلقائيًا تحت علشان تكمل المذاكرة فورًا.
          </p>
        </div>
      )}

      {data.kind === 'video' ? (
        <div className="space-y-3">
          {!fallbackActive && (
            <div className="overflow-hidden rounded-xl bg-[#0F2929] border border-[#1E4745]">
              <video
                ref={(el) => {
                  mediaRef.current = el;
                }}
                src={resolvedSrc}
                controls
                playsInline
                preload="metadata"
                poster={resolvedPoster}
                onError={handleMediaFailure}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onLoadedMetadata={(e) => {
                  if (Number.isFinite(e.currentTarget.duration)) {
                    setDuration(e.currentTarget.duration);
                  }
                }}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                className="aspect-video w-full"
              >
                {resolvedVtt && (
                  <track
                    kind="captions"
                    src={resolvedVtt}
                    srcLang="ar"
                    label="العربية"
                    default
                  />
                )}
              </video>
            </div>
          )}

          {/* Speed controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5" role="group" aria-label="سرعة التشغيل">
              <Gauge className="h-4 w-4 text-[#3B5A58] ml-1" aria-hidden="true" />
              {SPEED_OPTIONS.map((rate) => {
                const active = playbackRate === rate;
                return (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => handleSpeedChange(rate)}
                    className={`min-h-[48px] min-w-[48px] rounded-lg px-3 text-sm font-bold transition-colors ${
                      active
                        ? 'bg-[#009179] text-white'
                        : 'border border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#009179]'
                    }`}
                  >
                    <bdi dir="ltr">{rate}x</bdi>
                  </button>
                );
              })}
            </div>

            {effectiveTranscript && (
              <button
                type="button"
                onClick={() => setShowTranscript((prev) => !prev)}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] px-4 text-sm font-semibold text-[#163A3A] hover:border-[#009179]"
              >
                <FileText className="h-4 w-4 text-[#009179]" aria-hidden="true" />
                <span>{showTranscript ? 'إخفاء التفريغ النصي' : 'عرض التفريغ النصي الكامل'}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3 rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4">
          <audio
            ref={(el) => {
              mediaRef.current = el;
            }}
            preload="metadata"
            src={resolvedSrc}
            onError={handleMediaFailure}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onLoadedMetadata={(e) => {
              if (Number.isFinite(e.currentTarget.duration)) {
                setDuration(e.currentTarget.duration);
              }
            }}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            className="hidden"
          />

          {!fallbackActive && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الصوت'}
                    className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-[#009179] text-white shadow-sm hover:bg-[#007a66]"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Play className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSeek(currentTime - 10)}
                    aria-label="رجوع 10 ثواني"
                    className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-1 rounded-lg border border-[#E2ECE9] bg-white px-2.5 text-xs font-bold text-[#163A3A]"
                  >
                    <RotateCcw className="h-4 w-4 text-[#009179]" aria-hidden="true" />
                    <span>10ث</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSeek(currentTime + 10)}
                    aria-label="تقديم 10 ثواني"
                    className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-1 rounded-lg border border-[#E2ECE9] bg-white px-2.5 text-xs font-bold text-[#163A3A]"
                  >
                    <RotateCw className="h-4 w-4 text-[#009179]" aria-hidden="true" />
                    <span>10ث</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5" role="group" aria-label="سرعة الصوت">
                  {SPEED_OPTIONS.map((rate) => {
                    const active = playbackRate === rate;
                    return (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => handleSpeedChange(rate)}
                        className={`min-h-[48px] min-w-[48px] rounded-lg px-3 text-sm font-bold transition-colors ${
                          active
                            ? 'bg-[#009179] text-white'
                            : 'border border-[#E2ECE9] bg-white text-[#163A3A] hover:border-[#009179]'
                        }`}
                      >
                        <bdi dir="ltr">{rate}x</bdi>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <input
                  type="range"
                  dir="ltr"
                  aria-label="موضع التشغيل الصوتي"
                  min={0}
                  max={duration || data.durationSec || 100}
                  value={Math.min(currentTime, duration || data.durationSec || 100)}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="h-3 w-full cursor-pointer accent-[#009179]"
                />
                <div className="flex items-center justify-between text-xs font-semibold text-[#3B5A58]">
                  <bdi dir="ltr">{formatSecondsClock(currentTime)}</bdi>
                  <bdi dir="ltr">{formatSecondsClock(duration || data.durationSec)}</bdi>
                </div>
              </div>
            </>
          )}

          {effectiveTranscript && (
            <button
              type="button"
              onClick={() => setShowTranscript((prev) => !prev)}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-[#E2ECE9] bg-white px-4 text-sm font-semibold text-[#163A3A] hover:border-[#009179]"
            >
              <FileText className="h-4 w-4 text-[#009179]" aria-hidden="true" />
              <span>{showTranscript ? 'إخفاء التفريغ النصي' : 'عرض التفريغ النصي الكامل'}</span>
            </button>
          )}
        </div>
      )}

      {showTranscript && effectiveTranscript && (
        <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-2">
          <p className="text-sm font-bold text-[#163A3A]">التفريغ النصي الكامل:</p>
          <p className="whitespace-pre-line text-[16px] leading-[1.8] text-[#3B5A58]">
            {effectiveTranscript}
          </p>
        </div>
      )}
    </section>
  );
}
