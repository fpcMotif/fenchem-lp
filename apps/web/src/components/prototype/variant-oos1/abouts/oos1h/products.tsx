import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { font, mq, ui } from "./theme.stylex";

const styles = stylex.create({
  section: {
    backgroundColor: ui.page,
  },
  lead: {
    margin: 0,
    marginBottom: { default: 56, [breakpoints.xl]: 96 },
    maxWidth: "30em",
    fontSize: { default: 20, [breakpoints.xl]: 28 },
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: "0.04em",
    color: ui.ink,
    textWrap: "pretty",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [mq.smToXl]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.xl]: "repeat(4, minmax(0, 1fr))",
    },
    gap: { default: 56, [breakpoints.xl]: 32 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: {
    display: "flex",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  image: {
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: "545 / 614",
    objectFit: "cover",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: 10,
    paddingTop: 24,
  },
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: ui.ink,
  },
  desc: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    color: ui.ink,
  },
  tags: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    color: ui.body,
  },
  more: {
    alignSelf: "flex-start",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: "auto",
    paddingTop: 12,
    paddingInline: 0,
    paddingBottom: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: 14,
    letterSpacing: "0.06em",
    color: ui.ink,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
});

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section
      id="about-products"
      aria-labelledby="about-products-title"
      {...stylex.props(shared.anchor, shared.section, styles.section)}
    >
      <h2 id="about-products-title" {...stylex.props(shared.srOnly)}>
        产品与应用
      </h2>
      <div {...stylex.props(shared.shell, shared.inset)}>
        <Reveal>
          <p {...stylex.props(styles.lead)}>{PRODUCTS_INTRO.lead}</p>
        </Reveal>
        <ul {...stylex.props(styles.grid)}>
          {PRODUCTS.map((product, position) => (
            <Reveal key={product.title} as="li" step={position} sx={styles.item}>
              <article {...stylex.props(styles.card)}>
                <img
                  src={product.image}
                  alt={`${product.title}产品图`}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.image)}
                />
                <div {...stylex.props(styles.body)}>
                  <h3 {...stylex.props(styles.title)}>{product.title}</h3>
                  <p {...stylex.props(styles.desc)}>{product.description}</p>
                  <p {...stylex.props(styles.tags)}>{product.tags.join(" · ")}</p>
                  <button
                    type="button"
                    aria-label={`了解方案：${product.title}`}
                    onClick={() => onNavigateHome("products")}
                    {...stylex.props(styles.more)}
                  >
                    <span aria-hidden="true">了解方案</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
