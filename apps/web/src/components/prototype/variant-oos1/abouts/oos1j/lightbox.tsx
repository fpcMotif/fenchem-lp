import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "@fenchem-lp/ui/components/lucide";

import { ABOUT_CAMPUS } from "../../about-data";
import { hue, size } from "./theme.stylex";

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
    backgroundColor: "rgba(6, 18, 40, 0.95)",
    color: colors.paper,
    animationName: fadeIn,
    animationDuration: "240ms",
    animationTimingFunction: size.ease,
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
    padding: { default: "72px 12px", [breakpoints.md]: "80px 108px" },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    margin: 0,
    maxWidth: "100%",
    animationName: fadeIn,
    animationDuration: "200ms",
    animationTimingFunction: size.ease,
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
    fontWeight: 400,
    letterSpacing: "0.12em",
    color: hue.onDark,
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
    backgroundColor: "transparent",
    color: colors.paper,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
  },
  prev: {
    top: "50%",
    insetInlineStart: { default: 8, [breakpoints.md]: 32 },
    marginTop: -24,
  },
  next: {
    top: "50%",
    insetInlineEnd: { default: 8, [breakpoints.md]: 32 },
    marginTop: -24,
  },
  close: {
    top: { default: 8, [breakpoints.md]: 24 },
    insetInlineEnd: { default: 8, [breakpoints.md]: 32 },
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
            <figure {...stylex.attrs(styles.figure)}>
              <img src={photo.large} alt={photo.alt} {...stylex.attrs(styles.image)} />
              <figcaption {...stylex.attrs(styles.caption)}>{photo.caption}</figcaption>
            </figure>
          </LightboxStage>
          <LightboxControls
            onStep={onStep}
            onClose={onClose}
            previous={{
              icon: <ChevronLeft size={24} aria-hidden="true" />,
              sx: [styles.button, styles.prev],
            }}
            next={{
              icon: <ChevronRight size={24} aria-hidden="true" />,
              sx: [styles.button, styles.next],
            }}
            close={{ icon: <X size={24} aria-hidden="true" />, sx: [styles.button, styles.close] }}
          />
        </>
      )}
    </LightboxDialog>
  );
}
