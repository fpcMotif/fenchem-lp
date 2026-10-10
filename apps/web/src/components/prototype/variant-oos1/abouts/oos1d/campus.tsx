import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useSpring } from "motion/react";
import { type RefObject, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CAMPUS, ABOUT_HERO } from "../../about-data";
import { Lightbox } from "./lightbox";
import { Section } from "./shared";
import { ui } from "./shared-values";
import { tone } from "./tokens.stylex";

const SPIRAL_PATH =
  "M 0 1300 A 1300 1300 0 0 1 1300 0 A 800 800 0 0 1 2100 800 A 500 500 0 0 1 1600 1300 A 300 300 0 0 1 1300 1000 A 200 200 0 0 1 1500 800 A 100 100 0 0 1 1600 900 A 100 100 0 0 1 1500 1000";

const s = stylex.create({
  stage: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(22, minmax(0, 1fr))",
    },
  },
  mosaic: {
    position: "relative",
    display: "grid",
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 22" },
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(21, minmax(0, 1fr))",
    },
    gridTemplateRows: {
      default: "none",
      [breakpoints.lg]: "repeat(13, minmax(0, 1fr))",
    },
    gap: { default: 8, [breakpoints.lg]: 0 },
    aspectRatio: { default: "auto", [breakpoints.lg]: "21 / 13" },
  },
  side: {
    gridColumn: 22,
    display: { default: "none", [breakpoints.lg]: "flex" },
    flexDirection: "column",
    justifyContent: "flex-end",
    minWidth: 0,
  },
  voidSlot: {
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
  },
  voidCell: {
    position: "absolute",
    top: 3,
    left: 3,
    width: "calc(100% - 6px)",
    height: "calc(100% - 6px)",
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: tone.hairlineStrong,
  },
  tile: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    backgroundColor: tone.tint,
    outlineWidth: { default: 0, [breakpoints.lg]: 3 },
    outlineStyle: "solid",
    outlineColor: tone.page,
    outlineOffset: -3,
  },
  u13: {
    gridColumn: { default: "span 2", [breakpoints.lg]: "1 / 14" },
    gridRow: { default: "auto", [breakpoints.lg]: "1 / 14" },
    aspectRatio: { default: "1 / 1", [breakpoints.lg]: "auto" },
  },
  u8: {
    gridColumn: { default: "span 2", [breakpoints.lg]: "14 / 22" },
    gridRow: { default: "auto", [breakpoints.lg]: "1 / 9" },
    aspectRatio: { default: "1.618 / 1", [breakpoints.lg]: "auto" },
  },
  u5: {
    gridColumn: { default: "span 1", [breakpoints.lg]: "17 / 22" },
    gridRow: { default: "auto", [breakpoints.lg]: "9 / 14" },
    aspectRatio: { default: "1 / 1", [breakpoints.lg]: "auto" },
  },
  u3: {
    gridColumn: { default: "span 1", [breakpoints.lg]: "14 / 17" },
    gridRow: { default: "auto", [breakpoints.lg]: "11 / 14" },
    aspectRatio: { default: "1 / 1", [breakpoints.lg]: "auto" },
  },
  u2: {
    gridColumn: { default: "span 2", [breakpoints.lg]: "14 / 16" },
    gridRow: { default: "auto", [breakpoints.lg]: "9 / 11" },
    aspectRatio: { default: "2 / 1", [breakpoints.lg]: "auto" },
  },
  u1a: {
    gridColumn: { default: "span 1", [breakpoints.lg]: "16 / 17" },
    gridRow: { default: "auto", [breakpoints.lg]: "9 / 10" },
    aspectRatio: { default: "1 / 1", [breakpoints.lg]: "auto" },
  },
  u1b: {
    gridColumn: { default: "span 1", [breakpoints.lg]: "16 / 17" },
    gridRow: { default: "auto", [breakpoints.lg]: "10 / 11" },
    aspectRatio: { default: "1 / 1", [breakpoints.lg]: "auto" },
  },
  tileButton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "zoom-in",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 3,
    outlineColor: colors.paper,
    outlineOffset: -8,
  },
  photoU13: { objectPosition: "50% 50%" },
  photoU8: { objectPosition: "52% 50%" },
  photoU3: { objectPosition: "50% 60%" },
  photoU1b: { objectPosition: "72% 50%" },
  spiral: {
    position: "absolute",
    top: 0,
    left: 0,
    display: { default: "none", [breakpoints.lg]: "block" },
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
  },
});

const TILE_AREA = [s.u13, s.u8, s.u5, s.u3, s.u2, s.u1a, s.u1b] as const;
const TILE_PHOTO = [s.photoU13, s.photoU8, null, s.photoU3, null, null, s.photoU1b] as const;

function Spiral({ mosaicRef }: { mosaicRef: RefObject<HTMLDivElement | null> }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: mosaicRef,
    offset: ["start 0.85", "end 0.45"],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });

  return (
    <svg
      viewBox="0 0 2100 1300"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...stylex.props(s.spiral)}
    >
      <m.path
        d={SPIRAL_PATH}
        fill="none"
        stroke="#ffffff"
        strokeWidth={3}
        strokeLinecap="round"
        style={reduce ? undefined : { pathLength: drawn }}
      />
    </svg>
  );
}

export function Campus() {
  const chip = ABOUT_HERO.navChips[1];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const photos = ABOUT_CAMPUS.photos;
  const count = photos.length;

  return (
    <Section id={chip.id} label={ABOUT_CAMPUS.eyebrow} background={ui.onPage}>
      <div {...stylex.props(s.stage)}>
        <div ref={mosaicRef} {...stylex.props(s.mosaic)}>
          {photos.map((photo, idx) => (
            <figure key={photo.id} {...stylex.props(s.tile, TILE_AREA[idx])}>
              <button
                type="button"
                aria-label={`View larger: ${photo.english}`}
                onClick={() => {
                  setStepped(false);
                  setOpenIndex(idx);
                }}
                {...stylex.props(s.tileButton)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(ui.fill, TILE_PHOTO[idx])}
                />
              </button>
            </figure>
          ))}
          <Spiral mosaicRef={mosaicRef} />
        </div>
        <div aria-hidden="true" {...stylex.props(s.side)}>
          <span {...stylex.props(s.voidSlot)}>
            <span {...stylex.props(s.voidCell)} />
          </span>
        </div>
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
    </Section>
  );
}
