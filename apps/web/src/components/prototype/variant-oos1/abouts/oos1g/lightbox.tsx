import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import { LightboxStage } from "../../../shared/lightbox-stage";

import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "@fenchem-lp/ui/components/lucide";

import { ABOUT_CAMPUS } from "../../about-data";
import { palette } from "./palette.stylex";

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
    backgroundColor: "rgba(6, 12, 24, 0.95)",
    color: colors.paper,
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: fadeIn },
    animationDuration: "240ms",
    animationTimingFunction: palette.easeOut,
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
    padding: { default: "72px 28px", ["@media (min-width: 768px)"]: "80px 120px" },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: palette.easeOut,
  },
  figureOpen: {
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: zoomIn },
    animationDuration: "260ms",
  },
  figureStep: {
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: fadeIn },
    animationDuration: "180ms",
  },
  image: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: "calc(100dvh - 220px)",
    width: "auto",
    height: "auto",
  },
  caption: {
    fontFamily: palette.fontBody,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: "rgba(255, 255, 255, 0.8)",
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
    borderRadius: 0,
    backgroundColor: { default: "rgba(255, 255, 255, 0.1)", ":hover": "rgba(255, 255, 255, 0.22)" },
    color: colors.paper,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: palette.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
  },
  prev: {
    top: "50%",
    insetInlineStart: { default: 10, ["@media (min-width: 768px)"]: 32 },
    marginTop: -24,
  },
  next: {
    top: "50%",
    insetInlineEnd: { default: 10, ["@media (min-width: 768px)"]: 32 },
    marginTop: -24,
  },
  close: {
    top: { default: 12, ["@media (min-width: 768px)"]: 24 },
    insetInlineEnd: { default: 10, ["@media (min-width: 768px)"]: 32 },
  },
});

export function Lightbox(props: { lightbox: LightboxState }) {
  const { close: onClose, step: onStep } = props.lightbox;
  const photos = ABOUT_CAMPUS.photos;

  return (
    <LightboxDialog lightbox={props.lightbox} items={photos} sx={styles.dialog}>
      {(photo) => (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure
              {...stylex.attrs(
                styles.figure,
                props.lightbox.stepped ? styles.figureStep : styles.figureOpen,
              )}
            >
              <img src={photo.large} alt={photo.alt} {...stylex.attrs(styles.image)} />
              <figcaption {...stylex.attrs(styles.caption)}>{photo.caption}</figcaption>
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
