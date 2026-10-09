import * as stylex from "@stylexjs/stylex";

import { ui } from "./layout";
import { StrobeText, useEntry } from "./strobe";
import { ForwardArrow } from "./time-grid";
import { frameLabel } from "./time-grid-values";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  head: {
    alignItems: "baseline",
    rowGap: 14,
    marginBottom: { default: 40, [bp.tablet]: 56, [bp.desktop]: 72 },
  },
  label: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    margin: 0,
  },
  plateNumber: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: tone.navy,
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 36, [bp.tablet]: 48, [bp.desktop]: "clamp(54px, 4.75vw, 70px)" },
    lineHeight: 1.08,
    letterSpacing: "0.01em",
    color: tone.ink,
  },
  titleLatin: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 36, [bp.tablet]: 48, [bp.desktop]: "clamp(52px, 4.6vw, 68px)" },
    lineHeight: 1.04,
    letterSpacing: "-0.005em",
    color: tone.navy,
  },
});

export function PlateHead({
  plate,
  english,
  title,
  titleId,
  latin = false,
}: {
  plate: number;
  english: string;
  title: string;
  titleId: string;
  latin?: boolean;
}) {
  const [ref, phase] = useEntry<HTMLDivElement>();
  return (
    <div ref={ref} {...stylex.props(ui.shell)}>
      <div {...stylex.props(ui.grid, styles.head)}>
        <p {...stylex.props(ui.q1, styles.label)}>
          <span {...stylex.props(ui.frameNumber, styles.plateNumber)}>
            <ForwardArrow />
            {frameLabel(plate)}
          </span>
          <span lang="en" {...stylex.props(ui.eyebrow)}>
            {english}
          </span>
        </p>
        <h2
          id={titleId}
          lang={latin ? "en" : undefined}
          {...stylex.props(ui.q2to4, styles.title, latin && styles.titleLatin)}
        >
          <StrobeText phase={phase}>{title}</StrobeText>
        </h2>
      </div>
    </div>
  );
}
