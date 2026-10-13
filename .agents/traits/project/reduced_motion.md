---
paths:
  - 'apps/web/src/**/*.{ts,tsx,css}'
  - '!**/*.test.*'
when:
  - 'animate|transition|keyframes|motion'
---
Every animation honors reduced motion: it checks useReducedMotion, or prefers-reduced-motion in CSS, and falls back to a static or instant state.
