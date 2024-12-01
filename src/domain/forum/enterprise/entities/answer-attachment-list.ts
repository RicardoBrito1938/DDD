import { WatchedList } from "@/core/entities/watched-list";
import type { AnswerAttachment } from "./answer-attachement";

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
	compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
		return a.attachmentId === b.attachmentId;
	}
}
