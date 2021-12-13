export interface Question {
  student: string;
  question: string;
  tags?: string;
  class: string;
  submitAt: Date;
}

export interface QuestionDB extends Question {
  id: number;
  answered: boolean;
  answeredAt: Date;
  answeredBy: string;
  answer: string;
}

export interface UnansweredQuestion extends Question {
  answered?: boolean;
  id?: number;
}

export interface AnsweredQuestion extends UnansweredQuestion {
  answeredAt: Date;
  answeredBy: string;
  answer: string;
}
