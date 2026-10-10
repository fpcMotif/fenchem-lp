import { COVER_UV } from "../shared/webgl";

export const HERO_BLOB_TWIST = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform float uTime;
uniform float uScroll;
varying vec2 vUv;
${COVER_UV}

vec2 twist(vec2 st, vec2 center, float radius, float phase, float spin, float ramp) {
  vec2 aspect = vec2(uImg.x / uImg.y, 1.0);
  vec2 d = (st - center) * aspect;
  float r = length(d) / radius;
  float falloff = 1.0 - smoothstep(0.5, 1.5, r);
  float live = falloff * ramp;
  float angle = live * (0.18 * sin(uTime * 0.7 + phase) + 0.05 * sin(uTime * 1.7 + phase * 2.0))
    + falloff * spin * 0.25 * uScroll;
  float breathe = 1.0 + live * 0.06 * sin(uTime * 0.9 + phase * 1.7);
  float wobble = 1.0 + falloff * 0.06 * max(ramp, uScroll)
    * sin(atan(d.y, d.x) * 3.0 + uTime * 1.1 + phase + uScroll * 4.0);
  float c = cos(angle);
  float s = sin(angle);
  vec2 turned = mat2(c, s, -s, c) * d / (breathe * wobble);
  vec2 pull = normalize((vec2(0.5) - center) * aspect) * 0.04 * uScroll * falloff;
  return (turned - d - pull) / aspect;
}

void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  vec2 st = cover(uv, uRes, uImg, 1.0);
  float ramp = smoothstep(0.0, 4.0, uTime);
  vec2 offset = twist(st, vec2(0.67, 0.27), 0.24, 0.0, 1.0, ramp)
    + twist(st, vec2(0.11, 0.82), 0.24, 2.1, -1.0, ramp)
    + twist(st, vec2(0.84, 0.9), 0.17, 4.2, 1.0, ramp);
  gl_FragColor = vec4(texture2D(uTex, st + offset).rgb, 1.0);
}
`;
