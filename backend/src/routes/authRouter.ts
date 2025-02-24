import express from 'express';

import authController from 'controllers/authController';
import isAuthenticated from 'middlewares/isAuthenticated';

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.get('/login', authController.login);
authRouter.get('/logout', isAuthenticated, authController.login);

export default authRouter;
