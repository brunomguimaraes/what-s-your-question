import { validadeQuestionSyntax } from '../validations/questionValidation';
import * as questionsRepository from '../repositories/questionsRepository';
import { validadeAnswerSyntax } from '../validations/answerValidation';
import {
  AnsweredQuestion,
  Question,
  QuestionDB,
  UnansweredQuestion,
} from '../interfaces/Question';
import { Answer } from '../interfaces/Answer';
import SyntaxError from '../errors/SyntaxError';
import NotFoundError from '../errors/NotFoundError';
import AlreadyExistsError from '../errors/AlreadyExistsError';

export async function postQuestion(question: Question): Promise<number> {
  const isSyntaxValid = validadeQuestionSyntax(question);
  if (!isSyntaxValid.result) throw new SyntaxError(isSyntaxValid.message);

  const questionId = await questionsRepository.insertQuestion(question);

  return questionId;
}

export async function answerQuestion(answer: Answer) {
  const isAnswerValid = validadeAnswerSyntax(answer);
  if (!isAnswerValid.result) throw new SyntaxError(isAnswerValid.message);

  const question = await questionsRepository.getQuestionById(answer.questionId);
  if (!question) throw new NotFoundError('question not found');
  if (question.answered)
    throw new AlreadyExistsError('this question has already been answered');

  const answerTimestamp = new Date();

  await questionsRepository.insertAnswer({ ...answer, answerTimestamp });
}

export async function getUnansweredQuestions() {
  const questions = await questionsRepository.getUnansweredQuestions();
  return questions.map((question: QuestionDB) => ({
    id: question.id,
    question: question.question,
    student: question.student,
    class: question.class,
    submitAt: question.submitAt,
  }));
}

export async function getQuestionById(
  id: number
): Promise<UnansweredQuestion | AnsweredQuestion> {
  const question = await questionsRepository.getQuestionById(id);
  if (!question.answered) {
    return {
      question: question.question,
      student: question.student,
      class: question.class,
      tags: question.tags,
      answered: question.answered,
      submitAt: question.submitAt,
    };
  }
  delete question.id;
  return question;
}
