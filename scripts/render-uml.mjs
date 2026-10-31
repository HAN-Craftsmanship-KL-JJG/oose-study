// Renders every ```plantuml block in the pages to an SVG file in uml/svg/, with PlantUML in a
// container. The site build reads those files, so it needs no Java and no container.
//
//   npm run uml          render the new and changed diagrams, delete the unused ones
//   npm run uml -- --check   only check that every diagram has an up-to-date SVG
//
// The container runtime is the first of `container` (Apple), `docker` and `podman` that is
// installed. Set UML_RUNTIME to choose one.

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { umlHash } from "../lib/uml-hash.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const SVG_DIR = join(ROOT, "uml", "svg");
const FONT_DIR = join(ROOT, ".cache", "uml-fonts");
const IMAGE = "docker.io/plantuml/plantuml:1.2026.8";
const FONT_ZIP =
  "https://github.com/adobe-fonts/source-serif/releases/download/4.005R/" +
  "source-serif-4.005_Desktop.zip";
const FONTS = ["Regular", "It", "Semibold", "Bold"].map((w) => `SourceSerif4-${w}.ttf`);
const STYLE = readFileSync(join(ROOT, "uml", "style.puml"), "utf8");

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (path.endsWith(".mdx")) yield path;
  }
}

/** Every diagram in the pages, by hash. */
function findDiagrams() {
  const diagrams = new Map();
  for (const file of walk(join(ROOT, "app"))) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(/^```plantuml\n([\s\S]*?)^```/gm)) {
      const body = match[1];
      const line = text.slice(0, match.index).split("\n").length;
      diagrams.set(umlHash(STYLE, body), { body, where: `${relative(ROOT, file)}:${line}` });
    }
  }
  return diagrams;
}

function runtime() {
  const wanted = process.env.UML_RUNTIME;
  const options = wanted ? [wanted] : ["container", "docker", "podman"];
  const found = options.find((cmd) => spawnSync("which", [cmd]).status === 0);
  if (!found) throw new Error("No container runtime found. Install Apple container or Docker.");
  return found;
}

function ensureFonts() {
  if (FONTS.every((f) => existsSync(join(FONT_DIR, f)))) return;
  mkdirSync(FONT_DIR, { recursive: true });
  const zip = join(FONT_DIR, "fonts.zip");
  execFileSync("curl", ["-sSL", "-o", zip, FONT_ZIP]);
  const inZip = FONTS.map((f) => `source-serif-4.005_Desktop/TTF/${f}`);
  execFileSync("unzip", ["-oj", "-q", zip, ...inZip, "-d", FONT_DIR]);
  rmSync(zip);
}

/**
 * Makes an SVG fit in a page: it scales with its width and keeps its shape, and its ids get a
 * prefix, so many SVGs can share one page.
 */
function tidy(svg, hash) {
  return svg
    .replace(/<\?xml[^>]*\?>/, "")
    .replace(/<\?plantuml[^>]*\?>/, "")
    .replace(/(<svg[^>]*?) style="[^"]*"/, "$1")
    .replace(/(<svg[^>]*?) height="[^"]*"/, "$1")
    .replace(/preserveAspectRatio="none"/, 'preserveAspectRatio="xMidYMid meet"')
    .replace(/\bid="([^"]+)"/g, `id="u${hash}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#u${hash}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#u${hash}-$1"`)
    .trim();
}

/** UML marks an interface with «interface». The style hides PlantUML's own circle icon. */
function labelInterfaces(body) {
  return body.replace(
    /^(\s*interface\s+(?:"[^"]+"(?:\s+as\s+\w+)?|[\w.]+))(?![^\n]*<<)/gm,
    "$1 <<interface>>",
  );
}

function render(todo) {
  ensureFonts();
  const work = mkdtempSync(join(tmpdir(), "uml-"));
  for (const [hash, { body }] of todo) {
    writeFileSync(
      join(work, `${hash}.puml`),
      `@startuml\n${STYLE}\n${labelInterfaces(body)}@enduml\n`,
    );
  }
  const result = spawnSync(
    runtime(),
    ["run", "--rm", "-v", `${work}:/work`, "-v", `${FONT_DIR}:/usr/local/share/fonts/uml`].concat([
      IMAGE,
      "-tsvg",
      "-charset",
      "UTF-8",
      "/work",
    ]),
    { encoding: "utf8" },
  );
  const failed = [];
  for (const [hash, { where }] of todo) {
    const out = join(work, `${hash}.svg`);
    const svg = existsSync(out) ? readFileSync(out, "utf8") : "";
    const broken = /Syntax Error|Welcome to PlantUML/.test(svg);
    if (!svg || broken || result.stderr.includes(`/work/${hash}.puml`)) failed.push(where);
    else writeFileSync(join(SVG_DIR, `${hash}.svg`), tidy(svg, hash) + "\n");
  }
  rmSync(work, { recursive: true });
  if (failed.length > 0) {
    console.error(result.stdout, result.stderr);
    throw new Error(`PlantUML could not draw:\n  ${failed.join("\n  ")}`);
  }
}

const diagrams = findDiagrams();
mkdirSync(SVG_DIR, { recursive: true });
const existing = new Set(readdirSync(SVG_DIR).map((f) => f.replace(/\.svg$/, "")));
const todo = [...diagrams].filter(([hash]) => !existing.has(hash));
const unused = [...existing].filter((hash) => !diagrams.has(hash));

if (process.argv.includes("--check")) {
  if (todo.length > 0 || unused.length > 0) {
    console.error(`${todo.length} diagrams need an SVG, ${unused.length} SVGs are unused.`);
    console.error("Run: npm run uml");
    process.exit(1);
  }
  console.error(`All ${diagrams.size} diagrams have an SVG.`);
} else {
  if (todo.length > 0) render(new Map(todo));
  for (const hash of unused) rmSync(join(SVG_DIR, `${hash}.svg`));
  console.error(`${diagrams.size} diagrams: ${todo.length} drawn, ${unused.length} deleted.`);
}
