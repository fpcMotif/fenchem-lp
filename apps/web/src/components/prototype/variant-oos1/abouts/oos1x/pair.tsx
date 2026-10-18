import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import type { StyleXStyles } from "@stylexjs/stylex";
import { merge, Show } from "solid-js";
import { m, type MotionValue } from "@/compat/motion";

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

function Beam(props: { engage: MotionValue<number>; placement?: BeamPlacement }) {
  const p = merge({ placement: "always" }, props);
  return (
    <span
      aria-hidden="true"
      {...stylex.attrs(
        styles.beam,
        p.placement === "phone" && styles.beamPhoneOnly,
        p.placement === "spacer" && styles.beamSpacerOnly,
      )}
    >
      <m.span {...stylex.attrs(styles.beamEngaged)} style={{ opacity: p.engage }} />
    </span>
  );
}

export function FulcrumMark(props: { sx?: StyleXStyles }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 8" {...stylex.attrs(styles.fulcrum, props.sx)}>
      <path d="M6 0 12 8H0Z" fill="currentColor" />
    </svg>
  );
}

export function StandingTitle(props: { id: string; en: string; children: JSX.Element }) {
  return (
    <>
      <p
        lang="en"
        aria-hidden="true"
        {...stylex.attrs(type.counterweight, type.counterHeading, styles.standLabel, ui.knockout)}
      >
        {props.en}
      </p>
      <h2
        id={props.id}
        {...stylex.attrs(type.light, type.heading, styles.standHeading, ui.knockout)}
      >
        {props.children}
      </h2>
    </>
  );
}

export function Pair(props: {
  lever: number;
  standing?: JSX.Element;
  standingSx?: StyleXStyles;
  tag?: JSX.Element;
  children: JSX.Element;
  load: JSX.Element;
  loadRatio?: number;
  loadLine?: boolean;
  loadFirstOnPhone?: boolean;
  offset?: "start" | "end";
}) {
  const p = merge({ loadLine: false, loadFirstOnPhone: false }, props);
  const { beamRef, arm, load: loadY, engage } = useCounterweight<HTMLDivElement>(p.lever);
  const atRest = p.lever === 0;
  const padding =
    p.loadRatio && !atRest
      ? ({ "--oos1x-pad": compressionPadding(p.loadRatio) } as JSX.CSSProperties)
      : undefined;
  const armBeam: BeamPlacement = !atRest ? "always" : p.loadFirstOnPhone ? "spacer" : "phone";

  return (
    <div {...stylex.attrs(ui.columns, styles.pair)}>
      <Show when={p.standing}>
        {(standing) => (
          <m.div
            {...stylex.attrs(styles.standing, styles.standingFirst, p.standingSx)}
            style={{ y: arm }}
          >
            {standing()}
          </m.div>
        )}
      </Show>
      {atRest ? (
        <span aria-hidden="true" {...stylex.attrs(styles.restBeam)}>
          <m.span {...stylex.attrs(styles.beamEngaged)} style={{ opacity: engage }} />
        </span>
      ) : null}
      <div
        {...stylex.attrs(
          styles.armCell,
          atRest && styles.armCellAtRest,
          p.loadFirstOnPhone && styles.armCellAfterLoad,
        )}
      >
        <m.div {...stylex.attrs(styles.arm)} style={{ y: arm }}>
          <Beam engage={engage} placement={armBeam} />
          <Show when={p.tag}>
            {(tag) => <div {...stylex.attrs(styles.tag, ui.knockout)}>{tag()}</div>}
          </Show>
          <div {...stylex.attrs(styles.content, ui.knockout)}>{p.children}</div>
        </m.div>
      </div>
      <div
        ref={beamRef}
        data-counterweight={atRest ? undefined : ""}
        {...stylex.attrs(
          styles.loadCell,
          atRest && styles.loadCellAtRest,
          p.loadFirstOnPhone && styles.loadCellFirst,
          p.offset === "start" && styles.loadStart,
          p.offset === "end" && styles.loadEnd,
        )}
        style={padding}
      >
        <LoadContent atRest={atRest} loadLine={p.loadLine} loadY={loadY} engage={engage}>
          {p.load}
        </LoadContent>
      </div>
    </div>
  );
}

function LoadContent(props: {
  atRest: boolean;
  loadLine: boolean;
  loadY: MotionValue<number>;
  engage: MotionValue<number>;
  children: JSX.Element;
}) {
  return (
    <m.div {...stylex.attrs(styles.load)} style={{ y: props.loadY }}>
      {props.loadLine ? (
        <Beam engage={props.engage} placement={props.atRest ? "phone" : "always"} />
      ) : null}
      <FulcrumMark sx={props.atRest ? undefined : styles.fulcrumWhenStill} />
      {props.children}
    </m.div>
  );
}
