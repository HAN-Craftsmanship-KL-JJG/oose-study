import { questionById, questionsForTopic } from "@/content/questions";
import { renderQuestions } from "@/lib/highlight";
import QuestionList from "./QuestionList";

/**
 * Interactive questions from the question bank.
 * <Questions topic="solid" /> shows every question of a topic, with a score.
 * <Questions ids={["solid-ocp"]} /> shows the questions you name, in that order.
 */
export default async function Questions({ topic, ids }: { topic?: string; ids?: string[] }) {
  const list = ids ? ids.map(questionById) : topic ? questionsForTopic(topic) : [];
  if (list.length === 0) {
    throw new Error(`<Questions> found no questions for ${topic ?? ids?.join(", ") ?? "nothing"}`);
  }
  return <QuestionList questions={await renderQuestions(list)} showScore={!ids} />;
}
