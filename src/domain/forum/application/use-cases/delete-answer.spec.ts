import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-annswer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete answer", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
	});

	it("Should be able to delete a answer", async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityId("1"),
			},
			new UniqueEntityId("answer-1"),
		);

		await inMemoryAnswersRepository.create(newAnswer);

		await sut.execute({
			answerId: "answer-1",
			authorId: "1",
		});

		expect(inMemoryAnswersRepository.items.length).toBe(0);
	});

	it("Should be able to delete a answer from another user", async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityId("1"),
			},
			new UniqueEntityId("answer-1"),
		);

		await inMemoryAnswersRepository.create(newAnswer);

		expect(() =>
			sut.execute({
				answerId: "answer-1",
				authorId: "2",
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
