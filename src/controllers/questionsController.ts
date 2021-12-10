import { Request, Response } from 'express';

import * as questionsService from '../services/questionsService';

export async function postQuestion(req: Request, res: Response) {
  const { question, student, tags } = req.body;
  const _class = req.body.class;

  if (!question || !student || !tags || !_class) {
    return res.sendStatus(400);
  }

  await questionsService.postQuestion({ question, student, tags, _class });

  return res.sendStatus(201);
}
