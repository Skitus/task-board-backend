import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test').default('development'),
  PORT: Joi.number().default(8080).required(),
  CLIENT_URL: Joi.string().uri().required(),

  DB_TYPE: Joi.string().valid('postgres').required(),
  POSTGRES_DATABASE: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_HOST: Joi.string().hostname().required(),
  POSTGRES_PORT: Joi.number().port().required(),
  POSTGRES_DATABASE_TEST: Joi.string().required().when('NODE_ENV', {
    is: 'test',
    then: Joi.required(),
  }),
  TYPEORM_SYNC: Joi.boolean().required(),
  TYPEORM_LOGGING: Joi.boolean().required(),
});
