import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { CTA } from "../../content";
import { Reveal } from "./shared";
import { ui } from "./shared-values";
import { band, font, motionCss, step, tone } from "./tokens.stylex";

const s = stylex.create({
  band: {
    paddingBlock: { default: 72, [band.mdToXl]: 96, [breakpoints.xl]: 128 },
    backgroundColor: tone.navy,
    color: tone.onNavy,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 1fr) auto",
    },
    columnGap: 64,
    rowGap: 40,
    alignItems: "end",
  },
  title: {
    margin: 0,
    fontSize: { default: 34, [band.mdToXl]: 52, [breakpoints.xl]: 72 },
    fontWeight: 500,
    lineHeight: 1.15,
    letterSpacing: "0.04em",
    color: tone.onNavy,
  },
  actions: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.sm]: "row" },
    alignItems: { default: "stretch", [breakpoints.sm]: "center" },
    gap: { default: 16, [breakpoints.sm]: 28 },
  },
  primary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    paddingInline: 28,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: { default: colors.paper, ":hover": tone.glyphBlue },
    fontFamily: font.cjk,
    fontSize: step.body,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: tone.navy,
    cursor: "pointer",
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 2px ${tone.navy}, 0 0 0 4px ${colors.paper}`,
    },
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    transitionTimingFunction: motionCss.out,
  },
  secondary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: step.body,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: tone.onNavy,
    cursor: "pointer",
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textUnderlineOffset: 8,
    textDecorationColor: { default: tone.navyRule, ":hover": tone.onNavy },
    transitionProperty: "text-decoration-color",
    transitionDuration: "200ms",
    transitionTimingFunction: motionCss.out,
  },
});

export function Cta({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.props(s.band)}>
      <div {...stylex.props(ui.shell, ui.inset)}>
        <Reveal sx={s.grid}>
          <h2 id="about-cta-title" {...stylex.props(s.title)}>
            {CTA.title}
          </h2>
          <div {...stylex.props(s.actions)}>
            <button
              type="button"
              onClick={() => onNavigateHome("contact")}
              {...stylex.props(s.primary, ui.focusRing)}
            >
              {CTA.action.label}
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome("products")}
              {...stylex.props(s.secondary, ui.focusRing)}
            >
              产品与应用
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
