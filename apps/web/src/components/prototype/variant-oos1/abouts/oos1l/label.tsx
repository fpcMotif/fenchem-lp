import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ABOUT_HERO } from "../../about-data";
import type { SectionId } from "./sentence";
import { ui } from "./shared";
import { headingId } from "./label-values";

export function SectionLabel({ section, sx }: { section: SectionId; sx?: StyleXStyles }) {
  const chip = ABOUT_HERO.navChips.find((item) => item.id === section);
  return (
    <h2 id={headingId(section)} {...stylex.props(ui.label, sx)}>
      <span>{chip?.label}</span>
    </h2>
  );
}
