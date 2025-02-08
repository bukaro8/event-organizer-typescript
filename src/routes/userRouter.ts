import express from 'express';
import {
	createUserController,
	getAllUsersController,
} from '../controllers/userController';
const userRouter = express.Router();

userRouter.post('/create-user', createUserController);
userRouter.get('/users', getAllUsersController);
export default userRouter;
