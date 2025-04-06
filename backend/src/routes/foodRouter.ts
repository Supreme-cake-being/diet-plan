import foodController from 'controllers/foodController';
import { validateQuery } from 'decorators';
import { getMealsSchema } from 'drizzle/schema';
import express from 'express';
import { isAuthenticated } from 'middlewares';

const foodRouter = express.Router();

foodRouter.get(
  '/',
  isAuthenticated,
  validateQuery(getMealsSchema),
  foodController.getMeals
);

export default foodRouter;
