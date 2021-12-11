import connection from '../database';

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
  answerTimestamp: Date;
}

export async function insertQuestion(question: Question) {
  await connection.query(
    `
    INSERT INTO questions
      (student, question, tags, class)
    VALUES
      ($1, $2, $3, $4);
      `,
    [question.student, question.question, question.tags, question._class]
  );
}

export async function getQuestionById(id: number) {
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
    [answer.answerTimestamp, answer.userId, answer.text, answer.questionId]
  );
}
