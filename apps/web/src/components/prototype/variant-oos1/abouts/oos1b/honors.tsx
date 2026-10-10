import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

import { ABOUT_HONORS } from "../../about-data";
import { SectionHead, Tag, useArrived } from "./shared";
import { ROMAN, bevel, srOnly, stepIn, ui } from "./shared-values";
import { bp, face, space, tone } from "./tokens.stylex";

type Level = (typeof ABOUT_HONORS.items)[number]["level"];
type Edge = "top" | "right" | "bottom" | "left";

const TIERS: readonly { level: Level; label: string; english: string; edges: readonly Edge[] }[] = [
  { level: "national", label: "国家级", english: "National", edges: ["top"] },
  {
    level: "provincial",
    label: "省级",
    english: "Provincial",
    edges: ["top", "right", "bottom", "left"],
  },
  { level: "municipal", label: "市级", english: "Municipal", edges: ["top", "right", "left"] },
];

const bandWidth = `calc(${space.step} * 2)`;

const styles = stylex.create({
  tier: {
    position: "relative",
    boxSizing: "border-box",
    paddingTop: { default: 32, [bp.tablet]: 40, [bp.desktop]: bandWidth },
    paddingInline: { default: 16, [bp.tablet]: 24, [bp.desktop]: bandWidth },
    paddingBottom: { default: 16, [bp.tablet]: 24, [bp.desktop]: bandWidth },
    backgroundColor: tone.page,
  },
  raised: {
    boxShadow:
      "0 0 0 1px rgba(26, 26, 26, 0.07), 0 1px 1px rgba(11, 42, 92, 0.04), 0 30px 60px -44px rgba(11, 42, 92, 0.32)",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 0,
    marginBottom: { default: 20, [bp.tablet]: 24, [bp.desktop]: 0 },
    padding: 0,
    listStyleType: "none",
  },
  title: {
    fontFamily: face.sans,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
  size0: {
    fontSize: { default: 20, [bp.tablet]: 22, [bp.laptop]: 22, [bp.wide]: 26 },
    color: tone.navy,
  },
  size1: { fontSize: { default: 17, [bp.tablet]: 19, [bp.laptop]: 19, [bp.wide]: 21 } },
  size2: { fontSize: { default: 15, [bp.tablet]: 16, [bp.laptop]: 16, [bp.wide]: 17 } },
  edge: {
    position: { default: "static", [bp.desktop]: "absolute" },
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "flex-start", [bp.desktop]: "center" },
  },
  top: {
    top: 0,
    left: bandWidth,
    right: bandWidth,
    height: { default: "auto", [bp.desktop]: bandWidth },
  },
  bottom: {
    bottom: 0,
    left: bandWidth,
    right: bandWidth,
    height: { default: "auto", [bp.desktop]: bandWidth },
  },
  left: {
    top: bandWidth,
    bottom: bandWidth,
    left: 0,
    width: { default: "auto", [bp.desktop]: bandWidth },
    writingMode: { default: "horizontal-tb", [bp.desktop]: "vertical-rl" },
  },
  right: {
    top: bandWidth,
    bottom: bandWidth,
    right: 0,
    width: { default: "auto", [bp.desktop]: bandWidth },
    writingMode: { default: "horizontal-tb", [bp.desktop]: "vertical-rl" },
  },
  core: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: { default: 10, [bp.desktop]: 14 },
    boxSizing: "border-box",
    minHeight: { default: 96, [bp.tablet]: 120, [bp.laptop]: 200, [bp.wide]: 228 },
    padding: { default: 20, [bp.desktop]: 32 },
    backgroundColor: tone.whisper,
  },
  count: {
    fontSize: { default: 56, [bp.tablet]: 72, [bp.laptop]: 96, [bp.wide]: 112 },
    lineHeight: 0.8,
    color: tone.navy,
    fontVariantNumeric: "lining-nums",
  },
  countLabel: {
    fontFamily: face.sans,
    fontSize: 13,
    letterSpacing: "0.24em",
    color: tone.quiet,
  },
});

const EDGE_STYLES = {
  top: styles.top,
  right: styles.right,
  bottom: styles.bottom,
  left: styles.left,
} as const;
const SIZES = [styles.size0, styles.size1, styles.size2] as const;

function Tier({
  depth,
  arrived,
  children,
}: {
  depth: number;
  arrived: boolean;
  children: ReactNode;
}) {
  const tier = TIERS[depth];
  const items = ABOUT_HONORS.items.filter((item) => item.level === tier.level);
  return (
    <div
      {...stylex.props(
        styles.tier,
        depth === 0 ? styles.raised : bevel.edge,
        ...stepIn(arrived, depth),
      )}
    >
      <h3 {...srOnly}>{tier.english} honors</h3>
      <span aria-hidden="true">
        <Tag numeral={ROMAN[depth]} label={`${tier.english} · ${tier.label}`} />
      </span>
      <ul {...stylex.props(styles.list)}>
        {items.map((item, index) => (
          <li key={item.id} {...stylex.props(styles.edge, EDGE_STYLES[tier.edges[index] ?? "top"])}>
            <span {...stylex.props(styles.title, SIZES[depth])}>{item.title}</span>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

export function Honors() {
  const [ref, arrived] = useArrived<HTMLDivElement>();
  return (
    <section
      id="about-honor"
      aria-labelledby="oos1b-honor"
      {...stylex.props(ui.anchor, ui.section, ui.shell)}
    >
      <SectionHead
        id="oos1b-honor"
        index={5}
        eyebrow="Honours"
        title={ABOUT_HONORS.title}
        note="From the nation inward to the city."
      />
      <div ref={ref}>
        <Tier depth={0} arrived={arrived}>
          <Tier depth={1} arrived={arrived}>
            <Tier depth={2} arrived={arrived}>
              <p {...stylex.props(ui.reset, styles.core, bevel.edge, ...stepIn(arrived, 3))}>
                <span lang="en" {...stylex.props(ui.serif, styles.count)}>
                  {ABOUT_HONORS.items.length}
                </span>
                <span {...stylex.props(styles.countLabel)}>项企业荣誉</span>
              </p>
            </Tier>
          </Tier>
        </Tier>
      </div>
    </section>
  );
}
