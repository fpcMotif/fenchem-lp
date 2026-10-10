import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import { useId } from "react";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal, SectionName, useInViewOnce } from "./parts";
import { wipe } from "./parts-values";
import { base, ty } from "./shared";
import { hue, size } from "./theme.stylex";

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
    marginBottom: 10,
    backgroundColor: hue.tint,
  },
  zoom: {
    position: "absolute",
    inset: 0,
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: { default: null, [breakpoints.motionOk]: "scale(1.05)" },
    },
    transitionProperty: "transform",
    transitionDuration: "1400ms",
    transitionTimingFunction: size.ease,
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
    alignSelf: "flex-start",
    margin: 0,
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    color: hue.ink,
    backgroundImage: "linear-gradient(currentColor, currentColor)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 100%",
    backgroundSize: { default: "0% 1px", [stylex.when.ancestor(":hover")]: "100% 1px" },
    transitionProperty: "background-size",
    transitionDuration: "700ms",
    transitionTimingFunction: size.ease,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 18,
    rowGap: 6,
    margin: 0,
    marginTop: 4,
    paddingTop: 14,
    paddingInline: 0,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: hue.hairline,
    listStyle: "none",
  },
  tag: {
    color: hue.quiet,
  },
});

function ProductPhoto({ src, index }: { src: string; index: number }) {
  const [ref, shown] = useInViewOnce<HTMLDivElement>();
  return (
    <div ref={ref} {...stylex.props(styles.photo)}>
      <div {...stylex.props(styles.zoom)}>
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          {...stylex.props(base.fill, wipe.hidden, shown && wipe.shown, wipe.delay(index * 110))}
        />
      </div>
    </div>
  );
}

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const titleId = useId();
  return (
    <section
      id="about-products"
      aria-labelledby="about-products-title"
      {...stylex.props(base.section, styles.products)}
    >
      <SectionName id="about-products-title">Products and applications</SectionName>
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
            <Reveal
              key={product.title}
              as="li"
              step={idx}
              sx={[styles.tile, stylex.defaultMarker()]}
            >
              <ProductPhoto src={product.image} index={idx} />
              <h3 id={`${titleId}-${idx}`} {...stylex.props(styles.title)}>
                {product.title}
              </h3>
              <p {...stylex.props(ty.quiet)}>{product.description}</p>
              <ul {...stylex.props(styles.tags)}>
                {product.tags.map((tag) => (
                  <li key={tag} {...stylex.props(ty.quiet, styles.tag)}>
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
