import { relations } from 'drizzle-orm';
import {
  boolean,
  decimal,
  integer,
  jsonb,
  pgTable,
  primaryKey,
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
  name: Joi.string().min(3).max(64).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

export const editInfoSchema = Joi.object({
  name: Joi.string().min(3).max(64),
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

export const meals = pgTable('meals', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar({ length: 64 }).notNull(),
  description: varchar('description', { length: 255 }),
  nutrients: jsonb('nutrients').notNull(), // calories, protein, carbs, fat
  type: varchar({ enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'] }).notNull(),
  category: varchar({
    enum: ['Keto', 'Mediterranean', 'Paleo', 'Vegan', 'Vegetarian'],
  }).notNull(),
  ingredients: jsonb('ingredients').notNull(), // ingredientId, name, measurement
});

export const ingredients = pgTable('ingredients', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar({ length: 64 }).notNull(),
  description: varchar('description', { length: 255 }),
  nutrients: jsonb('nutrients').notNull(), // calories, protein, carbs, fat
});
