"use client";

import type { RenderedQuestion } from "@/lib/questions";
import { useProgress } from "@/lib/progress";
import { barFill, card } from "@/lib/ui";
import QuestionCard from "./QuestionCard";

function Score({ questions }: { questions: RenderedQuestion[] }) {
  const progress = useProgress();
  const right = questions.filter((q) => progress[q.id] === true).length;
  const tried = questions.filter((q) => q.id in progress).length;
  const percent = (right / questions.length) * 100;
  return (
    <div className={`${card} my-6 flex items-center gap-4 p-4`}>
      <div className="flex-1">
        <div className="flex flex-wrap justify-between gap-2 text-sm">
          <span className="text-base font-semibold">
            {right} of {questions.length} right
          </span>
          <span className="text-stone-500">
            {tried} of {questions.length} tried
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
          <div className={barFill} style={{ width: `${String(percent)}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function QuestionList({
  questions,
  showScore = true,
}: {
  questions: RenderedQuestion[];
  showScore?: boolean;
}) {
  return (
    <div className="not-prose">
      {showScore && questions.length > 1 && <Score questions={questions} />}
      {questions.map((q, i) => (
        <QuestionCard key={q.id} q={q} number={questions.length > 1 ? i + 1 : undefined} />
      ))}
    </div>
  );
}
