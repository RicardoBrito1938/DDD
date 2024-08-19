import type { Question } from "@/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface GetQuestionBySlugUseCaseRequest {
	slug: string;
}

interface GetQuestionBySlugUseCaseResponse {
	question: Question;
}

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.getBySlug(slug);

		if (!question) {
			throw new Error("Question not found");
		}

		return {
			question,
		};
	}
}
