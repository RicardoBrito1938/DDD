import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { FetchRecentQuestionsCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsCase;

describe("Fetch recent questions", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new FetchRecentQuestionsCase(inMemoryQuestionsRepository);
	});

	it("Should be able to fetch recent questions", async () => {
		await inMemoryQuestionsRepository.create(
			makeQuestion({
				createdAt: new Date("2021-01-18"),
			}),
		);
		await inMemoryQuestionsRepository.create(
			makeQuestion({
				createdAt: new Date("2021-01-01"),
			}),
		);
		await inMemoryQuestionsRepository.create(
			makeQuestion({
				createdAt: new Date("2021-01-20"),
			}),
		);

		const { questions } = await sut.execute({
			page: 1,
		});

		expect(questions.length).toBe(3);
		expect(questions).toEqual([
			expect.objectContaining({
				createdAt: new Date("2021-01-20"),
			}),
			expect.objectContaining({
				createdAt: new Date("2021-01-18"),
			}),
			expect.objectContaining({
				createdAt: new Date("2021-01-01"),
			}),
		]);
	});
});
