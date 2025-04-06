import {
  boolean,
  decimal,
  integer,
  jsonb,
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
  weight: Joi.number().min(0),
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
  type: varchar({ enum: ['breakfast', 'lunch', 'dinner', 'snack'] }).notNull(),
  category: varchar({
    enum: [
      'keto',
      'mediterranean',
      'paleo',
      'vegan',
      'vegetarian',
      'gluten-Free',
    ],
  }).notNull(),
  ingredients: jsonb('ingredients').notNull(), // ingredientId, name, measurement, category
});

export const calculateMacrosSchema = Joi.object({
  dailyActivityLevel: Joi.string()
    .valid(
      'sedentary',
      'lightlyActive',
      'moderatelyActive',
      'veryActive',
      'extremelyActive'
    )
    .required(),
  goal: Joi.string().valid('lose', 'maintain', 'gain').required(),
  preferredDiet: Joi.string()
    .valid('balanced', 'lowCarb', 'highProtein')
    .required(),
});

export const generateMealPlanSchema = Joi.object({
  ingredient: Joi.string(), // milk, chicken etc.
  category: Joi.string().valid(
    'keto',
    'mediterranean',
    'paleo',
    'vegan',
    'vegetarian',
    'gluten-Free'
  ),
  exclusions: Joi.array().items(
    Joi.string().valid(
      'meat',
      'dairy',
      'vegetables',
      'fruits',
      'grains',
      'legumes',
      'nuts/seeds',
      'oils/fats',
      'spices/herbs',
      'sweeteners',
      'alcohol',
      'seafood',
      'eggs'
    )
  ),
});

export const getMealsSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack'),
  category: Joi.string().valid(
    'keto',
    'mediterranean',
    'paleo',
    'vegan',
    'vegetarian',
    'gluten-Free'
  ),
});

export const ingredients = pgTable('ingredients', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar({ length: 64 }).notNull(),
  description: varchar('description', { length: 255 }),
  nutrients: jsonb('nutrients').notNull(), // calories, protein, carbs, fat
  category: varchar({
    enum: [
      'meat',
      'dairy',
      'vegetables',
      'fruits',
      'grains',
      'legumes',
      'nuts/seeds',
      'oils/fats',
      'spices/herbs',
      'sweeteners',
      'alcohol',
      'seafood',
      'eggs',
    ],
  }).notNull(),
});

export const getIngredientsSchema = Joi.object({
  name: Joi.string(),
  category: Joi.string().valid(
    'meat',
    'dairy',
    'vegetables',
    'fruits',
    'grains',
    'legumes',
    'nuts/seeds',
    'oils/fats',
    'spices/herbs',
    'sweeteners',
    'alcohol',
    'seafood',
    'eggs'
  ),
});
