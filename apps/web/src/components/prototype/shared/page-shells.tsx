import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { Component } from "solid-js";
import type { ComponentProps, JSX } from "@solidjs/web";
import { LazyMotion, LayoutGroup, MotionConfig, domAnimation, domMax } from "@/compat/motion";
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
export function ProductionPage(props: {
  styles: { root: StyleXStyles };
  SmoothScroll: Component;
  IndustriesSection: Component;
  MatrixSection: Component;
  DossierSection: Component;
  productionStyles: ComponentProps<typeof NavBar>["styles"] &
    ComponentProps<typeof PortfolioMenu>["styles"];
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.attrs(props.styles.root)}>
        <props.SmoothScroll />
        <NavBar
          styles={props.productionStyles}
          portfolioMenu={<PortfolioMenu styles={props.productionStyles} />}
          mobileNav={<MobileNav styles={props.productionStyles} />}
        />
        <main>
          <HeroSection styles={props.productionStyles} />
          <TickerSection styles={props.productionStyles} />
          <props.IndustriesSection />
          <props.MatrixSection />
          <props.DossierSection />
          <FormulationSection styles={props.productionStyles} />
          <StandardsSection styles={props.productionStyles} />
          <FinaleSection styles={props.productionStyles} />
        </main>
        <FooterSection styles={props.productionStyles} />
      </div>
    </LazyMotion>
  );
}
export function BloomCorporatePage(props: {
  styles: { root: StyleXStyles; page: StyleXStyles; skipLink: StyleXStyles };
  introVars: JSX.CSSProperties;
  intro: string;
  SiteHeader: Component;
  main: JSX.Element;
  SiteFooter: Component;
}) {
  return (
    <LazyMotion features={domMax} strict>
      <LayoutGroup>
        <MotionConfig reducedMotion="user">
          <div lang="zh-CN" {...stylex.attrs(props.styles.root)} style={props.introVars}>
            <div
              {...stylex.attrs(props.styles.page, props.intro === "play" && introStyles.pageReveal)}
            >
              <a href="#main-content" {...stylex.attrs(props.styles.skipLink)}>
                跳到主要内容
              </a>
              <props.SiteHeader />
              {props.main}
              <Flow>
                <props.SiteFooter />
              </Flow>
            </div>
          </div>
        </MotionConfig>
      </LayoutGroup>
    </LazyMotion>
  );
}
export function FixedHeaderCorporatePage(props: {
  styles: { root: StyleXStyles; skipLink: StyleXStyles; page: StyleXStyles };
  introVars: JSX.CSSProperties;
  intro: string;
  SiteHeader: Component;
  main: JSX.Element;
  SiteFooter: Component;
}) {
  return (
    <LazyMotion features={domMax} strict>
      <LayoutGroup>
        <MotionConfig reducedMotion="user">
          <div lang="zh-CN" {...stylex.attrs(props.styles.root)} style={props.introVars}>
            <a href="#main-content" {...stylex.attrs(props.styles.skipLink)}>
              跳到主要内容
            </a>
            <props.SiteHeader />
            <div
              {...stylex.attrs(props.styles.page, props.intro === "play" && introStyles.pageReveal)}
            >
              {props.main}
              <Flow>
                <props.SiteFooter />
              </Flow>
            </div>
          </div>
        </MotionConfig>
      </LayoutGroup>
    </LazyMotion>
  );
}
