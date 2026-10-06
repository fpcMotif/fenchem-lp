import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import type { SectionId } from "./sentence";
import { ui } from "./shared";

const ENGLISH: Partial<Record<SectionId, string>> = {
  "about-profile": "Profile",
  "about-campus": "Campus",
  "about-culture": "Culture",
  "about-csr": "Responsibility",
  "about-honor": "Honors",
  "about-structure": "Structure",
};

export const headingId = (section: SectionId) => `${section}-heading`;

export function SectionLabel({ section, sx }: { section: SectionId; sx?: StyleXStyles }) {
  const chip = ABOUT_HERO.navChips.find((item) => item.id === section);
  return (
    <h2 id={headingId(section)} {...stylex.props(ui.label, sx)}>
      <span>{chip?.label}</span>
      <span lang="en" {...stylex.props(ui.labelEn)}>
        {ENGLISH[section]}
      </span>
    </h2>
  );
}
