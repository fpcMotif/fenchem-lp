import { LightboxControls } from "../../../shared/lightbox-controls";
import { LightboxDialog, type LightboxState } from "../../../shared/lightbox";
import { LightboxStage } from "../../../shared/lightbox-stage";

import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { ABOUT_CAMPUS } from "../../about-data";
import { font, motionCss, tone } from "./tokens.stylex";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const zoomIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "scale(0.96)" },
  "100%": { opacity: 1, transform: "none" },
});

const s = stylex.create({
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
    backgroundColor: tone.shade,
    color: colors.paper,
    animationName: fadeIn,
    animationDuration: "240ms",
    animationTimingFunction: motionCss.out,
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
    alignItems: "stretch",
    gap: 14,
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: motionCss.out,
  },
  figureOpen: {
    animationName: { default: fadeIn, [breakpoints.motionOk]: zoomIn },
    animationDuration: "260ms",
  },
  figureStep: {
    animationName: fadeIn,
    animationDuration: "180ms",
  },
  image: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: "calc(100dvh - 200px)",
    width: "auto",
    height: "auto",
    marginInline: "auto",
  },
  caption: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.shadeRule,
    fontFamily: font.cjk,
    fontSize: 15,
    letterSpacing: "0.1em",
    color: tone.shadeText,
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
    borderColor: tone.shadeRule,
    borderRadius: 0,
    backgroundColor: { default: "transparent", ":hover": "rgba(255, 255, 255, 0.1)" },
    color: colors.paper,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
    transitionTimingFunction: motionCss.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 3,
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

export function Lightbox({ lightbox }: { lightbox: LightboxState }) {
  const { stepped, close: onClose, step: onStep } = lightbox;
  const photos = ABOUT_CAMPUS.photos;

  return (
    <LightboxDialog lightbox={lightbox} items={photos} sx={s.dialog}>
      {(photo) => (
        <>
          <LightboxStage onClose={onClose} sx={s.stage}>
            <figure
              key={photo.id}
              {...stylex.props(s.figure, stepped ? s.figureStep : s.figureOpen)}
            >
              <img src={photo.large} alt={photo.alt} {...stylex.props(s.image)} />
              <figcaption {...stylex.props(s.caption)}>{photo.caption}</figcaption>
            </figure>
          </LightboxStage>
          <LightboxControls
            onStep={onStep}
            onClose={onClose}
            previous={{
              icon: <ChevronLeft size={22} aria-hidden="true" />,
              sx: [s.button, s.prev],
            }}
            next={{ icon: <ChevronRight size={22} aria-hidden="true" />, sx: [s.button, s.next] }}
            close={{ icon: <X size={22} aria-hidden="true" />, sx: [s.button, s.close] }}
          />
        </>
      )}
    </LightboxDialog>
  );
}
