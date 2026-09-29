import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { useEffect, useImperativeHandle, useRef, useState, type Ref, type RefObject } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { COVER_UV, createFullscreenProgram, loadTexture, sizeCanvas } from "./webgl";

const FRAGMENT = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform vec2 uFocus;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerAmt;
varying vec2 vUv;
${COVER_UV}

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

const float SHORE = 0.66;

void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  vec2 base = cover(uv, uRes, uImg, uFocus);

  float alpha = smoothstep(0.6, 0.645, base.y);
  if (alpha <= 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float water = smoothstep(0.655, 0.705, base.y);
  float depth = clamp((base.y - SHORE) / (1.0 - SHORE), 0.0, 1.0);
  float aspect = uImg.x / uImg.y;
  float t = uTime;

  vec2 q = vec2(base.x * aspect, base.y);
  float streak = snoise(vec2(q.x * 2.2 - t * 0.03, q.y * 40.0 + t * 0.02));
  float swell = snoise(vec2(q.x * 1.4 + t * 0.02, q.y * 7.0 - t * 0.03));
  float drift = snoise(q * 5.0 + vec2(t * 0.03, t * 0.02));
  float dx = (streak * 0.55 + swell * 0.45) * 0.0048 * (0.4 + 0.6 * depth);
  float dy = drift * 0.0012 * depth;
  vec2 flow = vec2(dx, dy) * water;

  vec2 pointerImg = cover(uPointer, uRes, uImg, uFocus);
  vec2 d = (base - pointerImg) * vec2(aspect, 1.0);
  float dist = length(d);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  float ring = sin(dist * 64.0 - t * 3.2) * exp(-dist * 7.0);
  vec2 touch = dir * ring * 0.0022 * uPointerAmt * water;

  vec2 sampleUv = clamp(base + flow + touch, 0.0, 1.0);
  gl_FragColor = vec4(texture2D(uTex, sampleUv).rgb, alpha);
}
`;

const styles = stylex.create({
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "block",
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "600ms",
    transitionTimingFunction: "ease",
  },
  ready: {
    opacity: 1,
  },
});

export type LiquidImageHandle = { setPaused: (paused: boolean) => void };

type LiquidImageProps = {
  src: string;
  focus: readonly [number, number];
  hostRef: RefObject<HTMLElement | null>;
  ref?: Ref<LiquidImageHandle>;
  sx?: StyleXStyles;
};

export function LiquidImage({ src, focus, hostRef, ref, sx }: LiquidImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const kickRef = useRef<() => void>(() => undefined);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const [focusX, focusY] = focus;

  useImperativeHandle(
    ref,
    () => ({
      setPaused(paused) {
        const resumed = pausedRef.current && !paused;
        pausedRef.current = paused;
        if (resumed) kickRef.current();
      },
    }),
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host || reduce) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    const shader = createFullscreenProgram(gl, FRAGMENT);
    if (!shader) return;
    const { program } = shader;

    const uTex = gl.getUniformLocation(program, "uTex");
    const uRes = gl.getUniformLocation(program, "uRes");
    const uImg = gl.getUniformLocation(program, "uImg");
    const uFocus = gl.getUniformLocation(program, "uFocus");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    const uPointerAmt = gl.getUniformLocation(program, "uPointerAmt");

    let texture: WebGLTexture | null = null;
    let frame = 0;
    let visible = true;
    let disposed = false;
    const start = performance.now();
    const pointer = { x: 0.5, y: 0.8, tx: 0.5, ty: 0.8, amt: 0, target: 0 };

    const resize = () => {
      const size = sizeCanvas(canvas, gl);
      gl.uniform2f(uRes, size.width, size.height);
    };

    const draw = (now: number) => {
      if (!texture) return;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.amt += (pointer.target - pointer.amt) * 0.05;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform1f(uPointerAmt, pointer.amt);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (disposed) return;
      draw(now);
      if (visible && !pausedRef.current && !document.hidden) frame = requestAnimationFrame(loop);
      else frame = 0;
    };

    const kick = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(loop);
    };
    kickRef.current = kick;

    loadTexture(gl, src, 0, gl.RGB)
      .then((loaded) => {
        if (disposed) return;
        texture = loaded.texture;
        gl.uniform1i(uTex, 0);
        gl.uniform2f(uImg, loaded.width, loaded.height);
        gl.uniform2f(uFocus, focusX, focusY);
        resize();
        draw(performance.now());
        setReady(true);
        kick();
      })
      .catch(() => undefined);

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (event.clientX - rect.left) / rect.width;
      pointer.ty = (event.clientY - rect.top) / rect.height;
      pointer.target = 1;
      kick();
    };
    const onPointerLeave = () => {
      pointer.target = 0;
    };
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      kick();
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) kick();
    });
    visibility.observe(canvas);

    const onVisibilityChange = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      kickRef.current = () => undefined;
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resizeObserver.disconnect();
      visibility.disconnect();
      if (texture) gl.deleteTexture(texture);
      shader.dispose();
    };
  }, [src, reduce, hostRef, focusX, focusY]);

  return <canvas ref={canvasRef} {...stylex.props(styles.canvas, ready && styles.ready, sx)} />;
}
