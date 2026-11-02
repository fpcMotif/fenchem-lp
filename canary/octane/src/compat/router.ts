// Stand-in for the one @tanstack/react-router API the OOS1 slice uses:
// `useSearch({ strict: false })`. The page URL comes from the Octane route props
// (server) and is provided through SearchContext so SSR and hydration agree.
import { createContext, useContext } from "octane";

export type SearchParams = Record<string, string | undefined>;

export const SearchContext = createContext<SearchParams>({});

export function parseSearch(url: string): SearchParams {
  const query = url.includes("?") ? url.slice(url.indexOf("?") + 1).split("#")[0] : "";
  return Object.fromEntries(new URLSearchParams(query));
}

export function useSearch(_options?: { strict?: boolean }): SearchParams {
  return useContext(SearchContext);
}
