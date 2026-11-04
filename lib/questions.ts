// Types for the question bank in content/questions/.
//
// Text fields (prompt, options, explain, statements) support a small part of Markdown:
// `inline code` and paragraphs separated by a blank line.

interface BaseQuestion {
  /**
   * Unique and stable: progress is saved under this id.
   * Use "<topic>-<short-name>", for example "solid-ocp-kortingsregel".
   */
  id: string;
  /** The page slug the question belongs to, e.g. "oo-terms". */
  topic: string;
  /** Where the question comes from. Not shown on the site. */
  source: string;
  /** Short title shown on the card. */
  title: string;
  prompt: string;
  /** Optional code shown under the prompt. */
  code?: string;
  codeLang?: "java" | "powershell";
  /** Optional PlantUML diagram shown under the prompt, written like a `plantuml` block in MDX. */
  uml?: string;
  /** Shown after checking: why the answer is right and the others are wrong. */
  explain: string;
}

/**
 * Multiple choice.
 * `answer` is the index of the right option, or a list of indexes when more options are right.
 */
export interface ChoiceQuestion extends BaseQuestion {
  kind: "choice";
  options: string[];
  answer: number | number[];
}

/** Match each item to one of `choices` (a dropdown per item). */
export interface MatchQuestion extends BaseQuestion {
  kind: "match";
  choices: string[];
  pairs: { item: string; answer: string }[];
}

/** Mark each statement as true or false. Good for "which of these are real problems?". */
export interface JudgeQuestion extends BaseQuestion {
  kind: "judge";
  statements: { text: string; correct: boolean }[];
  /** Button labels for true and false. Default: ["True", "False"]. */
  labels?: [string, string];
}

/** Type a short answer, such as one name. Compared without case and spaces at the ends. */
export interface TextQuestion extends BaseQuestion {
  kind: "text";
  accept: string[];
}

export type Question = ChoiceQuestion | MatchQuestion | JudgeQuestion | TextQuestion;

/** A question after the server has highlighted its code and read its diagram. */
export type RenderedQuestion = Question & {
  codeHtml?: string;
  umlSvg?: { svg: string; minWidth: number };
};
