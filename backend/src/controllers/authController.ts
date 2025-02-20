import { NextFunction, Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { db } from '../drizzle/migrate';
import { users } from '../drizzle/schema';
import { ctrlWrapper } from '../decorators';
import { HttpError } from '../helpers';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (!user.verified) {
    throw HttpError(403, 'Forbidden request due to not verified email');
  }

  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  res.json({
    token,
  });
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (user) {
    throw HttpError(409, 'Email is already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomUUID();

  await db
    .insert(users)
    .values({ ...req.body, password: hashedPassword, verificationToken });

  res.status(201).json({ name, email, verificationToken });
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
};
