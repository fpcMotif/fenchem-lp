import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { ROOM_BOX, roomDrawing } from "./perspective";
import { RoomSign } from "./room-sign";
import { sectionTitle, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const ROOM = roomDrawing();
const ENGLISH = ["Expertise & focus", "Quiet persistence", "Collaboration & innovation"] as const;
const FIRST_NUMBER = 9;

const styles = stylex.create({
  rooms: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [bp.tablet]: "repeat(3, 1fr)",
      [bp.desktop]: "repeat(3, 1fr)",
    },
    columnGap: { default: 0, [bp.tablet]: 32, [bp.desktop]: 64 },
    rowGap: 72,
    margin: 0,
    marginTop: { default: 56, [bp.tablet]: 72, [bp.desktop]: 96 },
    padding: 0,
    listStyleType: "none",
  },
  room: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  doorway: {
    position: "relative",
    containerType: "inline-size",
    width: { default: "84%", [bp.tablet]: "100%", [bp.desktop]: "100%" },
    marginInline: "auto",
    "::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      height: 1,
      left: { default: -40, [bp.tablet]: -16, [bp.desktop]: -32 },
      right: { default: -40, [bp.tablet]: -16, [bp.desktop]: -32 },
      backgroundColor: tone.lineStrong,
    },
  },
  drawing: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  door: {
    fill: "none",
    stroke: tone.lineStrong,
    strokeWidth: 1,
  },
  edges: {
    fill: "none",
    stroke: tone.line,
    strokeWidth: 1,
  },
  fine: {
    fill: "none",
    stroke: tone.lineSoft,
    strokeWidth: 1,
  },
  plinth: {
    fill: tone.paper,
    stroke: tone.lineStrong,
    strokeWidth: 1,
  },
  glyph: {
    position: "absolute",
    left: 0,
    right: 0,
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 400,
    lineHeight: 1,
    textAlign: "center",
    color: tone.navy,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    width: { default: "84%", [bp.tablet]: "100%", [bp.desktop]: "100%" },
    marginInline: "auto",
    paddingTop: { default: 24, [bp.desktop]: 28 },
  },
  number: {
    fontSize: 20,
    lineHeight: 1,
    color: tone.navy,
  },
  title: {
    margin: 0,
    marginTop: 12,
    fontFamily: face.sans,
    fontWeight: 400,
    fontSize: { default: 21, [bp.desktop]: 24 },
    lineHeight: 1.4,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  english: {
    margin: 0,
    marginTop: 2,
    fontSize: { default: 17, [bp.desktop]: 19 },
    lineHeight: 1.35,
    color: tone.body,
  },
  desc: {
    margin: 0,
    marginTop: 14,
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 17 },
    lineHeight: 1.9,
    color: tone.body,
  },
  balanced: {
    display: "block",
    textWrap: "balance",
  },
});

export function Culture() {
  return (
    <section
      id="about-culture"
      aria-labelledby="oos1z-culture"
      {...stylex.props(ui.anchor, ui.room)}
    >
      <div {...stylex.props(ui.shell)}>
        <RoomSign
          numeral="IV"
          id="oos1z-culture"
          title={sectionTitle("about-culture")}
          english="Culture, in three rooms"
        />
        <ol {...stylex.props(styles.rooms)}>
          {ABOUT_CULTURE.values.map((value, index) => (
            <li key={value.glyph} {...stylex.props(styles.room)}>
              <div
                style={{ aspectRatio: `${ROOM_BOX.width} / ${ROOM_BOX.height}` }}
                {...stylex.props(styles.doorway)}
              >
                <svg
                  viewBox={`0 0 ${ROOM_BOX.width} ${ROOM_BOX.height}`}
                  aria-hidden="true"
                  focusable="false"
                  {...stylex.props(styles.drawing)}
                >
                  <path
                    d={ROOM.fine}
                    vectorEffect="non-scaling-stroke"
                    {...stylex.props(styles.fine)}
                  />
                  <path
                    d={ROOM.edges}
                    vectorEffect="non-scaling-stroke"
                    {...stylex.props(styles.edges)}
                  />
                  <rect
                    width={ROOM_BOX.width}
                    height={ROOM_BOX.height}
                    vectorEffect="non-scaling-stroke"
                    {...stylex.props(styles.door)}
                  />
                  <path
                    d={ROOM.works}
                    vectorEffect="non-scaling-stroke"
                    {...stylex.props(styles.plinth)}
                  />
                </svg>
                <p
                  aria-hidden="true"
                  style={{ fontSize: `${ROOM.glyphSize}cqi`, bottom: `${ROOM.glyphBottom}%` }}
                  {...stylex.props(styles.glyph)}
                >
                  {value.glyph}
                </p>
              </div>
              <div {...stylex.props(styles.label)}>
                <span lang="en" {...stylex.props(ui.number, styles.number)}>
                  Nº {String(FIRST_NUMBER + index).padStart(2, "0")}
                </span>
                <h3 {...stylex.props(styles.title)}>{value.title}</h3>
                <p lang="en" {...stylex.props(ui.italic, styles.english)}>
                  {ENGLISH[index]}
                </p>
                <p {...stylex.props(styles.desc)}>
                  <span {...stylex.props(styles.balanced)}>{value.desc}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
