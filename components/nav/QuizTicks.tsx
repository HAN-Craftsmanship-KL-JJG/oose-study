"use client";

import { Check } from "lucide-react";
import { createContext, useContext, type ReactNode } from "react";
import { useProgress } from "@/lib/progress";

/** Page href → the ids of its practice questions. The layout passes it in from the bank. */
type PageQuestions = Record<string, string[]>;

const PageQuestionsContext = createContext<PageQuestions>({});

export function PageQuestionsProvider({
  value,
  children,
}: {
  value: PageQuestions;
  children: ReactNode;
}) {
  return <PageQuestionsContext.Provider value={value}>{children}</PageQuestionsContext.Provider>;
}

/** A small tick when every question of the page was last answered right. */
export function QuizTick({ href }: { href: string }) {
  const ids = useContext(PageQuestionsContext)[href] ?? [];
  const progress = useProgress();
  if (ids.length === 0 || !ids.every((id) => progress[id] === true)) return null;
  return (
    <span title="All questions answered right" className="ml-1.5 inline-flex align-[-0.1em]">
      <Check aria-hidden className="size-3.5 text-emerald-600 dark:text-emerald-400" />
      <span className="sr-only">(all questions answered right)</span>
    </span>
  );
}
