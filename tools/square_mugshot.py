from pathlib import Path

from PIL import Image


root = Path(__file__).resolve().parents[1]
source = root / "public" / "mugshot.jfif"

image = Image.open(source)
width, height = image.size
side = min(width, height)
left = (width - side) // 2
top = (height - side) // 2
cropped = image.crop((left, top, left + side, top + side))
cropped.save(source, quality=95)

print(f"Cropped {source.name} to {side}x{side}")
