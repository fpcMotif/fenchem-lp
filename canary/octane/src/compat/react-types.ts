// Type-only shim: React type names the slice uses, mapped onto Octane/DOM types.
import type { OctaneNode } from "octane";

export type ReactNode = OctaneNode;
export type ReactElement = OctaneNode;
export type ComponentType<P = {}> = (props: P) => any;
export type CSSProperties = Record<string, string | number | undefined>;
export type RefObject<T> = { current: T };
export type MutableRefObject<T> = { current: T };
export type Ref<T> = RefObject<T | null> | ((value: T | null) => void) | null;
export type KeyboardEvent<_T = Element> = globalThis.KeyboardEvent & { currentTarget: _T };
export type MouseEvent<_T = Element> = globalThis.MouseEvent & { currentTarget: _T };
export type PointerEvent<_T = Element> = globalThis.PointerEvent & { currentTarget: _T };
export type FocusEvent<_T = Element> = globalThis.FocusEvent & { currentTarget: _T };
export type ChangeEvent<_T = Element> = Event & { currentTarget: _T; target: _T };
export type FormEvent<_T = Element> = Event & { currentTarget: _T };
export type SyntheticEvent<_T = Element> = Event & { currentTarget: _T };
export type HTMLAttributes<_T = Element> = Record<string, any>;
export type ComponentProps<_T> = Record<string, any>;
export type ComponentPropsWithoutRef<_T> = Record<string, any>;
export type Dispatch<A> = (value: A) => void;
export type SetStateAction<S> = S | ((prev: S) => S);
export type PropsWithChildren<P = {}> = P & { children?: OctaneNode };
export type AnimationEvent<_T = Element> = globalThis.AnimationEvent & { currentTarget: _T };
export type SubmitEvent<_T = Element> = globalThis.SubmitEvent & { currentTarget: _T };
export type KeyboardEventHandler<T = Element> = (event: KeyboardEvent<T>) => void;
