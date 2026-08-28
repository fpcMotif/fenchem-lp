# Landing variants — design review (2026-08)

Full-page review of the seven landing variants, graded on typography, color
discipline, hierarchy, imagery, and B2B credibility. Use this when polishing
existing variants or building new Fenchem pages.

## Verdict

> **2026-08 update — superseded by VariantH ("Production · recommended").**
> Every finding below (measured contrast failures, type floors, color
> semantics, motion gaps) is applied in `variant-h.tsx`, which also adds the
> three missing modules: the Portfolio nav menu, the Product Dossier, and the
> interactive Formulation Presenter. Its header comment records the measured
> ratios behind each color decision. G remains as the pre-fix hybrid; the
> imagery replacement below is still open as a content task (H carries local
> overrides for the three worst images only).

**VariantG (Green-Led Hybrid) was the right production direction** — it already
curates the strongest modules: B/E's spec discipline (stat band, ingredient
matrix, coordinates), a calmer industries list, and F's deep-green mood used as
a _finale section_ instead of a whole-page wash. Blue stays structural exactly
as the brand book intends. Second-best complete page: **VariantE**; best
single moments: **VariantC/F's hero** and C's "Grown with patience" editorial.

## What is good (keep, reuse)

- **B's spec-sheet conviction** — hero spec table, FIG/batch captions,
  SYS.CAT section codes, the ingredient matrix with purity/form/application
  rows, the ghost FENCHEM footer wordmark. The most distinctive B2B voice in
  the set; it survived into E and G because it earns trust with formulators.
- **C/F's cinematic hero** — cream Newsreader over the dark botanical image
  with a single italic accent line is the strongest opening of the set; F's
  green-tinted version is fully brand-compliant.
- **C's editorial pacing** — "Grown with patience." + the pull-quote is the
  best copy moment on any page. Reuse that pattern (numbered eyebrow, serif
  claim, indented italic quote).
- **E/G's division tag system** — colored NUTRITION / FOOD & BEV / PERSONAL
  CARE tags with per-division accent borders add real information design;
  in G they are used with restraint (matrix only), which is correct.
- **A/D's blob-masked hero image + floating stat card** — memorable, and D's
  clean white (`--color-paper`) canvas reads more premium than A's cream.
- **G's footer** — cert chips (ISO/FSSC/GMP/HACCP/Kosher/Halal), three link
  columns, ghost wordmark: complete and calm.

## What is bad (fix before production)

1. **Stock imagery undermines the brand story** (worst offender, all pages):
   - A branded third-party product tube ("Curology") appears on every
     Personal Care / Hyaluronic Acid card. A competitor's brand on a Fenchem
     page is a hard no.
   - Colorful pharma pill piles (KSM-66, Curcumin, CoQ10 cards) read generic
     drugstore, not premium botanical. Replace with raw-material photography:
     roots, powders, extraction, glassware.
   - The purple fluorescence-microscopy image (C/F/G "science" sections)
     reads oncology lab, tonally wrong next to botanical luxury. Replace with
     HPLC/lab-bench or macro botanical imagery.
   - D's secondary "legacy" image shows people toasting beers — off-brand.
2. **"25+ years … since 1995" is stale math** — it is 30+ in 2026. Fix the
   stat everywhere (A/B/C/D/E/F/G all carry it).
3. **Green overload in brand heroes (E, G)** — two of three headline lines in
   saturated brand-green reads promotional. Keep green to ONE emphasized
   phrase (D's balance — one green word, one blue italic — is closer, though
   the double accent hue in a single headline should also be resolved: pick
   one).
4. **E uses six hues on one page** (green + blue + yellow + orange + purple
   division tags) — the clinical concept thrives on restraint; G's usage
   (tags in matrix only) is the correct dosage.
5. **Cavernous dead space in C, D, F** — multi-hundred-pixel empty bands
   between sections (F's standards section, C's chapter gaps, D's pillars →
   rail gap). Tighten section rhythm to roughly halve the empty bands.
6. **E's flat #0743AE CTA panel** — the huge saturated blue block with a
   saturated green button is the loudest moment in the whole set; G's
   deep-green finale with a soft radial glow does the same job with far more
   composure.

## Polish priorities for VariantG

1. Replace the four stock-image categories above (pills, Curology,
   microscopy, and audit every Unsplash pick against "raw botanical
   material" direction).
2. Rebalance the hero headline: black-dominant with one green phrase.
3. Fix the years stat.
4. Consider porting C's pull-quote editorial block into the space between
   the matrix and standards sections — G currently has no purely editorial
   beat, and it is the one thing the hybrid lost.
