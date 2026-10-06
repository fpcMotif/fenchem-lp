import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import type { Plate } from "./journey";
import { Tag, ui } from "./shared";
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

export function Lightbox({
  plates,
  index,
  stepped,
  onClose,
  onStep,
}: {
  plates: readonly Plate[];
  index: number | null;
  stepped: boolean;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const plate = index === null ? null : plates[index];

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
      neighbor.src = plates[(index + delta + plates.length) % plates.length].large;
    }
  }, [index, plates]);

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
      {plate && index !== null ? (
        <>
          <div
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
            {...stylex.props(styles.stage)}
          >
            <figure key={plate.id} {...stylex.props(styles.figure)}>
              <div {...stylex.props(styles.frame, stepped && styles.stepped)}>
                <Tag numeral={plate.numeral} />
                <img src={plate.large} alt={plate.alt} {...stylex.props(styles.image)} />
              </div>
              <figcaption {...stylex.props(styles.caption)}>
                <span {...stylex.props(styles.chinese)}>{plate.caption}</span>
                <span lang="en" {...stylex.props(ui.serif, styles.english)}>
                  {plate.english}
                </span>
                <span {...stylex.props(styles.count)}>
                  {index + 1} / {plates.length}
                </span>
              </figcaption>
            </figure>
          </div>
          <button
            type="button"
            aria-label="上一张"
            onClick={() => onStep(-1)}
            {...stylex.props(styles.button, ui.focusRing, styles.prev)}
          >
            <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="下一张"
            onClick={() => onStep(1)}
            {...stylex.props(styles.button, ui.focusRing, styles.next)}
          >
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            {...stylex.props(styles.button, ui.focusRing, styles.close)}
          >
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </>
      ) : null}
    </dialog>
  );
}
