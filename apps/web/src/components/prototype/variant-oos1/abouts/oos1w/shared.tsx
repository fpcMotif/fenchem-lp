import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

import { bp, chrome, face, tone } from "./tokens.stylex";

export const LIGHT_WEIGHT_FONT =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap";

export const ui = stylex.create({
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 20, [bp.tablet]: 40, [bp.desktop]: chrome.inset },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, minmax(0, 1fr))",
      [bp.tablet]: "repeat(8, minmax(0, 1fr))",
      [bp.desktop]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 12, [bp.tablet]: 20, [bp.desktop]: 24 },
  },
  section: {
    scrollMarginTop: chrome.header,
    paddingBlock: { default: 72, [bp.tablet]: 104, [bp.desktop]: 136 },
  },
  ruled: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.rule,
    paddingTop: { default: 20, [bp.desktop]: 24 },
  },
  headCol: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "1 / span 3" },
  },
  bodyCol: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "4 / -1" },
  },
  micro: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: tone.body,
  },
  english: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: "0.01em",
    color: tone.body,
  },
  note: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.7,
    color: tone.body,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.blue,
    outlineOffset: 3,
  },
});

export const srOnly = stylex.props(ui.srOnly);

const head = stylex.create({
  eyebrow: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
  },
  num: {
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: tone.blue,
  },
  word: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 22,
    lineHeight: 1,
    color: tone.ink,
  },
  title: {
    margin: 0,
    marginTop: { default: 16, [bp.desktop]: 20 },
    fontFamily: face.sans,
    fontSize: { default: 34, [bp.tablet]: 42, [bp.desktop]: 44, [bp.wide]: 52 },
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  legend: {
    margin: 0,
    marginTop: { default: 16, [bp.desktop]: 24 },
    maxWidth: "20em",
    fontFamily: face.serif,
    fontSize: { default: 18, [bp.desktop]: 20 },
    lineHeight: 1.4,
    color: tone.body,
    textWrap: "pretty",
  },
  fig: {
    marginInlineEnd: 8,
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    fontStyle: "normal",
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  italic: {
    fontStyle: "italic",
  },
  line: {
    display: "block",
    whiteSpace: "nowrap",
  },
});

export function SectionHead({
  num,
  word,
  title,
  titleId,
  fig,
  legend,
  children,
}: {
  num: string;
  word: string;
  title: string | readonly string[];
  titleId: string;
  fig?: string;
  legend?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <p {...stylex.props(head.eyebrow)}>
        <span {...stylex.props(head.num)}>{num}</span>
        <span lang="en" {...stylex.props(head.word)}>
          {word}
        </span>
      </p>
      <h2 id={titleId} {...stylex.props(head.title)}>
        {typeof title === "string"
          ? title
          : title.map((line) => (
              <span key={line} {...stylex.props(head.line)}>
                {line}
              </span>
            ))}
      </h2>
      {legend ? (
        <p lang="en" {...stylex.props(head.legend)}>
          {fig ? <span {...stylex.props(head.fig)}>{fig}</span> : null}
          <span {...stylex.props(head.italic)}>{legend}</span>
        </p>
      ) : null}
      {children}
    </>
  );
}

const rf = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "baseline",
    whiteSpace: "nowrap",
    color: tone.body,
  },
  ahead: {
    color: tone.blue,
  },
  r: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: 1,
  },
  f: {
    marginInlineEnd: 5,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 11,
    lineHeight: 1,
    transform: "translateY(3px)",
  },
  value: {
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
  },
});

export function Rf({ value, ahead = false }: { value: number; ahead?: boolean }) {
  return (
    <span aria-hidden="true" {...stylex.props(rf.root, ahead && rf.ahead)}>
      <span {...stylex.props(rf.r)}>R</span>
      <span {...stylex.props(rf.f)}>f</span>
      <span {...stylex.props(rf.value)}>{value.toFixed(2)}</span>
    </span>
  );
}
