import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { ChartHeading, useDusk } from "./shared";
import { ui } from "./shared-values";
import { bp, face, sky } from "./tokens.stylex";

const WIDTH = 1200;
const HEIGHT = 680;
const FOCUS = { x: 260, y: 350 };
const TOP_ROW = 92;
const BOTTOM_ROW = 604;
const LETTERS = ["b", "c", "d", "e", "f"] as const;
const SEMI_MAJOR = [150, 250, 350, 450, 560] as const;
const ANOMALY = [110, -50, 75, -25, 18] as const;
const SLOT = [0.04, 0.36, 0.4, 0.7, 0.72] as const;
const ROW = ["bottom", "top", "bottom", "top", "bottom"] as const;
const HOLDING_SLOT = 0;

type Row = "top" | "bottom";

const round = (value: number) => Math.round(value * 10) / 10;

const ORBITS = ABOUT_STRUCTURE.subsidiaries.map((subsidiary, index) => {
  const a = SEMI_MAJOR[index];
  const cx = FOCUS.x + 0.6 * a;
  const ry = 0.4 * a;
  const t = (ANOMALY[index] * Math.PI) / 180;
  return {
    ...subsidiary,
    letter: LETTERS[index],
    cx,
    rx: a,
    ry,
    x: round(cx + a * Math.cos(t)),
    y: round(FOCUS.y + ry * Math.sin(t)),
    slot: SLOT[index],
    row: ROW[index] as Row,
  };
});

function leader(x: number, y: number, slot: number, row: Row) {
  const level = row === "top" ? TOP_ROW : BOTTOM_ROW;
  return `M${x} ${y}V${level}H${slot * WIDTH}`;
}

const styles = stylex.create({
  head: {
    display: "flex",
    flexDirection: { default: "column", [bp.desktop]: "row" },
    justifyContent: "space-between",
    alignItems: { default: "flex-start", [bp.desktop]: "flex-end" },
    gap: 24,
    marginBottom: { default: 40, [bp.tablet]: 48, [bp.desktop]: 56 },
  },
  legend: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    margin: 0,
    fontFamily: face.sans,
    fontSize: 15,
    color: sky.text,
  },
  legendItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
  },
  legendDot: {
    borderRadius: "50%",
    backgroundColor: sky.star,
  },
  legendPrimary: { width: 10, height: 10 },
  legendPlanet: { width: 6, height: 6, opacity: 0.85 },
  legendLetter: {
    fontSize: 20,
    color: sky.star,
  },
  plot: {
    position: "relative",
    height: { default: 300, [bp.tablet]: 560, [bp.desktop]: HEIGHT },
  },
  drawing: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  orbit: {
    fill: "none",
    stroke: sky.tint,
    strokeOpacity: 0.26,
    strokeWidth: 1,
    transitionProperty: "stroke-opacity",
    transitionDuration: "300ms",
  },
  orbitLit: {
    strokeOpacity: 0.75,
  },
  leader: {
    display: { default: "none", [bp.wideUp]: "inline" },
    fill: "none",
    stroke: sky.tint,
    strokeOpacity: 0.4,
    strokeWidth: 1,
  },
  body: {
    fill: "none",
    strokeLinecap: "round",
  },
  primary: {
    stroke: sky.star,
    strokeWidth: { default: 9, [bp.wideUp]: 11 },
  },
  planet: {
    stroke: sky.tint,
    strokeWidth: { default: 5, [bp.wideUp]: 7 },
  },
  labels: {
    display: { default: "none", [bp.wideUp]: "block" },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  label: {
    position: "absolute",
    display: { default: "none", [bp.wideUp]: "grid" },
    gridTemplateColumns: "auto auto",
    justifyContent: "start",
    columnGap: 10,
    rowGap: 2,
    margin: 0,
    paddingInline: 4,
    whiteSpace: "nowrap",
    textShadow: `0 0 6px ${sky.night}, 0 0 12px ${sky.night}`,
  },
  labelTop: {
    paddingBottom: 10,
  },
  labelBottom: {
    paddingTop: 10,
  },
  letter: {
    gridRow: "1 / span 3",
    fontSize: { default: 22, [bp.desktop]: 26 },
    lineHeight: "26px",
    color: sky.text,
    transitionProperty: "color",
    transitionDuration: "300ms",
  },
  letterLit: {
    color: sky.star,
  },
  badge: {
    lineHeight: "18px",
  },
  name: {
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 17 },
    lineHeight: "26px",
    letterSpacing: "0.03em",
    color: sky.star,
  },
  holdingName: {
    fontSize: { default: 17, [bp.desktop]: 20 },
    fontWeight: 500,
  },
  english: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 15, [bp.desktop]: 17 },
    lineHeight: "22px",
    color: sky.muted,
  },
  tags: {
    display: { default: "block", [bp.wideUp]: "none" },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  tag: {
    position: "absolute",
    fontSize: 18,
    lineHeight: 1,
    color: sky.star,
    transform: "translate(6px, -120%)",
  },
  key: {
    display: { default: "flex", [bp.wideUp]: "none" },
    flexDirection: "column",
    margin: 0,
    marginTop: 32,
    padding: 0,
    listStyleType: "none",
  },
  keyItem: {
    display: "grid",
    gridTemplateColumns: "28px minmax(0, 1fr)",
    columnGap: 12,
    rowGap: 2,
    paddingBlock: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: sky.hair,
  },
});

const place = stylex.create({
  top: (left: string, bottom: string) => ({ left, bottom }),
  bottom: (left: string, top: string) => ({ left, top }),
  tag: (left: string, top: string) => ({ left, top }),
});

const percentX = (value: number) => `${(value / WIDTH) * 100}%`;
const percentY = (value: number) => `${(value / HEIGHT) * 100}%`;

function slotPlace(slot: number, row: Row) {
  return row === "top"
    ? place.top(`${slot * 100}%`, `${100 - (TOP_ROW / HEIGHT) * 100}%`)
    : place.bottom(`${slot * 100}%`, percentY(BOTTOM_ROW));
}

export function Structure() {
  const [lit, setLit] = useState<string | null>(null);
  const [plotRef, hidden] = useDusk<HTMLDivElement>();
  const { holding, subsidiaries, subsidiaryBadge, subsidiaryBadgeEnglish } = ABOUT_STRUCTURE;

  return (
    <section
      id="about-structure"
      aria-labelledby="oos1k-structure"
      {...stylex.props(ui.section, ui.shell)}
    >
      <div {...stylex.props(styles.head)}>
        <ChartHeading
          id="oos1k-structure"
          numeral="VI"
          label="Structure"
          title={ABOUT_STRUCTURE.title}
          note="A primary and five companions"
        />
        <p {...stylex.props(styles.legend)}>
          <span {...stylex.props(styles.legendItem)}>
            <span aria-hidden="true" {...stylex.props(styles.legendDot, styles.legendPrimary)} />
            <span {...stylex.props(ui.designation, styles.legendLetter)}>A</span>
            {holding.badge}
          </span>
          <span {...stylex.props(styles.legendItem)}>
            <span aria-hidden="true" {...stylex.props(styles.legendDot, styles.legendPlanet)} />
            <span {...stylex.props(ui.designation, styles.legendLetter)}>b–f</span>
            {subsidiaryBadge}
          </span>
        </p>
      </div>

      <div ref={plotRef} {...stylex.props(styles.plot)}>
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          {...stylex.props(styles.drawing)}
        >
          {ORBITS.map((orbit, index) => (
            <ellipse
              key={orbit.id}
              cx={orbit.cx}
              cy={FOCUS.y}
              rx={orbit.rx}
              ry={orbit.ry}
              vectorEffect="non-scaling-stroke"
              {...stylex.props(
                styles.orbit,
                lit === orbit.id && styles.orbitLit,
                ui.dim,
                hidden && ui.dimHidden,
                ui.dimDelay(200 + index * 140),
              )}
            />
          ))}
          <path
            d={`${leader(FOCUS.x, FOCUS.y, HOLDING_SLOT, "top")}${ORBITS.map((orbit) => leader(orbit.x, orbit.y, orbit.slot, orbit.row)).join("")}`}
            vectorEffect="non-scaling-stroke"
            {...stylex.props(styles.leader, ui.dim, hidden && ui.dimHidden, ui.dimDelay(1100))}
          />
          <path
            d={ORBITS.map((orbit) => `M${orbit.x} ${orbit.y}h0`).join("")}
            vectorEffect="non-scaling-stroke"
            {...stylex.props(
              styles.body,
              styles.planet,
              ui.dim,
              hidden && ui.dimHidden,
              ui.dimDelay(900),
            )}
          />
          <path
            d={`M${FOCUS.x} ${FOCUS.y}h0`}
            vectorEffect="non-scaling-stroke"
            {...stylex.props(styles.body, styles.primary)}
          />
        </svg>

        <p {...stylex.props(styles.label, styles.labelTop, slotPlace(HOLDING_SLOT, "top"))}>
          <span {...stylex.props(ui.designation, styles.letter, styles.letterLit)}>A</span>
          <span {...stylex.props(ui.label, styles.badge)}>{holding.badge}</span>
          <span {...stylex.props(styles.name, styles.holdingName)}>{holding.name}</span>
          <span lang="en" {...stylex.props(styles.english)}>
            {holding.english}
          </span>
        </p>
        <ul aria-label={subsidiaryBadgeEnglish} {...stylex.props(styles.labels)}>
          {ORBITS.map((orbit) => (
            <li
              key={orbit.id}
              onPointerEnter={() => setLit(orbit.id)}
              onPointerLeave={() => setLit(null)}
              {...stylex.props(
                styles.label,
                orbit.row === "top" ? styles.labelTop : styles.labelBottom,
                slotPlace(orbit.slot, orbit.row),
              )}
            >
              <span
                {...stylex.props(
                  ui.designation,
                  styles.letter,
                  lit === orbit.id && styles.letterLit,
                )}
              >
                {orbit.letter}
              </span>
              <span {...stylex.props(styles.name)}>{orbit.name}</span>
              <span lang="en" {...stylex.props(styles.english)}>
                {orbit.english}
              </span>
            </li>
          ))}
        </ul>

        <ul aria-hidden="true" {...stylex.props(styles.tags)}>
          <li
            {...stylex.props(
              ui.designation,
              styles.tag,
              place.tag(percentX(FOCUS.x), percentY(FOCUS.y)),
            )}
          >
            A
          </li>
          {ORBITS.map((orbit) => (
            <li
              key={orbit.id}
              {...stylex.props(
                ui.designation,
                styles.tag,
                place.tag(percentX(orbit.x), percentY(orbit.y)),
              )}
            >
              {orbit.letter}
            </li>
          ))}
        </ul>
      </div>

      <ul {...stylex.props(styles.key)}>
        <li {...stylex.props(styles.keyItem)}>
          <span {...stylex.props(ui.designation, styles.letter, styles.letterLit)}>A</span>
          <span {...stylex.props(styles.name, styles.holdingName)}>{holding.name}</span>
          <span lang="en" {...stylex.props(styles.english)}>
            {holding.english}
          </span>
        </li>
        {subsidiaries.map((subsidiary, index) => (
          <li key={subsidiary.id} {...stylex.props(styles.keyItem)}>
            <span {...stylex.props(ui.designation, styles.letter)}>{LETTERS[index]}</span>
            <span {...stylex.props(styles.name)}>{subsidiary.name}</span>
            <span lang="en" {...stylex.props(styles.english)}>
              {subsidiary.english}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
