import * as stylex from "@stylexjs/stylex";
import { ArrowLeft } from "lucide-react";
import type { CSSProperties } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER } from "../../about-data";
import type { AboutPageProps } from "../../index";
import { ui } from "./layout";
import { PlateHead } from "./plate-head";
import { useEntry } from "./strobe";
import { TICK, echoIndexes, strobe, trailOpacity } from "./strobe-values";
import { bp, face, tone } from "./tokens.stylex";

const BACKWARD_ECHOES = 4;
const BRIGHTEST_ECHO = 0.2;
const REDUCED_ECHO_OPACITY = 0.12;

const styles = stylex.create({
  section: {
    paddingBottom: { default: 96, [bp.tablet]: 128, [bp.desktop]: 152 },
  },
  link: {
    "--dx": "0.32em",
    "--dy": "0.18em",
    display: "inline-flex",
    flexDirection: "column",
    gap: { default: 14, [bp.desktop]: 18 },
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 48, [bp.tablet]: 64, [bp.desktop]: "clamp(72px, 6vw, 92px)" },
    color: tone.ink,
    textDecoration: "none",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.brand,
    outlineOffset: 10,
  },
  stackReduced: {
    paddingBottom: "var(--dy)",
  },
  sub: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    fontSize: { default: 16, [bp.desktop]: 17 },
    letterSpacing: "0.04em",
    color: tone.body,
  },
  subEnglish: {
    fontSize: 20,
  },
  stack: {
    position: "relative",
    display: "block",
    paddingBottom: "calc(4 * var(--dy))",
    paddingInlineEnd: "calc(4 * var(--dx))",
    lineHeight: 1.1,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
  },
  line: {
    display: "flex",
    alignItems: "center",
    gap: "0.16em",
  },
  final: {
    color: {
      default: tone.ink,
      [stylex.when.ancestor(":hover")]: tone.brand,
      [stylex.when.ancestor(":focus-visible")]: tone.brand,
    },
    transitionProperty: "color",
    transitionDuration: "160ms",
  },
  arrow: {
    flexShrink: 0,
    width: "0.78em",
    height: "0.78em",
    color: tone.brand,
  },
  echo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    color: tone.navy,
    pointerEvents: "none",
    userSelect: "none",
  },
  echoInner: {
    opacity: "var(--o)",
    transform: {
      default: "translate3d(calc(var(--k) * var(--dx)), calc(var(--k) * var(--dy)), 0)",
      [stylex.when.ancestor(":hover")]:
        "translate3d(calc(var(--k) * var(--dx) * 1.6), calc(var(--k) * var(--dy) * 1.6), 0)",
      [stylex.when.ancestor(":focus-visible")]:
        "translate3d(calc(var(--k) * var(--dx) * 1.6), calc(var(--k) * var(--dy) * 1.6), 0)",
    },
    transitionProperty: { default: "none", [bp.hoverMotion]: "transform" },
    transitionDuration: "250ms",
    transitionTimingFunction: "steps(3, end)",
  },
});

export function Closing({ onNavigateHome }: AboutPageProps) {
  const reduce = useReducedMotion();
  const [linkRef, phase] = useEntry<HTMLAnchorElement>();
  const echoes = reduce ? [1] : echoIndexes(BACKWARD_ECHOES);

  const lineContent = (
    <>
      <ArrowLeft aria-hidden="true" strokeWidth={1.5} {...stylex.props(styles.arrow)} />
      <span>返回首页</span>
    </>
  );

  return (
    <section aria-labelledby="oos1p-closing" {...stylex.props(ui.plate, styles.section)}>
      <PlateHead
        plate={7}
        english="Return"
        title={ABOUT_BANNER.tagline}
        titleId="oos1p-closing"
        latin
      />
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(ui.grid)}>
          <div {...stylex.props(ui.q2to4)}>
            <a
              ref={linkRef}
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                onNavigateHome("contact");
              }}
              {...stylex.props(styles.link, stylex.defaultMarker())}
            >
              <span {...stylex.props(styles.sub)}>
                联系我们
                <span lang="en" {...stylex.props(ui.eyebrow, styles.subEnglish)}>
                  Contact
                </span>
              </span>
              <span {...stylex.props(styles.stack, reduce && styles.stackReduced)}>
                <span
                  {...stylex.props(
                    styles.line,
                    styles.final,
                    phase === "armed" && strobe.hidden,
                    phase === "fire" && strobe.pop,
                  )}
                  style={{ "--pop-at": `${BACKWARD_ECHOES * TICK}ms` } as CSSProperties}
                >
                  {lineContent}
                </span>
                {echoes.map((k) => (
                  <span
                    key={k}
                    aria-hidden="true"
                    {...stylex.props(
                      styles.echo,
                      phase === "armed" && strobe.hidden,
                      phase === "fire" && strobe.pop,
                    )}
                    style={{ "--pop-at": `${(BACKWARD_ECHOES - k) * TICK}ms` } as CSSProperties}
                  >
                    <span
                      {...stylex.props(styles.line, styles.echoInner)}
                      style={
                        {
                          "--k": k,
                          "--o": reduce
                            ? REDUCED_ECHO_OPACITY
                            : trailOpacity(k, BACKWARD_ECHOES, BRIGHTEST_ECHO).toFixed(3),
                        } as CSSProperties
                      }
                    >
                      {lineContent}
                    </span>
                  </span>
                ))}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
