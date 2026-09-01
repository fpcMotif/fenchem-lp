import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  isProfilerEnabled,
  initProfiler,
  getProfilerSnapshot,
  recordComponentRender,
  recordVariantRender,
} from "@fenchem-lp/ui/profiler";
import type { ProfilerSnapshot } from "@fenchem-lp/ui/profiler";

interface WindowWithProfiler {
  __PROFILER_ENABLED__?: boolean;
  __PROFILER_SNAPSHOT__?: ProfilerSnapshot;
}

describe("Profiler runtime switch and snapshot contract", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    const win = window as unknown as WindowWithProfiler;
    delete win.__PROFILER_ENABLED__;
    delete win.__PROFILER_SNAPSHOT__;
  });

  afterEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("returns false for isProfilerEnabled when query param is absent", () => {
    expect(isProfilerEnabled()).toBe(false);
  });

  it("returns true for isProfilerEnabled when query param ?profiler=1 is present", () => {
    window.history.pushState({}, "", "/?profiler=1");
    expect(isProfilerEnabled()).toBe(true);
  });

  it("returns true when ?profiler=true is present", () => {
    window.history.pushState({}, "", "/?profiler=true");
    expect(isProfilerEnabled()).toBe(true);
  });

  it("returns null on initProfiler when disabled (zero runtime cost)", async () => {
    const adapter = await initProfiler();
    expect(adapter).toBeNull();
    expect(getProfilerSnapshot().enabled).toBe(false);
  });

  it("initializes adapter and records component and variant renders when enabled", async () => {
    window.history.pushState({}, "", "/?profiler=1");
    expect(isProfilerEnabled()).toBe(true);

    const adapter = await initProfiler({ adapter: "fallback" });
    expect(adapter).not.toBeNull();
    expect(adapter?.name).toBe("fallback");

    recordComponentRender("LandingHero", 12.5, false);
    recordComponentRender("LandingHero", 8.2, true);
    recordComponentRender("PrototypeSwitcher", 5.0, false);
    recordVariantRender("j", 42.1);

    const snap = getProfilerSnapshot();
    expect(snap.enabled).toBe(true);
    expect(snap.adapter).toBe("fallback");
    expect(snap.renders.LandingHero.count).toBe(2);
    expect(snap.renders.LandingHero.totalTimeMs).toBe(20.7);
    expect(snap.renders.LandingHero.wasted).toBe(1);
    expect(snap.renders.PrototypeSwitcher.count).toBe(1);
    expect(snap.variants.j.renderCount).toBe(1);
    expect(snap.variants.j.lastRenderTimeMs).toBe(42.1);

    // Verify window global attachment for automation harness
    const win = window as unknown as WindowWithProfiler;
    const globalSnapshot = win.__PROFILER_SNAPSHOT__;
    expect(globalSnapshot).toBeDefined();
    expect(globalSnapshot?.renders.LandingHero.count).toBe(2);
  });
});
