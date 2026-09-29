import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { LINKEDIN_PATHS, LOGO_PATHS, WECHAT_PATHS, type VectorPath } from "../variant-o/vectors";
import { COPYRIGHT, CTA, FOOTER_COLUMNS } from "./content";
import { Reveal } from "./motion";
import { color, ease, font, layout as layoutTokens, media } from "./tokens.stylex";
import { layout } from "./ui";

const HEADLINE = "告诉我们您的配方需求。";
const BAND_IMAGE = "/prototype/official-site/campus-lake.webp";
const BAND_SCRIM = "rgba(4, 20, 60, 0.55)";
const BAND_SCRIM_SOLID = "#04143c";
const BUTTON_HOVER_FILL = "#e4ebf9";
const FOOTER_FILL = "#051A45";
const WHITE_FILL = "#ffffff";
const BAND_SCALE_END = 1.06;

const LINK_TARGETS: Record<string, string> = {
  关于我们: "#about",
  产品与应用: "#products",
  研发与生产: "#campus",
};

const SOCIALS = [
  { label: "LinkedIn", paths: LINKEDIN_PATHS, viewBox: "1.67 1.67 16.66 16.66" },
  { label: "微信", paths: WECHAT_PATHS, viewBox: "1.67 1.335 17.46 17.46" },
] as const;

const styles = stylex.create({
  band: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
    minHeight: { default: 480, [media.tablet]: 560, [media.desktop]: 640 },
    backgroundColor: color.deep,
    color: color.paper,
    fontFamily: font.display,
  },
  bandMedia: {
    position: "absolute",
    inset: 0,
    willChange: "transform",
  },
  bandImage: {
    position: "absolute",
    left: 0,
    bottom: 0,
    display: "block",
    width: "100%",
    height: "340%",
    objectFit: "cover",
    objectPosition: "50% 100%",
  },
  bandScrim: {
    position: "absolute",
    inset: 0,
    backgroundColor: BAND_SCRIM,
  },
  bandContent: {
    position: "relative",
    paddingBlock: { default: 64, [media.tabletUp]: 96 },
  },
  bandCopy: {
    gridColumn: { default: "auto", [media.tabletUp]: "1 / span 10", [media.desktop]: "1 / span 8" },
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 40,
  },
  bandHeadline: {
    margin: 0,
    fontSize: { default: 36, [media.tablet]: 48, [media.desktop]: 64 },
    fontWeight: 700,
    lineHeight: 1.15,
    color: color.paper,
  },
  bandButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    height: 56,
    paddingInline: 32,
    borderRadius: 0,
    backgroundColor: { default: color.paper, ":hover": BUTTON_HOVER_FILL },
    color: color.deep,
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.2,
    textDecoration: "none",
    whiteSpace: "nowrap",
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 2px ${BAND_SCRIM_SOLID}, 0 0 0 4px ${WHITE_FILL}`,
    },
    transform: {
      default: null,
      ":active": { default: null, [media.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: ease.hover,
    transitionTimingFunction: ease.out,
  },
  footer: {
    backgroundColor: FOOTER_FILL,
    color: color.paper,
    fontFamily: font.display,
    paddingTop: { default: 64, [media.tablet]: 80, [media.desktop]: 96 },
    paddingBottom: { default: 40, [media.tabletUp]: 48 },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.tabletUp]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: layoutTokens.gutter,
    rowGap: 48,
  },
  brand: {
    gridColumn: { default: "auto", [media.tablet]: "1 / -1", [media.desktop]: "1 / span 4" },
  },
  logoLink: {
    display: "block",
    width: 161,
    height: 52,
  },
  logo: {
    display: "block",
    width: "100%",
    height: "100%",
  },
  columns: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [media.tabletUp]: "repeat(3, minmax(0, 1fr))",
    },
    gridColumn: { default: "auto", [media.tablet]: "1 / -1", [media.desktop]: "7 / -1" },
    columnGap: layoutTokens.gutter,
    rowGap: 40,
  },
  columnHeading: {
    margin: 0,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.4,
    color: color.white60,
  },
  columnLinks: {
    display: "flex",
    flexDirection: "column",
    rowGap: 8,
    margin: 0,
    marginTop: 20,
    padding: 0,
    listStyleType: "none",
  },
  columnLink: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    color: { default: color.white80, ":hover": color.paper },
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textDecorationColor: { default: "transparent", ":hover": "currentColor" },
    textUnderlineOffset: { default: 2, ":hover": 6 },
    transitionProperty: "color, text-decoration-color, text-underline-offset",
    transitionDuration: ease.hover,
    transitionTimingFunction: ease.out,
  },
  bottom: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 24,
    rowGap: 16,
    marginTop: { default: 56, [media.tabletUp]: 64, [media.desktop]: 80 },
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.white15,
  },
  copyright: {
    margin: 0,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.4,
    color: color.white60,
  },
  social: {
    display: "flex",
    alignItems: "center",
    columnGap: 24,
  },
  socialLink: {
    display: "block",
    boxSizing: "border-box",
    width: 44,
    height: 44,
    padding: 12,
    margin: -12,
    color: color.paper,
    opacity: { default: 0.7, ":hover": 1, ":focus-visible": 1 },
    transitionProperty: "opacity",
    transitionDuration: ease.hover,
    transitionTimingFunction: ease.out,
  },
  socialIcon: {
    display: "block",
    width: 20,
    height: 20,
  },
  fillPaper: {
    fill: color.paper,
  },
  fillFooter: {
    fill: FOOTER_FILL,
  },
});

function VectorArt({
  paths,
  viewBox,
  sx,
  knockout = false,
}: {
  paths: readonly VectorPath[];
  viewBox: string;
  sx: StyleXStyles;
  knockout?: boolean;
}) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" focusable="false" {...stylex.props(sx)}>
      {paths.map((path) => (
        <path
          key={path.d}
          d={path.d}
          {...stylex.props(
            knockout && path.fill !== WHITE_FILL ? styles.fillFooter : styles.fillPaper,
          )}
        />
      ))}
    </svg>
  );
}

export function ContactBand() {
  const bandRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, BAND_SCALE_END]);
  return (
    <section
      ref={bandRef}
      id="contact"
      aria-labelledby="oo-contact-title"
      {...stylex.props(styles.band)}
    >
      <m.div style={reduce ? undefined : { scale }} {...stylex.props(styles.bandMedia)}>
        <img
          src={BAND_IMAGE}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.bandImage)}
        />
      </m.div>
      <div {...stylex.props(styles.bandScrim)} />
      <div {...stylex.props(layout.shell, layout.inset, layout.grid12, styles.bandContent)}>
        <Reveal sx={styles.bandCopy}>
          <h2 id="oo-contact-title" {...stylex.props(styles.bandHeadline)}>
            {HEADLINE}
          </h2>
          <a href={CTA.action.href} {...stylex.props(styles.bandButton)}>
            {CTA.action.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(layout.shell, layout.inset)}>
        <div {...stylex.props(styles.grid)}>
          <div {...stylex.props(styles.brand)}>
            <a href="#top" aria-label="FENCHEM 泛成 首页" {...stylex.props(styles.logoLink)}>
              <VectorArt paths={LOGO_PATHS} viewBox="0 0 161 52" sx={styles.logo} />
            </a>
          </div>
          <nav aria-label="页脚导航" {...stylex.props(styles.columns)}>
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <h3 {...stylex.props(styles.columnHeading)}>{column.heading}</h3>
                <ul {...stylex.props(styles.columnLinks)}>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href={LINK_TARGETS[link] ?? "#top"} {...stylex.props(styles.columnLink)}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div {...stylex.props(styles.bottom)}>
          <p {...stylex.props(styles.copyright)}>{COPYRIGHT}</p>
          <div {...stylex.props(styles.social)}>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href="#top"
                aria-label={social.label}
                {...stylex.props(styles.socialLink)}
              >
                <VectorArt
                  paths={social.paths}
                  viewBox={social.viewBox}
                  sx={styles.socialIcon}
                  knockout
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
