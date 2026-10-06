import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { ChartHeading, srOnly, ui, useDusk } from "./shared";
import { bp, face, sky } from "./tokens.stylex";

type Country = (typeof ABOUT_HERO.countries)[number];
type Side = "end" | "start";
type Point = { x: number; y: number; side: Side };

const ENGLISH: Record<Country, string> = {
  美国: "United States",
  德国: "Germany",
  英国: "United Kingdom",
  捷克: "Czechia",
  巴西: "Brazil",
  南非: "South Africa",
  日本: "Japan",
  泰国: "Thailand",
  马来西亚: "Malaysia",
  印度尼西亚: "Indonesia",
  菲律宾: "Philippines",
  印度: "India",
};

const HUB: Point = { x: 46, y: 44, side: "end" };

const PLACES: Record<Country, Point> = {
  美国: { x: 10, y: 50, side: "end" },
  德国: { x: 22, y: 7, side: "start" },
  英国: { x: 6, y: 27, side: "end" },
  捷克: { x: 36, y: 20, side: "end" },
  巴西: { x: 8, y: 92, side: "end" },
  南非: { x: 24, y: 68, side: "end" },
  日本: { x: 70, y: 6, side: "end" },
  泰国: { x: 66, y: 60, side: "end" },
  马来西亚: { x: 74, y: 74, side: "start" },
  印度尼西亚: { x: 94, y: 95, side: "start" },
  菲律宾: { x: 93, y: 40, side: "start" },
  印度: { x: 40, y: 86, side: "end" },
};

const FIGURE: readonly (readonly [Country | "南京", Country | "南京"])[] = [
  ["南京", "捷克"],
  ["捷克", "德国"],
  ["捷克", "英国"],
  ["英国", "美国"],
  ["南京", "南非"],
  ["南非", "巴西"],
  ["南京", "日本"],
  ["日本", "菲律宾"],
  ["南京", "泰国"],
  ["泰国", "马来西亚"],
  ["马来西亚", "印度尼西亚"],
  ["泰国", "印度"],
];

const at = (name: Country | "南京") => (name === "南京" ? HUB : PLACES[name]);
const [LEAD_IN, BRANCH_COUNT, LEAD_OUT] = ABOUT_HERO.networkLabel.split(/(\d+)/);

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.desktop]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    rowGap: { default: 56, [bp.tablet]: 72 },
    alignItems: "start",
  },
  text: {
    gridColumn: { default: "auto", [bp.desktop]: "1 / span 5" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 40, [bp.desktop]: 48 },
    maxWidth: { default: "none", [bp.tablet]: 560 },
  },
  company: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
  },
  companyName: {
    fontFamily: face.sans,
    fontSize: { default: 22, [bp.desktop]: 26 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.03em",
    color: sky.star,
  },
  companyEnglish: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 20, [bp.desktop]: 23 },
    color: sky.muted,
  },
  chart: {
    gridColumn: { default: "auto", [bp.desktop]: "6 / span 7" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 20, [bp.desktop]: 28 },
    margin: 0,
    marginTop: { default: 0, [bp.desktop]: 4 },
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    columnGap: 8,
    fontFamily: face.sans,
    fontSize: { default: 18, [bp.desktop]: 20 },
    letterSpacing: "0.04em",
    color: sky.text,
  },
  count: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 64, [bp.desktop]: 88 },
    lineHeight: 0.8,
    color: sky.star,
    fontVariantNumeric: "lining-nums",
  },
  constellationName: {
    marginInlineStart: "auto",
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 20,
    letterSpacing: "0.02em",
    color: sky.muted,
  },
  plot: {
    position: "relative",
    aspectRatio: { default: "0.78", [bp.wideUp]: "1.18" },
    marginInline: { default: 4, [bp.wideUp]: 0 },
  },
  lines: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  segment: {
    fill: "none",
    stroke: sky.tint,
    strokeOpacity: 0.36,
    strokeWidth: 1,
  },
  point: {
    fill: "none",
    stroke: sky.star,
    strokeLinecap: "round",
  },
  hubPoint: {
    strokeWidth: { default: 7, [bp.desktop]: 8 },
  },
  countryPoint: {
    strokeWidth: { default: 4, [bp.desktop]: 4.5 },
    stroke: sky.tint,
  },
  labels: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  label: {
    position: "absolute",
    display: "grid",
    gridTemplateColumns: "auto auto",
    columnGap: 6,
    rowGap: 1,
    marginTop: -11,
    whiteSpace: "nowrap",
    textShadow: `0 0 4px ${sky.night}, 0 0 10px ${sky.night}`,
  },
  labelEnd: {
    transform: { default: "translateX(10px)", [bp.desktop]: "translateX(14px)" },
  },
  labelStart: {
    transform: { default: "translateX(-10px)", [bp.desktop]: "translateX(-14px)" },
    textAlign: "end",
  },
  number: {
    gridRow: "1",
    fontSize: 15,
    lineHeight: "22px",
    color: sky.faint,
  },
  zh: {
    gridRow: "1",
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: "22px",
    letterSpacing: "0.04em",
    color: sky.star,
  },
  hubZh: {
    fontSize: { default: 17, [bp.desktop]: 19 },
    fontWeight: 500,
  },
  en: {
    gridRow: "2",
    fontSize: 12,
    letterSpacing: "0.05em",
  },
  enEnd: { gridColumn: "2" },
  enStart: { gridColumn: "1" },
});

const anchor = stylex.create({
  end: (left: string, top: string) => ({ left, top }),
  start: (right: string, top: string) => ({ right, top }),
});

function Label({
  point,
  number,
  zh,
  en,
  hub = false,
  hidden,
  delay,
}: {
  point: Point;
  number: number;
  zh: string;
  en: string;
  hub?: boolean;
  hidden: boolean;
  delay: number;
}) {
  const Tag = hub ? "p" : "li";
  const end = point.side === "end";
  const numeral = (
    <span aria-hidden="true" {...stylex.props(ui.designation, styles.number)}>
      {number}
    </span>
  );
  return (
    <Tag
      {...stylex.props(
        styles.label,
        end ? styles.labelEnd : styles.labelStart,
        end
          ? anchor.end(`${point.x}%`, `${point.y}%`)
          : anchor.start(`${100 - point.x}%`, `${point.y}%`),
        ui.dim,
        hidden && ui.dimHidden,
        ui.dimDelay(delay),
      )}
    >
      {end ? numeral : null}
      <span {...stylex.props(styles.zh, hub && styles.hubZh)}>{zh}</span>
      {end ? null : numeral}
      <span lang="en" {...stylex.props(ui.label, styles.en, end ? styles.enEnd : styles.enStart)}>
        {en}
      </span>
    </Tag>
  );
}

export function Profile() {
  const [plotRef, hidden] = useDusk<HTMLDivElement>();

  return (
    <section
      id="about-profile"
      aria-labelledby="oos1k-profile"
      {...stylex.props(ui.section, ui.shell)}
    >
      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.text)}>
          <ChartHeading
            id="oos1k-profile"
            numeral="I"
            label="Profile"
            title="企业概况"
            note="The constellation Fenchem"
          />
          <p {...stylex.props(styles.company)}>
            <span {...stylex.props(styles.companyName)}>{ABOUT_HERO.title}</span>
            <span lang="en" {...stylex.props(styles.companyEnglish)}>
              {ABOUT_HERO.englishTitle}
            </span>
          </p>
          <p {...stylex.props(ui.body)}>{ABOUT_HERO.lead}</p>
        </div>

        <figure {...stylex.props(styles.chart)}>
          <figcaption {...stylex.props(styles.caption)}>
            <span>{LEAD_IN.trim()}</span>
            <span {...stylex.props(styles.count)}>{BRANCH_COUNT}</span>
            <span>{LEAD_OUT.trim()}</span>
            <span lang="en" aria-hidden="true" {...stylex.props(styles.constellationName)}>
              泛成座 · Fenchem
            </span>
          </figcaption>
          <div ref={plotRef} {...stylex.props(styles.plot)}>
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              {...stylex.props(styles.lines, ui.dim, hidden && ui.dimHidden, ui.dimDelay(500))}
            >
              {FIGURE.map(([from, to]) => (
                <line
                  key={`${from}-${to}`}
                  x1={at(from).x}
                  y1={at(from).y}
                  x2={at(to).x}
                  y2={at(to).y}
                  vectorEffect="non-scaling-stroke"
                  {...stylex.props(styles.segment)}
                />
              ))}
              {ABOUT_HERO.countries.map((country) => (
                <path
                  key={country}
                  d={`M${PLACES[country].x} ${PLACES[country].y}h0`}
                  vectorEffect="non-scaling-stroke"
                  {...stylex.props(styles.point, styles.countryPoint)}
                />
              ))}
              <path
                d={`M${HUB.x} ${HUB.y}h0`}
                vectorEffect="non-scaling-stroke"
                {...stylex.props(styles.point, styles.hubPoint)}
              />
            </svg>
            <Label point={HUB} number={1} zh="南京" en="Nanjing" hub hidden={hidden} delay={0} />
            <ol {...stylex.props(styles.labels)}>
              {ABOUT_HERO.countries.map((country, index) => (
                <Label
                  key={country}
                  point={PLACES[country]}
                  number={index + 2}
                  zh={country}
                  en={ENGLISH[country]}
                  hidden={hidden}
                  delay={260 + index * 70}
                />
              ))}
            </ol>
            <span {...srOnly}>
              星图以南京为中心，连接以上 {ABOUT_HERO.countries.length} 个国家。
            </span>
          </div>
        </figure>
      </div>
    </section>
  );
}
