import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { ui } from "./shared-values";
import { bp, chrome, face, sky } from "./tokens.stylex";

export type PlatePhoto = {
  id: string;
  numeral: string;
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
    backgroundColor: "rgba(6, 24, 58, 0.97)",
    color: sky.star,
    animationName: fadeIn,
    animationDuration: "240ms",
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
    padding: { default: "72px 16px", [bp.tablet]: "72px 96px", [bp.desktop]: "64px 112px" },
  },
  holder: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    margin: 0,
    maxWidth: "100%",
    padding: { default: 8, [bp.desktop]: 12 },
    backgroundColor: sky.navy,
    boxShadow: `inset 0 0 0 1px ${sky.hairStrong}`,
    animationName: fadeIn,
    animationDuration: "220ms",
    animationTimingFunction: chrome.ease,
  },
  image: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: "calc(100dvh - 220px)",
    width: "auto",
    height: "auto",
  },
  strip: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    paddingInline: 2,
  },
  plate: {
    color: sky.text,
  },
  numeral: {
    fontSize: 18,
    marginInlineStart: 4,
    color: sky.star,
  },
  caption: {
    fontFamily: face.sans,
    fontSize: 16,
    letterSpacing: "0.06em",
    color: sky.star,
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
    borderColor: { default: sky.hairStrong, ":hover": sky.tint },
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: sky.star,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "160ms",
  },
  prev: {
    top: "50%",
    insetInlineStart: { default: 12, [bp.tablet]: 28, [bp.desktop]: 40 },
    marginTop: -24,
  },
  next: {
    top: "50%",
    insetInlineEnd: { default: 12, [bp.tablet]: 28, [bp.desktop]: 40 },
    marginTop: -24,
  },
  close: {
    top: { default: 12, [bp.tablet]: 24 },
    insetInlineEnd: { default: 12, [bp.tablet]: 28, [bp.desktop]: 40 },
  },
});

export function Lightbox({
  photos,
  index,
  onClose,
  onStep,
}: {
  photos: readonly PlatePhoto[];
  index: number | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      opener.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    }
    if (index === null) {
      if (dialog.open) dialog.close();
      opener.current?.focus();
      opener.current = null;
    }
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
      aria-label="园区底片"
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
            <figure key={photo.id} {...stylex.props(styles.holder)}>
              <img src={photo.large} alt={photo.alt} {...stylex.props(styles.image)} />
              <figcaption {...stylex.props(styles.strip)}>
                <span lang="en" {...stylex.props(ui.label, styles.plate)}>
                  Plate
                  <span {...stylex.props(ui.designation, styles.numeral)}>{photo.numeral}</span>
                </span>
                <span {...stylex.props(styles.caption)}>{photo.caption}</span>
              </figcaption>
            </figure>
          </LightboxStage>
          <LightboxControls
            onStep={onStep}
            onClose={onClose}
            previous={{
              icon: <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focusable, styles.prev],
            }}
            next={{
              icon: <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focusable, styles.next],
            }}
            close={{
              icon: <X size={20} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focusable, styles.close],
            }}
          />
        </>
      ) : null}
    </dialog>
  );
}
