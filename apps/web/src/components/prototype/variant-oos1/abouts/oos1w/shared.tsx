import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { bp, face, tone } from "./tokens.stylex";

export const LIGHT_WEIGHT_FONT =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap";

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
