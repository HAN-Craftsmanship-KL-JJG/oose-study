"use client";

import { Check, X } from "lucide-react";
import type { ChoiceQuestion } from "@/lib/questions";
import { rightOptions, type ChoiceValue } from "./grading";
import { Inline } from "./RichText";

const LETTERS = "ABCDEFGHIJ";

function optionStyle(chosen: boolean, isRight: boolean, checked: boolean): string {
  if (checked && isRight) {
    return "border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/50";
  }
  if (checked && chosen) {
    return "border-rose-500 bg-rose-50 dark:border-rose-500 dark:bg-rose-950/50";
  }
  if (chosen) {
    return "border-accent-600 bg-accent-50/60 dark:border-accent-400 dark:bg-accent-950/50";
  }
  return "border-stone-200 hover:border-stone-300 dark:border-stone-700";
}

export default function ChoiceInput({
  q,
  value,
  setValue,
  checked,
}: {
  q: ChoiceQuestion;
  value: ChoiceValue;
  setValue: (value: ChoiceValue) => void;
  checked: boolean;
}) {
  const right = rightOptions(q);
  const multi = right.length > 1;

  function toggle(i: number) {
    if (checked) return;
    if (!multi) {
      setValue([i]);
      return;
    }
    setValue(value.includes(i) ? value.filter((x) => x !== i) : [...value, i].sort());
  }

  return (
    <div className="mt-4">
      {multi && (
        <p className="mb-2 text-sm font-semibold text-accent-600 dark:text-accent-400">
          Choose all right answers.
        </p>
      )}
      <ul className="space-y-2">
        {q.options.map((option, i) => {
          const chosen = value.includes(i);
          const isRight = right.includes(i);
          return (
            <li key={option}>
              <button
                type="button"
                role={multi ? "checkbox" : "radio"}
                aria-checked={chosen}
                disabled={checked}
                onClick={() => {
                  toggle(i);
                }}
                className={`flex w-full items-start gap-3 rounded-sm border px-3 py-2.5 text-left transition disabled:cursor-default ${optionStyle(chosen, isRight, checked)}`}
              >
                <span
                  className={`mt-px flex size-6 shrink-0 items-center justify-center text-xs font-semibold ${
                    multi ? "rounded-sm" : "rounded-full"
                  } ${
                    chosen
                      ? "bg-accent-600 text-white"
                      : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                  }`}
                >
                  {LETTERS[i]}
                </span>
                <span className="flex-1">
                  <Inline text={option} />
                </span>
                {checked && isRight && (
                  <Check className="size-5 text-emerald-600" aria-label="right" />
                )}
                {checked && chosen && !isRight && (
                  <X className="size-5 text-rose-600" aria-label="wrong" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
