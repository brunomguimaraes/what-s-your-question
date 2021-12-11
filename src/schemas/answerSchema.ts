import Joi from 'joi';

export function validadeAnswerSyntax(answer: string): boolean {
  const schema = Joi.string().required();

  const validation = schema.validate(answer);
  return !validation.error;
}
