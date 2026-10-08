import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { MotionValue } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { COVER_UV, createFullscreenProgram, loadTexture, sizeCanvas } from "./webgl";

const PHOTO_INSET = 0.95;

export const GLYPH_SWEEP = 0.35;

export const glyphRise = (rise: number, x: number) =>
  Math.min(1, Math.max(0, rise * (1 + GLYPH_SWEEP) - x * GLYPH_SWEEP));

export function screenWaterline(
  waterline: number,
  width: number,
  height: number,
  imageAspect: number,
) {
  const scaleY = Math.min(1, imageAspect / (width / height));
  return (waterline - 0.5) / (scaleY * PHOTO_INSET) + 0.5;
}

const FRAGMENT = `
precision highp float;
uniform sampler2D uColor;
uniform sampler2D uDepth;
uniform sampler2D uGlyphs;
uniform vec2 uRes;
uniform vec2 uImg;
uniform vec2 uOffset;
uniform float uTime;
uniform float uWater;
uniform float uSeed;
uniform vec4 uGlyphRect;
uniform float uGlyphsOn;
uniform float uRise;
uniform vec2 uPointer;
uniform float uPointerOn;
varying vec2 vUv;
${COVER_UV}

vec2 wake(vec2 s) {
  float aspect = uRes.x / uRes.y;
  vec2 d = (s - uPointer) * vec2(aspect, 1.0);
  float dist = length(d);
  float ring = sin(dist * 95.0 - uTime * 5.5) * exp(-dist * 9.0);
  vec2 dir = d / max(dist, 0.0001);
  return vec2(dir.x / aspect, dir.y) * ring * 0.006 * uPointerOn;
}

float wakeLight(vec2 s) {
  vec2 d = (s - uPointer) * vec2(uRes.x / uRes.y, 1.0);
  float dist = length(d);
  float crest = smoothstep(0.55, 1.0, sin(dist * 95.0 - uTime * 5.5));
  return crest * exp(-dist * 11.0) * 0.12 * uPointerOn;
}

float glyphAlpha(vec2 s) {
  vec2 g = (s - uGlyphRect.xy) / uGlyphRect.zw;
  if (g.x < 0.0 || g.y < 0.0 || g.x > 1.0 || g.y > 1.0) return 0.0;
  return texture2D(uGlyphs, g).a;
}

float glyphSoft(vec2 s, float radius) {
  vec2 r = vec2(radius, radius * uRes.x / uRes.y);
  float a = glyphAlpha(s) * 0.36;
  a += (glyphAlpha(s + vec2(r.x, 0.0)) + glyphAlpha(s - vec2(r.x, 0.0))) * 0.12;
  a += (glyphAlpha(s + vec2(0.0, r.y)) + glyphAlpha(s - vec2(0.0, r.y))) * 0.12;
  a += (glyphAlpha(s + r * 0.7) + glyphAlpha(s - r * 0.7)) * 0.04;
  a += (glyphAlpha(s + vec2(r.x, -r.y) * 0.7) + glyphAlpha(s + vec2(-r.x, r.y) * 0.7)) * 0.04;
  return a;
}

void main() {
  vec2 s = vec2(vUv.x, 1.0 - vUv.y);
  vec2 uv = cover(s, uRes, uImg, ${PHOTO_INSET});
  vec2 p = uv;
  for (int i = 0; i < 5; i++) {
    float depth = texture2D(uDepth, p).r;
    p = uv + uOffset * (depth - 0.45);
  }

  vec3 color = texture2D(uColor, p).rgb;
  float below = p.y - uWater;
  if (uWater < 1.0 && below > 0.0) {
    float reach = 0.3 + below * 6.0;
    vec2 wave = vec2(
      sin(p.y * 260.0 - uTime * 1.3 + sin(p.x * 18.0 + uSeed) * 2.0),
      cos(p.x * 140.0 + uTime * 1.1 + p.y * 40.0 + uSeed * 2.0)
    ) * 0.0022 * reach + wake(s) * 0.9;
    vec3 water = texture2D(uColor, p + wave).rgb;
    vec2 mirrored = vec2(p.x + wave.x * 1.6, uWater - below * 0.92 + wave.y * 1.4);
    vec3 reflection = texture2D(uColor, mirrored).rgb * vec3(0.78, 0.86, 0.96);
    float strength = (1.0 - smoothstep(0.0, 0.28, below)) * 0.62;
    float shore = smoothstep(0.0, 0.006, below);
    float glint = smoothstep(
      0.97,
      1.0,
      sin(p.x * 820.0 + uSeed * 7.0 + uTime * 1.9) * sin(p.y * 640.0 - uTime * 1.4 + uSeed * 3.0)
    ) * smoothstep(0.02, 0.2, below) * 0.45;
    color = mix(color, mix(water, reflection, strength) + glint + wakeLight(s), shore);
  }

  vec2 local = (s - uGlyphRect.xy) / uGlyphRect.zw;
  if (uGlyphsOn > 0.5 && local.x > -0.05 && local.x < 1.05 && local.y > -0.3 && local.y < 1.3) {
    float rise = clamp(uRise * ${1 + GLYPH_SWEEP} - local.x * ${GLYPH_SWEEP}, 0.0, 1.0);
    float deep = 1.0 - rise;
    vec2 ripple = vec2(
      sin(s.y * 150.0 - uTime * 1.7 + sin(s.x * 11.0 + uSeed) * 2.4),
      cos(s.x * 70.0 + uTime * 1.3 + s.y * 24.0 + uSeed)
    ) * (0.0011 + deep * 0.008);
    float bob = sin(uTime * 0.7 + local.x * 5.0 + uSeed) * 0.0022;
    vec2 q = s + ripple + wake(s) - uOffset * 0.25 - vec2(0.0, deep * 0.045 + bob);
    vec2 fringe = vec2(0.0004 + deep * 0.003, 0.0);
    float blur = 0.0005 + deep * 0.01;
    vec3 ink = vec3(
      glyphSoft(q - fringe, blur),
      glyphSoft(q, blur),
      glyphSoft(q + fringe, blur)
    );
    float shade = glyphSoft(q + vec2(0.0, 0.014), 0.014);
    float light = 0.9 + 0.1 * sin(s.x * 40.0 - uTime * 1.1 + sin(s.y * 55.0 + uTime * 0.8) * 2.0);
    vec3 tone = mix(vec3(0.5, 0.68, 0.9), vec3(1.0), rise) * light;
    float opacity = pow(rise, 0.7) * 0.95;
    color *= 1.0 - shade * 0.24 * rise;
    color = mix(color, tone, ink * opacity);
  }
  gl_FragColor = vec4(color, 1.0);
}
`;

const ORBIT_X = 0.07;
const ORBIT_Y = 0.016;
const ORBIT_LIMIT = 0.3;
const POINTER_X = 0.02;
const POINTER_Y = 0.012;

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
    transitionDuration: "500ms",
    transitionTimingFunction: "ease",
  },
  ready: {
    opacity: 1,
  },
});

function paintGlyphs(
  root: HTMLElement,
  canvas: HTMLCanvasElement,
  target: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
) {
  const box = root.getBoundingClientRect();
  const frame = canvas.getBoundingClientRect();
  if (!box.width || !box.height || !frame.width || !canvas.clientWidth) return null;
  const scale = canvas.width / frame.width;
  const fontScale = canvas.width / canvas.clientWidth;
  const width = Math.max(1, Math.round(box.width * scale));
  const height = Math.max(1, Math.round(box.height * scale));
  if (target.width !== width || target.height !== height) {
    target.width = width;
    target.height = height;
  }
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#ffffff";
  context.textBaseline = "alphabetic";

  const fonts: string[] = [];
  for (const glyph of root.querySelectorAll<HTMLElement>("[data-lake-glyph]")) {
    const style = getComputedStyle(glyph);
    const size = Number.parseFloat(style.fontSize) * fontScale;
    const font = (px: number) =>
      `${style.fontStyle} ${style.fontWeight} ${px}px ${style.fontFamily}`;
    const text = glyph.dataset.lakeGlyph ?? "";
    const final = glyph.dataset.lakeFinal ?? text;
    const unit = glyph.dataset.lakeUnit ?? "";
    fonts.push(font(size));

    context.font = font(size);
    context.letterSpacing = `${-0.01 * size}px`;
    const ink = context.measureText(final);
    const finalWidth = ink.width;
    context.font = font(size * 0.42);
    context.letterSpacing = "0px";
    const unitWidth = unit ? context.measureText(unit).width + size * 0.06 : 0;
    const unitAscent = unit ? context.measureText(unit).actualBoundingBoxAscent : 0;

    const rect = glyph.getBoundingClientRect();
    const centerX = (rect.left + rect.width / 2 - box.left) * scale;
    const centerY = (rect.top + rect.height / 2 - box.top) * scale;
    const right = centerX - (finalWidth + unitWidth) / 2 + finalWidth;
    const baseline = centerY + (ink.actualBoundingBoxAscent - ink.actualBoundingBoxDescent) / 2;

    context.font = font(size);
    context.letterSpacing = `${-0.01 * size}px`;
    context.textAlign = "right";
    context.fillText(text, right, baseline);
    if (unit) {
      context.font = font(size * 0.42);
      context.letterSpacing = "0px";
      context.textAlign = "left";
      context.fillText(
        unit,
        right + size * 0.06,
        baseline - ink.actualBoundingBoxAscent + unitAscent,
      );
    }
  }
  return {
    fonts,
    rect: [
      (box.left - frame.left) / frame.width,
      (box.top - frame.top) / frame.height,
      box.width / frame.width,
      box.height / frame.height,
    ] as const,
  };
}

export function DepthPhoto({
  src,
  depthSrc,
  progress,
  waterline = 1,
  glyphRoot,
  rise,
  onGlyphsReady,
  sx,
}: {
  src: string;
  depthSrc: string;
  progress: MotionValue<number>;
  waterline?: number;
  glyphRoot?: RefObject<HTMLElement | null>;
  rise?: MotionValue<number>;
  onGlyphsReady?: () => void;
  sx?: StyleXStyles;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const glyphsReadyRef = useRef(onGlyphsReady);
  useEffect(() => {
    glyphsReadyRef.current = onGlyphsReady;
  }, [onGlyphsReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.parentElement;
    if (!canvas || !host) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    const shader = createFullscreenProgram(gl, FRAGMENT);
    if (!shader) return;
    const { program } = shader;

    const uColor = gl.getUniformLocation(program, "uColor");
    const uDepth = gl.getUniformLocation(program, "uDepth");
    const uGlyphs = gl.getUniformLocation(program, "uGlyphs");
    const uRes = gl.getUniformLocation(program, "uRes");
    const uImg = gl.getUniformLocation(program, "uImg");
    const uOffset = gl.getUniformLocation(program, "uOffset");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uWater = gl.getUniformLocation(program, "uWater");
    const uSeed = gl.getUniformLocation(program, "uSeed");
    const uGlyphRect = gl.getUniformLocation(program, "uGlyphRect");
    const uGlyphsOn = gl.getUniformLocation(program, "uGlyphsOn");
    const uRise = gl.getUniformLocation(program, "uRise");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    const uPointerOn = gl.getUniformLocation(program, "uPointerOn");
    gl.uniform1f(uWater, waterline);
    gl.uniform1f(uSeed, Math.random() * 100);
    gl.uniform1f(uGlyphsOn, 0);
    gl.uniform4f(uGlyphRect, 0, 0, 1, 1);

    const textures: WebGLTexture[] = [];
    const animatesWater = waterline < 1 && !reduce;
    const start = performance.now();
    let loaded = false;
    let frame = 0;
    let visible = true;
    let disposed = false;
    const offset = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0, u: 0.5, v: 0.5, inside: false, strength: 0 };

    const glyphs = glyphRoot?.current ?? null;
    const glyphCanvas = glyphs ? document.createElement("canvas") : null;
    const glyphContext = glyphCanvas?.getContext("2d") ?? null;
    const glyphTexture = glyphContext ? gl.createTexture() : null;
    let glyphsDirty = Boolean(glyphTexture);
    let glyphsAnnounced = false;
    if (glyphTexture) {
      textures.push(glyphTexture);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, glyphTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(uGlyphs, 2);
    }

    const target = () => {
      if (reduce) return { x: 0, y: 0 };
      const swing = Math.min(ORBIT_LIMIT, Math.max(-ORBIT_LIMIT, progress.get() - 0.5));
      return {
        x: swing * ORBIT_X + pointer.x,
        y: -swing * ORBIT_Y + pointer.y,
      };
    };

    const resize = () => {
      const size = sizeCanvas(canvas, gl);
      gl.uniform2f(uRes, size.width, size.height);
      glyphsDirty = Boolean(glyphTexture);
    };

    const uploadGlyphs = () => {
      glyphsDirty = false;
      if (!glyphs || !glyphCanvas || !glyphContext || !glyphTexture) return;
      const painted = paintGlyphs(glyphs, canvas, glyphCanvas, glyphContext);
      if (!painted) return;
      for (const font of painted.fonts) {
        if (!document.fonts.check(font)) {
          void document.fonts.load(font).then(() => {
            glyphsDirty = true;
          });
        }
      }
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, glyphTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, gl.ALPHA, gl.UNSIGNED_BYTE, glyphCanvas);
      gl.uniform4f(uGlyphRect, ...painted.rect);
      gl.uniform1f(uGlyphsOn, 1);
      if (!glyphsAnnounced) {
        glyphsAnnounced = true;
        glyphsReadyRef.current?.();
      }
    };

    const draw = () => {
      if (glyphsDirty) uploadGlyphs();
      gl.uniform2f(uOffset, offset.x, offset.y);
      gl.uniform1f(uTime, reduce ? 4 : (performance.now() - start) / 1000);
      gl.uniform1f(uRise, rise ? rise.get() : 0);
      gl.uniform2f(uPointer, pointer.u, pointer.v);
      gl.uniform1f(uPointerOn, pointer.strength);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = () => {
      frame = 0;
      if (disposed || !loaded) return;
      const goal = target();
      offset.x += (goal.x - offset.x) * 0.12;
      offset.y += (goal.y - offset.y) * 0.12;
      pointer.strength += ((pointer.inside ? 1 : 0) - pointer.strength) * 0.05;
      draw();
      const settled = Math.abs(goal.x - offset.x) < 0.0002 && Math.abs(goal.y - offset.y) < 0.0002;
      if ((animatesWater || !settled) && visible && !document.hidden) {
        frame = requestAnimationFrame(loop);
      }
    };

    const kick = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(loop);
    };

    const markGlyphsDirty = () => {
      glyphsDirty = Boolean(glyphTexture);
      kick();
    };

    Promise.all([loadTexture(gl, src, 0, gl.RGB), loadTexture(gl, depthSrc, 1, gl.LUMINANCE)])
      .then(([color, depth]) => {
        if (disposed) return;
        textures.push(color.texture, depth.texture);
        gl.uniform1i(uColor, 0);
        gl.uniform1i(uDepth, 1);
        gl.uniform2f(uImg, color.width, color.height);
        const goal = target();
        offset.x = goal.x;
        offset.y = goal.y;
        loaded = true;
        resize();
        draw();
        setReady(true);
        kick();
      })
      .catch(() => undefined);

    const unsubscribe = progress.on("change", kick);
    const unsubscribeRise = rise?.on("change", kick);

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * POINTER_X;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * POINTER_Y;
      const surface = canvas.getBoundingClientRect();
      pointer.u = (event.clientX - surface.left) / surface.width;
      pointer.v = (event.clientY - surface.top) / surface.height;
      pointer.inside = true;
      kick();
    };
    const onPointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
      pointer.inside = false;
      kick();
    };
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (loaded) draw();
    });
    resizeObserver.observe(canvas);
    if (glyphs) resizeObserver.observe(glyphs);

    const glyphObserver = new MutationObserver(markGlyphsDirty);
    if (glyphs) {
      glyphObserver.observe(glyphs, {
        subtree: true,
        attributes: true,
        attributeFilter: ["data-lake-glyph"],
      });
    }
    document.fonts.addEventListener("loadingdone", markGlyphsDirty);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) kick();
    });
    visibility.observe(canvas);

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      unsubscribe();
      unsubscribeRise?.();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      resizeObserver.disconnect();
      glyphObserver.disconnect();
      document.fonts.removeEventListener("loadingdone", markGlyphsDirty);
      visibility.disconnect();
      for (const texture of textures) gl.deleteTexture(texture);
      shader.dispose();
    };
  }, [src, depthSrc, progress, waterline, glyphRoot, rise, reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      {...stylex.props(styles.canvas, ready && styles.ready, sx)}
    />
  );
}
