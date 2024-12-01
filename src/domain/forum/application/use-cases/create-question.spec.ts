import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create question", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("create a question", async () => {
		const result = await sut.execute({
			authorId: "1",
			title: "Nova pergunta",
			content: "Conteúdo da pergunta",
			attachmentsIds: ["1", "2"],
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryQuestionsRepository.items).toHaveLength(1);
		expect(inMemoryQuestionsRepository.items[0]).toEqual(
			result.value?.question,
		);
		expect(result.value?.question.attachments.currentItems).toHaveLength(2);
	});
});
