import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { CTA } from "../../content";
import { Reveal, ui } from "./shared";
import { step, tone } from "./tokens.stylex";

const s = stylex.create({
  cta: {
    scrollMarginTop: 136,
    paddingBlock: { default: 40, [breakpoints.md]: 56, [breakpoints.xl]: 72 },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 61.8fr) minmax(0, 38.2fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 48, [breakpoints.xl]: 80 },
    rowGap: 40,
    alignItems: "end",
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
});

export function Cta({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.props(s.cta, ui.onPaper)}>
      <div {...stylex.props(ui.shell, ui.inset)}>
        <Reveal sx={s.grid}>
          <h2 id="about-cta-title" {...stylex.props(s.title)}>
            {CTA.title}
          </h2>
          <div {...stylex.props(s.actions)}>
            <button
              type="button"
              onClick={() => onNavigateHome("contact")}
              {...stylex.props(ui.button, ui.buttonPrimary, ui.focusRing)}
            >
              {CTA.action.label}
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome("products")}
              {...stylex.props(ui.button, ui.buttonSecondary, ui.focusRing)}
            >
              产品与应用
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
