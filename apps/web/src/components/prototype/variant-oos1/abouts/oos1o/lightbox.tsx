import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "@fenchem-lp/ui/components/lucide";

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
    backgroundColor: "rgba(255, 255, 255, 0.97)",
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
    padding: { default: "72px 16px 96px", [bp.tablet]: "80px 96px", [bp.desktop]: "80px 120px" },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    margin: 0,
    maxWidth: "100%",
    animationName: fadeIn,
    animationDuration: "240ms",
    animationTimingFunction: chrome.ease,
  },
  image: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: "calc(100dvh - 200px)",
    width: "auto",
    height: "auto",
    boxShadow: "0 0 0 1px rgba(11, 42, 92, 0.12)",
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    fontFamily: face.sans,
    fontSize: 16,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  count: {
    fontSize: 13,
    color: tone.body,
  },
  english: {
    fontSize: 19,
    color: tone.body,
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
    borderColor: { default: "rgba(11, 42, 92, 0.22)", ":hover": tone.navy },
    borderRadius: "50%",
    backgroundColor: tone.paper,
    color: tone.navy,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "160ms",
  },
  prev: {
    top: { default: "auto", [bp.tablet]: "50%", [bp.desktop]: "50%" },
    bottom: { default: 24, [bp.tablet]: "auto", [bp.desktop]: "auto" },
    insetInlineStart: { default: "calc(50% - 60px)", [bp.tablet]: 28, [bp.desktop]: 40 },
    marginTop: { default: 0, [bp.tablet]: -24, [bp.desktop]: -24 },
  },
  next: {
    top: { default: "auto", [bp.tablet]: "50%", [bp.desktop]: "50%" },
    bottom: { default: 24, [bp.tablet]: "auto", [bp.desktop]: "auto" },
    insetInlineEnd: { default: "calc(50% - 60px)", [bp.tablet]: 28, [bp.desktop]: 40 },
    marginTop: { default: 0, [bp.tablet]: -24, [bp.desktop]: -24 },
  },
  close: {
    top: { default: 12, [bp.tablet]: 24, [bp.desktop]: 24 },
    insetInlineEnd: { default: 12, [bp.tablet]: 28, [bp.desktop]: 40 },
  },
});

export function Lightbox(props: { lightbox: LightboxState; photos: readonly LightboxPhoto[] }) {
  const { close: onClose, step: onStep } = props.lightbox;
  return (
    <LightboxDialog lightbox={props.lightbox} items={props.photos} sx={styles.dialog}>
      {(photo, index) => (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure {...stylex.attrs(styles.figure)}>
              <img src={photo.large} alt={photo.alt} {...stylex.attrs(styles.image)} />
              <figcaption {...stylex.attrs(styles.caption)}>
                <span {...stylex.attrs(ui.latin, styles.count)}>
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(props.photos.length).padStart(2, "0")}
                </span>
                <span>{photo.caption}</span>
                <span lang="en" {...stylex.attrs(ui.serif, styles.english)}>
                  {photo.english}
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
      )}
    </LightboxDialog>
  );
}
