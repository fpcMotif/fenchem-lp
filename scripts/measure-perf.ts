import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

interface AssetSize {
  name: string;
  type: "css" | "js" | "other";
  rawBytes: number;
  gzipBytes: number;
}

export function getClientAssetSizes(): AssetSize[] {
  const distDir = join(process.cwd(), "apps/web/dist/client/assets");
  try {
    const files = readdirSync(distDir);
    return files.map((file) => {
      const filePath = join(distDir, file);
      const content = readFileSync(filePath);
      const gzip = gzipSync(content);
      const type = file.endsWith(".css") ? "css" : file.endsWith(".js") ? "js" : "other";
      return {
        name: file,
        type,
        rawBytes: content.length,
        gzipBytes: gzip.length,
      };
    });
  } catch (e) {
    console.error("Error reading client dist assets:", e);
    return [];
  }
}

export function formatBytes(bytes: number): string {
  return `${(bytes / 1024).toFixed(2)} kB`;
}

export function printAssetSummary(phaseName: string) {
  const assets = getClientAssetSizes();
  const cssAssets = assets.filter((a) => a.type === "css");
  const jsAssets = assets.filter((a) => a.type === "js");

  const totalCssRaw = cssAssets.reduce((acc, a) => acc + a.rawBytes, 0);
  const totalCssGzip = cssAssets.reduce((acc, a) => acc + a.gzipBytes, 0);
  const totalJsRaw = jsAssets.reduce((acc, a) => acc + a.rawBytes, 0);
  const totalJsGzip = jsAssets.reduce((acc, a) => acc + a.gzipBytes, 0);
  const totalRaw = totalCssRaw + totalJsRaw;
  const totalGzip = totalCssGzip + totalJsGzip;

  console.log(`\n=== Performance Log: ${phaseName} ===`);
  console.log(`CSS assets (${cssAssets.length} files):`);
  cssAssets.forEach((a) => {
    console.log(
      `  - ${a.name}: ${formatBytes(a.rawBytes)} (raw) / ${formatBytes(a.gzipBytes)} (gzip)`,
    );
  });
  console.log(`CSS Total: ${formatBytes(totalCssRaw)} (raw) / ${formatBytes(totalCssGzip)} (gzip)`);
  console.log(
    `JS Total (${jsAssets.length} files): ${formatBytes(totalJsRaw)} (raw) / ${formatBytes(totalJsGzip)} (gzip)`,
  );
  console.log(
    `Total styling + JS payload: ${formatBytes(totalRaw)} (raw) / ${formatBytes(totalGzip)} (gzip)`,
  );
}

if (import.meta.main) {
  const phase = process.argv[2] || "Current Build";
  printAssetSummary(phase);
}
