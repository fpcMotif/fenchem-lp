---
paths:
  - apps/web/src/components/prototype/variant-*.tsx
  - apps/web/src/components/prototype/variant-j/**
  - apps/web/src/components/prototype/shared/**
  - apps/web/src/components/landing/**
  - '!**/*.test.*'
  - '!**/landing-content.ts'
---
Landing variants render stable domain facts (ingredients, industries, pillars, stats, certifications, regions, company facts) through `landing-content.ts`. Hardcoding such a fact in a variant is a violation. Per-variant prose (headlines, eyebrows, bespoke section copy) and presentation (styles, motion, icons, layout) may stay local.
