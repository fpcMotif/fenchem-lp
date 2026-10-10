import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { Cast } from "./cast";
import { LIFT } from "./cast-values";
import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

export type LightboxPhoto = {
  id: string;
  large: string;
  alt: string;
  caption: string;
  english: string;
};

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
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
    backgroundColor: "rgba(238, 242, 249, 0.97)",
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
    padding: {
      default: "72px 16px 96px",
      [bp.tablet]: "80px 104px 112px",
      [bp.desktop]: "80px 128px 120px",
    },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 18,
    margin: 0,
    maxWidth: "100%",
    animationName: fadeIn,
    animationDuration: "200ms",
  },
  plate: {
    position: "relative",
    display: "block",
  },
  image: {
    position: "relative",
    zIndex: 1,
    display: "block",
    maxWidth: "min(1280px, 100%)",
    maxHeight: "calc(100dvh - 240px)",
    width: "auto",
    height: "auto",
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.ink,
  },
  english: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 19,
    color: tone.quiet,
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
    borderColor: tone.line,
    borderRadius: "50%",
    backgroundColor: { default: "transparent", ":hover": tone.tint },
    color: tone.navy,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
  },
  prev: {
    top: { default: "auto", [bp.tabletUp]: "50%" },
    bottom: { default: 24, [bp.tabletUp]: "auto" },
    insetInlineStart: { default: 16, [bp.tabletUp]: 32 },
    marginTop: { default: 0, [bp.tabletUp]: -24 },
  },
  next: {
    top: { default: "auto", [bp.tabletUp]: "50%" },
    bottom: { default: 24, [bp.tabletUp]: "auto" },
    insetInlineEnd: { default: 16, [bp.tabletUp]: 32 },
    marginTop: { default: 0, [bp.tabletUp]: -24 },
  },
  close: {
    top: { default: 12, [bp.tabletUp]: 24 },
    insetInlineEnd: { default: 16, [bp.tabletUp]: 32 },
  },
});

export function Lightbox({
  photos,
  index,
  onClose,
  onStep,
}: {
  photos: readonly LightboxPhoto[];
  index: number | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
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
      aria-label="Campus photos"
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
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure key={photo.id} {...stylex.props(styles.figure)}>
              <span {...stylex.props(styles.plate)}>
                <Cast lift={LIFT.block} />
                <img src={photo.large} alt={photo.alt} {...stylex.props(styles.image)} />
              </span>
              <figcaption {...stylex.props(styles.caption)}>
                <span>{photo.caption}</span>
                <span lang="en" {...stylex.props(styles.english)}>
                  {photo.english}
                </span>
              </figcaption>
            </figure>
          </LightboxStage>
          <LightboxControls
            onStep={onStep}
            onClose={onClose}
            previous={{
              icon: <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focus, styles.prev],
            }}
            next={{
              icon: <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focus, styles.next],
            }}
            close={{
              icon: <X size={22} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focus, styles.close],
            }}
          />
        </>
      ) : null}
    </dialog>
  );
}
