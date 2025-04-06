import { RequestHandler } from 'express';
import { HttpError } from 'helpers';

const uuidRegexp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

export const isValidId: RequestHandler = (req, _, next) => {
  const { id } = req.params;
  if (!uuidRegexp.test(id)) {
    return next(HttpError(404, `Not found`));
  }
  next();
};
