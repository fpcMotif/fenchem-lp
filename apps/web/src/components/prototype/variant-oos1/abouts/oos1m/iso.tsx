import { m } from "@/compat/motion";
import * as stylex from "@stylexjs/stylex";
import { type MotionStyle, type MotionValue } from "@/compat/motion";
import type { JSX } from "@solidjs/web";
import { bp, face, tone } from "./tokens.stylex";
import { cq, SHEET_WIDTH_UNITS } from "./iso-values";
import { merge } from "solid-js";

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

export function Drawing(props: { heightUnits: number; label: string; children: JSX.Element }) {
  return (
    <div
      role="img"
      aria-label={props.label}
      style={{ "aspect-ratio": `${SHEET_WIDTH_UNITS} / ${props.heightUnits}` }}
      {...stylex.attrs(styles.drawing)}
    >
      {props.children}
    </div>
  );
}

export function Camera(props: { y?: MotionValue<string>; children: JSX.Element }) {
  return (
    <m.div style={{ y: props.y }} {...stylex.attrs(styles.camera)}>
      {props.children}
    </m.div>
  );
}

export function GroundPlane(props: {
  width: number;
  depth: number;
  centerX: number;
  centerY: number;
  children: JSX.Element;
}) {
  return (
    <div
      style={{
        left: cq(props.centerX - props.width / 2),
        top: cq(props.centerY - props.depth / 2),
        width: cq(props.width),
        height: cq(props.depth),
      }}
      {...stylex.attrs(styles.scene)}
    >
      {props.children}
    </div>
  );
}

export function IsoBox(props: {
  x: number;
  y: number;
  w: number;
  d: number;
  t: number;
  topZ: MotionValue<string> | string;
  etch?: string;
  highlighted?: boolean;
  children?: JSX.Element;
}) {
  const p = merge({ highlighted: false }, props);
  const style = {
    left: cq(p.x),
    top: cq(p.y),
    width: cq(p.w),
    height: cq(p.d),
    z: p.topZ,
    "--t": cq(p.t),
  } satisfies MotionStyle;
  return (
    <m.div style={style} {...stylex.attrs(styles.box, p.highlighted && styles.highlighted)}>
      {p.children}
      <span {...stylex.attrs(styles.side)} />
      <span {...stylex.attrs(styles.front)}>
        {p.etch ? <span {...stylex.attrs(styles.etch)}>{p.etch}</span> : null}
      </span>
    </m.div>
  );
}

export function GroundShadow(props: { x: number; y: number; w: number; d: number }) {
  return (
    <span
      style={{
        left: cq(props.x),
        top: cq(props.y),
        width: cq(props.w),
        height: cq(props.d),
        transform: "translateZ(-0.1cqw)",
      }}
      {...stylex.attrs(styles.shadow)}
    />
  );
}
