import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import { LightboxStage } from "../../../shared/lightbox-stage";

import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "@fenchem-lp/ui/components/lucide";

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
    padding: { default: "64px 12px", ["@media (min-width: 768px)"]: "72px 104px" },
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
    animationName: { default: fadeIn, ["@media (prefers-reduced-motion: no-preference)"]: zoomIn },
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
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
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
    insetInlineStart: { default: 12, ["@media (min-width: 768px)"]: 32 },
    marginTop: -24,
  },
  next: {
    top: "50%",
    insetInlineEnd: { default: 12, ["@media (min-width: 768px)"]: 32 },
    marginTop: -24,
  },
  close: {
    top: { default: 12, ["@media (min-width: 768px)"]: 24 },
    insetInlineEnd: { default: 12, ["@media (min-width: 768px)"]: 32 },
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
