import { Request, Response } from 'express';

import {
	allUsers,
	createUser,
	deleteUser,
	updateUser,
	userByEmail,
	userById,
} from '../services/userService';
interface UserProps {
	name: string;
	email: string;
	password: string;
	phone: string;
	picture?: string | undefined;
}

export const createUserController = async (req: Request, res: Response) => {
	try {
		const { name, picture, phone, email, password }: UserProps = req.body;
		if (!name || !email) throw 'Name or email is required';
		const newUser = await createUser({
			name,
			picture,
			phone,
			email,
			password,
		});
		res.cookie('token', newUser.token);

		const response = {
			name: newUser.data.name,
			picture: newUser.data.picture,
			email: newUser.data.email,
			role: newUser.data.role,
			phone: newUser.data.phone,
		};
		res.status(201).send({ status: 'success', data: response });
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};
export const getAllUsersController = async (req: any, res: Response) => {
	try {
		const users = await allUsers();
		res
			.status(200)
			.send({ status: 'success', count: users.length, data: users });
	} catch (error) {
		res.status(400).send({ status: 'fail' });
	}
};
export const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (!id) {
			throw new Error('No valid ID'); // Throw an error if no ID is provided
		}

		const user = await userById(id); // This will throw an error if no user is found
		res.status(200).send({ status: 'success', data: user });
	} catch (error: any) {
		res.status(404).send({
			status: 'fail',
			message: error.message,
		});
	}
};
export const getUserByEmail = async (req: Request, res: Response) => {
	try {
		const { email } = req.params;
		if (!email) throw Error('error');
		const user = await userByEmail(email);
		res.status(200).send({ status: 'success', data: user });
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};
export const updateUserController = async (req: Request, res: Response) => {
	try {
		const user = await updateUser(req.params.id, req.body);
		res.status(200).send({ status: 'success', data: user });
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};
export const deleteUserController = async (req: Request, res: Response) => {
	try {
		await deleteUser(req.params.id);
		res.status(200).send({
			status: 'success',
			message: 'User Delete Successfully',
		});
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};
