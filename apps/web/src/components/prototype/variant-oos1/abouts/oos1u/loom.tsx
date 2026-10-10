import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER, ABOUT_CAMPUS } from "../../about-data";
import { Lightbox } from "./lightbox";
import { Reveal } from "./shared";
import { ui } from "./shared-values";
import { curve, media, tone, type } from "./tokens.stylex";

const WARP = 16;
const WEFT = 9;
const LOOSE_ROW = 7;
const LOOSE_PX = 12;
const PIN_TOP = 144;

const [, LAB, , , , , GROUNDS] = ABOUT_CAMPUS.photos;

const warpLift = (index: number) =>
  (index % 2 === 0 ? -1 : 1) * (0.35 + (0.65 * ((index * 5) % 7)) / 6);
const weftPull = (index: number) =>
  (index % 2 === 0 ? 1 : -1) * (0.4 + (0.6 * ((index * 4) % 5)) / 4);

const WARP_MAX = 18;
const WEFT_MAX = 26;

const warpTransform = (index: number, rest: number) =>
  `translateY(${(warpLift(index) * WARP_MAX * rest).toFixed(3)}%)`;
const weftTransform = (index: number, rest: number) =>
  `translateX(calc(${(weftPull(index) * WEFT_MAX * rest).toFixed(3)}% + ${index === LOOSE_ROW ? LOOSE_PX : 0}px))`;

const FLOAT_TILE = 400 / WARP;
const twillShift = (row: number) => `${(((row % 4) * 100) / 12).toFixed(4)}%`;

const CELL_SHADE = "rgba(48, 54, 97, 0.2)";
const EDGE_SHADE = "rgba(48, 54, 97, 0.1)";
const CELL_CLEAR = "rgba(48, 54, 97, 0)";

const styles = stylex.create({
  section: {
    backgroundColor: tone.page,
    overflowX: "clip",
  },
  track: {
    position: "relative",
  },
  pinned: {
    position: "sticky",
    top: PIN_TOP,
    zIndex: 0,
  },
  runway: {
    height: { default: "60vh", [media.wide]: "72vh" },
  },
  stage: {
    position: "relative",
    height: { default: 360, [media.tablet]: 480, [media.wide]: "min(560px, calc(100svh - 280px))" },
    backgroundColor: tone.paper,
    clipPath: "inset(0px -100vw)",
  },
  warp: {
    position: "absolute",
    top: 0,
    height: "100%",
  },
  thread: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    willChange: "transform",
  },
  warpAt: (index: number) => ({
    left: `${(index * 100) / WARP}%`,
    width: `${100 / WARP}%`,
  }),
  warpImage: (index: number) => ({
    position: "absolute",
    top: 0,
    left: `${-index * 100}%`,
    width: `${WARP * 100}%`,
    height: "100%",
    maxWidth: "none",
    objectFit: "cover",
    objectPosition: "50% 55%",
  }),
  warpGap: {
    clipPath: "inset(0px 1px)",
  },
  warpShade: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(to bottom, ${EDGE_SHADE}, ${CELL_CLEAR} 12%, ${CELL_CLEAR} 88%, ${EDGE_SHADE}), linear-gradient(to right, ${EDGE_SHADE}, ${CELL_CLEAR} 14%, ${CELL_CLEAR} 86%, ${EDGE_SHADE})`,
    backgroundSize: `100% ${100 / WEFT}%, 100% 100%`,
    pointerEvents: "none",
  },
  weft: {
    position: "absolute",
    left: 0,
    width: "100%",
  },
  weftClip: {
    clipPath: "inset(1px 0px)",
  },
  twill: {
    position: "absolute",
    inset: 0,
    maskImage: "linear-gradient(to right, #000 50%, transparent 50%)",
    maskSize: `${FLOAT_TILE}% 100%`,
    maskRepeat: "repeat-x",
  },
  twillAt: (shift: string) => ({
    maskPosition: `${shift} 0%`,
  }),
  weftAt: (index: number) => ({
    top: `${(index * 100) / WEFT}%`,
    height: `${100 / WEFT}%`,
  }),
  weftImage: (index: number) => ({
    position: "absolute",
    left: 0,
    top: `${-index * 100}%`,
    width: "100%",
    height: `${WEFT * 100}%`,
    maxWidth: "none",
    objectFit: "cover",
    objectPosition: "50% 66%",
  }),
  weftShade: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(to right, ${CELL_SHADE} 0%, ${CELL_CLEAR} 7%, ${CELL_CLEAR} 43%, ${CELL_SHADE} 50%, ${CELL_CLEAR} 50%), linear-gradient(to bottom, ${EDGE_SHADE}, ${CELL_CLEAR} 18%, ${CELL_CLEAR} 82%, ${EDGE_SHADE})`,
    backgroundSize: `${FLOAT_TILE}% 100%, 100% 100%`,
    backgroundRepeat: "repeat-x, no-repeat",
    pointerEvents: "none",
  },
  weftShadeAt: (shift: string) => ({
    backgroundPosition: `${shift} 0%, 0% 0%`,
  }),
  under: {
    display: "flex",
    flexDirection: { default: "column", [media.aboveTablet]: "row" },
    alignItems: { default: "flex-start", [media.aboveTablet]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 6, [media.aboveTablet]: 24 },
    paddingTop: { default: 18, [media.wide]: 22 },
  },
  tagline: {
    margin: 0,
    fontFamily: type.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 22, [media.wide]: 28 },
    lineHeight: 1.2,
    color: tone.ink,
  },
  fringe: {
    display: "flex",
    gap: { default: 8, [media.wide]: 10 },
    marginTop: { default: 56, [media.wide]: 96 },
    marginInline: { default: -16, [media.tablet]: -40, [media.wide]: 0 },
    paddingInline: { default: 16, [media.tablet]: 40, [media.wide]: 0 },
    paddingTop: 0,
    paddingBottom: 4,
    listStyleType: "none",
    overflowX: { default: "auto", [media.wide]: "visible" },
    scrollSnapType: { default: "x mandatory", [media.wide]: "none" },
    scrollPaddingInline: { default: 16, [media.tablet]: 40 },
    scrollbarWidth: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  fringeItem: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flexGrow: { default: 0, [media.wide]: 1 },
    flexShrink: 0,
    flexBasis: { default: 132, [media.tablet]: 168, [media.wide]: 0 },
    minWidth: 0,
    scrollSnapAlign: "start",
  },
  fringeButton: {
    position: "relative",
    display: "block",
    overflow: "hidden",
    width: "100%",
    height: { default: 232, [media.tablet]: 300, [media.wide]: 340 },
    padding: 0,
    borderWidth: 0,
    backgroundColor: "#dfe3ec",
    cursor: "zoom-in",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.indigo,
    outlineOffset: 3,
  },
  fringeImage: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: {
      default: null,
      ":hover": { default: null, [media.hoverMotion]: "scale(1.04)" },
    },
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: curve.out,
  },
});

type StripProps = { index: number; weave: MotionValue<number>; still: boolean };

function WarpStrip({ index, weave, still }: StripProps) {
  const transform = useTransform(weave, (value) => warpTransform(index, (1 - value) ** 3));
  return (
    <div {...stylex.props(styles.warp, styles.warpAt(index))}>
      <m.div
        {...stylex.props(styles.thread, styles.warpGap)}
        style={{ transform: still ? warpTransform(index, 0) : transform }}
      >
        <img
          src={LAB.large}
          alt=""
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.warpImage(index))}
        />
        <span {...stylex.props(styles.warpShade)} />
      </m.div>
    </div>
  );
}

function WeftRow({ index, weave, still }: StripProps) {
  const transform = useTransform(weave, (value) => weftTransform(index, (1 - value) ** 3));
  return (
    <div {...stylex.props(styles.weft, styles.weftAt(index))}>
      <m.div
        {...stylex.props(styles.thread, styles.weftClip)}
        style={{ transform: still ? weftTransform(index, 0) : transform }}
      >
        <div {...stylex.props(styles.twill, styles.twillAt(twillShift(index)))}>
          <img
            src={GROUNDS.large}
            alt=""
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.weftImage(index))}
          />
          <span {...stylex.props(styles.weftShade, styles.weftShadeAt(twillShift(index)))} />
        </div>
      </m.div>
    </div>
  );
}

function LoomStage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: [`start ${PIN_TOP}px`, "end end"],
  });
  const weave = useTransform(scrollYProgress, [0, 0.78], [0.28, 1]);

  return (
    <div ref={trackRef} {...stylex.props(styles.track)}>
      <div {...stylex.props(styles.pinned)}>
        <div
          role="img"
          aria-label={`${LAB.alt}, interwoven with ${GROUNDS.alt} into one image`}
          {...stylex.props(styles.stage)}
        >
          {Array.from({ length: WARP }, (_, index) => (
            <WarpStrip key={`warp-${index}`} index={index} weave={weave} still={reduce} />
          ))}
          {Array.from({ length: WEFT }, (_, index) => (
            <WeftRow key={`weft-${index}`} index={index} weave={weave} still={reduce} />
          ))}
        </div>
        <div {...stylex.props(styles.under)}>
          <p lang="en" {...stylex.props(styles.tagline)}>
            {ABOUT_BANNER.tagline}
          </p>
          <p {...stylex.props(ui.caption)}>
            {LAB.caption} × {GROUNDS.caption}
          </p>
        </div>
      </div>
      <div aria-hidden="true" {...stylex.props(styles.runway)} />
    </div>
  );
}

export function CampusLoom() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = ABOUT_CAMPUS.photos.length;

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-title"
      {...stylex.props(ui.section, ui.anchor, styles.section)}
    >
      <h2 id="about-campus-title" {...stylex.props(ui.srOnly)}>
        {ABOUT_CAMPUS.eyebrow}
      </h2>
      <div {...stylex.props(ui.shell)}>
        <LoomStage />
        <ul {...stylex.props(styles.fringe)}>
          {ABOUT_CAMPUS.photos.map((photo, index) => (
            <Reveal key={photo.id} as="li" delay={Math.min(index, 4) * 60} sx={styles.fringeItem}>
              <button
                type="button"
                aria-label={`View larger: ${photo.english}`}
                onClick={() => {
                  setStepped(false);
                  setOpenIndex(index);
                }}
                {...stylex.props(styles.fringeButton)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.fringeImage)}
                />
              </button>
              <span {...stylex.props(ui.caption)}>{photo.caption}</span>
            </Reveal>
          ))}
        </ul>
      </div>
      <Lightbox
        index={openIndex}
        stepped={stepped}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) => {
          setStepped(true);
          setOpenIndex((current) => (current === null ? null : (current + delta + count) % count));
        }}
      />
    </section>
  );
}
