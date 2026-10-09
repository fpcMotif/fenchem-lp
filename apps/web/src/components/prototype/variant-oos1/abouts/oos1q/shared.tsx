import * as stylex from "@stylexjs/stylex";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {} from "./tokens.stylex";
import { ui } from "./shared-values";

const REVEAL_STEP_MS = 90;
const REVEAL_MAX_STEPS = 3;
const REVEAL_EDGE = 0.9;
const REVEAL_RESCUE_MS = 1500;

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

type RevealPhase = "visible" | "hidden" | "shown";

export function Reveal({
  children,
  step: stagger = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article" | "p";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement & HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<RevealPhase>("visible");

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce || typeof IntersectionObserver === "undefined") return;
    if (node.getBoundingClientRect().top < window.innerHeight * REVEAL_EDGE) return;
    setPhase("hidden");
    let observing = false;
    const observer = new IntersectionObserver(
      (entries) => {
        observing = true;
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setPhase("shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    const rescue = window.setTimeout(() => {
      if (!observing) setPhase("shown");
    }, REVEAL_RESCUE_MS);
    return () => {
      observer.disconnect();
      window.clearTimeout(rescue);
    };
  }, [reduce]);

  return (
    <Tag
      ref={ref}
      {...stylex.props(
        sx,
        phase === "hidden" && ui.hidden,
        phase === "shown" && ui.shown,
        phase === "shown" && dynamic.delay(Math.min(stagger, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
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

export function Figure({
  src,
  alt,
  caption,
  ratio,
  fit,
  sx,
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio: stylex.StyleXStyles;
  fit?: stylex.StyleXStyles;
  sx?: stylex.StyleXStyles;
}) {
  return (
    <Reveal as="figure" sx={[ui.figure, sx]}>
      <div {...stylex.props(ui.frame, ratio)}>
        <img src={src} alt={alt} loading="lazy" decoding="async" {...stylex.props(ui.fill, fit)} />
      </div>
      {caption ? <figcaption {...stylex.props(ui.caption)}>{caption}</figcaption> : null}
    </Reveal>
  );
}
