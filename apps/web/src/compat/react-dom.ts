import { flush } from "solid-js";
import { useHead } from "@solidjs/web";

/** react-dom `preinit(href, { as: "style" })`: a stylesheet link in the document head. */
export function preinit(href: string, _options: { as: "style" }) {
  useHead({ tag: "link", props: { rel: "stylesheet", href }, key: `preinit:${href}` });
}

/** react-dom `preload`: a preload link in the document head. */
export function preload(
  href: string,
  options: { as: string; fetchPriority?: "high" | "low" | "auto"; type?: string },
) {
  useHead({
    tag: "link",
    props: {
      rel: "preload",
      href,
      as: options.as,
      fetchpriority: options.fetchPriority,
      type: options.type,
    },
    key: `preload:${href}`,
  });
}

/** react-dom `flushSync`: run the update, then apply every pending write to the DOM now. */
export function flushSync<T>(update: () => T): T {
  const result = update();
  flush();
  return result;
}
