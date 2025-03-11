import express from 'express';

import authController from 'controllers/authController';
import { isEmptyBody, isAuthenticated } from 'middlewares';

const authRouter = express.Router();

authRouter.post('/signup', isEmptyBody, authController.signup);
authRouter.post('/login', isEmptyBody, authController.login);
authRouter.post('/logout', isAuthenticated, authController.logout);
authRouter.get('/verify/:verificationToken', authController.verify);
authRouter.post('/verify', isEmptyBody, authController.resendEmail);
authRouter.get('/current', isAuthenticated, authController.currentUser);

export default authRouter;
