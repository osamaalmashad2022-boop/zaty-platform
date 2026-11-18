'use client';

import React, { useEffect, useState } from 'react';
import { ImageOff, Maximize2, X } from 'lucide-react';
import type { ImageBlockData } from '@/types/curriculum';
import { resolveMediaSrc } from './types';

export interface ImageBlockProps {
  data: ImageBlockData;
  className?: string;
}

export function ImageBlock({ data, className = '' }: ImageBlockProps) {
  const [hasError, setHasError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const resolvedSrc = resolveMediaSrc(data.src);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      <figure
        dir="rtl"
        className={`overflow-hidden rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] ${className}`}
      >
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-lg bg-[#F6FAF9]"
          style={data.aspectRatio ? { aspectRatio: data.aspectRatio } : undefined}
        >
          {!hasError && resolvedSrc ? (
            <>
              <img
                src={resolvedSrc}
                alt={data.alt}
                loading="lazy"
                onError={() => setHasError(true)}
                className="max-h-80 w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={`تكبير الصورة: ${data.alt}`}
                className="absolute bottom-2 left-2 inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#E2ECE9] bg-white/95 px-2.5 py-1.5 text-xs font-bold text-[#163A3A] shadow-sm hover:border-[#006E5A]"
              >
                <Maximize2 className="h-3.5 w-3.5 text-[#006E5A]" aria-hidden="true" />
                <span>تكبير</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-6 text-center text-[#3B5A58]">
              <ImageOff className="h-8 w-8 text-[#006E5A]" aria-hidden="true" />
              <p className="text-sm font-medium text-[#163A3A]">{data.alt}</p>
              <p className="text-xs text-[#3B5A58]">
                الصورة التوضيحية غير محمّلة حاليًا في وضع عدم الاتصال.
              </p>
            </div>
          )}
        </div>

        {data.caption && (
          <figcaption className="mt-3 text-center text-sm leading-relaxed text-[#3B5A58]">
            {data.caption}
          </figcaption>
        )}
      </figure>

      {lightboxOpen && !hasError && resolvedSrc && (
        <div
          dir="rtl"
          role="dialog"
          aria-modal="true"
          aria-label={data.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#163A3A]/85 p-4 backdrop-blur-xs"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl border border-[#E2ECE9] bg-white p-3 sm:p-5 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-[#163A3A]">{data.alt}</p>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="إغلاق تكبير الصورة"
                className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A] hover:border-[#006E5A]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-hidden rounded-xl bg-[#F6FAF9] flex items-center justify-center">
              <img
                src={resolvedSrc}
                alt={data.alt}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            {data.caption && (
              <p className="text-center text-sm text-[#3B5A58]">{data.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
