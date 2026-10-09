# React Doctor findings

## At a glance

The working tree now scores 100/100, with zero errors and zero warnings.
The cleanup fixes component boundaries, accessibility, resource cleanup, motion, and repeated presentation markup.
Variant content and styling remain local where they differ; scanner rules and coverage remain enabled.

## Scan evidence

- Date: 2026-10-09, Australia/Perth.
- Scanner: React Doctor 0.9.17, JSON schema 3.
- Scored command: `bunx react-doctor@latest --yes --scope full --verbose`.
- Structured command: `bunx react-doctor@latest --yes --scope full --json`.
- Both commands completed successfully with scoring enabled.

| Project        | Analyzed files | Errors | Warnings | Reported score | Complete | Skipped checks |
| -------------- | -------------: | -----: | -------: | -------------: | -------- | -------------- |
| web            |            702 |      0 |        0 |        100/100 | yes      | none           |
| @fenchem-lp/ui |             10 |      0 |        0 |        100/100 | yes      | none           |
| Workspace      |            712 |      0 |        0 |        100/100 | yes      | none           |

The baseline reported 71 errors, 192 warnings, and 46/100 across 660 files.
No exclusions, suppressions, severity changes, disabled rules, or variant deletions were introduced by this cleanup.

## Implementation

Non-component exports move into value modules, keeping component modules compatible with refresh boundaries.
Native buttons, tables, headings, and lists replace conflicting interaction semantics.
Subscriptions and timers receive cleanup at their owning lifecycle boundaries.
Derived rendering replaces synchronous effect updates where state duplicated inputs.

Shared components now cover repeated navigation, hero content, sections, page shells, news, footers, and lightboxes.
Their callers retain variant-specific styles, data, motion components, and specialized behavior.
Callers pass explicit StyleX members so compilation retains styles used across component boundaries.
Browser testing caught this requirement after the first extraction; the corrected production output was inspected.

Collapsible content uses layout projection with an inverse-scaled content wrapper.
Following rows and sections participate in the layout transition through positioned motion elements.
Closed panels and catalog detail rows are inert and hidden from accessibility.
The shared components use the project's hydration-safe reduced-motion hook.

The formula dialog retains native modal behavior through `showModal()`.
A background button owns dismissal, while the inner frame preserves panel dimensions and animation.
Escape, previous/next controls, and focus restoration remain operational.

## Verification

| Check                  | Observed result                                                 |
| ---------------------- | --------------------------------------------------------------- |
| Full React Doctor      | 100/100, zero errors, zero warnings                             |
| `bun run check-types`  | Passed: ten UI files and 723 web files                          |
| `bun run check:stylex` | Passed across the repository                                    |
| `bun run build`        | Passed production client and server builds                      |
| Scoped Oxlint          | Passed across 322 changed source files                          |
| Scoped Oxfmt           | Passed across changed source files                              |
| Code review            | Two independent read-only reviews; actionable findings resolved |
| Unit tests             | Not added, modified, or run, as requested                       |

Production browser checks covered desktop and mobile layouts.

- Fourteen affected corporate variants rendered their headings without error boundaries or horizontal overflow.
- H's portfolio menu opened with Enter and closed with Escape.
- OO news expanded and collapsed from the keyboard; closed content became inert with zero height.
- Intermediate motion checks showed following-row movement and compensating content scaling.
- OOS1PA mobile navigation opened with Enter and closed with Escape.
- OOS1PA formula dialogs preserved mobile and desktop panel geometry.
- Formula stepping, Escape, backdrop dismissal, and trigger-focus restoration passed.
- OOS1PN detail selection, next-item navigation, and return to overview passed.
- OOS1PG mobile catalog details expanded; closing restored zero-height, inert, inaccessible rows.
- OOS1A lightbox opened, navigated with ArrowRight, closed with Escape, and restored trigger focus.
- OOS1PS compared two selected products; keyboard collapse removed its details from accessibility.
- Inspected mobile and desktop views had zero horizontal document overflow.

These are representative checks, not exhaustive interaction coverage for every variant.
Reduced-motion branches were inspected in source; browser media emulation was unavailable.

## Commit boundary and existing work

The 100/100 result describes the combined working tree, including existing authentication removal and dependency changes.
Those existing changes remain outside this cleanup's commit.
The existing shared-counter refactor and its unit test also remain unstaged.
The isolated commit fixes three original local counter hooks without incorporating that separate refactor.

An exported staged snapshot passed its production build, StyleX checks, and scoped lint.
It retains the original authentication forms, which produce one duplicate-markup warning and a 92/100 score.
Its type check reports one existing authentication-client incompatibility against the currently installed dependencies.
The combined working tree passes that type check because the existing authentication-removal work is present.

Repository-wide Oxlint still reports five existing errors outside the changed source set:

- `perf/measure-deployed.mjs`: empty export.
- `variant-oos1/abouts/oos1g/reveal.tsx`: imperative text mutation.
- `variant-oos1/products/oos1pe/solutions.tsx`: render-purity finding.
- `variant-oos1/history-timeline.tsx`: effect-state update.
- `variant-waterfall.tsx`: render-time date construction.

These broader lint results are separate from the clean React Doctor scan.
No hooks were bypassed, and no changes were pushed.
