import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal } from "./motion";
import { Section, SectionName } from "./primitives";
import { base } from "./primitives-values";
import { font, media, tone } from "./shear.stylex";

const S = stylex.create({
  intro: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "flex-start", [breakpoints.md]: "flex-end" },
    justifyContent: "space-between",
    gap: 24,
    marginBottom: { default: 40, [media.desktop]: 64 },
  },
  link: {
    flexShrink: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.sans,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.ink,
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textUnderlineOffset: 6,
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: { default: 24, [media.desktop]: 32 },
    rowGap: 56,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  product: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  photo: {
    display: "block",
    width: "100%",
    aspectRatio: "4 / 5",
    marginBottom: 6,
    objectFit: "cover",
    backgroundColor: tone.tint,
  },
  desc: {
    fontSize: 15,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2px 16px",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  tag: {
    whiteSpace: "nowrap",
  },
});

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <Section id="about-products" labelledBy="about-products-title" surface="paper">
      <SectionName id="about-products-title">{PRODUCTS_INTRO.title}</SectionName>
      <div {...stylex.props(base.shell, base.inset)}>
        <Reveal sx={S.intro}>
          <p {...stylex.props(base.prose)}>{PRODUCTS_INTRO.lead}</p>
          <button
            type="button"
            onClick={() => onNavigateHome("products")}
            {...stylex.props(S.link, base.focusRing)}
          >
            {PRODUCTS_INTRO.cta.label}
          </button>
        </Reveal>
        <ul {...stylex.props(S.grid)}>
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.title} as="li" delay={(index % 4) * 90} sx={S.product}>
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                decoding="async"
                {...stylex.props(S.photo)}
              />
              <h3 {...stylex.props(base.headline)}>{product.title}</h3>
              <p {...stylex.props(base.prose, S.desc)}>{product.description}</p>
              <ul {...stylex.props(S.tags)}>
                {product.tags.map((tag) => (
                  <li key={tag} {...stylex.props(base.quiet, S.tag)}>
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
