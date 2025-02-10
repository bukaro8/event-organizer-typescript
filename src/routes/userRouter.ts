import { Router } from 'express';
import {
	createUserController,
	deleteUserController,
	getAllUsersController,
	getUserByEmail,
	getUserById,
	updateUserController,
} from '../controllers/userController';
const userRouter = Router();

userRouter.post('/create-user', createUserController);
userRouter.get('/users', getAllUsersController);
userRouter.get('/email/:email', getUserByEmail);
userRouter
	.route('/:id')
	.get(getUserById)
	.put(updateUserController)
	.delete(deleteUserController);

export default userRouter;
