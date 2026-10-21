import { createContext, createSignal, useContext, type Accessor, type JSX } from "solid-js";
import { isServer } from "solid-js/web";

// Stand-in for TanStack Router's `useSearch({ strict: false })`: the worker passes
// the request's search params in, the client reads `location.search`. Values are
// reactive so popstate/pushState-driven views stay in sync.
type Search = Record<string, string | undefined>;

const SearchContext = createContext<Accessor<Search>>(() => ({}));

export function SearchProvider(props: { search: Search; children: JSX.Element }) {
  const [search, setSearch] = createSignal<Search>(props.search);
  if (!isServer) {
    const read = () => setSearch(Object.fromEntries(new URLSearchParams(window.location.search)));
    window.addEventListener("popstate", read);
  }
  return <SearchContext.Provider value={search}>{props.children}</SearchContext.Provider>;
}

/** Returns an accessor: `const search = useSearch(); search().page`. */
export function useSearch(): Accessor<Search> {
  return useContext(SearchContext);
}
