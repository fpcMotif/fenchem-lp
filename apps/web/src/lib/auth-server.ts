import { convexBetterAuthReactStart } from "@convex-dev/better-auth/react-start";
import { env } from "@fenchem-lp/env/web";

export const { handler, getToken } = convexBetterAuthReactStart({
  convexUrl: env.VITE_CONVEX_URL,
  convexSiteUrl: env.VITE_CONVEX_SITE_URL,
});
