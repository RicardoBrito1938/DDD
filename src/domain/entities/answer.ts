import { Entity } from "../../core/entities/entity";
import type { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface AnswerProps {
	questionId: UniqueEntityId;
	authorId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
	get content(): string {
		return this.props.content;
	}
}
