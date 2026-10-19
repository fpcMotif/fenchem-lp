import { defineConfig, devices } from "@playwright/test";

import { resolveServer } from "../../scripts/ui/server";

const server = await resolveServer();
if (server.note) console.log(`dev server  ${server.note}`);
const baseURL = server.origin;

export default defineConfig({
  testDir: "./e2e/prototypes",
  timeout: 15_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL,
    ignoreHTTPSErrors: true,
    trace: "retain-on-failure",
  },
  webServer: server.start && {
    command: server.start.join(" "),
    url: baseURL,
    ignoreHTTPSErrors: true,
    timeout: 120_000,
    gracefulShutdown: { signal: "SIGTERM", timeout: 15_000 },
  },
  projects: [
    {
      name: "hydration",
      testMatch: "hydration.spec.ts",
      fullyParallel: true,
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "desktop",
      testIgnore: "hydration.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      testIgnore: "hydration.spec.ts",
      use: {
        ...devices["Pixel 7"],
        channel: "chrome",
      },
    },
  ],
});
