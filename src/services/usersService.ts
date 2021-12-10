import { v4 as uuid } from 'uuid';
import { validadeUserSyntax } from '../schemas/userSchema';
import * as usersRepository from '../repositories/usersRepository';

interface User {
  name: string;
  _class: string;
}

export async function registerUser(user: User) {
  const isSyntaxValid = validadeUserSyntax(user);
  if (!isSyntaxValid) throw new Error();

  await usersRepository.insertUser({ ...user, token: uuid() });
}
