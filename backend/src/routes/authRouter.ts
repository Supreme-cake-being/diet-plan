import express from 'express';

import authController from 'controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', isEmptyBody, authController.signup);
authRouter.post('/login', isEmptyBody, authController.login);
authRouter.post('/logout', isAuthenticated, authController.logout);
authRouter.get('/verify/:verificationToken', authController.verify);
authRouter.post('/verify', isEmptyBody, authController.resendEmail);

export default authRouter;
