import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Fold, s } from "./shared";
import { layout, palette } from "./tokens.stylex";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [breakpoints.md]: 28, [breakpoints.lg]: 24 },
    rowGap: { default: 40, [breakpoints.md]: 56 },
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: 12,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    marginBottom: 6,
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "4 / 5" },
    backgroundColor: palette.tint,
  },
  tag: {
    display: "inline-block",
    marginInlineEnd: 14,
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: palette.ink,
  },
  desc: {
    margin: 0,
    flexGrow: 1,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    color: palette.body,
  },
  more: {
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-start",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: { default: palette.ink, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: layout.ease,
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    marginTop: { default: 48, [breakpoints.lg]: 72 },
  },
});

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section
      id="about-products"
      aria-labelledby="about-products-title"
      {...stylex.props(s.section, s.bandPage)}
    >
      <h2 id="about-products-title" {...stylex.props(s.srOnly)}>
        {PRODUCTS_INTRO.title}
      </h2>
      <div {...stylex.props(s.shell)}>
        <div {...stylex.props(styles.grid)}>
          {PRODUCTS.map((product, idx) => (
            <Fold key={product.title} step={idx % 4}>
              <article {...stylex.props(styles.card)}>
                <figure {...stylex.props(styles.frame)}>
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(s.fill)}
                  />
                </figure>
                <h3 {...stylex.props(styles.title)}>{product.title}</h3>
                <p {...stylex.props(styles.desc)}>{product.description}</p>
                <p {...stylex.props(s.caption)}>
                  {product.tags.map((tag) => (
                    <span key={tag} {...stylex.props(styles.tag)}>
                      {tag}
                    </span>
                  ))}
                </p>
                <button
                  type="button"
                  aria-label={`了解${product.title}`}
                  onClick={() => onNavigateHome("products")}
                  {...stylex.props(styles.more, s.focusRing)}
                >
                  <ArrowUpRight size={20} aria-hidden="true" />
                </button>
              </article>
            </Fold>
          ))}
        </div>
        <div {...stylex.props(styles.footer)}>
          <button
            type="button"
            onClick={() => onNavigateHome("products")}
            {...stylex.props(s.textLink, s.focusRing)}
          >
            <span>{PRODUCTS_INTRO.cta.label}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
