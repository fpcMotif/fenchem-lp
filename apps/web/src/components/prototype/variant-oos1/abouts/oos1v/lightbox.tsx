import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "@fenchem-lp/ui/components/lucide";

import { CAMPUS_CAPTION_EN, CAMPUS_HANG } from "./campus-hang";
import { shared } from "./cyanotype-values";
import { curve, media, tone } from "./tokens.stylex";

const settle = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const lift = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "none" },
});

export function Lightbox(props: { lightbox: LightboxState }) {
  const onClose = () => props.lightbox.close();
  const onStep = (delta: number) => props.lightbox.step(delta);
  const photos = CAMPUS_HANG;

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
              <img
                src={photo.large}
                alt={photo.alt}
                {...stylex.attrs(styles.image, shared.cyanotype)}
              />
              <figcaption {...stylex.attrs(shared.caption)}>
                <span lang="en">{CAMPUS_CAPTION_EN[photo.id]}</span>
              </figcaption>
            </figure>
          </LightboxStage>
          <LightboxControls
            onStep={onStep}
            onClose={onClose}
            previous={{
              icon: <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, styles.previous],
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
        </>
      )}
    </LightboxDialog>
  );
}

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
    backgroundColor: tone.paper,
    color: tone.ink,
    animationName: settle,
    animationDuration: "240ms",
    animationTimingFunction: curve.out,
    "::backdrop": { backgroundColor: "transparent" },
  },
  stage: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: { default: "72px 16px", [media.wide]: "72px 112px" },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: curve.out,
  },
  figureOpen: {
    animationName: { default: lift, [media.reduce]: settle },
    animationDuration: "320ms",
  },
  figureStep: {
    animationName: settle,
    animationDuration: "200ms",
  },
  image: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: "calc(100dvh - 200px)",
    width: "auto",
    height: "auto",
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
    borderColor: { default: tone.hairline, ":hover": tone.stem },
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: tone.prussian,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "160ms",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.prussian,
    outlineOffset: 3,
  },
  previous: {
    top: { default: "auto", [media.wide]: "50%" },
    bottom: { default: 20, [media.wide]: "auto" },
    insetInlineStart: { default: "calc(50% - 56px)", [media.wide]: 40 },
    marginTop: { default: 0, [media.wide]: -22 },
  },
  next: {
    top: { default: "auto", [media.wide]: "50%" },
    bottom: { default: 20, [media.wide]: "auto" },
    insetInlineEnd: { default: "calc(50% - 56px)", [media.wide]: 40 },
    marginTop: { default: 0, [media.wide]: -22 },
  },
  close: {
    top: { default: 16, [media.wide]: 24 },
    insetInlineEnd: { default: 16, [media.wide]: 40 },
  },
});
