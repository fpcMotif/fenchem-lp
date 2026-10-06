import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal, Section, ui } from "./shared";
import { step, tone } from "./tokens.stylex";

const s = stylex.create({
  intro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 28,
    maxWidth: "26em",
  },
  lead: {
    margin: 0,
    fontSize: { default: step.body, [breakpoints.xl]: step.lead },
    lineHeight: 2,
    letterSpacing: "0.05em",
    color: tone.body,
    textWrap: "pretty",
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 24, [breakpoints.xl]: 32 },
    rowGap: { default: 72, [breakpoints.lg]: 120 },
    margin: 0,
    marginTop: { default: 56, [breakpoints.md]: 72, [breakpoints.xl]: 96 },
    padding: 0,
    listStyle: "none",
  },
  item: {
    position: "relative",
    minWidth: 0,
  },
  first: {
    gridColumn: { default: "auto", [breakpoints.lg]: "2 / 7" },
    justifySelf: "start",
    width: { default: "82%", [breakpoints.lg]: "100%" },
  },
  second: {
    gridColumn: { default: "auto", [breakpoints.lg]: "8 / 12" },
    marginTop: { default: 0, [breakpoints.lg]: 128 },
    justifySelf: "end",
    width: { default: "74%", [breakpoints.lg]: "100%" },
  },
  third: {
    gridColumn: { default: "auto", [breakpoints.lg]: "2 / 6" },
    justifySelf: "start",
    width: { default: "78%", [breakpoints.lg]: "100%" },
  },
  fourth: {
    gridColumn: { default: "auto", [breakpoints.lg]: "7 / 12" },
    marginTop: { default: 0, [breakpoints.lg]: 128 },
    justifySelf: "end",
    width: { default: "68%", [breakpoints.lg]: "100%" },
  },
  frame: {
    aspectRatio: "8 / 9",
    marginBottom: 20,
  },
  name: {
    margin: 0,
    fontSize: { default: step.lead, [breakpoints.xl]: step.line },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.1em",
  },
  cover: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    lineHeight: "inherit",
    textAlign: "start",
    color: tone.ink,
    textDecorationLine: { default: "none", ":hover": "underline" },
    textDecorationColor: tone.hairlineStrong,
    textUnderlineOffset: 6,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
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
    marginTop: 8,
    fontSize: step.small,
    lineHeight: 1.9,
    letterSpacing: "0.05em",
    color: tone.body,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 16,
    rowGap: 2,
    margin: 0,
    marginTop: 12,
    padding: 0,
    listStyle: "none",
    fontSize: step.label,
    letterSpacing: "0.06em",
    lineHeight: 1.8,
    color: tone.quiet,
  },
});

const PLACEMENT = [s.first, s.second, s.third, s.fourth] as const;

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <Section id="about-products" label={PRODUCTS_INTRO.title}>
      <Reveal sx={s.intro}>
        <p {...stylex.props(s.lead)}>{PRODUCTS_INTRO.lead}</p>
        <button
          type="button"
          onClick={() => onNavigateHome("products")}
          {...stylex.props(ui.textButton, ui.focusRing)}
        >
          {PRODUCTS_INTRO.cta.label}
        </button>
      </Reveal>
      <ul {...stylex.props(s.field)}>
        {PRODUCTS.map((product, idx) => (
          <Reveal key={product.title} as="li" sx={[s.item, PLACEMENT[idx]]}>
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
                {...stylex.props(s.cover)}
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
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
