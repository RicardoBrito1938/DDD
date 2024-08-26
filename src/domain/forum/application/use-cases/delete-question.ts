import { Question } from "@/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface DeleteQuestionUseCaseRequest {
	questionId: string;
	authorId: string;
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type DeleteQuestionUseCaseResponse = {};

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		questionId,
		authorId,
	}: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error("Question not found");
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error("You can only delete your own questions");
		}
		await this.questionsRepository.delete(question);

		return {};
	}
}
