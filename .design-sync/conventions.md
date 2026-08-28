# Fenchem LP — build conventions

Fenchem is a B2B botanical/functional-ingredients supplier (est. 1995, Nanjing;
nutrition, food, cosmetics, chem, agro, feed divisions). Tone: premium,
scientific, botanical. Copy voice: "Botanical Intelligence Since 1995",
"Request a Specification", ingredient names like ChondroActive™.

## Setup

No provider or wrapper is required — components render standalone. Mount
`<Toaster position="bottom-right" />` once per app to enable `toast(...)`.
Fonts load through `styles.css` (Google Fonts): **Newsreader** (serif display),
**Plus Jakarta Sans** (UI/body), **JetBrains Mono** (technical micro-labels).

## Styling idiom — Tailwind utilities, but ONLY the shipped vocabulary

`styles.css` is a compiled Tailwind 4 sheet: it contains exactly the utility
classes the Fenchem app uses, not the full framework. A class outside that set
silently does nothing. Two safe paths:

1. Reuse the classes the landing variants use (read any `Variant*.jsx`'s
   source patterns via its `.prompt.md`); layout basics (`flex`, `grid`,
   `gap-*`, `px-*`, `py-*`, `rounded-full`, `max-w-*`) are all present.
2. For anything else, use inline styles with the token vars:
   `style={{ background: "var(--color-forest)", fontFamily: "Newsreader, serif" }}`.

### Token vocabulary (CSS custom properties, all defined in styles.css)

- Editorial palette: `--color-cream`, `--color-parchment`, `--color-stone`,
  `--color-pebble`, `--color-forest`, `--color-fern`, `--color-moss`,
  `--color-sage`, `--color-mint`, `--color-mist`, `--color-bark`,
  `--color-clay`, `--color-blush` (variants A/B/C use these).
- Brand book (variants D/E/F/G — the current direction): `--color-brand-blue-50…950`
  (anchor `--color-brand-blue-700` = #0743AE), `--color-brand-green-50…950`
  (anchor `--color-brand-green-600`), `--color-paper`, `--color-ink`,
  `--color-line`; division accents `--color-nutrition`, `--color-food`,
  `--color-cosmetics`, `--color-chem`, `--color-agro`, `--color-feed`.
- Type: `--font-display` (Newsreader), `--font-body` (Plus Jakarta Sans),
  `--font-tech` (JetBrains Mono). shadcn tokens (`--background`, `--primary`,
  `--radius`, …) drive the Base UI components.

## Where the truth lives

- `styles.css` — every token and shipped utility (grep before inventing).
- `guidelines/docs/brand/fenchem-brand-book.md` — brand rules, color usage.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component usage.
- The seven `Variant*` components are complete reference pages: study
  `VariantG` (production candidate) and its brand twins D/E/F before building
  new Fenchem pages; A/B/C are the pre-brand editorial explorations.

## Idiomatic snippet

```tsx
<section style={{ background: "var(--color-paper)", padding: "96px 24px" }}>
  <Eyebrow accent="text-brand-green-600">Our Divisions</Eyebrow>
  <Intro>
    <h2 style={{ fontFamily: "Newsreader, serif", fontSize: 56, color: "var(--color-ink)" }}>
      Rooted in Nature, <em style={{ color: "var(--color-brand-green-600)" }}>Refined by Science</em>
    </h2>
  </Intro>
  <Reveal delay={0.1}>
    <Button size="lg">Request a Specification</Button>
  </Reveal>
</section>
```

Animation vocabulary: `Intro` above the fold, `Reveal` below it, `Eyebrow` for
section kickers — all respect reduced motion; shared ease `[0.22, 1, 0.36, 1]`
(exported as `EASE`).

## Landing design principles (2026-08 — law for new Fenchem pages)

Full doc: `guidelines/docs/brand/landing-design-principles.md`. The rules you
act on when composing a page:

1. **Light-first, green-led.** Ground on `var(--color-paper)`; at most one or
   two inverted `bg-brand-green-950` bands per page (finale, one mid beat).
   Blue is never a surface.
2. **Measured color law.** Primary CTA: `bg-brand-green-500` +
   `text-brand-green-950` (hover `bg-brand-green-400`) — never white text on
   green-500. Links/outline CTAs: `text-brand-blue-700` (blue =
   interactive-only). Eyebrows/numerals: `text-brand-green-700`. Small text
   floor: `text-mute-600`; `font-tech` labels never below 11px. On the dark
   green-950 ground use full-opacity `text-brand-green-400` /
   `text-brand-green-300`, never alpha-muted greens.
3. **Hairline structure.** Build section seams and stat bands as
   `grid gap-px bg-line` with `bg-paper` cells, plus `border-line` rules.
   Shadows only as hover reward.
4. **Type roles.** `font-display` (Newsreader) = headlines, big numerals,
   botanical Latin italics; `font-body` (Plus Jakarta Sans) = prose/UI;
   `font-tech` (JetBrains Mono) = uppercase micro-labels
   (`text-[11px] uppercase tracking-[0.26em] text-mute-600`), spec codes,
   coordinates. Numerals never use the body face.
5. **Number only real sequences** (section numerals, division indices, spec
   codes) — never decorative numbering.
6. **Spec-sheet copy voice.** Argue with checkable numbers (certs, purity,
   SLAs: "Response < 24h", "ISO 9001 · GMP"), not adjectives.
7. **One motion system.** `Intro`/`Reveal` with `EASE` + `STAGGER` only; every
   custom animation must be reduced-motion gated and every hover affordance
   needs a keyboard path.

Study `VariantH` (spec ledger) and `VariantI` (adds the WebGL hero, division
strip and interactive world map) as the reference compositions.

**Deferred scope:** product pages, forms, and navigation-menu patterns are
not yet specified — they will be designed later. Do not derive menu or form
law from the landing variants; compose only landing/marketing surfaces from
these rules.
