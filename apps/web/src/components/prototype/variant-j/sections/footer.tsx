import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  certifications,
  company,
  createInquiryHref,
  navLinks,
  regions,
  toAnchor,
} from "@/components/landing/landing-content";
import { drawRule, riseIn, useSectionAnimation } from "../motion";
import { sharedStyles } from "../styles";

/*
 * Variant J — the ledger's colophon. Deep green darkening to near-black at
 * the base, so the page arc closes below the finale rather than beside it:
 * certification record on top, brand + wayfinding columns in the middle, the
 * ghost FENCHEM wordmark half-submerged in the fold, legal strip last.
 * Certifications are text only (no borrowed logos). SSR markup is the final
 * state; hairlines and columns only animate when motion is welcome.
 */

const styles = stylex.create({
  footer: {
    position: "relative",
    scrollMarginTop: "6rem",
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
  },
  overlay: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(to bottom, transparent, color-mix(in oklch, var(--color-brand-green-950) 40%, transparent), color-mix(in oklch, var(--color-ink) 85%, transparent))",
  },
  container: {
    position: "relative",
    marginInline: "auto",
    maxWidth: "1480px",
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingTop: {
      default: "5rem",
      [breakpoints.md]: "6rem",
    },
  },
  certHeader: {
    marginBottom: "1.25rem",
  },
  certChips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  certChip: {
    display: "inline-block",
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-paper) 20%, transparent)",
    paddingInline: "0.75rem",
    paddingBlock: "0.25rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    color: "color-mix(in oklch, var(--color-paper) 70%, transparent)",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
  },
  ruleTop: {
    marginTop: "2.5rem",
    height: 1,
    transformOrigin: "left",
    backgroundColor: "color-mix(in oklch, var(--color-paper) 10%, transparent)",
  },
  grid: {
    display: "grid",
    gap: {
      default: "3rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingTop: "3.5rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(12, 1fr)",
    },
  },
  brandCol: {
    gridColumn: {
      [breakpoints.md]: "span 5",
    },
  },
  brandName: {
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: "1.5rem",
    color: colors.paper,
    letterSpacing: "-0.025em",
  },
  brandTagline: {
    marginTop: "0.75rem",
  },
  brandDescription: {
    marginTop: "1.5rem",
    maxWidth: "24rem",
    textWrap: "pretty",
    color: "color-mix(in oklch, var(--color-paper) 70%, transparent)",
    fontSize: "0.875rem",
    lineHeight: 1.625,
  },
  exploreCol: {
    gridColumn: {
      [breakpoints.md]: "span 2",
    },
  },
  linksList: {
    marginTop: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    listStyle: "none",
    marginInline: 0,
    padding: 0,
  },
  link: {
    color: {
      default: "color-mix(in oklch, var(--color-paper) 75%, transparent)",
      ":hover": colors.brandGreen300,
      ":focus-visible": colors.brandGreen300,
    },
    fontSize: "0.875rem",
    textDecoration: "none",
    transition: "color 200ms ease",
    outline: {
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: {
      ":focus-visible": 4,
    },
  },
  basesCol: {
    gridColumn: {
      [breakpoints.md]: "span 3",
    },
  },
  baseItem: {
    color: "color-mix(in oklch, var(--color-paper) 75%, transparent)",
    fontSize: "0.875rem",
  },
  countryText: {
    color: "color-mix(in oklch, var(--color-paper) 60%, transparent)",
  },
  directCol: {
    gridColumn: {
      [breakpoints.md]: "span 2",
    },
  },
  emailLink: {
    wordBreak: "break-word",
    color: {
      default: "color-mix(in oklch, var(--color-paper) 75%, transparent)",
      ":hover": colors.brandGreen300,
      ":focus-visible": colors.brandGreen300,
    },
    fontSize: "0.875rem",
    textDecoration: "none",
    transition: "color 200ms ease",
    outline: {
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: {
      ":focus-visible": 4,
    },
  },
  directText: {
    color: "color-mix(in oklch, var(--color-paper) 75%, transparent)",
    fontSize: "0.875rem",
  },
  coordsText: {
    fontFamily: typography.tech,
    fontSize: "11px",
    color: "color-mix(in oklch, var(--color-paper) 60%, transparent)",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.14em",
  },
  wordmarkWrap: {
    position: "relative",
    overflow: "hidden",
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingTop: "2.5rem",
  },
  wordmarkText: {
    marginBottom: "-0.18em",
    userSelect: "none",
    whiteSpace: "nowrap",
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: "clamp(120px, 18vw, 240px)",
    color: colors.paper,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    opacity: 0.06,
  },
  legalWrap: {
    position: "relative",
    marginInline: "auto",
    maxWidth: "1480px",
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBottom: "2rem",
  },
  ruleLegal: {
    height: 1,
    transformOrigin: "left",
    backgroundColor: "color-mix(in oklch, var(--color-paper) 10%, transparent)",
  },
  legalContent: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.sm]: "row",
    },
    gap: "0.75rem",
    paddingTop: "1.25rem",
    color: "color-mix(in oklch, var(--color-paper) 60%, transparent)",
    fontSize: "0.75rem",
    alignItems: {
      [breakpoints.sm]: "center",
    },
    justifyContent: {
      [breakpoints.sm]: "space-between",
    },
  },
  legalList: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
});

export function FooterSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    riseIn(root, "[data-footer-chip]", { stagger: 0.05, start: "top 94%" });
    drawRule(root, "[data-rule-top]", { start: "top 96%" });
    riseIn(root, "[data-footer-col]", { stagger: 0.1, start: "top 90%" });
    riseIn(root, "[data-footer-mark]", { start: "top 98%" });
    drawRule(root, "[data-rule-legal]", { start: "top 98%" });
    riseIn(root, "[data-footer-legal]", { start: "top 98%" });
  });

  return (
    <footer ref={ref} id="contact" {...stylex.props(styles.footer)}>
      <div aria-hidden="true" {...stylex.props(styles.overlay)} />

      <div {...stylex.props(styles.container)}>
        {/* Certification record — real certifications, set as text */}
        <h2 {...stylex.props(sharedStyles.srOnly)}>Contact Fenchem</h2>
        <p {...stylex.props(sharedStyles.techLabelDark, styles.certHeader)}>Certified to</p>
        <ul {...stylex.props(styles.certChips)}>
          {certifications.map((certification) => (
            <li key={certification}>
              <span data-footer-chip {...stylex.props(styles.certChip)}>
                {certification}
              </span>
            </li>
          ))}
        </ul>

        <div data-rule-top {...stylex.props(styles.ruleTop)} />

        {/* Brand + wayfinding */}
        <div {...stylex.props(styles.grid)}>
          <div data-footer-col {...stylex.props(styles.brandCol)}>
            <p {...stylex.props(styles.brandName)}>{company.name}</p>
            <p {...stylex.props(sharedStyles.techLabelDark, styles.brandTagline)}>
              {company.tagline}
            </p>
            <p {...stylex.props(styles.brandDescription)}>
              {company.legalName} has supplied premium botanical and functional ingredients since{" "}
              {company.founded} — six global bases across three continents, forty-plus countries
              served, and a documented chain of custody behind every lot.
            </p>
          </div>

          <nav data-footer-col aria-label="Footer" {...stylex.props(styles.exploreCol)}>
            <p {...stylex.props(sharedStyles.techLabelDark)}>Explore</p>
            <ul {...stylex.props(styles.linksList)}>
              {navLinks.map((link) => (
                <li key={link.section}>
                  <a href={toAnchor(link.section)} {...stylex.props(styles.link)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-footer-col {...stylex.props(styles.basesCol)}>
            <p {...stylex.props(sharedStyles.techLabelDark)}>Global bases</p>
            <ul {...stylex.props(styles.linksList)}>
              {regions.map((region) => (
                <li key={region.city} {...stylex.props(styles.baseItem)}>
                  {region.city}
                  <span {...stylex.props(styles.countryText)}> — {region.country}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col {...stylex.props(styles.directCol)}>
            <p {...stylex.props(sharedStyles.techLabelDark)}>Direct</p>
            <ul {...stylex.props(styles.linksList)}>
              <li>
                <a href={createInquiryHref("contact")} {...stylex.props(styles.emailLink)}>
                  {company.email}
                </a>
              </li>
              <li {...stylex.props(styles.directText)}>{company.since}</li>
              <li {...stylex.props(styles.coordsText)}>HQ {company.hq.coords}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ghost wordmark — decorative, half-submerged in the fold */}
      <div data-footer-mark aria-hidden="true" {...stylex.props(styles.wordmarkWrap)}>
        <p {...stylex.props(styles.wordmarkText)}>FENCHEM</p>
      </div>

      {/* Legal strip */}
      <div {...stylex.props(styles.legalWrap)}>
        <div data-rule-legal {...stylex.props(styles.ruleLegal)} />
        <div data-footer-legal {...stylex.props(styles.legalContent)}>
          <p>© 2026 {company.legalName} — All rights reserved.</p>
          <ul {...stylex.props(styles.legalList)}>
            <li>
              <a href="/privacy" {...stylex.props(styles.link)}>
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" {...stylex.props(styles.link)}>
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
