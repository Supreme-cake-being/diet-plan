import express from 'express';

import authController from 'controllers/authController';
import { isEmptyBody, isAuthenticated } from 'middlewares';

const authRouter = express.Router();

// Registration
authRouter.post('/signup', isEmptyBody, authController.signup);
authRouter.post('/login', isEmptyBody, authController.login);
authRouter.post('/logout', isAuthenticated, authController.logout);

// User information edit
authRouter.patch(
  '/edit-info',
  isAuthenticated,
  isEmptyBody,
  authController.edit
);

// Password restoration
authRouter.post('/forgot-password', isEmptyBody, authController.forgotPassword);
authRouter.patch(
  '/restore/:restorationToken',
  isEmptyBody,
  authController.restorePassword
);

// Current user. Used on app refresh
authRouter.get('/current', isAuthenticated, authController.currentUser);

// Email verification
authRouter.get('/verify/:verificationToken', authController.verify);
authRouter.post('/verify', isEmptyBody, authController.resendEmail);

export default authRouter;
