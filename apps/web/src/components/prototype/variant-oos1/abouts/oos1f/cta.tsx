import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { CTA } from "../../content";
import { NodeMarker, Reveal, Shell } from "./layout";
import { color, ease, font, media, space } from "./palette.stylex";

const styles = stylex.create({
  section: {
    position: "relative",
    paddingTop: {
      default: space.sectionSm,
      [media.mdOnly]: space.sectionMd,
      [media.lgOnly]: space.sectionLg,
      ["@media (min-width: 1280px)"]: space.sectionXl,
    },
    paddingBottom: {
      default: 96,
      ["@media (min-width: 768px)"]: 128,
      ["@media (min-width: 1280px)"]: 160,
    },
    fontFamily: font.cjk,
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 32, ["@media (min-width: 1024px)"]: 48 },
  },
  title: {
    margin: 0,
    fontSize: {
      default: 36,
      [media.mdOnly]: 56,
      [media.lgOnly]: 56,
      ["@media (min-width: 1280px)"]: "clamp(64px, 5.6vw, 80px)",
    },
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.04em",
    color: color.ink,
    textWrap: "balance",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: 32,
    rowGap: 20,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    paddingInline: 32,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: colors.paper,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  link: {
    padding: 0,
    paddingBottom: 4,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: { default: color.hairline, ":hover": color.ink },
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: color.ink,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "200ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
});

export function Cta(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.attrs(styles.section)}>
      <Shell>
        <NodeMarker />
        <Reveal sx={styles.inner}>
          <h2 id="about-cta-title" {...stylex.attrs(styles.title)}>
            {CTA.title}
          </h2>
          <div {...stylex.attrs(styles.buttons)}>
            <button
              type="button"
              onClick={() => props.onNavigateHome("contact")}
              {...stylex.attrs(styles.button)}
            >
              {CTA.action.label}
            </button>
            <button
              type="button"
              onClick={() => props.onNavigateHome("products")}
              {...stylex.attrs(styles.link)}
            >
              产品与应用
            </button>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
