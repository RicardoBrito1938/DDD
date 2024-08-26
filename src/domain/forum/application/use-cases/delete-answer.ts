import { Answer } from "@/domain/forum/enterprise/entities/answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface DeleteAnswerUseCaseRequest {
	answerId: string;
	authorId: string;
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type DeleteAnswerUseCaseResponse = {};

export class DeleteAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		answerId,
		authorId,
	}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer not found");
		}

		if (authorId !== answer.authorId.toString()) {
			throw new Error("You can only delete your own answers");
		}
		await this.answersRepository.delete(answer);

		return {};
	}
}
