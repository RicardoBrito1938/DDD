import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { Optional } from "@/core/types/optional";

export interface AnswerProps {
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

	get questionId(): UniqueEntityId {
		return this.props.questionId;
	}

	get authorId(): UniqueEntityId {
		return this.props.authorId;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date | undefined {
		return this.props.updatedAt;
	}

	get excerpt(): string {
		return this.props.content.substring(0, 100).trimEnd().concat("...");
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	static create(
		props: Optional<AnswerProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const answer = new Answer({ ...props, createdAt: new Date() }, id);

		return answer;
	}
}
