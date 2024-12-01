import type { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
	implements AnswerCommentsRepository
{
	public items: AnswerComment[] = [];

	async create(answerComment: AnswerComment): Promise<void> {
		this.items.push(answerComment);
		return Promise.resolve();
	}

	async findById(id: string): Promise<AnswerComment | null> {
		const answerComment = this.items.find((item) => item.id.toString() === id);
		return Promise.resolve(answerComment || null);
	}

	async delete(answerComment: AnswerComment): Promise<void> {
		this.items = this.items.filter((item) => item.id !== answerComment.id);
		return Promise.resolve();
	}
}
