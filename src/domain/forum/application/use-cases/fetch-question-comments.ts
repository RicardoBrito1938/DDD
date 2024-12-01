import type { QuestionComment } from "../../enterprise/entities/question-comment";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionCommentsCaseRequest {
	questionId: string;
	page: number;
}

interface FetchQuestionCommentsCaseResponse {
	questionComment: QuestionComment[];
}

export class FetchQuestionCommentsCase {
	constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

	async execute({
		questionId,
		page,
	}: FetchQuestionCommentsCaseRequest): Promise<FetchQuestionCommentsCaseResponse> {
		const questionComment =
			await this.questionCommentsRepository.findManyByQuestionId(questionId, {
				page,
			});

		return {
			questionComment,
		};
	}
}
