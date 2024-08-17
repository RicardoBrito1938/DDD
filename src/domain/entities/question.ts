import { randomUUID } from "node:crypto";
import type { Slug } from "./value-objects/slug";

interface QuestionProps {
	title: string;
	content: string;
	slug: Slug;
	authorId: string;
}

export class Question {
	public id: string;
	public title: string;
	public slug: Slug;
	public content: string;
	public authorId: string;

	constructor({ authorId, content, title, slug }: QuestionProps, id?: string) {
		this.title = title;
		this.content = content;
		this.slug = slug;
		this.id = id ?? randomUUID();
		this.authorId = authorId;
	}
}
