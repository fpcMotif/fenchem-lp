import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "@fenchem-lp/ui/components/lucide";

import { ABOUT_BANNER } from "../../about-data";
import { HairlineScale } from "./hairline-scale";
import { Odometer } from "./odometer";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { font, mq, ui } from "./theme.stylex";

const FOUNDING_YEAR = ABOUT_BANNER.established.replace(/\D/g, "");
const INTRO_HOLD_SECONDS = 1.25;

const styles = stylex.create({
  hero: {
    paddingTop: 24,
    paddingBottom: { default: 80, ["@media (min-width: 1280px)"]: 144 },
    backgroundColor: ui.page,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: { default: 32, ["@media (min-width: 1280px)"]: 56 },
    fontSize: 13,
    letterSpacing: "0.04em",
    color: ui.body,
  },
  breadcrumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: { default: ui.body, ":hover": ui.ink },
    cursor: "pointer",
  },
  breadcrumbCurrent: {
    color: ui.ink,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1280px)"]: "minmax(0, 1fr) auto",
    },
    columnGap: 56,
    rowGap: 40,
    alignItems: "end",
    marginBottom: { default: 56, ["@media (min-width: 1280px)"]: 96 },
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 16, ["@media (min-width: 1280px)"]: 24 },
  },
  title: {
    margin: 0,
    fontSize: {
      default: 64,
      [mq.tablet]: 96,
      ["@media (min-width: 1280px)"]: "clamp(88px, 8vw, 116px)",
    },
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "0.03em",
    color: ui.ink,
  },
  tagline: {
    margin: 0,
    fontFamily: font.serif,
    fontSize: { default: 24, [mq.tablet]: 30, ["@media (min-width: 1280px)"]: 32 },
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.2,
    color: colors.brandBlue700,
  },
  lead: {
    margin: 0,
    maxWidth: "36em",
    fontSize: { default: 16, ["@media (min-width: 1280px)"]: 17 },
    lineHeight: 1.9,
    letterSpacing: "0.05em",
    color: ui.body,
    textWrap: "pretty",
  },
  year: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: 14,
    color: ui.ink,
  },
  yearFigure: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.04em",
    fontSize: {
      default: "27vw",
      [mq.tablet]: 188,
      ["@media (min-width: 1280px)"]: "clamp(150px, 13.6vw, 200px)",
    },
    lineHeight: 1,
  },
  yearUnit: {
    fontFamily: font.unit,
    fontSize: "0.3em",
    fontStyle: "italic",
    fontWeight: 400,
    color: ui.body,
  },
  place: {
    fontSize: 12,
    letterSpacing: "0.12em",
    color: ui.body,
  },
  figure: {
    margin: 0,
  },
  image: {
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: { default: "4 / 3", ["@media (min-width: 768px)"]: "2400 / 1150" },
    objectFit: "cover",
    objectPosition: "center 58%",
  },
});

export function Hero(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.attrs(styles.hero)}>
      <div {...stylex.attrs(shared.shell, shared.inset)}>
        <nav aria-label="Breadcrumb" {...stylex.attrs(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("top")}
            {...stylex.attrs(styles.breadcrumbLink, shared.focusRing)}
          >
            首页
          </button>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page" {...stylex.attrs(styles.breadcrumbCurrent)}>
            关于我们
          </span>
        </nav>

        <div {...stylex.attrs(styles.grid)}>
          <div {...stylex.attrs(styles.text)}>
            <Reveal>
              <h1 id="about-banner-title" {...stylex.attrs(styles.title)}>
                {ABOUT_BANNER.title}
              </h1>
            </Reveal>
            <Reveal step={1}>
              <p lang="en" {...stylex.attrs(styles.tagline)}>
                {ABOUT_BANNER.tagline}
              </p>
            </Reveal>
            <Reveal step={2}>
              <p {...stylex.attrs(styles.lead)}>{ABOUT_BANNER.lead}</p>
            </Reveal>
          </div>

          <div {...stylex.attrs(styles.year)}>
            <div {...stylex.attrs(styles.yearFigure)}>
              <Odometer value={FOUNDING_YEAR} delay={INTRO_HOLD_SECONDS} />
              <span {...stylex.attrs(styles.yearUnit)}>年</span>
            </div>
            <HairlineScale />
            <span lang="en" {...stylex.attrs(styles.place)}>
              {ABOUT_BANNER.place}
            </span>
          </div>
        </div>

        <figure {...stylex.attrs(styles.figure)}>
          <img
            src={ABOUT_BANNER.image}
            alt={ABOUT_BANNER.alt}
            fetchpriority="high"
            decoding="async"
            {...stylex.attrs(styles.image)}
          />
        </figure>
      </div>
    </section>
  );
}
