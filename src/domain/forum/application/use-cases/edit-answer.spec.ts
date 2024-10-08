import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository copy";
import { EditAnswerUseCase } from "./edit-answer";

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-annswer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new EditAnswerUseCase(inMemoryAnswersRepository);
	});

	it("should be able to edit a answer", async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityId("author-1"),
			},
			new UniqueEntityId("answer-1"),
		);

		await inMemoryAnswersRepository.create(newAnswer);

		await sut.execute({
			answerId: newAnswer.id.toValue(),
			authorId: "author-1",
			content: "New content",
		});

		expect(inMemoryAnswersRepository.items[0]).toMatchObject({
			content: "New content",
		});
	});

	it("should not be able to edit a answer from another user", async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityId("author-1"),
			},
			new UniqueEntityId("answer-1"),
		);

		await inMemoryAnswersRepository.create(newAnswer);

		expect(() => {
			return sut.execute({
				answerId: newAnswer.id.toValue(),
				authorId: "author-2",
				content: "Conteúdo teste",
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
