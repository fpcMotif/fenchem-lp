import * as stylex from "@stylexjs/stylex";

import { PLATES } from "./plates";
import { Registration } from "./registration";
import { srOnly, ui } from "./shared-values";
import { bp, face, sky } from "./tokens.stylex";

const styles = stylex.create({
  list: {
    display: { default: "grid", [bp.desktop]: "none" },
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: { default: 28, [bp.tablet]: 36 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  always: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.desktop]: "repeat(2, minmax(0, 1fr))" },
    columnGap: 48,
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 46%) minmax(0, 1fr)",
      [bp.tablet]: "320px minmax(0, 1fr)",
    },
    alignItems: "center",
    columnGap: { default: 20, [bp.tablet]: 32 },
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "inherit",
    textAlign: "start",
    cursor: "zoom-in",
  },
  holder: {
    position: "relative",
    display: "block",
    padding: { default: 6, [bp.tablet]: 8 },
    backgroundColor: sky.navy,
    boxShadow: {
      default: `inset 0 0 0 1px ${sky.hair}`,
      [stylex.when.ancestor(":hover")]: `inset 0 0 0 1px ${sky.hairStrong}`,
    },
    transitionProperty: "box-shadow",
    transitionDuration: "300ms",
  },
  image: {
    display: "block",
    width: "100%",
    aspectRatio: "3 / 2",
    objectFit: "cover",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  numeral: {
    fontSize: { default: 30, [bp.tablet]: 40 },
    lineHeight: 1,
    color: sky.star,
  },
  caption: {
    fontFamily: face.sans,
    fontSize: { default: 17, [bp.tablet]: 20 },
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: sky.star,
  },
  english: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 17, [bp.tablet]: 19 },
    color: sky.muted,
  },
});

const focus = stylex.create({
  position: (value: string) => ({ objectPosition: value }),
});

export function PlateList(props: { always: boolean; onOpen: (index: number) => void }) {
  return (
    <ol {...stylex.attrs(styles.list, props.always && styles.always)}>
      {PLATES.map((plate, index) => (
        <li>
          <button
            type="button"
            onClick={() => props.onOpen(index)}
            {...stylex.attrs(styles.row, ui.focusable, stylex.defaultMarker())}
          >
            <span {...stylex.attrs(styles.holder)}>
              <img
                src={plate.src}
                alt={plate.alt}
                loading="lazy"
                decoding="async"
                {...stylex.attrs(styles.image, focus.position(plate.focus))}
              />
              <Registration size="small" />
            </span>
            <span {...stylex.attrs(styles.card)}>
              <span lang="en" {...stylex.attrs(ui.label)}>
                Plate
              </span>
              <span aria-hidden="true" {...stylex.attrs(ui.designation, styles.numeral)}>
                {plate.numeral}
              </span>
              <span {...stylex.attrs(styles.caption)}>{plate.caption}</span>
              <span lang="en" {...stylex.attrs(styles.english)}>
                {plate.english}
              </span>
              <span {...srOnly}>{plate.numeral}, View larger</span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
