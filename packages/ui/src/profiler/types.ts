export interface ComponentRenderMetric {
  count: number;
  totalTimeMs: number;
  wasted: number;
  lastRenderTimeMs?: number;
}

export interface VariantMetric {
  renderCount: number;
  lastRenderTimeMs: number;
}

export interface ProfilerSnapshot {
  enabled: boolean;
  adapter: "react-scan" | "fallback" | "none";
  timestamp: number;
  renders: Record<string, ComponentRenderMetric>;
  variants: Record<string, VariantMetric>;
}

export interface ProfilerAdapter {
  name: "react-scan" | "fallback";
  init(): Promise<void>;
  getSnapshot(): ProfilerSnapshot;
  recordRender(componentName: string, durationMs?: number, wasted?: boolean): void;
  recordVariant(variantKey: string, durationMs?: number): void;
}
