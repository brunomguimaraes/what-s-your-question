import { validadeQuestionSyntax } from '../schemas/questionSchema';
import * as questionsRepository from '../repositories/questionsRepository';

interface Question {
  student: string;
  question: string;
  tags: string;
  _class: string;
}

export async function postQuestion(question: Question) {
  const isSyntaxValid = validadeQuestionSyntax(question);
  if (!isSyntaxValid) throw new Error();

  await questionsRepository.insertQuestion(question);
}
