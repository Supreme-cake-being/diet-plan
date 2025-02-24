import { RequestHandler } from 'express';
import { HttpError } from '../helpers/index.js';

export const isEmptyBody: RequestHandler = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, 'Missing fields'));
  }
  next();
};
