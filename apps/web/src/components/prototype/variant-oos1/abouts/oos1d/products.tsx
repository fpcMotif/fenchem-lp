import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal, Section, ui } from "./shared";
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
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: tone.ink,
    textWrap: "pretty",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
    },
    columnGap: { default: 24, [breakpoints.xl]: 40 },
    rowGap: { default: 48, [breakpoints.xl]: 64 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  frame: {
    aspectRatio: "4 / 3",
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
    <Section id="about-products" label={PRODUCTS_INTRO.title} background={ui.onPage}>
      <div {...stylex.props(ui.phi)}>
        <div {...stylex.props(ui.asideCol)}>
          <Reveal sx={s.lead}>
            <p {...stylex.props(s.leadText)}>{PRODUCTS_INTRO.lead}</p>
            <button
              type="button"
              onClick={() => onNavigateHome("products")}
              {...stylex.props(ui.button, ui.buttonPrimary, ui.focusRing)}
            >
              {PRODUCTS_INTRO.cta.label}
            </button>
          </Reveal>
        </div>
        <ul {...stylex.props(ui.main, s.grid)}>
          {PRODUCTS.map((product, idx) => (
            <Reveal key={product.title} as="li" step={idx % 2}>
              <article>
                <div {...stylex.props(ui.frame, s.frame)}>
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(ui.fill)}
                  />
                </div>
                <h3 {...stylex.props(s.name)}>{product.title}</h3>
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
      </div>
    </Section>
  );
}
