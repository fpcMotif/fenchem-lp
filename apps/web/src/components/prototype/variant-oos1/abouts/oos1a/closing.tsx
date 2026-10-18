import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "@fenchem-lp/ui/components/lucide";

import { CTA } from "../../content";
import { media, palette } from "./lattice.stylex";
import { Action, Frame, Reveal } from "./parts";
import { shared } from "./parts-values";

const styles = stylex.create({
  section: {
    backgroundColor: palette.page,
  },
  inner: {
    paddingTop: { default: 72, [media.tablet]: 112, ["@media (min-width: 1280px)"]: 144 },
    paddingBottom: { default: 80, [media.tablet]: 128, ["@media (min-width: 1280px)"]: 160 },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 32, ["@media (min-width: 1280px)"]: 40 },
    marginInlineStart: { default: 0, ["@media (min-width: 1024px)"]: "25%" },
  },
  title: {
    fontSize: { default: 36, [media.tablet]: 56, ["@media (min-width: 1280px)"]: 72 },
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
  },
});

export function Closing(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.attrs(styles.section)}>
      <Frame innerSx={styles.inner}>
        <Reveal sx={styles.content}>
          <h2 id="about-cta-title" {...stylex.attrs(shared.headline, styles.title)}>
            {CTA.title}
          </h2>
          <div {...stylex.attrs(styles.buttons)}>
            <Action
              onClick={() => props.onNavigateHome("contact")}
              icon={<ArrowRight size={16} aria-hidden="true" />}
            >
              {CTA.action.label}
            </Action>
            <Action kind="outline" onClick={() => props.onNavigateHome("products")}>
              产品与应用
            </Action>
          </div>
        </Reveal>
      </Frame>
    </section>
  );
}
