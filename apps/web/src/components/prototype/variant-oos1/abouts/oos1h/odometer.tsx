import * as stylex from "@stylexjs/stylex";
import {
  animate,
  type AnimationPlaybackControls,
  m,
  type MotionValue,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "@/compat/motion";
import { createEffect, createMemo, For } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { shared } from "./shared";
import { font } from "./theme.stylex";

type Cell = { id: string; digit: number };

const ROLL_CELLS: readonly Cell[] = Array.from({ length: 22 }, (_, n) => ({
  id: `roll-${n}`,
  digit: n % 10,
}));
const WRAP_CELLS: readonly Cell[] = ROLL_CELLS.slice(0, 11);

const OVERSHOOT_CELLS = 0.5;
const ROLL_SECONDS = 0.9;
const DIGIT_STAGGER = 0.06;
const ROLL_EASE: [number, number, number, number] = [0.5, 0, 0.1, 1];
const CARRY_YEARS = 0.5;
const YEAR_FIRST = 1995;
const YEAR_LAST = 2026;

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "baseline",
    fontFamily: font.display,
    fontWeight: 800,
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1,
    letterSpacing: "-0.035em",
    whiteSpace: "nowrap",
  },
  digits: {
    display: "inline-flex",
    alignItems: "baseline",
  },
  window: {
    display: "inline-block",
    overflow: "hidden",
    height: "0.872em",
    verticalAlign: "baseline",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    willChange: "transform",
  },
  cell: {
    display: "block",
    height: "1em",
    lineHeight: "1em",
    textAlign: "center",
  },
  glyph: {
    display: "inline-block",
    paddingInline: "0.04em",
  },
});

function DigitColumn(props: { cell: MotionValue<number>; cells: readonly Cell[] }) {
  const y = useTransform(props.cell, (value) => `${(-value / props.cells.length) * 100}%`);
  return (
    <span {...stylex.attrs(styles.window)}>
      <m.span style={{ y }} {...stylex.attrs(styles.column)}>
        {props.cells.map((item) => (
          <span {...stylex.attrs(styles.cell)}>{item.digit}</span>
        ))}
      </m.span>
    </span>
  );
}

function RollDigit(props: { target: number; delay: number; inView: boolean; reduce: boolean }) {
  const cell = useMotionValue(10 + props.target);

  createEffect(
    () => [props.inView, props.reduce, props.target, props.delay] as const,
    ([inView, reduce, target, delay]) => {
      const end = 10 + target;
      if (reduce) {
        cell.set(end);
        return;
      }
      if (!inView) {
        cell.set(end);
        return;
      }
      let cancelled = false;
      let settle: AnimationPlaybackControls | undefined;
      cell.set(target);
      const roll = animate(cell, end + OVERSHOOT_CELLS, {
        duration: ROLL_SECONDS,
        delay,
        ease: ROLL_EASE,
      });
      void roll.finished.then(() => {
        if (cancelled) return;
        settle = animate(cell, end, { type: "spring", stiffness: 260, damping: 22, mass: 0.9 });
      });
      return () => {
        cancelled = true;
        roll.stop();
        settle?.stop();
      };
    },
  );

  return <DigitColumn cell={cell} cells={ROLL_CELLS} />;
}

type Part = { id: string; char: string; digit: number | null; order: number };

function toParts(value: string): Part[] {
  let order = 0;
  return Array.from(value).map((char, position) => {
    const isDigit = /\d/.test(char);
    const part: Part = {
      id: `${position}:${char}`,
      char,
      digit: isDigit ? Number(char) : null,
      order,
    };
    if (isDigit) order += 1;
    return part;
  });
}

export function Odometer(props: { value: string; delay?: number; sx?: stylex.StyleXStyles }) {
  let ref: HTMLSpanElement | undefined;
  const inView = useInView(() => ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const parts = createMemo(() => toParts(props.value));

  return (
    <span ref={ref} {...stylex.attrs(styles.root, props.sx)}>
      <span aria-hidden="true" {...stylex.attrs(styles.digits)}>
        <For each={parts()}>
          {(part) => {
            if (part.digit === null) {
              return <span {...stylex.attrs(styles.glyph)}>{part.char}</span>;
            }
            return (
              <RollDigit
                target={part.digit}
                delay={(props.delay ?? 0) + part.order * DIGIT_STAGGER}
                inView={inView()}
                reduce={reduce()}
              />
            );
          }}
        </For>
      </span>
      <span {...stylex.attrs(shared.srOnly)}>{props.value}</span>
    </span>
  );
}

function positionAt(year: number, place: number, snap: boolean) {
  const clamped = Math.min(YEAR_LAST, Math.max(YEAR_FIRST, year));
  const unit = 10 ** place;
  const whole = Math.floor(clamped / unit);
  const digit = whole % 10;
  if (snap) return digit;
  const boundary = (whole + 1) * unit;
  const carry = Math.min(1, Math.max(0, (clamped - (boundary - CARRY_YEARS)) / CARRY_YEARS));
  return digit + carry;
}

function YearDigit(props: { year: MotionValue<number>; place: number; snap: boolean }) {
  const cell = useTransform(() => positionAt(props.year.get(), props.place, props.snap));
  return <DigitColumn cell={cell} cells={WRAP_CELLS} />;
}

export function YearReadout(props: { progress: MotionValue<number>; sx?: stylex.StyleXStyles }) {
  const reduce = useReducedMotion();
  const raw = useTransform(
    props.progress,
    (value) => YEAR_FIRST + value * (YEAR_LAST - YEAR_FIRST),
  );
  const sprung = useSpring(raw, { stiffness: 150, damping: 15, mass: 0.7 });
  const year = useTransform(() => (reduce() ? raw.get() : sprung.get()));

  return (
    <span {...stylex.attrs(styles.root, props.sx)}>
      <span aria-hidden="true" {...stylex.attrs(styles.digits)}>
        <YearDigit year={year} place={3} snap={reduce()} />
        <YearDigit year={year} place={2} snap={reduce()} />
        <YearDigit year={year} place={1} snap={reduce()} />
        <YearDigit year={year} place={0} snap={reduce()} />
      </span>
    </span>
  );
}
