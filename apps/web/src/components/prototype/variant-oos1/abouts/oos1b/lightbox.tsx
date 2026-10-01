import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import type { ABOUT_CAMPUS } from "../../about-data";
import { s } from "./shared";
import { layout, palette } from "./tokens.stylex";

export type CampusPhoto = (typeof ABOUT_CAMPUS.photos)[number];

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
    backgroundColor: palette.page,
    color: palette.ink,
    animationName: { default: null, [breakpoints.motionOk]: fadeIn },
    animationDuration: "240ms",
    animationTimingFunction: layout.ease,
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
    padding: { default: "64px 12px", [breakpoints.md]: "72px 104px" },
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    margin: 0,
    maxWidth: "100%",
    animationName: { default: null, [breakpoints.motionOk]: fadeIn },
    animationDuration: "200ms",
    animationTimingFunction: layout.ease,
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
    width: 48,
    height: 48,
    padding: 0,
    borderWidth: 0,
    borderRadius: "50%",
    backgroundColor: { default: "transparent", ":hover": palette.tint },
    color: palette.ink,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
    transitionTimingFunction: layout.ease,
  },
  prev: {
    top: "50%",
    insetInlineStart: { default: 12, [breakpoints.md]: 32 },
    marginTop: -24,
  },
  next: {
    top: "50%",
    insetInlineEnd: { default: 12, [breakpoints.md]: 32 },
    marginTop: -24,
  },
  close: {
    top: { default: 12, [breakpoints.md]: 24 },
    insetInlineEnd: { default: 12, [breakpoints.md]: 32 },
  },
});

export function Lightbox({
  photos,
  index,
  onClose,
  onStep,
}: {
  photos: readonly CampusPhoto[];
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
      const next = photos[(index + delta + photos.length) % photos.length];
      if (next) neighbor.src = next.large;
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
          <div
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
            {...stylex.props(styles.stage)}
          >
            <figure key={photo.id} {...stylex.props(styles.figure)}>
              <img src={photo.large} alt={photo.alt} {...stylex.props(styles.image)} />
              <figcaption {...stylex.props(s.caption)}>{photo.caption}</figcaption>
            </figure>
          </div>
          <button
            type="button"
            aria-label="上一张"
            onClick={() => onStep(-1)}
            {...stylex.props(styles.button, styles.prev, s.focusRing)}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="下一张"
            onClick={() => onStep(1)}
            {...stylex.props(styles.button, styles.next, s.focusRing)}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            {...stylex.props(styles.button, styles.close, s.focusRing)}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </>
      ) : null}
    </dialog>
  );
}
