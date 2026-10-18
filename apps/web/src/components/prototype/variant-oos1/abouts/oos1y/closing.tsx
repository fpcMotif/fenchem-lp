import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowUpRight, Plus } from "@fenchem-lp/ui/components/lucide";
import { createSignal } from "solid-js";

import { ABOUT_CAMPUS, ABOUT_HONORS, ABOUT_STRUCTURE } from "../../about-data";
import { CTA } from "../../content";
import { Reveal } from "./reveal";
import { srOnly, ui } from "./shared";
import { bp, face, pane, tone } from "./tokens.stylex";

const LEVELS = [
  { level: "national", label: "国家级" },
  { level: "provincial", label: "江苏省级" },
  { level: "municipal", label: "南京市级" },
] as const;

const HONOR_GROUPS = LEVELS.map((entry) => ({
  ...entry,
  items: ABOUT_HONORS.items.filter((item) => item.level === entry.level),
}));

const GROUNDS =
  ABOUT_CAMPUS.photos.find((photo) => photo.id === "grounds") ?? ABOUT_CAMPUS.photos[0];

const styles = stylex.create({
  ground: {
    position: "relative",
    marginTop: { default: 88, [bp.tablet]: 120, [bp.desktop]: 144 },
    paddingBottom: { default: 88, [bp.tablet]: 120, [bp.desktop]: 160 },
    backgroundColor: "#9cc0ea",
  },
  groundPhoto: {
    objectPosition: { default: "62% 0%", [bp.tablet]: "56% 0%", [bp.desktop]: "50% 0%" },
  },
  content: {
    position: "relative",
  },
  section: {
    display: "flex",
    paddingTop: { default: 88, [bp.tablet]: 120, [bp.desktop]: 144 },
  },
  first: {
    paddingTop: { default: 72, [bp.tablet]: 104, [bp.desktop]: 152 },
  },
  toEnd: {
    justifyContent: { default: "flex-start", [bp.desktop]: "flex-end" },
  },
  honorsPane: {
    width: { default: "100%", [bp.tablet]: "78%", [bp.desktop]: 620 },
    padding: {
      default: "26px 22px 28px",
      [bp.tablet]: "36px 40px 40px",
      [bp.desktop]: "44px 52px 48px",
    },
    "::before": {
      content: '""',
      position: "absolute",
      top: -1,
      bottom: 0,
      left: -1,
      width: 2,
      backgroundImage:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, #ffffff 10%, #ffffff 42%, rgba(255, 255, 255, 0) 88%)",
      boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.9), 0 0 28px 5px rgba(255, 255, 255, 0.45)",
      pointerEvents: "none",
    },
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 88,
      backgroundImage:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0) 100%)",
      pointerEvents: "none",
    },
  },
  groups: {
    margin: 0,
  },
  group: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [bp.tablet]: "112px 1fr", [bp.desktop]: "112px 1fr" },
    columnGap: 16,
    paddingBlock: { default: 16, [bp.desktop]: 20 },
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  level: {
    gridColumn: "1",
    gridRow: { default: "auto", [bp.tablet]: "1 / span 4", [bp.desktop]: "1 / span 4" },
    paddingTop: { default: 0, [bp.tablet]: 8, [bp.desktop]: 8 },
    paddingBottom: { default: 6, [bp.tablet]: 0, [bp.desktop]: 0 },
  },
  honor: {
    gridColumn: { default: "1", [bp.tablet]: "2", [bp.desktop]: "2" },
    margin: 0,
    paddingBlock: 5,
    fontSize: { default: 19, [bp.desktop]: 22 },
    lineHeight: 1.5,
    letterSpacing: "0.03em",
  },

  structurePane: {
    width: { default: "100%", [bp.tablet]: "84%", [bp.desktop]: 660 },
    padding: {
      default: "26px 22px 28px",
      [bp.tablet]: "36px 40px 40px",
      [bp.desktop]: "44px 52px 48px",
    },
  },
  holdingName: {
    marginTop: 8,
    fontSize: { default: 24, [bp.tablet]: 28, [bp.desktop]: 30 },
    lineHeight: 1.35,
    letterSpacing: "0.03em",
    textWrap: "balance",
  },
  english: {
    margin: 0,
    marginTop: 6,
    fontFamily: face.sans,
    fontSize: 13,
    lineHeight: 1.45,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  tree: {
    marginTop: { default: 22, [bp.desktop]: 28 },
    marginLeft: 6,
    paddingLeft: { default: 22, [bp.desktop]: 28 },
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: "rgba(11, 42, 92, 0.28)",
  },
  treeLabel: {
    margin: 0,
    paddingBottom: 4,
  },
  subsidiaries: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  subsidiary: {
    position: "relative",
    paddingBlock: 10,
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    "::before": {
      content: '""',
      position: "absolute",
      top: 22,
      left: { default: -22, [bp.desktop]: -28 },
      width: { default: 14, [bp.desktop]: 18 },
      height: 1,
      backgroundColor: "rgba(11, 42, 92, 0.28)",
    },
  },
  subsidiaryName: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 16,
    lineHeight: 1.5,
    color: tone.ink,
  },
  chartToggle: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    marginTop: { default: 22, [bp.desktop]: 28 },
    paddingInline: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(11, 42, 92, 0.24)",
    borderRadius: 2,
    backgroundColor: { default: "rgba(255, 255, 255, 0.4)", ":hover": "rgba(255, 255, 255, 0.8)" },
    fontFamily: face.sans,
    fontSize: 13,
    letterSpacing: "0.02em",
    color: tone.ink,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
  },
  toggleIcon: {
    transitionProperty: "transform",
    transitionDuration: "300ms",
    transitionTimingFunction: pane.ease,
  },
  toggleIconOpen: {
    transform: "rotate(45deg)",
  },
  chartRow: {
    paddingTop: { default: 16, [bp.desktop]: 24 },
  },
  chart: {
    margin: 0,
    padding: { default: 12, [bp.desktop]: 24 },
  },
  chartImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },

  ctaPane: {
    backgroundImage:
      "linear-gradient(160deg, rgba(255, 255, 255, 0.9) 0%, rgba(246, 248, 252, 0.82) 100%)",
    backdropFilter: "blur(26px) saturate(110%)",
    WebkitBackdropFilter: "blur(26px) saturate(110%)",
    width: { default: "100%", [bp.tablet]: "72%", [bp.desktop]: 560 },
    padding: {
      default: "30px 22px 30px",
      [bp.tablet]: "40px 40px 42px",
      [bp.desktop]: "48px 52px 50px",
    },
  },
  ctaTitle: {
    fontSize: { default: 30, [bp.tablet]: 38, [bp.desktop]: 44 },
    lineHeight: 1.25,
    letterSpacing: "0.05em",
    textWrap: "balance",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { default: 20, [bp.desktop]: 28 },
    marginTop: { default: 24, [bp.desktop]: 32 },
  },
  primary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    paddingInline: 28,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    fontFamily: face.sans,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: colors.paper,
    cursor: "pointer",
    boxShadow: {
      default: "none",
      ":focus-visible": "0 0 0 3px #ffffff, 0 0 0 5px #0743ae",
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transform: { default: "none", ":active": { default: "none", [bp.motionOk]: "scale(0.97)" } },
  },
  secondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    paddingBlock: 8,
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.navy,
    textDecorationLine: { default: "none", ":hover": "underline" },
    textUnderlineOffset: 4,
  },
});

export function Closing(props: { onNavigateHome: (hash?: string) => void }) {
  const [chartOpen, setChartOpen] = createSignal(false);

  return (
    <div {...stylex.attrs(styles.ground)}>
      <img
        src={GROUNDS.large}
        alt=""
        loading="lazy"
        decoding="async"
        {...stylex.attrs(ui.fill, styles.groundPhoto)}
      />
      <div {...stylex.attrs(ui.shell, styles.content)}>
        <section
          id="about-honor"
          aria-labelledby="oos1y-honor"
          {...stylex.attrs(ui.anchor, styles.section, styles.first, styles.toEnd)}
        >
          <h2 id="oos1y-honor" {...srOnly}>
            {ABOUT_HONORS.eyebrow}
          </h2>
          <div {...stylex.attrs(ui.glass, styles.honorsPane)}>
            <Reveal>
              <dl {...stylex.attrs(styles.groups)}>
                {HONOR_GROUPS.map((group) => (
                  <div {...stylex.attrs(styles.group)}>
                    <dt {...stylex.attrs(ui.label, styles.level)}>{group.label}</dt>
                    {group.items.map((item) => (
                      <dd {...stylex.attrs(ui.etched, styles.honor)}>{item.title}</dd>
                    ))}
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section
          id="about-structure"
          aria-labelledby="oos1y-structure"
          {...stylex.attrs(ui.anchor, styles.section)}
        >
          <h2 id="oos1y-structure" {...srOnly}>
            {ABOUT_STRUCTURE.eyebrow}
          </h2>
          <div {...stylex.attrs(ui.glass, styles.structurePane)}>
            <Reveal>
              <p {...stylex.attrs(ui.label)}>{ABOUT_STRUCTURE.holding.badge}</p>
              <h3 {...stylex.attrs(ui.etched, styles.holdingName)}>
                {ABOUT_STRUCTURE.holding.name}
              </h3>
              <p lang="en" {...stylex.attrs(styles.english)}>
                {ABOUT_STRUCTURE.holding.english}
              </p>
              <div {...stylex.attrs(styles.tree)}>
                <p {...stylex.attrs(ui.label, styles.treeLabel)}>
                  {ABOUT_STRUCTURE.subsidiaryBadge}
                </p>
                <ul {...stylex.attrs(styles.subsidiaries)}>
                  {ABOUT_STRUCTURE.subsidiaries.map((subsidiary) => (
                    <li {...stylex.attrs(styles.subsidiary)}>
                      <p {...stylex.attrs(styles.subsidiaryName)}>{subsidiary.name}</p>
                      <p lang="en" {...stylex.attrs(styles.english)}>
                        {subsidiary.english}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                aria-expanded={chartOpen() ? "true" : "false"}
                aria-controls="oos1y-chart"
                onClick={() => setChartOpen((open) => !open)}
                {...stylex.attrs(styles.chartToggle)}
              >
                <Plus
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  {...stylex.attrs(styles.toggleIcon, chartOpen() && styles.toggleIconOpen)}
                />
                <span lang="en">Official chart</span>
                <span {...srOnly}> Organizational chart</span>
              </button>
            </Reveal>
          </div>
        </section>
        <div id="oos1y-chart" hidden={!chartOpen()} {...stylex.attrs(styles.chartRow)}>
          <figure {...stylex.attrs(ui.glass, styles.chart)}>
            <img
              src={ABOUT_STRUCTURE.chartImage}
              alt={`Organizational chart: ${ABOUT_STRUCTURE.holding.english} and its five wholly owned subsidiaries`}
              loading="lazy"
              decoding="async"
              {...stylex.attrs(styles.chartImage)}
            />
          </figure>
        </div>

        <section aria-labelledby="oos1y-cta" {...stylex.attrs(styles.section, styles.toEnd)}>
          <div {...stylex.attrs(ui.glass, styles.ctaPane)}>
            <Reveal>
              <h2 id="oos1y-cta" {...stylex.attrs(ui.etched, styles.ctaTitle)}>
                {CTA.title}
              </h2>
              <div {...stylex.attrs(styles.actions)}>
                <button
                  type="button"
                  onClick={() => props.onNavigateHome("contact")}
                  {...stylex.attrs(styles.primary)}
                >
                  {CTA.action.label}
                </button>
                <a
                  href="#products"
                  onClick={(event) => {
                    event.preventDefault();
                    props.onNavigateHome("products");
                  }}
                  {...stylex.attrs(styles.secondary)}
                >
                  产品与应用
                  <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}
