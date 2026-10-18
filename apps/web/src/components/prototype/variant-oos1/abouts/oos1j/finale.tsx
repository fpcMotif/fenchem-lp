import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "@fenchem-lp/ui/components/lucide";
import { useScroll, useTransform } from "@/compat/motion";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CTA } from "../../content";
import { Monument, Reveal, RiseText, useInViewOnce } from "./parts";
import { base, btn } from "./shared";
import { hue, size } from "./theme.stylex";
import { createSignal } from "solid-js";

const styles = stylex.create({
  finale: {
    overflow: "clip",
    paddingTop: size.bandY,
    paddingBottom: "calc(8vw + 56px)",
    backgroundColor: colors.paper,
  },
  monument: {
    left: "-0.03em",
    bottom: "-0.42em",
    fontSize: "20vw",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 32, [breakpoints.lg]: 48 },
  },
  title: {
    margin: 0,
    fontSize: "clamp(36px, 5.6vw, 80px)",
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.03em",
    color: hue.ink,
    textWrap: "balance",
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
  },
});

export function Finale(props: { onNavigateHome: (hash?: string) => void }) {
  const [sectionRef, setSectionRef] = createSignal<HTMLElement>();
  const [titleRef, titleShown] = useInViewOnce<HTMLHeadingElement>();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
  const slideMotion = useTransform(scrollYProgress, [0, 1], ["14%", "0%"]);
  const slide = useTransform(() => (reduce() ? "0%" : slideMotion()));
  return (
    <section
      ref={setSectionRef}
      aria-labelledby="about-cta-title"
      {...stylex.attrs(base.section, styles.finale)}
    >
      <Monument text="Fenchem" style={{ x: slide }} sx={styles.monument} />
      <div {...stylex.attrs(base.shell, styles.inner)}>
        <h2 ref={titleRef} id="about-cta-title" {...stylex.attrs(styles.title)}>
          <RiseText
            text={CTA.title}
            srText="Together, open the next breakthrough"
            play={titleShown()}
            stagger={55}
          />
        </h2>
        <Reveal step={1} sx={styles.buttons}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("contact")}
            {...stylex.attrs(btn.base, btn.accent, base.focus)}
          >
            <span>{CTA.action.label}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => props.onNavigateHome("products")}
            {...stylex.attrs(btn.base, btn.outline, base.focus)}
          >
            <span>产品与应用</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
