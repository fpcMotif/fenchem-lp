import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import { Reveal } from "./motion";
import { color, ease, font, layout as layoutTokens, media } from "./tokens.stylex";
import { SectionHeader, TextLink, layout } from "./ui";

const HOVER_MS = "150ms";
const EVENTS_HREF = "#news";

const FEATURED = {
  title: "In-cosmetics® 拉丁美洲展",
  meta: "2026.09.23–24 · 巴西 圣保罗",
  body: "欢迎参加 2026 年 In-cosmetics® 拉丁美洲展",
} as const;

const UPCOMING = [
  { title: "IFSCC 大会 2026", year: "2026" },
  { title: "Naturally Kiawah 研讨会 2026", year: "2026" },
  { title: "In-cosmetics® Global 2026", year: "2026" },
] as const;

const styles = stylex.create({
  section: {
    backgroundColor: color.paper,
    fontFamily: font.display,
    paddingBlock: {
      default: layoutTokens.sectionPadMobile,
      [media.tablet]: layoutTokens.sectionPadTablet,
      [media.desktop]: 128,
    },
  },
  list: {
    margin: 0,
    marginTop: { default: 32, [media.tablet]: 48, [media.desktop]: 56 },
    padding: 0,
    listStyleType: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.rule,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: color.rule,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 24,
    color: { default: color.ink, ":hover": color.royal, ":focus-visible": color.royal },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: HOVER_MS,
    transitionTimingFunction: ease.out,
  },
  rowFeatured: {
    paddingBlock: { default: 32, [media.tablet]: 40, [media.desktop]: 48 },
  },
  rowCompact: {
    paddingBlock: { default: 20, [media.tabletUp]: 24 },
  },
  featuredText: {
    display: "flex",
    flexDirection: "column",
    rowGap: 12,
    minWidth: 0,
  },
  meta: {
    margin: 0,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
    fontVariantNumeric: "tabular-nums",
    color: color.inkMuted,
  },
  featuredTitle: {
    margin: 0,
    fontSize: { default: 24, [media.tablet]: 28, [media.desktop]: 32 },
    fontWeight: 700,
    lineHeight: 1.3,
    color: "inherit",
  },
  featuredBody: {
    margin: 0,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.6,
    color: color.inkMuted,
  },
  compactTitle: {
    margin: 0,
    minWidth: 0,
    fontSize: { default: 18, [media.tabletUp]: 20 },
    fontWeight: 700,
    lineHeight: 1.4,
    color: "inherit",
  },
  tail: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    columnGap: 16,
  },
  arrow: {
    flexShrink: 0,
    opacity: {
      default: 1,
      [media.hoverMotion]: 0,
      [stylex.when.ancestor(":hover")]: { default: null, [media.hoverMotion]: 1 },
      [stylex.when.ancestor(":focus-visible")]: { default: null, [media.hoverMotion]: 1 },
    },
    transform: {
      default: null,
      [media.hoverMotion]: "translateX(-8px)",
      [stylex.when.ancestor(":hover")]: { default: null, [media.hoverMotion]: "translateX(0)" },
      [stylex.when.ancestor(":focus-visible")]: {
        default: null,
        [media.hoverMotion]: "translateX(0)",
      },
    },
    transitionProperty: "opacity, transform",
    transitionDuration: HOVER_MS,
    transitionTimingFunction: ease.out,
  },
});

function RowArrow() {
  return (
    <ArrowRight
      size={20}
      strokeWidth={2}
      absoluteStrokeWidth
      aria-hidden="true"
      {...stylex.props(styles.arrow)}
    />
  );
}

export function News() {
  return (
    <section id="news" aria-labelledby="oo-news-title" {...stylex.props(styles.section)}>
      <div {...stylex.props(layout.shell, layout.inset)}>
        <SectionHeader
          id="oo-news-title"
          title="新闻资讯"
          action={<TextLink href={EVENTS_HREF}>全部资讯</TextLink>}
        />
        <ul {...stylex.props(styles.list)}>
          <Reveal as="li" sx={styles.item}>
            <a
              href={EVENTS_HREF}
              {...stylex.props(styles.row, styles.rowFeatured, stylex.defaultMarker())}
            >
              <div {...stylex.props(styles.featuredText)}>
                <p {...stylex.props(styles.meta)}>{FEATURED.meta}</p>
                <h3 {...stylex.props(styles.featuredTitle)}>{FEATURED.title}</h3>
                <p {...stylex.props(styles.featuredBody)}>{FEATURED.body}</p>
              </div>
              <RowArrow />
            </a>
          </Reveal>
          {UPCOMING.map((event, index) => (
            <Reveal key={event.title} as="li" index={index + 1} sx={styles.item}>
              <a
                href={EVENTS_HREF}
                {...stylex.props(styles.row, styles.rowCompact, stylex.defaultMarker())}
              >
                <h3 {...stylex.props(styles.compactTitle)}>{event.title}</h3>
                <div {...stylex.props(styles.tail)}>
                  <p {...stylex.props(styles.meta)}>{event.year}</p>
                  <RowArrow />
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
