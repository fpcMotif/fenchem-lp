import * as stylex from "@stylexjs/stylex";
import type { CSSProperties } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { CompanyName } from "./company-name";
import { SectionHead } from "./section-head";
import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const VERTEX = 360;
const LIFT = 350;
const COLUMN_U = [-0.4, -0.2, 0, 0.2, 0.4];
const RISE = COLUMN_U.map((u) => Math.round(LIFT * u * u));
const DROP = 56;

function arcPath() {
  let path = "";
  for (let x = 0; x <= 2000; x += 25) {
    const u = (x - 1000) / 1000;
    path += `${x === 0 ? "M" : "L"}${x} ${(VERTEX - LIFT * u * u).toFixed(2)}`;
  }
  return path;
}

const ARC = arcPath();

const styles = stylex.create({
  section: {
    position: "relative",
    overflow: "hidden",
    paddingTop: { default: 96, [bp.tablet]: 128, [bp.desktop]: 144 },
    paddingBottom: { default: 96, [bp.tablet]: 128, [bp.desktop]: 176 },
    scrollMarginTop: chrome.header,
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "flex-start", [bp.desktop]: "center" },
    textAlign: { default: "start", [bp.desktop]: "center" },
    marginTop: { default: 40, [bp.tablet]: 56, [bp.desktop]: 72 },
  },
  badge: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 15,
    letterSpacing: "0.12em",
    color: tone.blue,
  },
  name: {
    margin: 0,
    marginTop: 14,
    fontFamily: face.sans,
    fontWeight: 400,
    fontSize: { default: 28, [bp.tablet]: 36, [bp.desktop]: 44 },
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  english: {
    margin: 0,
    marginTop: 12,
    fontSize: 15,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  ringLabel: {
    margin: 0,
    marginTop: { default: 48, [bp.desktop]: 64 },
    display: "flex",
    justifyContent: { default: "flex-start", [bp.desktop]: "center" },
    alignItems: "baseline",
    gap: 10,
    fontFamily: face.sans,
    fontSize: 15,
    letterSpacing: "0.12em",
    color: tone.blue,
  },
  ringNote: {
    fontSize: 19,
    letterSpacing: 0,
  },
  ringRow: {
    position: "relative",
    marginTop: { default: 20, [bp.desktop]: 28 },
  },
  arc: {
    display: { default: "none", [bp.desktop]: "block" },
    position: "absolute",
    left: "-50%",
    width: "200%",
    top: DROP - VERTEX,
    height: VERTEX + 4,
    overflow: "visible",
    pointerEvents: "none",
  },
  list: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.tablet]: "repeat(2, minmax(0, 1fr))",
      [bp.desktop]: "repeat(5, minmax(0, 1fr))",
    },
    columnGap: { default: 24, [bp.desktop]: 20 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
    counterReset: "none",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "flex-start", [bp.desktop]: "center" },
    textAlign: { default: "start", [bp.desktop]: "center" },
    paddingBlock: { default: 18, [bp.desktop]: 0 },
    borderTopWidth: { default: 1, [bp.desktop]: 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  drop: {
    marginTop: { default: 0, [bp.desktop]: "var(--oos1o-drop)" },
  },
  node: {
    display: { default: "none", [bp.desktop]: "block" },
    width: 7,
    height: 7,
    marginTop: -3.5,
    borderRadius: "50%",
    backgroundColor: tone.navy,
  },
  tick: {
    display: { default: "none", [bp.desktop]: "block" },
    width: 1,
    height: 28,
    backgroundColor: "rgba(11, 42, 92, 0.3)",
  },
  index: {
    marginTop: { default: 0, [bp.desktop]: 16 },
    fontSize: 14,
    color: tone.blue,
  },
  subName: {
    margin: 0,
    marginTop: 8,
    fontFamily: face.sans,
    fontSize: { default: 17, [bp.laptop]: 16, [bp.wide]: 17 },
    lineHeight: 1.55,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  subEnglish: {
    margin: 0,
    marginTop: 6,
    fontSize: 13,
    lineHeight: 1.5,
    letterSpacing: "0.02em",
    color: tone.body,
  },
});

export function Structure() {
  const { holding, subsidiaries, subsidiaryBadge } = ABOUT_STRUCTURE;
  return (
    <section
      id="about-structure"
      aria-labelledby="oos1o-structure"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(ui.shell)}>
        <SectionHead id="oos1o-structure" label="Structure" title={ABOUT_STRUCTURE.title} quiet />
        <div {...stylex.props(styles.holding)}>
          <p {...stylex.props(styles.badge)}>{holding.badge}</p>
          <p {...stylex.props(styles.name)}>
            <CompanyName name={holding.name} />
          </p>
          <p lang="en" {...stylex.props(ui.latin, styles.english)}>
            {holding.english}
          </p>
        </div>
        <p {...stylex.props(styles.ringLabel)}>
          {subsidiaryBadge}
          <span lang="en" {...stylex.props(ui.serif, styles.ringNote)}>
            Wholly-owned
          </span>
        </p>
        <div {...stylex.props(styles.ringRow)}>
          <svg
            viewBox={`0 0 2000 ${VERTEX + 4}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            {...stylex.props(styles.arc)}
          >
            <path
              d={ARC}
              fill="none"
              stroke="#0b2a5c"
              strokeOpacity={0.4}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol {...stylex.props(styles.list)}>
            {subsidiaries.map((subsidiary, index) => (
              <li
                key={subsidiary.id}
                {...stylex.props(styles.item, styles.drop)}
                style={{ "--oos1o-drop": `${DROP - RISE[index]}px` } as CSSProperties}
              >
                <span aria-hidden="true" {...stylex.props(styles.node)} />
                <span aria-hidden="true" {...stylex.props(styles.tick)} />
                <span aria-hidden="true" {...stylex.props(ui.latin, styles.index)}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p {...stylex.props(styles.subName)}>
                  <CompanyName name={subsidiary.name} />
                </p>
                <p lang="en" {...stylex.props(ui.latin, styles.subEnglish)}>
                  {subsidiary.english}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
