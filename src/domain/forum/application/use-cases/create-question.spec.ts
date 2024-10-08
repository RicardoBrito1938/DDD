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
		const { question } = await sut.execute({
			authorId: "1",
			title: "Nova pergunta",
			content: "Conteúdo da pergunta",
		});

		expect(question.id).toBeTruthy();
	});
});
