import type { ProfilerAdapter, ProfilerSnapshot } from "./types";
import { isProfilerEnabled } from "./activation";
import { FallbackProfilerAdapter } from "./fallback-adapter";
import { ReactScanAdapter } from "./react-scan-adapter";

export type {
  ProfilerSnapshot,
  ProfilerAdapter,
  ComponentRenderMetric,
  VariantMetric,
} from "./types";
export { isProfilerEnabled } from "./activation";

let activeAdapter: ProfilerAdapter | null = null;
let initialized = false;

export async function initProfiler(
  options: {
    adapter?: "react-scan" | "fallback" | "auto";
  } = {},
): Promise<ProfilerAdapter | null> {
  if (!isProfilerEnabled()) {
    return null;
  }

  if (initialized && activeAdapter) {
    return activeAdapter;
  }

  const choice = options.adapter || "auto";
  if (choice === "fallback") {
    activeAdapter = new FallbackProfilerAdapter();
  } else {
    // "react-scan" or "auto"
    activeAdapter = new ReactScanAdapter();
  }

  await activeAdapter.init();
  initialized = true;

  if (typeof window !== "undefined") {
    const win = window as unknown as {
      __PROFILER_SNAPSHOT__?: ProfilerSnapshot;
      __GET_PROFILER_SNAPSHOT__?: () => ProfilerSnapshot;
    };
    win.__GET_PROFILER_SNAPSHOT__ = () => getProfilerSnapshot();
    win.__PROFILER_SNAPSHOT__ = activeAdapter.getSnapshot();
  }

  return activeAdapter;
}

export function getProfilerSnapshot(): ProfilerSnapshot {
  if (!activeAdapter || !isProfilerEnabled()) {
    return {
      enabled: false,
      adapter: "none",
      timestamp: 0,
      renders: {},
      variants: {},
    };
  }
  const snapshot = activeAdapter.getSnapshot();
  if (typeof window !== "undefined") {
    const win = window as unknown as { __PROFILER_SNAPSHOT__?: ProfilerSnapshot };
    win.__PROFILER_SNAPSHOT__ = snapshot;
  }
  return snapshot;
}

export function recordComponentRender(componentName: string, durationMs = 0, wasted = false): void {
  if (activeAdapter) {
    activeAdapter.recordRender(componentName, durationMs, wasted);
  }
}

export function recordVariantRender(variantKey: string, durationMs = 0): void {
  if (activeAdapter) {
    activeAdapter.recordVariant(variantKey, durationMs);
  }
}
