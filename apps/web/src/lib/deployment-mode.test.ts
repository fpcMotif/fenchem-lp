import { describe, expect, test } from "vitest";

import { AUTH_ROUNDTRIP_BUDGET_MS, AUTH_TOKEN_BUDGET_MS, deploymentMode } from "./deployment-mode";

describe("deploymentMode", () => {
  test.each([
    ["https://placeholder-prototype.convex.cloud", "preview", true, "the real .env preview URL"],
    [
      "https://acute-mallard-123.convex.cloud",
      "live",
      false,
      "real deployment (covers .includes false arm)",
    ],
    [undefined, "preview", true, "covers the dead !url arm; totality"],
    ["", "preview", true, "same !url arm; documents intent"],
    [
      "https://Placeholder-Demo.convex.cloud",
      "live",
      false,
      "BEHAVIOR PIN: case-sensitive .includes — mixed-case must stay live",
    ],
    [
      "https://placeholderbank.convex.cloud",
      "preview",
      true,
      "documented false-positive footgun, preserved deliberately",
    ],
    ["https://app.convex.cloud/has-placeholder/x", "preview", true, "substring mid-path"],
  ] as const)(
    "url=%s => mode=%s, skipAuth=%s (%s)",
    (url, expectedMode, expectedSkipAuth, _why) => {
      const verdict = deploymentMode(url);
      expect(verdict.mode).toBe(expectedMode);
      expect(verdict.skipAuth).toBe(expectedSkipAuth);
      // invariant: skipAuth === (mode === "preview")
      expect(verdict.skipAuth).toBe(verdict.mode === "preview");
    },
  );
});

describe("budget constants", () => {
  test("AUTH_TOKEN_BUDGET_MS is exactly 1200", () => {
    expect(AUTH_TOKEN_BUDGET_MS).toBe(1200);
  });

  test("AUTH_ROUNDTRIP_BUDGET_MS is exactly 1500", () => {
    expect(AUTH_ROUNDTRIP_BUDGET_MS).toBe(1500);
  });

  test("inner token budget is strictly less than outer round-trip budget (nesting invariant)", () => {
    expect(AUTH_TOKEN_BUDGET_MS < AUTH_ROUNDTRIP_BUDGET_MS).toBe(true);
  });
});
