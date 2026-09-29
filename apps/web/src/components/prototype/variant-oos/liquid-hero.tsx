import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { COVER_UV, createFullscreenProgram, loadTexture, sizeCanvas } from "./webgl";

const FRAGMENT = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
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

void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  float aspect = uRes.x / uRes.y;
  float t = uTime * 0.04;
  vec2 p = uv * vec2(aspect, 1.0) * 0.7;
  vec2 swell = vec2(snoise(p + vec2(0.0, t)), snoise(p + vec2(4.7, -t)));
  vec2 billow = vec2(
    snoise(p * 1.9 + swell * 0.5 + vec2(t * 1.3, 2.1)),
    snoise(p * 1.9 + swell * 0.5 + vec2(6.4, -t * 1.1))
  );
  vec2 flow = (swell + 0.3 * billow) * 0.011;

  vec2 d = (uv - uPointer) * vec2(aspect, 1.0);
  float dist = length(d);
  float press = exp(-dist * dist * 8.0) * uPointerAmt;
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  vec2 duv = uv + flow - dir * press * 0.005;

  gl_FragColor = vec4(texture2D(uTex, cover(duv, uRes, uImg, 0.97)).rgb, 1.0);
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

export function LiquidImage({ src, sx }: { src: string; sx?: StyleXStyles }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.parentElement;
    if (!canvas || !host) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    const shader = createFullscreenProgram(gl, FRAGMENT);
    if (!shader) return;
    const { program } = shader;

    const uTex = gl.getUniformLocation(program, "uTex");
    const uRes = gl.getUniformLocation(program, "uRes");
    const uImg = gl.getUniformLocation(program, "uImg");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    const uPointerAmt = gl.getUniformLocation(program, "uPointerAmt");

    let texture: WebGLTexture | null = null;
    let frame = 0;
    let visible = true;
    let disposed = false;
    const start = performance.now();
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, amt: 0, target: 0 };

    const resize = () => {
      const size = sizeCanvas(canvas, gl);
      gl.uniform2f(uRes, size.width, size.height);
    };

    const draw = (now: number) => {
      if (!texture) return;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.amt += (pointer.target - pointer.amt) * 0.05;
      gl.uniform1f(uTime, reduce ? 12 : (now - start) / 1000);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform1f(uPointerAmt, reduce ? 0 : pointer.amt);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (disposed) return;
      draw(now);
      if (!reduce && visible && !document.hidden) frame = requestAnimationFrame(loop);
      else frame = 0;
    };

    const kick = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(loop);
    };

    loadTexture(gl, src, 0, gl.RGB)
      .then((loaded) => {
        if (disposed) return;
        texture = loaded.texture;
        gl.uniform1i(uTex, 0);
        gl.uniform2f(uImg, loaded.width, loaded.height);
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
      if (reduce) draw(performance.now());
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
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resizeObserver.disconnect();
      visibility.disconnect();
      if (texture) gl.deleteTexture(texture);
      shader.dispose();
    };
  }, [src, reduce]);

  return <canvas ref={canvasRef} {...stylex.props(styles.canvas, ready && styles.ready, sx)} />;
}
