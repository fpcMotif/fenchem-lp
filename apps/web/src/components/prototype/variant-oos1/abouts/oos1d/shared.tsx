import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";
import {} from "./tokens.stylex";
import { ui } from "./shared-values";

const REVEAL_STEP_MS = 80;
const REVEAL_MAX_STEPS = 4;

const revealDelay = (index: number) => Math.min(index, REVEAL_MAX_STEPS) * REVEAL_STEP_MS;

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function Reveal({
  children,
  step: stagger = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <Tag
      ref={ref}
      {...stylex.props(ui.reveal, shown && ui.revealShown, dynamic.delay(revealDelay(stagger)), sx)}
    >
      {children}
    </Tag>
  );
}

export function Section({
  id,
  label,
  background,
  sx,
  children,
}: {
  id: string;
  label: string;
  background: stylex.StyleXStyles;
  sx?: stylex.StyleXStyles;
  children: ReactNode;
}) {
  const nameId = `${id}-name`;
  return (
    <section id={id} aria-labelledby={nameId} {...stylex.props(ui.section, background, sx)}>
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
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio: stylex.StyleXStyles;
}) {
  return (
    <Reveal as="figure" sx={ui.figure}>
      <div {...stylex.props(ui.frame, ratio)}>
        <img src={src} alt={alt} loading="lazy" decoding="async" {...stylex.props(ui.fill)} />
      </div>
      {caption ? <figcaption {...stylex.props(ui.caption)}>{caption}</figcaption> : null}
    </Reveal>
  );
}
