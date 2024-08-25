import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionUseCase } from "./deelte-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete question", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("Should be able to delete a question", async () => {
		const newQuestion = makeQuestion(
			{
				authorId: new UniqueEntityId("1"),
			},
			new UniqueEntityId("question-1"),
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		await sut.execute({
			questionId: "question-1",
			authorId: "1",
		});

		expect(inMemoryQuestionsRepository.items.length).toBe(0);
	});

	it("Should be able to delete a question from another user", async () => {
		const newQuestion = makeQuestion(
			{
				authorId: new UniqueEntityId("1"),
			},
			new UniqueEntityId("question-1"),
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		expect(() =>
			sut.execute({
				questionId: "question-1",
				authorId: "2",
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
