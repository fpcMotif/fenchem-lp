import { createSignal, onSettled, type Accessor } from "solid-js";

/**
 * React's `useSyncExternalStore` as an accessor. The server and hydration render read
 * `getServerSnapshot` (falling back to `getSnapshot`); the live value takes over once
 * the component has settled on the client, so hydration markup always matches.
 */
export function createExternalStore<T>(
  subscribe: (onChange: () => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T,
): Accessor<T> {
  const [value, setValue] = createSignal<T>(
    (getServerSnapshot ?? getSnapshot)() as Exclude<T, Function>,
    {
      equals: Object.is,
    },
  );
  onSettled(() => {
    const update = () => setValue(() => getSnapshot());
    update();
    return subscribe(update);
  });
  return value;
}
