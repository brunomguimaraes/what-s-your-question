import Joi from 'joi';
import { Validation } from '../interfaces/Validation';

export default function isBearerToken(bearerToken: string): Validation {
  const bearerArray: Array<string> = bearerToken.split(' ');

  const schema = Joi.string().guid({ version: ['uuidv4'] });

  if (bearerArray.length !== 2 || bearerArray[0] !== 'Bearer') {
    return {
      result: false,
      message: 'authentication is not a proper bearer token',
    };
  }

  const validation = schema.validate(bearerArray[1]);
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
