import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useSpring } from "@/compat/motion";
import { createSignal, type Accessor } from "solid-js";

import { useLightbox } from "@/components/prototype/shared/lightbox";
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
      ["@media (min-width: 1024px)"]: "repeat(22, minmax(0, 1fr))",
    },
  },
  mosaic: {
    position: "relative",
    display: "grid",
    gridColumn: { default: "auto", ["@media (min-width: 1024px)"]: "1 / 22" },
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      ["@media (min-width: 1024px)"]: "repeat(21, minmax(0, 1fr))",
    },
    gridTemplateRows: {
      default: "none",
      ["@media (min-width: 1024px)"]: "repeat(13, minmax(0, 1fr))",
    },
    gap: { default: 8, ["@media (min-width: 1024px)"]: 0 },
    aspectRatio: { default: "auto", ["@media (min-width: 1024px)"]: "21 / 13" },
  },
  side: {
    gridColumn: 22,
    display: { default: "none", ["@media (min-width: 1024px)"]: "flex" },
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
    outlineWidth: { default: 0, ["@media (min-width: 1024px)"]: 3 },
    outlineStyle: "solid",
    outlineColor: tone.page,
    outlineOffset: -3,
  },
  u13: {
    gridColumn: { default: "span 2", ["@media (min-width: 1024px)"]: "1 / 14" },
    gridRow: { default: "auto", ["@media (min-width: 1024px)"]: "1 / 14" },
    aspectRatio: { default: "1 / 1", ["@media (min-width: 1024px)"]: "auto" },
  },
  u8: {
    gridColumn: { default: "span 2", ["@media (min-width: 1024px)"]: "14 / 22" },
    gridRow: { default: "auto", ["@media (min-width: 1024px)"]: "1 / 9" },
    aspectRatio: { default: "1.618 / 1", ["@media (min-width: 1024px)"]: "auto" },
  },
  u5: {
    gridColumn: { default: "span 1", ["@media (min-width: 1024px)"]: "17 / 22" },
    gridRow: { default: "auto", ["@media (min-width: 1024px)"]: "9 / 14" },
    aspectRatio: { default: "1 / 1", ["@media (min-width: 1024px)"]: "auto" },
  },
  u3: {
    gridColumn: { default: "span 1", ["@media (min-width: 1024px)"]: "14 / 17" },
    gridRow: { default: "auto", ["@media (min-width: 1024px)"]: "11 / 14" },
    aspectRatio: { default: "1 / 1", ["@media (min-width: 1024px)"]: "auto" },
  },
  u2: {
    gridColumn: { default: "span 2", ["@media (min-width: 1024px)"]: "14 / 16" },
    gridRow: { default: "auto", ["@media (min-width: 1024px)"]: "9 / 11" },
    aspectRatio: { default: "2 / 1", ["@media (min-width: 1024px)"]: "auto" },
  },
  u1a: {
    gridColumn: { default: "span 1", ["@media (min-width: 1024px)"]: "16 / 17" },
    gridRow: { default: "auto", ["@media (min-width: 1024px)"]: "9 / 10" },
    aspectRatio: { default: "1 / 1", ["@media (min-width: 1024px)"]: "auto" },
  },
  u1b: {
    gridColumn: { default: "span 1", ["@media (min-width: 1024px)"]: "16 / 17" },
    gridRow: { default: "auto", ["@media (min-width: 1024px)"]: "10 / 11" },
    aspectRatio: { default: "1 / 1", ["@media (min-width: 1024px)"]: "auto" },
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
    display: { default: "none", ["@media (min-width: 1024px)"]: "block" },
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
  },
});

const TILE_AREA = [s.u13, s.u8, s.u5, s.u3, s.u2, s.u1a, s.u1b] as const;
const TILE_PHOTO = [s.photoU13, s.photoU8, null, s.photoU3, null, null, s.photoU1b] as const;

function Spiral(props: { mosaic: Accessor<HTMLDivElement | undefined> }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: props.mosaic,
    offset: ["start 0.85", "end 0.45"],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });

  return (
    <svg
      viewBox="0 0 2100 1300"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...stylex.attrs(s.spiral)}
    >
      <m.path
        d={SPIRAL_PATH}
        fill="none"
        stroke="#ffffff"
        stroke-width={3}
        stroke-linecap="round"
        style={reduce() ? undefined : { pathLength: drawn }}
      />
    </svg>
  );
}

export function Campus() {
  const chip = ABOUT_HERO.navChips[1];
  const [mosaic, setMosaic] = createSignal<HTMLDivElement>();
  const photos = ABOUT_CAMPUS.photos;
  const lightbox = useLightbox(photos.length);

  return (
    <Section id={chip.id} label={ABOUT_CAMPUS.eyebrow} background={ui.onPage}>
      <div {...stylex.attrs(s.stage)}>
        <div ref={setMosaic} {...stylex.attrs(s.mosaic)}>
          {photos.map((photo, idx) => (
            <figure {...stylex.attrs(s.tile, TILE_AREA[idx])}>
              <button
                type="button"
                aria-label={`View larger: ${photo.english}`}
                onClick={() => lightbox.open(idx)}
                {...stylex.attrs(s.tileButton)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.attrs(ui.fill, TILE_PHOTO[idx])}
                />
              </button>
            </figure>
          ))}
          <Spiral mosaic={mosaic} />
        </div>
        <div aria-hidden="true" {...stylex.attrs(s.side)}>
          <span {...stylex.attrs(s.voidSlot)}>
            <span {...stylex.attrs(s.voidCell)} />
          </span>
        </div>
      </div>
      <Lightbox lightbox={lightbox} />
    </Section>
  );
}
