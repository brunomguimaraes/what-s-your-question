import Joi from 'joi';
import { Answer } from '../interfaces/Answer';
import { Validation } from '../interfaces/Validation';

export function validadeAnswerSyntax(answer: Answer): Validation {
  const schema = Joi.object({
    text: Joi.string().min(6).required(),
    questioniId: Joi.number().required(),
    userId: Joi.number().required(),
  });

  const validation = schema.validate(answer);
  if (!validation.error)
    return {
      result: false,
      message: validation.error.details[0].message,
    };
  return {
    result: true,
  };
}
