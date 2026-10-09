import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { type ReactNode, useEffect, useRef, useState } from "react";
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

export function Reveal({
  children,
  delay = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const [state, setState] = useState<RevealState>("static");

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce || !("IntersectionObserver" in window)) return;
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
  }, [reduce]);

  return (
    <Tag
      ref={ref}
      {...stylex.props(
        reveal.base,
        state === "hidden" && reveal.hidden,
        state === "shown" && reveal.shown,
        state === "shown" && delay > 0 && reveal.delay(delay),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}

export function Section({
  id,
  label,
  sx,
  children,
}: {
  id: string;
  label: string;
  sx?: stylex.StyleXStyles;
  children: ReactNode;
}) {
  const nameId = `${id}-name`;
  return (
    <section id={id} aria-labelledby={nameId} {...stylex.props(ui.section, sx)}>
      <h2 id={nameId} {...stylex.props(ui.srOnly)}>
        {label}
      </h2>
      <div {...stylex.props(ui.shell, ui.inset)}>{children}</div>
    </section>
  );
}
