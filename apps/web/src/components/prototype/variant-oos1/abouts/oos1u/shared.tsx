import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { curve } from "./tokens.stylex";

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
  const attach = useCallback((element: HTMLElement | null) => {
    ref.current = element;
    setPending(
      Boolean(
        element &&
        typeof IntersectionObserver !== "undefined" &&
        element.getBoundingClientRect().top >= window.innerHeight * 0.9,
      ),
    );
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (reduce) return;
    if (!element || typeof IntersectionObserver === "undefined") return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;
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
      ref={attach}
      {...stylex.props(reveal.base, !reduce && pending && reveal.pending, reveal.delay(delay), sx)}
    >
      {children}
    </Tag>
  );
}
