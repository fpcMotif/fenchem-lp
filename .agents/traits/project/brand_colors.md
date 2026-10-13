---
paths:
  - 'apps/web/src/**/*.{ts,tsx,css}'
  - '!**/*.test.*'
  - '!apps/web/src/components/prototype/variant-{a,b,c}.tsx'
  - '!apps/web/src/components/landing/landing-page.tsx'
when:
  - '#[0-9a-f]{3,8}'
  - '(rgb|hsl|oklch)a?[(]'
---
Colors come from docs/brand/fenchem-brand-book.md: Brand Blue #0743AE, Brand Green #64A733 and their ramps, and the neutral ramp from Clean White #FFFFFF through Neutral Gray #D0D0D0 to near-black ink for text. Neutral Gray is for borders, dividers and muted text, never a large fill. The division colors (feed #A2D45E, cosmetics #A05EB5, agro #55A695, food #E48336, chem #3A8DDE, nutrition #FFF67F) are category accents only, never a page theme. The retired editorial palette (forest, fern, moss, mint, clay, blush) is off-brand.
