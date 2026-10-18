// Solid stand-in for the slice of `motion/react` the OOS1 pages use, built on the
// framework-agnostic `motion` package (same animation engine as the React app).
//
//   m.div / m.span / …   initial, animate, exit, transition, whileInView, viewport,
//                        layout ("position" | true), layoutId, motion-value style
//   useScroll            scroll progress accessor (motion's `scroll()`)
//   useTransform         derived accessor (motion's `transform()`, clamped)
//   useInView            in-view accessor (motion's `inView()`)
//   useInstantLayoutTransition
//
// Motion values are plain accessors. Style values may be accessors; they update
// the element reactively. Layout animations are FLIP: rects are snapshotted in a
// capture listener before user-event handlers run, and compared after the update.

import { animate, inView, scroll, transform } from "motion";
import {
  children,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  flush,
  omit,
  onSettled,
  untrack,
  useContext,
  type Accessor,
  type Component,
} from "solid-js";
import { dynamic, isServer, type JSX } from "@solidjs/web";

export type MotionValue<T> = Accessor<T>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Transition = Record<string, any>;
export type Target = Record<string, string | number | undefined>;
type StyleValue = string | number | undefined | null | Accessor<string | number | undefined>;
export type MotionStyle = Record<string, StyleValue>;

type ElementRef = Accessor<Element | undefined> | Element | undefined;
const unref = (ref: ElementRef) => (typeof ref === "function" ? ref() : ref);

// ── motion values ────────────────────────────────────────────────────────────

type ScrollOffset = Array<string | [number, number]>;

export function useScroll(options: { target?: ElementRef; offset?: ScrollOffset } = {}) {
  const [progress, setProgress] = createSignal(0);
  onSettled(() => {
    const target = unref(options.target);
    const stop = scroll((value: number) => setProgress(value), {
      target: target ?? undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      offset: options.offset as any,
    });
    return stop;
  });
  return { scrollYProgress: progress as MotionValue<number> };
}

export function useTransform<T>(
  source: MotionValue<number>,
  map: (value: number) => T,
): MotionValue<T>;
export function useTransform<T extends string | number>(
  source: MotionValue<number>,
  input: number[],
  output: T[],
): MotionValue<T>;
export function useTransform<T>(
  source: MotionValue<number>,
  inputOrMap: number[] | ((value: number) => T),
  output?: T[],
): MotionValue<T> {
  if (typeof inputOrMap === "function") return () => inputOrMap(source());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapper = transform(inputOrMap, output as any) as (value: number) => T;
  return () => mapper(source());
}

export function useInView(
  ref: ElementRef,
  options: { once?: boolean; amount?: number | "some" | "all"; margin?: string } = {},
): Accessor<boolean> {
  const [visible, setVisible] = createSignal(false);
  onSettled(() => {
    const el = unref(ref);
    if (!el) return;
    const stop = inView(
      el,
      () => {
        setVisible(true);
        if (options.once) {
          stop();
          return;
        }
        return () => setVisible(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { amount: options.amount, margin: options.margin as any },
    );
    return stop;
  });
  return visible;
}

// ── reduced motion (MotionConfig reducedMotion="user") ───────────────────────

const reducedMotion = () =>
  !isServer && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function timing(transition: Transition | undefined): Transition {
  const t = { ...transition };
  if (reducedMotion()) t.duration = 0;
  return t;
}

// ── style conversion ─────────────────────────────────────────────────────────

const UNITLESS = new Set([
  "opacity",
  "zIndex",
  "fontWeight",
  "lineHeight",
  "flex",
  "flexGrow",
  "flexShrink",
  "order",
  "scale",
  "scaleX",
  "scaleY",
]);
const TRANSFORM_KEYS = new Set(["x", "y", "rotate", "scale", "scaleX", "scaleY"]);
const kebab = (key: string) =>
  key.startsWith("--") ? key : key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const read = (value: StyleValue) => (typeof value === "function" ? value() : value);

function parseCssText(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const declaration of text.split(";")) {
    const colon = declaration.indexOf(":");
    if (colon > 0) out[declaration.slice(0, colon).trim()] = declaration.slice(colon + 1).trim();
  }
  return out;
}

function withUnit(key: string, value: string | number) {
  if (typeof value === "string") return value;
  if (key === "rotate") return `${value}deg`;
  return UNITLESS.has(key) || key.startsWith("--") ? String(value) : `${value}px`;
}

/** React/motion style object (camelCase, x/y/rotate, accessors) → Solid style object. */
export function toCss(style: MotionStyle | string | undefined): JSX.CSSProperties {
  const out: Record<string, string> = {};
  if (!style) return out;
  if (typeof style === "string") return parseCssText(style);
  const transforms: string[] = [];
  for (const [key, raw] of Object.entries(style)) {
    const value = read(raw);
    if (value === undefined || value === null) continue;
    if (TRANSFORM_KEYS.has(key)) {
      if (key === "x") transforms.push(`translateX(${withUnit(key, value)})`);
      else if (key === "y") transforms.push(`translateY(${withUnit(key, value)})`);
      else if (key === "rotate") transforms.push(`rotate(${withUnit(key, value)})`);
      else transforms.push(`${key}(${value})`);
      continue;
    }
    out[kebab(key)] = withUnit(key, value);
  }
  if (transforms.length) out.transform = [out.transform, ...transforms].filter(Boolean).join(" ");
  return out;
}

// ── layout (FLIP) ────────────────────────────────────────────────────────────

type LayoutEntry = { mode: true | "position"; transition: () => Transition | undefined };
const layoutEls = new Map<HTMLElement, LayoutEntry>();
const layoutIds = new Map<string, { el: HTMLElement; transition: () => Transition | undefined }>();
const before = new Map<HTMLElement, DOMRect>();
const beforeIds = new Map<string, DOMRect>();
let pending = false;

function snapshot() {
  if (pending) return;
  pending = true;
  for (const el of layoutEls.keys()) before.set(el, el.getBoundingClientRect());
  for (const [id, { el }] of layoutIds) beforeIds.set(id, el.getBoundingClientRect());
  queueMicrotask(flip);
}

function flip() {
  flush();
  pending = false;
  const skip = reducedMotion();
  if (!skip) {
    for (const [el, entry] of layoutEls) {
      const from = before.get(el);
      if (!from || !el.isConnected) continue;
      const to = el.getBoundingClientRect();
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      const transition = timing(entry.transition());
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        animate(
          el,
          { transform: [`translate(${dx}px, ${dy}px)`, "translate(0px, 0px)"] },
          transition,
        );
      }
      if (entry.mode === true && Math.abs(from.height - to.height) > 0.5) {
        const declared = el.style.height;
        void animate(el, { height: [`${from.height}px`, `${to.height}px`] }, transition).then(
          () => {
            el.style.height = declared;
          },
        );
      }
    }
    for (const [id, { el, transition }] of layoutIds) {
      const from = beforeIds.get(id);
      if (!from || !el.isConnected) continue;
      const to = el.getBoundingClientRect();
      if (!to.width || !to.height) continue;
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(from.width - to.width) < 0.5)
        continue;
      el.style.transformOrigin = "0 0";
      animate(
        el,
        {
          transform: [
            `translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height})`,
            "translate(0px, 0px) scale(1, 1)",
          ],
        },
        timing(transition()),
      );
    }
  }
  before.clear();
  beforeIds.clear();
}

if (!isServer) {
  for (const type of ["click", "keydown", "change", "input"]) {
    window.addEventListener(type, () => (layoutEls.size || layoutIds.size) && snapshot(), {
      capture: true,
    });
  }
}

/** The next layout change jumps instead of animating (motion's useInstantLayoutTransition). */
export function useInstantLayoutTransition() {
  // React runs the callback in its own flushSync render, so later updates in the
  // same handler still animate. Here: apply it, then re-baseline the snapshot.
  return (callback?: () => void) => {
    callback?.();
    if (!pending) return;
    before.clear();
    beforeIds.clear();
    pending = false;
    snapshot();
  };
}

// ── presence ─────────────────────────────────────────────────────────────────

const PresenceContext = createContext<{ skipInitial: Accessor<boolean> }>({
  skipInitial: () => false,
});

type ExitInfo = { target: Target; transition: Transition | undefined };
const exits = new WeakMap<Element, ExitInfo>();

export function AnimatePresence(props: { initial?: boolean; children: JSX.Element }) {
  const [skipInitial, setSkipInitial] = createSignal(untrack(() => props.initial === false));
  onSettled(() => {
    setSkipInitial(false);
  });
  return (
    <PresenceContext value={{ skipInitial }}>
      <Presence>{props.children}</Presence>
    </PresenceContext>
  );
}

function Presence(props: { children: JSX.Element }) {
  const resolved = children(() => props.children);
  const exited = new WeakSet<Element>();
  const exiting = new WeakSet<Element>();
  const [exitDone, setExitDone] = createSignal(0);

  const shown = createMemo<unknown[]>((previous = []) => {
    exitDone();
    const next: unknown[] = resolved.toArray();
    if (isServer) return next;
    previous.forEach((node, index) => {
      if (next.includes(node) || !(node instanceof Element)) return;
      if (!exits.has(node) || exited.has(node)) return;
      next.splice(Math.min(index, next.length), 0, node);
    });
    return next;
  });

  createEffect(
    () =>
      shown().filter(
        (node): node is Element => node instanceof Element && !resolved.toArray().includes(node),
      ),
    (leaving) => {
      for (const el of leaving) {
        if (exiting.has(el)) continue;
        exiting.add(el);
        const info = exits.get(el)!;
        const finish = () => {
          exited.add(el);
          setExitDone((n) => n + 1);
        };
        animate(el, info.target, timing(info.transition)).then(finish, finish);
      }
    },
  );

  return shown as unknown as JSX.Element;
}

// ── m.* components ───────────────────────────────────────────────────────────

type MotionOwnProps = {
  initial?: Target | false;
  animate?: Target;
  exit?: Target;
  transition?: Transition;
  whileInView?: Target;
  viewport?: { once?: boolean; amount?: number | "some" | "all"; margin?: string };
  layout?: boolean | "position";
  layoutId?: string;
  style?: MotionStyle | string;
  ref?: (el: HTMLElement) => void;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MotionProps = MotionOwnProps & Record<string, any>;
export type HTMLMotionProps<_T extends string = "div"> = MotionProps;

const OWN = [
  "initial",
  "animate",
  "exit",
  "transition",
  "whileInView",
  "viewport",
  "layout",
  "layoutId",
  "style",
  "ref",
] as const;

function createMotionComponent(tag: string) {
  const Tag = dynamic(() => tag) as Component<JSX.HTMLAttributes<HTMLElement>>;
  return (props: MotionProps) => {
    const rest = omit(props, ...OWN);
    const presence = useContext(PresenceContext);
    const transition = () => untrack(() => props.transition);
    const skipInitial = untrack(() => props.initial === false || presence.skipInitial());
    // First paint (server and hydration): `initial`, or the `animate` target when
    // initial is skipped — what framer-motion renders inline on the server too.
    const firstStyle = untrack(() => {
      const first: Target | undefined = skipInitial
        ? props.animate
        : props.initial || props.animate;
      return toCss(first as MotionStyle);
    });
    const [element, setElement] = createSignal<HTMLElement>();
    let el: HTMLElement | undefined;

    createEffect(element, (node) => {
      if (!node) return;
      const { exit, initial, whileInView, viewport, layoutId } = untrack(() => ({
        exit: props.exit,
        initial: props.initial,
        whileInView: props.whileInView,
        viewport: props.viewport,
        layoutId: props.layoutId,
      }));
      const stops: Array<() => void> = [() => layoutEls.delete(node)];
      if (exit) exits.set(node, { target: exit, transition: transition() });
      const target = untrack(() => props.animate);
      if (target && !skipInitial && initial) animate(node, target, timing(transition()));
      if (whileInView) {
        const stop = inView(
          node,
          () => {
            animate(node, whileInView, timing(transition()));
            if (viewport?.once) {
              stop();
              return;
            }
            return () => {
              if (initial) animate(node, initial, timing(transition()));
            };
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { amount: viewport?.amount, margin: viewport?.margin as any },
        );
        stops.push(stop);
      }
      if (layoutId) {
        layoutIds.set(layoutId, { el: node, transition });
        stops.push(() => {
          if (layoutIds.get(layoutId)?.el === node) layoutIds.delete(layoutId);
        });
      }
      return () => stops.forEach((stop) => stop());
    });
    createEffect(
      () => (element() && props.layout ? (props.layout === "position" ? "position" : true) : false),
      (mode) => {
        if (!el) return;
        if (mode) layoutEls.set(el, { mode, transition });
        else layoutEls.delete(el);
      },
    );
    let lastTarget = untrack(() => (props.animate ? JSON.stringify(props.animate) : ""));
    createEffect(
      () => props.animate,
      (target) => {
        const key = target ? JSON.stringify(target) : "";
        if (key === lastTarget) return;
        lastTarget = key;
        if (el && target) animate(el, target, timing(transition()));
      },
    );

    return (
      <Tag
        {...rest}
        ref={(node: HTMLElement) => {
          el = node;
          setElement(node);
          props.ref?.(node);
        }}
        style={{ ...firstStyle, ...toCss(props.style) }}
      />
    );
  };
}

const TAGS = [
  "div",
  "span",
  "p",
  "nav",
  "li",
  "ul",
  "article",
  "img",
  "section",
  "button",
  "a",
] as const;
export const m = Object.fromEntries(TAGS.map((tag) => [tag, createMotionComponent(tag)])) as Record<
  (typeof TAGS)[number],
  (props: MotionProps) => JSX.Element
>;
export const motion = m;

// LazyMotion / LayoutGroup / MotionConfig have no work to do here.
export const LazyMotion = (props: {
  children: JSX.Element;
  features?: unknown;
  strict?: boolean;
}) => props.children;
export const LayoutGroup = (props: { children: JSX.Element }) => props.children;
export const MotionConfig = (props: { children: JSX.Element; reducedMotion?: string }) =>
  props.children;
export const domMax = {};
