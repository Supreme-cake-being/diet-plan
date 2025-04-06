import { ctrlWrapper } from 'decorators';
import { db } from 'drizzle';
import { and, eq, sql } from 'drizzle-orm';
import { ingredients, meals } from 'drizzle/schema';
import { RequestHandler } from 'express';
import { HttpError } from 'helpers';

interface IMeal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  category:
    | 'keto'
    | 'mediterranean'
    | 'paleo'
    | 'vegan'
    | 'vegetarian'
    | 'gluten-Free';
}
}

const getMeals: RequestHandler = async (req, res) => {
  const { name, type, category } = req.query;

  const conditions = [];
  if (name) {
    conditions.push(sql`name % ${name}`);
  }
  if (type) {
    conditions.push(eq(meals.type, type as IMeal['type']));
  }
  if (category) {
    conditions.push(eq(meals.category, category as IMeal['category']));
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
