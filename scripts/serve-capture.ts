import * as path from "node:path";
import * as fs from "node:fs";

const siteDir = path.resolve("docs/workstation-capture/site");
const backupDir = path.resolve("docs/workstation-capture/backup-original");
const PORT = 3005;

Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let urlPath = url.pathname;

    // Check if accessing backup-original via query param or path
    const stitchDir = path.resolve("docs/workstation-capture/stitch");

    // Route between versions
    let baseDir = siteDir;
    const version = url.searchParams.get("version");
    if (version === "original" || urlPath.startsWith("/original")) {
      baseDir = backupDir;
      if (urlPath.startsWith("/original")) {
        urlPath = urlPath.slice("/original".length);
      }
    } else if (version === "stitch-polished") {
      // v1 old stitch polished → now the manually improved version
      const p = path.join(stitchDir, "project-2-polished.html");
      return new Response(Bun.file(p), { headers: { "Content-Type": "text/html; charset=utf-8" } });
    } else if (version === "stitch-v2") {
      // v2 from Stitch API edit_screens
      const p = path.join(stitchDir, "project-2-polished-v2.html");
      return new Response(Bun.file(p), { headers: { "Content-Type": "text/html; charset=utf-8" } });
    } else if (version === "stitch-v3") {
      // v3 from Stitch API - refined with green CTA, light about, icons
      const p = path.join(stitchDir, "project-2-polished-v3.html");
      return new Response(Bun.file(p), { headers: { "Content-Type": "text/html; charset=utf-8" } });
    } else if (version === "stitch-original") {
      const p = path.join(stitchDir, "project-1-original.html");
      return new Response(Bun.file(p), { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    if (urlPath === "/" || urlPath === "") urlPath = "/index.html";

    // Decode URI component
    const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
    const filePath = path.join(baseDir, safePath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return new Response(Bun.file(filePath));
    }
    console.warn(`[404] ${urlPath} -> ${filePath}`);
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Serving workstation capture at http://localhost:${PORT}`);
