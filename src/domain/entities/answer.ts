import { randomUUID } from "crypto";

interface AnswerProps {
  content: string;
  questionId: string;
  authorId: string;
}

export class Answer {
  public id: string;
  public content: string;
  public authorId: string;
  public questionId: string;

  constructor({ authorId, content, questionId }: AnswerProps, id?: string) {
    this.content = content;
    this.id = id ?? randomUUID();
    this.authorId = authorId;
    this.questionId = questionId;
  }
}
