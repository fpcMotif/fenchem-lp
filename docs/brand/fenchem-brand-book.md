# Fenchem Brand Book — Color & Typography

Canonical reference for the Fenchem visual identity, transcribed from the
official brand-book pages (基础系统 / Basic System) and converted to the tokens
this codebase uses (Tailwind v4 `@theme`, OKLCH).

> Source of truth is the brand book. The OKLCH column is a faithful conversion of
> the brand book's sRGB (RGB) values — if a value ever disagrees, the RGB/Pantone
> in the brand book wins and the OKLCH should be re-derived.

## 1. Brand colors (品牌色)

The primary palette. Blue and green are co-primary; the brand book lists **Brand
Blue first** as the corporate lead, with Brand Green second.

| Name | 中文 | Pantone | CMYK | RGB | HEX | OKLCH |
|---|---|---|---|---|---|---|
| Brand Blue | 品牌蓝 | 2728 C | 95 78 0 0 | 7 67 174 | `#0743AE` | `oklch(0.424 0.18 261.523)` |
| Brand Green | 品牌绿 | 7737 C | 66 18 98 0 | 100 167 51 | `#64A733` | `oklch(0.66 0.163 134.705)` |
| Clean White | 洁净白 | White | 0 0 0 0 | 255 255 255 | `#FFFFFF` | `oklch(1 0 0)` |
| Neutral Gray | 中性灰 | Cool Gray 2C | 22 16 16 0 | 208 208 208 | `#D0D0D0` | `oklch(0.858 0 0)` |

## 2. Auxiliary colors (辅助色) — business-unit accents

Each Fenchem division has an assigned accent. Use sparingly, as category/section
accents — never as a page's primary surface.

| Division | 中文 | Pantone | CMYK | RGB | HEX | OKLCH |
|---|---|---|---|---|---|---|
| Feed | 饲料部 | 367 C | 45 0 75 0 | 162 212 94 | `#A2D45E` | `oklch(0.81 0.157 128.606)` |
| Cosmetics | 化妆品部 | 2583 C | 47 72 0 0 | 160 94 181 | `#A05EB5` | `oklch(0.59 0.145 317.586)` |
| Agrochemical | 农化部 | 2232 C | 60 0 40 20 | 85 166 149 | `#55A695` | `oklch(0.669 0.084 178.19)` |
| Food | 食品部 | 164 C | 13 60 81 0 | 228 131 54 | `#E48336` | `oklch(0.703 0.148 55.168)` |
| Chemical | 化工部 | 2727 C | 74 39 0 0 | 58 141 222 | `#3A8DDE` | `oklch(0.631 0.146 250.852)` |
| Nutrition | 营养部 | Yellow 012 | 0 0 60 0 | 255 246 127 | `#FFF67F` | `oklch(0.957 0.141 104.856)` |

## 3. Tints & shades (色阶规范)

The brand book derives tints by reducing the standard color's opacity / value in
10% steps (90% → 10%). In OKLCH we hold **hue constant**, move **L** toward the
extreme, and let **chroma** taper at the ends (a flat absolute chroma looks muddy
in tints and neon in shades). Anchor each brand color at its book value and build
both directions.

Brand Blue (`#0743AE`, H≈261.5) and Brand Green (`#64A733`, H≈134.7) ramps live
in `apps/web/src/index.css` under the brand `@theme` block; regenerate with
`/tmp/oklch.mjs` (kept out of the repo) if the anchors change.

Neutral ramp: pure neutral (chroma 0), Clean White at the top, Neutral Gray
`#D0D0D0` ≈ the 300 step, down to a near-black ink (`oklch(0.22 0 0)`) for text.

## 4. Typography (字体规范)

The brand book mandates **思源黑体 / Source Han Sans** for **both Chinese and
English**, in three weights:

| Weight | Role (per book) |
|---|---|
| Bold | Titles / headings (标题字重) |
| Regular | Body and below (标题以下字重) |
| Light | Only when Regular is not legible (当 Regular 不可识别时使用) |

- The brand is **all sans-serif** — there is no serif in the system. Any serif
  display type (e.g. the prior `Newsreader`) is off-brand and must go.
- **Delivery in this codebase:** Source Han Sans SC is published on Google Fonts
  as **"Noto Sans SC"** (same typeface, Adobe/Google co-release). It carries
  Latin + Simplified-Chinese glyphs, so one family covers EN + 中文.
- Token: `--font-brand: "Noto Sans SC", "Source Han Sans SC", "Source Han Sans", system-ui, sans-serif;`

## 5. Usage hierarchy

- **Blue = corporate / structural.** Primary surfaces, primary CTAs, headings on
  light backgrounds, the "serious B2B" weight of the page.
- **Green = vitality / action.** Secondary CTAs, success, eyebrows, icon chips,
  the "natural ingredients" signal.
- **Clean White = the canvas.** The brand reads clean and bright; white is the
  default background, not a warm cream.
- **Neutral Gray = structure only.** Borders, dividers, muted captions. Not a
  fill for large areas.
- **Auxiliary colors = wayfinding.** Tag a division/category, never a whole page.

See `CONTEXT.md` for the glossary and `docs/adr/` for the decisions that shaped
how this palette is applied to the landing page.
