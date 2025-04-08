import { ctrlWrapper } from 'decorators';
import { db } from 'drizzle';
import { and, eq, sql } from 'drizzle-orm';
import { ingredients, meals, mealsIngredients } from 'drizzle/schema';
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

interface IIngredientsCategory {
  category:
    | 'meat'
    | 'dairy'
    | 'vegetables'
    | 'fruits'
    | 'grains'
    | 'legumes'
    | 'nuts/seeds'
    | 'oils/fats'
    | 'spices/herbs'
    | 'sweeteners'
    | 'alcohol'
    | 'seafood'
    | 'eggs';
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

const getIngredients: RequestHandler = async (req, res) => {
  const { name, category } = req.query;

  const conditions = [];
  if (name) {
    conditions.push(sql`name % ${name}`);
  }
  if (category) {
    conditions.push(
      eq(ingredients.category, category as IIngredientsCategory['category'])
    );
  }

  const searchedIngredients = await db
    .select()
    .from(ingredients)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json(searchedIngredients);
};

const getIngredientById: RequestHandler = async (req, res) => {
  const { ingredientId } = req.params;

  const [ingredientById] = await db
    .select()
    .from(ingredients)
    .where(eq(ingredients.id, ingredientId));
  if (!ingredientById) {
    throw HttpError(404, 'Not found');
  }

  res.json(ingredientById);
};

const createMeal: RequestHandler = async (req, res) => {
  const { name, description, nutrients, type, category, ingredients } =
    req.body;

  const [meal] = await db.select().from(meals).where(eq(meals.name, name));
  if (meal) {
    throw HttpError(409, 'Meal with the same name already exists');
  }

  const [newMeal] = await db
    .insert(meals)
    .values({ name, description, nutrients, type, category })
    .returning();

  if (!newMeal) {
    throw HttpError(400, 'Failed to create meal');
  }

  const mealIngredientEntries = ingredients.map(
    ({ ingredientId, measurement }: any) => ({
      mealId: newMeal.id,
      ingredientId,
      measurement,
    })
  );

  await db.insert(mealsIngredients).values(mealIngredientEntries);

  res.json({ ...req.body });
};

const createIngredient: RequestHandler = async (req, res) => {
  const { name } = req.body;

  const [ingredient] = await db
    .select()
    .from(ingredients)
    .where(eq(ingredients.name, name));
  if (ingredient) {
    throw HttpError(409, 'Ingredient with the same name already exists');
  }

  await db.insert(ingredients).values({ ...req.body });

  res.json({ ...req.body });
};

export default {
  getMeals: ctrlWrapper(getMeals),
  getMealById: ctrlWrapper(getMealById),
  getIngredients: ctrlWrapper(getIngredients),
  getIngredientById: ctrlWrapper(getIngredientById),
  createMeal: ctrlWrapper(createMeal),
  createIngredient: ctrlWrapper(createIngredient),
};
