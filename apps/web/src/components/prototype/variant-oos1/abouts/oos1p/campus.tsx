import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS, ABOUT_MOMENT } from "../../about-data";
import { srOnly, ui } from "./layout";
import { Lightbox, type LightboxPhoto } from "./lightbox";
import { PlateHead } from "./plate-head";
import { StrobeImage, TICK, useEntry } from "./strobe";
import { ForwardArrow, frameLabel } from "./time-grid";
import { bp, face, tone } from "./tokens.stylex";

type PhotoId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

const ENGLISH: Record<PhotoId, string> = {
  aerial: "Headquarters",
  lab: "Laboratory",
  showroom: "Showroom",
  reception: "Reception",
  lounge: "Lounge",
  office: "Open office",
  grounds: "Grounds",
};

const PHOTOS: readonly LightboxPhoto[] = ABOUT_CAMPUS.photos.map((photo) => ({
  id: photo.id,
  large: photo.large,
  alt: photo.alt,
  caption: photo.caption,
  english: ENGLISH[photo.id],
}));

const EXPOSURES_PER_SECOND = 12;
const FRAME_STAGGER = 2 * TICK;

function exposureTime(index: number) {
  return `${(index / EXPOSURES_PER_SECOND).toFixed(2)} s`;
}

const styles = stylex.create({
  band: {
    backgroundColor: tone.navy,
    color: tone.white,
    paddingTop: { default: 28, [bp.tablet]: 40, [bp.desktop]: 48 },
    paddingBottom: { default: 40, [bp.tablet]: 56, [bp.desktop]: 72 },
  },
  rebate: {
    alignItems: "baseline",
    marginBottom: { default: 24, [bp.desktop]: 32 },
  },
  rebateText: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    margin: 0,
    color: "rgba(255, 255, 255, 0.62)",
  },
  rebateEnd: {
    justifySelf: "end",
  },
  study: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [bp.abovePhone]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: { default: 12, [bp.tablet]: 16, [bp.desktop]: 24 },
    rowGap: { default: 32, [bp.tablet]: 40, [bp.desktop]: 56 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  cell: {
    minWidth: 0,
  },
  button: {
    display: "block",
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    textAlign: "start",
    color: "inherit",
    cursor: "zoom-in",
    outlineStyle: "none",
  },
  edge: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    color: {
      default: "rgba(255, 255, 255, 0.56)",
      [stylex.when.ancestor(":hover")]: tone.white,
      [stylex.when.ancestor(":focus-visible")]: tone.white,
    },
  },
  edgeNumber: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "inherit",
  },
  edgeTime: {
    color: "inherit",
  },
  frame: {
    aspectRatio: "4 / 5",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    outlineWidth: { default: 1, [stylex.when.ancestor(":focus-visible")]: 2 },
    outlineStyle: "solid",
    outlineColor: {
      default: "rgba(255, 255, 255, 0)",
      [stylex.when.ancestor(":hover")]: "rgba(255, 255, 255, 0.7)",
      [stylex.when.ancestor(":focus-visible")]: tone.white,
    },
    outlineOffset: { default: 4, [stylex.when.ancestor(":focus-visible")]: 5 },
    transitionProperty: "outline-color",
    transitionDuration: "160ms",
  },
  caption: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 10,
    rowGap: 2,
    marginTop: 14,
  },
  captionText: {
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 17 },
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: tone.white,
  },
  captionEnglish: {
    display: { default: "none", [bp.abovePhone]: "inline" },
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 17, [bp.desktop]: 19 },
    color: "rgba(255, 255, 255, 0.66)",
  },
  legend: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
    minWidth: 0,
    paddingTop: { default: 0, [bp.abovePhone]: 26 },
  },
  legendTitle: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 18, [bp.desktop]: 24 },
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: "0.04em",
    color: tone.white,
  },
  legendNote: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.7,
    color: "rgba(255, 255, 255, 0.72)",
  },
});

const positions = stylex.create({
  aerial: { objectPosition: "42% 50%" },
  lab: { objectPosition: "48% 50%" },
  showroom: { objectPosition: "38% 50%" },
  reception: { objectPosition: "52% 55%" },
  lounge: { objectPosition: "40% 60%" },
  office: { objectPosition: "45% 50%" },
  grounds: { objectPosition: "62% 40%" },
});

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [studyRef, phase] = useEntry<HTMLUListElement>();
  const count = PHOTOS.length;

  return (
    <section id="about-campus" aria-labelledby="oos1p-campus" {...stylex.props(ui.plate)}>
      <PlateHead plate={2} english="Campus" title={ABOUT_CAMPUS.title} titleId="oos1p-campus" />
      <div {...stylex.props(styles.band)}>
        <div {...stylex.props(ui.shell)}>
          <div aria-hidden="true" {...stylex.props(ui.grid, styles.rebate)}>
            <p {...stylex.props(ui.q1to2, ui.frameNumber, styles.rebateText)}>
              <ForwardArrow />
              Plate 02 · Chronophotographic study
            </p>
            <p {...stylex.props(ui.q3to4, ui.frameNumber, styles.rebateText, styles.rebateEnd)}>
              {frameLabel(count)} exposures · 1/12 s
            </p>
          </div>
          <ul ref={studyRef} {...stylex.props(styles.study)}>
            {ABOUT_CAMPUS.photos.map((photo, index) => (
              <li key={photo.id} {...stylex.props(styles.cell)}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  {...stylex.props(styles.button, stylex.defaultMarker())}
                >
                  <span aria-hidden="true" {...stylex.props(ui.frameNumber, styles.edge)}>
                    <span {...stylex.props(styles.edgeNumber)}>
                      <ForwardArrow />
                      {frameLabel(index + 1)}
                    </span>
                    <span {...stylex.props(styles.edgeTime)}>{exposureTime(index)}</span>
                  </span>
                  <StrobeImage
                    phase={phase}
                    delay={index * FRAME_STAGGER}
                    count={3}
                    unit="7%"
                    src={photo.src}
                    alt={photo.alt}
                    sx={styles.frame}
                    imageSx={positions[photo.id]}
                  />
                  <span {...stylex.props(styles.caption)}>
                    <span {...stylex.props(styles.captionText)}>{photo.caption}</span>
                    <span lang="en" {...stylex.props(styles.captionEnglish)}>
                      {ENGLISH[photo.id]}
                    </span>
                    <span {...srOnly}>，查看大图</span>
                  </span>
                </button>
              </li>
            ))}
            <li {...stylex.props(styles.legend)}>
              <p {...stylex.props(styles.legendTitle)}>{ABOUT_MOMENT.caption}</p>
              <p {...stylex.props(styles.legendNote)}>
                七帧，一处园区。
                <br />
                点击任一帧，查看大图。
              </p>
            </li>
          </ul>
        </div>
      </div>
      <Lightbox
        photos={PHOTOS}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) =>
          setOpenIndex((current) => (current === null ? null : (current + delta + count) % count))
        }
      />
    </section>
  );
}
