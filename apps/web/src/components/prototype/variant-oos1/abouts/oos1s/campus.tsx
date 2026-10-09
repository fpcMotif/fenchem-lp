import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS, ABOUT_HERO } from "../../about-data";
import { Lightbox } from "./lightbox";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { step, tone } from "./tokens.stylex";

type Photo = (typeof ABOUT_CAMPUS.photos)[number];

const READING_ORDER = [
  "aerial",
  "grounds",
  "lab",
  "showroom",
  "reception",
  "lounge",
  "office",
] as const;

const PHOTOS: readonly Photo[] = READING_ORDER.flatMap((id) =>
  ABOUT_CAMPUS.photos.filter((photo) => photo.id === id),
);

const s = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 12, [breakpoints.md]: 20, [breakpoints.xl]: 32 },
    rowGap: { default: 28, [breakpoints.xl]: 48 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    margin: 0,
  },
  aerial: {
    gridColumn: { default: "span 2", [breakpoints.lg]: "1 / 9" },
  },
  grounds: {
    gridColumn: { default: "span 2", [breakpoints.lg]: "9 / 13" },
    gridRow: { default: "auto", [breakpoints.lg]: "1" },
  },
  lab: {
    gridColumn: { default: "span 2", [breakpoints.lg]: "1 / 13" },
  },
  small: {
    gridColumn: { default: "span 1", [breakpoints.lg]: "span 3" },
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    flexGrow: 1,
    backgroundColor: tone.tint,
  },
  ratioAerial: { aspectRatio: "4 / 3" },
  ratioGrounds: {
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "auto" },
  },
  ratioLab: { aspectRatio: { default: "2.4 / 1", [breakpoints.md]: "2.43 / 1" } },
  ratioSmall: { aspectRatio: { default: "4 / 3", [breakpoints.lg]: "3 / 2" } },
  groundsImage: {
    objectPosition: "50% 40%",
  },
  hit: {
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
  caption: {
    flexShrink: 0,
    marginTop: 12,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.body,
  },
});

const LAYOUT: Record<string, { cell: stylex.StyleXStyles; ratio: stylex.StyleXStyles }> = {
  aerial: { cell: s.aerial, ratio: s.ratioAerial },
  grounds: { cell: s.grounds, ratio: s.ratioGrounds },
  lab: { cell: s.lab, ratio: s.ratioLab },
};

export function Campus() {
  const chip = ABOUT_HERO.navChips[1];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = PHOTOS.length;

  return (
    <Section id={chip.id} label={ABOUT_CAMPUS.title} background={ui.onPage}>
      <ul {...stylex.props(s.grid)}>
        {PHOTOS.map((photo, idx) => {
          const layout = LAYOUT[photo.id] ?? { cell: s.small, ratio: s.ratioSmall };
          return (
            <Reveal key={photo.id} as="li" step={idx % 3} sx={[s.item, layout.cell]}>
              <div {...stylex.props(s.frame, layout.ratio)}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(ui.fill, photo.id === "grounds" && s.groundsImage)}
                />
                <button
                  type="button"
                  aria-label={`查看大图：${photo.caption}`}
                  onClick={() => {
                    setStepped(false);
                    setOpenIndex(idx);
                  }}
                  {...stylex.props(s.hit)}
                />
              </div>
              <p {...stylex.props(s.caption)}>{photo.caption}</p>
            </Reveal>
          );
        })}
      </ul>
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
