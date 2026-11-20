import os

def build_preview_adopted_html():
    os.makedirs("public/brand", exist_ok=True)

    def read_svg(path):
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                return f.read()
        return ""

    emblem_svg = read_svg("public/brand/zaty-emblem.svg")
    lockup_light = read_svg("public/brand/zaty-logo-horizontal.svg")
    lockup_dark = read_svg("public/brand/zaty-logo-dark.svg")
    og_svg = read_svg("public/og-image.svg")
    pwa_icon_svg = read_svg("src/app/icon.svg")

    html = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الهوية البصرية وشعار منصة «ذاتي» المعتمد (Zaty Official Brand)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --primary: #006E5A;
      --primary-dark: #004D3F;
      --accent: #00D2B2;
      --bg: #F8FAF9;
      --card-bg: #FFFFFF;
      --border: #E2ECE9;
      --text-main: #163A3A;
      --text-muted: #3B5A58;
      --spark: #FF7A59;
    }}

    [data-theme="dark"] {{
      --bg: #071916;
      --card-bg: #0D2622;
      --border: #18423B;
      --text-main: #FFFFFF;
      --text-muted: #A3D4CC;
    }}

    * {{ box-sizing: border-box; }}

    body {{
      margin: 0;
      padding: 2.5rem 1.5rem;
      font-family: 'IBM Plex Sans Arabic', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg);
      color: var(--text-main);
      transition: background-color 0.25s ease, color 0.25s ease;
      line-height: 1.6;
    }}

    .container {{
      max-width: 1200px;
      margin: 0 auto;
    }}

    .top-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border);
    }}

    .hero-title {{
      font-size: 2.2rem;
      font-weight: 800;
      margin: 0;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }}

    .theme-toggle-btn {{
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.25rem;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 9999px;
      font-family: inherit;
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text-main);
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      transition: all 0.2s ease;
    }}

    .badges-bar {{
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 2.5rem;
    }}

    .pill {{
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.1rem;
      border-radius: 9999px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      font-size: 0.9rem;
      font-weight: 700;
      box-shadow: 0 2px 5px rgba(0,0,0,0.03);
    }}
    .pill.success {{
      border-color: #10B981;
      color: #059669;
    }}
    .pill.spark {{
      border-color: #FF7A59;
      color: #EA580C;
    }}

    /* Main Showcase Grid */
    .showcase-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
    }}
    @media (max-width: 860px) {{
      .showcase-grid {{ grid-template-columns: 1fr; }}
    }}

    .card {{
      background: var(--card-bg);
      border: 1.5px solid var(--border);
      border-radius: 1.5rem;
      padding: 2rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.04);
    }}

    .emblem-display {{
      width: 180px;
      height: 180px;
      margin: 1.5rem auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle, rgba(0, 210, 178, 0.1) 0%, transparent 70%);
      border-radius: 50%;
    }}
    .emblem-display svg {{
      width: 100%;
      height: 100%;
    }}

    .lockup-box {{
      background: #FFFFFF;
      border: 1px solid #E2ECE9;
      border-radius: 1.25rem;
      padding: 1.5rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }}
    .lockup-box.dark {{
      background: #0B1E1B;
      border-color: #163E38;
    }}
    .lockup-box svg {{
      max-width: 100%;
      height: 75px;
    }}

    /* Simulators */
    .sim-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }}

    /* WhatsApp Simulator */
    .whatsapp-bubble {{
      background: #FFFFFF;
      border-radius: 12px;
      padding: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      max-width: 380px;
      margin: 1rem auto;
      border: 1px solid #E0E0E0;
    }}
    .whatsapp-card {{
      border-radius: 8px;
      overflow: hidden;
      background: #F0F2F5;
      border: 1px solid #E4E6EB;
    }}
    .whatsapp-img-container {{
      width: 100%;
      aspect-ratio: 1.91 / 1;
      background: #062F27;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }}
    .whatsapp-img-container svg {{
      width: 100%;
      height: 100%;
    }}
    .whatsapp-meta {{
      padding: 10px 12px;
    }}
    .whatsapp-site {{
      font-size: 11px;
      text-transform: uppercase;
      color: #65676B;
      font-weight: 600;
      margin-bottom: 2px;
    }}
    .whatsapp-title {{
      font-size: 14px;
      font-weight: 700;
      color: #050505;
      margin-bottom: 4px;
      line-height: 1.3;
    }}
    .whatsapp-snippet {{
      font-size: 12px;
      color: #65676B;
      line-height: 1.4;
    }}

    /* Phone Screen Mockup */
    .phone-screen {{
      width: 280px;
      height: 200px;
      background: linear-gradient(135deg, #1A3038 0%, #0F1F24 100%);
      border-radius: 2rem;
      margin: 1rem auto;
      padding: 1.5rem 1rem;
      border: 3px solid #334E57;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 15px 35px rgba(0,0,0,0.25);
    }}
    .app-icon-squircle {{
      width: 72px;
      height: 72px;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 8px 18px rgba(0,0,0,0.4);
      margin-bottom: 0.5rem;
    }}
    .app-icon-squircle svg {{
      width: 100%;
      height: 100%;
    }}

    .header-sim {{
      background: #FFFFFF;
      border: 1px solid #E2ECE9;
      border-radius: 1rem;
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }}
  </style>
</head>
<body>

<div class="container">
  <!-- Top Bar -->
  <header class="top-bar">
    <div>
      <h1 class="hero-title">
        <span>✨</span>
        <span>شعار وهوية «ذاتي» المعتمد (النسخة النقية بدون تكرار)</span>
      </h1>
      <p style="margin: 0.4rem 0 0 0; color: var(--text-muted);">
        التصميم الأصلي الأول المعتمد: شريط انسيابي نقي لحرف "ذ" يدمج أفق التعلم مع نجمة الذكاء ✦، وبدون أي خطوط داخلية مكررة.
      </p>
    </div>

    <button class="theme-toggle-btn" onclick="toggleTheme()">
      <span id="theme-icon">🌙</span>
      <span id="theme-text">الوضع الداكن</span>
    </button>
  </header>

  <!-- Badges -->
  <div class="badges-bar">
    <div class="pill success">
      <span>✓</span>
      <span>التصميم الأول الأصلي المعتمد</span>
    </div>
    <div class="pill spark">
      <span>✨</span>
      <span>تم حذف "ذ" الداخلية تماماً — صفر تكرار</span>
    </div>
    <div class="pill">
      <span>📖</span>
      <span>الاسم يظهر كاملاً ومستقلاً: <strong>«ذاتي»</strong></span>
    </div>
    <div class="pill">
      <span>💬</span>
      <span>منطقة أمان 600×600 لواتساب لظهور كامل في المحادثات</span>
    </div>
  </div>

  <!-- Showcase 2 Columns: Emblem & Lockup -->
  <div class="showcase-grid">
    <!-- Emblem -->
    <div class="card">
      <h2 style="margin-top:0; font-size:1.4rem;">١. الرمز المستقل (Standalone Emblem)</h2>
      <p style="color:var(--text-muted); font-size:0.95rem;">
        شريط انسيابي نقي وموحد يمثل حرف «ذ» وقاعدة الكتاب المفتوح ومنحنى النمو، مع حافة لمعان ناعمة ونجمة الذكاء والشغف ✦ في الأعلى.
      </p>
      <div class="emblem-display">
        {emblem_svg}
      </div>
      <div style="text-align:center; font-family:'JetBrains Mono',monospace; font-size:0.85rem; color:var(--text-muted);">
        public/brand/zaty-emblem.svg
      </div>
    </div>

    <!-- Lockups -->
    <div class="card">
      <h2 style="margin-top:0; font-size:1.4rem;">٢. الشعار الكامل مع الاسم (Wordmark Lockup)</h2>
      <p style="color:var(--text-muted); font-size:0.95rem;">
        الرمز بجانب الاسم الكامل <strong>«ذاتي»</strong> والشارة اللاتينية ZATY:
      </p>

      <div style="font-size:0.85rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-muted);">الوضع الفاتح (Light Mode):</div>
      <div class="lockup-box">
        {lockup_light}
      </div>

      <div style="font-size:0.85rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-muted);">الوضع الداكن (Dark Mode):</div>
      <div class="lockup-box dark">
        {lockup_dark}
      </div>
    </div>
  </div>

  <!-- Real-World Simulators -->
  <h2 style="font-size:1.6rem; font-weight:800; margin:2.5rem 0 1rem 0;">🔬 المعاينة الواقعية (الموقع، واتساب، وتطبيق الجوال)</h2>

  <div class="sim-grid">
    <!-- WhatsApp -->
    <div class="card">
      <h3 style="margin-top:0;">💬 معاينة المشاركة في واتساب (WhatsApp Card)</h3>
      <p style="color:var(--text-muted); font-size:0.9rem;">
        جميع العناصر في المركز ومحمية بالكامل من القص:
      </p>

      <div class="whatsapp-bubble">
        <div class="whatsapp-card">
          <div class="whatsapp-img-container">
            {og_svg}
          </div>
          <div class="whatsapp-meta">
            <div class="whatsapp-site">ZATY.EDU.EG</div>
            <div class="whatsapp-title">منصة ذاتي (Zaty) | منصتك للتعلّم الذاتي التفاعلي</div>
            <div class="whatsapp-snippet">تعلّم البرمجة ببايثون والذكاء الاصطناعي للصف الثالث الإعدادي بدون إنترنت.</div>
          </div>
        </div>
        <div style="font-size: 11px; color: #8696A0; text-align: left; margin-top: 4px; direction: ltr;">
          01:15 PM ✓✓
        </div>
      </div>
    </div>

    <!-- Header & Phone -->
    <div class="card">
      <h3 style="margin-top:0;">🖥️ شريط ترويسة الموقع وأيقونة الجوال</h3>

      <div style="font-size:0.85rem; font-weight:700; margin-bottom:0.5rem; color:var(--text-muted);">شريط الموقع:</div>
      <div class="header-sim">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:38px; height:38px;">
            {emblem_svg}
          </div>
          <div>
            <div style="font-size:1.15rem; font-weight:800; color:#163A3A;">ذاتي <span style="font-size:10px; font-family:'JetBrains Mono',monospace; background:#E5F1EE; color:#006E5A; padding:2px 6px; border-radius:4px;">ZATY</span></div>
            <div style="font-size:11px; color:#3B5A58;">منصتك للتعلّم الذاتي · ٣ إعدادي</div>
          </div>
        </div>
        <div>
          <span style="padding:0.4rem 0.9rem; border-radius:0.5rem; font-size:0.85rem; font-weight:600; background:#E5F1EE; color:#006E5A;">الرئيسية</span>
        </div>
      </div>

      <div style="font-size:0.85rem; font-weight:700; margin:1.5rem 0 0.5rem 0; color:var(--text-muted);">أيقونة التطبيق على شاشة هاتف الطالب:</div>
      <div class="phone-screen">
        <div class="app-icon-squircle">
          {pwa_icon_svg}
        </div>
        <div style="color:#FFF; font-size:0.85rem; font-weight:700;">ذاتي</div>
      </div>
    </div>
  </div>

  <!-- Social Share Banner Full -->
  <h2 style="font-size:1.6rem; font-weight:800; margin:2.5rem 0 1rem 0;">🌐 بطاقة المشاركة الاجتماعية (1200x630)</h2>
  <div class="card" style="padding:1.5rem;">
    <div style="width:100%; border-radius:1rem; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.1);">
      {og_svg}
    </div>
  </div>

</div>

<script>
  function toggleTheme() {{
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    document.getElementById('theme-icon').textContent = isDark ? '🌙' : '☀️';
    document.getElementById('theme-text').textContent = isDark ? 'الوضع الداكن' : 'الوضع الفاتح';
  }}
</script>

</body>
</html>'''

    with open("public/brand/preview.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("preview.html updated with adopted pure first design!")

if __name__ == "__main__":
    build_preview_adopted_html()
