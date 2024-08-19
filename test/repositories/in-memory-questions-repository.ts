import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[] = [];

	create(question: Question): Promise<void> {
		this.items.push(question);
		return Promise.resolve();
	}
}
