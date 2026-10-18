import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "@fenchem-lp/ui/components/lucide";

import { CTA } from "../../content";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { mq, ui } from "./theme.stylex";

const styles = stylex.create({
  section: {
    paddingBlock: { default: 80, ["@media (min-width: 1280px)"]: 144 },
    backgroundColor: colors.paper,
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 40, ["@media (min-width: 1280px)"]: 56 },
  },
  title: {
    margin: 0,
    maxWidth: "12em",
    fontSize: { default: 36, [mq.tablet]: 52, ["@media (min-width: 1280px)"]: 72 },
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

export function Cta(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.attrs(styles.section)}>
      <Reveal sx={[shared.shell, shared.inset, styles.inner]}>
        <h2 id="about-cta-title" {...stylex.attrs(styles.title)}>
          {CTA.title}
        </h2>
        <div {...stylex.attrs(styles.buttons)}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("contact")}
            {...stylex.attrs(shared.button, shared.buttonPrimary, shared.focusRing)}
          >
            <span>{CTA.action.label}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => props.onNavigateHome("products")}
            {...stylex.attrs(shared.button, shared.buttonQuiet, shared.focusRing)}
          >
            <span>产品与应用</span>
          </button>
        </div>
      </Reveal>
    </section>
  );
}
