import express from 'express';
import * as questionsController from '../controllers/questionsController';

const router = express.Router();

router.post('/', questionsController.postQuestion);
router.post('/:id', questionsController.postAnswer);
router.get('/', questionsController.getUnansweredQuestions);
router.get('/:id', questionsController.getQuestionById);

export default router;
