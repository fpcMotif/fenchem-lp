import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "@fenchem-lp/ui/components/lucide";

import { ABOUT_CSR } from "../../about-data";
import { CTA, PRODUCTS, PRODUCTS_INTRO } from "../../content";
import { Reveal } from "./reveal";
import { face, mq, tone } from "./tokens.stylex";
import { ui } from "./ui";

const styles = stylex.create({
  csr: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 40, [mq.xl]: 80 },
    backgroundColor: tone.page,
  },
  statement: {
    margin: 0,
    maxWidth: "20em",
    fontSize: { default: 24, [mq.tablet]: 36, [mq.xl]: 52 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  statementLine: {
    display: "block",
  },
  figure: {
    width: "100%",
    maxHeight: 560,
    margin: 0,
    aspectRatio: { default: "4 / 3", [mq.md]: "21 / 9" },
    backgroundColor: tone.placeholder,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 42%",
  },
  csrBody: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [mq.xl]: "minmax(0, 0.4fr) minmax(0, 0.6fr)",
    },
    gap: { default: 32, [mq.xl]: 80 },
    alignItems: "start",
  },
  desc: {
    margin: 0,
    maxWidth: "30em",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
  outcomes: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    paddingBlock: { default: 18, [mq.xl]: 26 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    fontSize: { default: 19, [mq.xl]: 22 },
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: tone.ink,
  },

  products: {
    backgroundColor: colors.paper,
  },
  productsHead: {
    display: "flex",
    flexDirection: { default: "column", [mq.lg]: "row" },
    alignItems: { default: "flex-start", [mq.lg]: "flex-end" },
    justifyContent: "space-between",
    gap: 24,
    marginBottom: { default: 40, [mq.xl]: 72 },
  },
  productsLead: {
    margin: 0,
    maxWidth: "28em",
    fontSize: { default: 20, [mq.tablet]: 24, [mq.xl]: 28 },
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "pretty",
  },
  clause: {
    display: "inline-block",
  },
  productList: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [mq.sm]: "repeat(2, minmax(0, 1fr))",
      [mq.lg]: "repeat(4, minmax(0, 1fr))",
    },
    gap: { default: "48px 24px", [mq.xl]: "48px 40px" },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  product: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  productMedia: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: "545 / 614",
    marginBottom: 8,
    backgroundColor: tone.placeholder,
  },
  productImage: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  shiftA: { translate: { default: null, [mq.lg]: "0 5px" } },
  shiftB: { translate: { default: null, [mq.lg]: "0 -4px" } },
  shiftC: { translate: { default: null, [mq.lg]: "0 3px" } },
  shiftD: { translate: { default: null, [mq.lg]: "0 -5px" } },
  productTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
  },
  productLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: face.cjk,
    fontSize: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    color: tone.ink,
    textAlign: "start",
    cursor: "pointer",
    textDecorationLine: "underline",
    textDecorationColor: { default: "transparent", ":hover": tone.hairline },
    textUnderlineOffset: 6,
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
  productDesc: {
    margin: 0,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px 18px",
    margin: 0,
    marginTop: 4,
    paddingTop: 14,
    paddingInline: 0,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    listStyle: "none",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: "0.08em",
    color: tone.muted,
  },

  cta: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: tone.page,
  },
  ctaInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 32, [mq.xl]: 48 },
  },
  ctaTitle: {
    margin: 0,
    fontSize: { default: 36, [mq.tablet]: 52, [mq.xl]: 72 },
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
});

const PRODUCT_SHIFT = [styles.shiftA, styles.shiftB, styles.shiftC, styles.shiftD] as const;

const LEAD_CLAUSES = PRODUCTS_INTRO.lead.split(/(?<=，)/);

export function CsrSection() {
  const [statementLead, statementClose] = ABOUT_CSR.statement;

  return (
    <section
      id="about-csr"
      aria-labelledby="about-csr-title"
      {...stylex.attrs(styles.csr, ui.section, ui.anchor)}
    >
      <h2 id="about-csr-title" {...stylex.attrs(ui.srOnly)}>
        Responsibility
      </h2>
      <div {...stylex.attrs(ui.shell, ui.inset)}>
        <Reveal>
          <p {...stylex.attrs(styles.statement)}>
            <span {...stylex.attrs(styles.statementLine)}>{statementLead}</span>
            <span {...stylex.attrs(styles.statementLine)}>{statementClose}</span>
          </p>
        </Reveal>
      </div>

      <figure {...stylex.attrs(styles.figure)}>
        <img
          src={ABOUT_CSR.image}
          alt={ABOUT_CSR.imageAlt}
          loading="lazy"
          decoding="async"
          {...stylex.attrs(styles.image)}
        />
      </figure>

      <div {...stylex.attrs(ui.shell, ui.inset, styles.csrBody)}>
        <Reveal>
          <p {...stylex.attrs(styles.desc)}>{ABOUT_CSR.desc}</p>
        </Reveal>
        <Reveal step={1}>
          <ul {...stylex.attrs(styles.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome) => (
              <li {...stylex.attrs(styles.outcome)}>{outcome.title}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function ProductsSection(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section
      id="about-products"
      aria-labelledby="about-products-title"
      {...stylex.attrs(styles.products, ui.section, ui.anchor)}
    >
      <h2 id="about-products-title" {...stylex.attrs(ui.srOnly)}>
        Products and application solutions
      </h2>
      <div {...stylex.attrs(ui.shell, ui.inset)}>
        <Reveal sx={styles.productsHead}>
          <p {...stylex.attrs(styles.productsLead)}>
            {LEAD_CLAUSES.map((clause) => (
              <span {...stylex.attrs(styles.clause)}>{clause}</span>
            ))}
          </p>
          <button
            type="button"
            onClick={() => props.onNavigateHome("products")}
            {...stylex.attrs(ui.textLink, ui.focusRing)}
          >
            <span>{PRODUCTS_INTRO.cta.label}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </Reveal>

        <ul {...stylex.attrs(styles.productList)}>
          {PRODUCTS.map((product, index) => (
            <Reveal as="li" step={index} sx={styles.product}>
              <div
                {...stylex.attrs(styles.productMedia, PRODUCT_SHIFT[index % PRODUCT_SHIFT.length])}
              >
                <img
                  src={product.image}
                  alt={`${product.english} solution illustration`}
                  loading="lazy"
                  decoding="async"
                  {...stylex.attrs(styles.productImage)}
                />
              </div>
              <h3 {...stylex.attrs(styles.productTitle)}>
                <button
                  type="button"
                  onClick={() => props.onNavigateHome("products")}
                  {...stylex.attrs(styles.productLink, ui.focusRing)}
                >
                  {product.title}
                </button>
              </h3>
              <p {...stylex.attrs(styles.productDesc)}>{product.description}</p>
              <ul aria-label={`${product.english} tags`} {...stylex.attrs(styles.tags)}>
                {product.tags.map((tag) => (
                  <li>{tag}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ClosingCta(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.attrs(styles.cta, ui.section)}>
      <div {...stylex.attrs(ui.shell, ui.inset)}>
        <Reveal sx={styles.ctaInner}>
          <h2 id="about-cta-title" {...stylex.attrs(styles.ctaTitle)}>
            {CTA.title}
          </h2>
          <div {...stylex.attrs(styles.buttonGroup)}>
            <button
              type="button"
              onClick={() => props.onNavigateHome("contact")}
              {...stylex.attrs(ui.button, ui.buttonPrimary, ui.focusRing)}
            >
              <span>{CTA.action.label}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => props.onNavigateHome("products")}
              {...stylex.attrs(ui.button, ui.buttonOutline, ui.focusRing)}
            >
              <span>产品与应用</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
