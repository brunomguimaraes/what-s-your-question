import connection from '../database';

interface User {
  name: string;
  _class: string;
  token: string;
}

export async function insertUser(user: User) {
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
