import { setTimeout as sleep } from "node:timers/promises";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { measureEach } from "./command";

function gate() {
  let open = () => {};
  const opened = new Promise<void>((resolve) => (open = resolve));
  return { opened, open };
}

describe("measureEach", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("measures at most four jobs at once", async () => {
    let inFlight = 0;
    let most = 0;
    await measureEach(
      Array.from({ length: 12 }, (_, index) => index),
      String,
      async () => {
        most = Math.max(most, ++inFlight);
        await sleep(5);
        inFlight--;
      },
      () => false,
    );
    expect(most).toBe(4);
  });

  test("reports a job as soon as it finishes, before slower jobs end", async () => {
    const slow = gate();
    const reported: string[] = [];
    const run = measureEach(
      ["slow", "fast"],
      String,
      async (job) => {
        if (job === "slow") await slow.opened;
      },
      (job) => {
        reported.push(job);
        return false;
      },
    );
    await sleep(20);
    expect(reported).toEqual(["fast"]);
    slow.open();
    await run;
    expect(reported).toEqual(["fast", "slow"]);
  });

  test("finishes the batch after a failed job, then throws", async () => {
    const reported: number[] = [];
    const failed: [number, string][] = [];
    const run = measureEach(
      [1, 2, 3],
      String,
      async (job) => {
        if (job === 2) throw new Error("goto: Timeout 60000ms exceeded.\nCall log: ...");
      },
      (job) => {
        reported.push(job);
        return false;
      },
      (job, reason) => failed.push([job, reason]),
    );
    await expect(run).rejects.toThrow("1 of 3 could not be measured (2)");
    expect(reported.sort((a, b) => a - b)).toEqual([1, 3]);
    expect(failed).toEqual([[2, "goto: Timeout 60000ms exceeded."]]);
  });

  test("returns red when any report is red", async () => {
    expect(
      await measureEach(
        [1, 2],
        String,
        async () => {},
        (job) => job === 2,
      ),
    ).toBe(true);
    expect(
      await measureEach(
        [1, 2],
        String,
        async () => {},
        () => false,
      ),
    ).toBe(false);
  });
});
