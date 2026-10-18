import * as stylex from "@stylexjs/stylex";
import { MapPin } from "@fenchem-lp/ui/components/lucide";
import { createMemo, createSignal, For } from "solid-js";

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
import { SubPageBanner, SubPageNav, kitStyles } from "./subpage-kit";
import { color } from "./tokens.stylex";

const MUTED_LABEL = "#64748b";
const NAVY_DEEP = "#071e42";
const NAVY_ACCENT = "#0743a9";

const DESKTOP = "@media (min-width: 1280px)";

const styles = stylex.create({
  // Content Area
  mainSection: {
    paddingBlock: { default: 36, ["@media (min-width: 768px)"]: 64 },
  },

  // Featured Story (Lucas Meyer editorial style)
  featuredCard: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", ["@media (min-width: 1024px)"]: "1.1fr 0.9fr" },
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(26, 26, 26, 0.08)",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
    marginBottom: { default: 40, ["@media (min-width: 768px)"]: 56 },
  },
  featuredImgWrap: {
    position: "relative",
    minHeight: { default: 220, ["@media (min-width: 768px)"]: 320 },
    backgroundColor: "#e2e8f0",
  },
  featuredImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  featuredBody: {
    padding: { default: 24, ["@media (min-width: 768px)"]: 36 },
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
    fontSize: { default: 18, ["@media (min-width: 768px)"]: 22 },
    fontWeight: 800,
    color: color.ink,
    lineHeight: 1.35,
    margin: 0,
  },
  featuredExcerpt: {
    fontSize: 14,
    lineHeight: 1.65,
    color: color.bodyText,
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
    gridTemplateColumns: {
      default: "1fr",
      ["@media (min-width: 768px)"]: "repeat(2, 1fr)",
      [DESKTOP]: "repeat(3, 1fr)",
    },
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
    color: color.ink,
    lineHeight: 1.4,
    margin: 0,
  },
  newsExcerpt: {
    fontSize: 13,
    lineHeight: 1.6,
    color: color.bodyText,
    margin: 0,
  },

  // Upcoming Events Strip (Lucas Meyer style)
  eventsSection: {
    paddingBlock: { default: 40, ["@media (min-width: 768px)"]: 56 },
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(26, 26, 26, 0.06)",
  },
  eventsHeader: {
    marginBottom: 24,
  },
  eventsTitle: {
    fontSize: { default: 22, ["@media (min-width: 768px)"]: 26 },
    fontWeight: 800,
    color: color.ink,
    margin: "0 0 6px 0",
  },
  eventsLead: {
    fontSize: 14,
    color: color.bodyText,
    margin: 0,
  },
  eventsGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      ["@media (min-width: 768px)"]: "repeat(2, 1fr)",
      [DESKTOP]: "repeat(4, 1fr)",
    },
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
    color: color.ink,
    lineHeight: 1.3,
  },
  eventCity: {
    fontSize: 13,
    color: color.bodyText,
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

export function NewsView(props: { onNavigateHome: (target?: string) => void }) {
  const [activeCat, setActiveCat] = createSignal<string>("all");

  const filteredNews = createMemo<readonly NewsItem[]>(() =>
    activeCat() === "all" ? NEWS_LIST : NEWS_LIST.filter((item) => item.category === activeCat()),
  );

  return (
    <div id="news-top" lang="zh-CN" {...stylex.attrs(kitStyles.root)}>
      <SubPageBanner
        eyebrow={NEWS_HEADER.title}
        title={NEWS_HEADER.chineseTitle}
        titleId="news-title"
        tagline={NEWS_HEADER.tagline}
        lead={NEWS_HEADER.lead}
        meta={NEWS_HEADER.meta}
        image={NEWS_HEADER.image}
        imageAlt={NEWS_HEADER.imageAlt}
      />

      <SubPageNav
        current="新闻资讯"
        chips={NEWS_CATEGORIES}
        activeChip={activeCat()}
        onSelectChip={setActiveCat}
        chipsLabel="新闻分类"
        onNavigateHome={props.onNavigateHome}
      />

      {/* Main News Content */}
      <section {...stylex.attrs(styles.mainSection)}>
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
          {/* Featured Headline Story */}
          <article {...stylex.attrs(styles.featuredCard)}>
            <div {...stylex.attrs(styles.featuredImgWrap)}>
              <img
                src={FEATURED_NEWS.image}
                alt={FEATURED_NEWS.title}
                loading="eager"
                decoding="async"
                {...stylex.attrs(styles.featuredImg)}
              />
            </div>
            <div {...stylex.attrs(styles.featuredBody)}>
              <span {...stylex.attrs(styles.badge)}>{FEATURED_NEWS.categoryLabel}</span>
              <div {...stylex.attrs(styles.metaText)}>
                <span>{FEATURED_NEWS.date}</span>
                <span>·</span>
                <span>{FEATURED_NEWS.readTime} 阅读</span>
              </div>
              <h2 {...stylex.attrs(styles.featuredTitle)}>{FEATURED_NEWS.title}</h2>
              <p {...stylex.attrs(styles.featuredExcerpt)}>{FEATURED_NEWS.excerpt}</p>
              {FEATURED_NEWS.location ? (
                <div {...stylex.attrs(styles.locationNote)}>
                  <MapPin size={14} color={NAVY_ACCENT} />
                  <span>
                    {FEATURED_NEWS.location} · {FEATURED_NEWS.booth}
                  </span>
                </div>
              ) : null}
            </div>
          </article>

          {/* News Cards Grid */}
          <div {...stylex.attrs(styles.newsGrid)}>
            <For each={filteredNews()}>
              {(news) => (
                <article {...stylex.attrs(styles.newsCard)}>
                  <div {...stylex.attrs(styles.newsImgWrap)}>
                    <img
                      src={news.image}
                      alt={news.title}
                      loading="lazy"
                      decoding="async"
                      {...stylex.attrs(styles.newsImg)}
                    />
                  </div>
                  <div {...stylex.attrs(styles.newsBody)}>
                    <span {...stylex.attrs(styles.badge)}>{news.categoryLabel}</span>
                    <div {...stylex.attrs(styles.metaText)}>
                      <span>{news.date}</span>
                    </div>
                    <h3 {...stylex.attrs(styles.newsTitle)}>{news.title}</h3>
                    <p {...stylex.attrs(styles.newsExcerpt)}>{news.excerpt}</p>
                  </div>
                </article>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Upcoming Events / Expos Strip */}
      <section {...stylex.attrs(styles.eventsSection)}>
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
          <div {...stylex.attrs(styles.eventsHeader)}>
            <h2 {...stylex.attrs(styles.eventsTitle)}>2026 全球重点展会日程</h2>
            <p {...stylex.attrs(styles.eventsLead)}>
              欢迎在展会现场与泛成技术团队会面，交流最新配方趋势与打样需求。
            </p>
          </div>

          <div {...stylex.attrs(styles.eventsGrid)}>
            {UPCOMING_EVENTS.map((event) => (
              <div {...stylex.attrs(styles.eventCard)}>
                <div {...stylex.attrs(styles.eventDate)}>{event.date}</div>
                <div {...stylex.attrs(styles.eventName)}>{event.name}</div>
                <div {...stylex.attrs(styles.eventCity)}>
                  <MapPin size={13} color={NAVY_ACCENT} />
                  <span>{event.city}</span>
                </div>
                <div {...stylex.attrs(styles.eventBooth)}>展位：{event.booth}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Flow>
        <ContactCta
          actions={[{ label: CTA.action.label, onClick: () => props.onNavigateHome("contact") }]}
        />
      </Flow>
    </div>
  );
}
