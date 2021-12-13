import { NextFunction, Request, Response } from 'express';

import * as questionsService from '../services/questionsService';
import * as usersService from '../services/usersService';
import { Question } from '../interfaces/Question';
import SyntaxError from '../errors/SyntaxError';
import UnauthorizedError from '../errors/UnauthorizedError';

export async function postQuestion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const question: Question = req.body;

  try {
    if (
      !question.question ||
      !question.student ||
      !question.tags ||
      !question.class
    ) {
      throw new SyntaxError('missing property in request`s body');
    }

    const questionId = await questionsService.postQuestion(question);

    return res.send({ id: questionId }).status(200);
  } catch (err) {
    if (err.name === 'SyntaxError') {
      return res.status(400).send(err.message);
    }
    return next(err);
  }
}

export async function postAnswer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth: string = req.headers.authorization;
  const id = Number(req.params.id);

  try {
    if (!id) throw new SyntaxError('invalid question id');
    if (!auth) throw new UnauthorizedError('token has not been provided');

    const user = await usersService.getUserByToken(auth);

    const { answer }: { answer: string } = req.body;

    await questionsService.answerQuestion({
      text: answer,
      questionId: id,
      userId: user.id,
    });

    return res.sendStatus(201);
  } catch (err) {
    if (err.name === 'SyntaxError') {
      return res.status(400).send(err.message);
    }
    if (err.name === 'NotFoundError') {
      return res.status(400).send(err.message);
    }
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send(err.message);
    }
    if (err.name === 'AlreadyExistsError') {
      return res.status(403).send(err.message);
    }
    return next(err);
  }
}

export async function getUnansweredQuestions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const questions = await questionsService.getUnansweredQuestions();
    res.send(questions).status(200);
  } catch (err) {
    next(err);
  }
}

export async function getQuestionById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);
  try {
    if (!id) throw new SyntaxError('invalid question id');

    const question = await questionsService.getQuestionById(id);

    return res.send(question).status(200);
  } catch (err) {
    if (err.name === 'SyntaxError') {
      return res.status(400).send(err.message);
    }
    if (err.name === 'NotFoundError') {
      return res.status(404).send(err.message);
    }
    return next(err);
  }
}
