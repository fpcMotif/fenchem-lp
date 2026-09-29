import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import { LINKEDIN_PATHS, WECHAT_PATHS, type VectorPath } from "../variant-o/vectors";
import { COPYRIGHT, CTA, FOOTER_COLUMNS, IMAGES } from "./content";
import { Reveal } from "./motion";
import { media } from "./tokens.stylex";
import { Button, layout } from "./ui";

const HEADER_HEIGHT = 80;

const INK = "#1a1a1a";
const TINT = "#e6ecf7";
const FOOTER_BLUE = "#294f92";

const styles = stylex.create({
  anchor: {
    scrollMarginTop: HEADER_HEIGHT,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [media.desktop]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
    textWrap: "balance",
  },
  cta: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: { default: 80, [media.desktop]: 112 },
    backgroundColor: TINT,
  },
  ctaInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },
  footer: {
    paddingTop: 64,
    paddingBottom: 48,
    backgroundColor: FOOTER_BLUE,
    color: "#ffffff",
  },
  footerInner: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  footerTop: {
    display: "flex",
    flexDirection: { default: "column", [media.desktop]: "row" },
    justifyContent: "space-between",
    gap: 40,
  },
  footerLogo: {
    display: "block",
    width: 225,
    height: 73,
    objectFit: "cover",
    filter: "brightness(0) invert(1)",
  },
  footerColumns: {
    display: "flex",
    flexWrap: "wrap",
    gap: 32,
  },
  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 35,
    width: { default: "auto", [media.desktop]: 210 },
    minWidth: 140,
  },
  footerHeading: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  footerLinks: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    margin: 0,
    padding: 0,
    fontSize: 16,
    lineHeight: 1.2,
    listStyleType: "none",
  },
  footerLink: {
    fontSize: 16,
    lineHeight: 1.2,
    color: "#ffffff",
    textDecoration: { default: "none", ":hover": "underline" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: "#ffffff",
    outlineOffset: 2,
  },
  footerRule: {
    width: "100%",
    height: 1,
    margin: 0,
    borderWidth: 0,
    backgroundColor: "#ffffff",
  },
  footerBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  copyright: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.2,
  },
  social: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  socialLink: {
    display: "block",
    width: 20,
    height: 20,
    padding: 6,
    margin: -6,
    opacity: { default: 0.65, ":hover": 1 },
    transitionProperty: "opacity",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: "#ffffff",
    outlineOffset: -2,
  },
  socialIcon: {
    display: "block",
    width: 20,
    height: 20,
  },
});

function VectorArt({
  paths,
  viewBox,
  sx,
}: {
  paths: readonly VectorPath[];
  viewBox: string;
  sx: StyleXStyles;
}) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" focusable="false" {...stylex.props(sx)}>
      {paths.map((path) => (
        <path key={path.d} d={path.d} fill={path.fill} />
      ))}
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" aria-labelledby="oo-contact-title" {...stylex.props(styles.anchor)}>
      <div {...stylex.props(styles.cta, layout.inset)}>
        <Reveal sx={styles.ctaInner}>
          <h2 id="oo-contact-title" {...stylex.props(styles.sectionTitle)}>
            {CTA.title}
          </h2>
          <Button href={CTA.action.href}>{CTA.action.label}</Button>
        </Reveal>
      </div>
      <div {...stylex.props(styles.footer)}>
        <div {...stylex.props(layout.shell, layout.inset, styles.footerInner)}>
          <div {...stylex.props(styles.footerTop)}>
            <img
              src={IMAGES.footerLogo.src}
              alt={IMAGES.footerLogo.alt}
              width={225}
              height={73}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.footerLogo)}
            />
            <nav aria-label="页脚导航" {...stylex.props(styles.footerColumns)}>
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.heading} {...stylex.props(styles.footerColumn)}>
                  <h3 {...stylex.props(styles.footerHeading)}>{column.heading}</h3>
                  <ul {...stylex.props(styles.footerLinks)}>
                    {column.links.map((link) => (
                      <li key={link}>
                        <a href="#top" {...stylex.props(styles.footerLink)}>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <hr {...stylex.props(styles.footerRule)} />
          <div {...stylex.props(styles.footerBottom)}>
            <p {...stylex.props(styles.copyright)}>{COPYRIGHT}</p>
            <div {...stylex.props(styles.social)}>
              <a href="#top" aria-label="LinkedIn" {...stylex.props(styles.socialLink)}>
                <VectorArt paths={LINKEDIN_PATHS} viewBox="0 0 20 20" sx={styles.socialIcon} />
              </a>
              <a href="#top" aria-label="微信" {...stylex.props(styles.socialLink)}>
                <VectorArt paths={WECHAT_PATHS} viewBox="0 0 20 20" sx={styles.socialIcon} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
