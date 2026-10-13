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
`#64A733`. The co-primary "vitality" color and the **led** accent on variants
D–G.
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
The brand-book typeface (weights Bold / Regular / Light), used for Chinese
text. The **O campus shell** and its about and products variants set all
Chinese text in it, loaded as **Noto Sans SC** from Google Fonts. On the
English landing site it covers only Chinese glyphs, through a local Noto Sans
SC fallback (ADR-0002).
_Avoid_: Noto (ambiguous).

**English type system**:
Newsreader (serif display), Plus Jakarta Sans (body and UI) and JetBrains Mono
(technical labels). ADR-0002 adopts it for the English landing site in place
of Source Han Sans.
_Avoid_: calling Newsreader off-brand or a variant D exception.

### Content

**Content seam**:
`apps/web/src/components/landing/landing-content.ts` — the single typed module
that owns every stable domain fact the landing surface renders (ingredients,
industries, pillars, stats, certifications, regions, company facts). Every
**landing variant** and the folded-in `LandingPage` render _through_ it; only
per-variant **prose** (headlines, eyebrows, bespoke section copy) and
presentation (StyleX styles, motion, icons, layout) stay local. The
**official-site family** takes its content from O's Figma transcription
instead.
_Avoid_: "the data file", "constants" — it is an interface, not a dumping ground.

**Featured ingredient**:
The six-ingredient curated subset (`getFeaturedIngredients()`) shown in the
matrix / rail presentations, vs. the full eight in `ingredients`. Phytosterols
and Beta-Carotene are the two non-featured.

**Canonical footprint**:
The six Fenchem regions in `regions` (Nanjing HQ, Hackensack, Frankfurt,
Johannesburg, São Paulo, Kuala Lumpur), each with `coords`. Reconciled once
here; the earlier per-variant "node" lists (California / Tokyo / Bangkok) are
retired so the footprint lives in one place.
_Avoid_: a separate office/node list per variant.

### Landing variants

**Variant**:
One complete landing-page design candidate, chosen on `/` with
`?variant=<key>`. The variant registry
(`apps/web/src/components/prototype/variants.ts`) declares every variant once,
in the dev-only switcher's order. The default is **S** (Strontium · periodic
index).
_Avoid_: version, theme.

**Twin**:
The earlier variant a variant reinterprets: D←A, E←B, F←C, V←H, S←V, and each
official-site variant back to O, OOS or OOS1. The registry places A↔D, B↔E and
C↔F side by side, so ←/→ toggles each pair.

**Landing variant**:
Any variant outside the official-site family: A–K and S–Y (W is the Three.js
waterfall). Each renders through the **content seam**.

**A / B / C**:
The original three landing prototypes — Botanical Editorial, Innovation Lab,
Deep Forest — on the editorial palette + Newsreader serif. Restored from commit
`932b56c` into the prototype dir.

**D / E / F / G**:
The brand-book reinterpretations. **D←A** (Botanical Editorial), **E←B**
(Innovation Lab), **F←C** (Deep Forest → Deep Green), **G** (hybrid). All
**green-led** on a Clean White canvas, set in the **English type system**.
_Avoid_: reusing letters A/B/C for the new ones.

**Official-site family**:
**O**, the transcription of the Figma 官网设计, and the variants that refine
it: OO, OO1, OO2, OOS, OOS1, OOS2, OOS3, OOSS, OOX–OOX3, OOS1DOUBAO, and the
about and products variants.

**O campus shell**:
**OOS1** (O campus quadrants) as a host: a home view plus five sub-pages —
about, products, R&D, news and contact. About and products variants render
inside it.

**About variant**:
An alternative about sub-page (OOS1A–OOS1Z) rendered in the O campus shell.

**Products variant**:
An alternative products sub-page (OOS1PA–OOS1PT) rendered in the O campus
shell, made of a catalog and a solutions section. The switcher's compare mode
swaps either half for the OOS1 baseline. OOS1DOUBAO is a standalone page
variant, not a products variant.
