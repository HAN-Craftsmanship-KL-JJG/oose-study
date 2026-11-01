"use client";

import { useEffect, useState } from "react";
import type { RenderedQuestion } from "@/lib/questions";
import { recordResult, useProgress } from "@/lib/progress";
import { buttonPrimary, card } from "@/lib/ui";
import ChoiceInput from "./ChoiceInput";
import Feedback from "./Feedback";
import {
  emptyValue,
  grade,
  type ChoiceValue,
  type JudgeValue,
  type MatchValue,
  type TextValue,
  type Value,
} from "./grading";
import { JudgeInput, MatchInput, TextInput } from "./OtherInputs";
import RichText from "./RichText";

interface Props {
  q: RenderedQuestion;
  number?: number | undefined;
  /** practice: the student checks each question. exam: the parent reveals all answers at once. */
  mode?: "practice" | "exam";
  revealed?: boolean;
  onChange?: ((id: string, result: boolean | null) => void) | undefined;
}

function Input({
  q,
  value,
  setValue,
  checked,
}: {
  q: RenderedQuestion;
  value: Value;
  setValue: (v: Value) => void;
  checked: boolean;
}) {
  switch (q.kind) {
    case "choice":
      return (
        <ChoiceInput q={q} value={value as ChoiceValue} setValue={setValue} checked={checked} />
      );
    case "match":
      return <MatchInput q={q} value={value as MatchValue} setValue={setValue} checked={checked} />;
    case "judge":
      return <JudgeInput q={q} value={value as JudgeValue} setValue={setValue} checked={checked} />;
    case "text":
      return <TextInput q={q} value={value as TextValue} setValue={setValue} checked={checked} />;
  }
}

function CardHeader({
  q,
  number,
  before,
}: {
  q: RenderedQuestion;
  number?: number | undefined;
  before?: boolean | undefined;
}) {
  return (
    <header className="flex flex-wrap items-center gap-2 border-b border-stone-100 px-5 py-3 text-sm dark:border-stone-800">
      {number !== undefined && (
        <span className="text-sm font-semibold text-stone-400 tabular-nums">{number}</span>
      )}
      <span className="text-base font-semibold">{q.title}</span>
      {before !== undefined && (
        <span
          className={`ml-auto text-xs font-medium ${before ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}
        >
          {before ? "✓ Right last time" : "✗ Wrong last time"}
        </span>
      )}
    </header>
  );
}

export default function QuestionCard({
  q,
  number,
  mode = "practice",
  revealed = false,
  onChange,
}: Props) {
  const [value, setValue] = useState<Value>(() => emptyValue(q));
  const [checkedHere, setCheckedHere] = useState(false);
  const checked = mode === "exam" ? revealed : checkedHere;
  const result = grade(q, value);
  const before = useProgress()[q.id];

  useEffect(() => {
    if (mode === "exam") onChange?.(q.id, result);
  }, [mode, onChange, q.id, result]);

  function check() {
    if (result === null) return;
    setCheckedHere(true);
    recordResult(q.id, result);
  }

  function retry() {
    setValue(emptyValue(q));
    setCheckedHere(false);
  }

  return (
    <section className={`${card} not-prose my-6`}>
      <CardHeader q={q} number={number} before={mode === "practice" ? before : undefined} />
      <div className="px-5 py-4 text-[15px] leading-relaxed">
        <RichText text={q.prompt} />
        {q.codeHtml && (
          <div
            className="my-3 overflow-x-auto rounded-sm border border-stone-200 text-[13px] dark:border-stone-800 [&_.shiki]:[--code-pad:1rem]"
            dangerouslySetInnerHTML={{ __html: q.codeHtml }}
          />
        )}
        <Input q={q} value={value} setValue={setValue} checked={checked} />
      </div>
      {mode === "practice" && !checked && (
        <footer className="flex items-center gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={check}
            disabled={result === null}
            className={buttonPrimary}
          >
            Check my answer
          </button>
          {result === null && (
            <span className="text-sm text-stone-500">Answer first, then check.</span>
          )}
        </footer>
      )}
      {checked && (
        <Feedback
          result={result}
          explain={q.explain}
          onRetry={mode === "practice" ? retry : undefined}
        />
      )}
    </section>
  );
}
