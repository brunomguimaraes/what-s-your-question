import Joi from 'joi';

export function validadeQuestionSyntax(obj: object) {
  const schema = Joi.object({
    question: Joi.string().required(),
    student: Joi.string().required(),
    _class: Joi.string().required(),
    tags: Joi.string().required(),
  });

  const validation = schema.validate(obj);
  return !validation.error;
}
