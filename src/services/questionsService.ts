import { validadeQuestionSyntax } from '../schemas/questionSchema';
import * as questionsRepository from '../repositories/questionsRepository';
import { validadeAnswerSyntax } from '../schemas/answerSchema';

interface Question {
  student: string;
  question: string;
  tags: string;
  _class: string;
}

interface Answer {
  text: string;
  questionId: number;
  userId: number;
}

export async function postQuestion(question: Question) {
  const isSyntaxValid = validadeQuestionSyntax(question);
  if (!isSyntaxValid) throw new Error();

  const questionId = await questionsRepository.insertQuestion(question);

  return questionId;
}

export async function answerQuestion(answer: Answer) {
  const isAnswerValid = validadeAnswerSyntax(answer.text);
  if (!isAnswerValid) return false;

  const questionExists = await questionsRepository.getQuestionById(
    answer.questionId
  );
  if (!questionExists) return false;

  const answerTimestamp = new Date();

  await questionsRepository.insertAnswer({ ...answer, answerTimestamp });
  return true;
}
