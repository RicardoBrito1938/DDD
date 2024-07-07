import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    questionId: "1",
    instructorId: "1",
    content: "Answer",
  });

  expect(answer.content).toEqual("Answer");
});
