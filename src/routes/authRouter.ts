import { Router } from 'express';
import {
	loginController,
	logoutController,
} from '../controllers/authController';

const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
export default authRouter;
