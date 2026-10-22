import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { ui } from "./layout";
import { frameLabel } from "./time-grid-values";
import { bp, face } from "./tokens.stylex";

export type LightboxPhoto = {
  id: string;
  large: string;
  alt: string;
  caption: string;
};

const backdropIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const expose = stylex.keyframes({
  "0%": { opacity: 0.12 },
  "50%": { opacity: 0.4 },
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
    backgroundColor: "rgba(6, 22, 48, 0.96)",
    color: "#ffffff",
    animationName: backdropIn,
    animationDuration: "200ms",
    "::backdrop": { backgroundColor: "transparent" },
  },
  stage: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: { default: "72px 12px 96px", [bp.abovePhone]: "80px 104px 96px" },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    margin: 0,
    maxWidth: "100%",
  },
  image: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: "calc(100dvh - 200px)",
    width: "auto",
    height: "auto",
    animationName: { default: expose, [bp.motionReduce]: "none" },
    animationDuration: "166ms",
    animationTimingFunction: "step-end",
    animationFillMode: "both",
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    fontFamily: face.sans,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  count: {
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: "rgba(255, 255, 255, 0.6)",
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
    borderColor: { default: "rgba(255, 255, 255, 0.24)", ":hover": "rgba(255, 255, 255, 0.6)" },
    borderRadius: 0,
    backgroundColor: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "160ms",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: "#ffffff",
    outlineOffset: 3,
  },
  prev: {
    top: { default: "auto", [bp.abovePhone]: "50%" },
    bottom: { default: 24, [bp.abovePhone]: "auto" },
    left: { default: 16, [bp.abovePhone]: 32 },
    marginTop: { default: 0, [bp.abovePhone]: -24 },
  },
  next: {
    top: { default: "auto", [bp.abovePhone]: "50%" },
    bottom: { default: 24, [bp.abovePhone]: "auto" },
    right: { default: 16, [bp.abovePhone]: 32 },
    marginTop: { default: 0, [bp.abovePhone]: -24 },
  },
  close: {
    top: { default: 16, [bp.abovePhone]: 24 },
    right: { default: 16, [bp.abovePhone]: 32 },
  },
});

export function Lightbox({
  lightbox,
  photos,
}: {
  lightbox: LightboxState;
  photos: readonly LightboxPhoto[];
}) {
  const { close: onClose, step: onStep } = lightbox;
  return (
    <LightboxDialog lightbox={lightbox} items={photos} sx={styles.dialog}>
      {(photo, index) => (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure key={photo.id} {...stylex.props(styles.figure)}>
              <img src={photo.large} alt={photo.alt} {...stylex.props(styles.image)} />
              <figcaption {...stylex.props(styles.caption)}>
                <span aria-hidden="true" {...stylex.props(styles.count)}>
                  {frameLabel(index + 1)} / {frameLabel(photos.length)}
                </span>
                <span>{photo.caption}</span>
              </figcaption>
            </figure>
          </LightboxStage>
          <LightboxControls
            onStep={onStep}
            onClose={onClose}
            previous={{
              icon: <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, styles.prev],
            }}
            next={{
              icon: <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, styles.next],
            }}
            close={{
              icon: <X size={20} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, styles.close],
            }}
          />
          <span {...stylex.props(ui.srOnly)} aria-live="polite">
            {photo.caption}
          </span>
        </>
      )}
    </LightboxDialog>
  );
}
