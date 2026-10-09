import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { ROOMS_IN_WALKING_ORDER } from "./journey";
import { MiniPlate } from "./mini-plate";
import { Bevel, Mat, Tag } from "./shared";
import { srOnly, ui } from "./shared-values";
import { bp, face, motion, tone } from "./tokens.stylex";

const LOBBY = ROOMS_IN_WALKING_ORDER[0].plate;
const RECEPTION = ROOMS_IN_WALKING_ORDER[1].plate;

const introAt = (order: number) => `calc(var(--oo-intro, 0ms) + ${order * 160}ms)`;

const lineIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const doorIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "scale(0.86)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  hero: {
    paddingTop: { default: 28, [bp.tablet]: 36, [bp.desktop]: 36 },
  },
  introAnim: {
    animationName: { default: lineIn, [bp.motionReduce]: "none" },
    animationDuration: "900ms",
    animationTimingFunction: motion.ease,
    animationFillMode: "both",
  },
  introDelay: (animationDelay: string) => ({ animationDelay }),
  titleRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: 32,
    rowGap: { default: 8, [bp.upTablet]: 12 },
    marginBottom: { default: 24, [bp.tablet]: 28, [bp.desktop]: 32 },
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 56, [bp.tablet]: 80, [bp.laptop]: 96, [bp.wide]: 116 },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  tagline: {
    margin: 0,
    fontSize: { default: 24, [bp.tablet]: 30, [bp.laptop]: 34, [bp.wide]: 42 },
    lineHeight: 1.1,
    color: tone.navy,
  },
  photo: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: { default: "4 / 5", [bp.tablet]: "4 / 3", [bp.desktop]: "2400 / 1150" },
    backgroundColor: tone.whisper,
  },
  banner: {
    objectPosition: "51% 50%",
  },
  door: {
    position: "absolute",
    display: "block",
    top: { default: "43.6%", [bp.upTablet]: "42.2%" },
    left: { default: "34.6%", [bp.tablet]: "39.9%", [bp.desktop]: "43.5%" },
    width: { default: "36%", [bp.tablet]: "23.5%", [bp.desktop]: "15%" },
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: { default: tone.ruleStrong, ":hover": tone.navy },
    outlineOffset: { default: 3, [bp.desktop]: 4 },
    boxShadow: { default: "none", ":focus-visible": "0 0 0 6px #ffffff, 0 0 0 8px #0743a9" },
    cursor: "zoom-in",
    transformOrigin: "50% 100%",
    animationName: { default: doorIn, [bp.motionReduce]: "none" },
    animationDuration: "1100ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 620ms)",
    animationTimingFunction: motion.ease,
    animationFillMode: "both",
  },
  doorPhoto: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hoverMotion]: "scale(1.05)" },
    },
    transitionProperty: "transform",
    transitionDuration: "800ms",
    transitionTimingFunction: motion.ease,
  },
  speck: {
    position: "absolute",
    display: "block",
    left: "39.45%",
    top: "55.2%",
    width: "21.9%",
  },
  doorTag: {
    position: "absolute",
    top: { default: -14, [bp.desktop]: -15 },
    left: -4,
  },
  foot: {
    display: "flex",
    flexDirection: { default: "column", [bp.desktop]: "row" },
    alignItems: { default: "flex-start", [bp.desktop]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 10, [bp.desktop]: 32 },
  },
  lead: {
    margin: 0,
    maxWidth: "34em",
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.tablet]: 18, [bp.desktop]: 19 },
    lineHeight: 1.7,
    color: tone.ink,
    textWrap: "pretty",
  },
  meta: {
    margin: 0,
    flexShrink: 0,
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: tone.navy,
  },
});

export function Hero() {
  return (
    <section aria-labelledby="oos1b-title" {...stylex.props(ui.shell, styles.hero)}>
      <div {...stylex.props(styles.titleRow, styles.introAnim, styles.introDelay(introAt(0)))}>
        <h1 id="oos1b-title" {...stylex.props(styles.title)}>
          {ABOUT_BANNER.title}
        </h1>
        <p lang="en" {...stylex.props(ui.serif, styles.tagline)}>
          {ABOUT_BANNER.tagline}
        </p>
      </div>

      <div {...stylex.props(styles.introAnim, styles.introDelay(introAt(1)))}>
        <Mat
          raised
          foot={
            <div {...stylex.props(styles.foot)}>
              <p {...stylex.props(styles.lead)}>{ABOUT_BANNER.lead}</p>
              <p lang="en" {...stylex.props(styles.meta)}>
                {ABOUT_BANNER.established} · {ABOUT_BANNER.place}
              </p>
            </div>
          }
        >
          <Bevel>
            <div {...stylex.props(styles.photo)}>
              <img
                src={ABOUT_BANNER.image}
                alt={ABOUT_BANNER.alt}
                fetchPriority="high"
                decoding="async"
                {...stylex.props(ui.fill, styles.banner)}
              />
              <a href="#about-campus" {...stylex.props(styles.door, stylex.defaultMarker())}>
                <span {...srOnly}>进入园区：{LOBBY.caption}</span>
                <MiniPlate plate={LOBBY} photoStyle={styles.doorPhoto}>
                  <span {...stylex.props(styles.speck)}>
                    <MiniPlate plate={RECEPTION} />
                  </span>
                </MiniPlate>
                <span {...stylex.props(styles.doorTag)}>
                  <Tag numeral={LOBBY.numeral} pinned={false} />
                </span>
              </a>
            </div>
          </Bevel>
        </Mat>
      </div>
    </section>
  );
}
