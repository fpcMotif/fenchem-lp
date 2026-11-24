import { existsSync } from "node:fs";

const SYSTEM_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export const chromeChannel: "chrome" | undefined = existsSync(SYSTEM_CHROME) ? "chrome" : undefined;
