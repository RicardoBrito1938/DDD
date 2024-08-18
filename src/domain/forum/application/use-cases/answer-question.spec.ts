import type { Answer } from "../../enterprise/entities/answer";
import type { AnswersRepository } from "../repositories/asnwers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

const fakeAnswersRepository: AnswersRepository = {
	create: async (answer: Answer) => Promise.resolve(),
};

test("create an answer", async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

	const answer = await answerQuestion.execute({
		questionId: "1",
		instructorId: "1",
		content: "Answer",
	});

	expect(answer.content).toEqual("Answer");
});
