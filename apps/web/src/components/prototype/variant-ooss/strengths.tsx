import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ArrowUpRight, Globe, Lightbulb, Shield, Users, type LucideIcon } from "lucide-react";

import { STRENGTHS, STRENGTHS_INTRO, type StrengthIcon, type StrengthTone } from "./content";
import { Reveal } from "./motion";
import { media } from "./tokens.stylex";
import { layout } from "./ui";

const HEADER_HEIGHT = 80;

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";

const STRENGTH_ICONS: Record<StrengthIcon, LucideIcon> = {
  globe: Globe,
  shield: Shield,
  bulb: Lightbulb,
  users: Users,
};

const PATTERN_CELLS = Array.from({ length: 15 }, (_, column) =>
  (column % 2 === 0 ? [0, 65, 130] : [32.5, 97.5]).map((top) => ({
    left: 3 + column * 32.75,
    top,
  })),
).flat();

const styles = stylex.create({
  anchor: {
    scrollMarginTop: HEADER_HEIGHT,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [media.desktop]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
    textWrap: "balance",
  },
  sectionLead: {
    margin: 0,
    fontSize: { default: 16, [media.desktop]: 18 },
    lineHeight: 1.6,
    color: BODY_TEXT,
    textAlign: "center",
    textWrap: "pretty",
  },
  strengths: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 48,
    paddingBlock: { default: 72, [media.desktop]: 96 },
    backgroundColor: "#ffffff",
  },
  introBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    maxWidth: 768,
  },
  strengthGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.tablet]: "repeat(2, minmax(0, 1fr))",
      [media.desktop]: "repeat(4, minmax(0, 1fr))",
    },
    width: "100%",
    maxWidth: 1200,
  },
  strengthCard: {
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: 164,
    paddingTop: 105,
    paddingBottom: 18,
    paddingInlineStart: 32,
    paddingInlineEnd: 27,
    boxSizing: "border-box",
  },
  toneBlue: { backgroundColor: "#4668a5", color: "#e6ecf7" },
  toneGray: { backgroundColor: "#e3e3e3", color: "#f1f1f1" },
  toneGreen: { backgroundColor: "#93c170", color: "#a2ca85" },
  toneCream: { backgroundColor: "#fffae5", color: "#fff7d9" },
  pattern: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    mixBlendMode: "multiply",
    pointerEvents: "none",
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: 1,
      [stylex.when.ancestor(":focus-within")]: 1,
    },
    transitionProperty: "opacity",
    transitionDuration: "250ms",
    transitionTimingFunction: "ease",
  },
  patternCell: (left: string, top: string) => ({
    position: "absolute",
    left,
    top,
  }),
  strengthText: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    columnGap: 12,
    rowGap: 8,
    color: INK,
  },
  strengthTextInverse: {
    color: "#ffffff",
  },
  strengthCopy: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  strengthTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },
  strengthSmall: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.3,
  },
  strengthLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    paddingBlock: 8,
    marginBlock: -8,
    fontSize: 13,
    lineHeight: 1.3,
    color: "inherit",
    whiteSpace: "nowrap",
    textDecoration: { default: "none", ":hover": "underline" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: "currentColor",
    outlineOffset: -2,
  },
});

const TONE_STYLES: Record<StrengthTone, StyleXStyles> = {
  blue: styles.toneBlue,
  gray: styles.toneGray,
  green: styles.toneGreen,
  cream: styles.toneCream,
};

function IconPattern({ icon }: { icon: StrengthIcon }) {
  const Icon = STRENGTH_ICONS[icon];
  return (
    <div aria-hidden="true" {...stylex.props(styles.pattern)}>
      {PATTERN_CELLS.map((cell) => (
        <Icon
          key={`${cell.left}-${cell.top}`}
          size={32}
          strokeWidth={2}
          absoluteStrokeWidth
          {...stylex.props(styles.patternCell(`${cell.left}px`, `${cell.top}px`))}
        />
      ))}
    </div>
  );
}

export function Strengths() {
  return (
    <section
      id="strengths"
      aria-labelledby="oo-strengths-title"
      {...stylex.props(styles.strengths, layout.inset, styles.anchor)}
    >
      <Reveal sx={styles.introBlock}>
        <h2 id="oo-strengths-title" {...stylex.props(styles.sectionTitle)}>
          {STRENGTHS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{STRENGTHS_INTRO.lead}</p>
      </Reveal>
      <div {...stylex.props(styles.strengthGrid)}>
        {STRENGTHS.map((strength, index) => (
          <Reveal
            key={strength.title}
            index={index}
            sx={[styles.strengthCard, TONE_STYLES[strength.tone], stylex.defaultMarker()]}
          >
            <IconPattern icon={strength.icon} />
            <div
              {...stylex.props(
                styles.strengthText,
                strength.tone === "blue" && styles.strengthTextInverse,
              )}
            >
              <div {...stylex.props(styles.strengthCopy)}>
                <h3 {...stylex.props(styles.strengthTitle)}>{strength.title}</h3>
                {strength.description ? (
                  <p {...stylex.props(styles.strengthSmall)}>{strength.description}</p>
                ) : null}
              </div>
              {strength.link ? (
                <a href="#offices" {...stylex.props(styles.strengthLink)}>
                  {strength.link}
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    aria-hidden="true"
                  />
                </a>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
