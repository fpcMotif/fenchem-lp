import * as stylex from "@stylexjs/stylex";

import { PLACE, WORKS, srOnly, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  wall: {
    display: { default: "flex", [bp.corridor]: "none" },
    flexDirection: { default: "column", [bp.tablet]: "row", [bp.desktop]: "row" },
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: { default: "stretch", [bp.tablet]: "flex-start", [bp.desktop]: "flex-start" },
    columnGap: { default: 0, [bp.tablet]: 40, [bp.desktop]: 56 },
    rowGap: { default: 64, [bp.tablet]: 72, [bp.desktop]: 88 },
    margin: 0,
    marginTop: { default: 56, [bp.tablet]: 72, [bp.desktop]: 88 },
    padding: 0,
    listStyleType: "none",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  onLeft: {
    alignItems: { default: "flex-start", [bp.tablet]: "center", [bp.desktop]: "center" },
  },
  onRight: {
    alignItems: { default: "flex-end", [bp.tablet]: "center", [bp.desktop]: "center" },
  },
  hang: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: { default: "88%", [bp.tablet]: "auto", [bp.desktop]: "auto" },
    height: { default: "auto", [bp.tablet]: 280, [bp.desktop]: 300 },
    perspective: { default: "900px", [bp.tablet]: "none", [bp.desktop]: "none" },
  },
  frame: {
    position: "relative",
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: { default: 10, [bp.tablet]: 12, [bp.desktop]: 14 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: tone.lineStrong, ":hover": tone.blue },
    backgroundColor: tone.paper,
    cursor: "zoom-in",
    transitionProperty: "border-color",
    transitionDuration: "200ms",
  },
  leftTilt: {
    transformOrigin: "0% 50%",
    transform: { default: "rotateY(7deg)", [bp.tablet]: "none", [bp.desktop]: "none" },
  },
  rightTilt: {
    transformOrigin: "100% 50%",
    transform: { default: "rotateY(-7deg)", [bp.tablet]: "none", [bp.desktop]: "none" },
  },
  photo: {
    display: "block",
    width: "100%",
    height: "auto",
    backgroundColor: tone.tint,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    margin: 0,
    width: { default: "88%", [bp.tablet]: "auto", [bp.desktop]: "auto" },
  },
  labelRight: {
    alignItems: { default: "flex-end", [bp.tablet]: "center", [bp.desktop]: "center" },
    textAlign: { default: "end", [bp.tablet]: "center", [bp.desktop]: "center" },
  },
  labelLeft: {
    alignItems: { default: "flex-start", [bp.tablet]: "center", [bp.desktop]: "center" },
    textAlign: { default: "start", [bp.tablet]: "center", [bp.desktop]: "center" },
  },
  number: {
    fontSize: 20,
    lineHeight: 1.1,
    color: tone.navy,
  },
  title: {
    fontFamily: face.sans,
    fontSize: 16,
    lineHeight: 1.5,
    color: tone.ink,
  },
  meta: {
    fontSize: 16,
    color: tone.body,
  },
});

const photoWidth = stylex.create({
  wide: { width: { default: "100%", [bp.tablet]: 360, [bp.desktop]: 500 } },
  landscape: { width: { default: "100%", [bp.tablet]: 270, [bp.desktop]: 330 } },
  portrait: { width: { default: "70%", [bp.tablet]: 168, [bp.desktop]: 180 } },
});

export function GalleryWall({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <ol {...stylex.props(styles.wall)}>
      {WORKS.map((work, index) => {
        const onLeft = work.wall === "left";
        const shape = work.aspect > 2 ? "wide" : work.aspect < 1 ? "portrait" : "landscape";
        return (
          <li key={work.id} {...stylex.props(styles.item, onLeft ? styles.onLeft : styles.onRight)}>
            <div {...stylex.props(styles.hang)}>
              <button
                type="button"
                onClick={() => onOpen(index)}
                {...stylex.props(
                  styles.frame,
                  ui.focus,
                  photoWidth[shape],
                  onLeft ? styles.leftTilt : styles.rightTilt,
                )}
              >
                <img
                  src={work.src}
                  alt={work.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: work.aspect }}
                  {...stylex.props(styles.photo)}
                />
                <span {...srOnly}>View larger</span>
              </button>
            </div>
            <p {...stylex.props(styles.label, onLeft ? styles.labelLeft : styles.labelRight)}>
              <span lang="en" {...stylex.props(ui.number, styles.number)}>
                Nº {work.number}
              </span>
              <span {...stylex.props(styles.title)}>{work.caption}</span>
              <span lang="en" {...stylex.props(ui.italic, styles.meta)}>
                {work.english}, {PLACE}
              </span>
            </p>
          </li>
        );
      })}
    </ol>
  );
}
