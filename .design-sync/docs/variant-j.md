---
category: Landing · Production
---
Full-page landing variant — "The Greenhouse Ledger": the motion-led production build. VariantH's structure and measured color decisions, re-choreographed with GSAP + Lenis (sole smooth-scroll engine, killed under reduced motion) and a dark → light → dark page arc: C/F's cinematic hero opens, H's white spec ledger carries the middle, the deep-green finale closes.

Art direction: `guidelines/docs/brand/variant-j-direction.md` (if synced). Section order matches H: Nav → Hero → Ticker → Industries → Matrix → Dossier → Presenter → Origin + Standards → Finale → Footer.

## Usage
```tsx
<VariantJ />
```
Renders the complete page inside its own `MotionRoot` (GSAP/Lenis lifecycle — no outer provider needed).
