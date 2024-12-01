import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("AnswerQuestionUseCase", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});

	it("should create an answer", async () => {
		const result = await sut.execute({
			questionId: "1",
			instructorId: "1",
			content: "Answer",
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryAnswersRepository.items).toHaveLength(1);
		expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
	});
});
