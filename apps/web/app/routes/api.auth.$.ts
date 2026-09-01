import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { handler } from "@/lib/auth-server";

export async function loader({ request }: LoaderFunctionArgs) {
  return handler(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return handler(request);
}
