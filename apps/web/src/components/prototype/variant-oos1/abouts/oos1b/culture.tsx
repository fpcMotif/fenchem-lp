import * as stylex from "@stylexjs/stylex";
import { useState, type ReactNode } from "react";

import { ABOUT_CULTURE } from "../../about-data";
import { ROMAN, SectionHead, Tag, bevel, stepIn, ui, useArrived } from "./shared";
import { bp, face, motion, space, tone } from "./tokens.stylex";

const band = `calc(${space.square} / 6)`;

const styles = stylex.create({
  stage: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.desktop]: `${space.square} minmax(0, 1fr)`,
    },
    alignItems: "center",
    justifyItems: { default: "center", [bp.desktop]: "stretch" },
    columnGap: { default: 0, [bp.laptop]: 64, [bp.wide]: 112 },
    rowGap: { default: 40, [bp.tablet]: 56 },
  },
  seal: {
    position: "relative",
    width: space.square,
    height: space.square,
  },
  level: {
    position: "absolute",
    boxSizing: "border-box",
    backgroundColor: tone.page,
  },
  outer: {
    inset: 0,
    boxShadow:
      "0 0 0 1px rgba(26, 26, 26, 0.07), 0 1px 1px rgba(11, 42, 92, 0.04), 0 30px 60px -44px rgba(11, 42, 92, 0.32)",
  },
  nested: {
    inset: band,
  },
  centre: {
    backgroundColor: tone.whisper,
  },
  ring: {
    position: "absolute",
    inset: -1,
    pointerEvents: "none",
    boxShadow: "inset 0 0 0 1px transparent",
    transitionProperty: "box-shadow",
    transitionDuration: "320ms",
    transitionTimingFunction: motion.ease,
  },
  ringOn: {
    boxShadow: `inset 0 0 0 1px ${tone.navy}`,
  },
  glyphSlot: {
    position: "absolute",
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  slotTop: {
    top: 0,
    height: band,
  },
  slotBottom: {
    bottom: 0,
    height: band,
  },
  slotCentre: {
    top: 0,
    bottom: 0,
  },
  glyph: {
    fontFamily: face.sans,
    fontWeight: 500,
    lineHeight: 1,
    color: tone.navy,
    transitionProperty: "color",
    transitionDuration: "320ms",
    transitionTimingFunction: motion.ease,
  },
  glyphOn: {
    color: tone.blue,
  },
  glyph0: { fontSize: `calc(${space.square} / 12)` },
  glyph1: { fontSize: `calc(${space.square} / 13)` },
  glyph2: { fontSize: `calc(${space.square} / 7)` },
  legend: {
    width: "100%",
    maxWidth: { default: space.square, [bp.desktop]: 520 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  item: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    alignItems: "baseline",
    columnGap: { default: 18, [bp.desktop]: 28 },
    paddingBlock: { default: 24, [bp.tablet]: 28, [bp.desktop]: 32 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.ruleFaint,
  },
  itemLast: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.ruleFaint,
  },
  mark: {
    position: "absolute",
    top: -1,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: tone.navy,
    transformOrigin: "left center",
    transform: "scaleX(0)",
    transitionProperty: "transform",
    transitionDuration: "520ms",
    transitionTimingFunction: motion.ease,
  },
  markOn: {
    transform: "scaleX(1)",
  },
  numeral: {
    minWidth: "2.2em",
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.12em",
    color: tone.quiet,
    transitionProperty: "color",
    transitionDuration: "320ms",
  },
  numeralOn: {
    color: tone.navy,
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 19, [bp.wide]: 21 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
  desc: {
    gridColumn: 2,
    margin: 0,
    marginTop: { default: 10, [bp.desktop]: 12 },
    maxWidth: "26em",
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.wide]: 16 },
    lineHeight: 1.85,
    color: tone.body,
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
});

const LEVEL_PLACEMENT = [
  styles.outer,
  [styles.nested, bevel.edge],
  [styles.nested, bevel.edge, styles.centre],
] as const;
const GLYPH_SLOT = [styles.slotTop, styles.slotBottom, styles.slotCentre] as const;
const GLYPH_SIZE = [styles.glyph0, styles.glyph1, styles.glyph2] as const;

function Level({
  depth,
  arrived,
  active,
  onPoint,
  children,
}: {
  depth: number;
  arrived: boolean;
  active: number | null;
  onPoint: (depth: number) => void;
  children?: ReactNode;
}) {
  const on = active === depth;
  return (
    <div
      onPointerOver={(event) => {
        event.stopPropagation();
        onPoint(depth);
      }}
      {...stylex.props(styles.level, LEVEL_PLACEMENT[depth], ...stepIn(arrived, depth))}
    >
      <Tag numeral={ROMAN[depth]} />
      <span {...stylex.props(styles.glyphSlot, GLYPH_SLOT[depth])}>
        <span {...stylex.props(styles.glyph, GLYPH_SIZE[depth], on && styles.glyphOn)}>
          {ABOUT_CULTURE.values[depth].glyph}
        </span>
      </span>
      {children}
      <span {...stylex.props(styles.ring, on && styles.ringOn)} />
    </div>
  );
}

export function Culture() {
  const [ref, arrived] = useArrived<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);
  const lastIndex = ABOUT_CULTURE.values.length - 1;
  return (
    <section
      id="about-culture"
      aria-labelledby="oos1b-culture"
      {...stylex.props(ui.anchor, ui.section, ui.shell)}
    >
      <SectionHead
        id="oos1b-culture"
        index={3}
        eyebrow="Culture"
        title={ABOUT_CULTURE.title}
        note="Three values, the newest at the centre."
      />
      <div ref={ref} {...stylex.props(styles.stage)}>
        <div
          aria-hidden="true"
          onPointerLeave={() => setActive(null)}
          {...stylex.props(styles.seal)}
        >
          <Level depth={0} arrived={arrived} active={active} onPoint={setActive}>
            <Level depth={1} arrived={arrived} active={active} onPoint={setActive}>
              <Level depth={2} arrived={arrived} active={active} onPoint={setActive} />
            </Level>
          </Level>
        </div>
        <ol {...stylex.props(styles.legend)}>
          {ABOUT_CULTURE.values.map((value, index) => {
            const on = active === index;
            return (
              <li
                key={value.title}
                onPointerEnter={() => setActive(index)}
                onPointerLeave={() => setActive(null)}
                {...stylex.props(
                  styles.item,
                  index === lastIndex && styles.itemLast,
                  ...stepIn(arrived, index + 1),
                )}
              >
                <span aria-hidden="true" {...stylex.props(styles.mark, on && styles.markOn)} />
                <span lang="en" {...stylex.props(styles.numeral, on && styles.numeralOn)}>
                  {ROMAN[index]}
                </span>
                <h3 {...stylex.props(styles.title)}>{value.title}</h3>
                <p {...stylex.props(styles.desc)}>{value.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
