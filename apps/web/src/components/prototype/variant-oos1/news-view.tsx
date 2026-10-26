import { Collapse } from "../shared/collapse";
import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

import { ContactCta } from "./contact-cta";
import {
  COMPANY_NEWS,
  DOMESTIC_SHOWS,
  NEWS_PAGE,
  type CompanyNewsItem,
  type DomesticShow,
} from "./news-data";
import { SubPageBanner, SubPageNav, kitStyles } from "./subpage-kit";
import { color } from "./tokens.stylex";

const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const DESKTOP = breakpoints.xl;
const BANNER = "/prototype/official-site/product-human-nutrition.webp";

const styles = stylex.create({
  section: {
    paddingTop: { default: 56, [DESKTOP]: 88 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
  },
  columns: {
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: { default: 64, [DESKTOP]: 88 },
  },
  column: {
    minWidth: 0,
  },
  columnTitle: {
    margin: 0,
    fontSize: { default: 26, [DESKTOP]: 32 },
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  columnLead: {
    margin: 0,
    marginTop: 10,
    fontSize: 15,
    lineHeight: 1.6,
    color: color.muted,
  },
  list: {
    margin: 0,
    marginTop: 28,
    padding: 0,
    listStyle: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  show: {
    display: "grid",
    gap: 6,
    paddingBlock: 22,
  },
  showTitle: {
    margin: 0,
    fontSize: 17,
    fontWeight: 650,
    lineHeight: 1.45,
  },
  showMeta: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
    color: color.muted,
  },
  trigger: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
    margin: 0,
    paddingBlock: 22,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "inherit",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
  },
  heading: {
    margin: 0,
  },
  copy: {
    display: "grid",
    gap: 8,
    minWidth: 0,
  },
  storyTitle: {
    fontSize: { default: 17, [DESKTOP]: 18 },
    fontWeight: 650,
    lineHeight: 1.45,
  },
  published: {
    fontSize: 13,
    lineHeight: 1.4,
    color: color.muted,
  },
  icon: {
    display: "grid",
    placeItems: "center",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    width: 28,
    height: 28,
    marginTop: 2,
    color: color.ink,
  },
  body: {
    display: "grid",
    gap: 14,
    paddingBottom: 22,
    maxWidth: 640,
  },
  paragraph: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.75,
    color: color.bodyText,
  },
  empty: {
    margin: 0,
    marginTop: 28,
    paddingBlock: 28,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
    fontSize: 15,
    lineHeight: 1.6,
    color: color.muted,
  },
});

function ShowRow({ show }: { show: DomesticShow }) {
  const meta = show.booth ? `${show.when} · ${show.booth}` : show.when;
  return (
    <li {...stylex.props(styles.row)}>
      <article {...stylex.props(styles.show)}>
        <h3 {...stylex.props(styles.showTitle)}>{show.title}</h3>
        <p {...stylex.props(styles.showMeta)}>{meta}</p>
      </article>
    </li>
  );
}

function Story({
  item,
  open,
  onToggle,
}: {
  item: CompanyNewsItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  return (
    <li {...stylex.props(styles.row)}>
      <h3 {...stylex.props(styles.heading)}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          {...stylex.props(styles.trigger, kitStyles.focusRing)}
        >
          <span {...stylex.props(styles.copy)}>
            <span {...stylex.props(styles.storyTitle)}>{item.title}</span>
            <span {...stylex.props(styles.published)}>发布时间：{item.published}</span>
          </span>
          <span aria-hidden="true" {...stylex.props(styles.icon)}>
            <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
          </span>
        </button>
      </h3>
      <Collapse id={panelId} open={open} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
        <div {...stylex.props(styles.body)}>
          {item.paragraphs.map((paragraph) => (
            <p key={paragraph} {...stylex.props(styles.paragraph)}>
              {paragraph}
            </p>
          ))}
        </div>
      </Collapse>
    </li>
  );
}

export function NewsView({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div id="news-top" lang="zh-CN" {...stylex.props(kitStyles.root)}>
      <SubPageBanner
        titleId="news-title"
        eyebrow="资讯"
        title={NEWS_PAGE.title}
        lead={NEWS_PAGE.lead}
        image={BANNER}
        imageAlt=""
        imagePosition="center 42%"
        size="compact"
      />
      <SubPageNav current={NEWS_PAGE.title} onNavigateHome={onNavigateHome} />
      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.columns)}>
          <div id="news-shows" {...stylex.props(kitStyles.anchor, styles.column)}>
            <h2 {...stylex.props(styles.columnTitle)}>{NEWS_PAGE.showsTitle}</h2>
            <p {...stylex.props(styles.columnLead)}>{NEWS_PAGE.showsLead}</p>
            {DOMESTIC_SHOWS.length === 0 ? (
              <p {...stylex.props(styles.empty)}>{NEWS_PAGE.companyEmpty}</p>
            ) : (
              <ul {...stylex.props(styles.list)}>
                {DOMESTIC_SHOWS.map((show) => (
                  <ShowRow key={show.id} show={show} />
                ))}
              </ul>
            )}
          </div>
          <div id="news-company" {...stylex.props(kitStyles.anchor, styles.column)}>
            <h2 {...stylex.props(styles.columnTitle)}>{NEWS_PAGE.companyTitle}</h2>
            {COMPANY_NEWS.length === 0 ? (
              <p {...stylex.props(styles.empty)}>{NEWS_PAGE.companyEmpty}</p>
            ) : (
              <ul {...stylex.props(styles.list)}>
                {COMPANY_NEWS.map((item) => (
                  <Story
                    key={item.id}
                    item={item}
                    open={openId === item.id}
                    onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <ContactCta
        id="news-contact"
        title="需要索取样品或技术资料？"
        subtitle="我们的应用团队随时为您提供添加量指导与配方参考。"
        actions={[{ label: "联系我们", onClick: () => onNavigateHome("contact") }]}
      />
    </div>
  );
}
