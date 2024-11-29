import type { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
	implements QuestionCommentsRepository
{
	public items: QuestionComment[] = [];

	async create(questionComment: QuestionComment): Promise<void> {
		this.items.push(questionComment);
		return Promise.resolve();
	}

	async findById(id: string): Promise<QuestionComment | null> {
		const questionComment = this.items.find(
			(questionComment) => questionComment.id.toString() === id,
		);

		return Promise.resolve(questionComment || null);
	}

	async delete(questionComment: QuestionComment): Promise<void> {
		this.items = this.items.filter((item) => item.id !== questionComment.id);
		return Promise.resolve();
	}
}
