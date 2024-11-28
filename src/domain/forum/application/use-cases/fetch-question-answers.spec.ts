import { FetchQuestionAnswersCase } from "./fetch-question-answers";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-annswer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersCase;

describe("Fetch question answers", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new FetchQuestionAnswersCase(inMemoryAnswersRepository);
	});

	it("Should be able to fetch question answers", async () => {
		await inMemoryAnswersRepository.create(
			makeAnswer({
				questionId: new UniqueEntityId("question-1"),
			}),
		);
		await inMemoryAnswersRepository.create(
			makeAnswer({
				questionId: new UniqueEntityId("question-1"),
			}),
		);
		await inMemoryAnswersRepository.create(
			makeAnswer({
				questionId: new UniqueEntityId("question-1"),
			}),
		);

		const { answers } = await sut.execute({
			questionId: "question-1",
			page: 1,
		});

		expect(answers.length).toBe(3);
	});
});
