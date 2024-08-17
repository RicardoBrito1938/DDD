import { Answer } from "../entities/answer";
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
		const answer = new Answer({
			authorId: instructorId,
			content,
			questionId,
		});

		await this.answersRepository.create(answer);

		return answer;
	}
}
