import Joi from 'joi';

export function validadeUserSyntax(obj: object) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    class: Joi.string().required(),
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
