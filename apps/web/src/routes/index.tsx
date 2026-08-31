import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { PrototypeSwitcher } from "@/components/prototype/prototype-switcher";
import {
  DEFAULT_VARIANT,
  VARIANT_KEYS,
  VARIANTS,
  type VariantKey,
} from "@/components/prototype/variants";

/*
 * PROTOTYPE — seven Fenchem landing pages on this route, switchable via
 * ?variant= (a..g) and the floating bottom bar / arrow keys.
 * A/B/C: original editorial prototypes. D/E/F/G: green-led brand-book versions.
 * All seven are declared once in components/prototype/variants.ts.
 * See CONTEXT.md + docs/brand/fenchem-brand-book.md for the design contract.
 * The folded-in editorial landing page is preserved at the `landing-v1-editorial` tag.
 */

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { variant: VariantKey } => {
    const v = search.variant;
    return {
      variant: VARIANT_KEYS.includes(v as VariantKey) ? (v as VariantKey) : DEFAULT_VARIANT,
    };
  },
  component: HomeComponent,
});

function HomeComponent() {
  const { variant } = Route.useSearch();
  const Active = VARIANTS.find((v) => v.key === variant)?.Component;
  return (
    <>
      <Suspense fallback={null}>{Active ? <Active /> : null}</Suspense>
      <PrototypeSwitcher current={variant} />
    </>
  );
}
