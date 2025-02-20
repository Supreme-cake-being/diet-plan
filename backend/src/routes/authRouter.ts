import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import authController from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.get('/login', authController.login);
authRouter.get('/logout', isAuthenticated, authController.login);

export default authRouter;
