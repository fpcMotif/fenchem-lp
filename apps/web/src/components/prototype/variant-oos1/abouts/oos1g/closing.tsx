import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import { CTA } from "../../content";
import { layout } from "./layout";
import { palette } from "./palette.stylex";
import { Reveal } from "./reveal";

const LG = breakpoints.lg;

const styles = stylex.create({
  section: {
    backgroundColor: palette.page,
  },
  grid: {
    alignItems: "center",
    paddingBlock: { default: 44, [LG]: 96 },
  },
  title: {
    margin: 0,
    fontFamily: palette.fontBody,
    fontSize: {
      default: "clamp(32px, 9vw, 44px)",
      [breakpoints.md]: 56,
      [LG]: "clamp(44px, 4.6vw, 64px)",
    },
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.02em",
    color: palette.ink,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
  },
});

export function Closing({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.props(styles.section, layout.sectionY)}>
      <div {...stylex.props(layout.shell, layout.split, styles.grid)}>
        <Reveal sx={[layout.padLeft, layout.seam]}>
          <h2 id="about-cta-title" {...stylex.props(styles.title)}>
            {CTA.title}
          </h2>
        </Reveal>
        <Reveal step={1} sx={layout.padRight}>
          <div {...stylex.props(styles.actions)}>
            <button
              type="button"
              onClick={() => onNavigateHome("contact")}
              {...stylex.props(layout.button, layout.buttonPrimary, layout.focusRing)}
            >
              <span>{CTA.action.label}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome("products")}
              {...stylex.props(layout.button, layout.buttonOutline, layout.focusRing)}
            >
              <span>产品与应用</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
