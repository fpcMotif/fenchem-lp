// The slice names `React.MouseEvent` without importing React.
declare namespace React {
  type MouseEvent<T = Element> = globalThis.MouseEvent & { currentTarget: T };
}
