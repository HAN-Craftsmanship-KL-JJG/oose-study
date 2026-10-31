"use client";

import type { JudgeQuestion, MatchQuestion, TextQuestion } from "@/lib/questions";
import { resultStyle } from "@/lib/ui";
import type { JudgeValue, MatchValue, TextValue } from "./grading";
import { Inline } from "./RichText";

interface InputProps<Q, V> {
  q: Q;
  value: V;
  setValue: (value: V) => void;
  checked: boolean;
}

function RightAnswer({ text }: { text: string }) {
  return (
    <span className="mt-1 block text-sm font-semibold text-emerald-700 dark:text-emerald-300">
      Right: {text}
    </span>
  );
}

export function MatchInput({ q, value, setValue, checked }: InputProps<MatchQuestion, MatchValue>) {
  return (
    <ol className="mt-4 space-y-2">
      {q.pairs.map((pair, i) => (
        <li
          key={pair.item}
          className={`grid gap-2 rounded-sm border px-3 py-2.5 sm:grid-cols-[1fr_13rem] sm:items-center ${resultStyle(checked, value[i] === pair.answer)}`}
        >
          <span>
            <span className="mr-2 font-semibold text-accent-500">{i + 1}.</span>
            <Inline text={pair.item} />
          </span>
          <span>
            <select
              aria-label={`Answer for item ${String(i + 1)}`}
              value={value[i] ?? ""}
              disabled={checked}
              onChange={(e) => {
                setValue(value.map((v, j) => (j === i ? e.target.value : v)));
              }}
              className="w-full rounded-sm border border-stone-300 bg-white px-2 py-1.5 dark:border-stone-600 dark:bg-stone-800"
            >
              <option value="">Choose…</option>
              {q.choices.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {checked && value[i] !== pair.answer && <RightAnswer text={pair.answer} />}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function JudgeInput({ q, value, setValue, checked }: InputProps<JudgeQuestion, JudgeValue>) {
  const [yes, no] = q.labels ?? ["True", "False"];
  return (
    <ul className="mt-4 space-y-2">
      {q.statements.map((s, i) => (
        <li
          key={s.text}
          className={`flex flex-col gap-2 rounded-sm border px-3 py-2.5 sm:flex-row sm:items-center ${resultStyle(checked, value[i] === s.correct)}`}
        >
          <span className="flex-1">
            <Inline text={s.text} />
            {checked && value[i] !== s.correct && <RightAnswer text={s.correct ? yes : no} />}
          </span>
          <span className="flex shrink-0 gap-1">
            {([true, false] as const).map((option) => (
              <button
                key={String(option)}
                type="button"
                aria-pressed={value[i] === option}
                disabled={checked}
                onClick={() => {
                  setValue(value.map((v, j) => (j === i ? option : v)));
                }}
                className="rounded-sm border border-stone-300 px-3 py-1 text-sm font-medium transition hover:border-accent-400 disabled:cursor-default aria-pressed:border-accent-600 aria-pressed:bg-accent-600 aria-pressed:text-white dark:border-stone-600"
              >
                {option ? yes : no}
              </button>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TextInput({ q, value, setValue, checked }: InputProps<TextQuestion, TextValue>) {
  return (
    <div className="mt-4">
      <input
        type="text"
        value={value}
        disabled={checked}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Type your answer"
        aria-label="Your answer"
        className="w-full max-w-sm rounded-sm border border-stone-300 bg-white px-3 py-2 transition outline-none focus:border-accent-500 dark:border-stone-600 dark:bg-stone-800"
      />
      {checked && <RightAnswer text={q.accept[0] ?? ""} />}
    </div>
  );
}
