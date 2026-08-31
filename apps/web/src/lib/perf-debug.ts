// One-line load-time signal in the browser console — works identically on `bun run dev`,
// `vp preview`, and the deployed Cloudflare Worker, because it's pure client-side JS
// reading the browser's own Performance API. Nothing is sent anywhere; it only prints
// in whichever browser loaded the page, so it needs no wiring per environment and no
// separate server-side probe.
//
// This is deliberately NOT the same thing as perf/README.md's "explicitly out of
// scope" items (deployed Cloudflare Worker cold-start via Server-Timing, real-user
// web-vitals RUM collection) — those transmit data to a collector and need a live-
// deployment decision. This is a local console.log a developer reads by opening
// devtools on whichever URL they're looking at; it collects and transmits nothing.
//
// Rendered as a raw inline <script> in __root.tsx's <head> (not a React effect) so it
// starts before hydration and the PerformanceObserver's `buffered: true` catches paint/
// layout-shift entries that fired before this script itself ran.
export const PERF_DEBUG_SCRIPT = `(function () {
  try {
    var lcp = 0;
    var cls = 0;
    try {
      new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        var last = entries[entries.length - 1];
        if (last) lcp = last.renderTime || last.loadTime || 0;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {}
    try {
      new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (entry) {
          if (!entry.hadRecentInput) cls += entry.value;
        });
      }).observe({ type: "layout-shift", buffered: true });
    } catch (e) {}

    window.addEventListener("load", function () {
      // LCP/CLS can still update briefly after load; give them a moment to settle.
      setTimeout(function () {
        var nav = performance.getEntriesByType("navigation")[0];
        var paintEntries = performance.getEntriesByType("paint");
        var fcpEntry = null;
        for (var i = 0; i < paintEntries.length; i++) {
          if (paintEntries[i].name === "first-contentful-paint") fcpEntry = paintEntries[i];
        }
        var ttfb = nav ? Math.round(nav.responseStart) : null;
        var load = nav ? Math.round(nav.loadEventEnd) : Math.round(performance.now());
        var fcp = fcpEntry ? Math.round(fcpEntry.startTime) : null;
        console.log(
          "[fenchem:perf] load " + load + "ms" +
          " \\u00b7 TTFB " + (ttfb === null ? "\\u2014" : ttfb + "ms") +
          " \\u00b7 FCP " + (fcp === null ? "\\u2014" : fcp + "ms") +
          " \\u00b7 LCP " + Math.round(lcp) + "ms" +
          " \\u00b7 CLS " + cls.toFixed(3) +
          " \\u00b7 " + location.pathname + location.search
        );
      }, 500);
    });
  } catch (e) {
    // Never let perf debug logging break the page.
  }
})();`;
