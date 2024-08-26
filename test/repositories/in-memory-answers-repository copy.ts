import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = [];

	create(answer: Answer): Promise<void> {
		this.items.push(answer);
		return Promise.resolve();
	}

	async delete(answer: Answer): Promise<void> {
		this.items = this.items.filter((item) => item.id !== answer.id);
		return Promise.resolve();
	}

	async findById(answerId: string): Promise<Answer | null> {
		const answer = this.items.find(
			(answer) => answer.id.toString() === answerId,
		);
		return Promise.resolve(answer || null);
	}
}
