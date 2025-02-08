import express from 'express';
import {
	createUserController,
	getAllUsersController,
	getUserById,
} from '../controllers/userController';
const userRouter = express.Router();

userRouter.post('/create-user', createUserController);
userRouter.get('/users', getAllUsersController);
userRouter.route('/:id').get(getUserById);
export default userRouter;
