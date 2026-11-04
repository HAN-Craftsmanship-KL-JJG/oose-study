"use client";

import { ChevronLeft, ChevronRight, Footprints, RotateCcw } from "lucide-react";
import { useRef, type KeyboardEvent } from "react";
import type { TraceStep } from "@/lib/trace";
import { Inline } from "./quiz/RichText";
import { Objects, Stack } from "./TraceState";

const controlBase =
  "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-sm font-medium " +
  "transition disabled:opacity-40";

const control =
  `${controlBase} border-stone-200 bg-white text-stone-700 hover:border-accent-400 ` +
  "dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200";

const primary =
  `${controlBase} border-accent-700 bg-accent-700 text-white hover:bg-accent-800 ` +
  "dark:border-accent-600 dark:bg-accent-600 dark:hover:bg-accent-500";

const heading = "mb-1.5 text-xs font-semibold tracking-wide text-stone-500 uppercase";

/** Start, then back, next and reset, with the step number. The reader moves every step. */
function Controls({ index, count, go }: { index: number; count: number; go: (i: number) => void }) {
  const started = index >= 0;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {started ? (
        <>
          <button
            type="button"
            className={control}
            onClick={() => {
              go(index - 1);
            }}
            disabled={index === 0}
          >
            <ChevronLeft className="size-4" aria-hidden />
            Back
          </button>
          <button
            type="button"
            className={primary}
            onClick={() => {
              go(index + 1);
            }}
            disabled={index >= count - 1}
          >
            Next
            <ChevronRight className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            className={control}
            onClick={() => {
              go(-1);
            }}
          >
            <RotateCcw className="size-3.5" aria-hidden />
            Stop
          </button>
        </>
      ) : (
        <button
          type="button"
          className={primary}
          onClick={() => {
            go(0);
          }}
        >
          <Footprints className="size-3.5" aria-hidden />
          Run step by step
        </button>
      )}
      <span className="ml-auto text-sm text-stone-500 tabular-nums">
        {started ? `Step ${String(index + 1)} of ${String(count)}` : `${String(count)} steps`}
      </span>
    </div>
  );
}

/** What the current step shows: the explanation, the call stack, the objects and the output. */
function StepView({ step }: { step: TraceStep }) {
  return (
    <div className="mb-3">
      <p
        aria-live="polite"
        className="mb-3 text-[15px] leading-relaxed text-stone-800 dark:text-stone-200"
      >
        <span className="mr-2 inline-block rounded-sm border border-stone-200 px-1.5 align-[1px] font-mono text-xs text-stone-500 dark:border-stone-700 dark:text-stone-400">
          line {step.line}
        </span>
        <Inline text={step.say} />
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <section>
          <h3 className={heading}>Running now</h3>
          <Stack stack={step.stack} />
        </section>
        <section>
          <h3 className={heading}>Objects</h3>
          <Objects objects={step.objects} active={step.stack.at(-1)?.on} />
        </section>
      </div>
      {step.output.length > 0 && (
        <section className="mt-4">
          <h3 className={heading}>Printed</h3>
          <pre className="rounded-sm bg-stone-900 px-3 py-2 font-mono text-[13px] text-stone-100 dark:bg-black">
            {step.output.join("\n")}
          </pre>
        </section>
      )}
    </div>
  );
}

/**
 * The step-by-step player at the bottom of a code example. It stays in view while the example is.
 * Step -1 means the run has not started. The parent marks the current line in the code.
 */
export default function TracePlayer({
  steps,
  index,
  setIndex,
}: {
  steps: TraceStep[];
  index: number;
  setIndex: (i: number) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const go = (i: number) => {
    setIndex(Math.max(-1, Math.min(steps.length - 1, i)));
    // A button that disappears or turns off drops the focus; keep it here for the arrow keys.
    requestAnimationFrame(() => {
      if (document.activeElement === document.body) box.current?.focus({ preventScroll: true });
    });
  };

  // The arrow keys step through the code while focus is in the player.
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    else if (e.key === "ArrowLeft" && index > 0) go(index - 1);
    else if (e.key !== "ArrowLeft") return;
    e.preventDefault();
  };

  const step = steps[index];
  return (
    <div
      ref={box}
      tabIndex={-1}
      onKeyDown={onKey}
      className="sticky bottom-0 z-10 border-t border-stone-200 bg-stone-50 px-4 py-3 shadow-[0_-4px_12px_rgb(0_0_0/0.06)] outline-none dark:border-stone-800 dark:bg-stone-900"
    >
      {step && <StepView step={step} />}
      <Controls index={index} count={steps.length} go={go} />
    </div>
  );
}
