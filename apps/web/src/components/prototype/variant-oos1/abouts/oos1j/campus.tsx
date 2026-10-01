import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { Lightbox } from "./lightbox";
import { Reveal, SectionName } from "./parts";
import { base, ty } from "./shared";
import { hue } from "./theme.stylex";

const PHOTO_COUNT = ABOUT_CAMPUS.photos.length;

const styles = stylex.create({
  campus: {
    backgroundColor: colors.paper,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 12, [breakpoints.lg]: 24 },
    rowGap: { default: 28, [breakpoints.lg]: 48 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  lead: {
    gridColumn: "1 / -1",
  },
  figure: {
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "clip",
    aspectRatio: { default: "1 / 1", [breakpoints.lg]: "4 / 3" },
    backgroundColor: hue.tint,
  },
  frameLead: {
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "21 / 9" },
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
    outlineOffset: -7,
  },
  caption: {
    marginTop: 12,
  },
});

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-title"
      {...stylex.props(base.section, base.anchor, styles.campus)}
    >
      <SectionName id="about-campus-title">园区环境</SectionName>
      <div {...stylex.props(base.shell)}>
        <ul {...stylex.props(styles.grid)}>
          {ABOUT_CAMPUS.photos.map((photo, idx) => (
            <Reveal key={photo.id} as="li" step={idx % 3} sx={idx === 0 ? styles.lead : undefined}>
              <figure {...stylex.props(styles.figure)}>
                <div {...stylex.props(styles.frame, idx === 0 && styles.frameLead)}>
                  <button
                    type="button"
                    aria-label={`查看大图：${photo.caption}`}
                    onClick={() => setOpenIndex(idx)}
                    {...stylex.props(styles.open)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      {...stylex.props(base.fill)}
                    />
                  </button>
                </div>
                <figcaption {...stylex.props(ty.quiet, styles.caption)}>{photo.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
      <Lightbox
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) =>
          setOpenIndex((current) =>
            current === null ? null : (current + delta + PHOTO_COUNT) % PHOTO_COUNT,
          )
        }
      />
    </section>
  );
}
