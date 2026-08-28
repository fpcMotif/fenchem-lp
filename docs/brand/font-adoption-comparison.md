# Font Adoption Comparison — Fenchem English Landing Site

_Date: 2026-06-15 · Scope: typography for landing variants D/E/F/G (English).
Brand color palette is unchanged by this report._

## TL;DR / Recommendation

For the **English-language** landing site, adopt the **A/B/C typographic system** —
**Newsreader** (serif) for display headlines, **Plus Jakarta Sans** for body/UI,
**JetBrains Mono** for technical/data labels — and drop **Source Han Sans / Noto
Sans SC** as the primary UI face. Keep `Noto Sans SC` only as a _local_ CJK
fallback in the font stack (no web-font import), so the brand face is still used
for any Chinese glyphs on machines that have it. **Brand colors stay exactly as
they are.**

Rationale: Source Han Sans is a CJK typeface whose Latin glyphs are designed to
harmonize with Han characters — functional but generic for an English brand site.
Plus Jakarta + Newsreader are purpose-built for Latin and read as a designed,
premium identity appropriate to a science-led B2B ingredients supplier. The brand
book's Source Han Sans remains correct for **Chinese-language** materials.

## Candidates

| Role                    | Current (brand book)                   | Proposed (A/B/C system)                   |
| ----------------------- | -------------------------------------- | ----------------------------------------- |
| Display / headlines     | Source Han Sans (Noto Sans SC) Bold    | **Newsreader** (serif) 300–700            |
| Body / UI               | Source Han Sans (Noto Sans SC) Regular | **Plus Jakarta Sans** 300–800             |
| Technical / data labels | (mono)                                 | **JetBrains Mono** 400–600                |
| CJK (中文)              | Source Han Sans (Noto Sans SC)         | Source Han Sans — **local fallback only** |

## Measured evidence

Captured live from the running site (variant D), DevTools-equivalent measurement
via the preview inspector. Reproduce with the snippets in the appendix.

### 1. `@font-face` declaration bloat

- **Total `@font-face` rules on the page: 537.** Noto Sans SC contributes ~500 of
  them (one per CJK unicode-range subset × 5 weights). Plus Jakarta Sans,
  Newsreader, and JetBrains Mono are **1–2 faces each**.
- Even though Google lazy-loads only the subsets actually used, 500+ rules is real
  CSS parse/match overhead and a fragility risk: any stray CJK character pulls
  additional multi-hundred-KB subsets.

### 2. Runtime download payload (English text only)

| Family                      | Requests | KB downloaded |
| --------------------------- | -------- | ------------- |
| Noto Sans SC (Latin subset) | 2        | ~176 KB       |
| Newsreader (variable serif) | 2        | ~272 KB       |
| JetBrains Mono              | 1        | ~31 KB        |

Honest read: Noto's **English-only** payload (~176 KB) is _comparable_ to the
alternatives, so the performance argument is modest — Newsreader (variable serif)
is actually the heaviest single face. The case against Noto rests on design and
declaration bloat, **not** runtime bytes.

### 3. Rendered width (identical text, same size)

Width ratio vs Plus Jakarta Sans (1.000 = same width):

| Family            | Display 40px/700 | Body 18px/400 |
| ----------------- | ---------------- | ------------- |
| Plus Jakarta Sans | 1.000            | 1.000         |
| Noto Sans SC      | 1.016            | 1.001         |
| Newsreader        | 0.953            | 0.868         |
| JetBrains Mono    | 1.245            | 1.288         |

Honest read: Noto Sans SC is **only ~0.1–1.6% wider** than Plus Jakarta — width is
**not** a differentiator. (Newsreader is more compact; JetBrains is ~29% wider, as
expected for a monospace — correct for labels only, never body.)

### 4. Visual specimen (identical text, each candidate)

A controlled specimen ("Global Intelligent Research" at 44–46px; the hero body
paragraph at 17px) shows the qualitative difference the numbers miss:

- **Noto Sans SC display** — monoline, even-weight, CJK-harmonized Latin; reads as
  a generic system face. Punctuation (apostrophes) sits with wide CJK sidebearing.
- **Plus Jakarta Sans display** — humanist contrast and rhythm; reads as a designed
  brand sans. Clearly more premium at headline scale.
- **Newsreader serif** — elegant, editorial, authoritative; well-suited to a
  heritage, science-led brand and to large display type.
- **Body** — Noto vs Plus Jakarta are close in width but Plus Jakarta has more even
  spacing and character; Noto body is acceptable but flat.

## Evaluation

| Criterion                                 | Source Han Sans (Noto SC)      | Plus Jakarta + Newsreader + JetBrains            |
| ----------------------------------------- | ------------------------------ | ------------------------------------------------ |
| **English letterform quality**            | Generic (CJK-harmonized Latin) | Purpose-built Latin; premium                     |
| **Display / headline presence**           | Flat at large sizes            | Newsreader serif = authoritative                 |
| **Enterprise legibility (UI sizes)**      | Acceptable                     | Good; humanist sans tuned for UI                 |
| **Industry fit (science / heritage B2B)** | Neutral, plain                 | Serif heritage + clean sans = credible           |
| **Numerals / technical data**             | OK                             | JetBrains Mono excels (ISO codes, %, specs)      |
| **Web-font footprint**                    | 500+ `@font-face` rules        | ~5 faces total                                   |
| **CJK (中文) coverage**                   | Native (it's a CJK face)       | Via local Noto fallback; web import for CN pages |
| **Brand-book compliance**                 | Compliant                      | Deviates (documented in ADR-0002)                |
| **Continuity with chosen layouts**        | —                              | Matches A/B/C, which the owner preferred         |

## Decision

Adopt the A/B/C system for the English site; retain Source Han Sans for
Chinese-language materials and as a local fallback. Recorded in
[ADR-0002](../adr/0002-english-site-typography.md). The brand color palette
(Brand Blue `#0743AE`, Brand Green `#64A733`, etc.) is **unchanged**.

### Implementation

- `index.css`: remove the Noto Sans SC web-font import; set
  `--font-body: "Plus Jakarta Sans", "Noto Sans SC", system-ui, sans-serif`
  (Noto as local-only CJK fallback); keep `--font-display` (Newsreader),
  `--font-tech` (JetBrains Mono).
- Variants D–G: replace `font-brand` with `font-body` (body/UI) and `font-display`
  (display headlines), matching each variant's A/B/C twin. No color, layout,
  spacing, motion, or copy changes.

## Appendix — reproduce

Run on the live site (`?variant=d`) via the preview inspector:

- **Face count:** `document.fonts.size`
- **Width:** render the same string in offscreen spans per family and compare
  `getBoundingClientRect().width`.
- **Payload:** `performance.getEntriesByType('resource')` filtered to font URLs,
  summing `transferSize`.
- **Specimen:** inject a fixed overlay rendering identical text in each
  `font-family` and screenshot.
