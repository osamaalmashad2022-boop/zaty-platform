import os
from PIL import Image, ImageDraw, ImageFont

def render_og_png():
    width, height = 1200, 630
    img = Image.new("RGBA", (width, height), (3, 38, 31, 255))
    draw = ImageDraw.Draw(img)

    # 1. Background vertical subtle gradient
    for y in range(height):
        ratio = y / height
        r = int(3 + (8 - 3) * ratio)
        g = int(38 + (26 - 38) * ratio)
        b = int(31 + (23 - 31) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # Ambient radial green glow in center
    cx, cy = 600, 315
    for r in range(450, 0, -10):
        alpha = int(30 * (1 - r / 450))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(0, 210, 178, alpha))

    # 2. Central Glassmorphism Card
    card_x0, card_y0 = 250, 55
    card_x1, card_y1 = 950, 575
    draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y1], radius=28, fill=(6, 47, 39, 230), outline=(0, 229, 192, 100), width=2)

    # 3. Draw Isometric Prism Emblem in center
    # Center of emblem: (600, 185)
    ecx, ecy = 600, 185
    r = 65

    # Prism vertices
    top = (ecx, ecy - r)
    top_r = (ecx + int(r * 0.866), ecy - int(r * 0.5))
    bot_r = (ecx + int(r * 0.866), ecy + int(r * 0.5))
    bot = (ecx, ecy + r)
    bot_l = (ecx - int(r * 0.866), ecy + int(r * 0.5))
    top_l = (ecx - int(r * 0.866), ecy - int(r * 0.5))
    center = (ecx, ecy)

    # Ambient halo behind prism
    draw.ellipse([ecx - 85, ecy - 85, ecx + 85, ecy + 85], fill=(0, 210, 178, 35))

    # Left Face (Deep Code Navy / Emerald)
    draw.polygon([center, bot, bot_l, top_l], fill=(0, 77, 63, 255), outline=(0, 229, 192, 150))
    # Code prompt `>` on left face
    draw.line([(ecx - 36, ecy + 5), (ecx - 22, ecy + 16), (ecx - 36, ecy + 27)], fill=(0, 229, 192, 255), width=4)

    # Right Face (Royal Emerald)
    draw.polygon([center, top_r, bot_r, bot], fill=(0, 110, 90, 255), outline=(0, 229, 192, 150))
    # Knowledge grid on right face
    draw.line([(ecx + 18, ecy + 5), (ecx + 40, ecy - 8)], fill=(255, 255, 255, 70), width=2)
    draw.line([(ecx + 18, ecy + 22), (ecx + 40, ecy + 9)], fill=(255, 255, 255, 70), width=2)
    draw.line([(ecx + 18, ecy + 39), (ecx + 40, ecy + 26)], fill=(255, 255, 255, 70), width=2)

    # Top Face (Electric Mint to Cyan)
    draw.polygon([top, top_r, center, top_l], fill=(0, 210, 178, 255), outline=(255, 255, 255, 200))

    # Inner crease lines
    draw.line([top, center], fill=(255, 255, 255, 140), width=2)
    draw.line([bot_l, center], fill=(255, 255, 255, 140), width=2)
    draw.line([top_r, center], fill=(255, 255, 255, 140), width=2)
    draw.line([center, bot], fill=(255, 255, 255, 140), width=2)

    # Floating AI Spark ✦ at (ecx, top_y - 8)
    sx, sy = ecx, top[1] - 8
    # Outer glow
    draw.ellipse([sx - 24, sy - 24, sx + 24, sy + 24], fill=(255, 122, 89, 70))
    # 4-point star
    star_r = 18
    star_inner = 4
    pts = [
        (sx, sy - star_r),
        (sx + star_inner, sy - star_inner),
        (sx + star_r, sy),
        (sx + star_inner, sy + star_inner),
        (sx, sy + star_r),
        (sx - star_inner, sy + star_inner),
        (sx - star_r, sy),
        (sx - star_inner, sy - star_inner)
    ]
    draw.polygon(pts, fill=(255, 209, 59, 255))
    draw.ellipse([sx - 4, sy - 4, sx + 4, sy + 4], fill=(255, 255, 255, 255))

    # 4. Text typography
    font_large = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 52)
    font_mid = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 24)
    font_small = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 17)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 15)

    # Title: ذاتي · Zaty
    title_text = "ذاتي · Zaty"
    bbox = draw.textbbox((0, 0), title_text, font=font_large)
    tw = bbox[2] - bbox[0]
    draw.text((600 - tw // 2, 290), title_text, fill=(255, 255, 255, 255), font=font_large)

    # Subtitle 1: منصة التعلّم الذاتي التفاعلي
    sub1 = "منصة التعلّم الذاتي التفاعلي"
    bbox = draw.textbbox((0, 0), sub1, font=font_mid)
    tw = bbox[2] - bbox[0]
    draw.text((600 - tw // 2, 365), sub1, fill=(52, 245, 215, 255), font=font_mid)

    # Subtitle 2: الشهادة الإعدادية · بايثون، ذكاء اصطناعي وأمن سيبراني
    sub2 = "الشهادة الإعدادية · بايثون، ذكاء اصطناعي وأمن سيبراني"
    bbox = draw.textbbox((0, 0), sub2, font=font_small)
    tw = bbox[2] - bbox[0]
    draw.text((600 - tw // 2, 412), sub2, fill=(209, 234, 229, 255), font=font_small)

    # 5. Three Badges
    badges = [
        ("بدون إنترنت", 330),
        ("تشغيل بايثون", 520),
        ("مجاني بالكامل", 710)
    ]
    for btext, bx in badges:
        bw, bh = 160, 42
        by = 465
        draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=10, fill=(14, 66, 56, 255), outline=(0, 210, 178, 200), width=1)
        bbox = draw.textbbox((0, 0), btext, font=font_badge)
        btw = bbox[2] - bbox[0]
        draw.text((bx + (bw - btw) // 2, by + 10), btext, fill=(0, 229, 192, 255), font=font_badge)

    # Convert to RGB & Save
    rgb_img = img.convert("RGB")
    rgb_img.save("public/og-image.png", "PNG", optimize=True)
    print("public/og-image.png generated successfully with PIL!")

    # 6. Also generate public/brand/zaty-icon-512.png (512x512 squircle)
    icon_img = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    idraw = ImageDraw.Draw(icon_img)

    # Squircle background
    idraw.rounded_rectangle([0, 0, 512, 512], radius=116, fill=(0, 110, 90, 255), outline=(0, 229, 192, 180), width=4)

    # Inner gradient feel
    for ir in range(220, 0, -10):
        ialpha = int(25 * (1 - ir / 220))
        idraw.ellipse([256 - ir, 256 - ir, 256 + ir, 256 + ir], fill=(0, 229, 192, ialpha))

    # Prism in center of 512
    icx, icy = 256, 270
    ir = 110
    itop = (icx, icy - ir)
    itop_r = (icx + int(ir * 0.866), icy - int(ir * 0.5))
    ibot_r = (icx + int(ir * 0.866), icy + int(ir * 0.5))
    ibot = (icx, icy + ir)
    ibot_l = (icx - int(ir * 0.866), icy + int(ir * 0.5))
    itop_l = (icx - int(ir * 0.866), icy - int(ir * 0.5))
    icenter = (icx, icy)

    # Left
    idraw.polygon([icenter, ibot, ibot_l, itop_l], fill=(0, 77, 63, 255), outline=(0, 229, 192, 160))
    idraw.line([(icx - 60, icy + 8), (icx - 36, icy + 26), (icx - 60, icy + 44)], fill=(0, 229, 192, 255), width=6)

    # Right
    idraw.polygon([icenter, itop_r, ibot_r, ibot], fill=(0, 110, 90, 255), outline=(0, 229, 192, 160))
    idraw.line([(icx + 30, icy + 10), (icx + 65, icy - 10)], fill=(255, 255, 255, 80), width=3)
    idraw.line([(icx + 30, icy + 38), (icx + 65, icy + 18)], fill=(255, 255, 255, 80), width=3)

    # Top
    idraw.polygon([itop, itop_r, icenter, itop_l], fill=(0, 210, 178, 255), outline=(255, 255, 255, 220))

    # Creases
    idraw.line([itop, icenter], fill=(255, 255, 255, 180), width=3)
    idraw.line([ibot_l, icenter], fill=(255, 255, 255, 180), width=3)
    idraw.line([itop_r, icenter], fill=(255, 255, 255, 180), width=3)
    idraw.line([icenter, ibot], fill=(255, 255, 255, 180), width=3)

    # Floating AI Spark
    isx, isy = icx, itop[1] - 14
    idraw.ellipse([isx - 36, isy - 36, isx + 36, isy + 36], fill=(255, 122, 89, 80))
    istar_r = 28
    istar_inner = 6
    ipts = [
        (isx, isy - istar_r),
        (isx + istar_inner, isy - istar_inner),
        (isx + istar_r, isy),
        (isx + istar_inner, isy + istar_inner),
        (isx, isy + istar_r),
        (isx - istar_inner, isy + istar_inner),
        (isx - istar_r, isy),
        (isx - istar_inner, isy - istar_inner)
    ]
    idraw.polygon(ipts, fill=(255, 209, 59, 255))
    idraw.ellipse([isx - 6, isy - 6, isx + 6, isy + 6], fill=(255, 255, 255, 255))

    icon_img.save("public/brand/zaty-icon-512.png", "PNG", optimize=True)
    print("public/brand/zaty-icon-512.png generated successfully with PIL!")

if __name__ == "__main__":
    render_og_png()
