import connection from '../database';

interface CreateUser {
  name: string;
  _class: string;
  token: string;
}

interface User extends CreateUser {
  id: number;
}

export async function insertUser(user: CreateUser) {
  await connection.query(
    `
    INSERT INTO users
      (name, class, token)
    VALUES
      ($1, $2, $3);
      `,
    [user.name, user._class, user.token]
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
