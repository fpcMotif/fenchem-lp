import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useMotionValue, useScroll, useSpring, useTransform } from "@/compat/motion";
import { createEffect, createSignal } from "solid-js";

import { ABOUT_CAMPUS, ABOUT_CULTURE, ABOUT_HERO, ABOUT_MOMENT } from "../../about-data";
import { STATS } from "../../content";
import {
  GROUPS,
  LOBBY_ALT,
  NAV_ENGLISH,
  PHOTO_ENGLISH,
  PHOTO_SHAPE,
  STAT_ENGLISH,
  STRIP_LOOPS,
  STRIP_PHRASES,
} from "./data";
import { Cross, Seam } from "./seam";
import { face, mq, stage, tone } from "./tokens.stylex";
import { ui } from "./ui";

const STAGE_TOP = 128;
const PACE = 0.85;
const LEAD_IN = "max(6vw, 56px)";
const TAIL = "max(6vw, 72px)";
const SPRING = { stiffness: 120, damping: 28, mass: 0.6, restDelta: 0.0004 } as const;
const LAST_COUNTRY = ABOUT_HERO.countries.length - 1;

type Metrics = {
  runwayHeight: number;
  scrollRange: number;
  distance: number;
  viewport: number;
  centers: number[];
  anchors: { id: string; top: number; height: number }[];
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

const dyn = stylex.create({
  runwayHeight: (value: number) => ({ height: `${value}px` }),
  slab: (top: number, height: number) => ({ top: `${top}px`, height: `${Math.max(height, 1)}px` }),
});

const shifts = stylex.create({
  down3: { translate: { default: null, [mq.track]: "0 3px" } },
  up4: { translate: { default: null, [mq.track]: "0 -4px" } },
  down5: { translate: { default: null, [mq.track]: "0 5px" } },
  up2: { translate: { default: null, [mq.track]: "0 -2px" } },
  down4: { translate: { default: null, [mq.track]: "0 4px" } },
  up3: { translate: { default: null, [mq.track]: "0 -3px" } },
});

const SHIFT_CYCLE = [
  shifts.down3,
  shifts.up4,
  shifts.down5,
  shifts.up2,
  shifts.down4,
  shifts.up3,
] as const;

const shiftFor = (order: number) => SHIFT_CYCLE[order % SHIFT_CYCLE.length];

const styles = stylex.create({
  runway: {
    position: "relative",
    height: { default: "auto", [mq.pin]: "560vh" },
    backgroundColor: colors.paper,
  },
  slab: {
    position: "absolute",
    left: 0,
    width: 1,
    scrollMarginTop: STAGE_TOP,
    pointerEvents: "none",
  },
  stage: {
    position: { default: "relative", [mq.pin]: "sticky" },
    top: { default: 0, [mq.pin]: STAGE_TOP },
    display: "flex",
    flexDirection: "column",
    height: { default: "auto", [mq.pin]: stage.height },
    overflow: { default: "visible", [mq.pin]: "clip" },
    paddingBlock: { default: 48, [mq.stackWide]: 64, [mq.snap]: 48, [mq.pin]: 0 },
    backgroundColor: colors.paper,
  },
  strip: {
    display: { default: "none", [mq.pin]: "block" },
    position: "relative",
    flexShrink: 0,
    height: 64,
  },
  stripTrain: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    width: "max-content",
    height: "100%",
    willChange: "transform",
    paddingInlineStart: LEAD_IN,
  },
  phrase: {
    display: "inline-flex",
    alignItems: "center",
    paddingInline: 44,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 30,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.01em",
    whiteSpace: "nowrap",
    color: tone.drift,
  },
  join: {
    display: "flex",
    color: tone.seam,
  },
  view: {
    position: "relative",
    flexGrow: 1,
    minHeight: 0,
    overflowX: { default: "visible", [mq.snap]: "auto", [mq.pin]: "clip" },
    overflowY: { default: "visible", [mq.snap]: "hidden", [mq.pin]: "clip" },
    scrollSnapType: { default: "none", [mq.snap]: "x mandatory" },
    scrollPaddingInline: 16,
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
  },
  track: {
    position: "relative",
    display: "flex",
    flexDirection: { default: "column", [mq.track]: "row" },
    alignItems: { default: "center", [mq.snap]: "flex-start", [mq.pin]: "center" },
    boxSizing: "border-box",
    width: { default: "auto", [mq.track]: "max-content" },
    maxWidth: { default: 920, [mq.track]: "none" },
    height: { default: "auto", [mq.pin]: "100%" },
    marginInline: { default: "auto", [mq.track]: 0 },
    paddingInlineStart: { default: 16, [mq.stackWide]: 40, [mq.pin]: LEAD_IN },
    paddingInlineEnd: { default: 16, [mq.stackWide]: 40, [mq.pin]: TAIL },
    willChange: { default: "auto", [mq.pin]: "transform" },
  },
  group: {
    display: "flex",
    flexDirection: { default: "column", [mq.track]: "row" },
    alignItems: "center",
    flexShrink: 0,
    width: { default: "100%", [mq.track]: "auto" },
    height: { default: "auto", [mq.pin]: "100%" },
    scrollMarginTop: STAGE_TOP + 16,
  },
  frame: {
    position: "relative",
    flexShrink: 0,
    boxSizing: "border-box",
    scrollSnapAlign: "start",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: { default: 28, [mq.pin]: "clamp(24px, 4.4vh, 40px)" },
    width: {
      default: "100%",
      [mq.snap]: "min(86vw, 480px)",
      [mq.pin]: "clamp(480px, 38vw, 580px)",
    },
    height: { default: "auto", [mq.pin]: stage.row },
  },
  profileTitle: {
    margin: 0,
    fontSize: { default: 28, [mq.mid]: 34, [mq.pin]: "clamp(28px, min(2.7vw, 4.6vh), 40px)" },
    fontWeight: 500,
    lineHeight: 1.32,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  profileEnglish: {
    marginTop: 14,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.muted,
  },
  profileLead: {
    margin: 0,
    maxWidth: "33em",
    fontSize: { default: 16, [mq.pin]: "clamp(15px, 2vh, 16px)" },
    fontWeight: 400,
    lineHeight: 1.95,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "pretty",
  },
  network: {
    margin: 0,
    paddingTop: { default: 20, [mq.pin]: "clamp(16px, 2.6vh, 24px)" },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.95,
    letterSpacing: "0.04em",
    color: tone.muted,
    textWrap: "pretty",
  },
  networkLead: {
    color: tone.body,
  },
  place: {
    whiteSpace: "nowrap",
  },
  quiet: {
    margin: 0,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    color: tone.muted,
  },
  photo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 14,
    margin: 0,
    height: { default: "auto", [mq.pin]: stage.row },
  },
  figClassic: {
    width: { default: "100%", [mq.snap]: "min(80vw, 420px)", [mq.pin]: "auto" },
  },
  figWide: {
    width: { default: "100%", [mq.snap]: "min(88vw, 560px)", [mq.pin]: "auto" },
  },
  figSquare: {
    width: { default: "100%", [mq.snap]: "min(78vw, 400px)", [mq.pin]: "auto" },
  },
  figBroad: {
    width: { default: "100%", [mq.snap]: "min(84vw, 480px)", [mq.pin]: "auto" },
  },
  figTall: {
    maxWidth: { default: 360, [mq.track]: "none" },
    width: { default: "100%", [mq.snap]: "min(62vw, 300px)", [mq.pin]: "auto" },
  },
  figPortrait: {
    maxWidth: { default: 480, [mq.track]: "none" },
    width: { default: "100%", [mq.snap]: "min(70vw, 340px)", [mq.pin]: "auto" },
  },
  media: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: tone.placeholder,
  },
  shapeClassic: {
    aspectRatio: "4 / 3",
    width: { default: "100%", [mq.pin]: `calc(${stage.photo} * 1.18)` },
    height: { default: "auto", [mq.pin]: stage.photo },
  },
  shapeWide: {
    aspectRatio: "16 / 9",
    width: { default: "100%", [mq.pin]: `calc(${stage.photo} * 1.48)` },
    height: { default: "auto", [mq.pin]: stage.photo },
  },
  shapeSquare: {
    aspectRatio: "5 / 4",
    width: { default: "100%", [mq.pin]: `calc(${stage.photo} * 1)` },
    height: { default: "auto", [mq.pin]: stage.photo },
  },
  shapeBroad: {
    aspectRatio: "3 / 2",
    width: { default: "100%", [mq.pin]: `calc(${stage.photo} * 1.3)` },
    height: { default: "auto", [mq.pin]: stage.photo },
  },
  shapeTall: {
    aspectRatio: "2 / 3",
    width: { default: "100%", [mq.pin]: `calc(${stage.photo} * 0.64)` },
    height: { default: "auto", [mq.pin]: stage.photo },
  },
  shapePortrait: {
    aspectRatio: "4 / 5",
    width: { default: "100%", [mq.pin]: `calc(${stage.photo} * 0.76)` },
    height: { default: "auto", [mq.pin]: stage.photo },
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  tileButton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "zoom-in",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  note: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: "2px 14px",
    inlineSize: { default: "auto", [mq.pin]: 0 },
    minInlineSize: { default: 0, [mq.pin]: "100%" },
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: tone.body,
  },
  noteEnglish: {
    color: tone.muted,
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: { default: 28, [mq.pin]: "clamp(24px, 4vh, 36px)" },
    width: {
      default: "100%",
      [mq.snap]: "min(92vw, 520px)",
      [mq.pin]: "clamp(580px, 44vw, 720px)",
    },
    height: { default: "auto", [mq.pin]: stage.row },
  },
  statsFigure: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    flexGrow: { default: 0, [mq.pin]: 1 },
    minHeight: 0,
    margin: 0,
  },
  statsMedia: {
    position: "relative",
    overflow: "hidden",
    flexGrow: { default: 0, [mq.pin]: 1 },
    minHeight: 0,
    aspectRatio: { default: "4 / 3", [mq.pin]: "auto" },
    backgroundColor: tone.placeholder,
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    flexShrink: 0,
    columnGap: 0,
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingInlineEnd: 12,
  },
  statDivided: {
    paddingInlineStart: { default: 12, [mq.mid]: 20, [mq.pin]: 24 },
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tone.hairline,
  },
  statFigure: {
    display: "flex",
    alignItems: "baseline",
    gap: 3,
    fontFamily: face.latin,
    color: tone.ink,
  },
  statValue: {
    fontSize: { default: 30, [mq.mid]: 40, [mq.pin]: "clamp(32px, min(3.3vw, 5.6vh), 48px)" },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  statUnit: {
    fontSize: { default: 14, [mq.pin]: 20 },
    fontWeight: 500,
    color: colors.brandGreen700,
  },
  culture: {
    display: { default: "grid", [mq.snap]: "flex" },
    gridTemplateColumns: { default: "1fr", [mq.pin]: "repeat(3, minmax(0, 1fr))" },
    gridTemplateRows: { default: "none", [mq.pin]: "1fr auto auto auto 1fr" },
    rowGap: { default: 0, [mq.pin]: 22 },
    margin: 0,
    padding: 0,
    listStyle: "none",
    width: {
      default: "100%",
      [mq.snap]: "max-content",
      [mq.pin]: "clamp(900px, 70vw, 1080px)",
    },
    height: { default: "auto", [mq.pin]: stage.row },
  },
  value: {
    display: { default: "flex", [mq.pin]: "grid" },
    flexDirection: "column",
    flexShrink: 0,
    gap: 18,
    gridRow: { default: "auto", [mq.pin]: "1 / -1" },
    gridTemplateRows: { default: "none", [mq.pin]: "subgrid" },
    boxSizing: "border-box",
    width: { default: "auto", [mq.snap]: "min(78vw, 300px)" },
    padding: { default: "32px 0", [mq.snap]: "0 28px", [mq.pin]: "0 44px" },
    borderTopWidth: { default: 1, [mq.snap]: 0, [mq.pin]: 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    borderInlineStartWidth: { default: 0, [mq.snap]: 1, [mq.pin]: 1 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tone.hairline,
  },
  valueFirst: {
    borderTopWidth: 0,
    borderInlineStartWidth: 0,
    paddingInlineStart: 0,
  },
  glyph: {
    gridRow: { default: "auto", [mq.pin]: "2" },
    fontSize: { default: 80, [mq.pin]: "clamp(80px, 12vh, 112px)" },
    fontWeight: 500,
    lineHeight: 1,
    userSelect: "none",
  },
  glyphBlue: { color: tone.glyphBlue },
  glyphSand: { color: tone.glyphSand },
  glyphGreen: { color: tone.glyphGreen },
  valueTitle: {
    gridRow: { default: "auto", [mq.pin]: "3" },
    margin: 0,
    fontSize: { default: 20, [mq.pin]: 22 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
  valueDesc: {
    gridRow: { default: "auto", [mq.pin]: "4" },
    alignSelf: "start",
    margin: 0,
    maxWidth: "19em",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.95,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
  hud: {
    display: { default: "none", [mq.pin]: "flex" },
    alignItems: "center",
    flexShrink: 0,
    height: 40,
    boxSizing: "border-box",
    paddingInline: LEAD_IN,
  },
  progress: {
    position: "relative",
    flexGrow: 1,
    height: 1,
    backgroundColor: tone.hairline,
  },
  progressFill: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 1,
    backgroundColor: tone.ink,
    transformOrigin: "0 50%",
  },
});

const VALUE_GLYPH = {
  blue: styles.glyphBlue,
  sand: styles.glyphSand,
  green: styles.glyphGreen,
} as const;

const SHAPE_FIGURE = {
  classic: styles.figClassic,
  wide: styles.figWide,
  square: styles.figSquare,
  broad: styles.figBroad,
  tall: styles.figTall,
  portrait: styles.figPortrait,
} as const;

const SHAPE_MEDIA = {
  classic: styles.shapeClassic,
  wide: styles.shapeWide,
  square: styles.shapeSquare,
  broad: styles.shapeBroad,
  tall: styles.shapeTall,
  portrait: styles.shapePortrait,
} as const;

function PhotoNote(props: { en: string; cn: string }) {
  return (
    <figcaption {...stylex.attrs(styles.note)}>
      <span>{props.cn}</span>
      <span lang="en" {...stylex.attrs(styles.noteEnglish)}>
        {props.en}
      </span>
    </figcaption>
  );
}

export function Panorama(props: { pinned: boolean; onOpenPhoto: (index: number) => void }) {
  let runwayRef: HTMLElement | undefined;
  let stageRef: HTMLDivElement | undefined;
  let trackRef: HTMLDivElement | undefined;
  let stripRef: HTMLDivElement | undefined;
  let metricsRef: Metrics | null = null;
  const [measured, setMetrics] = createSignal<Metrics | null>(null);
  const metrics = () => (props.pinned ? measured() : null);

  const { scrollYProgress } = useScroll({
    target: () => runwayRef,
    offset: [`start ${STAGE_TOP}px`, "end end"],
  });
  const progress = useSpring(scrollYProgress, SPRING);
  const distance = useMotionValue(0);
  const stripDistance = useMotionValue(0);
  const trackX = useTransform([progress, distance], ([p, d]) => -p * d);
  const stripX = useTransform([progress, stripDistance], ([p, d]) => -p * d);

  createEffect(
    () => props.pinned,
    (pinned) => {
      if (!pinned) {
        metricsRef = null;
        return;
      }
      const stageNode = stageRef;
      const trackNode = trackRef;
      if (!stageNode || !trackNode) return;

      const measure = () => {
        const width = stageNode.clientWidth;
        const trackLeft = trackNode.getBoundingClientRect().left;
        const frames = Array.from(trackNode.querySelectorAll<HTMLElement>("[data-frame]"));
        const groups = Array.from(trackNode.querySelectorAll<HTMLElement>("[data-group]"));
        const centers = frames.map(
          (node) => node.getBoundingClientRect().left - trackLeft + node.offsetWidth / 2,
        );
        const groupLefts = groups.map((node) => node.getBoundingClientRect().left - trackLeft);
        const lead = groupLefts[0] ?? 0;
        const travel = Math.max(0, trackNode.offsetWidth - width);
        const scrollRange = travel * PACE;
        const runwayHeight = Math.round(stageNode.offsetHeight + scrollRange);
        const at = (x: number) => (travel > 0 ? clamp01(x / travel) : 0);
        const groupTicks = GROUPS.map((_, index) => at((groupLefts[index] ?? lead) - lead));
        const anchors = GROUPS.map((entry, index) => {
          const from = groupTicks[index];
          const top = from * scrollRange;
          const height =
            index + 1 < GROUPS.length
              ? (groupTicks[index + 1] - from) * scrollRange
              : runwayHeight - top;
          return { id: entry.id, top, height };
        });
        metricsRef = {
          runwayHeight,
          scrollRange,
          distance: travel,
          viewport: width,
          centers,
          anchors,
        };
        distance.set(travel);
        const stripNode = stripRef;
        stripDistance.set(stripNode ? Math.max(0, stripNode.scrollWidth - width) : 0);
        setMetrics(metricsRef);
      };

      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(stageNode);
      observer.observe(trackNode);
      return () => observer.disconnect();
    },
  );

  const revealFocused = (event: FocusEvent) => {
    const current = metricsRef;
    const runway = runwayRef;
    if (!props.pinned || !current || !runway || current.distance <= 0) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-frame]");
    if (!target) return;
    const box = target.getBoundingClientRect();
    if (box.left >= 0 && box.right <= current.viewport) return;
    const frames = Array.from(trackRef?.querySelectorAll<HTMLElement>("[data-frame]") ?? []);
    const index = frames.indexOf(target);
    if (index < 0) return;
    const wanted = clamp01((current.centers[index] - current.viewport / 2) / current.distance);
    const top =
      runway.getBoundingClientRect().top +
      window.scrollY -
      STAGE_TOP +
      wanted * current.scrollRange;
    window.scrollTo({ top, behavior: "auto" });
  };

  const campus = ABOUT_CAMPUS.photos;

  return (
    <section
      ref={runwayRef}
      aria-label="Fenchem panorama"
      {...sxProps(
        styles.runway,
        props.pinned && metrics() && dyn.runwayHeight(metrics()!.runwayHeight),
      )}
    >
      {props.pinned
        ? GROUPS.map((entry, index) => {
            const anchor = () => metrics()?.anchors[index];
            return (
              <div
                id={entry.id}
                {...stylex.attrs(styles.slab, dyn.slab(anchor()?.top ?? 0, anchor()?.height ?? 1))}
              />
            );
          })
        : null}
      <div ref={stageRef} {...stylex.attrs(styles.stage)}>
        <div aria-hidden="true" {...stylex.attrs(styles.strip)}>
          <m.div
            ref={(el: HTMLElement) => (stripRef = el as HTMLDivElement)}
            {...stylex.attrs(styles.stripTrain)}
            style={props.pinned ? { x: stripX } : undefined}
          >
            {Array.from({ length: STRIP_LOOPS }, () =>
              STRIP_PHRASES.map((phrase) => (
                <>
                  <span lang="en" {...stylex.attrs(styles.phrase)}>
                    {phrase}
                  </span>
                  <span {...stylex.attrs(styles.join)}>
                    <Cross />
                  </span>
                </>
              )),
            )}
          </m.div>
        </div>

        <div {...stylex.attrs(styles.view)}>
          <m.div
            ref={(el: HTMLElement) => (trackRef = el as HTMLDivElement)}
            onFocusIn={revealFocused}
            {...stylex.attrs(styles.track)}
            style={props.pinned ? { x: trackX } : undefined}
          >
            <ProfileFrames pinned={props.pinned} />

            <Seam />

            <section
              id={props.pinned ? undefined : GROUPS[1].id}
              data-group
              aria-labelledby="about-campus-title"
              {...stylex.attrs(styles.group)}
            >
              <h2 id="about-campus-title" {...stylex.attrs(ui.srOnly)}>
                {ABOUT_CAMPUS.eyebrow}
              </h2>
              {campus.map((photo, index) => {
                const shape = PHOTO_SHAPE[photo.id];
                return (
                  <>
                    {index > 0 ? <Seam /> : null}
                    <figure
                      data-frame
                      {...stylex.attrs(
                        styles.frame,
                        styles.photo,
                        SHAPE_FIGURE[shape],
                        shiftFor(index + 3),
                      )}
                    >
                      <div {...stylex.attrs(styles.media, SHAPE_MEDIA[shape])}>
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                          draggable="false"
                          {...stylex.attrs(styles.fill)}
                        />
                        <button
                          type="button"
                          aria-label={`View larger: ${photo.english}`}
                          onClick={() => props.onOpenPhoto(index)}
                          {...stylex.attrs(styles.tileButton)}
                        />
                      </div>
                      <PhotoNote en={PHOTO_ENGLISH[photo.id]} cn={photo.caption} />
                    </figure>
                  </>
                );
              })}
            </section>

            <Seam />

            <section
              id={props.pinned ? undefined : GROUPS[2].id}
              data-group
              aria-labelledby="about-culture-title"
              {...stylex.attrs(styles.group)}
            >
              <h2 id="about-culture-title" {...stylex.attrs(ui.srOnly)}>
                {ABOUT_CULTURE.eyebrow}
              </h2>
              <ul data-frame {...stylex.attrs(styles.frame, styles.culture, shiftFor(10))}>
                {ABOUT_CULTURE.values.map((value, index) => (
                  <li {...stylex.attrs(styles.value, index === 0 && styles.valueFirst)}>
                    <span
                      aria-hidden="true"
                      {...stylex.attrs(styles.glyph, VALUE_GLYPH[value.tone])}
                    >
                      {value.glyph}
                    </span>
                    <h3 {...stylex.attrs(styles.valueTitle)}>{value.title}</h3>
                    <p {...stylex.attrs(styles.valueDesc)}>{value.desc}</p>
                  </li>
                ))}
              </ul>
            </section>
          </m.div>
        </div>

        <div aria-hidden="true" {...stylex.attrs(styles.hud)}>
          <div {...stylex.attrs(styles.progress)}>
            <m.span {...stylex.attrs(styles.progressFill)} style={{ scaleX: progress }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileFrames(props: { pinned: boolean }) {
  return (
    <section
      id={props.pinned ? undefined : GROUPS[0].id}
      data-group
      aria-label={NAV_ENGLISH[GROUPS[0].id]}
      {...stylex.attrs(styles.group)}
    >
      <div data-frame {...stylex.attrs(styles.frame, styles.profile, shiftFor(0))}>
        <div>
          <h2 {...stylex.attrs(styles.profileTitle)}>{ABOUT_HERO.title}</h2>
          <div lang="en" {...stylex.attrs(styles.profileEnglish)}>
            {ABOUT_HERO.englishTitle}
          </div>
        </div>
        <p {...stylex.attrs(styles.profileLead)}>{ABOUT_HERO.lead}</p>
        <p {...stylex.attrs(styles.network)}>
          <span {...stylex.attrs(styles.networkLead)}>{ABOUT_HERO.networkLabel}</span>
          {ABOUT_HERO.countries.map((country, index) => (
            <span {...stylex.attrs(styles.place)}>
              {country}
              {index < LAST_COUNTRY ? "、" : "等地。"}
            </span>
          ))}
        </p>
      </div>

      <Seam />

      <figure
        data-frame
        {...stylex.attrs(styles.frame, styles.photo, SHAPE_FIGURE.portrait, shiftFor(1))}
      >
        <div {...stylex.attrs(styles.media, SHAPE_MEDIA.portrait)}>
          <img
            src={ABOUT_HERO.lobbyImage}
            alt={LOBBY_ALT}
            loading="lazy"
            decoding="async"
            draggable="false"
            {...stylex.attrs(styles.fill)}
          />
        </div>
        <PhotoNote en="Headquarters Lobby" cn={ABOUT_HERO.lobbyCaption} />
      </figure>

      <Seam />

      <div data-frame {...stylex.attrs(styles.frame, styles.stats, shiftFor(2))}>
        <figure {...stylex.attrs(styles.statsFigure)}>
          <div {...stylex.attrs(styles.statsMedia)}>
            <img
              src={ABOUT_MOMENT.image}
              alt={ABOUT_MOMENT.alt}
              loading="lazy"
              decoding="async"
              draggable="false"
              {...stylex.attrs(styles.fill)}
            />
          </div>
          <figcaption {...stylex.attrs(styles.note)}>{ABOUT_MOMENT.caption}</figcaption>
        </figure>
        <div {...stylex.attrs(styles.statsRow)}>
          {STATS.map((stat, index) => (
            <div {...stylex.attrs(styles.stat, index > 0 && styles.statDivided)}>
              <div {...stylex.attrs(styles.statFigure)}>
                <span {...stylex.attrs(styles.statValue)}>{stat.value}</span>
                {stat.unit ? <span {...stylex.attrs(styles.statUnit)}>{stat.unit}</span> : null}
              </div>
              <p {...stylex.attrs(styles.quiet)}>
                <span {...stylex.attrs(ui.srOnly)}>{STAT_ENGLISH[stat.label]}: </span>
                {stat.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
