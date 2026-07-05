// Validates that pages.json stays in sync with the pages/ folder.
// Run with: node scripts/check-pages.mjs

import { existsSync, readdirSync, readFileSync } from "node:fs";

const pages = JSON.parse(readFileSync("pages.json", "utf8"));
const folders = readdirSync("pages", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

let ok = true;

for (const page of pages) {
  if (!page.name || !page.title || !page.description) {
    console.error(`pages.json entry ${JSON.stringify(page)} is missing name/title/description`);
    ok = false;
    continue;
  }
  const indexPath = `pages/${page.name}/index.html`;
  if (!existsSync(indexPath)) {
    console.error(`pages.json lists "${page.name}" but ${indexPath} does not exist`);
    ok = false;
  }
}

const listedNames = new Set(pages.map((p) => p.name));
for (const folder of folders) {
  if (!listedNames.has(folder)) {
    console.error(`pages/${folder}/ exists but is not listed in pages.json`);
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}

console.log(`Checked ${pages.length} page(s) - all good.`);
