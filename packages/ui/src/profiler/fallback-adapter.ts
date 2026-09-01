import type {
  ProfilerAdapter,
  ProfilerSnapshot,
  ComponentRenderMetric,
  VariantMetric,
} from "./types";

export class FallbackProfilerAdapter implements ProfilerAdapter {
  name = "fallback" as const;
  private renders = new Map<string, ComponentRenderMetric>();
  private variants = new Map<string, VariantMetric>();
  private startTime = Date.now();

  async init(): Promise<void> {
    this.startTime = Date.now();
  }

  recordRender(componentName: string, durationMs = 0, wasted = false): void {
    const existing = this.renders.get(componentName) || {
      count: 0,
      totalTimeMs: 0,
      wasted: 0,
      lastRenderTimeMs: 0,
    };
    existing.count += 1;
    existing.totalTimeMs += durationMs;
    existing.lastRenderTimeMs = durationMs;
    if (wasted) {
      existing.wasted += 1;
    }
    this.renders.set(componentName, existing);
  }

  recordVariant(variantKey: string, durationMs = 0): void {
    const existing = this.variants.get(variantKey) || {
      renderCount: 0,
      lastRenderTimeMs: 0,
    };
    existing.renderCount += 1;
    existing.lastRenderTimeMs = durationMs;
    this.variants.set(variantKey, existing);
  }

  getSnapshot(): ProfilerSnapshot {
    const rendersRecord: Record<string, ComponentRenderMetric> = {};
    for (const [k, v] of this.renders.entries()) {
      rendersRecord[k] = { ...v };
    }
    const variantsRecord: Record<string, VariantMetric> = {};
    for (const [k, v] of this.variants.entries()) {
      variantsRecord[k] = { ...v };
    }
    return {
      enabled: true,
      adapter: "fallback",
      timestamp: Date.now() - this.startTime,
      renders: rendersRecord,
      variants: variantsRecord,
    };
  }
}
