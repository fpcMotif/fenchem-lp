import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { PHOTO_ENGLISH } from "./data";
import { ease, face, mq } from "./tokens.stylex";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const zoomIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "scale(0.96)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
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
    backgroundColor: "rgba(6, 12, 24, 0.94)",
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
    padding: { default: "64px 12px", [mq.md]: "72px 104px" },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: ease.out,
  },
  figureOpen: {
    animationName: { default: fadeIn, [mq.motionOk]: zoomIn },
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
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    fontFamily: face.cjk,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: "rgba(255, 255, 255, 0.78)",
  },
  button: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    padding: 0,
    borderWidth: 0,
    borderRadius: "50%",
    backgroundColor: { default: "rgba(255, 255, 255, 0.1)", ":hover": "rgba(255, 255, 255, 0.2)" },
    color: colors.paper,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [mq.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
  },
  prev: {
    top: "50%",
    insetInlineStart: { default: 12, [mq.md]: 32 },
    marginTop: -24,
  },
  next: {
    top: "50%",
    insetInlineEnd: { default: 12, [mq.md]: 32 },
    marginTop: -24,
  },
  close: {
    top: { default: 12, [mq.md]: 24 },
    insetInlineEnd: { default: 12, [mq.md]: 32 },
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
      {...stylex.props(styles.lightbox)}
    >
      {photo ? (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure
              key={photo.id}
              {...stylex.props(styles.figure, stepped ? styles.figureStep : styles.figureOpen)}
            >
              <img src={photo.large} alt={photo.alt} {...stylex.props(styles.image)} />
              <figcaption {...stylex.props(styles.caption)}>
                <span>{photo.caption}</span>
                <span lang="en">{PHOTO_ENGLISH[photo.id]}</span>
              </figcaption>
            </figure>
          </LightboxStage>
          <LightboxControls
            onStep={onStep}
            onClose={onClose}
            previous={{
              icon: <ChevronLeft size={22} aria-hidden="true" />,
              sx: [styles.button, styles.prev],
            }}
            next={{
              icon: <ChevronRight size={22} aria-hidden="true" />,
              sx: [styles.button, styles.next],
            }}
            close={{ icon: <X size={22} aria-hidden="true" />, sx: [styles.button, styles.close] }}
          />
        </>
      ) : null}
    </dialog>
  );
}
