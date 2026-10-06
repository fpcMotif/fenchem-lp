import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { m, type MotionValue } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

import { compressionPadding, useCounterweight } from "./counterweight";
import { type, ui } from "./shared";
import { bp, grid, tone } from "./tokens.stylex";

const styles = stylex.create({
  pair: {
    position: "relative",
  },
  standing: {
    display: "grid",
    gridColumn: { default: "auto", [bp.wide]: "1 / 8" },
    gridRow: { default: "auto", [bp.wide]: "1" },
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.wide]: "repeat(7, minmax(0, 1fr))",
    },
    columnGap: grid.gutter,
    rowGap: 10,
    alignContent: "end",
    alignItems: { default: "start", [bp.wide]: "last baseline" },
    boxSizing: "border-box",
    minHeight: { default: 0, [bp.wide]: grid.stand },
    paddingBottom: { default: 18, [bp.wide]: 22 },
  },
  standingFirst: {
    order: { default: -2, [bp.wide]: 0 },
  },
  armCell: {
    gridColumn: { default: "auto", [bp.wide]: "1 / 8" },
    gridRow: { default: "auto", [bp.wide]: "2" },
    paddingBottom: { default: 0, [bp.wide]: 88 },
  },
  armCellAtRest: {
    paddingBottom: { default: 0, [bp.wide]: 64 },
  },
  armCellAfterLoad: {
    paddingBottom: { default: 48, [bp.wide]: 64 },
  },
  arm: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.wide]: "repeat(7, minmax(0, 1fr))",
    },
    columnGap: grid.gutter,
    rowGap: { default: 18, [bp.wide]: 28 },
    alignItems: "start",
  },
  tag: {
    gridColumn: { default: "auto", [bp.tablet]: "1 / 8", [bp.desktop]: "1 / 3" },
  },
  content: {
    gridColumn: { default: "auto", [bp.tablet]: "1 / 8", [bp.desktop]: "3 / 8" },
    minWidth: 0,
  },
  loadCell: {
    gridColumn: { default: "auto", [bp.wide]: "8 / 13" },
    gridRow: { default: "auto", [bp.wide]: "2" },
    marginTop: { default: 28, [bp.wide]: 0 },
    paddingBottom: { default: 72, [bp.wide]: "var(--oos1x-pad, 96px)" },
  },
  loadCellAtRest: {
    paddingBottom: { default: 56, [bp.wide]: 64 },
  },
  loadCellFirst: {
    order: { default: -1, [bp.wide]: 0 },
    marginTop: 0,
    paddingBottom: { default: 18, [bp.wide]: 64 },
  },
  loadStart: {
    marginInlineEnd: { default: 44, [bp.wide]: 0 },
  },
  loadEnd: {
    marginInlineStart: { default: 44, [bp.wide]: 0 },
  },
  load: {
    position: "relative",
    display: "grid",
    rowGap: { default: 18, [bp.wide]: 28 },
  },
  beam: {
    position: "relative",
    display: "block",
    gridColumn: "1 / -1",
    height: 1,
    backgroundColor: tone.hairline,
  },
  beamPhoneOnly: {
    visibility: { default: "visible", [bp.wide]: "hidden" },
  },
  beamSpacerOnly: {
    display: { default: "none", [bp.wide]: "block" },
    visibility: "hidden",
  },
  beamEngaged: {
    position: "absolute",
    inset: 0,
    backgroundColor: tone.navy,
  },
  restBeam: {
    position: "relative",
    display: { default: "none", [bp.wide]: "block" },
    gridColumn: "1 / -1",
    gridRow: "2",
    alignSelf: "start",
    height: 1,
    backgroundColor: "rgba(11, 42, 92, 0.3)",
    pointerEvents: "none",
  },
  fulcrum: {
    position: "absolute",
    top: 0,
    left: -18,
    display: { default: "none", [bp.wide]: "block" },
    width: 12,
    height: 8,
    color: tone.navy,
  },
  fulcrumWhenStill: {
    display: { default: "none", [bp.wideStill]: "block" },
  },
  standLabel: {
    gridColumn: { default: "auto", [bp.tablet]: "1 / 8", [bp.desktop]: "1 / 3" },
  },
  standHeading: {
    gridColumn: { default: "auto", [bp.tablet]: "1 / 8", [bp.desktop]: "3 / 8" },
  },
});

type BeamPlacement = "always" | "phone" | "spacer";

function Beam({
  engage,
  placement = "always",
}: {
  engage: MotionValue<number>;
  placement?: BeamPlacement;
}) {
  return (
    <span
      aria-hidden="true"
      {...stylex.props(
        styles.beam,
        placement === "phone" && styles.beamPhoneOnly,
        placement === "spacer" && styles.beamSpacerOnly,
      )}
    >
      <m.span {...stylex.props(styles.beamEngaged)} style={{ opacity: engage }} />
    </span>
  );
}

export function FulcrumMark({ sx }: { sx?: StyleXStyles }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 8" {...stylex.props(styles.fulcrum, sx)}>
      <path d="M6 0 12 8H0Z" fill="currentColor" />
    </svg>
  );
}

export function StandingTitle({
  id,
  en,
  children,
}: {
  id: string;
  en: string;
  children: ReactNode;
}) {
  return (
    <>
      <p
        lang="en"
        aria-hidden="true"
        {...stylex.props(type.counterweight, type.counterHeading, styles.standLabel, ui.knockout)}
      >
        {en}
      </p>
      <h2 id={id} {...stylex.props(type.light, type.heading, styles.standHeading, ui.knockout)}>
        {children}
      </h2>
    </>
  );
}

export function Pair({
  lever,
  standing,
  standingSx,
  tag,
  children,
  load,
  loadRatio,
  loadLine = false,
  loadFirstOnPhone = false,
  offset,
}: {
  lever: number;
  standing?: ReactNode;
  standingSx?: StyleXStyles;
  tag?: ReactNode;
  children: ReactNode;
  load: ReactNode;
  loadRatio?: number;
  loadLine?: boolean;
  loadFirstOnPhone?: boolean;
  offset?: "start" | "end";
}) {
  const { beamRef, arm, load: loadY, engage } = useCounterweight<HTMLDivElement>(lever);
  const atRest = lever === 0;
  const padding =
    loadRatio && !atRest
      ? ({ "--oos1x-pad": compressionPadding(loadRatio) } as CSSProperties)
      : undefined;
  const armBeam: BeamPlacement = !atRest ? "always" : loadFirstOnPhone ? "spacer" : "phone";

  return (
    <div {...stylex.props(ui.columns, styles.pair)}>
      {standing ? (
        <m.div
          {...stylex.props(styles.standing, styles.standingFirst, standingSx)}
          style={{ y: arm }}
        >
          {standing}
        </m.div>
      ) : null}
      {atRest ? (
        <span aria-hidden="true" {...stylex.props(styles.restBeam)}>
          <m.span {...stylex.props(styles.beamEngaged)} style={{ opacity: engage }} />
        </span>
      ) : null}
      <div
        {...stylex.props(
          styles.armCell,
          atRest && styles.armCellAtRest,
          loadFirstOnPhone && styles.armCellAfterLoad,
        )}
      >
        <m.div {...stylex.props(styles.arm)} style={{ y: arm }}>
          <Beam engage={engage} placement={armBeam} />
          {tag ? <div {...stylex.props(styles.tag, ui.knockout)}>{tag}</div> : null}
          <div {...stylex.props(styles.content, ui.knockout)}>{children}</div>
        </m.div>
      </div>
      <div
        ref={beamRef}
        data-counterweight={atRest ? undefined : ""}
        {...stylex.props(
          styles.loadCell,
          atRest && styles.loadCellAtRest,
          loadFirstOnPhone && styles.loadCellFirst,
          offset === "start" && styles.loadStart,
          offset === "end" && styles.loadEnd,
        )}
        style={padding}
      >
        <m.div {...stylex.props(styles.load)} style={{ y: loadY }}>
          {loadLine ? <Beam engage={engage} placement={atRest ? "phone" : "always"} /> : null}
          <FulcrumMark sx={atRest ? undefined : styles.fulcrumWhenStill} />
          {load}
        </m.div>
      </div>
    </div>
  );
}
