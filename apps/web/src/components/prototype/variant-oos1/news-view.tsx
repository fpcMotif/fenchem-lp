import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";

import { Flow } from "../shared/flow";
import { ContactCta } from "./contact-cta";
import { CTA } from "./content";
import {
  FEATURED_NEWS,
  NEWS_CATEGORIES,
  NEWS_HEADER,
  NEWS_LIST,
  UPCOMING_EVENTS,
  type NewsItem,
} from "./news-data";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED_LABEL = "#64748b";
const NAVY_DEEP = "#071e42";
const NAVY_ACCENT = "#0743a9";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const INSET_120 = "min(120px, 8.333vw)";

const styles = stylex.create({
  root: {
    backgroundColor: "#ffffff",
    color: INK,
    fontFamily: BODY_FONT,
    minHeight: "100vh",
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset120: {
    paddingInline: { default: 20, [TABLET]: 40, [DESKTOP]: INSET_120 },
  },

  // Top Bar with Breadcrumbs & Title
  topBar: {
    paddingBlock: { default: 24, [breakpoints.md]: 36 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(26, 26, 26, 0.06)",
    backgroundColor: "#fafbfc",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: MUTED_LABEL,
    marginBottom: 16,
  },
  breadcrumbLink: {
    background: "none",
    borderWidth: 0,
    borderStyle: "none",
    padding: 0,
    color: MUTED_LABEL,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    ":hover": {
      color: NAVY_ACCENT,
    },
  },
  breadcrumbCurrent: {
    color: INK,
    fontWeight: 600,
  },
  pageTitle: {
    fontSize: { default: 32, [breakpoints.md]: 44 },
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: NAVY_DEEP,
    margin: "0 0 8px 0",
  },
  pageLead: {
    fontSize: { default: 15, [breakpoints.md]: 16 },
    color: BODY_TEXT,
    lineHeight: 1.6,
    margin: 0,
    maxWidth: 720,
  },

  // Category filter bar
  filterSection: {
    paddingBlock: { default: 16, [breakpoints.md]: 24 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(26, 26, 26, 0.06)",
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    overflowX: "auto",
  },
  filterBtn: {
    padding: "8px 18px",
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 600,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(26, 26, 26, 0.1)",
    backgroundColor: "#ffffff",
    color: BODY_TEXT,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
    ":hover": {
      borderColor: NAVY_ACCENT,
      color: INK,
    },
  },
  filterBtnActive: {
    backgroundColor: NAVY_DEEP,
    borderColor: NAVY_DEEP,
    color: "#ffffff",
    ":hover": {
      backgroundColor: NAVY_DEEP,
      color: "#ffffff",
    },
  },

  // Content Area
  mainSection: {
    paddingBlock: { default: 36, [breakpoints.md]: 64 },
  },

  // Featured Story (Lucas Meyer editorial style)
  featuredCard: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.lg]: "1.1fr 0.9fr" },
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(26, 26, 26, 0.08)",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
    marginBottom: { default: 40, [breakpoints.md]: 56 },
  },
  featuredImgWrap: {
    position: "relative",
    minHeight: { default: 220, [breakpoints.md]: 320 },
    backgroundColor: "#e2e8f0",
  },
  featuredImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  featuredBody: {
    padding: { default: 24, [breakpoints.md]: 36 },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
  },
  badge: {
    fontSize: 11,
    fontWeight: 700,
    color: NAVY_ACCENT,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  metaText: {
    fontSize: 12,
    color: MUTED_LABEL,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  featuredTitle: {
    fontSize: { default: 18, [breakpoints.md]: 22 },
    fontWeight: 800,
    color: INK,
    lineHeight: 1.35,
    margin: 0,
  },
  featuredExcerpt: {
    fontSize: 14,
    lineHeight: 1.65,
    color: BODY_TEXT,
    margin: 0,
  },
  locationNote: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: NAVY_DEEP,
    fontWeight: 600,
    backgroundColor: "#eff6ff",
    padding: "6px 12px",
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  // News Grid (3 columns)
  newsGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "repeat(2, 1fr)", [DESKTOP]: "repeat(3, 1fr)" },
    gap: 24,
  },
  newsCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(26, 26, 26, 0.08)",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
      borderColor: "rgba(7, 67, 169, 0.3)",
    },
  },
  newsImgWrap: {
    position: "relative",
    aspectRatio: "16 / 10",
    backgroundColor: "#e2e8f0",
  },
  newsImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  newsBody: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flexGrow: 1,
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: INK,
    lineHeight: 1.4,
    margin: 0,
  },
  newsExcerpt: {
    fontSize: 13,
    lineHeight: 1.6,
    color: BODY_TEXT,
    margin: 0,
  },

  // Upcoming Events Strip (Lucas Meyer style)
  eventsSection: {
    paddingBlock: { default: 40, [breakpoints.md]: 56 },
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(26, 26, 26, 0.06)",
  },
  eventsHeader: {
    marginBottom: 24,
  },
  eventsTitle: {
    fontSize: { default: 22, [breakpoints.md]: 26 },
    fontWeight: 800,
    color: INK,
    margin: "0 0 6px 0",
  },
  eventsLead: {
    fontSize: 14,
    color: BODY_TEXT,
    margin: 0,
  },
  eventsGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "repeat(2, 1fr)", [DESKTOP]: "repeat(4, 1fr)" },
    gap: 16,
  },
  eventCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(26, 26, 26, 0.08)",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  eventDate: {
    fontSize: 12,
    fontWeight: 700,
    color: NAVY_ACCENT,
  },
  eventName: {
    fontSize: 15,
    fontWeight: 800,
    color: INK,
    lineHeight: 1.3,
  },
  eventCity: {
    fontSize: 13,
    color: BODY_TEXT,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  eventBooth: {
    fontSize: 12,
    fontWeight: 600,
    color: NAVY_DEEP,
    backgroundColor: "#eff6ff",
    padding: "4px 8px",
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: "auto",
  },
});

export function NewsView({ onNavigateHome }: { onNavigateHome: (target?: string) => void }) {
  const [activeCat, setActiveCat] = useState<string>("all");

  const filteredNews: readonly NewsItem[] =
    activeCat === "all" ? NEWS_LIST : NEWS_LIST.filter((item) => item.category === activeCat);

  return (
    <div id="news-top" lang="zh-CN" {...stylex.props(styles.root)}>
      {/* Top Bar with Breadcrumbs & Title */}
      <section {...stylex.props(styles.topBar)}>
        <div {...stylex.props(styles.shell, styles.inset120)}>
          <nav aria-label="Breadcrumb" {...stylex.props(styles.breadcrumb)}>
            <button
              type="button"
              onClick={() => onNavigateHome("top")}
              {...stylex.props(styles.breadcrumbLink)}
            >
              首页
            </button>
            <ChevronRight size={13} strokeWidth={1.5} aria-hidden="true" />
            <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
              新闻资讯
            </span>
          </nav>

          <h1 {...stylex.props(styles.pageTitle)}>{NEWS_HEADER.chineseTitle}</h1>
          <p {...stylex.props(styles.pageLead)}>{NEWS_HEADER.lead}</p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section {...stylex.props(styles.filterSection)}>
        <div {...stylex.props(styles.shell, styles.inset120)}>
          <div role="tablist" aria-label="News Categories" {...stylex.props(styles.filterBar)}>
            {NEWS_CATEGORIES.map((cat) => {
              const isActive = activeCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCat(cat.id)}
                  {...stylex.props(styles.filterBtn, isActive && styles.filterBtnActive)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main News Content */}
      <section {...stylex.props(styles.mainSection)}>
        <div {...stylex.props(styles.shell, styles.inset120)}>
          {/* Featured Headline Story */}
          <article {...stylex.props(styles.featuredCard)}>
            <div {...stylex.props(styles.featuredImgWrap)}>
              <img
                src={FEATURED_NEWS.image}
                alt={FEATURED_NEWS.title}
                loading="eager"
                decoding="async"
                {...stylex.props(styles.featuredImg)}
              />
            </div>
            <div {...stylex.props(styles.featuredBody)}>
              <span {...stylex.props(styles.badge)}>{FEATURED_NEWS.categoryLabel}</span>
              <div {...stylex.props(styles.metaText)}>
                <span>{FEATURED_NEWS.date}</span>
                <span>·</span>
                <span>{FEATURED_NEWS.readTime} 阅读</span>
              </div>
              <h2 {...stylex.props(styles.featuredTitle)}>{FEATURED_NEWS.title}</h2>
              <p {...stylex.props(styles.featuredExcerpt)}>{FEATURED_NEWS.excerpt}</p>
              {FEATURED_NEWS.location ? (
                <div {...stylex.props(styles.locationNote)}>
                  <MapPin size={14} color={NAVY_ACCENT} />
                  <span>
                    {FEATURED_NEWS.location} · {FEATURED_NEWS.booth}
                  </span>
                </div>
              ) : null}
            </div>
          </article>

          {/* News Cards Grid */}
          <div {...stylex.props(styles.newsGrid)}>
            {filteredNews.map((news) => (
              <article key={news.id} {...stylex.props(styles.newsCard)}>
                <div {...stylex.props(styles.newsImgWrap)}>
                  <img
                    src={news.image}
                    alt={news.title}
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(styles.newsImg)}
                  />
                </div>
                <div {...stylex.props(styles.newsBody)}>
                  <span {...stylex.props(styles.badge)}>{news.categoryLabel}</span>
                  <div {...stylex.props(styles.metaText)}>
                    <span>{news.date}</span>
                  </div>
                  <h3 {...stylex.props(styles.newsTitle)}>{news.title}</h3>
                  <p {...stylex.props(styles.newsExcerpt)}>{news.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events / Expos Strip */}
      <section {...stylex.props(styles.eventsSection)}>
        <div {...stylex.props(styles.shell, styles.inset120)}>
          <div {...stylex.props(styles.eventsHeader)}>
            <h2 {...stylex.props(styles.eventsTitle)}>2026 全球重点展会日程</h2>
            <p {...stylex.props(styles.eventsLead)}>
              欢迎在展会现场与泛成技术团队会面，交流最新配方趋势与打样需求。
            </p>
          </div>

          <div {...stylex.props(styles.eventsGrid)}>
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.name} {...stylex.props(styles.eventCard)}>
                <div {...stylex.props(styles.eventDate)}>{event.date}</div>
                <div {...stylex.props(styles.eventName)}>{event.name}</div>
                <div {...stylex.props(styles.eventCity)}>
                  <MapPin size={13} color={NAVY_ACCENT} />
                  <span>{event.city}</span>
                </div>
                <div {...stylex.props(styles.eventBooth)}>展位：{event.booth}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Flow>
        <ContactCta
          actions={[{ label: CTA.action.label, onClick: () => onNavigateHome("contact") }]}
        />
      </Flow>
    </div>
  );
}
