// Builds the search index from the MDX pages, at build time.
// app/search-index.json/route.ts serves it as a static file; the search box loads it once.

import fs from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { PAGES, topicOf } from "./pages";

/** One searchable part of a page: the text from one heading to the next. */
export interface SearchEntry {
  href: string;
  page: string;
  /** The heading of this part, or null for the text above the first subchapter. */
  heading: string | null;
  /** The id of the heading, as rehype-slug makes it, or null for the top of the page. */
  id: string | null;
  text: string;
}

const APP_DIR = path.join(process.cwd(), "app");

/** Markdown and JSX → plain text. Attribute values such as titles count as text. */
function plainText(line: string): string {
  return inlineText(line.replace(/^\s*(?:>|[-*+]\s|\d+\.\s)/, ""));
}

/** Like plainText, but for a heading: there a leading "1." or "+" is part of the text. */
function inlineText(line: string): string {
  return line
    .replace(/\b(?:title|item|label)="([^"]*)"/g, " $1 ")
    .replace(/<\/?[A-Za-z][^>]*>?/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*{}[\]|]|\b_|_\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

interface Part {
  heading: string | null;
  id: string | null;
  lines: string[];
}

type Line =
  | { kind: "skip" }
  | { kind: "section"; name: string }
  | { kind: "heading"; level: number; text: string }
  | { kind: "text"; text: string };

/** What one line outside a code block is. */
function classify(line: string): Line {
  if (/^(?:import|export) /.test(line)) return { kind: "skip" };
  if (/^\s*\|?[\s:|-]+\|?\s*$/.test(line) && line.includes("-")) return { kind: "skip" };
  const section = /^<(\w+) \/>$/.exec(line.trim());
  if (section?.[1]) return { kind: "section", name: section[1] };
  const heading = /^(#{1,6}) (.+)$/.exec(line);
  if (heading?.[1] && heading[2]) {
    return { kind: "heading", level: heading[1].length, text: inlineText(heading[2]) };
  }
  const text = plainText(line);
  return text ? { kind: "text", text } : { kind: "skip" };
}

/**
 * Splits one MDX file into parts at its h2 and h3 headings.
 * rehype-slug runs once per MDX file, so every file gets its own slugger, just like on the site.
 * A section file (`<SomeSection />`) is read in place.
 */
async function readParts(file: string, parts: Part[]): Promise<void> {
  const source = await fs.readFile(file, "utf8");
  const imports = new Map<string, string>();
  for (const m of source.matchAll(/^import (\w+) from "(\.[^"]+\.mdx)";$/gm)) {
    if (m[1] && m[2]) imports.set(m[1], path.join(path.dirname(file), m[2]));
  }
  const slugger = new GithubSlugger();
  let inCode = false;
  for (const raw of source.split("\n")) {
    if (raw.trimStart().startsWith("```")) inCode = !inCode;
    if (inCode || raw.trimStart().startsWith("```")) continue;
    const line = classify(raw);
    if (line.kind === "section") {
      const sectionFile = imports.get(line.name);
      if (sectionFile) await readParts(sectionFile, parts);
    } else if (line.kind === "heading") {
      const id = slugger.slug(line.text);
      if (line.level === 2 || line.level === 3) parts.push({ heading: line.text, id, lines: [] });
    } else if (line.kind === "text") {
      parts.at(-1)?.lines.push(line.text);
    }
  }
}

export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const entries: SearchEntry[] = [];
  for (const page of PAGES) {
    const file = path.join(APP_DIR, topicOf(page.href), "page.mdx");
    const exists = await fs.stat(file).then(
      () => true,
      () => false,
    );
    if (!exists) continue; // A page in TSX, such as the quiz, has no text to search.
    const parts: Part[] = [{ heading: null, id: null, lines: [] }];
    await readParts(file, parts);
    for (const part of parts) {
      entries.push({
        href: page.href,
        page: page.title,
        heading: part.heading,
        id: part.id,
        text: part.lines.join(" "),
      });
    }
  }
  return entries;
}
