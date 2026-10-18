import * as stylex from "@stylexjs/stylex";
import { useInView } from "@/compat/motion";
import { For } from "solid-js";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";
import { ease, media, palette } from "./lattice.stylex";
import { shared } from "./parts-values";

type Tone = "light" | "dark";
type Strength = "full" | "quiet" | "none";

const LINE_COUNT = 17;
const LINE_STEP_MS = 26;
const SLIP_LINE = 11;
const REVEAL_STEP_MS = 80;
const REVEAL_MAX_STEPS = 4;

const ALL_LINES = Array.from({ length: LINE_COUNT }, (_, index) => index);
const MAJOR_LINES = [0, 4, 8, 12, 16] as const;

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
  line: (left: string, ms: number) => ({ left, transitionDelay: `${ms}ms` }),
});

const styles = stylex.create({
  frameShell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: {
      default: 16,
      [media.mdOnly]: 32,
      [media.lgOnly]: 56,
      ["@media (min-width: 1280px)"]: "min(124px, 8.611vw)",
    },
  },
  frameInner: {
    position: "relative",
    isolation: "isolate",
  },
  lattice: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    pointerEvents: "none",
  },
  line: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
  },
  lineMinor: {
    display: { default: "none", ["@media (min-width: 1024px)"]: "block" },
  },
  lineDraw: {
    transformOrigin: "top",
    transitionProperty: "transform",
    transitionDuration: "1300ms",
    transitionTimingFunction: ease.out,
  },
  lineHidden: {
    transform: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: "scaleY(0)" },
  },
  lineLight: { backgroundColor: palette.inkHair },
  lineLightMajor: { backgroundColor: palette.inkRule },
  lineDark: { backgroundColor: palette.paleHair },
  lineDarkMajor: { backgroundColor: palette.paleRule },
  lineSlip: { backgroundColor: palette.blueLine },
  reveal: {
    opacity: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: 0 },
    transform: {
      default: null,
      ["@media (prefers-reduced-motion: no-preference)"]: "translateY(24px)",
    },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: ease.out,
  },
  revealShown: {
    opacity: 1,
    transform: "none",
  },
});

export function Lattice(props: {
  strength?: Exclude<Strength, "none">;
  tone?: Tone;
  slip?: boolean;
}) {
  let ref: HTMLDivElement | undefined;
  const shown = useInView(() => ref, { once: true, margin: "0px 0px -12% 0px" });
  const full = () => (props.strength ?? "quiet") === "full";
  const dark = () => (props.tone ?? "light") === "dark";
  const lines = () => (full() ? ALL_LINES : MAJOR_LINES);

  return (
    <div ref={ref} aria-hidden="true" {...stylex.attrs(styles.lattice)}>
      <For each={lines()}>
        {(index) => {
          const major = index % 4 === 0;
          const slipped = () => full() && (props.slip ?? false) && index === SLIP_LINE;
          const edge = index === LINE_COUNT - 1 ? "calc(100% - 1px)" : `${(index / 16) * 100}%`;
          return (
            <span
              {...sxProps(
                styles.line,
                !major && styles.lineMinor,
                dark()
                  ? major
                    ? styles.lineDarkMajor
                    : styles.lineDark
                  : major
                    ? styles.lineLightMajor
                    : styles.lineLight,
                full() && styles.lineDraw,
                full() && !shown() && styles.lineHidden,
                slipped() && styles.lineSlip,
                dynamic.line(
                  slipped() ? `calc(${edge} + 3px)` : edge,
                  full() ? index * LINE_STEP_MS : 0,
                ),
              )}
            />
          );
        }}
      </For>
    </div>
  );
}

export function Frame(props: {
  lattice?: Strength;
  tone?: Tone;
  slip?: boolean;
  sx?: stylex.StyleXStyles;
  innerSx?: stylex.StyleXStyles;
  children?: JSX.Element;
}) {
  const lattice = () => props.lattice ?? "none";
  return (
    <div {...stylex.attrs(styles.frameShell, props.sx)}>
      <div {...stylex.attrs(styles.frameInner, props.innerSx)}>
        {lattice() === "none" ? null : (
          <Lattice
            strength={lattice() as Exclude<Strength, "none">}
            tone={props.tone ?? "light"}
            slip={props.slip ?? false}
          />
        )}
        {props.children}
      </div>
    </div>
  );
}

export function Reveal(props: {
  children: JSX.Element;
  step?: number;
  as?: "div" | "li" | "article" | "figure";
  sx?: stylex.StyleXStyles;
}) {
  const Tag = dynamicTag(() => props.as ?? "div");
  let ref: HTMLElement | undefined;
  const shown = useInView(() => ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <Tag
      ref={(el: HTMLElement) => (ref = el)}
      {...stylex.attrs(
        styles.reveal,
        shown() && styles.revealShown,
        dynamic.delay(Math.min(props.step ?? 0, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
        props.sx,
      )}
    >
      {props.children}
    </Tag>
  );
}

export function SectionName(props: { id: string; children: string }) {
  return (
    <h2 id={props.id} {...stylex.attrs(shared.srOnly)}>
      {props.children}
    </h2>
  );
}

export function Action(props: {
  kind?: "primary" | "outline";
  onClick: () => void;
  children: JSX.Element;
  icon?: JSX.Element;
}) {
  return (
    <button
      type="button"
      onClick={() => props.onClick()}
      {...stylex.attrs(
        shared.button,
        (props.kind ?? "primary") === "primary" ? shared.buttonPrimary : shared.buttonOutline,
        shared.focusRing,
      )}
    >
      <span>{props.children}</span>
      {props.icon}
    </button>
  );
}
