---
category: Motion
---
Mount-time entrance — fades and lifts children on first render (hero elements, above-the-fold content).

## Usage
```tsx
<Intro delay={0.2}><h1>Hero headline</h1></Intro>
```
Props: `children`, `className`, `delay` (s), `y` (px lift, default 28). Same EASE curve as Reveal; use Intro above the fold, Reveal below it.
