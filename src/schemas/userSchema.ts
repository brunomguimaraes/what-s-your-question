import Joi from 'joi';

export function validadeUserSyntax(obj: object) {
  const schema = Joi.object({
    name: Joi.string().required(),
    _class: Joi.string().required(),
  });

  const validation = schema.validate(obj);
  return !validation.error;
}
