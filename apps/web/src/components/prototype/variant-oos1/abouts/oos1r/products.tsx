import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowUpRight } from "lucide-react";

import { PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { band, font, motionCss, step, tone } from "./tokens.stylex";

const s = stylex.create({
  intro: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.lg]: "row" },
    alignItems: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    justifyContent: "space-between",
    gap: 24,
    marginBottom: { default: 40, [breakpoints.xl]: 72 },
  },
  lead: {
    maxWidth: "30em",
    margin: 0,
    fontSize: { default: step.body, [breakpoints.md]: step.lead },
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.05em",
    color: tone.ink,
    textWrap: "pretty",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [band.smToLg]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [breakpoints.md]: 24 },
    rowGap: { default: 40, [breakpoints.xl]: 72 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  placeHuman: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 6" },
  },
  placeFood: {
    gridColumn: { default: "auto", [breakpoints.lg]: "8 / 11" },
    alignSelf: "end",
  },
  placeCare: {
    gridColumn: { default: "auto", [breakpoints.lg]: "3 / 6" },
    alignSelf: "start",
  },
  placePet: {
    gridColumn: { default: "auto", [breakpoints.lg]: "8 / 13" },
  },
  card: {
    position: "relative",
    margin: 0,
  },
  frameLarge: {
    aspectRatio: { default: "4 / 3", [band.smToLg]: "4 / 5", [breakpoints.lg]: "1 / 1" },
    marginBottom: 20,
  },
  frameSmall: {
    aspectRatio: { default: "4 / 3", [breakpoints.sm]: "4 / 5" },
    marginBottom: 20,
  },
  image: {
    objectPosition: "50% 30%",
  },
  name: {
    margin: 0,
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: { default: step.lead, [breakpoints.xl]: step.title },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    textAlign: "left",
    color: { default: tone.ink, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: motionCss.out,
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
  arrow: {
    flexShrink: 0,
    opacity: 0.5,
  },
  desc: {
    margin: 0,
    marginTop: 8,
    fontSize: step.small,
    fontWeight: 400,
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 2,
    margin: 0,
    marginTop: 12,
    padding: 0,
    listStyle: "none",
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.06em",
    lineHeight: 1.8,
    color: tone.body,
  },
});

const PLACEMENT = [
  { cell: s.placeHuman, frame: s.frameLarge },
  { cell: s.placeFood, frame: s.frameSmall },
  { cell: s.placeCare, frame: s.frameSmall },
  { cell: s.placePet, frame: s.frameLarge },
] as const;

export function Products({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <Section id="about-products" label="Products and application solutions">
      <Reveal sx={s.intro}>
        <p {...stylex.props(s.lead)}>{PRODUCTS_INTRO.lead}</p>
        <button
          type="button"
          onClick={() => onNavigateHome("products")}
          {...stylex.props(ui.quietButton, ui.focusRing)}
        >
          {PRODUCTS_INTRO.cta.label}
        </button>
      </Reveal>
      <ul {...stylex.props(s.grid)}>
        {PRODUCTS.map((product, idx) => (
          <Reveal key={product.title} as="li" delay={(idx % 2) * 100} sx={PLACEMENT[idx].cell}>
            <article {...stylex.props(s.card)}>
              <div {...stylex.props(ui.frame, PLACEMENT[idx].frame)}>
                <img
                  src={product.image}
                  alt={product.english}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(ui.fill, s.image)}
                />
              </div>
              <h3 {...stylex.props(s.name)}>
                <button
                  type="button"
                  onClick={() => onNavigateHome("products")}
                  {...stylex.props(s.link, ui.focusRing)}
                >
                  {product.title}
                  <ArrowUpRight size={16} aria-hidden="true" {...stylex.props(s.arrow)} />
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
