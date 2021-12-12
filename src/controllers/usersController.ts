import { NextFunction, Request, Response } from 'express';
import SyntaxError from '../errors/SyntaxError';
import * as usersService from '../services/usersService';

export async function postUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.body;

  try {
    if (!user.name || !user.class) {
      throw new SyntaxError('missing property in request`s body');
    }

    const registeredToken: string = await usersService.registerUser(user);

    return res.send(registeredToken).status(200);
  } catch (err) {
    if (err.name === 'SyntaxError') {
      return res.status(400).send(err.message);
    }
    return next(err);
  }
}
