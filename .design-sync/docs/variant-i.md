---
category: Landing · Production
---

Full-page landing variant — "Production+": VariantH's measured system plus the three moments the 2026-08 prototype review voted to absorb, and a WebGL layer.

Cinematic hero on a raw-WebGL "botanical silk" shader (no three.js; reduced motion renders one static frame, no WebGL falls back to a CSS gradient, pauses offscreen). P1's numbered division strip pinned to the hero's bottom edge — five divisions with accent dots and bilingual labels (营养保健 / 食品配料 / 化妆品 / 制药 / 宠物健康). Division color-block studio photography on the industries grid. P2's interactive world map rebuilt on brand tokens: equirectangular landmass vector (`world-map-path.ts`), arcs projected from real lat/lon, region selection via real buttons (keyboard/touch/AT, `aria-pressed`), marching-dash route gated by reduced motion.

Color law follows VariantH's measured decisions verbatim (green-950-on-green-500 CTAs, blue interactive-only, mute-600 floor).

## Usage

```tsx
<VariantI />
```

Renders the complete page. Interactive: the network map holds selection state; the hero shader is a self-managing canvas.
