import { LightboxStage } from "../../../shared/lightbox-stage";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, X } from "@fenchem-lp/ui/components/lucide";

import { srOnly, type, ui } from "./shared";
import { bp, grid, tone } from "./tokens.stylex";

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

const settle = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(16px)" },
  "100%": { opacity: 1, transform: "none" },
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
    backgroundColor: tone.mist,
    color: tone.ink,
    animationName: fadeIn,
    animationDuration: "220ms",
    animationTimingFunction: grid.ease,
    "::backdrop": { backgroundColor: "transparent" },
  },
  layout: {
    display: "grid",
    gridTemplateRows: "minmax(0, 1fr) auto",
    height: "100%",
    boxSizing: "border-box",
    paddingTop: { default: 72, [bp.wide]: 88 },
    paddingBottom: { default: 20, [bp.wide]: 36 },
  },
  stage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 0,
  },
  image: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    animationTimingFunction: grid.ease,
  },
  imageOpen: {
    animationName: { default: fadeIn, "@media (prefers-reduced-motion: no-preference)": settle },
    animationDuration: "320ms",
  },
  imageStep: {
    animationName: fadeIn,
    animationDuration: "180ms",
  },
  bar: {
    alignItems: "start",
    rowGap: 16,
    paddingTop: { default: 20, [bp.wide]: 28 },
  },
  arm: {
    margin: 0,
    gridColumn: { default: "auto", [bp.wide]: "1 / 8" },
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 6,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.navy,
  },
  count: {
    fontSize: "clamp(16px, 1.67vw, 24px)",
  },
  total: {
    color: "rgba(11, 42, 92, 0.42)",
  },
  caption: {
    fontSize: "clamp(26px, 2.78vw, 40px)",
    lineHeight: 1.1,
  },
  english: {
    fontSize: 20,
  },
  controls: {
    gridColumn: { default: "auto", [bp.wide]: "8 / 13" },
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.navy,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.hairline,
    borderRadius: 0,
    backgroundColor: { default: "transparent", ":hover": tone.tint },
    color: tone.navy,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
  },
  pager: {
    display: "flex",
    gap: 8,
  },
  close: {
    position: "absolute",
    top: { default: 12, [bp.wide]: 24 },
    insetInlineEnd: { default: 12, [bp.tablet]: 40, [bp.desktop]: grid.margin },
  },
});

export function Lightbox(props: { lightbox: LightboxState; photos: readonly LightboxPhoto[] }) {
  const onClose = () => props.lightbox.close();
  const onStep = (delta: number) => props.lightbox.step(delta);
  let closeRef: HTMLButtonElement | undefined;

  return (
    <LightboxDialog
      lightbox={props.lightbox}
      items={props.photos}
      sx={styles.dialog}
      initialFocus={() => closeRef}
    >
      {(photo, index) => (
        <>
          <div {...stylex.attrs(styles.layout, ui.shell)}>
            <LightboxStage onClose={onClose} sx={styles.stage}>
              <img
                src={photo.large}
                alt={photo.alt}
                {...stylex.attrs(
                  styles.image,
                  props.lightbox.stepped ? styles.imageStep : styles.imageOpen,
                )}
              />
            </LightboxStage>
            <div {...stylex.attrs(ui.columns, styles.bar)}>
              <p aria-live="polite" {...stylex.attrs(styles.arm)}>
                <span aria-hidden="true" {...stylex.attrs(type.counterweight, styles.count)}>
                  {String(index + 1).padStart(2, "0")}
                  <span {...stylex.attrs(styles.total)}>
                    /{String(props.photos.length).padStart(2, "0")}
                  </span>
                </span>
                <span {...stylex.attrs(type.light, styles.caption)}>{photo.caption}</span>
                <span lang="en" {...stylex.attrs(type.serif, styles.english)}>
                  {photo.english}
                </span>
                <span {...srOnly}>
                  Photo {index + 1} of {props.photos.length}
                </span>
              </p>
              <div {...stylex.attrs(styles.controls)}>
                <div {...stylex.attrs(styles.pager)}>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() => onStep(-1)}
                    {...stylex.attrs(styles.button, ui.focusRing)}
                  >
                    <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => onStep(1)}
                    {...stylex.attrs(styles.button, ui.focusRing)}
                  >
                    <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            ref={closeRef}
            onClick={onClose}
            {...stylex.attrs(styles.button, styles.close, ui.focusRing)}
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </>
      )}
    </LightboxDialog>
  );
}
