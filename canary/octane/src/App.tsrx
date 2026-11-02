import "virtual:stylex.css";
import { VariantOOS1 } from "@/components/prototype/variant-oos1/index";
import { SearchContext, parseSearch } from "@/compat/router";

// Canary route: the same `/?variant=oos1[&page=products]` URL the React app serves.
export function App(props: { url: string }) @{
  const search = parseSearch(props.url);
  <SearchContext value={search}>
    <VariantOOS1 />
  </SearchContext>
}
