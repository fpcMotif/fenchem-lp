# Variant J — "The Greenhouse Ledger" · art direction

Compact direction for the motion-led production build (`variant-j/`). Written
before implementation, per the build-awwwards-quality-sites skill. Companion
web-design skills followed: **gsap** (motion patterns) and **tailwindcss**
(styling conventions); structure informed by **landing-page**.

## Visual thesis

Botanical patience, recorded with laboratory precision. The page is a ledger
kept in a greenhouse: cinematic dark botanical imagery (the review's
best-rated moment, C/F's hero) opens the story; H's clean white spec
discipline carries the middle; the deep-green finale closes it. A deliberate
dark → light → dark arc replaces the flat single-canvas pages.

## Hero focal asset

Full-viewport photograph (hands holding a seedling — Unsplash
`photo-1542601906990-b4d3fb778b09`) under a bark scrim. Cream Newsreader
headline "Rooted in Nature, / _Refined by Science._" revealed word-by-word;
JetBrains Mono eyebrow; ONE green primary CTA + one outline CTA. Scroll
scrubs a slow parallax and deepens the scrim.

## Type hierarchy

- Display: Newsreader Light, tight leading, at most ONE italic accent phrase
  per headline (review rule #3).
- Body/UI: Plus Jakarta Sans.
- Ledger labels: JetBrains Mono 10–11px, 0.26em tracking, uppercase —
  floor 11px for reading text (H's measured floor).

## Color system

Tokens only (`--color-*`). Page arc: `bark` (hero) → `paper` (industries,
matrix, dossier, presenter) → `brand-green-950` (finale/footer). Green =
one emphasized phrase per headline + primary CTAs (`green-500` fill with
`green-950` text — 5.18:1). Blue strictly interactive (links, outline CTA).
Division accents only as chip dots in the matrix. Small text ≥ `mute-600`.

## Section sequence

Nav → Hero (dark) → Ticker → Industries → Ingredient Matrix → Product
Dossier → Formulation Presenter → Origin pull-quote + Standards (the
editorial beat the hybrid lost — review priority #4) → Finale (deep green)
→ Footer.

## Motion narrative — "germination"

Everything enters the way a plant grows: upward, unhurried, once.

- Headings: word-by-word rise-and-settle (accessible split: sr-only original,
  aria-hidden spans; links never split).
- Copy/media: masked rise (y: 28 → 0), images settle scale 1.06 → 1.
- Ledger hairlines draw in (scaleX 0 → 1, transform-origin left).
- Marquee ticker: continuous, pauses on reduced motion (renders static row).
- Scrubbed moments (restraint: two): hero parallax+scrim; origin pull-quote
  line-by-line ink-in. No pinning anywhere else.
- CSS owns hover/focus states; GSAP never touches properties CSS animates.

## Smooth-scroll engine

**Lenis** — sole engine (evaluated vs Locomotive Scroll: Lenis is actively
maintained, smaller, and has first-class ScrollTrigger wiring). One instance,
driven by gsap.ticker; `lenis.on("scroll", ScrollTrigger.update)`;
measurements refreshed on font/media load; destroyed on unmount. Fully
bypassed under `prefers-reduced-motion: reduce` — native scroll, no scrub,
final states set immediately.

## Three.js decision

**No.** The direction is photographic/editorial; depth comes from imagery,
scrim, and type scale. A shader canvas would be ornament, cost the static-first
guarantee, and add nothing the narrative needs.

## Asset provenance

All photography: Unsplash (Unsplash License), hot-linked `images.unsplash.com`
IDs recorded beside each use in `variant-i/content.ts`. Pool restricted to the
review-approved raw-botanical set already curated in variant-h's
`IMAGE_OVERRIDES` (no pill piles, no third-party branded products, no
microscopy, no people presented as customers). No testimonials, no logo wall —
certifications appear as text chips (real: ISO 9001, FSSC 22000, GMP, HACCP,
Kosher, Halal). Icons: lucide-react (already the repo's icon system) for
interface symbols only.

## Static-first / accessibility

SSR markup is complete and visible with JavaScript unavailable — initial
hidden states are applied by GSAP at runtime, never authored in CSS/markup.
Keyboard focus visible on all interactive elements; the presenter's chips are
real buttons with `aria-pressed`; reduced-motion renders final layouts
immediately.
