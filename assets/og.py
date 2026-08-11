"""
Regenerates assets/og.png. Warm near-black canvas, signal orange accent.
Deliberately plain: name, a rule, two lines of subtitle, an accent bar, and
the same four vertical hairlines the site itself hangs off.

Keep the hexes here in step with :root in assets/site.css.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
BG      = (10, 10, 11)
INK     = (237, 237, 239)
INK_2   = (162, 162, 170)
INK_3   = (110, 110, 120)
ACCENT  = (255, 77, 28)
LINE    = (255, 255, 255, 26)
LINE_3  = (255, 255, 255, 12)

L = "/usr/share/fonts/truetype/lato/"
M = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
f_name = ImageFont.truetype(L + "Lato-Black.ttf", 104)
f_sub  = ImageFont.truetype(L + "Lato-Regular.ttf", 30)
f_kick = ImageFont.truetype(M, 21)
f_meta = ImageFont.truetype(M, 19)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img, "RGBA")

# Accent bloom, top right. A soft radial, not a disc: build it as a stack of
# concentric ellipses that get MORE opaque toward the centre, then blur the
# whole thing so there is no rim.
glow = Image.new("L", (W, H), 0)
gd = ImageDraw.Draw(glow)
cx, cy, R = W - 210, -110, 520
for i in range(90):
    t = i / 89                      # 0 at the rim, 1 at the centre
    r = R * (1 - t)
    gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=int(70 * t ** 1.6))
glow = glow.filter(ImageFilter.GaussianBlur(60))
img = Image.composite(Image.new("RGB", (W, H), ACCENT), img, glow)
d = ImageDraw.Draw(img, "RGBA")

# The four vertical rules.
GUT = 72
for i in range(5):
    x = GUT + i * (W - 2 * GUT) / 4
    d.line([(x, 0), (x, H)], fill=LINE_3, width=1)

def tracked(draw, xy, text, font, fill, track=0):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + track
    return x

# Kicker
d.ellipse([GUT, 74, GUT + 11, 85], fill=ACCENT)
tracked(d, (GUT + 26, 68), "PRODUCT MANAGER  ·  AI PRODUCTS", f_kick, INK_2, track=4.4)

# Name
d.text((GUT - 6, 138), "Adhokshaj",   font=f_name, fill=INK)
d.text((GUT - 6, 248), "Wategaonkar", font=f_name, fill=INK)

# Accent bar, right edge, aligned to the name block.
d.rectangle([W - 76, 148, W - 71, 335], fill=ACCENT)

# Rule
d.line([(GUT, 414), (W - GUT, 414)], fill=LINE, width=1)

# Subtitle
d.text((GUT, 438), "LLM gateways · agent orchestration · SAR analytics", font=f_sub, fill=INK_2)
d.text((GUT, 480), "Two products designed, built and shipped solo.",     font=f_sub, fill=INK_2)

# Footer
d.text((GUT, 554), "adhokshajwategaonkar.github.io", font=f_meta, fill=INK_3)
right = "8 CASE STUDIES  ·  4 COMPANIES  ·  3+ YEARS"
w = d.textlength(right, font=f_meta) + 2.2 * (len(right) - 1)
tracked(d, (W - GUT - w, 554), right, f_meta, INK_3, track=2.2)

img.save("/sessions/nice-beautiful-volta/mnt/portfolio/assets/og.png", optimize=True)
print("written")
