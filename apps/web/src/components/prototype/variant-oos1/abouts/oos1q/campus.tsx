import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS, ABOUT_HERO } from "../../about-data";
import { Lightbox } from "./lightbox";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { motionCss, tone } from "./tokens.stylex";

const s = stylex.create({
  afterBand: {
    paddingTop: { default: 80, [breakpoints.md]: 128, [breakpoints.xl]: 160 },
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 24, [breakpoints.xl]: 32 },
    rowGap: { default: 80, [breakpoints.md]: 96, [breakpoints.lg]: 136 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: {
    margin: 0,
    minWidth: 0,
  },
  tile: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "zoom-in",
    opacity: { default: 1, ":hover": 0.9 },
    outlineStyle: "none",
    boxShadow: {
      default: "none",
      ":focus-visible": `inset 0 0 0 3px ${tone.paper}, inset 0 0 0 5px ${colors.brandBlue700}`,
    },
    transitionProperty: "opacity",
    transitionDuration: "240ms",
    transitionTimingFunction: motionCss.out,
  },
  aerial: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 8" },
    width: "100%",
  },
  lab: {
    gridColumn: { default: "auto", [breakpoints.lg]: "9 / 13" },
    alignSelf: "end",
    justifySelf: "end",
    width: { default: "78%", [breakpoints.lg]: "100%" },
  },
  showroom: {
    gridColumn: { default: "auto", [breakpoints.lg]: "3 / 7" },
    justifySelf: "start",
    width: { default: "62%", [breakpoints.lg]: "100%" },
  },
  reception: {
    gridColumn: { default: "auto", [breakpoints.lg]: "8 / 13" },
    marginTop: { default: 0, [breakpoints.lg]: 96 },
    justifySelf: "end",
    width: { default: "84%", [breakpoints.lg]: "100%" },
  },
  lounge: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 7" },
    justifySelf: "start",
    width: { default: "72%", [breakpoints.lg]: "100%" },
  },
  office: {
    gridColumn: { default: "auto", [breakpoints.lg]: "9 / 13" },
    marginTop: { default: 0, [breakpoints.lg]: 128 },
    justifySelf: "end",
    width: { default: "56%", [breakpoints.lg]: "100%" },
  },
  grounds: {
    gridColumn: { default: "auto", [breakpoints.lg]: "5 / 9" },
    justifySelf: "start",
    width: { default: "64%", [breakpoints.lg]: "100%" },
  },
  wide43: { aspectRatio: "4 / 3" },
  wide21: { aspectRatio: "2 / 1" },
  wide32: { aspectRatio: "3 / 2" },
  tall23: { aspectRatio: "2 / 3" },
});

const PLACEMENT = [
  s.aerial,
  s.lab,
  s.showroom,
  s.reception,
  s.lounge,
  s.office,
  s.grounds,
] as const;
const RATIO = [s.wide43, s.wide21, s.wide32, s.wide32, s.wide32, s.wide32, s.tall23] as const;

export function Campus() {
  const chip = ABOUT_HERO.navChips[1];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const photos = ABOUT_CAMPUS.photos;
  const count = photos.length;

  return (
    <Section id={chip.id} label={chip.label} sx={s.afterBand}>
      <ul {...stylex.props(s.field)}>
        {photos.map((photo, idx) => (
          <Reveal key={photo.id} as="li" sx={[s.item, PLACEMENT[idx]]}>
            <div {...stylex.props(ui.frame, RATIO[idx])}>
              <button
                type="button"
                aria-label={`查看大图：${photo.caption}`}
                onClick={() => {
                  setStepped(false);
                  setOpenIndex(idx);
                }}
                {...stylex.props(s.tile)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(ui.fill)}
                />
              </button>
            </div>
            <p {...stylex.props(ui.caption)}>{photo.caption}</p>
          </Reveal>
        ))}
      </ul>
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
