# Fenchem Landing Page — Prototype Brief

Three radically different landing pages for **Fenchem**, a global B2B supplier of
botanical/functional ingredients (nutrition & supplements, food & beverage,
personal care). 25+ years, 6 global bases, ISO/GMP certified. Brand essence:
**"Rooted in Nature, Refined by Science"** — premium wellness where lab
precision meets the restorative power of the forest.

Source design system: `../../../../../DESIGN-STITCH.md` ("Botanical Essence",
from the user's Stitch project). Reference copy/layouts mined from Stitch:

- `reference/vitality_home.html` — warm botanical editorial home
- `reference/innovation_home.html` — technical "Innovation Lab" home

## Hard contract (every variant)

- One file per variant: `variant-a.tsx`, `variant-b.tsx`, `variant-c.tsx`.
  Named export `VariantA` / `VariantB` / `VariantC`, no props.
- Fully self-contained page: own nav/header, hero, content sections, CTA,
  footer. NO shared layout components between variants.
- Do not touch any file other than your own variant file.
- Read-only: no Convex queries, no auth, no mutations. CTAs link to `#` or
  scroll anchors.
- Stack: React 19, Tailwind v4 classes, `motion/react` (installed) for
  animation, `lucide-react` for icons. No new dependencies.
- Must look stunning at 1440px AND hold up at 390px (responsive).
- Page must be fluid: scroll-reveal animations (`whileInView`), eased hovers,
  gentle parallax where it helps. Never janky, never gratuitous.
- Respect `prefers-reduced-motion` (motion/react `useReducedMotion` or CSS).

## Theme tokens (Tailwind classes available)

Colors: `forest #173124` · `fern #2d4739` · `moss #496455` · `sage #536350` ·
`mint #d6e8cf` · `mist #ccead6` · `cream #fbf9f4` · `parchment #f5f3ee` ·
`stone #f0eee9` · `pebble #e4e2dd` · `bark #1b1c19` · `clay #772527` ·
`blush #ffdad8`
→ use as `bg-forest`, `text-cream`, `border-mint`, etc.

Fonts: `font-display` (Newsreader serif — headlines, tight tracking, light
weights at large sizes), `font-body` (Plus Jakarta Sans — everything else),
`font-tech` (JetBrains Mono — micro-labels, data).

Shadows: `shadow-ambient`, `shadow-lift` (forest-tinted, never pure black).
Animation: `animate-marquee` (translateX 0 → -50%, 32s linear; duplicate the
track content for a seamless loop).

## Verified imagery (Unsplash, all return 200)

Append `?auto=format&fit=crop&w=1600&q=80` (adjust w/q to usage):

- `https://images.unsplash.com/photo-1416879595882-3373a0480b5b` — lush green plant
- `https://images.unsplash.com/photo-1501004318641-b39e6451bec6` — pale botanical leaves, soft light
- `https://images.unsplash.com/photo-1466781783364-36c955e42a7f` — foliage detail
- `https://images.unsplash.com/photo-1532634922-8fe0b757fb13` — laboratory glassware/work
- `https://images.unsplash.com/photo-1576086213369-97a306d36557` — biotech lab, microscope
- `https://images.unsplash.com/photo-1518531933037-91b2f5f229cc` — leaf macro with dew
- `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09` — forest canopy, sunlight
- `https://images.unsplash.com/photo-1441974231531-c6227db76b6e` — tall forest path
- `https://images.unsplash.com/photo-1556228578-8c89e6adf883` — skincare/cosmetic product
- `https://images.unsplash.com/photo-1610348725531-843dff563e2c` — supplement capsules
- `https://images.unsplash.com/photo-1490645935967-10de6ba17061` — healthy food bowl
- `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136` — kitchen/food flatlay
- `https://images.unsplash.com/photo-1559757148-5c350d0d3c56` — herbal medicine/capsules
- `https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2` — fresh produce
- `https://images.unsplash.com/photo-1505576399279-565b52d4ac71` — spa/wellness still life
- `https://images.unsplash.com/photo-1512069772995-ec65ed45afd6` — herbal tea/botanicals

Subjects are approximate — pick what fits, a visual QA pass follows.

## Copy pool (use, adapt, stay B2B-credible)

- Eyebrow: "Botanical Intelligence Since 1995" / "SYSTEM ACTIVE — INGREDIENT ENGINEERING"
- H1s: "Nurturing Vitality through Botanical Excellence" / "Engineering
  high-performance ingredients for a synthesized world" / "Rooted in Nature,
  Refined by Science"
- Stats: 25+ years · 6 global bases · ISO/GMP certified · 40+ countries served
- Industries: Nutrition & Supplements · Food & Beverage · Personal Care & Cosmeceuticals
- Ingredient examples: Ashwagandha KSM-66, Lutein, Astaxanthin, Coenzyme Q10,
  Phytosterols, Curcumin, Hyaluronic Acid, Beta-Carotene
- Pillars: Traceable Sourcing / Clinical-Grade R&D / Global Compliance
- CTA: "Partner with Fenchem" / "Explore Portfolio" / "Request a Specification"

## Variant briefs (must stay structurally divergent)

### A — Botanical Editorial (`variant-a.tsx`, base: reference/vitality_home.html)

Warm cream gallery. Floating pill nav. Serif hero (left-aligned, oversized
Newsreader, italic accent words) beside an organic blob-masked botanical image.
Asymmetric industry cards (varying heights/offsets, generous whitespace,
120px+ section gaps). "Rooted in Nature, Refined by Science" split section.
Quiet certification strip. Deep forest-green footer. Mood: premium wellness
magazine. DO NOT use full-bleed dark sections or mono-grid data tables.

### B — Innovation Lab (`variant-b.tsx`, base: reference/innovation_home.html)

Clinical white. Hairline `border-pebble` grid lines everywhere — the page reads
as a living spec-sheet/terminal. Sticky top bar with mono micro-labels
(`SYS.ACTIVE`, coordinates, ISO tags). Massive sans/serif-mixed headline block.
Stat band in bordered cells (25+ YEARS / 6 GLOBAL BASES / ISO GMP). "Ingredient
Matrix" — rigid 3-col grid, grayscale imagery (CSS `grayscale` filter) that
gains color on hover, mono index numbers (01—, 02—). Scrolling ticker marquee
of ingredient names. Mood: laboratory protocol meets Swiss typography. DO NOT
use cream/warm backgrounds, blob shapes, or asymmetric float layouts.

### C — Deep Forest (`variant-c.tsx`, no Stitch base — new direction)

Immersive cinematic dark (`bark`/`forest` gradients). Full-viewport hero:
forest-canopy image with dark gradient overlay, enormous centered light-weight
Newsreader display type, glassy translucent nav (backdrop-blur). Story unfolds
in full-screen chapters with sticky/parallax imagery. Horizontal scroll-snap
ingredient rail (glass cards, `mint` accents). Glowing mint CTA. Mood: luxury
flagship — Aesop meets Apple event page. DO NOT use white/cream page
backgrounds or bordered grid tables.

## After the prototype

Winner gets folded into the route properly (rewritten, not promoted as-is);
losers and the switcher get deleted. Record the verdict in NOTES.md here.
