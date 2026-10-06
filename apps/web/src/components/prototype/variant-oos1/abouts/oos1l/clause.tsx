import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { Fragment, type ReactNode } from "react";

import type { Phrase, Segment, Unit } from "./sentence";
import { bp, chrome, face, size, tone } from "./tokens.stylex";

const styles = stylex.create({
  line: {
    display: "flex",
    justifyContent: "flex-end",
    margin: 0,
    fontFamily: face.sans,
    color: tone.ink,
    wordBreak: "keep-all",
  },
  anchor: {
    scrollMarginTop: chrome.anchor,
  },
  ink: {
    display: "block",
    minWidth: 0,
    textAlign: "end",
    textWrap: "balance",
    transformOrigin: "100% 0",
    fontFeatureSettings: '"palt"',
  },
  condense: {
    position: "relative",
    zIndex: { default: 3, [bp.motionReduce]: "auto" },
  },
  s0: {
    fontSize: { default: size.s0Phone, [bp.tablet]: size.s0Tablet, [bp.desktop]: size.s0Desktop },
    lineHeight: 1.08,
    letterSpacing: "-0.015em",
  },
  s1: {
    fontSize: { default: size.s1Phone, [bp.tablet]: size.s1Tablet, [bp.desktop]: size.s1Desktop },
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
  },
  s2: {
    fontSize: { default: size.s2Phone, [bp.tablet]: size.s2Tablet, [bp.desktop]: size.s2Desktop },
    lineHeight: 1.14,
    letterSpacing: "-0.005em",
  },
  s3: {
    fontSize: { default: size.s3Phone, [bp.tablet]: size.s3Tablet, [bp.desktop]: size.s3Desktop },
    lineHeight: 1.24,
    letterSpacing: 0,
  },
  heavy: {
    fontWeight: 900,
  },
  light: {
    fontWeight: 300,
  },
  tail: {
    whiteSpace: "nowrap",
  },
  hinge: {
    display: "inline-block",
    width: 0,
    fontWeight: 300,
    letterSpacing: 0,
    color: tone.blue,
    fontFeatureSettings: "normal",
  },
});

export function Hinge({ mark, sx }: { mark: string; sx?: StyleXStyles }) {
  return <span {...stylex.props(styles.hinge, sx)}>{mark}</span>;
}

export function Words({
  segments,
  heavy = styles.heavy,
  light = styles.light,
  tail,
}: {
  segments: readonly Segment[];
  heavy?: StyleXStyles;
  light?: StyleXStyles;
  tail?: ReactNode;
}) {
  return segments.map((segment, index) => {
    const pieces = segment.text.split(/(?<=、)/u);
    const carriesTail = tail != null && index === segments.length - 1;
    return (
      <Fragment key={`${index}-${segment.text}`}>
        {index > 0 ? <wbr /> : null}
        <span {...stylex.props(segment.heavy ? heavy : light)}>
          {pieces.map((piece, at) => (
            <Fragment key={`${at}-${piece}`}>
              {at > 0 ? <wbr /> : null}
              {carriesTail && at === pieces.length - 1 ? (
                <>
                  {piece.slice(0, -1)}
                  <span {...stylex.props(styles.tail)}>
                    {piece.slice(-1)}
                    {tail}
                  </span>
                </>
              ) : (
                piece
              )}
            </Fragment>
          ))}
        </span>
      </Fragment>
    );
  });
}

export function Clause({
  line,
  as: Tag = "p",
  sx,
}: {
  line: Phrase | Unit;
  as?: "p" | "span";
  sx?: StyleXStyles;
}) {
  const unit = "id" in line ? line : null;
  return (
    <Tag
      id={unit?.id}
      data-unit={unit?.index}
      data-hinge={line.hinge ? "true" : undefined}
      {...stylex.props(styles.line, styles[line.size], unit && styles.anchor, sx)}
    >
      <span {...stylex.props(styles.ink, unit && styles.condense)}>
        <Words
          segments={line.segments}
          tail={line.hinge ? <Hinge mark={line.hinge} /> : undefined}
        />
      </span>
    </Tag>
  );
}
