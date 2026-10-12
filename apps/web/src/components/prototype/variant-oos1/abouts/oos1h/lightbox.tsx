import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import { LightboxStage } from "../../../shared/lightbox-stage";

import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { font, layout } from "./theme.stylex";

export type LightboxPhoto = {
  id: string;
  large: string;
  alt: string;
  caption: string;
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
    backgroundColor: "rgba(6, 16, 34, 0.95)",
    color: colors.paper,
    fontFamily: font.cjk,
    animationName: fadeIn,
    animationDuration: "240ms",
    animationTimingFunction: layout.easeOut,
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
    alignItems: "center",
    gap: 16,
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: layout.easeOut,
  },
  figureOpen: {
    animationName: fadeIn,
    animationDuration: "320ms",
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
    letterSpacing: "0.1em",
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
    transitionProperty: "background-color",
    transitionDuration: "160ms",
    transitionTimingFunction: layout.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
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
  lightbox,
  photos,
}: {
  lightbox: LightboxState;
  photos: readonly LightboxPhoto[];
}) {
  const { stepped, close: onClose, step: onStep } = lightbox;
  return (
    <LightboxDialog lightbox={lightbox} items={photos} sx={styles.dialog}>
      {(photo) => (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure
              key={photo.id}
              {...stylex.props(styles.figure, stepped ? styles.figureStep : styles.figureOpen)}
            >
              <img src={photo.large} alt={photo.alt} {...stylex.props(styles.image)} />
              <figcaption {...stylex.props(styles.caption)}>{photo.caption}</figcaption>
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
      )}
    </LightboxDialog>
  );
}
