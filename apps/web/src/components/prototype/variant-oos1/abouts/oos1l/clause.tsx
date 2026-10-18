import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { dynamic, type JSX } from "@solidjs/web";

import type { Phrase, Segment, Unit } from "./sentence";
import { bp, chrome, face, size, tone } from "./tokens.stylex";
import { children, merge } from "solid-js";

const sxAttrs = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

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

export function Hinge(props: { mark: string; sx?: StyleXStyles }) {
  return <span {...stylex.attrs(styles.hinge, props.sx)}>{props.mark}</span>;
}

export function Words(props: {
  segments: readonly Segment[];
  heavy?: StyleXStyles;
  light?: StyleXStyles;
  tail?: JSX.Element;
}) {
  const p = merge({ heavy: styles.heavy, light: styles.light }, props);
  const tail = children(() => props.tail);
  return (
    <>
      {p.segments.map((segment, index) => {
        const pieces = segment.text.split(/(?<=、)/u);
        const carriesTail = tail() != null && index === p.segments.length - 1;
        return (
          <>
            {index > 0 ? <wbr /> : null}
            <span {...stylex.attrs(segment.heavy ? p.heavy : p.light)}>
              {pieces.map((piece, at) => (
                <>
                  {at > 0 ? <wbr /> : null}
                  {carriesTail && at === pieces.length - 1 ? (
                    <>
                      {piece.slice(0, -1)}
                      <span {...stylex.attrs(styles.tail)}>
                        {piece.slice(-1)}
                        {tail()}
                      </span>
                    </>
                  ) : (
                    piece
                  )}
                </>
              ))}
            </span>
          </>
        );
      })}
    </>
  );
}

export function Clause(props: { line: Phrase | Unit; as?: "p" | "span"; sx?: StyleXStyles }) {
  const Tag = dynamic(() => props.as ?? "p");
  const unit = () => ("id" in props.line ? props.line : null);
  return (
    <Tag
      id={unit()?.id}
      data-unit={unit()?.index}
      data-hinge={props.line.hinge ? "true" : undefined}
      {...sxAttrs(styles.line, styles[props.line.size], unit() && styles.anchor, props.sx)}
    >
      <span {...sxAttrs(styles.ink, unit() && styles.condense)}>
        <Words
          segments={props.line.segments}
          tail={props.line.hinge ? <Hinge mark={props.line.hinge} /> : undefined}
        />
      </span>
    </Tag>
  );
}
