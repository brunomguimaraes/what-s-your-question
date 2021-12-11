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

export async function getUnansweredQuestions() {
  const questions = await questionsRepository.getUnansweredQuestions();
  return questions.map((question: any) => ({
    id: question.id,
    question: question.question,
    student: question.student,
    class: question.class,
    submitAt: question.submitAt,
  }));
}

export async function getQuestionById(id: number) {
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
