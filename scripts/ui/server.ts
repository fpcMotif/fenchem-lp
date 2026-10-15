import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, openSync, readFileSync, realpathSync } from "node:fs";
import http from "node:http";
import https from "node:https";
import { basename, join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";

import { OUT_ROOT, slug } from "./command";

const START_TIMEOUT_MS = 90_000;

export const WEB_DIR = fileURLToPath(new URL("../../apps/web/", import.meta.url));

export type DevServer = { webDir: string; origin: string; start?: string[]; note?: string };

const portless = (webDir: string, args: string[]) =>
  execFileSync("bun", ["portless", ...args], { cwd: webDir, encoding: "utf8" });

function isUp(origin: string) {
  const { request } = origin.startsWith("https:") ? https : http;
  return new Promise<boolean>((resolve) => {
    const probe = request(origin, { rejectUnauthorized: false, timeout: 3000 }, (response) => {
      response.resume();
      resolve((response.statusCode ?? 500) < 400);
    });
    probe.on("timeout", () => probe.destroy());
    probe.on("error", () => resolve(false));
    probe.end();
  });
}

function servedFrom(webDir: string, origin: string) {
  const host = new URL(origin).host;
  const route = portless(webDir, ["list"])
    .split("\n")
    .find((line) => line.includes(`//${host} `));
  const pid = route?.match(/\(pid (\d+)\)/)?.[1];
  if (!pid) throw new Error(`cannot tell which checkout serves ${origin}: portless lists no pid`);
  const cwd = execFileSync("lsof", ["-a", "-p", pid, "-d", "cwd", "-Fn"], { encoding: "utf8" })
    .split("\n")
    .find((line) => line.startsWith("n"))
    ?.slice(1);
  if (!cwd) throw new Error(`cannot read the folder of ${origin}'s server, pid ${pid}`);
  return realpathSync(cwd);
}

export async function resolveServer(webDir = WEB_DIR): Promise<DevServer> {
  const home = realpathSync(webDir);
  const shared: string = JSON.parse(readFileSync(join(webDir, "package.json"), "utf8")).portless;
  const own = slug(basename(realpathSync(join(webDir, "../..")))).toLowerCase();
  const candidates = [
    { name: shared, start: ["bun", "run", "dev:portless"] },
    { name: own, start: ["bun", "portless", "run", "--name", own] },
  ];
  const taken: string[] = [];
  for (const { name, start } of candidates) {
    const origin = portless(webDir, ["get", name]).trim();
    const note = taken.length ? `${taken.join("; ")}, so this checkout uses ${origin}` : undefined;
    if (!(await isUp(origin))) return { webDir, origin, start, note };
    const owner = servedFrom(webDir, origin);
    if (owner === home) return { webDir, origin, note };
    taken.push(`${origin} serves ${owner}`);
  }
  throw new Error(`${taken.join("; ")}; neither serves ${home}`);
}

export async function withDevServer<T>(server: DevServer, run: () => Promise<T>): Promise<T> {
  if (server.note) console.log(`dev server  ${server.note}`);
  const [command, ...args] = server.start ?? [];
  if (!command) return run();

  mkdirSync(OUT_ROOT, { recursive: true });
  const log = join(OUT_ROOT, "dev-server.log");
  const output = openSync(log, "w");
  const child = spawn(command, args, {
    cwd: server.webDir,
    detached: true,
    stdio: ["ignore", output, output],
  });
  const stop = () => {
    if (!child.pid || child.exitCode !== null || child.signalCode !== null) return;
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch (error) {
      if (!(error instanceof Error && "code" in error && error.code === "ESRCH")) throw error;
    }
  };
  const onSignal = (signal: NodeJS.Signals) => {
    stop();
    process.exit(signal === "SIGINT" ? 130 : 143);
  };
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);
  console.log(`dev server  ${server.origin} is down; starting it (log: ${log})`);

  const started = performance.now();
  try {
    while (!(await isUp(server.origin))) {
      if (child.exitCode !== null || child.signalCode !== null)
        throw new Error(`dev server exited (${child.exitCode ?? child.signalCode}); see ${log}`);
      if (performance.now() - started > START_TIMEOUT_MS)
        throw new Error(`dev server not up after ${START_TIMEOUT_MS / 1000}s; see ${log}`);
      await sleep(500);
    }
    console.log(`dev server  up in ${((performance.now() - started) / 1000).toFixed(1)}s`);
    return await run();
  } finally {
    process.off("SIGINT", onSignal);
    process.off("SIGTERM", onSignal);
    stop();
  }
}
