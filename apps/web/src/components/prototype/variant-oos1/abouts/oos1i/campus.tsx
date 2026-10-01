import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { Lightbox } from "./lightbox";
import { Reveal } from "./motion";
import { Section, SectionName, base } from "./primitives";
import { ease, media, shear, tone } from "./shear.stylex";

const S = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.md]: "repeat(4, minmax(0, 1fr))",
    },
    gridAutoRows: { default: 176, [media.tablet]: 230, [media.desktop]: 300 },
    gap: { default: 12, [breakpoints.md]: 20, [media.desktop]: 24 },
  },
  tile: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    height: "100%",
    margin: 0,
  },
  feature: {
    gridColumn: "span 2",
    gridRow: "span 2",
    containerType: "inline-size",
  },
  wide: {
    gridColumn: "span 2",
  },
  holder: {
    position: "relative",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minHeight: 0,
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  holderCut: {
    clipPath: shear.cutTop,
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
    transform: {
      default: null,
      ":hover": { default: null, [media.hoverMotion]: "scale(1.03)" },
    },
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 3,
    outlineColor: colors.paper,
    outlineOffset: -6,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = ABOUT_CAMPUS.photos.length;

  return (
    <Section id="about-campus" labelledBy="about-campus-title" surface="page" band="below">
      <SectionName id="about-campus-title">{ABOUT_CAMPUS.title}</SectionName>
      <div {...stylex.props(base.shell, base.inset)}>
        <div {...stylex.props(S.grid)}>
          {ABOUT_CAMPUS.photos.map((photo, index) => (
            <Reveal
              key={photo.id}
              as="figure"
              delay={(index % 4) * 80}
              sx={[S.tile, photo.span === "feature" && S.feature, photo.span === "wide" && S.wide]}
            >
              <div {...stylex.props(S.holder, photo.span === "feature" && S.holderCut)}>
                <button
                  type="button"
                  aria-label={`查看大图：${photo.caption}`}
                  onClick={() => {
                    setStepped(false);
                    setOpenIndex(index);
                  }}
                  {...stylex.props(S.button)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(S.image)}
                  />
                </button>
              </div>
              <figcaption {...stylex.props(base.quiet)}>{photo.caption}</figcaption>
            </Reveal>
          ))}
        </div>
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
