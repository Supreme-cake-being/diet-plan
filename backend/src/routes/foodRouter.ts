import foodController from 'controllers/foodController';
import express from 'express';
import {
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

export default foodRouter;
