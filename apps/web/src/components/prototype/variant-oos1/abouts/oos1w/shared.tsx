import * as stylex from "@stylexjs/stylex";
import { bp, face, tone } from "./tokens.stylex";

export const LIGHT_WEIGHT_FONT =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap";

const head = stylex.create({
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 34, [bp.tablet]: 42, [bp.desktop]: 44, [bp.wide]: 52 },
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  line: {
    display: "block",
    whiteSpace: "nowrap",
  },
});

export function SectionHead({
  title,
  titleId,
}: {
  title: string | readonly string[];
  titleId: string;
}) {
  return (
    <h2 id={titleId} {...stylex.props(head.title)}>
      {typeof title === "string"
        ? title
        : title.map((line) => (
            <span key={line} {...stylex.props(head.line)}>
              {line}
            </span>
          ))}
    </h2>
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
