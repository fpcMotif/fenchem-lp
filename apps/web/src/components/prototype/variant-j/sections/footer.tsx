import {
  certifications,
  company,
  createInquiryHref,
  navLinks,
  regions,
  toAnchor,
} from "@/components/landing/landing-content";
import { TECH_LABEL_DARK } from "../content";
import { drawRule, riseIn, useSectionAnimation } from "../motion";

/*
 * Variant J — the ledger's colophon. Deep green darkening to near-black at
 * the base, so the page arc closes below the finale rather than beside it:
 * certification record on top, brand + wayfinding columns in the middle, the
 * ghost FENCHEM wordmark half-submerged in the fold, legal strip last.
 * Certifications are text only (no borrowed logos). SSR markup is the final
 * state; hairlines and columns only animate when motion is welcome.
 */
export function FooterSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    riseIn(root, "[data-footer-chip]", { stagger: 0.05, start: "top 94%" });
    drawRule(root, "[data-rule-top]", { start: "top 96%" });
    riseIn(root, "[data-footer-col]", { stagger: 0.1, start: "top 90%" });
    riseIn(root, "[data-footer-mark]", { start: "top 98%" });
    drawRule(root, "[data-rule-legal]", { start: "top 98%" });
    riseIn(root, "[data-footer-legal]", { start: "top 98%" });
  });

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-brand-green-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-brand-green-950/40 to-ink/85"
      />

      <div className="relative mx-auto max-w-[1480px] px-6 pt-20 md:px-10 md:pt-24">
        {/* Certification record — real certifications, set as text */}
        <h2 className="sr-only">Contact Fenchem</h2>
        <p className={`${TECH_LABEL_DARK} mb-5`}>Certified to</p>
        <ul className="flex flex-wrap gap-2">
          {certifications.map((certification) => (
            <li key={certification}>
              <span
                data-footer-chip
                className="inline-block rounded-full border border-paper/20 px-3 py-1 font-tech text-[11px] text-paper/70 uppercase tracking-[0.22em]"
              >
                {certification}
              </span>
            </li>
          ))}
        </ul>

        <div data-rule-top className="mt-10 h-px origin-left bg-paper/10" />

        {/* Brand + wayfinding */}
        <div className="grid gap-12 pt-14 md:grid-cols-12 md:gap-10">
          <div data-footer-col className="md:col-span-5">
            <p className="font-display font-light text-2xl text-paper tracking-tight">
              {company.name}
            </p>
            <p className={`${TECH_LABEL_DARK} mt-3`}>{company.tagline}</p>
            <p className="mt-6 max-w-sm text-pretty text-paper/70 text-sm leading-relaxed">
              {company.legalName} has supplied premium botanical and functional ingredients since{" "}
              {company.founded} — six global bases across three continents, forty-plus countries
              served, and a documented chain of custody behind every lot.
            </p>
          </div>

          <nav data-footer-col aria-label="Footer" className="md:col-span-2">
            <p className={TECH_LABEL_DARK}>Explore</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.section}>
                  <a
                    href={toAnchor(link.section)}
                    className="text-paper/75 text-sm transition-colors hover:text-brand-green-300 focus-visible:text-brand-green-300 focus-visible:outline-2 focus-visible:outline-brand-green-300 focus-visible:outline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-footer-col className="md:col-span-3">
            <p className={TECH_LABEL_DARK}>Global bases</p>
            <ul className="mt-5 space-y-3">
              {regions.map((region) => (
                <li key={region.city} className="text-paper/75 text-sm">
                  {region.city}
                  <span className="text-paper/60"> — {region.country}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col className="md:col-span-2">
            <p className={TECH_LABEL_DARK}>Direct</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={createInquiryHref("contact")}
                  className="break-words text-paper/75 text-sm transition-colors hover:text-brand-green-300 focus-visible:text-brand-green-300 focus-visible:outline-2 focus-visible:outline-brand-green-300 focus-visible:outline-offset-4"
                >
                  {company.email}
                </a>
              </li>
              <li className="text-paper/75 text-sm">{company.since}</li>
              <li className="font-tech text-[11px] text-paper/60 tabular-nums tracking-[0.14em]">
                HQ {company.hq.coords}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ghost wordmark — decorative, half-submerged in the fold */}
      <div
        data-footer-mark
        aria-hidden="true"
        className="relative overflow-hidden px-6 pt-10 md:px-10"
      >
        <p className="-mb-[0.18em] select-none whitespace-nowrap font-display font-light text-[clamp(120px,18vw,240px)] text-paper leading-none tracking-[-0.04em] opacity-[0.06]">
          FENCHEM
        </p>
      </div>

      {/* Legal strip */}
      <div className="relative mx-auto max-w-[1480px] px-6 pb-8 md:px-10">
        <div data-rule-legal className="h-px origin-left bg-paper/10" />
        <div
          data-footer-legal
          className="flex flex-col gap-3 pt-5 text-paper/60 text-xs sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© 2026 {company.legalName} — All rights reserved.</p>
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="/privacy"
                className="text-paper/70 transition-colors hover:text-brand-green-300 focus-visible:text-brand-green-300 focus-visible:outline-2 focus-visible:outline-brand-green-300 focus-visible:outline-offset-4"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="text-paper/70 transition-colors hover:text-brand-green-300 focus-visible:text-brand-green-300 focus-visible:outline-2 focus-visible:outline-brand-green-300 focus-visible:outline-offset-4"
              >
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
