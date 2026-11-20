import os
import math

def generate_svg_assets():
    os.makedirs("public/brand", exist_ok=True)
    os.makedirs("src/components/brand", exist_ok=True)

    # =========================================================================
    # CONCEPT 1: THE SMART KNOWLEDGE PRISM (الجوهرة الذكية)
    # Isometric 3D Hex-Prism: Code Face (Left) + Screen Face (Right) + Sky Face (Top)
    # Crowned with the Radiant AI Spark ✦
    # =========================================================================
    c1_emblem = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" fill="none">
  <defs>
    <!-- Top Face: Electric Mint to Radiant Cyan -->
    <linearGradient id="c1-top" x1="45" y1="40" x2="155" y2="105" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#34F5D7" />
      <stop offset="60%" stop-color="#00D2B2" />
      <stop offset="100%" stop-color="#00A896" />
    </linearGradient>

    <!-- Right Face: Royal Emerald to Forest -->
    <linearGradient id="c1-right" x1="100" y1="75" x2="155" y2="170" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00B494" />
      <stop offset="60%" stop-color="#006E5A" />
      <stop offset="100%" stop-color="#02473A" />
    </linearGradient>

    <!-- Left Face: Deep Code Navy / Emerald -->
    <linearGradient id="c1-left" x1="100" y1="105" x2="45" y2="170" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#005B4A" />
      <stop offset="50%" stop-color="#093E34" />
      <stop offset="100%" stop-color="#062620" />
    </linearGradient>

    <!-- Top Highlight Sheen -->
    <linearGradient id="c1-sheen" x1="100" y1="40" x2="100" y2="105" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>

    <!-- Celestial AI Spark Core: Gold to Sunset Amber -->
    <radialGradient id="c1-spark" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF9DB" />
      <stop offset="35%" stop-color="#FFD13B" />
      <stop offset="70%" stop-color="#FF7A59" />
      <stop offset="100%" stop-color="#E13552" />
    </radialGradient>

    <!-- Soft Depth Filter -->
    <filter id="c1-shadow" x="-20%" y="-15%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#002E26" flood-opacity="0.35" />
    </filter>

    <filter id="c1-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#FF7A59" flood-opacity="0.7" />
    </filter>
  </defs>

  <!-- Ambient Light Reflection -->
  <circle cx="100" cy="105" r="75" fill="#00D2B2" fill-opacity="0.12" />

  <!-- Isometric Prism Body -->
  <g filter="url(#c1-shadow)">
    <!-- 1. Left Face (Code Terminal Engine) -->
    <path d="M 100 105 L 100 168 L 46 137 L 46 74 Z" fill="url(#c1-left)" />
    
    <!-- Code prompt symbol `>` embossed on Left Face -->
    <path d="M 64 100 L 78 111 L 64 122" 
          stroke="#00E5C0" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Terminal underline cursor -->
    <path d="M 76 128 L 86 128" 
          stroke="#34F5D7" stroke-width="3.5" stroke-linecap="round" />

    <!-- 2. Right Face (Digital Screen / Knowledge Matrix) -->
    <path d="M 100 105 L 154 74 L 154 137 L 100 168 Z" fill="url(#c1-right)" />
    
    <!-- Micro Knowledge Grid on Right Face -->
    <path d="M 116 98 L 138 85 M 116 114 L 138 101 M 116 130 L 138 117" 
          stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="2" stroke-linecap="round" />

    <!-- 3. Top Face (Sky / Autonomous Learning Plane) -->
    <path d="M 100 42 L 154 74 L 100 105 L 46 74 Z" fill="url(#c1-top)" />
    <path d="M 100 42 L 154 74 L 100 105 L 46 74 Z" stroke="url(#c1-sheen)" stroke-width="1.5" />

    <!-- Isometric Axis Highlights (Beveled edges) -->
    <path d="M 100 42 L 100 105 M 46 74 L 100 105 M 154 74 L 100 105 M 100 105 L 100 168" 
          stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round" />
  </g>

  <!-- Floating Radiant AI Spark ✦ hovering above the prism -->
  <g transform="translate(100, 36)" filter="url(#c1-glow)">
    <!-- 4-point radiant star -->
    <path d="M 0 -18 C 1.2 -5 5 -1.2 18 0 C 5 1.2 1.2 5 0 18 C -1.2 5 -5 1.2 -18 0 C -5 -1.2 -1.2 -5 0 -18 Z"
          fill="url(#c1-spark)" />
    <!-- Pure white energy diamond center -->
    <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
  </g>
</svg>'''

    # =========================================================================
    # CONCEPT 2: THE ASCENDING FLAME (شعلة المعرفة والتمكين)
    # Dual Interlocking Dynamic Ribbons forming a flame / book of wisdom
    # =========================================================================
    c2_emblem = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" fill="none">
  <defs>
    <!-- Left Ribbon Gradient -->
    <linearGradient id="c2-left" x1="40" y1="140" x2="110" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#02473A" />
      <stop offset="45%" stop-color="#006E5A" />
      <stop offset="100%" stop-color="#00D2B2" />
    </linearGradient>

    <!-- Right Ribbon Gradient -->
    <linearGradient id="c2-right" x1="160" y1="140" x2="90" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#008A70" />
      <stop offset="50%" stop-color="#00D2B2" />
      <stop offset="100%" stop-color="#67FCE4" />
    </linearGradient>

    <!-- Star Radiant Core -->
    <radialGradient id="c2-spark" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF9DB" />
      <stop offset="40%" stop-color="#FFA800" />
      <stop offset="100%" stop-color="#FF5A1F" />
    </radialGradient>

    <filter id="c2-shadow" x="-20%" y="-15%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#00352B" flood-opacity="0.3" />
    </filter>
  </defs>

  <circle cx="100" cy="105" r="75" fill="#00E5C0" fill-opacity="0.1" />

  <g filter="url(#c2-shadow)">
    <!-- Base Foundation Curve (Book Platform) -->
    <path d="M 50 148 C 75 142 125 142 150 148 C 145 156 120 162 100 162 C 80 162 55 156 50 148 Z" 
          fill="#005B4A" />

    <!-- Left Wing / Ascending Path -->
    <path d="M 54 142 C 48 110 65 72 98 48 C 96 68 85 95 80 115 C 75 130 68 140 54 142 Z" 
          fill="url(#c2-left)" />

    <!-- Right Wing / Dynamic Ribbon (Overlaps harmoniously) -->
    <path d="M 146 142 C 152 108 135 68 102 48 C 104 70 115 95 120 115 C 125 130 132 140 146 142 Z" 
          fill="url(#c2-right)" />

    <!-- Inner Code Chevron Curve `<` -->
    <path d="M 90 92 L 100 80 L 110 92" 
          stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.8" />
  </g>

  <!-- Crown AI Star -->
  <g transform="translate(100, 34)">
    <path d="M 0 -16 C 1 -4 4 -1 16 0 C 4 1 1 4 0 16 C -1 4 -4 1 -16 0 C -4 -1 -1 -4 0 -16 Z" 
          fill="url(#c2-spark)" />
    <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
  </g>
</svg>'''

    # =========================================================================
    # CONCEPT 3: THE MASTER ARCHITECTURAL 'ذ' MONOGRAM (حرف الذال المعماري النقي)
    # A single, authentic, flawless geometric curve. No clutter. No duplicates.
    # =========================================================================
    c3_emblem = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" fill="none">
  <defs>
    <!-- Master Calligraphic Gradient -->
    <linearGradient id="c3-grad" x1="50" y1="150" x2="140" y2="50" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#005B4A" />
      <stop offset="40%" stop-color="#008A72" />
      <stop offset="75%" stop-color="#00D2B2" />
      <stop offset="100%" stop-color="#34F5D7" />
    </linearGradient>

    <!-- Star Core -->
    <radialGradient id="c3-spark" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF9DB" />
      <stop offset="30%" stop-color="#FFD13B" />
      <stop offset="70%" stop-color="#FF7A59" />
      <stop offset="100%" stop-color="#E13552" />
    </radialGradient>

    <filter id="c3-shadow" x="-20%" y="-15%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#00352B" flood-opacity="0.32" />
    </filter>
  </defs>

  <circle cx="100" cy="105" r="75" fill="#00D2B2" fill-opacity="0.08" />

  <!-- The Architectural 'ذ' Monogram -->
  <g filter="url(#c3-shadow)">
    <!-- Single Pure Elegant Sweep:
         Starts from bottom horizon (x=50, y=142),
         extends smoothly to corner (x=136, y=142),
         rounds with golden radius,
         and ascents gracefully to apex (x=120, y=62) -->
    <path d="M 54 142 L 132 142 C 144 142 149 135 144 124 L 118 64" 
          stroke="url(#c3-grad)" 
          stroke-width="22" 
          stroke-linecap="round" 
          stroke-linejoin="round" />

    <!-- Pure inner sheen line -->
    <path d="M 64 142 L 130 142 C 137 142 140 137 137 129 L 116 75" 
          stroke="#FFFFFF" 
          stroke-width="3" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-opacity="0.5" />
  </g>

  <!-- The AI Spark ✦ Dot of the 'ذ' -->
  <!-- Positioned at optimal calligraphic balance (x=114, y=32) -->
  <g transform="translate(114, 32)">
    <path d="M 0 -17 C 1.2 -4.5 4.5 -1.2 17 0 C 4.5 1.2 1.2 4.5 0 17 C -1.2 4.5 -4.5 1.2 -17 0 C -4.5 -1.2 -1.2 -4.5 0 -17 Z" 
          fill="url(#c3-spark)" />
    <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
  </g>
</svg>'''

    # Save standalone emblem files
    with open("public/brand/concept-1-prism.svg", "w", encoding="utf-8") as f:
        f.write(c1_emblem)
    with open("public/brand/concept-2-flame.svg", "w", encoding="utf-8") as f:
        f.write(c2_emblem)
    with open("public/brand/concept-3-monogram.svg", "w", encoding="utf-8") as f:
        f.write(c3_emblem)

    # Set Concept 1 (Prism) as the official default zaty-emblem.svg
    with open("public/brand/zaty-emblem.svg", "w", encoding="utf-8") as f:
        f.write(c1_emblem)

    # =========================================================================
    # HORIZONTAL LOCKUPS (Wordmark + Emblem) - 480x120 viewBox
    # THE NAME IS PROUDLY AND COMPLETELY "ذاتي" - ZERO CUTTING! ZERO DUPLICATION!
    # =========================================================================
    def build_lockup(emblem_snippet, is_dark=False):
        text_color = "#FFFFFF" if is_dark else "#163A3A"
        badge_bg = "#163A3A" if is_dark else "#E5F1EE"
        badge_border = 'stroke="#00D2B2" stroke-width="1"' if is_dark else ''
        badge_text = "#00D2B2" if is_dark else "#006E5A"
        sub_color = "#A3D4CC" if is_dark else "#3B5A58"

        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 120" width="500" height="120" fill="none">
  <!-- Right/Leading Emblem in RTL (x: 380, y: 10, scale: 0.5) -->
  <g transform="translate(380, 10) scale(0.5)">
    {emblem_snippet}
  </g>

  <!-- Complete, Proud Arabic Wordmark: 'ذاتي' -->
  <text x="365" y="70" 
        font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
        font-size="46" 
        font-weight="800" 
        text-anchor="end" 
        fill="{text_color}" 
        letter-spacing="-0.5">ذاتي</text>

  <!-- Latin Submark Badge: 'ZATY' -->
  <rect x="230" y="38" width="58" height="25" rx="6" fill="{badge_bg}" {badge_border} />
  <text x="259" y="55" 
        font-family="'JetBrains Mono', 'Segoe UI', monospace" 
        font-size="12" 
        font-weight="700" 
        text-anchor="middle" 
        fill="{badge_text}" 
        letter-spacing="1">ZATY</text>

  <!-- Descriptor Subtitle -->
  <text x="365" y="100" 
        font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
        font-size="15" 
        font-weight="600" 
        text-anchor="end" 
        fill="{sub_color}">منصة التعلّم الذاتي التفاعلي</text>

  <!-- Offline Feature Hint -->
  <circle cx="160" cy="95" r="3" fill="#00D2B2" />
  <text x="148" y="100" 
        font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
        font-size="13" 
        font-weight="700" 
        text-anchor="end" 
        fill="#00D2B2">بدون إنترنت</text>
</svg>'''

    # Extract inner SVGs (without the outer <svg> wrapper) for embedding
    def get_inner(svg_str):
        start = svg_str.find(">") + 1
        end = svg_str.rfind("</svg>")
        return svg_str[start:end]

    inner_c1 = get_inner(c1_emblem)
    inner_c2 = get_inner(c2_emblem)
    inner_c3 = get_inner(c3_emblem)

    # Save active brand lockups
    with open("public/brand/zaty-logo-horizontal.svg", "w", encoding="utf-8") as f:
        f.write(build_lockup(inner_c1, is_dark=False))
    with open("public/brand/zaty-logo-dark.svg", "w", encoding="utf-8") as f:
        f.write(build_lockup(inner_c1, is_dark=True))

    with open("public/brand/lockup-1-light.svg", "w", encoding="utf-8") as f:
        f.write(build_lockup(inner_c1, is_dark=False))
    with open("public/brand/lockup-1-dark.svg", "w", encoding="utf-8") as f:
        f.write(build_lockup(inner_c1, is_dark=True))

    with open("public/brand/lockup-2-light.svg", "w", encoding="utf-8") as f:
        f.write(build_lockup(inner_c2, is_dark=False))
    with open("public/brand/lockup-2-dark.svg", "w", encoding="utf-8") as f:
        f.write(build_lockup(inner_c2, is_dark=True))

    with open("public/brand/lockup-3-light.svg", "w", encoding="utf-8") as f:
        f.write(build_lockup(inner_c3, is_dark=False))
    with open("public/brand/lockup-3-dark.svg", "w", encoding="utf-8") as f:
        f.write(build_lockup(inner_c3, is_dark=True))

    # =========================================================================
    # PWA SQUIRCLE APP ICON (src/app/icon.svg & public/brand/zaty-icon-512.png)
    # =========================================================================
    pwa_icon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="pwa-bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#02332A" />
      <stop offset="50%" stop-color="#006E5A" />
      <stop offset="100%" stop-color="#004D3F" />
    </linearGradient>
    <linearGradient id="pwa-rim" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5C0" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#006E5A" stop-opacity="0.1" />
    </linearGradient>
  </defs>

  <!-- iOS / Android Squircle Base (512x512, rx=116) -->
  <rect width="512" height="512" rx="116" fill="url(#pwa-bg)" />
  <rect x="2" y="2" width="508" height="508" rx="114" stroke="url(#pwa-rim)" stroke-width="4" />

  <!-- Centered Prism Emblem -->
  <g transform="translate(106, 96) scale(1.5)">
    {inner_c1}
  </g>
</svg>'''

    with open("src/app/icon.svg", "w", encoding="utf-8") as f:
        f.write(pwa_icon_svg)

    # =========================================================================
    # SOCIAL SHARE IMAGE (public/og-image.svg) - 1200x630
    # Safe zone for WhatsApp 600x600 in center!
    # =========================================================================
    og_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" fill="none">
  <defs>
    <linearGradient id="og-bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#03261F" />
      <stop offset="45%" stop-color="#053B32" />
      <stop offset="100%" stop-color="#0B1A17" />
    </linearGradient>

    <radialGradient id="og-glow" cx="600" cy="315" r="450" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00D2B2" stop-opacity="0.22" />
      <stop offset="70%" stop-color="#006E5A" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <filter id="og-card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="630" fill="url(#og-bg)" />
  <rect width="1200" height="630" fill="url(#og-glow)" />

  <!-- Modern Subtle Grid -->
  <path d="M 0 100 H 1200 M 0 200 H 1200 M 0 300 H 1200 M 0 400 H 1200 M 0 500 H 1200" 
        stroke="#FFFFFF" stroke-opacity="0.03" stroke-width="1" />
  <path d="M 200 0 V 630 M 400 0 V 630 M 600 0 V 630 M 800 0 V 630 M 1000 0 V 630" 
        stroke="#FFFFFF" stroke-opacity="0.03" stroke-width="1" />

  <!-- Center Card (Fits within WhatsApp 600x600 square crop: x: 300 to 900) -->
  <g filter="url(#og-card-shadow)">
    <!-- Central Glassmorphism Card -->
    <rect x="250" y="55" width="700" height="520" rx="28" 
          fill="#062F27" fill-opacity="0.75" 
          stroke="#00E5C0" stroke-opacity="0.3" stroke-width="2" />

    <!-- Centered Emblem (scale 1.1) -->
    <g transform="translate(490, 75) scale(1.1)">
      {inner_c1}
    </g>

    <!-- Brand Title: 'ذاتي' -->
    <text x="600" y="325" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="62" 
          font-weight="800" 
          text-anchor="middle" 
          fill="#FFFFFF" 
          letter-spacing="-1">ذاتي · Zaty</text>

    <!-- Subtitle / Hook -->
    <text x="600" y="375" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="24" 
          font-weight="700" 
          text-anchor="middle" 
          fill="#34F5D7">منصة التعلّم الذاتي التفاعلي</text>

    <text x="600" y="415" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="18" 
          font-weight="500" 
          text-anchor="middle" 
          fill="#D1EAE5">الشهادة الإعدادية · بايثون، ذكاء اصطناعي وأمن سيبراني</text>

    <!-- 3 Advantage Badges -->
    <g transform="translate(340, 450)">
      <!-- Badge 1: Offline -->
      <rect x="0" y="0" width="160" height="42" rx="10" fill="#0E4238" stroke="#00D2B2" stroke-width="1.2" />
      <text x="80" y="27" font-family="'IBM Plex Sans Arabic', sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="#00E5C0">⚡ بدون إنترنت</text>

      <!-- Badge 2: Real Python -->
      <rect x="180" y="0" width="160" height="42" rx="10" fill="#0E4238" stroke="#00D2B2" stroke-width="1.2" />
      <text x="260" y="27" font-family="'IBM Plex Sans Arabic', sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="#00E5C0">🐍 تشغيل بايثون</text>

      <!-- Badge 3: 100% Free -->
      <rect x="360" y="0" width="160" height="42" rx="10" fill="#0E4238" stroke="#00D2B2" stroke-width="1.2" />
      <text x="440" y="27" font-family="'IBM Plex Sans Arabic', sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="#00E5C0">🎯 مجاني بالكامل</text>
    </g>
  </g>
</svg>'''

    with open("public/og-image.svg", "w", encoding="utf-8") as f:
        f.write(og_svg)

    print("All SVGs created successfully!")

if __name__ == "__main__":
    generate_svg_assets()
