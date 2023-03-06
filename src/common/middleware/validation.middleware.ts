import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'joi';
import { pino } from 'pino';

const logger = pino({
  name: 'ValidateMiddleware'
});

export const validate = (schema: AnySchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    logger.info(error, 'Validation errors');
    // if the schema does not pass the validation, return a bad request response with error message
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};
