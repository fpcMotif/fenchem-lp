import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { NodeMarker, Reveal, Section, Shell } from "./layout";
import { color, ease, font, media } from "./palette.stylex";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.midToXl]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.xl]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [media.midToXl]: 32, [breakpoints.xl]: 32 },
    rowGap: { default: 48, [breakpoints.md]: 56 },
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontFamily: font.cjk,
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  image: {
    display: "block",
    width: "100%",
    aspectRatio: "545 / 614",
    objectFit: "cover",
    borderRadius: 2,
    marginBottom: 8,
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    color: color.ink,
  },
  link: {
    color: { default: color.ink, ":hover": colors.brandBlue700 },
    textDecoration: "none",
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
  description: {
    margin: 0,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    color: color.body,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 14,
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.9,
    letterSpacing: "0.04em",
    color: color.body,
  },
  actions: {
    marginTop: { default: 48, [breakpoints.lg]: 64 },
  },
  more: {
    padding: 0,
    paddingBottom: 4,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: { default: color.hairline, ":hover": color.ink },
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.06em",
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

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <Section id="about-products" name={PRODUCTS_INTRO.title}>
      <Shell>
        <NodeMarker />
        <Reveal>
          <ul {...stylex.props(styles.grid)}>
            {PRODUCTS.map((product) => (
              <li key={product.title} {...stylex.props(styles.card)}>
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.image)}
                />
                <h3 {...stylex.props(styles.title)}>
                  <a
                    href="#products"
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigateHome("products");
                    }}
                    {...stylex.props(styles.link)}
                  >
                    {product.title}
                  </a>
                </h3>
                <p {...stylex.props(styles.description)}>{product.description}</p>
                <ul aria-label="应用方向" {...stylex.props(styles.tags)}>
                  {product.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div {...stylex.props(styles.actions)}>
            <button
              type="button"
              onClick={() => onNavigateHome("products")}
              {...stylex.props(styles.more)}
            >
              {PRODUCTS_INTRO.cta.label}
            </button>
          </div>
        </Reveal>
      </Shell>
    </Section>
  );
}
