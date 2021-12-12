import { v4 as uuid } from 'uuid';
import { validadeUserSyntax } from '../validations/userValidation';
import * as usersRepository from '../repositories/usersRepository';
import isBearerToken from '../validations/bearerTokenValidation';
import UnauthorizedError from '../errors/UnauthorizedError';
import { CreateUser, User } from '../interfaces/User';
import SyntaxError from '../errors/SyntaxError';

export async function registerUser(user: CreateUser) {
  const isSyntaxValid = validadeUserSyntax(user);
  if (!isSyntaxValid.result) throw new SyntaxError(isSyntaxValid.message);

  const token: string = uuid();
  await usersRepository.insertUser({ ...user, token });
  return token;
}

export async function getUserByToken(auth: string): Promise<User> {
  const isAuthValid = isBearerToken(auth);
  if (!isAuthValid.result) throw new UnauthorizedError(isAuthValid.message);

  const token: string = auth.split(' ')[1];

  const user = await usersRepository.getUserByToken(token);
  if (!user) throw new UnauthorizedError('the provided token does not exist');

  return user;
}
