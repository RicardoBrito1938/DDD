import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import type { AnswersRepository } from "../repositories/asnwers-repository";

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
	}: AnswerQuestionUseCaseRequest) {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
		});

		await this.answersRepository.create(answer);

		return answer;
	}
}
