import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";

import { ABOUT_CULTURE } from "../../about-data";
import { ui } from "./layout";
import { PlateHead } from "./plate-head";
import { useEntry, type Phase } from "./strobe";
import { TICK, echoIndexes, strobe, trailOpacity } from "./strobe-values";
import { bp, face, tone } from "./tokens.stylex";

type Glyph = (typeof ABOUT_CULTURE.values)[number]["glyph"];

const EXPOSURE_PLAN: Record<Glyph, { echoes: number; unit: number; note: string }> = {
  专: { echoes: 1, unit: 0.2, note: "Double exposure" },
  静: { echoes: 0, unit: 0, note: "Single exposure" },
  新: { echoes: 4, unit: 0.26, note: "Five exposures" },
};

const DOUBLE_EXPOSURE_OPACITY = 0.3;
const TRAIL_BRIGHTEST = 0.4;

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 56, [bp.tablet]: 64, [bp.desktop]: 80 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  row: {
    rowGap: 20,
    alignItems: "center",
  },
  plate: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    aspectRatio: { default: "16 / 9", [bp.abovePhone]: "4 / 3" },
    backgroundColor: tone.white,
    boxShadow: "inset 0 0 0 1px rgba(11, 42, 92, 0.16)",
  },
  plateNote: {
    position: "absolute",
    right: 12,
    bottom: 12,
  },
  glyph: {
    position: "relative",
    display: "block",
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 92, [bp.tablet]: 76, [bp.desktop]: "clamp(84px, 7.4vw, 112px)" },
    lineHeight: 1,
    color: tone.navy,
    transform: "translate3d(var(--center), 0, 0)",
  },
  glyphEcho: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: "translate3d(var(--shift), 0, 0)",
  },
  glyphEchoInk: {
    opacity: "var(--o)",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 10, [bp.desktop]: 14 },
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 26, [bp.tablet]: 28, [bp.desktop]: 36 },
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  key: {
    color: tone.brand,
  },
  desc: {
    maxWidth: "27em",
  },
});

function KeyedTitle(props: { title: string; glyph: string }) {
  return props.title
    .split(props.glyph)
    .flatMap((part, index) =>
      index === 0 ? [part] : [<span {...stylex.attrs(styles.key)}>{props.glyph}</span>, part],
    );
}

function GlyphPlate(props: { glyph: Glyph; phase: Phase }) {
  const plan = EXPOSURE_PLAN[props.glyph];
  const echoes = echoIndexes(plan.echoes);
  return (
    <div aria-hidden="true" {...stylex.attrs(ui.q1, styles.plate)}>
      <span
        {...stylex.attrs(styles.glyph)}
        style={{ "--center": `${(plan.echoes * plan.unit) / 2}em` } as JSX.CSSProperties}
      >
        {echoes.map((k) => (
          <span
            {...stylex.attrs(
              styles.glyphEcho,
              props.phase === "armed" && strobe.hidden,
              props.phase === "fire" && strobe.pop,
            )}
            style={
              {
                "--shift": `${-k * plan.unit}em`,
                "--o":
                  plan.echoes === 1
                    ? DOUBLE_EXPOSURE_OPACITY
                    : trailOpacity(k, plan.echoes, TRAIL_BRIGHTEST),
                "--pop-at": `${(plan.echoes - k) * TICK}ms`,
              } as JSX.CSSProperties
            }
          >
            <span {...stylex.attrs(styles.glyphEchoInk)}>{props.glyph}</span>
          </span>
        ))}
        <span
          {...stylex.attrs(
            props.phase === "armed" && strobe.hidden,
            props.phase === "fire" && strobe.pop,
          )}
          style={{ "--pop-at": `${plan.echoes * TICK}ms` } as JSX.CSSProperties}
        >
          {props.glyph}
        </span>
      </span>
      <span lang="en" {...stylex.attrs(ui.frameNumber, styles.plateNote)}>
        {plan.note}
      </span>
    </div>
  );
}

function ValueRow(props: { value: (typeof ABOUT_CULTURE.values)[number] }) {
  const [ref, phase] = useEntry<HTMLLIElement>();
  return (
    <li ref={ref} {...stylex.attrs(ui.grid, styles.row)}>
      <GlyphPlate glyph={props.value.glyph} phase={phase()} />
      <div {...stylex.attrs(ui.q2to3, styles.text)}>
        <h3 {...stylex.attrs(styles.title)}>
          <KeyedTitle title={props.value.title} glyph={props.value.glyph} />
        </h3>
        <p {...stylex.attrs(ui.body, styles.desc)}>{props.value.desc}</p>
      </div>
    </li>
  );
}

export function Culture() {
  return (
    <section id="about-culture" aria-labelledby="oos1p-culture" {...stylex.attrs(ui.plate)}>
      <PlateHead plate={3} english="Culture" title={ABOUT_CULTURE.title} titleId="oos1p-culture" />
      <div {...stylex.attrs(ui.shell)}>
        <ol {...stylex.attrs(styles.list)}>
          {ABOUT_CULTURE.values.map((value) => (
            <ValueRow value={value} />
          ))}
        </ol>
      </div>
    </section>
  );
}
