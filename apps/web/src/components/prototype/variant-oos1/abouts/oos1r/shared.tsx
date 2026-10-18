import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";
import { createEffect, createSignal, merge } from "solid-js";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { motionCss } from "./tokens.stylex";
import { ui } from "./shared-values";

const reveal = stylex.create({
  base: {
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: motionCss.out,
  },
  hidden: {
    opacity: { default: 0, [breakpoints.motionReduce]: 1 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(20px)" },
  },
  shown: {
    opacity: 1,
    transform: "none",
  },
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

type RevealState = "static" | "hidden" | "shown";

export function Reveal(props: {
  children: JSX.Element;
  delay?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const p = merge({ delay: 0, as: "div" as const }, props);
  const Tag = dynamicTag(() => p.as);
  let ref: HTMLElement | undefined;
  const reduce = useReducedMotion();
  const [state, setState] = createSignal<RevealState>("static");

  createEffect(
    () => reduce(),
    (reduced) => {
      const node = ref;
      if (!node || reduced || !("IntersectionObserver" in window)) return;
      if (node.getBoundingClientRect().top < window.innerHeight) return;
      setState("hidden");
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          setState("shown");
          observer.disconnect();
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      observer.observe(node);
      return () => observer.disconnect();
    },
  );

  return (
    <Tag
      ref={(el: HTMLElement) => (ref = el)}
      {...stylex.attrs(
        reveal.base,
        state() === "hidden" && reveal.hidden,
        state() === "shown" && reveal.shown,
        state() === "shown" && p.delay > 0 && reveal.delay(p.delay),
        p.sx,
      )}
    >
      {p.children}
    </Tag>
  );
}

export function Section(props: {
  id: string;
  label: string;
  sx?: stylex.StyleXStyles;
  children: JSX.Element;
}) {
  const nameId = `${props.id}-name`;
  return (
    <section id={props.id} aria-labelledby={nameId} {...stylex.attrs(ui.section, props.sx)}>
      <h2 id={nameId} {...stylex.attrs(ui.srOnly)}>
        {props.label}
      </h2>
      <div {...stylex.attrs(ui.shell, ui.inset)}>{props.children}</div>
    </section>
  );
}
