# Landing UI Polish — Continuous Improvement Notes

Running log of UI-polish findings from `/interfaces:better-ui` reviews of the
landing prototypes. Newest entry first. When a finding lands, append a
`Resolved:` line under it rather than deleting the row — the log is the memory.

## 2026-08-28 — Variants H & I (better-ui review, browser-verified)

Review context: Variant H ("Production · recommended") received most of the
skill's prescriptions mid-review from a concurrent session — press scale
`0.96`, named transition properties, spec-exact icon cross-fades, image
outlines, optical play-triangle nudge. Variant I ("Production+ · map & WebGL")
has **not** had that pass and repeats the pre-fix patterns. Verification ran
against the live dev server via DOM/computed-style checks (no visual replay —
headless pane).

### HIGH

| Finding                                                                                                                                                                                                                                                                                                 | Location                                                                                     | Fix                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portfolio dropdown clips off-viewport at tablet widths. Measured at an 800×900 viewport: the 640px menu's left edge sits at **−34px** — the first column's division dot and label starts are cut off with no way to reach them (no horizontal scroll is created for left overflow). Worse toward 768px. | `apps/web/src/components/prototype/variant-h.tsx:227` (`w-[640px]`, centered on the trigger) | Clamp the width — `w-[min(640px,calc(100vw-2rem))]` — or make positioning edge-aware so the panel stays inside the viewport at every width ≥768px. |

> Severity elevated MEDIUM → HIGH on 2026-08-28 per f: this is the recommended
> production variant's primary nav surface, so treat as release-blocking and
> re-measure at 768 / 800 / 900px after the fix.

### MEDIUM

| Finding                                                                                                           | Location                                                                                                                               | Fix                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transition-all` on interactive elements (verified: map pins compute `transition-property: all`).                 | `variant-i.tsx:289, 351, 361, 617, 684, 725, 735`                                                                                      | Name the properties, mirroring H's fixed pattern: `transition-[background-color,scale]` (CTAs), `transition-[r,fill]` (pins), `transition-[translate,color]` (arrows). |
| Press scale wrong value / missing: `active:scale-[0.98]` on primaries; secondary CTAs have no press state at all. | `variant-i.tsx:289, 351, 725` (0.98) · `:361, :735` (missing)                                                                          | `active:scale-[0.96]` on all five — exactly `0.96`, per the skill.                                                                                                     |
| Press scale rides the 300ms hover transition instead of its own 150ms ease-out.                                   | `variant-h.tsx:408, 471, 481, 746, 929, 939, 1178, 1374, 1384` (300ms) · `:958` chips (200ms) · same once variant-i adopts press scale | Split durations — `[transition:background-color_300ms,scale_150ms_ease-out]` — or drop the whole transition to 150ms.                                                  |
| Active map route snaps: `m.path` keyed by `active.city`, no exit animation, while pins/list ease over 300ms.      | `variant-i.tsx:584`                                                                                                                    | Wrap in `AnimatePresence initial={false}`, exit `{opacity: 0}`, transition `{type: "spring", duration: 0.3, bounce: 0}`.                                               |
| Division photos lack the 1px pure-black/10 image outline H now applies everywhere.                                | `variant-i.tsx:442–447`                                                                                                                | `outline outline-1 -outline-offset-1 outline-black/10` on every photo.                                                                                                 |

### LOW

| Finding                                                                                                                                       | Location                                                                                                                                                                                          | Fix                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Icon stroke vs text weight mismatched both directions (verified: nav chevron computes stroke 2 beside a 400-weight label).                    | `variant-h.tsx:213` ChevronDown, `:1170/:1302` CheckCircle2 (→ 1.5 beside regular); `variant-i.tsx:363` Globe, `:646` MapPin (→ 2 beside semibold/bold); `variant-i.tsx:468` ArrowUpRight (→ 1.5) | One optical strategy per surface: 1.5 beside regular text, 2 beside semibold/bold.     |
| Variant I missing H's `SmoothScroll` (verified `scroll-behavior: auto`) and ships the scroll-progress hairline un-gated under reduced motion. | `variant-i.tsx` (whole file) · `:299–303` vs `variant-h.tsx:1502, :420`                                                                                                                           | Reuse H's `SmoothScroll`; gate the hairline on `!useReducedMotion()`.                  |
| Hover color transitions above the 150ms floor on high-frequency chrome (nav/footer links 300ms; row-hover bg 400ms; matrix overlay 500ms).    | `variant-h.tsx:210, 386–399, 1469, 677, 1290, 769` · `variant-i.tsx:270–282`                                                                                                                      | ≤150ms for link color; keep the slow editorial zooms as deliberate expressive moments. |

### Out of scope for better-ui, handed to sibling skills

- **better-layout**: `variant-i.tsx:437` — 5 cards over `sm:grid-cols-2` leave
  an orphan sixth cell where the container's `bg-line` shows as a flat gray
  card-sized block at tablet widths (reasoned from code, not verified).
- **better-accessibility**: `variant-i.tsx:665` — `onFocus` makes selection
  follow focus across `aria-pressed` buttons; tabbing through the region list
  mutates state.

### Verified / not verified

Walked in the browser (attached dev server, DOM-level): ticker pause/resume,
portfolio menu open/close + the 800px overflow measurement, marquee values
(32s linear), computed transition properties (H CTA `background-color, scale`
vs I pins `all`), `scroll-behavior` difference, WebGL context creation in I.
Not verified: motion replay at 10% speed, shader visual output, reduced-motion
end-to-end, sub-768px MobileNav walk, the sm-breakpoint orphan cell.
