import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { curve, media, tone } from "./tokens.stylex";

const HEADER_HEIGHT = 80;
const BAR_HEIGHT = 48;

export const ui = stylex.create({
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.indigo,
    outlineOffset: 3,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [media.tablet]: 40, [media.wide]: "min(124px, 8.6vw)" },
  },
  anchor: {
    scrollMarginTop: HEADER_HEIGHT + BAR_HEIGHT + 8,
  },
  section: {
    position: "relative",
    paddingBlock: { default: 84, [media.tablet]: 112, [media.wide]: 144 },
  },
  caption: {
    margin: 0,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.label,
  },
});

const reveal = stylex.create({
  base: {
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: curve.out,
  },
  pending: {
    opacity: 0,
    transform: "translateY(18px)",
  },
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

type RevealTag = "div" | "li" | "figure" | "p";

export function Reveal({
  children,
  sx,
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode;
  sx?: StyleXStyles;
  as?: RevealTag;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (reduce) {
      setPending(false);
      return;
    }
    if (!element || typeof IntersectionObserver === "undefined") return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setPending(true);
    let heard = false;
    const observer = new IntersectionObserver(
      (entries) => {
        heard = true;
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setPending(false);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    const silence = window.setTimeout(() => {
      if (!heard) setPending(false);
    }, 1500);
    return () => {
      observer.disconnect();
      window.clearTimeout(silence);
    };
  }, [reduce]);

  return (
    <Tag
      ref={ref as never}
      {...stylex.props(reveal.base, pending && reveal.pending, reveal.delay(delay), sx)}
    >
      {children}
    </Tag>
  );
}
