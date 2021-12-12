import connection from '../database';
import { CreateUser, User } from '../interfaces/User';

export async function insertUser(user: CreateUser) {
  await connection.query(
    `
    INSERT INTO users
      (name, class, token)
    VALUES
      ($1, $2, $3)
    RETURNING
      *;
      `,
    [user.name, user.class, user.token]
  );
}

export async function getUserByToken(token: string): Promise<User> {
  const user = await connection.query(
    `
    SELECT
      *
    FROM
      users
    WHERE
      token = $1;`,
    [token]
  );

  return user.rows[0];
}
