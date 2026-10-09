import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import { CTA } from "../../content";
import { media, palette } from "./lattice.stylex";
import { Action, Frame, Reveal } from "./parts";
import { shared } from "./parts-values";

const styles = stylex.create({
  section: {
    backgroundColor: palette.page,
  },
  inner: {
    paddingTop: { default: 72, [media.tablet]: 112, [breakpoints.xl]: 144 },
    paddingBottom: { default: 80, [media.tablet]: 128, [breakpoints.xl]: 160 },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 32, [breakpoints.xl]: 40 },
    marginInlineStart: { default: 0, [breakpoints.lg]: "25%" },
  },
  title: {
    fontSize: { default: 36, [media.tablet]: 56, [breakpoints.xl]: 72 },
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
  },
});

export function Closing({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.props(styles.section)}>
      <Frame innerSx={styles.inner}>
        <Reveal sx={styles.content}>
          <h2 id="about-cta-title" {...stylex.props(shared.headline, styles.title)}>
            {CTA.title}
          </h2>
          <div {...stylex.props(styles.buttons)}>
            <Action
              onClick={() => onNavigateHome("contact")}
              icon={<ArrowRight size={16} aria-hidden="true" />}
            >
              {CTA.action.label}
            </Action>
            <Action kind="outline" onClick={() => onNavigateHome("products")}>
              产品与应用
            </Action>
          </div>
        </Reveal>
      </Frame>
    </section>
  );
}
