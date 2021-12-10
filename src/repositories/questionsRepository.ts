import connection from '../database';

interface Question {
  student: string;
  question: string;
  tags: string;
  _class: string;
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
