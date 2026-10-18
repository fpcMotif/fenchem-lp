import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ABOUT_HERO } from "../../about-data";
import type { SectionId } from "./sentence";
import { ui } from "./shared";
import { headingId } from "./label-values";

const ENGLISH: Partial<Record<SectionId, string>> = {
  "about-profile": "Profile",
  "about-campus": "Campus",
  "about-culture": "Culture",
  "about-csr": "Responsibility",
  "about-honor": "Honors",
  "about-structure": "Structure",
};

export function SectionLabel(props: { section: SectionId; sx?: StyleXStyles }) {
  const chip = ABOUT_HERO.navChips.find((item) => item.id === props.section);
  return (
    <h2 id={headingId(props.section)} {...stylex.attrs(ui.label, props.sx)}>
      <span>{chip?.label}</span>
      <span lang="en" {...stylex.attrs(ui.labelEn)}>
        {ENGLISH[props.section]}
      </span>
    </h2>
  );
}
