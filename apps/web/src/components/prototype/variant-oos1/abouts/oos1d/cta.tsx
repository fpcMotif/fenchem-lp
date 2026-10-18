import * as stylex from "@stylexjs/stylex";

import { CTA } from "../../content";
import { Reveal } from "./shared";
import { ui } from "./shared-values";
import { step, tone } from "./tokens.stylex";

const s = stylex.create({
  cta: {
    scrollMarginTop: 136,
    paddingBlock: {
      default: 40,
      ["@media (min-width: 768px)"]: 56,
      ["@media (min-width: 1280px)"]: 72,
    },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1024px)"]: "minmax(0, 61.8fr) minmax(0, 38.2fr)",
    },
    columnGap: {
      default: 0,
      ["@media (min-width: 1024px)"]: 48,
      ["@media (min-width: 1280px)"]: 80,
    },
    rowGap: 40,
    alignItems: "end",
  },
  title: {
    margin: 0,
    fontSize: { default: step.display, ["@media (min-width: 768px)"]: step.large },
    fontWeight: 500,
    lineHeight: 1.15,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  actions: {
    display: "flex",
    flexDirection: { default: "column", ["@media (min-width: 640px)"]: "row" },
    alignItems: { default: "stretch", ["@media (min-width: 640px)"]: "center" },
    flexWrap: "wrap",
    gap: 16,
  },
});

export function Cta(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.attrs(s.cta, ui.onPaper)}>
      <div {...stylex.attrs(ui.shell, ui.inset)}>
        <Reveal sx={s.grid}>
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
        </Reveal>
      </div>
    </section>
  );
}
