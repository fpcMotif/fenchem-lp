import { LightboxDialog, type LightboxState, useLightbox } from "../../../shared/lightbox";
import { LightboxStage } from "../../../shared/lightbox-stage";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "@fenchem-lp/ui/components/lucide";

import { ABOUT_CAMPUS } from "../../about-data";
import { NodeMarker, Reveal, Section, Shell } from "./layout";
import { color, ease, font, media } from "./palette.stylex";

type PhotoId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const zoomIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 768px)"]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: {
      default: 0,
      ["@media (min-width: 768px)"]: 24,
      ["@media (min-width: 1280px)"]: 32,
    },
    rowGap: { default: 40, ["@media (min-width: 768px)"]: 56 },
    alignItems: "start",
  },
  aerial: {
    gridColumn: { default: "auto", ["@media (min-width: 768px)"]: "1 / span 8" },
  },
  grounds: {
    gridColumn: { default: "auto", ["@media (min-width: 768px)"]: "9 / span 4" },
    marginTop: {
      default: 0,
      [media.mdOnly]: 48,
      [media.lgOnly]: 72,
      ["@media (min-width: 1280px)"]: 96,
    },
  },
  wide: {
    gridColumn: { default: "auto", ["@media (min-width: 768px)"]: "1 / -1" },
  },
  half: {
    gridColumn: { default: "auto", ["@media (min-width: 768px)"]: "span 6" },
  },
  figure: {
    margin: 0,
  },
  button: {
    display: "block",
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "zoom-in",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  image: {
    display: "block",
    width: "100%",
    objectFit: "cover",
    borderRadius: 2,
    backgroundColor: color.hairline,
  },
  ratioAerial: { aspectRatio: "3 / 2" },
  ratioGrounds: { aspectRatio: { default: "4 / 5", ["@media (min-width: 768px)"]: "2 / 3" } },
  ratioWide: { aspectRatio: { default: "3 / 2", ["@media (min-width: 768px)"]: "2.4 / 1" } },
  ratioHalf: { aspectRatio: "3 / 2" },
  caption: {
    marginTop: 12,
    fontFamily: font.cjk,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: color.body,
  },
  lightbox: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100dvh",
    maxWidth: "none",
    maxHeight: "none",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "rgba(10, 14, 22, 0.94)",
    color: colors.paper,
    animationName: fadeIn,
    animationDuration: "240ms",
    animationTimingFunction: ease.out,
    "::backdrop": { backgroundColor: "transparent" },
  },
  stage: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: { default: "64px 12px", ["@media (min-width: 768px)"]: "72px 104px" },
  },
  lightFigure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: ease.out,
  },
  lightFigureOpen: {
    animationName: { default: fadeIn, ["@media (prefers-reduced-motion: no-preference)"]: zoomIn },
    animationDuration: "260ms",
  },
  lightFigureStep: {
    animationName: fadeIn,
    animationDuration: "180ms",
  },
  lightImage: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: "calc(100dvh - 200px)",
    width: "auto",
    height: "auto",
    borderRadius: 2,
  },
  lightCaption: {
    fontFamily: font.cjk,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: "rgba(255, 255, 255, 0.86)",
  },
  lightButton: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    padding: 0,
    borderWidth: 0,
    borderRadius: "50%",
    backgroundColor: {
      default: "rgba(255, 255, 255, 0.1)",
      ":hover": "rgba(255, 255, 255, 0.2)",
    },
    color: colors.paper,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
  },
  lightPrev: {
    top: "50%",
    insetInlineStart: { default: 12, ["@media (min-width: 768px)"]: 32 },
    marginTop: -24,
  },
  lightNext: {
    top: "50%",
    insetInlineEnd: { default: 12, ["@media (min-width: 768px)"]: 32 },
    marginTop: -24,
  },
  lightClose: {
    top: { default: 12, ["@media (min-width: 768px)"]: 24 },
    insetInlineEnd: { default: 12, ["@media (min-width: 768px)"]: 32 },
  },
});

const PLACEMENT = {
  aerial: [styles.aerial, styles.ratioAerial],
  grounds: [styles.grounds, styles.ratioGrounds],
  lab: [styles.wide, styles.ratioWide],
  showroom: [styles.half, styles.ratioHalf],
  reception: [styles.half, styles.ratioHalf],
  lounge: [styles.half, styles.ratioHalf],
  office: [styles.half, styles.ratioHalf],
} as const satisfies Record<PhotoId, readonly [stylex.StyleXStyles, stylex.StyleXStyles]>;

const PHOTO_ORDER: readonly PhotoId[] = [
  "aerial",
  "grounds",
  "lab",
  "showroom",
  "reception",
  "lounge",
  "office",
];

const gallery = PHOTO_ORDER.flatMap((id) => ABOUT_CAMPUS.photos.filter((photo) => photo.id === id));

function Lightbox(props: { lightbox: LightboxState }) {
  const { close: onClose, step: onStep } = props.lightbox;
  return (
    <LightboxDialog lightbox={props.lightbox} items={gallery} sx={styles.lightbox}>
      {(photo) => (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure
              {...stylex.attrs(
                styles.lightFigure,
                props.lightbox.stepped ? styles.lightFigureStep : styles.lightFigureOpen,
              )}
            >
              <img src={photo.large} alt={photo.alt} {...stylex.attrs(styles.lightImage)} />
              <figcaption {...stylex.attrs(styles.lightCaption)}>{photo.caption}</figcaption>
            </figure>
          </LightboxStage>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => onStep(-1)}
            {...stylex.attrs(styles.lightButton, styles.lightPrev)}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => onStep(1)}
            {...stylex.attrs(styles.lightButton, styles.lightNext)}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            {...stylex.attrs(styles.lightButton, styles.lightClose)}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </>
      )}
    </LightboxDialog>
  );
}

export function Campus() {
  const lightbox = useLightbox(gallery.length);

  return (
    <Section id="about-campus" name={ABOUT_CAMPUS.eyebrow}>
      <Shell>
        <NodeMarker />
        <div {...stylex.attrs(styles.grid)}>
          {gallery.map((photo, position) => (
            <Reveal as="figure" sx={[styles.figure, PLACEMENT[photo.id][0]]}>
              <button
                type="button"
                aria-label={`View larger: ${photo.english}`}
                onClick={() => lightbox.open(position)}
                {...stylex.attrs(styles.button)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.attrs(styles.image, PLACEMENT[photo.id][1])}
                />
              </button>
              <figcaption {...stylex.attrs(styles.caption)}>{photo.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </Shell>
      <Lightbox lightbox={lightbox} />
    </Section>
  );
}
