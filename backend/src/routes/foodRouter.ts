import foodController from 'controllers/foodController';
import express from 'express';
import {
  getIngredientsQueryValidation,
  getMealsQueryValidation,
  isAuthenticated,
  isValidId,
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

export default foodRouter;
