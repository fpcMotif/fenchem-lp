import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useInView } from "motion/react";
import { useRef, useState } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { Lightbox } from "./lightbox";
import { CropMarks, Reveal, SectionName, useDrift } from "./parts";
import { wipe } from "./parts-values";
import { base, ty } from "./shared";
import { font, hue, size } from "./theme.stylex";

const PHOTO_COUNT = ABOUT_CAMPUS.photos.length;

type Photo = (typeof ABOUT_CAMPUS.photos)[number];

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
    rowGap: { default: 28, [breakpoints.lg]: 56 },
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
  frameWrap: {
    position: "relative",
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
  zoom: {
    position: "absolute",
    inset: 0,
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: { default: null, [breakpoints.motionOk]: "scale(1.045)" },
    },
    transitionProperty: "transform",
    transitionDuration: "1400ms",
    transitionTimingFunction: size.ease,
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
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    marginTop: 14,
    color: { default: hue.body, [stylex.when.ancestor(":hover")]: hue.ink },
    transitionProperty: "color",
    transitionDuration: "400ms",
  },
  numeral: {
    fontFamily: font.display,
    fontSize: 11,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.14em",
    color: hue.quiet,
  },
});

function Tile({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: () => void }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const isLead = index === 0;
  const drift = useDrift(frameRef, isLead ? 6 : 0);
  const shown = useInView(frameRef, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Reveal as="li" step={index % 3} sx={[isLead && styles.lead, stylex.defaultMarker()]}>
      <figure {...stylex.props(styles.figure)}>
        <div {...stylex.props(styles.frameWrap)}>
          <div ref={frameRef} {...stylex.props(styles.frame, isLead && styles.frameLead)}>
            <div {...stylex.props(styles.zoom)}>
              <m.img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(
                  styles.image,
                  wipe.hidden,
                  shown && wipe.shown,
                  wipe.delay((index % 3) * 120 + 80),
                )}
                style={isLead ? drift : undefined}
              />
            </div>
            <button
              type="button"
              aria-label={`查看大图：${photo.caption}`}
              onClick={onOpen}
              {...stylex.props(styles.open)}
            />
          </div>
          <CropMarks hover />
        </div>
        <figcaption {...stylex.props(ty.quiet, styles.caption)}>
          <span aria-hidden="true" lang="en" {...stylex.props(styles.numeral)}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{photo.caption}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

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
            <Tile key={photo.id} photo={photo} index={idx} onOpen={() => setOpenIndex(idx)} />
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
