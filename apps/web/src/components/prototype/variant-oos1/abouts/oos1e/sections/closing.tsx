import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "@fenchem-lp/ui/components/lucide";

import { CTA } from "../../../content";
import { Sheet } from "../sheet";
import { Reveal } from "../shared";
import { base } from "../shared-values";
import { CLOSING_SHEET } from "../sheets";
import { color, media } from "../tokens.stylex";

const styles = stylex.create({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 36, [media.lgUp]: 52 },
  },
  title: {
    margin: 0,
    fontSize: { default: 40, [media.md]: 60, [media.xlUp]: 80 },
    fontWeight: 500,
    lineHeight: 1.15,
    letterSpacing: "0.04em",
    color: color.ink,
    textWrap: "balance",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
});

export function ClosingSheet(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <Sheet def={CLOSING_SHEET} headingId="about-cta-title" runway={false}>
      <div {...stylex.attrs(styles.content)}>
        <Reveal>
          <h2 id="about-cta-title" {...stylex.attrs(styles.title)}>
            {CTA.title}
          </h2>
        </Reveal>
        <Reveal step={1} sx={styles.buttons}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("contact")}
            {...stylex.attrs(base.button, base.buttonPrimary, base.focusRing)}
          >
            <span>{CTA.action.label}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => props.onNavigateHome("products")}
            {...stylex.attrs(base.button, base.buttonOutline, base.focusRing)}
          >
            <span>产品与应用</span>
          </button>
        </Reveal>
      </div>
    </Sheet>
  );
}
