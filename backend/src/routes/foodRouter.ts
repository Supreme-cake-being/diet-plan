import foodController from 'controllers/foodController';
import express from 'express';
import {
  getIngredientsQueryValidation,
  getMealsQueryValidation,
  ingredientCreateValidation,
  isAuthenticated,
  isValidId,
  mealCreateValidation,
} from 'middlewares';

const foodRouter = express.Router();

foodRouter.get(
  '/meals',
  isAuthenticated,
  getMealsQueryValidation,
  foodController.getMeals
);

foodRouter.get(
  '/meals/:mealId',
  isAuthenticated,
  isValidId('mealId'),
  foodController.getMealById
);

foodRouter.post(
  '/meals',
  isAuthenticated,
  mealCreateValidation,
  foodController.createMeal
);

foodRouter.get(
  '/ingredients',
  isAuthenticated,
  getIngredientsQueryValidation,
  foodController.getIngredients
);

foodRouter.get(
  '/ingredients/:ingredientId',
  isAuthenticated,
  isValidId('ingredientId'),
  foodController.getIngredientById
);

foodRouter.post(
  'ingredients',
  '/ingredients',
  isAuthenticated,
  ingredientCreateValidation,
  foodController.createIngredient
);

export default foodRouter;
