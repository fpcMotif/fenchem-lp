import * as stylex from "@stylexjs/stylex";
import { useMemo } from "react";

import type { AboutPageProps } from "../../index";
import { Cover } from "./cover";
import { keepFocusClear, useReachedSheet, useStackMode } from "./hooks";
import { InkDefs } from "./ink-defs";
import { Rail } from "./rail";
import { CampusSheet } from "./sections/campus";
import { ClosingSheet } from "./sections/closing";
import { CsrSheet } from "./sections/csr";
import { CultureSheet } from "./sections/culture";
import { HonorsSheet } from "./sections/honors";
import { ProductsSheet } from "./sections/products";
import { ProfileSheet } from "./sections/profile";
import { StatsSheet } from "./sections/stats";
import { StructureSheet } from "./sections/structure";
import { StackContext } from "./sheet-values";
import { SHEET_IDS } from "./sheets";
import { color, font } from "./tokens.stylex";

const REACHED_LINE_TOP = 188;

const styles = stylex.create({
  root: {
    overflowX: "clip",
    backgroundColor: color.page,
    color: color.ink,
    fontFamily: font.cjk,
  },
});

export function AboutOOS1E({ onNavigateHome }: AboutPageProps) {
  const reachedId = useReachedSheet(SHEET_IDS, REACHED_LINE_TOP);
  const stacked = useStackMode();
  const reachedIndex = reachedId ? SHEET_IDS.indexOf(reachedId) : -1;
  const stackState = useMemo(() => ({ reachedIndex, stacked }), [reachedIndex, stacked]);

  return (
    <div
      id="about-top"
      onFocus={(event) => {
        if (stacked && event.target instanceof HTMLElement) keepFocusClear(event.target);
      }}
      {...stylex.props(styles.root)}
    >
      <InkDefs />
      <Cover onNavigateHome={onNavigateHome} />
      <Rail reachedIndex={reachedIndex} />
      <StackContext.Provider value={stackState}>
        <ProfileSheet />
        <StatsSheet />
        <CampusSheet />
        <CultureSheet />
        <CsrSheet />
        <HonorsSheet />
        <StructureSheet />
        <ProductsSheet onNavigateHome={onNavigateHome} />
        <ClosingSheet onNavigateHome={onNavigateHome} />
      </StackContext.Provider>
    </div>
  );
}
