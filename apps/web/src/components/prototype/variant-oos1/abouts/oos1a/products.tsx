import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "@fenchem-lp/ui/components/lucide";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { fonts, media, palette } from "./lattice.stylex";
import { Action, Frame, Reveal, SectionName } from "./parts";
import { shared } from "./parts-values";

const styles = stylex.create({
  section: {
    backgroundColor: colors.paper,
  },
  intro: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1024px)"]: "repeat(16, minmax(0, 1fr))",
    },
    rowGap: 28,
    alignItems: "end",
  },
  lead: {
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "1 / span 7" },
  },
  action: {
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "12 / span 5" },
    display: "flex",
    justifyContent: { default: "flex-start", ["@media (min-width: 1024px)"]: "flex-end" },
  },
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.smBelowLg]: "repeat(2, minmax(0, 1fr))",
      ["@media (min-width: 1024px)"]: "repeat(16, minmax(0, 1fr))",
    },
    rowGap: 56,
    columnGap: { default: 0, [media.smBelowLg]: 24 },
    margin: 0,
    marginTop: { default: 56, ["@media (min-width: 1024px)"]: 96 },
    padding: 0,
    listStyle: "none",
  },
  item: {
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "span 4" },
    boxSizing: "border-box",
    paddingInline: { default: 0, ["@media (min-width: 1024px)"]: 8 },
  },
  article: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  photo: {
    position: "relative",
    overflow: "hidden",
    marginBottom: 12,
    aspectRatio: "545 / 614",
    backgroundColor: palette.tint,
  },
  title: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: { default: 22, ["@media (min-width: 1280px)"]: 24 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: palette.ink,
  },
  desc: {
    fontSize: 15,
    lineHeight: 1.7,
  },
  cardButton: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    letterSpacing: "inherit",
    textAlign: "start",
    color: "inherit",
    cursor: "pointer",
    textDecorationLine: "underline",
    textDecorationThickness: "1px",
    textUnderlineOffset: "6px",
    textDecorationColor: { default: "transparent", ":hover": palette.ink },
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
});

export function Products(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section
      id="about-products"
      aria-labelledby="about-products-title"
      {...stylex.attrs(styles.section)}
    >
      <SectionName id="about-products-title">Products and application solutions</SectionName>
      <Frame innerSx={shared.sectionPad}>
        <div {...stylex.attrs(styles.intro)}>
          <Reveal sx={styles.lead}>
            <p {...stylex.attrs(shared.body)}>{PRODUCTS_INTRO.lead}</p>
          </Reveal>
          <Reveal step={1} sx={styles.action}>
            <Action
              onClick={() => props.onNavigateHome("products")}
              icon={<ArrowRight size={16} aria-hidden="true" />}
            >
              {PRODUCTS_INTRO.cta.label}
            </Action>
          </Reveal>
        </div>
        <ul {...stylex.attrs(styles.list)}>
          {PRODUCTS.map((product, index) => (
            <Reveal as="li" step={index} sx={styles.item}>
              <article {...stylex.attrs(styles.article)}>
                <div {...stylex.attrs(styles.photo)}>
                  <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    {...stylex.attrs(shared.cover)}
                  />
                </div>
                <h3 {...stylex.attrs(styles.title)}>
                  <button
                    type="button"
                    onClick={() => props.onNavigateHome("products")}
                    {...stylex.attrs(styles.cardButton, shared.focusRing)}
                  >
                    {product.title}
                  </button>
                </h3>
                <p {...stylex.attrs(shared.small, styles.desc)}>{product.description}</p>
                <p {...stylex.attrs(shared.small)}>{product.tags.join(" / ")}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Frame>
    </section>
  );
}
