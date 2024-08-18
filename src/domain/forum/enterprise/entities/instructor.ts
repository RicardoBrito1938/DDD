import { Entity } from "../../core/entities/entity";
import type { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface InstructorProps {
	name: string;
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class Instructor extends Entity<InstructorProps> {
	static create(props: InstructorProps, id?: UniqueEntityId) {
		const instructor = new Instructor(props, id);

		return instructor;
	}
}
