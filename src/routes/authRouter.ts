import { Router } from 'express';
import { loginController } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/login', loginController);
export default authRouter;
