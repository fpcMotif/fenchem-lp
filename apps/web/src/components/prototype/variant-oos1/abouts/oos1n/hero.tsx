import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { ArchPhoto } from "./shared";
import { ui } from "./shared-values";
import { motionCss, step, tone } from "./tokens.stylex";

const rise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "none" },
});

const dropIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(-10px) rotate(45deg)" },
  "100%": { opacity: 1, transform: "rotate(45deg)" },
});

const dynamic = stylex.create({
  delay: (ms: number) => ({ animationDelay: `${ms}ms` }),
});

const s = stylex.create({
  hero: {
    paddingTop: { default: 104, [breakpoints.md]: 120, [breakpoints.xl]: 128 },
    paddingBottom: { default: 40, [breakpoints.md]: 64, [breakpoints.xl]: 76 },
  },
  enter: {
    animationName: { default: null, [breakpoints.motionOk]: rise },
    animationDuration: "800ms",
    animationTimingFunction: motionCss.out,
    animationFillMode: "backwards",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 40,
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 7" },
    minWidth: 0,
  },
  title: {
    margin: 0,
    fontSize: { default: step.hero, [breakpoints.md]: "88px", [breakpoints.xl]: step.mega },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  lower: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  lead: {
    margin: 0,
    maxWidth: "26em",
    fontSize: step.body,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: tone.body,
    textWrap: "pretty",
  },
  leadLine: {
    display: "block",
  },
  figure: {
    gridColumn: { default: "auto", [breakpoints.lg]: "8 / 13" },
    minWidth: 0,
    maxWidth: { default: "none", [breakpoints.md]: 520 },
  },
  vesselWrap: {
    position: "relative",
  },
  ratio: {
    aspectRatio: "4 / 5",
  },
  photo: {
    objectPosition: "30% 50%",
  },
  drop: {
    position: "absolute",
    right: -12,
    bottom: "22%",
    width: 12,
    height: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
    borderBottomLeftRadius: "50%",
    backgroundColor: tone.mint,
    transform: "rotate(45deg)",
    animationName: { default: null, [breakpoints.motionOk]: dropIn },
    animationDuration: "700ms",
    animationDelay: "1250ms",
    animationTimingFunction: motionCss.out,
    animationFillMode: "backwards",
  },
});

export function Hero() {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(s.hero, ui.onPage)}>
      <div {...stylex.props(ui.shell, ui.inset, ui.grid)}>
        <div {...stylex.props(s.copy)}>
          <h1 id="about-banner-title" {...stylex.props(s.title, s.enter, dynamic.delay(150))}>
            {ABOUT_BANNER.title}
          </h1>
          <div {...stylex.props(s.lower, s.enter, dynamic.delay(350))}>
            <p {...stylex.props(s.lead)}>
              {ABOUT_BANNER.lead.split(" · ").map((part) => (
                <span key={part} {...stylex.props(s.leadLine)}>
                  {part}
                </span>
              ))}
            </p>
          </div>
        </div>
        <figure {...stylex.props(ui.figure, s.figure)}>
          <div {...stylex.props(s.vesselWrap)}>
            <ArchPhoto
              src={ABOUT_BANNER.image}
              alt={ABOUT_BANNER.alt}
              mode="load"
              priority
              ratio={s.ratio}
              position={s.photo}
            />
            <span aria-hidden="true" {...stylex.props(s.drop)} />
          </div>
        </figure>
      </div>
    </section>
  );
}
