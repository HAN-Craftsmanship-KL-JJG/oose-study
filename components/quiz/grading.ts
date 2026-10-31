import type { ChoiceQuestion, Question } from "@/lib/questions";

// The answer a student gives, per kind of question.
export type ChoiceValue = number[];
export type MatchValue = string[];
export type JudgeValue = (boolean | null)[];
export type TextValue = string;
export type Value = ChoiceValue | MatchValue | JudgeValue | TextValue;

export function emptyValue(q: Question): Value {
  switch (q.kind) {
    case "choice":
      return [];
    case "match":
      return q.pairs.map(() => "");
    case "judge":
      return q.statements.map(() => null);
    case "text":
      return "";
  }
}

export function rightOptions(q: ChoiceQuestion): number[] {
  return Array.isArray(q.answer) ? q.answer : [q.answer];
}

export function normalise(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

/** true or false when the answer is complete, null when the student has not finished. */
export function grade(q: Question, value: Value): boolean | null {
  switch (q.kind) {
    case "choice": {
      const chosen = value as ChoiceValue;
      if (chosen.length === 0) return null;
      const right = rightOptions(q);
      return chosen.length === right.length && right.every((i) => chosen.includes(i));
    }
    case "match": {
      const chosen = value as MatchValue;
      if (chosen.some((c) => c === "")) return null;
      return q.pairs.every((pair, i) => pair.answer === chosen[i]);
    }
    case "judge": {
      const chosen = value as JudgeValue;
      if (chosen.some((c) => c === null)) return null;
      return q.statements.every((s, i) => s.correct === chosen[i]);
    }
    case "text": {
      const typed = normalise(value as TextValue);
      if (typed === "") return null;
      return q.accept.some((a) => normalise(a) === typed);
    }
  }
}
