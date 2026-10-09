import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {} from "./tokens.stylex";
import { ui } from "./shared-values";

const REVEAL_STEP_MS = 90;
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
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const seen = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  useEffect(() => {
    const box = ref.current?.getBoundingClientRect();
    if (!reduce && box && box.top > window.innerHeight) setArmed(true);
  }, [reduce]);

  return (
    <Tag
      ref={ref}
      {...stylex.props(
        ui.reveal,
        armed && !seen && !reduce && ui.revealHidden,
        dynamic.delay(revealDelay(stagger)),
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
