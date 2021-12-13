import connection from '../database';
import { QuestionDB, Question } from '../interfaces/Question';
import { Answer } from '../interfaces/Answer';

export async function insertQuestion(question: Question): Promise<number> {
  const createdQuestion = await connection.query(
    `
    INSERT INTO questions
      (student, question, tags, class, "submitAt")
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING
      *;
      `,
    [
      question.student,
      question.question,
      question.tags,
      question.class,
      question.submitAt,
    ]
  );
  return createdQuestion.rows[0].id;
}

export async function getQuestionById(id: number): Promise<QuestionDB> {
  const question = await connection.query(
    `
    SELECT
      *
    FROM
      questions
    WHERE
      id = $1;
    `,
    [id]
  );
  return question.rows[0];
}

export async function insertAnswer(answer: Answer) {
  await connection.query(
    `
    UPDATE
      questions
    SET "answeredAt" = $1,
        "answeredBy" = $2,
        answer = $3,
        answered = true
    WHERE id = $4;
  `,
    [answer.answeredAt, answer.userId, answer.text, answer.questionId]
  );
}

export async function getUnansweredQuestions(): Promise<QuestionDB[]> {
  const questions = await connection.query(`
    SELECT
      *
    FROM
      questions
    WHERE
      answered = false;
  `);
  return questions.rows;
}
