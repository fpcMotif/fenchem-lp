import { LightboxStage } from "../../../shared/lightbox-stage";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
      [breakpoints.md]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.md]: 24, [breakpoints.xl]: 32 },
    rowGap: { default: 40, [breakpoints.md]: 56 },
    alignItems: "start",
  },
  aerial: {
    gridColumn: { default: "auto", [breakpoints.md]: "1 / span 8" },
  },
  grounds: {
    gridColumn: { default: "auto", [breakpoints.md]: "9 / span 4" },
    marginTop: { default: 0, [media.mdOnly]: 48, [media.lgOnly]: 72, [breakpoints.xl]: 96 },
  },
  wide: {
    gridColumn: { default: "auto", [breakpoints.md]: "1 / -1" },
  },
  half: {
    gridColumn: { default: "auto", [breakpoints.md]: "span 6" },
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
  ratioGrounds: { aspectRatio: { default: "4 / 5", [breakpoints.md]: "2 / 3" } },
  ratioWide: { aspectRatio: { default: "3 / 2", [breakpoints.md]: "2.4 / 1" } },
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
    padding: { default: "64px 12px", [breakpoints.md]: "72px 104px" },
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
    animationName: { default: fadeIn, [breakpoints.motionOk]: zoomIn },
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
    insetInlineStart: { default: 12, [breakpoints.md]: 32 },
    marginTop: -24,
  },
  lightNext: {
    top: "50%",
    insetInlineEnd: { default: 12, [breakpoints.md]: 32 },
    marginTop: -24,
  },
  lightClose: {
    top: { default: 12, [breakpoints.md]: 24 },
    insetInlineEnd: { default: 12, [breakpoints.md]: 32 },
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

function Lightbox({
  index,
  stepped,
  onClose,
  onStep,
}: {
  index: number | null;
  stepped: boolean;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photo = index === null ? null : gallery[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    for (const delta of [1, -1]) {
      const neighbor = new Image();
      neighbor.src = gallery[(index + delta + gallery.length) % gallery.length].large;
    }
  }, [index]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="园区照片"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        event.stopPropagation();
        onStep(event.key === "ArrowRight" ? 1 : -1);
      }}
      {...stylex.props(styles.lightbox)}
    >
      {photo ? (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure
              key={photo.id}
              {...stylex.props(
                styles.lightFigure,
                stepped ? styles.lightFigureStep : styles.lightFigureOpen,
              )}
            >
              <img src={photo.large} alt={photo.alt} {...stylex.props(styles.lightImage)} />
              <figcaption {...stylex.props(styles.lightCaption)}>{photo.caption}</figcaption>
            </figure>
          </LightboxStage>
          <button
            type="button"
            aria-label="上一张"
            onClick={() => onStep(-1)}
            {...stylex.props(styles.lightButton, styles.lightPrev)}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="下一张"
            onClick={() => onStep(1)}
            {...stylex.props(styles.lightButton, styles.lightNext)}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            {...stylex.props(styles.lightButton, styles.lightClose)}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </>
      ) : null}
    </dialog>
  );
}

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = gallery.length;

  return (
    <Section id="about-campus" name={ABOUT_CAMPUS.title}>
      <Shell>
        <NodeMarker />
        <div {...stylex.props(styles.grid)}>
          {gallery.map((photo, position) => (
            <Reveal key={photo.id} as="figure" sx={[styles.figure, PLACEMENT[photo.id][0]]}>
              <button
                type="button"
                aria-label={`查看大图：${photo.caption}`}
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
                  {...stylex.props(styles.image, PLACEMENT[photo.id][1])}
                />
              </button>
              <figcaption {...stylex.props(styles.caption)}>{photo.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </Shell>
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
