import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS } from "../../../about-data";
import { Lightbox } from "../lightbox";
import { Sheet } from "../sheet";
import { Reveal } from "../shared";
import { base } from "../shared-values";
import { CAMPUS_SHEET } from "../sheets";
import { color, font, media } from "../tokens.stylex";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [media.mdUp]: "repeat(4, minmax(0, 1fr))",
    },
    gridAutoRows: { default: 150, [media.md]: 200, [media.xlUp]: 220 },
    gap: { default: 8, [media.mdUp]: 16 },
  },
  tile: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    borderRadius: 2,
    backgroundColor: color.tint,
  },
  tileFeature: {
    gridColumn: "span 2",
    gridRow: "span 2",
  },
  tileWide: {
    gridColumn: "span 2",
  },
  button: {
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
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -6,
  },
  caption: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    boxSizing: "border-box",
    padding: { default: "28px 12px 10px", [media.mdUp]: "40px 16px 14px" },
    backgroundImage: "linear-gradient(to top, rgba(6, 28, 66, 0.55), rgba(6, 28, 66, 0))",
    fontFamily: font.cjk,
    fontSize: 13,
    letterSpacing: "0.08em",
    color: colors.paper,
    pointerEvents: "none",
  },
});

export function CampusSheet() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const count = ABOUT_CAMPUS.photos.length;

  return (
    <>
      <Sheet def={CAMPUS_SHEET}>
        <div {...stylex.props(styles.grid)}>
          {ABOUT_CAMPUS.photos.map((photo, idx) => (
            <Reveal
              key={photo.id}
              as="figure"
              step={idx}
              sx={[
                styles.tile,
                photo.span === "feature" && styles.tileFeature,
                photo.span === "wide" && styles.tileWide,
              ]}
            >
              <button
                type="button"
                aria-label={`View larger: ${photo.english}`}
                onClick={() => setOpenIndex(idx)}
                {...stylex.props(styles.button)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(base.fill)}
                />
              </button>
              <figcaption {...stylex.props(styles.caption)}>{photo.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </Sheet>
      <Lightbox
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) =>
          setOpenIndex((current) => (current === null ? null : (current + delta + count) % count))
        }
      />
    </>
  );
}
