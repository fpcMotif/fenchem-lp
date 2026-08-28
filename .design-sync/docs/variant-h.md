---
category: Landing · Production
---
Full-page landing variant — "Production · recommended": the definitive direction, with every 2026-08 design-review finding applied and the three previously missing modules built in.

Curates G's hybrid structure and adds: an accessible **Portfolio dropdown menu** in the nav (division columns from live data, Escape/outside-click close, focus return), a **Product Dossier** section (deep ingredient intro: spec table, delivery-format chips, dual CTA), and an interactive **Formulation Presenter** (application/form/regulatory pickers composing a live dark spec-sheet with matching actives).

Measured color system: primary CTAs are `text-brand-green-950` on `bg-brand-green-500` (5.18:1, hover green-400 6.92:1); blue is interactive-only; eyebrows `brand-green-700`; small-text floor `mute-600` at 11px+; division badges are solid paper chips with color dots (readable over any photo); finale labels full-opacity green-400/300. Serif stat numerals and serif-italic botanical Latin names. Motion: shared EASE + STAGGER, smooth anchor scrolling, marquee pauses on hover, everything reduced-motion gated.

## Usage
```tsx
<VariantH />
```
Renders the complete production page. Interactive: the formulation presenter holds selection state; the nav menu is a keyboard-accessible disclosure.
