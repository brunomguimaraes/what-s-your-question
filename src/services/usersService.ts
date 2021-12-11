import { v4 as uuid } from 'uuid';
import { validadeUserSyntax } from '../schemas/userSchema';
import * as usersRepository from '../repositories/usersRepository';
import isBearerToken from '../schemas/bearerTokenSchema';

interface CreateUser {
  name: string;
  _class: string;
}

interface User extends CreateUser {
  id: number;
}

export async function registerUser(user: CreateUser) {
  const isSyntaxValid = validadeUserSyntax(user);
  if (!isSyntaxValid) throw new Error();

  await usersRepository.insertUser({ ...user, token: uuid() });
}

export async function userExists(auth: string): Promise<boolean | User> {
  const isAuthValid = isBearerToken(auth);
  if (!isAuthValid) return false;

  const token: string = auth.split(' ')[1];

  const user = await usersRepository.getUserByToken(token);
  if (!user) return false;

  return user;
}
