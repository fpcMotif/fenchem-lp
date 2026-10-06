import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import { PRODUCTS, PRODUCTS_INTRO } from "../../../content";
import { Sheet } from "../sheet";
import { base, Reveal } from "../shared";
import { PRODUCTS_SHEET } from "../sheets";
import { color, font, media } from "../tokens.stylex";

const styles = stylex.create({
  intro: {
    display: "flex",
    flexDirection: { default: "column", [media.lgUp]: "row" },
    alignItems: { default: "flex-start", [media.lgUp]: "flex-end" },
    justifyContent: "space-between",
    gap: 28,
  },
  lead: {
    margin: 0,
    maxWidth: "30em",
    fontSize: { default: 16, [media.lgUp]: 17 },
    lineHeight: 1.95,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  more: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: 15,
    letterSpacing: "0.08em",
    color: color.ink,
    textDecoration: "underline",
    textDecorationColor: color.hairline,
    textUnderlineOffset: 8,
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.md]: "repeat(2, minmax(0, 1fr))",
      [media.xlUp]: "repeat(4, minmax(0, 1fr))",
    },
    gap: { default: 48, [media.lgUp]: 32 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  media: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: "4 / 5",
    borderRadius: 2,
    backgroundColor: color.tint,
  },
  title: {
    margin: 0,
    fontSize: { default: 21, [media.lgUp]: 22 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.08em",
    color: color.ink,
  },
  desc: {
    margin: 0,
    marginTop: 10,
    fontSize: 14,
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    color: color.body,
  },
  tags: {
    margin: 0,
    marginTop: 12,
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    columnGap: 16,
    rowGap: 4,
    fontSize: 13,
    lineHeight: 1.7,
    letterSpacing: "0.06em",
    color: color.muted,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 6,
  },
});

export function ProductsSheet({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <Sheet def={PRODUCTS_SHEET}>
      <Reveal sx={styles.intro}>
        <p {...stylex.props(styles.lead)}>
          <span {...stylex.props(base.balance)}>{PRODUCTS_INTRO.lead}</span>
        </p>
        <button
          type="button"
          onClick={() => onNavigateHome("products")}
          {...stylex.props(styles.more, base.focusRing)}
        >
          <span>{PRODUCTS_INTRO.cta.label}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </Reveal>
      <ul {...stylex.props(styles.grid)}>
        {PRODUCTS.map((product, idx) => (
          <Reveal key={product.title} as="li" step={idx}>
            <article {...stylex.props(styles.card)}>
              <div {...stylex.props(styles.media)}>
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(base.fill)}
                />
              </div>
              <div>
                <h3 {...stylex.props(styles.title)}>{product.title}</h3>
                <p {...stylex.props(styles.desc)}>{product.description}</p>
                <ul {...stylex.props(styles.tags)}>
                  {product.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                aria-label={`查看产品与应用：${product.title}`}
                onClick={() => onNavigateHome("products")}
                {...stylex.props(styles.overlay)}
              />
            </article>
          </Reveal>
        ))}
      </ul>
    </Sheet>
  );
}
