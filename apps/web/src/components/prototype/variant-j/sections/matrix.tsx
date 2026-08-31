import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  type DivisionKey,
  divisionForApplication,
  getFeaturedIngredients,
  type Ingredient,
  ingredients,
} from "@/components/landing/landing-content";
import { imgFor } from "../content";
import { drawRule, revealWords, riseIn, SplitWords, useSectionAnimation } from "../motion";
import { sharedStyles } from "../styles";

/*
 * Variant J — the ingredient ledger. Six featured actives on a hairline grid
 * (gap-px over bg-line, paper cards), floated on a quiet mute-50 band so the
 * spec discipline reads as a page in a laboratory register. Division accents
 * appear only here, and only as the chip dot. Cards rise once; the ledger
 * hairlines draw themselves in per card. SSR markup is the final state.
 */

const styles = stylex.create({
  section: {
    scrollMarginTop: "7rem",
    backgroundColor: colors.paper,
    paddingBlock: "7rem",
  },
  container: {
    marginInline: "auto",
    maxWidth: "1480px",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
  },
  header: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: "2rem",
    alignItems: {
      [breakpoints.md]: "flex-end",
    },
    justifyContent: {
      [breakpoints.md]: "space-between",
    },
  },
  heading: {
    marginTop: "1.25rem",
    maxWidth: "42rem",
    textWrap: "balance",
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: "clamp(2.4rem, 4.6vw, 4rem)",
    color: colors.ink,
    lineHeight: 1.06,
    letterSpacing: "-0.03em",
  },
  headingItalic: {
    fontStyle: "italic",
    color: colors.brandGreen700,
  },
  asideLink: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: 600,
    color: {
      default: colors.brandBlue700,
      ":hover": colors.brandBlue800,
    },
    fontSize: "0.875rem",
    textUnderlineOffset: "4px",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    outline: {
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  arrowRightIcon: {
    width: "0.875rem",
    height: "0.875rem",
    transition: "transform 300ms ease",
  },
  band: {
    marginTop: "3.5rem",
    backgroundColor: colors.mute50,
    paddingBlock: "3.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.sm]: "repeat(2, 1fr)",
      [breakpoints.md]: "repeat(3, 1fr)",
    },
    gap: "1px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.line,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.paper,
  },
  mediaWrap: {
    position: "relative",
    aspectRatio: "4/3",
    overflow: "hidden",
  },
  cardImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
    transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
  badge: {
    position: "absolute",
    top: "0.75rem",
    right: "0.75rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
    paddingInline: "0.5rem",
    paddingBlock: "0.25rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    color: colors.ink,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
  },
  dotBase: {
    width: "0.375rem",
    height: "0.375rem",
    borderRadius: radii.full,
  },
  dotNutrition: {
    backgroundColor: colors.nutrition,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-700) 30%, transparent)",
  },
  dotFood: {
    backgroundColor: colors.food,
  },
  dotCosmetics: {
    backgroundColor: colors.cosmetics,
  },
  dotFeed: {
    backgroundColor: colors.feed,
  },
  dotAgro: {
    backgroundColor: colors.agro,
  },
  dotChem: {
    backgroundColor: colors.chem,
  },
  cardBody: {
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "1.75rem",
    },
    paddingBlock: "1.75rem",
  },
  cardHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "1rem",
  },
  cardTitle: {
    marginTop: "1rem",
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: "1.5rem",
    color: colors.ink,
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
  },
  cardLatin: {
    marginTop: "0.25rem",
    fontFamily: typography.display,
    color: colors.mute600,
    fontSize: "0.875rem",
    fontStyle: "italic",
  },
  ledgerWrap: {
    marginTop: "1.5rem",
  },
  dl: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "1rem",
    paddingBlock: "0.75rem",
    margin: 0,
  },
  dd: {
    textAlign: "right",
    color: colors.ink,
    fontSize: "0.875rem",
    lineHeight: 1.375,
    margin: 0,
  },
  specLink: {
    marginTop: "auto",
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.5rem",
    paddingTop: "1.25rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    color: {
      default: colors.brandBlue700,
      ":hover": colors.brandBlue800,
    },
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    textUnderlineOffset: "4px",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    outline: {
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  specArrowIcon: {
    width: "0.875rem",
    height: "0.875rem",
    transition: "transform 300ms ease",
  },
});

const DIVISION_DOT_STYLES: Record<DivisionKey, StyleXStyles> = {
  nutrition: styles.dotNutrition,
  food: styles.dotFood,
  cosmetics: styles.dotCosmetics,
  feed: styles.dotFeed,
  agro: styles.dotAgro,
  chem: styles.dotChem,
};

const FEATURED = getFeaturedIngredients();
/** The registry curates six; fall back to the head of the portfolio. */
const MATRIX_ITEMS: Ingredient[] = FEATURED.length === 6 ? FEATURED : ingredients.slice(0, 6);

function LedgerRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span data-rule aria-hidden="true" {...stylex.props(sharedStyles.ruleLine)} />
      <dl {...stylex.props(styles.dl)}>
        <dt {...stylex.props(sharedStyles.techLabel)}>{label}</dt>
        <dd {...stylex.props(styles.dd)}>{value}</dd>
      </dl>
    </>
  );
}

export function MatrixSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    revealWords(root, "[data-matrix-heading]");
    riseIn(root, "[data-matrix-eyebrow]", { delay: 0.1 });
    riseIn(root, "[data-matrix-aside]", { delay: 0.25 });
    riseIn(root, "[data-matrix-card]", { stagger: 0.08 });
    for (const card of root.querySelectorAll<HTMLElement>("[data-matrix-card]")) {
      drawRule(card, "[data-rule]", { stagger: 0.08, delay: 0.3 });
    }
  });

  return (
    <section
      ref={ref}
      id="ingredients"
      aria-labelledby="ingredients-heading"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.header)}>
          <div>
            <p data-matrix-eyebrow {...stylex.props(sharedStyles.techLabel)}>
              02 — Active Compounds
            </p>
            <h2 id="ingredients-heading" data-matrix-heading {...stylex.props(styles.heading)}>
              <SplitWords
                segments={[
                  { text: "The ingredient" },
                  { text: "matrix.", sx: styles.headingItalic },
                ]}
              />
            </h2>
          </div>
          <a data-matrix-aside href="#contact" {...stylex.props(styles.asideLink)}>
            Request full specifications
            <ArrowRight aria-hidden="true" {...stylex.props(styles.arrowRightIcon)} />
          </a>
        </div>
      </div>

      <div {...stylex.props(styles.band)}>
        <div {...stylex.props(styles.container)}>
          <div {...stylex.props(styles.grid)}>
            {MATRIX_ITEMS.map((item) => {
              const art = imgFor(item);
              const division = divisionForApplication(item.application);
              return (
                <article key={item.code} data-matrix-card {...stylex.props(styles.card)}>
                  <div {...stylex.props(styles.mediaWrap)}>
                    <img
                      src={art.src}
                      alt={art.alt}
                      loading="lazy"
                      {...stylex.props(styles.cardImg)}
                    />
                    <span {...stylex.props(styles.badge)}>
                      <span
                        aria-hidden="true"
                        {...stylex.props(styles.dotBase, DIVISION_DOT_STYLES[division])}
                      />
                      {item.application}
                    </span>
                  </div>

                  <div {...stylex.props(styles.cardBody)}>
                    <div {...stylex.props(styles.cardHeader)}>
                      <span {...stylex.props(sharedStyles.techLabel)}>{item.code}</span>
                      <span {...stylex.props(sharedStyles.techLabel)}>{item.category}</span>
                    </div>
                    <h3 {...stylex.props(styles.cardTitle)}>{item.name}</h3>
                    <p {...stylex.props(styles.cardLatin)}>{item.latin}</p>

                    <div {...stylex.props(styles.ledgerWrap)}>
                      <LedgerRow label="Purity" value={item.purity} />
                      <LedgerRow label="Form" value={item.form} />
                    </div>

                    <a
                      href="#contact"
                      aria-label={`Request spec for ${item.name}`}
                      {...stylex.props(styles.specLink)}
                    >
                      Request spec
                      <ArrowUpRight aria-hidden="true" {...stylex.props(styles.specArrowIcon)} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
