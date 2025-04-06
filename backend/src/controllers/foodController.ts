import { ctrlWrapper } from 'decorators';
import { db } from 'drizzle';
import { and, eq, sql } from 'drizzle-orm';
import { meals } from 'drizzle/schema';
import { RequestHandler } from 'express';
import { HttpError } from 'helpers';

interface IMealType {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

const getMeals: RequestHandler = async (req, res) => {
  const { name, type } = req.query;

  const conditions = [];
  if (name) {
    conditions.push(sql`name % ${name}`);
  }
  if (type) {
    conditions.push(eq(meals.type, type as IMealType['type']));
  }

  const searchedMeals = await db
    .select()
    .from(meals)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json(searchedMeals);
};

const getMealById: RequestHandler = async (req, res) => {
  const { mealId } = req.params;

  const [mealById] = await db.select().from(meals).where(eq(meals.id, mealId));
  if (!mealById) {
    throw HttpError(404, 'Not found');
  }

  res.json(mealById);
};

export default {
  getMeals: ctrlWrapper(getMeals),
  getMealById: ctrlWrapper(getMealById),
};
