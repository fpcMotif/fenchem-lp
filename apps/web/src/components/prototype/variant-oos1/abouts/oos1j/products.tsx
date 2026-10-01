import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import { useId } from "react";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal, SectionName } from "./parts";
import { base, ty } from "./shared";
import { hue } from "./theme.stylex";

const styles = stylex.create({
  products: {
    backgroundColor: hue.page,
  },
  intro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 24,
    marginBottom: { default: 40, [breakpoints.lg]: 72 },
  },
  lead: {
    margin: 0,
    maxWidth: "26em",
    fontSize: "clamp(20px, 2.1vw, 28px)",
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: "0.03em",
    color: hue.ink,
    textWrap: "balance",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: hue.ink,
    cursor: "pointer",
    textDecorationLine: "underline",
    textUnderlineOffset: 6,
    textDecorationThickness: 1,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.xl]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: { default: 40, [breakpoints.lg]: 56 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  tile: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  photo: {
    position: "relative",
    aspectRatio: "4 / 5",
    overflow: "clip",
    marginBottom: 6,
    backgroundColor: hue.tint,
  },
  cover: {
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
    outlineOffset: 6,
    outlineColor: hue.ink,
  },
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    color: hue.ink,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 14,
    rowGap: 4,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
});

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const titleId = useId();
  return (
    <section
      id="about-products"
      aria-labelledby="about-products-title"
      {...stylex.props(base.section, styles.products)}
    >
      <SectionName id="about-products-title">产品与应用</SectionName>
      <div {...stylex.props(base.shell)}>
        <Reveal sx={styles.intro}>
          <p {...stylex.props(styles.lead)}>{PRODUCTS_INTRO.lead}</p>
          <button
            type="button"
            onClick={() => onNavigateHome("products")}
            {...stylex.props(styles.link, base.focus)}
          >
            <span>{PRODUCTS_INTRO.cta.label}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </Reveal>
        <ul {...stylex.props(styles.grid)}>
          {PRODUCTS.map((product, idx) => (
            <Reveal key={product.title} as="li" step={idx} sx={styles.tile}>
              <div {...stylex.props(styles.photo)}>
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(base.fill)}
                />
              </div>
              <h3 id={`${titleId}-${idx}`} {...stylex.props(styles.title)}>
                {product.title}
              </h3>
              <p {...stylex.props(ty.quiet)}>{product.description}</p>
              <ul {...stylex.props(styles.tags)}>
                {product.tags.map((tag) => (
                  <li key={tag} {...stylex.props(ty.quiet)}>
                    {tag}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                aria-labelledby={`${titleId}-${idx}`}
                onClick={() => onNavigateHome("products")}
                {...stylex.props(styles.cover)}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
