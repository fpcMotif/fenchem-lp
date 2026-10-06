import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { bp, chrome, face, sky } from "./tokens.stylex";

export const ui = stylex.create({
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 20, [bp.tablet]: 40, [bp.desktop]: chrome.inset },
  },
  section: {
    position: "relative",
    scrollMarginTop: chrome.anchor,
    paddingBlock: { default: 96, [bp.tablet]: 128, [bp.desktop]: 168 },
  },
  label: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    fontVariantCaps: "all-small-caps",
    fontVariantNumeric: "lining-nums tabular-nums",
    color: sky.muted,
  },
  designation: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: 0,
    fontVariantCaps: "normal",
  },
  body: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.9,
    color: sky.text,
    textWrap: "pretty",
  },
  focusable: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 1,
    outlineOffset: 4,
    outlineColor: sky.focus,
  },
  dim: {
    transitionProperty: "opacity",
    transitionDuration: "1200ms",
    transitionTimingFunction: chrome.ease,
  },
  dimHidden: {
    opacity: { default: 0, [bp.motionReduce]: 1 },
  },
  dimDelay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export const srOnly = stylex.props(ui.srOnly);

const heading = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 14, [bp.desktop]: 18 },
  },
  numeral: {
    fontSize: 21,
    marginInline: 2,
    color: sky.tint,
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 40, [bp.tablet]: 52, [bp.desktop]: 64 },
    fontWeight: 500,
    lineHeight: 1.1,
    letterSpacing: "0.04em",
    color: sky.star,
  },
  note: {
    margin: 0,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 21, [bp.desktop]: 26 },
    lineHeight: 1.3,
    color: sky.muted,
  },
});

const pole = stylex.create({
  mark: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: 40,
    height: 40,
    marginTop: -20,
    marginLeft: -20,
    overflow: "visible",
    pointerEvents: "none",
  },
  ring: {
    fill: "none",
    stroke: sky.tint,
    strokeOpacity: 0.5,
    strokeWidth: 1,
  },
  point: {
    fill: sky.star,
  },
});

export function PoleMark() {
  return (
    <svg aria-hidden="true" viewBox="-20 -20 40 40" {...stylex.props(pole.mark)}>
      <circle r={7.5} {...stylex.props(pole.ring)} />
      <circle r={1.7} {...stylex.props(pole.point)} />
    </svg>
  );
}

export function ChartHeading({
  id,
  numeral,
  label,
  title,
  note,
}: {
  id: string;
  numeral: string;
  label: string;
  title: string;
  note: string;
}) {
  return (
    <header {...stylex.props(heading.root)}>
      <p lang="en" {...stylex.props(ui.label)}>
        Chart <span {...stylex.props(ui.designation, heading.numeral)}>{numeral}</span> · {label}
      </p>
      <h2 id={id} {...stylex.props(heading.title)}>
        {title}
      </h2>
      <p lang="en" {...stylex.props(heading.note)}>
        {note}
      </p>
    </header>
  );
}

type Phase = "rest" | "hidden" | "shown";

export function useDusk<T extends HTMLElement>(margin = "0px 0px -18% 0px") {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<Phase>("rest");
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduce) return;
    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
            observer.disconnect();
            return;
          }
          setPhase("hidden");
          return;
        }
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduce, margin]);

  return [ref, phase === "hidden"] as const;
}
