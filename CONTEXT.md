# Fenchem landing site

The public marketing site for Fenchem. This glossary fixes the language we use
for the brand system and the landing-page design work. Exact color/type values
live in `docs/brand/fenchem-brand-book.md`; decisions live in `docs/adr/`.

## Language

### Business

**Fenchem**:
Global B2B manufacturer/supplier of additives and specialty ingredients (founded
1995): food & beverage, human nutrition, personal & home care, animal nutrition,
performance materials, agrochemicals. Brand line "Rooted in Nature, Refined by
Science" / 全球智研，服务无界.

**Division**:
A Fenchem business unit (Feed, Cosmetics, Agrochemical, Food, Chemical,
Nutrition). Each maps to one **auxiliary color**.
_Avoid_: department, business line, sector.

### Brand color

**Brand Blue (品牌蓝)**:
`#0743AE`. The corporate-lead color. In this repo "blue" always means this.
_Avoid_: navy, primary blue, generic blue.

**Brand Green (品牌绿)**:
`#64A733`. The co-primary "vitality" color and the **led** accent on the current
landing variants.
_Avoid_: leaf green, lime.

**Clean White (洁净白)**:
`#FFFFFF`. The default canvas.
_Avoid_: cream, off-white, parchment.

**Neutral Gray (中性灰)**:
`#D0D0D0`. Structure only — borders, dividers, muted text. Never a large fill.
_Avoid_: silver, light gray fill.

**Auxiliary colors (辅助色)**:
The six division accents (feed, cosmetics, agro, food, chem, nutrition). Used as
category/wayfinding accents, never a page theme.
_Avoid_: secondary colors, theme colors.

**Editorial palette**:
The retired nature palette (forest / fern / moss / mint / clay / blush …) from
the first landing page. Preserved at the `landing-v1-editorial` tag; off-brand
going forward.
_Avoid_: calling it "the palette" — that now means the brand book.

### Typography

**Source Han Sans (思源黑体)**:
The brand typeface, mandated for both Chinese and English (weights Bold /
Regular / Light). Delivered here as Google Fonts **Noto Sans SC**. The brand is
all sans-serif.
_Avoid_: Noto (ambiguous), Newsreader/serif (off-brand except the variant D
display exception).

### Landing variants

**A / B / C**:
The original three landing prototypes — Botanical Editorial, Innovation Lab,
Deep Forest — on the editorial palette + Newsreader serif. Restored from commit
`932b56c` into the prototype dir and switchable via `?variant=a|b|c` for
side-by-side comparison against their brand twins.

**D / E / F / G**:
The brand-book reinterpretations rendered via `?variant=` on `/`. **D←A**
(Botanical Editorial), **E←B** (Innovation Lab), **F←C** (Deep Forest → Deep
Green), **G** (hybrid production candidate). All **green-led**, Clean White
canvas, Source Han Sans; D keeps a serif display as a deliberate exception.
_Avoid_: reusing letters A/B/C for the new ones.

All seven (A–G) render on `/` via the dev-only switcher; the bar pairs each
original next to its brand twin (A↔D, B↔E, C↔F). Default variant is `d`.
