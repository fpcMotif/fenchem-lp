import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { ui } from "./layout";
import { tone } from "./tokens.stylex";
import { TICK, trailOpacity, echoIndexes, strobe } from "./strobe-values";

export type Phase = "rest" | "armed" | "fire";

export function useEntry<T extends Element>() {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<Phase>("rest");
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
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
  }, [reduce]);

  return [ref, reduce ? "rest" : phase] as const;
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

export function StrobeText({
  phase,
  delay = 0,
  count = 5,
  unit = "0.14em",
  axis = "diagonal",
  sx,
  children,
}: {
  phase: Phase;
  delay?: number;
  count?: number;
  unit?: string;
  axis?: "x" | "diagonal";
  sx?: StyleXStyles;
  children: ReactNode;
}) {
  const landing = delay + count * TICK;
  return (
    <span {...stylex.props(styles.host, sx)}>
      <span
        {...stylex.props(
          styles.final,
          phase === "armed" && strobe.hidden,
          phase === "fire" && strobe.pop,
        )}
        style={{ "--pop-at": `${landing}ms` } as CSSProperties}
      >
        {children}
      </span>
      {phase === "rest"
        ? null
        : echoIndexes(count).map((k) => (
            <span
              key={k}
              aria-hidden="true"
              {...stylex.props(
                styles.echo,
                phase === "armed" && strobe.hidden,
                phase === "fire" && strobe.flash,
              )}
              style={
                {
                  "--flash-at": `${delay + (count - k) * TICK}ms`,
                  "--flash-len": `${(2 * k + 1) * TICK}ms`,
                  "--merge-at": `${landing + TICK}ms`,
                  "--merge-len": `${k * TICK}ms`,
                  "--merge-steps": `steps(${k}, end)`,
                  "--strobe-from": trailOffset(axis, k, unit),
                  "--strobe-o": trailOpacity(k, count, TITLE_TRAIL_BRIGHTEST).toFixed(3),
                } as CSSProperties
              }
            >
              <span {...stylex.props(styles.inner, phase === "fire" && styles.converge)}>
                {children}
              </span>
            </span>
          ))}
    </span>
  );
}

export function StrobeImage({
  phase,
  delay = 0,
  count = 3,
  unit = "6%",
  src,
  alt,
  eager = false,
  sx,
  imageSx,
}: {
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
  const landing = delay + count * TICK;
  const loading = eager ? "eager" : "lazy";
  return (
    <span {...stylex.props(styles.frame, sx)}>
      {phase === "rest"
        ? null
        : echoIndexes(count).map((k) => (
            <span
              key={k}
              aria-hidden="true"
              {...stylex.props(
                styles.echo,
                phase === "armed" && strobe.hidden,
                phase === "fire" && strobe.flash,
              )}
              style={
                {
                  "--flash-at": `${delay + (count - k) * TICK}ms`,
                  "--flash-len": `${(k + 2) * TICK}ms`,
                  "--strobe-from": trailOffset("x", k, unit),
                  "--strobe-o": echoOpacity(k, count).toFixed(3),
                } as CSSProperties
              }
            >
              <img
                src={src}
                alt=""
                loading={loading}
                decoding="async"
                {...stylex.props(ui.fill, imageSx, styles.inner)}
              />
            </span>
          ))}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        {...stylex.props(
          ui.fill,
          imageSx,
          phase === "armed" && strobe.hidden,
          phase === "fire" && strobe.pop,
        )}
        style={{ "--pop-at": `${landing}ms` } as CSSProperties}
      />
    </span>
  );
}
