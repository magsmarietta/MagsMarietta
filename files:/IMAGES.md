# Mags Marietta — Image Manifest
## Where to put every image file

All images live in the `images/` folder next to `index.html`.
Format recommendation: **WebP** for everything (smaller than PNG/JPG, same quality).
To convert: https://squoosh.app (free, in-browser, no upload needed)

---

### Header

| File                       | Used in         | Recommended size | Notes                              |
|----------------------------|-----------------|------------------|------------------------------------|
| `images/header-heart.webp` | `#header-heart` | ~420 × 420 px    | Pixel art, transparent background  |

---

### Marquee Strip

Each file scrolls across the top banner. Add or remove entries in `index.html` freely.

| File                        | Notes                              |
|-----------------------------|------------------------------------|
| `images/marquee-1.webp`     | ~80 × 80 px, pixel art             |
| `images/marquee-2.webp`     | ~80 × 80 px, pixel art             |
| `images/marquee-3.webp`     | ~80 × 80 px, pixel art             |
| `images/marquee-4.webp`     | ~80 × 80 px, pixel art             |
| `images/marquee-5.webp`     | ~80 × 80 px, pixel art             |
| `images/marquee-6.webp`     | ~80 × 80 px, pixel art             |
| `images/marquee-7.webp`     | ~80 × 80 px, pixel art             |
| `images/marquee-8.webp`     | ~80 × 80 px, pixel art             |
| `images/marquee-9.webp`     | ~80 × 80 px, pixel art             |
| `images/marquee-10.webp`    | ~80 × 80 px, pixel art             |
| `images/marquee-11.webp`    | ~80 × 80 px, pixel art             |
| `images/marquee-12.webp`    | ~80 × 80 px, pixel art             |
| `images/marquee-13.webp`    | ~80 × 80 px, pixel art             |
| `images/marquee-14.webp`    | ~80 × 80 px, pixel art             |

---

### Product Cards

When ready, replace `<span>pixel art</span>` in `index.html` with:

```html
<img src="images/product-ring.webp" alt="Statement Ring"
     style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;">
```

| File                           | Product        | Recommended size |
|--------------------------------|----------------|------------------|
| `images/product-ring.webp`     | Statement Ring | 400 × 400 px     |
| `images/product-zipper.webp`   | Zipper Tags    | 400 × 400 px     |
| `images/product-aglets.webp`   | Aglets         | 400 × 400 px     |
| `images/product-grommets.webp` | Grommets       | 400 × 400 px     |
| `images/product-blanks.webp`   | Ring Blanks    | 400 × 400 px     |
| `images/product-hardware.webp` | Hardware Set   | 400 × 400 px     |

---

### Font

| File                  | Used in        | Notes                                        |
|-----------------------|----------------|----------------------------------------------|
| `fonts/04b03.woff2`   | body text      | Convert your TTF at cloudconvert.com → woff2 |
| `fonts/04b03.ttf`     | body text      | Fallback if woff2 unavailable                |

WOFF2 is ~30% smaller than TTF and loads faster. Always prefer it.

---

## Folder layout

```
magsmarietta/
├── index.html          ← main page
├── style.css           ← all styles
├── main.js             ← all scripts
├── images/
│   ├── header-heart.webp
│   ├── marquee-1.webp
│   ├── marquee-2.webp
│   ├── … (up to marquee-14.webp)
│   ├── product-ring.webp
│   ├── product-zipper.webp
│   ├── product-aglets.webp
│   ├── product-grommets.webp
│   ├── product-blanks.webp
│   └── product-hardware.webp
└── fonts/
    ├── 04b03.woff2
    └── 04b03.ttf
```
