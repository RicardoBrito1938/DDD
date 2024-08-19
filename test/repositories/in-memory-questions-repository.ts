import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[] = [];

	async create(question: Question): Promise<void> {
		this.items.push(question);
		return Promise.resolve();
	}

	async getBySlug(slug: string): Promise<Question | null> {
		const question = this.items.find(
			(question) => question.slug.value === slug,
		);
		return Promise.resolve(question || null);
	}
}
