# React → Solid porting rules (OOS1 canary)

The files under `src/app` were copied from `apps/web/src` (main @ ab6f785) and are
ported to Solid 1.9 **in place**. Keep markup, text, class names, StyleX styles and
behaviour identical: the benchmark compares DOM text and screenshots against React.
Do not restructure or "improve" code. Port, don't rewrite.

## Components run once

- **Never destructure props.** Use `props.x`. Defaults: `const p = mergeProps({ delay: 0 }, props)`.
  To forward the rest: `const [local, rest] = splitProps(props, ["a", "b"])`.
- Code in the component body runs once. Anything that must react to state or props
  belongs in JSX, a function (`const label = () => props.open ? "a" : "b"`), `createMemo`,
  or `createEffect`.
- An early `if (!x) return null` in a body is not reactive. Use `<Show when={...}>`.

## Hooks

| React | Solid |
| --- | --- |
| `useState(v)` | `const [x, setX] = createSignal(v)`; read with `x()` |
| `useState(() => init)` | `createSignal(init())` |
| `useEffect(fn, [])` touching DOM/window | `onMount(() => { …; onCleanup(…) })` |
| `useEffect(fn, [deps])` | `createEffect(on(() => [deps…], () => { … }))`, cleanup via `onCleanup` inside; use `{ defer: true }` if it must skip the first run. DOM/window effects must not run on the server: guard with `onMount` or `isServer` |
| `useLayoutEffect` | same as useEffect (Solid effects run after DOM creation) |
| `useRef<HTMLElement>(null)` for DOM | `let el: HTMLDivElement \| undefined;` + `ref={el}`; pass `() => el` to compat hooks |
| `useRef(value)` for mutable value | plain `let` variable (or `{ current }` object if passed around) |
| `useMemo(fn, deps)` | `createMemo(fn)` or a plain function |
| `useCallback(fn)` | plain function |
| `useId()` | `createUniqueId()` (SSR-safe) |
| `useSyncExternalStore` on `matchMedia` | `createMediaQuery(query)` from `src/compat/reduced-motion` (false on server and during hydration, then live) |
| `useContext` / `createContext` | same names from `solid-js`; `<Ctx.Provider value={…}>` |
| `flushSync(fn)` (react-dom) | just call `fn()` (Solid updates synchronously) |
| `preinit(...)` (react-dom) | delete (the font link is in `index.html`) |

**Hooks exported from ported files return accessors.** `useReducedMotion()`, `useIntro()`,
`useActiveSection()`, `useInView()`, any custom `useX()` that returned a value now returns
`Accessor<T>`; call it: `reduce()`.

## Imports

| React | Solid |
| --- | --- |
| `react` values | `solid-js` (`createSignal`, `For`, `Show`, `Index`, …) |
| `ReactNode` | `JSX.Element` (`import type { JSX } from "solid-js"`) |
| `ComponentType<P>` / `FC<P>` | `Component<P>` |
| `CSSProperties` | `JSX.CSSProperties` |
| `KeyboardEvent` (React) | DOM `KeyboardEvent` |
| `lucide-react` | `lucide-solid` (same icon names); `LucideIcon` type from `src/compat/lucide` |
| `motion/react` | `src/compat/motion` (relative path) |
| `@tanstack/react-router` `useSearch({ strict: false })` | `useSearch()` from `src/compat/router` → accessor: `search().page` |
| `@stylexjs/stylex` | unchanged |

Use relative import paths (no `@/` alias).

## Motion compat (`src/compat/motion.tsx`)

- `m.div`, `m.span`, `m.p`, `m.nav`, `m.li`, `m.article`, `m.img`, … accept the same
  props as framer-motion: `initial`, `animate`, `exit`, `transition`, `whileInView`,
  `viewport`, `layout`, `layoutId`, `style`. On `m.*`, `style` may stay React-style
  (camelCase keys, numbers, `x`/`y`/`rotate`, accessors as motion values).
- `AnimatePresence initial={false}` works; put the conditional child inside it with
  `<Show when={…}>` or a ternary.
- `MotionValue<T>` is `Accessor<T>`. `useScroll({ target: () => el, offset })` returns
  `{ scrollYProgress }`; `useTransform(src, [in], [out])` / `useTransform(src, fn)` return
  accessors; `useInView(() => el, opts)` returns an accessor.
- `useInstantLayoutTransition()`, `LazyMotion`, `LayoutGroup`, `MotionConfig`, `domMax`
  exist as no-op-compatible exports.

## JSX differences (these bite)

- `className` → `class`; `htmlFor` → `for`. `{...stylex.props(...)}` spreads work as-is.
- `key` props: delete.
- **Plain-element `style` objects are not React style**: keys are kebab-case CSS names
  and numbers get **no** `px`. `{ fontSize: 12, marginTop: 4 }` → `{ "font-size": "12px",
  "margin-top": "4px" }`. Custom properties (`"--x"`) unchanged. `opacity`/`z-index`
  numbers are fine. (Only `m.*` components convert React-style objects for you; you can
  also use `toCss()` exported from the motion compat.)
- **SVG attributes use real attribute names**: `strokeWidth` → `stroke-width`,
  `strokeLinecap` → `stroke-linecap`, `strokeLinejoin`, `fillRule` → `fill-rule`,
  `clipRule`, `clipPath` → `clip-path`, `stopColor` → `stop-color`, `stopOpacity`,
  `colorInterpolationFilters` → `color-interpolation-filters`, `xlinkHref` → `href`,
  `strokeDasharray`, `strokeDashoffset`, `vectorEffect`, `textAnchor`, `dominantBaseline`,
  `fontSize` (svg attr) → `font-size`. `viewBox`, `preserveAspectRatio` stay.
- `tabIndex` → `tabindex`. `readOnly`, `disabled`, `checked`, `value`, `hidden` fine.
- **Boolean attributes that are not DOM properties** (`inert`, `aria-*` is fine as
  strings): Solid writes `false` as the string "false", and `inert="false"` still makes
  the element inert. Write `inert={cond || undefined}`.
- `onChange` on text inputs fires per keystroke in React; in Solid use `onInput`.
  Checkbox/radio/select `onChange` is fine.
- `dangerouslySetInnerHTML={{ __html: s }}` → `innerHTML={s}`.
- `defaultValue` / `defaultChecked` → `value` / `checked`.
- Lists: `{items.map((x, i) => …)}` → `<For each={items}>{(x, i) => …}</For>` (`i` is an
  accessor: `i()`). For static constant arrays `.map` is acceptable, but use `<For>`
  whenever the array comes from state/props.
- Ternaries and `&&` inside JSX are reactive; keep them.
- Fragments `<>…</>` fine. `<Fragment key>` → `<>` or `<For>` body.
- `children`: `props.children`. If you must inspect them, use `children(() => props.children)`.
- Event handler types: `(e: MouseEvent & { currentTarget: HTMLButtonElement })` or
  `JSX.EventHandler<HTMLButtonElement, MouseEvent>`.
- Hydration: anything that differs between server and client (window, matchMedia,
  Date.now, random) must be read in `onMount` / `createMediaQuery`, never in the body.

## Done means

`bunx tsc --noEmit -p canary/solid` (from repo root) reports no errors in your files.
Errors in other people's files are not yours; don't touch them. Don't run builds or
git commands.
