import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { CTA } from "../../content";
import { Reveal } from "./shared";
import { ui } from "./shared-values";
import { step, tone } from "./tokens.stylex";

const s = stylex.create({
  title: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 8" },
    margin: 0,
    fontSize: { default: step.display, [breakpoints.md]: "64px" },
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
    gridColumn: { default: "auto", [breakpoints.lg]: "8 / 13" },
    alignSelf: "end",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
  },
});

export function Cta(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.attrs(ui.section, ui.onPage)}>
      <div {...stylex.attrs(ui.shell, ui.inset)}>
        <Reveal sx={ui.grid}>
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
              {...stylex.attrs(ui.button, ui.buttonQuiet, ui.focusRing)}
            >
              产品与应用
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
