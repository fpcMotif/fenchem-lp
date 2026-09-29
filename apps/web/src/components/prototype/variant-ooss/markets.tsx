import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { PRODUCTS, PRODUCTS_INTRO } from "./content";
import { Reveal } from "./motion";
import { media } from "./tokens.stylex";
import { Button, layout } from "./ui";

const HEADER_HEIGHT = 80;

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const SURFACE = "#f6f6f6";
const PANEL_ALT = "#e8e8e8";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const styles = stylex.create({
  anchor: {
    scrollMarginTop: HEADER_HEIGHT,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [media.desktop]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
    textWrap: "balance",
  },
  sectionLead: {
    margin: 0,
    fontSize: { default: 16, [media.desktop]: 18 },
    lineHeight: 1.6,
    color: BODY_TEXT,
    textAlign: "center",
    textWrap: "pretty",
  },
  mutedText: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.2,
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  introBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    maxWidth: 768,
  },
  products: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBlock: { default: 72, [media.desktop]: 96 },
    backgroundColor: SURFACE,
  },
  productsCta: {
    paddingTop: 24,
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.tablet]: "repeat(2, minmax(0, 1fr))",
      [media.desktop]: "repeat(4, minmax(0, 1fr))",
    },
    width: "100%",
    maxWidth: 1200,
    marginTop: { default: 48, [media.desktop]: 96 },
    scrollMarginTop: HEADER_HEIGHT + 24,
  },
  productCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    zIndex: { default: 0, ":hover": 1 },
  },
  productTilt: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "450ms",
    transitionTimingFunction: EASE_OUT_CSS,
    boxShadow: {
      default: "0 0 0 rgba(7, 67, 174, 0)",
      [stylex.when.ancestor(":hover")]: {
        default: "0 0 0 rgba(7, 67, 174, 0)",
        [media.hoverMotion]: "0 24px 48px -20px rgba(7, 67, 174, 0.35)",
      },
    },
  },
  productGlare: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage:
      "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 30%), rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 55%)",
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: { default: 0, [media.hoverMotion]: 1 },
    },
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    transitionTimingFunction: "ease",
  },
  productImageFrame: {
    overflow: "hidden",
    aspectRatio: "300 / 327",
  },
  productImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: { default: null, [media.hoverMotion]: "scale(1.04)" },
    },
    transitionProperty: "transform",
    transitionDuration: "600ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  productPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 32,
    flexGrow: 1,
    minHeight: { default: 0, [media.desktop]: 327 },
    padding: 24,
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  },
  productPanelAlt: {
    backgroundColor: PANEL_ALT,
  },
  productTitleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  productTitle: {
    margin: 0,
    fontSize: { default: 26, [media.desktop]: 32 },
    fontWeight: 400,
    lineHeight: 1.2,
    color: INK,
  },
  rule: {
    width: "100%",
    height: 1,
    margin: 0,
    borderWidth: 0,
    backgroundColor: "#d0d0d0",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
});

function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const card = ref.current;
    if (!card || reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const image = card.querySelector("img");
    let frame = 0;
    let rotateX = 0;
    let rotateY = 0;
    const apply = () => {
      frame = 0;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      if (image) image.style.translate = `${rotateY * -1.4}px ${rotateX * 1.4}px`;
    };
    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      rotateY = (x - 0.5) * 9;
      rotateX = (0.5 - y) * 7;
      card.style.setProperty("--glare-x", `${Math.round(x * 100)}%`);
      card.style.setProperty("--glare-y", `${Math.round(y * 100)}%`);
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      rotateX = 0;
      rotateY = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      card.style.transform = "";
      if (image) image.style.translate = "";
    };
  }, [reduce]);
  return ref;
}

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[number]; index: number }) {
  const tiltRef = useTilt<HTMLDivElement>();
  return (
    <Reveal index={index} sx={[styles.productCard, stylex.defaultMarker()]}>
      <div ref={tiltRef} {...stylex.props(styles.productTilt)}>
        <div {...stylex.props(styles.productImageFrame)}>
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.productImage)}
          />
        </div>
        <div {...stylex.props(styles.productPanel, index % 2 === 1 && styles.productPanelAlt)}>
          <div {...stylex.props(styles.productTitleBlock)}>
            <h3 {...stylex.props(styles.productTitle)}>{product.title}</h3>
            <hr {...stylex.props(styles.rule)} />
            <p {...stylex.props(styles.mutedText)}>{product.description}</p>
          </div>
          <ul {...stylex.props(styles.list)}>
            {product.tags.map((tag) => (
              <li key={tag} {...stylex.props(styles.mutedText)}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <span aria-hidden="true" {...stylex.props(styles.productGlare)} />
      </div>
    </Reveal>
  );
}

export function Markets() {
  return (
    <section
      id="products"
      aria-labelledby="oo-products-title"
      {...stylex.props(styles.products, layout.inset, styles.anchor)}
    >
      <Reveal sx={styles.introBlock}>
        <h2 id="oo-products-title" {...stylex.props(styles.sectionTitle)}>
          {PRODUCTS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{PRODUCTS_INTRO.lead}</p>
      </Reveal>
      <Reveal delay={100} sx={styles.productsCta}>
        <Button href={PRODUCTS_INTRO.cta.href}>{PRODUCTS_INTRO.cta.label}</Button>
      </Reveal>
      <div id="product-list" {...stylex.props(styles.productGrid)}>
        {PRODUCTS.map((product, index) => (
          <ProductCard key={product.title} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
