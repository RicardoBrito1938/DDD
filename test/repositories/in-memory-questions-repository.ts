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

	async delete(question: Question): Promise<void> {
		this.items = this.items.filter((item) => item.id !== question.id);
		return Promise.resolve();
	}

	async findById(questionId: string): Promise<Question | null> {
		const question = this.items.find(
			(question) => question.id.toString() === questionId,
		);
		return Promise.resolve(question || null);
	}
}
