import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { ui } from "./layout";
import { tone } from "./tokens.stylex";
import { TICK, trailOpacity, echoIndexes, strobe } from "./strobe-values";
import { createEffect, createSignal, merge } from "solid-js";

export type Phase = "rest" | "armed" | "fire";

export function useEntry<T extends Element>() {
  const [ref, setRef] = createSignal<T>();
  const [phase, setPhase] = createSignal<Phase>("rest");
  const reduce = useReducedMotion();

  createEffect(
    () => ({ element: ref(), reduce: reduce() }),
    ({ element, reduce }) => {
      if (!element || reduce) return;
      let firstReport = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (firstReport) {
            firstReport = false;
            const startsBelowViewport = entry.boundingClientRect.top >= window.innerHeight;
            if (entry.isIntersecting || !startsBelowViewport) {
              observer.disconnect();
              return;
            }
            setPhase("armed");
            return;
          }
          if (!entry.isIntersecting) return;
          setPhase("fire");
          observer.disconnect();
        },
        { rootMargin: "0px 0px -14% 0px" },
      );
      observer.observe(element);
      return () => observer.disconnect();
    },
  );

  return [setRef, (): Phase => (reduce() ? "rest" : phase())] as const;
}

const BRIGHTEST_ECHO = 0.4;
const FAINTEST_ECHO = 0.06;

function echoOpacity(k: number, count: number) {
  if (count <= 1) return BRIGHTEST_ECHO;
  return BRIGHTEST_ECHO * (FAINTEST_ECHO / BRIGHTEST_ECHO) ** ((k - 1) / (count - 1));
}

const converge = stylex.keyframes({
  "0%": { transform: "var(--strobe-from)" },
  "100%": { transform: "translate3d(0, 0, 0)" },
});

const styles = stylex.create({
  host: {
    position: "relative",
    display: "block",
  },
  final: {
    display: "block",
  },
  echo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    color: tone.navy,
    pointerEvents: "none",
    userSelect: "none",
  },
  inner: {
    display: "block",
    opacity: "var(--strobe-o)",
    transform: "var(--strobe-from)",
  },
  converge: {
    animationName: converge,
    animationDuration: "var(--merge-len)",
    animationDelay: "var(--merge-at)",
    animationTimingFunction: "var(--merge-steps)",
    animationFillMode: "both",
  },
  frame: {
    position: "relative",
    display: "block",
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
});

const DIAGONAL_DROP = 0.66;
const TITLE_TRAIL_BRIGHTEST = 0.34;

function trailOffset(axis: "x" | "diagonal", k: number, unit: string) {
  const across = `calc(${-k} * ${unit})`;
  if (axis === "x") return `translate3d(${across}, 0, 0)`;
  return `translate3d(${across}, calc(${-k * DIAGONAL_DROP} * ${unit}), 0)`;
}

export function StrobeText(props: {
  phase: Phase;
  delay?: number;
  count?: number;
  unit?: string;
  axis?: "x" | "diagonal";
  sx?: StyleXStyles;
  children: JSX.Element;
}) {
  const p = merge({ delay: 0, count: 5, unit: "0.14em", axis: "diagonal" as const }, props);
  const landing = p.delay + p.count * TICK;
  return (
    <span {...stylex.attrs(styles.host, p.sx)}>
      <span
        {...stylex.attrs(
          styles.final,
          p.phase === "armed" && strobe.hidden,
          p.phase === "fire" && strobe.pop,
        )}
        style={{ "--pop-at": `${landing}ms` } as JSX.CSSProperties}
      >
        {p.children}
      </span>
      {p.phase === "rest"
        ? null
        : echoIndexes(p.count).map((k) => (
            <span
              aria-hidden="true"
              {...stylex.attrs(
                styles.echo,
                p.phase === "armed" && strobe.hidden,
                p.phase === "fire" && strobe.flash,
              )}
              style={
                {
                  "--flash-at": `${p.delay + (p.count - k) * TICK}ms`,
                  "--flash-len": `${(2 * k + 1) * TICK}ms`,
                  "--merge-at": `${landing + TICK}ms`,
                  "--merge-len": `${k * TICK}ms`,
                  "--merge-steps": `steps(${k}, end)`,
                  "--strobe-from": trailOffset(p.axis, k, p.unit),
                  "--strobe-o": trailOpacity(k, p.count, TITLE_TRAIL_BRIGHTEST).toFixed(3),
                } as JSX.CSSProperties
              }
            >
              <span {...stylex.attrs(styles.inner, p.phase === "fire" && styles.converge)}>
                {p.children}
              </span>
            </span>
          ))}
    </span>
  );
}

export function StrobeImage(props: {
  phase: Phase;
  delay?: number;
  count?: number;
  unit?: string;
  src: string;
  alt: string;
  eager?: boolean;
  sx?: StyleXStyles;
  imageSx?: StyleXStyles;
}) {
  const p = merge({ delay: 0, count: 3, unit: "6%", eager: false }, props);
  const landing = p.delay + p.count * TICK;
  const loading = p.eager ? "eager" : "lazy";
  return (
    <span {...stylex.attrs(styles.frame, p.sx)}>
      {p.phase === "rest"
        ? null
        : echoIndexes(p.count).map((k) => (
            <span
              aria-hidden="true"
              {...stylex.attrs(
                styles.echo,
                p.phase === "armed" && strobe.hidden,
                p.phase === "fire" && strobe.flash,
              )}
              style={
                {
                  "--flash-at": `${p.delay + (p.count - k) * TICK}ms`,
                  "--flash-len": `${(k + 2) * TICK}ms`,
                  "--strobe-from": trailOffset("x", k, p.unit),
                  "--strobe-o": echoOpacity(k, p.count).toFixed(3),
                } as JSX.CSSProperties
              }
            >
              <img
                src={p.src}
                alt=""
                loading={loading}
                decoding="async"
                {...stylex.attrs(ui.fill, p.imageSx, styles.inner)}
              />
            </span>
          ))}
      <img
        src={p.src}
        alt={p.alt}
        loading={loading}
        decoding="async"
        {...stylex.attrs(
          ui.fill,
          p.imageSx,
          p.phase === "armed" && strobe.hidden,
          p.phase === "fire" && strobe.pop,
        )}
        style={{ "--pop-at": `${landing}ms` } as JSX.CSSProperties}
      />
    </span>
  );
}
