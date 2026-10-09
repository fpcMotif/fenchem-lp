import { m } from "motion/react";
import * as stylex from "@stylexjs/stylex";
import { type MotionValue } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { bp, face, tone } from "./tokens.stylex";
import { cq, SHEET_WIDTH_UNITS } from "./iso-values";

const styles = stylex.create({
  drawing: {
    position: "relative",
    width: "100%",
    containerType: "inline-size",
  },
  scene: {
    position: "absolute",
    transformStyle: "preserve-3d",
    transform: "rotateX(60deg) rotateZ(-45deg)",
    pointerEvents: "none",
  },
  camera: {
    position: "absolute",
    inset: 0,
    transformStyle: "preserve-3d",
    pointerEvents: "none",
  },
  box: {
    position: "absolute",
    transformStyle: "preserve-3d",
    backgroundColor: tone.paper,
    boxShadow: "inset 0 0 0 var(--edge, 1px) var(--line, rgba(11, 42, 92, 0.88))",
    transitionProperty: "box-shadow",
    transitionDuration: "220ms",
  },
  highlighted: {
    "--line": "#0743a9",
    "--edge": "2px",
  },
  side: {
    position: "absolute",
    top: 0,
    right: "100%",
    width: "var(--t)",
    height: "100%",
    transformOrigin: "100% 50%",
    transform: "rotateY(-90deg)",
    backgroundColor: tone.tint,
    boxShadow:
      "inset 1px 0 0 var(--line, rgba(11, 42, 92, 0.88)), inset 0 1px 0 var(--line, rgba(11, 42, 92, 0.88)), inset 0 -1px 0 var(--line, rgba(11, 42, 92, 0.88))",
  },
  front: {
    position: "absolute",
    top: "100%",
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    boxSizing: "border-box",
    width: "100%",
    height: "var(--t)",
    paddingInline: "5%",
    transformOrigin: "50% 0",
    transform: "rotateX(-90deg)",
    backgroundColor: tone.tintDeep,
    boxShadow:
      "inset 0 -1px 0 var(--line, rgba(11, 42, 92, 0.88)), inset -1px 0 0 var(--line, rgba(11, 42, 92, 0.88))",
  },
  etch: {
    display: { default: "none", [bp.tabletUp]: "block" },
    fontFamily: face.latin,
    fontSize: "1.05cqw",
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    color: "rgba(11, 42, 92, 0.62)",
  },
  shadow: {
    position: "absolute",
    borderRadius: "6%",
    backgroundColor: "rgba(11, 42, 92, 0.2)",
    filter: "blur(2.2cqw)",
  },
});

export function Drawing({
  heightUnits,
  label,
  children,
}: {
  heightUnits: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{ aspectRatio: `${SHEET_WIDTH_UNITS} / ${heightUnits}` }}
      {...stylex.props(styles.drawing)}
    >
      {children}
    </div>
  );
}

export function Camera({ y, children }: { y?: MotionValue<string>; children: ReactNode }) {
  return (
    <m.div style={{ y }} {...stylex.props(styles.camera)}>
      {children}
    </m.div>
  );
}

export function GroundPlane({
  width,
  depth,
  centerX,
  centerY,
  children,
}: {
  width: number;
  depth: number;
  centerX: number;
  centerY: number;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        left: cq(centerX - width / 2),
        top: cq(centerY - depth / 2),
        width: cq(width),
        height: cq(depth),
      }}
      {...stylex.props(styles.scene)}
    >
      {children}
    </div>
  );
}

export function IsoBox({
  x,
  y,
  w,
  d,
  t,
  topZ,
  etch,
  highlighted = false,
  children,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  t: number;
  topZ: MotionValue<string> | string;
  etch?: string;
  highlighted?: boolean;
  children?: ReactNode;
}) {
  const style = {
    left: cq(x),
    top: cq(y),
    width: cq(w),
    height: cq(d),
    z: topZ,
    "--t": cq(t),
  } as CSSProperties & { z: MotionValue<string> | string };
  return (
    <m.div style={style} {...stylex.props(styles.box, highlighted && styles.highlighted)}>
      {children}
      <span {...stylex.props(styles.side)} />
      <span {...stylex.props(styles.front)}>
        {etch ? <span {...stylex.props(styles.etch)}>{etch}</span> : null}
      </span>
    </m.div>
  );
}

export function GroundShadow({ x, y, w, d }: { x: number; y: number; w: number; d: number }) {
  return (
    <span
      style={{
        left: cq(x),
        top: cq(y),
        width: cq(w),
        height: cq(d),
        transform: "translateZ(-0.1cqw)",
      }}
      {...stylex.props(styles.shadow)}
    />
  );
}
