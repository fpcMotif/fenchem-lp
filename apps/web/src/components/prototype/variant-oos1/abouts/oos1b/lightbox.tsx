import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, X } from "@fenchem-lp/ui/components/lucide";

import type { Plate } from "./journey";
import { Tag } from "./shared";
import { ui } from "./shared-values";
import { bp, face, motion, tone } from "./tokens.stylex";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const stepInward = stylex.keyframes({
  "0%": { opacity: 0, transform: "scale(0.94)" },
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
    backgroundColor: "rgba(255, 255, 255, 0.985)",
    color: tone.ink,
    animationName: fadeIn,
    animationDuration: "240ms",
    animationTimingFunction: motion.ease,
    "::backdrop": { backgroundColor: "transparent" },
  },
  stage: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: {
      default: "72px 16px 132px",
      [bp.tablet]: "80px 96px 128px",
      [bp.desktop]: "72px 120px 120px",
    },
  },
  figure: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 0,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  frame: {
    position: "relative",
    padding: { default: 8, [bp.upTablet]: 14 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.ruleStrong,
    animationName: { default: fadeIn, [bp.motionOk]: stepInward },
    animationDuration: "420ms",
    animationTimingFunction: motion.ease,
  },
  stepped: {
    animationName: fadeIn,
    animationDuration: "200ms",
  },
  image: {
    display: "block",
    maxWidth: "min(1280px, calc(100vw - 64px))",
    maxHeight: { default: "calc(100dvh - 260px)", [bp.upTablet]: "calc(100dvh - 250px)" },
    width: "auto",
    height: "auto",
  },
  caption: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 14,
    rowGap: 4,
    marginTop: 18,
  },
  chinese: {
    fontFamily: face.sans,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  english: {
    fontSize: 19,
  },
  count: {
    fontFamily: face.latin,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.body,
    fontVariantNumeric: "tabular-nums",
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
    borderColor: { default: tone.rule, ":hover": tone.navy },
    borderRadius: 0,
    backgroundColor: tone.page,
    color: tone.navy,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "160ms",
  },
  prev: {
    bottom: { default: 24, [bp.desktop]: "50%" },
    insetInlineStart: { default: 16, [bp.tablet]: 28, [bp.desktop]: 40 },
    marginBottom: { default: 0, [bp.desktop]: -22 },
  },
  next: {
    bottom: { default: 24, [bp.desktop]: "50%" },
    insetInlineStart: { default: 68, [bp.tablet]: "auto", [bp.desktop]: "auto" },
    insetInlineEnd: { default: "auto", [bp.tablet]: 28, [bp.desktop]: 40 },
    marginBottom: { default: 0, [bp.desktop]: -22 },
  },
  close: {
    top: { default: 16, [bp.upTablet]: 24 },
    insetInlineEnd: { default: 16, [bp.tablet]: 28, [bp.desktop]: 40 },
  },
});

export function Lightbox(props: { lightbox: LightboxState; plates: readonly Plate[] }) {
  const { close: onClose, step: onStep } = props.lightbox;
  return (
    <LightboxDialog lightbox={props.lightbox} items={props.plates} sx={styles.dialog}>
      {(plate, index) => (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure {...stylex.attrs(styles.figure)}>
              <div {...stylex.attrs(styles.frame, props.lightbox.stepped && styles.stepped)}>
                <Tag numeral={plate.numeral} />
                <img src={plate.large} alt={plate.alt} {...stylex.attrs(styles.image)} />
              </div>
              <figcaption {...stylex.attrs(styles.caption)}>
                <span {...stylex.attrs(styles.chinese)}>{plate.caption}</span>
                <span lang="en" {...stylex.attrs(ui.serif, styles.english)}>
                  {plate.english}
                </span>
                <span {...stylex.attrs(styles.count)}>
                  {index + 1} / {props.plates.length}
                </span>
              </figcaption>
            </figure>
          </LightboxStage>
          <LightboxControls
            onStep={onStep}
            onClose={onClose}
            previous={{
              icon: <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focusRing, styles.prev],
            }}
            next={{
              icon: <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focusRing, styles.next],
            }}
            close={{
              icon: <X size={18} strokeWidth={1.5} aria-hidden="true" />,
              sx: [styles.button, ui.focusRing, styles.close],
            }}
          />
        </>
      )}
    </LightboxDialog>
  );
}
