import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useInView } from "@/compat/motion";

import { useLightbox } from "@/components/prototype/shared/lightbox";

import { ABOUT_CAMPUS } from "../../about-data";
import { Lightbox } from "./lightbox";
import { CropMarks, Reveal, SectionName, useDrift } from "./parts";
import { wipe } from "./parts-values";
import { base, ty } from "./shared";
import { font, hue, size } from "./theme.stylex";
import { createSignal } from "solid-js";

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

function Tile(props: { photo: Photo; index: number; onOpen: () => void }) {
  const [frameRef, setFrameRef] = createSignal<HTMLDivElement>();
  const isLead = props.index === 0;
  const drift = useDrift(frameRef, isLead ? 6 : 0);
  const shown = useInView(frameRef, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Reveal as="li" step={props.index % 3} sx={[isLead && styles.lead, stylex.defaultMarker()]}>
      <figure {...stylex.attrs(styles.figure)}>
        <div {...stylex.attrs(styles.frameWrap)}>
          <div ref={setFrameRef} {...stylex.attrs(styles.frame, isLead && styles.frameLead)}>
            <div {...stylex.attrs(styles.zoom)}>
              <m.img
                src={props.photo.src}
                alt={props.photo.alt}
                loading="lazy"
                decoding="async"
                {...stylex.attrs(
                  styles.image,
                  wipe.hidden,
                  shown() && wipe.shown,
                  wipe.delay((props.index % 3) * 120 + 80),
                )}
                style={isLead ? drift : undefined}
              />
            </div>
            <button
              type="button"
              aria-label={`View larger: ${props.photo.english}`}
              onClick={props.onOpen}
              {...stylex.attrs(styles.open)}
            />
          </div>
          <CropMarks hover />
        </div>
        <figcaption {...stylex.attrs(ty.quiet, styles.caption)}>
          <span aria-hidden="true" lang="en" {...stylex.attrs(styles.numeral)}>
            {String(props.index + 1).padStart(2, "0")}
          </span>
          <span>{props.photo.caption}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Campus() {
  const lightbox = useLightbox(PHOTO_COUNT);

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-title"
      {...stylex.attrs(base.section, base.anchor, styles.campus)}
    >
      <SectionName id="about-campus-title">{ABOUT_CAMPUS.eyebrow}</SectionName>
      <div {...stylex.attrs(base.shell)}>
        <ul {...stylex.attrs(styles.grid)}>
          {ABOUT_CAMPUS.photos.map((photo, idx) => (
            <Tile photo={photo} index={idx} onOpen={() => lightbox.open(idx)} />
          ))}
        </ul>
      </div>
      <Lightbox lightbox={lightbox} />
    </section>
  );
}
