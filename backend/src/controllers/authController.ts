import { NextFunction, Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from 'drizzle';
import { users } from 'drizzle/schema';
import { HttpError, sendEmail } from 'helpers';
import { ctrlWrapper } from 'decorators';

const { JWT_SECRET } = process.env;

const signup = async (req: Request, res: Response, next: NextFunction) => {
const signup = async (req: Request, res: Response) => {
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

  await sendEmail(email, name, verificationToken);

  res.status(201).json({ name, email, verificationToken });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
const login = async (req: Request, res: Response) => {
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
  const token = jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: '7d',
  });

  await db.update(users).set({ token }).where(eq(users.id, user.id));

  res.json({
    token,
  });
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
const logout = async (req: Request, res: Response) => {
  const user = req.user;
  await db.update(users).set({ token: null }).where(eq(users.id, user?.id));
  res.status(204).send();
};

const verify = async (req: Request, res: Response) => {
  const { verificationToken } = req.params;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.verificationToken, verificationToken));

  if (!user) {
    throw HttpError(404, 'Not found');
  }

  await db
    .update(users)
    .set({
      verificationToken: null,
      verified: true,
    })
    .where(eq(users.id, user.id));

  res.json({ message: 'Verification successful' });
};

const currentUser = async (req: Request, res: Response) => {
  const user = req.user;

  res.json({
    email: user?.email,
    name: user?.name,
    age: user?.age,
    gender: user?.gender,
    weight: user?.weight,
    height: user?.height,
  });
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  verify: ctrlWrapper(verify),
  currentUser: ctrlWrapper(currentUser),
};
