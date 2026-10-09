import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { bp, face, sky } from "./tokens.stylex";
import { ui } from "./shared-values";

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
