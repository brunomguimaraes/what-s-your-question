import { Request, Response, NextFunction } from 'express';

export default async function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  return res.sendStatus(500);
}
