// Searches the index that lib/search-index.ts builds. Runs in the browser.

import type { SearchEntry } from "./search-index";

const MAX_HITS = 30;
const SNIPPET_RADIUS = 70;

/** Lower case, without accents, so "facade" also finds "Façade". */
function fold(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function queryWords(query: string): string[] {
  return fold(query).split(/\s+/).filter(Boolean);
}

interface Folded {
  entry: SearchEntry;
  heading: string;
  page: string;
  text: string;
}

const foldedIndexes = new WeakMap<SearchEntry[], Folded[]>();

function folded(index: SearchEntry[]): Folded[] {
  let result = foldedIndexes.get(index);
  if (!result) {
    result = index.map((entry) => ({
      entry,
      heading: fold(entry.heading ?? entry.page),
      page: fold(entry.page),
      text: fold(entry.text),
    }));
    foldedIndexes.set(index, result);
  }
  return result;
}

/** Every word must appear. A word in a heading counts far more than a word in the text. */
function score(item: Folded, words: string[], phrase: string): number {
  let total = item.heading.includes(phrase) ? 10 : 0;
  for (const word of words) {
    const inHeading = item.heading.includes(word);
    const inPage = item.page.includes(word);
    const inText = item.text.includes(word);
    if (!inHeading && !inPage && !inText) return 0;
    if (inHeading) total += item.heading.startsWith(word) ? 13 : 10;
    if (inPage) total += 4;
    if (inText) total += 1;
  }
  return total;
}

export function search(index: SearchEntry[], query: string): SearchEntry[] {
  const words = queryWords(query);
  if (words.length === 0) return [];
  const phrase = words.join(" ");
  return folded(index)
    .map((item) => ({ entry: item.entry, score: score(item, words, phrase) }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_HITS)
    .map((hit) => hit.entry);
}

export interface SnippetPart {
  text: string;
  match: boolean;
}

function escape(word: string): string {
  return word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** A short piece of the text around the first match, split into matching and other parts. */
export function snippet(text: string, words: string[]): SnippetPart[] {
  const lower = fold(text);
  const positions = words.map((w) => lower.indexOf(w)).filter((i) => i >= 0);
  const first = positions.length > 0 ? Math.min(...positions) : 0;
  let start = Math.max(0, first - SNIPPET_RADIUS);
  if (start > 0) start = text.indexOf(" ", start) + 1;
  const end = Math.min(text.length, first + SNIPPET_RADIUS * 2);
  const piece = `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
  if (words.length === 0) return [{ text: piece, match: false }];
  const pattern = new RegExp(`(${words.map(escape).join("|")})`, "gi");
  return piece
    .split(pattern)
    .filter(Boolean)
    .map((part) => ({ text: part, match: words.includes(fold(part)) }));
}

/** The address of a hit, with the base path that Link adds by itself. */
export function hitHref(entry: SearchEntry): string {
  return `${entry.href}/${entry.id ? `#${entry.id}` : ""}`;
}
