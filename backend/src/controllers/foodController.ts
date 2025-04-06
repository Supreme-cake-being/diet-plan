import { ctrlWrapper } from 'decorators';
import { db } from 'drizzle';
import { and, eq, sql } from 'drizzle-orm';
import { meals } from 'drizzle/schema';
import { RequestHandler } from 'express';

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

export default {
  getMeals: ctrlWrapper(getMeals),
};
