import * as stylex from "@stylexjs/stylex";
import { m, useMotionValueEvent, type MotionValue } from "motion/react";
import { useEffect, useId, useRef, useState, type RefObject } from "react";

import { PRODUCTS, PRODUCTS_INTRO } from "./content";
import { Reveal, usePinEnabled, usePinProgress } from "./motion";
import { color, ease, font, layout as layoutTokens, media } from "./tokens.stylex";
import { SectionTitle, TextLink } from "./ui";
import { layout } from "./ui-values";

type Product = (typeof PRODUCTS)[number];

const COUNT = PRODUCTS.length;
const SEGMENT_ENTRY = 0.06;
const SCROLL_SETTLE_MS = 1200;
const META = "解决方案创新 · 稳定供应保障";

const PIN_HEIGHT = "360svh";
const STAGE_TOP = 112;
const STAGE_BOTTOM = 32;
const HEADER_BLOCK = 96;
const HEADER_GAP = 40;
const STAGE_CHROME = STAGE_TOP + STAGE_BOTTOM + HEADER_BLOCK + HEADER_GAP;
const PLATE_MAX_SVH = 56;
const PLATE_FIT = `min(100cqw, 0.8 * (100svh - ${STAGE_CHROME}px), ${PLATE_MAX_SVH}svh)`;
const PLATE_SNAP_TABLET = `calc(round(down, ${PLATE_FIT} + 24.5px, (100cqw + 24px) / 6) - 24px)`;
const PLATE_SNAP_DESKTOP = `calc(round(down, ${PLATE_FIT} + 24.5px, (100cqw + 24px) / 5) - 24px)`;

const ROW_TABLET = 60;
const ROW_DESKTOP = "min(72px, 8svh)";
const TITLE_DESKTOP = "min(48px, 5.34svh)";

const NAVY = [10, 31, 77] as const;
const PAPER = [244, 241, 234] as const;
const TABLE_STEPS = 16;
const LUMA_MATRIX =
  "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0";

type Grade = { black: number; white: number; gamma: number };

const GRADES: readonly Grade[] = [
  { black: 0.02, white: 0.98, gamma: 1 },
  { black: 0.04, white: 0.9, gamma: 0.55 },
  { black: 0.02, white: 0.94, gamma: 1.5 },
  { black: 0.06, white: 0.96, gamma: 1 },
];

const FILTER_ID = "ooss-duotone";
const filterId = (index: number) => `${FILTER_ID}-${index}`;

const channelTable = (channel: 0 | 1 | 2, grade: Grade) =>
  Array.from({ length: TABLE_STEPS + 1 }, (_, step) => {
    const span = grade.white - grade.black;
    const level =
      Math.min(1, Math.max(0, (step / TABLE_STEPS - grade.black) / span)) ** grade.gamma;
    return ((NAVY[channel] + (PAPER[channel] - NAVY[channel]) * level) / 255).toFixed(4);
  }).join(" ");

const GRAIN =
  'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22g%22 x=%220%22 y=%220%22 width=%22100%25%22 height=%22100%25%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23g)%22/%3E%3C/svg%3E")';

const categoryAt = (progress: number) =>
  Math.min(COUNT - 1, Math.max(0, Math.floor(progress * COUNT)));

const wipeFromBottom = stylex.keyframes({
  "0%": { clipPath: "inset(100% 0 0 0)" },
  "100%": { clipPath: "inset(0 0 0 0)" },
});

const wipeFromTop = stylex.keyframes({
  "0%": { clipPath: "inset(0 0 100% 0)" },
  "100%": { clipPath: "inset(0 0 0 0)" },
});

const settle = stylex.keyframes({
  "0%": { transform: "scale(1.06)" },
  "100%": { transform: "scale(1)" },
});

const styles = stylex.create({
  section: {
    position: "relative",
    backgroundColor: color.paper,
    scrollMarginTop: { default: 80, [media.tabletUp]: 0 },
  },
  sectionPinned: {
    height: PIN_HEIGHT,
    marginTop: -40,
  },
  filterDefs: {
    position: "absolute",
    width: 0,
    height: 0,
    pointerEvents: "none",
  },
  stage: {
    position: "sticky",
    top: 0,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    height: "100svh",
    paddingTop: STAGE_TOP,
    paddingBottom: STAGE_BOTTOM,
  },
  stageContent: {
    marginBlock: "auto",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  headerRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: layoutTokens.gutter,
  },
  headerAction: {
    flexShrink: 0,
    marginBottom: -12,
  },
  meta: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.5,
    color: color.inkMuted,
  },
  body: {
    marginTop: HEADER_GAP,
  },
  rail: {
    gridColumn: "1 / span 6",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  nameList: {
    display: "block",
    margin: 0,
    marginTop: { default: -13, [media.desktop]: -16 },
    padding: 0,
    listStyleType: "none",
  },
  nameItem: {
    display: "block",
    margin: 0,
    padding: 0,
  },
  nameButton: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    height: { default: ROW_TABLET, [media.desktop]: ROW_DESKTOP },
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    textAlign: "start",
    fontFamily: font.cjk,
    fontSize: { default: 40, [media.desktop]: TITLE_DESKTOP },
    fontWeight: 700,
    lineHeight: 1,
    color: { default: color.inkFaint, ":hover": color.inkMuted, ":focus-visible": color.ink },
    transitionProperty: "color",
    transitionDuration: "300ms",
    transitionTimingFunction: ease.out,
  },
  nameButtonActive: {
    color: { default: color.ink, ":hover": color.ink, ":focus-visible": color.ink },
  },
  mark: {
    position: "absolute",
    insetInlineStart: -24,
    top: "50%",
    width: 4,
    height: "0.72em",
    backgroundColor: color.green,
    transform: "translateY(-50%) scaleY(0)",
    transitionProperty: "transform",
    transitionDuration: "300ms",
    transitionTimingFunction: ease.out,
  },
  markActive: {
    transform: "translateY(-50%) scaleY(1)",
  },
  detail: {
    display: "grid",
    maxWidth: 480,
    marginTop: 24,
  },
  detailItem: {
    gridRow: 1,
    gridColumn: 1,
    minWidth: 0,
    opacity: 0,
    visibility: "hidden",
    transitionProperty: "opacity, visibility",
    transitionDuration: "300ms, 0s",
    transitionDelay: "0s, 300ms",
    transitionTimingFunction: ease.out,
  },
  detailItemActive: {
    opacity: 1,
    visibility: "visible",
    transitionDelay: "0s, 0s",
  },
  description: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.7,
    color: color.inkMuted,
  },
  tags: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: layoutTokens.gutter,
    rowGap: 0,
    margin: 0,
    marginTop: 16,
    padding: 0,
    listStyleType: "none",
  },
  tag: {
    margin: 0,
    paddingBlock: 10,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.rule,
    fontSize: 16,
    lineHeight: 1.5,
    color: color.ink,
  },
  progress: {
    marginTop: "auto",
    paddingTop: 32,
  },
  track: {
    position: "relative",
    height: 1,
    overflow: "hidden",
    backgroundColor: color.rule,
  },
  fill: {
    position: "absolute",
    inset: 0,
    backgroundColor: color.royal,
    transformOrigin: "left",
  },
  plateCell: {
    gridColumn: { default: "7 / -1", [media.desktop]: "8 / -1" },
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    containerType: "inline-size",
  },
  plate: {
    position: "relative",
    overflow: "hidden",
    width: {
      default: PLATE_FIT,
      "@supports (width: round(down, 10px, 3px))": {
        default: PLATE_SNAP_TABLET,
        [media.desktop]: PLATE_SNAP_DESKTOP,
      },
    },
    aspectRatio: "4 / 5",
    backgroundColor: color.surface,
  },
  layer: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    zIndex: 0,
  },
  layerPrevious: {
    zIndex: 1,
  },
  layerActive: {
    zIndex: 2,
  },
  wipeForward: {
    animationName: wipeFromBottom,
    animationDuration: "700ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  wipeBack: {
    animationName: wipeFromTop,
    animationDuration: "700ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  image: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 30%",
  },
  imageSettle: {
    animationName: settle,
    animationDuration: "700ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  grade0: { filter: `url(#${FILTER_ID}-0)` },
  grade1: { filter: `url(#${FILTER_ID}-1)` },
  grade2: { filter: `url(#${FILTER_ID}-2)` },
  grade3: { filter: `url(#${FILTER_ID}-3)` },
  grain: {
    position: "absolute",
    inset: 0,
    zIndex: 3,
    backgroundImage: GRAIN,
    backgroundSize: "200px 200px",
    opacity: 0.3,
    pointerEvents: "none",
  },
  stackedHeader: {
    marginBottom: { default: 40, [media.tablet]: 56, [media.desktop]: 72 },
  },
  rows: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    scrollMarginTop: 96,
  },
  row: {
    display: { default: "block", [media.tabletUp]: "grid" },
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    columnGap: layoutTokens.gutter,
    alignItems: "start",
    paddingBlock: { default: 32, [media.tabletUp]: 48 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.rule,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    gridColumn: { default: "auto", [media.tablet]: "7 / -1", [media.desktop]: "8 / -1" },
    gridRow: 1,
    aspectRatio: { default: "4 / 3", [media.tabletUp]: "4 / 5" },
    backgroundColor: color.surface,
  },
  rowText: {
    gridColumn: "1 / span 6",
    gridRow: 1,
    marginTop: { default: 24, [media.tabletUp]: 0 },
  },
  rowTitle: {
    margin: 0,
    marginBottom: 12,
    fontFamily: font.cjk,
    fontSize: { default: 32, [media.tablet]: 40, [media.desktop]: 48 },
    fontWeight: 700,
    lineHeight: 1.15,
    color: color.ink,
  },
});

const GRADE_STYLES = [styles.grade0, styles.grade1, styles.grade2, styles.grade3] as const;

function DuotoneFilters() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      {...stylex.props(styles.filterDefs)}
    >
      {GRADES.map((grade, index) => (
        <filter key={filterId(index)} id={filterId(index)} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values={LUMA_MATRIX} />
          <feComponentTransfer>
            <feFuncR type="table" tableValues={channelTable(0, grade)} />
            <feFuncG type="table" tableValues={channelTable(1, grade)} />
            <feFuncB type="table" tableValues={channelTable(2, grade)} />
          </feComponentTransfer>
        </filter>
      ))}
    </svg>
  );
}

function GradedImage({
  product,
  index,
  settling = false,
}: {
  product: Product;
  index: number;
  settling?: boolean;
}) {
  return (
    <img
      src={product.image}
      alt={`${product.title}应用示意图`}
      loading="lazy"
      decoding="async"
      {...stylex.props(styles.image, GRADE_STYLES[index], settling && styles.imageSettle)}
    />
  );
}

function Grain() {
  return <span aria-hidden="true" {...stylex.props(styles.grain)} />;
}

function TagList({ tags }: { tags: Product["tags"] }) {
  return (
    <ul role="list" {...stylex.props(styles.tags)}>
      {tags.map((tag) => (
        <li key={tag} {...stylex.props(styles.tag)}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function MarketsHeader() {
  return (
    <div {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.headerRow)}>
        <SectionTitle id="oo-products-title">{PRODUCTS_INTRO.title}</SectionTitle>
        <Reveal index={2} sx={styles.headerAction}>
          <TextLink href={PRODUCTS_INTRO.cta.href}>{PRODUCTS_INTRO.cta.label}</TextLink>
        </Reveal>
      </div>
      <Reveal as="p" index={1} sx={styles.meta}>
        {META}
      </Reveal>
    </div>
  );
}

type Selection = { active: number; previous: number | null; forward: boolean };

function PinnedStage({
  progress,
  sectionRef,
}: {
  progress: MotionValue<number>;
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const detailBase = useId();
  const [{ active, previous, forward }, setSelection] = useState<Selection>(() => ({
    active: categoryAt(progress.get()),
    previous: null,
    forward: true,
  }));
  const target = useRef<number | null>(null);
  const settleTimer = useRef<number | undefined>(undefined);

  const select = (next: number) =>
    setSelection((current) =>
      current.active === next
        ? current
        : { active: next, previous: current.active, forward: next > current.active },
    );

  useMotionValueEvent(progress, "change", (value) => {
    const next = categoryAt(value);
    if (target.current !== null) {
      if (next === target.current) target.current = null;
      return;
    }
    select(next);
  });

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  const goTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    target.current = index;
    select(index);
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      target.current = null;
      select(categoryAt(progress.get()));
    }, SCROLL_SETTLE_MS);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: sectionTop + range * ((index + SEGMENT_ENTRY) / COUNT),
      behavior: "smooth",
    });
  };

  const wiping = previous !== null;
  const detailId = (index: number) => `${detailBase}-${index}`;

  return (
    <div id="product-list" {...stylex.props(styles.stage)}>
      <div {...stylex.props(layout.shell, layout.inset, styles.stageContent)}>
        <MarketsHeader />
        <div {...stylex.props(layout.grid12, styles.body)}>
          <Reveal index={3} sx={styles.rail}>
            <ul aria-label="产品类别" role="list" {...stylex.props(styles.nameList)}>
              {PRODUCTS.map((product, index) => {
                const isActive = index === active;
                return (
                  <li key={product.title} {...stylex.props(styles.nameItem)}>
                    <button
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                      aria-describedby={detailId(index)}
                      onClick={() => goTo(index)}
                      {...stylex.props(styles.nameButton, isActive && styles.nameButtonActive)}
                    >
                      <span
                        aria-hidden="true"
                        {...stylex.props(styles.mark, isActive && styles.markActive)}
                      />
                      {product.title}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div {...stylex.props(styles.detail)}>
              {PRODUCTS.map((product, index) => {
                const isActive = index === active;
                return (
                  <div
                    key={product.title}
                    id={detailId(index)}
                    aria-hidden={!isActive}
                    {...stylex.props(styles.detailItem, isActive && styles.detailItemActive)}
                  >
                    <p {...stylex.props(styles.description)}>{product.description}</p>
                    <TagList tags={product.tags} />
                  </div>
                );
              })}
            </div>
            <div aria-hidden="true" {...stylex.props(styles.progress)}>
              <div {...stylex.props(styles.track)}>
                <m.span {...stylex.props(styles.fill)} style={{ scaleX: progress }} />
              </div>
            </div>
          </Reveal>
          <Reveal index={4} sx={styles.plateCell}>
            <div {...stylex.props(styles.plate)}>
              {PRODUCTS.map((product, index) => {
                const isActive = index === active;
                return (
                  <div
                    key={product.title}
                    aria-hidden={!isActive}
                    {...stylex.props(
                      styles.layer,
                      index === previous && styles.layerPrevious,
                      isActive && styles.layerActive,
                      isActive && wiping && (forward ? styles.wipeForward : styles.wipeBack),
                    )}
                  >
                    <GradedImage product={product} index={index} settling={isActive && wiping} />
                  </div>
                );
              })}
              <Grain />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function StackedList() {
  return (
    <div {...stylex.props(layout.shell, layout.inset)}>
      <div {...stylex.props(styles.stackedHeader)}>
        <MarketsHeader />
      </div>
      <ul id="product-list" role="list" {...stylex.props(styles.rows)}>
        {PRODUCTS.map((product, index) => (
          <Reveal key={product.title} as="li" index={index} sx={styles.row}>
            <div {...stylex.props(styles.frame)}>
              <GradedImage product={product} index={index} />
              <Grain />
            </div>
            <div {...stylex.props(styles.rowText)}>
              <h3 {...stylex.props(styles.rowTitle)}>{product.title}</h3>
              <p {...stylex.props(styles.description)}>{product.description}</p>
              <TagList tags={product.tags} />
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export function Markets() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinned = usePinEnabled();
  const progress = usePinProgress(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="products"
      aria-labelledby="oo-products-title"
      {...stylex.props(styles.section, pinned ? styles.sectionPinned : layout.section)}
    >
      <DuotoneFilters />
      {pinned ? <PinnedStage progress={progress} sectionRef={sectionRef} /> : <StackedList />}
    </section>
  );
}
