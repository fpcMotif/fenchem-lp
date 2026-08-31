import gsap from "gsap";
import { Leaf } from "lucide-react";
import { navLinks, toAnchor } from "@/components/landing/landing-content";
import { useSectionAnimation } from "../motion";

/*
 * Variant I — floating pill navigation, absolute over the dark hero.
 * Cream-on-dark; anchors glide via Lenis (native smooth under reduced
 * motion). Fully usable before the intro animation completes.
 */
export function NavBar() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    gsap.from(root.querySelector("[data-nav-pill]"), {
      y: -18,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1,
    });
  });

  return (
    <header ref={ref} className="absolute inset-x-0 top-0 z-30 px-4 pt-5 sm:px-8">
      <nav
        data-nav-pill
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-cream/15 bg-bark/40 py-2 pr-2 pl-6 backdrop-blur-md"
      >
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-cream text-lg tracking-tight focus-visible:outline-2 focus-visible:outline-brand-green-300"
        >
          <Leaf aria-hidden="true" className="size-4 text-brand-green-300" />
          Fenchem
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.section}
              href={toAnchor(link.section)}
              className="text-cream/70 text-sm transition-colors hover:text-cream focus-visible:text-cream focus-visible:outline-2 focus-visible:outline-brand-green-300"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#global-supply"
          className="rounded-full bg-brand-green-500 px-5 py-2.5 font-semibold text-brand-green-950 text-sm transition-colors hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-cream"
        >
          Partner with Us
        </a>
      </nav>
    </header>
  );
}
