import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { layout } from "./layout";
import { palette } from "./palette.stylex";
import { Reveal } from "./reveal";

const LG = breakpoints.lg;
const SM = breakpoints.sm;

const styles = stylex.create({
  section: {
    backgroundColor: colors.paper,
  },
  grid: {
    alignItems: "start",
  },
  intro: {
    gap: { default: 24, [LG]: 32 },
  },
  lead: {
    margin: 0,
    maxWidth: "26em",
    fontSize: { default: 16, [LG]: 17 },
    lineHeight: 2,
    letterSpacing: "0.05em",
    color: palette.ink,
    textWrap: "pretty",
  },
  list: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [SM]: "repeat(2, minmax(0, 1fr))" },
    alignItems: "start",
    gap: { default: 40, [LG]: 56 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  itemOffset: {
    marginTop: { default: 0, [SM]: 48 },
  },
  media: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: { default: "5 / 4", [SM]: "10 / 11" },
    marginBottom: 4,
    backgroundColor: palette.page,
  },
  title: {
    margin: 0,
    fontFamily: palette.fontBody,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.08em",
  },
  stretched: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    lineHeight: "inherit",
    textAlign: "start",
    color: palette.ink,
    cursor: "pointer",
    textDecorationLine: { default: "none", ":hover": "underline" },
    textUnderlineOffset: 6,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
  desc: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    color: palette.body,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px 16px",
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: 13,
    letterSpacing: "0.05em",
    color: palette.body,
  },
  more: {
    alignSelf: { default: "flex-start", [LG]: "flex-end" },
  },
});

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section
      id="about-products"
      aria-labelledby="about-products-title"
      {...stylex.props(styles.section, layout.sectionY, layout.anchor)}
    >
      <h2 id="about-products-title" {...stylex.props(layout.srOnly)}>
        产品与应用
      </h2>
      <div {...stylex.props(layout.shell, layout.split, styles.grid)}>
        <Reveal sx={[layout.padLeft, layout.seam, styles.intro]}>
          <p {...stylex.props(styles.lead)}>{PRODUCTS_INTRO.lead}</p>
          <button
            type="button"
            onClick={() => onNavigateHome("products")}
            {...stylex.props(layout.button, layout.buttonOutline, layout.focusRing, styles.more)}
          >
            {PRODUCTS_INTRO.cta.label}
          </button>
        </Reveal>
        <div {...stylex.props(layout.padRight)}>
          <ul {...stylex.props(styles.list)}>
            {PRODUCTS.map((product, index) => (
              <Reveal
                key={product.title}
                as="li"
                step={index % 2}
                sx={[styles.item, index % 2 === 1 && styles.itemOffset]}
              >
                <div {...stylex.props(styles.media)}>
                  <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(layout.fill)}
                  />
                </div>
                <h3 {...stylex.props(styles.title)}>
                  <button
                    type="button"
                    onClick={() => onNavigateHome("products")}
                    {...stylex.props(styles.stretched)}
                  >
                    {product.title}
                  </button>
                </h3>
                <p {...stylex.props(styles.desc)}>{product.description}</p>
                <ul {...stylex.props(styles.tags)}>
                  {product.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
