import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const errors = [];
const warnings = [];

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

const collectFiles = (directory, extension) => {
  const output = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...collectFiles(fullPath, extension));
    else if (entry.name.endsWith(extension)) output.push(fullPath);
  }
  return output;
};

const htmlFiles = collectFiles(root, ".html");

for (const file of htmlFiles) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  const html = fs.readFileSync(file, "utf8");

  if (!/<html\s+lang="[^"]+"/i.test(html)) errors.push(`${relative}: missing html lang`);
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${relative}: missing title`);
  if (!/name="viewport"/i.test(html)) errors.push(`${relative}: missing viewport meta`);

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt="[^"]*"/i.test(match[0])) errors.push(`${relative}: image without alt`);
  }

  for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
    if (!/\brel="[^"]*\bnoopener\b[^"]*"/i.test(match[0])) {
      errors.push(`${relative}: target=_blank link without noopener`);
    }
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/gi)) {
    const reference = match[1];
    if (
      reference.startsWith("#") ||
      reference.startsWith("http://") ||
      reference.startsWith("https://") ||
      reference.startsWith("mailto:") ||
      reference.startsWith("tel:") ||
      reference.startsWith("data:")
    ) continue;

    const clean = reference.split("#")[0].split("?")[0];
    if (!clean) continue;

    let target;
    if (clean === "/") target = path.join(root, "index.html");
    else if (clean.startsWith("/")) target = path.join(root, clean.slice(1));
    else target = path.resolve(path.dirname(file), clean);

    if (!fs.existsSync(target)) errors.push(`${relative}: missing local reference ${reference}`);
  }
}

const index = read("index.html");
const script = read("script.js");
const style = read("style.css");

for (const reelId of ["DbU4mk4tBQ6", "DaSqJKgtTxD", "DbU52HUtS-R", "DbU5NqQNBdT"]) {
  if (!index.includes(reelId)) errors.push(`index.html: missing reel ${reelId}`);
}

if (!index.includes("https://www.youtube.com/@juniperprayz")) {
  errors.push("index.html: missing official YouTube channel link");
}

for (const destination of [
  "https://ko-fi.com/prayzvibes",
  "https://prayzvibes.bandcamp.com/",
  "https://prayzvibes-shop.fourthwall.com/",
  "https://elasticstage.com/prayzvibes"
]) {
  if (!index.includes(destination)) errors.push(`index.html: missing PRAYZVIBES destination ${destination}`);
}

if (/<script[^>]+src="https?:\/\//i.test(index)) {
  errors.push("index.html: unexpected external script on initial load");
}

if (!script.includes("instagram.com/reel/")) {
  errors.push("script.js: Instagram click-to-load integration missing");
}

for (const match of index.matchAll(/data-copy="([^"]+)"/g)) {
  const key = match[1];
  const occurrences = script.split(`"${key}"`).length - 1;
  if (occurrences < 2) errors.push(`script.js: bilingual copy key missing or incomplete: ${key}`);
}

if (
  !style.includes("--gold: #d2b465") ||
  !style.includes("--acid: #c8ff3d") ||
  !style.includes("--coral: #ff6f61") ||
  !style.includes("--violet: #b6a3ff")
) {
  errors.push("style.css: JUNIPER & PRAYZ colour system missing");
}

if (!style.includes("--photo-filter:") || !style.includes("--photo-opacity:")) {
  errors.push("style.css: shared photographic treatment missing");
}

if (!style.includes("--sage: #9baf8a") || !style.includes("WILD HALO identity alignment")) {
  errors.push("style.css: Wild Halo website alignment missing");
}

for (const file of [
  "index.html",
  "font-lab.html",
  "font-lab.css",
  "style.css",
  "script.js",
  "404.html",
  "pages/imprint.html",
  "pages/privacy.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "CNAME.next",
  "images/juniper-prayz-south-africa.jpg",
  "images/juniper-prayz-og-photo.jpg",
  "images/identity/jp-wild-halo-mark.svg",
  "images/identity/jp-wild-halo-mark-light.svg",
  "images/identity/jp-wild-halo-mark-mono.svg",
  "images/identity/jp-wild-halo-lockup.svg",
  "images/identity/jp-wild-halo-lockup-dark.svg",
  "images/identity/jp-wild-halo-lockup-dark-preview.png",
  "images/identity/sticker-halo-music-key.png",
  "images/identity/juniperprayz-qr.svg",
  "fonts/InstrumentSans-Variable.ttf",
  "fonts/InstrumentSans-Italic-Variable.ttf",
  "fonts/InstrumentSerif-Regular.ttf",
  "fonts/InstrumentSerif-Italic.ttf",
  "fonts/BodoniModa-Variable.ttf",
  "fonts/BodoniModa-Italic-Variable.ttf",
  "fonts/CormorantGaramond-Variable.ttf",
  "fonts/CormorantGaramond-Italic-Variable.ttf",
  "fonts/OFL-Instrument-Sans.txt",
  "fonts/OFL-Instrument-Serif.txt",
  "fonts/OFL-Bodoni-Moda.txt",
  "fonts/OFL-Cormorant-Garamond.txt",
  "scripts/preview-site.mjs",
  ".github/workflows/verify-static-site.yml",
  ".github/workflows/publish-pages.yml",
  "docs/DEEP-ARTIST-SITE-REVIEW-2026-07-29.md",
  "docs/VISUAL-SYSTEM-V2.md",
  "docs/WILD-HALO-IDENTITY.md",
  "docs/AFFINITY-PRODUCTION-GUIDE.md",
  "docs/PRAYZVIBES-HUB.md",
  "docs/TYPOGRAPHY-LAB.md"
]) {
  if (!exists(file)) errors.push(`missing required file: ${file}`);
}

if (exists(".github/workflows/publish-pages.yml")) {
  const pagesWorkflow = read(".github/workflows/publish-pages.yml");
  if (!/\bworkflow_dispatch\s*:/i.test(pagesWorkflow)) {
    errors.push("publish-pages.yml: manual workflow_dispatch trigger missing");
  }
  if (/^\s*push\s*:/im.test(pagesWorkflow)) {
    errors.push("publish-pages.yml: automatic push trigger must stay disabled");
  }
}

if (exists("CNAME")) {
  const domain = read("CNAME").trim();
  if (domain !== "www.juniperprayz.com") errors.push(`CNAME: unexpected domain ${domain}`);
  warnings.push("CNAME is active. Confirm that the controlled domain cutover is intended.");
} else {
  warnings.push("CNAME is intentionally inactive; CNAME.next is ready for the later cutover.");
}

const publicSource = `${index}\n${script}\n${style}\n${read("pages/imprint.html")}\n${read("pages/privacy.html")}`;
if (/\b(?:lorem ipsum|placeholder text)\b/i.test(publicSource)) {
  errors.push("public source contains placeholder copy");
}

if (!index.includes('id="identity"') || !index.includes("wild-halo-chapter")) {
  errors.push("index.html: Wild Halo identity chapter missing");
}

if (
  !index.includes("sticker-halo-music-key.png") ||
  !style.includes(".hero-sticker-symbol") ||
  !style.includes("Sticker system / 47 mm round identity")
) {
  errors.push("47 mm sticker identity is not integrated into the website");
}

if (!index.includes("sticker-system") || !index.includes("hero-brand-name")) {
  errors.push("sticker-system page layout is not integrated");
}

if (!style.includes('"Instrument Sans"') || !style.includes('"Instrument Serif"')) {
  errors.push("style.css: Affinity-ready Wild Duality production fonts missing");
}

if (
  !index.includes("sticker-system wild-duality") ||
  !style.includes("WILD DUALITY production direction") ||
  !index.includes("duality-axis") ||
  !index.includes("hero-energy-tags")
) {
  errors.push("Wild Duality production system is not integrated");
}

if (
  !style.includes("WILD EARTH photo treatment") ||
  !style.includes("brightness(.7)") ||
  !style.includes("edge vignette")
) {
  errors.push("Wild Earth photography treatment is not integrated");
}

for (const phrase of [
  "Wild roots / open roads",
  "Made in Bavaria",
  "Independent by nature",
  "Good songs need air, dirt and a little resistance.",
  "Bavarian roots. Open roads. Good noise."
]) {
  if (!index.includes(phrase) && !script.includes(phrase)) {
    errors.push(`Brand voice phrase missing: ${phrase}`);
  }
}

const prayzVibesDirectLinks = (index.match(/href="https:\/\/www\.prayzvibes\.com\/"/g) || []).length;
if (prayzVibesDirectLinks < 5) {
  errors.push(`Expected at least 5 contextual PRAYZVIBES links, found ${prayzVibesDirectLinks}`);
}

if (exists("font-lab.html")) {
  const fontLab = read("font-lab.html");
  const fontLabStyle = read("font-lab.css");
  for (const option of ["option-a", "option-b", "option-c"]) {
    if (!fontLab.includes(`id="${option}"`)) errors.push(`font-lab.html: missing ${option}`);
  }
  for (const family of ["Instrument Sans", "Instrument Serif", "Bodoni Moda", "Cormorant Garamond"]) {
    if (!fontLabStyle.includes(family)) errors.push(`font-lab.css: missing ${family}`);
  }
  if (!/name="robots"\s+content="noindex,nofollow"/i.test(fontLab)) {
    errors.push("font-lab.html: private noindex directive missing");
  }
}

if (/juniper-prayz-(?:street-manga|comic-issue|character-poster|sticker-sheet)/i.test(`${index}\n${script}`)) {
  errors.push("public website still references archived generated artwork");
}

console.log(`Checked ${htmlFiles.length} HTML files.`);
for (const warning of warnings) console.log(`WARN: ${warning}`);

if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log("PASS: all required files and local references are valid.");
}
