---
category: Motion
---

Scroll-reveal wrapper — fades and lifts its children into view when scrolled into the viewport.

## Usage

```tsx
<Reveal><h2>Section title</h2></Reveal>
<Reveal delay={0.1}><p>Staggered follower</p></Reveal>
```

Props: `children`, `className`, `delay` (s), `y` (px lift). Uses the shared EASE curve `[0.22, 1, 0.36, 1]`; respects reduced motion.
