import os

def render_original_design_pure():
    os.makedirs("public/brand", exist_ok=True)
    os.makedirs("src/components/brand", exist_ok=True)

    # 1. The pure first emblem (NO second inner 'ذ'!)
    pure_emblem_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" fill="none">
  <defs>
    <!-- Primary Emerald/Mint Brand Gradient -->
    <linearGradient id="emblem-teal" x1="120" y1="40" x2="40" y2="160" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5C0" />
      <stop offset="35%" stop-color="#00A887" />
      <stop offset="80%" stop-color="#006E5A" />
      <stop offset="100%" stop-color="#094A3D" />
    </linearGradient>

    <!-- Top Surface Luster Sheen (Smooth gradient reflection on the curve, not a second stroke) -->
    <linearGradient id="emblem-sheen" x1="112" y1="56" x2="148" y2="140" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#67FCE4" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>

    <!-- AI Spark Warm Energy Gradient -->
    <linearGradient id="spark-gold-coral" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD54F" />
      <stop offset="40%" stop-color="#FF7A59" />
      <stop offset="100%" stop-color="#E14B63" />
    </linearGradient>

    <!-- Soft Depth Filter -->
    <filter id="emblem-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#004A3C" flood-opacity="0.32" />
    </filter>

    <filter id="spark-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#FF7A59" flood-opacity="0.55" />
    </filter>
  </defs>

  <!-- Ambient Learning Glow -->
  <circle cx="102" cy="106" r="72" fill="#00D2B2" fill-opacity="0.08" />
  <circle cx="102" cy="106" r="50" fill="#006E5A" fill-opacity="0.05" />

  <!-- Arabic 'ذ' Calligraphic Tech Body (Pure Single Unified Ribbon - ZERO Duplicate 'ذ') -->
  <g filter="url(#emblem-shadow)">
    <!-- Base ribbon & back spine forming 'ذ' with open book & growth curve -->
    <path d="M 112 56
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
          fill="url(#emblem-teal)" />

    <!-- Subtle elegant edge highlight along the outer crest (adds 3D polish without drawing another letter) -->
    <path d="M 112 58 C 122 60 130 68 133 76 C 139 96 146 116 148 126"
          stroke="url(#emblem-sheen)"
          stroke-width="2.5"
          stroke-linecap="round" />
  </g>

  <!-- The AI Spark / Dot of 'ذ' (نجمة الشغف والذكاء الاصطناعي) -->
  <g transform="translate(114, 32)" filter="url(#spark-glow)">
    <!-- 4-point radiant diamond star with organic concaves -->
    <path d="M 0 -22
             C 1.5 -7 7 -1.5 22 0
             C 7 1.5 1.5 7 0 22
             C -1.5 7 -7 1.5 -22 0
             C -7 -1.5 -1.5 -7 0 -22 Z"
          fill="url(#spark-gold-coral)" />
    <!-- Center white core for brilliance -->
    <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
  </g>

  <!-- Micro Satellite Spark (curiosity / interactivity) -->
  <g transform="translate(156, 88) scale(0.4)">
    <path d="M 0 -18 C 1 -5 5 -1 18 0 C 5 1 1 5 0 18 C -1 5 -5 1 -18 0 C -5 -1 -1 -5 0 -18 Z"
          fill="#00E5C0"
          fill-opacity="0.85" />
  </g>
</svg>'''

    # Save zaty-emblem.svg
    with open("public/brand/zaty-emblem.svg", "w", encoding="utf-8") as f:
        f.write(pure_emblem_svg)

    # 2. Extract inner snippet for lockup
    start = pure_emblem_svg.find(">") + 1
    end = pure_emblem_svg.rfind("</svg>")
    inner_emblem = pure_emblem_svg[start:end]

    # 3. Horizontal Lockup (Light & Dark)
    # The Arabic Name is full and proud: 'ذاتي'
    def build_lockup(is_dark=False):
        text_color = "#FFFFFF" if is_dark else "#163A3A"
        badge_bg = "#163A3A" if is_dark else "#E5F1EE"
        badge_border = 'stroke="#00D2B2" stroke-width="1"' if is_dark else ''
        badge_text = "#00D2B2" if is_dark else "#006E5A"
        sub_color = "#A3D4CC" if is_dark else "#3B5A58"

        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 120" width="500" height="120" fill="none">
  <!-- Right/Leading Emblem in RTL (x: 380, y: 10, scale: 0.5) -->
  <g transform="translate(380, 10) scale(0.5)">
    {inner_emblem}
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

    with open("public/brand/zaty-logo-horizontal.svg", "w", encoding="utf-8") as f:
        f.write(build_lockup(is_dark=False))
    with open("public/brand/zaty-logo-dark.svg", "w", encoding="utf-8") as f:
        f.write(build_lockup(is_dark=True))

    # 4. PWA Squircle App Icon (src/app/icon.svg)
    pwa_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
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

  <rect width="512" height="512" rx="116" fill="url(#pwa-bg)" />
  <rect x="2" y="2" width="508" height="508" rx="114" stroke="url(#pwa-rim)" stroke-width="4" />

  <g transform="translate(106, 96) scale(1.5)">
    {inner_emblem}
  </g>
</svg>'''

    with open("src/app/icon.svg", "w", encoding="utf-8") as f:
        f.write(pwa_svg)

    # 5. Social Share Banner (1200x630) for WhatsApp and Social Media
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

  <rect width="1200" height="630" fill="url(#og-bg)" />
  <rect width="1200" height="630" fill="url(#og-glow)" />

  <path d="M 0 100 H 1200 M 0 200 H 1200 M 0 300 H 1200 M 0 400 H 1200 M 0 500 H 1200" 
        stroke="#FFFFFF" stroke-opacity="0.03" stroke-width="1" />
  <path d="M 200 0 V 630 M 400 0 V 630 M 600 0 V 630 M 800 0 V 630 M 1000 0 V 630" 
        stroke="#FFFFFF" stroke-opacity="0.03" stroke-width="1" />

  <!-- Center Safe Card (600x600 WhatsApp Safe Zone: x: 300 to 900) -->
  <g filter="url(#og-card-shadow)">
    <rect x="250" y="55" width="700" height="520" rx="28" 
          fill="#062F27" fill-opacity="0.75" 
          stroke="#00E5C0" stroke-opacity="0.3" stroke-width="2" />

    <g transform="translate(490, 75) scale(1.1)">
      {inner_emblem}
    </g>

    <text x="600" y="325" 
          font-family="'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif" 
          font-size="62" 
          font-weight="800" 
          text-anchor="middle" 
          fill="#FFFFFF" 
          letter-spacing="-1">ذاتي · Zaty</text>

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

    <g transform="translate(340, 450)">
      <rect x="0" y="0" width="160" height="42" rx="10" fill="#0E4238" stroke="#00D2B2" stroke-width="1.2" />
      <text x="80" y="27" font-family="'IBM Plex Sans Arabic', sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="#00E5C0">⚡ بدون إنترنت</text>

      <rect x="180" y="0" width="160" height="42" rx="10" fill="#0E4238" stroke="#00D2B2" stroke-width="1.2" />
      <text x="260" y="27" font-family="'IBM Plex Sans Arabic', sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="#00E5C0">🐍 تشغيل بايثون</text>

      <rect x="360" y="0" width="160" height="42" rx="10" fill="#0E4238" stroke="#00D2B2" stroke-width="1.2" />
      <text x="440" y="27" font-family="'IBM Plex Sans Arabic', sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="#00E5C0">🎯 مجاني بالكامل</text>
    </g>
  </g>
</svg>'''

    with open("public/og-image.svg", "w", encoding="utf-8") as f:
        f.write(og_svg)

    print("Pure original design generated successfully!")

if __name__ == "__main__":
    render_original_design_pure()
