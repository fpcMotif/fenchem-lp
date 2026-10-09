import { LightboxStage } from "../../../shared/lightbox-stage";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { PLACE, WORKS, ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

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
    backgroundColor: tone.stone,
    color: tone.ink,
    animationName: fadeIn,
    animationDuration: "260ms",
    animationTimingFunction: chrome.ease,
    "::backdrop": { backgroundColor: "transparent" },
  },
  room: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: { default: 20, [bp.desktop]: 28 },
    boxSizing: "border-box",
    padding: {
      default: "72px 16px 96px",
      [bp.tablet]: "88px 72px 112px",
      [bp.desktop]: "88px 120px",
    },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { default: 18, [bp.desktop]: 24 },
    margin: 0,
    maxWidth: "100%",
    animationName: fadeIn,
    animationDuration: "220ms",
    animationTimingFunction: chrome.ease,
  },
  frame: {
    padding: { default: 10, [bp.desktop]: 18 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.lineStrong,
    backgroundColor: tone.paper,
    maxWidth: "100%",
    boxSizing: "border-box",
  },
  image: {
    display: "block",
    maxWidth: "100%",
    maxHeight: { default: "calc(100dvh - 300px)", [bp.desktop]: "calc(100dvh - 300px)" },
    width: "auto",
    height: "auto",
  },
  label: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 14,
    rowGap: 2,
    margin: 0,
  },
  number: {
    fontSize: 22,
    color: tone.navy,
  },
  title: {
    fontFamily: face.sans,
    fontSize: 15,
  },
  meta: {
    fontSize: 16,
    color: tone.body,
  },
  control: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: tone.line, ":hover": tone.navy },
    backgroundColor: { default: tone.paper, ":hover": tone.navy },
    color: { default: tone.navy, ":hover": tone.paper },
    transitionProperty: "background-color, color, border-color",
    transitionDuration: "160ms",
  },
  prev: {
    bottom: { default: 24, [bp.desktop]: "auto" },
    top: { default: "auto", [bp.desktop]: "50%" },
    left: { default: "calc(50% - 56px)", [bp.desktop]: 40 },
    marginTop: { default: 0, [bp.desktop]: -24 },
  },
  next: {
    bottom: { default: 24, [bp.desktop]: "auto" },
    top: { default: "auto", [bp.desktop]: "50%" },
    left: { default: "calc(50% + 8px)", [bp.desktop]: "auto" },
    right: { default: "auto", [bp.desktop]: 40 },
    marginTop: { default: 0, [bp.desktop]: -24 },
  },
  close: {
    top: { default: 16, [bp.desktop]: 28 },
    right: { default: 16, [bp.desktop]: 40 },
  },
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
  const work = index === null ? null : WORKS[index];

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
      neighbor.src = WORKS[(index + delta + WORKS.length) % WORKS.length].large;
    }
  }, [index]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="园区影像"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        onStep(event.key === "ArrowRight" ? 1 : -1);
      }}
      {...stylex.props(styles.dialog)}
    >
      {work ? (
        <>
          <LightboxStage onClose={onClose} sx={styles.room}>
            <figure key={stepped ? work.id : "open"} {...stylex.props(styles.figure)}>
              <div {...stylex.props(styles.frame)}>
                <img src={work.large} alt={work.alt} {...stylex.props(styles.image)} />
              </div>
              <figcaption {...stylex.props(styles.label)}>
                <span lang="en" {...stylex.props(ui.number, styles.number)}>
                  Nº {work.number}
                </span>
                <span {...stylex.props(styles.title)}>{work.caption}</span>
                <span lang="en" {...stylex.props(ui.italic, styles.meta)}>
                  {work.english}, {PLACE}
                </span>
              </figcaption>
            </figure>
          </LightboxStage>
          <button
            type="button"
            aria-label="上一幅"
            onClick={() => onStep(-1)}
            {...stylex.props(ui.button, ui.focus, styles.control, styles.prev)}
          >
            <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="下一幅"
            onClick={() => onStep(1)}
            {...stylex.props(ui.button, ui.focus, styles.control, styles.next)}
          >
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            {...stylex.props(ui.button, ui.focus, styles.control, styles.close)}
          >
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </>
      ) : null}
    </dialog>
  );
}
