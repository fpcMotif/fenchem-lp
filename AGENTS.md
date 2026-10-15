# AGENTS.md

- **Scope**: stay inside this checkout. Confine searches and reads to this repository.
- **Typecheck**: run `bun run typecheck` (`bun check -b`). Do not use `tsc` or `bunx tsc`.
- **Dev URLs**: connect to `https://fenchem.localhost` with `ignoreHTTPSErrors: true`. Do not resolve to raw localhost ports. Ad-hoc browser scripts require system Chrome (`channel: "chrome"`).
- **OOS1 subpages**: view components live in `apps/web/src/components/prototype/variant-oos1/`: `about-view.tsx`, `insights-view.tsx`, `news-view.tsx`, `rd-view.tsx`, and `contact-view.tsx`.
- **Prototype labs**: verify `/prototypes/*` with `bun run test:prototypes`. It runs the typed specs in `apps/web/e2e/prototypes/` in system Chrome against this checkout's portless dev server. Add a lab's interaction checks there as web-first assertions. `test:e2e` serves a production build, where prototype routes return not-found. Verify motion and scroll headlessly; the Browser pane throttles animation frames while hidden.
- **Visual checks**: verify a change that could move pixels with `bun run ui`. Before a refactor, run `bun run ui snap <page>`; after it, `bun run ui diff` compares every snapped baseline. Compare a new variant against its parent with `bun run ui diff <before> <after>`. Pages are dev-server paths such as `"/?variant=oos1&page=about"`. `bun run ui --help` lists the commands, and `--dry-run` prints what a command would render.
