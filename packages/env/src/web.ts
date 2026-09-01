/*
 * Client env — validated by hand instead of zod + @t3-oss/env-core. This module
 * is imported by the browser entry (router.tsx), and the schema stack it pulled
 * in was the single largest item in the client bundle (~254 kB of zod for two
 * URL checks). Behavior is kept identical: empty strings count as unset, and an
 * invalid/missing value throws at module init with the offending name.
 */
const runtimeEnv = (import.meta as unknown as { env: Record<string, string | undefined> }).env;

function requiredUrl(name: "VITE_CONVEX_URL" | "VITE_CONVEX_SITE_URL"): string {
  const raw = runtimeEnv[name];
  const value = raw === "" ? undefined : raw;
  if (value === undefined || !URL.canParse(value)) {
    throw new Error(
      `❌ Invalid environment variable: ${name} must be a URL, got ${JSON.stringify(raw)}`,
    );
  }
  return value;
}

export const env = {
  VITE_CONVEX_URL: requiredUrl("VITE_CONVEX_URL"),
  VITE_CONVEX_SITE_URL: requiredUrl("VITE_CONVEX_SITE_URL"),
} as const;
