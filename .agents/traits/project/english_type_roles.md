---
paths:
  - apps/web/src/components/prototype/variant-*.tsx
  - apps/web/src/components/prototype/variant-j/**
  - apps/web/src/components/landing/**
  - '!**/*.test.*'
when:
  - font
---
The English landing site sets display text in Newsreader (font-display), body and UI text in Plus Jakarta Sans (font-body) and technical labels in JetBrains Mono. Source Han Sans / Noto Sans SC covers only Chinese glyphs through the local fallback; a Noto Sans SC web-font import is a violation (ADR-0002).
