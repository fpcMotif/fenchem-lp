import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { ui } from "./shared-values";
import { bp, chrome, face, tone } from "./tokens.stylex";

export type LightboxPhoto = {
  id: string;
  large: string;
  alt: string;
  caption: string;
  panel: string;
};

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const settle = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(10px)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  dialog: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100dvh",
    maxWidth: "none",
    maxHeight: "none",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "rgba(243, 245, 250, 0.97)",
    color: tone.ink,
    animationName: fadeIn,
    animationDuration: "220ms",
    animationTimingFunction: chrome.ease,
    "::backdrop": { backgroundColor: "transparent" },
  },
  stage: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: { default: "72px 16px 112px", [bp.tablet]: "80px 96px", [bp.desktop]: "80px 120px" },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: chrome.ease,
  },
  figureOpen: {
    animationName: { default: settle, [bp.motionReduce]: fadeIn },
    animationDuration: "320ms",
  },
  figureStep: {
    animationName: fadeIn,
    animationDuration: "180ms",
  },
  image: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: {
      default: "calc(100dvh - 240px)",
      [bp.tablet]: "calc(100dvh - 220px)",
      [bp.desktop]: "calc(100dvh - 220px)",
    },
    width: "auto",
    height: "auto",
    boxShadow: "0 0 0 1px rgba(11, 42, 92, 0.14)",
    borderRadius: 2,
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
  },
  captionMain: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  captionText: {
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.ink,
  },
  button: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(11, 42, 92, 0.2)",
    borderRadius: 2,
    backgroundColor: { default: "transparent", ":hover": tone.plate },
    color: tone.ink,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
  },
  prev: {
    top: { default: "auto", [bp.tablet]: "50%", [bp.desktop]: "50%" },
    bottom: { default: 32, [bp.tablet]: "auto", [bp.desktop]: "auto" },
    insetInlineStart: { default: 16, [bp.tablet]: 28, [bp.desktop]: 40 },
    marginTop: { default: 0, [bp.tablet]: -22, [bp.desktop]: -22 },
  },
  next: {
    top: { default: "auto", [bp.tablet]: "50%", [bp.desktop]: "50%" },
    bottom: { default: 32, [bp.tablet]: "auto", [bp.desktop]: "auto" },
    insetInlineEnd: { default: 16, [bp.tablet]: 28, [bp.desktop]: 40 },
    marginTop: { default: 0, [bp.tablet]: -22, [bp.desktop]: -22 },
  },
  close: {
    top: { default: 16, [bp.tablet]: 24, [bp.desktop]: 24 },
    insetInlineEnd: { default: 16, [bp.tablet]: 28, [bp.desktop]: 40 },
  },
});

export function Lightbox({
  photos,
  index,
  stepped,
  onClose,
  onStep,
}: {
  photos: readonly LightboxPhoto[];
  index: number | null;
  stepped: boolean;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
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
      {photo && index !== null ? (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure
              key={photo.id}
              {...stylex.props(styles.figure, stepped ? styles.figureStep : styles.figureOpen)}
            >
              <img src={photo.large} alt={photo.alt} {...stylex.props(styles.image)} />
              <figcaption {...stylex.props(ui.micro, styles.caption)}>
                <span {...stylex.props(styles.captionMain)}>
                  <span lang="en">Fig. 2{photo.panel}</span>
                  <span {...stylex.props(styles.captionText)}>{photo.caption}</span>
                </span>
                <span aria-label={`第 ${index + 1} 张，共 ${photos.length} 张`}>
                  {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          </LightboxStage>
          <LightboxControls
            onStep={onStep}
            onClose={onClose}
            previous={{
              icon: <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focusRing, styles.prev],
            }}
            next={{
              icon: <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focusRing, styles.next],
            }}
            close={{
              icon: <X size={20} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focusRing, styles.close],
            }}
          />
        </>
      ) : null}
    </dialog>
  );
}
