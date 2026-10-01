import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

import { base } from "./shared";
import { font, hue, size } from "./theme.stylex";

const REVEAL_STEP_MS = 90;
const REVEAL_MAX_STEPS = 4;

const reveal = stylex.create({
  hidden: {
    opacity: { default: 1, [breakpoints.motionOk]: 0 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(24px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: size.ease,
  },
  shown: {
    opacity: 1,
    transform: "none",
  },
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function Reveal({
  children,
  step = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Tag
      ref={ref}
      {...stylex.props(
        reveal.hidden,
        shown && reveal.shown,
        reveal.delay(Math.min(step, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionName({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} {...stylex.props(base.srOnly)}>
      {children}
    </h2>
  );
}

const monument = stylex.create({
  frame: {
    position: "absolute",
    display: "block",
    margin: 0,
    pointerEvents: "none",
    userSelect: "none",
    fontFamily: font.display,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.055em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  ghost: {
    color: hue.ghost,
  },
  photo: {
    color: "transparent",
    backgroundColor: hue.glyphBlue,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  photoFill: (image: string, position: string) => ({
    backgroundImage: image,
    backgroundPosition: position,
  }),
});

export function Monument({
  text,
  sx,
  photo,
  photoPosition = "50% 50%",
}: {
  text: string;
  sx: stylex.StyleXStyles;
  photo?: string;
  photoPosition?: string;
}) {
  const image =
    photo === undefined
      ? ""
      : `linear-gradient(rgba(11, 42, 92, 0.28), rgba(11, 42, 92, 0.28)), url(${photo})`;
  return (
    <span
      aria-hidden="true"
      lang="en"
      {...stylex.props(
        monument.frame,
        photo === undefined ? monument.ghost : monument.photo,
        photo !== undefined && monument.photoFill(image, `0 0, ${photoPosition}`),
        sx,
      )}
    >
      {text}
    </span>
  );
}
