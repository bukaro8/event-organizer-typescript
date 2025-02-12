import { Router } from 'express';
import {
	loginController,
	logoutController,
	profileController,
} from '../controllers/authController';
import { validateToken } from '../plugins/functions/validateToken.middleware';

const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
authRouter.get('/profile', validateToken, profileController);
export default authRouter;
