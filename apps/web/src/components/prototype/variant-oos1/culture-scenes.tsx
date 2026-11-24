import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, type TargetAndTransition, type Variants } from "@/compat/motion";
import { createSignal } from "solid-js";
import type { JSX } from "@solidjs/web";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CULTURE } from "./about-data";
import { Reveal, kitStyles } from "./subpage-kit";
import { color, media } from "./tokens.stylex";

const DESKTOP = "@media (min-width: 1280px)";
const LG = "@media (min-width: 1024px)";
const TILE_SIZE = 384;
const COMPACT_TILE = 112;
const STROKE_WIDTH = 5;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DRAW_SECONDS = 1.1;
const SETTLE_SECONDS = 0.7;

const CULTURE_TITLES: Record<string, string> = { 专业和专注: "专业与专注" };

const cultureCopy = (title: string) => {
  const value = ABOUT_CULTURE.values.find((entry) => entry.title === title);
  if (!value) return null;
  return { title: CULTURE_TITLES[value.title] ?? value.title, desc: value.desc };
};

const styles = stylex.create({
  section: {
    backgroundColor: colors.paper,
  },

  header: {
    marginBottom: { default: 40, [DESKTOP]: 64 },
  },
  title: {
    margin: 0,
    paddingTop: 12,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,

    textWrap: "balance",
    color: color.ink,
  },
  cards: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(3, minmax(0, 1fr))" },
    gap: { default: 20, [LG]: 24 },
  },
  card: {
    display: "flex",
    flexDirection: { default: "row", [LG]: "column" },
    alignItems: { default: "center", [LG]: "stretch" },
    gap: { default: 16, [LG]: 0 },
  },
  tile: {
    flexShrink: 0,
    width: { default: COMPACT_TILE, [LG]: "auto" },
    aspectRatio: "1 / 1",
    overflow: "hidden",
  },
  copy: {
    minWidth: 0,
    textAlign: { default: "start", [LG]: "center" },
  },
  art: {
    display: "block",
    width: "100%",
    height: "100%",
  },
  cardTitle: {
    margin: 0,
    marginTop: { default: 0, [LG]: 20 },
    fontSize: { default: 18, [LG]: 22, [DESKTOP]: 24 },
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: color.ink,
  },
  cardDesc: {
    margin: 0,
    marginTop: { default: 6, [LG]: 10 },
    fontSize: 14,
    lineHeight: 1.8,
    letterSpacing: "0.02em",
    color: color.bodyText,
    textWrap: "balance",
  },
});

const draw = (delay: number, rest: TargetAndTransition = {}, hover: TargetAndTransition = {}) =>
  ({
    hidden: { pathLength: 0, opacity: 0 },
    shown: {
      pathLength: 1,
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      ...rest,
      transition: {
        pathLength: { duration: DRAW_SECONDS, delay, ease: EASE },
        opacity: { duration: 0.01, delay },
        default: { duration: SETTLE_SECONDS, delay: delay + DRAW_SECONDS * 0.6, ease: EASE },
      },
    },
    hover: { pathLength: 1, opacity: 1, ...hover, transition: { duration: 0.6, ease: EASE } },
  }) satisfies Variants;

const CAIRN_STONES = [
  {
    d: "M64 300C64 266 120 248 190 248C262 248 318 266 318 296C318 322 268 332 190 332C110 332 64 324 64 300Z",
    lift: 0,
  },
  {
    d: "M102 222C100 198 140 186 186 186C236 186 268 200 268 220C268 240 232 248 184 248C136 248 104 242 102 222Z",
    lift: -6,
  },
  {
    d: "M146 166C146 148 172 138 202 138C232 138 254 150 252 166C250 180 228 186 200 186C170 186 146 180 146 166Z",
    lift: -12,
  },
  {
    d: "M170 126C170 116 182 110 196 110C212 110 222 117 222 126C222 134 210 138 196 138C182 138 170 134 170 126Z",
    lift: -18,
  },
] as const;

const RINGS = [
  { r: 150, width: 3, focus: 0.88 },
  { r: 102, width: 5, focus: 0.9 },
  { r: 62, width: 7, focus: 0.94 },
] as const;

const BOLT_HALVES = [
  { d: "M309.7 40.6H159.6L61 246.1H167.2L208.1 200.4Z", apart: -16 },
  { d: "M167.2 246.1L83.8 349.6L337 200.4H208.1Z", apart: 16 },
] as const;

const CARDS = [
  {
    title: "安静与坚持",
    fill: "#6a8ece",
    art: () => (
      <g stroke="#2f4670">
        <m.path d="M44 332H340" variants={draw(0)} />
        {CAIRN_STONES.map(({ d, lift }, index) => (
          <m.path d={d} variants={draw(0.12 * (index + 1), {}, { y: lift })} />
        ))}
      </g>
    ),
  },
  {
    title: "专业和专注",
    fill: "#e3e3e3",
    art: () => (
      <g stroke="#7c7c82">
        {RINGS.map(({ r, width, focus }, index) => (
          <m.circle
            cx={192}
            cy={192}
            r={r}
            stroke-width={width}
            variants={draw(0.14 * index, {}, { scale: focus })}
          />
        ))}
        <m.circle
          cx={192}
          cy={192}
          r={14}
          fill="#7c7c82"
          stroke="none"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            shown: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.14 * RINGS.length + DRAW_SECONDS * 0.5,
                duration: 0.5,
                ease: EASE,
              },
            },
            hover: { scale: 1.35, opacity: 1, transition: { duration: 0.6, ease: EASE } },
          }}
        />
      </g>
    ),
  },
  {
    title: "合作与创新",
    fill: "#93c170",
    art: () => (
      <g stroke="#4a7d24" stroke-linejoin="round">
        {BOLT_HALVES.map(({ d, apart }, index) => (
          <m.path
            d={d}
            variants={{
              ...draw(0.18 * index, {}, { x: 6, y: -6 }),
              hidden: { pathLength: 0, opacity: 0, x: apart, y: apart },
            }}
          />
        ))}
      </g>
    ),
  },
] satisfies { title: string; fill: string; art: () => JSX.Element }[];

export function CultureScenes(props: { sx?: stylex.StyleXStyles }) {
  const reduce = useReducedMotion();
  const cards = CARDS.flatMap((card) => {
    const value = cultureCopy(card.title);
    return value ? [{ ...card, value }] : [];
  });
  if (cards.length === 0) return null;

  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.attrs(styles.section, props.sx)}
    >
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
        <Reveal sx={styles.header}>
          <h2 id="about-culture-title" {...stylex.attrs(styles.title)}>
            {ABOUT_CULTURE.title}
          </h2>
        </Reveal>
        <div {...stylex.attrs(styles.cards)}>
          {cards.map((card, index) => {
            const [hovered, setHovered] = createSignal(false);
            const hover = (event: PointerEvent, on: boolean) => {
              if (event.pointerType !== "touch") setHovered(on);
            };
            return (
              <Reveal as="article" step={index} sx={styles.card}>
                <div {...stylex.attrs(styles.tile)}>
                  <m.svg
                    viewBox={`0 0 ${TILE_SIZE} ${TILE_SIZE}`}
                    fill="none"
                    stroke-width={STROKE_WIDTH}
                    stroke-linecap="round"
                    aria-hidden="true"
                    focusable="false"
                    variants={{}}
                    initial={reduce() ? "shown" : "hidden"}
                    whileInView={hovered() && !reduce() ? "hover" : "shown"}
                    viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                    onPointerEnter={(event: PointerEvent) => hover(event, true)}
                    onPointerLeave={(event: PointerEvent) => hover(event, false)}
                    {...stylex.attrs(styles.art)}
                  >
                    <rect width={TILE_SIZE} height={TILE_SIZE} fill={card.fill} />
                    {card.art()}
                  </m.svg>
                </div>
                <div {...stylex.attrs(styles.copy)}>
                  <h3 {...stylex.attrs(styles.cardTitle)}>{card.value.title}</h3>
                  <p {...stylex.attrs(styles.cardDesc)}>{card.value.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
