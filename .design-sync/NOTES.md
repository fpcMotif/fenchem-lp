# design-sync notes — fenchem-lp

Repo-specific gotchas for re-syncs. Read before running the driver.

## Build architecture (why this repo is non-standard)

- The DS spans TWO workspace packages: `packages/ui` (source-only shadcn/Base-UI
  components, **no dist, no build script**) and `apps/web` (the 7 landing
  variants + motion primitives under `src/components/prototype/`).
- The converter therefore runs with a hand-authored entry:
  `--entry .design-sync/entry.ts` (re-exports everything onto
  `window.FenchemUI`). This makes PKG_DIR resolve to the **repo root**, so all
  config paths are repo-root-relative. Do NOT drop the `--entry` flag — without
  it the package resolves through `apps/web/node_modules/@fenchem-lp/ui` (a bun
  junction) and every config path silently misses.
- `--node-modules ./apps/web/node_modules` (react + react-dom + motion +
  lucide-react all resolve there; repo-root node_modules has NO react — bun
  isolated installs).
- Full build command:
  `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./apps/web/node_modules --entry .design-sync/entry.ts --out ./ds-bundle`
  (driver: same flags on `resync.mjs`).
- `@types/react` junction: `node_modules/@types/react` →
  `apps/web/node_modules/@types/react` was created manually (bun keeps types
  per-package; the dts walker only checks ancestor `node_modules/@types/react`).
  On a fresh clone re-create it or `[DTS_REACT]` fires.
- CSS is compiled by the repo's own Tailwind v4 via `cfg.buildCmd`
  (`bunx @tailwindcss/cli@4.2.2 -i apps/web/src/index.css -o .design-sync/.cache/compiled.css`)
  — run it BEFORE the converter on re-sync. The app itself uses
  @tailwindcss/vite; the CLI reads the same source css + @source globs.
- Props: auto-extraction yields stubs here (no dist .d.ts; enrichment off
  because srcRoot is undefined at repo root) — ALL real prop contracts live in
  `cfg.dtsPropsFor`. When a component's API changes, update `dtsPropsFor` by
  hand.
- Grouping: doc frontmatter `category` in `.design-sync/docs/*.md` drives the
  design-book groups (Base UI / Motion / Landing · Original / Landing · Brand).
  Do NOT set `srcDir` — enrichment would stamp variants with sticky group
  `prototype` and the doc categories stop applying.

## Fonts

- All display fonts load via a remote Google Fonts `@import` kept at the top of
  the compiled css (Newsreader, Plus Jakarta Sans, JetBrains Mono).
  `[FONT_REMOTE]` at validate is expected — do not chase. "Inter Variable" and
  "Cambria" in that warn come from shadcn/tailwind fallback stacks.

## Capture harness (frozen clock) — why previews/\_lib/capture-static.tsx exists

- `package-capture.mjs` freezes the page clock (`page.clock.setFixedTime`), so
  Motion animation loops starve: entrance content sticks at `opacity: 0`, and
  `transition.delay` timers never elapse. Symptom: blank capture, fine DOM.
- Fix lives in `.design-sync/previews/_lib/capture-static.tsx` and MUST be
  mounted by every preview whose component animates (all variants, motion
  primitives, Toaster): `<CaptureStatic />` (module-scope matchMedia patch
  forcing prefers-reduced-motion BEFORE first render + eager-flips
  `loading="lazy"` images so capture's decode() settle can't hang) and
  `<SnapDelayed />` (injects a stylesheet rule
  `[style*="opacity: 0;"]{opacity:1!important}` — Motion wholesale-rewrites
  the style attribute every starved tick, so inline snaps get clobbered; only
  a stylesheet rule wins permanently).
- Variant C/F specifically: hero uses `transition={{ delay: 0.55 }}` NOT gated
  by useReducedMotion — the delayed animation never starts under the frozen
  clock; the SnapDelayed stylesheet is what makes their headlines visible.

## Upload

- `DesignSync write_files` with ~50 files incl. the 1.3MB bundle dropped the
  socket — chunk pushes (≤~25 files / ≤~2MB per call).

## Bundle surface

- `toast` (sonner) is re-exported from `.design-sync/entry.ts` so the Toaster
  preview and the design agent can fire toasts against the same sonner
  instance as the bundled `<Toaster>`.

## Preview-authoring gotchas (folded from wave learnings)

- Tailwind JIT pitfall: a class string prop (e.g. Eyebrow's `accent`) only
  renders if that EXACT string appears somewhere in `apps/web/src` — verify
  with `rg -c '<class>' ds-bundle/_ds_bundle.css` before grading. Known good:
  `text-brand-green-600`, `text-brand-blue-700`; known missing:
  `text-brand-blue-600`.
- `Reveal`/`Intro` accept no `style` prop — wrap content in an inner styled div.
- Base UI `DropdownMenuLabel` throws (`MenuGroupContext is missing`) as a
  direct child of `DropdownMenuContent` — wrap it in `DropdownMenuGroup`. The
  error blanks the cell but shows ONLY in
  `.design-sync/.cache/review/<Name>.json` → `pageErrs`, not the capture log.
- DropdownMenu renders open statically: `<DropdownMenu open modal={false}>` +
  `render={<Button style={{width:260}}/>}`; popup width = trigger width;
  `style={{animation:"none",opacity:1}}` on content defeats the frozen-clock
  entrance fade.
- `.ds-single{transform:translateZ(0)}` (emit.mjs) makes the preview root the
  containing block for `position: fixed` — overlay/toast stories need an
  explicit `position:relative` surface box; the toast then anchors inside it.
- `toast()` fired from the story's own `useEffect` lands (child `<Toaster/>`
  subscribes first); `expand` shows a multi-toast stack uncollapsed.
- Skeleton pulse is nondeterministic under capture — pin blocks with
  `style={{width, height, animation:"none"}}`.
- Inline styles may use token vars (`var(--border)` etc.) — the reliable way
  to on-token chrome in previews.

## Known render warns (triaged legitimate)

- `[FONT_REMOTE]` — Newsreader / Plus Jakarta Sans / JetBrains Mono load via
  the Google Fonts @import retained at the top of the compiled css; "Inter
  Variable" and "Cambria" in the warn are shadcn/tailwind fallback stacks.
- Pre-authoring `[RENDER_BLANK]` on Button/Card/Checkbox/Input floor cards —
  resolved by authored previews; should not reappear.

## 2026-08-28 polish pass (VariantH + editorial LandingPage)

- VariantH source gained an interface-polish pass (explicit transition lists,
  uniform 0.96 press scale, icon cross-fades, animated mobile menu, optical
  Play centering, 44px hit extensions, 1px black/10 photo outlines) — its
  uploaded card/capture is STALE; next driver run re-captures it.
- New guideline doc `docs/brand/landing-polish-improvements.md` (applied-changes
  ledger: before → after → why-better; complements the two running-log CI docs)
  added to `guidelinesGlob`. Direct DesignSync push was attempted 2026-08-28 but
  write_files is blocked in non-interactive sessions (needs `/design-login`) —
  the doc, the `guidelines/index.md` NEW-entry highlight, and the
  `VariantH.prompt.md` CI section land on the next driver run / interactive push.
- `.design-sync/docs/variant-h.md` gained a matching continuous-improvement
  section (kept in lockstep with the remote prompt.md).

## 2026-08 additions pending sync (VariantI / VariantJ / principles)

- `entry.ts`, `config.json` (componentSrcMap / docsMap / overrides /
  guidelinesGlob), `docs/variant-{i,j}.md`, `previews/Variant{I,J}.tsx`, the
  conventions principles section, and `docs/brand/landing-design-principles.md`
  were all added ahead of the next driver run — the uploaded project does NOT
  have them yet. Next re-sync picks them up as `added`.
- **VariantJ was in active development when registered** (another session was
  writing `variant-j/sections/` at the time; it pulls new deps `gsap` +
  `lenis` — bun install before building). Re-verify it compiles and re-read
  its header before grading; its doc stub was written from the header comment.
- **VariantI capture notes:** the hero is a raw-WebGL canvas. Under the frozen
  clock its rAF loop starves like Motion does — but `CaptureStatic` forces
  reduced motion, and under reduce the component draws ONE static frame on
  IntersectionObserver fire, so the capture shows the field (headless chromium
  renders WebGL via swiftshader). If the canvas is ever blank in capture, the
  CSS gradient fallback underneath keeps the card legible — not a failure.
  The world-map section imports `world-map-path.ts` (~105KB path const) — the
  bundle grows accordingly. Industry photos hot-link the team's Vercel blob
  store (same host as the desktop preview) — captures need network.
- **Deferred scope (user decision, 2026-08):** product pages, forms, and
  navigation-menu patterns are intentionally undocumented in conventions and
  the principles doc — they'll be designed later. Don't backfill menu/form
  guidance from the variants when validating the header.

## Re-sync risks

- `.design-sync/entry.ts` must be kept in sync with new/removed variants and ui
  components — a new export nobody adds to the entry never reaches the bundle.
- `dtsPropsFor` is hand-maintained → silently stales when component APIs change.
- Variant docs in `.design-sync/docs/` describe design intent — refresh them if
  a variant is redesigned or deleted (registry: `apps/web/src/components/prototype/variants.ts`).
- Images inside variants hot-link external URLs (Unsplash etc.) — previews need
  network at render time; offline captures show broken art.

## Out-of-band push: VariantH continuous-improvement note (2026-08-28)

- A `better-interface` review of VariantH produced
  `docs/brand/variant-h-continuous-improvement.md` (added to `guidelinesGlob`)
  and a hand-authored note card `.design-sync/cards/ContinuousImprovement.html`.
- Both were pushed directly via DesignSync (outside the driver):
  remote `guidelines/docs/brand/variant-h-continuous-improvement.md`,
  remote `components/landing-production/ContinuousImprovement/ContinuousImprovement.html`,
  and `guidelines/index.md` gained a link line.
- The card is static HTML (no `_preview/*.js`, no bundle JS) with a
  first-line `@dsCard group="landing-production"` marker — the pane's
  self-check indexes it on recompile. **Do not let a driver re-sync delete
  it**: it has no converter-side source, so treat
  `components/landing-production/ContinuousImprovement/**` as keep-list.
- Same findings were mirrored to FigJam ("Fenchem LP — Continuous
  Improvement" board) for the design side:
  https://www.figma.com/board/EhUsgRpEC5RsfdAwDWGZ3I — the H3 dropdown-clip
  sticky carries the "elevated to High per f" note; update the board when a
  High row lands.

## Out-of-band update: 2026-08-31 layout stress-test entry (better-layout)

- A `/interfaces:better-layout` review re-confirmed both open HIGHs with fresh
  measurements (hero column 375×1 / 768×1 px; dropdown left −37px @768) and
  added 2 Medium + 2 Low findings plus the measured why-H-supersedes-G
  rationale. Everything was folded into the existing log
  `docs/brand/variant-h-continuous-improvement.md` (newest-first entry) and
  into `.design-sync/cards/ContinuousImprovement.html` +
  `.design-sync/docs/variant-h.md` — NOT a new sibling doc.
- **Remote push DONE (2026-08-31, after /design-login re-auth)** — 5 files
  written and read back verified: the merged CI log, the updated
  ContinuousImprovement card, the regenerated VariantH prompt doc (now carries
  both CI sections), plus `guidelines/docs/brand/landing-polish-improvements.md`
  (was registered in guidelinesGlob but missing remotely) and its
  `guidelines/index.md` link line.
- FigJam: the 08-31 entry was added to the existing board
  https://www.figma.com/board/EhUsgRpEC5RsfdAwDWGZ3I. A stray EMPTY duplicate
  board "Fenchem LP — Continuous Improvement"
  (https://www.figma.com/board/BSvfEPrVSHxCFE6KO7DEP6) was created before the
  original was discovered — safe to trash in Figma drafts.

## VariantJ card state (2026-08, sync session)

- J's card currently captures ONLY the gsap intro frame (headline on dark
  ground) — the frozen-clock harness starves the gsap timeline the same way it
  starves Motion, and `CaptureStatic`'s reduced-motion patch does not tame gsap
  unless the component checks `prefers-reduced-motion` itself. Graded
  needs-work (stays on the re-verify worklist). Fix options for J's author:
  honor reduced motion in the gsap timeline (jump to end state), or export a
  preview story that skips the intro.
- **Resolved 2026-08-31 (driver run):** J's capture now shows the real page
  (nav + hero + stat band) — the intro no longer starves; GreenhouseLedger
  cell graded good.

## 2026-08-31 driver run — UPLOADED (atomic path, complete)

- **Upload completed 2026-08-31** after design-auth was restored: fresh anchor
  fetched (it had MOVED — an interactive session had already synced H/I/J from
  a newer tree, so the first local build was discarded rather than uploaded
  over it), driver re-run against the fresh anchor (0 pendingGrade, all
  carried forward), then the full §5 sequence: sentinel → 119 content files
  in 8 chunks → sentinel re-arm → `_ds_sync.json` last. Post-upload
  `list_files` matches the bundle exactly; `report_validate` filed
  (21/0/0/0, 1 iteration).
- The hand-authored `ContinuousImprovement.html` card (08-31 edit) rode the
  upload inside `components/landing-production/` — remote is current again.
- Remote extras deliberately preserved: `notes/ui-polish-ci-2026-08.html`
  (another session's out-of-band card) and app-generated manifest files.
- **VariantK was registered in config.json DURING this upload** (concurrent
  session) — it is NOT in this build or anchor; the next driver run picks it
  up as `added` (needs `.design-sync/docs/variant-k.md` + an entry.ts export
  - a preview to escape the floor card).

## Superseded record of that run (pre-upload state)

- Full re-sync driver ran clean (build/diff/validate/capture all exit 0;
  render check: 21 components, 0 bad/thin/identical). Verification partition:
  changed Button/Card/Intro/Reveal, added VariantH/I/J; all five pendingGrade
  graded good and `carried forward` on the confirming capture run.
- Conventions header validated against the fresh build: every enumerated
  class, token, component, and guideline doc resolves. **Prose drift to fix
  (authors' call):** "The seven `Variant*` components" and "study `VariantG`
  (production candidate)" — the set is now ten (A–J) and the same file's
  principles section already names VariantH/I as the references.
- `ds-bundle/` is the upload-ready build: verdict `upload.any: true`, full
  writes, `deletePaths: []` (so the hand-authored ContinuousImprovement card
  survives). It carries ALL pending guideline docs from every session
  (polish-improvements, ui-polish-ci-notes, variant-h CI incl. the 08-31
  layout entry, regenerated VariantH.prompt.md, index).
- Upload blocked: DesignSync design-authorization lapsed mid-session again
  (worked earlier in the same session for the out-of-band push, then
  expired). Next authorized session: fetch fresh `_ds_sync.json` →
  re-run the driver (cheap, all carried forward) → §5 atomic upload, and
  ALSO push `.design-sync/cards/ContinuousImprovement.html` →
  `components/landing-production/ContinuousImprovement/ContinuousImprovement.html`
  (hand-authored, not in ds-bundle; remote copy is stale vs the 08-31 edit).
