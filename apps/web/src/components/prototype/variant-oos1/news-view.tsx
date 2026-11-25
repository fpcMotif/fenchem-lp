import { Collapse } from "../shared/collapse";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown, Plus } from "@fenchem-lp/ui/components/lucide";
import { createSignal, createUniqueId, For, Show } from "solid-js";

import { ContactCta } from "./contact-cta";
import {
  COMPANY_NEWS,
  DOMESTIC_SHOWS,
  NEWS_PAGE,
  type CompanyNewsItem,
  type DomesticShow,
} from "./news-data";
import { SubPageNav, kitStyles } from "./subpage-kit";
import { color, ease, layout } from "./tokens.stylex";

const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const DESKTOP = breakpoints.xl;
const PREVIEW_COUNT = 5;

const monthKey = (published: string) => {
  const [, year = "0", month = "0"] = /(\d{4})年(\d{1,2})月/.exec(published) ?? [];
  return Number(year) * 100 + Number(month);
};

const NEWEST_NEWS = [...COMPANY_NEWS].sort((a, b) => monthKey(b.published) - monthKey(a.published));

const styles = stylex.create({
  page: {
    paddingTop: layout.headerHeight,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
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
    transitionProperty: "transform",
    transitionDuration: { default: "200ms", "@media (prefers-reduced-motion: reduce)": "0ms" },
    transitionTimingFunction: ease.out,
  },
  iconOpen: {
    transform: "rotate(45deg)",
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
  moreRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: 28,
  },
  moreButton: {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 40,
    paddingInlineStart: 20,
    paddingInlineEnd: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    backgroundColor: { default: "transparent", ":hover": color.pageTint },
    color: colors.brandBlue700,
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "0.02em",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: { default: "160ms", "@media (prefers-reduced-motion: reduce)": "0ms" },
    transitionTimingFunction: ease.out,
  },
  moreIcon: {
    transitionProperty: "transform",
    transitionDuration: { default: "220ms", "@media (prefers-reduced-motion: reduce)": "0ms" },
    transitionTimingFunction: ease.out,
  },
  moreIconRotated: {
    transform: "rotate(180deg)",
  },
});

function MoreButton(props: { hiddenCount: number; expanded: boolean; onToggle: () => void }) {
  return (
    <Show when={props.hiddenCount > 0}>
      <div {...stylex.attrs(styles.moreRow)}>
        <button
          type="button"
          aria-expanded={props.expanded ? "true" : "false"}
          onClick={() => props.onToggle()}
          {...stylex.attrs(styles.moreButton, kitStyles.focusRing)}
        >
          <span>{props.expanded ? "收起" : "查看更多"}</span>
          <ChevronDown
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            {...stylex.attrs(styles.moreIcon, props.expanded && styles.moreIconRotated)}
          />
        </button>
      </div>
    </Show>
  );
}

function ShowRow(props: { show: DomesticShow }) {
  const meta = () =>
    props.show.booth ? `${props.show.when} · ${props.show.booth}` : props.show.when;
  return (
    <li {...stylex.attrs(styles.row)}>
      <article {...stylex.attrs(styles.show)}>
        <h3 {...stylex.attrs(styles.showTitle)}>{props.show.title}</h3>
        <p {...stylex.attrs(styles.showMeta)}>{meta()}</p>
      </article>
    </li>
  );
}

function Story(props: { item: CompanyNewsItem; open: boolean; onToggle: () => void }) {
  const panelId = createUniqueId();
  return (
    <li {...stylex.attrs(styles.row)}>
      <h3 {...stylex.attrs(styles.heading)}>
        <button
          type="button"
          aria-expanded={props.open ? "true" : "false"}
          aria-controls={panelId}
          onClick={() => props.onToggle()}
          {...stylex.attrs(styles.trigger, kitStyles.focusRing)}
        >
          <span {...stylex.attrs(styles.copy)}>
            <span {...stylex.attrs(styles.storyTitle)}>{props.item.title}</span>
            <span {...stylex.attrs(styles.published)}>发布时间：{props.item.published}</span>
          </span>
          <span aria-hidden="true" {...stylex.attrs(styles.icon, props.open && styles.iconOpen)}>
            <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
          </span>
        </button>
      </h3>
      <Collapse
        id={panelId}
        open={props.open}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div {...stylex.attrs(styles.body)}>
          <For each={props.item.paragraphs}>
            {(paragraph) => <p {...stylex.attrs(styles.paragraph)}>{paragraph}</p>}
          </For>
        </div>
      </Collapse>
    </li>
  );
}

export function NewsView(props: { onNavigateHome: (hash?: string) => void }) {
  const [openId, setOpenId] = createSignal<string | null>(null);
  const [allShows, setAllShows] = createSignal(false);
  const [allNews, setAllNews] = createSignal(false);
  const shows = () => (allShows() ? DOMESTIC_SHOWS : DOMESTIC_SHOWS.slice(0, PREVIEW_COUNT));
  const news = () => (allNews() ? NEWEST_NEWS : NEWEST_NEWS.slice(0, PREVIEW_COUNT));

  return (
    <div id="news-top" lang="zh-CN" {...stylex.attrs(kitStyles.root, styles.page)}>
      <h1 {...stylex.attrs(styles.srOnly)}>{NEWS_PAGE.title}</h1>
      <SubPageNav current={NEWS_PAGE.title} onNavigateHome={props.onNavigateHome} />
      <section {...stylex.attrs(styles.section)}>
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.columns)}>
          <div id="news-shows" {...stylex.attrs(kitStyles.anchor, styles.column)}>
            <h2 {...stylex.attrs(styles.columnTitle)}>{NEWS_PAGE.showsTitle}</h2>
            <p {...stylex.attrs(styles.columnLead)}>{NEWS_PAGE.showsLead}</p>
            <Show
              when={DOMESTIC_SHOWS.length > 0}
              fallback={<p {...stylex.attrs(styles.empty)}>{NEWS_PAGE.companyEmpty}</p>}
            >
              <ul {...stylex.attrs(styles.list)}>
                <For each={shows()}>{(show) => <ShowRow show={show} />}</For>
              </ul>
            </Show>
            <MoreButton
              hiddenCount={DOMESTIC_SHOWS.length - PREVIEW_COUNT}
              expanded={allShows()}
              onToggle={() => setAllShows((current) => !current)}
            />
          </div>
          <div id="news-company" {...stylex.attrs(kitStyles.anchor, styles.column)}>
            <h2 {...stylex.attrs(styles.columnTitle)}>{NEWS_PAGE.companyTitle}</h2>
            <Show
              when={COMPANY_NEWS.length > 0}
              fallback={<p {...stylex.attrs(styles.empty)}>{NEWS_PAGE.companyEmpty}</p>}
            >
              <ul {...stylex.attrs(styles.list)}>
                <For each={news()}>
                  {(item) => (
                    <Story
                      item={item}
                      open={openId() === item.id}
                      onToggle={() =>
                        setOpenId((current) => (current === item.id ? null : item.id))
                      }
                    />
                  )}
                </For>
              </ul>
            </Show>
            <MoreButton
              hiddenCount={NEWEST_NEWS.length - PREVIEW_COUNT}
              expanded={allNews()}
              onToggle={() => setAllNews((current) => !current)}
            />
          </div>
        </div>
      </section>
      <ContactCta
        id="news-contact"
        actions={[{ label: "联系我们", onClick: () => props.onNavigateHome("contact") }]}
      />
    </div>
  );
}
