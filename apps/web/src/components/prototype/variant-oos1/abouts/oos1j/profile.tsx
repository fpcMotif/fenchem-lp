import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { CountUp, CropMarks, DriftImage, Reveal, useInViewOnce } from "./parts";
import { base, ty } from "./shared";
import { font, hue, size } from "./theme.stylex";

const BLEED_END = "calc(-1 * max(min(124px, 8.611vw), (100vw - 1192px) / 2))";
const NETWORK_COUNT = ABOUT_HERO.networkLabel.match(/\d+/)?.[0];

const styles = stylex.create({
  profile: {
    backgroundColor: colors.paper,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 1fr) minmax(0, 1fr)",
    },
    alignItems: "center",
    columnGap: { default: 0, [breakpoints.lg]: 96 },
    rowGap: 48,
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  english: {
    marginTop: -12,
  },
  figure: {
    margin: 0,
    marginInlineEnd: { default: 0, [breakpoints.xl]: BLEED_END },
  },
  photoWrap: {
    position: "relative",
  },
  photo: {
    aspectRatio: { default: "4 / 4.6", [breakpoints.lg]: "4 / 5" },
  },
  caption: {
    marginTop: 18,
  },
  network: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 0.34fr) minmax(0, 0.66fr)",
    },
    columnGap: 56,
    rowGap: 24,
    marginTop: { default: 56, [breakpoints.lg]: size.bandY },
    paddingTop: { default: 28, [breakpoints.lg]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: hue.hairline,
  },
  count: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  countNum: {
    fontFamily: font.display,
    fontSize: "clamp(88px, 11vw, 168px)",
    fontWeight: 500,
    lineHeight: 0.85,
    letterSpacing: "-0.05em",
    color: colors.brandBlue700,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: "clamp(20px, 2.4vw, 36px)",
    rowGap: 10,
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: "clamp(20px, 2vw, 28px)",
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: "0.04em",
    color: hue.ink,
  },
  country: {
    opacity: { default: 1, [breakpoints.motionOk]: 0 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(14px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "700ms",
    transitionTimingFunction: size.ease,
  },
  countryShown: {
    opacity: 1,
    transform: "none",
  },
  countryDelay: (index: number) => ({ transitionDelay: `${160 + index * 55}ms` }),
  more: {
    color: hue.quiet,
  },
});

export function Profile() {
  const [countriesRef, countriesShown] = useInViewOnce<HTMLUListElement>();
  const places = [...ABOUT_HERO.countries, "等地"];
  return (
    <section
      id="about-profile"
      aria-label="企业概况"
      {...stylex.props(base.section, base.anchor, styles.profile)}
    >
      <div {...stylex.props(base.shell)}>
        <div {...stylex.props(styles.grid)}>
          <Reveal sx={styles.text}>
            <h2 {...stylex.props(ty.headline)}>{ABOUT_HERO.title}</h2>
            <p lang="en" {...stylex.props(ty.serif, styles.english)}>
              {ABOUT_HERO.englishTitle}
            </p>
            <p {...stylex.props(ty.body)}>{ABOUT_HERO.lead}</p>
          </Reveal>
          <figure {...stylex.props(styles.figure)}>
            <div {...stylex.props(styles.photoWrap)}>
              <DriftImage
                src={ABOUT_HERO.lobbyImage}
                alt="泛成总部大堂，弧形吊顶与大理石地面"
                frame={styles.photo}
                wipeDelay={120}
              />
              <CropMarks delay={900} />
            </div>
            <figcaption {...stylex.props(ty.quiet, styles.caption)}>
              {ABOUT_HERO.lobbyCaption}
            </figcaption>
          </figure>
        </div>
        <Reveal sx={styles.network}>
          <div {...stylex.props(styles.count)}>
            {NETWORK_COUNT ? (
              <span aria-hidden="true">
                <CountUp value={NETWORK_COUNT} sx={styles.countNum} />
              </span>
            ) : null}
            <p {...stylex.props(ty.quiet)}>{ABOUT_HERO.networkLabel}</p>
          </div>
          <ul ref={countriesRef} {...stylex.props(styles.countries)}>
            {places.map((place, index) => (
              <li
                key={place}
                {...stylex.props(
                  styles.country,
                  countriesShown && styles.countryShown,
                  styles.countryDelay(index),
                  index === places.length - 1 && styles.more,
                )}
              >
                {place}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
