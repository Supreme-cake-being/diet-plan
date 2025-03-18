import {
  boolean,
  decimal,
  integer,
  pgTable,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import Joi from 'joi';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar({ length: 64 }).notNull().unique(),
  password: varchar({ length: 64 }).notNull(),
  name: varchar({ length: 64 }).notNull(),
  age: integer(),
  gender: varchar({ enum: ['male', 'female'] }),
  weight: decimal({ precision: 5, scale: 2 }),
  height: decimal({ precision: 5, scale: 2 }),
  verificationToken: varchar({ length: 64 }),
  verified: boolean().default(false).notNull(),
  token: varchar(),
  restorationToken: varchar({ length: 64 }),
});

export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

export const editInfoSchema = Joi.object({
  name: Joi.string().min(3).max(32),
  age: Joi.number().integer().min(1),
  gender: Joi.string().valid('male', 'female'),
  wieght: Joi.number().min(0),
  height: Joi.number().min(0),
});

export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

export const passwordSchema = Joi.object({
  password: Joi.string().pattern(passwordRegex).required(),
});
