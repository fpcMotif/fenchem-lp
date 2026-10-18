import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight, CheckCircle2 } from "@fenchem-lp/ui/components/lucide";
import { For, Show, createMemo, createSignal } from "solid-js";
import {
  createInquiryHref,
  getIngredientsByApplication,
  ingredients,
  type IngredientApplication,
} from "@/components/landing/landing-content";
import { SplitWords, useSectionAnimation } from "../motion";
import { drawRule, revealWords, riseIn } from "../motion-values";
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
function Chip(props: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={props.selected ? "true" : "false"}
      onClick={props.onSelect}
      {...stylex.attrs(styles.chip, props.selected ? styles.chipSelected : styles.chipUnselected)}
    >
      {props.label}
    </button>
  );
}
function ChipGroup<T extends string>(props: {
  legend: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <fieldset data-vj-field="" {...stylex.attrs(styles.fieldset)}>
      <legend {...stylex.attrs(styles.legend)}>{props.legend}</legend>
      <div {...stylex.attrs(styles.chipList)}>
        {props.options.map((option) => (
          <Chip
            label={option}
            selected={option === props.value}
            onSelect={() => props.onChange(option)}
          />
        ))}
      </div>
    </fieldset>
  );
}
export function PresenterSection() {
  const [application, setApplication] = createSignal<IngredientApplication>("Nutrition");
  const [format, setFormat] = createSignal<(typeof FORMATS)[number]>("Beadlet");
  const [standard, setStandard] = createSignal<(typeof STANDARDS)[number]>("ISO 9001 + GMP");
  const matches = createMemo(() => getIngredientsByApplication(application()));
  const shortlist = () => matches().slice(0, 3);
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
    value: () => string;
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
      value: () => `${matches().length} of ${ingredients.length} in portfolio`,
    },
    {
      label: "Response",
      value: () => "< 24h with full documentation",
    },
  ];
  return (
    <section
      ref={ref}
      id="formulation"
      aria-labelledby="formulation-heading"
      {...stylex.attrs(styles.section)}
    >
      <div {...stylex.attrs(styles.container)}>
        <p data-vj-intro="" {...stylex.attrs(sharedStyles.techLabel)}>
          04 — Formulation
        </p>
        <h2 data-vj-heading="" id="formulation-heading" {...stylex.attrs(styles.heading)}>
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
        <p data-vj-intro="" {...stylex.attrs(styles.intro)}>
          Pick the shape of your formulation — our laboratory returns a validated proposal within
          one business day.
        </p>

        <span data-vj-rule="" aria-hidden="true" {...stylex.attrs(styles.rule)} />

        <div {...stylex.attrs(styles.card)}>
          <div {...stylex.attrs(styles.groupsGrid)}>
            <ChipGroup
              legend="Application"
              options={APPLICATIONS}
              value={application()}
              onChange={setApplication}
            />
            <ChipGroup legend="Format" options={FORMATS} value={format()} onChange={setFormat} />
            <ChipGroup
              legend="Standard"
              options={STANDARDS}
              value={standard()}
              onChange={setStandard}
            />
          </div>

          <div data-vj-sheet="" {...stylex.attrs(styles.sheet)}>
            <div {...stylex.attrs(styles.sheetHeader)}>
              <p {...stylex.attrs(styles.sheetTitle)}>Formulation brief — live</p>
              <p {...stylex.attrs(styles.sheetRef)}>FN-REQ / 2026</p>
            </div>

            <div aria-live="polite">
              <dl>
                {rows.map((row) => (
                  <div {...stylex.attrs(styles.row)}>
                    <dt {...stylex.attrs(styles.rowLabel)}>{row.label}</dt>
                    <Show when={row.value()} keyed>
                      {(value) => <dd {...stylex.attrs(styles.rowValue)}>{value}</dd>}
                    </Show>
                  </div>
                ))}
              </dl>

              <Show when={application()} keyed>
                <>
                  <ul {...stylex.attrs(styles.shortlist)}>
                    <For each={shortlist()}>
                      {(item, index) => (
                        <li
                          style={{
                            "transition-delay": `${index() * 70}ms`,
                          }}
                          {...stylex.attrs(styles.shortlistItem)}
                        >
                          <CheckCircle2 aria-hidden="true" {...stylex.attrs(styles.checkIcon)} />
                          <span {...stylex.attrs(styles.shortlistCode)}>{item.code}</span>
                          <span {...stylex.attrs(styles.shortlistName)}>{item.name}</span>
                        </li>
                      )}
                    </For>
                  </ul>
                </>
              </Show>
            </div>

            <a href={createInquiryHref("contact")} {...stylex.attrs(styles.submitCta)}>
              Submit this specification
              <ArrowRight aria-hidden="true" {...stylex.attrs(styles.submitArrowIcon)} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
