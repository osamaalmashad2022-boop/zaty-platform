import os

def build_preview_html():
    os.makedirs("public/brand", exist_ok=True)

    # Read the SVGs
    def read_svg(path):
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                return f.read()
        return ""

    c1_emblem = read_svg("public/brand/concept-1-prism.svg")
    c2_emblem = read_svg("public/brand/concept-2-flame.svg")
    c3_emblem = read_svg("public/brand/concept-3-monogram.svg")

    lockup_1_light = read_svg("public/brand/lockup-1-light.svg")
    lockup_1_dark = read_svg("public/brand/lockup-1-dark.svg")

    lockup_2_light = read_svg("public/brand/lockup-2-light.svg")
    lockup_2_dark = read_svg("public/brand/lockup-2-dark.svg")

    lockup_3_light = read_svg("public/brand/lockup-3-light.svg")
    lockup_3_dark = read_svg("public/brand/lockup-3-dark.svg")

    og_image_svg = read_svg("public/og-image.svg")
    pwa_icon_svg = read_svg("src/app/icon.svg")

    html = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>معرض الهوية البصرية وشعار منصة ذاتي (Zaty Brand Showcase)</title>
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

    /* Header & Navigation Bar */
    .top-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border);
    }}

    .hero-title {{
      font-size: 2.4rem;
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
    .theme-toggle-btn:hover {{
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(0,0,0,0.08);
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
      padding: 0.5rem 1rem;
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
    .pill.tech {{
      border-color: #00D2B2;
      color: #008774;
    }}

    /* Section Styling */
    .section-title {{
      font-size: 1.6rem;
      font-weight: 800;
      margin: 3rem 0 1rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-main);
    }}
    .section-subtitle {{
      font-size: 1rem;
      color: var(--text-muted);
      margin: 0 0 1.5rem 0;
    }}

    /* Concept Cards Grid */
    .concept-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }}

    .concept-card {{
      background: var(--card-bg);
      border: 1.5px solid var(--border);
      border-radius: 1.5rem;
      padding: 2rem;
      box-shadow: 0 12px 30px -10px rgba(0, 50, 40, 0.06);
      display: flex;
      flex-col: column;
      position: relative;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }}
    .concept-card:hover {{
      transform: translateY(-4px);
      box-shadow: 0 18px 40px -10px rgba(0, 50, 40, 0.12);
    }}

    .concept-badge {{
      position: absolute;
      top: 1.25rem;
      left: 1.25rem;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
    }}
    .badge-recommended {{
      background: #E6F8F4;
      color: #006E5A;
      border: 1px solid #00D2B2;
    }}
    .badge-alt {{
      background: #FFF3EB;
      color: #C2410C;
      border: 1px solid #FFBD99;
    }}

    .emblem-stage {{
      width: 140px;
      height: 140px;
      margin: 1rem auto 1.5rem auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle, rgba(0, 210, 178, 0.08) 0%, transparent 70%);
      border-radius: 50%;
    }}
    .emblem-stage svg {{
      width: 100%;
      height: 100%;
    }}

    .concept-name {{
      font-size: 1.35rem;
      font-weight: 800;
      margin: 0 0 0.5rem 0;
      color: var(--text-main);
    }}
    .concept-desc {{
      font-size: 0.95rem;
      color: var(--text-muted);
      margin: 0 0 1.5rem 0;
      min-height: 48px;
    }}

    .lockup-preview {{
      background: #FFFFFF;
      border: 1px solid #E2ECE9;
      border-radius: 1rem;
      padding: 1rem;
      margin-bottom: 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }}
    .lockup-preview.dark {{
      background: #0B1E1B;
      border-color: #163E38;
    }}
    .lockup-preview svg {{
      max-width: 100%;
      height: 60px;
    }}

    /* Real-world Simulator Grid */
    .simulator-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }}

    .simulator-card {{
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1.5rem;
      padding: 1.75rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.04);
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

    /* Header Simulation */
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
    .header-nav-dummy {{
      display: flex;
      gap: 1rem;
    }}
    .nav-pill-dummy {{
      padding: 0.4rem 0.9rem;
      border-radius: 0.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      background: #E5F1EE;
      color: #006E5A;
    }}

    /* Mobile App Icon Simulation */
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
      transition: transform 0.2s ease;
    }}
    .app-icon-squircle:hover {{
      transform: scale(1.08);
    }}
    .app-icon-squircle svg {{
      width: 100%;
      height: 100%;
    }}
    .app-label {{
      color: #FFFFFF;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.5px;
    }}

    /* Full Social Share Banner Stage */
    .og-banner-stage {{
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1.5rem;
      padding: 1.5rem;
      box-shadow: 0 12px 30px rgba(0,0,0,0.05);
      margin-bottom: 3rem;
    }}
    .og-banner-stage svg {{
      width: 100%;
      height: auto;
      border-radius: 1rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }}

    .color-swatches {{
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1rem;
    }}
    .swatch {{
      flex: 1 1 180px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }}
    .swatch-color {{
      width: 48px;
      height: 48px;
      border-radius: 0.75rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }}
    .swatch-info h4 {{
      margin: 0;
      font-size: 0.95rem;
      font-weight: 700;
    }}
    .swatch-info p {{
      margin: 0;
      font-size: 0.8rem;
      color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
    }}
  </style>
</head>
<body>

<div class="container">
  <!-- Top Bar -->
  <header class="top-bar">
    <div>
      <h1 class="hero-title">
        <span>💎</span>
        <span>منصة «ذاتي» (Zaty) · الهوية البصرية وشعار المستقبل</span>
      </h1>
      <p style="margin: 0.4rem 0 0 0; color: var(--text-muted);">
        معرض الهوية البصرية المعتمدة، معالجة كافة الملاحظات، وإطلاق 3 مفاهيم هندسية عالمية راقية.
      </p>
    </div>

    <button class="theme-toggle-btn" onclick="toggleTheme()">
      <span id="theme-icon">🌙</span>
      <span id="theme-text">الوضع الداكن</span>
    </button>
  </header>

  <!-- Key Assurance Badges -->
  <div class="badges-bar">
    <div class="pill success">
      <span>✓</span>
      <span>الاسم معتمد بالكامل وبدون أي بتر: <strong>«ذاتي»</strong></span>
    </div>
    <div class="pill spark">
      <span>✨</span>
      <span>صفر تكرار: لا يوجد أي تكرار أو ازدواجية لحرف "ذ"</span>
    </div>
    <div class="pill tech">
      <span>✦</span>
      <span>شعلة الذكاء الاصطناعي (AI Spark) ونقاء الأشكال الهندسية</span>
    </div>
    <div class="pill">
      <span>📱</span>
      <span>منطقة أمان 600×600 لواتساب لضمان عدم قص أي نصوص</span>
    </div>
  </div>

  <!-- Section 1: The 3 Master Concepts -->
  <h2 class="section-title">
    <span>🎨</span>
    <span>مفاهيم الشعار الثلاثة (The 3 World-Class Concepts)</span>
  </h2>
  <p class="section-subtitle">
    تم بناء وتصميم كل مفهوم بنسب هندسية دقيقة ليجسد فلسفة التعلّم الذاتي والبرمجة والذكاء الاصطناعي بدون أي شوائب:
  </p>

  <div class="concept-grid">
    <!-- Concept 1 -->
    <div class="concept-card">
      <div class="concept-badge badge-recommended">⭐ المفهوم المعتمد الأول</div>
      <div class="emblem-stage">
        {c1_emblem}
      </div>
      <h3 class="concept-name">١. جوهرة الذكاء والتعلم الذاتي (The Knowledge Prism)</h3>
      <p class="concept-desc">
        منشور هندسي سداسي ثلاثي الأبعاد (Isometric 3D): يدمج شاشة الشفرة البرمجية وموجه بايثون <strong>&gt;</strong> مع مصفوفة المعرفة، وتتوجها نجمة الذكاء والشغف ✦ المتوهجة.
      </p>
      
      <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-muted);">الشعار الأفقي (وضع فاتح):</div>
      <div class="lockup-preview">
        {lockup_1_light}
      </div>

      <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-muted);">الشعار الأفقي (وضع داكن):</div>
      <div class="lockup-preview dark">
        {lockup_1_dark}
      </div>
    </div>

    <!-- Concept 2 -->
    <div class="concept-card">
      <div class="concept-badge badge-alt">المفهوم الثاني</div>
      <div class="emblem-stage">
        {c2_emblem}
      </div>
      <h3 class="concept-name">٢. شعلة المعرفة والانطلاق (The Ascending Flame)</h3>
      <p class="concept-desc">
        جناحان نحتيان انسيابيان يحاكيان دفتي كتاب وشعلة متقدة تنطلق للأعلى مع موجه بايثون الداخلي، متوجة بنجمة الانطلاق الذهبية.
      </p>

      <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-muted);">الشعار الأفقي (وضع فاتح):</div>
      <div class="lockup-preview">
        {lockup_2_light}
      </div>

      <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-muted);">الشعار الأفقي (وضع داكن):</div>
      <div class="lockup-preview dark">
        {lockup_2_dark}
      </div>
    </div>

    <!-- Concept 3 -->
    <div class="concept-card">
      <div class="concept-badge badge-alt">المفهوم الثالث</div>
      <div class="emblem-stage">
        {c3_emblem}
      </div>
      <h3 class="concept-name">٣. حرف الذال المعماري النقي (Master 'ذ' Monogram)</h3>
      <p class="concept-desc">
        صياغة معمارية فائقة النقاء لحرف «ذ» العربي كشريط انسيابي متصل وموحد بنسب ذهبية وقوس صاعد، تعلوه نقطة الحرف كنجمة ذكاء ماسية ✦ دون أي خطوط داخلية مكررة.
      </p>

      <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-muted);">الشعار الأفقي (وضع فاتح):</div>
      <div class="lockup-preview">
        {lockup_3_light}
      </div>

      <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-muted);">الشعار الأفقي (وضع داكن):</div>
      <div class="lockup-preview dark">
        {lockup_3_dark}
      </div>
    </div>
  </div>

  <!-- Section 2: Real-World Visual Simulators -->
  <h2 class="section-title">
    <span>🔬</span>
    <span>المعاينة في البيئة الحقيقية (Real-World Experience Simulators)</span>
  </h2>
  <p class="section-subtitle">
    كيف سيبدو الشعار للمستخدمين على أرض الواقع داخل الموقع وتطبيق الجوال ومحادثات واتساب:
  </p>

  <div class="simulator-grid">
    <!-- Simulator 1: WhatsApp Preview -->
    <div class="simulator-card">
      <h3 style="margin-top:0;">💬 معاينة المشاركة في واتساب (WhatsApp Chat Card)</h3>
      <p style="color:var(--text-muted); font-size:0.9rem;">
        لاحظ كيف أن الشعار والعنوان وشارات المزايا تظهر بالكامل داخل منطقة الأمان المربعة دون أن يُقص حرف واحد في معاينة المحادثة:
      </p>

      <div class="whatsapp-bubble">
        <div class="whatsapp-card">
          <div class="whatsapp-img-container">
            {og_image_svg}
          </div>
          <div class="whatsapp-meta">
            <div class="whatsapp-site">ZATY.EDU.EG</div>
            <div class="whatsapp-title">منصة ذاتي (Zaty) | منصتك للتعلّم الذاتي التفاعلي</div>
            <div class="whatsapp-snippet">تعلّم البرمجة ببايثون والذكاء الاصطناعي للصف الثالث الإعدادي بدون إنترنت.</div>
          </div>
        </div>
        <div style="font-size: 11px; color: #8696A0; text-align: left; margin-top: 4px; direction: ltr;">
          11:45 AM ✓✓
        </div>
      </div>
    </div>

    <!-- Simulator 2: Website Header & Mobile App Icon -->
    <div class="simulator-card">
      <h3 style="margin-top:0;">🖥️ ترويسة الموقع وأيقونة التطبيق (Header & App Icon)</h3>
      <p style="color:var(--text-muted); font-size:0.9rem;">
        ظهور الشعار في شريط التنقل العلوي للموقع الرسمي، وتناسق الأيقونة على شاشة هاتف الطالب:
      </p>

      <!-- Header Simulation -->
      <div style="font-size:0.85rem; font-weight:700; margin-bottom:0.5rem; color:var(--text-muted);">شريط الموقع الفعلي:</div>
      <div class="header-sim">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:36px; height:36px;">
            {c1_emblem}
          </div>
          <div>
            <div style="font-size:1.15rem; font-weight:800; color:#163A3A;">ذاتي <span style="font-size:10px; font-family:'JetBrains Mono',monospace; background:#E5F1EE; color:#006E5A; padding:2px 6px; border-radius:4px;">ZATY</span></div>
            <div style="font-size:11px; color:#3B5A58;">منصتك للتعلّم الذاتي · ٣ إعدادي</div>
          </div>
        </div>
        <div class="header-nav-dummy">
          <span class="nav-pill-dummy">الرئيسية</span>
          <span style="font-size:0.85rem; font-weight:600; padding:0.4rem 0.5rem; color:#3B5A58;">الامتحان</span>
        </div>
      </div>

      <!-- Phone App Icon Simulation -->
      <div style="font-size:0.85rem; font-weight:700; margin:1.5rem 0 0.5rem 0; color:var(--text-muted);">أيقونة التطبيق على هاتف الطالب (PWA Squircle):</div>
      <div class="phone-screen">
        <div class="app-icon-squircle">
          {pwa_icon_svg}
        </div>
        <div class="app-label">ذاتي</div>
      </div>
    </div>
  </div>

  <!-- Section 3: Full Social Share Image (1200x630) -->
  <h2 class="section-title">
    <span>🌐</span>
    <span>صورة المشاركة الاجتماعية الرسمية (OpenGraph Banner 1200x630)</span>
  </h2>
  <p class="section-subtitle">
    البطاقة الكاملة بدقة 1200×630 المخصصة لـ Twitter/X، فيسبوك، تيليجرام، ولينكد إن:
  </p>

  <div class="og-banner-stage">
    {og_image_svg}
  </div>

  <!-- Section 4: Color Palette & Design Tokens -->
  <h2 class="section-title">
    <span>🎨</span>
    <span>رموز لوحة الألوان المعتمدة (Design Tokens)</span>
  </h2>

  <div class="color-swatches">
    <div class="swatch">
      <div class="swatch-color" style="background:#006E5A;"></div>
      <div class="swatch-info">
        <h4>الزمرد الملكي (Royal Emerald)</h4>
        <p>#006E5A · اللون الأساسي</p>
      </div>
    </div>
    <div class="swatch">
      <div class="swatch-color" style="background:#00D2B2;"></div>
      <div class="swatch-info">
        <h4>السيان الكهربائي (Electric Mint)</h4>
        <p>#00D2B2 · الإشراق والذكاء</p>
      </div>
    </div>
    <div class="swatch">
      <div class="swatch-color" style="background:#FF7A59;"></div>
      <div class="swatch-info">
        <h4>شرارة الذكاء (AI Spark)</h4>
        <p>#FF7A59 · شعلة الشغف والتحفيز</p>
      </div>
    </div>
    <div class="swatch">
      <div class="swatch-color" style="background:#0B131B;"></div>
      <div class="swatch-info">
        <h4>كحلي بايثون (Python Code Navy)</h4>
        <p>#0B131B · محرر الأكواد التقني</p>
      </div>
    </div>
  </div>

  <footer style="margin-top:4rem; padding-top:2rem; border-top:1px solid var(--border); text-align:center; color:var(--text-muted); font-size:0.9rem;">
    منصة ذاتي (Zaty) · منصتك للتعلّم الذاتي التفاعلي · منهج 2026/2027 القائم على Python والذكاء الاصطناعي
  </footer>
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
    print("Preview HTML updated successfully!")

if __name__ == "__main__":
    build_preview_html()
