import alchemy from "alchemy";
import { TanStackStart } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("fenchem-lp");

export const web = await TanStackStart("web", {
  cwd: "../../apps/web",
});

console.log(`Web    -> ${web.url}`);

await app.finalize();
