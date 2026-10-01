import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import { CTA } from "../../content";
import { Fold, s } from "./shared";
import { fonts } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    paddingBlock: { default: 72, [breakpoints.lg]: 144 },
    color: colors.paper,
  },
  inner: {
    alignItems: "center",
    gap: { default: 36, [breakpoints.lg]: 56 },
  },
  title: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: {
      default: 34,
      [breakpoints.md]: "min(7vw, 64px)",
      [breakpoints.lg]: "min(5.6vw, 80px)",
    },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.04em",
    textAlign: "center",
    textWrap: "balance",
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});

export function Closing({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section
      aria-labelledby="about-cta-title"
      {...stylex.props(s.section, s.bandNavy, styles.section)}
    >
      <div {...stylex.props(s.shell)}>
        <Fold innerSx={styles.inner}>
          <h2 id="about-cta-title" {...stylex.props(styles.title)}>
            {CTA.title}
          </h2>
          <div {...stylex.props(styles.buttons)}>
            <button
              type="button"
              onClick={() => onNavigateHome("contact")}
              {...stylex.props(s.button, s.buttonInverse, s.focusRingLight)}
            >
              <span>{CTA.action.label}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome("products")}
              {...stylex.props(s.button, s.buttonGhost, s.focusRingLight)}
            >
              <span>产品与应用</span>
            </button>
          </div>
        </Fold>
      </div>
    </section>
  );
}
