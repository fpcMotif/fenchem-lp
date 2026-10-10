import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { Lightbox } from "./lightbox";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { mq, ui } from "./theme.stylex";

const ORDER = ["aerial", "grounds", "lab", "showroom", "reception", "lounge", "office"] as const;

const PHOTOS = ORDER.flatMap((id) => ABOUT_CAMPUS.photos.filter((photo) => photo.id === id));

const styles = stylex.create({
  section: {
    backgroundColor: ui.page,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.md]: "repeat(12, minmax(0, 1fr))",
    },
    gridAutoRows: {
      default: "calc((100vw - 32px) * 0.44)",
      [mq.tablet]: "calc((100vw - 80px) * 0.1)",
      [breakpoints.xl]: "100px",
    },
    gridAutoFlow: "dense",
    gap: { default: 8, [mq.tablet]: 16, [breakpoints.xl]: 24 },
  },
  tile: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    margin: 0,
  },
  tileAerial: {
    gridColumn: { default: "span 2", [breakpoints.md]: "span 8" },
    gridRow: { default: "span 2", [breakpoints.md]: "span 5" },
  },
  tileGrounds: {
    gridColumn: { default: "span 1", [breakpoints.md]: "span 4" },
    gridRow: { default: "span 2", [breakpoints.md]: "span 5" },
  },
  tileLab: {
    gridColumn: { default: "span 2", [breakpoints.md]: "span 12" },
    gridRow: { default: "span 1", [breakpoints.md]: "span 4" },
  },
  tileSmall: {
    gridColumn: { default: "span 1", [mq.tablet]: "span 6", [breakpoints.xl]: "span 3" },
    gridRow: { default: "span 1", [mq.tablet]: "span 3", [breakpoints.xl]: "span 2" },
  },
  frame: {
    position: "relative",
    flexGrow: 1,
    minHeight: 0,
    overflow: "hidden",
    backgroundColor: ui.tint,
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
  caption: {
    paddingTop: 10,
    fontSize: 12,
    letterSpacing: "0.1em",
    color: ui.body,
  },
});

const SPAN_STYLE = {
  aerial: styles.tileAerial,
  grounds: styles.tileGrounds,
  lab: styles.tileLab,
} as const;

function spanFor(id: string) {
  return id === "aerial" || id === "grounds" || id === "lab" ? SPAN_STYLE[id] : styles.tileSmall;
}

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = PHOTOS.length;

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-title"
      {...stylex.props(shared.anchor, shared.section, styles.section)}
    >
      <h2 id="about-campus-title" {...stylex.props(shared.srOnly)}>
        {ABOUT_CAMPUS.eyebrow}
      </h2>
      <div {...stylex.props(shared.shell, shared.inset)}>
        <div {...stylex.props(styles.grid)}>
          {PHOTOS.map((photo, position) => (
            <Reveal
              key={photo.id}
              as="figure"
              step={position % 3}
              sx={[styles.tile, spanFor(photo.id)]}
            >
              <div {...stylex.props(styles.frame)}>
                <button
                  type="button"
                  aria-label={`View larger: ${photo.english}`}
                  onClick={() => {
                    setStepped(false);
                    setOpenIndex(position);
                  }}
                  {...stylex.props(styles.button)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(styles.image)}
                  />
                </button>
              </div>
              <figcaption {...stylex.props(styles.caption)}>{photo.caption}</figcaption>
            </Reveal>
          ))}
        </div>
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
    </section>
  );
}
