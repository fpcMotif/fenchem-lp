import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { type CampusPhoto, Lightbox } from "./lightbox";
import { Fold, s } from "./shared";
import { palette } from "./tokens.stylex";

const photos = ABOUT_CAMPUS.photos;
const SEQUENCE: readonly CampusPhoto[] = [
  photos[0],
  photos[1],
  photos[4],
  photos[2],
  photos[3],
  photos[5],
  photos[6],
];
const PAIRS = [
  [1, 2],
  [3, 4],
  [5, 6],
] as const;

const styles = stylex.create({
  gallery: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 36, [breakpoints.lg]: 72 },
  },
  featureWrap: {
    width: "100%",
    maxWidth: 940,
    marginInline: "auto",
  },
  pair: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    alignItems: "start",
    columnGap: { default: 12, [breakpoints.md]: 40 },
  },
  figureReset: {
    margin: 0,
  },
  tile: {
    gap: 12,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: palette.page,
  },
  ratioFeature: {
    aspectRatio: { default: "4 / 3", [breakpoints.md]: "16 / 9.4" },
  },
  ratioPair: {
    aspectRatio: { default: "4 / 5", [breakpoints.md]: "4 / 3" },
  },
  open: {
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
    outlineOffset: -6,
  },
  captionStart: { textAlign: "end" },
  captionEnd: { textAlign: "start" },
  captionMid: { textAlign: "center" },
});

function Tile({
  photo,
  index,
  side,
  step,
  ratio,
  onOpen,
}: {
  photo: CampusPhoto;
  index: number;
  side: "left" | "right" | "rise";
  step: number;
  ratio: stylex.StyleXStyles;
  onOpen: (index: number) => void;
}) {
  const captionSx =
    side === "left"
      ? styles.captionStart
      : side === "right"
        ? styles.captionEnd
        : styles.captionMid;
  return (
    <Fold as="figure" side={side} step={step} sx={styles.figureReset} innerSx={styles.tile}>
      <div {...stylex.props(styles.frame, ratio)}>
        <button
          type="button"
          aria-label={`查看大图：${photo.caption}`}
          onClick={() => onOpen(index)}
          {...stylex.props(styles.open)}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            {...stylex.props(s.fill)}
          />
        </button>
      </div>
      <figcaption {...stylex.props(s.caption, captionSx)}>{photo.caption}</figcaption>
    </Fold>
  );
}

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const count = SEQUENCE.length;
  const feature = SEQUENCE[0];

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-title"
      {...stylex.props(s.section, s.bandPaper)}
    >
      <h2 id="about-campus-title" {...stylex.props(s.srOnly)}>
        {ABOUT_CAMPUS.title}
      </h2>
      <div {...stylex.props(s.shell)}>
        <div {...stylex.props(styles.gallery)}>
          {feature ? (
            <div {...stylex.props(styles.featureWrap)}>
              <Tile
                photo={feature}
                index={0}
                side="rise"
                step={0}
                ratio={styles.ratioFeature}
                onOpen={setOpenIndex}
              />
            </div>
          ) : null}
          {PAIRS.map(([startIndex, endIndex]) => {
            const start = SEQUENCE[startIndex];
            const end = SEQUENCE[endIndex];
            if (!start || !end) return null;
            return (
              <div key={start.id} {...stylex.props(styles.pair)}>
                <Tile
                  photo={start}
                  index={startIndex}
                  side="left"
                  step={0}
                  ratio={styles.ratioPair}
                  onOpen={setOpenIndex}
                />
                <Tile
                  photo={end}
                  index={endIndex}
                  side="right"
                  step={0}
                  ratio={styles.ratioPair}
                  onOpen={setOpenIndex}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Lightbox
        photos={SEQUENCE}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) =>
          setOpenIndex((current) => (current === null ? null : (current + delta + count) % count))
        }
      />
    </section>
  );
}
