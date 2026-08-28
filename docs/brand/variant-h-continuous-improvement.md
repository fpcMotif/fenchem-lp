# Variant H — continuous improvement (cross-discipline reviews)

Running log of cross-discipline findings from `/interfaces:better-interface`
reviews of the production-recommended landing page
(`apps/web/src/components/prototype/variant-h.tsx`). Newest entry first. When a
finding lands, append a `Resolved:` line under it rather than deleting the row —
the log is the memory. UI-polish-only findings live in the sibling log,
`landing-ui-polish-ci-notes.md`.

## 2026-08-28 — Variant H (better-interface review, browser-verified)

Review ran all six domains (accessibility / layout / writing / typography /
colors / UI polish) against the rendered page: keyboard walk, 320/375/768px
viewports, computed focus styles, and exact WCAG ratios computed from the OKLCH
tokens. Line numbers are as of the 2026-08-28 polish pass.

### HIGH — release-blocking

| Finding                                                                                                                                                                                                                                                                                                                                                                                                                            | Location                                                | Fix                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Submit discards the configured spec.** "Submit this specification" / "Request this specification" / "Technical data sheet" all resolve through `createInquiryHref()`, whose unknown sources (`"formulation"`, `"dossier"`, `"tds"`) silently fall back to the generic "Fenchem partnership inquiry" mailto with a static body. A formulator picks application, delivery form and regulatory chips; the email carries none of it. | `variant-h.tsx:1177,928,938` · `landing-content.ts:462` | Serialize the presenter selection into the mailto subject/body; give dossier/TDS their own subjects. Drop the `FileDown` icon unless a document actually downloads. |
| **Hero image never renders on mobile.** The image column has only absolutely-positioned children and no height below `lg` — measured 375×1 px. Image and caption badge (tagline, "Since 1995") are invisible for every mobile visitor.                                                                                                                                                                                             | `variant-h.tsx:508`                                     | The page's own idiom: `min-h-72` below `lg` (Origin and Standards columns already do this at `:1216`/`:1260`).                                                      |
| **Portfolio dropdown clips off-viewport at tablet widths.** The 640px menu centered on its trigger sits at `left: −37px` at a 768px viewport; the first column's division dot and label starts are cut with no way to scroll to them.                                                                                                                                                                                              | `variant-h.tsx:227`                                     | `w-[min(640px,calc(100vw-2rem))]` or edge-aware positioning. Re-measure at 768/800/900px after the fix.                                                             |

> The dropdown finding is HIGH per f (2026-08-28, recorded in
> `landing-ui-polish-ci-notes.md`): it is the recommended production variant's
> primary nav surface — treat as release-blocking.

### MEDIUM — schedule next

| Finding                                                                                                                                                                                                                          | Location                                  | Fix                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------- |
| Hero `alt` says "lush green botanical leaves in morning light"; the photo renders as a soil scoop with fertilizer granules. Misdescribes for screen-reader users and strays from the "raw botanical material" imagery direction. | `variant-h.tsx:512`                       | Rewrite the alt to the rendered photo, or swap the photo to match the intended direction.   |
| No "Skip to content" link — keyboard users pay 6+ nav stops on every visit.                                                                                                                                                      | `variant-h.tsx` root                      | Visually-hidden-until-focused skip link as the first focusable element.                     |
| Footer certification chips are static text styled blue (`border-brand-blue-200 bg-brand-blue-50 text-brand-blue-700`); this page's own contract (header comment) declares blue interactive-only.                                 | `variant-h.tsx:1450`                      | Restyle neutral/green — the division-badge (paper chip + ink) or green format-chip pattern. |
| CTA capitalization mixes title case and sentence case ("Request a Specification" vs "Request this specification", "Build a Formulation" vs "Build a formulation").                                                               | nav / hero / menu / dossier / matrix CTAs | One policy per element type; sentence case is the safer default.                            |

### LOW — polish backlog

| Finding                                                                                                              | Location            | Fix                                                                                             |
| -------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------- |
| At 320px the nav CTA wraps to two lines (152×60) flush against the viewport edge, consuming the right layout margin. | `variant-h.tsx:408` | Shorten the label below `md` or move the CTA into the mobile menu (which has no contact entry). |
| `MobileNav` disclosure lacks the Escape-close + outside-pointer close `PortfolioMenu` implements.                    | `variant-h.tsx:283` | Reuse `PortfolioMenu`'s handlers.                                                               |

Resolved (2026-08-28 polish pass, concurrent session): `transition-all` on CTAs
→ named transition properties everywhere; press scale unified at
`active:scale-[0.96]`.

### Verified clean — keep these decisions

- **Contrast is genuinely measured.** Every ratio in the file's header comment
  verifies to the decimal (green-950/green-500 = 5.18, hover 6.92, mute-600 =
  6.00, green-700 = 5.73, finale 6.92/9.35). Worst small-text pair in use:
  mute-600 on green-50 at 5.55. Don't regress these when touching colors.
- Keyboard: radiogroup roving tabindex, Escape-close + focus-return on the
  Portfolio menu, ticker pause with `aria-pressed` — verified working.
- Reduced motion honored centrally (`motion.tsx`) plus the CSS kill-switch;
  marquee has `motion-reduce:animate-none` and a visible pause control.
- Structure: one `h1`, one `main`, coherent outline, `lang="en"`, no 320px
  horizontal overflow.

### Maintenance

Re-run `/interfaces:better-interface` after the three HIGH rows land. CONTEXT.md
still says default variant is `d` with variants A–G only — update it when the
variant shake-out settles.
