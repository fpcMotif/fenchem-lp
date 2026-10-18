import * as stylex from "@stylexjs/stylex";

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

export function AboutOOS1E(props: AboutPageProps) {
  const reachedId = useReachedSheet(SHEET_IDS, REACHED_LINE_TOP);
  const stacked = useStackMode();
  const reachedIndex = () => {
    const id = reachedId();
    return id ? SHEET_IDS.indexOf(id) : -1;
  };
  const stackState = {
    get reachedIndex() {
      return reachedIndex();
    },
    get stacked() {
      return stacked();
    },
  };

  return (
    <div
      id="about-top"
      onFocusIn={(event) => {
        if (stacked() && event.target instanceof HTMLElement) keepFocusClear(event.target);
      }}
      {...stylex.attrs(styles.root)}
    >
      <InkDefs />
      <Cover onNavigateHome={props.onNavigateHome} />
      <Rail reachedIndex={reachedIndex()} />
      <StackContext value={stackState}>
        <ProfileSheet />
        <StatsSheet />
        <CampusSheet />
        <CultureSheet />
        <CsrSheet />
        <HonorsSheet />
        <StructureSheet />
        <ProductsSheet onNavigateHome={props.onNavigateHome} />
        <ClosingSheet onNavigateHome={props.onNavigateHome} />
      </StackContext>
    </div>
  );
}
