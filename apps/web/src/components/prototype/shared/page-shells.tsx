import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ComponentType, ComponentProps, ReactNode, CSSProperties } from "react";
import { LazyMotion, LayoutGroup, MotionConfig, domAnimation, domMax } from "motion/react";
import {
  NavBar,
  HeroSection,
  FormulationSection,
  StandardsSection,
  FinaleSection,
  FooterSection,
} from "./production-sections";
import { PortfolioMenu, MobileNav, TickerSection } from "./production-navigation";
import { introStyles } from "./intro";
import { Flow } from "./flow";
export function ProductionPage({
  styles,
  SmoothScroll,
  IndustriesSection,
  MatrixSection,
  DossierSection,
  productionStyles,
}: {
  styles: { root: StyleXStyles };
  SmoothScroll: ComponentType;
  IndustriesSection: ComponentType;
  MatrixSection: ComponentType;
  DossierSection: ComponentType;
  productionStyles: ComponentProps<typeof NavBar>["styles"] &
    ComponentProps<typeof PortfolioMenu>["styles"];
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        <SmoothScroll />
        <NavBar
          styles={productionStyles}
          portfolioMenu={<PortfolioMenu styles={productionStyles} />}
          mobileNav={<MobileNav styles={productionStyles} />}
        />
        <main>
          <HeroSection styles={productionStyles} />
          <TickerSection styles={productionStyles} />
          <IndustriesSection />
          <MatrixSection />
          <DossierSection />
          <FormulationSection styles={productionStyles} />
          <StandardsSection styles={productionStyles} />
          <FinaleSection styles={productionStyles} />
        </main>
        <FooterSection styles={productionStyles} />
      </div>
    </LazyMotion>
  );
}
export function BloomCorporatePage({
  styles,
  introVars,
  intro,
  SiteHeader,
  main,
  SiteFooter,
}: {
  styles: { root: StyleXStyles; page: StyleXStyles; skipLink: StyleXStyles };
  introVars: CSSProperties;
  intro: string;
  SiteHeader: ComponentType;
  main: ReactNode;
  SiteFooter: ComponentType;
}) {
  return (
    <LazyMotion features={domMax} strict>
      <LayoutGroup>
        <MotionConfig reducedMotion="user">
          <div lang="zh-CN" {...stylex.props(styles.root)} style={introVars}>
            <div {...stylex.props(styles.page, intro === "play" && introStyles.pageReveal)}>
              <a href="#main-content" {...stylex.props(styles.skipLink)}>
                跳到主要内容
              </a>
              <SiteHeader />
              {main}
              <Flow>
                <SiteFooter />
              </Flow>
            </div>
          </div>
        </MotionConfig>
      </LayoutGroup>
    </LazyMotion>
  );
}
export function FixedHeaderCorporatePage({
  styles,
  introVars,
  intro,
  SiteHeader,
  main,
  SiteFooter,
}: {
  styles: { root: StyleXStyles; skipLink: StyleXStyles; page: StyleXStyles };
  introVars: CSSProperties;
  intro: string;
  SiteHeader: ComponentType;
  main: ReactNode;
  SiteFooter: ComponentType;
}) {
  return (
    <LazyMotion features={domMax} strict>
      <LayoutGroup>
        <MotionConfig reducedMotion="user">
          <div lang="zh-CN" {...stylex.props(styles.root)} style={introVars}>
            <a href="#main-content" {...stylex.props(styles.skipLink)}>
              跳到主要内容
            </a>
            <SiteHeader />
            <div {...stylex.props(styles.page, intro === "play" && introStyles.pageReveal)}>
              {main}
              <Flow>
                <SiteFooter />
              </Flow>
            </div>
          </div>
        </MotionConfig>
      </LayoutGroup>
    </LazyMotion>
  );
}
