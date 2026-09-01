import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { LandingPage } from "@/components/landing/landing-page";
import { parseVariantSearch } from "@/lib/variant-search";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchRecord = Object.fromEntries(url.searchParams.entries());
  const variant = parseVariantSearch(searchRecord);
  return json({ variant });
}

export default function IndexRoute() {
  return <LandingPage />;
}
