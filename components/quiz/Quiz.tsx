"use client";

import { Clock, Timer } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { RenderedQuestion } from "@/lib/questions";
import { recordResult } from "@/lib/progress";
import { shuffle } from "@/lib/shuffle";
import { buttonPrimary, card } from "@/lib/ui";
import QuestionCard from "./QuestionCard";

const SIZE = 15;
const PASS = 55;

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60))}:${String(seconds % 60).padStart(2, "0")}`;
}

function StartScreen({ poolSize, onStart }: { poolSize: number; onStart: () => void }) {
  return (
    <div className={`${card} not-prose my-8 p-8 text-center`}>
      <span className="mx-auto mb-3 inline-flex text-stone-400">
        <Timer className="size-8" aria-hidden />
      </span>
      <p className="text-2xl font-semibold">
        {SIZE} random questions from {poolSize}
      </p>
      <button
        type="button"
        onClick={onStart}
        className={`${buttonPrimary} mt-6 px-6 py-3 text-base`}
      >
        Start
      </button>
    </div>
  );
}

export default function Quiz({ pool }: { pool: RenderedQuestion[] }) {
  const [questions, setQuestions] = useState<RenderedQuestion[] | null>(null);
  const [results, setResults] = useState<Record<string, boolean | null>>({});
  const [handedIn, setHandedIn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!questions || handedIn) return;
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [questions, handedIn]);

  const onChange = useCallback((id: string, result: boolean | null) => {
    setResults((r) => (r[id] === result ? r : { ...r, [id]: result }));
  }, []);

  function start() {
    setQuestions(shuffle(pool).slice(0, SIZE));
    setResults({});
    setHandedIn(false);
    setSeconds(0);
    setRound((r) => r + 1);
    window.scrollTo({ top: 0 });
  }

  if (!questions) return <StartScreen poolSize={pool.length} onStart={start} />;

  const answered = questions.filter((q) => (results[q.id] ?? null) !== null).length;
  const right = questions.filter((q) => results[q.id] === true).length;
  const percent = Math.round((right / questions.length) * 100);

  function handIn(list: RenderedQuestion[]) {
    const open = list.length - answered;
    const question = `${String(open)} questions have no full answer. Hand in anyway?`;
    if (open > 0 && !confirm(question)) return;
    for (const q of list) {
      recordResult(q.id, results[q.id] === true);
    }
    setHandedIn(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="not-prose">
      <div
        className={`${card} sticky top-16 z-10 my-6 flex flex-wrap items-center gap-4 px-5 py-3`}
      >
        {handedIn ? (
          <span
            className={`text-lg font-semibold ${percent >= PASS ? "text-emerald-700" : "text-rose-700"}`}
          >
            Score: {right} of {questions.length} ({percent}%)
          </span>
        ) : (
          <span className="font-semibold">
            Answered: {answered} of {questions.length}
          </span>
        )}
        <span className="flex items-center gap-1 text-sm text-stone-500 tabular-nums">
          <Clock className="size-4" aria-hidden />
          {formatTime(seconds)}
        </span>
        <button
          type="button"
          onClick={() => {
            if (handedIn) start();
            else handIn(questions);
          }}
          className={`${buttonPrimary} ml-auto`}
        >
          {handedIn ? "New quiz" : "Hand in"}
        </button>
      </div>
      {questions.map((q, i) => (
        <QuestionCard
          key={`${String(round)}-${q.id}`}
          q={q}
          number={i + 1}
          mode="exam"
          revealed={handedIn}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
