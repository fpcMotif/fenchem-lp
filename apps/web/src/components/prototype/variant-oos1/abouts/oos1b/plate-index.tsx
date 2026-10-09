import * as stylex from "@stylexjs/stylex";

import type { Plate } from "./journey";
import { srOnly, ui } from "./shared-values";
import { bp, face, motion, tone } from "./tokens.stylex";

const styles = stylex.create({
  wrap: {
    marginTop: { default: 56, [bp.tablet]: 72, [bp.desktop]: 96 },
  },
  head: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: { default: 16, [bp.desktop]: 20 },
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.rule,
  },
  title: {
    margin: 0,
    fontSize: { default: 24, [bp.desktop]: 32 },
    lineHeight: 1.1,
    color: tone.navy,
  },
  hint: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: tone.body,
  },
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, minmax(0, 1fr))",
      [bp.upTablet]: "repeat(7, minmax(0, 1fr))",
    },
    columnGap: { default: 10, [bp.tablet]: 14, [bp.desktop]: 20 },
    rowGap: 20,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  button: {
    display: "block",
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    textAlign: "start",
    cursor: "zoom-in",
  },
  frame: {
    display: "block",
    paddingTop: { default: 6, [bp.desktop]: 10 },
    paddingInline: { default: 6, [bp.desktop]: 10 },
    paddingBottom: { default: 8, [bp.desktop]: 12 },
    backgroundColor: tone.page,
    boxShadow: {
      default: "0 0 0 1px rgba(26, 26, 26, 0.07)",
      [stylex.when.ancestor(":hover")]:
        "0 0 0 1px rgba(26, 26, 26, 0.07), 0 22px 40px -30px rgba(11, 42, 92, 0.4)",
    },
    transitionProperty: "box-shadow",
    transitionDuration: "300ms",
  },
  bevel: {
    display: "block",
    padding: 3,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: tone.bevelOuter,
      [stylex.when.ancestor(":hover")]: tone.navy,
    },
    transitionProperty: "border-color",
    transitionDuration: "240ms",
  },
  photoBox: {
    position: "relative",
    display: "block",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    backgroundColor: tone.whisper,
    boxShadow: "0 0 0 1px rgba(11, 42, 92, 0.18)",
  },
  photo: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hoverMotion]: "scale(1.06)" },
    },
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: motion.ease,
  },
  door: {
    position: "absolute",
    inset: { default: 6, [bp.desktop]: 10 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.92)",
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: 1,
      [stylex.when.ancestor(":focus-visible")]: 1,
    },
    transitionProperty: "opacity",
    transitionDuration: "240ms",
  },
  label: {
    display: "flex",
    flexDirection: { default: "column", [bp.upTablet]: "row" },
    flexWrap: "wrap",
    alignItems: { default: "flex-start", [bp.upTablet]: "baseline" },
    columnGap: 8,
    rowGap: 2,
    marginTop: { default: 8, [bp.desktop]: 14 },
  },
  numeral: {
    fontFamily: face.latin,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.navy,
  },
  chinese: {
    fontFamily: face.sans,
    fontSize: { default: 12, [bp.tablet]: 13, [bp.desktop]: 15 },
    letterSpacing: "0.04em",
    color: tone.ink,
  },
});

export function PlateIndex({
  plates,
  onOpen,
}: {
  plates: readonly Plate[];
  onOpen: (index: number) => void;
}) {
  return (
    <div {...stylex.props(styles.wrap)}>
      <div {...stylex.props(styles.head)}>
        <h3 lang="en" {...stylex.props(ui.serif, styles.title)}>
          Index of plates
          <span {...srOnly}> 园区照片索引</span>
        </h3>
        <p lang="en" {...stylex.props(ui.serif, styles.hint)}>
          Open any frame
        </p>
      </div>
      <ul {...stylex.props(styles.list)}>
        {plates.map((plate, index) => (
          <li key={plate.id}>
            <button
              type="button"
              onClick={() => onOpen(index)}
              {...stylex.props(styles.button, ui.focusRing, stylex.defaultMarker())}
            >
              <span {...stylex.props(styles.frame)}>
                <span {...stylex.props(styles.bevel)}>
                  <span {...stylex.props(styles.photoBox)}>
                    <img
                      src={plate.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      {...stylex.props(ui.fill, styles.photo)}
                    />
                    <span aria-hidden="true" {...stylex.props(styles.door)} />
                  </span>
                </span>
                <span {...stylex.props(styles.label)}>
                  <span {...stylex.props(styles.numeral)}>{plate.numeral}</span>
                  <span {...stylex.props(styles.chinese)}>{plate.caption}</span>
                  <span {...srOnly}>，{plate.alt}，查看大图</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
