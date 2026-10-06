import * as stylex from "@stylexjs/stylex";
import { ChevronDown, Factory, Leaf, Recycle } from "lucide-react";
import { Fragment, useId, useState } from "react";

import { ABOUT_CSR, ABOUT_HERO, ABOUT_HONORS, ABOUT_STRUCTURE } from "../../about-data";
import { STATS } from "../../content";
import { Reveal, ui } from "./shared";
import { curve, media, tone, type } from "./tokens.stylex";

const LEVEL_LABEL = {
  national: "国家级",
  provincial: "江苏省级",
  municipal: "南京市级",
} as const;

const CSR_ICONS = {
  factory: Factory,
  recycle: Recycle,
  leaf: Leaf,
} as const;

const LOBBY_ALT = "泛成总部大堂，弧形吊顶与大理石地面";
const CHART_ALT = "南京泛成国际控股有限公司官方组织架构图";

const WEFT_SEAMS = 9;

const styles = stylex.create({
  profile: {
    backgroundColor: tone.paper,
  },
  profileGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.wide]: "minmax(0, 7fr) minmax(0, 5fr)",
    },
    columnGap: 96,
    rowGap: 48,
    alignItems: "center",
  },
  profileText: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 28, [media.wide]: 36 },
  },
  company: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [media.wide]: 36 },
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  english: {
    display: "block",
    marginTop: 10,
    fontFamily: type.display,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.01em",
    color: tone.body,
  },
  lead: {
    margin: 0,
    maxWidth: "34em",
    fontSize: { default: 16, [media.wide]: 17 },
    lineHeight: 2,
    letterSpacing: "0.03em",
    color: tone.ink,
    textWrap: "pretty",
  },
  network: {
    margin: 0,
    maxWidth: "34em",
    fontSize: 15,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: tone.label,
  },
  country: {
    fontWeight: 500,
    color: tone.ink,
  },
  lobby: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    margin: 0,
  },
  lobbyFrame: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: { default: "3 / 2", [media.wide]: "1 / 1" },
    backgroundColor: tone.page,
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: tone.photoEdge,
    outlineOffset: -1,
  },
  fill: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  lobbyImage: {
    objectPosition: "30% 50%",
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    marginTop: { default: 72, [media.wide]: 112 },
    marginBottom: 0,
  },
  stat: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: { default: 16, [media.wide]: 28 },
    rowGap: 4,
    paddingBlock: { default: 16, [media.wide]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  statLast: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  twill0: { paddingInlineStart: 0 },
  twill1: { paddingInlineStart: { default: 24, [media.tablet]: 72, [media.wide]: "16%" } },
  twill2: { paddingInlineStart: { default: 48, [media.tablet]: 144, [media.wide]: "32%" } },
  twill3: { paddingInlineStart: { default: 72, [media.tablet]: 216, [media.wide]: "48%" } },
  statValue: {
    margin: 0,
    fontFamily: type.display,
    fontSize: { default: 40, [media.wide]: 56 },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
    color: tone.ink,
  },
  statUnit: {
    marginInlineStart: 2,
    fontSize: "0.5em",
    letterSpacing: 0,
    color: tone.body,
  },
  statCaption: {
    margin: 0,
    fontSize: 14,
    letterSpacing: "0.06em",
    color: tone.body,
  },

  csr: {
    backgroundColor: tone.warm,
  },
  csrGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.wide]: "minmax(0, 6fr) minmax(0, 5fr)",
    },
    columnGap: 96,
    rowGap: 48,
    alignItems: "center",
  },
  csrPhoto: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    aspectRatio: { default: "4 / 3", [media.wide]: "5 / 6" },
    backgroundColor: tone.page,
  },
  csrImage: {
    objectPosition: "58% 50%",
  },
  seams: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(to bottom, transparent calc(100% - 1px), ${tone.warm} calc(100% - 1px))`,
    backgroundSize: `100% ${100 / WEFT_SEAMS}%`,
    pointerEvents: "none",
  },
  csrText: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 24, [media.wide]: 32 },
  },
  statement: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [media.wide]: 36 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  statementLine: {
    display: "block",
  },
  csrDesc: {
    margin: 0,
    maxWidth: "28em",
    fontSize: 16,
    lineHeight: 2,
    letterSpacing: "0.03em",
    color: tone.body,
  },
  outcomes: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 14,
    rowGap: 8,
    margin: 0,
    paddingTop: 20,
    paddingInline: 0,
    paddingBottom: 0,
    listStyleType: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  outcome: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  outcomeIcon: {
    flexShrink: 0,
    color: tone.body,
  },
  outcomeJoin: {
    marginInlineEnd: 6,
    color: tone.label,
  },

  honors: {
    backgroundColor: tone.paper,
  },
  honorList: {
    maxWidth: 920,
    marginInline: "auto",
    marginBlock: 0,
    padding: 0,
    listStyleType: "none",
  },
  honor: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 20,
    paddingBlock: { default: 16, [media.wide]: 20 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  honorTitle: {
    margin: 0,
    fontSize: { default: 16, [media.wide]: 18 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  honorLevel: {
    flexShrink: 0,
    fontSize: 13,
    letterSpacing: "0.08em",
    color: tone.label,
  },
  honorTwill0: { marginInlineStart: 0 },
  honorTwill1: { marginInlineStart: { default: 14, [media.aboveTablet]: "7%" } },
  honorTwill2: { marginInlineStart: { default: 28, [media.aboveTablet]: "14%" } },
  honorTwill3: { marginInlineStart: { default: 42, [media.aboveTablet]: "21%" } },

  structure: {
    backgroundColor: tone.paper,
    paddingTop: { default: 24, [media.wide]: 40 },
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxWidth: 960,
    marginInline: "auto",
  },
  holdingName: {
    margin: 0,
    fontSize: { default: 22, [media.wide]: 28 },
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  holdingEnglish: {
    fontFamily: type.display,
    fontSize: 14,
    fontWeight: 500,
    color: tone.body,
  },
  loomBeam: {
    maxWidth: 960,
    marginInline: "auto",
    marginTop: { default: 32, [media.wide]: 44 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.thread,
  },
  subsidiaries: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: { default: "none", [media.wide]: 820 },
    marginInline: "auto",
    marginBlock: 0,
    paddingInline: { default: 0, [media.aboveTablet]: 24 },
    paddingBlock: 0,
    listStyleType: "none",
  },
  subsidiary: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 0,
  },
  warpEnd: {
    width: 1,
    height: { default: 40, [media.tablet]: 64, [media.wide]: 88 },
    backgroundColor: tone.thread,
  },
  subsidiaryText: {
    position: "relative",
    display: "block",
    marginTop: 14,
    writingMode: "vertical-rl",
  },
  subsidiaryName: {
    margin: 0,
    fontSize: { default: 15, [media.tablet]: 18, [media.wide]: 20 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.16em",
    color: tone.ink,
  },
  subsidiaryEnglish: {
    position: "absolute",
    top: 2,
    right: "100%",
    marginRight: { default: 2, [media.wide]: 6 },
    whiteSpace: "nowrap",
    fontFamily: type.display,
    fontSize: { default: 11, [media.wide]: 12 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.04em",
    color: tone.label,
  },
  subsidiaryBadge: {
    maxWidth: 960,
    marginInline: "auto",
    marginTop: 12,
  },
  chartWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 28,
    marginTop: { default: 56, [media.wide]: 80 },
  },
  chartToggle: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    paddingBlock: 10,
    paddingInline: 4,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: { default: tone.thread, ":hover": tone.indigo },
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 15,
    letterSpacing: "0.06em",
    color: tone.ink,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "160ms",
    transitionTimingFunction: curve.out,
  },
  chevron: {
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: curve.out,
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  chartFrame: {
    width: "100%",
    maxWidth: 960,
    backgroundColor: tone.paper,
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: tone.hairline,
    outlineOffset: -1,
  },
  chartImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },
});

const STAT_TWILL = [styles.twill0, styles.twill1, styles.twill2] as const;
const HONOR_TWILL = [
  styles.honorTwill0,
  styles.honorTwill1,
  styles.honorTwill2,
  styles.honorTwill3,
] as const;

export function Profile() {
  return (
    <section
      id="about-profile"
      aria-labelledby="about-profile-title"
      {...stylex.props(ui.section, ui.anchor, styles.profile)}
    >
      <h2 id="about-profile-title" {...stylex.props(ui.srOnly)}>
        {ABOUT_HERO.navChips[0].label}
      </h2>
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(styles.profileGrid)}>
          <Reveal sx={styles.profileText}>
            <h3 {...stylex.props(styles.company)}>
              {ABOUT_HERO.title}
              <span lang="en" {...stylex.props(styles.english)}>
                {ABOUT_HERO.englishTitle}
              </span>
            </h3>
            <p {...stylex.props(styles.lead)}>{ABOUT_HERO.lead}</p>
            <p {...stylex.props(styles.network)}>
              {ABOUT_HERO.networkLabel}{" "}
              {ABOUT_HERO.countries.map((country, index) => (
                <Fragment key={country}>
                  {index > 0 ? "、" : null}
                  <span {...stylex.props(styles.country)}>{country}</span>
                </Fragment>
              ))}
              等地。
            </p>
          </Reveal>
          <Reveal as="figure" delay={120} sx={styles.lobby}>
            <div {...stylex.props(styles.lobbyFrame)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt={LOBBY_ALT}
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.fill, styles.lobbyImage)}
              />
            </div>
            <figcaption {...stylex.props(ui.caption)}>{ABOUT_HERO.lobbyCaption}</figcaption>
          </Reveal>
        </div>
        <dl {...stylex.props(styles.stats)}>
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 90}
              sx={[
                styles.stat,
                STAT_TWILL[index % STAT_TWILL.length],
                index === STATS.length - 1 && styles.statLast,
              ]}
            >
              <dt {...stylex.props(ui.srOnly)}>{stat.label}</dt>
              <dd {...stylex.props(styles.statValue)}>
                {stat.value}
                {stat.unit ? <span {...stylex.props(styles.statUnit)}>{stat.unit}</span> : null}
              </dd>
              <dd {...stylex.props(styles.statCaption)}>{stat.caption}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Responsibility() {
  const [lead, close] = ABOUT_CSR.statement;
  return (
    <section
      id="about-csr"
      aria-labelledby="about-csr-title"
      {...stylex.props(ui.section, ui.anchor, styles.csr)}
    >
      <h2 id="about-csr-title" {...stylex.props(ui.srOnly)}>
        {ABOUT_CSR.title}
      </h2>
      <div {...stylex.props(ui.shell, styles.csrGrid)}>
        <Reveal as="figure" sx={styles.csrPhoto}>
          <img
            src={ABOUT_CSR.image}
            alt={ABOUT_CSR.imageAlt}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.fill, styles.csrImage)}
          />
          <span aria-hidden="true" {...stylex.props(styles.seams)} />
        </Reveal>
        <Reveal delay={120} sx={styles.csrText}>
          <p {...stylex.props(styles.statement)}>
            <span {...stylex.props(styles.statementLine)}>{lead}</span>
            <span {...stylex.props(styles.statementLine)}>{close}</span>
          </p>
          <p {...stylex.props(styles.csrDesc)}>{ABOUT_CSR.desc}</p>
          <ul {...stylex.props(styles.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome, index) => {
              const Icon = CSR_ICONS[outcome.icon];
              return (
                <li key={outcome.title} {...stylex.props(styles.outcome)}>
                  {index > 0 ? (
                    <span aria-hidden="true" {...stylex.props(styles.outcomeJoin)}>
                      ·
                    </span>
                  ) : null}
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    {...stylex.props(styles.outcomeIcon)}
                  />
                  {outcome.title}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="about-honor-title"
      {...stylex.props(ui.section, ui.anchor, styles.honors)}
    >
      <h2 id="about-honor-title" {...stylex.props(ui.srOnly)}>
        {ABOUT_HONORS.title}
      </h2>
      <div {...stylex.props(ui.shell)}>
        <ul {...stylex.props(styles.honorList)}>
          {ABOUT_HONORS.items.map((honor, index) => (
            <Reveal
              key={honor.id}
              as="li"
              delay={(index % 4) * 70}
              sx={[styles.honor, HONOR_TWILL[index % HONOR_TWILL.length]]}
            >
              <h3 {...stylex.props(styles.honorTitle)}>{honor.title}</h3>
              <span {...stylex.props(styles.honorLevel)}>{LEVEL_LABEL[honor.level]}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Structure() {
  const [showChart, setShowChart] = useState(false);
  const chartId = useId();
  return (
    <section
      id="about-structure"
      aria-labelledby="about-structure-title"
      {...stylex.props(ui.section, ui.anchor, styles.structure)}
    >
      <h2 id="about-structure-title" {...stylex.props(ui.srOnly)}>
        {ABOUT_STRUCTURE.title}
      </h2>
      <div {...stylex.props(ui.shell)}>
        <Reveal sx={styles.holding}>
          <p {...stylex.props(ui.caption)}>{ABOUT_STRUCTURE.holding.badge}</p>
          <h3 {...stylex.props(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
          <span lang="en" {...stylex.props(styles.holdingEnglish)}>
            {ABOUT_STRUCTURE.holding.english}
          </span>
        </Reveal>
        <div aria-hidden="true" {...stylex.props(styles.loomBeam)} />
        <p {...stylex.props(ui.caption, styles.subsidiaryBadge)}>
          {ABOUT_STRUCTURE.subsidiaryBadge}
        </p>
        <ul aria-label={ABOUT_STRUCTURE.subsidiaryBadge} {...stylex.props(styles.subsidiaries)}>
          {ABOUT_STRUCTURE.subsidiaries.map((sub, index) => (
            <Reveal key={sub.id} as="li" delay={index * 70} sx={styles.subsidiary}>
              <span aria-hidden="true" {...stylex.props(styles.warpEnd)} />
              <div {...stylex.props(styles.subsidiaryText)}>
                <h4 {...stylex.props(styles.subsidiaryName)}>{sub.name}</h4>
                <span lang="en" {...stylex.props(styles.subsidiaryEnglish)}>
                  {sub.english}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
        <div {...stylex.props(styles.chartWrap)}>
          <button
            type="button"
            aria-expanded={showChart}
            aria-controls={chartId}
            onClick={() => setShowChart((open) => !open)}
            {...stylex.props(styles.chartToggle, ui.focusRing)}
          >
            {showChart ? "收起组织架构图" : "查看官方组织架构图"}
            <ChevronDown
              size={16}
              aria-hidden="true"
              {...stylex.props(styles.chevron, showChart && styles.chevronOpen)}
            />
          </button>
          <div id={chartId} hidden={!showChart} {...stylex.props(styles.chartFrame)}>
            <img
              src={ABOUT_STRUCTURE.chartImage}
              alt={CHART_ALT}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.chartImage)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
