import { Router } from 'express';
import {
	createUserController,
	deleteUserController,
	getAllUsersController,
	getUserByEmail,
	getUserById,
	updateUserController,
} from '../controllers/userController';
import { isAdmin } from '../plugins/functions/isAdmin.middleware';
import { validateToken as isAuthenticated } from '../plugins/functions/validateToken.middleware';
const userRouter = Router();

userRouter.post('/create-user', createUserController);
userRouter.get('/users', isAuthenticated, isAdmin, getAllUsersController);
userRouter.get('/email/:email', isAuthenticated, isAdmin, getUserByEmail);
userRouter
	.route('/:id')
	.get(isAuthenticated, getUserById)
	.put(isAuthenticated, updateUserController)
	.delete(isAuthenticated, isAdmin, deleteUserController);

export default userRouter;
