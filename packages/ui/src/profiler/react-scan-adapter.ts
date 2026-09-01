import type { ProfilerAdapter, ProfilerSnapshot } from "./types";
import { FallbackProfilerAdapter } from "./fallback-adapter";

export class ReactScanAdapter implements ProfilerAdapter {
  name = "react-scan" as const;
  private fallback = new FallbackProfilerAdapter();
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    await this.fallback.init();

    if (typeof window === "undefined") return;

    try {
      // Exception (ts-no-dynamic-import): react-scan must be loaded only on runtime flag activation to prevent shipping 0-flag overhead
      const scanModule = await import("react-scan");
      if (scanModule && typeof scanModule.scan === "function") {
        scanModule.scan({
          enabled: true,
          log: false,
          showToolbar: true,
        });
      }
    } catch {
      // Graceful fallback to render-counting adapter if react-scan is not available in environment
    }
  }

  recordRender(componentName: string, durationMs = 0, wasted = false): void {
    this.fallback.recordRender(componentName, durationMs, wasted);
  }

  recordVariant(variantKey: string, durationMs = 0): void {
    this.fallback.recordVariant(variantKey, durationMs);
  }

  getSnapshot(): ProfilerSnapshot {
    const snap = this.fallback.getSnapshot();
    return {
      ...snap,
      adapter: "react-scan",
    };
  }
}
