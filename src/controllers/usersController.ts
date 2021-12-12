import { Request, Response } from 'express';
import * as usersService from '../services/usersService';

export async function postUser(req: Request, res: Response) {
  const user = req.body;
  if (!user.name || !user.class) {
    return res.sendStatus(400);
  }

  const registeredToken = await usersService.registerUser(user);

  return res.send(registeredToken).status(200);
}
