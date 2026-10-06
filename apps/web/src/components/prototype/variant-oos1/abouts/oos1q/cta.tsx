import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { CTA } from "../../content";
import { Reveal, ui } from "./shared";
import { tone } from "./tokens.stylex";

const s = stylex.create({
  cta: {
    scrollMarginTop: 132,
    paddingTop: { default: 40, [breakpoints.md]: 64, [breakpoints.xl]: 80 },
    paddingBottom: { default: 72, [breakpoints.md]: 96, [breakpoints.xl]: 120 },
  },
  row: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: { default: 32, [breakpoints.md]: 56, [breakpoints.xl]: 80 },
  },
  title: {
    margin: 0,
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    fontSize: { default: 28, [breakpoints.md]: 36, [breakpoints.xl]: 44 },
    fontWeight: 400,
    lineHeight: 1.8,
    letterSpacing: "0.2em",
    color: tone.ink,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: { default: "min(100%, 220px)", [breakpoints.md]: 220 },
    flexShrink: 1,
    minWidth: 0,
  },
  action: {
    width: "100%",
    paddingInline: 0,
  },
});

export function Cta({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.props(s.cta)}>
      <div {...stylex.props(ui.shell, ui.inset)}>
        <Reveal sx={s.row}>
          <h2 id="about-cta-title" {...stylex.props(s.title)}>
            {CTA.title}
          </h2>
          <div {...stylex.props(s.actions)}>
            <button
              type="button"
              onClick={() => onNavigateHome("contact")}
              {...stylex.props(ui.button, ui.buttonPrimary, ui.focusRing, s.action)}
            >
              {CTA.action.label}
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome("products")}
              {...stylex.props(ui.button, ui.buttonSecondary, ui.focusRing, s.action)}
            >
              产品与应用
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
