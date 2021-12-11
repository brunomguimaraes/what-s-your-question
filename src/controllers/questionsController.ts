import { Request, Response } from 'express';

import * as questionsService from '../services/questionsService';
import * as usersService from '../services/usersService';

export async function postQuestion(req: Request, res: Response) {
  const { question, student, tags } = req.body;
  const _class = req.body.class;

  if (!question || !student || !tags || !_class) {
    return res.sendStatus(400);
  }

  await questionsService.postQuestion({ question, student, tags, _class });

  return res.sendStatus(201);
}

interface Answer {
  answer: string;
}

export async function postAnswer(req: Request, res: Response) {
  const auth = req.headers.authorization;
  const id = Number(req.params.id);

  if (!id) return res.sendStatus(400);
  if (!auth) return res.sendStatus(401);

  const user = usersService.userExists(auth);
  if (!user) return res.sendStatus(401);

  const { answer }: Answer = req.body;

  const result = await questionsService.answerQuestion({
    text: answer,
    questionId: id,
    userId: 1,
  });
  if (!result) return res.sendStatus(400);

  return res.sendStatus(201);
}
