import { createFileRoute } from "@tanstack/solid-router";
import { Loading } from "solid-js";
import { dynamic } from "@solidjs/web";

import { PrototypeSwitcher } from "@/components/prototype/prototype-switcher";
import {
  DEFAULT_VARIANT,
  VARIANT_KEYS,
  VARIANTS,
  type VariantKey,
} from "@/components/prototype/variants";

/*
 * PROTOTYPE — every Fenchem landing variant renders on this route, switchable
 * via ?variant=<key> and the floating bottom bar / arrow keys.
 * A/B/C: original editorial prototypes. D/E/F/G: green-led brand-book versions.
 * All variants are declared once in components/prototype/variants.ts.
 * See GLOSSARY.md + docs/brand/fenchem-brand-book.md for the design contract.
 * The folded-in editorial landing page is preserved at the `landing-v1-editorial` tag.
 */

export const Route = createFileRoute("/")({
  validateSearch: (
    search: Record<string, string | undefined>,
  ): { variant: VariantKey; page?: string; compare?: "baseline" | "catalog" | "solutions" } => {
    const v = search.variant;
    return {
      variant: VARIANT_KEYS.includes(v as VariantKey) ? (v as VariantKey) : DEFAULT_VARIANT,
      page: search.page,
      compare:
        search.compare === "baseline" ||
        search.compare === "catalog" ||
        search.compare === "solutions"
          ? search.compare
          : undefined,
    };
  },
  component: HomeComponent,
});

function HomeComponent() {
  const search = Route.useSearch();
  const Active = dynamic(() => VARIANTS.find((v) => v.key === search().variant)?.Component);
  return (
    <>
      <Loading fallback={null}>
        <Active />
      </Loading>
      <PrototypeSwitcher current={search().variant} compare={search().compare} />
    </>
  );
}
