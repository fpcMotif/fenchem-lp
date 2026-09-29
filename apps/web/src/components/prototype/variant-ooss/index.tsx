import * as stylex from "@stylexjs/stylex";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { preinit, preload } from "react-dom";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { Campus } from "./about";
import { HERO } from "./content";
import { ContactBand, SiteFooter } from "./footer";
import { SiteHeader } from "./header";
import { Hero } from "./hero";
import { Markets } from "./markets";
import { Network } from "./network";
import { News } from "./news";
import { color, font } from "./tokens.stylex";

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600;700&family=Noto+Sans+SC:wght@400;700&display=swap";

const styles = stylex.create({
  root: {
    position: "relative",
    backgroundColor: color.paper,
    color: color.ink,
    fontFamily: font.display,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "::selection": {
      backgroundColor: color.selectionBg,
      color: color.selectionInk,
    },
  },
  page: {
    position: "relative",
    backgroundColor: color.paper,
  },
  skipLink: {
    position: "absolute",
    top: 16,
    insetInlineStart: 16,
    zIndex: 30,
    paddingBlock: 12,
    paddingInline: 16,
    backgroundColor: color.paper,
    color: color.royal,
    fontSize: 16,
    lineHeight: 1.2,
    textDecoration: "none",
    transform: { default: "translateY(-200%)", ":focus-visible": "none" },
  },
  mainTarget: {
    outlineStyle: "none",
  },
});

export function VariantOOSS() {
  preinit(GOOGLE_FONTS, { as: "style" });
  preload(HERO.image, { as: "image", fetchPriority: "high" });
  const reduce = useReducedMotion();
  const [introStarted, setIntroStarted] = useState(false);
  const startIntro = useCallback(() => setIntroStarted(true), []);
  useEffect(() => {
    if (reduce) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = previous;
    };
  }, [reduce]);
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div lang="zh-CN" {...stylex.props(styles.root)}>
          <div {...stylex.props(styles.page)}>
            <a href="#main-content" {...stylex.props(styles.skipLink)}>
              跳到主要内容
            </a>
            <SiteHeader introStarted={introStarted} />
            <main id="main-content" tabIndex={-1} {...stylex.props(styles.mainTarget)}>
              <Hero ready={introStarted} onReady={startIntro} />
              <Campus />
              <Markets />
              <Network />
              <News />
              <ContactBand />
            </main>
            <SiteFooter />
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
