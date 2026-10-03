"""Generate FitFlow's original geometric brand assets. Requires Pillow; no network."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
INK, LIME, PAPER = '#2563EB', '#FFFFFF', '#F7F8FA'

def mark(draw, cx, cy, size):
    def polygon(points):
        draw.polygon([(cx + (x - .5) * size, cy + (y - .5) * size) for x, y in points], fill=LIME)
    polygon([(.24, .15), (.43, .15), (.31, .85), (.12, .85)])
    polygon([(.37, .15), (.90, .15), (.86, .34), (.34, .34)])
    polygon([(.32, .44), (.73, .44), (.69, .63), (.29, .63)])

def save_mark(name, scale, background):
    image = Image.new('RGBA', (1024, 1024), background)
    mark(ImageDraw.Draw(image), 512, 512, 1024 * scale)
    image.save(ROOT / 'assets' / name, optimize=True)
    return image

def font(size):
    for candidate in ['C:/Windows/Fonts/arialbd.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()

if __name__ == '__main__':
    (ROOT / 'assets').mkdir(exist_ok=True)
    for folder in ['icons', 'screenshots', 'feature-graphics']:
        (ROOT / 'store-assets' / folder).mkdir(parents=True, exist_ok=True)
    icon = save_mark('icon.png', .72, INK)
    icon.resize((512, 512), Image.Resampling.LANCZOS).convert('RGB').save(ROOT / 'store-assets/icons/fitflow-play-icon.png', optimize=True)
    save_mark('adaptive-icon.png', .46, (0, 0, 0, 0))
    save_mark('splash.png', .70, INK)
    image = Image.new('RGB', (1024, 500), INK)
    draw = ImageDraw.Draw(image)
    draw.ellipse((685, 40, 1065, 420), fill='#1D4ED8')
    draw.ellipse((755, 115, 995, 355), outline='#93C5FD', width=2)
    mark(draw, 867, 240, 265)
    draw.text((65, 75), 'FitFlow.', font=font(64), fill=PAPER)
    draw.text((65, 172), 'Train smarter.', font=font(44), fill=PAPER)
    draw.text((65, 228), 'Live healthier.', font=font(44), fill=LIME)
    draw.text((65, 340), 'Move. Nourish. Connect.', font=font(24), fill='#DBEAFE')
    draw.text((65, 420), 'Student academic prototype', font=font(16), fill='#DBEAFE')
    image.save(ROOT / 'store-assets/feature-graphics/fitflow-feature.png', optimize=True)
    print('Generated icon, adaptive icon, splash, Play icon and feature graphic.')
