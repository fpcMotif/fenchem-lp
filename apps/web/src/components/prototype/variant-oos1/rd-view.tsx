import { Flow } from "../shared/flow";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "@fenchem-lp/ui/components/lucide";
import { m } from "@/compat/motion";
import { createMemo, createSignal, Show } from "solid-js";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ContactCta } from "./contact-cta";
import {
  RD_CERTIFICATIONS,
  RD_HEADER,
  RD_METRICS,
  RD_NAV_CHIPS,
  RD_PLATFORMS,
  RD_TECH_STEPS,
  type PlatformItem,
} from "./rd-data";
import { Reveal, SectionHead, SubPageBanner, SubPageNav, kitStyles } from "./subpage-kit";
import { color, ease, font, media, texture } from "./tokens.stylex";

const HAIRLINE = "rgba(26, 26, 26, 0.14)";

const DESKTOP = "@media (min-width: 1280px)";

const FACILITY_PHOTOS = [
  {
    src: "/prototype/about/campus-aerial-lg.webp",
    caption: "35,000 m² 智造基地鸟瞰",
    english: "Aerial view of the manufacturing campus",
    alt: "Aerial view of the Fenchem manufacturing campus and R&D buildings",
  },
  {
    src: "/prototype/about/campus-lab-lg.webp",
    caption: "理化与微生物分析检测中心",
    english: "Analytical & microbiology laboratories",
    alt: "Analytical and microbiology laboratory with glass partitions",
  },
  {
    src: "/prototype/about/campus-showroom-lg.webp",
    caption: "DCS 智能中控室与仓配中心",
    english: "DCS control room & logistics hub",
    alt: "DCS central control room of the smart manufacturing base",
  },
] as const;

const styles = stylex.create({
  // Metrics band
  metricsSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      ["@media (min-width: 768px)"]: "repeat(4, 1fr)",
    },
    columnGap: { default: 24, [DESKTOP]: 40 },
    rowGap: 40,
    paddingBlock: { default: 48, [DESKTOP]: 64 },
  },
  metric: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: color.ink,
  },
  metricRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
  },
  metricValue: {
    fontFamily: font.display,
    fontSize: { default: 34, [media.tablet]: 40, [DESKTOP]: 48 },
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1,
    color: color.ink,
  },
  metricUnit: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.brandBlue700,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  metricDesc: {
    fontSize: 12,
    lineHeight: 1.6,
    color: color.muted,
  },

  // Platforms: index rail + detail panel
  platformLayout: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      ["@media (min-width: 1024px)"]: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
    },
    gap: { default: 36, [DESKTOP]: 72 },
    alignItems: "start",
  },
  platformRail: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  platformTab: {
    appearance: "none",
    display: "flex",
    alignItems: "baseline",
    gap: { default: 16, [DESKTOP]: 24 },
    width: "100%",
    paddingBlock: { default: 18, [DESKTOP]: 24 },
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  platformIndex: {
    fontFamily: font.display,
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.12em",
    color: color.muted,
    flexShrink: 0,
    width: 28,
    transitionProperty: "color",
    transitionDuration: "160ms",
  },
  platformIndexActive: {
    color: colors.brandBlue700,
  },
  platformNames: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flexGrow: 1,
    minWidth: 0,
  },
  platformName: {
    fontSize: { default: 16, [DESKTOP]: 18 },
    fontWeight: 700,
    lineHeight: 1.4,
    color: { default: color.ink, ":hover": colors.brandBlue700 },
    transitionProperty: "color",
    transitionDuration: "160ms",
  },
  platformNameActive: {
    color: colors.brandBlue700,
  },
  platformEnglish: {
    fontFamily: font.serifAccent,
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: 1.3,
    color: color.muted,
  },
  platformArrow: {
    flexShrink: 0,
    alignSelf: "center",
    color: colors.brandBlue700,
    opacity: 0,
    transform: {
      default: null,
      ["@media (prefers-reduced-motion: no-preference)"]: "translateX(-6px)",
    },
    transitionProperty: "opacity, transform",
    transitionDuration: "200ms",
    transitionTimingFunction: ease.out,
  },
  platformArrowVisible: {
    opacity: 1,
    transform: "translateX(0)",
  },
  platformPanel: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 20, [DESKTOP]: 24 },
  },
  platformImageFrame: {
    margin: 0,
    aspectRatio: "16 / 9",
    overflow: "hidden",
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: "rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
    backgroundColor: "#eef1f6",
  },
  platformImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  platformStat: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: color.ink,
  },
  platformStatLabel: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  platformStatValue: {
    fontFamily: font.display,
    fontSize: { default: 32, [DESKTOP]: 44 },
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1,
    color: colors.brandBlue700,
  },
  platformSummary: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.9,
    letterSpacing: "0.02em",
    color: color.bodyText,
    textWrap: "pretty",
  },
  platformPoints: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  platformPoint: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    paddingBlock: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
    fontSize: 14,
    lineHeight: 1.7,
    color: color.bodyText,
  },
  pointMarker: {
    fontFamily: font.display,
    fontWeight: 800,
    color: colors.brandBlue700,
    flexShrink: 0,
  },

  // Facilities photo essay
  facilityGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      ["@media (min-width: 1024px)"]: "minmax(0, 1.42fr) minmax(0, 1fr)",
    },
    gap: { default: 24, [DESKTOP]: 32 },
  },
  facilityStack: {
    display: "grid",
    gridTemplateRows: "repeat(2, minmax(0, 1fr))",
    gap: { default: 24, [DESKTOP]: 32 },
  },
  facilityFigure: {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 0,
  },
  facilityImageFrame: {
    overflow: "hidden",
    flexGrow: 1,
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: "rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
    backgroundColor: "#e6eaf2",
  },
  facilityImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    aspectRatio: { default: "16 / 10", ["@media (min-width: 1024px)"]: "auto" },
  },
  facilityCaptionRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  facilityCaption: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  facilityEnglish: {
    fontFamily: font.serifAccent,
    fontStyle: "italic",
    fontSize: 13,
    color: color.muted,
    textAlign: "end",
  },

  // Process pipeline: ruled index rows
  processList: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  processRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "56px 1fr",
      ["@media (min-width: 768px)"]: "120px minmax(0, 0.9fr) minmax(0, 1.1fr)",
    },
    columnGap: { default: 16, [DESKTOP]: 40 },
    rowGap: 6,
    alignItems: "baseline",
    paddingBlock: { default: 20, [DESKTOP]: 26 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  processStep: {
    fontFamily: font.display,
    fontSize: { default: 20, [DESKTOP]: 26 },
    fontWeight: 800,
    letterSpacing: "0.04em",
    color: colors.brandBlue700,
  },
  processTitle: {
    fontSize: { default: 16, [DESKTOP]: 18 },
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0.02em",
    color: color.ink,
  },
  processDesc: {
    gridColumn: { default: "2", ["@media (min-width: 768px)"]: "auto" },
    margin: 0,
    fontSize: 14,
    lineHeight: 1.8,
    color: color.bodyText,
    textWrap: "pretty",
  },

  // Quality: dark navy band
  qualitySection: {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    backgroundColor: color.navyDeep,
    color: colors.paper,
  },
  qualityGrain: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    backgroundImage: texture.grain,
    opacity: 0.12,
    mixBlendMode: "overlay",
    pointerEvents: "none",
  },
  certGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      ["@media (min-width: 768px)"]: "repeat(4, 1fr)",
    },
    columnGap: { default: 24, [DESKTOP]: 40 },
    rowGap: { default: 8, [DESKTOP]: 0 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  cert: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    paddingBlock: { default: 18, [DESKTOP]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(255, 255, 255, 0.24)",
  },
  certName: {
    fontFamily: font.display,
    fontSize: { default: 18, [DESKTOP]: 22 },
    fontWeight: 800,
    letterSpacing: "0.02em",
    color: colors.paper,
  },
  certDesc: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "rgba(255, 255, 255, 0.6)",
  },
});

export function RdView(props: { onNavigateHome: (target?: string) => void }) {
  const [activePlatformId, setActivePlatformId] = createSignal<string>(RD_PLATFORMS[0].id);
  const activePlatform = createMemo<PlatformItem>(
    () => RD_PLATFORMS.find((p) => p.id === activePlatformId()) ?? RD_PLATFORMS[0],
  );
  const reduce = useReducedMotion();

  return (
    <div id="rd-top" lang="zh-CN" {...stylex.attrs(kitStyles.root)}>
      <SubPageBanner
        eyebrow="R&D & Manufacturing"
        title={RD_HEADER.chineseTitle}
        tagline={RD_HEADER.englishLead}
        lead={RD_HEADER.lead}
        meta={["Est. 1995", "Nanjing · Chuzhou", "35,000 m² cGMP Campus"]}
        image="/prototype/about/campus-lab-lg.webp"
        imageAlt="Fenchem R&D laboratory corridor with glass partitions"
        titleId="rd-banner-title"
      />

      <SubPageNav current="研发与生产" chips={RD_NAV_CHIPS} onNavigateHome={props.onNavigateHome} />

      {/* Metrics band */}
      <section aria-label="研发与生产关键数据" {...stylex.attrs(styles.metricsSection)}>
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.metricsGrid)}>
          {RD_METRICS.map((metric, index) => (
            <Reveal step={index} sx={styles.metric}>
              <span {...stylex.attrs(styles.metricRow)}>
                <span {...stylex.attrs(styles.metricValue)}>{metric.value}</span>
                <span {...stylex.attrs(styles.metricUnit)}>{metric.unit}</span>
              </span>
              <span {...stylex.attrs(styles.metricLabel)}>{metric.label}</span>
              <span {...stylex.attrs(styles.metricDesc)}>{metric.desc}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* R&D platforms */}
      <section
        id="rd-platforms"
        aria-labelledby="rd-platforms-title"
        {...stylex.attrs(kitStyles.section, kitStyles.anchor)}
      >
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
          <SectionHead
            eyebrow="Innovation Platforms"
            title="四大研发创新平台"
            titleId="rd-platforms-title"
            lead="从微观分子包裹、细胞生物学机理到感官原型配方，打通科研与产品应用的完整闭环。"
          />
          <div {...stylex.attrs(styles.platformLayout)}>
            <Reveal>
              <ul role="tablist" aria-label="研发平台" {...stylex.attrs(styles.platformRail)}>
                {RD_PLATFORMS.map((platform, index) => {
                  const isActive = () => activePlatformId() === platform.id;
                  return (
                    <li>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive() ? "true" : "false"}
                        onClick={() => setActivePlatformId(platform.id)}
                        onMouseEnter={() => setActivePlatformId(platform.id)}
                        {...stylex.attrs(styles.platformTab)}
                      >
                        <span
                          aria-hidden="true"
                          {...stylex.attrs(
                            styles.platformIndex,
                            isActive() && styles.platformIndexActive,
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span {...stylex.attrs(styles.platformNames)}>
                          <span
                            {...stylex.attrs(
                              styles.platformName,
                              isActive() && styles.platformNameActive,
                            )}
                          >
                            {platform.name}
                          </span>
                          <span lang="en" {...stylex.attrs(styles.platformEnglish)}>
                            {platform.english}
                          </span>
                        </span>
                        <ArrowRight
                          size={18}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          {...stylex.attrs(
                            styles.platformArrow,
                            isActive() && styles.platformArrowVisible,
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal step={1}>
              {/* Keyed so each platform switch remounts the panel and replays its entrance. */}
              <Show when={activePlatform()} keyed>
                {(platform) => (
                  <m.div
                    role="tabpanel"
                    aria-label={platform.name}
                    initial={{ opacity: 0, y: reduce() ? 0 : 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce() ? 0.15 : 0.45, ease: EASE }}
                    {...stylex.attrs(styles.platformPanel)}
                  >
                    <figure {...stylex.attrs(styles.platformImageFrame)}>
                      <img
                        src={platform.image}
                        alt={platform.name}
                        loading="lazy"
                        decoding="async"
                        {...stylex.attrs(styles.platformImage)}
                      />
                    </figure>
                    <div {...stylex.attrs(styles.platformStat)}>
                      <span {...stylex.attrs(styles.platformStatLabel)}>{platform.stat.label}</span>
                      <span {...stylex.attrs(styles.platformStatValue)}>{platform.stat.value}</span>
                    </div>
                    <p {...stylex.attrs(styles.platformSummary)}>{platform.summary}</p>
                    <ul {...stylex.attrs(styles.platformPoints)}>
                      {platform.points.map((point) => (
                        <li {...stylex.attrs(styles.platformPoint)}>
                          <span aria-hidden="true" {...stylex.attrs(styles.pointMarker)}>
                            —
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </m.div>
                )}
              </Show>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Manufacturing facilities */}
      <section
        id="rd-facilities"
        aria-labelledby="rd-facilities-title"
        {...stylex.attrs(kitStyles.section, kitStyles.sectionAlt, kitStyles.anchor)}
      >
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
          <SectionHead
            eyebrow="Intelligent Manufacturing"
            title="35,000 m² 现代化生产基地"
            titleId="rd-facilities-title"
            lead="位于南京滁州核心园区，配备 100,000 级洁净车间与 DCS 全闭环数字控制系统。"
          />
          <div {...stylex.attrs(styles.facilityGrid)}>
            <Reveal as="figure" sx={styles.facilityFigure}>
              <div {...stylex.attrs(styles.facilityImageFrame)}>
                <img
                  src={FACILITY_PHOTOS[0].src}
                  alt={FACILITY_PHOTOS[0].alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.attrs(styles.facilityImage)}
                />
              </div>
              <figcaption {...stylex.attrs(styles.facilityCaptionRow)}>
                <span {...stylex.attrs(styles.facilityCaption)}>{FACILITY_PHOTOS[0].caption}</span>
                <span lang="en" {...stylex.attrs(styles.facilityEnglish)}>
                  {FACILITY_PHOTOS[0].english}
                </span>
              </figcaption>
            </Reveal>
            <div {...stylex.attrs(styles.facilityStack)}>
              {FACILITY_PHOTOS.slice(1).map((photo, index) => (
                <Reveal as="figure" step={index + 1} sx={styles.facilityFigure}>
                  <div {...stylex.attrs(styles.facilityImageFrame)}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      {...stylex.attrs(styles.facilityImage)}
                    />
                  </div>
                  <figcaption {...stylex.attrs(styles.facilityCaptionRow)}>
                    <span {...stylex.attrs(styles.facilityCaption)}>{photo.caption}</span>
                    <span lang="en" {...stylex.attrs(styles.facilityEnglish)}>
                      {photo.english}
                    </span>
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process pipeline */}
      <section
        id="rd-tech"
        aria-labelledby="rd-tech-title"
        {...stylex.attrs(kitStyles.section, kitStyles.anchor)}
      >
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
          <SectionHead
            eyebrow="Core Process Pipeline"
            title="五阶工艺工程矩阵"
            titleId="rd-tech-title"
            lead="遵循绿色化学标准，全程严控温度、溶剂循环与微生物指标。"
          />
          <ol {...stylex.attrs(styles.processList)}>
            {RD_TECH_STEPS.map((step, index) => (
              <Reveal as="li" step={index} sx={styles.processRow}>
                <span aria-hidden="true" {...stylex.attrs(styles.processStep)}>
                  {step.step}
                </span>
                <span {...stylex.attrs(styles.processTitle)}>{step.title}</span>
                <p {...stylex.attrs(styles.processDesc)}>{step.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Certifications: dark band */}
      <section
        id="rd-quality"
        aria-labelledby="rd-quality-title"
        {...stylex.attrs(kitStyles.section, styles.qualitySection, kitStyles.anchor)}
      >
        <div aria-hidden="true" {...stylex.attrs(styles.qualityGrain)} />
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
          <SectionHead
            eyebrow="Certifications & Standards"
            title="质量管理与体系认证"
            titleId="rd-quality-title"
            lead="满足国内外化妆品、食品安全与医药行业标准，出具全项目分析检测报告。"
            invert
          />
          <ul {...stylex.attrs(styles.certGrid)}>
            {RD_CERTIFICATIONS.map((cert, index) => (
              <Reveal as="li" step={index} sx={styles.cert}>
                <span lang="en" {...stylex.attrs(styles.certName)}>
                  {cert.name}
                </span>
                <span {...stylex.attrs(styles.certDesc)}>{cert.desc}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Flow>
        <ContactCta
          id="rd-bottom-cta"
          title="需要索取样品或技术资料？"
          subtitle="我们的应用科学家随时为您提供添加量指导与原型配方参考。"
          actions={[{ label: "联系应用团队", onClick: () => props.onNavigateHome("contact") }]}
        />
      </Flow>
    </div>
  );
}
