import { createFileRoute } from "@tanstack/react-router";

import { PrototypeSwitcher, type VariantKey } from "@/components/prototype/prototype-switcher";
import { VariantA } from "@/components/prototype/variant-a";
import { VariantB } from "@/components/prototype/variant-b";
import { VariantC } from "@/components/prototype/variant-c";
import { VariantD } from "@/components/prototype/variant-d";
import { VariantE } from "@/components/prototype/variant-e";
import { VariantF } from "@/components/prototype/variant-f";
import { VariantG } from "@/components/prototype/variant-g";

/*
 * PROTOTYPE — seven Fenchem landing pages on this route, switchable via
 * ?variant= (a..g) and the floating bottom bar / arrow keys.
 * A/B/C: original editorial prototypes. D/E/F/G: green-led brand-book versions.
 * See CONTEXT.md + docs/brand/fenchem-brand-book.md for the design contract.
 * The folded-in editorial landing page is preserved at the `landing-v1-editorial` tag.
 */
const VARIANT_KEYS: VariantKey[] = ["a", "b", "c", "d", "e", "f", "g"];

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { variant: VariantKey } => {
    const v = search.variant;
    return { variant: VARIANT_KEYS.includes(v as VariantKey) ? (v as VariantKey) : "d" };
  },
  component: HomeComponent,
});

function HomeComponent() {
  const { variant } = Route.useSearch();
  return (
    <>
      {variant === "a" && <VariantA />}
      {variant === "b" && <VariantB />}
      {variant === "c" && <VariantC />}
      {variant === "d" && <VariantD />}
      {variant === "e" && <VariantE />}
      {variant === "f" && <VariantF />}
      {variant === "g" && <VariantG />}
      <PrototypeSwitcher current={variant} />
    </>
  );
}
