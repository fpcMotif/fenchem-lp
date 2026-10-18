import { flush, createRoot } from "solid-js";
import { render as mount, type JSX } from "@solidjs/web";
import { fireEvent as domFireEvent, getQueriesForElement, prettyDOM } from "@testing-library/dom";

export { screen, waitFor, within } from "@testing-library/dom";

/** Testing Library's fireEvent, flushing Solid's batched writes after each event (like act). */
export const fireEvent = new Proxy(domFireEvent, {
  apply(target, thisArg, args: Parameters<typeof domFireEvent>) {
    const result = Reflect.apply(target, thisArg, args);
    flush();
    return result;
  },
  get(target, key: keyof typeof domFireEvent) {
    const event = target[key];
    if (typeof event !== "function") return event;
    return (...args: unknown[]) => {
      const result = (event as (...a: unknown[]) => boolean)(...args);
      flush();
      return result;
    };
  },
}) as typeof domFireEvent;

// Re-keyed so the bound queries type as properties; destructuring them is safe.
type Queries = ReturnType<typeof getQueriesForElement>;
type BoundQueries = { [K in keyof Queries as K]: Queries[K] };

type Mounted = { container: HTMLElement; dispose: () => void };
const mounted = new Set<Mounted>();

/** Mounts a Solid tree into a fresh container on document.body (Testing Library style). */
export function render(
  ui: () => JSX.Element,
  options: { container?: HTMLElement } = {},
): { container: HTMLElement; unmount: () => void; debug: () => void } & BoundQueries {
  const container = options.container ?? document.body.appendChild(document.createElement("div"));
  const dispose = mount(ui, container);
  flush();
  const entry = { container, dispose };
  mounted.add(entry);
  return {
    container,
    unmount: () => {
      dispose();
      mounted.delete(entry);
    },
    debug: () => console.log(prettyDOM(container)),
    ...getQueriesForElement(container),
  };
}

/** Runs a hook-style function inside a reactive root and returns its result. */
export function renderHook<T>(hook: () => T) {
  let dispose!: () => void;
  const result = createRoot((rootDispose) => {
    dispose = rootDispose;
    return hook();
  });
  flush();
  return { result, unmount: () => dispose() };
}

/** Applies a write (or any update) and flushes pending reactive work to the DOM. */
export async function act(update: () => unknown) {
  await update();
  flush();
}

export function cleanup() {
  for (const entry of mounted) {
    entry.dispose();
    if (entry.container.parentNode === document.body) entry.container.remove();
  }
  mounted.clear();
}
