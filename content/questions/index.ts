import type { Question } from "@/lib/questions";
import { questions as umlSymbols } from "./uml-symbols";
import { questions as ooTerms } from "./oo-terms";
import { questions as couplingCohesion } from "./coupling-cohesion";
import { questions as visibility } from "./visibility";
import { questions as solid } from "./solid";
import { questions as singletonDi } from "./singleton-di";
import { questions as grasp } from "./grasp";
import { questions as patterns } from "./patterns";
import { questions as diagrams } from "./diagrams";
import { questions as checkDesign } from "./check-design";
import { questions as technicalDesign } from "./technical-design";
import { questions as otherTopics } from "./other-topics";

// Every question, in page order. Add a topic file here when you add a page.
export const QUESTIONS: Question[] = [
  ...umlSymbols,
  ...ooTerms,
  ...couplingCohesion,
  ...visibility,
  ...solid,
  ...singletonDi,
  ...grasp,
  ...patterns,
  ...diagrams,
  ...checkDesign,
  ...technicalDesign,
  ...otherTopics,
];

export function questionsForTopic(topic: string): Question[] {
  return QUESTIONS.filter((q) => q.topic === topic);
}

export function questionById(id: string): Question {
  const q = QUESTIONS.find((x) => x.id === id);
  if (!q) throw new Error(`No question with id "${id}"`);
  return q;
}

// Check the bank when the site builds, so a typo cannot reach a student.
const seen = new Set<string>();
for (const q of QUESTIONS) {
  const fail = (why: string) => {
    throw new Error(`Question "${q.id}": ${why}`);
  };
  if (seen.has(q.id)) fail("duplicate id");
  seen.add(q.id);
  if (!q.id.startsWith(`${q.topic}-`)) fail(`id must start with "${q.topic}-"`);
  if (q.kind === "choice") {
    const right = Array.isArray(q.answer) ? q.answer : [q.answer];
    if (
      right.length === 0 ||
      right.some((i) => !Number.isInteger(i) || i < 0 || i >= q.options.length)
    ) {
      fail("answer is not a valid option index");
    }
  }
  if (q.kind === "match") {
    for (const pair of q.pairs) {
      if (!q.choices.includes(pair.answer)) fail(`"${pair.answer}" is not in choices`);
    }
  }
  if (q.kind === "judge" && q.statements.length === 0) fail("no statements");
  if (q.kind === "text" && q.accept.length === 0) fail("no accepted answers");
}
