'use client';

import React from 'react';
import Link from 'next/link';
import { ZatyEmblem } from './ZatyEmblem';

export interface ZatyLogoProps {
  theme?: 'light' | 'dark';
  withTagline?: boolean;
  withLink?: boolean;
  href?: string;
  className?: string;
  emblemSize?: number;
}

/**
 * ZatyLogo (شعار منصة ذاتي الكامل مع النصوص)
 * Production React component for horizontal lockup:
 * - Dazzling 3D Knowledge Prism Emblem
 * - Full Arabic Wordmark: 'ذاتي' (Pure, proud, zero duplicate letters)
 * - Latin Sub-badge: 'ZATY'
 * - Offline-first platform descriptor
 */
export function ZatyLogo({
  theme = 'light',
  withTagline = true,
  withLink = true,
  href = '/',
  className = '',
  emblemSize = 42,
}: ZatyLogoProps) {
  const isDark = theme === 'dark';

  const content = (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      dir="rtl"
    >
      {/* 1. Leading 3D Prism Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <ZatyEmblem size={emblemSize} withSparkAnimation />
      </div>

      {/* 2. Typographic Lockup */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-2">
          {/* Complete Arabic Name: 'ذاتي' */}
          <span
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans ${isDark ? 'text-white' : 'text-[#163A3A]'
              }`}
          >
            ذاتي
          </span>

          {/* Latin Brand Badge: 'ZATY' */}
          <span
            className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wider uppercase ${isDark
                ? 'bg-[#14312E] text-[#00E5C0] border border-[#00D2B2]/40'
                : 'bg-[#E5F1EE] text-[#006E5A]'
              }`}
          >
            ZATY
          </span>
        </div>

        {withTagline && (
          <span
            className={`text-[11px] sm:text-xs font-semibold mt-1 ${isDark ? 'text-[#A3E2D8]' : 'text-[#3B5A58]'
              }`}
          >
            منصة التعلّم الذاتي التفاعلي
          </span>
        )}
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link
        href={href}
        className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-[#006E5A] rounded-lg transition-transform active:scale-[0.98]"
        aria-label="الرئيسية - منصة ذاتي للتعلّم الذاتي"
      >
        {content}
      </Link>
    );
  }

  return content;
}
