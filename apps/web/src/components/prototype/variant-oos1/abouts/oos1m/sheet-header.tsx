import * as stylex from "@stylexjs/stylex";

import { pad2, SHEET_COUNT, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  header: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) auto",
      [bp.tabletUp]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [bp.tablet]: 20, [bp.desktop]: 24 },
    alignItems: "baseline",
    paddingTop: { default: 14, [bp.desktop]: 18 },
    borderTopWidth: 1.5,
    borderTopStyle: "solid",
    borderTopColor: tone.navy,
  },
  sheet: {
    gridColumn: { default: "1", [bp.tabletUp]: "1 / 3" },
    gridRow: "1",
  },
  title: {
    gridColumn: { default: "1 / -1", [bp.tabletUp]: "3 / 10" },
    gridRow: { default: "2", [bp.tabletUp]: "1" },
    margin: 0,
    marginTop: { default: 18, [bp.tabletUp]: 0 },
    fontFamily: face.sans,
    fontSize: { default: 38, [bp.tablet]: 52, [bp.desktop]: 68 },
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: "0.03em",
    color: tone.navy,
  },
  english: {
    gridColumn: { default: "2", [bp.tabletUp]: "10 / 13" },
    gridRow: "1",
    margin: 0,
    justifySelf: "end",
    fontSize: { default: 18, [bp.desktop]: 26 },
    lineHeight: 1.2,
    color: tone.body,
    textAlign: "right",
  },
});

export function SheetHeader({
  sheet,
  title,
  english,
  titleId,
}: {
  sheet: number;
  title: string;
  english: string;
  titleId: string;
}) {
  return (
    <header {...stylex.props(styles.header)}>
      <p aria-hidden="true" lang="en" {...stylex.props(ui.caps, styles.sheet)}>
        Sheet {pad2(sheet)} / {pad2(SHEET_COUNT)}
      </p>
      <h2 id={titleId} {...stylex.props(styles.title)}>
        {title}
      </h2>
      <p lang="en" {...stylex.props(ui.serif, styles.english)}>
        {english}
      </p>
    </header>
  );
}
