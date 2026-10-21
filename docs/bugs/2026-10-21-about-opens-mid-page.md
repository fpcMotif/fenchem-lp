# About opens mid-page

Fixed in `f227d61d fix(oos1): scroll to the nav target after the lazy view mounts`, deployed as Cloudflare version `fe5243cc-6bb0-4cb9-a570-b87ba7cf30a6`.

## Symptom

On `/?variant=oos1`, a reader scrolls down the home page and clicks 关于我们 in the header.
The URL changes to `?variant=oos1&page=about#about-top`, but the About page opens at the reader's old home scroll position instead of its top.

## Cause

`handleNavigate` in `apps/web/src/components/prototype/variant-oos1/index.tsx` switched the view, then scrolled from a 60 ms `setTimeout`:

```ts
setTimeout(() => {
  const el = document.getElementById(targetId);
  if (el) el.scrollIntoView({ behavior });
}, 60);
```

`AboutView` is a `React.lazy` component under `<Suspense>`.
A lazy component suspends on its first render even when its module is preloaded, and React holds the fallback for about 300 ms.
A trace of one click from scrollY 3000 showed this order:

| Time | Event |
| ---: | --- |
| 60 ms | The timer runs. `#about-top` does not exist, so `if (el)` skips the scroll without a log. |
| ~70 ms | Suspense hides the home sections and shows the short fallback. |
| ~380 ms | `AboutView` commits. scrollY returns to 3000. |

No script scrolled the page after the click.

## Fix

`handleNavigate` stores the target in state.
`ScrollToTargetAfterViewMounts` renders inside the same `<Suspense>` boundary as the view and scrolls from an effect.
React runs that effect only after the boundary commits its content, so the target element always exists.

## Guards

- `e2e/prototype.spec.ts` › "opening the about page from a scrolled home lands at its top" fails with the old code (`#about-top` 3000 px above the viewport) and passes with the fix.
- `scripts/check-delayed-dom-lookup.ts` fails when a `setTimeout` callback calls `getElementById`, `querySelector`, `querySelectorAll`, or `scrollIntoView`. It runs in `bun run check`, in the hk pre-commit hook, and in CI.

## Lesson

A timer that looks up the DOM guesses when a render lands.
Run the lookup from an effect that commits together with the target element, or wait for the element to appear.

## Why the diagnosis was slow

- The skipped scroll was silent, and the URL and code both looked correct.
- The Browser pane blocked the deployed site's scripts, so the page never hydrated and clicks followed plain `#about` links. Headless system Chrome reproduced the bug.
- The decisive measurement was whether `#about-top` existed at each moment after the click. Trace target existence first when a scroll lands in the wrong place.
