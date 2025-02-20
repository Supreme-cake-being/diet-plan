import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpError } from '../helpers';
import { ctrlWrapper } from '../decorators';

const isAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  console.log(bearer, token);

  if (bearer !== 'Bearer') {
    throw HttpError(401, 'Not authorized 1');
  }

  try {
    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    console.log(id);
    // const user = await db.select().from(users).where(eq(users.id, id));

    // if (!user && user.length !== 0) {
    //   throw HttpError(401, 'Not authorized');
    // }

    // req.user = user[0];
    next();
  } catch (error) {
    next(HttpError(401, 'Not authorized 2'));
  }
};

export default ctrlWrapper(isAuthenticated);
