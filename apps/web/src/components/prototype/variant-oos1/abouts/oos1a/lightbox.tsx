import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { ease, fonts, palette } from "./lattice.stylex";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const zoomIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "scale(0.96)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  dialog: {
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
    backgroundColor: palette.shade,
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
  figure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: 14,
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: ease.out,
  },
  figureOpen: {
    animationName: { default: fadeIn, [breakpoints.motionOk]: zoomIn },
    animationDuration: "260ms",
  },
  figureStep: {
    animationName: fadeIn,
    animationDuration: "180ms",
  },
  image: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: "calc(100dvh - 200px)",
    width: "auto",
    height: "auto",
    marginInline: "auto",
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.paleRule,
    fontFamily: fonts.cjk,
    fontSize: 15,
    letterSpacing: "0.1em",
    color: palette.paleText,
  },
  button: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: palette.paleRule,
    borderRadius: 0,
    backgroundColor: { default: "transparent", ":hover": palette.paleHair },
    color: colors.paper,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 3,
  },
  prev: {
    top: "50%",
    insetInlineStart: { default: 12, [breakpoints.md]: 32 },
    marginTop: -24,
  },
  next: {
    top: "50%",
    insetInlineEnd: { default: 12, [breakpoints.md]: 32 },
    marginTop: -24,
  },
  close: {
    top: { default: 12, [breakpoints.md]: 24 },
    insetInlineEnd: { default: 12, [breakpoints.md]: 32 },
  },
});

export function Lightbox({
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
  const photos = ABOUT_CAMPUS.photos;
  const photo = index === null ? null : photos[index];

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
      neighbor.src = photos[(index + delta + photos.length) % photos.length].large;
    }
  }, [index, photos]);

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
      {...stylex.props(styles.dialog)}
    >
      {photo ? (
        <>
          <div
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
            {...stylex.props(styles.stage)}
          >
            <figure
              key={photo.id}
              {...stylex.props(styles.figure, stepped ? styles.figureStep : styles.figureOpen)}
            >
              <img src={photo.large} alt={photo.alt} {...stylex.props(styles.image)} />
              <figcaption {...stylex.props(styles.caption)}>{photo.caption}</figcaption>
            </figure>
          </div>
          <button
            type="button"
            aria-label="上一张"
            onClick={() => onStep(-1)}
            {...stylex.props(styles.button, styles.prev)}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="下一张"
            onClick={() => onStep(1)}
            {...stylex.props(styles.button, styles.next)}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            {...stylex.props(styles.button, styles.close)}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </>
      ) : null}
    </dialog>
  );
}
