import express from 'express';

import authController from 'controllers/authController';
import isAuthenticated from 'middlewares/isAuthenticated';

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', isAuthenticated, authController.logout);
authRouter.get('/verify/:verificationToken', authController.verify);

export default authRouter;
