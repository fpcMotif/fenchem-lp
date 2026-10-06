import * as stylex from "@stylexjs/stylex";

import { HERO_PARTS, type HeroPartId } from "./hero-geometry";
import { FlagNote } from "./marks";
import { srOnly, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  root: {
    marginTop: { default: 32, [bp.desktop]: 36 },
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: tone.navy,
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "36px minmax(0, 1fr) auto",
      [bp.tabletUp]: "44px minmax(0, 1fr) 40px 64px",
    },
    alignItems: "center",
    columnGap: 12,
  },
  head: {
    display: { default: "none", [bp.tabletUp]: "grid" },
    paddingBlock: 9,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.rule,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: tone.navy,
  },
  item: {
    paddingBlock: { default: 14, [bp.tabletUp]: 13 },
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.rule,
    transitionProperty: "background-color",
    transitionDuration: "200ms",
  },
  itemActive: {
    backgroundColor: tone.mist,
    boxShadow: "-10px 0 0 #f3f5fa, 10px 0 0 #f3f5fa",
  },
  part: {
    display: "flex",
    alignItems: "center",
    columnGap: 12,
    minWidth: 0,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  glyph: {
    fontFamily: face.sans,
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1,
    color: tone.navy,
  },
  name: {
    fontFamily: face.sans,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.4,
    color: tone.ink,
  },
  qty: {
    display: { default: "none", [bp.tabletUp]: "block" },
    fontFamily: face.latin,
    fontSize: 15,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    textAlign: "center",
    color: tone.ink,
  },
  seat: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
    fontFamily: face.latin,
    fontSize: 15,
    fontWeight: 500,
    color: tone.body,
  },
  lifted: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 21,
    fontWeight: 400,
    color: tone.navy,
  },
  right: { textAlign: "right" },
  center: { textAlign: "center" },
  note: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    margin: 0,
    marginTop: 12,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 18,
    lineHeight: 1.35,
    color: tone.navy,
  },
});

export function PartsList({
  active,
  onActive,
}: {
  active: HeroPartId | null;
  onActive: (id: HeroPartId | null) => void;
}) {
  return (
    <div {...stylex.props(styles.root)}>
      <p {...stylex.props(ui.caps, styles.caption)}>
        <span lang="en">Parts list</span>
        <span lang="en">Fig. 1</span>
      </p>
      <div aria-hidden="true" {...stylex.props(ui.caps, styles.row, styles.head)}>
        <span lang="en">Item</span>
        <span lang="en">Part</span>
        <span lang="en" {...stylex.props(styles.center)}>
          Qty
        </span>
        <span lang="en" {...stylex.props(styles.right)}>
          Seat
        </span>
      </div>
      <ol {...stylex.props(styles.list)}>
        {HERO_PARTS.map((part) => (
          <li
            key={part.id}
            onPointerEnter={() => onActive(part.id)}
            onPointerLeave={() => onActive(null)}
            {...stylex.props(styles.row, styles.item, active === part.id && styles.itemActive)}
          >
            <span {...stylex.props(ui.balloon, active === part.id && ui.balloonActive)}>
              {part.item}
            </span>
            <span {...stylex.props(styles.part)}>
              <span aria-hidden="true" {...stylex.props(styles.glyph)}>
                {part.glyph}
              </span>
              <span {...stylex.props(styles.names)}>
                <span {...stylex.props(styles.name)}>{part.name}</span>
                <span lang="en" {...stylex.props(ui.label)}>
                  {part.english}
                </span>
              </span>
            </span>
            <span {...stylex.props(styles.qty)}>
              <span {...srOnly}>数量 </span>1
            </span>
            {part.id === "rd" ? (
              <span {...stylex.props(styles.seat)}>
                <span {...srOnly}>装配：抬起 δ，见注 1</span>
                <span aria-hidden="true" {...stylex.props(styles.lifted)}>
                  +δ
                </span>
                <span aria-hidden="true">
                  <FlagNote number={1} />
                </span>
              </span>
            ) : (
              <span lang="en" {...stylex.props(styles.seat)}>
                <span {...srOnly}>装配：</span>
                {part.seat}
              </span>
            )}
          </li>
        ))}
      </ol>
      <p lang="en" {...stylex.props(styles.note)}>
        <span aria-hidden="true">
          <FlagNote number={1} />
        </span>
        <span>Item 1 never fully seats. R&D stays one step ahead of the stack.</span>
      </p>
    </div>
  );
}
