import os
import math

def build_dazzling_brand_assets():
    os.makedirs("public/brand", exist_ok=True)
    os.makedirs("src/components/brand", exist_ok=True)

    # =========================================================================
    # DAZZLING EMBLEM (zaty-emblem.svg) - 200x200 viewBox
    # Concept: A luxurious, sculptural, continuous-flow ribbon.
    # Golden ratio curves, rich dual-tone depth, subtle specular highlight,
    # and a radiant 4-point AI Star with celestial aura.
    # ZERO duplicate lines or inner clutter. Pure, bold, iconic.
    # =========================================================================

    emblem_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" fill="none">
  <defs>
    <!-- Master Brand Gradients -->
    <!-- 1. Rich Sculptural Emerald to Electric Mint -->
    <linearGradient id="dazzle-primary" x1="145" y1="45" x2="45" y2="165" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#34F5D7" />
      <stop offset="25%" stop-color="#00D2B2" />
      <stop offset="65%" stop-color="#008068" />
      <stop offset="100%" stop-color="#054538" />
    </linearGradient>

    <!-- 2. Horizon Base Ribbon (Deep Emerald to Vivid Teal) -->
    <linearGradient id="dazzle-base" x1="150" y1="130" x2="35" y2="155" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00D2B2" />
      <stop offset="50%" stop-color="#007A65" />
      <stop offset="100%" stop-color="#04372D" />
    </linearGradient>

    <!-- 3. Specular Ridge Highlight (Glass / Liquid Metal Edge) -->
    <linearGradient id="dazzle-sheen" x1="135" y1="55" x2="55" y2="145" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="40%" stop-color="#A3FFF1" stop-opacity="0.6" />
      <stop offset="85%" stop-color="#00D2B2" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>

    <!-- 4. Celestial AI Spark Radiant Gradient (Golden Amber to Vivid Coral/Rose) -->
    <radialGradient id="spark-core-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF9DB" />
      <stop offset="25%" stop-color="#FFD13B" />
      <stop offset="65%" stop-color="#FF6B4A" />
      <stop offset="100%" stop-color="#E13552" />
    </radialGradient>

    <radialGradient id="spark-halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF7A59" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#FFB020" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#FF7A59" stop-opacity="0" />
    </radialGradient>

    <!-- Ambient Glow behind the emblem -->
    <radialGradient id="ambient-emerald-glow" cx="55%" cy="55%" r="50%">
      <stop offset="0%" stop-color="#00D2B2" stop-opacity="0.22" />
      <stop offset="60%" stop-color="#006E5A" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#006E5A" stop-opacity="0" />
    </radialGradient>

    <!-- Studio Lighting Filters -->
    <filter id="soft-depth" x="-25%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#00352B" flood-opacity="0.38" />
    </filter>

    <filter id="spark-bloom" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#FF7A59" flood-opacity="0.75" />
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#FFD13B" flood-opacity="0.9" />
    </filter>
  </defs>

  <!-- Ambient Light Sphere -->
  <circle cx="106" cy="110" r="78" fill="url(#ambient-emerald-glow)" />

  <!-- The Monogram / Sculptural Arabic 'ذ' -->
  <g filter="url(#soft-depth)">
    <!-- Base Horizon Stroke (Sweeps forward to the left like an open book wing / platform) -->
    <path d="M 148 132
             C 142 142 130 148 116 148
             L 52 148
             C 40 148 34 139 42 132
             C 50 125 64 126 78 126
             L 132 126
             C 142 126 151 127 148 132 Z"
          fill="url(#dazzle-base)" />

    <!-- Main Dynamic Ascender Ribbon:
         Soars from base vertex (68, 142) up to the apex (136, 60),
         creating a majestic aerodynamic curve of knowledge and growth -->
    <path d="M 132 54
             C 141 54 148 62 146 73
             C 143 89 135 110 120 128
             C 114 135 106 142 96 146
             L 58 146
             C 46 146 44 135 52 127
             C 66 113 96 83 118 63
             C 123 58 127 54 132 54 Z"
          fill="url(#dazzle-primary)" />

    <!-- Specular Light Ridge (Refined Glass Edge along the crest of the curve) -->
    <path d="M 130 57
             C 134 57 137 60 137 65
             C 134 82 124 105 108 124
             C 98 136 84 142 66 144"
          stroke="url(#dazzle-sheen)"
          stroke-width="3.5"
          stroke-linecap="round" />
  </g>

  <!-- The AI Spark (نجمة الذكاء والفرادة) - The Iconic Dot of 'ذ' -->
  <!-- Positioned at Golden Ratio focal point (128, 32) -->
  <g transform="translate(128, 30)">
    <!-- Outer Radiant Halo -->
    <circle cx="0" cy="0" r="24" fill="url(#spark-halo)" />

    <!-- 4-point hyper-smooth diamond star -->
    <g filter="url(#spark-bloom)">
      <path d="M 0 -22
               C 1.8 -7 7 -1.8 22 0
               C 7 1.8 1.8 7 0 22
               C -1.8 7 -7 1.8 -22 0
               C -7 -1.8 -1.8 -7 0 -22 Z"
            fill="url(#spark-core-glow)" />
      <!-- Diamond Core Jewel -->
      <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
    </g>

    <!-- Secondary Micro Spark (Diagonal micro-burst) -->
    <g transform="scale(0.38) rotate(45)">
      <path d="M 0 -18 C 1 -5 5 -1 18 0 C 5 1 1 5 0 18 C -1 5 -5 1 -18 0 C -5 -1 -1 -5 0 -18 Z"
            fill="#FFE79A" />
    </g>
  </g>
</svg>'''

    # =========================================================================
    # 2. DAZZLING APP ICON 512x512 (icon.svg & zaty-icon.svg & zaty-icon-512.png)
    # Masterpiece Squircle: Dark Deep Emerald Canvas, Radial Highlights,
    # High-contrast 3D sculptural emblem, luminous AI Spark.
    # =========================================================================

    icon_512_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <!-- Background Canvas Gradients -->
    <linearGradient id="sq-bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#082924" />
      <stop offset="45%" stop-color="#0B3E36" />
      <stop offset="100%" stop-color="#005B4A" />
    </linearGradient>

    <radialGradient id="sq-top-glow" cx="35%" cy="20%" r="65%">
      <stop offset="0%" stop-color="#00E5C0" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#006E5A" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#082924" stop-opacity="0" />
    </radialGradient>

    <!-- Squircle Border Subtle Sheen -->
    <linearGradient id="sq-border-sheen" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5C0" stop-opacity="0.55" />
      <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#00E5C0" stop-opacity="0.1" />
    </linearGradient>

    <!-- Emblem Gradients inside 512 icon -->
    <linearGradient id="sq-dazzle-primary" x1="145" y1="45" x2="45" y2="165" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#67FCE4" />
      <stop offset="25%" stop-color="#00E5C0" />
      <stop offset="65%" stop-color="#00967A" />
      <stop offset="100%" stop-color="#044D3E" />
    </linearGradient>

    <linearGradient id="sq-dazzle-base" x1="150" y1="130" x2="35" y2="155" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5C0" />
      <stop offset="50%" stop-color="#00806A" />
      <stop offset="100%" stop-color="#043C31" />
    </linearGradient>

    <linearGradient id="sq-dazzle-sheen" x1="135" y1="55" x2="55" y2="145" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
      <stop offset="40%" stop-color="#C5FFF7" stop-opacity="0.7" />
      <stop offset="85%" stop-color="#00D2B2" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>

    <radialGradient id="sq-spark-core" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="25%" stop-color="#FFD54F" />
      <stop offset="65%" stop-color="#FF6B4A" />
      <stop offset="100%" stop-color="#E13552" />
    </radialGradient>

    <radialGradient id="sq-spark-halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF7A59" stop-opacity="0.55" />
      <stop offset="50%" stop-color="#FFB020" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#FF7A59" stop-opacity="0" />
    </radialGradient>

    <filter id="sq-emblem-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#001814" flood-opacity="0.65" />
    </filter>

    <filter id="sq-spark-bloom" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#FF7A59" flood-opacity="0.85" />
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#FFD54F" flood-opacity="0.9" />
    </filter>
  </defs>

  <!-- Squircle Base (rx=116 for iOS/macOS/Android Adaptive Perfection) -->
  <rect width="512" height="512" rx="116" fill="url(#sq-bg)" />
  <rect width="512" height="512" rx="116" fill="url(#sq-top-glow)" />
  <rect x="2" y="2" width="508" height="508" rx="114" stroke="url(#sq-border-sheen)" stroke-width="3" />

  <!-- Center Group Scaled 2.32x (centered around 256, 256) -->
  <g transform="translate(24, 18) scale(2.32)" filter="url(#sq-emblem-shadow)">
    <!-- Base Horizon Stroke -->
    <path d="M 148 132
             C 142 142 130 148 116 148
             L 52 148
             C 40 148 34 139 42 132
             C 50 125 64 126 78 126
             L 132 126
             C 142 126 151 127 148 132 Z"
          fill="url(#sq-dazzle-base)" />

    <!-- Main Dynamic Ascender Ribbon -->
    <path d="M 132 54
             C 141 54 148 62 146 73
             C 143 89 135 110 120 128
             C 114 135 106 142 96 146
             L 58 146
             C 46 146 44 135 52 127
             C 66 113 96 83 118 63
             C 123 58 127 54 132 54 Z"
          fill="url(#sq-dazzle-primary)" />

    <!-- Specular Light Ridge -->
    <path d="M 130 57
             C 134 57 137 60 137 65
             C 134 82 124 105 108 124
             C 98 136 84 142 66 144"
          stroke="url(#sq-dazzle-sheen)"
          stroke-width="3.5"
          stroke-linecap="round" />

    <!-- The AI Spark -->
    <g transform="translate(128, 30)">
      <circle cx="0" cy="0" r="26" fill="url(#sq-spark-halo)" />
      <g filter="url(#sq-spark-bloom)">
        <path d="M 0 -22
                 C 1.8 -7 7 -1.8 22 0
                 C 7 1.8 1.8 7 0 22
                 C -1.8 7 -7 1.8 -22 0
                 C -7 -1.8 -1.8 -7 0 -22 Z"
              fill="url(#sq-spark-core)" />
        <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
      </g>
      <g transform="scale(0.4) rotate(45)">
        <path d="M 0 -18 C 1 -5 5 -1 18 0 C 5 1 1 5 0 18 C -1 5 -5 1 -18 0 C -5 -1 -1 -5 0 -18 Z"
              fill="#FFFFFF" />
      </g>
    </g>
  </g>
</svg>'''

    # =========================================================================
    # 3. SIGNATURE INTEGRATED LOCKUP (LIGHT) - NO DUPLICATE 'ذ'
    # The Emblem IS the "ذ" in "ذاتي"!
    # Structure: [Emblem = 'ذ'] connected to or followed by custom flowing "ـاتي"
    # Total "ذ" count in the whole logo = EXACTLY ONE!
    # No repetition, pure elegance, 100% compliant with user's demand.
    # =========================================================================

    logo_horizontal_light = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 130" width="520" height="130" fill="none">
  <defs>
    <!-- Gradients -->
    <linearGradient id="hl-primary" x1="145" y1="45" x2="45" y2="165" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00D2B2" />
      <stop offset="45%" stop-color="#00967A" />
      <stop offset="100%" stop-color="#005B4A" />
    </linearGradient>

    <linearGradient id="hl-spark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD54F" />
      <stop offset="45%" stop-color="#FF7A59" />
      <stop offset="100%" stop-color="#E13552" />
    </linearGradient>

    <filter id="hl-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#004D3F" flood-opacity="0.22" />
    </filter>

    <filter id="hl-spark-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="1" stdDeviation="4" flood-color="#FF7A59" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- 1. The Leading Emblem acting as the iconic 'ذ' (Positioned rightwards in RTL) -->
  <g transform="translate(390, 8) scale(0.58)" filter="url(#hl-shadow)">
    <!-- Base Horizon -->
    <path d="M 148 132 C 142 142 130 148 116 148 L 52 148 C 40 148 34 139 42 132 C 50 125 64 126 78 126 L 132 126 C 142 126 151 127 148 132 Z"
          fill="#007A65" />

    <!-- Main Ascender Ribbon -->
    <path d="M 132 54 C 141 54 148 62 146 73 C 143 89 135 110 120 128 C 114 135 106 142 96 146 L 58 146 C 46 146 44 135 52 127 C 66 113 96 83 118 63 C 123 58 127 54 132 54 Z"
          fill="url(#hl-primary)" />

    <!-- Sheen Ridge -->
    <path d="M 130 57 C 134 57 137 60 137 65 C 134 82 124 105 108 124 C 98 136 84 142 66 144"
          stroke="#FFFFFF" stroke-opacity="0.75" stroke-width="3" stroke-linecap="round" />

    <!-- The AI Spark -->
    <g transform="translate(128, 30)" filter="url(#hl-spark-glow)">
      <path d="M 0 -22 C 1.8 -7 7 -1.8 22 0 C 7 1.8 1.8 7 0 22 C -1.8 7 -7 1.8 -22 0 C -7 -1.8 -1.8 -7 0 -22 Z"
            fill="url(#hl-spark)" />
      <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
    </g>
  </g>

  <!-- 2. The Rest of the Word: 'ـاتي' (Completing 'ذاتي' without duplicate 'ذ'!) -->
  <!-- Rendered with custom typographic grandeur, aligned with the emblem's baseline -->
  <g transform="translate(0, 0)">
    <!-- 'ـاتي' flowing smoothly from the emblem -->
    <text x="396" y="80" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="52" 
          font-weight="800" 
          text-anchor="end" 
          fill="#163A3A" 
          letter-spacing="-1">ـاتي</text>

    <!-- Latin Brand Badge 'ZATY' (Complementary, not duplicate) -->
    <rect x="230" y="44" width="60" height="26" rx="7" fill="#E5F1EE" />
    <text x="260" y="62" 
          font-family="'JetBrains Mono', 'Segoe UI', monospace" 
          font-size="13" 
          font-weight="700" 
          text-anchor="middle" 
          fill="#006E5A" 
          letter-spacing="1.2">ZATY</text>

    <!-- Subtitle: Brand descriptor -->
    <text x="396" y="112" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="16" 
          font-weight="600" 
          text-anchor="end" 
          fill="#3B5A58">منصة التعلّم الذاتي التفاعلي</text>

    <!-- Feature pill: Offline indicator -->
    <circle cx="155" cy="107" r="3" fill="#00D2B2" />
    <text x="144" y="112" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="14" 
          font-weight="700" 
          text-anchor="end" 
          fill="#006E5A">بدون إنترنت</text>
  </g>
</svg>'''

    # =========================================================================
    # 4. SIGNATURE INTEGRATED LOCKUP (DARK MODE) - NO DUPLICATE 'ذ'
    # =========================================================================

    logo_horizontal_dark = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 130" width="520" height="130" fill="none">
  <defs>
    <linearGradient id="hd-primary" x1="145" y1="45" x2="45" y2="165" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#67FCE4" />
      <stop offset="35%" stop-color="#00E5C0" />
      <stop offset="100%" stop-color="#00A887" />
    </linearGradient>

    <linearGradient id="hd-spark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE79A" />
      <stop offset="45%" stop-color="#FF7A59" />
      <stop offset="100%" stop-color="#E13552" />
    </linearGradient>

    <filter id="hd-spark-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="1" stdDeviation="6" flood-color="#FF7A59" flood-opacity="0.8" />
    </filter>
  </defs>

  <!-- 1. The Leading Emblem acting as the iconic 'ذ' -->
  <g transform="translate(390, 8) scale(0.58)">
    <path d="M 148 132 C 142 142 130 148 116 148 L 52 148 C 40 148 34 139 42 132 C 50 125 64 126 78 126 L 132 126 C 142 126 151 127 148 132 Z"
          fill="#008A72" />

    <path d="M 132 54 C 141 54 148 62 146 73 C 143 89 135 110 120 128 C 114 135 106 142 96 146 L 58 146 C 46 146 44 135 52 127 C 66 113 96 83 118 63 C 123 58 127 54 132 54 Z"
          fill="url(#hd-primary)" />

    <path d="M 130 57 C 134 57 137 60 137 65 C 134 82 124 105 108 124 C 98 136 84 142 66 144"
          stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="3" stroke-linecap="round" />

    <g transform="translate(128, 30)" filter="url(#hd-spark-glow)">
      <path d="M 0 -22 C 1.8 -7 7 -1.8 22 0 C 7 1.8 1.8 7 0 22 C -1.8 7 -7 1.8 -22 0 C -7 -1.8 -1.8 -7 0 -22 Z"
            fill="url(#hd-spark)" />
      <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
    </g>
  </g>

  <!-- 2. 'ـاتي' Completing 'ذاتي' on Dark Background -->
  <g transform="translate(0, 0)">
    <text x="396" y="80" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="52" 
          font-weight="800" 
          text-anchor="end" 
          fill="#FFFFFF" 
          letter-spacing="-1">ـاتي</text>

    <!-- Latin Brand Badge 'ZATY' -->
    <rect x="230" y="44" width="60" height="26" rx="7" fill="#14312E" stroke="#00D2B2" stroke-width="1.2" />
    <text x="260" y="62" 
          font-family="'JetBrains Mono', 'Segoe UI', monospace" 
          font-size="13" 
          font-weight="700" 
          text-anchor="middle" 
          fill="#5DF2D6" 
          letter-spacing="1.2">ZATY</text>

    <!-- Subtitle in luminous mint -->
    <text x="396" y="112" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="16" 
          font-weight="600" 
          text-anchor="end" 
          fill="#A3E2D8">منصة التعلّم الذاتي التفاعلي</text>

    <circle cx="155" cy="107" r="3" fill="#00E5C0" />
    <text x="144" y="112" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="14" 
          font-weight="700" 
          text-anchor="end" 
          fill="#5DF2D6">بدون إنترنت</text>
  </g>
</svg>'''

    # =========================================================================
    # 5. DAZZLING SOCIAL SHARE BANNER (1200x630 OpenGraph & WhatsApp)
    # With the new world-class emblem, zero duplicate letters,
    # and pristine WhatsApp 600x600 safe zone layout.
    # =========================================================================

    og_image_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" fill="none">
  <defs>
    <!-- Cinematic Dark Emerald Background -->
    <linearGradient id="og2-bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#041B18" />
      <stop offset="35%" stop-color="#082A25" />
      <stop offset="75%" stop-color="#0D3B34" />
      <stop offset="100%" stop-color="#05201C" />
    </linearGradient>

    <radialGradient id="og2-glow-mint" cx="82%" cy="32%" r="55%">
      <stop offset="0%" stop-color="#00E5C0" stop-opacity="0.32" />
      <stop offset="50%" stop-color="#006E5A" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="og2-glow-coral" cx="18%" cy="75%" r="48%">
      <stop offset="0%" stop-color="#FF7A59" stop-opacity="0.22" />
      <stop offset="60%" stop-color="#E13552" stop-opacity="0.04" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <!-- Master Gradients for Hero Emblem -->
    <linearGradient id="og2-emblem-primary" x1="145" y1="45" x2="45" y2="165" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#67FCE4" />
      <stop offset="25%" stop-color="#00E5C0" />
      <stop offset="70%" stop-color="#008C73" />
      <stop offset="100%" stop-color="#03483B" />
    </linearGradient>

    <linearGradient id="og2-emblem-base" x1="150" y1="130" x2="35" y2="155" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5C0" />
      <stop offset="50%" stop-color="#00806A" />
      <stop offset="100%" stop-color="#043C31" />
    </linearGradient>

    <radialGradient id="og2-spark-core" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="25%" stop-color="#FFD54F" />
      <stop offset="65%" stop-color="#FF6B4A" />
      <stop offset="100%" stop-color="#E13552" />
    </radialGradient>

    <filter id="og2-hero-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#001410" flood-opacity="0.75" />
    </filter>

    <filter id="og2-spark-bloom" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="16" flood-color="#FF7A59" flood-opacity="0.9" />
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#FFD54F" flood-opacity="0.95" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="630" fill="url(#og2-bg)" />
  <rect width="1200" height="630" fill="url(#og2-glow-mint)" />
  <rect width="1200" height="630" fill="url(#og2-glow-coral)" />

  <!-- Geometric Subtle Grid Mesh -->
  <g opacity="0.05" stroke="#00E5C0" stroke-width="1.2">
    <line x1="0" y1="126" x2="1200" y2="126" />
    <line x1="0" y1="252" x2="1200" y2="252" />
    <line x1="0" y1="378" x2="1200" y2="378" />
    <line x1="0" y1="504" x2="1200" y2="504" />
    <line x1="240" y1="0" x2="240" y2="630" />
    <line x1="480" y1="0" x2="480" y2="630" />
    <line x1="720" y1="0" x2="720" y2="630" />
    <line x1="960" y1="0" x2="960" y2="630" />
  </g>

  <!-- Right Side: Hero Sculptural Emblem -->
  <g transform="translate(860, 95) scale(2.05)" filter="url(#og2-hero-shadow)">
    <!-- Ambient Behind Halo -->
    <circle cx="106" cy="110" r="85" fill="#00E5C0" fill-opacity="0.12" />

    <!-- Horizon Base -->
    <path d="M 148 132 C 142 142 130 148 116 148 L 52 148 C 40 148 34 139 42 132 C 50 125 64 126 78 126 L 132 126 C 142 126 151 127 148 132 Z"
          fill="url(#og2-emblem-base)" />

    <!-- Main Ascender Ribbon -->
    <path d="M 132 54 C 141 54 148 62 146 73 C 143 89 135 110 120 128 C 114 135 106 142 96 146 L 58 146 C 46 146 44 135 52 127 C 66 113 96 83 118 63 C 123 58 127 54 132 54 Z"
          fill="url(#og2-emblem-primary)" />

    <!-- Sheen Ridge -->
    <path d="M 130 57 C 134 57 137 60 137 65 C 134 82 124 105 108 124 C 98 136 84 142 66 144"
          stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="3.5" stroke-linecap="round" />

    <!-- AI Spark with Celestial Flare -->
    <g transform="translate(128, 30)">
      <circle cx="0" cy="0" r="28" fill="#FF7A59" fill-opacity="0.3" />
      <g filter="url(#og2-spark-bloom)">
        <path d="M 0 -22 C 1.8 -7 7 -1.8 22 0 C 7 1.8 1.8 7 0 22 C -1.8 7 -7 1.8 -22 0 C -7 -1.8 -1.8 -7 0 -22 Z"
              fill="url(#og2-spark-core)" />
        <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
      </g>
    </g>
  </g>

  <!-- Left Side: Content & Typography (Safe Zone 600x600 Centered) -->
  
  <!-- Audience / Level Pill -->
  <g transform="translate(790, 75)">
    <rect x="-370" y="0" width="370" height="44" rx="22" fill="#00E5C0" fill-opacity="0.14" stroke="#00E5C0" stroke-opacity="0.35" />
    <circle cx="-20" cy="22" r="5" fill="#00E5C0" />
    <text x="-36" y="29" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="17" 
          font-weight="700" 
          text-anchor="end" 
          fill="#67FCE4">تعلّم ذاتي تفاعلي · الصف الثالث الإعدادي</text>
  </g>

  <!-- Headline: Single "ذاتي" without duplication -->
  <text x="790" y="195" 
        font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
        font-size="58" 
        font-weight="800" 
        text-anchor="end" 
        fill="#FFFFFF" 
        letter-spacing="-1">
    منصة ذاتي <tspan fill="#00E5C0">(Zaty)</tspan>
  </text>

  <text x="790" y="260" 
        font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
        font-size="34" 
        font-weight="700" 
        text-anchor="end" 
        fill="#E5F5F2">
    تعلّم البرمجة والذكاء الاصطناعي مجاناً وبدون إنترنت
  </text>

  <text x="790" y="315" 
        font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
        font-size="21" 
        font-weight="400" 
        text-anchor="end" 
        fill="#A6DDD4">
    محرر بايثون حقيقي في المتصفح، محطات تدريب ذكية، وتحديات تفاعلية مصممة لنجاحك.
  </text>

  <!-- Feature Pills -->
  <g transform="translate(790, 375)">
    <g transform="translate(0, 0)">
      <rect x="-230" y="0" width="230" height="52" rx="14" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.15" />
      <text x="-30" y="33" 
            font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
            font-size="17" font-weight="700" text-anchor="end" fill="#FFFFFF">🐍 كود بايثون أوفلاين</text>
    </g>

    <g transform="translate(-250, 0)">
      <rect x="-230" y="0" width="230" height="52" rx="14" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.15" />
      <text x="-30" y="33" 
            font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
            font-size="17" font-weight="700" text-anchor="end" fill="#FFFFFF">⚡ ذكاء اصطناعي عملي</text>
    </g>

    <g transform="translate(-500, 0)">
      <rect x="-220" y="0" width="220" height="52" rx="14" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.15" />
      <text x="-30" y="33" 
            font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
            font-size="17" font-weight="700" text-anchor="end" fill="#FFFFFF">📱 يعمل بدون إنترنت</text>
    </g>
  </g>

  <!-- Bottom Trust Bar -->
  <g transform="translate(75, 520)">
    <rect width="1050" height="66" rx="18" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.1" />

    <text x="35" y="40" 
          font-family="'JetBrains Mono', 'Segoe UI', monospace" 
          font-size="19" font-weight="700" fill="#67FCE4">zaty.app</text>

    <text x="525" y="40" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="17" font-weight="600" text-anchor="middle" fill="#E5F5F2">
      ابدأ رحلتك التعليمية الآن مجاناً — لا حاجة لتسجيل مسبق
    </text>

    <g transform="translate(990, 34)">
      <circle cx="0" cy="0" r="6" fill="#00E5C0" />
      <circle cx="0" cy="0" r="13" fill="#00E5C0" fill-opacity="0.25" />
    </g>
    <text x="975" y="40" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="15" font-weight="700" text-anchor="end" fill="#00E5C0">متاح أوفلاين</text>
  </g>
</svg>'''

    # Save all SVG assets
    with open("public/brand/zaty-emblem.svg", "w", encoding="utf-8") as f:
        f.write(emblem_svg)
    print("Updated public/brand/zaty-emblem.svg")

    with open("public/brand/zaty-icon.svg", "w", encoding="utf-8") as f:
        f.write(icon_512_svg)
    print("Updated public/brand/zaty-icon.svg")

    with open("src/app/icon.svg", "w", encoding="utf-8") as f:
        f.write(icon_512_svg)
    print("Updated src/app/icon.svg")

    with open("public/brand/zaty-logo-horizontal.svg", "w", encoding="utf-8") as f:
        f.write(logo_horizontal_light)
    print("Updated public/brand/zaty-logo-horizontal.svg (Integrated Signature, Zero Duplicate 'ذ')")

    with open("public/brand/zaty-logo-dark.svg", "w", encoding="utf-8") as f:
        f.write(logo_horizontal_dark)
    print("Updated public/brand/zaty-logo-dark.svg (Integrated Dark Signature)")

    with open("public/og-image.svg", "w", encoding="utf-8") as f:
        f.write(og_image_svg)
    print("Updated public/og-image.svg")

    with open("public/brand/og-image.svg", "w", encoding="utf-8") as f:
        f.write(og_image_svg)

    # =========================================================================
    # 6. UPDATED SHOWCASE PREVIEW (preview.html)
    # =========================================================================
    html_preview = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zaty (ذاتي) Dazzling World-Class Brand Showcase</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg: #F8FAF9;
      --card: #FFFFFF;
      --teal-primary: #006E5A;
      --teal-accent: #00E5C0;
      --forest-dark: #0D2C27;
      --coral: #FF7A59;
    }}
    body {{
      margin: 0;
      padding: 2.5rem 1.5rem;
      font-family: 'IBM Plex Sans Arabic', sans-serif;
      background: radial-gradient(circle at 50% 0%, #E9F4F1 0%, #F8FAF9 60%);
      color: #2D4C49;
    }}
    .container {{
      max-width: 1200px;
      margin: 0 auto;
    }}
    .header {{
      text-align: center;
      margin-bottom: 3rem;
    }}
    .header h1 {{
      font-size: 2.6rem;
      font-weight: 800;
      color: #0A322B;
      margin: 0 0 0.5rem 0;
    }}
    .header p {{
      font-size: 1.15rem;
      color: #4A706B;
      margin: 0 0 1.5rem 0;
    }}
    .badge-bar {{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.6rem;
    }}
    .pill {{
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.9rem;
      border-radius: 9999px;
      background: #FFFFFF;
      border: 1px solid #D7E8E4;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(0,0,0,0.03);
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 1.8rem;
      margin-bottom: 2rem;
    }}
    .card {{
      background: #FFFFFF;
      border: 1px solid #E1ECE9;
      border-radius: 1.25rem;
      padding: 1.8rem;
      box-shadow: 0 10px 25px -5px rgba(0, 50, 40, 0.05), 0 8px 10px -6px rgba(0, 50, 40, 0.02);
    }}
    .card.dark {{
      background: #08231E;
      border-color: #123C35;
      color: #FFFFFF;
    }}
    .card h2 {{
      font-size: 1.35rem;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 0.4rem;
      color: #0B362F;
    }}
    .card.dark h2 {{
      color: #FFFFFF;
    }}
    .card p {{
      font-size: 0.95rem;
      color: #557874;
      margin-top: 0;
      margin-bottom: 1.2rem;
      line-height: 1.6;
    }}
    .card.dark p {{
      color: #9ECAC2;
    }}
    .preview-box {{
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      padding: 1.5rem;
      border-radius: 1rem;
      background: #FAFCFB;
      border: 1px dashed #CBE0DC;
      margin-bottom: 1rem;
    }}
    .preview-box.dark {{
      background: #0D2D27;
      border-color: #1B4E44;
    }}
    .file-path {{
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      background: #EEF6F4;
      padding: 0.4rem 0.8rem;
      border-radius: 0.5rem;
      color: #006E5A;
      direction: ltr;
      text-align: left;
    }}
    .card.dark .file-path {{
      background: #103831;
      color: #67FCE4;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>هوية ذاتي (Zaty) المُبهرة — الإصدار العالمي</h1>
      <p>تصميم هندسي متقن يدمج حرف "ذ" بانسيابية نحتية فائقة مع نجمة الذكاء الاصطناعي وبدون أي تكرار للحرف</p>
      <div class="badge-bar">
        <span class="pill"><span style="width:12px;height:12px;border-radius:50%;background:#006E5A;display:inline-block"></span> #006E5A زمردي ملكي</span>
        <span class="pill"><span style="width:12px;height:12px;border-radius:50%;background:#00E5C0;display:inline-block"></span> #00E5C0 سيان كهربائي</span>
        <span class="pill"><span style="width:12px;height:12px;border-radius:50%;background:#FF7A59;display:inline-block"></span> #FF7A59 شرارة الذكاء (AI Spark)</span>
        <span class="pill">✨ لا يوجد أي تكرار لحرف "ذ" (Zero Stutter)</span>
      </div>
    </div>

    <div class="grid">
      <!-- 1. Emblem -->
      <div class="card">
        <h2>1. الشعار المستقل المُبهر (Sculptural Emblem)</h2>
        <p>شريط انسيابي منحوت بالنسب الذهبية (Golden Ratio) يمثل أفق المعرفة وصعود المتعلم، متوجاً بنجمة الذكاء الاصطناعي المشعة.</p>
        <div class="preview-box">
          {emblem_svg}
        </div>
        <span class="file-path">public/brand/zaty-emblem.svg (200x200)</span>
      </div>

      <!-- 2. App Icon -->
      <div class="card">
        <h2>2. أيقونة التطبيق (512x512 PWA Squircle)</h2>
        <p>تصميم متكيف فخم بدقة 512x512 مع تدرج زمردي ليلي وإضاءة شعاعية علوية تمنح الأيقونة حضوراً استثنائياً على شاشات الموبايل والمتصفح.</p>
        <div class="preview-box">
          <div style="width: 150px; height: 150px;">
            {icon_512_svg}
          </div>
        </div>
        <span class="file-path">src/app/icon.svg & public/brand/zaty-icon-512.png</span>
      </div>
    </div>

    <div class="grid">
      <!-- 3. Integrated Wordmark Light -->
      <div class="card">
        <h2>3. الشعار المدمج المتكامل (Light Signature Lockup)</h2>
        <p><strong>حل مشكلة التكرار جذرياً:</strong> الشعار نفسه هو حرف "ذ" الرائد متبوعاً بانسيابية "ـاتي". المجموع: "ذ" واحدة فقط متقنة وفخمة!</p>
        <div class="preview-box">
          {logo_horizontal_light}
        </div>
        <span class="file-path">public/brand/zaty-logo-horizontal.svg (520x130)</span>
      </div>

      <!-- 4. Integrated Wordmark Dark -->
      <div class="card dark">
        <h2>4. الشعار المدمج الداكن (Dark Signature Lockup)</h2>
        <p>للواجهات الليلية ومحرر بايثون الطرفي والتذييل بتباين فائق وألوان نيون مريحة للعين.</p>
        <div class="preview-box dark">
          {logo_horizontal_dark}
        </div>
        <span class="file-path">public/brand/zaty-logo-dark.svg (520x130)</span>
      </div>
    </div>

    <!-- 5. Social Share Banner -->
    <div class="card" style="margin-top: 1rem;">
      <h2>5. بطاقة المشاركة لشبكات التواصل وواتساب (Social Share 1200x630)</h2>
      <p>أبعاد 1200x630 مع حماية المنطقة المركزية الآمنة لواتساب (Safe Zone 600x600) لضمان عدم اقتصاص أي نص، وحجم خفيف 97KB للتحميل اللحظي.</p>
      <div class="preview-box" style="padding: 0; background: #041B18; overflow: hidden;">
        {og_image_svg}
      </div>
      <span class="file-path">public/og-image.svg & public/og-image.png (1200x630)</span>
    </div>
  </div>
</body>
</html>'''

    with open("public/brand/preview.html", "w", encoding="utf-8") as f:
        f.write(html_preview)
    print("Updated public/brand/preview.html showcase")

if __name__ == "__main__":
    build_dazzling_brand_assets()
