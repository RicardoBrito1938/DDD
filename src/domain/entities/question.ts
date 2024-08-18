import { randomUUID } from "node:crypto";
import { Entity } from "../../core/entities/entity";
import type { UniqueEntityId } from "../../core/entities/unique-entity-id";
import type { Optional } from "../../core/types/optional";
import type { Slug } from "./value-objects/slug";

interface QuestionProps {
	authorId: UniqueEntityId;
	bestAnswerId?: UniqueEntityId;
	title: string;
	content: string;
	slug: Slug;
	createdAt: Date;
	updatedAt?: Date;
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class Question extends Entity<QuestionProps> {
	static create(
		props: Optional<QuestionProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const question = new Question({ ...props, createdAt: new Date() }, id);

		return question;
	}
}
