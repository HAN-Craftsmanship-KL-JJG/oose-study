import { codeToHtml } from "shiki";
import type { Question, RenderedQuestion } from "./questions";

export function highlight(code: string, lang: string): Promise<string> {
  return codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
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
