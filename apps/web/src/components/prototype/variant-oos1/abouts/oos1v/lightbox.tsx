import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxStage } from "../../../shared/lightbox-stage";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

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

export function Lightbox({
  index,
  stepped,
  onClose,
  onStep,
}: {
  index: number | null;
  stepped: boolean;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photos = CAMPUS_HANG;
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    for (const delta of [1, -1]) {
      const neighbor = new Image();
      neighbor.src = photos[(index + delta + photos.length) % photos.length].large;
    }
  }, [index, photos]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="园区照片"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        event.stopPropagation();
        onStep(event.key === "ArrowRight" ? 1 : -1);
      }}
      {...stylex.props(styles.dialog)}
    >
      {photo ? (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure
              key={photo.id}
              {...stylex.props(styles.figure, stepped ? styles.figureStep : styles.figureOpen)}
            >
              <img
                src={photo.large}
                alt={photo.alt}
                {...stylex.props(styles.image, shared.cyanotype)}
              />
              <figcaption {...stylex.props(shared.caption)}>
                <span lang="en">{CAMPUS_CAPTION_EN[photo.id]}</span>
                <span {...stylex.props(shared.srOnly)}> {photo.caption}</span>
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
      ) : null}
    </dialog>
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
