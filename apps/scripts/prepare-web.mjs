// Builds the small local page each app ships with: a launcher that opens the live site,
// and the screen shown when the device is offline. Usage: node prepare-web.mjs <outDir>
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const apps = resolve(here, "..");
const out = resolve(process.cwd(), process.argv[2] ?? "www");
const config = JSON.parse(readFileSync(join(apps, "app-config.json"), "utf8"));
const url = (process.env.APP_URL || config.url).replace(/\/+$/, "");
if (!/^https:\/\//.test(url)) throw new Error(`APP_URL must be an https URL, got ${url}`);

mkdirSync(out, { recursive: true });
const page = readFileSync(join(apps, "assets", "offline.html"), "utf8").replaceAll("__APP_URL__", url);
writeFileSync(join(out, "index.html"), page);
writeFileSync(join(out, "offline.html"), page);
copyFileSync(join(apps, "assets", "icon.png"), join(out, "icon.png"));
console.log(`Prepared ${out} for ${url}`);

// Android (Capacitor) reads its settings from capacitor.config.json next to www/.
if (process.argv.includes("--capacitor")) {
  const cap = {
    appId: config.appId,
    appName: config.appName,
    webDir: "www",
    server: { url, cleartext: false, errorPath: "offline.html", allowNavigation: [new URL(url).host] },
    android: { allowMixedContent: false },
  };
  writeFileSync(resolve(out, "..", "capacitor.config.json"), JSON.stringify(cap, null, 2) + "\n");
  console.log("Wrote capacitor.config.json");
}
