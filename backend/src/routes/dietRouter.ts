import dietController from 'controllers/dietController';
import express from 'express';
import {
  calculateMacrosValidation,
  generateMealPlanValidation,
  isAuthenticated,
  isEmptyBody,
} from 'middlewares';

const dietRouter = express.Router();

dietRouter.post(
  '/calculate-macros',
  isAuthenticated,
  isEmptyBody,
  calculateMacrosValidation,
  dietController.calculateMacros
);
dietRouter.post(
  '/generate',
  isAuthenticated,
  isEmptyBody,
  generateMealPlanValidation,
  dietController.generateMealPlan
);

export default dietRouter;
