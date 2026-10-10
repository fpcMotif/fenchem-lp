import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";

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
    paddingBottom: { default: 80, [breakpoints.xl]: 144 },
    backgroundColor: ui.page,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: { default: 32, [breakpoints.xl]: 56 },
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
      [breakpoints.xl]: "minmax(0, 1fr) auto",
    },
    columnGap: 56,
    rowGap: 40,
    alignItems: "end",
    marginBottom: { default: 56, [breakpoints.xl]: 96 },
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 16, [breakpoints.xl]: 24 },
  },
  title: {
    margin: 0,
    fontSize: { default: 64, [mq.tablet]: 96, [breakpoints.xl]: "clamp(88px, 8vw, 116px)" },
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "0.03em",
    color: ui.ink,
  },
  tagline: {
    margin: 0,
    fontFamily: font.serif,
    fontSize: { default: 24, [mq.tablet]: 30, [breakpoints.xl]: 32 },
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.2,
    color: colors.brandBlue700,
  },
  lead: {
    margin: 0,
    maxWidth: "36em",
    fontSize: { default: 16, [breakpoints.xl]: 17 },
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
      [breakpoints.xl]: "clamp(150px, 13.6vw, 200px)",
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
    aspectRatio: { default: "4 / 3", [breakpoints.md]: "2400 / 1150" },
    objectFit: "cover",
    objectPosition: "center 58%",
  },
});

export function Hero({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(styles.hero)}>
      <div {...stylex.props(shared.shell, shared.inset)}>
        <nav aria-label="Breadcrumb" {...stylex.props(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(styles.breadcrumbLink, shared.focusRing)}
          >
            首页
          </button>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
            关于我们
          </span>
        </nav>

        <div {...stylex.props(styles.grid)}>
          <div {...stylex.props(styles.text)}>
            <Reveal>
              <h1 id="about-banner-title" {...stylex.props(styles.title)}>
                {ABOUT_BANNER.title}
              </h1>
            </Reveal>
            <Reveal step={1}>
              <p lang="en" {...stylex.props(styles.tagline)}>
                {ABOUT_BANNER.tagline}
              </p>
            </Reveal>
            <Reveal step={2}>
              <p {...stylex.props(styles.lead)}>{ABOUT_BANNER.lead}</p>
            </Reveal>
          </div>

          <div {...stylex.props(styles.year)}>
            <div {...stylex.props(styles.yearFigure)}>
              <Odometer value={FOUNDING_YEAR} delay={INTRO_HOLD_SECONDS} />
              <span {...stylex.props(styles.yearUnit)}>年</span>
            </div>
            <HairlineScale />
            <span lang="en" {...stylex.props(styles.place)}>
              {ABOUT_BANNER.place}
            </span>
          </div>
        </div>

        <figure {...stylex.props(styles.figure)}>
          <img
            src={ABOUT_BANNER.image}
            alt={ABOUT_BANNER.alt}
            fetchPriority="high"
            decoding="async"
            {...stylex.props(styles.image)}
          />
        </figure>
      </div>
    </section>
  );
}
