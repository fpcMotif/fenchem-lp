import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { LEVER } from "./counterweight";
import { Lightbox, type LightboxPhoto } from "./lightbox";
import { Pair, StandingTitle } from "./pair";
import { srOnly, type, ui } from "./shared";
import { bp, face, grid, tone } from "./tokens.stylex";

type PhotoId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

const CAMPUS_FRAME: Record<PhotoId, { english: string; ratio: number }> = {
  aerial: { english: "Headquarters", ratio: 4 / 3 },
  lab: { english: "Laboratory", ratio: 16 / 9 },
  showroom: { english: "Showroom", ratio: 3 / 2 },
  reception: { english: "Reception", ratio: 1 },
  lounge: { english: "Lounge", ratio: 4 / 3 },
  office: { english: "Open office", ratio: 3 / 2 },
  grounds: { english: "Grounds", ratio: 4 / 5 },
};

const CAMPUS_PHOTOS: readonly LightboxPhoto[] = ABOUT_CAMPUS.photos.map((photo) => ({
  id: photo.id,
  large: photo.large,
  alt: photo.alt,
  caption: photo.caption,
  english: CAMPUS_FRAME[photo.id].english,
}));

const styles = stylex.create({
  caption: {
    textWrap: "balance",
  },
  english: {
    marginTop: { default: 8, [bp.wide]: 14 },
    fontSize: "clamp(24px, 2.5vw, 36px)",
    color: tone.ink,
  },
  description: {
    marginTop: { default: 12, [bp.wide]: 24 },
    maxWidth: "20em",
  },
  plate: {
    display: { default: "flex", [bp.desktop]: "grid" },
    alignItems: { default: "baseline", [bp.desktop]: "normal" },
    columnGap: 10,
    rowGap: 10,
    margin: 0,
    paddingTop: { default: 0, [bp.wide]: 10 },
  },
  plateLabel: {
    fontSize: 18,
  },
  plateCount: {
    fontFamily: face.display,
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: "rgba(11, 42, 92, 0.42)",
  },
  button: {
    position: "relative",
    display: "block",
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: tone.tint,
    cursor: "zoom-in",
    overflow: "hidden",
  },
  image: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hoverMotion]: "scale(1.03)" },
    },
    transitionProperty: "transform",
    transitionDuration: "900ms",
    transitionTimingFunction: grid.ease,
  },
});

const ratios = stylex.create({
  aerial: { aspectRatio: "4 / 3" },
  lab: { aspectRatio: "16 / 9" },
  showroom: { aspectRatio: "3 / 2" },
  reception: { aspectRatio: "1 / 1" },
  lounge: { aspectRatio: "4 / 3" },
  office: { aspectRatio: "3 / 2" },
  grounds: { aspectRatio: "4 / 5" },
});

const positions = stylex.create({
  aerial: { objectPosition: "50% 55%" },
  lab: { objectPosition: "50% 50%" },
  showroom: { objectPosition: "45% 50%" },
  reception: { objectPosition: "50% 50%" },
  lounge: { objectPosition: "55% 50%" },
  office: { objectPosition: "40% 50%" },
  grounds: { objectPosition: "60% 50%" },
});

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = CAMPUS_PHOTOS.length;

  return (
    <section id="about-campus" aria-labelledby="oos1x-campus" {...stylex.props(ui.anchor)}>
      {ABOUT_CAMPUS.photos.map((photo, index) => (
        <Pair
          key={photo.id}
          lever={LEVER}
          loadRatio={CAMPUS_FRAME[photo.id].ratio}
          offset={index % 2 === 0 ? "end" : "start"}
          standing={
            index === 0 ? (
              <StandingTitle id="oos1x-campus" en="Campus">
                {ABOUT_CAMPUS.title}
              </StandingTitle>
            ) : undefined
          }
          tag={
            <p aria-hidden="true" {...stylex.props(styles.plate)}>
              <span lang="en" {...stylex.props(type.serif, styles.plateLabel)}>
                Plate
              </span>
              <span {...stylex.props(type.counterweight, type.counterTitle)}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span {...stylex.props(styles.plateCount)}>
                / {String(CAMPUS_PHOTOS.length).padStart(2, "0")}
              </span>
            </p>
          }
          load={
            <button
              type="button"
              onClick={() => {
                setStepped(false);
                setOpenIndex(index);
              }}
              {...stylex.props(
                styles.button,
                ratios[photo.id],
                ui.focusRing,
                stylex.defaultMarker(),
              )}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, styles.image, positions[photo.id])}
              />
              <span {...srOnly}>, View larger</span>
            </button>
          }
        >
          <p {...stylex.props(type.light, type.display, styles.caption)}>{photo.caption}</p>
          <p lang="en" {...stylex.props(type.serif, styles.english)}>
            {CAMPUS_FRAME[photo.id].english}
          </p>
          <p aria-hidden="true" {...stylex.props(type.body, styles.description)}>
            {photo.description}
          </p>
        </Pair>
      ))}
      <Lightbox
        photos={CAMPUS_PHOTOS}
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
