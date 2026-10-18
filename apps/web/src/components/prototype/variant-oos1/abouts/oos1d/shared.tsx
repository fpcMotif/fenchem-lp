import * as stylex from "@stylexjs/stylex";
import { useInView } from "@/compat/motion";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";
import {} from "./tokens.stylex";
import { ui } from "./shared-values";

const REVEAL_STEP_MS = 80;
const REVEAL_MAX_STEPS = 4;

const revealDelay = (index: number) => Math.min(index, REVEAL_MAX_STEPS) * REVEAL_STEP_MS;

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function Reveal(props: {
  children: JSX.Element;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const Tag = dynamicTag(() => props.as ?? "div");
  let ref: HTMLElement | undefined;
  const shown = useInView(() => ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <Tag
      ref={(el: HTMLElement) => (ref = el)}
      {...stylex.attrs(
        ui.reveal,
        shown() && ui.revealShown,
        dynamic.delay(revealDelay(props.step ?? 0)),
        props.sx,
      )}
    >
      {props.children}
    </Tag>
  );
}

export function Section(props: {
  id: string;
  label: string;
  background: stylex.StyleXStyles;
  sx?: stylex.StyleXStyles;
  children: JSX.Element;
}) {
  const nameId = `${props.id}-name`;
  return (
    <section
      id={props.id}
      aria-labelledby={nameId}
      {...stylex.attrs(ui.section, props.background, props.sx)}
    >
      <h2 id={nameId} {...stylex.attrs(ui.srOnly)}>
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
}) {
  return (
    <Reveal as="figure" sx={ui.figure}>
      <div {...stylex.attrs(ui.frame, props.ratio)}>
        <img
          src={props.src}
          alt={props.alt}
          loading="lazy"
          decoding="async"
          {...stylex.attrs(ui.fill)}
        />
      </div>
      {props.caption ? (
        <figcaption {...stylex.attrs(ui.caption)}>{props.caption}</figcaption>
      ) : null}
    </Reveal>
  );
}
