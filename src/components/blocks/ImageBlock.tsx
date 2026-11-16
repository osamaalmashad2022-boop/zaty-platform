'use client';

import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import type { ImageBlockData } from '@/types/curriculum';
import { resolveMediaSrc } from './types';

export interface ImageBlockProps {
  data: ImageBlockData;
  className?: string;
}

export function ImageBlock({ data, className = '' }: ImageBlockProps) {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = resolveMediaSrc(data.src);

  return (
    <figure
      dir="rtl"
      className={`overflow-hidden rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] ${className}`}
    >
      <div
        className="flex items-center justify-center overflow-hidden rounded-lg bg-[#F6FAF9]"
        style={data.aspectRatio ? { aspectRatio: data.aspectRatio } : undefined}
      >
        {!hasError && resolvedSrc ? (
          <img
            src={resolvedSrc}
            alt={data.alt}
            loading="lazy"
            onError={() => setHasError(true)}
            className="max-h-80 w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-6 text-center text-[#3B5A58]">
            <ImageOff className="h-8 w-8 text-[#009179]" aria-hidden="true" />
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
  );
}
