import * as stylex from "@stylexjs/stylex";
import { ArrowDown } from "lucide-react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { RoomSign } from "./room-sign";
import { sectionTitle, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  plan: {
    position: "relative",
    display: "flex",
    flexDirection: { default: "row", [bp.tablet]: "row", [bp.desktop]: "column-reverse" },
    width: "min(100%, 1120px)",
    boxSizing: "border-box",
    marginInline: "auto",
    marginTop: { default: 56, [bp.tablet]: 72, [bp.desktop]: 96 },
    marginBottom: 56,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.lineStrong,
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: tone.lineStrong,
    outlineOffset: 4,
    backgroundColor: tone.paper,
  },
  hall: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    width: { default: 92, [bp.tablet]: 220, [bp.desktop]: "100%" },
    minHeight: { default: 0, [bp.desktop]: 280 },
    paddingBlock: { default: 48, [bp.desktop]: 64 },
    paddingInline: { default: 8, [bp.tablet]: 20, [bp.desktop]: 40 },
    textAlign: "center",
  },
  galleries: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [bp.tablet]: "1fr", [bp.desktop]: "repeat(5, 1fr)" },
    flexGrow: 1,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderLeftWidth: { default: 1, [bp.tablet]: 1, [bp.desktop]: 0 },
    borderBottomWidth: { default: 0, [bp.tablet]: 0, [bp.desktop]: 1 },
    borderLeftStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftColor: tone.line,
    borderBottomColor: tone.line,
  },
  gallery: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: { default: "center", [bp.desktop]: "flex-start" },
    minHeight: { default: 128, [bp.desktop]: 208 },
    boxSizing: "border-box",
    paddingTop: { default: 22, [bp.desktop]: 24 },
    paddingBottom: { default: 22, [bp.desktop]: 64 },
    paddingInlineStart: { default: 60, [bp.tablet]: 64, [bp.desktop]: 18 },
    paddingInlineEnd: { default: 16, [bp.tablet]: 24, [bp.desktop]: 14 },
    borderTopWidth: { default: 1, ":first-child": 0, [bp.desktop]: 0 },
    borderLeftWidth: { default: 0, [bp.desktop]: 1 },
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderTopColor: tone.line,
    borderLeftColor: { default: tone.line, ":first-child": "transparent" },
  },
  roomHead: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
  },
  roomNumber: {
    color: tone.navy,
  },
  roomBadge: {
    fontFamily: face.sans,
    fontSize: 13,
    color: tone.body,
  },
  hallNumber: {
    position: "absolute",
    top: { default: 14, [bp.desktop]: 20 },
    left: { default: 0, [bp.desktop]: 24 },
    right: { default: 0, [bp.desktop]: "auto" },
    textAlign: "center",
    color: tone.navy,
  },
  name: {
    display: "block",
    margin: 0,
    marginTop: { default: 8, [bp.desktop]: 18 },
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.laptop]: 15, [bp.wide]: 16 },
    lineHeight: 1.55,
    color: tone.ink,
    textWrap: "balance",
  },
  english: {
    display: "block",
    margin: 0,
    marginTop: 4,
    fontSize: 16,
    lineHeight: 1.35,
    color: tone.body,
  },
  badge: {
    margin: 0,
    color: tone.body,
  },
  hallName: {
    margin: 0,
    marginTop: { default: 14, [bp.desktop]: 16 },
    writingMode: {
      default: "vertical-rl",
      [bp.tablet]: "horizontal-tb",
      [bp.desktop]: "horizontal-tb",
    },
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: { default: 20, [bp.tablet]: 24, [bp.desktop]: 36 },
    lineHeight: 1.4,
    letterSpacing: { default: "0.12em", [bp.tablet]: "0.03em", [bp.desktop]: "0.04em" },
    color: tone.navy,
    textWrap: "balance",
    fontFeatureSettings: '"palt"',
  },
  hallEnglish: {
    display: { default: "none", [bp.tablet]: "block", [bp.desktop]: "block" },
    margin: 0,
    marginTop: 8,
    fontSize: { default: 17, [bp.desktop]: 21 },
    lineHeight: 1.35,
    color: tone.body,
  },
  door: {
    position: "absolute",
    width: 40,
    height: 40,
    overflow: "visible",
    left: { default: -1, [bp.desktop]: "calc(50% - 20px)" },
    top: { default: "calc(50% - 20px)", [bp.desktop]: "auto" },
    bottom: { default: "auto", [bp.desktop]: -1 },
    transform: { default: "rotate(90deg)", [bp.desktop]: "none" },
  },
  doorGap: {
    fill: tone.paper,
  },
  doorLeaf: {
    fill: "none",
    stroke: tone.lineStrong,
    strokeWidth: 1,
  },
  doorSwing: {
    fill: "none",
    stroke: tone.line,
    strokeWidth: 1,
    strokeDasharray: "2 3",
  },
  here: {
    position: "absolute",
    left: "50%",
    bottom: { default: 16, [bp.desktop]: 22 },
    transform: "translateX(-50%)",
    display: { default: "none", [bp.tablet]: "inline-flex", [bp.desktop]: "inline-flex" },
    alignItems: "center",
    gap: 8,
    color: tone.navy,
    whiteSpace: "nowrap",
  },
  hereDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: tone.navy,
  },
  exitGap: {
    position: "absolute",
    left: "calc(50% - 28px)",
    bottom: -7,
    width: 56,
    height: 9,
    backgroundColor: tone.paper,
  },
  exit: {
    position: "absolute",
    left: "50%",
    bottom: -48,
    transform: "translateX(-50%)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    paddingBlock: 6,
    paddingInline: 8,
    whiteSpace: "nowrap",
    color: { default: tone.navy, ":hover": tone.blue },
    textDecorationLine: "none",
  },
});

function Door() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" {...stylex.props(styles.door)}>
      <rect x="0.5" y="37" width="39" height="5" {...stylex.props(styles.doorGap)} />
      <path d="M0.5 40V0.5" {...stylex.props(styles.doorLeaf)} />
      <path d="M0.5 0.5A39.5 39.5 0 0 1 40 40" {...stylex.props(styles.doorSwing)} />
    </svg>
  );
}

export function Structure() {
  const { holding, subsidiaries, subsidiaryBadge } = ABOUT_STRUCTURE;
  return (
    <section
      id="about-structure"
      aria-labelledby="oos1z-structure"
      {...stylex.props(ui.anchor, ui.room)}
    >
      <div {...stylex.props(ui.shell)}>
        <RoomSign
          numeral="VI"
          id="oos1z-structure"
          title={sectionTitle("about-structure")}
          english="The floor plan"
        />
        <div {...stylex.props(styles.plan)}>
          <div {...stylex.props(styles.hall)}>
            <span lang="en" {...stylex.props(ui.caps, styles.hallNumber)}>
              100
            </span>
            <p {...stylex.props(ui.caps, styles.badge)}>{holding.badge}</p>
            <h3 {...stylex.props(styles.hallName)}>{holding.name}</h3>
            <p lang="en" {...stylex.props(ui.italic, styles.hallEnglish)}>
              {holding.english}
            </p>
            <span lang="en" aria-hidden="true" {...stylex.props(ui.caps, styles.here)}>
              <span {...stylex.props(styles.hereDot)} />
              You are here
            </span>
            <span aria-hidden="true" {...stylex.props(styles.exitGap)} />
            <a href="#oos1z-exit" {...stylex.props(ui.caps, ui.focus, styles.exit)}>
              出口 Exit
              <ArrowDown size={13} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
          <ol {...stylex.props(styles.galleries)}>
            {subsidiaries.map((subsidiary, index) => (
              <li key={subsidiary.id} {...stylex.props(styles.gallery)}>
                <span {...stylex.props(styles.roomHead)}>
                  <span lang="en" {...stylex.props(ui.caps, styles.roomNumber)}>
                    {101 + index}
                  </span>
                  <span {...stylex.props(styles.roomBadge)}>{subsidiaryBadge}</span>
                </span>
                <span {...stylex.props(styles.name)}>{subsidiary.name}</span>
                <span lang="en" {...stylex.props(ui.italic, styles.english)}>
                  {subsidiary.english}
                </span>
                <Door />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
