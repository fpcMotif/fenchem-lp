import * as stylex from "@stylexjs/stylex";
import { createEffect, createSignal, merge } from "solid-js";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";
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

export function Reveal(props: {
  children: JSX.Element;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article" | "p";
}) {
  const p = merge({ step: 0, as: "div" as const }, props);
  const Tag = dynamicTag(() => p.as);
  let node: HTMLElement | undefined;
  const reduce = useReducedMotion();
  const [phase, setPhase] = createSignal<RevealPhase>("visible");

  createEffect(
    () => reduce(),
    (reduced) => {
      if (!node || reduced || typeof IntersectionObserver === "undefined") return;
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
    },
  );

  return (
    <Tag
      ref={(el: HTMLElement) => (node = el)}
      {...stylex.attrs(
        p.sx,
        phase() === "hidden" && ui.hidden,
        phase() === "shown" && ui.shown,
        phase() === "shown" && dynamic.delay(Math.min(p.step, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
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
  const nameId = () => `${props.id}-name`;
  return (
    <section id={props.id} aria-labelledby={nameId()} {...stylex.attrs(ui.section, props.sx)}>
      <h2 id={nameId()} {...stylex.attrs(ui.srOnly)}>
        {props.label}
      </h2>
      <div {...stylex.attrs(ui.shell, ui.inset)}>{props.children}</div>
    </section>
  );
}

export function Figure(props: {
  src: string;
  alt: string;
  caption?: string;
  ratio: stylex.StyleXStyles;
  fit?: stylex.StyleXStyles;
  sx?: stylex.StyleXStyles;
}) {
  return (
    <Reveal as="figure" sx={[ui.figure, props.sx]}>
      <div {...stylex.attrs(ui.frame, props.ratio)}>
        <img
          src={props.src}
          alt={props.alt}
          loading="lazy"
          decoding="async"
          {...stylex.attrs(ui.fill, props.fit)}
        />
      </div>
      {props.caption ? (
        <figcaption {...stylex.attrs(ui.caption)}>{props.caption}</figcaption>
      ) : null}
    </Reveal>
  );
}
