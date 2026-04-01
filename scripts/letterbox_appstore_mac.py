#!/usr/bin/env python3
"""Place a screenshot on an exact App Store–valid macOS canvas (2560×1600)."""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

# macOS App Store: one of 1280×800, 1440×900, 2560×1600, 2880×1800
CANVAS_W, CANVAS_H = 2560, 1600
BG = (26, 26, 28)  # neutral dark gray


def main() -> None:
    if len(sys.argv) < 3:
        print("Usage: letterbox_appstore_mac.py <input.png> <output.png>", file=sys.stderr)
        sys.exit(1)
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])
    im = Image.open(src).convert("RGB")
    w, h = im.size
    scale = min(CANVAS_W / w, CANVAS_H / h)
    new_w = max(1, int(round(w * scale)))
    new_h = max(1, int(round(h * scale)))
    resized = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (CANVAS_W, CANVAS_H), BG)
    x = (CANVAS_W - new_w) // 2
    y = (CANVAS_H - new_h) // 2
    canvas.paste(resized, (x, y))
    dst.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(dst, "PNG", optimize=True)
    print(f"Wrote {dst} ({CANVAS_W}×{CANVAS_H})")


if __name__ == "__main__":
    main()
