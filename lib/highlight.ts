import { transformerNotationHighlight } from "@shikijs/transformers";
import { codeToHtml, type ShikiTransformer } from "shiki";
import type { Question, RenderedQuestion } from "./questions";

/** Drops the newlines between lines: each line is a block with a number (see globals.css). */
const blockLines: ShikiTransformer = {
  name: "block-lines",
  code(node) {
    node.children = node.children.filter((c) => !(c.type === "text" && c.value === "\n"));
  },
};

/**
 * Colours code. A line that ends with the comment "[!code highlight]" gets a coloured band,
 * and the marker itself is removed.
 * Java uses `// [!code highlight]`, PowerShell `# [!code highlight]`.
 */
export function highlight(code: string, lang: string): Promise<string> {
  return codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    transformers: [transformerNotationHighlight({ matchAlgorithm: "v3" }), blockLines],
  });
}

/** Adds highlighted HTML for the code of each question. Runs on the server. */
export async function renderQuestions(questions: Question[]): Promise<RenderedQuestion[]> {
  return Promise.all(
    questions.map(async (q) =>
      q.code ? { ...q, codeHtml: await highlight(q.code, q.codeLang ?? "java") } : q,
    ),
  );
}
