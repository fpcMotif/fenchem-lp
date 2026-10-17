import { SearchProvider } from "./compat/router";
import { VariantOOS1 } from "./app/components/prototype/variant-oos1/index";

// Canary route: the same `/?variant=oos1[&page=products]` URL the React app serves.
export function App(props: { search: Record<string, string | undefined> }) {
  return (
    <SearchProvider search={props.search}>
      <VariantOOS1 />
    </SearchProvider>
  );
}
