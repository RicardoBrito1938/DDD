import type { Question } from "@/domain/forum/enterprise/entities/question";

export interface QuestionsRepository {
	findById(questionId: string): Promise<Question | null>;
	create(question: Question): Promise<void>;
	getBySlug(slug: string): Promise<Question | null>;
	delete(question: Question): Promise<void>;
	update(question: Question): Promise<void>;
}
