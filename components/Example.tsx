import fs from "node:fs/promises";
import path from "node:path";
import { highlight } from "@/lib/highlight";
import { LANGUAGES } from "@/lib/languages";
import { buildTrace, countHtmlLines, shownLines, type TraceStepSource } from "@/lib/trace";
import CodeTabs, { type CodeTab } from "./CodeTabs";
import type { LabelTone } from "./Label";

const EXAMPLES_DIR = path.join(process.cwd(), "examples");

async function readOptional(file: string): Promise<string | null> {
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

/**
 * A code example in every language that has a file for it.
 * `name` is a path below examples/ without extension, such as "oo-terms/interface".
 * It reads examples/<name>.py, .ps1, .java and .cpp, and the optional examples/<name>.notes.json
 * with a short note per language.
 * An optional examples/<name>.trace.json adds a step-by-step run per language (see lib/trace.ts).
 * `label` adds a coloured pill before the title, such as label="Creator" tone="green".
 */
export default async function Example({
  name,
  title,
  label,
  tone,
}: {
  name: string;
  title?: string | undefined;
  label?: string | undefined;
  tone?: LabelTone | undefined;
}) {
  const notesFile = await readOptional(path.join(EXAMPLES_DIR, `${name}.notes.json`));
  const notes = notesFile ? (JSON.parse(notesFile) as Record<string, string>) : {};
  const traceFile = await readOptional(path.join(EXAMPLES_DIR, `${name}.trace.json`));
  const traces = traceFile ? (JSON.parse(traceFile) as Record<string, TraceStepSource[]>) : {};

  const tabs: CodeTab[] = [];
  for (const lang of LANGUAGES) {
    const code = await readOptional(path.join(EXAMPLES_DIR, `${name}.${lang.ext}`));
    if (code === null) continue;
    const html = await highlight(code, lang.shiki);
    const steps = traces[lang.id];
    const where = `${name}.trace.json (${lang.id})`;
    if (steps && shownLines(code).length !== countHtmlLines(html)) {
      throw new Error(`${where}: the line count does not match the highlighted code`);
    }
    const trace = steps ? buildTrace(code, steps, where) : undefined;
    tabs.push({ id: lang.id, label: lang.label, html, note: notes[lang.id], trace });
  }

  if (tabs.length === 0) throw new Error(`Example "${name}" has no code files in examples/`);
  return <CodeTabs title={title} label={label} tone={tone} tabs={tabs} />;
}
