import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get question by slug", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});

	it("get question by slug", async () => {
		const newQuestion = Question.create({
			authorId: new UniqueEntityId("1"),
			title: "New question",
			slug: Slug.create("new-question"),
			content: "Content",
		});

		await inMemoryQuestionsRepository.create(newQuestion);

		const { question } = await sut.execute({
			slug: "new-question",
		});

		expect(question.id).toBeTruthy();
	});
});