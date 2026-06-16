// apps/web/src/lib/deployment-mode.ts
//
// ONE home for the preview-vs-live deployment decision and the two auth budgets
// that guard the landing-page preview path.
//
// The landing-page preview runs with NO real Convex backend (apps/web/.env holds
// placeholder URLs). When the backend is a placeholder we MUST skip all Convex/auth
// wiring, or fetches hang ~30s behind a proxy against a dead deployment.
//
// Pure, synchronous, ZERO imports (no env/React/Convex/zod) so this module is
// trivially unit-testable and cannot change SSR/client module-load timing.

/** The two deployment shapes the app can run in. */
export type DeploymentMode = "preview" | "live";

/**
 * The preview-vs-live verdict for a given Convex client URL.
 * `skipAuth === (mode === "preview")` is an invariant: both fields are set
 * together by the single constructor below, so they cannot drift apart.
 */
export interface DeploymentVerdict {
  readonly mode: DeploymentMode;
  readonly skipAuth: boolean;
}

/**
 * The single source of truth for the case-sensitive placeholder marker.
 * Module-private: the rule is exposed only through `deploymentMode()`.
 */
const PLACEHOLDER_CONVEX_MARKER = "placeholder";

/**
 * THE decision. Pure: Convex client URL -> verdict.
 *
 * Rule (FROZEN — must not change): preview <=> (!url || url.includes("placeholder")),
 * a CASE-SENSITIVE substring match. `undefined`/`""` are treated as preview.
 *
 * NOTE: in production `convexClient.url` is always a valid non-empty string
 * (router.tsx throws if VITE_CONVEX_URL is unset; packages/env validates z.url();
 * ConvexReactClient.url is typed `get url(): string`), so the `!url` disjunct is
 * unreachable at the real call sites. It is kept (a) so the function is total over
 * its declared `string | undefined` input — call sites need no non-null assertion —
 * and (b) as documented defense-in-depth. It is reached only from the colocated unit test.
 *
 * NOTE: ConvexReactClient.url may be CANONICALIZED, so the classified string can
 * differ from the raw VITE_CONVEX_URL; harmless here (the "placeholder" substring
 * survives trivial canonicalization).
 */
export function deploymentMode(url: string | undefined): DeploymentVerdict {
  const skipAuth = !url || url.includes(PLACEHOLDER_CONVEX_MARKER);
  return { mode: skipAuth ? "preview" : "live", skipAuth };
}

/**
 * Inner budget: caps getToken() inside the getAuth server fn. url-INDEPENDENT
 * (getAuth has no url in scope). Exported as a constant, NOT a field on the
 * per-url verdict, because a URL does not determine a token-fetch budget.
 */
export const AUTH_TOKEN_BUDGET_MS = 1200;

/**
 * Outer budget: backstop on the whole getAuth() round-trip in beforeLoad,
 * covering server-fn RPC/transport overhead. url-INDEPENDENT.
 *
 * Nesting invariant (FROZEN): AUTH_TOKEN_BUDGET_MS (1200) < AUTH_ROUNDTRIP_BUDGET_MS (1500).
 * The inner cap normally resolves first; the outer ~300ms slack backstops transport.
 * Collapsing these to one number CHANGES runtime behavior and is forbidden.
 */
export const AUTH_ROUNDTRIP_BUDGET_MS = 1500;
