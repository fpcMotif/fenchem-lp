import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS, ABOUT_HERO } from "../../about-data";
import { Lightbox } from "./lightbox";
import { Reveal, Section, ui } from "./shared";
import { tone } from "./tokens.stylex";

const [AERIAL, LAB, SHOWROOM, RECEPTION, LOUNGE, OFFICE, GROUNDS] = ABOUT_CAMPUS.photos;
const PHOTOS = [AERIAL, GROUNDS, LAB, SHOWROOM, RECEPTION, LOUNGE, OFFICE] as const;

const s = stylex.create({
  stage: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.md]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [breakpoints.md]: 24, [breakpoints.xl]: 40 },
    rowGap: { default: 24, [breakpoints.md]: 32, [breakpoints.xl]: 48 },
  },
  tile: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  frame: {
    flexGrow: 1,
    minHeight: 0,
  },
  trigger: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "zoom-in",
    boxShadow: {
      default: null,
      ":focus-visible": `inset 0 0 0 3px ${colors.paper}, inset 0 0 0 5px ${tone.ink}`,
    },
  },
  aerialCell: {
    gridColumn: { default: "span 2", [breakpoints.md]: "1 / 9" },
  },
  groundsCell: {
    gridColumn: { default: "span 2", [breakpoints.md]: "9 / 13" },
  },
  labCell: {
    gridColumn: { default: "span 2", [breakpoints.md]: "1 / 13" },
  },
  smallCell: {
    gridColumn: { default: "span 1", [breakpoints.md]: "span 3" },
  },
  aerialRatio: {
    aspectRatio: { default: "4 / 3", [breakpoints.md]: "auto" },
  },
  groundsRatio: {
    aspectRatio: { default: "1 / 1", [breakpoints.md]: "2 / 3" },
  },
  labRatio: {
    aspectRatio: { default: "2 / 1", [breakpoints.md]: "2.426 / 1" },
  },
  smallRatio: {
    aspectRatio: "3 / 2",
  },
  groundsPhoto: {
    objectPosition: "50% 72%",
  },
});

const CELL = [
  s.aerialCell,
  s.groundsCell,
  s.labCell,
  s.smallCell,
  s.smallCell,
  s.smallCell,
  s.smallCell,
] as const;
const RATIO = [
  s.aerialRatio,
  s.groundsRatio,
  s.labRatio,
  s.smallRatio,
  s.smallRatio,
  s.smallRatio,
  s.smallRatio,
] as const;

export function Campus() {
  const chip = ABOUT_HERO.navChips[1];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = PHOTOS.length;

  return (
    <Section id={chip.id} label={ABOUT_CAMPUS.title} background={ui.onPaper}>
      <div {...stylex.props(s.stage)}>
        {PHOTOS.map((photo, idx) => (
          <Reveal
            key={photo.id}
            as="figure"
            step={idx > 2 ? idx - 3 : 0}
            sx={[ui.figure, s.tile, CELL[idx]]}
          >
            <div {...stylex.props(ui.frame, s.frame, RATIO[idx])}>
              <button
                type="button"
                aria-label={`查看大图：${photo.caption}`}
                onClick={() => {
                  setStepped(false);
                  setOpenIndex(idx);
                }}
                {...stylex.props(s.trigger)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(ui.fill, photo.id === "grounds" && s.groundsPhoto)}
                />
              </button>
            </div>
            <figcaption {...stylex.props(ui.caption)}>{photo.caption}</figcaption>
          </Reveal>
        ))}
      </div>
      <Lightbox
        photos={PHOTOS}
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
