import dayjs from "dayjs";

import { Slug } from "./value-objects/slug";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Entity } from "@/core/entities/entity";
import type { Optional } from "@/core/types/optional";

interface QuestionProps {
	authorId: UniqueEntityId;
	bestAnswerId?: UniqueEntityId;
	title: string;
	content: string;
	slug: Slug;
	createdAt: Date;
	updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
	get authorId(): UniqueEntityId {
		return this.props.authorId;
	}

	get bestAnswerId(): UniqueEntityId | undefined {
		return this.props.bestAnswerId;
	}

	get title(): string {
		return this.props.title;
	}

	get content(): string {
		return this.props.content;
	}

	get slug(): Slug {
		return this.props.slug;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date | undefined {
		return this.props.updatedAt;
	}

	get isNew(): boolean {
		return dayjs().diff(this.props.createdAt, "day") <= 1;
	}

	get excerpt(): string {
		return this.props.content.substring(0, 100).trimEnd().concat("...");
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	set title(content: string) {
		this.props.content = content;
		this.props.slug = Slug.createFromText(content);
		this.touch();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
		this.props.bestAnswerId = bestAnswerId;
		this.touch();
	}

	static create(
		props: Optional<QuestionProps, "createdAt" | "slug">,
		id?: UniqueEntityId,
	) {
		const question = new Question(
			{
				...props,
				slug: props.slug ?? Slug.createFromText(props.title),
				createdAt: new Date(),
			},
			id,
		);

		return question;
	}
}
