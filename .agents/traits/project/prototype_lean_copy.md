---
paths:
  - 'apps/web/src/components/prototype/**/*.{ts,tsx}'
  - '!**/*.test.*'
  - '!**/worst-case-data.ts'
---
Prototype variants let layout carry hierarchy. Each block shows one heading, plus at most one line that adds a fact the heading lacks. A visible eyebrow, tagline, kicker, caption, meta label, section numeral, or English echo that restates a nearby heading, nav chip, or lead is a violation. A placeholder holds a format example, never helper text. When a visible label goes, the control keeps its accessible name through a visually hidden label, `aria-label`, or `aria-labelledby`, per the W3C WAI Forms Tutorial. A control left with no accessible name is a violation.
