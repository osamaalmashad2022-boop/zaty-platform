import os
from PIL import Image, ImageDraw, ImageFont

def render_pure_original_og_png():
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

    # 2. Central Glassmorphism Card (Safe Zone for WhatsApp: 600x600 in center)
    card_x0, card_y0 = 250, 55
    card_x1, card_y1 = 950, 575
    draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y1], radius=28, fill=(6, 47, 39, 230), outline=(0, 229, 192, 100), width=2)

    # 3. Draw Calligraphic 'ذ' Emblem in center
    # Scale from 200x200 viewBox to center around (600, 185)
    ecx, ecy = 600, 185
    scale = 1.1

    # Ambient halo
    draw.ellipse([ecx - 85, ecy - 85, ecx + 85, ecy + 85], fill=(0, 210, 178, 25))

    # The calligraphic 'ذ' path mapped to absolute points
    # ViewBox points: (112, 56) -> (131, 72) -> (148, 126) -> (136, 143) -> (58, 143) -> (46, 122) -> (62, 117) -> (122, 117) -> (106, 72) -> (112, 56)
    def to_pt(vx, vy):
        return (int(ecx + (vx - 100) * scale), int(ecy + (vy - 100) * scale))

    pts = [
        to_pt(112, 56),
        to_pt(126, 64),
        to_pt(137, 85),
        to_pt(145, 110),
        to_pt(148, 126),
        to_pt(144, 138),
        to_pt(136, 143),
        to_pt(95, 143),
        to_pt(58, 143),
        to_pt(48, 136),
        to_pt(46, 122),
        to_pt(52, 118),
        to_pt(62, 117),
        to_pt(100, 117),
        to_pt(122, 117),
        to_pt(123, 114),
        to_pt(115, 95),
        to_pt(106, 72),
        to_pt(105, 60),
        to_pt(112, 56)
    ]
    draw.polygon(pts, fill=(0, 180, 150, 255), outline=(0, 229, 192, 220))

    # Outer highlight sheen along the curve
    sheen_pts = [to_pt(112, 58), to_pt(128, 70), to_pt(140, 95), to_pt(148, 126)]
    draw.line(sheen_pts, fill=(255, 255, 255, 200), width=3)

    # 4. Radiant AI Spark ✦ (The dot of 'ذ')
    sx, sy = to_pt(114, 32)
    # Glow
    draw.ellipse([sx - 28, sy - 28, sx + 28, sy + 28], fill=(255, 122, 89, 70))
    # 4-point star
    star_r = int(22 * scale)
    star_inner = int(6 * scale)
    star_pts = [
        (sx, sy - star_r),
        (sx + star_inner, sy - star_inner),
        (sx + star_r, sy),
        (sx + star_inner, sy + star_inner),
        (sx, sy + star_r),
        (sx - star_inner, sy + star_inner),
        (sx - star_r, sy),
        (sx - star_inner, sy - star_inner)
    ]
    draw.polygon(star_pts, fill=(255, 209, 59, 255))
    draw.ellipse([sx - 5, sy - 5, sx + 5, sy + 5], fill=(255, 255, 255, 255))

    # Satellite spark
    sat_x, sat_y = to_pt(156, 88)
    draw.ellipse([sat_x - 3, sat_y - 3, sat_x + 3, sat_y + 3], fill=(0, 229, 192, 220))

    # 5. Typography: 'ذاتي · Zaty'
    font_large = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 52)
    font_mid = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 24)
    font_small = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 17)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 15)

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

    # 3 Badges
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

    rgb_img = img.convert("RGB")
    rgb_img.save("public/og-image.png", "PNG", optimize=True)
    print("public/og-image.png updated with pure first design!")

    # 6. Also update public/brand/zaty-icon-512.png
    icon_img = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    idraw = ImageDraw.Draw(icon_img)
    idraw.rounded_rectangle([0, 0, 512, 512], radius=116, fill=(0, 110, 90, 255), outline=(0, 229, 192, 180), width=4)

    # Center calligraphic 'ذ' on 512
    icx, icy = 256, 280
    iscale = 2.0
    def ito_pt(vx, vy):
        return (int(icx + (vx - 100) * iscale), int(icy + (vy - 100) * iscale))

    ipts = [
        ito_pt(112, 56),
        ito_pt(126, 64),
        ito_pt(137, 85),
        ito_pt(145, 110),
        ito_pt(148, 126),
        ito_pt(144, 138),
        ito_pt(136, 143),
        ito_pt(95, 143),
        ito_pt(58, 143),
        ito_pt(48, 136),
        ito_pt(46, 122),
        ito_pt(52, 118),
        ito_pt(62, 117),
        ito_pt(100, 117),
        ito_pt(122, 117),
        ito_pt(123, 114),
        ito_pt(115, 95),
        ito_pt(106, 72),
        ito_pt(105, 60),
        ito_pt(112, 56)
    ]
    idraw.polygon(ipts, fill=(0, 210, 178, 255), outline=(255, 255, 255, 200))
    idraw.line([ito_pt(112, 58), ito_pt(128, 70), ito_pt(140, 95), ito_pt(148, 126)], fill=(255, 255, 255, 220), width=5)

    isx, isy = ito_pt(114, 32)
    idraw.ellipse([isx - 40, isy - 40, isx + 40, isy + 40], fill=(255, 122, 89, 90))
    istar_r = int(22 * iscale)
    istar_inner = int(6 * iscale)
    istar_pts = [
        (isx, isy - istar_r),
        (isx + istar_inner, isy - istar_inner),
        (isx + istar_r, isy),
        (isx + istar_inner, isy + istar_inner),
        (isx, isy + istar_r),
        (isx - istar_inner, isy + istar_inner),
        (isx - istar_r, isy),
        (isx - istar_inner, isy - istar_inner)
    ]
    idraw.polygon(istar_pts, fill=(255, 209, 59, 255))
    idraw.ellipse([isx - 8, isy - 8, isx + 8, isy + 8], fill=(255, 255, 255, 255))

    icon_img.save("public/brand/zaty-icon-512.png", "PNG", optimize=True)
    print("public/brand/zaty-icon-512.png updated with pure first design!")

if __name__ == "__main__":
    render_pure_original_og_png()
