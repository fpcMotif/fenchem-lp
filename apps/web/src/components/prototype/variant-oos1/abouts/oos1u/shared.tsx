import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { dynamic, type JSX } from "@solidjs/web";
import { createEffect, createSignal, merge, onSettled, type Component } from "solid-js";
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

export function Reveal(props: {
  children: JSX.Element;
  sx?: StyleXStyles;
  as?: RevealTag;
  delay?: number;
}) {
  const p = merge({ as: "div" as RevealTag, delay: 0 }, props);
  const Tag = dynamic(() => p.as) as Component<JSX.HTMLAttributes<HTMLElement>>;
  let ref: HTMLElement | undefined;
  const reduce = useReducedMotion();
  const [pending, setPending] = createSignal(false);

  onSettled(() => {
    const element = ref;
    setPending(
      Boolean(
        element &&
        typeof IntersectionObserver !== "undefined" &&
        element.getBoundingClientRect().top >= window.innerHeight * 0.9,
      ),
    );
  });

  createEffect(
    () => reduce(),
    (reduced) => {
      const element = ref;
      if (reduced) return;
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
    },
  );

  return (
    <Tag
      ref={(element: HTMLElement) => (ref = element)}
      {...stylex.attrs(
        reveal.base,
        !reduce() && pending() && reveal.pending,
        reveal.delay(p.delay),
        p.sx,
      )}
    >
      {p.children}
    </Tag>
  );
}
