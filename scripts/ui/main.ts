import { align } from "./align";
import { ADVANCE_MS, PAGE_EPOCH, withBrowser } from "./browser";
import { message, type Command, type Plan } from "./command";
import { diff } from "./diff";
import { review } from "./review";
import { resolveServer, withDevServer, type DevServer } from "./server";
import { shot } from "./shot";
import { snap } from "./snap";

const COMMANDS: Record<string, Command> = { shot, snap, diff, align, review };

const USAGE = `Usage: bun run ui <command> [targets] [options]

Renders dev-server pages in headless system Chrome and checks them. A target
is a dev-server path such as "/?variant=oos1&page=about", or a full URL.
The dev-server URL comes from portless. The CLI confirms that the server runs
from this checkout; when another checkout holds that URL, it uses one named
after this checkout's folder. A server it finds down, it starts and stops.
A server from this checkout that portless still lists but that does not
answer within 15s counts as hung: the CLI stops it and starts a fresh one.
It leaves another checkout's hung server alone and uses the next URL.
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
Targets run four at a time, and each result prints as soon as it finishes,
with a progress count. A page gets 60s to load. A target that fails to load
or render prints CANNOT MEASURE; the rest of the batch still runs and reports.
The last line gives the verdict, the run time, and the CLI's peak memory.
Exits 0 when green, 1 when red, and 2 when it cannot measure any target.`;

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

  let server: DevServer | undefined;
  try {
    if (!command.offline) server = await resolveServer();
  } catch (error) {
    console.error(`cannot measure: ${message(error)}`);
    return 2;
  }

  let plan: Plan;
  try {
    plan = command.plan(
      rest.filter((arg) => arg !== "--dry-run"),
      server?.origin ?? "",
    );
  } catch (error) {
    console.error(`${message(error)}\nRun "bun run ui ${name} --help" for its options.`);
    return 2;
  }

  if (rest.includes("--dry-run")) {
    if (server) {
      const state = server.start
        ? `${server.hung === undefined ? "down; a run would start it" : `hung (pid ${server.hung}); a run would stop it and start it`} with: ${server.start.join(" ")}`
        : "up";
      console.log(`dev server  ${server.origin}  ${state}`);
      if (server.note) console.log(`dev server  ${server.note}`);
    }
    for (const step of plan.steps) console.log(step);
    return 0;
  }

  const started = performance.now();
  const cost = () => {
    const seconds = Math.round((performance.now() - started) / 1000);
    const peak = process.resourceUsage().maxRSS / 1024 / 1024;
    return `in ${Math.floor(seconds / 60)}m ${seconds % 60}s, peak memory ${peak.toFixed(1)} GB`;
  };
  try {
    const browse = () => withBrowser(plan.run);
    const red = await (server ? withDevServer(server, browse) : browse());
    console.log(`${red ? "red" : "green"}  ${cost()}`);
    return red ? 1 : 0;
  } catch (error) {
    console.error(`cannot measure: ${message(error)}\ncannot measure  ${cost()}`);
    return 2;
  }
}
