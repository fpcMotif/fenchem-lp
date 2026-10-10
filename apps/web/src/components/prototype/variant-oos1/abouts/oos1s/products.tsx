import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { step, tone } from "./tokens.stylex";

const s = stylex.create({
  intro: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.lg]: "row" },
    alignItems: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    justifyContent: "space-between",
    gap: { default: 28, [breakpoints.lg]: 64 },
    marginBottom: { default: 48, [breakpoints.xl]: 72 },
  },
  lead: {
    margin: 0,
    maxWidth: "30em",
    fontSize: { default: step.body, [breakpoints.xl]: step.lead },
    lineHeight: 1.9,
    letterSpacing: "0.06em",
    color: tone.ink,
    textWrap: "pretty",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.xl]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: { default: 20, [breakpoints.xl]: 32 },
    rowGap: { default: 48, [breakpoints.xl]: 64 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  card: {
    position: "relative",
  },
  frame: {
    aspectRatio: "300 / 327",
    marginBottom: 20,
  },
  name: {
    margin: 0,
    marginBottom: 8,
    fontSize: step.lead,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  link: {
    color: "inherit",
    textDecoration: { default: "none", ":hover": "underline" },
    textUnderlineOffset: 6,
    textDecorationThickness: 1,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: "currentColor",
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
    fontSize: step.body,
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 16,
    rowGap: 4,
    margin: 0,
    marginTop: 12,
    padding: 0,
    listStyle: "none",
    fontSize: step.label,
    letterSpacing: "0.04em",
    color: tone.body,
  },
});

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <Section id="about-products" label="Products and application solutions" background={ui.onPage}>
      <Reveal sx={s.intro}>
        <p {...stylex.props(s.lead)}>{PRODUCTS_INTRO.lead}</p>
        <button
          type="button"
          onClick={() => onNavigateHome("products")}
          {...stylex.props(ui.button, ui.buttonSecondary, ui.focusRing)}
        >
          {PRODUCTS_INTRO.cta.label}
        </button>
      </Reveal>
      <ul {...stylex.props(s.grid)}>
        {PRODUCTS.map((product, idx) => (
          <Reveal key={product.title} as="li" step={idx % 2}>
            <article {...stylex.props(s.card)}>
              <div {...stylex.props(ui.frame, s.frame)}>
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(ui.fill)}
                />
              </div>
              <h3 {...stylex.props(s.name)}>
                <a
                  href="#products"
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigateHome("products");
                  }}
                  {...stylex.props(s.link)}
                >
                  {product.title}
                </a>
              </h3>
              <p {...stylex.props(s.desc)}>{product.description}</p>
              <ul {...stylex.props(s.tags)}>
                {product.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
