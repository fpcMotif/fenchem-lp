import * as stylex from "@stylexjs/stylex";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { step, tone } from "./tokens.stylex";

const s = stylex.create({
  lead: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
  },
  leadText: {
    margin: 0,
    maxWidth: "28em",
    fontSize: step.body,
    lineHeight: 1.95,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  clause: {
    display: "inline-block",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 768px)"]: "repeat(2, minmax(0, 1fr))",
    },
    columnGap: { default: 24, ["@media (min-width: 1280px)"]: 40 },
    rowGap: { default: 48, ["@media (min-width: 1280px)"]: 64 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  frame: {
    aspectRatio: "4 / 3",
    marginBottom: 24,
  },
  name: {
    margin: 0,
    marginBottom: 10,
    fontSize: step.lead,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  desc: {
    margin: 0,
    fontSize: { default: "15px", ["@media (min-width: 1280px)"]: step.body },
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 6,
    margin: 0,
    marginTop: 18,
    paddingTop: 16,
    paddingInline: 0,
    paddingBottom: 0,
    listStyle: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    fontSize: step.label,
    lineHeight: 1.7,
    letterSpacing: "0.08em",
    color: tone.quiet,
  },
});

export function Products(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <Section id="about-products" label="Products and application solutions" background={ui.onPage}>
      <div {...stylex.attrs(ui.phi)}>
        <div {...stylex.attrs(ui.asideCol)}>
          <Reveal sx={s.lead}>
            <p {...stylex.attrs(s.leadText)}>
              {PRODUCTS_INTRO.lead.split(/(?<=，)/).map((clause) => (
                <span {...stylex.attrs(s.clause)}>{clause}</span>
              ))}
            </p>
            <button
              type="button"
              onClick={() => props.onNavigateHome("products")}
              {...stylex.attrs(ui.button, ui.buttonPrimary, ui.focusRing)}
            >
              {PRODUCTS_INTRO.cta.label}
            </button>
          </Reveal>
        </div>
        <ul {...stylex.attrs(ui.main, s.grid)}>
          {PRODUCTS.map((product, idx) => (
            <Reveal as="li" step={idx % 2}>
              <article>
                <div {...stylex.attrs(ui.frame, s.frame)}>
                  <img
                    src={product.image}
                    alt={product.english}
                    loading="lazy"
                    decoding="async"
                    {...stylex.attrs(ui.fill)}
                  />
                </div>
                <h3 {...stylex.attrs(s.name)}>{product.title}</h3>
                <p {...stylex.attrs(s.desc)}>{product.description}</p>
                <ul {...stylex.attrs(s.tags)}>
                  {product.tags.map((tag) => (
                    <li>{tag}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
