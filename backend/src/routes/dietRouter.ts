import dietController from 'controllers/dietController';
import express from 'express';
import {
  calculateMacrosValidation,
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
dietRouter.get('/generate');

export default dietRouter;
