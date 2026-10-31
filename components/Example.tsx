import fs from "node:fs/promises";
import path from "node:path";
import { highlight } from "@/lib/highlight";
import { LANGUAGES } from "@/lib/languages";
import CodeTabs, { type CodeTab } from "./CodeTabs";

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
 */
export default async function Example({
  name,
  title,
}: {
  name: string;
  title?: string | undefined;
}) {
  const notesFile = await readOptional(path.join(EXAMPLES_DIR, `${name}.notes.json`));
  const notes = notesFile ? (JSON.parse(notesFile) as Record<string, string>) : {};

  const tabs: CodeTab[] = [];
  for (const lang of LANGUAGES) {
    const code = await readOptional(path.join(EXAMPLES_DIR, `${name}.${lang.ext}`));
    if (code === null) continue;
    const html = await highlight(code, lang.shiki);
    tabs.push({ id: lang.id, label: lang.label, html, note: notes[lang.id] });
  }

  if (tabs.length === 0) throw new Error(`Example "${name}" has no code files in examples/`);
  return <CodeTabs title={title} tabs={tabs} />;
}
