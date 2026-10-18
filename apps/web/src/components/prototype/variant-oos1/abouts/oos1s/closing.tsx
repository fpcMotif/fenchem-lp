import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { createEffect } from "solid-js";
import { m, useMotionValue, useScroll, useTransform } from "@/compat/motion";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CSR } from "../../about-data";
import { CTA } from "../../content";
import { ui } from "./shared-values";
import { slit, step, tone } from "./tokens.stylex";

const s = stylex.create({
  closing: {
    position: "relative",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 28, [breakpoints.xl]: 40 },
    paddingTop: { default: 72, [breakpoints.md]: 96, [breakpoints.xl]: 120 },
    paddingBottom: { default: 96, [breakpoints.md]: 112, [breakpoints.xl]: 120 },
  },
  title: {
    margin: 0,
    fontSize: { default: step.display, [breakpoints.md]: step.large },
    fontWeight: 500,
    lineHeight: 1.15,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  actions: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.sm]: "row" },
    alignItems: { default: "stretch", [breakpoints.sm]: "center" },
    flexWrap: "wrap",
    gap: 16,
  },
  curtain: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: tone.tint,
    clipPath: slit.closingShut,
  },
  image: {
    objectPosition: { default: "64% 50%", [breakpoints.md]: "50% 38%" },
  },
});

export function Closing(props: { onNavigateHome: (hash?: string) => void }) {
  let ref: HTMLElement | undefined;
  const reduce = useReducedMotion();
  const held = useMotionValue(1);
  const { scrollYProgress } = useScroll({ target: () => ref, offset: ["start 0.75", "end 0.85"] });
  const progress = useTransform([scrollYProgress, held], ([scrolled, hold]: number[]) =>
    Math.max(scrolled, hold),
  );
  const clipPath = useTransform(progress, [0, 1], [slit.closingOpen, slit.closingShut]);

  createEffect(
    () => reduce(),
    (reduced) => {
      held.set(reduced ? 1 : 0);
    },
  );

  return (
    <section
      ref={ref}
      aria-labelledby="about-cta-title"
      onFocus={(event) => {
        if (event.target.matches(":focus-visible")) held.set(1);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          held.set(reduce() ? 1 : 0);
      }}
      {...stylex.attrs(s.closing, ui.onPaper)}
    >
      <div {...stylex.attrs(ui.shell, ui.inset, s.copy)}>
        <h2 id="about-cta-title" {...stylex.attrs(s.title)}>
          {CTA.title}
        </h2>
        <div {...stylex.attrs(s.actions)}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("contact")}
            {...stylex.attrs(ui.button, ui.buttonPrimary, ui.focusRing)}
          >
            {CTA.action.label}
          </button>
          <button
            type="button"
            onClick={() => props.onNavigateHome("products")}
            {...stylex.attrs(ui.button, ui.buttonSecondary, ui.focusRing)}
          >
            产品与应用
          </button>
        </div>
      </div>
      <m.div aria-hidden="true" style={{ clipPath }} {...stylex.attrs(s.curtain)}>
        <img
          src={ABOUT_CSR.image}
          alt=""
          loading="lazy"
          decoding="async"
          {...stylex.attrs(ui.fill, s.image)}
        />
      </m.div>
    </section>
  );
}
