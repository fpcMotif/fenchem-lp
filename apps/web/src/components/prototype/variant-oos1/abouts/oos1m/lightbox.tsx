import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

export type LightboxView = {
  id: string;
  letter: string;
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
    inset: 0,
    width: "100vw",
    height: "100dvh",
    maxWidth: "none",
    maxHeight: "none",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 0.97)",
    color: tone.ink,
    animationName: { default: "none", [bp.motionOk]: fadeIn },
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
    padding: { default: "72px 16px 96px", [bp.tablet]: "80px 96px", [bp.desktop]: "72px 120px" },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    margin: 0,
    maxWidth: "100%",
    animationName: { default: "none", [bp.motionOk]: fadeIn },
    animationDuration: "200ms",
  },
  image: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: "calc(100dvh - 220px)",
    width: "auto",
    height: "auto",
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: tone.line,
    outlineOffset: 6,
  },
  caption: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  captionTitle: {
    fontFamily: face.sans,
    fontSize: 18,
    fontWeight: 500,
    color: tone.navy,
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
    borderColor: tone.line,
    borderRadius: "50%",
    backgroundColor: { default: tone.paper, ":hover": tone.tint },
    color: tone.navy,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
  },
  prev: {
    top: { default: "auto", [bp.tabletUp]: "50%" },
    bottom: { default: 24, [bp.tabletUp]: "auto" },
    left: { default: "calc(50% - 56px)", [bp.tabletUp]: 28 },
    marginTop: { default: 0, [bp.tabletUp]: -22 },
  },
  next: {
    top: { default: "auto", [bp.tabletUp]: "50%" },
    bottom: { default: 24, [bp.tabletUp]: "auto" },
    right: { default: "calc(50% - 56px)", [bp.tabletUp]: 28 },
    marginTop: { default: 0, [bp.tabletUp]: -22 },
  },
  close: {
    top: { default: 16, [bp.tabletUp]: 24 },
    right: { default: 16, [bp.tabletUp]: 28 },
  },
});

export function Lightbox({
  lightbox,
  views,
}: {
  lightbox: LightboxState;
  views: readonly LightboxView[];
}) {
  const { close: onClose, step: onStep } = lightbox;
  return (
    <LightboxDialog lightbox={lightbox} items={views} sx={styles.dialog}>
      {(view) => (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure key={view.id} {...stylex.props(styles.figure)}>
              <img src={view.large} alt={view.alt} {...stylex.props(styles.image)} />
              <figcaption {...stylex.props(styles.caption)}>
                <span aria-hidden="true" {...stylex.props(ui.balloon)}>
                  {view.letter}
                </span>
                <span {...stylex.props(styles.captionTitle)}>{view.caption}</span>
                <span lang="en" {...stylex.props(ui.label)}>
                  View {view.letter} · {view.english}
                </span>
              </figcaption>
            </figure>
          </LightboxStage>
          <LightboxControls
            onStep={onStep}
            onClose={onClose}
            previous={{
              icon: <ArrowLeft size={18} strokeWidth={1.25} aria-hidden="true" />,
              sx: [styles.button, ui.focusRing, styles.prev],
            }}
            next={{
              icon: <ArrowRight size={18} strokeWidth={1.25} aria-hidden="true" />,
              sx: [styles.button, ui.focusRing, styles.next],
            }}
            close={{
              icon: <X size={18} strokeWidth={1.25} aria-hidden="true" />,
              sx: [styles.button, ui.focusRing, styles.close],
            }}
          />
        </>
      )}
    </LightboxDialog>
  );
}
