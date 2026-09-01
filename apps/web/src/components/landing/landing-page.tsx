import { breakpoints, colors, radii, shadows, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Globe2,
  Leaf,
  ShieldCheck,
  Sprout,
  Truck,
} from "lucide-react";

import {
  certifications,
  createInquiryHref,
  getIngredientsByApplication,
  heroImage,
  navLinks,
  processSteps,
  proofCards,
  regions,
  toAnchor,
} from "./landing-content";

const styles = stylex.create({
  // Root and skip link
  main: {
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden",
    backgroundColor: colors.cream,
    fontFamily: typography.body,
    color: colors.bark,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "::selection": {
      backgroundColor: colors.mint,
      color: colors.forest,
    },
  },
  skipLink: {
    position: {
      default: "absolute",
      ":focus": "fixed",
    },
    width: {
      default: "1px",
      ":focus": "auto",
    },
    height: {
      default: "1px",
      ":focus": "auto",
    },
    paddingTop: {
      default: 0,
      ":focus": "0.75rem",
    },
    paddingBottom: {
      default: 0,
      ":focus": "0.75rem",
    },
    paddingInline: {
      default: 0,
      ":focus": "1rem",
    },
    margin: {
      default: -1,
      ":focus": 0,
    },
    overflow: {
      default: "hidden",
      ":focus": "visible",
    },
    clip: {
      default: "rect(0, 0, 0, 0)",
      ":focus": "auto",
    },
    whiteSpace: {
      default: "nowrap",
      ":focus": "normal",
    },
    borderWidth: 0,
    top: {
      default: "auto",
      ":focus": "1rem",
    },
    left: {
      default: "auto",
      ":focus": "1rem",
    },
    zIndex: {
      default: "auto",
      ":focus": 100,
    },
    borderRadius: {
      default: radii.none,
      ":focus": radii.lg,
    },
    backgroundColor: {
      default: "transparent",
      ":focus": colors.cream,
    },
    color: {
      default: "transparent",
      ":focus": colors.forest,
    },
    boxShadow: {
      default: "none",
      ":focus": shadows.ambient,
    },
    textDecoration: "none",
    fontWeight: 600,
    ":focus-visible": {
      outline: `2px solid ${colors.forest}`,
      outlineOffset: "4px",
    },
  },

  // Base action button style
  actionBase: {
    boxSizing: "border-box",
    display: "inline-flex",
    minHeight: "2.75rem",
    width: {
      default: "100%",
      [breakpoints.sm]: "fit-content",
    },
    maxWidth: "100%",
    minWidth: 0,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    whiteSpace: "normal",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    borderRadius: radii.full,
    textAlign: "center",
    fontWeight: 600,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    textDecoration: "none",
    transitionProperty: "background-color, border-color, color, transform",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease-out",
    cursor: "pointer",
    ":active": {
      transform: "scale(0.96)",
    },
  },

  // Common typography & icons
  eyebrow: {
    fontFamily: typography.tech,
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    textTransform: "uppercase",
  },
  textMint: {
    color: colors.mint,
  },
  textMoss: {
    color: colors.moss,
  },
  textBlush: {
    color: colors.blush,
  },
  iconSm: {
    width: "1rem",
    height: "1rem",
    flexShrink: 0,
  },
  iconMd: {
    width: "1.25rem",
    height: "1.25rem",
    flexShrink: 0,
  },
  iconLg: {
    width: "2.25rem",
    height: "2.25rem",
    flexShrink: 0,
  },

  // Common layout
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "80rem",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
      [breakpoints.lg]: "2.5rem",
    },
  },

  // Hero Section
  heroSection: {
    position: "relative",
    minHeight: "82svh",
    overflow: "hidden",
    backgroundColor: colors.forest,
    color: colors.cream,
  },
  heroImage: {
    position: "absolute",
    inset: 0,
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, oklch(from var(--color-bark) l c h / 0.88), oklch(from var(--color-forest) l c h / 0.62), oklch(from var(--color-bark) l c h / 0.25))",
  },
  heroHeader: {
    position: "relative",
    zIndex: 10,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    maxWidth: "80rem",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: "1rem",
    rowGap: "0.75rem",
    paddingBlock: "1.25rem",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
      [breakpoints.lg]: "2.5rem",
    },
  },
  brandLink: {
    order: 1,
    display: "inline-flex",
    minHeight: "2.5rem",
    alignItems: "center",
    borderRadius: radii.sm,
    fontFamily: typography.display,
    fontSize: "1.5rem",
    lineHeight: "2rem",
    color: colors.cream,
    textDecoration: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.mint}`,
      outlineOffset: "4px",
    },
  },
  headerNav: {
    order: 2,
    display: "flex",
    width: {
      default: "100%",
      [breakpoints.md]: "auto",
    },
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: {
      default: "1rem",
      [breakpoints.md]: "1.75rem",
    },
    rowGap: "0.5rem",
  },
  navLink: {
    display: "inline-flex",
    minHeight: "2.5rem",
    alignItems: "center",
    borderRadius: radii.sm,
    paddingBlock: "0.25rem",
    color: "oklch(from var(--color-cream) l c h / 0.85)",
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    ":hover": {
      color: colors.mint,
    },
    ":focus-visible": {
      outline: `2px solid ${colors.mint}`,
      outlineOffset: "4px",
    },
  },
  headerAction: {
    order: 3,
    paddingInline: "1.25rem",
    paddingBlock: "0.625rem",
    color: colors.forest,
    backgroundColor: {
      default: colors.mint,
      ":hover": colors.blush,
    },
    marginLeft: {
      default: null,
      [breakpoints.md]: "auto",
    },
    ":focus-visible": {
      outline: `2px solid ${colors.forest}`,
      outlineOffset: "4px",
    },
  },
  heroContent: {
    position: "relative",
    zIndex: 10,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "80rem",
    paddingBottom: "4rem",
    paddingTop: {
      default: "4rem",
      [breakpoints.md]: "6rem",
    },
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
      [breakpoints.lg]: "2.5rem",
    },
  },
  heroTextWrapper: {
    maxWidth: "72rem",
  },
  heroTitle: {
    marginTop: "1.5rem",
    maxWidth: "72rem",
    textWrap: "balance",
    fontFamily: typography.display,
    fontSize: {
      default: "3rem",
      [breakpoints.sm]: "4.5rem",
      [breakpoints.lg]: "6rem",
    },
    lineHeight: 1,
    color: colors.cream,
  },
  heroParagraph: {
    marginTop: "1.75rem",
    maxWidth: "42rem",
    textWrap: "pretty",
    color: "oklch(from var(--color-cream) l c h / 0.86)",
    fontSize: {
      default: "1.125rem",
      [breakpoints.md]: "1.25rem",
    },
    lineHeight: "2rem",
  },
  heroActions: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  heroPrimaryCta: {
    backgroundColor: {
      default: colors.mint,
      ":hover": colors.blush,
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    color: colors.forest,
    ":focus-visible": {
      outline: `2px solid ${colors.forest}`,
      outlineOffset: "4px",
    },
  },
  heroSecondaryCta: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "oklch(from var(--color-cream) l c h / 0.40)",
      ":hover": colors.mint,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "oklch(from var(--color-cream) l c h / 0.10)",
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    color: colors.cream,
    ":focus-visible": {
      outline: `2px solid ${colors.mint}`,
      outlineOffset: "4px",
    },
  },
  heroStatsBar: {
    position: "relative",
    zIndex: 10,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "oklch(from var(--color-cream) l c h / 0.15)",
    backgroundColor: "oklch(from var(--color-bark) l c h / 0.35)",
  },
  statsGrid: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "grid",
    maxWidth: "80rem",
    gridTemplateColumns: {
      default: "repeat(1, minmax(0, 1fr))",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
      [breakpoints.lg]: "2.5rem",
    },
  },
  statItem: {
    paddingBlock: "1.25rem",
    paddingInline: {
      default: 0,
      [breakpoints.md]: "1.5rem",
    },
    borderTopWidth: {
      default: 1,
      [breakpoints.md]: 0,
    },
    borderTopStyle: "solid",
    borderTopColor: "oklch(from var(--color-cream) l c h / 0.15)",
    borderLeftWidth: {
      default: 0,
      [breakpoints.md]: 1,
    },
    borderLeftStyle: "solid",
    borderLeftColor: "oklch(from var(--color-cream) l c h / 0.15)",
  },
  statItemFirst: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    paddingLeft: {
      [breakpoints.md]: 0,
    },
  },
  statLabel: {
    color: "oklch(from var(--color-cream) l c h / 0.72)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  statValue: {
    marginTop: "0.25rem",
    fontFamily: typography.display,
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
    color: colors.mint,
  },

  // IndustryProof Section
  industrySection: {
    scrollMarginTop: "6rem",
    backgroundColor: colors.cream,
    paddingBlock: {
      default: "6rem",
      [breakpoints.md]: "8rem",
    },
  },
  industryHeader: {
    display: "grid",
    gap: "2.5rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "0.8fr 1.2fr",
    },
    alignItems: {
      default: "stretch",
      [breakpoints.lg]: "end",
    },
  },
  industryTitle: {
    marginTop: "1.25rem",
    maxWidth: "36rem",
    textWrap: "balance",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.sm]: "3rem",
      [breakpoints.md]: "3.75rem",
    },
    lineHeight: 1.25,
    color: colors.forest,
  },
  industryDescription: {
    maxWidth: "42rem",
    textWrap: "pretty",
    color: "oklch(from var(--color-bark) l c h / 0.72)",
    fontSize: "1.125rem",
    lineHeight: "2rem",
  },
  proofGrid: {
    marginTop: "3.5rem",
    display: "grid",
    gridAutoFlow: "dense",
    gap: "1rem",
    gridTemplateColumns: {
      default: "repeat(1, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
  },
  proofCard: {
    overflow: "hidden",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.pebble,
    backgroundColor: "#ffffff",
    boxShadow: {
      default: shadows.lift,
      ":hover": shadows.ambient,
    },
    transitionProperty: "box-shadow",
    transitionDuration: "200ms",
  },
  proofCardSpanLead: {
    gridColumn: {
      [breakpoints.lg]: "span 7 / span 7",
    },
    gridRow: {
      [breakpoints.lg]: "span 2 / span 2",
    },
  },
  proofCardSpanSecondary: {
    gridColumn: {
      [breakpoints.lg]: "span 5 / span 5",
    },
  },
  proofCardSpanWide: {
    gridColumn: {
      [breakpoints.lg]: "span 12 / span 12",
    },
  },
  proofCardInner: {
    display: "grid",
    height: "100%",
    minHeight: "18rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
    },
  },
  proofImageWrapper: {
    overflow: "hidden",
  },
  proofCardImage: {
    height: "100%",
    minHeight: "16rem",
    width: "100%",
    objectFit: "cover",
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: "rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
    ":hover": {
      transform: "scale(1.05)",
    },
  },
  proofCardBody: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1.75rem",
  },
  proofIconWrapper: {
    display: "flex",
    width: "2.75rem",
    height: "2.75rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.lg,
    backgroundColor: colors.mint,
    color: colors.forest,
  },
  proofCardTitle: {
    marginTop: "1.75rem",
    textWrap: "balance",
    fontFamily: typography.display,
    fontSize: "1.875rem",
    lineHeight: 1.25,
    color: colors.forest,
  },
  proofCardCopy: {
    marginTop: "1rem",
    textWrap: "pretty",
    color: "oklch(from var(--color-bark) l c h / 0.72)",
    lineHeight: "1.75rem",
  },
  proofCardMetric: {
    marginTop: "2rem",
    fontFamily: typography.tech,
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    textTransform: "uppercase",
    color: colors.clay,
  },

  // QualityProcess Section
  qualitySection: {
    scrollMarginTop: "6rem",
    backgroundColor: colors.stone,
    paddingBlock: {
      default: "6rem",
      [breakpoints.md]: "8rem",
    },
  },
  qualityGrid: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "grid",
    maxWidth: "80rem",
    gap: "3rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "0.9fr 1.1fr",
    },
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
      [breakpoints.lg]: "2.5rem",
    },
  },
  qualityCol: {
    minWidth: 0,
  },
  qualityTitle: {
    marginTop: "1.25rem",
    textWrap: "balance",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.sm]: "3rem",
      [breakpoints.md]: "3.75rem",
    },
    lineHeight: 1.25,
    color: colors.forest,
  },
  certList: {
    marginTop: "2.5rem",
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  certBadge: {
    fontFamily: typography.tech,
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    textTransform: "uppercase",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "oklch(from var(--color-moss) l c h / 0.30)",
    backgroundColor: colors.cream,
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    color: colors.forest,
  },
  processList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  processItem: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.pebble,
    backgroundColor: colors.cream,
    padding: "1.5rem",
  },
  processItemInner: {
    display: "flex",
    gap: "1.25rem",
  },
  processStepNumber: {
    display: "flex",
    width: "2.5rem",
    height: "2.5rem",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.lg,
    backgroundColor: colors.forest,
    fontFamily: typography.tech,
    color: colors.cream,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  processStepTitle: {
    textWrap: "balance",
    fontFamily: typography.display,
    fontSize: "1.5rem",
    lineHeight: "2rem",
    color: colors.forest,
  },
  processStepCopy: {
    marginTop: "0.5rem",
    textWrap: "pretty",
    color: "oklch(from var(--color-bark) l c h / 0.72)",
    lineHeight: "1.75rem",
  },

  // IngredientPortfolio Section
  portfolioSection: {
    backgroundColor: colors.cream,
    paddingBlock: {
      default: "6rem",
      [breakpoints.md]: "8rem",
    },
  },
  portfolioHeader: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: "1.5rem",
    alignItems: {
      default: "stretch",
      [breakpoints.md]: "end",
    },
    justifyContent: {
      default: "flex-start",
      [breakpoints.md]: "space-between",
    },
  },
  portfolioTitle: {
    marginTop: "1.25rem",
    maxWidth: "42rem",
    textWrap: "balance",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.sm]: "3rem",
      [breakpoints.md]: "3.75rem",
    },
    lineHeight: 1.25,
    color: colors.forest,
  },
  portfolioCta: {
    width: "fit-content",
    backgroundColor: {
      default: colors.forest,
      ":hover": colors.clay,
    },
    paddingInline: "1.5rem",
    paddingBlock: "0.75rem",
    color: colors.cream,
    ":focus-visible": {
      outline: `2px solid ${colors.mint}`,
      outlineOffset: "4px",
    },
  },
  portfolioGrid: {
    marginTop: "3.5rem",
    display: "grid",
    gap: "1.25rem",
    gridTemplateColumns: {
      default: "repeat(1, minmax(0, 1fr))",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
  },
  portfolioCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.pebble,
    backgroundColor: "#ffffff",
    padding: "1.5rem",
  },
  portfolioCardHeading: {
    fontFamily: typography.display,
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
    color: colors.forest,
  },
  ingredientList: {
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  ingredientItem: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.pebble,
    paddingTop: "1rem",
  },
  ingredientItemFirst: {
    borderTopWidth: 0,
    paddingTop: 0,
  },
  ingredientName: {
    fontWeight: 600,
    color: colors.forest,
  },
  ingredientSpec: {
    marginTop: "0.25rem",
    textWrap: "pretty",
    color: "oklch(from var(--color-bark) l c h / 0.72)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },

  // GlobalSupply Section
  globalSection: {
    scrollMarginTop: "6rem",
    backgroundColor: colors.forest,
    paddingBlock: {
      default: "6rem",
      [breakpoints.md]: "8rem",
    },
    color: colors.cream,
  },
  globalGrid: {
    display: "grid",
    gap: "2.5rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "0.85fr 1.15fr",
    },
    alignItems: "start",
  },
  globalTitle: {
    marginTop: "1.25rem",
    textWrap: "balance",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.sm]: "3rem",
      [breakpoints.md]: "3.75rem",
    },
    lineHeight: 1.25,
    color: colors.cream,
  },
  globalParagraph: {
    marginTop: "1.5rem",
    maxWidth: "32rem",
    textWrap: "pretty",
    color: "oklch(from var(--color-cream) l c h / 0.76)",
    lineHeight: "2rem",
  },
  regionGrid: {
    display: "grid",
    gap: "1px",
    overflow: "hidden",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "oklch(from var(--color-cream) l c h / 0.15)",
    backgroundColor: "oklch(from var(--color-cream) l c h / 0.15)",
    gridTemplateColumns: {
      default: "repeat(1, minmax(0, 1fr))",
      [breakpoints.sm]: "repeat(2, minmax(0, 1fr))",
    },
  },
  regionCard: {
    backgroundColor: {
      default: colors.forest,
      ":hover": colors.fern,
    },
    padding: "1.5rem",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
  },
  regionCardInner: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
  },
  regionIcon: {
    marginTop: "0.25rem",
    width: "1.25rem",
    height: "1.25rem",
    flexShrink: 0,
    color: colors.mint,
  },
  regionCity: {
    fontFamily: typography.display,
    fontSize: "1.5rem",
    lineHeight: "2rem",
    color: colors.cream,
  },
  regionRole: {
    marginTop: "0.25rem",
    color: "oklch(from var(--color-cream) l c h / 0.72)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },

  // ContactFooter Section
  footerSection: {
    scrollMarginTop: "6rem",
    backgroundColor: colors.bark,
    color: colors.cream,
  },
  footerGrid: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "grid",
    maxWidth: "80rem",
    gap: "2.5rem",
    paddingBlock: "5rem",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
      [breakpoints.lg]: "2.5rem",
    },
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "1.1fr 0.9fr",
    },
  },
  footerCol: {
    minWidth: 0,
  },
  footerTitle: {
    marginTop: "1.25rem",
    maxWidth: "48rem",
    textWrap: "balance",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.sm]: "3rem",
      [breakpoints.md]: "3.75rem",
    },
    lineHeight: 1.25,
    color: colors.cream,
  },
  footerParagraph: {
    marginTop: "1.5rem",
    maxWidth: "36rem",
    textWrap: "pretty",
    color: "oklch(from var(--color-cream) l c h / 0.74)",
    lineHeight: "2rem",
  },
  footerCtaGroup: {
    marginTop: "2.5rem",
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  footerPrimaryCta: {
    paddingBlock: "1rem",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.sm]: "1.75rem",
    },
    color: colors.forest,
    backgroundColor: {
      default: colors.mint,
      ":hover": colors.blush,
    },
    ":focus-visible": {
      outline: `2px solid ${colors.forest}`,
      outlineOffset: "4px",
    },
  },
  footerSecondaryCta: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "oklch(from var(--color-cream) l c h / 0.30)",
      ":hover": colors.mint,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "oklch(from var(--color-cream) l c h / 0.10)",
    },
    paddingBlock: "1rem",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.sm]: "1.75rem",
    },
    color: colors.cream,
    ":focus-visible": {
      outline: `2px solid ${colors.mint}`,
      outlineOffset: "4px",
    },
  },
  checklistCard: {
    minWidth: 0,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "oklch(from var(--color-cream) l c h / 0.12)",
    backgroundColor: "oklch(from var(--color-cream) l c h / 0.04)",
    padding: "1.75rem",
  },
  checklistTitle: {
    marginTop: "1.5rem",
    textWrap: "balance",
    fontFamily: typography.display,
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
    color: colors.cream,
  },
  checklistList: {
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    listStyleType: "none",
    padding: 0,
    margin: 0,
    color: "oklch(from var(--color-cream) l c h / 0.72)",
    lineHeight: "1.75rem",
  },
  checklistItem: {
    display: "flex",
    gap: "0.75rem",
  },
  checklistIcon: {
    marginTop: "0.25rem",
    width: "1.25rem",
    height: "1.25rem",
    flexShrink: 0,
    color: colors.blush,
  },
  subFooter: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "oklch(from var(--color-cream) l c h / 0.10)",
    paddingBlock: "1.5rem",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
      [breakpoints.lg]: "2.5rem",
    },
  },
  subFooterInner: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    maxWidth: "80rem",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: "0.75rem",
    color: "oklch(from var(--color-cream) l c h / 0.65)",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    alignItems: {
      default: "flex-start",
      [breakpoints.md]: "center",
    },
    justifyContent: {
      default: "flex-start",
      [breakpoints.md]: "space-between",
    },
  },
});

const proofIcons = [Leaf, FlaskConical, Sprout, ShieldCheck] as const;
const ingredientGroups = [
  { label: "Nutrition", items: getIngredientsByApplication("Nutrition") },
  { label: "Food & Beverage", items: getIngredientsByApplication("Food & Beverage") },
  { label: "Personal Care", items: getIngredientsByApplication("Personal Care") },
] as const;

export function LandingPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <a href="#industries" {...stylex.props(styles.skipLink)}>
        Skip to ingredients
      </a>
      <Hero />
      <IndustryProof />
      <QualityProcess />
      <IngredientPortfolio />
      <GlobalSupply />
      <ContactFooter />
    </main>
  );
}

function Hero() {
  return (
    <section {...stylex.props(styles.heroSection)}>
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        {...stylex.props(styles.heroImage)}
        loading="eager"
      />
      <div {...stylex.props(styles.heroOverlay)} />
      <header {...stylex.props(styles.heroHeader)}>
        <a href="#top" {...stylex.props(styles.brandLink)}>
          Fenchem
        </a>
        <nav aria-label="Primary navigation" {...stylex.props(styles.headerNav)}>
          {navLinks.map((link) => (
            <a key={link.section} href={toAnchor(link.section)} {...stylex.props(styles.navLink)}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={createInquiryHref("contact")}
          {...stylex.props(styles.actionBase, styles.headerAction)}
        >
          Request specs
          <ArrowRight {...stylex.props(styles.iconSm)} aria-hidden />
        </a>
      </header>

      <div id="top" {...stylex.props(styles.heroContent)}>
        <div {...stylex.props(styles.heroTextWrapper)}>
          <p {...stylex.props(styles.eyebrow, styles.textMint)}>
            Botanical intelligence since 1995
          </p>
          <h1 {...stylex.props(styles.heroTitle)}>Fenchem</h1>
          <p {...stylex.props(styles.heroParagraph)}>
            Production-ready botanical and functional ingredients for nutrition, food, beverage, and
            personal care teams that need clean specifications without procurement friction.
          </p>
          <div {...stylex.props(styles.heroActions)}>
            <a
              href={toAnchor("industries")}
              {...stylex.props(styles.actionBase, styles.heroPrimaryCta)}
            >
              Explore portfolio
              <ArrowRight {...stylex.props(styles.iconSm)} aria-hidden />
            </a>
            <a
              href={createInquiryHref("quality")}
              {...stylex.props(styles.actionBase, styles.heroSecondaryCta)}
            >
              Request documentation
            </a>
          </div>
        </div>
      </div>

      <div {...stylex.props(styles.heroStatsBar)}>
        <dl {...stylex.props(styles.statsGrid)}>
          {[
            ["25+", "years of ingredient expertise"],
            ["40+", "countries supported"],
            ["ISO/GMP", "audited quality systems"],
          ].map(([value, label], index) => (
            <div
              key={label}
              {...stylex.props(styles.statItem, index === 0 && styles.statItemFirst)}
            >
              <dt {...stylex.props(styles.statLabel)}>{label}</dt>
              <dd {...stylex.props(styles.statValue)}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function IndustryProof() {
  return (
    <section id="industries" {...stylex.props(styles.industrySection)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.industryHeader)}>
          <div>
            <p {...stylex.props(styles.eyebrow, styles.textMoss)}>Supply-ready applications</p>
            <h2 {...stylex.props(styles.industryTitle)}>Built for real formulation work.</h2>
          </div>
          <p {...stylex.props(styles.industryDescription)}>
            The page is quiet on purpose: direct ingredient categories, visible proof, and clear
            contact routes for buyers who already know what they need.
          </p>
        </div>

        <div {...stylex.props(styles.proofGrid)}>
          {proofCards.map((card, index) => {
            const Icon = proofIcons[index];
            const spanStyle =
              index === 0
                ? styles.proofCardSpanLead
                : index < 3
                  ? styles.proofCardSpanSecondary
                  : styles.proofCardSpanWide;
            return (
              <article key={card.title} {...stylex.props(styles.proofCard, spanStyle)}>
                <div {...stylex.props(styles.proofCardInner)}>
                  <div {...stylex.props(styles.proofImageWrapper)}>
                    <img
                      src={card.image.src}
                      alt={card.image.alt}
                      {...stylex.props(styles.proofCardImage)}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <div {...stylex.props(styles.proofCardBody)}>
                    <div>
                      <span {...stylex.props(styles.proofIconWrapper)}>
                        <Icon {...stylex.props(styles.iconMd)} aria-hidden />
                      </span>
                      <h3 {...stylex.props(styles.proofCardTitle)}>{card.title}</h3>
                      <p {...stylex.props(styles.proofCardCopy)}>{card.copy}</p>
                    </div>
                    <p {...stylex.props(styles.proofCardMetric)}>{card.metric}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QualityProcess() {
  return (
    <section id="quality" {...stylex.props(styles.qualitySection)}>
      <div {...stylex.props(styles.qualityGrid)}>
        <div {...stylex.props(styles.qualityCol)}>
          <p {...stylex.props(styles.eyebrow, styles.textMoss)}>Quality without the chase</p>
          <h2 {...stylex.props(styles.qualityTitle)}>
            Every lot has a paper trail before it has a sales story.
          </h2>
          <div {...stylex.props(styles.certList)}>
            {certifications.map((certification) => (
              <span key={certification} {...stylex.props(styles.certBadge)}>
                {certification}
              </span>
            ))}
          </div>
        </div>

        <ol {...stylex.props(styles.processList)}>
          {processSteps.map((step, index) => (
            <li key={step.title} {...stylex.props(styles.processItem)}>
              <div {...stylex.props(styles.processItemInner)}>
                <span aria-hidden="true" {...stylex.props(styles.processStepNumber)}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 {...stylex.props(styles.processStepTitle)}>{step.title}</h3>
                  <p {...stylex.props(styles.processStepCopy)}>{step.copy}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function IngredientPortfolio() {
  return (
    <section {...stylex.props(styles.portfolioSection)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.portfolioHeader)}>
          <div>
            <p {...stylex.props(styles.eyebrow, styles.textMoss)}>Ingredient portfolio</p>
            <h2 {...stylex.props(styles.portfolioTitle)}>A tighter route from sample to scale.</h2>
          </div>
          <a
            href={createInquiryHref("industries")}
            {...stylex.props(styles.actionBase, styles.portfolioCta)}
          >
            Ask for a spec sheet
            <ArrowRight {...stylex.props(styles.iconSm)} aria-hidden />
          </a>
        </div>

        <div {...stylex.props(styles.portfolioGrid)}>
          {ingredientGroups.map((group) => (
            <section
              key={group.label}
              aria-labelledby={`${group.label.toLowerCase().replace(/[^a-z]+/g, "-")}-heading`}
              {...stylex.props(styles.portfolioCard)}
            >
              <h3
                id={`${group.label.toLowerCase().replace(/[^a-z]+/g, "-")}-heading`}
                {...stylex.props(styles.portfolioCardHeading)}
              >
                {group.label}
              </h3>
              <ul {...stylex.props(styles.ingredientList)}>
                {group.items.map((ingredient, idx) => (
                  <li
                    key={ingredient.name}
                    {...stylex.props(
                      styles.ingredientItem,
                      idx === 0 && styles.ingredientItemFirst,
                    )}
                  >
                    <p {...stylex.props(styles.ingredientName)}>{ingredient.name}</p>
                    <p {...stylex.props(styles.ingredientSpec)}>{ingredient.specification}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlobalSupply() {
  return (
    <section id="global-supply" {...stylex.props(styles.globalSection)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.globalGrid)}>
          <div>
            <p {...stylex.props(styles.eyebrow, styles.textMint)}>Global supply</p>
            <h2 {...stylex.props(styles.globalTitle)}>Regional support without handoff fog.</h2>
            <p {...stylex.props(styles.globalParagraph)}>
              Fenchem pairs global production with local commercial and documentation support so
              teams can move from inquiry to compliant supply with fewer loops.
            </p>
          </div>
          <div {...stylex.props(styles.regionGrid)}>
            {regions.map((region) => (
              <div key={region.city} {...stylex.props(styles.regionCard)}>
                <div {...stylex.props(styles.regionCardInner)}>
                  <Globe2 {...stylex.props(styles.regionIcon)} aria-hidden />
                  <div>
                    <h3 {...stylex.props(styles.regionCity)}>{region.city}</h3>
                    <p {...stylex.props(styles.regionRole)}>{region.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <footer id="contact" {...stylex.props(styles.footerSection)}>
      <div {...stylex.props(styles.footerGrid)}>
        <div {...stylex.props(styles.footerCol)}>
          <p {...stylex.props(styles.eyebrow, styles.textBlush)}>Start with the spec</p>
          <h2 {...stylex.props(styles.footerTitle)}>Tell Fenchem what you are formulating.</h2>
          <p {...stylex.props(styles.footerParagraph)}>
            Send a target ingredient, application, format, and market. The technical team can return
            documentation, lead times, and sampling options within one business day.
          </p>
          <div {...stylex.props(styles.footerCtaGroup)}>
            <a
              href={createInquiryHref("contact")}
              {...stylex.props(styles.actionBase, styles.footerPrimaryCta)}
            >
              <span>Contact technical sales</span>
              <ArrowRight {...stylex.props(styles.iconSm)} aria-hidden />
            </a>
            <a
              href={toAnchor("industries")}
              {...stylex.props(styles.actionBase, styles.footerSecondaryCta)}
            >
              Review portfolio
            </a>
          </div>
        </div>
        <div {...stylex.props(styles.checklistCard)}>
          <Truck {...stylex.props(styles.iconLg, styles.textMint)} aria-hidden />
          <h3 {...stylex.props(styles.checklistTitle)}>What to include</h3>
          <ul {...stylex.props(styles.checklistList)}>
            {[
              "Target ingredient or blend",
              "Delivery format and annual volume",
              "Destination market and compliance needs",
            ].map((item) => (
              <li key={item} {...stylex.props(styles.checklistItem)}>
                <CheckCircle2 {...stylex.props(styles.checklistIcon)} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div {...stylex.props(styles.subFooter)}>
        <div {...stylex.props(styles.subFooterInner)}>
          <p>Fenchem Biotek Ltd. Rooted in nature, refined by science.</p>
          <p>2026 Fenchem. Specifications available on request.</p>
        </div>
      </div>
    </footer>
  );
}
