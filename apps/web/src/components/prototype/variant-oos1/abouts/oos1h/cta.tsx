import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import { CTA } from "../../content";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { mq, ui } from "./theme.stylex";

const styles = stylex.create({
  section: {
    paddingBlock: { default: 80, [breakpoints.xl]: 144 },
    backgroundColor: colors.paper,
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 40, [breakpoints.xl]: 56 },
  },
  title: {
    margin: 0,
    maxWidth: "12em",
    fontSize: { default: 36, [mq.tablet]: 52, [breakpoints.xl]: 72 },
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.04em",
    color: ui.ink,
    textWrap: "balance",
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
  },
});

export function Cta({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.props(styles.section)}>
      <Reveal sx={[shared.shell, shared.inset, styles.inner]}>
        <h2 id="about-cta-title" {...stylex.props(styles.title)}>
          {CTA.title}
        </h2>
        <div {...stylex.props(styles.buttons)}>
          <button
            type="button"
            onClick={() => onNavigateHome("contact")}
            {...stylex.props(shared.button, shared.buttonPrimary, shared.focusRing)}
          >
            <span>{CTA.action.label}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateHome("products")}
            {...stylex.props(shared.button, shared.buttonQuiet, shared.focusRing)}
          >
            <span>产品与应用</span>
          </button>
        </div>
      </Reveal>
    </section>
  );
}
