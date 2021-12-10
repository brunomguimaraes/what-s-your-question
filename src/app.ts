import express, { Request, Response } from 'express';
import cors from 'cors';
import questionRouter from './routers/questionRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/questions', questionRouter);

app.get('/health', (req: Request, res: Response) => {
  return res.sendStatus(200);
});

export default app;
