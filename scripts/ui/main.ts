import { align } from "./align";
import { ADVANCE_MS, PAGE_EPOCH, withBrowser } from "./browser";
import type { Command, Plan } from "./command";
import { diff } from "./diff";
import { resolveServer, withDevServer, type DevServer } from "./server";
import { shot } from "./shot";
import { snap } from "./snap";

const COMMANDS: Record<string, Command> = { shot, snap, diff, align };

const USAGE = `Usage: bun run ui <command> [targets] [options]

Renders dev-server pages in headless system Chrome and checks them. A target
is a dev-server path such as "/?variant=oos1&page=about", or a full URL.
The dev-server URL comes from portless. The CLI confirms that the server runs
from this checkout; when another checkout holds that URL, it uses one named
after this checkout's folder. A server it finds down, it starts and stops.
Outputs and baselines live in .cache/ui of this checkout.

Commands:
${Object.entries(COMMANDS)
  .map(([name, command]) => `  ${name.padEnd(7)}${command.summary}`)
  .join("\n")}

Every command takes:
  --dry-run   print the server it would use and what it would render, then
              exit without Chrome
  --help      print the command's own options

Every render is red when the page throws, logs a console error, answers an
error status, or scrolls sideways. Errors and overflow count only for content
the capture loaded; --full scrolls the whole page first. Pages run on a
virtual clock that starts at ${new Date(PAGE_EPOCH).toISOString()} and advances a fixed
${ADVANCE_MS / 1000}s after load and after scrolling, so timers, carousels, and dates render the
same on every run.
Exits 0 when green, 1 when red, and 2 when it cannot measure.`;

const message = (error: unknown) => (error instanceof Error ? error.message : String(error));

export async function main(args: string[]) {
  const [name, ...rest] = args;
  if (name === undefined || name === "--help" || name === "-h") {
    console.log(USAGE);
    return 0;
  }
  const command = Object.hasOwn(COMMANDS, name) ? COMMANDS[name] : undefined;
  if (!command) {
    console.error(`Unknown command "${name}".\n\n${USAGE}`);
    return 2;
  }
  if (rest.includes("--help") || rest.includes("-h")) {
    console.log(command.usage);
    return 0;
  }

  let server: DevServer;
  try {
    server = await resolveServer();
  } catch (error) {
    console.error(`cannot measure: ${message(error)}`);
    return 2;
  }

  let plan: Plan;
  try {
    plan = command.plan(
      rest.filter((arg) => arg !== "--dry-run"),
      server.origin,
    );
  } catch (error) {
    console.error(`${message(error)}\nRun "bun run ui ${name} --help" for its options.`);
    return 2;
  }

  if (rest.includes("--dry-run")) {
    const state = server.start
      ? `down; a run would start it with: ${server.start.join(" ")}`
      : "up";
    console.log(`dev server  ${server.origin}  ${state}`);
    if (server.note) console.log(`dev server  ${server.note}`);
    for (const step of plan.steps) console.log(step);
    return 0;
  }

  try {
    const red = await withDevServer(server, () => withBrowser(plan.run));
    console.log(red ? "red" : "green");
    return red ? 1 : 0;
  } catch (error) {
    console.error(`cannot measure: ${message(error)}`);
    return 2;
  }
}
