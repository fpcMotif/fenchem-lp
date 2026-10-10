import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { MOSAIC_FOCUS, MOSAIC_LEFT, MOSAIC_RIGHT } from "./data";
import { layout } from "./layout";
import { Lightbox } from "./lightbox";
import { palette } from "./palette.stylex";
import { Reveal } from "./reveal";

const LG = breakpoints.lg;
const MD = breakpoints.md;
const DROP = 24;

const dynamic = stylex.create({
  focus: (position: string) => ({ objectPosition: position }),
});

const styles = stylex.create({
  section: {
    backgroundColor: palette.page,
  },
  canvas: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "minmax(0, 1fr) minmax(0, 1fr)" },
    gridTemplateRows: { default: "auto", [MD]: "minmax(0, 1fr)" },
    gap: { default: 6, [MD]: 4 },
    aspectRatio: {
      default: "auto",
      [MD]: "1 / 1",
      [LG]: "3 / 2",
      [breakpoints.xl]: "2 / 1",
    },
    marginBottom: { default: 0, [MD]: DROP },
  },
  groupLeft: {
    minWidth: 0,
    height: { default: "auto", [MD]: "100%" },
  },
  groupRight: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gridTemplateRows: { default: "auto", [MD]: "repeat(4, minmax(0, 1fr))" },
    gap: { default: 6, [MD]: 4 },
    minWidth: 0,
    height: { default: "auto", [MD]: "100%" },
    translate: { default: null, [MD]: `0 ${DROP}px` },
  },
  tile: {
    position: "relative",
    overflow: "hidden",
    minWidth: 0,
    margin: 0,
    backgroundColor: palette.tint,
  },
  tileA: {
    height: { default: "auto", [MD]: "100%" },
    aspectRatio: { default: "4 / 3", [MD]: "auto" },
  },
  tileB: {
    gridColumn: 1,
    gridRow: { default: "auto", [MD]: "1 / span 2" },
    aspectRatio: { default: "1 / 1", [MD]: "auto" },
  },
  tileC: {
    gridColumn: 2,
    gridRow: { default: "auto", [MD]: "1 / span 2" },
    aspectRatio: { default: "1 / 1", [MD]: "auto" },
  },
  tileWide: {
    aspectRatio: { default: "3 / 2", [MD]: "auto" },
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
  caption: {
    position: "absolute",
    left: 0,
    bottom: 0,
    margin: 0,
    paddingBlock: 5,
    paddingInline: 10,
    backgroundColor: colors.paper,
    fontFamily: palette.fontBody,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: palette.body,
    pointerEvents: "none",
  },
});

type Placement = "a" | "b" | "c" | "wide";

const placementStyle = (placement: Placement) => {
  if (placement === "a") return styles.tileA;
  if (placement === "b") return styles.tileB;
  if (placement === "c") return styles.tileC;
  return styles.tileWide;
};

const rightPlacement = (id: string): Placement => {
  if (id === "grounds") return "b";
  if (id === "reception") return "c";
  return "wide";
};

const PHOTOS = new Map<string, { photo: (typeof ABOUT_CAMPUS.photos)[number]; index: number }>(
  ABOUT_CAMPUS.photos.map((photo, index) => [photo.id, { photo, index }]),
);

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = ABOUT_CAMPUS.photos.length;

  const renderTile = (id: string, placement: Placement) => {
    const entry = PHOTOS.get(id);
    if (!entry) return null;
    const { photo, index } = entry;
    return (
      <figure key={photo.id} {...stylex.props(styles.tile, placementStyle(placement))}>
        <button
          type="button"
          aria-label={`View larger: ${photo.english}`}
          onClick={() => {
            setStepped(false);
            setOpenIndex(index);
          }}
          {...stylex.props(styles.button)}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            {...stylex.props(layout.fill, dynamic.focus(MOSAIC_FOCUS[id] ?? "50% 50%"))}
          />
        </button>
        <figcaption {...stylex.props(styles.caption)}>{photo.caption}</figcaption>
      </figure>
    );
  };

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-title"
      {...stylex.props(styles.section, layout.sectionY, layout.anchor)}
    >
      <h2 id="about-campus-title" {...stylex.props(layout.srOnly)}>
        Campus
      </h2>
      <div {...stylex.props(layout.shell, layout.padBoth)}>
        <div {...stylex.props(styles.canvas)}>
          <Reveal sx={styles.groupLeft}>{MOSAIC_LEFT.map((id) => renderTile(id, "a"))}</Reveal>
          <Reveal step={1} sx={styles.groupRight}>
            {MOSAIC_RIGHT.map((id) => renderTile(id, rightPlacement(id)))}
          </Reveal>
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
    </section>
  );
}
