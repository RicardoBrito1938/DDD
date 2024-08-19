import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = [];

	create(answer: Answer): Promise<void> {
		this.items.push(answer);
		return Promise.resolve();
	}
}