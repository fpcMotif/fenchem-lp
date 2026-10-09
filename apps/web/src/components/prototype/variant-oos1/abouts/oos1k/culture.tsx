import * as stylex from "@stylexjs/stylex";
import { m, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CULTURE } from "../../about-data";
import { Nova } from "./nova";
import { chartStars } from "./sky";
import { ChartHeading } from "./shared";
import { ui } from "./shared-values";
import { bp, chrome, face, sky } from "./tokens.stylex";

const CHART = 600;
const FIELD_R = 286;
const STARS = [
  { x: 186, y: 214, designation: "a", dx: 20, dy: -14 },
  { x: 418, y: 258, designation: "b", dx: 20, dy: -14 },
  { x: 282, y: 424, designation: "Nova", dx: 26, dy: 58 },
] as const;
const NEW_INDEX = 2;

const FIELD_STARS = chartStars(36, 70, CHART, CHART).filter(
  (star) => Math.hypot(star.x - CHART / 2, star.y - CHART / 2) < FIELD_R - 14,
);
const FIELD_PATH = FIELD_STARS.map((star) => `M${star.x} ${star.y}h0`).join("");
const RIM_TICKS = Array.from({ length: 72 }, (_, index) => {
  const angle = (index * 5 * Math.PI) / 180;
  const inner = FIELD_R - (index % 6 === 0 ? 12 : 6);
  const at = (radius: number) =>
    `${(CHART / 2 + radius * Math.cos(angle)).toFixed(1)} ${(CHART / 2 + radius * Math.sin(angle)).toFixed(1)}`;
  return `M${at(FIELD_R)}L${at(inner)}`;
}).join("");

const styles = stylex.create({
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.wideUp]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    marginTop: { default: 48, [bp.wideUp]: 0 },
  },
  scope: {
    display: { default: "none", [bp.wideUp]: "flex" },
    gridColumn: "1 / span 6",
    gridRow: "1",
    position: "sticky",
    top: chrome.header,
    alignSelf: "start",
    alignItems: "center",
    justifyContent: "center",
    height: chrome.sky,
  },
  scopeSvg: {
    display: "block",
    width: "min(100%, 580px, calc(100svh - 200px))",
    height: "auto",
    overflow: "visible",
  },
  eyepiece: {
    fill: sky.deep,
    fillOpacity: 0.78,
    stroke: sky.tint,
    strokeOpacity: 0.3,
    strokeWidth: 1,
  },
  rim: {
    fill: "none",
    stroke: sky.tint,
    strokeOpacity: 0.3,
    strokeWidth: 1,
  },
  fieldStars: {
    fill: "none",
    stroke: sky.tint,
    strokeOpacity: 0.42,
    strokeWidth: 1.4,
    strokeLinecap: "round",
  },
  asterism: {
    stroke: sky.tint,
    strokeOpacity: 0.4,
    strokeWidth: 1,
  },
  point: {
    fill: sky.star,
  },
  glyph: {
    fontFamily: face.sans,
    fontSize: 34,
    fontWeight: 500,
    fill: sky.star,
    transitionProperty: "opacity",
    transitionDuration: "600ms",
  },
  glyphQuiet: {
    opacity: 0.42,
  },
  tag: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 24,
    fill: sky.muted,
  },
  entries: {
    gridColumn: { default: "1", [bp.wideUp]: "8 / span 5" },
    gridRow: "1",
    margin: 0,
    padding: 0,
    paddingBlock: { default: 0, [bp.wideUp]: "16svh" },
    listStyleType: "none",
  },
  entry: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: { default: "48px minmax(0, 1fr)", [bp.wideUp]: "minmax(0, 1fr)" },
    columnGap: 16,
    alignContent: "center",
    minHeight: { default: 0, [bp.wideUp]: "56svh" },
    paddingBottom: { default: 56, [bp.wideUp]: 0 },
  },
  marker: {
    display: { default: "block", [bp.wideUp]: "none" },
    gridRow: "1 / span 3",
    position: "relative",
    width: 48,
    height: 48,
    overflow: "visible",
  },
  meridian: {
    display: { default: "block", [bp.wideUp]: "none" },
    position: "absolute",
    top: 36,
    bottom: 12,
    left: 23.5,
    width: 1,
    backgroundColor: sky.hairStrong,
    transformOrigin: "top",
    transitionProperty: "opacity, transform",
    transitionDuration: "1200ms",
    transitionDelay: "900ms",
    transitionTimingFunction: chrome.ease,
  },
  meridianDark: {
    opacity: 0,
    transform: "scaleY(0)",
  },
  name: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    margin: 0,
    minHeight: 30,
  },
  nameGlyph: {
    fontFamily: face.sans,
    fontSize: 26,
    fontWeight: 500,
    color: sky.star,
  },
  nameTag: {
    fontSize: 15,
    color: sky.text,
  },
  title: {
    margin: 0,
    marginTop: { default: 10, [bp.wideUp]: 14 },
    fontFamily: face.sans,
    fontSize: { default: 28, [bp.desktop]: 36 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.04em",
    color: sky.star,
  },
  desc: {
    marginTop: { default: 12, [bp.wideUp]: 16 },
    maxWidth: "24em",
  },
});

function useActive(count: number) {
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(refs.current.indexOf(entry.target as HTMLLIElement));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    for (const element of refs.current.slice(0, count)) if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [count]);
  return [refs, active] as const;
}

export function Culture({ lit, onIgnite }: { lit: boolean; onIgnite: () => void }) {
  const reduce = useReducedMotion();
  const newTitle = useRef<HTMLHeadingElement>(null);
  const seen = useInView(newTitle, { once: true, margin: "0px 0px -30% 0px" });
  const [refs, active] = useActive(ABOUT_CULTURE.values.length);
  const shining = lit || reduce;

  useEffect(() => {
    if (seen || reduce) onIgnite();
  }, [seen, reduce, onIgnite]);

  const [first, second, nova] = STARS;

  return (
    <section
      id="about-culture"
      aria-labelledby="oos1k-culture"
      {...stylex.props(ui.section, ui.shell)}
    >
      <ChartHeading
        id="oos1k-culture"
        numeral="III"
        label="Culture"
        title={ABOUT_CULTURE.title}
        note="Three stars, one of them new"
      />

      <div {...stylex.props(styles.layout)}>
        <div aria-hidden="true" {...stylex.props(styles.scope)}>
          <svg viewBox={`0 0 ${CHART} ${CHART}`} {...stylex.props(styles.scopeSvg)}>
            <circle cx={CHART / 2} cy={CHART / 2} r={FIELD_R} {...stylex.props(styles.eyepiece)} />
            <path d={RIM_TICKS} {...stylex.props(styles.rim)} />
            <path d={FIELD_PATH} {...stylex.props(styles.fieldStars)} />
            <line
              x1={first.x}
              y1={first.y}
              x2={second.x}
              y2={second.y}
              {...stylex.props(styles.asterism)}
            />
            <m.line
              x1={second.x}
              y1={second.y}
              x2={nova.x}
              y2={nova.y}
              initial={{ opacity: 0 }}
              animate={{ opacity: shining ? 1 : 0 }}
              transition={{ delay: reduce ? 0 : 1.1, duration: reduce ? 0 : 1.4 }}
              {...stylex.props(styles.asterism)}
            />
            <circle cx={first.x} cy={first.y} r={4.6} {...stylex.props(styles.point)} />
            <circle cx={second.x} cy={second.y} r={3.6} {...stylex.props(styles.point)} />
            <Nova x={nova.x} y={nova.y} lit={shining} instant={reduce} size="chart" />
            {ABOUT_CULTURE.values.map((value, index) => {
              const star = STARS[index];
              const isNew = index === NEW_INDEX;
              return (
                <m.g
                  key={value.glyph}
                  initial={false}
                  animate={{ opacity: isNew && !shining ? 0 : 1 }}
                  transition={{ delay: isNew && !reduce ? 0.9 : 0, duration: reduce ? 0 : 0.8 }}
                >
                  <text
                    x={star.x + star.dx}
                    y={star.y + star.dy}
                    {...stylex.props(styles.glyph, active !== index && styles.glyphQuiet)}
                  >
                    {value.glyph}
                  </text>
                  <text
                    x={star.x + star.dx + 40}
                    y={star.y + star.dy}
                    {...stylex.props(styles.tag)}
                  >
                    {star.designation}
                  </text>
                </m.g>
              );
            })}
          </svg>
        </div>

        <ol {...stylex.props(styles.entries)}>
          {ABOUT_CULTURE.values.map((value, index) => {
            const isNew = index === NEW_INDEX;
            return (
              <li
                key={value.glyph}
                ref={(element) => {
                  refs.current[index] = element;
                }}
                {...stylex.props(styles.entry)}
              >
                <svg aria-hidden="true" viewBox="-24 -24 48 48" {...stylex.props(styles.marker)}>
                  {isNew ? (
                    <Nova x={0} y={0} lit={shining} instant={reduce} size="inline" />
                  ) : (
                    <circle r={index === 0 ? 4 : 3.2} {...stylex.props(styles.point)} />
                  )}
                </svg>
                {index === NEW_INDEX - 1 ? (
                  <span
                    aria-hidden="true"
                    {...stylex.props(styles.meridian, !shining && styles.meridianDark)}
                  />
                ) : index < NEW_INDEX - 1 ? (
                  <span aria-hidden="true" {...stylex.props(styles.meridian)} />
                ) : null}
                <p {...stylex.props(styles.name)}>
                  <span {...stylex.props(styles.nameGlyph)}>{value.glyph}</span>
                  <m.span
                    initial={false}
                    animate={{ opacity: isNew && !shining ? 0 : 1 }}
                    transition={{ delay: isNew && !reduce ? 1 : 0, duration: reduce ? 0 : 0.8 }}
                    {...stylex.props(ui.label, styles.nameTag)}
                  >
                    {isNew ? (
                      <>
                        <span lang="en" {...stylex.props(ui.designation)}>
                          Nova
                        </span>{" "}
                        · 新星
                      </>
                    ) : (
                      <>
                        <span lang="en">Star </span>
                        <span {...stylex.props(ui.designation)}>{STARS[index].designation}</span>
                      </>
                    )}
                  </m.span>
                </p>
                <h3 ref={isNew ? newTitle : undefined} {...stylex.props(styles.title)}>
                  {value.title}
                </h3>
                <p {...stylex.props(ui.body, styles.desc)}>{value.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
