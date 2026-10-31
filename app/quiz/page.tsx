import type { Metadata } from "next";
import Quiz from "@/components/quiz/Quiz";
import { QUESTIONS } from "@/content/questions";
import { renderQuestions } from "@/lib/highlight";
import { THEORY_TOPICS } from "@/lib/pages";

export const metadata: Metadata = { title: "Quiz" };

export default async function QuizPage() {
  const pool = await renderQuestions(QUESTIONS.filter((q) => THEORY_TOPICS.includes(q.topic)));
  return (
    <>
      <h1>Quiz</h1>
      <Quiz pool={pool} />
    </>
  );
}
