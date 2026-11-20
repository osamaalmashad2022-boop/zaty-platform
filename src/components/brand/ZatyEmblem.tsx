'use client';

import React from 'react';

export interface ZatyEmblemProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  withSparkAnimation?: boolean;
  className?: string;
}

/**
 * ZatyEmblem (شعار منصة ذاتي المستقل — التصميم الأول المعتمد النقي)
 * Single Unified Calligraphic Ribbon of 'ذ':
 * - Base ribbon and back spine forming 'ذ' with open book & growth curve
 * - Radiant 4-point AI Star (✦) with gold-to-coral gradient and diamond core
 * - ZERO duplicate strokes (no inner duplicate 'ذ')
 * - Rich emerald and mint gradients
 */
export function ZatyEmblem({
  size = 40,
  withSparkAnimation = false,
  className = '',
  ...props
}: ZatyEmblemProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-label="شعار منصة ذاتي"
      role="img"
      {...props}
    >
      <defs>
        {/* Primary Emerald/Mint Brand Gradient */}
        <linearGradient
          id="emblem-teal-react"
          x1="120"
          y1="40"
          x2="40"
          y2="160"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00E5C0" />
          <stop offset="35%" stopColor="#00A887" />
          <stop offset="80%" stopColor="#006E5A" />
          <stop offset="100%" stopColor="#094A3D" />
        </linearGradient>

        {/* Top Surface Luster Sheen */}
        <linearGradient
          id="emblem-sheen-react"
          x1="112"
          y1="56"
          x2="148"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#67FCE4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* AI Spark Warm Energy Gradient */}
        <linearGradient
          id="spark-gold-coral-react"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="40%" stopColor="#FF7A59" />
          <stop offset="100%" stopColor="#E14B63" />
        </linearGradient>

        {/* Soft Depth Filter */}
        <filter
          id="emblem-shadow-react"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="8"
            floodColor="#004A3C"
            floodOpacity="0.32"
          />
        </filter>

        <filter
          id="spark-glow-react"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="6"
            floodColor="#FF7A59"
            floodOpacity="0.55"
          />
        </filter>
      </defs>

      {/* Ambient Learning Glow */}
      <circle cx="102" cy="106" r="72" fill="#00D2B2" fillOpacity="0.08" />
      <circle cx="102" cy="106" r="50" fill="#006E5A" fillOpacity="0.05" />

      {/* Arabic 'ذ' Calligraphic Tech Body (Pure Single Unified Ribbon - ZERO Duplicate 'ذ') */}
      <g filter="url(#emblem-shadow-react)">
        {/* Base ribbon & back spine forming 'ذ' with open book & growth curve */}
        <path
          d="M 112 56
             C 120 56 128 62 131 72
             C 137 92 144 114 148 126
             C 151 135 146 142 136 143
             L 58 143
             C 44 143 38 131 46 122
             C 48 120 54 117 62 117
             L 122 117
             C 124 117 125 115 124 112
             L 106 72
             C 103 64 106 56 112 56 Z"
          fill="url(#emblem-teal-react)"
        />

        {/* Subtle elegant edge highlight along the outer crest */}
        <path
          d="M 112 58 C 122 60 130 68 133 76 C 139 96 146 116 148 126"
          stroke="url(#emblem-sheen-react)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* The AI Spark / Dot of 'ذ' (نجمة الشغف والذكاء الاصطناعي) */}
      <g
        transform="translate(114, 32)"
        filter="url(#spark-glow-react)"
        className={withSparkAnimation ? 'animate-pulse' : ''}
      >
        <path
          d="M 0 -22
             C 1.5 -7 7 -1.5 22 0
             C 7 1.5 1.5 7 0 22
             C -1.5 7 -7 1.5 -22 0
             C -7 -1.5 -1.5 -7 0 -22 Z"
          fill="url(#spark-gold-coral-react)"
        />
        <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
      </g>

      {/* Micro Satellite Spark */}
      <g transform="translate(156, 88) scale(0.4)">
        <path
          d="M 0 -18 C 1 -5 5 -1 18 0 C 5 1 1 5 0 18 C -1 5 -5 1 -18 0 C -5 -1 -1 -5 0 -18 Z"
          fill="#00E5C0"
          fillOpacity="0.85"
        />
      </g>
    </svg>
  );
}
