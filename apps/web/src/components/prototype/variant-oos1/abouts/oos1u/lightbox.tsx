import { CampusLightbox } from "../../../shared/campus-lightbox";
import { LightboxControls } from "../../../shared/lightbox-controls";

import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { curve, media, tone } from "./tokens.stylex";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const settle = stylex.keyframes({
  "0%": { opacity: 0, transform: "scale(0.97)" },
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
    backgroundColor: "rgba(20, 22, 40, 0.95)",
    color: tone.paper,
    animationName: fadeIn,
    animationDuration: "240ms",
    animationTimingFunction: curve.out,
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
    padding: { default: "64px 12px", [media.aboveTablet]: "72px 104px" },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: curve.out,
  },
  figureOpen: {
    animationName: { default: fadeIn, [media.motionOk]: settle },
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
    fontSize: 14,
    letterSpacing: "0.08em",
    color: "rgba(255, 255, 255, 0.86)",
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
    color: tone.paper,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
    transitionTimingFunction: curve.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.paper,
    outlineOffset: 2,
  },
  prev: {
    top: "50%",
    insetInlineStart: { default: 12, [media.aboveTablet]: 32 },
    marginTop: -24,
  },
  next: {
    top: "50%",
    insetInlineEnd: { default: 12, [media.aboveTablet]: 32 },
    marginTop: -24,
  },
  close: {
    top: { default: 12, [media.aboveTablet]: 24 },
    insetInlineEnd: { default: 12, [media.aboveTablet]: 32 },
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
    <CampusLightbox
      dialogRef={dialogRef}
      photo={photo}
      stepped={stepped}
      onClose={onClose}
      onStep={onStep}
      styles={{
        caption: styles.caption,
        figure: styles.figure,
        dialog: styles.dialog,
        stage: styles.stage,
        figureOpen: styles.figureOpen,
        figureStep: styles.figureStep,
        image: styles.image,
      }}
    >
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
    </CampusLightbox>
  );
}
