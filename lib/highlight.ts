import { transformerNotationHighlight } from "@shikijs/transformers";
import { codeToHtml, type ShikiTransformer } from "shiki";
import type { Question, RenderedQuestion } from "./questions";
import { readUml } from "./uml";

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
 * Java and C++ both use `// [!code highlight]`.
 */
export function highlight(code: string, lang: string): Promise<string> {
  return codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    transformers: [transformerNotationHighlight({ matchAlgorithm: "v3" }), blockLines],
  });
}

/** Adds the highlighted code and the diagram SVG of each question. Runs on the server. */
export async function renderQuestions(questions: Question[]): Promise<RenderedQuestion[]> {
  return Promise.all(
    questions.map(async (q) => {
      const rendered: RenderedQuestion = { ...q };
      if (q.code) rendered.codeHtml = await highlight(q.code, q.codeLang ?? "java");
      if (q.uml) rendered.umlSvg = await readUml(q.uml);
      return rendered;
    }),
  );
}
