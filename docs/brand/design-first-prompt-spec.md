# Fenchem — design-first prompt spec

The locked design-system prompt for generating Fenchem landing UI, sections,
campaign slides, and imagery. Prompt like a design system, not a wish: paste
the master prompt below into any UI/image generator (v0, Lovable, Figma Make,
Midjourney/Doubao for photography), then iterate by changing **one variable at
a time**.

Sources: `docs/brand/fenchem-brand-book.md` (tokens), `variant-h.tsx`
(production copy + measured contrast decisions),
`landing-variants-design-review.md` (what failed), and the peer-site study
below (Seppic, Croda — same industry, 2026-08).

---

## 1. Master prompt (copy/paste)

```text
GOAL
- B2B landing page for Fenchem Biotek Ltd. — a global botanical-ingredient
  supplier (est. 1995, HQ Nanjing) selling standardized actives to
  formulators in Nutrition, Food & Beverage, and Personal Care.
- Audience: R&D formulators, sourcing managers, QA/regulatory leads.
- Success: reads as a credible ingredient partner in 5 seconds — spec-sheet
  precision + botanical freshness. Conversion action: "request documentation /
  explore portfolio", not e-commerce.

FORMAT
- Desktop-first 1440px layout, max content width 1480px, fluid to 375px.
- Section padding ~96–128px vertical; no multi-hundred-pixel dead bands.
- For still mockups/slides: 1080x1350 or 1600x900, 90px safe margins.

LAYOUT (wireframe in words)
- 12-col grid, generous left-aligned headline column (7/12), supporting
  media right (5/12).
- Page order: Hero → stat band → division/industry cards → ingredient
  matrix (spec-table) → quality pillars + certifications → editorial
  pull-quote beat → global supply map → deep-green CTA finale → footer
  with ghost FENCHEM wordmark.
- Hierarchy per section: mono uppercase eyebrow → bold headline → one
  support paragraph → one CTA. Never two competing headlines.

TYPE SYSTEM
- One family only: Source Han Sans / Noto Sans SC (covers EN + 中文).
  NO serif anywhere — the brand is all sans.
- H1: Bold 700, clamp(2.6rem→5.5rem), leading 1.05–1.1, tracking -0.04em.
- Body: Regular 400, 16–18px, relaxed leading, max ~60ch measure.
- Micro-labels/eyebrows: 11px uppercase, tracking +0.32em, mono-styled.
- Light weight only where Regular would be illegibly heavy.

COLOR + MATERIAL
- Canvas: Clean White #FFFFFF. Bright and clinical, never warm cream.
- Ink: near-black oklch(0.22 0 0). Structure/borders: Neutral Gray #D0D0D0.
- Brand Blue #0743AE = corporate/structural: headings accents, secondary
  CTA outline, footer, nav. The "serious B2B" weight.
- Brand Green #64A733 = vitality/action: primary CTA, ONE emphasized
  headline phrase, eyebrows, success. Never wash a whole page in it —
  except the single deep-green CTA finale section (dark green surface,
  soft radial glow, cream text).
- Division accents (tags/borders ONLY, never surfaces): Feed #A2D45E,
  Cosmetics #A05EB5, Agrochemical #55A695, Food #E48336, Chemical
  #3A8DDE, Nutrition #FFF67F. Max 3 visible per viewport.
- Material: flat, hairline 1px borders, 2px radius on cards/CTAs, subtle
  grain OK, no glassmorphism, no gradients except the finale glow.

IMAGERY
- Lane A (default, editorial): raw botanical material — roots, powders,
  seeds, extraction glassware, macro leaf/dew — soft daylight, neutral
  lab surfaces, shallow depth.
- Lane B (campaign/division cards): studio photography on a seamless
  single-hue background matching the division accent (subject: person
  using the end product, ingredient, or pet for Feed) — flat even light,
  center-weighted subject, generous negative space for type.
- Real assets available: HQ building on grass hill (about/finale),
  global-offices map (blue pins, 15 countries).

COPY (render EXACTLY)
- Eyebrow:  BOTANICAL INTELLIGENCE SINCE 1995
- H1:       Nurturing Vitality through Botanical Excellence
            ("Botanical Excellence" is the one green phrase)
- Support:  Fenchem converts raw botanical complexity into precisely
            specified, clinically validated actives — supplied at
            industrial scale to formulators in more than forty countries.
- CTA 1:    Explore Portfolio          (green, primary)
- CTA 2:    Build a Formulation        (blue outline, secondary)
- Stats:    30+ Years · 6 Global bases · 40+ Countries · ISO/GMP
- Tagline:  Rooted in Nature, Refined by Science

CONSTRAINTS (change 1–2 per iteration, never more)
- FONT: Source Han Sans (Noto Sans SC)
- STYLE: clinical-editorial, spec-sheet B2B
- MODE: light (white canvas), single dark-green finale section

NEGATIVE PROMPT
- No serif type, no cream/beige canvas, no watermarks, no lorem ipsum.
- No text beyond the provided lines; no gibberish typography.
- No competitor products or branded packaging (e.g. retail tubes).
- No pill piles, no fluorescence microscopy, no lifestyle drinking shots.
- No two accent hues inside one headline; no more than 3 division
  colors per viewport; no saturated flat #0743AE full-width panels.
```

---

## 2. Peer-site study (what to steal, what to skip)

**Seppic** (seppic.com, "Science that cares" — closest analogue):

- **Steal:** tagline-led hero over full-bleed macro fluid/ingredient
  photography; market-segment cards each carrying its own color-coded
  image (maps 1:1 to our division-accent system); product/formula search
  bar inside the hero — a strong formulator-utility signal worth adding
  to a future variant; events + news strip for credibility.
- **Skip:** five stacked full-width segment banners get heavy on mobile;
  our matrix already does that job with more information density.

**Croda** (croda.com, "Smart science to improve lives"):

- **Steal:** the heritage block ("100 years of improving lives") — our
  30-years-since-1995 story deserves the same narrative beat; purpose
  line held constant across every section.
- **Skip:** news-carousel-as-hero (investor-relations energy, weak first
  impression for formulators); ALL-CAPS headline system; share-price
  widget. Croda's homepage serves shareholders — ours serves buyers.

Both confirm the industry visual language: white canvas, one corporate
blue/navy, science + nature photography, restrained accents. Fenchem's
green-led-with-blue-structure system fits the category while the green
CTA + division tags keep it distinct.

---

## 3. Iteration protocol

1. **First output locks layout + hierarchy + copy.** Judge nothing else.
2. Then vary ONE axis per generation:
   - hero media (Lane A macro botanical ↔ Lane B seamless studio ↔ HQ building)
   - accent dosage (green phrase count, division-tag visibility)
   - matrix density (6 featured rows ↔ full 8)
   - finale surface (deep green ↔ blue-ink)
3. Typography is fragile in image models — two-pass workflow: generate
   with a reserved clean text-safe area, typeset for real in Figma/code.
4. Keep references local: drop peer screenshots and brand-book pages in
   `refs/` (gitignored) and point prompts at them; never ask a model to
   "remember" the style.

## 4. Known content debts (fix before any ship)

- Shared `landing-content.ts` still says "25+ years" — must read 30+
  (variant-h overrides locally; the shared source is the bug).
- Stock-image audit from the design review still open: replace pills /
  branded tube / microscopy / toast images with Lane A or Lane B shots.
