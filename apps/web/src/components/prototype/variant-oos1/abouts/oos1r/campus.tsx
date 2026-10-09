import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS, ABOUT_HERO } from "../../about-data";
import { Lightbox } from "./lightbox";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { band } from "./tokens.stylex";

const s = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [band.mdToLg]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [breakpoints.md]: 24 },
    rowGap: { default: 32, [breakpoints.lg]: 56 },
    alignItems: "start",
  },
  block: {
    display: "block",
    width: "100%",
  },
  aerial: {
    gridColumn: { default: "auto", [band.mdToLg]: "1 / -1", [breakpoints.lg]: "1 / 7" },
  },
  lab: {
    gridColumn: { default: "auto", [band.mdToLg]: "1 / -1", [breakpoints.lg]: "8 / 12" },
    alignSelf: "end",
  },
  showroom: {
    gridColumn: { default: "auto", [breakpoints.lg]: "3 / 7" },
    alignSelf: { default: "start", [breakpoints.lg]: "center" },
  },
  reception: {
    gridColumn: { default: "auto", [breakpoints.lg]: "7 / 13" },
  },
  lounge: {
    gridColumn: { default: "auto", [breakpoints.lg]: "2 / 6" },
  },
  office: {
    gridColumn: { default: "auto", [breakpoints.lg]: "8 / 12" },
    marginTop: { default: 0, [breakpoints.lg]: 64 },
  },
  grounds: {
    gridColumn: { default: "auto", [band.mdToLg]: "1 / -1", [breakpoints.lg]: "4 / 10" },
  },
  tile: {
    margin: 0,
    minWidth: 0,
  },
  trigger: {
    display: "block",
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "zoom-in",
  },
  ratioWide: { aspectRatio: "3 / 2" },
  ratioPanorama: { aspectRatio: "2.4 / 1" },
  ratioAerial: { aspectRatio: { default: "4 / 3", [breakpoints.lg]: "3 / 2" } },
  ratioGrounds: {
    aspectRatio: { default: "4 / 5", [band.mdToLg]: "16 / 10", [breakpoints.lg]: "5 / 4" },
  },
  groundsImage: { objectPosition: "50% 62%" },
});

const PLACEMENT = {
  aerial: { cell: s.aerial, ratio: s.ratioAerial, image: null },
  lab: { cell: s.lab, ratio: s.ratioPanorama, image: null },
  showroom: { cell: s.showroom, ratio: s.ratioWide, image: null },
  reception: { cell: s.reception, ratio: s.ratioWide, image: null },
  lounge: { cell: s.lounge, ratio: s.ratioWide, image: null },
  office: { cell: s.office, ratio: s.ratioWide, image: null },
  grounds: { cell: s.grounds, ratio: s.ratioGrounds, image: s.groundsImage },
} as const;

export function Campus() {
  const chip = ABOUT_HERO.navChips[1];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const photos = ABOUT_CAMPUS.photos;
  const count = photos.length;

  return (
    <Section id={chip.id} label={ABOUT_CAMPUS.title}>
      <div {...stylex.props(s.grid)}>
        {photos.map((photo, idx) => {
          const place = PLACEMENT[photo.id];
          return (
            <Reveal
              key={photo.id}
              as="figure"
              delay={idx % 2 === 0 ? 0 : 100}
              sx={[s.tile, place.cell]}
            >
              <button
                type="button"
                aria-label={`查看大图：${photo.caption}`}
                onClick={() => {
                  setStepped(false);
                  setOpenIndex(idx);
                }}
                {...stylex.props(s.trigger, ui.focusRing)}
              >
                <span {...stylex.props(ui.frame, place.ratio, s.block)}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(ui.fill, place.image)}
                  />
                </span>
              </button>
              <figcaption {...stylex.props(ui.caption)}>{photo.caption}</figcaption>
            </Reveal>
          );
        })}
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
