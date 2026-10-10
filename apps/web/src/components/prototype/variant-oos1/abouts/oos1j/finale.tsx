import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CTA } from "../../content";
import { Monument, Reveal, RiseText, useInViewOnce } from "./parts";
import { base, btn } from "./shared";
import { hue, size } from "./theme.stylex";

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

export function Finale({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [titleRef, titleShown] = useInViewOnce<HTMLHeadingElement>();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
  const slide = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["14%", "0%"]);
  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-cta-title"
      {...stylex.props(base.section, styles.finale)}
    >
      <Monument text="Fenchem" style={{ x: slide }} sx={styles.monument} />
      <div {...stylex.props(base.shell, styles.inner)}>
        <h2 ref={titleRef} id="about-cta-title" {...stylex.props(styles.title)}>
          <RiseText
            text={CTA.title}
            srText="Together, open the next breakthrough"
            play={titleShown}
            stagger={55}
          />
        </h2>
        <Reveal step={1} sx={styles.buttons}>
          <button
            type="button"
            onClick={() => onNavigateHome("contact")}
            {...stylex.props(btn.base, btn.accent, base.focus)}
          >
            <span>{CTA.action.label}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateHome("products")}
            {...stylex.props(btn.base, btn.outline, base.focus)}
          >
            <span>产品与应用</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
