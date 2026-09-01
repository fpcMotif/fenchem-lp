/*
 * Client & SSR env — validated by hand instead of zod + @t3-oss/env-core.
 * Uses placeholder URLs when unconfigured in preview/test environments so
 * the landing preview and test suites never throw or hang on dead deployments.
 */
function getEnvValue(name: string): string | undefined {
  if (
    typeof import.meta !== "undefined" &&
    (import.meta as unknown as { env?: Record<string, string | undefined> }).env
  ) {
    const metaVal = (import.meta as unknown as { env: Record<string, string | undefined> }).env[
      name
    ];
    if (metaVal !== undefined && metaVal !== "") return metaVal;
  }
  if (typeof process !== "undefined" && process.env) {
    const procVal = process.env[name];
    if (procVal !== undefined && procVal !== "") return procVal;
  }
  return undefined;
}

const PLACEHOLDER_URLS = {
  VITE_CONVEX_URL: "https://placeholder.convex.cloud",
  VITE_CONVEX_SITE_URL: "https://placeholder.convex.site",
} as const;

function requiredUrl(name: "VITE_CONVEX_URL" | "VITE_CONVEX_SITE_URL"): string {
  const raw = getEnvValue(name);
  if (raw === undefined) {
    return PLACEHOLDER_URLS[name];
  }
  if (!URL.canParse(raw)) {
    throw new Error(
      `❌ Invalid environment variable: ${name} must be a URL, got ${JSON.stringify(raw)}`,
    );
  }
  return raw;
}

export const env = {
  VITE_CONVEX_URL: requiredUrl("VITE_CONVEX_URL"),
  VITE_CONVEX_SITE_URL: requiredUrl("VITE_CONVEX_SITE_URL"),
} as const;
