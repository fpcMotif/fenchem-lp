import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { Hinge, Words } from "./clause";
import type { Unit } from "./sentence";
import { bp, chrome, face, tone } from "./tokens.stylex";

export type LightboxPhoto = {
  id: string;
  large: string;
  alt: string;
  english: string;
  line: Unit;
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
    backgroundColor: tone.scrim,
    color: "#ffffff",
    animationName: { default: fadeIn, [bp.motionReduce]: "none" },
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
    padding: {
      default: "72px 20px 120px",
      [bp.tablet]: "80px 96px 128px",
      [bp.desktop]: "80px 120px 136px",
    },
  },
  image: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    animationName: { default: fadeIn, [bp.motionReduce]: "none" },
    animationDuration: "200ms",
    animationTimingFunction: chrome.ease,
  },
  caption: {
    position: "absolute",
    insetInline: { default: 20, [bp.tablet]: 96, [bp.desktop]: 120 },
    bottom: { default: 32, [bp.desktop]: 40 },
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 24,
    margin: 0,
  },
  count: {
    fontFamily: face.latin,
    fontSize: 13,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: "rgba(255, 255, 255, 0.72)",
  },
  line: {
    fontFamily: face.sans,
    fontSize: { default: 24, [bp.desktop]: 32 },
    lineHeight: 1.1,
    textAlign: "end",
  },
  heavy: { fontWeight: 900 },
  light: { fontWeight: 300 },
  hinge: {
    color: "#8fb0e6",
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
    borderColor: { default: "rgba(255, 255, 255, 0.28)", ":hover": "rgba(255, 255, 255, 0.8)" },
    borderRadius: 0,
    backgroundColor: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "160ms",
  },
  prev: {
    top: "50%",
    insetInlineStart: { default: 12, [bp.tablet]: 28, [bp.desktop]: 40 },
    marginTop: -24,
  },
  next: {
    top: "50%",
    insetInlineEnd: { default: 12, [bp.tablet]: 28, [bp.desktop]: 40 },
    marginTop: -24,
  },
  close: {
    top: { default: 12, [bp.desktop]: 20 },
    insetInlineEnd: { default: 12, [bp.tablet]: 28, [bp.desktop]: 40 },
  },
});

export function Lightbox({
  photos,
  index,
  onClose,
  onStep,
}: {
  photos: readonly LightboxPhoto[];
  index: number | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
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
      {photo && index !== null ? (
        <>
          <div
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
            {...stylex.props(styles.stage)}
          >
            <img key={photo.id} src={photo.large} alt={photo.alt} {...stylex.props(styles.image)} />
          </div>
          <p {...stylex.props(styles.caption)}>
            <span lang="en" {...stylex.props(styles.count)}>
              {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              {" · "}
              {photo.english}
            </span>
            <span {...stylex.props(styles.line)}>
              <Words
                segments={photo.line.segments}
                heavy={styles.heavy}
                light={styles.light}
                tail={
                  photo.line.hinge ? <Hinge mark={photo.line.hinge} sx={styles.hinge} /> : undefined
                }
              />
            </span>
          </p>
          <button
            type="button"
            aria-label="上一张"
            onClick={() => onStep(-1)}
            {...stylex.props(styles.button, styles.prev)}
          >
            <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="下一张"
            onClick={() => onStep(1)}
            {...stylex.props(styles.button, styles.next)}
          >
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            {...stylex.props(styles.button, styles.close)}
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </>
      ) : null}
    </dialog>
  );
}
