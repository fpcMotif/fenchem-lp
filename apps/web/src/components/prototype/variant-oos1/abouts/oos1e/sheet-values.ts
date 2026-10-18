import { createContext } from "solid-js";

export const StackContext = createContext<{
  readonly reachedIndex: number;
  readonly stacked: boolean;
}>({
  reachedIndex: -1,
  stacked: false,
});
