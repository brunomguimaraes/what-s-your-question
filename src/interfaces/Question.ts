export interface Question {
  student: string;
  question: string;
  tags?: string;
  class: string;
}

export interface QuestionDB extends Question {
  id: number;
  answered: boolean;
  submitAt: Date;
  answeredAt: Date;
  answeredBy: string;
  answer: string;
}

export interface UnansweredQuestion extends Question {
  answered?: boolean;
  submitAt: Date;
  id?: number;
}

export interface AnsweredQuestion extends UnansweredQuestion {
  answeredAt: Date;
  answeredBy: string;
  answer: string;
}
