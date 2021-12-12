import Joi from 'joi';
import { Validation } from '../interfaces/Validation';

export function validadeQuestionSyntax(obj: object): Validation {
  const schema = Joi.object({
    question: Joi.string().min(8).required(),
    student: Joi.string().required(),
    class: Joi.string().required(),
    tags: Joi.string().required(),
  });

  const validation = schema.validate(obj);

  if (validation.error) {
    return {
      result: false,
      message: validation.error.details[0].message,
    };
  }
  return {
    result: true,
  };
}
