import { Request, Response } from 'express';
import * as usersService from '../services/usersService';

export async function postUser(req: Request, res: Response) {
  const { name } = req.body;
  const _class = req.body.class;

  if (!name || !_class) {
    return res.sendStatus(400);
  }

  const registeredToken = await usersService.registerUser({ name, _class });

  return res.send(registeredToken).status(200);
}
