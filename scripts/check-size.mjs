// Checks the size of the files that ESLint does not check: pages (MDX) and code examples.
// Exits with code 1 on any problem, so it can fail a check or CI run.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;

// [maximum lines per file, maximum characters per line]
const LIMITS = {
  ".java": [120, 100],
  ".cpp": [120, 100],
  // One sentence per line. A sentence over 160 characters is too long for our readers.
  ".mdx": [500, 160],
};

const SKIP_DIRS = new Set(["node_modules", ".next"]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

/** Table rows and diagram source may be long; they are not prose. */
function exempt(line, inDiagram) {
  return inDiagram || line.trimStart().startsWith("|");
}

const problems = [];
for (const path of walk(ROOT)) {
  const limit = LIMITS[extname(path)];
  if (!limit) continue;
  const [maxLines, maxLength] = limit;
  const lines = readFileSync(path, "utf8").split("\n");
  const file = relative(ROOT, path);
  if (lines.length > maxLines) problems.push(`${file}: ${lines.length} lines (max ${maxLines})`);
  let inDiagram = false;
  lines.forEach((line, i) => {
    if (line.trim().startsWith("```")) inDiagram = !inDiagram && line.includes("plantuml");
    if (line.length > maxLength && !exempt(line, inDiagram)) {
      problems.push(`${file}:${i + 1}: ${line.length} characters (max ${maxLength})`);
    }
  });
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} size problems.`);
  process.exit(1);
}
console.error("Size check passed.");
