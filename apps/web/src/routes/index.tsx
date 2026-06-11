import { createFileRoute } from "@tanstack/react-router";

import { PrototypeSwitcher, type VariantKey } from "@/components/prototype/prototype-switcher";
import { VariantA } from "@/components/prototype/variant-a";
import { VariantB } from "@/components/prototype/variant-b";
import { VariantC } from "@/components/prototype/variant-c";

/*
 * PROTOTYPE — three radically different Fenchem landing pages on this route,
 * switchable via ?variant= (a|b|c) and the floating bottom bar.
 * See src/components/prototype/PROTOTYPE-BRIEF.md for the design contract.
 */
export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { variant: VariantKey } => ({
    variant: search.variant === "b" || search.variant === "c" ? search.variant : "a",
  }),
  component: HomeComponent,
});

function HomeComponent() {
  const { variant } = Route.useSearch();
  return (
    <>
      {variant === "a" && <VariantA />}
      {variant === "b" && <VariantB />}
      {variant === "c" && <VariantC />}
      <PrototypeSwitcher current={variant} />
    </>
  );
}
