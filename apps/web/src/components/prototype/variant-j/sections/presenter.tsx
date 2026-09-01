import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import {
  createInquiryHref,
  getIngredientsByApplication,
  ingredients,
  type IngredientApplication,
} from "@/components/landing/landing-content";
import { drawRule, revealWords, riseIn, SplitWords, useSectionAnimation } from "../motion";
import { sharedStyles } from "../styles";

/*
 * Variant J — formulation presenter: the one interactive moment on the page.
 * Three single-choice chip groups write a live draft specification into a dark
 * ledger sheet. State is plain React — GSAP only choreographs the entrance, so
 * the swap stays instant and keyboard-driven. Chips are real buttons with
 * aria-pressed; the sheet is a polite live region so the rewrite is announced.
 */

const APPLICATIONS: IngredientApplication[] = ["Nutrition", "Food & Beverage", "Personal Care"];
const FORMATS = ["Powder", "Beadlet", "Oil suspension", "Granular"] as const;
const STANDARDS = ["ISO 9001 + GMP", "FSSC 22000", "Kosher + Halal"] as const;
const styles = stylex.create({
  chip: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    borderRadius: radii.full,
    paddingInline: "1.25rem",
    paddingBlock: "0.625rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    transition: "background-color 200ms ease, border-color 200ms ease, color 200ms ease",
    cursor: "pointer",
    outline: {
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  chipSelected: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.ink,
    backgroundColor: colors.ink,
    color: colors.paper,
  },
  chipUnselected: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: colors.line,
      ":hover": colors.mute400,
    },
    backgroundColor: colors.paper,
    color: colors.ink,
  },
  fieldset: {
    minWidth: 0,
    border: "none",
    margin: 0,
    padding: 0,
  },
  legend: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: colors.mute600,
    padding: 0,
  },
  chipList: {
    marginTop: "1rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.625rem",
  },
  section: {
    scrollMarginTop: "7rem",
    backgroundColor: colors.paper,
    paddingBlock: "7rem",
  },
  container: {
    marginInline: "auto",
    maxWidth: "64rem",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.sm]: "2rem",
    },
  },
  heading: {
    marginTop: "1.25rem",
    maxWidth: "42rem",
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: "clamp(2.25rem, 4.6vw, 3.5rem)",
    color: colors.ink,
    lineHeight: 1.06,
    letterSpacing: "-0.02em",
  },
  headingItalic: {
    fontStyle: "italic",
    color: colors.brandGreen700,
  },
  intro: {
    marginTop: "1.5rem",
    maxWidth: "36rem",
    textWrap: "pretty",
    fontSize: "1rem",
    color: colors.mute600,
    lineHeight: 1.625,
  },
  rule: {
    marginTop: "2.5rem",
    display: "block",
    height: 1,
    width: "100%",
    transformOrigin: "left",
    backgroundColor: colors.line,
  },
  card: {
    marginTop: "2.5rem",
    borderRadius: "32px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.mute50,
    padding: {
      default: "2rem",
      [breakpoints.md]: "3rem",
    },
  },
  groupsGrid: {
    display: "grid",
    gap: "2.25rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, 1fr)",
    },
  },
  sheet: {
    marginTop: {
      default: "2.5rem",
      [breakpoints.md]: "3rem",
    },
    borderRadius: "1.5rem",
    backgroundColor: colors.ink,
    padding: "2rem",
    color: colors.paper,
  },
  sheetHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "0.75rem",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-paper) 15%, transparent)",
    paddingBottom: "1.25rem",
  },
  sheetTitle: {
    fontFamily: typography.tech,
    fontSize: "11px",
    color: colors.brandGreen400,
    textTransform: "uppercase",
    letterSpacing: "0.26em",
  },
  sheetRef: {
    fontFamily: typography.tech,
    fontSize: "11px",
    color: colors.mute400,
    textTransform: "uppercase",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.26em",
  },
  row: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "1.5rem",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-paper) 10%, transparent)",
    paddingBlock: "0.875rem",
  },
  rowLabel: {
    fontFamily: typography.tech,
    fontSize: "12px",
    color: colors.mute400,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
  rowValue: {
    textAlign: "right",
    fontFamily: typography.tech,
    fontSize: "12px",
    color: colors.brandGreen400,
    opacity: 1,
    transition: {
      default: "opacity 500ms ease-out",
      [breakpoints.motionReduce]: "none",
    },
    margin: 0,
  },
  shortlist: {
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
    listStyle: "none",
    marginInline: 0,
    padding: 0,
  },
  shortlistItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontFamily: typography.tech,
    fontSize: "12px",
    opacity: 1,
    transition: {
      default: "opacity 500ms ease-out",
      [breakpoints.motionReduce]: "none",
    },
  },
  checkIcon: {
    width: "0.875rem",
    height: "0.875rem",
    flexShrink: 0,
    color: colors.brandGreen500,
  },
  shortlistCode: {
    color: colors.mute400,
    fontVariantNumeric: "tabular-nums",
  },
  shortlistName: {
    color: colors.brandGreen400,
  },
  submitCta: {
    marginTop: "2rem",
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.625rem",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "1.5rem",
    paddingBlock: "0.75rem",
    fontWeight: 600,
    color: colors.brandGreen950,
    fontSize: "0.875rem",
    textDecoration: "none",
    transition: "background-color 200ms ease",
    outline: {
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  submitArrowIcon: {
    width: "1rem",
    height: "1rem",
    transition: "transform 300ms ease",
  },
});
function Chip({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      {...stylex.props(styles.chip, selected ? styles.chipSelected : styles.chipUnselected)}
    >
      {label}
    </button>
  );
}
function ChipGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <fieldset data-vj-field {...stylex.props(styles.fieldset)}>
      <legend {...stylex.props(styles.legend)}>{legend}</legend>
      <div {...stylex.props(styles.chipList)}>
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={option === value}
            onSelect={() => onChange(option)}
          />
        ))}
      </div>
    </fieldset>
  );
}
export function PresenterSection() {
  const [application, setApplication] = useState<IngredientApplication>("Nutrition");
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("Beadlet");
  const [standard, setStandard] = useState<(typeof STANDARDS)[number]>("ISO 9001 + GMP");
  const matches = getIngredientsByApplication(application);
  const shortlist = matches.slice(0, 3);
  const ref = useSectionAnimation<HTMLElement>((root) => {
    revealWords(root, "[data-vj-heading]");
    riseIn(root, "[data-vj-intro]", {
      stagger: 0.1,
    });
    drawRule(root, "[data-vj-rule]");
    riseIn(root, "[data-vj-field]", {
      stagger: 0.1,
    });
    riseIn(root, "[data-vj-sheet]");
  });
  const rows: {
    label: string;
    value: string;
  }[] = [
    {
      label: "Application",
      value: application,
    },
    {
      label: "Delivery format",
      value: format,
    },
    {
      label: "Standards",
      value: standard,
    },
    {
      label: "Matching actives",
      value: `${matches.length} of ${ingredients.length} in portfolio`,
    },
    {
      label: "Response",
      value: "< 24h with full documentation",
    },
  ];
  return (
    <section
      ref={ref}
      id="formulation"
      aria-labelledby="formulation-heading"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.container)}>
        <p data-vj-intro {...stylex.props(sharedStyles.techLabel)}>
          04 — Formulation
        </p>
        <h2 data-vj-heading id="formulation-heading" {...stylex.props(styles.heading)}>
          <SplitWords
            segments={[
              {
                text: "Your target spec,",
              },
              {
                text: "engineered back to you",
                sx: styles.headingItalic,
              },
            ]}
          />
        </h2>
        <p data-vj-intro {...stylex.props(styles.intro)}>
          Pick the shape of your formulation — our laboratory returns a validated proposal within
          one business day.
        </p>

        <span data-vj-rule aria-hidden="true" {...stylex.props(styles.rule)} />

        <div {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.groupsGrid)}>
            <ChipGroup
              legend="Application"
              options={APPLICATIONS}
              value={application}
              onChange={setApplication}
            />
            <ChipGroup legend="Format" options={FORMATS} value={format} onChange={setFormat} />
            <ChipGroup
              legend="Standard"
              options={STANDARDS}
              value={standard}
              onChange={setStandard}
            />
          </div>

          <div data-vj-sheet {...stylex.props(styles.sheet)}>
            <div {...stylex.props(styles.sheetHeader)}>
              <p {...stylex.props(styles.sheetTitle)}>Formulation brief — live</p>
              <p {...stylex.props(styles.sheetRef)}>FN-REQ / 2026</p>
            </div>

            <div aria-live="polite">
              <dl>
                {rows.map((row) => (
                  <div key={row.label} {...stylex.props(styles.row)}>
                    <dt {...stylex.props(styles.rowLabel)}>{row.label}</dt>
                    <dd key={row.value} {...stylex.props(styles.rowValue)}>
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul key={application} {...stylex.props(styles.shortlist)}>
                {shortlist.map((item, index) => (
                  <li
                    key={item.code}
                    style={{
                      transitionDelay: `${index * 70}ms`,
                    }}
                    {...stylex.props(styles.shortlistItem)}
                  >
                    <CheckCircle2 aria-hidden="true" {...stylex.props(styles.checkIcon)} />
                    <span {...stylex.props(styles.shortlistCode)}>{item.code}</span>
                    <span {...stylex.props(styles.shortlistName)}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href={createInquiryHref("contact")} {...stylex.props(styles.submitCta)}>
              Submit this specification
              <ArrowRight aria-hidden="true" {...stylex.props(styles.submitArrowIcon)} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
