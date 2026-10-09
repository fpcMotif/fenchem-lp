import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { step, tone, vessel } from "./tokens.stylex";

const s = stylex.create({
  lead: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 7" },
    marginBottom: { default: 48, [breakpoints.md]: 64, [breakpoints.xl]: 80 },
  },
  leadText: {
    margin: 0,
    maxWidth: "30em",
    fontSize: step.lead,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: tone.ink,
    textWrap: "balance",
  },
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.sm]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.xl]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: { default: 24, [breakpoints.xl]: 32 },
    rowGap: { default: 48, [breakpoints.xl]: 64 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  card: {
    position: "relative",
  },
  frame: {
    aspectRatio: "4 / 5",
    marginBottom: 20,
    borderBottomLeftRadius: vessel.softBowl,
    borderBottomRightRadius: vessel.softBowl,
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
  go: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    color: "inherit",
    textAlign: "start",
    cursor: "pointer",
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
    color: tone.quiet,
  },
});

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <Section id="about-products" label={PRODUCTS_INTRO.title} background={ui.onPaper}>
      <div {...stylex.props(ui.grid)}>
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
      <ul {...stylex.props(s.list)}>
        {PRODUCTS.map((product, idx) => (
          <Reveal key={product.title} as="li" step={idx} sx={s.card}>
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
              <h3 {...stylex.props(s.name)}>
                <button
                  type="button"
                  onClick={() => onNavigateHome("products")}
                  {...stylex.props(s.go, ui.focusRing)}
                >
                  {product.title}
                </button>
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
