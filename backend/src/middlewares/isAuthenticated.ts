import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { db } from 'src/drizzle/migrate';
import { usersTable } from 'src/drizzle/schema';
import HttpError from 'src/helpers/HttpError';
import { eq } from 'drizzle-orm';

const { JWT_SECRET } = process.env;

const isAuthenticated: RequestHandler = (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw HttpError;
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    const user = db.select().from(usersTable).where(eq(usersTable.id, id));

    if (!user) {
      throw HttpError(401, 'Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, 'Not auhtorized'));
  }
};

export default isAuthenticated;
